# ⚡ ESLint & Prettier in React

ESLint and Prettier are essential tools for **maintaining code quality and consistency** in a React project.

---

## 1️⃣ What is ESLint?

**ESLint** is a **static code analysis tool** that identifies problematic patterns in JavaScript/TypeScript code.

- Helps catch **syntax errors**, **potential bugs**, and **anti-patterns**.
- Can enforce **coding style rules** (e.g., semicolons, quotes).
- Integrates well with **React, TypeScript, and VSCode**.

### Example ESLint Error

```ts
const a = 5
console.log(a)
```
If semi rule is enabled, ESLint will warn that missing semicolon is an issue.

## 2️⃣ What is Prettier?
Prettier is a code formatter that enforces consistent code style automatically.
  - Formats code according to rules (line length, quotes, indentation).
  - Works on JavaScript, TypeScript, JSX, CSS, and more.
  - Focused on styling only, not catching bugs.

**Example Before Prettier**
```ts
const hello = ()=>{console.log("Hello World")}
```
**After Prettier**
```ts
const hello = () => {
  console.log("Hello World");
};
```

## 3️⃣ Why Use ESLint + Prettier Together?
 - ESLint → Catches errors and enforces code correctness
 - Prettier → Formats code consistently
 - Combined workflow prevents conflicts and ensures readable and bug-free code.

## 4️⃣ Setting Up ESLint in a React Project
```bash
# Install ESLint
npm install eslint --save-dev

# Initialize ESLint
npx eslint --init
```
  - Choose React and TypeScript if applicable.
  - Select preferred style guide (Airbnb, Standard, or Custom).

**Example .eslintrc.json**
```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["react", "@typescript-eslint"],
  "rules": {
    "no-unused-vars": "warn",
    "react/react-in-jsx-scope": "off"
  }
}
```
## 5️⃣ Setting Up Prettier
```bash
# Install Prettier
npm install prettier --save-dev

# Optional: Prettier ESLint integration
npm install eslint-config-prettier eslint-plugin-prettier --save-dev
```
**Example .prettierrc**
```json
{
  "singleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}
```
  - singleQuote → Use single quotes
  - semi → Add semicolons
  - tabWidth → Number of spaces per tab
  - trailingComma → Add trailing commas in objects/arrays
  - printWidth → Wrap lines at 80 characters

## 6️⃣ Integrating ESLint and Prettier

1. Install integration packages:
```bash
npm install eslint-config-prettier eslint-plugin-prettier --save-dev
```
2. Update .eslintrc.json:
```json
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": ["error"]
  }
}
```
- ESLint now runs Prettier as a rule, ensuring consistent formatting.
## 7️⃣ Useful Commands
 - Lint files: npx eslint src/**/*.{js,ts,jsx,tsx}
 - Fix errors automatically: npx eslint src --fix
 - Format with Prettier: npx prettier --write "src/**/*.{js,ts,jsx,tsx,css}"

## 8️⃣ Best Practices
 - Use VSCode extensions for ESLint & Prettier for real-time feedback.
 - Keep ESLint focused on code quality, Prettier on code style.
 - Use pre-commit hooks (Husky + lint-staged) to enforce rules on git commits.