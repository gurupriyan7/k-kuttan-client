import React from 'react'
import './Posts.css'
// import { PostsData } from '../../Data/PostsData'
import Post from '../Post/Post'
// import { useSelector } from 'react-redux'
const Posts = ({ post }) => {
  // const postData = useSelector((state) => state.postReducer.posts)
  console.log(post, "totalPOst");
  console.log("JDDJ", new Error("sample error"))
  return (
    <div className="Posts">
      {post?.map((post, id) => {
        return <Post key={`posts-${post?._id}`} data={post} id={id} />
      })}
    </div>
  )
}

export default Posts
