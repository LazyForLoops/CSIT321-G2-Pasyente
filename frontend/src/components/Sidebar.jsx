import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Sidebar({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const getStyle = (path) => {
    return isActive(path) ? styles.menuItemActive : styles.menuItem;
  };

  return (
    <aside style={styles.sidebar}>
      <div style={styles.menuGroup}>
        <div onClick={() => navigate('/')} style={getStyle('/')}>
           <span style={styles.icon}>📊</span> Dashboard
        </div>

        <div onClick={() => navigate('/records')} style={getStyle('/records')}>
           <span style={styles.icon}>📄</span> Health Records
        </div>

        <div onClick={() => navigate('/appointments')} style={getStyle('/appointments')}>
           <span style={styles.icon}>📅</span> Appointments
        </div>

        <div onClick={() => navigate('/medications')} style={getStyle('/medications')}>
           <span style={styles.icon}>💊</span> Medications
        </div>
      </div>

      <div style={styles.divider}></div>

      <div style={styles.sectionTitle}>ACCOUNT</div>
      <div style={styles.menuGroup}>
        <div onClick={() => navigate('/profile')} style={getStyle('/profile')}>
           <span style={styles.icon}>👤</span> Profile
        </div>
        
        <div onClick={() => navigate('/settings')} style={getStyle('/settings')}>
           <span style={styles.icon}>⚙️</span> Settings
        </div>
      </div>

    </aside>
  );
}

const styles = {
  sidebar: { width: '240px', backgroundColor: '#ffffff', top: '60px', bottom: 0, position: 'fixed', left: 0, padding: '20px', borderRight: '1px solid #e0e0e0', zIndex: 50, display: 'flex', flexDirection: 'column', gap: '10px' },
  menuGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
  menuItem: { padding: '10px 15px', color: '#4a5568', cursor: 'pointer', borderRadius: '6px', fontSize: '0.95rem', display: 'flex', alignItems: 'center', transition: 'background-color 0.2s' },
  menuItemActive: { padding: '10px 15px', backgroundColor: '#f0f2f5', color: '#5865F2', fontWeight: '600', cursor: 'pointer', borderRadius: '6px', fontSize: '0.95rem', display: 'flex', alignItems: 'center' },
  icon: { marginRight: '12px', fontSize: '1.1rem' },
  sectionTitle: { fontSize: '0.75rem', color: '#a0aec0', fontWeight: 'bold', marginTop: '10px', marginBottom: '6px', paddingLeft: '15px', letterSpacing: '0.5px' },
  divider: { height: '1px', backgroundColor: '#e2e8f0', margin: '12px 0' }
};

export default Sidebar;