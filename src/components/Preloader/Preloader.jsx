import React from 'react';
import "./Preloader.css"
import preloader from "../../img/preloader.gif"
const Preloader = () => {
  return (
    <div className='preloader-main'>
        <div className='.preloader-main2'>

        <img src={preloader} alt="Computer man" style={{width:"25rem",}}/>
       
          
        
        </div>
    </div>
  )
}

export default Preloader