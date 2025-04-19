import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

// ✅ Use Vite env variable (restart server after updating .env)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, selectedSeats } = location.state || {};
  const [email, setEmail] = useState('');

  const rowPrices = (row) =>
    ['A', 'B', 'C'].includes(row) ? 500
    : ['D', 'E', 'F'].includes(row) ? 350
    : 200;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      customerEmail: email,
      items: selectedSeats.map((seat) => ({
        name: `${title} - Seat ${seat}`,
        amount: rowPrices(seat.charAt(0)) * 100,
        quantity: 1,
        currency: 'usd',
      })),
    };

    try {
      const response = await fetch('http://localhost:3000/api/payments/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.sessionId) {
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId });
        if (error) {
          console.error('Stripe redirect error:', error.message);
          alert('Stripe error: ' + error.message);
        }
      } else {
        alert('Failed to create payment session');
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert('Error processing payment');
    }
  };

  if (!title || !selectedSeats) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Missing booking information. Please select seats again.</div>;
  }

  const totalAmountCents = selectedSeats.reduce(
    (sum, seat) => sum + rowPrices(seat.charAt(0)) * 100,
    0
  );
  const totalAmountDollars = (totalAmountCents / 100).toFixed(2);

  return (
    <div className="payment-page" style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Payment for {title}</h2>
      <p>Seats: {selectedSeats.join(', ')}</p>
      <p>Total: ${totalAmountDollars}</p>

      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '1rem',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Pay ${totalAmountDollars}
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
