import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './AuthorAuth.css'
import Logo from '../../img/logo.png'
import authback from '../../img/authback.png'
import { useNavigate } from 'react-router-dom'
import { path } from '../../paths/paths'
import { AuthorLogin, AuthorSignUp } from '../../actions/auth.actions'
import { useSnackbar } from 'notistack'

const AuthorAuth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const [isLoading, setIsLoading] = useState(false)
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
      <div className="flex md:gap-8 mt-[8rem] md:mt-0">
        <img src={Logo} alt="" style={{ width: '10rem', height: '10rem' }} />
        <div className="">
          <h1  className='text-[2rem] sm:text-[3rem] test-color font-[600]'>KAMBI KUTTAPPAN</h1>
          <h6 className='subh'>Explore The World Of Stories</h6>
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
      AuthorLogin({
        email: loginData?.email,
        password: loginData?.password,
      }),
    )
    console.log(loginData, 'loginData')
  }

  // const {  } = useSelector(
  //   (state) => state?.auth,
  // )

  useEffect(() => {
    if (authData?.data && !isError) {
      enqueueSnackbar('Login SuccessFully!', {
        variant: 'success',
        ContentProps: {
          style: { backgroundColor: 'green' },
        },
      })
      navigate(path.home)
    }
  }, [authData])
  useEffect(() => {
    setErrorMessage('')
  })

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
    } else {
      setErrorMessage('')
    }
  }, [isError, error])

  return (
    <div className="a-right" style={{ color: 'black' }}>
      <form onSubmit={loginSubmit} className="infoForm authForm">
        <h3>Author LogIn</h3>
        <h4
          style={{
            color: 'red',
            display: 'none',
            ...(errorMessage && { display: 'block' }),
          }}
        >
          {errorMessage}
        </h4>
        <div>
          <input
            type="email"
            placeholder="Email"
            className="infoInput placeholder-gray-600"
            name="email"
            required
            id="email"
            onChange={(e) => {
              console.log(e.target?.value, 'value')
              setLoginData({
                ...loginData,
                email: e.target?.value,
              })
              setErrorMessage('')
            }}
          />
        </div>

        <div>
          <input
            type="password"
            className="infoInput placeholder-gray-600"
            placeholder="Password "
            name="password"
            required
            id="password"
            onChange={(e) => {
              setLoginData({
                ...loginData,
                password: e.target?.value,
              })
              setErrorMessage('')
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
            {isLoading ? 'Loading' : 'Login'}
          </button>
        </div>
        <div style={{ display: 'grid', justifyContent: 'center' }}>
          <span style={{ fontSize: '12px' }}>
            forgot Password :
            <span
              onClick={(e) => {
                e.preventDefault()
                navigate(`${path.forgotPassword}?role=author`)
              }}
              className="linkText"
            >
              click here..
            </span>
          </span>
          <span style={{ fontSize: '12px' }}>
            If you are an Reader?
            <span
              onClick={(e) => {
                e.preventDefault()
                navigate(path.auth)
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
    e.preventDefault()
    if (signUpdata?.password?.length < 4) {
      enqueueSnackbar('Password must be min 4 characters', {
        variant: 'warning',
        ContentProps: {
          style: { backgroundColor: 'yellow' },
        },
      })
    } else {
      await dispatch(
        AuthorSignUp({
          ...signUpdata,
        }),
      )
    }
    console.log(signUpdata, 'signUPdata')
  }

  useEffect(() => {
    if (authData?.data && !isError) {
      enqueueSnackbar('SignUp SuccessFully!', {
        variant: 'success',
        ContentProps: {
          style: { backgroundColor: 'green' },
        },
      })
      navigate(path.auth)
    }
  }, [authData])
  useEffect(() => {
    setErrorMessage('')
  })

  useEffect(() => {
    if (isError && error != null && errorShow) {
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
        <h3>Author SignUp</h3>
        {/* <h4 style={{ color: 'red' }}>{errorMessage}</h4> */}

        <div>
          <input
            type="text"
            placeholder="FirstName"
            className="infoInput placeholder-gray-600"
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
            className="infoInput placeholder-gray-600"
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
            className="infoInput placeholder-gray-600"
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
            className="infoInput placeholder-gray-600"
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

        <div>
          <input
            type="password"
            className="infoInput placeholder-gray-600"
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
        </div>

        <div>
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

export default AuthorAuth
