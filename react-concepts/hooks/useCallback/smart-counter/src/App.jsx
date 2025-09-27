import React, {useCallback, useState } from 'react'
import './App.css'

const Child=React.memo(({onClick})=>{
  console.log("child is rendereed")  //without callback-calls everytime
  return <button onClick={onClick}>Increment</button>
});
function App() {
  const [text, setTect] = useState("")
  const [count, setCount] = useState(0)

//Without useCallback → new function created on every render
// const Increment=()=>{
//   setCount(count+1) //child is rendereed  evrytime on incremnt
// }


//With useCallback → function reference is stable unless dependencies change
const Increment=useCallback(()=>{
   setCount((prev)=>prev+1)   //here with callback child rendered wont come
},[])

  return (
    <>
    <h1>Count:{count}</h1>
    <Child  onClick={Increment}/>
    <input type='text' value={text} placeholder='type something' onChange={(e)=>setTect(e.target.value)} />
    <p>Typed:{text}</p>
    </>
  )
}

export default App
