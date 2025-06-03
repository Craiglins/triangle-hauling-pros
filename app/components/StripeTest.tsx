"use client";
import { useState } from 'react';

export default function StripeTest() {
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [error, setError] = useState('');

  const handleCreatePaymentLink = async () => {
    setLoading(true);
    setPaymentUrl('');
    setError('');
    try {
      const res = await fetch('/api/create-payment-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 100, // $1.00 (change as needed)
          description: 'Test Service',
        }),
      });
      const data = await res.json();
      if (data.url) {
        setPaymentUrl(data.url);
      } else {
        setError(data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error creating payment link:', error);
      setError('Failed to create payment link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <button onClick={handleCreatePaymentLink} disabled={loading} style={{ padding: '12px 24px', fontSize: 16 }}>
        {loading ? 'Creating...' : 'Create Stripe Payment Link'}
      </button>
      {paymentUrl && (
        <div style={{ marginTop: 16 }}>
          <p>Payment Link:</p>
          <a href={paymentUrl} target="_blank" rel="noopener noreferrer">{paymentUrl}</a>
        </div>
      )}
      {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
    </div>
  );
} 