/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
// import { addMessage, getMessages } from '../../api/MessageRequest'
// import { getUser } from '../../api/UserRequest'
import "./ChatBox.css";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appConfig } from "../../config/appConfig";
import { createMessage, findUserMessages } from "../../actions/chat.actions";
import { findChatById } from "../../api/chatRequest";
import Profile from "../../img/profileImg.jpg";
import { UilArrowLeft } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";
import back from '../../img/wp4082523.webp'
const ChatBox = ({
  chatId,
  currentUser,
  setSendMessage,
  recieveMessage,
  room,
  chatRoomName,
  roomId,
}) => {


  const authData = useSelector((state) => state.authReducer.authData);
  const messageDatas = useSelector((state) => state.chatReducer.messages);
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatUser, setChatUser] = useState(null);
  const [chat, setChat] = useState(null);
  const scroll = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isRoom = room ? true : false;
  const isAdminRoom = appConfig?.adminRoomIds?.includes(roomId);
  const isAdmin = appConfig.adminId === String(authData?.data?._id)
  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };
  //fetching data for header of chat box

  console.log(messages, "messagesss-messagess");

  useEffect(async () => {
    const chatData = await findChatById(chatId, isRoom);
    setChat(chatData?.data);
  }, [chatId]);
  console.log(isAdmin, "damin", isAdminRoom, "aaaaa", appConfig?.adminRoomIds, "bbb", roomId);

  useEffect(() => {
    if (!room) {
      const chatMember = chat?.members?.find(
        (member) => member?._id !== authData?.data?._id
      );
      setChatUser(chatMember, "chatMemger????????????");
    } else {
    }
  }, [chat]);
  useEffect(() => {
    // const chatMember = chat?.members?.find(
    //   (member) => member !== authData?.data?._id,
    // )
    const getUserData = async () => {
      try {
        const { data } = {};
        //   await getUser(userId);
        setUserData(authData?.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) {
      getUserData();
    }
  }, [authData?.data, chat, currentUser]);

  useEffect(() => {
    setMessages(messageDatas);
  }, [messageDatas]);

  //fetching data for messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        dispatch(findUserMessages(chatId, isRoom));
        //   await getMessages(chat._id)
        setMessages(messageDatas);
        // console.log(data)
      } catch (error) {
        console.log(error);
      }
    };
    if (chatId !== null) {
      fetchMessages();
    }
  }, [chatId]);
  // const { user } = useSelector((state) => state.authReducer.authData)
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chatId,
    };

    //send message to data base
    try {
      dispatch(createMessage(message));
      // setChat([...chat, message])

      // const { data } = ''
      // await addMessage(message)
      setMessages([...messages, message]);
      setNewMessage("");

    } catch (error) {
      console.log(error);
    }

    //set msg to socket server
    let recieverId = "";
    if (isRoom) {
      recieverId = chat?.members?.find((id) => id?._id !== currentUser);
      setSendMessage({
        ...message,
        recieverId: recieverId?._id,
        senderId: currentUser,
        isRoom: true,
      });
    } else {
      recieverId = chat?.members?.find((id) => id?._id !== currentUser);
      setSendMessage({ ...message, recieverId: recieverId?._id });
    }
  };
  useEffect(() => {
    console.log(recieveMessage, "receive messages", chat);
    if (recieveMessage !== null && recieveMessage?.chatId === chat?._id) {
      if (room) {
        const senderData = chat?.members?.find((member) => {
        return  member?._id === recieveMessage?.senderId
        })
        console.log(senderData,"senderData--------");
        const senderDatas = {
          senderId:senderData,
          chatId:recieveMessage?.chatId,
          text:recieveMessage?.text,
          recieverId:recieveMessage?.recieverId
        }
        console.log(senderDatas,"send-----apple--orange");
        setMessages([...messages, senderDatas]);
      }else{

        setMessages([...messages, recieveMessage]);
      }
    }
  }, [recieveMessage]);

  //always scroll to top
  console.log(userData, "user----data");

  return (
    <>
      <div style={{ backgroundImage: isAdminRoom ? `URL(${back})` : "" }} className="ChatBox-container w-full">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower">
                <div>
                  <button
                    onClick={() => navigate(0)}
                    // className="mr-2 p-1 rounded-full hover:bg-gray-200"
                    className={isAdminRoom ? "room-back mr-2 p-1 rounded-full hover:bg-gray-200" : "mr-2 p-1 rounded-full hover:bg-gray-200"}
                  >
                    <UilArrowLeft size="24" />
                  </button>
                  {!room && (
                    <img
                      src={`${appConfig.awsBucketUrl}/${chatUser?.profileImage}`}
                      alt=""
                      className="followerImage"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                  <div className="name" style={{ fontSize: "0.8rem" }}>
                    <span className={isAdminRoom ? "room-name" : ""}>
                      {room ? chatRoomName : chatUser?.firstName}
                      {/* {chatUser?.lastname} */}
                    </span>
                  </div>
                </div>
              </div>
              <hr className={isAdminRoom ? "room-hr" : ""} style={{ width: "100%", border: "0.1px solid #ececec" }} />
            </div>
            {/* chat box message */}
            <div className="chat-body">
              {messages?.map((message) => (
                <>
                  <div
                    ref={scroll}
                    className={
                      message?.senderId?._id === currentUser ||
                        message?.senderId === currentUser
                        ? "message own"
                        : "message"
                    }
                  >
                    <div className="profile-chat">
                      {/* {room && (
                        <img
                          src={
                            message?.senderId && message?.senderId?.profileImage
                              ? `${appConfig?.awsBucketUrl}/${message?.senderId?.profileImage}`
                              : userData?.profileImage
                              ? `${appConfig?.awsBucketUrl}/${userData?.profileImage}`
                              : Profile
                          }
                          alt=""
                          className="followerImage"
                        />
                      )} */}
                      <span className="chat-name">
                      {
  message?.senderId?.userName?.length === 0
    ? "Unknown"
    : message?.senderId?.userName || userData?.userName
}
                      </span>
                    </div>
                    <span>
                      {message?.text}
                      {room}
                    </span>
                    <span className="chat-time">
                      {format(message?.createdAt)}
                    </span>
                  </div>
                </>
              ))}
            </div>
            {
              (isAdminRoom && isAdmin || !isAdminRoom) ?
                (<div className="chat-sender">
                  <div>+</div>
                  <InputEmoji style={{ width: "9rem!important" }} value={newMessage} onChange={handleChange} />
                  <div className="send-button button" onClick={handleSend}>
                    Send
                  </div>
                </div>) : (
                  <div className="admin-chat-sender">
                    <div>Only Admin can send messages</div>
                    {/* <div>+</div> */}
                    {/* <InputEmoji value={newMessage} onChange={handleChange} /> */}
                    {/* <div className="send-button button" onClick={handleSend}>
                  sorry
                </div> */}
                  </div>
                )
            }
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox; 
