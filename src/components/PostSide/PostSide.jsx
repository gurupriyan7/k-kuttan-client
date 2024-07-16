import React, { useEffect } from "react";
import Posts from "../Posts/Posts";
import PostShare from "../PostShare/PostShare";
import "./PostSide.css";
import { useSelector } from "react-redux";
import { UserRole } from "../../config/enums";
import { useInView } from "react-intersection-observer";
import PostSkeleton from "../Post/PostSkeleton";
// import { useSelector } from 'react-redux';
const PostSide = ({
  postData,
  totalPost,
  searchText,
  setSearchText,
  isHome = false,
  isAuthorProfile = false,
  setCategory,
  isCategory,
  onLoadMore,
}) => {
  const authData = useSelector((state) => state.authReducer.authData);

  const isAuthor = authData?.data?.role === UserRole.AUTHOR;
  // const postData = useSelector((state) => state.postReducer.posts)

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && onLoadMore && postData.length < totalPost) {
      onLoadMore();
    }
  }, [inView]);
  console.log(postData, "POST DATA1");

  return (
    <div className="PostSide ">
      <PostShare
        searchText={searchText}
        setSearchText={setSearchText}
        isAuthorProfile={isAuthorProfile}
        isHome={isHome}
        setCategory={setCategory}
        isCategory={isCategory}
      />
   
      {(isAuthor || isHome || isAuthorProfile) && (
        <Posts post={postData || []} />
      )}
      
      <div ref={ref}  className="flex justify-center items-center">
        {postData.length < totalPost && postData.length > 0 && (
          // <span className="text-white text-center font-[700]  text-[16px] md:text-[24px] my-[20px]">Loading more posts...</span>
          <PostSkeleton />
        )}
      </div>
    </div>
  );
};

export default PostSide;
