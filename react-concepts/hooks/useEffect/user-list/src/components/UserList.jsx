import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

function UserList() {
  const[users,setUsers]=useState([])
  const[loading,setLoading]=useState(false)
  const[error,setError]=useState("")
  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((res)=>{
      if(!res.ok) throw new Error("Network issues")
        return res.json()
    }).then((data)=>{
      setUsers(data)
    })
    .catch((err)=>setError(err.msg))
    .finally(()=>setLoading(false))
  })
  if(loading)return <h1>Loading!...</h1>
  if(error)return <h1>{error}</h1>

  return (
    <div>
      <h1>UserList</h1>
      <ul>
      {users.length>0?
      users.map((user)=>(
        <li key={user.id}>{user.name}</li>
      )):"No users found"}
       
      </ul>
    </div>
  )
}

export default UserList