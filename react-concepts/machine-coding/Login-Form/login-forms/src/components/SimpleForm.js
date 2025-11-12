import React, { useState } from "react";

function SimpleForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setError] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const validate = () => {
    const newError = {};
    if (!formData.email.trim()) {
      newError.email = "please enter valid email";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      newError.email = "please enter valid email";
    }

    if (!formData.password.trim()) {
      newError.password = "please enter password";
    } else if (formData.password.length < 6) {
      newError.password = "Password should contain atleast 6 characters";
    }
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("login successfull");
      alert(`login is sucessfully submitted`);
      setFormData({ email: "", password: "" });
    } else {
      console.log("login is failed");
    }
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        <div>
          <label>password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default SimpleForm;
