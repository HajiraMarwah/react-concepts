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
### Summary
| Task             | Recommended Method          |
| ---------------- | --------------------------- |
| Storage          | HTTP-only Cookies           |
| Token Expiration | Decode & Check `exp`        |
| Protected Routes | Custom `<ProtectedRoute />` |
| Refresh Token    | Use Axios Interceptor       |
| Logout           | Remove token / clear cookie |
