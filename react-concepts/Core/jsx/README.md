# JSX in React

## What is JSX?

JSX stands for **JavaScript XML**. It is a syntax extension for JavaScript used in React to describe what the UI should look like. JSX allows you to write HTML-like code directly in JavaScript, making it easier to create and visualize React components.

JSX is **not a string** or HTML. Behind the scenes, React transforms JSX into JavaScript function calls (`React.createElement`) which create React elements.

---

## Key Features of JSX

1. **HTML-like syntax** – Makes writing UI more intuitive.
2. **Embedding JavaScript** – You can embed JS expressions inside JSX using `{}`.
3. **Attributes** – JSX uses `camelCase` for attributes instead of HTML attribute names (e.g., `className` instead of `class`).
4. **Components** – JSX works seamlessly with React components to render dynamic content.

---

## JSX Example

### Functional Component with JSX

```javascript
import React from 'react';

function Greeting(props) {
  const name = props.name;

  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Welcome to learning React with JSX.</p>
    </div>
  );
}

export default Greeting;
```
**Usage**
```js
import React from 'react';
import ReactDOM from 'react-dom';
import Greeting from './Greeting';

ReactDOM.render(
  <Greeting name="Priyanka" />,
  document.getElementById('root')
);
```
***Explanation**
 - <div>, <h1>, and <p> look like HTML but are JSX elements.
 - {name} inside JSX allows embedding JavaScript expressions.
 - Greeting is a React component that returns JSX.

 ## Embedding JavaScript in JSX-You can use any valid JavaScript expression inside {}:
 ```js
 function MathExample() {
  const a = 5;
  const b = 10;

  return (
    <div>
      <p>The sum of {a} and {b} is {a + b}</p>
    </div>
  );
}
```
## Conditional Rendering in JSX
```js
function UserStatus({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <p>Welcome back!</p> : <p>Please log in.</p>}
    </div>
  );
}
```
## Advantages of JSX
  - Makes React code more readable.
  - Simplifies component structure.
  - Allows embedding logic directly in the UI.
  - Enables better tooling and syntax highlighting.
## Notes
  - JSX must return a single parent element. Use a <div> or <>...</> (fragment) if necessary.
  - Always use className instead of class, and htmlFor instead of for in JSX.