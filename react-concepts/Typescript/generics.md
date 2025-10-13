# ⚡ Using Generics in React Components with TypeScript

Generics in TypeScript allow you to create **reusable components** that can work with **different types** while keeping type safety.  
They are especially useful for components like lists, tables, or wrappers where the type of data may vary.

---

## 1️⃣ What are Generics?

Generics are like placeholders for types. They let you **pass a type as a parameter** to a component, function, or interface.

```ts
function identity<T>(arg: T): T {
  return arg;
}

const result = identity<string>("Hello"); // T is string
const numberResult = identity<number>(42); // T is number
```
## 2️⃣ Generics in Functional Components
Example: A generic List component
```tsx
import React from "react";

// Define generic type T
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Usage with string[]
const stringItems = ["Apple", "Banana", "Orange"];
<List items={stringItems} renderItem={(item) => <strong>{item}</strong>} />;

// Usage with objects
interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

<List
  items={users}
  renderItem={(user) => <span>{user.name}</span>}
/>
```
**Key Points**
 - T is a generic type parameter.
 - <T> allows the component to adapt to any type.
 - You can use it with primitive types, objects, or arrays.

## 3️⃣ Generics in Class Components

```tsx
import React, { Component } from "react";

interface TableProps<T> {
  data: T[];
  renderRow: (item: T) => React.ReactNode;
}

class Table<T> extends Component<TableProps<T>> {
  render() {
    const { data, renderRow } = this.props;
    return (
      <table>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>{renderRow(item)}</tr>
          ))}
        </tbody>
      </table>
    );
  }
}

// Usage
interface Product {
  id: number;
  name: string;
}

const products: Product[] = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Phone" },
];

<Table
  data={products}
  renderRow={(product) => <td>{product.name}</td>}
/>
```
## 4️⃣ Generics with Constraints

Sometimes you want to restrict generic types to have certain properties.
```tsx
interface HasId {
  id: number;
}

interface CardProps<T extends HasId> {
  item: T;
}

function Card<T extends HasId>({ item }: CardProps<T>) {
  return <div>Item ID: {item.id}</div>;
}

// ✅ Works because item has id
<Card item={{ id: 1, name: "Test" }} />

// ❌ Error: Property 'id' is missing
<Card item={{ name: "Test" }} />
```
T extends HasId ensures T has at least the id property.

## 5️⃣ Generics with Default Types

You can provide a default type for generics:
```tsx
interface WrapperProps<T = string> {
  value: T;
}

function Wrapper<T = string>({ value }: WrapperProps<T>) {
  return <div>{value}</div>;
}

// Usage
<Wrapper value="Hello" />  // T inferred as string
<Wrapper<number> value={42} /> // T explicitly number
```
## 6️⃣ Benefits of Generics in React
  -  Reusable components for different data types.
  -  Full type safety without losing flexibility.
  -  Avoids any, making code predictable and maintainable. 
  - Works for functional and class components.

## 7️⃣ Summary Table
| Feature                | Example                                           | Purpose                          |
| ---------------------- | ------------------------------------------------- | -------------------------------- |
| Generic type parameter | `<T>`                                             | Placeholder type                 |
| Generic props          | `interface ListProps<T> { items: T[] }`           | Makes component reusable         |
| Constraints            | `T extends HasId`                                 | Limit allowed types              |
| Default type           | `T = string`                                      | Provide fallback type            |
| Class components       | `class Table<T> extends Component<TableProps<T>>` | Use generics in class components |

## Best Practices
  - Always use generics instead of any for reusable components.
  - Use constraints to ensure type safety for specific properties.
  - Provide default types for better developer experience.
  - Use generics in lists, tables, forms, and wrappers to handle multiple data types.