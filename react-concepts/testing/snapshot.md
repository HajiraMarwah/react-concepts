# Snapshot Testing in React

**Snapshot testing** is a way to ensure that a component’s rendered output does not change unexpectedly. It captures (“snapshots”) the rendered structure of a React component and compares it to a stored reference snapshot during future test runs.

---

## 🔍 What Is Snapshot Testing?

When a component is rendered, Jest (with React Testing Library or Enzyme) takes a **snapshot** of the output (the virtual DOM).  
If the component’s output changes later, Jest will detect the difference and alert you — helping catch unintended UI changes.

---

## 🧰 Tools Used

- **Jest** – Testing framework that supports snapshot testing.
- **React Testing Library (RTL)** – For rendering React components in tests.

---

## 🧪 Example: Snapshot Test with Jest

```javascript
// MyButton.js
import React from "react";

export const MyButton = ({ label }) => {
  return <button>{label}</button>;
};
```
```js
// MyButton.test.js
import React from "react";
import renderer from "react-test-renderer";
import { MyButton } from "./MyButton";

test("MyButton renders correctly", () => {
  const tree = renderer.create(<MyButton label="Click Me" />).toJSON();
  expect(tree).toMatchSnapshot();
});
```
## First Run
 - Jest creates a new snapshot file under __snapshots__/MyButton.test.js.snap.
 - The snapshot contains the serialized output (like HTML structure).

```js
// Example snapshot
   exports[`MyButton renders correctly 1`] = `
    <button>
    Click Me
    </button>
   `;
```