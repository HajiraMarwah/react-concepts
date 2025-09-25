import React, { useEffect, useState } from "react";

function MultiUseEffect() {
  const [count, setCount] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const increment = () => setCount(count + 1);

  //empty dependency-runs only once when comp mounts
  useEffect(() => {
    console.log("component mounted");
  }, []);

  //rdependency array count-runs everytime count changes value
  useEffect(() => {
    console.log(`counter is ${count}`);
  }, [count]);

  //cleanup example runs once on component mounts and removed when unmounts
  useEffect(() => {
    console.log("Timer started");
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
      console.log("Timer stopped");
    };
  }, []);

  return (
    <div>
      <h1>Counter:{count}</h1>
      <h2>Seconds:{seconds}</h2>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default MultiUseEffect;
