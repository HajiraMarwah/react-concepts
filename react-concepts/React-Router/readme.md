# ⚛️ React Router in React

React Router is a standard library for routing in React. It allows you to **navigate between different components/pages** in a single-page application (SPA) without refreshing the browser.

---

## 1️⃣ BrowserRouter vs HashRouter

| Feature | BrowserRouter | HashRouter |
|---------|---------------|------------|
| URL Format | Uses normal URLs (e.g., `/about`) | Uses hash in URL (e.g., `/#/about`) |
| Server Setup | Requires server configuration to handle client-side routing | Works without server setup (good for GitHub Pages) |
| History | Uses HTML5 History API (`pushState`, `replaceState`) | Uses URL hash to simulate routing |
| Best Use | Modern apps with server support | Static apps hosted on platforms like GitHub Pages |


**Simple Example: BrowserRouter**

```jsx
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Pages
function Home() {
  return <h2>Home Page</h2>;
}

function About() {
  return <h2>About Page</h2>;
}

// App Component
function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```
***✅ Explanation***
  - BrowserRouter wraps the app to enable client-side routing.
  - Route defines which component renders for a given URL path.
  - Link navigates between pages without reloading the browser.

## 2️⃣ React Router Components

| Component | Purpose                                           | Example                                                                                     |
| --------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `Route`   | Defines a route and the component to render       | `<Route path="/about" element={<About />} />`                                               |
| `Link`    | Navigates to a route without page reload          | `<Link to="/about">About</Link>`                                                            |
| `NavLink` | Like Link but adds **active class** automatically | `<NavLink to="/about" className={({isActive}) => isActive ? "active" : ""}>About</NavLink>` |

**Simple Example: React Router Components**

```jsx
import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";

// Pages
function Home() {
  return <h2>Home Page</h2>;
}

function About() {
  return <h2>About Page</h2>;
}

function Contact() {
  return <h2>Contact Page</h2>;
}

// App Component
function App() {
  return (
    <BrowserRouter>
      <nav>
        {/* Link navigates without page reload */}
        <Link to="/">Home</Link> | 
        <Link to="/about">About</Link> | 
        {/* NavLink adds 'active' class automatically */}
        <NavLink 
          to="/contact" 
          className={({ isActive }) => isActive ? "active" : ""}
        >
          Contact
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```
**Explanation**
  - BrowserRouter wraps the app for client-side routing.
  - Route defines which component renders for a given path.
  - Link navigates between pages without reloading.
  - NavLink highlights the active link automatically.

## 3️⃣ Nested Routes

Nested routes allow you to render child routes inside parent components.
**Example: Nested Routes in React Router**

```jsx
import React from "react";
import { BrowserRouter, Routes, Route, NavLink, Outlet } from "react-router-dom";

// Child pages
function Profile() {
  return <h3>Profile Page</h3>;
}

function Settings() {
  return <h3>Settings Page</h3>;
}

// Parent page
function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <NavLink to="profile" style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}>
          Profile
        </NavLink>{" "}
        |{" "}
        <NavLink to="settings" style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}>
          Settings
        </NavLink>
      </nav>
      {/* Nested routes render here */}
      <Outlet />
    </div>
  );
}

// App component
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```
  **Explanation**
   - Dashboard is a parent route.
   - Profile and Settings are nested routes under Dashboard.
   - <Outlet /> renders the child route component inside the parent.
   - NavLink is used for navigation and highlights the active link.

## 4️⃣ Programmatic Navigation (useNavigate)

useNavigate hook allows you to navigate programmatically (e.g., after form submission or button click).

**Example: Programmatic Navigation with `useNavigate`**

```jsx
import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

// Pages
function Home() {
  return <h2>Home Page</h2>;
}

function Dashboard() {
  return <h2>Dashboard Page</h2>;
}

// Component with programmatic navigation
function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform login logic here (e.g., authentication)
    navigate("/dashboard"); // Redirect to Dashboard after login
  };

  return <button onClick={handleLogin}>Login</button>;
}

// App component
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```
  **Explanation**
  -  useNavigate hook is used to navigate programmatically.
  -  Clicking the Login button redirects the user to the Dashboard page without a page reload.
  - Useful for redirects after form submissions, authentication, or actions.
## 5️⃣ Protected Routes and Authentication

Protected routes restrict access based on authentication status.

**Example: Protected Routes**

```jsx
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";

// Pages
function Home() {
  return <h2>Home Page</h2>;
}

function Dashboard() {
  return <h2>Dashboard - Protected</h2>;
}

function Login({ setIsAuth }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuth(true);           // Set authentication
    navigate("/dashboard");    // Redirect to protected page
  };

  return <button onClick={handleLogin}>Login</button>;
}

// ProtectedRoute Component
function ProtectedRoute({ isAuth, children }) {
  if (!isAuth) {
    return <Navigate to="/login" />; // Redirect if not authenticated
  }
  return children;
}

// App Component
function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuth={isAuth}>
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
 **Explanation**
  - ProtectedRoute checks if the user is authenticated (isAuth).
  - If not authenticated, it redirects to the Login page using <Navigate />.
  - Once authenticated, the user can access the Dashboard page.
  - useNavigate is used for programmatic redirection after login.
## ⚡  Summary 

| Feature | Description |
|---------|-------------|
| **BrowserRouter** | Uses HTML5 history API, needs server support for routing. Example URL: `/about` |
| **HashRouter** | Uses URL hash (`#`) for routing, works without server setup. Example URL: `/#/about` |
| **Route** | Defines a route and the component to render. `<Route path="/about" element={<About />} />` |
| **Link** | Navigates to a route without reloading the page. `<Link to="/about">About</Link>` |
| **NavLink** | Like Link but automatically adds an `active` class to highlight the current route. `<NavLink to="/about">About</NavLink>` |
| **Nested Routes** | Allows child routes to be rendered inside parent components using `<Outlet />`. |
| **useNavigate** | Hook to navigate programmatically (e.g., after login or button click). |
| **Protected Routes** | Restrict access to routes based on authentication. Redirect unauthorized users. |
