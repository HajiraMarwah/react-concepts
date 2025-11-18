import React,{useState} from "react"
function App(){
  const[name,setName]=useState("")
  const[password,setPassword]=useState("")
  const[email,setEmail]=useState("")
  const[error,setError]=useState({})
  const validateName=value=>{
    if(!value.trim())return "Name is required"
    if(value.length<3) return "Name should be more than 3 characters"
    return ""
  }
  const validateEmail=value=>{
    if(!value.trim())return "email is required"
    else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))return "Please enter valid email"
    return ""
  }
  const validatePassword=value=>{
    if(!value.trim())return "Password is required"
    if(value.length<6)return "Password must be more than 6 characters"
    return ""
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    const nameError=validateName(name)
    const passwordError=validatePassword(password)
    const emailError=validateEmail(email)
    setError({
      name:nameError,
      password:passwordError,
      email:emailError
    })
    if(!nameError && !passwordError && !emailError){
      alert(`Form is submitted`)
    }
  }
  return(
    <div>
      <h1>Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e)=>{
          setName(e.target.value)
            const err=validateName(e.target.value)
            setError((prev)=>({...prev,name:err}))
          }} />
          {error.name&&<p style={{color:"red"}}>{error.name}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e)=>{
            setEmail(e.target.value)
            const err=validateEmail(e.target.value)
            setError((prev)=>({...prev,email:err}))
          }} />
          {error.email&&<p style={{color:"red"}}>{error.email}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e)=>{
            setPassword(e.target.value)
            const err=validatePassword(e.target.value)
            setError((prev)=>({...prev,password:err}))
          }} />
          {error.password&&<p style={{color:"red"}}>{error.password}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>)
}
export default App