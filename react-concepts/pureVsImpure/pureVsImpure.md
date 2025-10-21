# 🧠 Pure vs Impure Functions in React

In React (and JavaScript in general), functions can be **pure** or **impure** depending on whether they **affect or depend on external state**.

---

## ✅ Pure Functions

A **pure function** is a function that:
1. **Always returns the same output** for the same input.
2. **Does not cause side effects** (it doesn’t modify anything outside its scope).

### 💡 Example:
```javascript
function add(a, b) {
  return a + b;
}
```
**Pure because:**
  - The output depends only on a and b.
  - It doesn’t modify any external variables or data.

## React Example:
```js
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```
**This React component is pure because:**
  - The rendered output depends only on its props.
  - It doesn’t modify global variables or state directly.

## Impure Functions
**An impure function:**
 - May return different outputs for the same inputs.
 - Causes side effects, like changing global variables, making API calls, or modifying the DOM.
**Example:**
```js
let counter = 0;

function increment() {
  counter += 1;
  return counter;
}
```
**Impure because:**
  - It modifies an external variable (counter).
  - The same input (none) can yield different outputs.

## React Example:
```js
function Greeting({ name }) {
  console.log("Rendered at:", new Date());
  return <h1>Hello, {name}!</h1>;
}
```
**Impure because:**
  - It logs time every render (a side effect).
  - Output depends on something external (the current time).

## Why React Prefers Pure Functions
    React components (especially functional components) are designed to be pure:
       - React can easily optimize rendering.
       - Pure components make debugging easier.
       - They help React’s reconciliation process (diffing the virtual DOM).
