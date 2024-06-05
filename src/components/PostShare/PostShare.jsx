/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
import React, { useState, useRef, useEffect } from 'react'
import ProfileImage from '../../img/profileImg.jpg'
import './PostShare.css'
import { UilScenery } from '@iconscout/react-unicons'
import { UilPlayCircle } from '@iconscout/react-unicons'
import { UilLocationPoint } from '@iconscout/react-unicons'
import { UilSchedule } from '@iconscout/react-unicons'
import { UilTimes } from '@iconscout/react-unicons'
import { useDispatch, useSelector } from 'react-redux'
import { getPreSignedUrlUtill } from '../../utils/s3.utils'
import { useNavigate } from 'react-router-dom'
import { findUserProfile } from '../../actions/user.actions'
import { path } from '../../paths/paths'
import { appConfig } from '../../config/appConfig'

const PostShare = ({ data, setData }) => {
  const authData = useSelector((state) => state.authReducer.authData)

  const [image, setImage] = useState(null)
  const imageRef = useRef()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(async () => {
    const fetchData = async () => {
      try {
        if (!authData) {
          navigate(path.auth)
        } else {
          await dispatch(findUserProfile())
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    fetchData()
  }, [])

  const onImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0]
      setImage(URL.createObjectURL(img))

      const imageData = await getPreSignedUrlUtill(img)
      setData({
        ...data,
        image: imageData ?? '',
      })
      console.log(imageData, 'image-image')
    }
  }
  console.log(data,"dataaaa ");

  return (
    <div className="PostShare">
      <div>
        <img
          src={
            `${appConfig.awsBucketUrl}/${authData?.data?.profileImage}` ??
            ProfileImage
          }
          // src={authData?.data?.profileImage ?? ProfileImage}
          alt=""
          width={48}
          height={48}
        />
        <input
          className="post-input"
          type="text"
          placeholder="What's happening"
        />
      </div>
      <div className="postOptions">
        <div
          className="photo-option"
          style={{ color: 'var(--photo)' }}
          onClick={() => imageRef.current.click()}
          ref={imageRef}
          onChange={onImageChange}
        >
          <UilScenery />
          Photo
        </div>
        <div className="option" style={{ color: 'var(--video)' }}>
          <UilPlayCircle />
          Video
        </div>{' '}
        <div className="option" style={{ color: 'var(--location)' }}>
          <UilLocationPoint />
          Location
        </div>{' '}
        <div className="option" style={{ color: 'var(--shedule)' }}>
          <UilSchedule />
          Shedule
        </div>
        <button style={{ color: 'black' }} className="button ps-button">
          Share
        </button>
        <div style={{ display: 'none' }}>
          <input
            type="file"
            name="myImage"
            ref={imageRef}
            onChange={onImageChange}
          />
        </div>
      </div>
      {data?.image && (
        <div className="previewImage">
          <UilTimes
            onClick={() => {
              setImage(null), setData({ ...data, image: null })
            }}
          />
          <img src={image} alt="sdfsf" />
        </div>
      )}
    </div>
  )
}

export default PostShare
