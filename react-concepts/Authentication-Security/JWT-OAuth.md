## Authentication in React: JWT vs OAuth 2.0

Modern web apps (like those built with React) often need to authenticate users and manage secure access to protected APIs.
Two popular mechanisms for doing this are JWT (JSON Web Tokens) and OAuth 2.0.

## 1. What is JWT (JSON Web Token)?
🔹 Definition

JWT (JSON Web Token) is a compact and self-contained way to securely transmit information between a client and a server as a JSON object.

It is often used for stateless authentication — meaning the server doesn’t need to store session data.

🔹 Structure of a JWT

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
**JWT Authentication Flow in React**
 1. User logs in
   - React sends credentials to the backend (e.g., /api/login).
 2. Server verifies credentials
   - If valid, it generates a JWT and sends it back to the client.
 3. Client stores token
   - The JWT is usually stored in localStorage or HTTP-only cookies.
 4. Access protected routes
   - For every API request, React sends the token in the Authorization header.
 5. Server validates token
   - If valid, user is granted access.

 **Example: JWT Authentication in React**
  Backend (Express.js)
  ```js
  const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());

const SECRET_KEY = "my_secret_key";

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "user" && password === "1234") {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.get("/profile", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Token required" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    res.json({ message: "Welcome", user });
  });
});

app.listen(4000, () => console.log("Server running on port 4000"));
```
**Frontend (React)**
```jsx
import { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const handleLogin = async () => {
    const res = await axios.post("http://localhost:4000/login", { username, password });
    setToken(res.data.token);
    localStorage.setItem("token", res.data.token);
  };

  const getProfile = async () => {
    const res = await axios.get("http://localhost:4000/profile", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    console.log(res.data);
  };

  return (
    <div>
      <input placeholder="username" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <button onClick={getProfile}>Get Profile</button>
    </div>
  );
}

export default Login;
```

## JWT Authentication with Refresh Tokens in React

In modern web applications, access tokens (JWTs) usually expire quickly (e.g. 15 minutes) for security reasons.
To keep users logged in without forcing them to re-enter credentials, we use a refresh token mechanism.

**1. Why Use Refresh Tokens?**
JWTs are stateless — once they expire, they can’t be reused or extended.
So, instead of re-login every time, a refresh token (long-lived) helps obtain a new access token when the old one expires.

**2. JWT Flow with Refresh Tokens**

Here’s how it works:
```sql
+------------+          +-------------+
|  React App |          |   Backend   |
+------------+          +-------------+
       |                        |
       | 1️⃣ Login (email, password)
       |----------------------->|
       |                        |
       | 2️⃣ Backend validates credentials
       |                        |
       | 3️⃣ Sends:
       |     - accessToken (short-lived)
       |     - refreshToken (long-lived)
       |<-----------------------|
       |                        |
       | 4️⃣ React stores:
       |     - accessToken in memory/localStorage
       |     - refreshToken in HttpOnly cookie
       |                        |
       | 5️⃣ On API call:
       |     - Send accessToken
       |----------------------->|
       |                        |
       | 6️⃣ If token expired:
       |     - Send refreshToken to /refresh endpoint
       |<---------------------->|
       | 7️⃣ Receive new accessToken
       |                        |
       | ✅ Continue using new token
```
**3. Backend Example (Node.js + Express + JWT)**
```js
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

const ACCESS_SECRET = "access_secret";
const REFRESH_SECRET = "refresh_secret";

let refreshTokens = []; // In real apps, store securely (e.g., Redis, DB)

// Generate tokens
function generateTokens(user) {
  const accessToken = jwt.sign(user, ACCESS_SECRET, { expiresIn: "15s" });
  const refreshToken = jwt.sign(user, REFRESH_SECRET, { expiresIn: "7d" });
  refreshTokens.push(refreshToken);
  return { accessToken, refreshToken };
}

// LOGIN
app.post("/login", (req, res) => {
  const { username } = req.body;
  const tokens = generateTokens({ username });
  res.cookie("refreshToken", tokens.refreshToken, { httpOnly: true });
  res.json(tokens);
});

// PROTECTED ROUTE
app.get("/profile", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, ACCESS_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    res.json({ message: "Welcome back!", user });
  });
});

// REFRESH TOKEN
app.post("/refresh", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.sendStatus(403);
  }

  jwt.verify(refreshToken, REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const tokens = generateTokens({ username: user.username });
    res.cookie("refreshToken", tokens.refreshToken, { httpOnly: true });
    res.json(tokens);
  });
});

// LOGOUT
app.post("/logout", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  refreshTokens = refreshTokens.filter((t) => t !== refreshToken);
  res.clearCookie("refreshToken");
  res.sendStatus(204);
});

app.listen(4000, () => console.log("Auth server running on port 4000"));
```
**4. React Frontend Example**
Step 1: Login & Token Storage
```jsx
import axios from "axios";
import { useState } from "react";

axios.defaults.withCredentials = true; // allows sending cookies

function App() {
  const [accessToken, setAccessToken] = useState("");

  const login = async () => {
    const res = await axios.post("http://localhost:4000/login", { username: "user" });
    setAccessToken(res.data.accessToken);
    localStorage.setItem("accessToken", res.data.accessToken);
  };

  return (
    <div>
      <button onClick={login}>Login</button>
      <Profile accessToken={accessToken} setAccessToken={setAccessToken} />
    </div>
  );
}
```
**Frontend (React)**
```jsx
import { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const handleLogin = async () => {
    const res = await axios.post("http://localhost:4000/login", { username, password });
    setToken(res.data.token);
    localStorage.setItem("token", res.data.token);
  };

  const getProfile = async () => {
    const res = await axios.get("http://localhost:4000/profile", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    console.log(res.data);
  };

  return (
    <div>
      <input placeholder="username" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <button onClick={getProfile}>Get Profile</button>
    </div>
  );
}

export default Login;
```

