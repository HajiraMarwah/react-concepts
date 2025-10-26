# Storing JWT Tokens in React

In a React SPA, you often need to store **access tokens** and **refresh tokens** for authentication. How you store them impacts **security** and **user experience**.

---

## 1. Types of Tokens

| Token Type     | Purpose                              | Lifespan         | Recommended Storage            |
|----------------|--------------------------------------|-----------------|--------------------------------|
| Access Token   | Used to authenticate API requests    | Short-lived      | Memory (React state / Redux)  |
| Refresh Token  | Used to get new access tokens        | Long-lived       | HTTP-only, Secure cookie      |

---

## 2. Storage Options

### **A. Memory (Recommended for access token)**
- Store token in **React state** or **Redux store**.
- Advantages:
  - Not accessible to JavaScript from other scripts → protects from XSS.
- Disadvantages:
  - Token is lost on page reload → use refresh token to get a new one.

**Example:**
```javascript
import { useState } from 'react';

const [accessToken, setAccessToken] = useState(null);

// On login
setAccessToken(data.accessToken);

// On logout
setAccessToken(null);
```
## B. HTTP-only Secure Cookies (Recommended for refresh token)
  - Cannot be accessed by JavaScript → safe from XSS.
  - Must use withCredentials: true when making API calls with Axios/fetch.
  - Backend sets the cookie when issuing refresh token.

**Example Axios request:**
```js
axios.post('/refresh-token', {}, { withCredentials: true });
```
## C. LocalStorage / SessionStorage (Not recommended for sensitive tokens)
  - Easy to implement.
  - Accessible by JavaScript → vulnerable to XSS attacks.
  - Use only for non-sensitive info or when security is not critical.
```js
  // Set token
localStorage.setItem('accessToken', token);

// Get token
const token = localStorage.getItem('accessToken');

// Remove token
localStorage.removeItem('accessToken');
```

## 3. Best Practices
  - Access Token in memory: Keeps token safe from XSS.
  - Refresh Token in HTTP-only cookie: Enables seamless re-authentication.
  - Short-lived access tokens: Reduces damage if token leaks.
  - Always use HTTPS: Protects tokens in transit.
  - Avoid storing sensitive info in token: JWT payload is readable by anyone with the token.

## 4. Example Flow
  1. User logs in → backend returns:
    - Access token → store in memory.
    -  Refresh token → store in HTTP-only cookie.
  2. App sends API requests with access token.
  3. If API returns 401 → use refresh token to get new access token.
  4. On logout → clear access token from memory and refresh token from cookie.