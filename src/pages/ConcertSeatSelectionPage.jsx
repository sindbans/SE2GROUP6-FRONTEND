// src/pages/ConcertSeatSelectionPage.js
import React, { useState } from 'react';
import './ConcertSeatSelectionPage.css';
import { useLocation, useNavigate } from 'react-router-dom';

const ConcertSeatSelectionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event } = location.state || {};
  const [selectedSeats, setSelectedSeats] = useState([]);

  const zones = [
    { label: 'Platinum', price: 500, rows: ['A', 'B', 'C'], colorClass: 'platinum' },
    { label: 'Gold', price: 350, rows: ['D', 'E', 'F'], colorClass: 'gold' },
    { label: 'Silver', price: 200, rows: ['G', 'H', 'I'], colorClass: 'silver' }
  ];

  const seatsPerRow = 18;

  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const getSeatPrice = (seat) => {
    const row = seat.charAt(0);
    for (const zone of zones) {
      if (zone.rows.includes(row)) return zone.price;
    }
    return 0;
  };

  const handlePayment = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }
    navigate('/payment', {
      state: {
        title: event?.title || "Concert",
        quantity: selectedSeats.length,
        price: selectedSeats.reduce((sum, s) => sum + getSeatPrice(s), 0) / selectedSeats.length,
        selectedSeats
      }
    });
  };

  return (
    <div className="concert-seat-container">
      <h2>Select Seats for {event?.title || "Concert"}</h2>

      <div className="stage">STAGE</div>

      <div className="concert-seat-map">
        {zones.map((zone) => (
          <div key={zone.label}>
            <h3 className={`zone-label ${zone.colorClass}`}>{zone.label} (${zone.price})</h3>
            {zone.rows.map((row) => (
              <div key={row} className="concert-seat-row">
                <div className="row-label">{row}</div>
                <div className="concert-seat-block">
                  {Array.from({ length: seatsPerRow }, (_, i) => {
                    const seatId = `${row}${i + 1}`;
                    return (
                      <div
                        key={seatId}
                        className={`concert-seat ${zone.colorClass} ${selectedSeats.includes(seatId) ? 'selected' : ''}`}
                        onClick={() => toggleSeat(seatId)}
                      >
                        {seatId}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="concert-summary">
        <p>Selected Seats: {selectedSeats.join(', ') || 'None'}</p>
        <p>Total Price: ${selectedSeats.reduce((sum, s) => sum + getSeatPrice(s), 0)}</p>
        <button className="pay-btn" onClick={handlePayment}>
          Continue to Payment ({selectedSeats.length} seats)
        </button>
      </div>
    </div>
  );
};

export default ConcertSeatSelectionPage;