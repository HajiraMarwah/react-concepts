import axios from 'axios'
import React, { useEffect } from 'react'

function AxiosCancellation() {
    useEffect(()=>{
        const controlled=new AbortController()
        const signal=controlled.signal
        axios.get("https://jsonplaceholder.typicode.com/posts",{signal})
        .then(response=>console.log(response.data))
       .then((data) => console.log(data))

        .catch((err)=>{
            if(axios.isCancel(err)){
                console.error("Request cancelled: ",err.message);
                
            }else{
                console.error("Axios error:",err);
                
            }
        })
            return()=>controlled.abort()

    },[])
  return (

    <div>
        <h1>Check the consoles</h1>
    </div>
  )
}

export default AxiosCancellation