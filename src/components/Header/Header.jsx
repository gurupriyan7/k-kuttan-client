import React from 'react'
import "./Header.css"
import Logo from "../../img/logo.png"
const Header = () => {
  return (
    <>
   
  
    <span onClick={()=>window.scroll(0,0)} className='Header'> <img src={Logo} alt="" style={{width:"4rem",height:"4rem"}} /> <h6 style={{marginLeft:"-1rem"}}>AMBIKUTTAPAN </h6> </span>
    </>
  )
}

export default Header