import React, { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');

  return (
    <div>
      <label htmlFor="user">Username:</label>
      <input
        id="user"
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <p data-testid="display">Current: {username}</p>
    </div>
  );
}