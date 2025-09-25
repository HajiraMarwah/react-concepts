import React, { useState, useRef, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (intervalRef.current) return; // avoid multiple intervals
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  return (
    <div style={{fontSize:"25px"}}>
      <p>Seconds: {seconds}</p>
      <button  className="button-container" onClick={startTimer}>Start</button>
      <button  className="button-container" onClick={stopTimer}>Stop</button>
    </div>
  );
}

export default Timer;
