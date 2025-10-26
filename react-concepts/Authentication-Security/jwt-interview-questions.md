# 🔐 JWT Tokens in React — Frequently Asked Questions (FAQ)

## 1. What is a JWT Token?and its main parts

**Answer:**
A JSON Web Token (JWT) is a compact, URL-safe token used for securely transmitting information between parties as a JSON object. It’s commonly used for authentication and authorization in web applications.

A JWT has three parts separated by dots (.):
```js
xxxxx.yyyyy.zzzzz
```
| Part          | Description                                                     |
| ------------- | --------------------------------------------------------------- |
| **Header**    | Contains the token type (`JWT`) and signing algorithm (`HS256`) |
| **Payload**   | Contains user data or claims (e.g. user ID, email, roles)       |
| **Signature** | Used to verify the token was not tampered with                  |
**Example decoded JWT:**
```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "userId": "12345",
    "email": "user@example.com",
    "exp": 1739283093
  }
}
```
---
## 2. How does JWT authentication work in React?

**Answer:**
1. The user logs in by submitting credentials to the backend API.
2. The server verifies credentials and returns a JWT token.
3. React stores the token (in localStorage or cookies).
4. For future API requests, the token is sent in the `Authorization` header.
5. The backend validates the token before granting access.


---

## 3. Where should I store my JWT token in React?

**Answer:**
You can store JWT tokens in:
- **Local Storage:** Easy to use but vulnerable to XSS attacks,Only store tokens in localStorage if you understand the security risks.
**Steps to store jwt in localStorage**
 1. Receive JWT from Backend
 After login, your backend API sends a JWT. For example:
```json
{
 "token": "your.jwt.token"
}
```
2. Store JWT in Local Storage
```js
// Suppose `jwtToken` is the token you received
localStorage.setItem('token', jwtToken);
```
3. Retrieve JWT Later
```js
const token = localStorage.getItem('token');
console.log(token);
```
4.  Remove JWT on Logout
```js
localStorage.removeItem('token');
 ```
- **Session Storage:** Similar to local storage but clears on tab close.
- **Cookies**:
- **HTTP-only Cookies:** Most secure since JavaScript can’t access them (prevents XSS), but CSRF protection is needed.
 **Steps to store JWT in cookies (React)**
 1. Get the JWT
   - After login, your backend sends you a token.
 2. Store it in a cookie
  - Use a library like js-cookie or document.cookie.
  - Example with js-cookie:
```js
Cookies.set('token', jwt, { expires: 7, secure: true, sameSite: 'Strict' });
```
3. Use it later
  - Read the cookie when making API requests:
```js
const token = Cookies.get('token');
```
4. Remove it on logout
```js
Cookies.remove('token');

```

5. Security tip
 - For best security, ask the backend to set the cookie as HttpOnly so JavaScript can’t touch it.

👉 **Best practice:** Use **HTTP-only cookies** when possible.

---


## 4. How do I include the JWT token in API requests?

**Answer:**
You can add it to the request header like this:

```js
const token = localStorage.getItem('token');
axios.get('/api/data', {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```
## 5. How do I decode a JWT token in React?
**Answer:**
You can use the jwt-decode library:
```bash
npm install jwt-decode
```
```js
import jwtDecode from 'jwt-decode';

const token = localStorage.getItem('token');
const decoded = jwtDecode(token);
console.log(decoded);
```
## 6. How can I protect React routes using JWT?
**Answer:**
You can create a ProtectedRoute component:
```js
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};
```
Then wrap your routes:
```js
<Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
```
## 7. How do I handle JWT token expiration?

Answer:
Decode the token and check the expiration time (exp):
```js
import jwtDecode from 'jwt-decode';

const isTokenExpired = (token) => {
  const { exp } = jwtDecode(token);
  return Date.now() >= exp * 1000;
};
```
## 8. What’s the difference between access and refresh tokens?

**Answer:**
  - Access Token: Short-lived, used to access protected APIs.
  - Refresh Token: Long-lived, used to get a new access token without re-login.

Access tokens are usually stored in memory or local storage, while refresh tokens are stored securely in HTTP-only cookies.

## 9. How can I automatically refresh a JWT token in React?

**Answer:**
Use an Axios interceptor:

## 10. How do I log out a user in JWT-based authentication?

**Answer:**
 - Remove the token from local storage (or clear cookies).
 - Optionally, call the server to invalidate the refresh token.
 - Redirect to the login page.

## 11. Is JWT safe for authentication in React?

**Answer:**
 Yes, if implemented correctly. Follow these best practices:
 - Use HTTPS to prevent token interception.
 - Store tokens in HTTP-only cookies.
 - Implement token expiration and refresh mechanisms.
 - Validate tokens on every request server-side.

## 12. How can I check if a user is logged in using JWT?

**Answer:**
Check if the token exists and is valid:
```js
const token = localStorage.getItem('token');
const isLoggedIn = token && !isTokenExpired(token);
```
## 13 how jwt differ from session or cookie explain simple
**Answer**
 | Method                   | Definition                                                                                          | How It’s Stored                                                                                     | Why JWT is Preferred                                                                                            |
