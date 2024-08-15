import React, { useEffect, useState } from 'react'
import './RightSide.css'
import Home from '../../img/home.png'
import Noti from '../../img/notifi.avif'
import { Link, useParams } from 'react-router-dom'
import TrendCard from '../TrendCard/TrendCard'
import ShareModal from '../ShareModal/ShareModal'
import { useSelector } from 'react-redux'
import { UserRole } from '../../config/enums'
import { path } from '../../paths/paths'
import { useNavigate } from 'react-router-dom'
// import home from '../../img/home.png'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import Comment from '../../img/comment.png'
import { UilSetting } from '@iconscout/react-unicons'
import WhatshotIcon from '@mui/icons-material/Whatshot'
const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false)
  const navigate = useNavigate()
  const authData = useSelector((state) => state.authReducer.authData)
  const isUploaded = useSelector((state) => state.postReducer.isUploaded)

  const isAuthor = authData?.data?.role === UserRole.AUTHOR

  return (
    <div className="RightSide">
      <div className="hidden lg:flex justify-between gap-3 items-end mt-[1rem]" style={{ backgroundColor: " var(--cardColor)", padding: "1rem", paddingBottom: '0.5rem', borderRadius: "20px" }}>
        <div className="tooltip">
          <Link to="../" className='flex flex-col justify-center items-center gap-0.5'>
            <img src={Home} style={{ width: "1.5rem" }} alt="" />
            <span class="tooltiptext">Home</span>
            <p className='text-xs font-medium sm:text-sm'>Home</p>
          </Link>
        </div>
        <div className="tooltip">
          <Link to="../explore" className='flex flex-col justify-center items-center gap-0.5'>

            {' '}
            <span class="tooltiptext">Explore</span>
            <WhatshotIcon />
            <p className='text-xs font-medium sm:text-sm'>Explore</p>

          </Link>
        </div>
        <div className="tooltip">
          <Link to={authData?.data && "../chat"} className='flex flex-col justify-center items-center gap-0.5'>

            <img src={Comment} alt="" />
            <span class="tooltiptext">Chat</span>
            <p className='text-xs font-medium sm:text-sm'>Chat</p>

          </Link>
        </div>
        <div className="tooltip1">
          <Link to={authData?.data && "../room"} className='flex flex-col justify-center items-center gap-0.5'>

            <MeetingRoomIcon />
            <span class="tooltiptext1">Room</span>
            <p className='text-xs font-medium sm:text-sm'>Room</p>

          </Link>
        </div>
      </div>

      <div style={{display:"flex",justifyContent:"center"}} className='mt-[1rem] lg:mt-0'>
        <TrendCard />
      </div>

      <button
        style={{ color: 'black', display: `${isAuthor ? 'block' : 'none'}` }}
        className="button r-button"
        onClick={(e) => {
          e.preventDefault()
          navigate(path.addPost)
        }}
      >
        Post your story
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  )
}

export default RightSide
