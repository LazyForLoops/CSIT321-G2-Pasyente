import React from 'react';

function Sidebar({ activePage, onNavigate, isMobile, isOpen, onClose }) {
  
  const getMenuItemStyle = (page) => {
    return activePage === page ? styles.menuItemActive : styles.menuItem;
  };

  return (
    <aside style={{
      ...styles.sidebar,
      // DYNAMIC STYLES
      left: isMobile ? (isOpen ? '0' : '-250px') : '0', // Hide on mobile if closed
      boxShadow: isMobile && isOpen ? '2px 0 10px rgba(0,0,0,0.2)' : 'none',
      width: isMobile ? '250px' : '240px',
    }}>
      
      {/* Close Button for Mobile */}
      {isMobile && (
        <div style={styles.closeBtnContainer}>
          <h3 style={{margin: 0, color: '#5865F2'}}>Menu</h3>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>
      )}

      <div style={styles.menuGroup}>
        <div onClick={() => onNavigate('dashboard')} style={getMenuItemStyle('dashboard')}>
           <span style={styles.icon}>📊</span> Dashboard
        </div>
        <div onClick={() => onNavigate('records')} style={getMenuItemStyle('records')}>
           <span style={styles.icon}>📄</span> Health Records
        </div>
        <div onClick={() => onNavigate('appointments')} style={getMenuItemStyle('appointments')}>
           <span style={styles.icon}>📅</span> Appointments
        </div>
        <div onClick={() => onNavigate('medications')} style={getMenuItemStyle('medications')}>
           <span style={styles.icon}>💊</span> Medications
        </div>
      </div>

      <div style={styles.divider}></div>

      <div style={styles.sectionTitle}>ACCOUNT</div>
      <div style={styles.menuGroup}>
        <div onClick={() => onNavigate('profile')} style={getMenuItemStyle('profile')}>
           <span style={styles.icon}>👤</span> Profile
        </div>
        <div onClick={() => onNavigate('settings')} style={getMenuItemStyle('settings')}>
           <span style={styles.icon}>⚙️</span> Settings
        </div>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    backgroundColor: '#ffffff',
    top: '60px', 
    bottom: 0,
    position: 'fixed',
    padding: '20px',
    borderRight: '1px solid #e0e0e0',
    zIndex: 50,
    transition: 'left 0.3s ease' // Smooth slide animation
  },
  closeBtnContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid #f0f0f0',
    paddingBottom: '10px'
  },
  closeBtn: {
    background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#718096'
  },
  menuGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
  menuItem: { padding: '10px 15px', color: '#4a5568', cursor: 'pointer', borderRadius: '6px', fontSize: '0.95rem', display: 'flex', alignItems: 'center' },
  menuItemActive: { padding: '10px 15px', backgroundColor: '#f0f2f5', color: '#5865F2', fontWeight: '600', cursor: 'pointer', borderRadius: '6px', fontSize: '0.95rem', display: 'flex', alignItems: 'center' },
  icon: { marginRight: '12px', fontSize: '1.1rem' },
  sectionTitle: { fontSize: '0.75rem', color: '#a0aec0', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px', paddingLeft: '15px', letterSpacing: '0.5px' },
  divider: { height: '1px', backgroundColor: '#e2e8f0', margin: '20px 0' }
};

export default Sidebar;