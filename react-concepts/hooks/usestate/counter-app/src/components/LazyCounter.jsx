import React, { useState } from "react";

const LazyCounter = () => {
  //Lazy initializaton where fucntion runs only once when component mounts
  // If the initial state is expensive to compute, you can pass a function to useState:
  const [count, setCount] = useState(() => {
    console.log("calculating initial value.....");
    return 0;
  });
  //     The function runs only once when the component mounts.
  //    Useful for heavy computations.

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };
  return (
    <div>
      <h1>Counter:{count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default LazyCounter;
