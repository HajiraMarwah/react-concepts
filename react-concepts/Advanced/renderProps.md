# Render Props Pattern in React

The **Render Props** pattern is a technique for **sharing code between React components** using a **prop whose value is a function**.  
It allows a component to **control what to render**, while another component provides the **data or behavior**.

---

## 🧩 Concept

- A **render prop** is a **function prop** that a component uses to know **what to render**.  
- Signature:

```jsx
<SomeComponent render={(data) => <UI data={data} />} />
```
**Purpose:**
  - Share logic between components without inheritance.
  - Keep components reusable and composable.

## Example: Mouse Tracker
  Suppose we want to track the mouse position and let other components decide how to render it.

**1. Component with Logic**
```js
import React, { Component } from "react";

class MouseTracker extends Component {
  state = { x: 0, y: 0 };

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  };

  render() {
    return (
      <div style={{ height: "100vh" }} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

export default MouseTracker;
```
**2. Using Render Prop to Control UI**
```jsx
import React from "react";
import MouseTracker from "./MouseTracker";

function App() {
  return (
    <div>
      <h1>Move your mouse!</h1>
      <MouseTracker
        render={({ x, y }) => (
          <p>The mouse position is ({x}, {y})</p>
        )}
      />
    </div>
  );
}

export default App;
```
## Explanation
| Concept           | Description                                                   |
| ----------------- | ------------------------------------------------------------- |
| **MouseTracker**  | Component that contains the **shared logic** (mouse movement) |
| **render prop**   | A **function passed as a prop** that determines how to render |
| **App component** | Decides how to display the data returned by `MouseTracker`    |

## Key Points:
  - Render props give flexibility for rendering UI.
  - Unlike HOCs, render props do not wrap components but delegate rendering.
  - Can be used with functional components using children as a function:
  ```jsx
    <MouseTracker>
    {({ x, y }) => <p>Mouse at ({x}, {y})</p>}
   </MouseTracker>
   ```
## Benefits
 - Reusable logic without inheritance.
 - Flexible UI rendering.
 - Can combine multiple render props for complex behavior.