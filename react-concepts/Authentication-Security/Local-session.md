# Local and Session storage
Both Local Storage and Session Storage are part of the Web Storage API, which allows you to store small bits of data in the user’s browser — key/value pairs — without sending them to the server.

## Local Storage
 - Data is saved in the browser permanently (until you delete it manually or via code).
 - Stays even after page reloads, browser restarts, or computer restarts.
 - Capacity: about 5–10 MB per domain.
 - Data is shared across all tabs of the same website.
 ```js
 // Save data
localStorage.setItem('username', 'John');

// Get data
const name = localStorage.getItem('username');
console.log(name); // "John"

// Remove data
localStorage.removeItem('username');

// Clear all data
localStorage.clear();
```
## Session Storage
  - Data is temporary — stored only for that browser tab session.
  - When the tab is closed, the data disappears.
  - Not shared across tabs (each tab has its own session storage).
```js
// Save data
sessionStorage.setItem('theme', 'dark');

// Get data
console.log(sessionStorage.getItem('theme')); // "dark"

// Remove data
sessionStorage.removeItem('theme');
```
## Cookies
  - Small pieces of data stored in the browser — can be used by both frontend (JS) and backend (server).
  - Commonly used for authentication (sessions, tokens).
  **Used**:
  - You need to send data (like tokens) to the server automatically with requests.
  - You need server access (e.g., Set-Cookie or HttpOnly cookies).
 ```js
  // Set cookie
document.cookie = "user=John; path=/; max-age=3600"; // expires in 1 hour

// Read cookie
console.log(document.cookie); // "user=John"
```
## Differences
| Feature          | Local Storage         | Session Storage        | Cookies                         |
| ---------------- | --------------------- | ---------------------- | ------------------------------- |
| Lifetime         | Until cleared         | Until tab closed       | Configurable                    |
| Size limit       | ~5–10 MB              | ~5 MB                  | ~4 KB                           |
| Accessible by JS | ✅ Yes                 | ✅ Yes                  | ✅ (unless HttpOnly)             |
| Sent to server   | ❌ No                  | ❌ No                   | ✅ Yes                           |
| Best for         | User settings, themes | Temporary session data | Authentication, server sessions |
| Security         | Vulnerable to XSS     | Vulnerable to XSS      | Safer with HttpOnly             |

## Security Note
 - All three can be read by JavaScript → vulnerable to XSS attacks.
 - Don’t store sensitive data like passwords or JWT refresh tokens in local or session storage.
 - Use HTTP-only cookies for tokens — browser sends them automatically, but JavaScript can’t access them.

