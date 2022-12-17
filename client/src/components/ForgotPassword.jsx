import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import axios from 'axios'

const ForgotPassword = () => {
  
  const [mailSend,setMailSend] = useState(false)
  const [email,setEmail] = useState('')
  const [exist,setExist] = useState(true)
  const [otpCheck,setOtpCheck] = useState(true)
  const [otp,setOtp] = useState(generateOTP())
  const [otpCorrect,setOtpCorrect]=useState(false)
  const [samePass,setSamePass] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    setTimeout(() => {
      setExist(true)
    }, 3000);
  },[exist])
  useEffect(()=>{
    setTimeout(() => {
      setOtpCheck(true)
    }, 3000);
  },[otpCheck])
  useEffect(()=>{
    setTimeout(() => {
      setSamePass(false)
    }, 5000);
  },[samePass])
  function generateOTP(limit=4) {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < limit; i++ )
        OTP += digits[Math.floor(Math.random() * 10)];
    return OTP;
  }
  const sendMail =()=>{
    const templateParams = {
      subject:'OTP for password Change',
      to_email:email,
      otp:otp
    }
    emailjs.send('service_7sqn9nf','template_udoay78',templateParams,'cTJQU_dS72Oh8v8Jb').then(res=>{
      setMailSend(true)
    }).catch(err=>{
      console.log(err)
    })
  }
  const sendOtp = ()=>{
    axios.post('user/forgotpassword',{email:email})
    .then(res=>{
      if(res.data == 'exist'){
        sendMail()  
      }
      else{
        setExist(false)
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }
  const resendOtp = ()=>{
    sendMail()
  }
  const [OTP,setOTP] = useState('')
  const checkOTP =()=>{
    if(OTP == otp){
      setOtpCorrect(true)
    }
    else{
      setOtpCheck(false)
    }
  }
  const [newPassword,setNewPassword] = useState('')
  const changePassword =()=>{
    axios.put('/user/changePassword',{email:email,password:newPassword})
    .then(res=>{
      if(res.data.info.slice(26,27) == '1'){
        navigate('/login')
      }
      else{
        setSamePass(true)
      }
    })
    .catch(err=>[
      console.log(err)
    ])
  }
  return (
    <div className='forgotPassword'>
      <h1>{otpCorrect?'Set':'Forgot'} Password</h1>
      {otpCorrect?<input placeholder='Enter password' type ='password' value ={newPassword} onChange = {(e)=>{setNewPassword(e.target.value)}}></input>:
        !mailSend? 
        <input type="email" placeholder='Enter Email' onChange={(e)=>{setEmail(e.target.value)}} value = {email}/>:<div><div> Email : {email} </div><input placeholder='Enter OTP' value = {OTP} onChange={(e)=>{setOTP(e.target.value)}}/> <button onClick={checkOTP} type='submit'>submit</button></div>
      }
      {
        !exist && <div className="notification">No such user exist</div>
      }
      {
        !otpCheck && <div className='notification'>Wrong OTP</div>
      }
      {
        samePass && <div className='notification'>Old password was same can't change the same password</div>
      }
      <button onClick={otpCorrect?changePassword:mailSend?resendOtp:sendOtp}>{otpCorrect?'change password':mailSend?'resend Otp':'send otp'}</button>
      
      <Link to = '/login'>Already have account??</Link>
      <Link to = '/signup'>New user??</Link>
    </div>
  )
}

export default ForgotPassword