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
      <div className="navIcons" style={{backgroundColor:" var(--cardColor)",padding:"1rem",borderRadius:"20px"}}>
      <div className="tooltip">
              <Link to="../">
                {' '}
                <img src={Home} style={{width:"1.5rem"}} alt="" />
              <span class="tooltiptext">Home</span>
              </Link>
              </div>
              <div className="tooltip">
              <Link  to="../explore">
                {' '}
                <span class="tooltiptext">Explore</span>
                <WhatshotIcon />
              </Link>
              </div>
              <div className="tooltip">
              <Link to={authData?.data && "../chat"}>
                <img src={Comment} alt="" />
                <span class="tooltiptext">Chat</span>
              </Link>
              </div>
              <div className="tooltip1">
             <Link to={authData?.data && "../room"}>
             <MeetingRoomIcon/>
             <span class="tooltiptext1">Room</span>
             </Link>
             </div>
            </div>

      <TrendCard />

      <button
        style={{ color: 'black', display: `${isAuthor ? 'block' : 'none'}` }}
        className="button r-button"
        onClick={(e) => {
          e.preventDefault()
          navigate(path.addPost)
        }}
      >
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  )
}

export default RightSide
