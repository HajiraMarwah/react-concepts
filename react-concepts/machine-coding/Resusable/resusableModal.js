import React, { useState } from "react";

const style = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "white",
    borderRadius: "7px",
    padding: "10px",
    width: "300px",
    textAlign: "center",
  },
};
function ResusableModal({ show, onClose, title, children }) {
  if (!show) return null;
  return (
    <div>
      <div style={style.overlay}>
        <div style={style.modal}>
          <h3>{title}</h3>
          <div>{children}</div>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <h1>Resusable Modal</h1>
      <button onClick={() => setOpen(true)}>open modal</button>
      <ResusableModal show={open} onClose={() => setOpen(false)} title="modal">
        <p>Hello from modal</p>
        <p>This is Resuable modal</p>
      </ResusableModal>
    </>
  );
}
export default App;




