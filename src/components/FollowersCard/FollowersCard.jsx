/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react'
import './FollowersCard.css'

import { Followers } from '../../Data/FollowersData'
import { ColorInput } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { findUserProfile } from '../../actions/user.actions'
import { path } from '../../paths/paths'
const FollowersCard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const authData = useSelector((state) => state.authReducer.authData)

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

  return (
    <div className="FollowersCard">
      <h3>Who is following you</h3>

      {Followers.map((follower, id) => {
        return (
          <div className="follower">
            <div>
              <img src={follower.img} alt="" className="followerImage" />
              <div className="name">
                <span>{follower.name}</span>
                <span>@{follower.username}</span>
              </div>
            </div>
            <button className="button fc-button" style={{ color: 'black' }}>
              Follow
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default FollowersCard
