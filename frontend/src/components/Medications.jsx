import React from 'react';

function Medications() {
  // Mock data based on the reference image
  const medications = [
    { name: "Lisinopril", dose: "10 mg", schedule: "Once daily, in the morning" },
    { name: "Metformin", dose: "500 mg", schedule: "Twice daily, with meals" },
    { name: "Atorvastatin", dose: "20 mg", schedule: "Once daily, at bedtime" },
    { name: "Amoxicillin", dose: "250 mg", schedule: "Three times daily, with food for 7 days" },
    { name: "Omeprazole", dose: "20 mg", schedule: "Once daily, 30 mins before breakfast" },
    { name: "Ibuprofen", dose: "400 mg", schedule: "Every 4-6 hours as needed for pain" },
  ];

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Medication Management</h1>
        <button style={styles.primaryBtn}>+ Add New Medication</button>
      </div>

      {/* Content Card */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}>Current Medications</h3>
          <p style={styles.cardSubtitle}>Overview of your prescribed medications and their schedules.</p>
        </div>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.headerRow}>
                <th style={styles.th}>MEDICATION NAME</th>
                <th style={styles.th}>DOSAGE</th>
                <th style={styles.th}>SCHEDULE</th>
                <th style={{...styles.th, textAlign: 'right', paddingRight: '20px'}}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {medications.map((med, index) => (
                <TableRow key={index} data={med} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TableRow({ data }) {
  return (
    <tr style={styles.row}>
      <td style={styles.td}>
        {/* Added the Pill Icon here */}
        <div style={styles.nameWrapper}>
          <span style={styles.pillIcon}>💊</span>
          <span style={{fontWeight: '700', color: '#2d3748'}}>{data.name}</span>
        </div>
      </td>
      <td style={styles.td}>{data.dose}</td>
      <td style={styles.td}>{data.schedule}</td>
      <td style={{...styles.td, textAlign: 'right'}}>
        <div style={styles.actions}>
          {/* Edit Button (Pencil) */}
          <button style={styles.iconBtn} title="Edit">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5865F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          {/* Delete Button (Trash) */}
          <button style={styles.deleteBtn} title="Delete">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}

const styles = {
  container: { 
    padding: '40px', 
    width: '100%', 
    maxWidth: '1200px', 
    margin: '0 auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  header: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: '30px' 
  },
  pageTitle: { 
    fontSize: '2rem', 
    fontWeight: '700', 
    color: '#1a202c', 
    margin: 0 
  },
  primaryBtn: { 
    padding: '10px 20px', 
    backgroundColor: '#5865F2', 
    color: 'white', 
    border: 'none', 
    borderRadius: '6px', 
    fontWeight: '600', 
    cursor: 'pointer',
    fontSize: '0.9rem',
    boxShadow: '0 2px 5px rgba(88, 101, 242, 0.3)'
  },
  card: { 
    backgroundColor: 'white', 
    borderRadius: '12px', 
    padding: '30px', 
    border: '1px solid #e2e8f0', 
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)' 
  },
  cardHeader: { marginBottom: '25px' },
  cardTitle: { 
    fontSize: '1.25rem', 
    fontWeight: '700', 
    color: '#2d3748', 
    margin: '0 0 5px 0' 
  },
  cardSubtitle: { 
    fontSize: '0.9rem', 
    color: '#718096', 
    margin: 0 
  },
  tableWrapper: { overflowX: 'auto' },
  table: { 
    width: '100%', 
    borderCollapse: 'separate', 
    borderSpacing: '0' 
  },
  headerRow: { textAlign: 'left' },
  th: { 
    padding: '15px 10px', 
    color: '#718096', 
    fontSize: '0.75rem', 
    textTransform: 'uppercase', 
    fontWeight: '700', 
    letterSpacing: '0.05em',
    borderBottom: '1px solid #e2e8f0'
  },
  row: { 
    transition: 'background-color 0.2s' 
  },
  td: { 
    padding: '20px 10px', 
    color: '#4a5568', 
    fontSize: '0.9rem', 
    verticalAlign: 'middle',
    borderBottom: '1px solid #f7fafc'
  },
  nameWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  pillIcon: {
    fontSize: '1.5rem',
    lineHeight: '1'
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    alignItems: 'center'
  },
  iconBtn: { 
    background: 'none', 
    border: 'none', 
    cursor: 'pointer', 
    padding: '6px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s'
  },
  deleteBtn: {
    backgroundColor: '#e53e3e', // Red background
    border: 'none',
    cursor: 'pointer',
    padding: '6px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
  }
};

export default Medications;