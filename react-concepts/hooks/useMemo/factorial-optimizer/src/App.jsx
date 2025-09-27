import { useState,useMemo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function slowFactorial(n){
  console.log("caculating factorial....")
  if(n<=0)return 1
  let result=1
  for(let i=1;i<=n;i++){
    //for heavy
    for(let j=0;j<1e6;j++){}
    result*=i
  }
  return result
}
function App() {
  const [number, setNumber] = useState(5)
  const[extra,setExtra]=useState(0)
  // With useMemo - Factorial only recalculates when "number" changes
 const fact=useMemo(()=>slowFactorial(number),[number])

 
  // Without useMemo-runs Every render → factorial recalculates calling "caculating factorial...." everytime
  //  const fact = slowFactorial(number);

  return (
    <>
    <h1>Factorial Optimizer</h1>
    <input type='number' value={number} onChange={(e)=>setNumber(parseInt(e.target.value))} />
    <p>Number:{number}</p>
    <p>Fcatorial:{fact}</p>
    <button onClick={()=>setExtra(extra+1)}>Rendered (extra={extra})</button>
    </>
  )
}

export default App
