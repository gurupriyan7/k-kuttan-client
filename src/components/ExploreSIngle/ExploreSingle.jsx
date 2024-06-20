import React from 'react'
import "./ExploreSingle.css"
import {img_300, unavailable} from "../../config/config"
import { Badge } from '@mantine/core'
import ProfileCard from '../ProfileCard.jsx/ProfileCard'
import Posts from '../Posts/Posts'



const ExploreSingle = ({postData}) => {
  console.log(postData,"postDataaaa");
  // const postData = useSelector((state) => state.postReducer.posts)
  return (
    <div className="PostSide overflow-y-hidden">
      
      <Posts post={postData} />
    </div>
  )
}

export default ExploreSingle