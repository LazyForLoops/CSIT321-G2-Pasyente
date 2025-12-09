import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [newAppointment, setNewAppointment] = useState({
    appointmentDate: '',
    reason: '',
    doctorId: '',
    patientId: '',
    status: 'Pending'
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    // Get current user from localStorage
    const userObj = localStorage.getItem('pasyente_user_obj');
    if (userObj) {
      const user = JSON.parse(userObj);
      setCurrentUser(user);
      setNewAppointment(prev => ({
        ...prev,
        patientId: user.id
      }));
    }
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    const userObj = localStorage.getItem('pasyente_user_obj');
    if (userObj) {
      const user = JSON.parse(userObj);
      // Fetch appointments specifically for this patient
      axios.get(`http://localhost:8080/api/appointments/patient/${user.id}`)
        .then(response => setAppointments(response.data))
        .catch(error => console.error('Error fetching appointments:', error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment({
      ...newAppointment,
      [name]: name === "doctorId" || name === "patientId" ? Number(value) : value
    });
  };

  const handleAddAppointment = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/appointments', newAppointment)
      .then(() => {
        fetchAppointments();
        setShowAddModal(false);
        const userObj = currentUser || JSON.parse(localStorage.getItem('pasyente_user_obj'));
        setNewAppointment({ appointmentDate: '', reason: '', doctorId: '', patientId: userObj?.id || '', status: 'Pending' });
      })
      .catch(error => console.error('Error adding appointment:', error));
  };

  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowViewModal(true);
  };

  if (loading) return <div style={{ padding: '40px' }}>Loading appointments...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.pageTitle}>Appointments</h1>
          <p style={styles.pageSubtitle}>Manage your medical appointments.</p>
        </div>
        <button style={styles.primaryBtn} onClick={() => setShowAddModal(true)}>+ Book New Appointment</button>
      </div>

      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}>Your Appointments</h3>
        </div>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.headerRow}>
                <th style={styles.th}>Appointment ID</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Reason</th>
                <th style={styles.th}>Doctor</th>
                <th style={styles.th}>Patient</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.appointmentID} style={styles.row}>
                  <td style={styles.td}>{appointment.appointmentID}</td>
                  <td style={styles.td}>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                  <td style={styles.td}>{appointment.reason}</td>
                  <td style={styles.td}>{appointment.doctor?.user?.name || 'N/A'}</td>
                  <td style={styles.td}>{appointment.patient?.user?.name || 'N/A'}</td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.statusBadge,
                      backgroundColor: appointment.status === 'Confirmed' ? '#def7ec' : appointment.status === 'Pending' ? '#feecdc' : '#f3f4f6',
                      color: appointment.status === 'Confirmed' ? '#03543f' : appointment.status === 'Pending' ? '#9c4221' : '#6b7280'
                    }}>
                      {appointment.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button 
                      style={styles.primaryBtn} 
                      onClick={() => handleViewAppointment(appointment)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={styles.cardFooter}>
          Showing {appointments.length} appointments
        </div>
      </div>

      {/* Add Appointment Modal */}
      {showAddModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>Book New Appointment</h2>
            <form onSubmit={handleAddAppointment}>
              <input
                type="datetime-local"
                name="appointmentDate"
                value={newAppointment.appointmentDate}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
              <textarea
                name="reason"
                placeholder="Reason for appointment"
                value={newAppointment.reason}
                onChange={handleInputChange}
                style={{...styles.input, height: '80px'}}
                required
              />
              <input
                type="number"
                name="doctorId"
                placeholder="Doctor ID"
                value={newAppointment.doctorId}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
              <input
                type="number"
                name="patientId"
                placeholder="Patient ID"
                value={newAppointment.patientId}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
              <select
                name="status"
                value={newAppointment.status}
                onChange={handleInputChange}
                style={styles.input}
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
              </select>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={styles.cancelBtn}>Cancel</button>
                <button type="submit" style={styles.primaryBtn}>Book Appointment</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Appointment Modal */}
      {showViewModal && selectedAppointment && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>View Appointment</h2>
            <p><strong>Appointment ID:</strong> {selectedAppointment.appointmentID}</p>
            <p><strong>Date:</strong> {new Date(selectedAppointment.appointmentDate).toLocaleString()}</p>
            <p><strong>Reason:</strong> {selectedAppointment.reason}</p>
            <p><strong>Doctor:</strong> {selectedAppointment.doctor?.user?.name || 'N/A'}</p>
            <p><strong>Patient:</strong> {selectedAppointment.patient?.user?.name || 'N/A'}</p>
            <p><strong>Status:</strong> {selectedAppointment.status}</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button onClick={() => setShowViewModal(false)} style={styles.primaryBtn}>Close</button>
            </div>
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
  cancelBtn: { 
    padding: '12px 24px', 
    backgroundColor: '#e2e8f0', 
    color: '#4a5568', 
    border: 'none', 
    borderRadius: '8px', 
    fontWeight: '600', 
    cursor: 'pointer',
    fontSize: '0.9rem'
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
    padding: '16px 10px', 
    color: '#4a5568', 
    fontSize: '0.9rem', 
    verticalAlign: 'middle',
    borderBottom: '1px solid #f7fafc'
  },
  statusBadge: { 
    padding: '4px 12px', 
    borderRadius: '999px', 
    fontSize: '0.75rem', 
    fontWeight: '700',
    display: 'inline-block'
  },
  cardFooter: {
    marginTop: '20px',
    textAlign: 'right',
    fontSize: '0.85rem',
    color: '#718096'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0,
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
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '10px',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    fontSize: '1rem',
    boxSizing: 'border-box'
  }
};

export default Appointments;