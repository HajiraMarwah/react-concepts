import React from 'react'
import{useSelector,useDispatch} from "react-redux"
import { increment,decrement,reset } from './rtk-redux/CounterSlice'

function App() {
  const count=useSelector((state)=>state.counter.value)
  const dispatch=useDispatch()
  return (
    <div>
      <h1>Redux counter in rtk</h1>
      <h1>Counter:{count}</h1>
      <button onClick={()=>dispatch(increment())}>+</button>
      <button onClick={()=>dispatch(reset())}>Reset</button>
      <button onClick={()=>dispatch(decrement())}>-</button>

    </div>
  )
}

export default App