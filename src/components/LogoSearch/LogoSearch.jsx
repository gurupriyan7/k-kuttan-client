import React, { useEffect, useState } from 'react'
import "./LogoSearch.css"
import Logo from "../../img/logo.png"
import {UilSearch} from "@iconscout/react-unicons"
// import { getAllUser } from '../../api/UserRequest'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
const LogoSearch = () => {
  const [users,setUsers]=useState([])
  const [searchText,setSearchText]=useState("")
  const [data,setData]=useState([])
  const [connection,setConnection]=useState(false)
  useEffect(()=>{
    const fetchPersons=async()=>{
      const {data}=[]
    //   await getAllUser()
      setUsers(data)
      
    }
    fetchPersons()
  },[])
  const serverPublic=process.env.REACT_APP_PUBLIC_FOLDER
  const findUser=()=>{
    console.log(searchText);
   const data = users.filter((user)=>user.firstname==searchText)
   setData(data)
   setSearchText("")
   console.log(data);
  }
  const {user}=useSelector((state)=>state.authReducer.authData)
  const handleChat= async(sender)=>{
   
        let chat={
          senderId:sender,
          receiverId:user._id
        }
  try {
      
      const {data} =await axios.post('http://localhost:5000/chat/', chat)
      if(data){
        setConnection((prev)=>!prev)
      }
      console.log(data)
      
      
     } catch (error) {
      console.log(error)
     }
  }
  return (
    <>
    <div className='LogoSearch'>
    <img src={Logo} style={{width:"2rem"}}/ >
        <div className="Search">
            <input type="text"  onChange={(e)=>setSearchText(e.target.value)} placeholder='#Find connections'/>

            <div className="s-icon" onClick={findUser}>
                <UilSearch  />
            </div>
           
        </div>
        
    </div>

    {data && data.map((d)=>
  <div
  className='logoDiv'>
      <img  src={d.profilePicture?serverPublic+d.profilePicture:serverPublic+"defaultProfile.png"}
       alt="" className='FollowerImg l-image' />
  
    <h5>{d.firstname} {d.lastname}</h5>
    {/* <Link to="/chat" style={{textDecoration:"none"}} > */}
   <input  type="button" name={d._id}  className='button l-button' value="  Connect  " onClick={(e)=>handleChat(e.target.name)}/>
   {/* </Link> */}
 
  {/* <button  className='button l-button'  onClick={handleChat} >Chat</button> */}
  
  </div>  ) }

  {
    connection ?<span>Start converstion via chat box</span>:<span>Create connection</span>
  }
    </>
  )
}

export default LogoSearch