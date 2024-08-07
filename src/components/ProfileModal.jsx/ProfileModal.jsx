/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-expressions */
import { Modal, useMantineTheme } from '@mantine/core'
import { useEffect, useRef, useState } from 'react'
import { UilTimes } from '@iconscout/react-unicons'
import { getPreSignedUrlUtill } from '../../utils/s3.utils'
import { appConfig } from '../../config/appConfig'
import { useDispatch } from 'react-redux'
import { updateAuthor, updateUser } from '../../actions/auth.actions'
import './profileModal.css'
import { UserRole } from '../../config/enums';


function ProfileModal({ modalOpened, setModalOpened, authData }) {
  const theme = useMantineTheme()
  const dispatch = useDispatch()
  const isAuthor = authData?.data?.role === UserRole.AUTHOR


  const [image, setImage] = useState({
    profileImage: `${appConfig.awsBucketUrl}/${authData?.data?.profileImage}`,
    coverImage: `${appConfig.awsBucketUrl}/${authData?.data?.coverImage}`,
  })

  // useEffect(() => {}, [image])
  const imageRef = useRef()

  const [userData, setUserData] = useState({
    ...authData?.data,
  })

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const onImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0]
      setImage({
        ...image,
        [event.target.name]: URL.createObjectURL(img) ?? '',
      }) 
      console.log(image, 'image', event.target.name)
      // setImage(URL.createObjectURL(img))

      const imageData = await getPreSignedUrlUtill(img)
      setUserData({ ...userData, [event.target.name]: imageData ?? '' })
      console.log(imageData, 'image-image')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(userData, 'updateData')
    if(isAuthor){
      dispatch(
        updateAuthor({
          firstName: userData?.firstName,
          lastName: userData?.lastName,
          profileImage: userData?.profileImage,
          coverImage: userData?.coverImage,
          // phoneNumber: userData?.phoneNumber,
          email: userData?.email,
          userName:userData?.userName
        }),
      ) 

      // setModalOpened(false)
    }else{

      dispatch(
        updateUser({
          firstName: userData?.firstName,
          lastName: userData?.lastName,
          profileImage: userData?.profileImage,
          coverImage: userData?.coverImage,
          // phoneNumber: userData?.phoneNumber,
          email: userData?.email,
          userName:userData?.userName
        }),
        // setModalOpened(false)
      )
    }
  }

  const modalStyles = {
    width: '100%',
    maxWidth: '100%',
    '@media(min-width: 900px)': {
      width: '60%',
      maxWidth: '60%',
      
    }
  }

  return (
    <Modal
      overlayColor={
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      // size="55%"
      styles={{ modal: modalStyles }}
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
     <form className="w-full">
        <h3>Your info </h3>

        <div className="mt-5 grid gap-4 md:flex">
          <div className="flex flex-col w-full">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              onChange={handleChange}
              className="infoInput"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              value={userData.firstName}
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              onChange={handleChange}
              className="infoInput"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              value={userData.lastName}
            />
          </div>
        </div>

        <div className="mt-5">
          <div className="grid w-full">
            <label htmlFor="userName">UserName</label>
            <input
              type="text"
              onChange={handleChange}
              className="infoInput"
              name="userName"
              id="userName"
              placeholder="User Name"
              value={userData.userName}
            />
          </div>
        </div>

        <div className="mt-5">
          <div className="grid w-full">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              onChange={handleChange}
              className="infoInput"
              name="email"
              placeholder="Email"
              value={userData.email}
            />
          </div>
        </div>

        <div className="mt-5">
          <div className="grid w-full">
            <label htmlFor="profileImage">ProfileImage</label>
            <input
              id="profileImage"
              type="file"
              name="profileImage"
              className="infoInput"
              ref={imageRef}
              onChange={onImageChange}
            />
            {(userData?.profileImage || image.profileImage) && (
              <div>
                <UilTimes
                  style={{ cursor: 'pointer' }}
                  onClick={(event) => {
                    setImage({
                      ...image,
                      profileImage: null,
                    }),
                      setUserData({ ...userData, profileImage: null })
                  }}
                />
                <img
                  className="previewImageDiv"
                  src={image.profileImage}
                  alt="profileImage"
                />
              </div>
            )}
          </div>

          <div className="grid w-full mt-5">
            <label htmlFor="coverImage">CoverImage</label>
            <input
              id="coverImage"
              type="file"
              name="coverImage"
              className="infoInput"
              ref={imageRef}
              onChange={onImageChange}
            />
            {(userData?.coverImage || image.coverImage) && (
              <div>
                <UilTimes
                  style={{ cursor: 'pointer' }}
                  onClick={(event) => {
                    setImage({
                      ...image,
                      coverImage: null,
                    }),
                      setUserData({ ...userData, coverImage: null })
                  }}
                />
                <img
                  className="previewImageDiv"
                  src={image.coverImage}
                  alt="coverImage"
                />
              </div>
            )}
          </div>
        </div>

        <button
          style={{
            width: '100%',
            marginTop: (image?.coverImage || image?.profileImage) ? '4rem' : '0',
          }}
          type="submit"
          className="button infoInput"
          onClick={handleSubmit}
        >
          Update
        </button>
      </form>
    </Modal>
  )
}

export default ProfileModal
