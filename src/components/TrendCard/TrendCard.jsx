import React from 'react'
import './TrendCard.css'
import rightcover from "../../img/explorecard.jpg"
import {TrendData} from '../../Data/TrendData.js'
const TrendCard = () => {
  return (
    <div className="TrendCard" style={{backgroundImage:`URL(${rightcover})` ,backgroundPosition: 'center',
    backgroundSize: 'cover',
   display:"flex",
   justifyContent:"center",
    backgroundRepeat: 'no-repeat',
    color:""
}}>
            <h3>Trends for you</h3>
            {TrendData.map((trend)=>{
                return(
                    <div className="trend">
                        <span>#{trend.name}</span>
                        <span>{trend.shares}k shares</span>
                    </div>
                )
            })}

    </div>
  )
}

export default TrendCard