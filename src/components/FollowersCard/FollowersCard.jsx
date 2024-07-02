/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react'
import './FollowersCard.css'

import defaultImage from '../../img/default-profile.jpg'

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

  const handleFollowUnFollow = async (e, userId) => {
    e.preventDefault()
    await handleFollowToggle(userId)
    dispatch(followUnFollowUser(userId))
  }

  useEffect(() => {
    dispatch(getAllUsers(page))
  }, [page])
  useEffect(() => {
    setFollowers(users?.data)
  }, [users])
  const lastPage = page * 10 < users?.totalCount

  const handleFollowToggle = async (userId) => {
    const updatedUsers = followers.map((user) => {
      if (user._id === userId) {
        return { ...user, isFollowing: !user.isFollowing }
      }
      return user
    })
    setFollowers(updatedUsers)
  }
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
    <div className="FollowersCard text-orange-500 font-[800]">
      <h3>Who is following you</h3>

      {followers?.map((follower, id) => {
        return (
          <div className="follower" id={`${id}-${follower?._id}`}>
            <div>
              <FollowerImage
                src={
                  `${appConfig?.awsBucketUrl}/${follower?.profileImage}` ??
                  defaultImage
                }
              />
              <div className="name text-white">
                <span>{follower?.firstName}</span>
                <span>@{follower?.userName}</span>
              </div>
            </div>
            <button
              onClick={(e) => handleFollowUnFollow(e, follower?._id)}
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
