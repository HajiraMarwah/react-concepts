// App.js
import React from "react";
import LazyCounter from "./components/LazyCounter";
import Counter from "./components/Counter";
import UserForm from "./components/UserForm";
import UserFormObject from "./components/UserFormObject";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Counter />
      <UserForm />
      <UserFormObject />
      <LazyCounter />
    </div>
  );
}

export default App;
