import React from 'react'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import './PostSide.css'
import { useSelector } from 'react-redux'
import { UserRole } from '../../config/enums'
// import { useSelector } from 'react-redux';
const PostSide = ({ postData, searchText, setSearchText, isHome = false ,isAuthorProfile=false,setCategory,isCategory}) => {
  const authData = useSelector((state) => state.authReducer.authData)

  const isAuthor = authData?.data?.role === UserRole.AUTHOR
  // const postData = useSelector((state) => state.postReducer.posts)
  return (
    <div className="PostSide">
      <PostShare searchText={searchText} setSearchText={setSearchText} isAuthorProfile={isAuthorProfile} isHome={isHome} setCategory={setCategory} isCategory={isCategory}/>
      {(isAuthor || isHome || isAuthorProfile) && <Posts post={postData} />}
    </div>
  )
}

export default PostSide
