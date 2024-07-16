/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import PostSide from "../../components/PostSide/PostSide";
import ProfileSide from "../../components/profileSide/ProfileSide";
import RightSide from "../../components/RightSide/RightSide";
import back from "../../img/wp4082523.webp";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../actions/post.actions";
// import { getAllPosts as fetchAllPost } from "../../api/postRequest";
import { useNavigate } from "react-router-dom";
import Preloader from "../../components/Preloader/Preloader";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [posts, setPosts] = useState([]);
  const postData = useSelector((state) => state.postReducer.posts);
  const postDataLoading = useSelector((state) => state.postReducer.loading);
  console.log("ddadtaad",postData)

  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  
  const fetchingMoreRef = useRef(false)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        await getAllPosts(category, searchText, dispatch, 1);
        setPage(1)
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [searchText, category, dispatch]);



  const loadMorePosts = async () => {
    if (!fetchingMoreRef.current) {
      fetchingMoreRef.current = true;
  
      const nextPage = page + 1;
      
      try {
        await getAllPosts(category, searchText, dispatch, nextPage);
        console.log("OK",nextPage)
        
        setPage(nextPage)      
      } catch (error) {
        console.error("Error fetching more posts:", error);
      } finally {
        
        fetchingMoreRef.current = false;
      }
    }
  };

  return (
    <>
      {isLoading && <Preloader />}
      <div className="Home" style={{ backgroundImage: `URL(${back})` }}>
        <ProfileSide isHome={true} />
        <PostSide
          searchText={searchText}
          setSearchText={setSearchText}
          postData={postData.data}
          isHome={true}
          setCategory={setCategory}
          isCategory={true}
          onLoadMore={loadMorePosts} // Pass down loadMore function to handle infinite scrolling
        />
        <RightSide />
      </div>
    </>
  );
};

export default Home;
