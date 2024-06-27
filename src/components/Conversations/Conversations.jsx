import React, { useEffect, useState } from 'react'
import { appConfig } from '../../config/appConfig'
import { useSelector } from 'react-redux'
// import { getUser } from "../../api/UserRequest";

const Conversations = ({ data, currentUserId, online }) => {
  const [userData, setUserData] = useState(null)
  // const userData = useSelector((state) => state.authReducer.authData)
  console.log(data, 'data')

  useEffect(() => {
    const member = data.members.find((member) => member?._id !== currentUserId)

    const getUserData = async () => {
      try { 
        setUserData(member)
      } catch (error) {
        console.log(error)
      }
    }
    getUserData()
  }, [])
  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
          <img
            // src={
            //   userData?.profilePicture
            //     ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture
            //     : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"
            // }
            src={`${appConfig.awsBucketUrl}/${userData?.profileImage}`}
            alt=""
            className="followerImage"
            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
          />
          <div className="name" style={{ fontSize: '0.8rem' }}>
            <span>
              {userData?.firstName} {userData?.lastName}
            </span>
            <span>{online ? 'Online' : 'Offline'}</span>
          </div>
        </div>
      </div>
      <hr style={{ width: '85%', border: '0.1px solid #ececec' }} />
    </>
  )
}

export default Conversations