| ------------------------ | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Cookie**               | Small piece of data stored in the browser, often used to save session IDs or preferences.           | Stored automatically in the browser’s cookie storage.                                               | JWT doesn’t rely on cookies — it works across web, mobile, and APIs without browser limitations.                |
| **Session**              | Server stores user data after login and identifies users using a session ID (usually via a cookie). | Session data is stored **on the server**, and the **session ID** is stored in a browser cookie.     | JWT is **stateless**, so it doesn’t need server-side storage — making it faster and more scalable.              |
| **JWT (JSON Web Token)** | A self-contained token that holds user info and is verified using a secret or key.                  | Stored **client-side** — usually in **localStorage**, **sessionStorage**, or **HTTP-only cookies**. | JWT can be easily used across multiple services, reduces server load, and supports cross-domain authentication. |

## 14 is jwt secure by default
**Answer**
No, JWT is not secure by default.
JWT provides integrity (tamper-proof) but not confidentiality by default — you must implement proper storage, transmission, and expiration strategies to make it secure.

## 15. How to make JWRT secure
 **Answer**
  1. Always use HTTPS.
  2. Store JWT in HTTP-only, Secure cookies if possible.
  3. Keep access tokens short-lived and use refresh tokens.
  4. Never put sensitive information (passwords, secrets) in the payload.

## 16. how does jwt ensure data integrity
JWT ensures data integrity using a digital signature. Here’s a simple breakdown:
   1. Structure of a JWT-A JWT has three parts:
      - Headers,payload,signature
   2.  How the signature works
      - The server takes the header and payload, encodes them in Base64, and combines them.
      - It then signs this data using a secret key (HMAC) or private key (RSA/ECDSA).
      - The resulting signature is added to the token.
    3.  Verification on the server
      - When the token is received, the server recalculates the signature using the same secret/key.
      - If the calculated signature matches the token’s signature → the token is valid.
      - If someone modifies the payload or header → the signature won’t match → token is rejected.
## 17. How do you refresh a  access token using refresh token flow
   1. Initial login
     - User logs in.
     - Server responds with:
       1. Access token (short-lived, e.g., 15 minutes)
       2. Refresh token (long-lived, e.g., 7 days)
     - You store:
       1. Access token in memory or local state
       2. Refresh token securely (HTTP-only cookie is safest)
    2. Making an API request
     Include the access token in the request headers:
     ```js
     Authorization: `Bearer ${accessToken}`
     ```
    3. Access token expires
      - Server responds with 401 Unauthorized.
      - Now you use the refresh token to get a new access token.
    4.  Refresh token flow
       - Make a request to the server’s refresh endpoint:
         ```js
         fetch('/refresh-token', {
        method: 'POST',
        credentials: 'include', // if using http-only cookie
        })
       .then(res => res.json())
       .then(data => {
         setAccessToken(data.accessToken); // update state
        });
        ```
        - Server validates the refresh token and sends back a new access token.
    5. Retry the failed request
       Once you get a new access token, retry the API request that failed.
    6. Optional: Automate refresh-using a axios interceptor or fetch wrapper to automatically refresh the token when 401 happens.

## 18. how do you send JWTs in api request from react
**Answer**
1. Store the JWT after login
After the user logs in, your backend usually returns a JWT access token. You can store it:
  - Memory / React state (safer, cleared on refresh)
  - LocalStorage or SessionStorage (persistent but vulnerable to XSS)
  - HTTP-only cookie (most secure, not accessible by JS)
  **Example (storing in state):** 
   ```js
   const [accessToken, setAccessToken] = useState(null);
   // After login
   setAccessToken(data.accessToken);
   ```
2. Send JWT in API request
   - The standard way is to use the Authorization header with the Bearer scheme.

**Example using fetch:**
```js
fetch('https://api.example.com/data', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}` // <-- send JWT here
  }
})
  .then(res => res.json())
  .then(data => console.log(data));
```
**Example using axios**
```js
axios.get('https://api.example.com/data', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
})
.then(res => console.log(res.data));
```
3. Using HTTP-only cookies (optional, more secure)
 - If your backend sets the JWT in an HTTP-only cookie:
 - You don’t manually attach the token.
 - Just include credentials: 'include' in fetch or withCredentials: true in Axios.
```js
fetch('https://api.example.com/data', {
  method: 'GET',
  credentials: 'include', // sends cookie automatically
})
.then(res => res.json())
.then(data => console.log(data));
```
## 19. how do you implement logout functionality in JWT
 1. Remove the access token from memory or state.
 2. Optionally, remove the refresh token (if stored in localStorage or cookies).
 3. Redirect the user to the login page.
 ```js
 import { setAccessToken } from './auth';

