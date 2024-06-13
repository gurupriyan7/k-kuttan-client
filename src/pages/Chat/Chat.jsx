import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
// import { userChats } from "../../api/ChatRequest";
import Conversations from "../../components/Conversations/Conversations";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import Home from "../../img/home.png";
import {io} from "socket.io-client"
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import "./Chat.css";
import ChatBox from "../../components/ChatBox/ChatBox";
const Chat = () => {

  
  
  const { user } = useSelector((state) => state.authReducer.authData);
 
  
  

  const [chats, setChats] = useState([]);
  const [currentChat,setCurrentChat]=useState(null)
  const [onlineUsers,setOnlineUsers]=useState([])
  const [sendMessage,setSendMessage]=useState(null)
  const [recieveMessage,setRecieveMessage]=useState(null)
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

useEffect(()=>{
   socket.current.on("recieve-message",(data)=>{
    setRecieveMessage(data)
   })
},[])

const getChats = async () => {
  try {
    const { data } = ""
    // await userChats(user._id);
    setChats(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
  useEffect(() => {
   
    getChats();
  }, [user]);

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
         <LogoSearch/>

          <div className="Chat-container">
            <h2>Chats</h2>
            <div className="Chat-list">
              {chats.map((chat) => (
                <div onClick={()=>setCurrentChat(chat)}>
                  <Conversations data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* right side */}

        <div className="Right-side-chat">
          <div style={{ width: "20rem", alignSelf: "flex-end" }}>
            <div className="navIcons">
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
          <ChatBox chat={currentChat} currentUser={user._id}  setSendMessage={setSendMessage} 
          recieveMessage={recieveMessage}
          />
        </div>
      </div>
    </>
  );
};

export default Chat;