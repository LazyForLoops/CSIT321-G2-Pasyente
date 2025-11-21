import React from 'react';

function Appointments() {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Appointments</h1>
        <button style={styles.primaryBtn}>+ Book Appointment</button>
      </div>

      {/* Upcoming Section */}
      <h3 style={styles.sectionTitle}>Upcoming</h3>
      <div style={styles.card}>
        <AppointmentItem 
          day="26" month="OCT" 
          title="Dental Check-up" 
          time="10:00 AM - 11:00 AM" 
          doctor="Dr. Anagna (Dentist)" 
          status="Confirmed"
        />
        <AppointmentItem 
          day="03" month="NOV" 
          title="Cardiology Follow-up" 
          time="02:30 PM - 03:00 PM" 
          doctor="Dr. Cruz (Cardiologist)" 
          status="Pending"
        />
      </div>

      {/* Past Section */}
      <h3 style={styles.sectionTitle}>Past Visits</h3>
      <div style={styles.card}>
        <AppointmentItem 
          day="15" month="SEP" 
          title="General Consultation" 
          time="09:00 AM" 
          doctor="Dr. Santos" 
          status="Completed"
          isPast={true}
        />
      </div>
    </div>
  );
}

function AppointmentItem({ day, month, title, time, doctor, status, isPast }) {
  return (
    <div style={styles.item}>
      <div style={isPast ? styles.dateBoxPast : styles.dateBox}>
        <span style={{fontSize: '1.1rem', fontWeight: 'bold'}}>{day}</span>
        <span style={{fontSize: '0.75rem', textTransform: 'uppercase'}}>{month}</span>
      </div>
      <div style={styles.content}>
        <div style={styles.title}>{title}</div>
        <div style={styles.details}>{time} • {doctor}</div>
      </div>
      <span style={{...styles.statusBadge, backgroundColor: status === 'Confirmed' ? '#def7ec' : status === 'Completed' ? '#f3f4f6' : '#feecdc', color: status === 'Confirmed' ? '#03543f' : status === 'Completed' ? '#6b7280' : '#9c4221'}}>
        {status}
      </span>
    </div>
  );
}

const styles = {
  container: { padding: '40px', width: '100%', maxWidth: '1200px', margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
  pageTitle: { fontSize: '2rem', fontWeight: '700', color: '#1a202c', margin: 0 },
  sectionTitle: { fontSize: '1.1rem', color: '#718096', marginBottom: '15px', marginTop: '10px' },
  primaryBtn: { padding: '10px 20px', backgroundColor: '#5865F2', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' },
  card: { backgroundColor: 'white', borderRadius: '12px', padding: '10px 25px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '30px' },
  item: { display: 'flex', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #f0f2f5' },
  dateBox: { width: '50px', height: '50px', borderRadius: '10px', backgroundColor: '#e0e7ff', color: '#4338ca', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginRight: '20px' },
  dateBoxPast: { width: '50px', height: '50px', borderRadius: '10px', backgroundColor: '#f3f4f6', color: '#6b7280', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginRight: '20px' },
  content: { flex: 1 },
  title: { fontWeight: '700', color: '#2d3748', fontSize: '1rem', marginBottom: '4px' },
  details: { color: '#718096', fontSize: '0.9rem' },
  statusBadge: { padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }
};

export default Appointments;