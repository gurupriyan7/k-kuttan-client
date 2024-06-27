/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux'
import './AdminHome.css'
import { useEffect, useState } from 'react'
import { findAllRooms } from '../../actions/room.actions'
import RoomModal from '../../components/RoomModal/RoomModal'
import { path } from '../../paths/paths'
import { useNavigate } from 'react-router-dom'
import { getLocalStorageItem } from '../../utils/appUtils'
import { adminLogout } from '../../actions/auth.actions'

const AdminHome = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [roomDatas, setRoomsDatas] = useState([])
  const [modalOpened2, setModalOpened2] = useState(false)
  const { rooms, loading, error } = useSelector((state) => state.roomReducer)
  console.log(roomDatas, 'rooms-rooms')

  const adminData = getLocalStorageItem('admin-profile')

  const filterRoomData = async () => {
    return await rooms?.map((room) => {
      return { Name: room?.name, TotalUsers: room?.members?.length ?? 0 }
    })
  }

  const logoutClick = async () => {
    await dispatch(adminLogout())
    await localStorage.clear()
    navigate(path.admin)
  }

  useEffect(() => {
    dispatch(findAllRooms({ isAdmin: true }))
  }, [])

  useEffect(() => {
    console.log(adminData?.data, 'adminData')
    if (!adminData?.data) {
      navigate(path.admin)
    }
  }, [adminData?.data])

  useEffect(async () => {
    setRoomsDatas(await filterRoomData())
  }, [rooms])
  return (
    <div className="table-container">
      <div className="heading-main">Rooms</div>
      <div className="action-button-main">
        <button
          onClick={() => setModalOpened2(true)}
          className="table-button button"
        >
          Create Room
        </button>
        <button onClick={logoutClick} className="table-button button">
          Logout
        </button>
      </div>
      <table className="responsive-table">
        <thead>
          <tr>
            {roomDatas?.length &&
              Object?.keys(roomDatas[0]).map((key) => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {roomDatas?.length &&
            roomDatas.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      <RoomModal
        modalOpened2={modalOpened2}
        setModalOpened2={setModalOpened2}
        joinedList={roomDatas}
        setJoinedList={setRoomsDatas}
      />
    </div>
  )
}

export default AdminHome
