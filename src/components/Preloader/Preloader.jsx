import React from 'react';
import "./Preloader.css"
import preloader from "../../img/preloader.gif"
const Preloader = () => {
  return (
    <div className='preloader-main w-full flex  justify-center items-center min-h-[120vh]'>
      <div className=''>

        <img src={preloader} alt="Computer man" style={{ width: "50rem", }} />



      </div>
    </div>
  )
}

export default Preloader
