import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Home from '../../img/home.png'
import { io } from 'socket.io-client'
import Comment from '../../img/comment.png'
import { UilSetting } from '@iconscout/react-unicons'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import WhatshotIcon from '@mui/icons-material/Whatshot'
import Preloader from '../../components/Preloader/Preloader'
import './Room.css'
import ChatBox from '../../components/ChatBox/ChatBox'
import axios from 'axios'
import RoomModal from '../../components/RoomModal/RoomModal'
import {
  findUserRooms,
  joinRoomAction,
  findAllRooms,
} from '../../actions/room.actions'
import { findUserChats } from '../../actions/chat.actions'
import { getAllRooms, joinRoom } from '../../api/RoomRequest'
import Conversations from '../../components/Conversations/Conversations'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { getRoomChats, getRooms, joinRoom } from "../../api/RoomRequest";

const Room = () => {
  const dispatch = useDispatch()
  const [isLoading,setIsLoading]=useState(false)
  const authData = useSelector((state) => state.authReducer.authData)
  const authDataLoading = useSelector((state) => state.authReducer.isLoading)
 
  const roomDatas = useSelector((state) => state.roomReducer.rooms)
  const roomDatasLoading = useSelector((state) => state.roomReducer.isLoading)
  
  const userRoomDatas = useSelector((state) => state.roomReducer.userRooms)
  
  const userRoomDatasLoading = useSelector((state) => state.roomReducer.isLoading)
 const chatDatas = useSelector((state) => state.chatReducer.chats)

 const chatDatasLoading = useSelector((state) => state.chatReducer.isLoading)

  // console.log(roomDatas, "DATA#")

  const [rooms, setRooms] = useState([])
  const [chats, setChats] = useState([])
  const [joinedList, setJoinedList] = useState([])
  // console.log(chats,"CHATS")
  const [currentChat, setCurrentChat] = useState(null)
  const [roomId, setRoomId] = useState('')
  const [chatRoomName, setChatRoomName] = useState('')
  const [onlineUsers, setOnlineUsers] = useState([])
  const [sendMessage, setSendMessage] = useState(null)
  const [recieveMessage, setRecieveMessage] = useState(null)
  const [modalOpened2, setModalOpened2] = useState(false)
  const socket = useRef()


  useEffect(() => {
    socket.current = io('https://k-kuttan-socket-5c70463a5ea1.herokuapp.com/')
    socket.current.emit('new-user-add', authData?.data?._id)
    socket.current.on('get-users', (users) => {
      setOnlineUsers(users)
    })
  }, [authData])

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit('send-message', sendMessage)
    }
  }, [sendMessage])

  useEffect(() => {
    socket.current.on('receive-message', (data) => {
      setRecieveMessage(data)
    })
    // Clean up listener on unmount
    return () => {
      socket.current.off('recieve-message')
    }
  }, [])
  useEffect(()=>{
    if(authDataLoading||roomDatasLoading||userRoomDatasLoading||chatDatasLoading){
      setIsLoading(true)
    }else{
      setIsLoading(false)
    }

  },[authDataLoading,roomDatasLoading,userRoomDatasLoading,chatDatasLoading])
  const handleJoin = async () => {
    const userId = authData?.data?._id
    if (!roomId) return
    try {
      await dispatch(joinRoomAction(roomId))
      alert('Joined successfully')
    } catch (error) {
      console.error('Error config:', error.config)
    }
  }


  const fetchRoomListJoined = async () => {
    await dispatch(findUserRooms())
    setJoinedList(userRoomDatas)
  }

  useEffect(() => {
    fetchRoomListJoined()
  }, [])
  useEffect(() => {
    setJoinedList(userRoomDatas)
  }, [userRoomDatas])

  const getRooms = async () => {
    try {
      await dispatch(findAllRooms())
      // const response = await getUserRooms()
      setRooms(roomDatas)
    } catch (error) {
      console.error(error)
    }
  }

  const getChats = async () => {
    try {
      await dispatch(findUserChats())

      // console.log()
      setChats(chatDatas?.data)
      // console.log(chatDatas, 'gurururu')
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getChats()
  }, [authData?.data])

  useEffect(() => {
    getAllRooms()
    getRooms()

    // joinRoom()
  }, [authData])


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
    {isLoading && <Preloader/>}
      <div className="Chat">
        {/* Left side */}
        <div className="Left-side-chat">
          <select
            onChange={(e) => setRoomId(e.target.value)}
            className="infoInput"
          >
            <option value="" disabled selected>
              Select a room
            </option>
            {rooms?.map((room) => (
              <option key={room._id} value={room._id}>
                {room.name}
              </option>
            ))}
          </select>
          <button
            className="button"
            onClick={handleJoin}
            style={{ height: '2rem' }}
          >
            Join
          </button>

          <div className="Chat-container">
            <h2>Rooms</h2>
            <div className="Chat-list">
              {joinedList &&
                joinedList?.map((list) => (
                  <div
                    style={{ cursor: 'pointer' }}
                    key={list?._id}
                    onClick={() => {
                      setCurrentChat(list?.chatId)
                      setChatRoomName(list?.name)
                    }}
                  >
                    <span>{list?.name}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Right side */}
        {/* <div className="Right-side-chat">
          <div style={{ width: "20rem", alignSelf: "flex-end" }}>
            <div className="navIcons">
              <button
                className="button"
                style={{ width: "5rem", height: "2rem" }}
                onClick={() => setModalOpened(true)}
              >
                Create Room
              </button>
              <RoomModal
                modalOpened={modalOpened}
                setModalOpened={setModalOpened}
              />
              <Link to="../home">
                <img src={Home} alt="Home" />
              </Link>
              <Link to="../trending">
                <WhatshotIcon />
              </Link>
              <Link to="../chat">
                <img src={Comment} alt="Chat" />
              </Link>
              <UilSetting />
            </div>
          </div>
          {currentChat && (
            <ChatBox
              chat={currentChat}
              currentUser={authData?.data?._id}
              room={true}
              setSendMessage={setSendMessage}
              receiveMessage={receiveMessage}
            />
          )}
        </div> */}

        <div className="Right-side-chat">
          <div style={{ width: '20rem', alignSelf: 'flex-end' }}>
            <div className="navIcons">
              <button
                className="button"
                style={{ width: '5rem', height: '2rem' }}
                onClick={() => setModalOpened2(true)}
              >
                Create Room
              </button>
              <RoomModal
                modalOpened2={modalOpened2}
                setModalOpened2={setModalOpened2}
              />
            <Link to="../">
                {' '}
                <img src={Home} style={{width:"1.5rem"}} alt="" />
              </Link>

              <Link to="../explore">
                {' '}
                <WhatshotIcon />
              </Link>

              <Link to="../chat">
                <img src={Comment} alt="" />
              </Link>
             <Link to="../room" >
             <MeetingRoomIcon/>
             </Link>
            </div>
          </div>
          {/* <ChatBox chat={currentChat} currentUser={authData?.data?._id} room={true} setSendMessage={setSendMessage} 
    recieveMessage={recieveMessage}
    /> */}
          {currentChat && (
            <ChatBox
              chatId={currentChat}
              currentUser={authData?.data?._id}
              room={true}
              setSendMessage={setSendMessage}
              recieveMessage={recieveMessage}
              chatRoomName={chatRoomName}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default Room
