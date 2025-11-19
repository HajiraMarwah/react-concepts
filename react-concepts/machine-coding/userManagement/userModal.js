import React, { useState } from "react";

function UserModal({ isOpen, onClose, onAdd }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("User");
  const [errors, setErrors] = useState({});
  const handleSubmit = () => {
    let newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Name is required";
     
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Please enter valid email";
      }
    }
    if(Object.keys(newErrors).length>0){
        setErrors(newErrors)
        return
    }
    onAdd({name,email,role})
    setName("")
    setEmail("")
    setRole("User")
    setErrors({})
    onClose()
  };
  if (!isOpen) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{ background: "#fff", borderRadius: 8, padding: 20, width: 300 }}
      >
        <input
          style={{ marginBottom: 20, width: "100%" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        <input
          style={{ marginBottom: 20, width: "100%" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        <select
          style={{ marginBottom: 20, width: "100%" }}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option>User</option>
          <option>Admin</option>
          <option>Manager</option>
        </select>
        <div>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default UserModal;
