import React, { useEffect } from 'react'
import axios from "axios"

function Axios() {
    useEffect(()=>{
        axios.get("https://jsonplaceholder.typicode.com/pots")
        .then((res)=>console.log(res.data))
        .catch((error)=>{
            if(error.res){
                console.error("Server error",error.res.status);
                
            }
            else if(error.request){
                console.error("Network error",error.request);
                
            }else{
                console.error("Error coming",error);
                
            }
        })
    },[])
  return (
    <div>
        <h1>check console for error as i have spell mistake in url</h1>
       
    </div>
  )
}

export default Axios