**Advantages of JWT**
 - Stateless — no session data on the server.
 - Fast and scalable.
 - Easy to integrate with APIs and mobile apps.

**Disadvantages**
 - Tokens can’t be revoked easily.
 - If stored in localStorage, they are vulnerable to XSS. 
 - Must handle expiration securely.

## 2. What is OAuth 2.0?
🔹 Definition

OAuth 2.0 is an authorization framework that allows third-party apps to access a user’s data without exposing credentials.

Unlike JWT, OAuth is not just about authentication — it’s about delegating access.

**Key Entities**
| Entity                   | Description                                      |
| ------------------------ | ------------------------------------------------ |
| **Resource Owner**       | The user (e.g., you)                             |
| **Client**               | The app requesting access (e.g., your React app) |
| **Authorization Server** | Issues tokens (e.g., Google, GitHub)             |
| **Resource Server**      | Hosts the protected data (e.g., APIs)            |

**OAuth Flow (Authorization Code Grant)**
 1. User clicks “Login with Google”
    React app redirects to Google’s OAuth consent screen.
 2. User grants permission
    Google redirects back to your app with an authorization code.
 3. React exchanges code for token
    The backend uses this code to request access and refresh tokens.
 4. Access token used for API requests
    Backend or frontend uses token to access user data (e.g., profile info).

## Example: OAuth with React + Google

 **1️⃣ Set up Google OAuth in Google Cloud Console**
  - Go to console.cloud.google.com
  - Create credentials → OAuth 2.0 Client ID
  - Set redirect URI (e.g. http://localhost:3000)

**2️⃣ React Example**
```bash
npm install @react-oauth/google
```
```jsx
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

function App() {
  const clientId = "YOUR_GOOGLE_CLIENT_ID";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={(response) => {
          const user = jwtDecode(response.credential);
          console.log("User Info:", user);
        }}
        onError={() => console.log("Login Failed")}
      />
    </GoogleOAuthProvider>
  );
}

export default App;
```
**Advantages of OAuth 2.0**
 - Delegated access — users don’t share credentials.
 - Works with third-party providers (Google, Facebook, GitHub).
 - Supports refresh tokens for long sessions.

**Disadvantages**
 - More complex setup than JWT.
 - Requires backend configuration for secure token exchange.

## JWT vs OAuth — Summary
| Feature    | JWT                   | OAuth 2.0                        |
| ---------- | --------------------- | -------------------------------- |
| Purpose    | Authentication        | Authorization (delegated access) |
| Token Type | Self-contained        | Access & Refresh tokens          |
| Use Case   | Login systems, APIs   | Third-party integrations         |
| Storage    | localStorage / cookie | Authorization server             |
| Complexity | Simple                | More complex                     |
| Stateless  | ✅ Yes                 | ✅ Often                          |

## When to Use What
| Scenario                                    | Use           |
| ------------------------------------------- | ------------- |
| Simple app login with backend API           | **JWT**       |
| Login using Google/Facebook                 | **OAuth 2.0** |
| API gateway or microservices authentication | **JWT**       |
| Enterprise SSO or delegated permissions     | **OAuth 2.0** |

## Final Thoughts
 - Use JWT for simple, stateless app authentication.
 - Use OAuth 2.0 when integrating with external identity providers.
 - Always use HTTPS, short token lifetimes, and refresh tokens securely.