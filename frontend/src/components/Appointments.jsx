import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newAppointment, setNewAppointment] = useState({ appointmentDate: '', reason: '', doctorId: '', patientId: '' });
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const userStr = localStorage.getItem('pasyente_user_obj');
        if (!userStr) return;
        const user = JSON.parse(userStr);
        setCurrentUser(user);
        fetchAppointments(user);

        setNewAppointment({
            appointmentDate: '',
            reason: '',
            patientId: user.role === 'Patient' ? user.id : '',
            doctorId: user.role === 'Doctor' ? user.id : ''
        });
    }, []);

    const fetchAppointments = (user) => {
        setLoading(true);
        const url = user.role === 'Patient'
            ? `http://localhost:8080/api/appointments/patient/${user.id}`
            : `http://localhost:8080/api/appointments/doctor/${user.id}`;
        axios.get(url)
            .then(res => setAppointments(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewAppointment(prev => ({ ...prev, [name]: value }));
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newAppointment.reason || !newAppointment.patientId || !newAppointment.doctorId) {
            alert("Patient, Doctor, and Reason are required");
            return;
        }

        try {
            await axios.post('http://localhost:8080/api/appointments', newAppointment);
            setShowAddModal(false);
            fetchAppointments(currentUser);
        } catch (err) {
            alert(err.response?.data || 'Failed to create appointment');
        }
    };

    const updateStatus = (id, status) => {
        axios.put(`http://localhost:8080/api/appointments/${id}/status?status=${status}`)
            .then(() => fetchAppointments(currentUser))
            .catch(err => alert(err.response?.data || 'Failed to update'));
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={styles.container}>
          <div style={styles.header}>
            <h1 style={styles.title}>Appointments</h1>
            <button style={styles.primaryBtn} onClick={() => setShowAddModal(true)}>+ New Appointment</button>
          </div>
            
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th><th>Date</th><th>Reason</th><th>Doctor</th><th>Patient</th><th>Status</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(app => (
                        <tr key={app.appointmentID}>
                            <td>{app.appointmentID}</td>
                            <td>{new Date(app.appointmentDate).toLocaleString()}</td>
                            <td>{app.reason}</td>
                            <td>{app.doctor?.user?.name}</td>
                            <td>{app.patient?.user?.name}</td>
                            <td>{app.status}</td>
                            <td>
                                {app.status === 'Pending' && (
                                    <>
                                        <button style={styles.confirmBtn} onClick={() => updateStatus(app.appointmentID, 'Confirmed')}>Confirm</button>
                                        <button style={styles.denyBtn} onClick={() => updateStatus(app.appointmentID, 'Denied')}>Deny</button>
                                    </>
                                )}
                                {app.status !== 'Aborted' && (
                                    <button style={styles.abortBtn} onClick={() => updateStatus(app.appointmentID, 'Aborted')}>Abort</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showAddModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <h2>New Appointment</h2>
                        <form onSubmit={handleAdd}>
                            <input style={styles.input} type="datetime-local" name="appointmentDate" value={newAppointment.appointmentDate} onChange={handleChange} required />
                            <textarea style={styles.textarea} name="reason" value={newAppointment.reason} onChange={handleChange} placeholder="Reason" required />
                            {currentUser.role !== 'Patient' && <input style={styles.input} type="number" name="patientId" value={newAppointment.patientId} onChange={handleChange} placeholder="Patient ID" required />}
                            {currentUser.role !== 'Doctor' && <input style={styles.input} type="number" name="doctorId" value={newAppointment.doctorId} onChange={handleChange} placeholder="Doctor ID" required />}
                            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                              <button style={styles.formBtns} type="submit">Add</button>
                              <button style={styles.cancelBtn} type="button" onClick={() => setShowAddModal(false)}>Cancel</button>
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
        marginLeft: '50px',
        alignItems: 'flex-start', 
        padding: '30px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: '#f7f9fc',
        minHeight: '100vh'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    },
    title: {
        fontSize: '2rem',
        fontWeight: '700',
        color: '#1a202c',
        margin: 0
    },
    primaryBtn: {
        padding: '10px 20px',
        backgroundColor: '#5865F2',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontWeight: '600',
        cursor: 'pointer',
        fontSize: '0.9rem',
        transition: 'all 0.2s ease-in-out'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    },
    th: {
        backgroundColor: '#f1f5f9',
        color: '#4a5568',
        textAlign: 'left',
        padding: '12px',
        fontWeight: '700',
        fontSize: '0.85rem',
        borderBottom: '1px solid #e2e8f0'
    },
    td: {
        padding: '12px',
        fontSize: '0.9rem',
        color: '#2d3748',
        borderBottom: '1px solid #e2e8f0'
    },
    actionBtn: {
        padding: '6px 12px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '0.85rem',
        marginRight: '5px'
    },
    confirmBtn: { backgroundColor: '#34d399', color: '#fff' },
    denyBtn: { backgroundColor: '#f87171', color: '#fff' },
    abortBtn: { backgroundColor: '#facc15', color: '#1a202c' },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    },
    modal: {
        backgroundColor: '#fff',
        padding: '25px',
        borderRadius: '12px',
        width: '600px',
        maxWidth: '90%',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    input: {
        width: '80%',
        padding: '10px',
        marginTop: '20px',
        borderRadius: '8px',
        border: '1px solid #cbd5e0',
        fontSize: '0.9rem',
        boxSizing: 'border-box'
    },
    textarea: {
        width: '80%',
        padding: '10px',
        marginTop: '20px',
        borderRadius: '8px',
        border: '1px solid #cbd5e0',
        fontSize: '0.9rem',
        minHeight: '70px',
        resize: 'vertical',
        outline: 'none'
    },
    formBtns: {
        padding: '10px 20px',
        backgroundColor: '#5865F2',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontWeight: '600',
        cursor: 'pointer',
        fontSize: '0.9rem',
        transition: 'all 0.2s ease-in-out'
    },
    cancelBtn: {
        padding: '6px 12px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '0.85rem',
        backgroundColor: '#e2e8f0',
        color: '#4a5568'
    },

};



export default Appointments;