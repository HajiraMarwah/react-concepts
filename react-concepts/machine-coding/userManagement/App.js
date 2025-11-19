import React,{useEffect, useState} from 'react'
import { initialUsers } from './usersData'
import UserModal from "./userModal"

function App() {
    const[search,setsearch]=useState("")
    const[roleFilter,setRoleFilter]=useState("")
    const[modalOpen,setModalOpen]=useState(false)
    const[users,setUsers]=useState([])
    const[loading,setLoading]=useState(false)
    useEffect(()=>{
      setLoading(true)
      const timer=setTimeout(()=>{setUsers(initialUsers)},1000)
      setTimeout(()=>setLoading(false),1000)
      return()=>{clearTimeout(timer)}
    },[])
    const filteredUsers=users.filter((u)=>(
        u.name.toLowerCase().includes(search.toLowerCase()) 
        
        &&
        (roleFilter?u.role===roleFilter:true)
    ))
    const handleDelete=(id)=>{
        setUsers((prev)=>prev.filter((u)=>u.id!==id))
    }
    const handleSubmit=(user)=>{
        setUsers((prev)=>[...prev,{...user,id:Date.now()}])
    }
    if(loading)return<p>Loading....</p>
  return (
    <div style={{padding:20}}>
        <h1>User Management </h1>
        <div style={{marginBottom:20,display:"flex",gap:10}}>
            <input placeholder='Search by name or role' type="text" value={search} onChange={(e)=>setsearch(e.target.value)} />
            <select value={roleFilter} onChange={(e)=>setRoleFilter(e.target.value)}>
                <option value="">Select Role</option>
                <option>User</option>
                <option>Admin</option>
                <option>Manager</option>
            </select>
         <button onClick={()=>setModalOpen(true)}>Add users</button>
        </div>
        {!loading && filteredUsers.length===0&&(<p>No users found</p>)}
        {!loading && filteredUsers.length>0 &&(
            <table border="1" cellPadding="10" style={{width:"100%",borderCollapse:"collapse"}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((item)=>(
                        <tr>
                            <td>{item.name}</td>
                              <td>{item.email}</td>
                                <td>{item.role}</td>
                                  <td ><button onClick={()=>handleDelete(item.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>

            </table>
         
        )}
           <UserModal isOpen={modalOpen} onClose={()=>setModalOpen(false)} onAdd={handleSubmit} />
    </div>
  )
}

export default App