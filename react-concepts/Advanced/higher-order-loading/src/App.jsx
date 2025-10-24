import React, { useEffect, useState } from 'react'
import withLoading from './components/withLoading'
import UserList from './components/UserLIst'

const UserListWithLoading=withLoading(UserList)
function App() {
  const [users, setUsers] = useState([])
  const[loading,setLoading]=useState(true)
  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((res)=>res.json())
    .then((data)=>{
      setUsers(data)
      setLoading(false)
    })
    .catch((err)=>{
      console.console.error("Error fetching",err);
      setLoading(false)
    })
  })
  return (
    <div>
      <h1>Users List</h1>
      <UserListWithLoading isLoading={loading} users={users} />
    </div>
  )
}

export default App