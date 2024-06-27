import React from 'react'
import "./Header.css"
import Logo from "../../img/logo.png"
const Header = () => {
  return (
    <>
   
  
    <span onClick={()=>window.scroll(0,0)} className='Header w-full py-[20px]'> <img src={Logo} alt="" style={{width:"4rem",height:"4rem"}} /> <h6 className='mt-4' style={{marginLeft:"-1rem"}}>AMBIKUTTAPPAN </h6> </span>
    </>
  )
}

export default Header