import React, { createContext, useContext, useState, useEffect } from 'react';
import { CUSTOMER_API } from '../config/api';

const CustomerAuthContext = createContext(null);

export function CustomerAuthProvider({ children }) {
  const [customer, setCustomer] = useState(() => {
    try {
      const saved = localStorage.getItem('carfrnd_customer_data');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('carfrnd_customer_token') || null;
    } catch {
      return null;
    }
  });

  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const login = (customerData, tokenData) => {
    setCustomer(customerData);
    setToken(tokenData);
    try {
      localStorage.setItem('carfrnd_customer_data', JSON.stringify(customerData));
      localStorage.setItem('carfrnd_customer_token', tokenData);
    } catch (e) {
      console.error('Failed to save session to localStorage:', e);
    }
    setIsSignInModalOpen(false);
    showToast(`Welcome to CarFrnd, ${customerData.name || 'Member'}!`, 'success');
  };

  const logout = () => {
    setCustomer(null);
    setToken(null);
    try {
      localStorage.removeItem('carfrnd_customer_data');
      localStorage.removeItem('carfrnd_customer_token');
    } catch (e) {
      console.error('Failed to clear session:', e);
    }
    setIsSignOutModalOpen(false);
    showToast('You have been safely signed out.', 'info');
  };

  const refreshCustomer = async () => {
    if (!token) return;
    try {
      const res = await fetch(CUSTOMER_API.me, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.customer) {
          setCustomer(data.customer);
          localStorage.setItem('carfrnd_customer_data', JSON.stringify(data.customer));
        }
      } else if (res.status === 401) {
        logout();
      }
    } catch (err) {
      console.warn('Could not refresh customer profile:', err);
    }
  };

  useEffect(() => {
    if (token) {
      refreshCustomer();
    }
  }, [token]);

  return (
    <CustomerAuthContext.Provider
      value={{
        customer,
        token,
        isLoggedIn: Boolean(customer && token),
        login,
        logout,
        refreshCustomer,
        isSignInModalOpen,
        openSignInModal: () => setIsSignInModalOpen(true),
        closeSignInModal: () => setIsSignInModalOpen(false),
        isSignOutModalOpen,
        openSignOutModal: () => setIsSignOutModalOpen(true),
        closeSignOutModal: () => setIsSignOutModalOpen(false),
        toast,
        showToast
      }}
    >
      {children}

      {/* Global Toast Notification */}
      {toast && (
        <div className="customer-auth-toast">
          <div className="toast-content">
            <span className="toast-dot"></span>
            <span>{toast.message}</span>
          </div>
          <style>{`
            .customer-auth-toast {
              position: fixed;
              bottom: 24px;
              right: 24px;
              z-index: 99999;
              background: #0F172A;
              color: #FFFFFF;
              padding: 12px 20px;
              border-radius: 12px;
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
              border: 1px solid rgba(255, 43, 133, 0.4);
              animation: toastSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
              font-size: 0.88rem;
              font-weight: 600;
              display: flex;
              align-items: center;
              gap: 10px;
            }
            .toast-content {
              display: flex;
              align-items: center;
              gap: 10px;
            }
            .toast-dot {
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: #FF2B85;
              box-shadow: 0 0 10px #FF2B85;
            }
            @keyframes toastSlideIn {
              from { transform: translateY(20px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
            @media (max-width: 600px) {
              .customer-auth-toast {
                left: 20px;
                right: 20px;
                bottom: 80px;
                text-align: center;
                justify-content: center;
              }
            }
          `}</style>
        </div>
      )}
    </CustomerAuthContext.Provider>
  );
}

export function useCustomerAuth() {
  const context = useContext(CustomerAuthContext);
  if (!context) {
    throw new Error('useCustomerAuth must be used within a CustomerAuthProvider');
  }
  return context;
}
