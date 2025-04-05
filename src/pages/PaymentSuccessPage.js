// src/pages/PaymentSuccessPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './PaymentStatusPage.css';

const PaymentSuccessPage = () => {
  return (
    <div className="payment-status-page success">
      <div className="status-icon">✓</div>
      <h1>Payment Successful!</h1>
      <p>Your ticket details will be sent to your email shortly.</p>
      <Link to="/" className="back-button">Go Back to Home</Link>
    </div>
  );
};

export default PaymentSuccessPage;

