# 🧩 Compound Component Pattern in React

## 📘 What is the Compound Component Pattern?

The **Compound Component Pattern** is a React design pattern used to create **flexible and cohesive component groups** that work together seamlessly.

It allows you to design a **parent component** that controls shared state and **child components** that can communicate implicitly through React’s **context** or **props**, without prop-drilling.

In short, it’s a way to let components work as a **family** rather than passing down a lot of props manually.

---

## 💡 Why Use It?

✅ Makes components more **reusable and flexible**  
✅ Avoids **prop drilling** between deeply nested components  
✅ Keeps the API **clean and declarative**  
✅ Helps build components that feel **natural to use**, like `<Select>` with `<Option>` or `<Accordion>` with `<Item>`

---

## 🧱 Example: Accordion using Compound Components

### 1️⃣ Example Usage

```jsx
<Accordion>
  <Accordion.Item title="Section 1">
    <p>This is the content of section 1</p>
  </Accordion.Item>
  <Accordion.Item title="Section 2">
    <p>This is the content of section 2</p>
  </Accordion.Item>
</Accordion>
```
**2️⃣ Implementation**
```js
// Accordion.jsx
import React, { useState, createContext, useContext } from "react";

const AccordionContext = createContext();

export const Accordion = ({ children }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <AccordionContext.Provider value={{ openIndex, toggle }}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
};

const Item = ({ title, children, index }) => {
  const { openIndex, toggle } = useContext(AccordionContext);
  const isOpen = openIndex === index;

  return (
    <div className="accordion-item">
      <h3 onClick={() => toggle(index)} style={{ cursor: "pointer" }}>
        {title}
      </h3>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

Accordion.Item = ({ title, children }) => {
  const { openIndex, toggle } = useContext(AccordionContext);
  const index = React.Children.count(children);
  return (
    <Item title={title} index={index}>
      {children}
    </Item>
  );
};
```
## How It Works
  1. The parent (Accordion) holds the shared state (openIndex).
  2. Child components (Accordion.Item) use React Context to access and manipulate that shared state.
  3. There’s no need to pass props manually to every child — they “know” about each other via context.

## Summary Table
| Concept              | Description                                                               |
| -------------------- | ------------------------------------------------------------------------- |
| **Parent Component** | Holds the shared logic or state (e.g., `Accordion`)                       |
| **Child Components** | Access shared data through context (e.g., `Accordion.Item`)               |
| **Communication**    | Implicit via React Context — no prop drilling                             |
| **Usage**            | Groups components that work together naturally (like `Tabs`, `Dropdowns`) |

---
## Real-World Examples

<Tabs> → <Tabs.List>, <Tabs.Panel>

<Select> → <Select.Option>

<Modal> → <Modal.Header>, <Modal.Body>, <Modal.Footer>

<Accordion> → <Accordion.Item>