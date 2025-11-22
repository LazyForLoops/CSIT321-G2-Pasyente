import React, { useState } from 'react';

function Appointments() {
  // State to toggle between 'calendar' and 'list' views
  const [view, setView] = useState('calendar'); 

  return (
    <div style={styles.container}>
      {/* Header Section with Toggle */}
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Appointments</h1>
        
        <div style={styles.headerActions}>
          <button style={styles.primaryBtn}>+ Book New Appointment</button>
          
          {/* View Toggle Buttons */}
          <div style={styles.toggleGroup}>
            <button 
              style={view === 'calendar' ? styles.toggleBtnActive : styles.toggleBtn}
              onClick={() => setView('calendar')}
            >
              <span style={{marginRight: '5px'}}>📅</span> Calendar
            </button>
            <button 
              style={view === 'list' ? styles.toggleBtnActive : styles.toggleBtn}
              onClick={() => setView('list')}
            >
              <span style={{marginRight: '5px'}}>dX</span> List
            </button>
          </div>
        </div>
      </div>

      {/* CONDITIONAL RENDERING */}
      
      {/* 1. CALENDAR VIEW (New Implementation) */}
      {view === 'calendar' && (
        <div style={styles.calendarWrapper}>
          {/* Month Navigator */}
          <div style={styles.monthNav}>
            <button style={styles.navBtn}>‹</button>
            <span style={styles.monthLabel}>September 2025</span>
            <button style={styles.navBtn}>›</button>
          </div>

          {/* Calendar Grid */}
          <div style={styles.calendarCard}>
            {/* Weekday Headers */}
            <div style={styles.weekDaysHeader}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} style={styles.weekDay}>{day}</div>
              ))}
            </div>

            {/* Days Grid */}
            <div style={styles.daysGrid}>
              {/* Empty slots for previous month (Sept 1st is Monday) */}
              <div style={styles.dayCellEmpty}>31</div> 
              
              {/* Render days 1 to 30 */}
              {[...Array(30)].map((_, i) => {
                const dayNum = i + 1;
                const isSelected = dayNum === 30; // Highlight 30th like in the image
                return (
                  <div key={dayNum} style={isSelected ? styles.dayCellSelected : styles.dayCell}>
                    <span style={styles.dayNumber}>{dayNum}</span>
                  </div>
                );
              })}
              
              {/* Empty slots for next month */}
              <div style={styles.dayCellEmpty}>1</div>
              <div style={styles.dayCellEmpty}>2</div>
              <div style={styles.dayCellEmpty}>3</div>
              <div style={styles.dayCellEmpty}>4</div>
            </div>
          </div>
        </div>
      )}

      {/* 2. LIST VIEW (Your Original Code) */}
      {view === 'list' && (
        <div style={styles.listWrapper}>
          {/* Upcoming Section */}
          <h3 style={styles.sectionTitle}>Upcoming</h3>
          <div style={styles.listCard}>
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
          <div style={styles.listCard}>
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
      )}
    </div>
  );
}

// Your original Item Component
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
  
  // --- Header Styles Updated ---
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
  pageTitle: { fontSize: '2rem', fontWeight: '700', color: '#1a202c', margin: 0 },
  headerActions: { display: 'flex', alignItems: 'center', gap: '20px' },
  
  // Buttons
  primaryBtn: { padding: '10px 20px', backgroundColor: '#5865F2', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' },
  
  // Toggle Group
  toggleGroup: { display: 'flex', gap: '10px' },
  toggleBtn: { 
    padding: '8px 16px', 
    backgroundColor: 'white', 
    border: '1px solid #e2e8f0', 
    borderRadius: '6px', 
    color: '#718096', 
    fontWeight: '600', 
    cursor: 'pointer', 
    display: 'flex', 
    alignItems: 'center' 
  },
  toggleBtnActive: { 
    padding: '8px 16px', 
    backgroundColor: '#f7fafc', // Light gray active state
    border: '1px solid #cbd5e0', 
    borderRadius: '6px', 
    color: '#1a202c', 
    fontWeight: '700', 
    cursor: 'pointer', 
    display: 'flex', 
    alignItems: 'center' 
  },

  // --- Calendar View Styles ---
  calendarWrapper: { width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  monthNav: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '25px' },
  navBtn: { background: 'white', border: '1px solid #e2e8f0', width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4a5568' },
  monthLabel: { fontSize: '1.5rem', fontWeight: '700', color: '#1a202c' },
  
  calendarCard: { backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px', width: '100%', maxWidth: '800px' },
  weekDaysHeader: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '10px', textAlign: 'center' },
  weekDay: { fontSize: '0.85rem', fontWeight: '600', color: '#718096' },
  daysGrid: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' },
  
  dayCell: { 
    height: '100px', 
    backgroundColor: 'white', 
    border: '1px solid #f0f2f5', 
    borderRadius: '8px', 
    padding: '10px', 
    display: 'flex', 
    flexDirection: 'column',
    transition: '0.2s'
  },
  dayCellSelected: { 
    height: '100px', 
    backgroundColor: '#f0f4ff', // Light blue highlight
    border: '1px solid #5865F2', 
    borderRadius: '8px', 
    padding: '10px', 
    display: 'flex', 
    flexDirection: 'column' 
  },
  dayCellEmpty: { 
    height: '100px', 
    backgroundColor: '#f9fafb', // Gray for inactive days
    borderRadius: '8px', 
    padding: '10px',
    color: '#cbd5e0'
  },
  dayNumber: { fontSize: '0.9rem', fontWeight: '700', color: '#2d3748' },

  // --- List View Styles (Your Original Styles) ---
  listWrapper: { width: '100%' },
  sectionTitle: { fontSize: '1.1rem', color: '#718096', marginBottom: '15px', marginTop: '10px' },
  listCard: { backgroundColor: 'white', borderRadius: '12px', padding: '10px 25px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '30px' },
  item: { display: 'flex', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #f0f2f5' },
  dateBox: { width: '50px', height: '50px', borderRadius: '10px', backgroundColor: '#e0e7ff', color: '#4338ca', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginRight: '20px' },
  dateBoxPast: { width: '50px', height: '50px', borderRadius: '10px', backgroundColor: '#f3f4f6', color: '#6b7280', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginRight: '20px' },
  content: { flex: 1 },
  title: { fontWeight: '700', color: '#2d3748', fontSize: '1rem', marginBottom: '4px' },
  details: { color: '#718096', fontSize: '0.9rem' },
  statusBadge: { padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }
};

export default Appointments;