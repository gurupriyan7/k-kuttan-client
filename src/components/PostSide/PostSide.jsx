import React from 'react'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import './PostSide.css'
// import { useSelector } from 'react-redux';
const PostSide = ({postData}) => {
  console.log(postData,"postDataaaa");
  // const postData = useSelector((state) => state.postReducer.posts)
  return (
    <div className="PostSide">
      <PostShare />
      <Posts post={postData} />
    </div>
  )
}

export default PostSide
 