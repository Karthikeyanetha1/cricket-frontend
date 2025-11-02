import React, { useEffect, useState } from 'react';
import './App.css';
import BookingForm from './BookingForm';   // ✅ Import form

function App() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE}/bookings`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setBookings(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="App">
      <h1>📅 Booked Slots</h1>

      {/* ✅ Booking Form */}
      <BookingForm />

      {error && <p style={{ color: "red" }}>❌ {error}</p>}
      {bookings.length === 0 && !error ? (
        <p>Loading bookings...</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>
              {booking.name} booked for {booking.date} at {booking.time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
