import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { getAuthorUserProfile } from "../../api/userRequest";
import { getPostsByUserId, getSeqencePosts } from "../../actions/post.actions";
import Preloader from "../Preloader/Preloader";
import ProfileCard from "../ProfileCard.jsx/ProfileCard";
import PostSide from "../PostSide/PostSide";
import Home from "../../img/home.png";
import back from "../../img/wp4082523.webp";
const PostSequence = () => {
  const dispatch = useDispatch();

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const location = useLocation();
  const { authorId, postId } = location.state || {};
  const [authorData, setAuthorData] = useState({});
  const [category,setCategory]=useState("")


  const [load, setLoad] = useState(false);
  const postData = useSelector((state) => state.postReducer.seqPosts);
  
  const postLoading = useSelector((state) => state.postReducer.loading);
  console.log(postData, "userDataqwedfdfgvftyhbgy");
  const fetchingMoreRef = useRef(false)
  // useEffect(async () => {
  //   try {
  //     setLoad(true);
  //     const userData = await getAuthorUserProfile(authorId);
  //     setLoad(false);
    
  //     setAuthorData(userData?.data?.data);
  //   } catch (error) {
  //     setLoad(false);
  //   }
  // }, [authorId]);
  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        setLoad(true);
        const userData = await getAuthorUserProfile(authorId);
        setLoad(false);
        setAuthorData(userData?.data?.data);
      } catch (error) {
        setLoad(false);
        console.error("Error fetching author data:", error);
      }
    };
    fetchAuthorData();
  }, [authorId]);

  useEffect(() => {
    dispatch(getSeqencePosts(postId,category, searchText));
  }, [searchText]);

  // useEffect(() => {
  //   setPosts(postData?.data);
  // }, [postData]);

  const loadMorePosts = async () => {
    if (!fetchingMoreRef.current) {
      fetchingMoreRef.current = true;
      const nextPage = page + 1;
      setPage(nextPage);
      try {
        await dispatch(getSeqencePosts(postId, category, searchText, nextPage));
      } catch (error) {
        console.error("Error fetching more posts:", error);
      } finally {
        fetchingMoreRef.current = false;
      }
    }
  };


  useEffect(() => {
    if (postLoading) {
      setLoad(true);
    } else {
      setLoad(false);
    }
  }, [postLoading]);

  return (
    <>
      {load && <Preloader />}
      <div className="Profile" style={{ backgroundImage: `URL(${back})` }}>
        <div style={{ backgroundColor: "" }} className="absolute left-4 top-4">
          <Link to="../">
            {" "}
            <img src={Home} style={{ width: "1.5rem" }} alt="" />
          </Link>
        </div>
        <div className="Profile-center">
          <ProfileCard
            isProfile={true}
            isAuthorProfile={true}
            authorData={authorData}
          />
          <PostSide
            searchText={searchText}
            setSearchText={setSearchText}
            postData={postData.data}
            isAuthorProfile={true}
            setCategory={setCategory}
            onLoadMore={loadMorePosts}
          />
        </div>
      </div>
    </>
  );
};
export default PostSequence;
