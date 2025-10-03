# React Lifecycle Methods

In React (Class Components), lifecycle methods are special methods that are automatically called at different stages of a component’s existence.

A React component has **three main phases**:

1. **Mounting** → Component is created and inserted into the DOM.  
2. **Updating** → Component is re-rendered when props or state change.  
3. **Unmounting** → Component is removed from the DOM.  

---

## 1. Mounting Phase
These methods are called when the component is first created and added to the DOM.

- `constructor()` → Initializes state and binds methods.  
- `static getDerivedStateFromProps()` → Updates state based on props (rarely used).  
- `render()` → Returns JSX (UI).  
- `componentDidMount()` → Runs after the component is rendered; good for API calls.  

---

## 2. Updating Phase
These methods are called when props or state change.

- `static getDerivedStateFromProps()` → Called before every render.  
- `shouldComponentUpdate()` → Determines whether re-rendering is needed.  
- `render()` → Re-renders the UI.  
- `getSnapshotBeforeUpdate()` → Captures info (like scroll position) before DOM updates.  
- `componentDidUpdate()` → Runs after the component updates.  

---

## 3. Unmounting Phase
This method is called when the component is removed from the DOM.

- `componentWillUnmount()` → Cleanup method (e.g., remove timers, cancel API calls).  

---

## Example: Lifecycle in a Class Component

```jsx
import React from 'react';
import LifeCycle from './LifeCycle';

class App extends React.Component {
  state = { show: true };

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ show: !this.state.show })}>
          Toggle LifeCycle
        </button>
        {this.state.show && <LifeCycle />}
      </div>
    );
  }
}

export default App;
```
```js
import React from "react";

class LifecycleDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      count: 0 ,
      show:true
    };
    console.log("1. Constructor called");
  }

  componentDidMount() {
    console.log("4. Component Did Mount - Good for API calls");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("Should Component Update?");
    return true; // allow update
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("6. Component Did Update - Component re-rendered");
  }

  componentWillUnmount() {
    console.log( "Component Will Unmount - Cleanup");
  }
  toggleComponent=()=>{
    this.setState({show:!this.state.show})
  }

  render() {
    console.log(" Render called");
    return (
      <div>
        <h2>React Lifecycle Demo</h2>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}

export default LifecycleDemo;
```
**Typical Execution Order**
   1. When the component mounts
   ```scss
    1. constructor()
    2. getDerivedStateFromProps()
    3. render()
    4. componentDidMount()
   ```
   2. When the component updates:
   ```scss
   1. getDerivedStateFromProps()
   2. shouldComponentUpdate()
   3. render()
   4. getSnapshotBeforeUpdate()
   5. componentDidUpdate()
  ```
  3. When the component unmounts:
  ```scss
    1. componentWillUnmount()
  ```

***Key Takeaway***
  1. Mounting → Setup (constructor, API calls).
  2. Updating → Respond to prop/state changes.
  3. Unmounting → Cleanup.

**Why Use Lifecycle Methods?**

Lifecycle methods let you run code at specific points in a component’s life: when it is created (mounted), updated (re-rendered), or destroyed (unmounted).
This is important because React components are not always permanent — they can appear, update many times, and then disappear.

Without lifecycle methods, you wouldn’t know when to fetch data, clean up, or update things.
