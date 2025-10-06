# React Virtualization with `react-window`

## 💡 What is Virtualization?

Virtualization (or windowing) is a technique to **render only the visible portion of a large list or table** instead of rendering all items at once.  

This improves performance and reduces memory usage for large datasets.

---

## 🚀 Why Use Virtualization?

Without virtualization:
- Rendering thousands of items at once can **slow down the app**.
- Leads to **high memory consumption**.
- Scroll performance becomes **laggy**.

With virtualization:
- Only the **visible items** (plus a small buffer) are rendered.
- Scrolling is smooth.
- Memory and CPU usage are reduced.

---

## 🧩 Example: Using `react-window`

[`react-window`](https://github.com/bvaughn/react-window) is a lightweight library for list virtualization.

### 1. Install

```bash
npm install react-window
```
## 2. Basic List Example
```js
import React from "react";
import { FixedSizeList as List } from "react-window";

const data = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`);

function App() {
  return (
    <List
      height={400}         // Height of the container
      itemCount={data.length} 
      itemSize={35}        // Height of each row
      width={300}          // Width of the container
    >
      {({ index, style }) => (
        <div style={style}>
          {data[index]}
        </div>
      )}
    </List>
  );
}

export default App;
```
**How It Works**
  - List renders only the rows visible in the container.
  - itemSize tells the library how tall each row is.
  - style is required for each item — it positions the row correctly.
  - As the user scrolls, new rows are rendered dynamically, old ones are removed from the DOM.
✅ Even if the dataset has 10,000+ items, only a few hundred DOM nodes exist at any time.

 **Benefits of Virtualization**
  - Improves performance for large lists/tables.
  - Reduces memory usage.
  - Smooth scrolling even with thousands of rows.
  - Works for both vertical and horizontal lists.
## Advanced: Variable Size List
 If rows have different heights, use VariableSizeList:
 ```js
 import { VariableSizeList as List } from "react-window";

const getItemSize = index => (index % 2 === 0 ? 50 : 30);

<List
  height={400}
  itemCount={1000}
  itemSize={getItemSize}
  width={300}
>
  {({ index, style }) => (
    <div style={style}>
      Item {index}
    </div>
  )}
</List>
```
## React Virtualization Summary

| Concept               | Description                                                                                   |
|-----------------------|-----------------------------------------------------------------------------------------------|
| **Virtualization**    | Render only the visible portion of a large list or table instead of all items at once.       |
| **Library**           | `react-window` — lightweight library for list/window virtualization.                         |
| **Benefits**          | - Fast rendering for large lists <br> - Low memory usage <br> - Smooth scrolling             |
| **Key Props**         | `height`, `width`, `itemCount`, `itemSize`, `children`                                       |
| **Fixed Size List**   | Use `FixedSizeList` when all items have the same height or width.                             |
| **Variable Size List**| Use `VariableSizeList` when items have different sizes; provide `itemSize` as a function.     |
| **How it Works**      | Only visible items are rendered; off-screen items are not in the DOM, reducing load.          |
| **Use Cases**         | Large lists, tables, grids, infinite scrolling, dashboards with thousands of rows.           |

## Recap Example
```js
import React from "react";
import { FixedSizeList as List } from "react-window";

const data = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);

function App() {
  return (
    <List
      height={400}
      itemCount={data.length}
      itemSize={35}
      width={300}
    >
      {({ index, style }) => <div style={style}>{data[index]}</div>}
    </List>
  );
}

export default App;
```
✅ Even with 10,000 items, the DOM contains only visible rows for optimal performance.