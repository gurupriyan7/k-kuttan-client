import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Auth.css'
import Logo from '../../img/logo.png'
import authback from '../../img/authback.png'
// import { login } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { path } from '../../paths/paths'
import { logIn, signUp } from '../../actions/auth.actions'
import { getLocalStorageItem } from '../../utils/appUtils'
import { useSnackbar } from 'notistack'
// import { toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import { NavLink } from 'react-router-dom'
// import { path } from '../../paths/paths'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)

  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const userData = getLocalStorageItem('profile')

  useEffect(() => {
    if (userData) {
      navigate(path.home)
    }
  }, [userData])
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

      {isLogin ? (
        <LogIn
          setIsLogin={setIsLogin}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      ) : (
        <SignUp
          setIsLogin={setIsLogin}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  )
}
function LogIn({ setIsLogin, errorMessage, setErrorMessage }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })
  const [errorShow, setErrorShow] = useState(false)

  const { authData, error, isError, isLoading } = useSelector(
    (state) => state.authReducer,
  )

  const loginSubmit = async (e) => {
    setErrorShow(true)
    e.preventDefault()
    setErrorMessage('')
    await dispatch(
      logIn({
        email: loginData?.email,
        password: loginData?.password,
      }),
    )
    console.log(loginData, 'loginData')
  }

  useEffect(() => {
    if (authData?.data && !isError) {
      enqueueSnackbar('Login SuccessFully!', {
        variant: 'success',
        autoHideDuration: 2000,
        ContentProps: {
          style: { backgroundColor: 'green' },
        },
      })
      navigate(path.home)
    }
  }, [authData])

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

  return (
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
          <span style={{ fontSize: '12px' }}>
            Don't have an account ?
            <span
              onClick={(e) => {
                e.preventDefault()
                setIsLogin(false)
              }}
              className="linkText"
            >
              SignUp
            </span>
          </span>
          <button className="button infoButton">
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </div>
        <div style={{ display: 'grid', justifyContent: 'center' }}>
          <span style={{ fontSize: '12px' }}>
          forgot Password : 
            <span
              onClick={(e) => {
                e.preventDefault()
                navigate(`${path.forgotPassword}?role=user`)
              }}
              className="linkText"
            >
              click here..
            </span>
          </span>
          <span style={{ fontSize: '12px' }}>
            If you are an Author?
            <span
              onClick={(e) => {
                e.preventDefault()
                navigate(path.authorAuth)
              }}
              className="linkText"
            >
              signIn
            </span>
          </span>
        </div>
      </form>
    </div>
  )
}
function SignUp({ setIsLogin, errorMessage, setErrorMessage }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const [errorShow, setErrorShow] = useState(false)

  const { authData, error, isError } = useSelector((state) => state.authReducer)

  const [signUpdata, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    // phoneNumber:"",
    email: '',
  })

  const handleSignUp = async (e) => {
    setErrorShow(true)
    e.preventDefault()
    if (signUpdata?.password?.length < 4) {
      enqueueSnackbar('Password must be min 4 characters', {
        variant: 'warning',
        autoHideDuration: 2000,
        ContentProps: {
          style: { backgroundColor: 'yellow' },
        },
      })
    } else {
      await dispatch(
        signUp({
          ...signUpdata,
        }),
      )
    }
  }

  useEffect(() => {
    if (authData?.data && !isError) {
      enqueueSnackbar('SignUp SuccessFully!', {
        variant: 'success',
        ContentProps: {
          style: { backgroundColor: 'green' },
        },
      })
      navigate(path.home)
    }
  }, [authData])

  useEffect(() => {
    if (isError && error != null && errorShow) {
      console.log(error, 'error------ssss', error?.response)
      if (isError && error) {
        enqueueSnackbar(error?.response?.data?.message ?? ' SignUp failed!!', {
          variant: 'error',
          ContentProps: {
            style: { backgroundColor: 'red' },
          },
        })
      }
    }
  }, [isError, error])
  return (
    <div className="a-right" style={{ color: 'black' }}>
      <form onSubmit={handleSignUp} className="infoForm authForm">
        <h3>SignUp</h3>
        {/* <h4 style={{ color: 'red' }}>{errorMessage}</h4> */}

        <div>
          <input
            type="text"
            placeholder="FirstName"
            className="infoInput"
            name="firstName"
            required
            id="firstName"
            onChange={(e) => {
              setSignUpData({
                ...signUpdata,
                firstName: e.target?.value,
              })
              setErrorMessage('')
            }}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="LastName"
            className="infoInput"
            name="lastName"
            required
            id="lastName"
            onChange={(e) => {
              setSignUpData({
                ...signUpdata,
                lastName: e.target?.value,
              })
              setErrorMessage('')
            }}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="UserName"
            className="infoInput"
            name="userName"
            required
            id="userName"
            onChange={(e) => {
              setSignUpData({
                ...signUpdata,
                userName: e.target?.value,
              })
              setErrorMessage('')
            }}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Email"
            className="infoInput"
            name="email"
            required
            id="email"
            onChange={(e) => {
              setSignUpData({
                ...signUpdata,
                email: e.target?.value,
              })
              setErrorMessage('')
            }}
          />
        </div>
        {/* <div>
        <input
          type="text"
          placeholder="PhoneNumber"
          className="infoInput"
          name="phoneNumber"
          // required
          id="phoneNumber"
          onChange={(e) => {
            setSignUpData({
              ...signUpdata,
              phoneNumber: e.target?.value,
            })
            setErrorMessage('')
          }}
        />
      </div> */}

        <div className="pass-group">
          <input
            type="password"
            className="infoInput"
            placeholder="Password"
            name="password"
            required
            id="password"
            onChange={(e) => {
              setSignUpData({
                ...signUpdata,
                password: e.target?.value,
              })
              setErrorMessage('')
            }}
          />
          {/* <label className='pass-label'>Password must be minimum 4 characters</label> */}
        </div>

        <div className="btn-grp">
          <span style={{ fontSize: '12px' }}>
            Already have an account ?
            <span
              onClick={(e) => {
                e.preventDefault()
                setIsLogin(true)
              }}
              className="linkText"
            >
              SignIn
            </span>
          </span>
          <button className="button infoButton">SignUp</button>
        </div>
      </form>
    </div>
  )
}

export default Auth
