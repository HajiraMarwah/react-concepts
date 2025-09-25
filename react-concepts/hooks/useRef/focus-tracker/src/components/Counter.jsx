import React, { useState, useRef } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0); // mutable ref, persists across renders

  renderCount.current += 1;

  return (
    <div style={{fontSize:"25px"}}>
      <p>Count: {count}</p>
      <p>Component rendered: {renderCount.current} times</p>
      <button className="button-container" onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}

export default Counter;
