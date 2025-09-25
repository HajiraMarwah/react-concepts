import React, { useState } from "react";

function UserForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const handleSubmit = () => {
    alert(`Name is ${name} and Age is ${age}`);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default UserForm;
