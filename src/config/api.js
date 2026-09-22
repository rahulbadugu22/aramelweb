/**
 * CarFrnd Website API Configuration
 * Connects to the CarFrnd Express Backend (Port 5000)
 */

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/+$/, '');

export const CUSTOMER_API = {
  sendOtp: `${API_BASE_URL}/api/customer/auth/send-otp`,
  verifyOtp: `${API_BASE_URL}/api/customer/auth/verify-otp`,
  registerProfile: `${API_BASE_URL}/api/customer/auth/register-profile`,
  resendOtp: `${API_BASE_URL}/api/customer/auth/resend-otp`,
  me: `${API_BASE_URL}/api/customer/auth/me`,
  activateTag: `${API_BASE_URL}/api/customer/qr/activate`
};

export const PUBLIC_API = {
  scanTag: (token) => `${API_BASE_URL}/api/public/qr/${token}`,
  verifyPlate: (token) => `${API_BASE_URL}/api/public/qr/${token}/verify-plate`,
  parkingReasons: `${API_BASE_URL}/api/settings/parking-reasons`,
  createAlert: `${API_BASE_URL}/api/public/alerts`
};
