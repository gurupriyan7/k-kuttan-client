
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Home from "../../img/home.png";
import {io} from "socket.io-client"
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import "./Room.css"
import ChatBox from "../../components/ChatBox/ChatBox";
import axios from "axios";
import RoomModal from "../../components/RoomModal/RoomModal";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { getRoomChats, getRooms, joinRoom } from "../../api/RoomRequest";
const Room = () => {
      
  const { user } = useSelector((state) => state.authReducer.authData);
 
  
  
  const [rooms,setRooms]=useState([])
  const [userChats, setUserChats] = useState([]);
  const [currentChat,setCurrentChat]=useState(null)
  const [roomId,setRoomid]=useState("")
  const [onlineUsers,setOnlineUsers]=useState([])
  const [sendMessage,setSendMessage]=useState(null)
  const [recieveMessage,setRecieveMessage]=useState(null)
  const [modalOpened2,setModalOpened2]=useState(false);
  const [join,setJoin]=useState(false)
  const socket=useRef()

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
     
    });
  }, []);
//send message
useEffect(()=>{
  if(sendMessage!==null){
     socket.current.emit('send-message',sendMessage)
  }
},[sendMessage])

//recieve message
useEffect(async()=>{
  try {
    const {data}= []
    // await getRooms()
    console.log(data)
    setRooms(data)
  } catch (error) {
    console.log(error);
  }
},[modalOpened2])
useEffect(()=>{
   socket.current.on("recieve-message",(data)=>{
    setRecieveMessage(data)
   })
},[])
const handleJoin=async ()=>{
    setJoin(true)
    const userId=user._id
    try {
       const {data}=""
    //    await joinRoom(roomId , userId)
       console.log(data);
       alert("Joined     successfully");
       setJoin(false)
    } catch (error) {
       console.log(error) 
    }
}
const getChats = async () => {
  try {
    const { data } =[]
    // await getRoomChats(user._id)
    setUserChats(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
  useEffect(() => {
   
    getChats();
  }, [join,rooms]);
  const checkOnlineStatus=(chat)=>{
    const chatMember=chat.members.find((member)=>member!==user._id)

    const online=onlineUsers.find((user)=>user.userId===chatMember)
    return online?true:false
 }

  return (
    <>
    <div className="Chat">
      {/* left side */}

      <div className="Left-side-chat">
        <select name="" id=""  onClick={(e)=>setRoomid(e.target.value)} className="infoInput">
           {rooms &&  rooms.map((room,id)=>{
            return <option    value={room._id}>{room.name}</option>
           }) }
        
        </select>
        <button className="button" onClick={handleJoin} style={{height:"2rem"}}>Join</button>
       
        <div className="Chat-container">
          <h2>Rooms</h2>
          <div className="Chat-list">
            {userChats.map((chat) => (
              <div onClick={()=>setCurrentChat(chat)}>
                {/* <Conversations data={chat} currentUserId={user._id}  /> */}
                <span >{chat.name} </span>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="Right-side-chat">
    

        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <div className="navIcons">
          <button className="button" style={{width:"5rem",height:"2rem"}} onClick={()=>setModalOpened2(true)}>Create Room</button>
          <RoomModal modalOpened2={modalOpened2} setModalOpened2={setModalOpened2} />
            <Link to="../home">
              {" "}
              <img src={Home} alt="" />
            </Link>

            <Link to="../trending">
              {" "}
              <WhatshotIcon />
            </Link>

            <Link to="../chat">
              <img src={Comment} alt="" />
            </Link>
            <UilSetting />
          </div>
          
        </div>
        <ChatBox chat={currentChat} currentUser={user._id} room={true} setSendMessage={setSendMessage} 
        recieveMessage={recieveMessage}
        />
      </div>
      {/* <ToastContainer /> */}
    </div>
  </>
  )
}

export default Room
