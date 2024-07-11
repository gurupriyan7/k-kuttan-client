import React, { useEffect } from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../ProfileCard.jsx/ProfileCard'

import './ProfileSide.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { path } from '../../paths/paths'

import { Link } from "react-router-dom";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import Home1 from '../../img/home.png'
import Comment from '../../img/comment.png'
const ProfileSide = ({ isHome = false }) => {
  const navigate = useNavigate()

  const authData = useSelector((state) => state.authReducer.authData)



  const login = () => {
    navigate(path.auth)
  }

  return (
    <div className="ProfileSide">
      {!isHome && <LogoSearch />}
      <ProfileCard />
      {authData?.data ? (
        <FollowersCard />
      ) : (
        <span
          onClick={login}
          style={{
            backgroundColor: 'orange',
            cursor: 'pointer',
            padding: '.3rem 9rem',
            borderRadius: '1rem',
            marginBottom: '.5rem',
          }}
        >
          Login
        </span>
      )}

      {/* starts */}
         <div className=" w-full">
          
          <div
            className="grid grid-cols-4 my-8 lg:hidden mt-[1rem] items-center w-full"
            style={{
              backgroundColor: " var(--cardColor)",
              padding: "1rem",
              borderRadius: "20px",
            }}
          >
            <div className="tooltip">
              <Link to="../">
                {" "}
                <img src={Home1} style={{ width: "1.5rem" }} alt="" />
                <span class="tooltiptext">Home</span>
              </Link>
            </div>
            <div className="tooltip">
              <Link to="../explore">
                {" "}
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
                <MeetingRoomIcon />
                <span class="tooltiptext1">Room</span>
              </Link>
            </div>
          </div> 
        </div>
      {/* ends */}


    </div>
  )
}

export default ProfileSide
