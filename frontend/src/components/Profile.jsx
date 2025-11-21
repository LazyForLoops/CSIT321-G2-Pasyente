import React, { useState } from 'react';

function Profile() {
  // State for toggles
  const [twoFactor, setTwoFactor] = useState(false);
  const [newsletter, setNewsletter] = useState(true);

  return (
    <div style={styles.container}>
      
      {/* Section 1: User Profile Header */}
      <div style={styles.card}>
        <h2 style={styles.cardHeaderTitle}>User Profile</h2>
        <div style={styles.profileHeader}>
          <div style={styles.avatarSection}>
            <img 
              src="https://i.pravatar.cc/150?img=5" // Placeholder image
              alt="Profile" 
              style={styles.avatar} 
            />
            <div>
              <h2 style={styles.name}>Aisha Khan</h2>
              <div style={styles.email}>aisha.khan@example.com</div>
            </div>
          </div>
          <button style={styles.secondaryBtn}>Change Profile Picture</button>
        </div>
      </div>

      {/* Section 2: Personal Information */}
      <div style={styles.card}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.cardTitle}>Personal Information</h3>
          <button style={styles.iconBtn}>✎ Edit</button>
        </div>

        <div style={styles.formGrid}>
          {/* Row 1 */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input type="text" defaultValue="Aisha Khan" style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input type="email" defaultValue="aisha.khan@example.com" style={styles.input} />
          </div>

          {/* Row 2 */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Phone Number</label>
            <input type="text" defaultValue="+1 (555) 123-4567" style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Date of Birth</label>
            <input type="text" defaultValue="1990-07-21" style={styles.input} />
          </div>

          {/* Row 3 - Full Width */}
          <div style={{...styles.inputGroup, gridColumn: 'span 2'}}>
            <label style={styles.label}>Address</label>
            <input type="text" defaultValue="123 Healthway St., MediCity, CA 90210" style={styles.input} />
          </div>
        </div>
      </div>

      {/* Section 3: Security */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Security</h3>
        
        <div style={styles.row}>
          <div>
            <div style={styles.settingTitle}>Change Password</div>
            <div style={styles.settingSubtitle}>Update your account password.</div>
          </div>
          <button style={styles.secondaryBtn}>🔑 Change Password</button>
        </div>

        <div style={styles.divider}></div>

        <div style={styles.row}>
          <div>
            <div style={styles.settingTitle}>Two-Factor Authentication</div>
            <div style={styles.settingSubtitle}>Add an extra layer of security to your account.</div>
          </div>
          <Switch checked={twoFactor} onChange={() => setTwoFactor(!twoFactor)} />
        </div>
      </div>

      {/* Section 4: Preferences */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Preferences</h3>
        
        <div style={styles.row}>
          <div>
            <div style={styles.settingTitle}>Preferred Language</div>
            <div style={styles.settingSubtitle}>Select your preferred language for the application.</div>
          </div>
          <select style={styles.select}>
            <option>English</option>
            <option>Spanish</option>
            <option>Filipino</option>
          </select>
        </div>

        <div style={styles.divider}></div>

        <div style={styles.row}>
          <div>
            <div style={styles.settingTitle}>Receive Newsletter</div>
            <div style={styles.settingSubtitle}>Receive updates and special offers via email.</div>
          </div>
          <Switch checked={newsletter} onChange={() => setNewsletter(!newsletter)} />
        </div>
      </div>

    </div>
  );
}

// --- Helper Switch Component ---
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
  container: { 
    padding: '40px', 
    width: '100%', 
    maxWidth: '1200px', 
    margin: '0 auto' 
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '30px',
    marginBottom: '25px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
  },
  cardHeaderTitle: { fontSize: '1.25rem', fontWeight: '700', margin: '0 0 20px 0', color: '#1a202c' },
  
  // Profile Header
  profileHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  avatarSection: { display: 'flex', alignItems: 'center', gap: '20px' },
  avatar: { width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #e2e8f0' },
  name: { margin: 0, fontSize: '1.3rem', fontWeight: '700', color: '#2d3748' },
  email: { color: '#718096', fontSize: '0.95rem' },

  // Form Section
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  cardTitle: { fontSize: '1.1rem', fontWeight: '700', margin: '0 0 20px 0', color: '#2d3748' },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '0.9rem', fontWeight: '600', color: '#4a5568' },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc', // Slightly gray bg for inputs
    color: '#2d3748',
    fontSize: '0.95rem',
    outline: 'none'
  },
  
  // Rows & Settings
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' },
  settingTitle: { fontWeight: '600', color: '#2d3748', fontSize: '0.95rem' },
  settingSubtitle: { color: '#718096', fontSize: '0.85rem', marginTop: '2px' },
  divider: { height: '1px', backgroundColor: '#edf2f7', margin: '15px 0' },
  
  select: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #cbd5e0',
    backgroundColor: 'white',
    color: '#2d3748',
    fontSize: '0.9rem',
    cursor: 'pointer'
  },

  // Buttons
  secondaryBtn: {
    padding: '10px 16px',
    backgroundColor: 'white',
    border: '1px solid #cbd5e0',
    borderRadius: '6px',
    color: '#4a5568',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'all 0.2s'
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    color: '#718096',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '0.9rem',
    display: 'flex', 
    alignItems: 'center',
    gap: '5px'
  },

  // Switch Styles (Reused)
  switchContainer: {
    width: '44px',
    height: '24px',
    borderRadius: '99px',
    position: 'relative',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  switchKnob: {
    width: '20px',
    height: '20px',
    backgroundColor: 'white',
    borderRadius: '50%',
    position: 'absolute',
    top: '2px',
    left: '2px',
    transition: 'transform 0.2s',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
  }
};

export default Profile;