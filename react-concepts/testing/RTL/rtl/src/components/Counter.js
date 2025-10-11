import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
          <h1>Welcome to RTL Example</h1>
      <h2>Simple Counter</h2>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  );
};

export default Counter;
