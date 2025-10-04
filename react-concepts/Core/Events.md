# 🧠 React Events and Event Handling

## 🎯 What is an Event?

An **event** is an action that occurs as a result of user interaction or system behavior — for example:
- Clicking a button
- Typing in an input box
- Submitting a form
- Hovering over an element

In React, events are similar to those in HTML but follow **camelCase naming** and use **functions** instead of strings.

---

## ⚙️ Event Handling in React

Event handling in React means defining **functions (handlers)** that execute when an event occurs.

### ✅ Example: Handling a Button Click

```jsx
import React from "react";

function ClickExample() {
  function handleClick() {
    alert("Button was clicked!");
  }

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default ClickExample;
```
**Explanation:**
 - onClick → React’s event attribute (uses camelCase)
 - handleClick → Event handler function
 - When the button is clicked, handleClick() executes

 ## Event Handling with Parameters
  You can pass parameters to event handlers using arrow functions.
  ```js
  function Greeting() {
  function sayHello(name) {
    alert(`Hello, ${name}!`);
  }

  return (
    <button onClick={() => sayHello("Priyanka")}>Greet</button>
  );
}

export default Greeting;
```
**Explanation:**
  Wrapping the function inside () => sayHello("Priyanka") ensures it runs only when clicked.

## What are Synthetic Events?
 React uses a SyntheticEvent wrapper around the browser’s native event system.

  - It works the same across all browsers.
  - It normalizes the event object for consistent behavior.

Synthetic events are part of React’s event delegation system, improving performance.

**Example: Using a Synthetic Event**
```js
function InputLogger() {
  function handleChange(event) {
    console.log("Value:", event.target.value);
    console.log("Event Type:", event.type);
  }

  return (
    <input
      type="text"
      placeholder="Type something..."
      onChange={handleChange}
    />
  );
}

export default InputLogger;
```

**Explanation:**
  1. event is a SyntheticEvent object.
  2. You can access properties like:
     - event.target.value → Current input value
     - event.type → Type of event (e.g., "change")
  3. React reuses these synthetic events for performance optimization.

**Example: Form Event Handling**
```js
import React, { useState } from "react";

function FormExample() {
  const [name, setName] = useState("");

  function handleSubmit(event) {
    event.preventDefault(); // Prevents page reload
    alert(`Submitted Name: ${name}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <button type="submit">Submit</button>
    </form>
      );
   }
export default FormExample;
```
### Key Differences Between HTML and React Events

| Feature          | HTML                       | React                              |
| ---------------- | -------------------------- | ---------------------------------- |
| **Event Name**       | lowercase (`onclick`)      | camelCase (`onClick`)              |
| **Handler Type**     | String (`"doSomething()"`) | Function (`{doSomething}`)         |
| **Default Behavior** | Happens automatically      | Must call `event.preventDefault()` |
| **Event Object**     | Native DOM event           | SyntheticEvent                     |

---

### 🔹 Summary
| Concept            | Description                                                 |
| ------------------ | ----------------------------------------------------------- |
| **Event**          | User action or system trigger (e.g., click, input, submit). |
| **Event Handling** | Defining functions that respond to events.                  |
| **SyntheticEvent** | React’s cross-browser wrapper around native events.         |

### Remember:
  1. Always use camelCase (e.g., onClick, onChange)
  2. Pass handler functions, not function calls
  3. Use event.preventDefault() to stop default browser behavior