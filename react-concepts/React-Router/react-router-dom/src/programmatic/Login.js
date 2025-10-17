import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const validate = () => {
    let newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "username is required";
    }
    if (!formData.password) {
      newErrors.password = "password is required";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "password length should be more than 6 characters long";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      navigate("/dashboard");
    }
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
        </div>
        <br />
        <div>
          <label>Password: </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
