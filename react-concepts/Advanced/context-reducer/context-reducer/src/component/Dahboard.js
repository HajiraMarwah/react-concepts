import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

function Dahboard() {
    const{state,dispatch}=useContext(ThemeContext)
    const toggleTheme=()=>{
        dispatch({type:"TOGGLE_THEME"})
    }
    const dashboardStyle={
        backgroundColor:state.theme==="light"?"#f0f0f0":"#333",
        color:state.theme==="light"?"#000":"#fff",
        padding:"20px",
        marginTop:"20px"
    }
  return (
    <div style={dashboardStyle}>
        <h1>CurrentTheme-{state.theme}</h1>
        <button onClick={toggleTheme}>Toggle</button>
    </div>
  )
}

export default Dahboard