import React, { useEffect, useState } from 'react';
import ProfessionalList from './components/ProfessionalList';
import Dashboard from './components/Dashboard';

export default function App() {
  const [view, setView] = useState('browse'); 
  const [selectedProfessional, setSelectedProfessional] = useState(null);

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui, Arial' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Online Appointment Booking System</h1>
        <div>
          <button onClick={() => setView('browse')} style={{ marginRight: 10 }}>Browse</button>
          <button onClick={() => setView('dashboard')}>Professional Dashboard</button>
        </div>
      </header>

      <main>
        {view === 'browse' && (
          <ProfessionalList onSelect={(p) => setSelectedProfessional(p)} selected={selectedProfessional} />
        )}

        {view === 'dashboard' && <Dashboard />}
      </main>
    </div>
  );
}
