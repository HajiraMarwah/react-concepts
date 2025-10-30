
# 🟢 Redux in React

## 📘 Overview

Redux is a **predictable state container** for JavaScript apps, often used with React to manage complex application state.  
It centralizes the app state in a **single store**, making state changes predictable and easier to debug.

---

## 🔹 Core Concepts

Redux has **four key building blocks**:

1. **Actions**
2. **Reducers**
3. **Store**
4. **Middleware**

---

### 1️⃣ Actions

**Definition:**  
An **action** is a plain JavaScript object that describes **what happened** in the application.  

**Structure:**  
```js
{
  type: "ACTION_TYPE",
  payload: { /* optional data */ }
}
```
**Example:**
```jsx
// actions.js
export const increment = () => ({ type: "INCREMENT" });
export const decrement = () => ({ type: "DECREMENT" });
```
Actions do not change state themselves — they only describe the intention to change state.

## 2️⃣ Reducer
A reducer is a pure function that determines how the state changes based on the action.

**Signature:**
```js
(state, action) => newState
```
**Example:**
```js
// reducer.js
const initialState = { count: 0 };

export function counterReducer(state = initialState, action) {
  switch(action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
}
```
Reducers are pure functions — they do not mutate the state directly.

## 3️⃣ Store
The store is a centralized place that holds the app state.
It provides methods to read state, dispatch actions, and subscribe to changes.

**Example**:
```js
import { createStore } from "redux";
import { counterReducer } from "./reducer";

const store = createStore(counterReducer);

// Access state
console.log(store.getState()); // { count: 0 }

// Dispatch action
store.dispatch({ type: "INCREMENT" });
console.log(store.getState()); // { count: 1 }

// Subscribe to state changes
store.subscribe(() => console.log(store.getState()));
```
## 4️⃣ Middleware
Middleware is a way to intercept actions before they reach the reducer.
 It can be used for:
 1. Logging
 2. Async operations (e.g., API calls)
 3. Analytics

## Example with Redux Thunk:
```js
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { counterReducer } from "./reducer";

// Async action
const incrementAsync = () => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({ type: "INCREMENT" });
    }, 1000);
  };
};

const store = createStore(counterReducer, applyMiddleware(thunk));
store.dispatch(incrementAsync());
```
Middleware extends Redux capabilities without modifying the core logic.

**Summary**
| Concept        | Description                                                                |
| -------------- | -------------------------------------------------------------------------- |
| **Action**     | Plain object describing what happened (`type` and optional `payload`).     |
| **Reducer**    | Pure function that updates state based on actions.                         |
| **Store**      | Centralized state container; provides `getState`, `dispatch`, `subscribe`. |
| **Middleware** | Intercepts actions for logging, async operations, etc.                     |


**🧭 Key Points**
  - Redux centralizes app state in one store.
  - Actions describe intent, reducers implement logic.
  - Middleware allows handling side effects (like async API calls).
  - Works best for medium to large applications with complex state interactions.