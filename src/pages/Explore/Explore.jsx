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
import { getLocalStorageItem } from '../../utils/appUtils'
import { useNavigate } from 'react-router-dom'
import { path } from '../../paths/paths'
import { getAllPosts } from '../../actions/post.actions'
import { findUserProfile } from '../../actions/user.actions'

const Explore = () => {
   const testData=[{id:1,title:"title1",story:"story1"},
   {id:1,title:"title1",story:"story1"},
   {id:2,title:"title1",story:"story1"},
   {id:3,title:"title1",story:"story1"},
   {id:3,title:"title1",story:"story1"},
   {id:3,title:"title1",story:"story1"},
   {id:3,title:"title1",story:"story1"},
   {id:3,title:"title1",story:"story1"},
   {id:3,title:"title1",story:"story1"},
   {id:3,title:"title1",story:"story1"},
   {id:3,title:"title1",story:"story1"},
   {id:3,title:"title1",story:"story1"}

   ]
    const [page,setPage]=useState(1)
    const userData = getLocalStorageItem('profile')
    const postData = useSelector((state) => state.postReducer.posts)
    console.log("hello",postData);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(async () => {
      const fetchData = async () => {
       
        try {
          if (!userData) {
            //  navigate(path.auth)
            alert("no user data")
          } else {
            console.log(userData,"userDatasssss");
            await dispatch(getAllPosts())
            await dispatch(findUserProfile())
          }
        } catch (error) {
          console.error('Error fetching posts:', error)
        }
      }
  
      fetchData()
    }, [])
  
  return (
    <>
     
    <div className='Movies'  style={{ backgroundImage: `URL(${back})` }}>
   <Header/> 
   
    <div className='Movie'>
        <Container>
         <span className='pageTitle'>Trending</span>
          <div className="trending"   style={{marginTop:"3rem"}}>
            {
              testData && testData.map((c)=>
                <ExploreSingle
                //  key={c._id} 
                id={c.id}
                title={c.title}
                story={c.story}
                //  poster={c.poster_path} 
                // title={c.title || c.name}
                //  date={c.first_air_date || c.release_date}
                //   media_type={c.media_type} 
                //   vote_average={c.vote_average}
                  />
              )
            }
          </div>

           <CustomPagination setPage={setPage} noOfPages={10}/>
        </Container>
          <SimpleBottomNavigation/>
    </div>
  
   </div>
    </>
   

    
  )
}

export default Explore