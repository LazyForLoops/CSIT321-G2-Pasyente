// import React from 'react';

// function HealthRecords() {
//   // Mock data matching the reference image
//   const records = [
//     { 
//       date: "2024-10-25", 
//       desc: "Annual physical check-up, general health assessment, blood pressure normal.", 
//       doctor: "Dr. Emily White", 
//       type: "Consultation", 
//       status: "Completed" 
//     },
//     { 
//       date: "2024-09-15", 
//       desc: "Routine blood test results for cholesterol and glucose levels.", 
//       doctor: "Dr. Emily White", 
//       type: "Lab Result", 
//       status: "Completed" 
//     },
//     { 
//       date: "2024-08-01", 
//       desc: "Prescription refill for chronic medication, discussion on dosage.", 
//       doctor: "Dr. Michael Green", 
//       type: "Prescription", 
//       status: "Completed" 
//     },
//     { 
//       date: "2024-07-10", 
//       desc: "Follow-up on allergy symptoms, seasonal allergy management plan.", 
//       doctor: "Dr. Sarah Johnson", 
//       type: "Consultation", 
//       status: "Completed" 
//     },
//     { 
//       date: "2024-06-20", 
//       desc: "Vaccination for annual flu shot and tetanus booster.", 
//       doctor: "Dr. Alex Lee", 
//       type: "Immunization", 
//       status: "Completed" 
//     },
//     { 
//       date: "2024-05-05", 
//       desc: "Initial consultation for persistent back pain, referred to physical therapy.", 
//       doctor: "Dr. Michael Green", 
//       type: "Consultation", 
//       status: "Completed" 
//     },
//     { 
//       date: "2024-04-12", 
//       desc: "MRI scan of lumbar spine results review.", 
//       doctor: "Dr. Michael Green", 
//       type: "Imaging", 
//       status: "Completed" 
//     },
//     { 
//       date: "2024-03-01", 
//       desc: "Dermatology visit for skin rash diagnosis and treatment plan.", 
//       doctor: "Dr. Lily Chen", 
//       type: "Dermatology", 
//       status: "Completed" 
//     },
//   ];

//   return (
//     <div style={styles.container}>
//       {/* Page Header */}
//       <div style={styles.header}>
//         <div>
//           <h1 style={styles.pageTitle}>Health Records</h1>
//           <p style={styles.pageSubtitle}>Overview of all your past medical consultations, lab results, and procedures.</p>
//         </div>
//         <button style={styles.primaryBtn}>+ Add New Record</button>
//       </div>

//       {/* Content Card */}
//       <div style={styles.card}>
//         <div style={styles.cardHeader}>
//           <h3 style={styles.cardTitle}>Your Health History</h3>
//           <p style={styles.cardSubtitle}>A detailed list of all your medical interactions.</p>
//         </div>

//         <div style={styles.tableWrapper}>
//           <table style={styles.table}>
//             <thead>
//               <tr style={styles.headerRow}>
//                 <th style={{...styles.th, width: '120px'}}>Date</th>
//                 <th style={styles.th}>Description</th>
//                 <th style={{...styles.th, width: '160px'}}>Doctor</th>
//                 <th style={{...styles.th, width: '120px'}}>Type</th>
//                 <th style={{...styles.th, width: '100px'}}>Status</th>
//                 <th style={{...styles.th, width: '80px', textAlign: 'center'}}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {records.map((record, index) => (
//                 <TableRow key={index} data={record} />
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div style={styles.cardFooter}>
//           Showing {records.length} records
//         </div>
//       </div>
//     </div>
//   );
// }

// function TableRow({ data }) {
//   return (
//     <tr style={styles.row}>
//       <td style={{...styles.td, fontWeight: '600', color: '#1a202c'}}>{data.date}</td>
//       <td style={styles.td}>{data.desc}</td>
//       <td style={{...styles.td, fontWeight: '600'}}>{data.doctor}</td>
//       <td style={styles.td}>
//         <span style={styles.typeBadge}>{data.type}</span>
//       </td>
//       <td style={styles.td}>
//         <span style={styles.statusBadge}>{data.status}</span>
//       </td>
//       <td style={{...styles.td, textAlign: 'center'}}>
//         <button style={styles.iconBtn} title="View Details">
//           {/* Simple Eye Icon using SVG */}
//           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
//             <circle cx="12" cy="12" r="3"></circle>
//           </svg>
//         </button>
//       </td>
//     </tr>
//   );
// }

