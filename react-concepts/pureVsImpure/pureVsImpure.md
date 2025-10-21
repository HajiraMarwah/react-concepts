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