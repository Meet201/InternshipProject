import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Key, User, AlertCircle } from 'lucide-react';
import "../assets/AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login - replace with actual authentication
    if (credentials.email === 'admin@vehiclevault.com' && credentials.password === 'admin123') {
      localStorage.setItem('adminToken', 'mock-token');
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Vehicle Vault Admin</h1>
          <p>Sign in to manage your dealership</p>
        </div>

        {error && (
          <div className="error-message">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>
              <User size={20} />
              Email
            </label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              placeholder="admin@vehiclevault.com"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <Key size={20} />
              Password
            </label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;