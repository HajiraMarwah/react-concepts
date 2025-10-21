 import React from 'react'
 import useFetch from "./useFetch"
 function FetchComponent() {
  const{data,error,loading}=useFetch("https://jsonplaceholder.typicode.com/users")
  if(loading)return<p>Loading....</p>
  if(error)return<p>Error</p>
   return (
     <div>
      <h1>Fetch</h1>
      <ul>
        {data.map((user)=>
        <li key={user.id}>{user.name}</li>)}
      </ul>
     </div>
   )
 }
 
 export default FetchComponent