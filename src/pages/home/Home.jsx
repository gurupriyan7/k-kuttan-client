/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import PostSide from '../../components/PostSide/PostSide'
import ProfileSide from '../../components/profileSide/ProfileSide'
import RightSide from '../../components/RightSide/RightSide'
import back from '../../img/wp4082523.webp'
import './Home.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../../actions/post.actions'
import { useNavigate } from 'react-router-dom'
import { path } from '../../paths/paths'
import { getLocalStorageItem } from '../../utils/appUtils'
import { findUserProfile } from '../../actions/user.actions'
import Preloader from '../../components/Preloader/Preloader'

const Home = () => {
  // const userData = getLocalStorageItem('profile')
  const [isLoading, setIsLoading] = useState(false)
  const postData = useSelector((state) => state.postReducer.posts)
  const authData = useSelector((state) => state.authReducer.authData)

  const postDataLoading = useSelector((state) => state.postReducer.loading)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(async () => {
    setIsLoading(true)
    const fetchData = async () => {
      console.log('hello')
      try {
        if (!authData?.data) {
          navigate(path.auth)
        } else {
          console.log(authData?.data, 'userDatasssss')

          await dispatch(getAllPosts())
          await dispatch(findUserProfile())
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      {isLoading && <Preloader />}
      <div className="Home" style={{ backgroundImage: `URL(${back})` }}>
        <ProfileSide />
        <PostSide postData={postData} />
        <RightSide />
      </div>
    </>
  )
}

export default Home
