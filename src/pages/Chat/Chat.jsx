/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
// import { userChats } from "../../api/ChatRequest";
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
const Chat = () => {
  const authData = useSelector((state) => state.authReducer.authData)
  const chatDatas = useSelector((state) => state.chatReducer.chats)

console.log(chatDatas,"chats");

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
    if (sendMessage !== null) {
      socket.current.emit('send-message', sendMessage)
    }
  }, [sendMessage])

  //recieve message

  useEffect(() => {
    socket.current.on('receive-message', (data) => {
      console.log(data, "receive message");
      setRecieveMessage(data);
    });

    // Clean up listener on unmount
    return () => {
      socket.current.off('recieve-message');
    };
  }, []);

  const getChats = async () => {
    try {
      await dispatch(findUserChats())

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

  console.log(currentChat,"NEW CHAT")

  const checkOnlineStatus = (chat) => {
    const chatMember = chat?.members?.find((member) => member?._id !== authData?.data?._id)
    // console.log(chatMember,"chatMember",authData?.data,"MEMBER",chat);

    const online = onlineUsers?.find((user) => user?.userId === chatMember?._id)
    return online ? true : false
  }
  return (
    <>
      <div className="Chat">
        {/* left side */}

        <div className="Left-side-chat">
          <LogoSearch />

          <div className="Chat-container">
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

        <div className="Right-side-chat">
          <div style={{ width: '20rem', alignSelf: 'flex-end' }}>
            <div className="navIcons">
              <Link to="../home">
                {' '}
                <img src={Home} alt="" />
              </Link>

              <Link to="../trending">
                {' '}
                <WhatshotIcon />
              </Link>

              <Link to="../chat">
                <img src={Comment} alt="" />
              </Link>
              <UilSetting />
            </div>
          </div>
          {console.log(currentChat,"CURRENT")}
          <ChatBox
            chat={currentChat}
            currentUser={authData?.data?._id}
            setSendMessage={setSendMessage}
            recieveMessage={recieveMessage}
          />
        </div>
      </div>
    </>
  )
}

export default Chat
