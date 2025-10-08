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

