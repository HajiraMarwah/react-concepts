import {useRef,useState} from "react"
export default function Stopwatch() {
  const[time,setTime]=useState(0)
  const[running,setRunning]=useState(false)
  const inputRef=useRef(null)
  const starStop=()=>{
    if(running){
      clearInterval(inputRef.current)
      setRunning(false)
    }else{
      inputRef.current=setInterval(()=>{
       setTime((prev)=>prev+10)
      },10)
      setRunning(true)
    }
  }
  const reset=()=>{
    clearInterval(inputRef.current)
    setTime(0)
    setRunning(false)
  }
  const formatTime=()=>{
    const seconds=Math.floor(time/1000)
    const ms=time%1000
    return `${seconds}s, ${ms}ms`
  }
  return (
    <div>
      <p onClick={starStop} style={{cursor:"pointer",fontSize:"25px"}}>{formatTime()}</p>
      <div>
        <button onClick={starStop}>Start</button> <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}


