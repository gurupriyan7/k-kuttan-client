import React, { useEffect } from 'react'
import Cover from '../../img/cover.jpg'
import Profile from '../../img/profileImg.jpg'
import './ProfileCard.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { path } from '../../paths/paths'
import { appConfig } from '../../config/appConfig'

const  ProfileCard = ({ isProfile = false }) => {
  const navigate = useNavigate()
  const authData = useSelector((state) => state.authReducer.authData)
  const ProfilePage = true

  const handleClick = () => {
    if (authData?.data) {
      navigate(path.profile)
    }
  }

  return (
    <div
      onClick={handleClick}
      className="ProfileCard"
      style={{
        color: 'black',
        cursor: 'pointer',
        maxWidth: isProfile ? 'none' : '20rem',
      }}
    >
      <div className="ProfileImages">
        <img
          src={
            authData?.data?.coverImage
              ? `${appConfig.awsBucketUrl}/${authData?.data?.coverImage}`
              : Cover
          }
          alt=""
        />
        <img
          src={
            authData?.data?.profileImage
              ? `${appConfig.awsBucketUrl}/${authData?.data?.profileImage}`
              : Profile
          }
          alt=""
        />
      </div>

      <div className="ProfileName">
        <span> {authData?.data ? authData?.data?.userName : ''} </span>
        <span>
          {authData?.data
            ? `${authData?.data?.firstName} ${authData?.data?.lastName}`
            : ''}
        </span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{authData?.data?.followings?.length ?? 0}</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{authData?.data?.followers?.length ?? 0}</span>
            <span>Followers</span>
          </div>

          {ProfilePage && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{authData?.data?.postCount ?? 0}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {ProfilePage ? '' : <span>My Profile</span>}
    </div>
  )
}

export default ProfileCard
