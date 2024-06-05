import React, { useEffect } from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../ProfileCard.jsx/ProfileCard'

import './ProfileSide.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { path } from '../../paths/paths'
const ProfileSide = () => {
  const navigate = useNavigate()

  const authData = useSelector((state) => state.authReducer.authData)

  useEffect(() => {
    if (!authData?.data) {
      navigate(path.auth)
    }
  }, [authData])

  return (
    <div className="ProfileSide">
      <LogoSearch />
      <ProfileCard />
      <FollowersCard />
    </div>
  )
}

export default ProfileSide
