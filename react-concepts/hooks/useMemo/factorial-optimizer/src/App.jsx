import React from 'react'
import { useState } from 'react'
import { useMemo } from 'react'

const slowFactorial=(n)=>{
  if(n<=0)return 1
  console.log("computing recalculations....")
  let result
  for(let i=1;i<=n;i++){
    // for(let j=0;j<1e6;j++){} usefull only for expensive math
    result*=i
  }
  return result
}
function App() {
  const[number,setNumber]=useState(5)
  const[extra,setExtra]=useState(0)
  // const fact=slowFactorial(number)
  const fact=useMemo(()=>slowFactorial(number),[number])
  return (
    <div>
      <h1>Factorial Optimizer</h1>
      <input  type='number' value={number} onChange={(e)=>setNumber(parseInt(e.target.value))}/>
      <p>Number:{number}</p>
      <p>Factorial:{fact}</p>
      <button onClick={()=>setExtra(extra+1)}>Rendered:{extra}times</button>
    </div>
  )
}

export default App