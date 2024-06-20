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

const LogoSearch = () => {
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

  // if (!userData?.data) {
  //   navigate(path.auth)
  // }
  const followers = userData?.data?.followers ?? []
  const followings = userData?.data?.followings ?? []
  const followersArray = Array.isArray(followers) ? followers : []
  const followingsArray = Array.isArray(followings) ? followings : []

  useEffect(() => {
    const fetchPersons = async () => {
      const combined = [...followersArray, ...followingsArray]

      // Use a Set to filter out duplicates based on the 'id' property
      const unique = [...new Set(combined)]
      setUsers(unique)
    }
    fetchPersons()
  }, [followers, followings])
  // const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const findUser = () => {
    console.log(searchText, 'searchText', users)

    console.log(users, 'users')
    const filteredUsers = users.filter((user) => {
      console.log(user?.firstName, 'usersssssssss')
      // Check if user's first name includes the search text (case insensitive)
      const matchesSearchText = user?.firstName
        ?.toLowerCase()
        .includes(searchText.toLowerCase())
      console.log(matchesSearchText, 'matchText', user?.firstName)

      if (matchesSearchText) {
        // Iterate through chat data to check if the user is part of any chat
        const isUserInChat = chatDatas?.data.some((chat) => {
          return chat?.members.some((member) => member?._id === user?._id)
        })
        console.log(isUserInChat, 'isUserInChat', user?.firstName)

        // Only include user if they are not in any chat
        return !isUserInChat
      }

      return false
    })

    console.log(filteredUsers, 'data', users, 'apple')
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
  return (
    <>
      <div className="LogoSearch">
        <img src={Logo} style={{ width: '4rem' }} />
        <div className="Search">
          <input
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="#Find connections"
          />
          <div className="s-icon" onClick={findUser}>
            <UilSearch />
          </div>
        </div>
      </div>

      {data &&
        data.map((d) => (
          <div className="logoDiv">
            <img
              src={`${appConfig.awsBucketUrl}/${d?.profileImage}`}
              alt=""
              className="FollowerImg l-image"
            />

            <h5>
              {d?.firstName} {d?.lastName}
            </h5>
            {/* <Link to="/chat" style={{textDecoration:"none"}} > */}
            <input
              type="button"
              name={d._id}
              className="button l-button"
              value="  Connect  "
              onClick={(e) => {
                if (userData?.data) {
                  handleChat(e.target.name)
                }
              }}
            />
            {/* </Link> */}

            {/* <button  className='button l-button'  onClick={handleChat} >Chat</button> */}
          </div>
        ))}

      {connection ? (
        <span className=''>Start converstion via chat box</span>
      ) : (
        <span className=''>Create connection</span>
      )}
    </>
  )
}

export default LogoSearch
