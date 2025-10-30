import React from 'react'
import {useSelector,useDispatch} from "react-redux"
import {increment,decrement} from "./Redux/action"
function App() {
  const count=useSelector(state=>state.count)
  const dispatch=useDispatch()
  return (
    <div>
      <h1>Redux counter</h1>
      <h2>Counter:{count}</h2>
      <button onClick={()=>dispatch(increment())}>+</button>
      <button onClick={()=>dispatch(decrement())}>-</button>
    </div>
  )
}

export default App