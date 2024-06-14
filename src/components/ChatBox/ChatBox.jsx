import React, { useEffect, useState } from 'react'
// import { addMessage, getMessages } from '../../api/MessageRequest'
// import { getUser } from '../../api/UserRequest'
import './ChatBox.css'
import { format } from 'timeago.js'
import InputEmoji from 'react-input-emoji'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { appConfig } from '../../config/appConfig'
const ChatBox = ({
  chat,
  currentUser,
  setSendMessage,
  recieveMessage,
  room,
}) => {


  const authData = useSelector((state) => state.authReducer.authData)
  const [userData, setUserData] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const scroll = useRef()
  const handleChange = (newMessage) => {
    setNewMessage(newMessage)
  }
  //fetching data for header of chat box
  useEffect(() => {
  // const chatMember = chat.members.find((member) => member !== authData?.data?._id)
  const chatMember = chat.members.find((member) => member !== authData?.data?._id)
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
  }, [chat, currentUser])

  //fetching data for messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = ''
        //   await getMessages(chat._id)
        setMessages(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    if (chat !== null) {
      fetchMessages()
    }
  }, [chat])
  const { user } = useSelector((state) => state.authReducer.authData)
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (e) => {
    e.preventDefault()
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat?._id,
      name: user?.firstName,
    }

    //send message to data base
    try {
      const { data } = ''
      // await addMessage(message)
      setMessages([...messages, data])
      setNewMessage('')
    } catch (error) {
      console.log(error)
    }

    //set msg to socket server
    const recieverId = chat?.members.filter((id) => id !== currentUser)
    setSendMessage({ ...message, recieverId })
  }
  useEffect(() => {
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
                      src={`${appConfig.awsBucketUrl}/${userData?.profileImage}`}
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
                      {room ? chat.name : userData?.firstName}
                      {/* {userData?.lastname} */}
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
