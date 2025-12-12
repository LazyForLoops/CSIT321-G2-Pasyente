import React, { useEffect, useState } from 'react';

function Profile({ user, onProfileUpdate }) {
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phoneNumber: '',
    dateOfBirth: '',
    address: '',
    language: 'English',
    newsletter: true,
    twoFactorEnabled: false
  });

  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.email) return;
      try {
        const res = await fetch(`http://localhost:8080/api/profile/${encodeURIComponent(user.email)}`);
        if (res.ok) {
          const data = await res.json();
          setProfile(prev => ({ ...prev, ...data }));
        }
      } catch (e) {
        console.error('Failed to load profile', e);
      }
    };
    loadProfile();
  }, [user]);

  const saveProfile = async () => {
    if (!user?.email) return;
    try {
      const res = await fetch(`http://localhost:8080/api/profile/${encodeURIComponent(user.email)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      if (!res.ok) throw new Error('Save failed');
      const saved = await res.json();
      onProfileUpdate?.(saved);
      alert('Profile saved');
    } catch (e) {
      console.error(e);
      alert('Could not save profile');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.cardHeaderTitle}>User Profile</h2>
        <div style={styles.profileHeader}>
          <div style={styles.avatarSection}>
            <img 
              src="https://i.pravatar.cc/150?img=5"
              alt="Profile" 
              style={styles.avatar} 
            />
            <div>
              <h2 style={styles.name}>{profile.name || 'User'}</h2>
              <div style={styles.email}>{profile.email}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.cardTitle}>Personal Information</h3>
          <button style={styles.iconBtn} onClick={saveProfile}>💾 Save</button>
        </div>

        <div style={styles.formGrid}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input type="text" value={profile.name || ''} onChange={(e)=>setProfile({...profile,name:e.target.value})} style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input type="email" value={profile.email || ''} readOnly style={{...styles.input, backgroundColor:'#edf2f7'}} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Phone Number</label>
            <input type="text" value={profile.phoneNumber || ''} onChange={(e)=>setProfile({...profile,phoneNumber:e.target.value})} style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Date of Birth</label>
            <input type="date" value={profile.dateOfBirth || ''} onChange={(e)=>setProfile({...profile,dateOfBirth:e.target.value})} style={styles.input} />
          </div>
          <div style={{...styles.inputGroup, gridColumn: 'span 2'}}>
            <label style={styles.label}>Address</label>
            <input type="text" value={profile.address || ''} onChange={(e)=>setProfile({...profile,address:e.target.value})} style={styles.input} />
          </div>
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Security</h3>
        
        <div style={styles.row}>
          <div>
            <div style={styles.settingTitle}>Two-Factor Authentication</div>
            <div style={styles.settingSubtitle}>Add an extra layer of security to your account.</div>
          </div>
          <Switch checked={profile.twoFactorEnabled} onChange={() => setProfile({...profile, twoFactorEnabled: !profile.twoFactorEnabled})} />
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Preferences</h3>
        
        <div style={styles.row}>
          <div>
            <div style={styles.settingTitle}>Preferred Language</div>
            <div style={styles.settingSubtitle}>Select your preferred language for the application.</div>
          </div>
          <select style={styles.select} value={profile.language || 'English'} onChange={(e)=>setProfile({...profile,language:e.target.value})}>
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
          <Switch checked={profile.newsletter ?? true} onChange={() => setProfile({...profile, newsletter: !(profile.newsletter ?? true)})} />
        </div>
      </div>

    </div>
  );
}

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