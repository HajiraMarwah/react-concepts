import React from 'react'
import useCounter from "./useCounter"

function CounterComponent() {
  const{count,increment,decrement,reset}=useCounter(5)
  return (
    <div>
      <h1>CounterComponent</h1>
      <p>count-{count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>reset</button>
    </div>
  )
}

export default CounterComponent