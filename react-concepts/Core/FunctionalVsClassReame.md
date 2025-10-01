# React Components: Functional vs Class

In React, components are the building blocks of the UI. There are two main types of components:

1. **Class Components**
2. **Functional Components**

---

## 1. Class Components

Class components are ES6 classes that extend `React.Component`. They can have **state** and **lifecycle methods**.

**Example:**

```jsx
import React, { Component } from 'react';

class Greeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Priyanka'
    };
  }

  changeName = () => {
    this.setState({ name: 'Hajira' });
  }

  render() {
    return (
      <div>
        <h1>Hello, {this.state.name}!</h1>
        <button onClick={this.changeName}>Change Name</button>
      </div>
    );
  }
}

export default Greeting;
```
***Features:***
  - Uses this.state for state.
  - Can use lifecycle methods like componentDidMount, componentDidUpdate.
  - Access props via this.props.
  - Requires a render() method to return JSX.

## 2. Functional Components

Functional components are simple functions that return JSX. With React Hooks, they can also have state and lifecycle behavior.

```js
import React, { useState } from 'react';

function Greeting() {
  const [name, setName] = useState('Priyanka');

  const changeName = () => {
    setName('Hajira');
  }

  return (
    <div>
      <h1>Hello, {name}!</h1>
      <button onClick={changeName}>Change Name</button>
    </div>
  );
}

export default Greeting;
```
***Features:***
 - Simpler syntax.
 - Uses useState, useEffect, and other hooks for state and side effects.
 - No this keyword required.
 - Recommended in modern React development.