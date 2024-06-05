import React, { useEffect, useState } from 'react'
import './InfoCard.css'
import { UilPen } from '@iconscout/react-unicons'
import ProfileModal from '../ProfileModal.jsx/ProfileModal'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../actions/auth.actions'
import { findUserProfile } from '../../actions/user.actions'
import { path } from '../../paths/paths';

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const authData = useSelector((state) => state.authReducer.authData)
  const logoutClick = async () => {
    // await dispatch(logout())
    await localStorage.clear()
    navigate(path.auth)
  }

  useEffect(() => {
    // alert("happy")
    dispatch(findUserProfile())
  }, [])

  return (
    <div className="InfoCard" style={{ color: 'black' }}>
      <div className="infoHead">
        <h4>Your Info</h4>
        <div>
          <UilPen
            width="2rem"
            height="1.2rem"
            onClick={() => setModalOpened(true)}
          />
          <ProfileModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
            authData={authData}
          />
        </div>
      </div>

      <div className="info">
        <span>
          <b>FirstName : </b>
        </span>
        <span>{authData?.data?.firstName}</span>
      </div>

      <div className="info">
        <span>
          <b>LastName : </b>
        </span>
        <span>{authData?.data?.lastName}</span>
      </div>

      <div className="info">
        <span>
          <b>UserName :</b>
        </span>
        <span>{authData?.data?.userName}</span>
      </div>
      <div className="info">
        <span>
          <b>Email :</b>
        </span>
        <span>{authData?.data?.email}</span>
      </div>
      <div className="info">
        <span>
          <b>PhoneNumber :</b>
        </span>
        <span>{authData?.data?.phoneNumber}</span>
      </div>

      <button onClick={logoutClick} className="button logout-button">
        Logout
      </button>
    </div>
  )
}

export default InfoCard
