import React, { useState } from "react";

function UserFormObject() {
  const [user, setUser] = useState({ name: "", age: "" });
  const handelChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    alert(`Name is ${user.name} and Age is ${user.age}`);
  };
  return (
    <div>
      <input
        name="name"
        value={user.name}
        onChange={handelChange}
        placeholder="name"
      />
      <input
        name="age"
        value={user.age}
        onChange={handelChange}
        placeholder="age"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default UserFormObject;
