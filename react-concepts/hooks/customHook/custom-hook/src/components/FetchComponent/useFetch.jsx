import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function useFetch(url) {
    const[data,setData]=useState([])
    const[loading,setLoading]=useState(false)
    const[error,setError]=useState("")
  useEffect(()=>{
    setLoading(true)
      fetch(url)
      .then((res)=>{
        if(!res.ok) throw new Error("Network issues")
            return res.json()
      })
      .then((data)=>setData(data))
      .catch((err)=>setError(err.message))
      .finally(()=>setLoading(false))
  },[url])
  return{data,loading,error}
}

export default useFetch