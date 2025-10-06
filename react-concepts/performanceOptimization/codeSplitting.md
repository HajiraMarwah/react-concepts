# ⚡ Code Splitting in React

As your React application grows, **bundle size** can become large.  
**Code splitting** allows you to split your code into **smaller chunks** that can be loaded **on demand**, improving initial load time and performance.

---

## 🔹 What is Code Splitting?

Code splitting is a technique to **split your JavaScript bundle into smaller files**.  
Instead of loading the entire app at once, only the code needed for the current view is loaded.  

Benefits:
- Faster initial page load.
- Reduced bundle size.
- Improved user experience, especially for large apps.

---

## 🔹 React.lazy

`React.lazy` allows you to **dynamically import a component** only when it’s rendered.  

### Example:
```jsx
import React, { Suspense } from "react";

// Dynamically import the component
const About = React.lazy(() => import("./About"));

function App() {
  return (
    <div>
      <h1>My App</h1>

      {/* Wrap lazy component in Suspense */}
      <Suspense fallback={<div>Loading...</div>}>
        <About />
      </Suspense>
    </div>
  );
}

export default App;
```
**Explanation:**
   - React.lazy(() => import('./About')) tells React to load the component only when needed.
   - Suspense is required to show a fallback UI while the component is loading.

## 🔹 Suspense

Suspense allows you to handle loading states for components or data.
  1. The fallback prop specifies what to render while the lazy-loaded component is being fetched.
  2. You can wrap multiple lazy components in a single Suspense block.
  ```js
  <Suspense fallback={<div>Loading...</div>}>
  <ComponentA />
  <ComponentB />
  </Suspense>
   ```
**How It Works**
 1. At build time, Webpack creates separate chunks for lazy-loaded components.
 2. When the component is rendered, the browser fetches the chunk dynamically.
 3. React replaces the fallback UI with the loaded component once it’s ready.

**Flow:**
```js
Initial Render -> Suspense fallback shown -> Chunk downloaded -> Component rendered
```
## ⚡ Summary Table: Code Splitting in React

| Concept          | Description |
| ---------------- | ----------- |
| **Code Splitting** | Divides your app into smaller JS bundles loaded on demand. |
| **React.lazy()**  | Dynamically imports a component only when it’s rendered. |
| **Suspense**      | Provides a fallback UI while lazy components are loading. |
| **Benefits**      | Faster initial load, smaller bundle size, better UX. |

