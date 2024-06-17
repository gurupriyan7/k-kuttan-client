/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react'
import './FollowersCard.css'

import { Followers } from '../../Data/FollowersData'
import { ColorInput } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { findUserProfile, followUnFollowUser } from '../../actions/user.actions'
import { path } from '../../paths/paths'
import { appConfig } from '../../config/appConfig'
const FollowersCard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [followers, setFollowers] = useState([])

  const authData = useSelector((state) => state.authReducer.authData)
  console.log(authData, 'authData')

  useEffect(async () => {
    const fetchData = async () => {
      try {
        if (!authData) {
          navigate(path.auth)
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    fetchData()
  }, [authData])

  useEffect(() => {
    const followings = authData?.data?.followings ?? []
    const followerss = authData?.data?.followers ?? []

    const filterFollowers = followerss?.map((follower) => {
      if (
        Array.isArray(followings) &&
        followings.some((following) => following._id === follower._id)
      ) {
        follower.isFollowing = true
      }
      return follower
    })

    setFollowers(filterFollowers)
  }, [authData])

  const handleFollowUnFollow = async(userId)=>{
dispatch(followUnFollowUser(userId))
  }

  console.log(followers, 'foloowerj')

  return (
    <div className="FollowersCard">
      <h3>Who is following you</h3>

      {followers?.map((follower, id) => {
        return (
          <div className="follower">
            <div>
              <img
                src={`${appConfig?.awsBucketUrl}/${follower?.profileImage}`}
                alt=""
                className="followerImage"
              />
              <div className="name">
                <span>{follower?.firstName}</span>
                <span>@{follower?.userName}</span>
              </div>
            </div>
            <button onClick={()=>handleFollowUnFollow(follower?._id)} className="button fc-button" style={{ color: 'black' }}>
              {follower?.isFollowing ? 'UnFollow' : 'Follow'}
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default FollowersCard
