# Controlled vs Uncontrolled Components in React

In React, **form inputs** can be handled in two ways:  
- **Controlled Components** → React controls the form data.  
- **Uncontrolled Components** → DOM (HTML) manages the form data.  

---
## 1. Controlled Component
A Controlled Component is a form input element (like `<input>`, `<textarea>`, `<select>`) whose value is controlled by React state.
   - React is the single source of truth.
   - Any change in input value is handled through state updates (useState or setState).

📌 Example: An <input> where the value is tied to a React state variable.
 **Example: Controlled Component**

```jsx
import React, { useState } from "react";

function ControlledInput() {
  const [name, setName] = useState("");

  return (
    <div>
      <h3>Controlled Component</h3>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <p>Value: {name}</p>
    </div>
  );
}

export default ControlledInput;
```
  - React controls the input value using useState.
  - Every keystroke updates React state → React re-renders with new value.

## 2.Uncontrolled Component
An Uncontrolled Component is a form input element whose value is controlled by the DOM itself, not by React.
  - React does not manage the input’s value.
  - You usually use a ref to read the value when needed.
📌 Example: An <input> where you use defaultValue and later read the value with ref.
**Example: Uncontrolled Component**
```js
import React, { useRef } from "react";

function UncontrolledInput() {
  const inputRef = useRef();

  const handleSubmit = () => {
    alert("Input Value: " + inputRef.current.value);
  };

  return (
    <div>
      <h3>Uncontrolled Component</h3>
      <input type="text" ref={inputRef} defaultValue="Hello" />
      <button onClick={handleSubmit}>Show Value</button>
    </div>
  );
}

export default UncontrolledInput;
```
- Input value is managed by the DOM (not React state).
- We use ref to access the current value when needed.

## Key Takeaway
 1. Use Controlled Components when you need full control and synchronization of data with React state.
 2. Use Uncontrolled Components when you need quick forms and don’t require React to manage every keystroke.

## Comparison Table

| Feature              | Controlled Component                          | Uncontrolled Component                  |
| -------------------- | --------------------------------------------- | --------------------------------------- |
| **Definition**       | Form data is handled by React state           | Form data is handled by the DOM itself  |
| **Data Source**      | React state (`useState`)                      | DOM element (`ref`)                     |
| **Value Control**    | Value is passed via `value` prop              | Value is read using `ref` or `defaultValue` |
| **Updates**          | Requires `onChange` handler to update state   | Value can be read only when needed      |
| **Predictability**   | More predictable and easier to test           | Less predictable (since DOM manages it) |
| **When to Use**      | Recommended in most cases for better control  | When quick and simple form handling is needed |

---
