import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaCar } from "react-icons/fa"; 
import "../assets/ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {  // Add 'async' here
    e.preventDefault();
    setMessage("");
    setError("");
  
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await fetch("http://localhost:3000/otp/send", {  // 'await' now works inside async
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
  
      if (data.error) {
        throw new Error(data.message);
      }
  
      setMessage("OTP has been sent to your email.");
      setTimeout(() => {
        navigate("/verify-otp", { state: { email } });
      }, 1500);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <div className="header">
          <FaCar className="car-icon" />
          <h2>Reset Your Password</h2>
          <p>Enter your email to receive reset instructions</p>
        </div>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>Email address</label>
          <div className="input-container">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>

        <p className="back-to-login" onClick={() => navigate("/login")}>
          ← Back to Login
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
