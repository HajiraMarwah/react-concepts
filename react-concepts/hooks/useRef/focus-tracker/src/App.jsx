import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InputFocus from './components/InputFocus'
import Counter from './components/Counter'
import Timer from './components/Timer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* Accessing a DOM element */}
    <InputFocus />

    {/* Storing a mutable value */}
    <Counter />

    {/* Using Timer */}
    <Timer />
    </>
  )
}

export default App
