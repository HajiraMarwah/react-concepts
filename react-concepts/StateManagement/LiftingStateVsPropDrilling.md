# 🧠 Lifting State Up vs Prop Drilling in React

## 📘 Overview

In React, managing data flow between components is crucial for building predictable and maintainable UIs.  
Two important concepts in this process are **Lifting State Up** and **Prop Drilling**.

---

## 🔹 Lifting State Up

### **Definition**
**Lifting state up** means moving the shared state to the **closest common ancestor component** so that multiple child components can access and modify it through props.

### **Why we do it**
When two or more components need to **share or sync data**, we lift the state to their **parent component**.  
This keeps the source of truth in one place and ensures consistency.

### **Example**

```jsx
import React, { useState } from "react";

function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <ChildA count={count} />
      <ChildB setCount={setCount} />
    </div>
  );
}

function ChildA({ count }) {
  return <h3>Count: {count}</h3>;
}

function ChildB({ setCount }) {
  return <button onClick={() => setCount(prev => prev + 1)}>Increase</button>;
}
```
**Explanation**
   - The state count lives in the Parent component.
   - Both ChildA and ChildB communicate through the Parent.
   - The parent acts as a single source of truth for that shared data.

## 🔸 Prop Drilling
Prop drilling occurs when you pass data through multiple layers of components that don’t need it directly — just to get it to a deeply nested child.

**Why it’s a problem**
  1. Makes the code harder to maintain.
  2. Components in the middle receive props they don’t use.
  3. Increases coupling and reduces reusability.

**Example**
```js
function App() {
  const user = { name: "Priyanka" };
  return <Level1 user={user} />;
}

function Level1({ user }) {
  return <Level2 user={user} />;
}

function Level2({ user }) {
  return <Level3 user={user} />;
}

function Level3({ user }) {
  return <h3>Hello, {user.name}!</h3>;
}
```
**Explanation**
  - The user prop is passed through Level1 and Level2, even though they don’t use it.
  - This is prop drilling — unnecessary passing of props.

**Comparison Table**
| Feature            | Lifting State Up                           | Prop Drilling                             |
| ------------------ | ------------------------------------------ | ----------------------------------------- |
| **Purpose**        | Share state between components             | Pass data to deeply nested components     |
| **Data Flow**      | From parent to child                       | Through multiple component levels         |
| **Problem Solved** | Synchronization between sibling components | Accessing data deep in the tree           |
| **Drawback**       | Can make the parent component bulky        | Makes components tightly coupled          |
| **Alternative**    | Context API, Redux, Zustand, Recoil        | Context API or state management libraries |

**Best Practices**
  - Use lifting state up when a few components need shared state.
  - Avoid prop drilling by using:
  - React Context API for global state.
  - State management libraries like Redux or Zustand for complex apps.

  **Summary**
  | Concept              | Description                                                                           |
| -------------------- | ------------------------------------------------------------------------------------- |
| **Lifting State Up** | Move shared state to a common ancestor so siblings can access and modify it.          |
| **Prop Drilling**    | Passing props through multiple components unnecessarily just to reach a nested child. |
