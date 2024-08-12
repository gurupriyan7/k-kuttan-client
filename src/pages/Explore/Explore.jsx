/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from '@mantine/core'
import React, { useRef, useState } from 'react'
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
import { KeyboardArrowUp } from '@mui/icons-material'
// import PostSide from '../../components/PostSide/PostSide'

const Explore = () => {
  // const userData = getLocalStorageItem('profile')
  const [isLoading, setIsLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const postData = useSelector((state) => state.postReducer.posts)
  const containerRef = useRef(null)
  const shuffled = useRef(false)

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

  console.log("VVV", value)


  console.log(postData, 'postssssssssssssssssss')

  // useEffect(async () => {
  //   if (value === 2) {
  //     // alert('happy')
  //     if (posts?.length > 0) {
  //       const sortData = await posts?.sort((a, b) => {
  //         console.log(a?.likes, 'likes', b?.likes)
  //         return b.likes - a.likes
  //       })
  //       // console.log(posts, 'actual')
  //       console.log(sortData, 'sort')
  //       setPosts(sortData)
  //     }
  //   } else if (value === 1) {
  //     const sortData = await posts?.sort((a, b) => {
  //       console.log(a?.updatedAt, 'updatedAt', b?.updatedAt)
  //       return b.likes - a.likes
  //     })
  //     setPosts(sortData)
  //   } else {

  //     const postDatas = await shuffleArray(posts)
  //     setPosts(postDatas.data)
  //   }
  // }, [value])

  useEffect(async () => {
    setIsLoading(true)
    const fetchData = async () => {
      console.log('hello')
      try {
        // await dispatch(getAllPosts())
        await getAllPosts(undefined, undefined, dispatch, 1, 30);
        // await dispatch(findUserProfile())
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    fetchData()
  }, [])


  useEffect(async () => {
    if (postData?.data && !shuffled.current) {
      const shuffledPosts = await shuffleArray(postData.data)
      setPosts(shuffledPosts)
      shuffled.current = true
    }
  }, [postData])

  const handleScrollToTop = () => {
    if (containerRef.current)
      containerRef.current.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  return (
    <>
      {isLoading && <Preloader />}
      <div className="Movies max-h-screen overflow-y-auto" style={{ backgroundImage: `URL(${back})` }}>
        <Header />

        <div className="Movie">
          <Container>
            <div className="trending">
              <ExploreSingle postData={posts} />
            </div>

            {/* <CustomPagination setPage={setPage} noOfPages={10}/> */}
          </Container>


          <button
            onClick={handleScrollToTop}
            title="Scroll to top"
            className="flex justify-center items-center h-10 w-10 bg-gray-100 text-black rounded-full mr-4 sm:mr-6 md:mr-8 sm:mb-16 md:mb-20 mb-12 lg:mr-[15vw] 2xl:mr-[20vw] fixed right-0 bottom-0"
          >
            <KeyboardArrowUp />
          </button>


          <div className='w-full'>
            <SimpleBottomNavigation value={value} setValue={setValue} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Explore
