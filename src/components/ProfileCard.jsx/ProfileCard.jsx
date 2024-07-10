import React, { useEffect, useState } from 'react'
import Cover from '../../img/cover.jpg'
import Profile from '../../img/profileImg.jpg'
import './ProfileCard.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { path } from '../../paths/paths'
import { appConfig } from '../../config/appConfig'
import defaultProfile from '../../img/default-profile.jpg'
import defaultCover from '../../img/post-default.png'
const ProfileCard = ({ isProfile = false,authorData,isAuthorProfile=false}) => {
  const navigate = useNavigate()
  const authData = useSelector((state) => state.authReducer.authData)
  const ProfilePage = true

  const [userData,setUserData]=useState({});
  useEffect(()=>{
if( isAuthorProfile&&authorData ){
  setUserData(authorData)
}else{
  setUserData(authData?.data)
}
  },[authorData,authData])
  const handleClick = () => {
    if (authData?.data&&!isAuthorProfile) {
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
  console.log(userData?.profileImage,"auth-data-auth");
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
          src={`${appConfig?.awsBucketUrl}/${userData?.coverImage}`}
        />
        <ProfileImage
          src={`${appConfig?.awsBucketUrl}/${userData?.profileImage}`}
        />
      </div>

      <div className="ProfileName">
        <span> {userData ? userData?.userName : ''}  </span>
        <span>
          {userData
            ? `${userData?.firstName} ${userData?.lastName}`
            : ''}
        </span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{userData?.followings?.length ?? 0}</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{userData?.followers?.length ?? 0}</span>
            <span>Followers</span>
          </div>

          {ProfilePage && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{userData?.postCount ?? 0}</span>
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