import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function Login({setIsAuth}) {
    console.log("setIsAuth",setIsAuth)
    const navigate=useNavigate()
    const handleClick=()=>{
     setIsAuth(true)
     return <Navigate path="/dashboard" />
    }
  return (
    <div>
        <h2>Welcome to Login</h2>
        <button pnClick={handleClick}>Login</button>
    </div>
  )
}

export default Login