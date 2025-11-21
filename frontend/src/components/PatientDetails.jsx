import React from 'react';

function PatientDetails({ patient, onBack }) {
  if (!patient) return null;

  return (
    <div style={styles.container}>
      <button onClick={onBack} style={styles.backBtn}>← Back to Dashboard</button>
      
      <div style={styles.card}>
        <div style={styles.header}>
          <h2>Patient Profile</h2>
          <span style={styles.idTag}>ID: {patient.id}</span>
        </div>

        <div style={styles.infoGroup}>
          <label style={styles.label}>Full Name:</label>
          <div style={styles.value}>{patient.name}</div>
        </div>

        <div style={styles.infoGroup}>
          <label style={styles.label}>Age:</label>
          <div style={styles.value}>{patient.age} years old</div>
        </div>

        <div style={styles.infoGroup}>
          <label style={styles.label}>Status:</label>
          <div style={styles.value}>
             <span style={styles.statusBadge}>Admitted</span>
          </div>
        </div>

        {/* Mock Data for demonstration */}
        <div style={styles.infoGroup}>
          <label style={styles.label}>Diagnosis:</label>
          <p style={styles.value}>
            Standard checkup required. Patient reports mild symptoms. 
            (This is a placeholder for future database data).
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto'
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#3498db',
    fontSize: '1rem',
    cursor: 'pointer',
    marginBottom: '20px',
    fontWeight: 'bold'
  },
  card: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid #f0f2f5',
    paddingBottom: '15px',
    marginBottom: '20px'
  },
  idTag: {
    backgroundColor: '#ecf0f1',
    padding: '5px 10px',
    borderRadius: '15px',
    fontSize: '0.8rem',
    color: '#7f8c8d'
  },
  infoGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    color: '#95a5a6',
    fontSize: '0.9rem',
    marginBottom: '5px',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  value: {
    fontSize: '1.1rem',
    color: '#2c3e50',
    fontWeight: '500'
  },
  statusBadge: {
    backgroundColor: '#2ecc71',
    color: 'white',
    padding: '5px 12px',
    borderRadius: '20px',
    fontSize: '0.9rem'
  }
};

export default PatientDetails;