# ⚡ Typing React Hooks in TypeScript: useState & useReducer

Using TypeScript with React hooks ensures **type safety** and helps prevent runtime errors.  
This guide explains **how to type `useState` and `useReducer`** in functional components.

---

## 1️⃣ Typing `useState`

The `useState` hook can be typed **implicitly** or **explicitly**.

### Example 1: Implicit Typing

TypeScript infers the type from the initial state:

```tsx
import React, { useState } from "react";

const Counter: React.FC = () => {
  const [count, setCount] = useState(0); // inferred as number

  return (
     <div>
     <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```
**Example 2: Explicit Typing**
Use explicit type when initial state is null or complex:
```tsx
import React, { useState } from "react";

interface User {
  id: number;
  name: string;
}

// Explicit type
const [user, setUser] = useState<User | null>(null);

// Updating state
setUser({ id: 1, name: "Alice" });
```
**Example 3: Arrays or Objects**
```tsx
const [numbers, setNumbers] = useState<number[]>([]); // array of numbers
const [settings, setSettings] = useState<{ darkMode: boolean }>({ darkMode: false });
```
**Key Points:**
  - If initial value is null, always type explicitly (useState<Type | null>).
  - TypeScript can infer primitive types automatically.

## 2️⃣ Typing useReducer

useReducer is useful for complex state logic.
It accepts a reducer function and an initial state.

**Example: Counter Reducer**
```tsx
import React, { useReducer } from "react";

// Define state type
interface CounterState {
  count: number;
}

// Define action types
type CounterAction = { type: "increment" } | { type: "decrement" } | { type: "reset" };

// Reducer function
const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
};

// Component
const Counter: React.FC = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
};
```
**Key Points**
 - Always define state and action types.
 - The reducer function return type should match the state type.
 - useReducer is more scalable than useState for complex state objects

## 3️⃣ Generic useReducer Example

You can make a generic reducer:
```tsx
interface State<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

type Action<T> =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: T }
  | { type: "FETCH_ERROR"; payload: string };

function dataReducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { data: action.payload, loading: false, error: null };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
```
This approach is type-safe and works for any kind of data.
## 4️⃣ Summary Table: useState vs useReducer
| Hook         | Use Case                                | Typing Approach                 | Notes                                     |
| ------------ | --------------------------------------- | ------------------------------- | ----------------------------------------- |
| `useState`   | Simple state (primitive, object, array) | `useState<Type>(initial)`       | Type inferred if initial value is present |
| `useReducer` | Complex or multiple related states      | Define `State` & `Action` types | Scalable for big state logic              |

## Best Practices
 - Always type your state and actions.
 - Use useState<Type | null> when initial value is null.
 - Prefer useReducer for complex state updates.
 - Avoid any; use generics if needed.
 - Keep reducer pure and typed for better maintainability.