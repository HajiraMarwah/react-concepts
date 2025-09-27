import React from "react";

import { useContext } from "react";
import  {ThemeContext}  from "./ThemeContext";

function ThemeConsumer() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const boxContainer = {
    backgroundColor: theme === "light" ? "#fff" : "#333",
    color: theme === "light" ? "#000" : "#fff",
    padding: "20px",
    textAlign: "center",
    borderRadius: "10px",
  };
  return (
    <div style={boxContainer}>
      <h1>Theme Box</h1>
      <p>Theme:{theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

export default ThemeConsumer;
