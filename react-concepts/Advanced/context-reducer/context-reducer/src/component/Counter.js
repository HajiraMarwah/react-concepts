import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'

function Counter() {
    const{state,dispatch}=useContext(GlobalContext)
    console.log("stateCounter",state)
  return (
    <div>
        <h1>Counter with Context+Reducer</h1>
        <h2>count:{state.count}</h2>
        <button onClick={()=>dispatch({type:"INCREMENT"})}>Add</button>
        <button onClick={()=>dispatch({type:"DECREMENT"})}>Remove</button>
        <button onClick={()=>dispatch({type:"RESET"})}>Reset</button>
    </div>
  )
}

export default Counter