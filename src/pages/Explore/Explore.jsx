import { Container } from '@mantine/core'
import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import SimpleBottomNavigation from '../../components/MainNav/SimpleBottomNavigation'
import axios from 'axios'
import back from '../../img/wp4082523.webp'
import { useEffect } from 'react'
import ExploreSingle from '../../components/ExploreSIngle/ExploreSingle'
import "./Explore.css"
import CustomPagination from '../../components/Pagination/CustomPagination'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../../actions/post.actions'
import { useNavigate } from 'react-router-dom'
import { path } from '../../paths/paths'
import { getLocalStorageItem } from '../../utils/appUtils'
import { findUserProfile } from '../../actions/user.actions';
import Preloader from '../../components/Preloader/Preloader'
import PostSide from '../../components/PostSide/PostSide'

const Explore = () => {
  const userData = getLocalStorageItem('profile')
  const [isLoading,setIsLoading]=useState(false)
  const postData = useSelector((state) => state.postReducer.posts)

  const postDataLoading = useSelector((state) => state.postReducer.loading)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(async () => {
    setIsLoading(true)
    const fetchData = async () => {
      console.log("hello");
      try {
        if (!userData) {
          navigate(path.auth)
        } else {
          console.log(userData,"userDatasssss");

          await dispatch(getAllPosts())
          await dispatch(findUserProfile())
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    fetchData()
  }, [])

  
  
  return (
    <>
        {isLoading && <Preloader/>}
    <div className='Movies '  style={{ backgroundImage: `URL(${back})` }}>
   <Header/> 
   
    <div className='Movie w-full md:h-[80vh] ]'>
        <Container className='overflow-hidden mt-[40px] md:mt-0'>
          <div className="trending">
          <ExploreSingle postData={postData} />
          </div>

           {/* <CustomPagination setPage={setPage} noOfPages={10}/> */}
        </Container>
          <div className='w-full'>
          <SimpleBottomNavigation/>
          </div>
    </div>
  
   </div>
    </>
   

    
  )
}

export default Explore