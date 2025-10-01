# React Props vs State

In React, **Props** and **State** are two important concepts that help manage data and make components interactive.

---

## 1. Props (Properties)

**Props** are **read-only** data that are passed from a **parent component to a child component**.  
They allow components to be **dynamic and reusable**.

**Key Points:**
- Passed from parent to child.
- Cannot be changed by the child component.
- Used to render dynamic content.

**Example:**

```jsx
import React from 'react';

function ChildComponent(props) {
  return <h2>Hello, {props.name}!</h2>;
}

function ParentComponent() {
  return <ChildComponent name="Priyanka" />;
}

export default ParentComponent;
```
**Explanation:**
  1. ParentComponent passes name="Priyanka" as a prop.
  2. ChildComponent receives it via props and renders it.
  3. Child cannot change the value of props.

## 2. State
   **State** is local data that belongs to a component.
    It is **mutable** and can change over time, usually in response to user actions or events.
 **Key Points:**
  - Managed within the component.
  - Can be updated using this.setState in class components or useState hook in functional components.
  - Changes in state trigger re-rendering of the component.
   ```jsx
   import React, { useState } from 'react';
    function Counter() {
     const [count, setCount] = useState(0);
      return (
     <div>
       <h1>Count: {count}</h1>
       <button onClick={() => setCount(count + 1)}>Increment</button>
     </div>
       );
      }

     export default Counter;
  ```
 **Explation**
  - count is a state variable.
  - setCount updates the state.
  - Clicking the button increases count and re-renders the component.
 ## 3. Differences between Props and State

| Feature        | Props                                     | State                                         |
| -------------- | ----------------------------------------- | --------------------------------------------- |
| **Definition** | Data passed from parent to child          | Data managed within the component             |
| **Mutability** | Read-only                                 | Mutable                                       |
| **Usage**      | To pass data and make components reusable | To store and update dynamic data              |
| **Updating**   | Cannot be updated by the component itself | Can be updated using `setState` or `useState` |
| **Trigger Render** | Changing props re-renders child       | Changing state re-renders component           |
| **Scope**      | Accessible in child component             | Local to the component                        |
---
 **Summary**
  1. Props: Immutable, passed from parent to child, used for reusable components.
  2. State: Mutable, managed inside the component, used for interactive behavior.


