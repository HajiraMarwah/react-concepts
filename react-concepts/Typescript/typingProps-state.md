#  Using TypeScript in React: Typing Props and State

TypeScript is a superset of JavaScript that adds **static typing**.  
In React, using TypeScript helps:

- Catch bugs at compile-time.
- Make components self-documenting.
- Improve code readability and maintainability.

---

## 1️⃣ Typing Props in React Components

Props are inputs passed to React components.  
In TypeScript, you can define a **props interface** and pass it to your component.

### Example: Functional Component

```tsx
import React from "react";

// Define props interface
interface GreetingProps {
  name: string;
  age?: number; // optional prop
}

const Greeting: React.FC<GreetingProps> = ({ name, age }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      {age && <p>Age: {age}</p>}
    </div>
  );
};

// Usage
<Greeting name="Alice" />         // ✅ valid
<Greeting name="Bob" age={25} />  // ✅ valid
```
**Key Points**
  - Use interface or type to define props shape.
  - ? indicates an optional prop.
  - React.FC<Props> or React.FunctionComponent<Props> can be used for functional components.

## Example: Props in Class Component
```tsx
import React, { Component } from "react";

interface CounterProps {
  initialCount?: number;
}

interface CounterState {
  count: number;
}

class Counter extends Component<CounterProps, CounterState> {
  constructor(props: CounterProps) {
    super(props);
    this.state = { count: props.initialCount || 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <h2>Count: {this.state.count}</h2>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

// Usage
 <Counter initialCount={10} />
```
## 2️⃣ Typing State in Functional Components with useState

The useState hook can also be typed explicitly.
```tsx
import React, { useState } from "react";
const Counter: React.FC = () => {
  // Type inferred from initial value
  const [count, setCount] = useState(0); // number

  // Explicit type
  const [name, setName] = useState<string>(""); // string

  // Array or object
  const [items, setItems] = useState<string[]>([]); // array of strings

  return (
    <div>
      <p>Count: {count}</p>
      <p>Name: {name}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setName("Alice")}>Set Name</button>
    </div>
    );
};
```
**Key Points**
 - Type can be inferred from the initial state.
 - For complex objects or arrays, explicitly define the type:
     ```ts
      interface User { id: number; name: string }
      const [users, setUsers] = useState<User[]>([]);
      ```

## 3️⃣ Typing Event Handlers
```tsx
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  console.log("Button clicked", event);
};

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log("Input changed", event.target.value);
};
```
**Key Points**
  - Use React.MouseEvent for button clicks or other mouse events.
  - Use React.ChangeEvent<HTMLInputElement> for input changes.

## 4️⃣ Typing Children Props

React components often receive children.
You can type them explicitly:
```tsx
interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
};

// Usage
<Card title="Hello">
  <p>This is card content</p>
</Card>
```
## 5️⃣ Summary Table: Props & State Typing
| Concept               | TypeScript Approach                     | Example                                         |
| --------------------- | --------------------------------------- | ----------------------------------------------- |
| Props (required)      | Interface                               | `interface Props { name: string }`              |
| Props (optional)      | `?`                                     | `age?: number`                                  |
| Functional State      | `useState<Type>()`                      | `const [count, setCount] = useState<number>(0)` |
| Class Component State | `class Component<Props, State>`         | `Component<CounterProps, CounterState>`         |
| Children              | `React.ReactNode`                       | `children: React.ReactNode`                     |
| Event Handlers        | `React.MouseEvent`, `React.ChangeEvent` | `<button onClick={handleClick}>`                |

## Best Practices
 - Always define props interfaces for clarity.
 - Type state explicitly for complex objects/arrays.
 - Use React.FC for functional components to get default children typing.
 - Type event handlers to avoid runtime errors.
 - Prefer optional props for non-mandatory data.
