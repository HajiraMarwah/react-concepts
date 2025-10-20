import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'

function Timer() {
  const[seconds,setSeconds]=useState(0)
  const inputRef=useRef(0)
  const handleStartTimer=()=>{
      if(inputRef.current)return
      inputRef.current=setInterval(()=>{
        setSeconds((prev)=>prev+1)
      },1000)
  }
  const handleStopTimer=()=>{
    clearInterval(inputRef.current)
    inputRef.current=null
  }
  const handleResetTimer=()=>{
    clearInterval(inputRef.current)
    inputRef.current=null
    setSeconds(0)
  }
  return (
    <div>
      <h1>Seconds:{seconds}</h1>
      <button onClick={handleStartTimer}>Start</button>
      <button onClick={handleResetTimer}>Resets</button>
      <button onClick={handleStopTimer}>Stop</button>

      
    </div>
  )
}

export default Timer