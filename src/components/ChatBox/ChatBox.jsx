import React, { useEffect, useState } from 'react'
// import { addMessage, getMessages } from '../../api/MessageRequest'
// import { getUser } from '../../api/UserRequest'
import './ChatBox.css'
import { format } from 'timeago.js'
import InputEmoji from 'react-input-emoji'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { appConfig } from '../../config/appConfig'
import { createMessage, findUserMessages } from '../../actions/chat.actions'
const ChatBox = ({
  chat,
  currentUser,
  setSendMessage,
  recieveMessage,
  room,
}) => {
  const authData = useSelector((state) => state.authReducer.authData)
  const messageDatas = useSelector((state) => state.chatReducer.messages)
  const [userData, setUserData] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [chatUser, setChatUser] = useState(null)
  const scroll = useRef()
  const dispatch = useDispatch()
  const handleChange = (newMessage) => {
    setNewMessage(newMessage)
  }
  //fetching data for header of chat box
  useEffect(() => {
    const chatMember = chat?.members?.find(
      (member) => member?._id !== authData?.data?._id,
    )
    setChatUser(chatMember, 'chatMemger????????????')
    // const chatMember = chat?.members?.find(
    //   (member) => member !== authData?.data?._id,
    // )
    const getUserData = async () => {
      try {
        const { data } = {}
        //   await getUser(userId);
        setUserData(authData?.data)
      } catch (error) {
        console.log(error)
      }
    }
    if (chat !== null) {
      getUserData()
    }
  }, [authData?.data, chat, currentUser])

  useEffect(() => {
    console.log(messageDatas, '....data')
    setMessages(messageDatas)
  }, [messageDatas])

  //fetching data for messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        dispatch(findUserMessages(chat?._id))
        //   await getMessages(chat._id)
        setMessages(messageDatas)
        // console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    if (chat !== null) {
      fetchMessages()
    }
  }, [chat])
  // const { user } = useSelector((state) => state.authReducer.authData)
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' })
    console.log(messages, 'messages', messageDatas)
  }, [messages])

  const handleSend = async (e) => {
    e.preventDefault()
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat?._id,
    }

    //send message to data base
    try {
      dispatch(createMessage(message))
      const { data } = ''
      // await addMessage(message)
      // setMessages([...messages, data])
      setNewMessage('')
    } catch (error) {
      console.log(error)
    }

    //set msg to socket server
    const recieverId = chat?.members.find((id) => id?._id !== currentUser)
    console.log(recieverId,"receiverIdddddd");
    setSendMessage({ ...message, recieverId:recieverId?._id })
  }
  useEffect(() => {
    console.log(recieveMessage, 'receiveMessage')
    if (recieveMessage !== null && recieveMessage?.chatId === chat?._id) {
      setMessages([...messages, recieveMessage])
    }
  }, [recieveMessage])

  //always scroll to top

  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower">
                <div>
                  {!room && (
                    <img
                      src={`${appConfig.awsBucketUrl}/${chatUser?.profileImage}`}
                      alt=""
                      className="followerImage"
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                      }}
                    />
                  )}
                  <div className="name" style={{ fontSize: '0.8rem' }}>
                    <span>
                      {room ? chat.name : chatUser?.firstName}
                      {/* {chatUser?.lastname} */}
                    </span>
                  </div>
                </div>
              </div>
              <hr style={{ width: '85%', border: '0.1px solid #ececec' }} />
            </div>
            {/* chat box message */}
            <div className="chat-body">
              {messages?.map((message) => (
                <>
                  <div
                    ref={scroll}
                    className={
                      message?.senderId === currentUser
                        ? 'message own'
                        : 'message'
                    }
                  >
                    <span>{message.text}</span>
                    <span>{format(message.createdAt)}</span>

                    {room && message.name}
                  </div>
                </>
              ))}
            </div>
            <div className="chat-sender">
              <div>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div className="send-button button" onClick={handleSend}>
                Send
              </div>
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  )
}

export default ChatBox
