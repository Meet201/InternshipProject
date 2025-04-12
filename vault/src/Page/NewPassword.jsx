import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound, Eye, EyeOff } from 'lucide-react';
import "../assets/NewPassword.css";

const NewPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Mock success
    alert('Password updated successfully!');
    navigate('/login');
  };

  return (
    <div className="new-password-container">
      <div className="new-password-box">
        <div className="header">
          <KeyRound className="header-icon" size={32} />
          <h2>Create New Password</h2>
          <p className="header-text">
            Please enter and confirm your new password
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>New Password</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-button">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
