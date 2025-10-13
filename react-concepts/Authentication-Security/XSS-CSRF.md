
## XSS and CSRF Prevention in React

When building React applications, security is critical. Two common web attacks are:

- **XSS (Cross-Site Scripting)**
- **CSRF (Cross-Site Request Forgery)**

This guide explains what they are, how they work, and how to prevent them in React apps.

---

## 🔹 1. Cross-Site Scripting (XSS)

### What is XSS?

XSS occurs when an attacker injects **malicious scripts** into a web page, which are then executed by unsuspecting users’ browsers.

Example attack scenarios:
- Stealing JWT tokens from `localStorage`.
- Logging keystrokes.
- Redirecting users to malicious sites.

### XSS Types

| Type | Description |
|------|-------------|
| **Stored XSS** | Malicious script is stored on the server (e.g., comments) |
| **Reflected XSS** | Malicious script comes via URL or request parameter |
| **DOM-based XSS** | Vulnerable JavaScript code manipulates the DOM directly with untrusted input |

### Prevention in React

React is **secure by default** against XSS because it **escapes content** when using JSX:

```jsx
// Safe rendering
const userInput = "<script>alert('XSS')</script>";
return <div>{userInput}</div>; 
// Renders as text, script is not executed
```
Do not use dangerouslySetInnerHTML unless necessary.
If you must use it, sanitize input using libraries like dompurify
:
```jsx
import DOMPurify from "dompurify";

const userInput = "<img src=x onerror=alert(1) />";
return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />;
```
**Additional Tips**
 - Avoid direct DOM manipulation.
 - Use libraries that escape HTML automatically.
 - Validate and sanitize all inputs from users.

## 2. Cross-Site Request Forgery (CSRF)
What is CSRF?

CSRF tricks a user’s browser into sending unauthorized requests to your server using the user’s credentials (like cookies).

**Example:**
 1. User is logged in at bank.com with a valid session cookie.
 2. Attacker sends a request from evil.com:
 ```html
 <img src="https://bank.com/transfer?amount=1000&to=attacker">
```
 3. Browser sends request automatically with the user’s cookies → funds are transferred.

**Prevention in React**
 a. Use HTTP-only Cookies with SameSite Attribute
 ```js
 // Backend (Express.js)
res.cookie("refreshToken", token, {
  httpOnly: true, // not accessible by JS
  secure: true,   // HTTPS only
  sameSite: "Strict" // prevents CSRF
});
```
  - SameSite=Strict → cookies only sent to same-site requests
  - SameSite=Lax → cookies sent for top-level navigation (safer than nothing)

 2.  Use CSRF Tokens
   - Backend generates a CSRF token.
   - Sends it to the frontend.
   - Frontend includes it in headers or request body for all state-changing requests (POST, PUT, DELETE).
  ```jsx
  // React fetch example
    const csrfToken = getCsrfTokenFromCookie(); // or from backend
    fetch("/api/update-profile", {
      method: "POST",
      headers: {
       "Content-Type": "application/json",
       "X-CSRF-Token": csrfToken
       },
      credentials: "include", // send cookies
      body: JSON.stringify({ name: "John" })
    });
   ```
Backend validates the CSRF token before processing the request.
3. Avoid Storing Sensitive Tokens in LocalStorage
  - Tokens in localStorage are vulnerable to XSS → if XSS occurs, CSRF attacks can also exploit them.
  - Use HTTP-only cookies instead.

## Quick Comparison
| Attack   | Exploits                            | Prevention in React                                          |
| -------- | ----------------------------------- | ------------------------------------------------------------ |
| **XSS**  | Injected malicious scripts          | Escape JSX, sanitize inputs, avoid `dangerouslySetInnerHTML` |
| **CSRF** | Unauthorized requests using cookies | HTTP-only cookies with `SameSite`, CSRF tokens               |

## Summary
 1. XSS Prevention
   - Escape all user-generated content in JSX.
   - Sanitize inputs with libraries like DOMPurify.
   - Avoid using innerHTML or dangerouslySetInnerHTML without sanitization.
 2. CSRF Prevention
   - Use SameSite=Strict or Lax cookies.
   - Implement CSRF tokens for state-changing requests.
   - Use HTTP-only cookies for sensitive tokens.
   - Include credentials: include in fetch/axios requests when using cookies.
 3. General
  - Always validate input both on frontend and backend.
  - Serve your app over HTTPS.
  - Keep dependencies up-to-date to avoid security vulnerabilities.

## References
 - https://reactjs.org/docs/security.html
 - https://owasp.org/www-community/attacks/xss/
 - https://owasp.org/www-community/attacks/csrf/

## Conclusion:
React provides strong default protection against XSS, but developers must remain vigilant with untrusted content and dangerouslySetInnerHTML.
For CSRF, using HTTP-only cookies, SameSite attribute, and CSRF tokens ensures safe state-changing requests.