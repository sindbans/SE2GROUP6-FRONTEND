// src/components/BookingModal.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingModal.css';

const BookingModal = ({ event, onClose }) => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState(1);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate with full event and user details
    navigate('/payment', {
      state: {
        title: event.title,
        price: event.price,
        quantity: tickets,
        userDetails
      }
    });
  };

  return (
    <div className="modal-overlay">
      <div className="booking-modal">
        <div className="modal-header">
          <h2>{event.title}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label>Number of Tickets</label>
            <select
              value={tickets}
              onChange={(e) => setTickets(Number(e.target.value))}
            >
              {[...Array(10).keys()].map(num => (
                <option key={num + 1} value={num + 1}>{num + 1}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Full Name"
              required
              value={userDetails.name}
              onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              required
              value={userDetails.email}
              onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <input
              type="tel"
              placeholder="Phone Number"
              required
              value={userDetails.phone}
              onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
            />
          </div>

          <div className="price-summary">
            <div className="summary-item">
              <span>Price per Ticket</span>
              <span>₹{event.price}</span>
            </div>
            <div className="summary-item total">
              <span>Total</span>
              <span>₹{event.price * tickets}</span>
            </div>
          </div>

          <button type="submit" className="confirm-btn">
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
