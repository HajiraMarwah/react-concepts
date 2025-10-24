# 🌀 React Portals (`createPortal`)

## 📘 What are Portals?

In React, **Portals** provide a way to render children **into a DOM node that exists outside the hierarchy of the parent component**.

Normally, components render into their parent’s DOM tree.  
However, **Portals let you “teleport”** a component’s JSX to another part of the DOM — while keeping it fully part of the same React tree (state, context, and events still work as usual).

---

## 🧱 Syntax

```jsx
import { createPortal } from "react-dom";

createPortal(child, container);
```
**Explanation**
  - child → The React node you want to render (e.g., `<div>`, `<Modal />`)
  - container → The target DOM element (e.g., document.getElementById('root-modal'))

**Why Use Portals?**
  1. To render UI outside parent hierarchy (useful for modals, tooltips, popovers)
  2. To avoid z-index or overflow issues
  3. To ensure consistent positioning (like sticky overlays)
  4. To keep event bubbling inside React tree

## Example: Creating a Modal Using createPortal
**1️⃣ Example Usage**
```jsx
import React, { useState } from "react";
import Modal from "./Modal";

const App = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <h1>React Portal Example</h1>
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default App;
```
**2️⃣ Modal Component Using createPortal**
```jsx
// Modal.jsx
import React from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal-root");

const Modal = ({ onClose }) => {
  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Hello from a Portal!</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
```
**3️⃣ HTML Setup**
```jsx
<body>
  <div id="root"></div>
  <div id="modal-root"></div>
</body>
```
## How It Works
 1. Even though the modal’s DOM is rendered outside the main #root,
it still:
  - Re-renders when React state changes
  - Has access to React context
  - Participates in event bubbling (e.g., onClick, onKeyDown)

## Summary
| Concept              | Description                                                        |
| -------------------- | ------------------------------------------------------------------ |
| **Definition**       | Render React elements into a DOM node outside the parent hierarchy |
| **API**              | `createPortal(child, container)`                                   |
| **Common Use Cases** | Modals, Tooltips, Popovers, Context Menus                          |
| **React Context**    | Still works inside portals                                         |
| **Event Bubbling**   | Events bubble up through React tree, not the DOM tree              |
---
## In short:

React Portals let you render components “outside” the DOM tree — but keep them “inside” the React tree.