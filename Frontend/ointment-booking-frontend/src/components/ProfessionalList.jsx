import React, { useEffect, useState } from 'react';
import Availability from './Availability';

const API = 'http://localhost:4000';

export default function ProfessionalList({ onSelect, selected }) {
  const [profs, setProfs] = useState([]);

  useEffect(() => {
    fetch(`${API}/professionals`)
      .then(r => r.json())
      .then(setProfs);
  }, []);

  return (
    <div style={{ display: 'flex', gap: 20 }}>
      <div style={{ flex: 1 }}>
        <h2>Professionals</h2>
        {profs.map(p => (
          <div key={p._id} style={{ border: '1px solid #ddd', padding: 10, marginBottom: 8 }}>
            <strong>{p.name}</strong>
            <div style={{ fontSize: 13, color: '#555' }}>{p.bio}</div>
            <div style={{ marginTop: 8 }}>
              <button onClick={() => onSelect(p)}>View availability</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ flex: 2 }}>
        {selected ? (
          <Availability professional={selected} />
        ) : (
          <div>Select a professional to view availability</div>
        )}
      </div>
    </div>
  );
}
