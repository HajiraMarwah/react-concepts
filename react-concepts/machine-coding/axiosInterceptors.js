import React,{useState,useEffect} from "react"
import axios from "axios"
const api=axios.create({
  baseURL:"https://jsonplaceholder.typicode.com",
  timeout:500
})
api.interceptors.request.use(
  (config)=>{
    console.log("request sent",config.url)
    const token=localStorage.getItem("token")
    if(token){
      config.headers.Authorization=`Bearer ${token}`
    }
    return config
  },(error)=>{
    return Promise.reject(error)
  }
  )
  api.interceptors.response.use(
    (response)=>{
      console.log("Response recieved",response)
      return response.data
    },
    (error)=>{
      if(error.response?.status===401){
        console.log("UNAuthorized")
      }
      return Promise.reject(error)
    })
function App(){
  const[users,setUsers]=useState([])
  useEffect(()=>{
    api.get("/users")
    .then((data)=>setUsers(data))
    .catch(console.error)
  },[])
  return (
    <>
      <h1>Axios interceptors</h1>
      
      <ul>
        {users.map((u)=>(
        <li>{u.name}</li>))}
      </ul>
    </>)
}
export default App