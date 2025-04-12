import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { KeyRound, ArrowLeft, Loader2 } from 'lucide-react';
import "../assets/VerifyOTP.css";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate('/verify-otp');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [email, navigate]);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length; i++) {
      if (/\d/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }
    
    setOtp(newOtp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      alert('Please enter all digits');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/otp/verify', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp: otpString
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.message);
      }

      navigate('/reset-password', { state: { email, verified: true } });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleResendOTP = async () => {
    if (timeLeft > 0) return;
    
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/otp/send', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.message);
      }

      setTimeLeft(900);
      alert('New OTP sent successfully');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-otp-container">
      <div className="verify-otp-box">
        <div className="header">
          <KeyRound className="header-icon" size={32} />
          <h2>Verify OTP</h2>
          <p className="header-text">
            Enter the 6-digit code sent to {email}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                pattern="\d*"
                inputMode="numeric"
                autoComplete="one-time-code"
                required
              />
            ))}
          </div>

          <div className="timer">
            Time remaining: {formatTime(timeLeft)}
          </div>

          <button 
            type="submit" 
            className="verify-btn" 
            disabled={loading || timeLeft === 0}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Verifying...</span>
              </>
            ) : (
              'Verify OTP'
            )}
          </button>
        </form>

        <button 
          className="resend-btn"
          onClick={handleResendOTP}
          disabled={loading || timeLeft > 0}
        >
          Resend OTP
        </button>

        <button 
          className="back-btn"
          onClick={() => navigate('/login')}
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
      </div>
    </div>
  );
};

export default VerifyOTP;