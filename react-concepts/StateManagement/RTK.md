# 🧩 Redux Toolkit in React

## 📘 What is Redux Toolkit?

**Redux Toolkit (RTK)** is the **official, recommended way** to write Redux logic.  
It simplifies Redux setup by reducing boilerplate code and making state management more predictable and efficient.

RTK provides powerful utilities like:
- `configureStore()` → easily creates a Redux store with sensible defaults.
- `createSlice()` → combines action creators and reducers in one place.
- `createAsyncThunk()` → handles async logic (like API calls).
- `useSelector` and `useDispatch` → used in components to read and update state.

---

## ⚙️ Core Concepts

| Concept              | Description |
| --------------------- | -------------------------------------------------------------------------- |
| **Store**             | Centralized state container created with `configureStore()` |
| **Slice**             | A piece of the Redux state with its own actions and reducers |
| **Reducer**           | Function that updates the state based on actions |
| **Action**            | Plain object describing what happened |
| **Dispatch**          | Method to send actions to the store |
| **Selector**          | Function to read specific data from the Redux store |

---

## 🚀 Example: Simple Counter App

### 1️⃣ Install dependencies
```bash
npm install @reduxjs/toolkit react-redux
```
## 2️⃣ Create a slice

📄 counterSlice.js
```js
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

export const { increment, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;
```
## 3️⃣ Configure the store

📄 store.js
```js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```
## 4️⃣ Provide the store

📄 main.jsx
```js
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```
## 5️⃣ Use Redux in the component

📄 App.jsx
```js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "./counterSlice";

const App = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Redux Toolkit Counter</h1>
      <h2>{count}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
};

export default App;
```
## How It Works
  1. createSlice() automatically creates actions and reducers.
  2. configureStore() sets up the Redux store with developer tools and middleware.
  3. Provider makes the store available to the entire app.
  4. useSelector() reads data from the store.
  5. useDispatch() sends actions to modify the state.
  
## 📘 Key Concepts

| Concept              | Description                                          |
| -------------------- | ---------------------------------------------------- |
| **Redux Toolkit**    | Simplifies Redux setup with built-in best practices. |
| **createSlice()**    | Combines reducers and actions in one step.           |
| **configureStore()** | Sets up the Redux store with minimal configuration.  |
| **useSelector**      | Reads data from Redux store.                         |
| **useDispatch**      | Sends actions to the store to update the state.      |

---

  ## ✅ Output Example
  ```js
  Initial Count: 0  
  Click "Increment" → Count: 1  
  Click "Decrement" → Count: 0  
  Click "Reset" → Count: 0
   ```
 ## Summary
Redux Toolkit is the modern, efficient, and minimal-boilerplate way to manage global state in React applications.