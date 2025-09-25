import React, { useEffect, useState } from 'react'

function WindowSize() {
    const[width,setWidth]=useState(window.innerWidth)
    const[height,setHeight]=useState(window.innerHeight)

    useEffect(()=>{
        //event handler
        const handleResize=()=>{
            setHeight(window.innerHeight)
            setWidth(window.innerWidth)
        }

        //subscribing to window resize
        window.addEventListener("resize",handleResize)

        return()=>{
            //removing event listner
            window.removeEventListener("resize",handleResize)
        }
    })
  return (
    <div>
        <h1>Window Size</h1>
        <p>Width:{width}px,Height:{height}px</p>
    </div>
  )
}

export default WindowSize