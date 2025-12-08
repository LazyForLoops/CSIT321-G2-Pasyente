import React from 'react';

function TopNavbar({ onLogout }) {
  return (
    <header style={styles.header}>
      <div style={styles.logoSection}>
        <span style={styles.logoIcon}>✲</span>
        <span style={styles.logoText}>PASYENTE</span>
      </div>
      <div style={styles.actions}>
        <button onClick={onLogout} style={styles.logoutBtn}>
          ↪ Logout
        </button>
      </div>
    </header>
  );
}

const styles = {
  header: { backgroundColor: '#6a6eea', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', color: 'white', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 },
  logoSection: { display: 'flex', alignItems: 'center', fontWeight: '800', fontSize: '1.3rem', fontStyle: 'italic', letterSpacing: '0.8px' },
  logoIcon: { fontSize: '1.6rem', marginRight: '10px' },
  logoText: { fontWeight: '800' },
  actions: { display: 'flex', alignItems: 'center', gap: '12px' },
  logoutBtn: { backgroundColor: '#e34c4c', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '0.9rem' }
};

export default TopNavbar;