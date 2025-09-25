import React, { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `count:${count}`; //changing the tab title.
  }, [count]);
  return (
    <div>
      <h1>Counter-Dom manipulation</h1>
      <p>counter:{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

export default Counter;
