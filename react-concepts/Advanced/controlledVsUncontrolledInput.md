# ⚖️ Controlled vs Uncontrolled Components in React

## 📘 Introduction

In React, **form elements** like `<input>`, `<textarea>`, and `<select>` can be managed in two main ways:

1. **Controlled Components** — React fully controls the input through **state**.  
2. **Uncontrolled Components** — The DOM itself maintains the state, and React accesses it only when needed.

---

## 1 Controlled Components

A **controlled component** is one where the **form data is handled by React state**.  
The input value is set by `state`, and updates occur via `onChange` handlers.

### ✅ Example: Controlled Input

```jsx
import React, { useState } from "react";

const ControlledInput = () => {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Submitted name: ${name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter Name:
        <input type="text" value={name} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ControlledInput;
```
***How It Works***
 - The value of the input is controlled by React through the name state.
 - Every keystroke triggers onChange, which updates the state.
 - The UI always reflects the latest state.

**Characteristics**
| Feature              | Controlled Component                                  |
| -------------------- | ----------------------------------------------------- |
| Data Source          | React state                                           |
| Access Value         | `state` variable                                      |
| Updates Triggered By | `onChange` handler                                    |
| React Control Level  | Full (React drives UI)                                |
| Best Used For        | Dynamic validation, real-time input, controlled forms |

## 2 Uncontrolled Components

An uncontrolled component is one where the form data is handled by the DOM itself,
and you access it only when necessary — often using a ref.

**Example: Uncontrolled Input**
```js
import React, { useRef } from "react";

const UncontrolledInput = () => {
  const nameRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Submitted name: ${nameRef.current.value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter Name:
        <input type="text" ref={nameRef} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledInput;
```
**How It Works**
 - The input’s value is managed by the browser (DOM), not React.
 - You use ref.current.value to access the value when needed (e.g., on submit).
 - No state or re-render happens on each keystroke.

**Characterstics**
| Feature              | Uncontrolled Component                    |
| -------------------- | ----------------------------------------- |
| Data Source          | DOM                                       |
| Access Value         | `ref.current.value`                       |
| Updates Triggered By | DOM events only                           |
| React Control Level  | Minimal (DOM drives UI)                   |
| Best Used For        | Simple forms, performance-sensitive cases |

## Comparison Table
| Feature / Aspect         | Controlled Component                     | Uncontrolled Component           |
| ------------------------ | ---------------------------------------- | -------------------------------- |
| **Data Source**          | React state                              | DOM (via ref)                    |
| **How Value Changes**    | Through `onChange` and `setState`        | Through native DOM behavior      |
| **Real-time Validation** | Easy to implement                        | Harder to manage                 |
| **Performance**          | Slightly slower (more renders)           | Faster (less React overhead)     |
| **Code Complexity**      | More verbose but predictable             | Simpler but less React control   |
| **Access Value**         | From state                               | From `ref.current.value`         |
| **Best Use Case**        | Complex forms, validation, React control | Simple one-time data input forms |

## When to Use Which
| Situation                                | Recommended Approach |
| ---------------------------------------- | -------------------- |
| Real-time validation (e.g., email check) | **Controlled**       |
| One-time form submission                 | **Uncontrolled**     |
| Integration with 3rd-party libraries     | **Uncontrolled**     |
| Consistent React-driven UI               | **Controlled**       |

## Summary
   1. Controlled components give React full control over form data — best for validation and predictable state.
   2. Uncontrolled components let the DOM manage the data — best for quick, simple inputs.
   3. Both can be mixed depending on the form’s complexity and performance needs.

##  In short:

🧩 Controlled = React controls input state
🌿 Uncontrolled = DOM controls input state