# 🧪 Unit Testing with Jest

## 🔍 What is Unit Testing?
Unit testing is a software testing method where individual units or components of a program are tested in isolation.  
The goal is to verify that **each part of the code works correctly** and produces the expected output for given inputs.

---

## ⚙️ What is Jest?

**Jest** is a JavaScript testing framework developed by Facebook.  
It’s widely used with **React**, **Node.js**, and other JavaScript projects.

### ✨ Features
- Zero configuration for most setups.  
- Built-in **test runner**, **assertions**, and **mocking**.  
- Supports **snapshot testing** for React components.  
- Extremely fast and easy to use.

---

## 📦 Installation

```bash
# Using npm
npm install --save-dev jest

# Or using yarn
yarn add --dev jest
```

**Add this line to your package.json:**
```json
{
  "scripts": {
    "test": "jest"
  }
}
```
**Run tests using:**
```bash
npm test
```
## Example: Writing a Simple Test

**File: sum.js**
```js
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```
**File: sum.test.js**
```js
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```
**Run test:**
```bash
npm test
```
**Output:**
```bash
PASS  ./sum.test.js
✓ adds 1 + 2 to equal 3
```
## Common Jest Matchers
| Matcher           | Description                          | Example                               |
| ----------------- | ------------------------------------ | ------------------------------------- |
| `toBe(value)`     | Checks strict equality (`===`)       | `expect(2 + 2).toBe(4)`               |
| `toEqual(value)`  | Deep equality (for objects/arrays)   | `expect({a:1}).toEqual({a:1})`        |
| `toBeNull()`      | Checks for `null`                    | `expect(null).toBeNull()`             |
| `toBeTruthy()`    | Checks if value is truthy            | `expect(true).toBeTruthy()`           |
| `toContain(item)` | Checks if array/string contains item | `expect([1,2,3]).toContain(2)`        |
| `toThrow()`       | Checks if function throws an error   | `expect(() => errorFunc()).toThrow()` |

## Testing Asynchronous Code
 1. Using async/await
 ```js
 const fetchData = async () => "Hello World";

test('fetches data successfully', async () => {
  const data = await fetchData();
  expect(data).toBe("Hello World");
});
```
2. Using Promises
```js
const fetchData = () => Promise.resolve("Success");

test('resolves with Success', () => {
  return fetchData().then(data => {
    expect(data).toBe("Success");
  });
});
```
## Mocking Functions

Mocks let you test code without calling real dependencies (like APIs).
```js
const fetchUser = jest.fn(() => "Hajira");

test('mock function returns Hajira', () => {
  expect(fetchUser()).toBe("Hajira");
  expect(fetchUser).toHaveBeenCalledTimes(1);
});
```
## Snapshot Testing (React Example)

Used to verify UI components do not change unexpectedly.
```js
import renderer from 'react-test-renderer';
import Button from './Button';

test('Button renders correctly', () => {
  const tree = renderer.create(<Button label="Click Me" />).toJSON();
  expect(tree).toMatchSnapshot();
});
```
## Benefits of Unit Testing
 - Detects bugs early in development.
 - Ensures code reliability and confidence during refactors.
 - Makes future development faster and safer.
 - Encourages modular and clean code.

 ## Summary 
 | Concept       | Description                                           |
| ------------- | ----------------------------------------------------- |
| **Unit Test** | Tests a single function or module in isolation.       |
| **Jest**      | JavaScript testing framework with built-in tools.     |
| **Matcher**   | Function used to compare expected and actual results. |
| **Mock**      | Simulated function for testing dependencies.          |
| **Snapshot**  | Stores UI structure to detect unintended changes.     |
