import React, { useState } from "react";

const BookingForm = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Submitting...");

    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE}/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, mobile, date, time }),
      });

      if (!res.ok) {
        const err = await res.json();
        setMessage(`❌ ${err.error}`);
        return;
      }

      setMessage("✅ Booking successful!");
      setName("");
      setMobile("");
      setDate("");
      setTime("");
    } catch (error) {
      setMessage("❌ Error submitting booking");
    }
  };

  return (
    <div style={{ margin: "20px", padding: "20px", border: "1px solid #ccc" }}>
      <h2>📌 Book a Slot</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", padding: "5px" }}
        />
        <input
          type="text"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", padding: "5px" }}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", padding: "5px" }}
        />
        <input
          type="text"
          placeholder="Time (e.g. 6PM - 7PM)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", padding: "5px" }}
        />
        <button type="submit" style={{ padding: "8px 12px" }}>
          🚀 Submit
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BookingForm;
