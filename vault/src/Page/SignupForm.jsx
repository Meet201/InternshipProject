import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    contactNum: "",
    status: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,  
  });

  const [error, seterror] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  async function submitHandler(e) {
    e.preventDefault();
    seterror('');

    if (!Object.values(formData).every(field => field !== "")) {
      seterror("All fields are required");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      seterror("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/user/signup', formData);
      if (response.data.error == false) {
        alert(response.data.message);
        navigate('/login');
      } else {
        seterror(response.data.message);
      }
    } catch (error) {
      console.error(error);
      seterror("Failed to register. Please try again.");
    }
  }

  const inputStyle = {
    width: "100%",
    height: "40px",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxSizing: "border-box",
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f3f3f3" }}>
      <div style={{ backgroundColor: "white", padding: "50px", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", width: "350px" }}>
        <h2 style={{ textAlign: "center", color: "#2d6a4f" }}>Join VehicleVault</h2>
        <p style={{ textAlign: "center", color: "#666" }}>Create your account</p>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <form onSubmit={submitHandler}>
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required style={inputStyle} />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required style={inputStyle} />
          <input type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleChange} required style={inputStyle} />
          
          <select name="gender" value={formData.gender} onChange={handleChange} required style={inputStyle}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input type="text" name="contactNum" placeholder="Contact Number" value={formData.contactNum} onChange={handleChange} required style={inputStyle} />
          <input type="text" name="status" placeholder="Status" value={formData.status} onChange={handleChange} required style={inputStyle} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={inputStyle} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required style={inputStyle} />

          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} required style={{ marginRight: "8px" }} />
            <label style={{ fontSize: "14px", lineHeight: "1.5" }}>
              I agree to the <a href="#" style={{ color: "#007bff" }}>Terms of Service</a> and <a href="#" style={{ color: "#007bff" }}>Privacy Policy</a>
            </label>
          </div>

          <button type="submit" style={{ width: "100%", backgroundColor: "#2d6a4f", color: "white", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer" }}>Create account</button>
        </form>

        <p style={{ textAlign: "center", marginTop: "10px", color: "#666" }}>
          Already have an account? <a href="/login" style={{ color: "#007bff" }}>Login</a>
        </p>
      </div>
    </div>
  );
}