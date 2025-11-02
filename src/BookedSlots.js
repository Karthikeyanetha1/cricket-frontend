import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3000';

const BookedSlots = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const url = `${API_BASE}/bookings`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setBookings(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching bookings:', err);
        setError('Could not load bookings. Please try again.');
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>📅 Booked Slots</h1>

      <p style={{ fontSize: 12, opacity: 0.7, marginTop: -6 }}>
        API: {API_BASE}
      </p>

      {loading && <p>🔄 Loading bookings...</p>}
      {!loading && error && <p>❌ {error}</p>}
      {!loading && !error && bookings.length === 0 && <p>No bookings found.</p>}

      {!loading && !error && bookings.length > 0 && (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {bookings.map((b, i) => (
            <li
              key={i}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                marginBottom: '10px',
              }}
            >
              <p><strong>Name:</strong> {b.name}</p>
              <p><strong>Mobile:</strong> {b.mobile}</p>
              <p><strong>Date:</strong> {b.date}</p>
              <p><strong>Time Slot:</strong> {b.time}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookedSlots;
