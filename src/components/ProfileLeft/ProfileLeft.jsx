import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import InfoCard from '../InfoCard/InfoCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import { Link } from "react-router-dom";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import Home1 from '../../img/home.png'
import Comment from '../../img/comment.png'
const ProfileLeft = () => {
  return (
   <div className="ProfileSide ">
       <LogoSearch/>  
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
              <Link to={"../chat"}>
                <img src={Comment} alt="" />
                <span class="tooltiptext">Chat</span>
              </Link>
            </div>
            <div className="tooltip1">
              <Link to={"../room"}>
                <MeetingRoomIcon />
                <span class="tooltiptext1">Room</span>
              </Link>
            </div>
          </div> 
        </div>
       <InfoCard/>
       <FollowersCard/> 
   </div>
  )
}

export default ProfileLeft