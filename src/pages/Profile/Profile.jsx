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
const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isDraft, setIsDraft] = useState(false)
  const [posts, setPosts] = useState([])

  const [load, setLoad] = useState(false)
  const postData = useSelector((state) => state.postReducer.posts)
  const postLoading = useSelector((state) => state.postReducer.loading)

  const authData = useSelector((state) => state.authReducer.authData)

  useEffect(() => {
    dispatch(getPostsByUser(isDraft))
    dispatch(findUserProfile())
  }, [dispatch, isDraft])

  useEffect(() => {
    setPosts(postData[0]?.data)
  }, [postData])

  console.log(postData,"postData,------------");

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
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {/* <button className="button ps-button" style={{ marginLeft: '1rem' }}>
            Saved
          </button> */}
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
            {/* <button className="button ps-button" style={{ marginLeft: '1rem' }}>
            Edited
          </button> */}
          </div>
          <PostSide postData={posts} />
        </div>

        <RightSide />
      </div>
    </>
  )
}

export default Profile
