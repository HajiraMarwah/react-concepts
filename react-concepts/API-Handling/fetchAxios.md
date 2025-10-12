# 🌐 Fetch API vs Axios in React

In React, we often need to fetch data from APIs or send data to servers.  
Two popular ways to do this are **Fetch API** and **Axios**. Both are asynchronous and work well with React's lifecycle methods and hooks.

---

## ⚡ Fetch API in React

### 📝 Description
The **Fetch API** is built into JavaScript. In React, it’s commonly used inside `useEffect` to fetch data when a component mounts.

### ✅ Example (GET Request)
```jsx
import React, { useEffect, useState } from 'react';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/users')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default UsersList;
```
## Key Features
 - Built-in, no dependency required
 - Returns Promises
 - Must manually handle errors and JSON parsing
 - Works well with useEffect or event handlers

## Axios in React
 # Description
Axios is a third-party HTTP client that simplifies requests and provides features like interceptors, automatic JSON parsing, and error handling.

Install Axios:
```bash
npm install axios
# or
yarn add axios
```
**Example (GET Request)**
```jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://api.example.com/users')
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default UsersList;
```
**Key Features**
 - Automatic JSON parsing
 - Supports request/response interceptors
 - Built-in error handling
 - Works in both browser and Node.js
 - Supports timeouts and request cancellation

## Comparison Table (React Context)
| Feature / Property       | **Fetch API**                 | **Axios**                                     |
| ------------------------ | ----------------------------- | --------------------------------------------- |
| **Dependency**           | None                          | Requires `axios` package                      |
| **JSON Parsing**         | Manual (`res.json()`)         | Automatic (`res.data`)                        |
| **Error Handling**       | Must manually check `res.ok`  | Throws automatically on bad responses         |
| **Timeouts**             | Not built-in                  | Built-in support                              |
| **Request Cancellation** | Supported via AbortController | Supported via `CancelToken` / AbortController |
| **Interceptors**         | ❌ Not available               | ✅ Yes                                         |
| **Browser + Node**       | Browser only                  | Browser + Node.js                             |

## When to Use What in React
| Scenario                                                                | Recommended   |
| ----------------------------------------------------------------------- | ------------- |
| Simple GET/POST calls in browser-only apps                              | **Fetch API** |
| Advanced features: interceptors, error handling, cancellation, timeouts | **Axios**     |
| Node.js environment                                                     | **Axios**     |
| Want minimal dependency and native support                              | **Fetch API** |

## Summary
 - Fetch API: Great for lightweight requests and small apps.
 - Axios: Preferred for bigger apps where error handling, interceptors, and automatic JSON parsing are needed.