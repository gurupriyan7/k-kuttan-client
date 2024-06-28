import { useState } from 'react'
import './ResetPassword.css'
import { useNavigate, useSearchParams } from 'react-router-dom'

import Logo from '../../img/logo.png'
import authback from '../../img/authback.png'
import { path } from '../../paths/paths'
import { resetPassword } from '../../api/authRequest'
import { useSnackbar } from 'notistack'

const ResetPassword = () => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [searchParams] = useSearchParams()
  const [resetPasswordData, setResetPasswordData] = useState({
    password: '',
    confirmPassword: '',
  })
  const paramValue = searchParams.get('id')

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    if (resetPasswordData?.password !== resetPasswordData?.confirmPassword) {
      enqueueSnackbar('Password and Confirm password must be same', {
        variant: 'warning',
        autoHideDuration: 2000,
        ContentProps: {
          style: { backgroundColor: 'yellow' },
        },
      })
    } else {
      try {
        await resetPassword({
          password: resetPasswordData.password,
          resetId: paramValue,
        })
        enqueueSnackbar('Password reset successfully. ', {
          variant: 'success',
          autoHideDuration: 2000,
          ContentProps: {
            style: { backgroundColor: 'green' },
          },
        })
        navigate(path.auth)
      } catch (error) {
        enqueueSnackbar(
          error?.response?.data?.message ?? 'Failed to Reset failed..',
          {
            variant: 'error',
            autoHideDuration: 2000,
            ContentProps: {
              style: { backgroundColor: 'red' },
            },
          },
        )
      }
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
      <div className="a-left">
        <img src={Logo} alt="" style={{ width: '10rem', height: '10rem' }} />
        <div className="Webname">
          <h1>KAMBI KUTTAPPAN</h1>
          <h6>Explore The World Of Stories</h6>
        </div>
      </div>

      <div className="a-right" style={{ color: 'black' }}>
        <form onSubmit={handleForgotPassword} className="infoForm authForm">
          <h3>Reset Password</h3>
          <div>
            <input
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
              required
              id="password"
              onChange={(e) => {
                setResetPasswordData({
                  ...resetPasswordData,
                  password: e.target?.value,
                })
              }}
            />
          </div>
          <div>
            <input
              type="password"
              className="infoInput"
              placeholder="Confirm password"
              name="confirmPassword"
              required
              id="re-enter password"
              onChange={(e) => {
                setResetPasswordData({
                  ...resetPasswordData,
                  confirmPassword: e.target?.value,
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
            <button className="button infoButton">Reset</button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default ResetPassword
