import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function NavBar() {
    const create = 'createUser';
    const navigate = useNavigate()
  return (
    <header className='navbar'>
    <h1 onClick={()=>navigate('/')} className='view' >User Management Stytem</h1>
    <NavLink to={`/${create}`} className='add-user' >Add User</NavLink>
    </header>
  )
}
