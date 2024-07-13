import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Home from '../../img/home.png'
import { io } from 'socket.io-client'
import Comment from '../../img/comment.png'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import Preloader from '../../components/Preloader/Preloader'
import './Room.css'
import ChatBox from '../../components/ChatBox/ChatBox'
import axios from 'axios'
import RoomModal from '../../components/RoomModal/RoomModal'
import { useSnackbar } from 'notistack'
import {
  findUserRooms,
  joinRoomAction,
  findAllRooms,
} from '../../actions/room.actions'
import { findUserChats } from '../../actions/chat.actions'
import { getAllRooms, joinRoom } from '../../api/RoomRequest'
import { appConfig } from '../../config/appConfig'

const Room = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const authData = useSelector((state) => state.authReducer.authData)
  const authDataLoading = useSelector((state) => state.authReducer.isLoading)

  const roomDatas = useSelector((state) => state.roomReducer.rooms)
  const roomDatasLoading = useSelector((state) => state.roomReducer.isLoading)

  const userRoomDatas = useSelector((state) => state.roomReducer.userRooms)

  const userRoomDatasLoading = useSelector(
    (state) => state.roomReducer.isLoading,
  )
  const chatDatas = useSelector((state) => state.chatReducer.chats)

  const chatDatasLoading = useSelector((state) => state.chatReducer.isLoading)

  // console.log(roomDatas, "DATA#")

  const [rooms, setRooms] = useState([])
  const [chatRoomId,setChatRoomId]=useState("")
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
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    socket.current = io(appConfig.socketUrl ?? '')
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
  useEffect(() => {
    if (
      authDataLoading ||
      roomDatasLoading ||
      userRoomDatasLoading ||
      chatDatasLoading
    ) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [
    authDataLoading,
    roomDatasLoading,
    userRoomDatasLoading,
    chatDatasLoading,
  ])
  const handleJoin = async () => {
    const userId = authData?.data?._id
    if (!roomId) return
    try {
      await dispatch(joinRoomAction(roomId))
      enqueueSnackbar('Joined SuccessFully!', {
        variant: 'success',
        ContentProps: {
          style: { backgroundColor: 'green' },
        },
      })
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: 'error',
        ContentProps: {
          style: { backgroundColor: 'red' },
        },
      })
      console.error('Error config:', error.config)
    }
  }

  const fetchRoomListJoined = async () => {
    await dispatch(findUserRooms(true))
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
      await dispatch(findUserChats(true))

      setChats(chatDatas?.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getChats()
  }, [authData?.data])

  useEffect(() => {
    dispatch(findAllRooms({}))
    getRooms()

    // joinRoom()
  }, [authData])

  const checkIsAdminRoom =(sRoomId,roomN)=>{
    if(appConfig?.adminRoomIds?.includes(sRoomId)){
      console.log(sRoomId,"roomId",appConfig.adminRoomIds,"adminroomId",roomN);
      return true;
    }
   return false;
  }

  return (
    <>
      {isLoading && <Preloader />}
      <div className="grid md:grid-cols-[22%_auto] gap-4  relative overflow-hidden">
        {/* Left side */}
        <div className="Left-side-chat min-w-[300px] z-100 mt-2 px-1 overflow-hidden">
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
                  className={checkIsAdminRoom(list?._id,list?.name) ? "admin-room":"join-room-list"}
                    key={list?._id}
                    onClick={() => {
                      setCurrentChat(list?.chatId)
                      setChatRoomName(list?.name)
                      setChatRoomId(list?._id)
                    }}
                  >
                    <span>{list?.name}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="Right-side-chat overflow-hidden">
          <div
            style={{ width: '20rem', alignSelf: 'flex-end' }}
            className="fixed md:static bottom-10  mx-auto md:mx-0 left-0 right-0 md:pr-2"
          >
            <div className="navIcons">
              <RoomModal
                modalOpened2={modalOpened2}
                setModalOpened2={setModalOpened2}
                joinedList={joinedList}
                setJoinedList={setJoinedList}
              />
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
          {/* <ChatBox chat={currentChat} currentUser={authData?.data?._id} room={true} setSendMessage={setSendMessage} 
    recieveMessage={recieveMessage}
    /> */}
          {currentChat && (
            <div className="absolute md:static rounded-[12px] left-0 right-0 bottom-0 w-full h-[95vh] bg-white">
              <ChatBox
                chatId={currentChat}
                currentUser={authData?.data?._id}
                room={true}
                setSendMessage={setSendMessage}
                recieveMessage={recieveMessage}
                chatRoomName={chatRoomName}
                roomId={chatRoomId}
              />
            </div> 
          )}
        </div>
      </div>
    </>
  )
}

export default Room