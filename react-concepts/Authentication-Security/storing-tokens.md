# 🔐 Storing Tokens Securely in React

When implementing authentication in React, we often receive a **JWT (JSON Web Token)** or session token from the backend after a user logs in.  
This token must be stored securely on the client to:
- Verify the user’s identity,
- Access protected routes,
- Send authenticated API requests.

---

## 📦 Common Token Storage Options

There are three main ways to store authentication tokens in a React app:

| Storage Method | Accessibility | Security Level | Persistence |
|----------------|----------------|----------------|--------------|
| **localStorage** | JavaScript (window.localStorage) | ❌ Vulnerable to XSS attacks | ✅ Persists after page reload |
| **sessionStorage** | JavaScript (window.sessionStorage) | ❌ Vulnerable to XSS attacks | ⚙️ Clears on tab close |
| **HTTP-only Cookies** | Not accessible by JavaScript | ✅ Secure against XSS | ✅ Can persist with expiry |

---

## 🧱 1. Storing Tokens in `localStorage`

### 💡 Description
`localStorage` allows saving key-value pairs in the browser that persist even after refreshing or reopening the page.

### ✅ Example

```jsx
// Store token
localStorage.setItem("token", jwtToken);

// Retrieve token
const token = localStorage.getItem("token");

// Remove token on logout
localStorage.removeItem("token");
```
**Drawbacks**
 - Accessible via JavaScript → vulnerable to XSS attacks.
 - Attackers can inject scripts and steal tokens from localStorage.

**Best For**
 - Non-critical or internal apps where security is less strict.
 - When simplicity is a priority.

## 2. Storing Tokens in sessionStorage

sessionStorage is similar to localStorage but clears automatically when the tab or browser is closed.

Example
```jsx
// Store token
sessionStorage.setItem("token", jwtToken);

// Retrieve token
const token = sessionStorage.getItem("token");

// Remove token on logout
sessionStorage.removeItem("token");
```
**Drawbacks**
 - Also vulnerable to XSS attacks.
 - Token disappears when the tab or browser is closed (may require re-login).

**Best For**
 - Temporary sessions (e.g., short-lived user sessions or admin panels).
 - Apps that should log out users on browser close.

## 3. Storing Tokens in HTTP-Only Cookies
Tokens can be stored in cookies with the HttpOnly and Secure flags, which means:
 - JavaScript cannot access them (document.cookie).
 - They are automatically sent with each request to the backend domain.

**Example (Backend Setup)**
```js
// Example using Express.js
res.cookie("token", jwtToken, {
  httpOnly: true,     // prevents access from JavaScript
  secure: true,       // only sent over HTTPS
  sameSite: "Strict", // prevents CSRF
  maxAge: 1000 * 60 * 60 * 24, // 1 day
});
```
**Example (Frontend Request)**

When using fetch or axios, include credentials:
```jsx
// Using Fetch API
fetch("https://api.example.com/protected", {
  method: "GET",
  credentials: "include" // send cookies automatically
});

// Using Axios
axios.get("https://api.example.com/protected", {
  withCredentials: true
});
```
**Drawbacks**
 - Cookies can be vulnerable to CSRF attacks if SameSite is not configured properly.
 - Slightly more complex setup compared to localStorage.

**Best For**
 - Production-grade applications.
 - Secure authentication systems where token theft must be prevented.

## Combining Methods (Access + Refresh Tokens)

A recommended modern approach is to use both cookies and memory/localStorage:
| Token Type        | Storage                 | Purpose                               |
| ----------------- | ----------------------- | ------------------------------------- |
| **Access Token**  | In-memory (React state) | Short-lived (~15 mins) authentication |
| **Refresh Token** | HTTP-only cookie        | Used to get a new access token        |

## Flow Example
  1. User logs in → server issues both tokens.
  2. Access token stored in memory (fast, temporary).
  3. Refresh token stored in secure HTTP-only cookie.
  4. When access token expires → client silently refreshes it using the cookie.
```jsx
// Example token refresh flow
const refreshAccessToken = async () => {
  const res = await fetch("/api/refresh-token", {
    method: "POST",
    credentials: "include" // sends the HttpOnly cookie
  });
  const data = await res.json();
  localStorage.setItem("access_token", data.accessToken);
};
```
## Summary Comparison
| Method                        | Accessible by JS | Survives Refresh | Secure from XSS | Secure from CSRF  | Recommended Usage           |
| ----------------------------- | ---------------- | ---------------- | --------------- | ----------------- | --------------------------- |
| **localStorage**              | ✅ Yes            | ✅ Yes            | ❌ No            | ✅ Yes             | Simple apps / local testing |
| **sessionStorage**            | ✅ Yes            | ❌ No             | ❌ No            | ✅ Yes             | Temporary sessions          |
| **HTTP-only Cookies**         | ❌ No             | ✅ Yes            | ✅ Yes           | ⚠️ Needs SameSite | Secure apps / production    |
| **Hybrid (Access + Refresh)** | Partial          | ✅ Yes            | ✅ High          | ✅ High            | Best Practice               |

## Best Practices
 1. Use HTTP-only cookies in production for security.
 2. Implement token refresh mechanism for long sessions.
 3. Avoid storing sensitive tokens in localStorage.
 4. Always use HTTPS with secure cookies.
 5. Consider libraries like:
    - react-query:for token refresh flows
    - axios.interceptors-to attach tokens automatically

## Example Folder Structure
```css
src/
 ├── auth/
 │   ├── AuthContext.js
 │   ├── authService.js
 │   ├── useAuth.js
 ├── api/
 │   ├── axiosInstance.js
 ├── components/
 │   ├── Login.js
 │   ├── ProtectedRoute.js
 └── App.js
```
## Summary
| Scenario                 | Recommended Storage                           |
| ------------------------ | --------------------------------------------- |
| Development or test apps | `localStorage`                                |
| Temporary sessions       | `sessionStorage`                              |
| Production, secure apps  | `HTTP-only cookies`                           |
| Long-lived sessions      | Hybrid (Access in memory + Refresh in cookie) |

## In short:
For most modern, secure React apps, use HTTP-only cookies for refresh tokens and in-memory storage for short-lived access tokens.
Avoid storing sensitive tokens in localStorage unless absolutely necessary.