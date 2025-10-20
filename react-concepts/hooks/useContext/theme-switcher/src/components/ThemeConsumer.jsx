import React from 'react'
import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'

function ThemeConsumer() {
  const{theme,toggleTheme}=useContext(ThemeContext)
   const boxContainer={
     backgroundColor:theme==="light"?"#fff":"#333",
     color:theme==="light"?"#000":"#fff",
     borderRadius:"10px",
     padding:"20px"
   }
  return (
    <div style={boxContainer}>
      <h2>Theme-Box</h2>
      <h1>Theme:{theme}</h1>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  )
}

export default ThemeConsumer