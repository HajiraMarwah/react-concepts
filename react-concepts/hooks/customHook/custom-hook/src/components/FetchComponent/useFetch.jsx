import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function useFetch(url) {
  const[data,setData]=useState([])
  const[error,setError]=useState("")
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    setLoading(true)
      fetch(url)
      .then((res)=>{
       if(!res.ok) throw new Error("Netwrok issues")
        return res.json()
      })
      .then((data)=>setData(data))
      .catch((error)=>setError(error))
      .finally(()=>setLoading(false))
  },[url])
  return {data,error,loading}
}

export default useFetch