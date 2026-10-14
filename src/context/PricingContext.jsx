import React, { createContext, useContext, useState, useEffect } from 'react';
import { PUBLIC_API } from '../config/api';

const PricingContext = createContext({
  customerPrice: 450,
  mrp: 799,
  basePrice: 25,
  gstRate: 18,
  gstEnabled: true,
  loading: false
});

export function PricingProvider({ children }) {
  const [pricing, setPricing] = useState(() => {
    try {
      const saved = localStorage.getItem('carfrnd_web_pricing');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      customerPrice: 450,
      mrp: 799,
      basePrice: 25,
      gstRate: 18,
      gstEnabled: true
    };
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        setLoading(true);
        const res = await fetch(PUBLIC_API.pricing || 'http://localhost:5000/api/settings/pricing');
        if (res.ok) {
          const data = await res.json();
          const newPricing = {
            customerPrice: parseFloat(data.customer_price) || 450,
            mrp: parseFloat(data.mrp) || 799,
            basePrice: parseFloat(data.base_price) || 25,
            gstRate: parseFloat(data.gst_rate) || 18,
            gstEnabled: data.gst_enabled !== false
          };
          setPricing(newPricing);
          try {
            localStorage.setItem('carfrnd_web_pricing', JSON.stringify(newPricing));
          } catch {}
        }
      } catch (err) {
        console.warn('Could not fetch dynamic pricing from backend, using default/cached:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPricing();
  }, []);

  return (
    <PricingContext.Provider value={{ ...pricing, loading }}>
      {children}
    </PricingContext.Provider>
  );
}

export function usePricing() {
  const context = useContext(PricingContext);
  if (!context) {
    return {
      customerPrice: 450,
      mrp: 799,
      basePrice: 25,
      gstRate: 18,
      gstEnabled: true,
      loading: false
    };
  }
  return context;
}
