import React, { Children,useState } from 'react'
import {BrowserRouter,Link,NavLink,Routes,Route, Outlet, useNavigate, Navigate}from "react-router-dom"

const Home=()=>{
    return <h1>Home</h1>
}

const Login=({setIsAuth})=>{
    const navigate=useNavigate()
    const handleLogin=()=>{
        setIsAuth(true)
        navigate("/dashboard")
    }
   return(
    <button onClick={handleLogin}>Login</button>
   )
}
const Dashboard=()=>{

    return (
       <div>
        <h2>Dashboard page</h2>
       </div>
    )
}
const ProtectedRoute=({isAuth,children})=>{
    if(!isAuth){
        return <Navigate to="/login" />
    }
    return children
}
function Todo() {
    const[isAuth,setIsAuth]=useState(false)
  return (
 <BrowserRouter>
 <nav>
    <Link to="/">Home</Link>
    <Link to="/login">Login</Link>
    <Link to="/dashboard">Dashboard</Link>

 </nav>
 <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
    <Route path="/dashboard" element={<ProtectedRoute isAuth={isAuth}><Dashboard /></ProtectedRoute>} />
 </Routes>
 </BrowserRouter>
  )
}

export default Todo