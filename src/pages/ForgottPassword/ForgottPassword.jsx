import { useState } from 'react'
import './ForgotPassword.css'
import { useNavigate, useSearchParams } from 'react-router-dom'

import Logo from '../../img/logo.png'
import authback from '../../img/authback.png'
import { path } from '../../paths/paths'
import { forgotPassword } from '../../api/authRequest'
import { useSnackbar } from 'notistack'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { enqueueSnackbar } = useSnackbar()
  const paramValue = searchParams.get('role')
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: '',
  })

  const haldleForgotPassword = async (e) => {
    e.preventDefault()
    try {
      await forgotPassword({
        email: forgotPasswordData?.email,
        role: paramValue,
      })
      enqueueSnackbar('Link Successfully Send to Mail..', {
        variant: 'success',
        autoHideDuration: 2000,
        ContentProps: {
          style: { backgroundColor: 'green' },
        },
      })
      setForgotPasswordData({
        email: '',
      })
    } catch (error) {
      console.log(error, 'errorrorrororor')
      enqueueSnackbar(error?.response?.data?.message ?? 'Link Send failed...', {
        variant: 'error',
        autoHideDuration: 2000,
        ContentProps: {
          style: { backgroundColor: 'red' },
        },
      })
    }
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
      <div className="flex md:gap-8">
        <img src={Logo} alt="" style={{ width: '10rem', height: '10rem' }} />
        <div className="">
          <h1 className='text-[2rem] sm:text-[3rem] test-color font-[600]'>KAMBI KUTTAPPAN</h1>
          <h6 className='subh'>Explore The World Of Stories</h6>
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
              value={forgotPasswordData.email}
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
