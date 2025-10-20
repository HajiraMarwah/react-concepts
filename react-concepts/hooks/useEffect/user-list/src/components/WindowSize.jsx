import React from 'react'
import { useState } from 'react'

function WindowSize() {
    const[height,setHeight]=useState(window.innerHeight)
    const[width,setWidth]=useState(window.innerWidth)
    const handleResize=()=>{
        setHeight(window.innerHeight)
        setWidth(window.innerWidth)
    }
    window.addEventListener("resize",handleResize)
    window.removeEventListener("resize",handleResize)
  return (
    <div>
        <h1>Window Size</h1>
        <h2>Height is {height}px,Width is{width}px</h2>
    </div>
  )
}

export default WindowSize