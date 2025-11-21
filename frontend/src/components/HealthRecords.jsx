import React from 'react';

function HealthRecords() {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Health Records</h1>
        <button style={styles.primaryBtn}>+ Upload Record</button>
      </div>

      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Record Name</th>
              <th style={styles.th}>Doctor / Clinic</th>
              <th style={styles.th}>Type</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            <TableRow date="Oct 20, 2025" name="Annual Physical Exam" doctor="Dr. Smith" type="Checkup" />
            <TableRow date="Oct 18, 2025" name="Blood Test Results" doctor="City Lab" type="Lab Report" />
            <TableRow date="Sep 05, 2025" name="COVID-19 Vaccination" doctor="Health Center" type="Immunization" />
            <TableRow date="Aug 12, 2025" name="Chest X-Ray" doctor="St. Luke's Hospital" type="Imaging" />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TableRow({ date, name, doctor, type }) {
  return (
    <tr style={styles.row}>
      <td style={styles.td}>{date}</td>
      <td style={{...styles.td, fontWeight: '600', color: '#2d3748'}}>{name}</td>
      <td style={styles.td}>{doctor}</td>
      <td style={styles.td}><span style={styles.badge}>{type}</span></td>
      <td style={styles.td}><button style={styles.linkBtn}>Download</button></td>
    </tr>
  );
}

const styles = {
  container: { padding: '40px', width: '100%', maxWidth: '1200px', margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
  pageTitle: { fontSize: '2rem', fontWeight: '700', color: '#1a202c', margin: 0 },
  primaryBtn: { padding: '10px 20px', backgroundColor: '#5865F2', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' },
  card: { backgroundColor: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  headerRow: { borderBottom: '2px solid #edf2f7', textAlign: 'left' },
  th: { padding: '15px', color: '#718096', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' },
  row: { borderBottom: '1px solid #edf2f7' },
  td: { padding: '15px', color: '#4a5568', fontSize: '0.95rem' },
  badge: { backgroundColor: '#edf2f7', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', color: '#4a5568', fontWeight: '500' },
  linkBtn: { color: '#5865F2', background: 'none', border: 'none', fontWeight: '600', cursor: 'pointer' }
};

export default HealthRecords;