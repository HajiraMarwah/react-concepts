import React from 'react';

function App() {
  const name = 'Priyanka';
  const isLoggedIn = true;

  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>{isLoggedIn ? 'You are logged in ✅' : 'Please log in ❌'}</p>
    </div>
  );
}

export default App;
