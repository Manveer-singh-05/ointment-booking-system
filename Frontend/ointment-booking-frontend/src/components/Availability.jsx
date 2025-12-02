import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

const API = 'http://localhost:4000';

export default function Availability({ professional }) {
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [serviceId, setServiceId] = useState('');
  const [slots, setSlots] = useState([]);
  const [bookingResult, setBookingResult] = useState(null);

  useEffect(() => {
    fetchSlots();
  }, [date, serviceId, professional]);

  function fetchSlots() {
    let url = `${API}/professionals/${professional._id}/availability?date=${date}`;
    if (serviceId) url += `&serviceId=${serviceId}`;

    fetch(url)
      .then(r => r.json())
      .then(setSlots);
  }

  async function book(slotId) {
    const clientName = prompt('Your name');
    const clientEmail = prompt('Your email (optional)');
    if (!clientName) return alert('Name required');

    const resp = await fetch(`${API}/bookings`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ slotId, clientName, clientEmail })
    });

    if (resp.ok) {
      const data = await resp.json();
      setBookingResult({ success: true, booking: data });
      fetchSlots();
    } else {
      const err = await resp.json();
      setBookingResult({ success: false, error: err });
    }
  }

  return (
    <div>
      <h3>Availability — {professional.name}</h3>
      <div style={{ marginBottom: 10 }}>
        <label>Date: <input type="date" value={date} onChange={e => setDate(e.target.value)} /></label>

        <label style={{ marginLeft: 8 }}>Service:
          <select value={serviceId} onChange={e => setServiceId(e.target.value)}>
            <option value="">All</option>
            {professional.services.map(s => (
              <option key={s._id} value={s._id}>
                {s.name} ({s.durationMinutes}m)
              </option>
            ))}
          </select>
        </label>

        <button style={{ marginLeft: 8 }} onClick={fetchSlots}>Refresh</button>
      </div>

      <div>
        {slots.length === 0 && <div>No slots for this date.</div>}

        {slots.map(slot => (
          <div key={slot.id} style={{ border: '1px solid #eee', padding: 8, marginBottom: 6 }}>
            <div>
              <strong>{new Date(slot.startIso).toLocaleString()}</strong>
              &nbsp;— {slot.serviceName} ({slot.durationMinutes}m)
            </div>
            <div style={{ marginTop: 6 }}>
              <button onClick={() => book(slot.id)}>Book</button>
            </div>
          </div>
        ))}
      </div>

      {bookingResult && bookingResult.success && (
        <div style={{ marginTop: 12, padding: 10, border: '1px solid green', background: '#f4fff4' }}>
          Booking created! ID: {bookingResult.booking._id}
        </div>
      )}

      {bookingResult && bookingResult.success === false && (
        <div style={{ marginTop: 12, padding: 10, border: '1px solid red', background: '#fff4f4' }}>
          Error: {bookingResult.error && bookingResult.error.error}
        </div>
      )}
    </div>
  );
}
