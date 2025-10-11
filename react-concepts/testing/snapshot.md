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

## Subsequent Runs
  - Jest compares the new render with the stored snapshot.
  - If they differ, the test fails, signaling that the component’s output changed.

## Updating Snapshots

If the change in the component is intentional, you can update the snapshot using:
```bash
npm test -- -u
```
or 
```bash
jest -u
```
This updates the stored snapshot to match the new output.
## When to Use Snapshot Tests
| ✅ Good For                      | ❌ Avoid For                                 |
| ------------------------------- | ------------------------------------------- |
| Simple, stable UI components    | Rapidly changing UIs                        |
| Detecting unexpected UI changes | Complex or dynamic DOM trees                |
| Regression testing              | Components with random or time-based output |

## Best Practices
 - Keep snapshots small and meaningful.
 - Review snapshot diffs carefully before updating.
 - Don’t overuse — rely on functional tests for behavior.

## Summary
| Concept               | Description                                   |
| --------------------- | --------------------------------------------- |
| **Snapshot**          | Stored representation of a rendered component |
| **Purpose**           | Detect unintended changes in UI               |
| **Tool**              | Jest                                          |
| **Command to Update** | `npm test -- -u`                              |
| **Good For**          | Static, predictable UI components             |

## In short:
Snapshot testing ensures your React components’ UI stays consistent over time and helps catch accidental visual regressions.