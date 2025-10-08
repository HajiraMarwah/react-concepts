# ⚡ React Strict Mode

## 📘 What is Strict Mode?

**React Strict Mode** is a **development-only tool** that helps you **highlight potential problems** in your React application.  

It does **not affect the production build**, but it performs extra checks and warnings to help you write **more robust and safe code**.

---

## 💡 Why Use Strict Mode?

✅ Detects **unsafe lifecycle methods** in class components  
✅ Warns about **legacy string refs**  
✅ Identifies **side effects in render**  
✅ Detects **unexpected component re-renders**  
✅ Helps ensure **best practices** for future React versions  

---

## 🧱 Syntax

Wrap your components with `<React.StrictMode>`:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```
**🧠 How Strict Mode Works**
  1. Runs in development mode only
  2. Double-invokes certain functions to detect side effects:
    - Class component constructor
    - render method
    - State updater functions
    - useEffect, useLayoutEffect cleanup functions
    Example: A useEffect hook with side effects might run twice in development to ensure it’s safe and idempotent.
    - Helps you write resilient code that is ready for concurrent rendering and future React features.
## Example: Detecting Side Effects
```js
import React, { useState, useEffect } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Effect ran");
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default Counter;
```
  1. In Strict Mode, the console may log "Effect ran" twice on mount in development.
  2. This is intentional — it helps detect side effects that are not safe to run multiple times

## Summary
| Concept                    | Description                                                         |
| -------------------------- | ------------------------------------------------------------------- |
| **Purpose**                | Highlight potential problems in React code                          |
| **Development Only**       | Warnings and checks appear only in development, not in production   |
| **Double Invokes**         | Certain methods/hooks are run twice to detect side effects          |
| **Common Issues Detected** | Unsafe lifecycles, legacy refs, side effects, unexpected re-renders |
| **Usage**                  | Wrap `<App />` or any component tree in `<React.StrictMode>`        |

## Notes
  - Strict Mode is opt-in, you can wrap only parts of your app
  - Helps prepare apps for future React features like concurrent rendering
  - Does not change the behavior in production

## In short:

React Strict Mode is a development tool that helps you write safer, more maintainable React code by highlighting unsafe patterns and unexpected side effects.