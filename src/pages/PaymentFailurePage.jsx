// src/pages/PaymentFailurePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PaymentStatusPage.css';

const PaymentFailurePage = () => {
  return (
    <div className="payment-status-page failure">
      <div className="status-icon">✕</div>
      <h1>Payment Failed</h1>
      <p>Something went wrong. Please try again.</p>
      <Link to="/payment" className="retry-button">Retry Payment</Link>
    </div>
  );
};

export default PaymentFailurePage;