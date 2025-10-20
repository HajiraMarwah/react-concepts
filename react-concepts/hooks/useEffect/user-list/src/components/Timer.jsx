import React from 'react'
import { useState,useEffect } from 'react'

function Timer() {
  const[seconds,setSeconds]=useState(0)
  useEffect(()=>{
    const interval=setInterval(()=>{
      setSeconds((prev)=>prev+1)
    },1000)
    return()=>{
      clearInterval(interval)
    }
  })
  return (
    <div>
      <h1>Timer</h1>
      <h2>seconds:{seconds}</h2>
    </div>
  )
}

export default Timer