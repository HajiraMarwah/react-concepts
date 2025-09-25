### 2️⃣ `useEffect`

`useEffect` is used to perform **side effects** in functional components, such as API calls, timers, and subscriptions.  

**Side effects include:**  
1. Fetching data from an API  
2. Updating the DOM manually  
3. Setting up timers or intervals  
4. Subscribing to events  

Before Hooks, you needed **lifecycle methods** in class components (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`) to handle side effects. `useEffect` replaces all of these in functional components.

**Syntax:**

```javascript
useEffect(() => {
  // effect code

  return () => {
    // cleanup code (optional)
  };
}, [dependencies]);
### Key Points

- **Runs after render** → DOM is already updated.  
- **Dependencies array controls when it runs:**  
  - `[]` → runs **once** on mount  
  - `[state]` → runs **on state change**  
  - No array → runs **after every render**  
- **Cleanup function** → used for intervals, subscriptions, or any manual DOM cleanup.  
- Can replace all **class component lifecycle methods**.
