import React, { useState,useEffect } from 'react'

function Timer() {
    const[seconds,setSeconds]=useState(0)
    useEffect(()=>{
        const intervals=setInterval(()=>{
            setSeconds((prev)=>prev+1)
        },2000)
        return()=>clearInterval(intervals)
    })
  return (
    <div>
        <h1>Timer</h1>
        <h2>Seconds elapsed:{seconds}</h2>
    </div>
  )
}

export default Timer