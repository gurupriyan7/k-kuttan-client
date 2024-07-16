import React from 'react';
import "./Preloader.css"
import preloader from "../../img/preloader.gif"
const Preloader = () => {
  return (
    <div className='w-full flex  justify-center items-center min-h-[100vh]'>
        <div className=''>

        <img src={preloader} alt="Computer man" style={{width:"25rem",}}/>
       
          
        
        </div>
    </div>
  )
}

export default Preloader