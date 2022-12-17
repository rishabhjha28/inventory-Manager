import React from 'react'
import { Link } from 'react-router-dom'

const WrongCredentials = () => {
  return (
    <div>
        <div>
            Wrong Credentials
        </div>
        <div> <Link to = '/login'>Try Again?</Link> </div>
        <div> <Link to = '/forgot-password'>Forgot password??</Link> </div> 
    </div>
  )
}

export default WrongCredentials