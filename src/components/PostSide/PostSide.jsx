import React from 'react'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import './PostSide.css'
import { useSelector } from 'react-redux'
import { UserRole } from '../../config/enums'
// import { useSelector } from 'react-redux';
const PostSide = ({ postData, searchText, setSearchText, isHome = false }) => {
  const authData = useSelector((state) => state.authReducer.authData)

  const isAuthor = authData?.data?.role === UserRole.AUTHOR
  console.log(postData, 'postDataaaa------------------------------->>>>>>>>>>')
  // const postData = useSelector((state) => state.postReducer.posts)
  return (
    <div className="PostSide">
      <PostShare searchText={searchText} setSearchText={setSearchText} />
      {(isAuthor || isHome) && <Posts post={postData} />}
    </div>
  )
}

export default PostSide
