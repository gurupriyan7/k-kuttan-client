import React, {useEffect} from 'react'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import './PostSide.css'
import { useSelector } from 'react-redux'
import { UserRole } from '../../config/enums'
import { useInView } from 'react-intersection-observer';
// import { useSelector } from 'react-redux';
const PostSide = ({ postData, searchText, setSearchText, isHome = false ,isAuthorProfile=false,setCategory,isCategory, onLoadMore}) => {
  const authData = useSelector((state) => state.authReducer.authData)

  const isAuthor = authData?.data?.role === UserRole.AUTHOR
  // const postData = useSelector((state) => state.postReducer.posts)

  const { ref, inView } = useInView(); 

  useEffect(() => {
    if (inView && isHome) {
      onLoadMore(); 
    }
  }, [inView, onLoadMore]); 
  console.log(postData,"POST DATA")

  return (
    <div className="PostSide">
      <PostShare searchText={searchText} setSearchText={setSearchText} isAuthorProfile={isAuthorProfile} isHome={isHome} setCategory={setCategory} isCategory={isCategory}/>
      {(isAuthor || isHome || isAuthorProfile) && <Posts post={postData || []} />}
      <div ref={ref}></div> 
    </div>
  )
}

export default PostSide
