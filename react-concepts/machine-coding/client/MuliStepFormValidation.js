import React, { useState } from "react";

const initialData = {
  name: "",
  email: "",
  password: ""
};

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.email.includes("@"))
        newErrors.email = "Valid email required";
    }

    if (step === 2) {
      if (formData.password.length < 6)
        newErrors.password = "Password must be 6+ characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = () => {
    alert("Form Submitted Successfully!");
    console.log(formData);
  };

  return (
    <div style={{ width: "300px", margin: "20px auto" }}>
      <h2>Step {step}</h2>

      {step === 1 && (
        <>
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <p style={{ color: "red" }}>{errors.name}</p>

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <p style={{ color: "red" }}>{errors.email}</p>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <p style={{ color: "red" }}>{errors.password}</p>
        </>
      )}

      {step === 3 && (
        <>
          <p><b>Name:</b> {formData.name}</p>
          <p><b>Email:</b> {formData.email}</p>
        </>
      )}

      <div style={{ marginTop: "10px" }}>
        {step > 1 && <button onClick={prevStep}>Back</button>}
        {step < 3 && <button onClick={nextStep}>Next</button>}
        {step === 3 && <button onClick={handleSubmit}>Submit</button>}
      </div>
    </div>
  );
}
