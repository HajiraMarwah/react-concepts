#  Fetch API vs Axios in React

In React, we often need to fetch data from APIs or send data to servers.  
Two popular ways to do this are **Fetch API** and **Axios**. Both are asynchronous and work well with React's lifecycle methods and hooks.

---

##  Fetch API in React

###  Description
The **Fetch API** is built into JavaScript. In React, it’s commonly used inside `useEffect` to fetch data when a component mounts.

**How it Works in React**
  1. Fetch returns a Promise:
    -  You call fetch(url, options) which returns a Promise.
    -  You can chain .then() to handle the response and .catch() to handle errors.
  2. Commonly used inside useEffect:
    - This ensures that the data fetch occurs when the component mounts.
    - You can also fetch data on events like button clicks.
  3. State Management:
    - Store the data in component state using useState.
    - Optionally, manage loading and error states.

**Example (GET Request)**
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
**POST Example in React**
```jsx
function AddUser() {
  const handleAddUser = () => {
    fetch('https://api.example.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: 'Priyanka', age: 25 })
    })
      .then(res => res.json())
      .then(data => console.log('User added:', data))
      .catch(err => console.error('Error:', err));
  };

  return <button onClick={handleAddUser}>Add User</button>;
}
```
**Best Practices in React**
  1. Use useEffect for initial data fetching.
  2. Track loading and error states.
  3. Always handle response errors (check response.ok).
  4. Abort fetch on component unmount to prevent memory leaks:
  ```jsx
  useEffect(() => {
  const controller = new AbortController();

  fetch('https://api.example.com/users', { signal: controller.signal })
    .then(res => res.json())
    .then(data => setUsers(data))
    .catch(err => {
      if (err.name !== 'AbortError') setError(err.message);
    });

   return () => controller.abort(); // Cleanup on unmount
   }, []);
   ```
**Key Features**
 - Built-in, no dependency required
 - Returns Promises
 - Must manually handle errors and JSON parsing
 - Works well with useEffect or event handlers

## Axios in React
Axios is a popular third-party HTTP client for making API requests. It is widely used in React because it simplifies data fetching and offers features that the native Fetch API doesn’t provide.

**Key Features**
  - Automatically transforms JSON data (no need to call res.json()).
  - Supports request/response interceptors.
  - Built-in error handling for HTTP errors.
  - Supports timeouts and request cancellation.
  - Works in both browser and Node.js.
  - Clean syntax, especially with async/await.

Install Axios:
```bash
npm install axios
# or
yarn add axios

```
**Basic GET Example**
```jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://api.example.com/users')
      .then(response => {
        setUsers(response.data); // Axios automatically parses JSON
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
**POST Example**
```jsx
function AddUser() {
  const handleAddUser = async () => {
    try {
      const response = await axios.post('https://api.example.com/users', {
        name: 'Priyanka',
        age: 25
      });
      console.log('User added:', response.data);
    } catch (err) {
      console.error('Error adding user:', err.message);
    }
  };

  return <button onClick={handleAddUser}>Add User</button>;
}
```
**Best Practices in React**
   1. Use useEffect for data fetching on mount.
   2. Track loading and error states.
   3. Use async/await for cleaner code.
   4. Use interceptors to handle authentication tokens or logging:
```jsx
axios.interceptors.request.use(config => {
  config.headers.Authorization = 'Bearer your_token';
  return config;
});
```
5. Cancel requests when components unmount:
```jsx
useEffect(() => {
  const controller = new AbortController();

  axios.get('https://api.example.com/users', { signal: controller.signal })
    .then(res => setUsers(res.data))
    .catch(err => {
      if (err.name !== 'CanceledError') setError(err.message);
    });

  return () => controller.abort();
}, []);
```
**Summary**
 - Axios is more feature-rich than Fetch.
 - Automatically handles JSON parsing and HTTP errors.
 - Clean integration with React Hooks like useEffect.
 - Supports advanced features like interceptors, timeouts, and request cancellation.

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