import React from 'react';

function TopNavbar({ user, onLogout, activePage, onNavigate, isMobile, onToggleSidebar }) {
  
  const getLinkStyle = (page) => {
    return activePage === page ? styles.activeLink : styles.link;
  };

  return (
    <header style={styles.header}>
      <div style={styles.leftSection}>
        {/* HAMBURGER BUTTON (Only visible on Mobile) */}
        {isMobile && (
          <button onClick={onToggleSidebar} style={styles.menuBtn}>
            ☰
          </button>
        )}

        <div style={styles.logoSection} onClick={() => onNavigate('dashboard')}>
          <span style={styles.logoIcon}>✲</span>
          <span style={styles.logoText}>PASYENTE</span>
        </div>
      </div>

      {/* NAVIGATION LINKS (Only visible on Desktop) */}
      {!isMobile && (
        <nav style={styles.navLinks}>
          <button style={getLinkStyle('dashboard')} onClick={() => onNavigate('dashboard')}>Home</button>
          <button style={getLinkStyle('records')} onClick={() => onNavigate('records')}>Health Records</button>
          <button style={getLinkStyle('appointments')} onClick={() => onNavigate('appointments')}>Appointments</button>
          <button style={getLinkStyle('medications')} onClick={() => onNavigate('medications')}>Medications</button>
        </nav>
      )}

      <div style={styles.actions}>
        {/* Hide text labels on mobile to save space */}
        {!isMobile && (
          <>
            <span style={styles.actionLink} onClick={() => onNavigate('profile')}>👤 Profile</span>
            <span style={styles.actionLink} onClick={() => onNavigate('settings')}>⚙️ Settings</span>
          </>
        )}
        
        <button onClick={onLogout} style={styles.logoutBtn}>
           {isMobile ? '↪' : '↪ Logout'}
        </button>
      </div>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: '#5865F2',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px', // Less padding for mobile
    color: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'fixed',
    top: 0, left: 0, right: 0,
    zIndex: 1000
  },
  leftSection: { display: 'flex', alignItems: 'center', gap: '15px' },
  menuBtn: {
    background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer', padding: 0
  },
  logoSection: { display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '1px', cursor: 'pointer' },
  logoIcon: { fontSize: '1.5rem', marginRight: '8px' },
  logoText: { fontWeight: '800' },
  navLinks: { display: 'flex', gap: '10px' },
  link: { background: 'none', border: 'none', color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', fontWeight: '500', cursor: 'pointer', padding: '8px 12px', borderRadius: '4px', transition: 'all 0.2s' },
  activeLink: { background: 'rgba(255, 255, 255, 0.15)', border: 'none', color: 'white', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer', padding: '8px 12px', borderRadius: '4px' },
  actions: { display: 'flex', alignItems: 'center', gap: '15px' },
  actionLink: { cursor: 'pointer', fontSize: '0.9rem', opacity: 0.9, fontWeight: '500' },
  logoutBtn: { backgroundColor: '#eb4034', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }
};

export default TopNavbar;