# ⚛️ Error Boundaries in React

### 🧠 **Concept**

Error Boundaries are **React components that catch JavaScript errors** anywhere in their child component tree, log those errors, and display a **fallback UI** instead of crashing the entire React application.

- Introduced in **React 16**.
- They **do not catch errors inside event handlers**, asynchronous code, or errors in themselves (the error boundary).

---

### 🧩 **Key Points**

| Feature | Description |
|---------|-------------|
| Purpose | Prevent the entire app from crashing when an error occurs in a part of the UI |
| Catches | Errors during **rendering**, in **lifecycle methods**, and in **constructors** of child components |
| Fallback UI | A UI component displayed instead of the crashed component tree |
| Limitations | Do not catch errors in **event handlers**, **async code**, or **server-side rendering** |

---

### 🧩 **Creating an Error Boundary**

```jsx
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can log error information to an external service
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```
**Using Error Boundary**
```js
import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import MyComponent from "./MyComponent";

function App() {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
}

export default App;
```
**Explanation**
If MyComponent throws an error during rendering, the ErrorBoundary will catch it and display the fallback UI (Something went wrong.) instead of crashing the app.

### 📝 Best Practices for Error Boundaries

| Practice | Description |
|----------|-------------|
| ✅ Wrap at high-level components | Catch errors for large parts of your app |
| ✅ Provide meaningful fallback UI | Give users feedback or options to recover |
| ✅ Log errors | Use `componentDidCatch` to send errors to a monitoring service |
| ✅ Use multiple boundaries | Wrap different parts of the UI separately for more granular error handling |
| ❌ Don’t wrap everything | Overusing boundaries can hide errors and make debugging harder |
