import React from 'react'
import './Posts.css'
// import { PostsData } from '../../Data/PostsData'
import Post from '../Post/Post'
// import { useSelector } from 'react-redux'
const Posts = ({post}) => {
  // const postData = useSelector((state) => state.postReducer.posts)

  return (
    <div className="Posts">
      {post[0]?.data?.map((post, id) => {
        return <Post data={post} id={id} />
      })}
    </div>
  )
}

export default Posts
