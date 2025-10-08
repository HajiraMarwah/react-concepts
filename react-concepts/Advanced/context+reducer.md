### 🌐 Managing Global State with Context + useReducer in React

## 📘 Introduction

When an application grows, **sharing state between multiple components** becomes complex.  
Using **Context API** with **useReducer** provides a clean and scalable way to manage **global state** — without needing external libraries like Redux.

---

## 🧩 Why Context + useReducer?

| Feature | Description |
| -------- | ------------ |
| **Context API** | Provides a way to pass data deeply through the component tree **without prop drilling**. |
| **useReducer Hook** | Manages complex state logic in a predictable and centralized way (like Redux reducers). |
| **Together** | You can create a **lightweight global store** where state updates are handled through actions and reducers. |

---

## ⚙️ Basic Architecture
📦 src/
┣ 📁 context/
┃ ┣ 🧩 GlobalStateContext.js
┣ 📁 components/
┃ ┣ 🧱 Counter.js
┣ 🪄 App.js

```jsx

---

## 🧠 Step 1: Create a Reducer

A reducer defines **how state changes** in response to specific **actions**.

```jsx

// context/reducer.js
export const initialState = { count: 0 };

export function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
}
```
## Step 2: Create Context and Provider

The Provider wraps your app and exposes global state and the dispatch function.
```jsx
// context/GlobalStateContext.js
import React, { createContext, useReducer } from "react";
import { reducer, initialState } from "./reducer";

// 1️⃣ Create Context
export const GlobalContext = createContext();

// 2️⃣ Create Provider
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
```
## Step 3: Use Context in Components

Any component can now read or update global state using useContext.
```jsx
// components/Counter.js
import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalStateContext";

const Counter = () => {
  const { state, dispatch } = useContext(GlobalContext);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>🧮 Count: {state.count}</h2>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>➕ Increment</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>➖ Decrement</button>
      <button onClick={() => dispatch({ type: "RESET" })}>🔁 Reset</button>
    </div>
  );
};

export default Counter;
```
## Step 4: Wrap Your App with the Provider

Wrap the App with GlobalProvider so all components can access global state.
```jsx
// App.js
import React from "react";
import { GlobalProvider } from "./context/GlobalStateContext";
import Counter from "./components/Counter";

const App = () => {
  return (
    <GlobalProvider>
      <div>
        <h1>🌍 Global State Management (Context + useReducer)</h1>
        <Counter />
      </div>
    </GlobalProvider>
  );
};

export default App;
```
## Flow Diagram
```js
Component -> dispatch(action) 
     ↓
Reducer (updates state)
     ↓
GlobalContext (provides updated state)
     ↓
Component re-renders with new state
```

## Key Benefits
| Advantage                 | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| ✅ Centralized state logic | All state transitions happen in one reducer function.  |
| 🔄 Predictable updates    | Reducer functions are pure and predictable.            |
| 🌍 Global accessibility   | Context provides state anywhere without prop drilling. |
| ⚡ Lightweight alternative | No need for Redux or external state libraries.         |

## Example: Adding More Global Data

You can easily scale your global state to handle user info, theme, auth, etc.
```jsx
export const initialState = {
  count: 0,
  theme: "light",
  user: { name: "Priyanka", loggedIn: false },
};

export function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    case "LOGIN":
      return { ...state, user: { name: action.payload, loggedIn: true } };
    case "LOGOUT":
      return { ...state, user: { name: "", loggedIn: false } };
    default:
      return state;
  }
}
```
## Summary Table
| Concept              | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| **Context API**      | Provides global data access without prop drilling.           |
| **useReducer**       | Handles state logic and updates based on dispatched actions. |
| **dispatch(action)** | Sends an action to the reducer to update state.              |
| **Provider**         | Wraps components to share global data and state.             |

## ✅ Summary

 1. Context + useReducer = Lightweight Redux
   - useReducer → Handles how state updates happen.
   - Context → Makes the state globally accessible.
   - Together → Clean, predictable, scalable global state management.

## Example use cases:
 - Authentication management 🧑‍💻
 - Theme switching 🌗
 - Cart system in e-commerce 🛒
 - Notifications or UI preferences 🔔

