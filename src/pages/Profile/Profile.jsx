import React, { useEffect, useState } from 'react'
import PostSide from '../../components/PostSide/PostSide'
import ProfileCard from '../../components/ProfileCard.jsx/ProfileCard'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import RightSide from '../../components/RightSide/RightSide'
import back from '../../img/wp4082523.webp'
import './Profile.css'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsByUser } from '../../actions/post.actions'
import { useNavigate } from 'react-router-dom'
import { path } from '../../paths/paths'
import { findUserProfile } from '../../actions/user.actions'
import Preloader from '../../components/Preloader/Preloader'
import { UserRole } from '../../config/enums'
const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isDraft, setIsDraft] = useState(false)
  const [posts, setPosts] = useState([])
  const [searchText, setSearchText] = useState('')

  const [load, setLoad] = useState(false)
  const postData = useSelector((state) => state.postReducer.posts)
  const postLoading = useSelector((state) => state.postReducer.loading)
  const [category,setCategory]=useState("")

  const authData = useSelector((state) => state.authReducer.authData)

  const isAuthor = authData?.data?.role === UserRole.AUTHOR

  useEffect(() => {
    
    dispatch(findUserProfile())
  }, [ ])

  useEffect(()=>{
    dispatch(getPostsByUser(isDraft,category,searchText))
  },[isDraft , searchText,category])

  // useEffect(() => {
  //   setPosts(postData[0]?.data)
  // }, [postData])

  useEffect(() => {
    if (postLoading) {
      setLoad(true)
    } else {
      setLoad(false)
    }
  }, [postLoading])
  return (
    <>
      {load && <Preloader />}
      <div className="Profile" style={{ backgroundImage: `URL(${back})` }}>
        <ProfileLeft />
        <div className="Profile-center">
          <ProfileCard isProfile={true} />
          {isAuthor && (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <button
                onClick={() => setIsDraft(true)}
                className={`button ps-button ${isDraft && 'active'}`}
                style={{ marginLeft: '1rem' }}
              >
                Draft
              </button>
              <button
                onClick={() => setIsDraft(false)}
                className={`button ps-button ${!isDraft && 'active'}`}
                style={{ marginLeft: '1rem' }}
              >
                Publised
              </button>
            </div>
          )}
          <PostSide
            searchText={searchText}
            setSearchText={setSearchText}
            postData={postData.data}
            setCategory={setCategory}
            isCategory={true}
          />
        </div>

        <RightSide />
      </div>
    </>
  )
}

export default Profile
