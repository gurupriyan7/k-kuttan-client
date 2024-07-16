/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import PostSide from "../../components/PostSide/PostSide";
import ProfileCard from "../../components/ProfileCard.jsx/ProfileCard";
import back from "../../img/wp4082523.webp";
import { useDispatch, useSelector } from "react-redux";
import { getPostsByUserId } from "../../actions/post.actions";
import { Link, useParams } from "react-router-dom";
import left from "../../img/leftz.png";
import Home from "../../img/home.png";

import "./SingleUserProfile.css";
import { getAuthorUserProfile } from "../../api/userRequest";
import Preloader from "../../components/Preloader/Preloader";

const SingleUserProfile = () => {
  const dispatch = useDispatch();

  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState({});

  const [load, setLoad] = useState(false);
  const postData = useSelector((state) => state.postReducer.posts);
  const postLoading = useSelector((state) => state.postReducer.loading);

  useEffect(async () => {
    try {
      setLoad(true);
      const userData = await getAuthorUserProfile(authorId);
      setLoad(false);
      console.log(userData?.data?.data, "userData");
      setAuthorData(userData?.data?.data);
    } catch (error) {
      setLoad(false);
    }
  }, [authorId]);

  useEffect(() => {
    dispatch(getPostsByUserId(authorId, searchText));
  }, [searchText]);

  // useEffect(() => {
  //   setPosts(postData[0]?.data);
  // }, [postData]);

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
      <div
            style={{ backgroundColor: "" }}
            className="absolute left-4 top-4"
          >
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
            postData={postData}
            isAuthorProfile={true}
          />
        </div>
      </div>
    </>
  );
};
export default SingleUserProfile;
