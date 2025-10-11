# 🧪 React Testing Library (RTL)

## 📘 What is React Testing Library?

**React Testing Library (RTL)** is a lightweight testing library built on top of **DOM Testing Library**.  
It focuses on testing **React components from the user's perspective** — meaning you interact with your components just like a user would (via clicks, inputs, etc.), instead of testing implementation details.

---

## 🎯 Core Philosophy

> “The more your tests resemble the way your software is used, the more confidence they can give you.”

Unlike **Enzyme**, RTL doesn’t test component internals — it tests **visible UI behavior**.

---

## ⚙️ Installation

```bash
# Using npm
npm install --save-dev @testing-library/react @testing-library/jest-dom

# Using yarn
yarn add --dev @testing-library/react @testing-library/jest-dom

```
**Then import jest-dom matchers in your setup file (usually setupTests.js):**
```js
import '@testing-library/jest-dom';
```
## Example: Testing a Simple React Component

**File: Button.js**
```js
import React from 'react';

const Button = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

export default Button;
```
**File: Button.test.js**
```js
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('renders button with label and handles click', () => {
  const handleClick = jest.fn();

  render(<Button label="Click Me" onClick={handleClick} />);

  // Verify button is in the document
  const buttonElement = screen.getByText(/click me/i);
  expect(buttonElement).toBeInTheDocument();

  // Simulate user click
  fireEvent.click(buttonElement);

  // Assert click handler called once
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```
 **Output:**
```css
PASS  ./Button.test.js
✓ renders button with label and handles click
```
## Common RTL Queries
| Method                   | Description                                            | Example                                     |
| ------------------------ | ------------------------------------------------------ | ------------------------------------------- |
| `getByText()`            | Finds an element by visible text                       | `screen.getByText('Hello')`                 |
| `getByRole()`            | Finds by ARIA role (e.g., button, textbox)             | `screen.getByRole('button')`                |
| `getByLabelText()`       | Finds input by its label                               | `screen.getByLabelText('Username')`         |
| `getByPlaceholderText()` | Finds input by placeholder                             | `screen.getByPlaceholderText('Enter name')` |
| `queryByText()`          | Similar to `getByText` but returns `null` if not found | `screen.queryByText('Logout')`              |
| `findByText()`           | Asynchronously finds an element                        | `await screen.findByText('Loaded!')`        |

## Example: 
## 1. Testing Input and State Updates

**File: Login.js**
```jsx
import React, { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');

  return (
    <div>
      <label htmlFor="user">Username:</label>
      <input
        id="user"
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <p data-testid="display">Current: {username}</p>
    </div>
  );
}
```

**File: Login.test.js**
```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

test('updates username on input change', () => {
  render(<Login />);

  const input = screen.getByPlaceholderText('Enter username');
  fireEvent.change(input, { target: { value: 'Priyanka' } });

  expect(screen.getByTestId('display')).toHaveTextContent('Current: Priyanka');
});
```

## 2. Testing Asynchronous UI (with findBy)

**File: UserProfile.js**
```jsx
import React, { useEffect, useState } from 'react';

export default function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setUser({ name: 'Priyanka' });
    }, 500);
  }, []);

  return <div>{user ? <p>Hello {user.name}</p> : <p>Loading...</p>}</div>;
}
```
**File: UserProfile.test.js**
```jsx
import { render, screen } from '@testing-library/react';
import UserProfile from './UserProfile';

test('loads and displays user after delay', async () => {
  render(<UserProfile />);
  
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  // Wait for the user to appear
  const userText = await screen.findByText('Hello Priyanka');
  expect(userText).toBeInTheDocument();
});
```
## Mocking API Calls
```jsx
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import Users from './Users';

jest.mock('axios');

test('renders users from API', async () => {
  axios.get.mockResolvedValue({ data: [{ id: 1, name: 'Priyanka' }] });

  render(<Users />);

  const user = await screen.findByText('Priyanka');
  expect(user).toBeInTheDocument();
});
```
## RTL vs Jest
| Feature | Jest                         | React Testing Library      |
| ------- | ---------------------------- | -------------------------- |
| Purpose | Test logic, functions, units | Test React components (UI) |
| Level   | Unit testing                 | Integration/UI testing     |
| Example | `expect(sum(1,2)).toBe(3)`   | `fireEvent.click(button)`  |
| Focus   | Implementation               | User behavior              |

## Best Practices
 - Avoid testing internal states or props directly.
 - Prefer getByRole() over getByTestId() for accessibility.
 - Use screen instead of destructuring render() return values.
 - Always test what users can see or do, not how components work internally.

## Summary
| Concept                       | Description                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------ |
| **RTL**                       | Library for testing React components like users interact with them.            |
| **Queries**                   | Functions like `getByText`, `getByRole`, `findByText` used to locate elements. |
| **fireEvent()**               | Simulates user events (clicks, typing, etc.).                                  |
| **findBy**                    | Used for testing async UI changes.                                             |
| **Mocking**                   | Replaces real API calls or dependencies during testing.                        |
| **@testing-library/jest-dom** | Provides custom DOM matchers for Jest (like `.toBeInTheDocument()`).           |

