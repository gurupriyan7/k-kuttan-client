import React, { useEffect } from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../ProfileCard.jsx/ProfileCard'

import './ProfileSide.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { path } from '../../paths/paths';
// import { path } from '../../paths/paths'
const ProfileSide = () => {
  const navigate = useNavigate()

  const authData = useSelector((state) => state.authReducer.authData)

  // useEffect(() => {
  //   if (!authData?.data) {
  //     navigate(path.auth)
  //   }
  // }, [authData])

const login = ()=>{
  navigate(path.auth)
}

  return (
    <div className="ProfileSide">
      <LogoSearch />
      <ProfileCard />
      {authData?.data ? (
        <FollowersCard />
      ) : (
        <span onClick={login} style={{ backgroundColor: 'orange', cursor: 'pointer',padding:".3rem 9rem",borderRadius:"1rem",marginBottom:".5rem" }}>
          Login
        </span>
      )}
    </div>
  )
}

export default ProfileSide
