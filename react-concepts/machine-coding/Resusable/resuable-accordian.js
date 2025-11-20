import React, { useState } from "react";
 function Accordion({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div style={styles.container}>
      <div style={styles.header} onClick={() => setIsOpen(!isOpen)}>
        <span>{title}</span>
        <span style={styles.icon}>{isOpen ? "−" : "+"}</span>
      </div>

      {isOpen && <div style={styles.content}>{children}</div>}
    </div>
  );
}

const styles = {
  container: {
    border: "1px solid #ccc",
    borderRadius: "6px",
    marginBottom: "10px",
    overflow: "hidden",
  },
  header: {
    background: "#f4f4f4",
    padding: "12px 16px",
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
    fontWeight: "bold",
  },
  icon: {
    fontSize: "20px",
    fontWeight: "bolder",
  },
  content: {
    padding: "14px 16px",
    background: "white",
    fontSize: "15px",
    lineHeight: "1.6",
  },
};

function App() {
  return (
    <div style={{ width: "600px", margin: "40px auto" }}>
      <h1>Reusable Accordion</h1>

      <Accordion title="What is React?">
        React is a JavaScript library for building UI components.
      </Accordion>

      <Accordion title="What is an Accordion?" defaultOpen={true}>
        An accordion is a vertically stacked UI element that reveals content.
      </Accordion>

      <Accordion title="Is this reusable?">
        Yes! You can style or extend it however you want.
      </Accordion>
    </div>
  );
}

export default App;
