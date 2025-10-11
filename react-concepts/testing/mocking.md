# Mocking API Testing in React

When building React applications, components often rely on APIs to fetch or send data. **Mocking APIs** allows you to test your components without actually making network requests. This helps make tests faster, more reliable, and independent of external services.

---

## Why Mock API Calls?

- **Isolation:** Test components independently of backend.
- **Speed:** No real network delay.
- **Predictable Results:** Return consistent test data.
- **Error Testing:** Easily simulate errors like 404, 500, or network failures.

---

## Common Tools

1. **Jest** – Provides mocking capabilities for functions and modules.
2. **MSW (Mock Service Worker)** – Intercepts network requests in tests or development.
3. **Axios Mock Adapter** – If using Axios, can mock HTTP requests.

---

## Example 1: Mocking Fetch API with Jest

```javascript
// MyComponent.js
import { useEffect, useState } from "react";

export function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  if (!data) return <div>Loading...</div>;
  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```
```js
// MyComponent.test.js
import { render, screen, waitFor } from "@testing-library/react";
import { MyComponent } from "./MyComponent";

// Mock the global fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
      ]),
  })
);

test("renders user list", async () => {
  render(<MyComponent />);
  
  // Wait for the data to be displayed
  await waitFor(() => screen.getByText("Alice"));
  expect(screen.getByText("Alice")).toBeInTheDocument();
  expect(screen.getByText("Bob")).toBeInTheDocument();
});
```
## Example 2: Using MSW (Mock Service Worker)

   1. Install MSW:
      ```bash
       npm install msw --save-dev
      ```
   2. Setup a handler:
      ```js
      // src/mocks/handlers.js
       import { rest } from "msw";

      export const handlers = [
       rest.get("/api/users", (req, res, ctx) => {
       return res(
      ctx.status(200),
      ctx.json([{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }])
       );
      }),
      ];
       ```
   3. Setup the server:
    ```js
    // src/mocks/server.js
     import { setupServer } from "msw/node";
     import { handlers } from "./handlers";

     export const server = setupServer(...handlers);
    ```
  4. Configure Jest:
      ```js
      // setupTests.js
       import { server } from "./mocks/server";

      // Start the server before all tests
       beforeAll(() => server.listen());

      // Reset handlers after each test
      afterEach(() => server.resetHandlers());

      // Close server after all tests
      afterAll(() => server.close());
      ```
  5. Write your test as usual – the API is now mocked by MSW.

  ## Summary Table
  | Tool/Method        | Pros                                       | Cons                                       |
| ------------------ | ------------------------------------------ | ------------------------------------------ |
| Jest `fetch` mock  | Simple, fast, no extra dependencies        | Only works for unit test; not real network |
| Axios Mock Adapter | Great if using Axios                       | Axios-specific                             |
| MSW                | Realistic API mocking, works in dev & test | Extra setup, larger dependency             |

## Tip: Always mock APIs in tests to make them deterministic and independent of external services. Use MSW for end-to-end-like behavior, or Jest mocks for simple unit tests.