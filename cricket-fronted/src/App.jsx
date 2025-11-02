import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    date: '',
    time: '',
  });

  const [message, setMessage] = useState('');
  const [bookings, setBookings] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://192.168.1.10:3000/bookings');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Booking...');
    try {
      const response = await fetch('http://192.168.1.10:3000/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('✅ Booking successful!');
        setFormData({ name: '', mobile: '', date: '', time: '' });
        fetchBookings(); // refresh bookings
      } else {
        setMessage('❌ Booking failed: ' + result.error);
      }
    } catch (err) {
      setMessage('❌ Server error. Please try again later.');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>🏏 Box Cricket Booking</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required /><br /><br />
        <input type="tel" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} required /><br /><br />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required /><br /><br />
        <select name="time" value={formData.time} onChange={handleChange} required>
          <option value="">Select Time Slot</option>
          <option value="6 AM - 7 AM">6 AM - 7 AM</option>
          <option value="7 AM - 8 AM">7 AM - 8 AM</option>
          <option value="5 PM - 6 PM">5 PM - 6 PM</option>
          <option value="6 PM - 7 PM">6 PM - 7 PM</option>
          <option value="7 PM - 8 PM">7 PM - 8 PM</option>
        </select><br /><br />
        <button type="submit">Book Now</button>
      </form>
      <p>{message}</p>

      <h3>📅 Current Bookings:</h3>
      <ul>
        {bookings.map((b) => (
          <li key={b._id}>
            <strong>{b.name}</strong> - {b.date} - {b.timeSlot}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
