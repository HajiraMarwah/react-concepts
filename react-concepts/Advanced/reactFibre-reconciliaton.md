# ⚙️ React Fiber & Reconciliation Explained

React Fiber is the **core algorithm behind React 16+** that enables smooth, incremental rendering.  
It allows React to **pause, resume, and reuse work** — making UI updates faster and more responsive.

---

## 🧠 What Is React Fiber?

**React Fiber** is a **reimplementation of the React reconciliation algorithm** that breaks rendering work into small, manageable units (fibers).  
This makes React capable of **performing rendering work asynchronously**.

Before Fiber, React’s rendering was **synchronous and blocking** — large updates could freeze the UI.

### 🧩 Key Goals of Fiber:
| Goal | Description |
| ---- | ------------ |
| **Incremental Rendering** | Split rendering work into chunks that can be paused and resumed. |
| **Scheduling & Prioritization** | High-priority updates (like user input) happen before low-priority updates. |
| **Better Error Handling** | Improved support for error boundaries. |
| **Concurrency Support** | Foundation for features like Concurrent Mode and Suspense. |

---

## 🔄 What Is Reconciliation?

**Reconciliation** is the process React uses to decide **what changes need to be made to the DOM** when a component’s state or props change.

### ⚙️ Reconciliation Steps:
1. **Render Phase (Work Phase)**  
   React builds a new virtual DOM tree and compares it with the previous one (diffing).

2. **Diffing Algorithm**  
   React uses keys and type comparison to detect which elements changed:
   - If elements have the same **type**, React updates existing DOM nodes.
   - If they differ, React **replaces** the node entirely.
   - **Keys** help React detect moved or reordered elements efficiently.

3. **Commit Phase**  
   React applies the minimal necessary updates to the real DOM.

---

## 🧵 Fiber Architecture

Each component instance in React now has a **Fiber node** that represents:
- The component’s **type** (function/class)
- Its **props and state**
- Its **child and sibling fibers**
- The **effect list** (what needs to be done in the commit phase)

### 🧩 Fiber Node Structure (Conceptually)
| Field | Description |
| ------ | ------------ |
| `type` | Type of component (e.g., `div`, `App`) |
| `key` | Helps identify elements in lists |
| `child` | Points to the first child fiber |
| `sibling` | Points to the next sibling fiber |
| `return` | Points to the parent fiber |
| `pendingProps` | Props for next render |
| `memoizedProps` | Props from previous render |
| `stateNode` | DOM node or class instance |

---

## 🚀 How Fiber Improves Performance

| Feature | Description |
| -------- | ------------ |
| **Scheduling** | React can assign priority to updates — e.g., user input > network fetch. |
| **Interruptible Rendering** | React can pause rendering to handle urgent tasks. |
| **Reusing Work** | React can reuse parts of the fiber tree that didn’t change. |
| **Concurrent Rendering** | Enables React 18 features like `useTransition` and `Suspense`. |

---

## ⚡ Example of Reconciliation in Action

```jsx
function App() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```
**Step-by-step:**
  1. React creates a Fiber tree representing <App />.
  2. On setCount, React builds a new Fiber tree.
  3. It compares (diffs) the new and old virtual trees:
   - <h1> remains → React only updates text content.
   - <button> is unchanged → React reuses the DOM node.
  4. In the commit phase, React updates the DOM efficiently without re-rendering the whole tree.

## Summary
| Concept            | Description                                            |
| ------------------ | ------------------------------------------------------ |
| **Fiber**          | React’s data structure for incremental rendering       |
| **Reconciliation** | Process of diffing new vs old virtual DOM              |
| **Render Phase**   | Builds the virtual tree (can be paused)                |
| **Commit Phase**   | Applies updates to the DOM (synchronous)               |
| **Keys**           | Help React detect moved/reordered elements efficiently |

## Quick Analogy

Think of React Fiber as a to-do list manager for UI updates.
It can pause low-priority tasks (like animations) to quickly respond to user interactions,
then come back and finish the remaining work later — all without freezing the UI.

## Interview Tip

1. Common interview questions related to React Fiber:
2. What is React Fiber and why was it introduced?
3. Explain the difference between render and commit phases.
4. How does React decide which DOM updates to make?
5. What role do keys play in reconciliation?

✅ Pro Tip: Mention that React Fiber laid the groundwork for Concurrent Mode, Suspense, and Transitions — showing your understanding of React’s evolution.