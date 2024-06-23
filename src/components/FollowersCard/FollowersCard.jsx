/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react'
import './FollowersCard.css'

import defaultImage from '../../img/profileImg.jpg'

import { Followers } from '../../Data/FollowersData'
import { ColorInput } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  findUserProfile,
  followUnFollowUser,
  getAllUsers,
} from '../../actions/user.actions'
import { path } from '../../paths/paths'
import { appConfig } from '../../config/appConfig'
const FollowersCard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [followers, setFollowers] = useState([])
  const [page, setPage] = useState(1)

  const authData = useSelector((state) => state.authReducer.authData)
  const users = useSelector((state) => state.authReducer.users)
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

  // useEffect(() => {
  //   // const followings = authData?.data?.followings ?? []
  //   // const followerss = authData?.data?.followers ?? []

  //   const filterFollowers = authData?.data?.followers?.map((follower) => {
  //     if (
  //       Array.isArray(followings) &&
  //       followings.some((following) => following._id === follower._id)
  //     ) {
  //       follower.isFollowing = true
  //     }
  //     return follower
  //   })

  //   setFollowers(filterFollowers)
  // }, [authData])

  const handleFollowUnFollow = async (userId) => {
    dispatch(followUnFollowUser(userId))
    // const newFollowers = await followers?.map((follower) => {
    //   if (follower?._id === userId) {
    //     alert("calling")
    //     follower?.followers.push(userId)
    //     console.log(follower,"newFollower",userId);
    //     return follower
    //   }
    //   return follower
    // })
    // setFollowers(newFollowers)
  }

  useEffect(() => {
    dispatch(getAllUsers(page))
  }, [page])
  useEffect(() => {
    setFollowers(users?.data)
  }, [users])
  const lastPage = page * 10 < users?.totalCount

  console.log(users, 'foloowerj', authData)
  const FollowerImage = ({ src }) => {
    const handleError = (event) => {
      event.target.src = defaultImage
    }

    return (
      <img
        src={src}
        alt="Follower"
        className="followerImage"
        onError={handleError}
      />
    )
  }

  return (
    <div className="FollowersCard">
      <h3>Who is following you</h3>

      {followers?.map((follower, id) => {
        return (
          <div className="follower">
            <div>
              <FollowerImage
                src={`${appConfig?.awsBucketUrl}/${follower?.profileImage}`}
              />
              <div className="name">
                <span>{follower?.firstName}</span>
                <span>@{follower?.userName}</span>
              </div>
            </div>
            <button
              onClick={() => handleFollowUnFollow(follower?._id)}
              className="button fc-button"
              style={{ color: 'black' }}
            >
              {follower?.isFollowing ? 'UnFollow' : 'Follow'}
            </button>
          </div>
        )
      })}
      {lastPage && (
        <span
          style={{ cursor: 'pointer', color: 'orange' }}
          onClick={() => setPage(page + 1)}
        >
          readMore...
        </span>
      )}
    </div>
  )
}

export default FollowersCard
