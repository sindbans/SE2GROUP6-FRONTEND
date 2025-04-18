import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [sessionDetails, setSessionDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/payment/session/${sessionId}`);
        const data = await res.json();
        setSessionDetails(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching session:', err);
        setLoading(false);
      }
    };

    if (sessionId) {
      fetchSession();
    }
  }, [sessionId]);

  if (loading) return <div style={{ padding: '50px' }}>Loading...</div>;

  if (!sessionDetails) return <div style={{ padding: '50px' }}>Session not found.</div>;

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>✅ Payment Successful!</h2>
      <p>Thank you for booking <strong>{sessionDetails.metadata?.eventTitle || 'an event'}</strong>.</p>
      <p><strong>Confirmation sent to:</strong> {sessionDetails.customer_email}</p>
      <p><strong>Seats:</strong> {sessionDetails.metadata?.selectedSeats || 'N/A'}</p>
      <p><strong>Total Paid:</strong> ${sessionDetails.amount_total / 100}</p>
      <p>Enjoy your event! 🎉</p>
    </div>
  );
};

export default PaymentSuccessPage;