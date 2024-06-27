import './AdminAuth.css'
import Logo from '../../img/logo.png'
import authback from '../../img/authback.png'
import { useNavigate } from 'react-router-dom'
import { getLocalStorageItem } from '../../utils/appUtils'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { path } from '../../paths/paths'
import { adminLogin } from '../../actions/auth.actions'
const AdminAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const { adminData, error, isError, isLoading } = useSelector(
    (state) => state.authReducer,
  )

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })
  const [errorShow, setErrorShow] = useState(false)

  const userData = getLocalStorageItem('profile')

  useEffect(() => {
    if (adminData?.data && !isError) {
      enqueueSnackbar('Login SuccessFully!', {
        variant: 'success',
        autoHideDuration: 2000,
        ContentProps: {
          style: { backgroundColor: 'green' },
        },
      })
      navigate(path.home)
    }
  }, [adminData])

  useEffect(() => {
    if (isError && error != null && errorShow) {
      enqueueSnackbar(
        (error?.message || error?.response?.data?.message) ?? 'Login failed!',
        {
          variant: 'error',
          autoHideDuration: 2000,
          ContentProps: {
            style: { backgroundColor: 'red' },
          },
        },
      )
    }
  }, [isError, error])

  useEffect(() => {
    if (adminData?.data) {
      navigate(path.home)
    }
  }, [adminData?.data])

  const loginSubmit = async (e) => {
    setErrorShow(true)
    e.preventDefault()
    await dispatch(
      adminLogin({
        email: loginData?.email,
        password: loginData?.password,
      }),
    )
    console.log(loginData, 'loginData')
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
        <form onSubmit={loginSubmit} className="infoForm authForm">
          <h3>Log In</h3>
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
                setLoginData({
                  ...loginData,
                  email: e.target?.value,
                })
              }}
            />
          </div>

          <div>
            <input
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
              required
              id="password"
              onChange={(e) => {
                setLoginData({
                  ...loginData,
                  password: e.target?.value,
                })
              }}
            />
          </div>

          <div>
            <button className="button infoButton2">
              {/* {isLoading ? 'Loading...' : 'Login'} */}
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminAuth
