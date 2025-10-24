import React from 'react'

function UserList({users}) {
  console.log("coming inside userlist")
  return (
    <div>
      <h1>Users</h1>
      <ul>
         {users.map((user)=>(
        <li key={user.id}>{user.name}</li>
      ))}
      </ul>
     
    </div>
  )
}

export default UserList