import React from 'react';
import './BookingModal.css';
import { useNavigate } from 'react-router-dom';

const BookingModal = ({ event, onClose }) => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/select-seats', { state: { event } });
  };

  return (
    <div className="modal-overlay">
      <div className="booking-modal">
        <div className="modal-header">
          <h2>{event.title}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <p>Select your seats on the next page</p>
        <button onClick={handleContinue} className="confirm-btn">Continue to Seat Map</button>
      </div>
    </div>
  );
};

export default BookingModal;