import React from 'react'
import "./ExploreSingle.css"
import {img_300, unavailable} from "../../config/config"
import { Badge } from '@mantine/core'
import ContentModal from '../ContentModal/ContentModal'

const ExploreSingle = ({
    id,
    title,
    story
}) => {
  return (
    <ContentModal media_type={title} id={id}>
      
    
  

    <img className='poster' src={story?`${img_300}/${story}`:unavailable} alt={title} />
    <Badge   color={id>6?"primary":"secondary"}>Rating:{id}</Badge>
    <b className="title">{title}</b>
    
    <span className='subTitle'>{title==="tv"?"Tv series":"Movie"}
    <span className='subTitle'>{title}</span>
   
    </span>
  </ContentModal>
  )
}

export default ExploreSingle