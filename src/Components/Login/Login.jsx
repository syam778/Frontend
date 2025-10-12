import React, { useContext, useEffect, useState } from 'react'
import './Login.css'
import { photo } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from "axios"

const Login = ({ setShowLogin }) => {
  const {url,setToken} = useContext(StoreContext)
  const [curentState, setCurentState] = useState("Sing-up")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

   const onLogin = async(event)=>{
    event.preventDefault()
    let newUrl = url;
    if(curentState==="Login"){
      newUrl += "/api/user/login"
    }
    else{
      newUrl += "/api/user/register"
    }
    const response = await axios.post(newUrl,data);
    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token)
      setShowLogin(false)
    }
    else{
      alert(response.data.message)
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
          ? <p>Creat a new account ?<span onClick={() => setCurentState("Sing Up")}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => setCurentState("Login")}>Login here</span></p>}


      </form>
    </div>
  )
}

export default Login