import React, { useRef } from 'react'

function InputFocus() {
    const inputRef=useRef(null)
    const focusInput=()=>{
        inputRef.current.focus() //directly access dom input
    }
  return (
 
   <div className="input-focus-container">
  <input ref={inputRef} placeholder="type here..." />
  <button onClick={focusInput}>Focus input</button>
</div>

  )
}

export default InputFocus