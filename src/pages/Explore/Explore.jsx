/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from '@mantine/core'
import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import SimpleBottomNavigation from '../../components/MainNav/SimpleBottomNavigation'
// import axios from 'axios'
import back from '../../img/wp4082523.webp'
import { useEffect } from 'react'
import ExploreSingle from '../../components/ExploreSIngle/ExploreSingle'
import './Explore.css'
// import CustomPagination from '../..//components/Pagination/CustomPagination'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../../actions/post.actions'
import { useNavigate } from 'react-router-dom'
import { path } from '../../paths/paths'
// import { getLocalStorageIt/em } from '../../utils/appUtils'
// import { findUserProfile } from '../../actions/user.actions'
import Preloader from '../../components/Preloader/Preloader'
// import PostSide from '../../components/PostSide/PostSide'

const Explore = () => {
  // const userData = getLocalStorageItem('profile')
  const [isLoading, setIsLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const postData = useSelector((state) => state.postReducer.posts)

  // const postDataLoading = useSelector((state) => state.postReducer.loading)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [value, setValue] = React.useState(0)

  const shuffleArray = async (array = []) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  useEffect(() => {
    setPosts(postData[0]?.data)
  }, [postData])

  console.log(postData, 'postssssssssssssssssss')

  useEffect(async () => {
    if (value === 2) {
      // alert('happy')
      if (posts?.length > 0) {
        const sortData = await posts?.sort((a, b) => {
          console.log(a?.likes, 'likes', b?.likes)
          return b.likes - a.likes
        })
        console.log(posts, 'actual')
        console.log(sortData, 'sort')
        setPosts(sortData)
      }
    } else if (value === 1) {
      const sortData = await posts?.sort((a, b) => {
        console.log(a?.updatedAt, 'updatedAt', b?.updatedAt)
        return b.likes - a.likes
      })
      setPosts(sortData)
    } else {
      const postDatas = await shuffleArray(posts)
      setPosts(postDatas)
    }
  }, [value])

  useEffect(async () => {
    setIsLoading(true)
    const fetchData = async () => {
      console.log('hello')
      try {
        await dispatch(getAllPosts())
        // await dispatch(findUserProfile())
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      {isLoading && <Preloader />}
      <div className="Movies" style={{ backgroundImage: `URL(${back})` }}>
        <Header />

        <div className="Movie">
          <Container>
            <div className="trending">
              <ExploreSingle postData={posts} />
            </div>

            {/* <CustomPagination setPage={setPage} noOfPages={10}/> */}
          </Container>
          <div className='w-full'>
          <SimpleBottomNavigation value={value} setValue={setValue} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Explore
