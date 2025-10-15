# React Functional Component Lifecycle

## In functional components, lifecycle events are handled using Hooks, primarily the useEffect hook.

## Traditional Lifecycle Methods vs useEffect
| Class Component Lifecycle | Functional Component (Hook)                |
| ------------------------- | ------------------------------------------ |
| `componentDidMount`       | `useEffect(() => {}, [])`                  |
| `componentDidUpdate`      | `useEffect(() => {}, [deps])`              |
| `componentWillUnmount`    | `useEffect(() => { return () => {} }, [])` |

## 1. Mounting Phase
```js
useEffect(() => {
  // This runs once after the component mounts
  console.log("Component mounted");

  // Optional cleanup function
  return () => {
    console.log("Component will unmount"); //Cleanup function acts like componentWillUnmount.
  };
}, []);//The empty dependency array [] ensures it only runs once.
```

## 2. Updating Phase
```js
useEffect(() => {
  console.log("Component updated because 'count' changed");
}, [count]); // This runs every time count changes.
```
## 3. Unmounting Phase
```js
useEffect(() => {
  const interval = setInterval(() => {
    console.log("Interval running");
  }, 1000);

  return () => {
    clearInterval(interval);
    console.log("Cleanup on unmount");
  };
}, []);
```
Return function is used for cleanup.
This is called when the component unmounts or before the effect re-runs due to dependency change.

## Summary
  - React functional components don’t have lifecycle methods, but:
      1. useEffect lets you run side effects
      2. You control when it runs using the dependency array
      3. It replaces componentDidMount, componentDidUpdate, and componentWillUnmount