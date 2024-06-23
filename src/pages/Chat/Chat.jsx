/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
// import { userChats } from "../../api/ChatRequest";
import Preloader from '../../components/Preloader/Preloader'
import Conversations from '../../components/Conversations/Conversations'
import LogoSearch from '../../components/LogoSearch/LogoSearch'
import Home from '../../img/home.png'
import { io } from 'socket.io-client'
import Comment from '../../img/comment.png'
import { UilSetting } from '@iconscout/react-unicons'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import './Chat.css'
import ChatBox from '../../components/ChatBox/ChatBox'
import { findUserChats } from '../../actions/chat.actions'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
const Chat = () => {
  const [isLoading, setIsLoading] = useState(false)
  const authData = useSelector((state) => state.authReducer.authData)
  const authLoading = useSelector((state) => state.authReducer.isLoading)
  const chatDatas = useSelector((state) => state.chatReducer.chats)
  const chatLoading = useSelector((state) => state.chatReducer.isLoading)

  console.log(chatDatas, 'chats-----------------------')

  const dispatch = useDispatch()

  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [sendMessage, setSendMessage] = useState(null)
  const [recieveMessage, setRecieveMessage] = useState(null)
  const socket = useRef()

  useEffect(() => {
    socket.current = io('https://k-kuttan-socket-5c70463a5ea1.herokuapp.com/')
    socket.current.emit('new-user-add', authData?.data?._id)
    socket.current.on('get-users', (users) => {
      setOnlineUsers(users)
    })
  }, [])

  //send message
  useEffect(() => {
    // alert(sendMessage)
    if (sendMessage !== null) {
      socket.current.emit('send-message', sendMessage)
    }
  }, [sendMessage])

  useEffect(() => {
    if (chatLoading || authLoading) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [chatLoading, authLoading])

  //recieve message

  useEffect(() => {
    socket.current.on('receive-message', (data) => {
      console.log(data, 'receive message')
      setRecieveMessage(data)
    })

    // // Clean up listener on unmount
    // return () => {
    //   socket.current.off('recieve-message')
    // }
  }, [])

  const getChats = async () => {
    try {
      await dispatch(findUserChats(false))

      console.log()
      setChats(chatDatas?.data)
      // console.log(chatDatas, 'gurururu')
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getChats()
  }, [authData?.data])

  console.log(currentChat, 'NEW CHAT')

  const checkOnlineStatus = (chat) => {
    const chatMember = chat?.members?.find(
      (member) => member?._id !== authData?.data?._id,
    )
    // console.log(chatMember,"chatMember",authData?.data,"MEMBER",chat);

    const online = onlineUsers?.find((user) => user?.userId === chatMember?._id)
    return online ? true : false
  }

  return (
    <>
      {isLoading && <Preloader />}

      <div className=" grid md:grid-cols-[22%_auto] gap-4  relative overflow-hidden">
        {/* left side */}

        <div className="Left-side-chat w-full   min-w-[300px] z-100 mt-2 px-1 overflow-hidden">
          <LogoSearch isChat={true} />

          <div className="Chat-container overflow-hidden">
            <h2>Chats</h2>
            <div className="Chat-list">
              {chats?.map((chat) => (
                <div onClick={() => setCurrentChat(chat)}>
                  <Conversations
                    data={chat}
                    currentUserId={authData?.data?._id}
                    online={checkOnlineStatus(chat)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* right side */}

        <div className="Right-side-chat overflow-hidden">
          <div
            style={{ width: '20rem', alignSelf: 'flex-end' }}
            className=" fixed md:static bottom-10  mx-auto md:mx-0 left-0 right-0 md:pr-2"
          >
            <div className="navIcons ">
              <Link to="../">
                {' '}
                <img src={Home} style={{ width: '1.5rem' }} alt="" />
              </Link>

              <Link to="../explore">
                {' '}
                <WhatshotIcon />
              </Link>

              <Link to="../chat">
                <img src={Comment} alt="" />
              </Link>
              <Link to="../room">
                <MeetingRoomIcon />
              </Link>
            </div>
          </div>
          {console.log(currentChat?._id, 'CURRENT')}
          {currentChat && (
            <div className="absolute md:static rounded-[12px] left-0 right-0 bottom-0 w-full h-[95vh] bg-white">
              <ChatBox
                chatId={currentChat?._id}
                currentUser={authData?.data?._id}
                setSendMessage={setSendMessage}
                recieveMessage={recieveMessage}
                room={false}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Chat
