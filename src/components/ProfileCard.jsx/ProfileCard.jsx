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
import UsersList from '../UsersList/UsersList'
const ProfileCard = ({ isProfile = false, authorData, isAuthorProfile = false }) => {
  const navigate = useNavigate()
  const authData = useSelector((state) => state.authReducer.authData)
  const ProfilePage = true
  const [list, setList] = useState(null)

  const [userData, setUserData] = useState({});
  useEffect(() => {
    if (isAuthorProfile && authorData) {
      setUserData(authorData)
    } else {
      setUserData(authData?.data)
    }
  }, [authorData, authData])
  const handleClick = () => {
    if (authData?.data && !isAuthorProfile) {
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
  console.log(userData?.profileImage, "auth-data-auth");
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
        <p className='view-profile'>View Profile</p>
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
          <button onClick={() => setList({ label: 'Followings', isFollower:false })} className="follow">
            <span>{userData?.followings?.length ?? 0}</span>
            <span>Followings</span>
          </button>
          <div className="vl"></div>
          <button onClick={() => setList({ label: "Followers", isFollower:true })} className="follow">
            <span>{userData?.followers?.length ?? 0}</span>
            <span>Followers</span>
          </button>

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

      {list &&!isAuthorProfile&& <UsersList isProfile={isProfile} isFollower={list.isFollower} label={list.label} close={() => setList(null)} />}
    </div>
  )
}

export default ProfileCard

