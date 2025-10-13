# ⚡ Using TypeScript in React: Typing Props and State

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