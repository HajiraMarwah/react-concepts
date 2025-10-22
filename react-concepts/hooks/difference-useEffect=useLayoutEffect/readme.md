# ⚛️ Difference Between `useEffect` and `useLayoutEffect`

Both `useEffect` and `useLayoutEffect` are React Hooks that let you run code after a component renders.  
But they run at **different times** in the rendering process.

---

## 🧩 1. `useEffect`

- Runs **after** the component has been painted (shown) on the screen.  
- It does **not block** the browser from updating the UI.  
- Used for **side effects** like fetching data, timers, event listeners, etc.

### ✅ Example:
```jsx
useEffect(() => {
  console.log("useEffect → runs after render is visible");
  document.title = "Hello React!";
}, []);
```
**When It Runs:**
 - React renders the UI.
 - The screen updates.
 - Then useEffect runs.

**Good For:**
 - Fetching API data
 - Setting up subscriptions
 - Updating the document title
 - Logging or analytics

## 2. useLayoutEffect
 - Runs before the screen is painted.
 - React waits for this code to finish before updating what the user sees.
 - Used when you need to measure layout or make visual adjustments.

**Example:**
```js
useLayoutEffect(() => {
  console.log("useLayoutEffect → runs before screen update");
  const box = document.getElementById("box");
  console.log(box.offsetHeight); // Safe to measure
});

```
**When It Runs:**
 - React renders the component.
 - useLayoutEffect runs.
 - Then the browser paints the UI.

**Good For:**
 - Measuring DOM size or position
 - Running animations right after layout
 - Preventing flicker when updating styles

## Key difference
| Feature               | `useEffect`                | `useLayoutEffect`                  |
| --------------------- | -------------------------- | ---------------------------------- |
| **Runs**              | After paint                | Before paint                       |
| **Blocks painting**   | ❌ No                       | ✅ Yes                              |
| **Use for**           | Data fetching, async logic | Layout measurement, visual updates |
| **Performance**       | Faster, non-blocking       | Slower, blocks UI until done       |
| **DOM access timing** | After browser paints       | Before browser paints              |
| **Common usage**      | Side effects               | Layout and sync updates            |

## 4. Simple Analogy
 | Example              | Explanation                                        |
| -------------------- | -------------------------------------------------- |
| 🪄 `useEffect`       | "Do something **after** the user sees the update"  |
| ⚙️ `useLayoutEffect` | "Do something **before** the user sees the update" |

## Summary
| Hook              | Timing       | Purpose                  | Blocks UI |
| ----------------- | ------------ | ------------------------ | --------- |
| `useEffect`       | After render | Side effects             | ❌ No      |
| `useLayoutEffect` | Before paint | Measure or adjust layout | ✅ Yes     |
