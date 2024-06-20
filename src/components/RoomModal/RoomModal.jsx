import React, { useState } from 'react'
import { Modal, useMantineTheme } from '@mantine/core'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { ClickAwayListener } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { createRoomAction } from '../../actions/room.actions'
const RoomModal = ({
  modalOpened2,
  setModalOpened2,
  joinedList,
  setJoinedList,
}) => {
  const authData = useSelector((state) => state.authReducer.authData)
  const [roomName, setRoomName] = useState('')
  const navigte = useNavigate()
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const room = {
      name: roomName,
      members: [authData?.data?._id],
    }
    console.log(room, 'ROOM DATA')
    try {
      const data = await dispatch(createRoomAction(room))
      // setJoinedList([...joinedList, room])
      console.log(data, 'room Model data')
      // alert('Room created successfully')
      setModalOpened2(false)
      // window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
  const theme = useMantineTheme()
  return (
    <Modal
      overlayColor={
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      size={'55%'}
      overlayBlur={3}
      opened={modalOpened2}
      onClose={() => setModalOpened2(false)}
    >
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <input
            type="text"
            className="infoInput"
            value={roomName}
            style={{ width: '70%' }}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button className="button" onClick={() => navigte('../room')}>
            Create
          </button>
        </div>
      </form>
      {/* <ToastContainer /> */}
    </Modal>
  )
}

export default RoomModal
