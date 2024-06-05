import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './AuthorAuth.css'
import Logo from '../../img/logo.png'
import authback from '../../img/authback.png'
// import { login } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { path } from '../../paths/paths'
import { AuthorLogin, AuthorSignUp } from '../../actions/auth.actions'
// import { toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import { NavLink } from 'react-router-dom'
// import { path } from '../../paths/paths'

const AuthorAuth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
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
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>KAMBI KUTTAPAN</h1>
          <h6>Explore the ideas throughout the worlds</h6>
        </div>
      </div>

      {isLogin ? (
        <LogIn setIsLogin={setIsLogin} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
      ) : (
        <SignUp setIsLogin={setIsLogin} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
      )}
    </div>
  )
}
function LogIn({ setIsLogin ,errorMessage, setErrorMessage }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })


  const { authData, error, isError } = useSelector((state) => state.authReducer)

  const loginSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    await dispatch(
      AuthorLogin({
        email: loginData?.email,
        password: loginData?.password,
      }),
    )
    console.log(loginData,"loginData")
  }

  // const {  } = useSelector(
  //   (state) => state?.auth,
  // )

  useEffect(() => {
    if (authData?.data && !isError) {
      navigate(path.home)
    }
  }, [authData])
  useEffect(()=>{
    setErrorMessage("")
  })

  useEffect(() => {
    if (isError && error != null) {
      // toast.error(error?.message)
      setErrorMessage(error?.message)
    } else {
      setErrorMessage('')
    }
  }, [isError, error])

  return (
    <div className="a-right" style={{ color: 'black' }}>
      <form onSubmit={loginSubmit} className="infoForm authForm">
        <h3>Author LogIn</h3>
        <h4 style={{ color: 'red',display:"none",...(errorMessage&&{display:"block"}) }}>{errorMessage}</h4>
        <div>
          <input
            type="email"
            placeholder="Email"
            className="infoInput"
            name="email"
            required
            id="email"
            onChange={(e) => {
              console.log(e.target?.value,"value");
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
          <button className="button infoButton">Login</button>
        </div>
        <div>
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
          {/* <button className="button infoButton">Login</button> */}
        </div>
      </form>
    </div>
  )
}
function SignUp({ setIsLogin ,errorMessage,setErrorMessage }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { authData, error, isError } = useSelector((state) => state.authReducer)

  const [signUpdata,setSignUpData]=useState({
    firstName:"",
    lastName:"",
    userName:"",
    password:"",
    // phoneNumber:"",
    email:""
  })

  const handleSignUp = async (e)=>{
    e.preventDefault()
    await dispatch(
      AuthorSignUp({
        ...signUpdata
      }),
    )
console.log(signUpdata,"signUPdata");
  }

  useEffect(() => {
    if (authData?.data && !isError) {
      navigate(path.home)
    }
  }, [authData])
  useEffect(()=>{
    setErrorMessage("")
  })

  useEffect(() => {
    if (isError && error != null) {
      // toast.error(error?.message)
      setErrorMessage(error?.message)
    } else {
      setErrorMessage('')
    }
  }, [isError, error])
  return (
    <div className="a-right" style={{ color: 'black' }}>
    <form onSubmit={handleSignUp} className="infoForm authForm">
      <h3>Author SignUp</h3>
      {/* <h4 style={{ color: 'red' }}>{errorMessage}</h4> */}
    
      <div >
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
      <div >
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
      <div >
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

      <div>
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
