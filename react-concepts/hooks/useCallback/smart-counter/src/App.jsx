import React, {useCallback, useState } from 'react'
import './App.css'

//Child is wrapped with React.memo, so it only re-renders if props change.
const Child=React.memo(({onClick})=>{
  console.log("child is rendereed")  //without callback-calls everytime
  return <button onClick={onClick}>Increment</button>
});
function App() {
  const [text, setText] = useState("")
  const [count, setCount] = useState(0)

//Without useCallback → new function created on every render
// a new increment function is created → Child sees prop change → re-renders unnecessarily .
// const Increment=()=>{
//   setCount(count+1) //child is rendereed  evrytime on incremnt
// }


//With useCallback → function reference is stable unless dependencies change
// increment keeps the same reference → Child does NOT re-render when only text changes.
const Increment=useCallback(()=>{
   setCount((prev)=>prev+1)   //here with callback child rendered wont come
},[])

  return (
    <>
    <h1>Count:{count}</h1>
    <Child  onClick={Increment}/>
    <input type='text' value={text} placeholder='type something' onChange={(e)=>setText(e.target.value)} />
    <p>Typed:{text}</p>
    </>
  )
}

export default App
