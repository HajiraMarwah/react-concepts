import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0)
  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <button onClick={increment}>+</button>
      <div>Counter:{count}</div>
      <button onClick={decrement}>-</button>
    </div>
  );
}

export default Counter;
