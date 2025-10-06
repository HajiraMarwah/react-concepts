# ⚛️ React Rendering Behavior

React’s rendering behavior determines **when and why components update (re-render)** in your app.  
Understanding this helps improve performance and avoid unnecessary renders.

---

## 🔍 What is Rendering?

Rendering in React means **executing a component’s function** to produce a new set of UI elements (the virtual DOM).  
React then compares this new virtual DOM with the previous one using the **Reconciliation** process and updates only what has changed.

---

## 🧩 When Does React Re-render?

A React component **re-renders** when:
1. **Its state changes** (`useState` or `useReducer` updates).  
2. **Its props change** (parent component passes new values).  
3. **Its parent re-renders**, causing children to re-render (if not memoized).  
4. **Context value changes** (when using `useContext`).  

---

## ⚙️ Example

```jsx
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Priyanka");

  console.log("Counter component re-rendered");

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>

      <h3>Name: {name}</h3>
      <button onClick={() => setName("Hajira")}>Change Name</button>
    </div>
  );
}

export default Counter;
```
**What Happens Here?**
  1. When you click Increment, React updates the count state.
     → The component re-renders, showing the new count.

  2. When you click Change Name, React updates the name state.
    → The component re-renders again, even though count didn’t change.

React always re-renders the component when any part of its state or props changes — but it only updates the changed parts of the DOM.


## ⚡ How to Optimize Rendering in React

React re-renders components when state, props, or context changes.  
Optimizing rendering improves performance, especially in large apps.

### 🛠 Optimization Techniques

| Technique | Description |
| --------- | ----------- |
| **React.memo()** | Prevents functional components from re-rendering unless props change. |
| **useMemo()** | Memoizes expensive calculations so they don’t re-run on every render. |
| **useCallback()** | Memoizes functions to prevent re-creation on each render. |
| **Key Prop** | Helps React identify which list items changed or moved in a list. |
| **Splitting Components** | Smaller components reduce the re-render scope. |

---


**Example Using React.memo**
```jsx
import React, { useState, memo } from "react";

const Child = memo(({ value }) => {
  console.log("Child re-rendered");
  return <h3>Value: {value}</h3>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something"
      />

      <Child value={count} />
    </div>
  );
}

export default Parent;
```
 **Explanation**
  - Child will only re-render when its value prop changes.
  - Typing in the input updates text (state in parent), but since value didn’t change, the child won’t re-render — saving performance.

## 🧩 Summary Table: React Rendering Behavior

| Concept | Explanation |
| -------- | ----------- |
| **Rendering** | Generating the UI based on component state and props. |
| **Re-render** | Occurs when state, props, or context changes. |
| **Virtual DOM** | In-memory representation of the DOM used to update only what changed. |
| **Optimization** | Techniques to reduce unnecessary re-renders and improve performance. |
