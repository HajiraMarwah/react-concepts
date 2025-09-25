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

Explanation

- `state` → Current value of the state variable.  
- `setState` → Function used to update the state.  
- `initialValue` → Initial value of the state (can be number, string, boolean, array, object, etc.).

Summary

- `useState` allows **functional components to have state**, similar to class components.  
- Calling `setState` **updates the state** and triggers a **re-render** of the component.  
- Always use `setState` to change the state value.  
- Can manage **primitive values, objects, arrays**, and more.  
- Multiple `useState` hooks can exist in **one component**.  
- Supports **lazy initialization** for expensive initial state values. 
```

### 2️⃣ `useEffect`

`useEffect` is used to perform **side effects** in functional components, such as API calls, timers, and subscriptions.  

**Side effects include:**  
1. Fetching data from an API  
2. Updating the DOM manually  
3. Setting up timers or intervals  
4. Subscribing to events  

Before Hooks, you needed **lifecycle methods** in class components (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`) to handle side effects. `useEffect` replaces all of these in functional components.

**Syntax:**

```javascript
useEffect(() => {
  // effect code

  return () => {
    // cleanup code (optional)
  };
}, [dependencies]);

Key Points
- **Runs after render → DOM is already updated.  
- **Dependencies array controls when it runs:  
  - `[]` → runs **once** on mount  
  - `[state]` → runs **on state change**  
  - No array → runs **after every render**  
- **Cleanup function** → used for intervals, subscriptions, or any manual DOM cleanup.  
- Can replace all **class component lifecycle methods**.
```
### 3️⃣ `useContext`
   `useContext` lets you **consume context values** in functional components without using `<Context.Consumer>`.
   Instead of passing props through multiple levels (prop drilling), useContext lets you access the context value directly wherever you need it.
   
   **All in one block (Syntax, Explanation, Summary):**

**Syntax:**

```javascript
const value = useContext(MyContext);

How To Use
   -Create a context using→ React.createContext(defaultValue)
   -Provide a  context value in parent component → <Context.Provider value={...}>
   -Consume the context value in any child component using useContext → const value = useContext(Context)

Explanation
   -MyContext → The context object created via React.createContext()
   -value → The current value of the context (provided by the nearest <MyContext.Provider>)

 Summary
- useContext allows functional components to access context values directly
- Eliminates the need for nested <Context.Consumer> components
- Makes code cleaner and easier to read
- Re-renders the component when the context value changes
- Ideal for sharing global data like themes, auth status, or settings

