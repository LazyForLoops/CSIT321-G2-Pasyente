import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function TopNavbar({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const getStyle = (path) => {
    return isActive(path) ? styles.activeLink : styles.link;
  };

  return (
    <header style={styles.header}>
      <div style={styles.logoSection} onClick={() => navigate('/')}>
        <span style={styles.logoIcon}>✲</span>
        <span style={styles.logoText}>PASYENTE</span>
      </div>

      <nav style={styles.navLinks}>
        <button style={getStyle('/')} onClick={() => navigate('/')}>
          Home
        </button>
        <button style={getStyle('/records')} onClick={() => navigate('/records')}>
          Health Records
        </button>
        <button style={getStyle('/appointments')} onClick={() => navigate('/appointments')}>
          Appointments
        </button>
        <button style={getStyle('/medications')} onClick={() => navigate('/medications')}>
          Medications
        </button>
      </nav>

      <div style={styles.actions}>
        <span style={styles.actionLink} onClick={() => navigate('/profile')}>
          👤 Profile
        </span>
        <span style={styles.actionLink} onClick={() => navigate('/settings')}>
          ⚙️ Settings
        </span>
        <button onClick={onLogout} style={styles.logoutBtn}>
           ↪ Logout
        </button>
      </div>
    </header>
  );
}

// ... (KEEP ALL EXISTING STYLES THE SAME) ...
const styles = {
  header: { backgroundColor: '#5865F2', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px', color: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 },
  logoSection: { display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '1px', cursor: 'pointer' },
  logoIcon: { fontSize: '1.5rem', marginRight: '8px' },
  logoText: { fontWeight: '800' },
  navLinks: { display: 'flex', gap: '10px' },
  link: { background: 'none', border: 'none', color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', fontWeight: '500', cursor: 'pointer', padding: '8px 12px', borderRadius: '4px', transition: 'all 0.2s' },
  activeLink: { background: 'rgba(255, 255, 255, 0.15)', border: 'none', color: 'white', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer', padding: '8px 12px', borderRadius: '4px' },
  actions: { display: 'flex', alignItems: 'center', gap: '20px' },
  actionLink: { cursor: 'pointer', fontSize: '0.9rem', opacity: 0.9, fontWeight: '500' },
  logoutBtn: { backgroundColor: '#eb4034', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }
};

export default TopNavbar;