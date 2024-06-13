import React, { useState } from 'react'
import { Modal, useMantineTheme } from '@mantine/core';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ClickAwayListener } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const RoomModal = ({modalOpened2,setModalOpened2,data}) => {
    const { user } = useSelector((state) => state.authReducer.authData);
    const [roomName,setRoomName]=useState("")
    const navigte=useNavigate()
    const handleSubmit=async(e)=>{
      e.preventDefault()
      const room={
        name:roomName,
        userId:user._id
      }
      try {
         const {data}=await axios.post("http://localhost:5000/room",room)
         console.log(data);
         alert("Room created successfully");
   
      } catch (error) {
        console.log(error);
      }
    }
    const theme = useMantineTheme();
  return (
    <Modal
    overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
    overlayOpacity={0.55}
    size={"55%"}
    overlayBlur={3}
    opened={modalOpened2}
    onClose={()=>setModalOpened2(false)}
  >
   <form onSubmit={handleSubmit}>
   <div style={{display:"flex",flexDirection:"row"}}>
   <input type="text" className="infoInput" value={roomName} style={{width:"70%"}}  onChange={(e)=>setRoomName(e.target.value)}/>
   <button className='button' onClick={()=>navigte("../room")}>Create</button>
   </div>
   </form>
   {/* <ToastContainer /> */}
  </Modal>
  )
}

export default RoomModal
