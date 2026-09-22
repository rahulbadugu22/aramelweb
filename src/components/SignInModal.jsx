import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Smartphone, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  User, 
  MapPin, 
  Mail, 
  CheckCircle2, 
  RefreshCw, 
  RotateCcw,
  Edit2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CUSTOMER_API } from '../config/api';
import { useCustomerAuth } from '../context/CustomerAuthContext';

export default function SignInModal({ isOpen, onClose, onNavigate }) {
  const { login } = useCustomerAuth();

  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [tempToken, setTempToken] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const otpInputsRef = useRef([]);

  const POPULAR_CITIES = ['Bengaluru', 'Hyderabad', 'Chennai', 'Mumbai', 'Delhi-NCR', 'Pune', 'Kolkata'];

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setPhone('');
      setOtp(['', '', '', '']);
      setName('');
      setCity('');
      setEmail('');
      setError('');
      setTempToken('');
      setTimer(30);
      setCanResend(false);
    }
  }, [isOpen]);

  useEffect(() => {
    let interval = null;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  if (!isOpen) return null;

  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    setError('');

    const clean = phone.replace(/\D/g, '').slice(-10);
    if (clean.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(CUSTOMER_API.sendOtp, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: clean })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to dispatch verification code');
      }

      setStep(2);
      setTimer(30);
      setCanResend(false);
      setOtp(['', '', '', '']);
      setTimeout(() => {
        if (otpInputsRef.current[0]) otpInputsRef.current[0].focus();
      }, 100);
    } catch (err) {
      setError(err.message || 'Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      const pastedDigits = value.replace(/\D/g, '').slice(0, 4).split('');
      const newOtp = [...otp];
      pastedDigits.forEach((digit, i) => {
        newOtp[i] = digit;
      });
      setOtp(newOtp);
      const nextFocus = Math.min(pastedDigits.length, 3);
      if (otpInputsRef.current[nextFocus]) otpInputsRef.current[nextFocus].focus();
      if (pastedDigits.length === 4) {
        verifyOtpCode(newOtp.join(''));
      }
      return;
    }

    const digit = value.replace(/\D/g, '');
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    if (digit && index < 3) {
      if (otpInputsRef.current[index + 1]) {
        otpInputsRef.current[index + 1].focus();
      }
    }

    if (digit && index === 3) {
      const fullOtp = newOtp.join('');
      if (fullOtp.length === 4) {
        verifyOtpCode(fullOtp);
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      if (otpInputsRef.current[index - 1]) {
        otpInputsRef.current[index - 1].focus();
      }
    }
  };

  const verifyOtpCode = async (codeToVerify) => {
    setError('');
    const enteredCode = codeToVerify || otp.join('');
    if (enteredCode.length !== 4) {
      setError('Please enter the complete 4-digit code');
      return;
    }

    setLoading(true);
    try {
      const clean = phone.replace(/\D/g, '').slice(-10);
      const res = await fetch(CUSTOMER_API.verifyOtp, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: clean, otp: enteredCode })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid verification code');
      }

      if (data.isNewUser) {
        setTempToken(data.tempToken || '');
        setStep(3);
      } else {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 }
        });
        login(data.customer, data.token);
        onClose();
        if (onNavigate) onNavigate('home');
      }
    } catch (err) {
      setError(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    setError('');
    setLoading(true);
    try {
      const clean = phone.replace(/\D/g, '').slice(-10);
      await fetch(CUSTOMER_API.resendOtp, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: clean })
      });
      setTimer(30);
      setCanResend(false);
      setOtp(['', '', '', '']);
      if (otpInputsRef.current[0]) otpInputsRef.current[0].focus();
    } catch (err) {
      setError('Could not resend OTP right now');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterProfile = async (e) => {
    if (e) e.preventDefault();
    setError('');

    if (!name || name.trim() === '') {
      setError('Please enter your full name');
      return;
    }
    if (!city || city.trim() === '') {
      setError('Please enter which city you are from');
      return;
    }

    setLoading(true);
    try {
      const clean = phone.replace(/\D/g, '').slice(-10);
      const res = await fetch(CUSTOMER_API.registerProfile, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: clean,
          name: name.trim(),
          city: city.trim(),
          email: email.trim() || undefined,
          tempToken
        })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to complete profile registration');
      }

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.55 }
      });

      login(data.customer, data.token);
      onClose();
      if (onNavigate) onNavigate('home');
    } catch (err) {
      setError(err.message || 'Registration error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-modal-backdrop" onClick={onClose}>
      <div 
        className="signin-modal-box" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        <button className="signin-modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Step 1: Mobile Phone Input */}
        {step === 1 && (
          <div className="signin-step-view">
            <div className="signin-header-badge">
              <Smartphone size={18} color="#FF2B85" />
              <span>CARFRND SECURE ACCESS</span>
            </div>

            <h3 className="signin-title">Sign In / Register</h3>
            <p className="signin-subtitle">
              Enter your mobile number to sign in or create your verified CarFrnd account.
            </p>

            {error && (
              <div className="signin-error-box">
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSendOtp} className="signin-form">
              <div className="signin-field-group">
                <label className="signin-field-label">Mobile Number</label>
                <div className="signin-phone-wrapper">
                  <div className="signin-country-tag">
                    <span className="country-flag">🇮🇳</span>
                    <span className="country-code">+91</span>
                  </div>
                  <input
                    type="tel"
                    placeholder="Enter 10-digit number"
                    value={phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setPhone(val);
                      if (error) setError('');
                    }}
                    autoFocus
                    required
                    className="signin-input signin-phone-input"
                    maxLength={10}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-primary signin-submit-btn" 
                disabled={loading || phone.length < 10}
              >
                {loading ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Sending Code...</span>
                  </>
                ) : (
                  <>
                    <span>Get Verification Code</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            
          </div>
        )}

        {/* Step 2: 4-digit OTP Verification */}
        {step === 2 && (
          <div className="signin-step-view">
            <div className="signin-header-badge">
              <ShieldCheck size={18} color="#FF2B85" />
              <span>VERIFY MOBILE</span>
            </div>

            <h3 className="signin-title">Enter Verification Code</h3>
            
            <div className="signin-phone-summary">
              <span>Code sent to <strong>+91 {phone}</strong></span>
              <button 
                type="button" 
                className="signin-change-phone-btn"
                onClick={() => setStep(1)}
              >
                <Edit2 size={12} />
                <span>Change</span>
              </button>
            </div>

            {error && (
              <div className="signin-error-box">
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); verifyOtpCode(); }} className="signin-form">
              <div className="signin-field-group">
                <label className="signin-field-label text-center">4-Digit SMS Code</label>
                <div className="signin-otp-grid">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (otpInputsRef.current[idx] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="signin-otp-cell"
                    />
                  ))}
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-primary signin-submit-btn"
                disabled={loading || otp.join('').length < 4}
              >
                {loading ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <span>Verify & Continue</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            <div className="signin-resend-row">
              {canResend ? (
                <button 
                  type="button" 
                  className="signin-resend-btn active"
                  onClick={handleResendOtp}
                  disabled={loading}
                >
                  <RotateCcw size={14} />
                  <span>Resend Code via SMS</span>
                </button>
              ) : (
                <span className="signin-timer-text">
                  Resend code in <strong>{timer}s</strong>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Step 3: First-time User Onboarding (Name, City, Optional Email) */}
        {step === 3 && (
          <div className="signin-step-view">
            <div className="signin-header-badge celebration">
              <Sparkles size={18} color="#FF2B85" />
              <span>WELCOME TO CARFRND</span>
            </div>

            <h3 className="signin-title">Complete Your Profile</h3>
            <p className="signin-subtitle">
              First time with CarFrnd! Please provide your name and city so we can personalize your dashboard and emergency alerts.
            </p>

            {error && (
              <div className="signin-error-box">
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleRegisterProfile} className="signin-form">
              {/* Full Name */}
              <div className="signin-field-group">
                <label className="signin-field-label">
                  <span>Full Name</span>
                  <span className="required-star">*</span>
                </label>
                <div className="signin-input-icon-wrap">
                  <User size={16} color="#64748B" className="field-icon" />
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoFocus
                    className="signin-input"
                  />
                </div>
              </div>

              {/* City */}
              <div className="signin-field-group">
                <label className="signin-field-label">
                  <span>Which City are you from?</span>
                  <span className="required-star">*</span>
                </label>
                <div className="signin-input-icon-wrap">
                  <MapPin size={16} color="#64748B" className="field-icon" />
                  <input
                    type="text"
                    placeholder="e.g. Bengaluru, Hyderabad, Mumbai..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="signin-input"
                  />
                </div>
                
                {/* Popular City Chips */}
                <div className="city-chips-list">
                  {POPULAR_CITIES.map((c) => (
                    <button
                      type="button"
                      key={c}
                      className={`city-chip ${city === c ? 'selected' : ''}`}
                      onClick={() => setCity(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email (Optional) */}
              <div className="signin-field-group">
                <label className="signin-field-label">
                  <span>Email Address</span>
                  <span className="optional-tag">(Optional)</span>
                </label>
                <div className="signin-input-icon-wrap">
                  <Mail size={16} color="#64748B" className="field-icon" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="signin-input"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-primary signin-submit-btn"
                disabled={loading || !name.trim() || !city.trim()}
              >
                {loading ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Setting up your account...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Complete & Enter CarFrnd</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>

      <style>{`
        .signin-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          animation: modalBackdropFade 0.25s ease-out;
        }

        .signin-modal-box {
          background: #FFFFFF;
          width: 100%;
          max-width: 480px;
          border-radius: 28px;
          border: 1px solid rgba(226, 232, 240, 0.95);
          box-shadow: 0 25px 60px -15px rgba(15, 23, 42, 0.35), 0 0 0 1px rgba(255, 43, 133, 0.12);
          padding: 36px 32px;
          position: relative;
          animation: modalBoxPop 0.28s cubic-bezier(0.16, 1, 0.3, 1);
          max-height: 92vh;
          overflow-y: auto;
        }

        .signin-modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 50%;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #64748B;
          transition: all 0.2s ease;
        }

        .signin-modal-close:hover {
          background: #F1F5F9;
          color: #0F172A;
          transform: rotate(90deg);
        }

        .signin-step-view {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .signin-header-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #FFF0F6;
          border: 1px solid rgba(255, 43, 133, 0.25);
          color: #FF2B85;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.5px;
          margin-bottom: 14px;
        }

        .signin-header-badge.celebration {
          background: #FDF4FF;
          border-color: #F0ABFC;
          color: #A21CAF;
        }

        .signin-title {
          font-size: 1.55rem;
          font-weight: 800;
          color: #0F172A;
          margin: 0 0 8px 0;
          letter-spacing: -0.4px;
        }

        .signin-subtitle {
          font-size: 0.9rem;
          line-height: 1.5;
          color: #64748B;
          margin: 0 0 24px 0;
          max-width: 380px;
        }

        .signin-phone-summary {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.85rem;
          color: #334155;
          margin-bottom: 22px;
        }

        .signin-change-phone-btn {
          border: none;
          background: none;
          color: #FF2B85;
          font-weight: 700;
          font-size: 0.82rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 3px;
          padding: 0;
        }

        .signin-change-phone-btn:hover {
          text-decoration: underline;
        }

        .signin-error-box {
          width: 100%;
          background: #FEF2F2;
          border: 1px solid #FECACA;
          color: #DC2626;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 0.84rem;
          font-weight: 600;
          margin-bottom: 18px;
          text-align: left;
        }

        .signin-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .signin-field-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          text-align: left;
        }

        .signin-field-label {
          font-size: 0.84rem;
          font-weight: 700;
          color: #334155;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .required-star {
          color: #EF4444;
        }

        .optional-tag {
          font-size: 0.75rem;
          font-weight: 500;
          color: #94A3B8;
        }

        .signin-phone-wrapper {
          display: flex;
          align-items: center;
          background: #F8FAFC;
          border: 1.5px solid #CBD5E1;
          border-radius: 14px;
          overflow: hidden;
          transition: all 0.2s ease;
        }

        .signin-phone-wrapper:focus-within {
          border-color: #FF2B85;
          background: #FFFFFF;
          box-shadow: 0 0 0 3px rgba(255, 43, 133, 0.15);
        }

        .signin-country-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #F1F5F9;
          padding: 12px 14px;
          border-right: 1px solid #CBD5E1;
          font-weight: 700;
          font-size: 0.92rem;
          color: #1E293B;
        }

        .signin-phone-input {
          flex: 1;
          border: none;
          background: transparent;
          padding: 12px 14px;
          font-size: 1.05rem;
          font-weight: 700;
          color: #0F172A;
          letter-spacing: 0.5px;
          outline: none;
        }

        .signin-input-icon-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .field-icon {
          position: absolute;
          left: 14px;
          pointer-events: none;
        }

        .signin-input {
          width: 100%;
          background: #F8FAFC;
          border: 1.5px solid #CBD5E1;
          border-radius: 12px;
          padding: 12px 14px 12px 42px;
          font-size: 0.92rem;
          font-weight: 600;
          color: #0F172A;
          outline: none;
          transition: all 0.2s ease;
        }

        .signin-input:focus {
          border-color: #FF2B85;
          background: #FFFFFF;
          box-shadow: 0 0 0 3px rgba(255, 43, 133, 0.15);
        }

        .city-chips-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 8px;
        }

        .city-chip {
          background: #F1F5F9;
          border: 1px solid #E2E8F0;
          color: #475569;
          padding: 4px 10px;
          border-radius: 16px;
          font-size: 0.76rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .city-chip:hover {
          border-color: #FF2B85;
          color: #FF2B85;
          background: #FFF0F6;
        }

        .city-chip.selected {
          background: #FF2B85;
          color: #FFFFFF;
          border-color: #FF2B85;
        }

        .signin-otp-grid {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin: 6px 0 10px;
        }

        .signin-otp-cell {
          width: 58px;
          height: 64px;
          border-radius: 14px;
          background: #F8FAFC;
          border: 2px solid #CBD5E1;
          font-size: 1.7rem;
          font-weight: 800;
          text-align: center;
          color: #0F172A;
          outline: none;
          transition: all 0.2s ease;
        }

        .signin-otp-cell:focus {
          border-color: #FF2B85;
          background: #FFFFFF;
          box-shadow: 0 0 0 4px rgba(255, 43, 133, 0.15);
        }

        .signin-submit-btn {
          width: 100%;
          padding: 14px;
          font-size: 0.98rem;
          font-weight: 800;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 6px;
          box-shadow: 0 6px 20px rgba(255, 43, 133, 0.35);
        }

        .signin-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          box-shadow: none;
        }

        .signin-resend-row {
          margin-top: 18px;
          font-size: 0.84rem;
        }

        .signin-timer-text {
          color: #64748B;
        }

        .signin-resend-btn {
          background: none;
          border: none;
          color: #FF2B85;
          font-weight: 700;
          font-size: 0.86rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px;
        }

        .signin-resend-btn:hover {
          text-decoration: underline;
        }

        .signin-security-footer {
          margin-top: 24px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          color: #059669;
          font-weight: 600;
        }

        @keyframes modalBackdropFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalBoxPop {
          from { transform: scale(0.92); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
