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

**Example:**
```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</BrowserRouter>
```
## 2️⃣ React Router Components

| Component | Purpose                                           | Example                                                                                     |
| --------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `Route`   | Defines a route and the component to render       | `<Route path="/about" element={<About />} />`                                               |
| `Link`    | Navigates to a route without page reload          | `<Link to="/about">About</Link>`                                                            |
| `NavLink` | Like Link but adds **active class** automatically | `<NavLink to="/about" className={({isActive}) => isActive ? "active" : ""}>About</NavLink>` |

## 3️⃣ Nested Routes

Nested routes allow you to render child routes inside parent components.
```js
<Routes>
  <Route path="/dashboard" element={<Dashboard />}>
    <Route path="profile" element={<Profile />} />
    <Route path="settings" element={<Settings />} />
  </Route>
</Routes>
```
**In Dashboard component:**
```js
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <Outlet /> {/* Renders nested routes */}
    </div>
  );
}
```
## 4️⃣ Programmatic Navigation (useNavigate)

useNavigate hook allows you to navigate programmatically (e.g., after form submission or button click).
```js
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // perform login logic
    navigate("/dashboard"); // redirects user
  };

  return <button onClick={handleLogin}>Login</button>;
}
```
## 5️⃣ Protected Routes and Authentication

Protected routes restrict access based on authentication status.
```js
import { Navigate } from "react-router-dom";

function ProtectedRoute({ isAuth, children }) {
  if (!isAuth) {
    return <Navigate to="/login" />; // redirect to login if not authenticated
  }
  return children;
}
```
**Usage:**
```js
<Routes>
  <Route path="/dashboard" element={
    <ProtectedRoute isAuth={userLoggedIn}>
      <Dashboard />
    </ProtectedRoute>
  } />
  <Route path="/login" element={<Login />} />
</Routes>
```
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
