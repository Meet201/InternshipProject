import React, { useState } from 'react';
import { KeyRound, Mail, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import "../assets/ResetPassword.css";

const ResetPassword = () => {
  const [step, setStep] = useState('email'); // email, token, newPassword
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to send the reset token
    setSuccess('Reset link has been sent to your email');
    setStep('token');
  };

  const handleTokenSubmit = (e) => {
    e.preventDefault();
    // Here you would verify the token
    setStep('newPassword');
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // Here you would make an API call to reset the password
    setSuccess('Password has been successfully reset');
  };

  const renderEmailStep = () => (
    <form onSubmit={handleEmailSubmit} className="reset-form">
      <div className="form-header">
        <h2>Reset Password</h2>
        <p>Enter your email to receive a password reset link</p>
      </div>

      <div className="form-group">
        <label>
          <Mail size={20} />
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
      </div>

      <button type="submit" className="submit-button">
        Send Reset Link
        <ArrowRight size={20} />
      </button>
    </form>
  );

  const renderTokenStep = () => (
    <form onSubmit={handleTokenSubmit} className="reset-form">
      <div className="form-header">
        <h2>Enter Reset Token</h2>
        <p>Enter the token sent to your email</p>
      </div>

      <div className="form-group">
        <label>
          <KeyRound size={20} />
          Reset Token
        </label>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter reset token"
          required
        />
      </div>

      <button type="submit" className="submit-button">
        Verify Token
        <ArrowRight size={20} />
      </button>
    </form>
  );

  const renderNewPasswordStep = () => (
    <form onSubmit={handlePasswordReset} className="reset-form">
      <div className="form-header">
        <h2>Set New Password</h2>
        <p>Create a strong password for your account</p>
      </div>

      <div className="form-group">
        <label>
          <KeyRound size={20} />
          New Password
        </label>
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
        <label>
          <KeyRound size={20} />
          Confirm Password
        </label>
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

      <div className="password-requirements">
        <h4>Password Requirements:</h4>
        <ul>
          <li className={password.length >= 8 ? 'met' : ''}>
            At least 8 characters long
          </li>
          <li className={/[A-Z]/.test(password) ? 'met' : ''}>
            One uppercase letter
          </li>
          <li className={/[a-z]/.test(password) ? 'met' : ''}>
            One lowercase letter
          </li>
          <li className={/[0-9]/.test(password) ? 'met' : ''}>
            One number
          </li>
          <li className={/[!@#$%^&*]/.test(password) ? 'met' : ''}>
            One special character
          </li>
        </ul>
      </div>

      <button type="submit" className="submit-button">
        Reset Password
        <ArrowRight size={20} />
      </button>
    </form>
  );

  return (
    <div className="reset-password-container">
      {error && (
        <div className="error-message">
          <AlertCircle size={20} />
          {error}
        </div>
      )}
      
      {success && (
        <div className="success-message">
          <AlertCircle size={20} />
          {success}
        </div>
      )}

      {step === 'email' && renderEmailStep()}
      {step === 'token' && renderTokenStep()}
      {step === 'newPassword' && renderNewPasswordStep()}
    </div>
  );
};

export default ResetPassword;