function logout() {
  // Clear access token
  setAccessToken(null);

  // Optionally, clear any user info in state
  // Clear refresh token if stored in localStorage
  localStorage.removeItem('refreshToken');

  // Redirect to login
  window.location.href = '/login';
}
```
## 20. pros/cons of using JWT in SPA compared with traditional cookies session
| Feature               | JWT (SPA)                    | Session Cookies            |
| --------------------- | ---------------------------- | -------------------------- |
| Server state          | Stateless                    | Stateful                   |
| Scalability           | Easy                         | Needs session store        |
| Cross-domain / mobile | Easy                         | Harder                     |
| Revocation / logout   | Hard                         | Easy                       |
| Security              | Depends on storage           | HTTP-only cookies are safe |
| Complexity            | Higher (refresh token logic) | Lower                      |
| Bandwidth             | Higher (token payload)       | Lower (just ID)            |

## 21. what happens if JWT signature is invalid
1. Client calls protected API
 - Sends JWT in the request header.
2. Server checks the JWT
 - Signature Not valid → Responds 401 Unauthorized → request fails. 
 - Token expired→ Responds 401 Unauthorized → request fails.
3.  Client reaction
 - If using refresh token → request new access token → retry API.
 - If no refresh token → redirect user to login.

 ## Scenario based
 ## 22. The backedn issues jwt that expries n 1hour but userstays on app for 2 hour how do you handle seamless re-authentication
   **Answer**:
   Use Refresh Tokens for Seamless Re-authentication
   **Steps:**
1.  Login
     - User logs in to server that returns:
       1. Access token (short-lived, e.g., 1 hour)
       2. Refresh token (longer-lived, e.g., 7 days, stored securely in HTTP-only cookie)
2. Use Access Token for API calls
   - Access token sent in Authorization: Bearer <token> header.
3. Detect expired token
   - If server responds with 401 Unauthorized → access token expired.
4. Call Refresh Token endpoint
   - Frontend sends refresh token (usually in cookie) to /refresh-token.
   - Server validates refresh token → issues new access token.
5. Retry original request
   - Frontend retries the API call automatically with the new token.
6. Logout if refresh fails
   - If refresh token is invalid/expired → force user to login again.
## 23. If your api returns with 401  unauthorized how do you handle  globally in react
  **Answer**
  the best way to handle 401 Unauthorized globally is to use an Axios interceptor (or fetch wrapper) so that any API call that gets 401 triggers a common handler—like refreshing the token or redirecting to login.
  **How it works**
  1. Any API call goes through the interceptor.
  2. If server responds 401 Unauthorized, interceptor tries to refresh the access token.
  3. If refresh works → retries the original request automatically.
  4. If refresh fails → logs out the user and redirects to login.
## 24 How dou you Restrict routes
**Steps to Restrict Routes**
 1. Check if user is authenticated
 2. Usually check if access token exists or use a global auth state.
 3. If authenticated → allow access to the route.
 4. If not authenticated → redirect to login page.
 5. (Optional) Check roles or permissions for finer access control.

**Example Using React Router v6**
```js
// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAccessToken } from './auth';

export default function ProtectedRoute({ children }) {
  const token = getAccessToken();

  if (!token) {
    // User not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  return children; // user logged in → allow access
}
```
**Usage in Routes**
```js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './Dashboard';
import Login from './Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}
```
## 25. How do you persisy jwt authentication state after page reload in react
1. Store access token in :
  - Use localStorage(persists across reloads)or sessionStorage(persists until tab is closed).
  -  Use HTTP-only Cookies (Recommended for Security)
3. On app startup, either:
   - Read from storage or
   - Call refresh token endpoint to get a new access token.
4. Then update React auth state → seamless user experience.
## 26. If your jwt contains sensitive user info how would you protect it it on client side
**1️⃣ Don’t put sensitive info in the JWT if possible**
  - JWT is base64-encoded, not encrypted → anyone with the token can read it.
  - Only include: User ID,Roles / permissions,Minimal claims necessary for auth
  - Avoid: passwords, personal data, secrets.
**2️⃣Store tokens securely**:
  - Store refresh token in HTTP-only, Secure, SameSite cookie (not accessible via JS).
  - Keep access token in memory only (React state, Redux, or context).
**3️⃣ Encrypt JWT payload if absolutely needed**
  - If you must include sensitive info, encrypt the payload on the server.
  - Use JWE (JSON Web Encryption) instead of plain JWT.
  - Decrypt on the server only → never rely on client to read sensitive claims.
**4️⃣ Use short-lived access tokens**
  - Even if a token leaks, it will expire quickly (e.g., 15–60 min).
  - Use a refresh token to get new access tokens instead of long-lived tokens.
**5️⃣Minimal exposure on client**
  - Don’t expose JWT to third-party scripts.
  - Avoid sending JWT in URLs → use headers instead (Authorization: Bearer <token>).
### Summary
| Task             | Recommended Method          |
| ---------------- | --------------------------- |
| Storage          | HTTP-only Cookies           |
| Token Expiration | Decode & Check `exp`        |
| Protected Routes | Custom `<ProtectedRoute />` |
| Refresh Token    | Use Axios Interceptor       |
| Logout           | Remove token / clear cookie |
