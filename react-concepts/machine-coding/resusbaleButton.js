import React from "react";

const styles = {
  base: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    margin: "5px",
    transition: "0.3s",
  },
  primary: {
    backgroundColor: "#007bff",
    color: "white",
  },
  secondary: {
    backgroundColor: "#6c757d",
    color: "white",
  },
  danger: {
    backgroundColor: "#dc3545",
    color: "white",
  },
};

function ReusableButton({ label, onClick, type = "button", variant = "primary" }) {
  // Merge base style + variant style
  const buttonStyle = { ...styles.base, ...styles[variant] };

  return (
    <button type={type} onClick={onClick} style={buttonStyle}>
      {label}
    </button>
  );
}

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Reusable Button (styles object example)</h2>

      <ReusableButton label="Save" variant="primary" onClick={() => alert("Saved!")} />
      <ReusableButton label="Cancel" variant="secondary" onClick={() => alert("Cancelled!")} />
      <ReusableButton label="Delete" variant="danger" onClick={() => alert("Deleted!")} />
    </div>
  );
}

export default App;
