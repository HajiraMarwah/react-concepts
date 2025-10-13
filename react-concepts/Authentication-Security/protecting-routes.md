#  Protecting Routes in React

In React applications, **protected routes** are pages or components that should only be accessible to **authenticated users** — for example, dashboards, profiles, or admin panels.  
If a user is not authenticated, they should be redirected (usually to a login page).

---

##  Why Protect Routes?

Protecting routes ensures:
- Only **authorized users** can access certain areas of your app.
- Sensitive data and components are **kept secure**.
- Users are **redirected** appropriately when their session expires or they are logged out.

---

##  Common Authentication Flow

1. User logs in via a form.
2. The app sends credentials to a backend API.
3. Backend verifies credentials and returns a **JWT (JSON Web Token)** or session cookie.
4. Token is stored in **localStorage** or **React Context**.
5. The app uses that token to protect certain routes.

---

##  Implementing Protected Routes

Let’s explore two approaches using **React Router v6**.

---

###  Example 1 — Basic Protected Route

```jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem("token"); // Check if user is authenticated

  if (!isAuth) {
    return <Navigate to="/login" replace />; // Redirect if not logged in
  }

  return children; // Render protected component if authenticated
};

export default ProtectedRoute;
```
**Then, use it in your App.js:**
```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./Dashboard";
import Login from "./Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```
**Explanation:**
 - If localStorage has no token, user is redirected to /login.
 - Otherwise, the protected page (Dashboard) is displayed.

## Example 2 — Using React Context for Authentication
You can manage authentication state globally using React Context.

**Step 1: Create AuthContext.js**
```jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuth(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```
**Step 2: Wrap App with AuthProvider**
```jsx
import { AuthProvider } from "./AuthContext";
import AppRoutes from "./AppRoutes";

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
```
**Step 3: Create ProtectedRoute Using Context**
```jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { isAuth } = useAuth();

  return isAuth ? children : <Navigate to="/login" replace />;
};
```
**Step 4: Use It in Routes**
```jsx
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Dashboard from "./Dashboard";
import Login from "./Login";

export default function AppRoutes() {
  return (
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
  );
}
```
## Example 3 — JWT-Based Protection with Token Decoding

You can decode and validate a JWT token before allowing access.
```jsx
import jwtDecode from "jwt-decode";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000; // current time in seconds

    if (decoded.exp < now) {
      localStorage.removeItem("token");
      return <Navigate to="/login" replace />;
    }

    return children;
  } catch (err) {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
```
## What happens here:
 - jwt-decode extracts token data (like exp time).
 - If expired or invalid, redirect to login.
 - Otherwise, allow access to the route.

## Bonus — Role-Based Route Protection

If your app has roles (e.g., admin, user), extend the protection logic:
```jsx
const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};
```
**Use it like this:**
```jsx
<Route
  path="/admin"
  element={
    <RoleProtectedRoute allowedRoles={["admin"]}>
      <AdminPanel />
    </RoleProtectedRoute>
  }
/>
```
## Summary
| Concept               | Description                                   | Example                                         |
| --------------------- | --------------------------------------------- | ----------------------------------------------- |
| Protected Route       | Restricts access to authenticated users       | `<ProtectedRoute><Dashboard/></ProtectedRoute>` |
| Redirect              | Redirects unauthorized users to another route | `<Navigate to="/login" />`                      |
| Token Storage         | Stores JWT or session token                   | `localStorage.setItem('token', token)`          |
| Context Auth          | Global authentication management              | `AuthContext` with `useAuth()`                  |
| Role-Based Protection | Allows specific roles to access routes        | `allowedRoles={['admin']}`                      |

## Best Practices
 - Use JWTs for authentication.
 - Prefer HTTP-only cookies instead of localStorage for higher security.
 - Use context or Redux to track login state.
 - Always verify tokens on the backend.
 - Handle token expiration and redirect users automatically.
 - Add a loading state when checking auth status.

## Example Folder Structure
```css
src/
 ├── AuthContext.js
 ├── ProtectedRoute.js
 ├── RoleProtectedRoute.js
 ├── components/
 │    ├── Login.js
 │    └── Dashboard.js
 ├── AppRoutes.js
 └── App.js
```

## In summary:
Protected routes ensure only logged-in users access certain pages.
Use tokens (e.g., JWTs), React Context, or role-based guards for robust security in your React applications.