import React from 'react'
import "./Header.css"
import Logo from "../../img/logo.png"
const Header = () => {
  return (
    <>


      <span onClick={() => window.scroll(0, 0)} className='Header w-full py-[20px]'> <h6 className='mt-4' ><span className='text-orange-400 font-bold -mr-1'>K</span> AMBIKUTTAPPAN </h6> </span>
    </>
  )
}

export default Header
