# 🌐 React Context API

## 📘 Overview

The **Context API** in React is a built-in feature that allows you to **share data globally** across components **without passing props manually** at every level (avoiding **prop drilling**).

It provides a way to make data accessible to any component in the component tree, regardless of how deeply nested it is.

---

## 🔹 Why Use Context API?

In large React applications, you may need to share data like:
- User authentication details
- Theme (light/dark mode)
- Language or localization settings
- Global configuration or app state

Without Context, this requires **prop drilling** — passing props through multiple layers of components that don’t need them directly.  
The Context API solves this problem elegantly.

---

## ⚙️ How Context API Works

The Context API works in **three main steps**:

1. **Create Context**
2. **Provide Context**
3. **Consume Context**

---

## 🧱 Step-by-Step Example

### 1️⃣ Create Context

```jsx
import React, { createContext, useState } from "react";

// Create a new Context
export const UserContext = createContext();
```
### 2️⃣ Provide Context
The Provider component supplies data to its child components.
```jsx
export function UserProvider({ children }) {
  const [user, setUser] = useState({ name: "Priyanka", loggedIn: true });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
```
You can wrap your entire app (or a part of it) with this provider so that any component inside it can access the user data.
```jsx
import React from "react";
import { UserProvider } from "./UserContext";
import Dashboard from "./Dashboard";

function App() {
  return (
    <UserProvider>
      <Dashboard />
    </UserProvider>
  );
}

export default App;
```
### 3️⃣ Consume Context

You can access the context data in two ways:

  a. Using useContext Hook (Recommended)
  ```jsx
  import React, { useContext } from "react";
import { UserContext } from "./UserContext";

function Dashboard() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <button onClick={() => setUser({ ...user, loggedIn: false })}>
        Logout
      </button>
    </div>
  );
}
```
b. Using <UserContext.Consumer>
```jsx
<UserContext.Consumer>
  {({ user }) => <h3>Hello, {user.name}!</h3>}
</UserContext.Consumer>
```
## Example Summary
```jsx
// Flow:
// 1. Create Context → const MyContext = createContext()
// 2. Provide Context → <MyContext.Provider value={data}>...</MyContext.Provider>
// 3. Consume Context → const value = useContext(MyContext)
```

### Comparison with Prop Drilling

| Feature         | Context API                      | Prop Drilling                     |
| --------------- | -------------------------------- | --------------------------------- |
| **Purpose**     | Share global data easily         | Pass data manually through props  |
| **Ease of Use** | Simple and scalable              | Becomes hard for deep trees       |
| **Performance** | Efficient for shared state       | Slower and harder to manage       |
| **Best For**    | Themes, authentication, settings | Small apps with limited data flow |

### 🧠 Best Practices

✅ Use Context for global or shared state.
🚫 Don’t use it for every piece of state — that may cause unnecessary re-renders.
💡 Combine Context with custom hooks or state management libraries (like Redux or Zustand) for complex apps.

## Summary
| Concept       | Description                                                                 |
| ------------- | --------------------------------------------------------------------------- |
| **Context API** | Allows sharing data globally without prop drilling.                        |
| **Provider**    | Makes data available to all child components.                               |
| **Consumer / useContext** | Lets components access the shared data.                           |
| **Use Case**    | When multiple components need access to the same state or data.           |
