import React, { useState } from 'react';

function Settings() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [shareData, setShareData] = useState(true);

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Settings</h1>

      {/* Section 1: Notification Settings */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h2 style={styles.cardTitle}>Notification Settings</h2>
          <p style={styles.cardSubtitle}>Manage how you receive updates and alerts.</p>
        </div>

        <div style={styles.row}>
          <label style={styles.label}>Email Alerts</label>
          <Switch checked={emailAlerts} onChange={() => setEmailAlerts(!emailAlerts)} />
        </div>

        <div style={styles.row}>
          <label style={styles.label}>Notification Email</label>
          <input type="email" defaultValue="patient.user@example.com" style={styles.input} />
        </div>

        <div style={styles.row}>
          <label style={styles.label}>Push Notifications</label>
          <Switch checked={pushNotifs} onChange={() => setPushNotifs(!pushNotifs)} />
        </div>

        <div style={styles.row}>
          <label style={styles.label}>Appointment Reminders</label>
          <select style={styles.select}>
            <option>1 day before</option>
            <option>2 hours before</option>
            <option>No reminders</option>
          </select>
        </div>
      </div>

      {/* Section 2: Privacy Options */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h2 style={styles.cardTitle}>Privacy Options</h2>
          <p style={styles.cardSubtitle}>Control your data sharing preferences.</p>
        </div>

        <div style={styles.row}>
          <div style={styles.checkboxWrapper}>
            <input 
              type="checkbox" 
              checked={shareData} 
              onChange={() => setShareData(!shareData)} 
              style={styles.checkbox} 
            />
            <label style={styles.checkboxLabel}>Share anonymized data for research purposes</label>
          </div>
        </div>

        <div style={styles.row}>
          <label style={styles.label}>Profile visibility to linked doctors</label>
          <select style={styles.select}>
            <option>Full details</option>
            <option>Limited</option>
            <option>Hidden</option>
          </select>
        </div>
      </div>

      {/* Section 3: Account Management */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h2 style={styles.cardTitle}>Account Management</h2>
          <p style={styles.cardSubtitle}>Manage your account details and security.</p>
        </div>

        <div style={styles.row}>
          <label style={styles.label}>Change Password</label>
          <button style={styles.secondaryBtn}>Change Password</button>
        </div>

        <div style={styles.row}>
          <label style={styles.label}>Enable Two-Factor Authentication</label>
          <Switch checked={twoFactor} onChange={() => setTwoFactor(!twoFactor)} />
        </div>

        <div style={styles.row}>
          <label style={styles.label}>Delete Account</label>
          <button style={styles.dangerBtn}>Delete Account</button>
        </div>
      </div>

      {/* Bottom Actions */}
      <div style={styles.actionButtons}>
        <button style={styles.cancelBtn}>Cancel</button>
        <button style={styles.saveBtn}>Save Changes</button>
      </div>
    </div>
  );
}

// --- Switch Component ---
function Switch({ checked, onChange }) {
  return (
    <div 
      onClick={onChange} 
      style={{
        ...styles.switchContainer,
        backgroundColor: checked ? '#5865F2' : '#e2e8f0',
      }}
    >
      <div style={{
        ...styles.switchKnob,
        transform: checked ? 'translateX(20px)' : 'translateX(0)',
      }} />
    </div>
  );
}

const styles = {
  // CHANGED: Removed fixed maxWidth to allow it to stretch like the reference
  container: { 
    padding: '40px', 
    width: '100%', 
    maxWidth: '1200px', // Much wider limit
    margin: '0 auto'    // Center the whole container
  },
  pageTitle: { fontSize: '2rem', fontWeight: '700', color: '#1a202c', marginBottom: '30px' },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '35px', // More padding inside cards
    marginBottom: '25px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  cardHeader: { marginBottom: '30px' },
  cardTitle: { fontSize: '1.25rem', fontWeight: '700', margin: '0 0 8px 0', color: '#2d3748' },
  cardSubtitle: { fontSize: '0.95rem', color: '#718096', margin: 0 },
  
  row: {
    display: 'flex',
    justifyContent: 'space-between', // Pushes label to left, input to right
    alignItems: 'center',
    marginBottom: '25px',
    minHeight: '40px' // Ensures rows have consistent height
  },
  label: { fontWeight: '600', color: '#4a5568', fontSize: '0.95rem' },
  
  // Inputs aligned to the right
  input: {
    padding: '10px 15px',
    borderRadius: '6px',
    border: '1px solid #cbd5e0',
    width: '300px', // Wider input
    fontSize: '0.9rem',
    color: '#2d3748',
    textAlign: 'left'
  },
  select: {
    padding: '10px 15px',
    borderRadius: '6px',
    border: '1px solid #cbd5e0',
    width: '330px', // Wider select
    fontSize: '0.9rem',
    color: '#2d3748',
    backgroundColor: 'white',
    cursor: 'pointer'
  },
  
  checkboxWrapper: { display: 'flex', alignItems: 'center' },
  checkbox: { transform: 'scale(1.3)', marginRight: '12px', accentColor: '#5865F2', cursor: 'pointer' },
  checkboxLabel: { fontSize: '0.95rem', color: '#4a5568', fontWeight: '500' },
  
  // Buttons
  secondaryBtn: {
    backgroundColor: 'white',
    border: '1px solid #cbd5e0',
    padding: '10px 20px',
    borderRadius: '6px',
    color: '#4a5568',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  dangerBtn: {
    backgroundColor: '#e53e3e',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    color: 'white',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  actionButtons: { display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '40px' },
  cancelBtn: {
    padding: '12px 24px',
    backgroundColor: 'white',
    border: '1px solid #cbd5e0',
    borderRadius: '6px',
    color: '#4a5568',
    fontWeight: '600',
    cursor: 'pointer'
  },
  saveBtn: {
    padding: '12px 24px',
    backgroundColor: '#5865F2',
    border: 'none',
    borderRadius: '6px',
    color: 'white',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(88, 101, 242, 0.3)'
  },

  // Switch Styles
  switchContainer: {
    width: '48px',
    height: '26px',
    borderRadius: '99px',
    position: 'relative',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  switchKnob: {
    width: '22px',
    height: '22px',
    backgroundColor: 'white',
    borderRadius: '50%',
    position: 'absolute',
    top: '2px',
    left: '2px',
    transition: 'transform 0.2s',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
  }
};

export default Settings;