import React, { useEffect, useState } from 'react'
import './RightSide.css'
import Home from '../../img/home.png'
import Noti from '../../img/notifi.avif'
import Comment from '../../img/chat.png'
import { UilSetting } from '@iconscout/react-unicons'
import TrendCard from '../TrendCard/TrendCard'
import ShareModal from '../ShareModal/ShareModal'
import { useSelector } from 'react-redux'
import { UserRole } from '../../config/enums'

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false)
  const authData = useSelector((state) => state.authReducer.authData)
  const isUploaded = useSelector((state)=>state.postReducer.isUploaded)

  const isAuthor = authData?.data?.role === UserRole.AUTHOR


  return (
    <div className="RightSide">
      <div className="navIcons">
        <img src={Home} color="white" alt="" />
        {/* <UilSetting /> */}

        <img src={Noti} style={{ color: 'white' }} alt="" />
        <img src={Comment} alt="" />
      </div>

      <TrendCard />

      <button
        style={{ color: 'black', display: `${isAuthor ? 'block' : 'none'}` }}
        className="button r-button"
        onClick={() => setModalOpened(true)}
      >
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  )
}

export default RightSide
