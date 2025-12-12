import React, { useEffect, useState } from 'react';

function HealthRecords({ userEmail }) {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    date: '',
    desc: '',
    doctor: '',
    type: 'Consultation',
    status: 'Completed'
  });

  const load = async () => {
    if (!userEmail) return;
    try {
      const res = await fetch(`http://localhost:8080/api/records?userEmail=${encodeURIComponent(userEmail)}`);
      const data = await res.json();
      setRecords(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Failed to load records', e);
    }
  };

  useEffect(() => {
    load();
  }, [userEmail]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.desc || !form.date) {
      alert('Please add a date and description.');
      return;
    }
    try {
      const res = await fetch('http://localhost:8080/api/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: form.desc,
          doctorName: form.doctor,
          type: form.type,
          status: form.status,
          recordDate: form.date,
          userEmail
        })
      });
      if (!res.ok) throw new Error('Unable to save');
      setForm({ date: '', desc: '', doctor: '', type: 'Consultation', status: 'Completed' });
      load();
    } catch (e) {
      console.error(e);
      alert('Could not save record.');
    }
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8080/api/records/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.pageTitle}>Health Records</h1>
          <p style={styles.pageSubtitle}>Overview of all your past medical consultations, lab results, and procedures.</p>
        </div>
      </div>

      <form style={styles.form} onSubmit={handleCreate}>
        <input style={styles.input} type="date" value={form.date} onChange={(e)=>setForm({...form,date:e.target.value})}/>
        <input style={styles.input} placeholder="Description" value={form.desc} onChange={(e)=>setForm({...form,desc:e.target.value})}/>
        <input style={styles.input} placeholder="Doctor" value={form.doctor} onChange={(e)=>setForm({...form,doctor:e.target.value})}/>
        <select style={styles.select} value={form.type} onChange={(e)=>setForm({...form,type:e.target.value})}>
          <option>Consultation</option>
          <option>Lab Result</option>
          <option>Imaging</option>
          <option>Prescription</option>
          <option>Dermatology</option>
        </select>
        <select style={styles.select} value={form.status} onChange={(e)=>setForm({...form,status:e.target.value})}>
          <option>Completed</option>
          <option>Pending</option>
        </select>
        <button style={styles.primaryBtn} type="submit">+ Add New Record</button>
      </form>

      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}>Your Health History</h3>
          <p style={styles.cardSubtitle}>A detailed list of all your medical interactions.</p>
        </div>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.headerRow}>
                <th style={{...styles.th, width: '120px'}}>Date</th>
                <th style={styles.th}>Description</th>
                <th style={{...styles.th, width: '160px'}}>Doctor</th>
                <th style={{...styles.th, width: '120px'}}>Type</th>
                <th style={{...styles.th, width: '100px'}}>Status</th>
                <th style={{...styles.th, width: '80px', textAlign: 'center'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <TableRow key={record.recordID} data={record} onDelete={() => handleDelete(record.recordID)} />
              ))}
              {records.length === 0 && (
                <tr><td style={styles.td} colSpan={6}>No records yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div style={styles.cardFooter}>
          Showing {records.length} records
        </div>
      </div>
    </div>
  );
}

function TableRow({ data, onDelete }) {
  return (
    <tr style={styles.row}>
      <td style={{...styles.td, fontWeight: '600', color: '#1a202c'}}>{data.recordDate}</td>
      <td style={styles.td}>{data.description}</td>
      <td style={{...styles.td, fontWeight: '600'}}>{data.doctorName}</td>
      <td style={styles.td}>
        <span style={styles.typeBadge}>{data.type}</span>
      </td>
      <td style={styles.td}>
        <span style={styles.statusBadge}>{data.status}</span>
      </td>
      <td style={{...styles.td, textAlign: 'center'}}>
        <button style={styles.iconBtn} title="Delete" onClick={onDelete}>
          ✕
        </button>
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
    alignItems: 'flex-start', 
    marginBottom: '30px' 
  },
  pageTitle: { 
    fontSize: '2rem', 
    fontWeight: '800', 
    color: '#1a202c', 
    margin: '0 0 8px 0' 
  },
  pageSubtitle: { 
    color: '#718096', 
    margin: 0, 
    fontSize: '1rem' 
  },
  primaryBtn: { 
    padding: '12px 24px', 
    backgroundColor: '#5865F2', 
    color: 'white', 
    border: 'none', 
    borderRadius: '8px', 
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
  form: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px,1fr))', gap: '10px', background: '#fff', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '24px' },
  input: { padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.95rem' },
  select: { padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.95rem', background: '#fff' },
  tableWrapper: { overflowX: 'auto' }, // Allows scrolling on small screens
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
    padding: '16px 10px', 
    color: '#4a5568', 
    fontSize: '0.9rem', 
    verticalAlign: 'middle',
    borderBottom: '1px solid #f7fafc'
  },
  // Badges
  typeBadge: { 
    backgroundColor: '#fbcfe8', // Light pink
    color: '#9d174d', // Dark pink/red
    padding: '4px 12px', 
    borderRadius: '999px', 
    fontSize: '0.75rem', 
    fontWeight: '700',
    display: 'inline-block'
  },
  statusBadge: { 
    backgroundColor: '#def7ec', // Light green
    color: '#03543f', // Dark green
    border: '1px solid #bcf0da',
    padding: '4px 12px', 
    borderRadius: '999px', 
    fontSize: '0.75rem', 
    fontWeight: '700',
    display: 'inline-block'
  },
  iconBtn: { 
    background: 'none', 
    border: 'none', 
    color: '#718096', 
    cursor: 'pointer', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    transition: 'color 0.2s',
    padding: '5px'
  },
  cardFooter: {
    marginTop: '20px',
    textAlign: 'right',
    fontSize: '0.85rem',
    color: '#718096'
  }
};

export default HealthRecords;