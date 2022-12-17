import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth'


const Navbar = () => {
const navigate = useNavigate()
const auth = useAuth()
    const handleLogout = ()=>{
        auth.logout()
        navigate('/')
    }
  return (
    <div className='navbar'>
        <div className='flex'>
            <div><NavLink to = {'/product/'+auth.user}> Product </NavLink></div>
            <div><NavLink to = {'/category/'+auth.user}> Category </NavLink></div>
        </div>
        <div className='logoutbutton' onClick={handleLogout}> Log out </div>
    </div>
  )
}

export default Navbar