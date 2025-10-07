# Higher-Order Components (HOC) in React

A **Higher-Order Component (HOC)** is an **advanced React pattern** used to **reuse component logic**.  
HOC is a **function** that takes a component as an argument and returns a **new enhanced component**.

---

## 🧩 Concept

- **HOC Signature:**  
```javascript
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```
**Purpose:**
 - Reuse logic across multiple components.
 - Add common behavior (e.g., logging, authentication, theme, data fetching) without modifying the original component.
 - Keep components clean and focused on UI.

 ## Example: Adding a Loading Spinner
Suppose we have a component that displays user data, and we want to show a loading spinner while data is being fetched.

1. Original Component
```jsx
const UserList = ({ users }) => {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
```
2. Higher-Order Component (HOC)
```jsx
const withLoading = (WrappedComponent) => {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return <WrappedComponent {...props} />;
  };
};
```
3. Using the HOC
```jsx
const UserListWithLoading = withLoading(UserList);

// Usage in App
function App() {
  const [loading, setLoading] = React.useState(true);
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    setTimeout(() => {
      setUsers([{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]);
      setLoading(false);
    }, 2000);
  }, []);

  return <UserListWithLoading isLoading={loading} users={users} />;
}
```
## Explanation
| Concept                | Description                                                  |
| ---------------------- | ------------------------------------------------------------ |
| **Wrapped Component**  | Original component (e.g., `UserList`)                        |
| **HOC Function**       | Takes `WrappedComponent` and returns enhanced component      |
| **Enhanced Component** | New component with added behavior (e.g., loading spinner)    |
| **Props Forwarding**   | HOC passes all props to wrapped component using `{...props}` |

## Key Points:
 - "HOCs are pure functions with no side effects."
 - "They do not modify the original component, just return a new one."
 - "Avoid using HOCs inside render to prevent unnecessary re-renders."

## Benefits
  - Code reuse without duplication.
  - Keeps UI components clean.
  - Can combine multiple HOCs for complex behaviors (e.g., withAuth(withLoading(Component))).