import React from 'react';

function Medications() {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Medications</h1>
        <button style={styles.primaryBtn}>+ Request Refill</button>
      </div>

      <h3 style={styles.sectionTitle}>Active Prescriptions</h3>
      <div style={styles.grid}>
        <MedCard name="Amoxicillin" dose="500mg" freq="3x daily" remaining="5 days left" />
        <MedCard name="Paracetamol" dose="500mg" freq="As needed" remaining="20 tablets" />
        <MedCard name="Vitamin C" dose="1000mg" freq="1x daily" remaining="15 days left" />
      </div>
    </div>
  );
}

function MedCard({ name, dose, freq, remaining }) {
  return (
    <div style={styles.card}>
      <div style={styles.icon}>💊</div>
      <h3 style={styles.medName}>{name}</h3>
      <div style={styles.doseTag}>{dose}</div>
      <div style={styles.details}>
        <div>Frequency: <strong>{freq}</strong></div>
        <div style={{marginTop: '5px', color: '#e53e3e'}}>{remaining}</div>
      </div>
      <button style={styles.refillBtn}>Refill</button>
    </div>
  );
}

const styles = {
  container: { padding: '40px', width: '100%', maxWidth: '1200px', margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
  pageTitle: { fontSize: '2rem', fontWeight: '700', color: '#1a202c', margin: 0 },
  sectionTitle: { fontSize: '1.1rem', color: '#718096', marginBottom: '20px' },
  primaryBtn: { padding: '10px 20px', backgroundColor: '#5865F2', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' },
  card: { backgroundColor: 'white', borderRadius: '12px', padding: '25px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' },
  icon: { fontSize: '2.5rem', marginBottom: '10px' },
  medName: { fontSize: '1.2rem', fontWeight: '700', color: '#2d3748', margin: '0 0 5px 0' },
  doseTag: { backgroundColor: '#f0f2f5', padding: '4px 10px', borderRadius: '15px', fontSize: '0.85rem', color: '#4a5568', marginBottom: '20px', fontWeight: '600' },
  details: { fontSize: '0.9rem', color: '#718096', marginBottom: '20px', width: '100%' },
  refillBtn: { width: '100%', padding: '10px', backgroundColor: 'white', border: '1px solid #5865F2', color: '#5865F2', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', transition: '0.2s' }
};

export default Medications;