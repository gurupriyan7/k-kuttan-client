import { useState } from 'react'
import './ForgotPassword.css'
import { useNavigate } from 'react-router-dom'

import Logo from '../../img/logo.png'
import authback from '../../img/authback.png'
import { path } from '../../paths/paths'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: '',
  })

  const haldleForgotPassword = async (e) => {
          e.preventDefault()
    alert(forgotPasswordData?.email)
  }

  return (
    <div
      className="Auth"
      style={{
        backgroundImage: `URL(${authback})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        backgroundRepeat: 'no-repeat',
        boxShadow: 'inset 0 0 0 100vmax rgba(0,0,0,.4)',
      }}
    >
      <div className="a-left">
        <img src={Logo} alt="" style={{ width: '10rem', height: '10rem' }} />
        <div className="Webname">
          <h1>KAMBI KUTTAPAN</h1>
          <h6>Explore The World Of Stories</h6>
        </div>
      </div>

      <div className="a-right" style={{ color: 'black' }}>
        <form onSubmit={haldleForgotPassword} className="infoForm authForm">
          <h3>Forgot Password</h3>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="infoInput"
              name="email"
              required
              id="email"
              onChange={(e) => {
                console.log(e.target?.value, 'value')
                setForgotPasswordData({
                  ...forgotPasswordData,
                  email: e.target?.value,
                })
              }}
            />
          </div>

          <div>
            <span style={{ fontSize: '12px' }}>
              Back to Login page : 
              <span
                onClick={(e) => {
                  e.preventDefault()
                  navigate(path.auth)
                }}
                className="linkText"
              >
                Click here...
              </span>
            </span>
            <button className="button infoButton">send Email</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
