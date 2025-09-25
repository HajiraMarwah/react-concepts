# React Hooks

## What are Hooks?

Hooks are special functions introduced in **React 16.8** that let you use **state** and other React features in **functional components**.  

Before Hooks, state and lifecycle methods were only available in **class components**. Hooks make functional components more powerful and easier to work with.

---

## Why use Hooks?

- **Simpler code** – no need for class components.  
- **Reusability** – custom hooks can be shared across multiple components.  
- **Better organization** – separate logic for state, side effects, and other features.  
- **Functional components** can now do everything class components can.

---

## Commonly Used Hooks

### 1️⃣ `useState`

`useState` lets you add **state** to functional components.  

**Syntax:**

```javascript
const [state, setState] = useState(initialValue);
### Explanation

- `state` → Current value of the state variable.  
- `setState` → Function used to update the state.  
- `initialValue` → Initial value of the state (can be number, string, boolean, array, object, etc.).

### Summary

- `useState` allows **functional components to have state**, similar to class components.  
- Calling `setState` **updates the state** and triggers a **re-render** of the component.  
- Always use `setState` to change the state value.  
- Can manage **primitive values, objects, arrays**, and more.  
- Multiple `useState` hooks can exist in **one component**.  
- Supports **lazy initialization** for expensive initial state values.

