import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard({ userName }) {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newRecord, setNewRecord] = useState({ description: '', doctorId: '', patientId: '' });
    const [selectedRecord, setSelectedRecord] = useState(null);


    useEffect(() => {
        const userObjStr = localStorage.getItem('pasyente_user_obj');
        if (!userObjStr) return;

        const userObj = JSON.parse(userObjStr);

        if (userObj.role === "Patient") {
            setNewRecord(prev => ({ ...prev, patientId: userObj.id }));
            fetchRecords("Patient", userObj.id);
        } else if (userObj.role === "Doctor") {
            fetchRecords("Doctor", userObj.id);
        }
    }, []);

    const fetchRecords = async () => {
        const userObj = JSON.parse(localStorage.getItem('pasyente_user_obj'));
        let url;

        if (userObj.role === 'Doctor') {
            // Fetch by userId, backend resolves doctorId
            url = `http://localhost:8080/api/medical-records/my-records/${userObj.id}`;
        } else {
            url = `http://localhost:8080/api/medical-records/patient/${userObj.id}`;
        }

        setLoading(true);
        try {
            const res = await axios.get(url);
            setRecords(res.data);
        } catch (err) {
            console.error('Error fetching medical records:', err);
        } finally {
            setLoading(false);
        }
    };


    const handleViewRecord = (record) => {
        setSelectedRecord(record);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedRecord(null);
        setShowModal(false);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.welcome}>Welcome back, {userName || "Patient"}!</h1>
            <p style={styles.subtitle}>Here's a quick overview of your health status.</p>

            <div style={styles.card}>
                <div style={styles.cardHeader}>
                    <h3 style={styles.cardTitle}>Records List</h3>
                </div>

                <div style={styles.tableWrapper}>
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.headerRow}>
                                <th style={styles.th}>Record ID</th>
                                <th style={styles.th}>Description</th>
                                <th style={styles.th}>Doctor</th>
                                <th style={styles.th}>Patient</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map(record => (
                                <tr key={record.recordID} style={styles.row}>
                                    <td style={styles.td}>{record.recordID}</td>
                                    <td style={styles.td}>{record.description}</td>
                                    <td style={styles.td}>{record.doctorName || 'N/A'}</td>
                                    <td style={styles.td}>{record.patientName || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={styles.cardFooter}>
                    Showing {records.length} records
                </div>
            </div>

            {showModal && selectedRecord && (
                <Modal record={selectedRecord} onClose={handleCloseModal} />
            )}
        </div>
    );
}

function ListItem({ title, subtitle, icon, onView }) {
    return (
        <div style={styles.item}>
            <div style={styles.iconBox}>{icon}</div>
            <div style={styles.itemContent}>
                <div style={styles.itemTitle}>{title}</div>
                {subtitle && <div style={styles.itemDate}>{subtitle}</div>}
            </div>
            <button style={styles.viewBtn} onClick={onView}>View</button>
        </div>
    );
}

function Modal({ record, onClose }) {
    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modal}>
                <h2>Medical Record Details</h2>
                <p><strong>Record ID:</strong> {record.recordID}</p>
                <p><strong>Description:</strong> {record.description}</p>
                <p><strong>Doctor ID:</strong> {record.doctorID}</p>
                <p><strong>Doctor Name:</strong> {record.doctorName}</p>
                <p><strong>Patient ID:</strong> {record.patientID}</p>
                <p><strong>Patient Name:</strong> {record.patientName}</p>
                <button onClick={onClose} style={styles.primaryBtn}>Close</button>
            </div>
        </div>
    );
}

const styles = {
  container: { 
    padding: '40px', 
    width: '100%', 
    maxWidth: '1200px', // MATCHING SETTINGS PAGE WIDTH
    margin: '0 auto' 
  },
  welcome: { fontSize: '2rem', color: '#1a202c', marginBottom: '10px', fontWeight: '700' },
  subtitle: { color: '#718096', marginBottom: '40px', fontSize: '1.1rem' },
  grid: { display: 'flex', gap: '30px', flexWrap: 'wrap' },
  card: {
    flex: 1,
    minWidth: '350px',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    border: '1px solid #e2e8f0'
  },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' },
  cardTitle: { margin: 0, fontSize: '1.2rem', color: '#2d3748', fontWeight: '700' },
  cardAction: { color: '#5865F2', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' },
  list: { display: 'flex', flexDirection: 'column', gap: '20px' },
  item: { display: 'flex', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f7fafc' },
  iconBox: { width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', marginRight: '15px' },
  itemContent: { flex: 1 },
  itemTitle: { fontWeight: '600', color: '#2d3748', fontSize: '0.95rem' },
  itemDate: { color: '#718096', fontSize: '0.85rem', marginTop: '4px' },
  viewBtn: { color: '#5865F2', background: 'none', border: 'none', fontWeight: '600', cursor: 'pointer' },
  modalOverlay: { position: 'fixed', top:0, left:0, right:0, bottom:0, backgroundColor:'rgba(0,0,0,0.5)', display:'flex', justifyContent:'center', alignItems:'center', zIndex: 1000 },
  modal: { backgroundColor:'white', padding:'30px', borderRadius:'12px', width:'400px', maxWidth:'90%' },
  primaryBtn: { padding:'10px 20px', backgroundColor:'#5865F2', color:'white', border:'none', borderRadius:'8px', cursor:'pointer', fontWeight:'600' },

  cardHeader: { marginBottom: '25px' },
  cardTitle: { 
    fontSize: '1.25rem', 
    fontWeight: '700', 
    color: '#2d3748', 
    margin: '0 0 5px 0' 
  },
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
  cardFooter: {
    marginTop: '20px',
    textAlign: 'right',
    fontSize: '0.85rem',
    color: '#718096'
  },
};

export default Dashboard;