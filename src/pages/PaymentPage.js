// src/pages/PaymentPage.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentPage.css';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, price, quantity } = location.state || {};
  
  // Default values if no data is passed
  const eventTitle = title || "Coldplay Concert";
  const ticketPrice = price || 3500;
  const ticketQty = quantity || 2;
  const subtotal = ticketPrice * ticketQty;
  const tax = subtotal * 0.05;
  const total = subtotal + tax;
  
  // Form state
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  // Card details
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('United States');
  
  // Bank details
  const [routingNumber, setRoutingNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  
  // Form validation
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    
    // Payment method validation
    if (paymentMethod === 'card') {
      if (!cardNumber) newErrors.cardNumber = "Card number is required";
      else if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) 
        newErrors.cardNumber = "Card number must be 16 digits";
      
      if (!expiry) newErrors.expiry = "Expiration date is required";
      else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) 
        newErrors.expiry = "Expiration date must be MM/YY";
      
      if (!cvc) newErrors.cvc = "Security code is required";
      else if (!/^\d{3,4}$/.test(cvc)) 
        newErrors.cvc = "Security code must be 3 or 4 digits";
      
      if (!zipCode) newErrors.zipCode = "ZIP code is required";
    } else if (paymentMethod === 'bank') {
      if (!routingNumber) newErrors.routingNumber = "Routing number is required";
      else if (!/^\d{9}$/.test(routingNumber)) 
        newErrors.routingNumber = "Routing number must be 9 digits";
      
      if (!accountNumber) newErrors.accountNumber = "Account number is required";
      else if (!/^\d{8,17}$/.test(accountNumber)) 
        newErrors.accountNumber = "Account number must be 8-17 digits";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleExpressCheckout = (method) => {
    if (!email) {
      setErrors({email: "Email is required for express checkout"});
      return;
    }
    
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/payment-success');
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        navigate('/payment-success');
      }, 2000);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-form-section">
        <form onSubmit={handleSubmit}>
          {/* Express Checkout */}
          <div className="express-checkout">
            <button 
              type="button"
              className="link-pay-button" 
              onClick={() => handleExpressCheckout('link')}
              disabled={isProcessing}
            >
              <span className="link-icon">↗</span>
              Pay with Link
            </button>
            <button 
              type="button"
              className="gpay-button" 
              onClick={() => handleExpressCheckout('gpay')}
              disabled={isProcessing}
            >
              <span className="gpay-icon">G</span> Pay
            </button>
            <div className="separator">
              <span>See more ▼</span>
            </div>
          </div>

          {/* Contact info */}
          <div className="contact-info">
            <h3>Contact info</h3>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email"
                placeholder="you@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>
          </div>

          {/* Payment method */}
          <div className="payment-method">
            <h3>Payment method</h3>
            <div className="payment-options">
              {/* Card option */}
              <div className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  id="card" 
                  name="payment" 
                  checked={paymentMethod === 'card'} 
                  onChange={() => setPaymentMethod('card')}
                />
                <label htmlFor="card">
                  <span className="card-icon">💳</span> Card
                </label>
              </div>
              
              {/* Card details */}
              {paymentMethod === 'card' && (
                <div className="card-details">
                  <div className="form-group">
                    <label>Card number</label>
                    <input 
                      type="text" 
                      placeholder="1234 1234 1234 1234" 
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className={errors.cardNumber ? 'error' : ''}
                    />
                    {errors.cardNumber && <div className="error-message">{errors.cardNumber}</div>}
                    <div className="card-icons">
                      <span>Visa</span>
                      <span>Mastercard</span>
                      <span>Amex</span>
                    </div>
                  </div>
                  
                  <div className="input-row">
                    <div className="form-group half">
                      <label>Expiration date</label>
                      <input 
                        type="text" 
                        placeholder="MM / YY" 
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className={errors.expiry ? 'error' : ''}
                      />
                      {errors.expiry && <div className="error-message">{errors.expiry}</div>}
                    </div>
                    <div className="form-group half">
                      <label>Security code</label>
                      <input 
                        type="text" 
                        placeholder="CVC" 
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        className={errors.cvc ? 'error' : ''}
                      />
                      {errors.cvc && <div className="error-message">{errors.cvc}</div>}
                    </div>
                  </div>
                  
                  <div className="input-row">
                    <div className="form-group half">
                      <label>Country</label>
                      <select value={country} onChange={(e) => setCountry(e.target.value)}>
                        <option>United States</option>
                        <option>India</option>
                        <option>Canada</option>
                      </select>
                    </div>
                    <div className="form-group half">
                      <label>ZIP code</label>
                      <input 
                        type="text" 
                        placeholder="12345" 
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        className={errors.zipCode ? 'error' : ''}
                      />
                      {errors.zipCode && <div className="error-message">{errors.zipCode}</div>}
                    </div>
                  </div>
                </div>
              )}
              
              {/* US Bank Account option */}
              <div className={`payment-option ${paymentMethod === 'bank' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  id="bank" 
                  name="payment"
                  checked={paymentMethod === 'bank'}
                  onChange={() => setPaymentMethod('bank')}
                />
                <label htmlFor="bank">
                  <span className="bank-icon">🏦</span> US bank account
                </label>
              </div>
              
              {/* Bank details */}
              {paymentMethod === 'bank' && (
                <div className="bank-details">
                  <div className="form-group">
                    <label>Routing number</label>
                    <input 
                      type="text" 
                      placeholder="123456789" 
                      value={routingNumber}
                      onChange={(e) => setRoutingNumber(e.target.value)}
                      className={errors.routingNumber ? 'error' : ''}
                    />
                    {errors.routingNumber && <div className="error-message">{errors.routingNumber}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label>Account number</label>
                    <input 
                      type="text" 
                      placeholder="12345678" 
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className={errors.accountNumber ? 'error' : ''}
                    />
                    {errors.accountNumber && <div className="error-message">{errors.accountNumber}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label>Account type</label>
                    <select>
                      <option>Checking</option>
                      <option>Savings</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit button */}
          <button 
            type="submit" 
            className="pay-button" 
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
          </button>
        </form>
      </div>
      
      {/* Order Summary */}
      <div className="order-summary">
        <h3>Order Summary</h3>
        <div className="product-item">
          <img src="https://via.placeholder.com/50" alt="Event Poster" />
          <div>
            <h4>{eventTitle}</h4>
            <p>Qty: {ticketQty}</p>
          </div>
        </div>
        
        <div className="summary-totals">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Tax (5%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;