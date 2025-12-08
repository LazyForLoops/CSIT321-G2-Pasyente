import React, { useEffect, useMemo, useState } from 'react';

function Appointments({ userEmail }) {
  const [view, setView] = useState('calendar');
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    title: '',
    date: '',
    time: '',
    doctorName: '',
    status: 'Confirmed',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const loadAppointments = async () => {
    if (!userEmail) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/appointments?userEmail=${encodeURIComponent(userEmail)}`);
      const data = await res.json();
      setAppointments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load appointments', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, [userEmail]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!userEmail || !form.title || !form.date || !form.time) {
      alert('Please fill title, date and time.');
      return;
    }
    const appointmentDateTime = new Date(`${form.date}T${form.time}`);
    try {
      const res = await fetch('http://localhost:8080/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          doctorName: form.doctorName,
          status: form.status,
          description: form.description,
          appointmentDateTime,
          userEmail
        })
      });
      if (!res.ok) {
        throw new Error('Unable to save appointment');
      }
      setForm({ title: '', date: '', time: '', doctorName: '', status: 'Confirmed', description: '' });
      loadAppointments();
    } catch (err) {
      console.error(err);
      alert('Could not save appointment.');
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    await fetch(`http://localhost:8080/api/appointments/${id}`, { method: 'DELETE' });
    loadAppointments();
  };

  const upcoming = useMemo(() => appointments.filter(a => !a.status || a.status !== 'Completed'), [appointments]);
  const past = useMemo(() => appointments.filter(a => a.status === 'Completed'), [appointments]);

  const formatDateParts = (iso) => {
    const d = iso ? new Date(iso) : new Date();
    return {
      day: d.getDate().toString().padStart(2, '0'),
      month: d.toLocaleString('default', { month: 'short' }).toUpperCase(),
      time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Appointments</h1>
        <div style={styles.headerActions}>
          <button style={styles.primaryBtn} onClick={() => setView('list')}>Manage Appointments</button>
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
              <span style={{marginRight: '5px'}}>📋</span> List
            </button>
          </div>
        </div>
      </div>

      {/* Quick Add Form */}
      <form style={styles.form} onSubmit={handleCreate}>
        <input style={styles.input} placeholder="Title" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})}/>
        <input style={styles.input} type="date" value={form.date} onChange={(e)=>setForm({...form,date:e.target.value})}/>
        <input style={styles.input} type="time" value={form.time} onChange={(e)=>setForm({...form,time:e.target.value})}/>
        <input style={styles.input} placeholder="Doctor" value={form.doctorName} onChange={(e)=>setForm({...form,doctorName:e.target.value})}/>
        <select style={styles.select} value={form.status} onChange={(e)=>setForm({...form,status:e.target.value})}>
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <input style={styles.input} placeholder="Notes (optional)" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})}/>
        <button style={styles.primaryBtn} type="submit" disabled={loading}>Save</button>
      </form>

      {view === 'calendar' && (
        <div style={styles.calendarWrapper}>
          <div style={styles.monthNav}>
            <span style={styles.monthLabel}>Upcoming dates</span>
          </div>
          <div style={styles.calendarCard}>
            {upcoming.length === 0 && <div style={{padding:'20px', color:'#718096'}}>No upcoming appointments yet.</div>}
            {upcoming.map((a) => {
              const parts = formatDateParts(a.appointmentDateTime);
              return (
                <div key={a.appointmentID} style={{...styles.item, borderBottom:'1px solid #f0f2f5'}}>
                  <div style={styles.dateBox}>
                    <span style={{fontSize: '1.1rem', fontWeight: 'bold'}}>{parts.day}</span>
                    <span style={{fontSize: '0.75rem', textTransform: 'uppercase'}}>{parts.month}</span>
                  </div>
                  <div style={styles.content}>
                    <div style={styles.title}>{a.title}</div>
                    <div style={styles.details}>{parts.time} • {a.doctorName || 'TBD'}</div>
                  </div>
                  <span style={{...styles.statusBadge, backgroundColor: a.status === 'Confirmed' ? '#def7ec' : a.status === 'Completed' ? '#f3f4f6' : '#feecdc', color: a.status === 'Confirmed' ? '#03543f' : a.status === 'Completed' ? '#6b7280' : '#9c4221'}}>
                    {a.status || 'Pending'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {view === 'list' && (
        <div style={styles.listWrapper}>
          <h3 style={styles.sectionTitle}>Upcoming</h3>
          <div style={styles.listCard}>
            {upcoming.length === 0 && <div style={{padding:'12px', color:'#718096'}}>No upcoming items.</div>}
            {upcoming.map((a) => {
              const parts = formatDateParts(a.appointmentDateTime);
              return (
                <AppointmentItem 
                  key={a.appointmentID}
                  day={parts.day}
                  month={parts.month}
                  title={a.title}
                  time={parts.time}
                  doctor={a.doctorName}
                  status={a.status}
                  onDelete={() => handleDelete(a.appointmentID)}
                />
              );
            })}
          </div>

          <h3 style={styles.sectionTitle}>Past Visits</h3>
          <div style={styles.listCard}>
            {past.length === 0 && <div style={{padding:'12px', color:'#718096'}}>No past items.</div>}
            {past.map((a) => {
              const parts = formatDateParts(a.appointmentDateTime);
              return (
                <AppointmentItem 
                  key={a.appointmentID}
                  day={parts.day}
                  month={parts.month}
                  title={a.title}
                  time={parts.time}
                  doctor={a.doctorName}
                  status={a.status}
                  isPast
                  onDelete={() => handleDelete(a.appointmentID)}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function AppointmentItem({ day, month, title, time, doctor, status, isPast, onDelete }) {
  return (
    <div style={styles.item}>
      <div style={isPast ? styles.dateBoxPast : styles.dateBox}>
        <span style={{fontSize: '1.1rem', fontWeight: 'bold'}}>{day}</span>
        <span style={{fontSize: '0.75rem', textTransform: 'uppercase'}}>{month}</span>
      </div>
      <div style={styles.content}>
        <div style={styles.title}>{title}</div>
        <div style={styles.details}>{time} • {doctor || 'TBD'}</div>
      </div>
      <span style={{...styles.statusBadge, backgroundColor: status === 'Confirmed' ? '#def7ec' : status === 'Completed' ? '#f3f4f6' : '#feecdc', color: status === 'Confirmed' ? '#03543f' : status === 'Completed' ? '#6b7280' : '#9c4221'}}>
        {status}
      </span>
      <button onClick={onDelete} style={{marginLeft:'12px', background:'none', border:'none', color:'#e53e3e', cursor:'pointer'}}>Delete</button>
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
  statusBadge: { padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' },

  // Form
  form: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', background: '#fff', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '24px' },
  input: { padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.95rem' },
  select: { padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.95rem', background: '#fff' }
};

export default Appointments;