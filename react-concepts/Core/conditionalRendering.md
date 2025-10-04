# ⚛️ Conditional Rendering in React

### 🧠 **Concept**
Conditional rendering in React means **displaying different UI elements** based on certain conditions — just like using `if` statements in JavaScript.

React components decide **what to render** depending on the state, props, or other logic.

---

### 🧩 **Example 1: Using if-else**

```jsx
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;

  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  } else {
    return <h1>Please log in.</h1>;
  }
}
```
***Usage:**
```js
<Greeting isLoggedIn={true} />
```
## Example 2: Using Ternary Operator-

This is a shorter way to conditionally render content.
```js
function Greeting(props) {
  return (
    <h1>{props.isLoggedIn ? "Welcome back!" : "Please log in."}</h1>
  );
}
```
## Example 3: Using Logical AND (&&)-
If you want to show something only when a condition is true, you can use &&.
```js
function Notification(props) {
  const hasMessages = props.messages.length > 0;

  return (
    <div>
      <h2>Hello User!</h2>
      {hasMessages && <p>You have {props.messages.length} new messages.</p>}
    </div>
  );
}
```
**Usage:**
```js
<Notification messages={['Hi', 'Welcome']} />
```
**Output**
```js
Hello User!
You have 2 new messages.
```
## Example 4: Inline Conditional Rendering
```js
function UserStatus({ isOnline }) {
  return (
    <div>
      Status: {isOnline ? <span>🟢 Online</span> : <span>🔴 Offline</span>}
    </div>
  );
}
```


### 🧠 **Best Practices**

| Practice                             | Description                           |
| ------------------------------------ | ------------------------------------- |
| ✅ Keep it simple                     | Avoid deeply nested conditions        |
| ✅ Extract logic                      | Use helper functions for readability  |
| ✅ Use ternary or `&&`                | For small inline conditions           |
| ❌ Don’t use `if` directly inside JSX | It won’t work inside `{}` expressions |

---

### 📝 **Summary Table**

| Technique          | Example                     | When to Use                          |
| ------------------ | --------------------------- | ------------------------------------ |
| `if...else`        | Return different components | For larger UI blocks                 |
| Ternary (`? :`)    | `{condition ? A : B}`       | When you need two outcomes           |
| Logical AND (`&&`) | `{condition && A}`          | When you need one conditional render |
