/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
import React, { useState, useRef, useEffect } from 'react'
import defaultProfile from '../../img/default-profile.jpg'
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
import { UserRole } from '../../config/enums'

const PostShare = ({ data, setData, searchText, setSearchText }) => {
  const authData = useSelector((state) => state.authReducer.authData)

  const [image, setImage] = useState(null)

  const imageRef = useRef()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSearchText = async (e) => {
    setTimeout(() => {
      setSearchText(e?.target?.value)
    }, 3000)
  }

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
  console.log(data, 'dataaaa ', authData)
  const isAuthor = authData?.data?.role === UserRole.AUTHOR

  const FollowerImage = ({ src }) => {
    const handleError = (event) => {
      // alert('hello')
      event.target.src = defaultProfile
    }

    return (
      <img
        src={src}
        alt="Follower"
        onError={handleError}
        width={48}
        height={48}
        className="profileImg-"
      />
    )
  }

  return (
    <div className="PostShare">
      <div>
        <FollowerImage
          src={`${appConfig?.awsBucketUrl}/${authData?.data?.profileImage}`}
        />
        <input
          className="post-input"
          type="text"
          placeholder="Search Posts..."
          // value={searchText}
          disabled={!isAuthor}
          onChange={handleSearchText}
        />
      </div>
      <div className="postOptions">
        <div className="tooltip">
          <div
            className="photo-option option"
            style={{ color: 'var(--photo)' }}
            // onClick={() => imageRef.current.click()}
            ref={imageRef}
            onChange={onImageChange}
          >
            <UilScenery />
            Photo
            <span class="tooltiptext">Comming Soon...</span>
          </div>
        </div>
        <div className="tooltip">
          <div className="option" style={{ color: 'var(--video)' }}>
            <UilPlayCircle />
            Video
            <span class="tooltiptext">Comming Soon...</span>
          </div>
        </div>
        <div className="tooltip">
          <div className="option" style={{ color: 'var(--location)' }}>
            <UilLocationPoint />
            Location
            <span class="tooltiptext">Comming Soon...</span>
          </div>{' '}
        </div>
        <div className="tooltip">
          <div className="option" style={{ color: 'var(--shedule)' }}>
            <UilSchedule />
            Shedule
            <span class="tooltiptext">Comming Soon...</span>
          </div>
        </div>
        {authData?.data && isAuthor && (
          <button
            onClick={(e) => {
              e.preventDefault()
              navigate(path.addPost)
            }}
            style={{ color: 'black' }}
            className="button ps-button"
          >
            Share
          </button>
        )}
        <div style={{ display: 'none' }}>
          <input
            type="file"
            name="myImage"
            ref={imageRef}
            onChange={onImageChange}
          />
        </div>
      </div>
      {/* {data?.image && (
        <div className="previewImage">
          <UilTimes
            onClick={() => {
              setImage(null), setData({ ...data, image: null })
            }}
          />
          <img src={image} alt="sdfsf" />
        </div>
      )} */}
    </div>
  )
}

export default PostShare
