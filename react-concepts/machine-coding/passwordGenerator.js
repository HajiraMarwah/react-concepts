import React,{useState} from "react"
function App(){
  const[length,setLength]=useState(12)
  const[password,setPassword]=useState("")
  const generatePassword=()=>{
    const lower="abcdefghijklmnopqrstuvwxyz"
    const upper="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const number="0123456789"
    const special="!@#$%^&*()_+{}[]\/?<>"
    const allChar=lower+upper+number+special
    let pass=""
    for(let i=0;i<length;i++){
      pass+=allChar[Math.floor(Math.random()*allChar.length)]
    }
    setPassword(pass)
  }
  const copied=()=>{
    navigator.clipboard.writeText(password)
    alert(`passoword: ${password} copied`)
  }
  return(
    <div style={{padding:10,maxWidth:400}}>
     <h1>Password Generator</h1>
     <label>Length:<input style={{width:60,marginLeft:8}}  type="number" value={length} onChange={(e)=>setLength(Number(e.target.value))}/></label>
     <button onClick={generatePassword} style={{marginTop:10}}>Generate Password</button>
     <div style={{marginTop:10}}>
       <input type="text" readOnly value={password} style={{width:"50%"}}/>
      
       <button onClick={copied}>Copy</button>
       </div>
      </div>
  )
}
export default App