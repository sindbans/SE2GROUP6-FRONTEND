// src/pages/SeatSelectionPage.js
import React, { useState } from 'react';
import './SeatSelectionPage.css';
import { useLocation, useNavigate } from 'react-router-dom';

const SeatSelectionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title = "Untitled Event", price = 250 } = location.state || {};
  const [selectedSeats, setSelectedSeats] = useState([]);

  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // A, B are at bottom near screen
  const rowPrices = row => ['A', 'B'].includes(row) ? 150 : 250;
  const seatsPerBlock = { left: 6, center: 12, right: 6 };

  const toggleSeat = (seat) => {
    setSelectedSeats(prev =>
      prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]
    );
  };

  const handlePayment = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }
    navigate('/payment', {
      state: {
        title,
        quantity: selectedSeats.length,
        price: selectedSeats.reduce((sum, seat) => {
          const row = seat.charAt(0);
          return sum + rowPrices(row);
        }, 0) / selectedSeats.length,
        selectedSeats,
      }
    });
  };

  return (
    <div className="seat-selection-container">
      <h2>Select Seats for {title}</h2>

      <div className="seat-map">
        {rows.map(row => (
          <div
            className={`seat-row ${['A', 'B'].includes(row) ? 'low-price-row' : ''}`}
            key={row}
          >
            <div className="row-label">{row}</div>

            {/* Left block */}
            <div className="seat-block">
              {Array.from({ length: seatsPerBlock.left }, (_, i) => {
                const seatId = `${row}${i + 1}`;
                return (
                  <div
                    key={seatId}
                    className={`seat ${selectedSeats.includes(seatId) ? 'selected' : ''}`}
                    onClick={() => toggleSeat(seatId)}
                  >
                    {i + 1}
                  </div>
                );
              })}
            </div>

            <div className="block-gap" />

            {/* Center block */}
            <div className="seat-block">
              {Array.from({ length: seatsPerBlock.center }, (_, i) => {
                const seatId = `${row}${i + seatsPerBlock.left + 1}`;
                return (
                  <div
                    key={seatId}
                    className={`seat ${selectedSeats.includes(seatId) ? 'selected' : ''}`}
                    onClick={() => toggleSeat(seatId)}
                  >
                    {i + seatsPerBlock.left + 1}
                  </div>
                );
              })}
            </div>

            <div className="block-gap" />

            {/* Right block */}
            <div className="seat-block">
              {Array.from({ length: seatsPerBlock.right }, (_, i) => {
                const seatId = `${row}${i + seatsPerBlock.left + seatsPerBlock.center + 1}`;
                return (
                  <div
                    key={seatId}
                    className={`seat ${selectedSeats.includes(seatId) ? 'selected' : ''}`}
                    onClick={() => toggleSeat(seatId)}
                  >
                    {i + seatsPerBlock.left + seatsPerBlock.center + 1}
                  </div>
                );
              })}
            </div>
          </div>
        )).reverse() /* ⬅️ Reverse to show A/B at bottom */}
      </div>

      <div className="screen">SCREEN</div>

      <div className="summary">
        <p>Selected Seats: {selectedSeats.join(', ') || 'None'}</p>
        <p>Total Price: ₹{selectedSeats.reduce((sum, seat) => sum + rowPrices(seat.charAt(0)), 0)}</p>
        <button className="pay-btn" onClick={handlePayment}>
          Continue to Payment ({selectedSeats.length} seats)
        </button>
      </div>
    </div>
  );
};

export default SeatSelectionPage;
