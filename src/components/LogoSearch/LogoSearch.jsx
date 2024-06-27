/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import './LogoSearch.css'
import Logo from '../../img/logo.png'
import { UilSearch } from '@iconscout/react-unicons'
// import { getAllUser } from '../../api/UserRequest'
// import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { path } from '../../paths/paths'
import { appConfig } from '../../config/appConfig'
import { createUserChat } from '../../actions/chat.actions'
import { findUserProfile } from '../../actions/user.actions'
import defaultProfile from '../../img/default-profile.jpg'

const LogoSearch = ({ isChat = false }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [users, setUsers] = useState([])
  const [searchText, setSearchText] = useState('')
  const [data, setData] = useState([])
  const [connection, setConnection] = useState(false)
  const userData = useSelector((state) => state.authReducer.authData)
  const chatDatas = useSelector((state) => state.chatReducer.chats)

  useEffect(() => {
    dispatch(findUserProfile())
  }, [dispatch])

  useEffect(async() => {
    const fetchPersons = async () => {
      const combined = [
        ...userData?.data?.followers,
        ...userData?.data?.followings,
      ]

      // Use a Set to filter out duplicates based on the 'id' property
      const unique = [...new Set(combined)]
      console.log(unique,"uniqueeee----------");
      setUsers(unique)
    }
   await fetchPersons()
  }, [userData?.data])
  // const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const findUser = () => {
    const filteredUsers = users.filter((user) => {
      const matchesSearchText = user?.firstName
        ?.toLowerCase()
        .includes(searchText.toLowerCase())
      console.log(matchesSearchText, 'matchText', user?.firstName)

      if (matchesSearchText) {
        const isUserInChat = chatDatas?.data.some((chat) => {
          return chat?.members.some((member) => member?._id === user?._id)
        })

        // Only include user if they are not in any chat
        return !isUserInChat
      }

      return false
    })
    setData(filteredUsers)
    setSearchText('')
    console.log(filteredUsers)
  }

  const handleChat = async (senderId) => {
    // alert(senderId)
    await dispatch(createUserChat({ receiverId: senderId }))
    try {
      if (data) {
        setConnection((prev) => !prev)
      }
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(users,"poiuytrewsdfgh------------");

  const ProfileImage = ({ src }) => {
    const handleError = (event) => {
      event.target.src = defaultProfile
    }

    return (
      <img
        className="FollowerImg l-image"
        src={src}
        alt="Follower"
        onError={handleError}
      />
    )
  }
  return (
    <>
      {isChat && (
        <div className="LogoSearch">
          <img src={Logo} style={{ width: '4rem' }} />
          <div className="Search">
            <input
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="#Find connections"
            />
            <div  className="s-icon" onClick={findUser}>
              <UilSearch />
            </div>
          </div>
        </div>
      )}

      {data &&
        data.map((d) => (
          <div className="flex justify-between items-center mx-4 mt-2 border-[1px] bg-white hover:bg-gray-200 cursor-pointer rounded-[10px] p-1">
            <div className='flex gap-8 md:gap-4 items-center'>
            <div className='w-[50px]'>
            <ProfileImage
              src={`${appConfig.awsBucketUrl}/${d?.profileImage}`}
            />
            </div>
            {/* <img
              src={`${appConfig.awsBucketUrl}/${d?.profileImage}`}
              alt=""
              className="FollowerImg l-image"
            /> */}
            <h5 className='text-start'>
              {d?.firstName} 
              {d?.lastName}
            </h5>
            </div>
            {/* <Link to="/chat" style={{textDecoration:"none"}} > */}

            <div className="flex items-center justify-center h-full mb-[0.5rem]">
            <input
              type="button"
              name={d._id}
              className="button l-button items-center "
              value="  Connect  "
              onClick={(e) => {
                if (userData?.data) {
                  handleChat(e.target.name)
                }
              }}
            />
            </div>
            {/* </Link> */}

            {/* <button  className='button l-button'  onClick={handleChat} >Chat</button> */}
          </div>
        ))}

      {connection ? (
        <span className="">Start converstion via chat box</span>
      ) : (
        <span className="">Create connection</span>
      )}
    </>
  )
}

export default LogoSearch
