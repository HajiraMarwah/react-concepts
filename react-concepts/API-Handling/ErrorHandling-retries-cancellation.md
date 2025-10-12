# Error Handling, Retries, and Cancellation in React

When working with HTTP requests in React (using **Fetch API** or **Axios**), it's important to handle errors, retry failed requests, and cancel requests when necessary.

---

## 1. Error Handling

Error handling ensures your app gracefully manages network issues, server errors, or invalid responses.

### Using Fetch API

```javascript
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching data:', error));
```
### Using Axios
```js
import axios from 'axios';

axios.get('https://jsonplaceholder.typicode.com/posts')
  .then(response => console.log(response.data))
  .catch(error => {
    if (error.response) {
      // Server responded with a status outside 2xx
      console.error('Server error:', error.response.status);
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network error:', error.request);
    } else {
      // Something else went wrong
      console.error('Error:', error.message);
    }
  });
```
### 2. Retries
Sometimes requests fail due to temporary network issues. Retrying can improve reliability.

**Fetch Retry Example**
```js
async function fetchWithRetry(url, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Request failed');
      return await response.json();
    } catch (error) {
      console.warn(`Attempt ${i + 1} failed: ${error.message}`);
      if (i < retries - 1) await new Promise(res => setTimeout(res, delay));
      else throw error;
    }
  }
}

fetchWithRetry('https://jsonplaceholder.typicode.com/posts')
  .then(data => console.log(data))
  .catch(error => console.error('All retries failed:', error));
```
**Axios Retry Example**
Axios does not have built-in retry but you can use axios-retry library:
```js
import axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3, retryDelay: (retryCount) => retryCount * 1000 });

axios.get('https://jsonplaceholder.typicode.com/posts')
  .then(response => console.log(response.data))
  .catch(error => console.error('All retries failed:', error));
```
### 3. Cancellation (AbortController)

When a component unmounts or a request is no longer needed, you should cancel ongoing requests to prevent memory leaks or unnecessary network usage.

**Fetch API with AbortController**
```js
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch('https://jsonplaceholder.typicode.com/posts', { signal })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.error('Fetch error:', error);
        }
      });

    // Cleanup: cancel request if component unmounts
    return () => controller.abort();
  }, []);

  return <div>Check console for fetch results</div>;
}

export default App;
```
**Axios Cancellation**

Axios supports cancellation using AbortController (modern versions) or CancelToken (older versions):
```js
import React, { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    const controller = new AbortController();

    axios.get('https://jsonplaceholder.typicode.com/posts', {
      signal: controller.signal
    })
      .then(response => console.log(response.data))
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          console.error('Axios error:', error);
        }
      });

    return () => controller.abort();
  }, []);

  return <div>Check console for axios results</div>;
}

export default App;
```

## Summary
| Concept            | Description                                                                                         |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| **Error Handling** | Catch errors from network, server, or client-side issues and display messages.                      |
| **Retries**        | Automatically retry failed requests to improve reliability.                                         |
| **Cancellation**   | Abort ongoing requests to save resources and prevent memory leaks, especially on component unmount. |

### Tips:

- Always handle errors gracefully in the UI.
- Use retries carefully—avoid infinite loops.
- Clean up network requests in useEffect return functions to prevent memory leaks.