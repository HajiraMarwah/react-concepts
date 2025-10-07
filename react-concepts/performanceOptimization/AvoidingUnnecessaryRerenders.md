# ⚡ Avoiding Unnecessary Re-renders in React

Efficient rendering is key to building performant React applications.  
React re-renders components whenever state or props change — but not all changes require a re-render.  
To optimize performance, developers should understand how **keys** and **dependency arrays** affect rendering.

---

## 🧩 1. Keys in Lists

When rendering lists using `.map()`, React uses **keys** to identify which items have changed, been added, or removed.

### ✅ Correct Usage
```jsx
{users.map(user => (
  <UserCard key={user.id} name={user.name} />
))}
```
**⚠️ Avoid Using Index as Key**
```js 
{users.map((user, index) => (
  <UserCard key={index} name={user.name} />
))}
```

**Why It Matters**
| Case                   | What Happens                                        | Result                             |
| ---------------------- | --------------------------------------------------- | ---------------------------------- |
| **Unique Stable Keys** | React tracks items correctly                        | No unnecessary re-renders          |
| **Index as Key**       | React thinks all items are “new” when order changes | Unnecessary re-renders and UI bugs |

## 2️⃣ Dependency Arrays in Hooks
React  hooks like useEffect, useMemo, and useCallback depend on dependency arrays to determine when to re-run or re-calculate.

**Example: useEffect**
```js
useEffect(() => {
  fetchData();
}, [userId]); // only runs when userId changes
```
**Without dependencies:**
```js
useEffect(() => {
  fetchData(); // runs on every render ❌
});
```
**Example: useCallback**
```js
const handleClick = useCallback(() => {
  console.log('Clicked', userId);
}, [userId]); // only re-created when userId changes
```
**Example: useMemo**
```js
const sortedList = useMemo(() => {
  return list.sort((a, b) => a.value - b.value);
}, [list]); // only recalculates when list changes
```
## 🧠 Why Dependencies Matter

| Hook | Purpose | Without Dependency Array | With Dependency Array |
|------|----------|---------------------------|-------------------------|
| **useEffect** | Handles side effects like API calls or event listeners | Runs on every render | Runs only when specified values change |
| **useCallback** | Memoizes functions to prevent re-creation | New function created on every render | Keeps same function reference until dependency changes |
| **useMemo** | Memoizes computed values to prevent recalculation | Recalculates every render | Uses cached value until dependency changes |

---
## Best Practices
  1. Use stable keys for list items (id not index)
  2. Provide dependency arrays in hooks carefully
  3. Use useCallback and useMemo to avoid passing new references unnecessarily
  4. Avoid inline functions or objects inside components unless memoized
  5. Use React.memo for pure components that depend only on props

**Example: Combining Techniques**
```js
const UserList = React.memo(({ users }) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = useCallback((id) => {
    setSelected(id);
  }, []);

  return (
    <ul>
      {users.map(user => (
        <li key={user.id} onClick={() => handleSelect(user.id)}>
          {user.name} {selected === user.id && "✅"}
        </li>
      ))}
    </ul>
  );
});
```
**Optimized Rendering**
  - Stable keys prevent re-renders of other list items.
  - handleSelect is memoized and not re-created every render.
  - React.memo skips re-render if props haven’t changed.


## 📋 Summary Table

| Concept | Description | Helps Avoid |
|----------|--------------|--------------|
| **Keys** | Unique identifiers for list items | Re-renders due to list reordering |
| **Dependency Array** | Controls when effects or memoizations run | Unnecessary effect re-runs |
| **useCallback / useMemo** | Cache functions or computed values | Re-renders due to changing references |
| **React.memo** | Memoizes functional components | Re-renders when props are unchanged |
