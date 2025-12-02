import React, { useEffect, useState } from "react";

const API = "http://localhost:4000";

export default function Dashboard() {
  const [professionalId, setProfessionalId] = useState("");
  const [bookings, setBookings] = useState([]);
  const [professionals, setProfessionals] = useState([]);

  // Load all professionals once
  useEffect(() => {
    fetch(`${API}/professionals`)
      .then((r) => r.json())
      .then(setProfessionals);
  }, []);

  // Load bookings for selected professional
  useEffect(() => {
    if (!professionalId) return;

    fetch(`${API}/bookings?professionalId=${professionalId}`)
      .then((r) => r.json())
      .then(setBookings);
  }, [professionalId]);

  async function confirm(bookingId) {
    await fetch(`${API}/bookings/${bookingId}/confirm`, { method: "POST" });

    // Refresh bookings
    const resp = await fetch(`${API}/bookings?professionalId=${professionalId}`);
    setBookings(await resp.json());
  }

  return (
    <div>
      <h2>Professional Dashboard</h2>

      {/* Select Professional */}
      <div>
        <label>
          Choose professional:
          <select
            value={professionalId}
            onChange={(e) => setProfessionalId(e.target.value)}
          >
            <option value="">-- select --</option>

            {professionals.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {!professionalId && (
        <div style={{ marginTop: 12 }}>Select a professional to view bookings</div>
      )}

      {/* Show bookings */}
      {professionalId && bookings.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <h3>Bookings</h3>

          {bookings.map((b) => (
            <div
              key={b._id}
              style={{ border: "1px solid #ddd", padding: 8, marginBottom: 8 }}
            >
              <div>
                <strong>{b.clientName}</strong> — {b.clientEmail}
              </div>

              <div>
                Service:{" "}
                {b.slotId?.serviceId?.name || "Unknown Service"}
              </div>

              <div>
                Time:{" "}
                {b.slotId?.startIso
                  ? new Date(b.slotId.startIso).toLocaleString()
                  : "Unknown Time"}
              </div>

              <div>Status: {b.status}</div>

              <div style={{ marginTop: 6 }}>
                {b.status === "pending" && (
                  <button onClick={() => confirm(b._id)}>Confirm</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {professionalId && bookings.length === 0 && (
        <div style={{ marginTop: 12 }}>No bookings yet.</div>
      )}
    </div>
  );
}
