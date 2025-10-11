# 🧪 End-to-End (E2E) Testing in React

**End-to-End (E2E) testing** ensures your entire app — from the UI to backend and routing — works as expected from the user’s perspective.  
It simulates real user interactions (like clicks, typing, navigation) in a real or headless browser.

---

## 🎯 What Is E2E Testing?

E2E tests verify the **complete user journey**, not just individual components.  
For example:
- Can a user log in successfully?
- Does navigation between pages work?
- Are form submissions handled correctly?

---

## ⚙️ Common Tools

| Tool | Description | Browser Support |
|------|--------------|----------------|
| **Cypress** | Easy to set up, great UI test runner, excellent debugging tools | Chrome, Edge, Firefox |
| **Playwright** | Fast, reliable, supports multiple browsers and parallel tests | Chromium, Firefox, WebKit |

---

## 🚀 Example 1: E2E Test with **Cypress**

### 🔧 Setup
```bash
npm install cypress --save-dev
```
Add a script to your package.json:
```json
"scripts": {
  "cypress:open": "cypress open"
}
```
Run Cypress:
```bash
npm run cypress:open
```
**Example Test**
```js
// cypress/e2e/login.cy.js
describe("Login Flow", () => {
  it("should allow user to log in", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("input[name='email']").type("user@example.com");
    cy.get("input[name='password']").type("password123");
    cy.get("button[type='submit']").click();
    cy.url().should("include", "/dashboard");
    cy.contains("Welcome, user");
  });
});
```
**This test:**
  - Opens your login page
  - Types into input fields
  - Clicks the login button
  - Verifies the redirect and text on the dashboard

  ## Example 2: E2E Test with Playwright
  Setup
  ```bash
     npm install -D @playwright/test
    npx playwright install
    ```