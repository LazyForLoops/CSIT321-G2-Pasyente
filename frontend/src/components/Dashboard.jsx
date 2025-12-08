// import React from 'react';

// function Dashboard({ userName }) {
//   return (
//     <div style={styles.container}>
//       <h1 style={styles.welcome}>Welcome back, {userName || "Patient"}!</h1>
//       <p style={styles.subtitle}>Here's a quick overview of your health status.</p>

//       <div style={styles.grid}>
//         {/* Card 1: Upcoming Appointments */}
//         <div style={styles.card}>
//           <div style={styles.cardHeader}>
//              <h3 style={styles.cardTitle}>Upcoming Appointments</h3>
//              <span style={styles.cardAction}>View All</span>
//           </div>
          
//           <div style={styles.list}>
//             <ListItem title="Dental Check-up" date="Oct 26, 2025 at 10:00 AM" icon="🦷" />
//             <ListItem title="Cardiology Follow-up" date="Nov 03, 2025 at 02:30 PM" icon="❤️" />
//             <ListItem title="Physical Therapy" date="Nov 15, 2025 at 09:00 AM" icon="💪" />
//           </div>
//         </div>

//         {/* Card 2: Recent Health Records */}
//         <div style={styles.card}>
//           <div style={styles.cardHeader}>
//              <h3 style={styles.cardTitle}>Recent Health Records</h3>
//              <span style={styles.cardAction}>View All</span>
//           </div>
          
//           <div style={styles.list}>
//             <ListItem title="Annual Physical Exam" date="Oct 20, 2025" icon="📄" />
//             <ListItem title="Blood Test Results" date="Oct 18, 2025" icon="🩸" />
//             <ListItem title="Vaccination Record" date="Sep 05, 2025" icon="💉" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ListItem({ title, date, icon }) {
//   return (
//     <div style={styles.item}>
//       <div style={styles.iconBox}>{icon}</div>
//       <div style={styles.itemContent}>
//         <div style={styles.itemTitle}>{title}</div>
//         <div style={styles.itemDate}>{date}</div>
//       </div>
//       <button style={styles.viewBtn}>View</button>
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard({ userName }) {
    const [records, setRecords] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = () => {
        axios.get('http://localhost:8080/api/medical-records')
            .then(res => setRecords(res.data))
            .catch(err => console.error('Error fetching medical records:', err));
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

            <div style={styles.grid}>
                <div style={styles.card}>
                    <div style={styles.cardHeader}>
                        <h3 style={styles.cardTitle}>Recent Health Records</h3>
                    </div>
                    <div style={styles.list}>
                        {records.length > 0 ? records.map(rec => (
                            <ListItem 
                                key={rec.recordID}
                                title={rec.description}
                                subtitle={`Doctor: ${rec.doctorName || "N/A"} | Patient: ${rec.patientName || "N/A"}`}
                                icon="📄"
                                onView={() => handleViewRecord(rec)}
                            />
                        )) : <p>No health records available.</p>}
                    </div>
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
  primaryBtn: { padding:'10px 20px', backgroundColor:'#5865F2', color:'white', border:'none', borderRadius:'8px', cursor:'pointer', fontWeight:'600' }

};

export default Dashboard;