import React, { useContext, useEffect, useState } from 'react'
import './Login.css'
import { photo } from '../../assets/assets'
//import { StoreContext } from '../../Context/StoreContext'
import axios from "axios"
import { StoreContext } from '../../Context/StoreContext'
//import { StoreContext } from '../../context/Storecontext'

const Login = ({ setShowLogin }) => {
  const { url, setToken,doneAudio,submitAudio,wonAudio,addAudio,timeAudio, } = useContext(StoreContext)
  const [curentState, setCurentState] = useState("Sing-up")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onLogin = async (event) => {
    event.preventDefault()
    let newUrl = url;
    if (curentState === "Login") {
      newUrl += "/api/user/login"
      doneAudio.play()
    }
    else {
      newUrl += "/api/user/register"
      submitAudio.play()
    }
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token)
     // localStorage.setItem("userId", user._id);
      setShowLogin(false)
      submitAudio.play()
    }
    

    else {
      alert(response.data.message)
      doneAudio.play()
    }

  }

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  useEffect(() => {
    console.log(data);
  }, [data])

  return (
    <div className='login'>
      <form onSubmit={onLogin} action="" className='login-cont'>
        <div className="titel">
          <h2>{curentState}</h2>
          <img onClick={() => setShowLogin(false)} src={photo.seting} alt="" />

        </div>
        <div className="login-input">
          {curentState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" required placeholder='Enter Your Name' />}

          <input name='email' onChange={onChangeHandler} value={data.email} type="text" required placeholder='Enter Your Gmail' />
          <input name='password' onChange={onChangeHandler} value={data.password} type="text" required placeholder=' Enter Your Password' />
        </div>
        <button type='submit'>{curentState === "Sing Up" ? "Creat Account" : "Login"}</button>
        <div className="login-condition">
          <input type="checkbox" required />
          <p className='checkbox-text'>By continuing, i agree to the terms of use & <br /> privacy policy</p>
        </div>
        {curentState === "Login"
          ? <p>Creat a new account ?<span onClick={() => setCurentState("Sing Up" ) || wonAudio.play()}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => setCurentState("Login" ) || wonAudio.play()}>Login here</span></p>}


      </form>
    </div>
  )
}

export default Login // old code main dont touch

/*

import React, { useContext, useEffect, useState } from 'react'
import './Login.css'
import axios from "axios"

import { useNavigate } from 'react-router-dom'
//import { StoreContext } from '../Context/StoreContext'
import { photo } from '../../assets/assets'
import { StoreContext } from '../../../../Store/src/Context/StoreContext'

const Loginm = ({ setShowLogin }) => {
 //const {doneAudio,submitAudio,wonAudio,addAudio,timeAudio,url,token,setToken} = useContext(StoreContext)
const { url, setToken,doneAudio,submitAudio,wonAudio,addAudio,timeAudio, } = useContext(StoreContext)
  const [curentState, setCurentState] = useState("Sign-up")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const navigate = useNavigate()

  
const onLogin = async (event) => {
  event.preventDefault()

  try {
    let newUrl = url
    if (curentState === "Login") {
      newUrl += "/api/user/login"
    } else {
      newUrl += "/api/user/register"
    }

    submitAudio.play()

    const response = await axios.post(newUrl, data)

    if (response.data.success) {
      setToken(response.data.token)
      localStorage.setItem("token", response.data.token)
      setShowLogin(false)
      submitAudio.play()
    } else {
      alert(response.data.message)
      doneAudio.play()
    }

  } catch (error) {
    console.error("LOGIN ERROR:", error)
    alert("Server error. Please try again.")
    doneAudio.play()
  }
}
  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div className='login'>
      <form onSubmit={onLogin} className='login-cont'>
        <div className="titel">
          <h2  onClick={() =>navigate("/")}>{curentState}</h2>
          <img onClick={() => setShowLogin(false)} src={photo.admin} alt="" />
        </div>

        <div className="login-input">
          {curentState !== "Login" && (
            <input
              name='name'
              value={data.name}
              onChange={onChangeHandler}
              type="text"
              required
              placeholder='Enter Your Name'
            />
          )}

          <input
            name='email'
            value={data.email}
            onChange={onChangeHandler}
            type="email"
            required
            placeholder='Enter Your Gmail'
          />

          <input
            name='password'
            value={data.password}
            onChange={onChangeHandler}
            type="password"
            required
            placeholder='Enter Your Password'
          />
        </div>

        <button type='submit'>
          {curentState === "Sign-up" ? "Create Account" : "Login"}
        </button>

        <div className="login-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms & privacy policy</p>
        </div>

        {curentState === "Login" ? (
          <p>Create new account?
            <span onClick={() => { setCurentState("Sign-up") }}>
              Click here
            </span>
          </p>
        ) : (
          <p>Already have an account?
            <span onClick={() => { setCurentState("Login") }}>
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  )
}

export default Loginm
*/


