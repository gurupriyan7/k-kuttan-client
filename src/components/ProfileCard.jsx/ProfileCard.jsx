import React, { useEffect } from 'react'
import Cover from '../../img/cover.jpg'
import Profile from '../../img/profileImg.jpg'
import './ProfileCard.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { path } from '../../paths/paths'
import { appConfig } from '../../config/appConfig'
import defaultProfile from '../../img/default-profile.jpg'
import defaultCover from '../../img/post-default.png'

const ProfileCard = ({ isProfile = false }) => {
  const navigate = useNavigate()
  const authData = useSelector((state) => state.authReducer.authData)
  const ProfilePage = true

  const handleClick = () => {
    if (authData?.data) {
      navigate(path.profile)
    }
  }

  const ProfileImage = ({ src }) => {
    const handleError = (event) => {
      event.target.src = defaultProfile
    }

    return <img src={src} alt="Follower" onError={handleError} />
  }
  const CoverImage = ({ src }) => {
    const handleError = (event) => {
      event.target.src = defaultCover
    }

    return <img src={src} alt="Follower" onError={handleError} />
  }
  // alert(authData?.data?.ProfileImage)
  console.log(authData?.data?.profileImage,"auth-data-auth");

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
        <CoverImage
          src={`${appConfig?.awsBucketUrl}/${authData?.data?.coverImage}`}
        />
        <ProfileImage
          src={`${appConfig?.awsBucketUrl}/${authData?.data?.profileImage}`}
        />
      </div>

      <div className="ProfileName">
        <span> {authData?.data ? authData?.data?.userName : ''}  </span>
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
