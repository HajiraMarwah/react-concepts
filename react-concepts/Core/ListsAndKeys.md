# Lists and Keys in React

## Lists in React
In React, we often need to display a collection of items dynamically, such as a list of users, tasks, or products. The `map()` function is commonly used to transform an array into an array of React elements.

### Example: Rendering a Simple List

```jsx
import React from "react";

function FruitList() {
  const fruits = ["Apple", "Banana", "Cherry", "Mango"];

  return (
    <div>
      <h2>Fruits List</h2>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
}

export default FruitList;
```
**Explanation:**
 - fruits.map(...) iterates over each fruit in the array and returns a <li> element.
 - key={index} is used to give each list item a unique key.

 ## Keys in Lists
Keys help React identify which items have changed, are added, or are removed. They improve performance and avoid unnecessary re-rendering.

  **Rules for Keys**
      1. Keys must be unique among siblings.
      2. Avoid using array indexes as keys if the list can change dynamically.
      3. Use a unique ID from the data whenever possible.
  **Example: Using Unique Keys**
  ```js
  import React from "react";

function UserList() {
  const users = [
    { id: 101, name: "Alice" },
    { id: 102, name: "Bob" },
    { id: 103, name: "Charlie" },
  ];

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
```
**Explanation:**
 - key={user.id} ensures that React can track each user reliably.
 - Using unique IDs prevents issues when items are added, removed, or reordered.
 
 ## Summary of Lists and Keys

| Concept           | Description                                                                         |
| ----------------- | ----------------------------------------------------------------------------------- |
| **List**          | A way to render multiple elements from an array using `map()`.                      |
| **Key**           | A unique identifier for each list element to help React manage updates efficiently. |
| **Best Practice** | Always use stable and unique values for keys (like IDs), not indexes.               |
