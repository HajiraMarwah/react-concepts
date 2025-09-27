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
   useContext is a React Hook that allows you to share state or values between components without passing props manually.
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
```
### 4️⃣ `useRef`
   `useRef` Persist values between renders (like a box that remembers something but        doesn’t trigger re-renders).
   Directly access/manipulate DOM elements (like focusing an input).
  

**Syntax:**

```javascript
const refContainer = useRef(initialValue);

Explation
 -refContainer → an object with a .current property.
 -initialValue → the initial value of .current.

Example
const inputRef = useRef(null);

Common Use Cases
  -Accessing DOM elements (like document.querySelector)
  -Storing values that don’t need re-rendering
  -Tracking previous values

Key Points About useRef
  -.current persists values across renders.
  -Updating .current does not trigger a re-render.
  -Great for DOM manipulation and storing mutable values.
  -Can be used to track previous state.

👉 So, useRef = A box that keeps a value between renders without causing re-renders.
```
### 5️⃣ `useCallback`
   `useCallback` is a React Hook that returns a memoized version of a function.

   -This means the function is recreated only when its dependencies change, not on every render.

   -👉 Useful when you pass functions as props to child components (to prevent unnecessary re-renders).

**Syntax:**

```javascript
const memoizedCallback = useCallback(
  () => {
    // function logic
  },
  [dependencies]
);


Explanation
 -memoizedCallback → cached version of the function.
 -[dependencies] → function is recreated only if these values change.

Why use useCallback?
 -Without useCallback, functions are recreated on every render.
This can cause:
 -Performance issues in large apps.
 -Unnecessary re-renders in child components (if they are wrapped with React.memo).


Key Points About useCallback
  -Prevents unnecessary re-creations of functions.
  -Useful with React.memo child components.
  -Helps with performance optimization in large apps.
  -If dependencies array is empty [], the function is created once and reused.
  -If dependencies change, a new function is created.

👉 In short: useCallback is for memoizing functions, just like useMemo is for memoizing values.

```
### 6️⃣ `useMemo`
   `useMemo` is a React Hook that memoizes the result of a calculation.
     It caches the value and recomputes it only when its dependencies change.

   👉 Don’t recalculate this expensive computation unless you really have to!”

**Syntax:**

```javascript
const memoizedValue = useMemo(() => {
  // expensive calculation
  return result;
}, [dependencies]);



Explanation
  -memoizedValue → cached result.
  -[dependencies] → if values inside change → recalculate. Otherwise → return cached result.

Why use useMemo?
 -Prevents expensive recalculations (e.g., loops, filtering, sorting, heavy math).
 -Improves performance in large apps.
 -Works best when combined with pure functions (functions without side effects).


Key Points About useMemo
   -Caches results of expensive calculations.
   -Runs only when dependencies change.
   -Great for filtering, sorting, or heavy loops.
   -Use with care → don’t use useMemo everywhere, only when performance is a real concern.
   -If dependencies array is empty [], it runs only once.


```

### 7️⃣ `useReducer`
   `useReducer` is an alternative to useState for managing complex state logic.

   -Useful when state transitions depend on multiple conditions or when you want cleaner state management.

   -Similar to Redux (but built into React).

   👉 Think of it as:
“Instead of juggling multiple useStates, let’s have one place (a reducer) that decides how state changes.”

**Syntax:**

```javascript
const [state, dispatch] = useReducer(reducer, initialState);

function reducer(state, action) {
  switch (action.type) {
    case "ACTION_NAME":
      return { ...state, updatedValue: action.payload };
    default:
      return state;
  }
}


Explanation
  -state → current state.
  -dispatch → function used to send actions to the reducer.
  -reducer → function that updates state based on action.
  -initialState → starting state.

Why use useReducer?
   -When state is complex (e.g., multiple values, nested objects).
   -When state transitions depend on different actions.
   -When you want predictable and organized state updates.

Reducer Pattern Advantages
   -Centralized logic → state updates are in one place.
   -Easy to test and debug (just test reducer function).
   -Predictable state flow (similar to Redux).
   -Great for medium/large apps with complex state.

Key Points About useReducer
   1.Best for complex state logic.
   2.Provides a centralized way to update state using actions.
   3.dispatch does not change state immediately; it schedules a state update.
   4.State updates are predictable, because the reducer always returns a new state.
   5.Returns [state, dispatch] instead of [value, setter].
   6.Similar to Redux but built-in and simpler.
   7.Helps avoid prop drilling when combined with useContext.
   8.Great for managing forms, counters, UI states.
   9.Prefer useState for simple state, useReducer for complex state.


```

