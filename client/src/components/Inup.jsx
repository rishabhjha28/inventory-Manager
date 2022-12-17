import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../auth'

const Inup = ({purpose}) => {
  
  const initialCrdentials = {
    email:'',
    password:''
  }
  const auth = useAuth()
  const navigate = useNavigate()
  const [credential,setCredential] = useState(initialCrdentials)
  const [userAlready,setUserAlready] = useState(false)

  useEffect(()=>{
    setCredential(initialCrdentials)
  },[purpose])

  useEffect(()=>{
    setTimeout(() => {
      setUserAlready(false)
    }, 3000);
  },[userAlready])

  const handleCredentials =(e)=>{
    const {name,value} = e.target
    setCredential(prev=>{
      return {
        ...prev,
        [name]:value
      }
    })
  }
  const login =()=>{
    axios.post('/user/login', credential)
    .then(function (response) {
      if(response.data === "Login successfull"){
        auth.login(credential.email)
        navigate('/product/'+credential.email,{replace:true})
      }
      else{
        navigate('/wrong-credentials')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  const signup =()=>{
    axios.post('/user/signup',credential)
    .then(function (response) {
      if(response.data==="userAdded"){
        auth.login(credential.email)
        navigate('/product/'+credential.email,{replace:true})
      }
      else if(response.data==="userAlreadyExist"){
        setUserAlready(true)
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  const inUp =(e)=>{
    e.preventDefault()
    purpose === 'login'?login():signup()
  }
  return (
    <div>
        <form className='homeMain' onSubmit={inUp}>
          {
            userAlready && <div className='notification'>User Already Exist</div>
          }
          <h1>{purpose === 'login'?'Log in':'Sign up'}</h1>
          <input required onChange={handleCredentials} value ={credential.email} type="email" name="email" autoFocus placeholder='Enter Email'/>
          <input required onChange={handleCredentials} value ={credential.password} type="password" name="password" placeholder='Enter Password'/>
          <button disabled = {!(credential.email.length && credential.password.length)} type="submit">{purpose ==='login'?'Log in':'Sign up'}</button>
          <Link to = {purpose === 'login'?'/signup':'/login'}>{purpose === 'login'?'Sign up?':'Log in?'}</Link>
          <Link to = '/forgot-password'>Forgot Password</Link>
        </form>
    </div>
  )
}

export default Inup