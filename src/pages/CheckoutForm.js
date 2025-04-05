// src/pages/CheckoutForm.js
import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    // Simulate payment confirmation
    setMessage('Processing payment...');
    setTimeout(() => {
      setMessage('Payment successful! Redirecting...');
      window.location.href = '/payment-success'; // Simulate success redirection
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Stripe Payment Element */}
      <PaymentElement />
      {/* Submit Button */}
      <button type="submit" className="pay-button">Pay Now</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default CheckoutForm;
