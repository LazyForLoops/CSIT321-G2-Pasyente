import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HealthRecords({ refreshRecords }) {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState({ type: null, visible: false }); // 'add', 'view', 'message', 'confirm'
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [newRecord, setNewRecord] = useState({ description: '', doctorId: '', patientId: '' });
    const [messageData, setMessageData] = useState({ title: '', message: '' });
    const [confirmData, setConfirmData] = useState({ title: '', message: '', onConfirm: () => {} });
    const [form, setForm] = useState({
        description: "",
        doctorId: "",
        patientId: ""
    });

    const userObj = JSON.parse(localStorage.getItem('pasyente_user_obj'));
    const isDoctor = userObj.role === "Doctor";


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: name === "doctorId" || name === "patientId" ? Number(value) : value });
    };
    // Generic fetch function
    // const fetchRecords = (role, id) => {
    //     const url = role === 'Doctor' 
    //         ? `http://localhost:8080/api/medical-records/doctor/${id}` 
    //         : `http://localhost:8080/api/medical-records/patient/${id}`;
    //     setLoading(true);
    //     axios.get(url)
    //         .then(res => setRecords(res.data))
    //         .catch(err => console.error('Error fetching medical records:', err))
    //         .finally(() => setLoading(false));
    // };

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRecord(prev => ({
            ...prev,
            [name]: name === "doctorId" || name === "patientId" ? Number(value) : value
        }));
    };

    // const handleSubmitRecord = (e) => {
    //     e.preventDefault();
    //     const userObj = JSON.parse(localStorage.getItem('pasyente_user_obj'));

    //     const payload = {
    //         description: newRecord.description,
    //         doctorId: userObj.role === "Doctor" ? userObj.id : newRecord.doctorId,
    //         // userId: userObj.role === "Doctor" ? userObj.id : newRecord.doctorId,
    //         patientId: newRecord.patientId
    //     };

    //     if (!payload.patientId) {
    //         setMessageData({ title: "Error", message: "Please select a patient" });
    //         setModal({ type: "message", visible: true });
    //         return;
    //     }

    //     const request = selectedRecord
    //         ? axios.put(`http://localhost:8080/api/medical-records/${selectedRecord.recordID}`, payload)
    //         : axios.post(`http://localhost:8080/api/medical-records`, payload);

    //     request.then(() => {
    //         fetchRecords(userObj.role, userObj.id);
    //         setModal({ type: null, visible: false });
    //         setSelectedRecord(null);
    //         setNewRecord({ description: '', doctorId: '', patientId: '' });
    //         setMessageData({ title: "Success", message: selectedRecord ? "Record updated" : "Record added" });
    //         setModal({ type: "message", visible: true });
    //     }).catch(err => {
    //         console.error("Error saving record:", err);
    //         setMessageData({ title: "Error", message: "Failed to save record" });
    //         setModal({ type: "message", visible: true });
    //     });
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure patientId and doctorId are present
        if (!form.patientId || !form.doctorId) {
            setMessageData({ title: "Error", message: "Patient ID and Doctor ID are required." });
            setModal({ type: "message", visible: true });
            return;
        }

        try {
            const userObj = JSON.parse(localStorage.getItem('pasyente_user_obj'));
            let request;

            if (selectedRecord) {
                // edit
                request = axios.put(
                    `http://localhost:8080/api/medical-records/${selectedRecord.recordID}`,
                    form
                );
            } else {
                // adding a  record
                request = axios.post(
                    "http://localhost:8080/api/medical-records",
                    form
                );
            }

            const response = await request;

            // Update state immediately so table reflects new record without refresh
            setRecords(prev => {
                if (selectedRecord) {
                    return prev.map(r => r.recordID === response.data.recordID ? response.data : r);
                } else {
                    return [...prev, response.data];
                }
            });

            setModal({ type: "message", visible: true });
            setMessageData({ title: "Success", message: selectedRecord ? "Record updated!" : "Record added!" });

            // Reset form and selection
            setForm({ description: "", doctorId: "", patientId: "" });
            setSelectedRecord(null);

        } catch (err) {
            console.error("Error saving record:", err);
            setMessageData({ title: "Error", message: err.response?.data || "Failed to save record" });
            setModal({ type: "message", visible: true });
        }
    };


    const handleEditRecord = (record) => {
        setSelectedRecord(record);
        setNewRecord({
            description: record.description,
            doctorId: record.doctorID,
            patientId: record.patientID
        });
        setModal({ type: "add", visible: true });
    };

    const handleViewRecord = (record) => {
        setSelectedRecord(record);
        setModal({ type: "view", visible: true });
    };

    const handleDeleteRecord = (recordID) => {
        setConfirmData({
            title: "Delete Record",
            message: "Are you sure you want to delete this record?",
            onConfirm: () => {
                const userObj = JSON.parse(localStorage.getItem('pasyente_user_obj'));
                axios.delete(`http://localhost:8080/api/medical-records/${recordID}`)
                    .then(() => {
                        fetchRecords(userObj.role, userObj.id);
                        setMessageData({ title: "Success", message: "Record deleted" });
                        setModal({ type: "message", visible: true });
                    })
                    .catch(err => console.error("Error deleting record:", err));
            }
        });
        setModal({ type: "confirm", visible: true });
    };

    if (loading) return <div style={{ padding: '40px' }}>Loading medical records...</div>;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.pageTitle}>Medical Records</h1>
                    <p style={styles.pageSubtitle}>Overview of all your medical records.</p>
                </div>
                {isDoctor && (
                <button style={styles.primaryBtn} onClick={() => { setSelectedRecord(null); setModal({ type: "add", visible: true }); }}>+ Add New Record</button>
                )}
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
                                <th style={styles.th}>Doctor</th>
                                <th style={styles.th}>Patient</th>
                                <th style={styles.th}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map(record => (
                                <tr key={record.recordID} style={styles.row}>
                                    <td style={styles.td}>{record.recordID}</td>
                                    <td style={styles.td}>{record.description}</td>
                                    <td style={styles.td}>{record.doctorName || 'N/A'}</td>
                                    <td style={styles.td}>{record.patientName || 'N/A'}</td>
                                    <td style={styles.td}>
                                        <button style={styles.primaryBtn} onClick={() => handleViewRecord(record)}>View</button>
                                        {isDoctor && (
                                            <>
                                                <button style={{ ...styles.primaryBtn, marginLeft: '5px', backgroundColor: '#f56565' }} onClick={() => handleDeleteRecord(record.recordID)}>Delete</button>
                                                <button style={{ ...styles.primaryBtn, marginLeft: '5px', backgroundColor: '#ecc94b', color: '#1a202c' }} onClick={() => handleEditRecord(record)}>Edit</button>
                                            </>
                                        )}    
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={styles.cardFooter}>
                    Showing {records.length} records
                </div>
            </div>

            {/* Add/Edit Record Modal */}
            {modal.type === "add" && modal.visible && (
                <div style={styles.modalOverlay}>
                    <div style={styles.addModal}>
                        <h2 style={styles.modalTitle}>
                            {selectedRecord ? "Edit Medical Record" : "Add New Medical Record"}
                        </h2>

                        <form onSubmit={handleSubmit} style={styles.form}>
                            {/* Description */}
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Description</label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Enter description..."
                                    style={styles.textarea}
                                    required
                                />
                            </div>

                            {/* Doctor ID */}
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Doctor ID</label>
                                <input
                                    type="number"
                                    name="doctorId"
                                    value={form.doctorId}
                                    onChange={handleChange}
                                    placeholder="Enter doctor ID"
                                    style={styles.input}
                                    required
                                />
                            </div>

                            {/* Patient ID */}
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Patient ID</label>
                                <input
                                    type="number"
                                    name="patientId"
                                    value={form.patientId}
                                    onChange={handleChange}
                                    placeholder="Enter patient ID"
                                    style={styles.input}
                                    required
                                />
                            </div>

                            {/* Buttons */}
                            <div style={styles.modalFooter}>
                                <button
                                    type="button"
                                    onClick={() => setModal({ type: null, visible: false })}
                                    style={styles.cancelBtn}
                                >
                                    Cancel
                                </button>
                                <button type="submit" style={styles.submitBtn}>
                                    {selectedRecord ? "Update Record" : "Add Record"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            {/* View Record Modal */}
            {modal.type === "view" && modal.visible && selectedRecord && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <h2>View Medical Record</h2>
                        <p><strong>Record ID:</strong> {selectedRecord.recordID}</p>
                        <p><strong>Description:</strong> {selectedRecord.description}</p>
                        <p><strong>Doctor ID:</strong> {selectedRecord.doctorID}</p>
                        <p><strong>Doctor Name:</strong> {selectedRecord.doctorName}</p>
                        <p><strong>Patient ID:</strong> {selectedRecord.patientID}</p>
                        <p><strong>Patient Name:</strong> {selectedRecord.patientName}</p>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                            <button onClick={() => setModal({ type: null, visible: false })} style={styles.primaryBtn}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Message Modal */}
            {modal.type === "message" && modal.visible && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <h2>{messageData.title}</h2>
                        <p>{messageData.message}</p>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                            <button onClick={() => setModal({ type: null, visible: false })} style={styles.primaryBtn}>OK</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirm Modal */}
            {modal.type === "confirm" && modal.visible && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <h2>{confirmData.title}</h2>
                        <p>{confirmData.message}</p>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                            <button style={styles.cancelBtn} onClick={() => setModal({ type: null, visible: false })}>Cancel</button>
                            <button style={styles.primaryBtn} onClick={() => { confirmData.onConfirm(); setModal({ type: null, visible: false }); }}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}


const styles = {
  container: { 
    marginLeft: '50px',
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
  },
  modalOverlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '30px',
        width: '400px',
        maxWidth: '90%',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
    },
    addModal: {
        backgroundColor: '#fff',
        borderRadius: '16px',
        padding: '40px 50px',
        width: '500px',
        maxWidth: '90%',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
    },
    modalTitle: {
        fontSize: '1.8rem',
        fontWeight: '700',
        marginBottom: '25px',
        color: '#1a202c'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column'
    },
    label: {
        marginBottom: '8px',
        fontWeight: '600',
        color: '#2d3748',
        fontSize: '0.95rem'
    },
    input: {
        padding: '12px 15px',
        borderRadius: '12px',
        border: '1px solid #cbd5e0',
        fontSize: '0.95rem',
        outline: 'none',
        transition: '0.3s',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
        backgroundColor: '#f9fafb'
    },
    textarea: {
        padding: '12px 15px',
        borderRadius: '12px',
        border: '1px solid #cbd5e0',
        fontSize: '0.95rem',
        resize: 'vertical',
        minHeight: '100px',
        outline: 'none',
        transition: '0.3s',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
        backgroundColor: '#f9fafb'
    },
    modalFooter: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        marginTop: '20px'
    },
    submitBtn: {
        padding: '12px 28px',
        borderRadius: '10px',
        border: 'none',
        backgroundColor: '#5865F2',
        color: 'white',
        fontWeight: '600',
        cursor: 'pointer',
        fontSize: '0.95rem',
        transition: '0.2s',
        boxShadow: '0 4px 12px rgba(88, 101, 242, 0.3)',
    },
    submitBtnHover: {
        backgroundColor: '#4b52d1'
    },
    cancelBtn: {
        padding: '12px 28px',
        borderRadius: '10px',
        border: '1px solid #cbd5e0',
        backgroundColor: 'white',
        color: '#4a5568',
        fontWeight: '600',
        cursor: 'pointer',
        fontSize: '0.95rem',
        transition: '0.2s',
    },

};

export default HealthRecords;