// const styles = {
//   container: { 
//     padding: '40px', 
//     width: '100%', 
//     maxWidth: '1200px', 
//     margin: '0 auto',
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
//   },
//   header: { 
//     display: 'flex', 
//     justifyContent: 'space-between', 
//     alignItems: 'flex-start', 
//     marginBottom: '30px' 
//   },
//   pageTitle: { 
//     fontSize: '2rem', 
//     fontWeight: '800', 
//     color: '#1a202c', 
//     margin: '0 0 8px 0' 
//   },
//   pageSubtitle: { 
//     color: '#718096', 
//     margin: 0, 
//     fontSize: '1rem' 
//   },
//   primaryBtn: { 
//     padding: '12px 24px', 
//     backgroundColor: '#5865F2', 
//     color: 'white', 
//     border: 'none', 
//     borderRadius: '8px', 
//     fontWeight: '600', 
//     cursor: 'pointer',
//     fontSize: '0.9rem',
//     boxShadow: '0 2px 5px rgba(88, 101, 242, 0.3)'
//   },
//   card: { 
//     backgroundColor: 'white', 
//     borderRadius: '12px', 
//     padding: '30px', 
//     border: '1px solid #e2e8f0', 
//     boxShadow: '0 1px 3px rgba(0,0,0,0.05)' 
//   },
//   cardHeader: { marginBottom: '25px' },
//   cardTitle: { 
//     fontSize: '1.25rem', 
//     fontWeight: '700', 
//     color: '#2d3748', 
//     margin: '0 0 5px 0' 
//   },
//   cardSubtitle: { 
//     fontSize: '0.9rem', 
//     color: '#718096', 
//     margin: 0 
//   },
//   tableWrapper: { overflowX: 'auto' }, // Allows scrolling on small screens
//   table: { 
//     width: '100%', 
//     borderCollapse: 'separate', 
//     borderSpacing: '0' 
//   },
//   headerRow: { textAlign: 'left' },
//   th: { 
//     padding: '15px 10px', 
//     color: '#718096', 
//     fontSize: '0.75rem', 
//     textTransform: 'uppercase', 
//     fontWeight: '700', 
//     letterSpacing: '0.05em',
//     borderBottom: '1px solid #e2e8f0'
//   },
//   row: { 
//     transition: 'background-color 0.2s' 
//   },
//   td: { 
//     padding: '16px 10px', 
//     color: '#4a5568', 
//     fontSize: '0.9rem', 
//     verticalAlign: 'middle',
//     borderBottom: '1px solid #f7fafc'
//   },
//   // Badges
//   typeBadge: { 
//     backgroundColor: '#fbcfe8', // Light pink
//     color: '#9d174d', // Dark pink/red
//     padding: '4px 12px', 
//     borderRadius: '999px', 
//     fontSize: '0.75rem', 
//     fontWeight: '700',
//     display: 'inline-block'
//   },
//   statusBadge: { 
//     backgroundColor: '#def7ec', // Light green
//     color: '#03543f', // Dark green
//     border: '1px solid #bcf0da',
//     padding: '4px 12px', 
//     borderRadius: '999px', 
//     fontSize: '0.75rem', 
//     fontWeight: '700',
//     display: 'inline-block'
//   },
//   iconBtn: { 
//     background: 'none', 
//     border: 'none', 
//     color: '#718096', 
//     cursor: 'pointer', 
//     display: 'flex', 
//     alignItems: 'center', 
//     justifyContent: 'center',
//     transition: 'color 0.2s',
//     padding: '5px'
//   },
//   cardFooter: {
//     marginTop: '20px',
//     textAlign: 'right',
//     fontSize: '0.85rem',
//     color: '#718096'
//   }
// };

// export default HealthRecords;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HealthRecords() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newRecord, setNewRecord] = useState({
        description: '',
        doctorId: '',
        patientId: ''
    });

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = () => {
        axios.get('http://localhost:8080/api/medical-records')
            .then(response => setRecords(response.data))
            .catch(error => console.error('Error fetching medical records:', error))
            .finally(() => setLoading(false));
    };

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setNewRecord({ ...newRecord, [name]: value });
    // };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRecord({
            ...newRecord,
            [name]: name === "doctorId" || name === "patientId" ? Number(value) : value
        });
    };


    const handleAddRecord = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/medical-records', newRecord)
            .then(() => {
                fetchRecords();
                setShowModal(false);
                setNewRecord({ description: '', doctorId: '', patientId: '' });
            })
            .catch(error => console.error('Error adding record:', error));
    };

    if (loading) return <div style={{ padding: '40px' }}>Loading medical records...</div>;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.pageTitle}>Medical Records</h1>
                    <p style={styles.pageSubtitle}>
                        Overview of all your medical records.
                    </p>
                </div>
                <button style={styles.primaryBtn} onClick={() => setShowModal(true)}>+ Add New Record</button>
            </div>

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
                                <th style={styles.th}>Doctor ID</th>
                                <th style={styles.th}>Patient ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((record) => (
                                <tr key={record.recordid} style={styles.row}>
                                    <td style={styles.td}>{record.recordID}</td>
                                    <td style={styles.td}>{record.description}</td>
                                    <td style={styles.td}>{record.doctorID}</td>
                                    <td style={styles.td}>{record.patientID}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={styles.cardFooter}>
                    Showing {records.length} records
                </div>
            </div>

            {showModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <h2>Add Medical Record</h2>
                        <form onSubmit={handleAddRecord}>
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={newRecord.description}
                                onChange={handleInputChange}
                                style={{...styles.input, height: '80px'}}
                                required
                            />
                            <input
                                type="number"
                                name="doctorId"
                                placeholder="Doctor ID"
                                value={newRecord.doctorId}
                                onChange={handleInputChange}
                                style={styles.input}
                                required
                            />
                            <input
                                type="number"
                                name="patientId"
                                placeholder="Patient ID"
                                value={newRecord.patientId}
                                onChange={handleInputChange}
                                style={styles.input}
                                required
                            />

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                                <button type="button" onClick={() => setShowModal(false)} style={styles.cancelBtn}>Cancel</button>
                                <button type="submit" style={styles.primaryBtn}>Add Record</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
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