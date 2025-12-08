import React, { useEffect, useState } from 'react';

function Medications({ userEmail }) {
  const [medications, setMedications] = useState([]);
  const [form, setForm] = useState({ name: '', dose: '', schedule: '' });

  const load = async () => {
    if (!userEmail) return;
    try {
      const res = await fetch(`http://localhost:8080/api/medications?userEmail=${encodeURIComponent(userEmail)}`);
      const data = await res.json();
      setMedications(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Failed to load medications', e);
    }
  };

  useEffect(() => {
    load();
  }, [userEmail]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.name) {
      alert('Medication name required.');
      return;
    }
    try {
      const res = await fetch('http://localhost:8080/api/medications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, userEmail })
      });
      if (!res.ok) throw new Error('Save failed');
      setForm({ name: '', dose: '', schedule: '' });
      load();
    } catch (e) {
      console.error(e);
      alert('Could not save medication.');
    }
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8080/api/medications/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Medication Management</h1>
      </div>

      <form style={styles.form} onSubmit={handleCreate}>
        <input style={styles.input} placeholder="Medication name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/>
        <input style={styles.input} placeholder="Dose (e.g. 10 mg)" value={form.dose} onChange={(e)=>setForm({...form,dose:e.target.value})}/>
        <input style={styles.input} placeholder="Schedule" value={form.schedule} onChange={(e)=>setForm({...form,schedule:e.target.value})}/>
        <button style={styles.primaryBtn} type="submit">+ Add New Medication</button>
      </form>

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
              {medications.map((med) => (
                <TableRow key={med.id} data={med} onDelete={() => handleDelete(med.id)} />
              ))}
              {medications.length === 0 && <tr><td style={styles.td} colSpan={4}>No medications saved.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TableRow({ data, onDelete }) {
  return (
    <tr style={styles.row}>
      <td style={styles.td}>
        <div style={styles.nameWrapper}>
          <span style={styles.pillIcon}>💊</span>
          <span style={{fontWeight: '700', color: '#2d3748'}}>{data.name}</span>
        </div>
      </td>
      <td style={styles.td}>{data.dose}</td>
      <td style={styles.td}>{data.schedule}</td>
      <td style={{...styles.td, textAlign: 'right'}}>
        <div style={styles.actions}>
          <button style={styles.deleteBtn} title="Delete" onClick={onDelete}>
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
  form: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '10px', background: '#fff', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '24px' },
  input: { padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.95rem' },
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