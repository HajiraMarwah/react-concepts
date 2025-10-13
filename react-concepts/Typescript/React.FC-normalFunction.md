# ⚡ React.FC vs Normal Function Component

In React, components can be written as **function components**.  
TypeScript provides a special type called `React.FC` (or `React.FunctionComponent`) to type them.

Let's compare **React.FC** and normal function components.

---

## 1️⃣ Normal Function Component

```tsx
interface GreetingProps {
  name: string;
  age?: number;
}

function Greeting({ name, age }: GreetingProps) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      {age && <p>Age: {age}</p>}
    </div>
  );
}
```
 1. Props are typed explicitly in the function parameters.
 2. You return JSX.
 3. No extra type helpers are required.

## 2️⃣ Using React.FC
```tsx
interface GreetingProps {
  name: string;
  age?: number;
}

const Greeting: React.FC<GreetingProps> = ({ name, age }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      {age && <p>Age: {age}</p>}
    </div>
  );
};
```
## Key Features of React.FC
   - Automatically types the children prop.
      ```tsx
        const Card: React.FC<{ title: string }> = ({ title, children }) => (
       <div>
       <h2>{title}</h2>
       {children} {/* children automatically typed */}
      </div>
      );
      ```
   - Provides return type checking: ensures you return JSX.Element or null.
   - You can still define optional props with ?.

## 3️⃣ Differences Between Normal Function and React.FC
| Feature         | Normal Function                                   | React.FC                                                  |       |
| --------------- | ------------------------------------------------- | --------------------------------------------------------- | ----- |
| `children` prop | Must type manually (`children?: React.ReactNode`) | Automatically included                                    |       |
| Return type     | Can be inferred or specified                      | Inferred as `ReactElement                                 | null` |
| Generic props   | Works                                             | Works                                                     |       |
| Popularity      | More recommended in modern React                  | Less recommended (official docs suggest normal functions) |       |
| Default Props   | Requires manual handling                          | Can use `defaultProps` (but discouraged in TypeScript)    |       |


## 4️⃣ Pros and Cons

### Using `React.FC`

**Pros**
- Automatically types `children`.
- Enforces return type (`JSX.Element | null`).
- Can make code more explicit.

**Cons**
- Forces `children` even if you don’t need them.
- `defaultProps` typing may be tricky in TypeScript.
-  Slightly less flexible than normal function components.

### Using Normal Function Component

**Pros**
- Simpler and more flexible.
- Recommended by React team.
- Easier to define props and handle default props.

**Cons**
-  Need to type `children` manually if used.

## 5️⃣ Recommended Usage
   - Use normal function components for most cases.
   - Use React.FC if you want automatic children typing or prefer explicit return type enforcement.
   - Avoid relying on defaultProps in TypeScript; prefer default parameters instead:
```tsx
interface GreetingProps {
  name: string;
  age?: number;
}

function Greeting({ name, age = 18 }: GreetingProps) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Age: {age}</p>
    </div>
  );
}
```