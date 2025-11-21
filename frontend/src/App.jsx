import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import TopNavbar from './components/TopNavbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import HealthRecords from './components/HealthRecords';
import Appointments from './components/Appointments';
import Medications from './components/Medications';
import Profile from './components/Profile';

function App() {
  const [user, setUser] = useState(null); 
  const [currentView, setCurrentView] = useState('login'); 
  const [activePage, setActivePage] = useState('dashboard'); 

  // --- NEW: Mobile Responsiveness State ---
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Listen for screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false); // Reset sidebar on desktop
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = (email) => {
    const name = email.split('@')[0];
    setUser(name.charAt(0).toUpperCase() + name.slice(1)); 
  };
  
  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
    setActivePage('dashboard');
  };

  const renderPage = () => {
    switch(activePage) {
      case 'dashboard': return <Dashboard userName={user} />;
      case 'records': return <HealthRecords />;
      case 'appointments': return <Appointments />;
      case 'medications': return <Medications />;
      case 'settings': return <Settings />;
      case 'profile': return <Profile />;
      default: return <Dashboard userName={user} />;
    }
  };

  if (!user) {
    if (currentView === 'login') {
      return <Login onLogin={handleLogin} onSwitchToRegister={() => setCurrentView('register')} />;
    } else {
      return <Register onRegister={handleLogin} onSwitchToLogin={() => setCurrentView('login')} />;
    }
  }

  return (
    <div style={styles.layout}>
      <TopNavbar 
        user={user} 
        onLogout={handleLogout} 
        activePage={activePage} 
        onNavigate={setActivePage}
        // Pass mobile props
        isMobile={isMobile}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <Sidebar 
        activePage={activePage} 
        onNavigate={(page) => {
          setActivePage(page);
          setIsSidebarOpen(false); // Close sidebar when link clicked on mobile
        }} 
        // Pass mobile props
        isMobile={isMobile}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Mobile Overlay (Dark background when sidebar is open) */}
      {isMobile && isSidebarOpen && (
        <div style={styles.overlay} onClick={() => setIsSidebarOpen(false)}></div>
      )}

      <main style={{
        ...styles.mainContent,
        marginLeft: isMobile ? 0 : '240px', // REMOVE MARGIN ON MOBILE
        padding: isMobile ? '80px 15px 20px 15px' : '100px 40px 40px 40px' // Smaller padding on mobile
      }}>
        <div style={styles.scrollableArea}>
          {renderPage()}
          
          <footer style={styles.footer}>
            <div>© 2025 Pasyente Inc.</div>
            {!isMobile && (
              <div style={styles.footerLinks}>
                <span>Company</span>
                <span>Resources</span>
                <span>Legal</span>
              </div>
            )}
          </footer>
        </div>
      </main>
    </div>
  );
}

const styles = {
  layout: {
    backgroundColor: '#f9fafb',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    overflowX: 'hidden' // Prevent horizontal scroll
  },
  mainContent: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    transition: 'margin-left 0.3s ease' // Smooth transition
  },
  scrollableArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  footer: {
    marginTop: 'auto',
    padding: '30px 0',
    borderTop: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    color: '#718096',
    fontSize: '0.85rem',
    flexWrap: 'wrap'
  },
  footerLinks: { display: 'flex', gap: '20px', fontWeight: '500', cursor: 'pointer' },
  
  // Overlay for mobile sidebar
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 40 // Below sidebar (50) but above content
  }
};

export default App;