import React, { useState } from 'react'
import { Modal, useMantineTheme } from '@mantine/core'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { ClickAwayListener } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { createRoomAction } from '../../actions/room.actions'
import { useSnackbar } from 'notistack'
import "./RoomModal.css"
const RoomModal = ({
  modalOpened2,
  setModalOpened2,
  joinedList,
  setJoinedList,
}) => {
  const authData = useSelector((state) => state.authReducer.adminData)
  const { loading } = useSelector((state) => state.roomReducer)
  const [roomName, setRoomName] = useState('')
  const navigte = useNavigate()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const room = {
      name: roomName,
      members: [authData?.data?._id],
    }
    console.log(room, 'ROOM DATA')
    try {
      const data = await dispatch(createRoomAction(room))
      setJoinedList([
        ...joinedList,
        {
          ...room,
          members: 1,
        },
      ])
      console.log(data, 'room Model data')
      setModalOpened2(false)
      enqueueSnackbar('Room Created SuccessFully!', {
        variant: 'success',
        ContentProps: {
          style: { backgroundColor: 'green' },
        },
      })
      // window.location.reload()
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: 'error',
        ContentProps: {
          style: { backgroundColor: 'red' },
        },
      })
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
        <div className='modal-heading'>Create Post</div>
        <div style={{ display: 'grid', flexDirection: 'row', gap: '1rem' }}>
          <input
            type="text"
            className="infoInput"
            value={roomName}
            placeholder="Room Name..."
            style={{ width: '100%' }}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button style={{ padding: '1rem' }} className="button">
            {loading ? 'Loading...' : 'Create'}
          </button>
        </div>
      </form>
      {/* <ToastContainer /> */}
    </Modal>
  )
}

export default RoomModal
