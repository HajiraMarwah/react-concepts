import React, { useEffect } from 'react'

function Fetch() {
    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/post")
        .then((res)=>{
            if(!res.ok) throw new Error(`http error status:${res.status}`)
            return res.json()
        })
        .then((data)=>console.log(data))
        .catch((err)=>console.error("error coming here",err))
    },[])
  return (
    <div>
        <h1>check console for error as i have spell mistake in url</h1>
    </div>
  )
}

export default Fetch