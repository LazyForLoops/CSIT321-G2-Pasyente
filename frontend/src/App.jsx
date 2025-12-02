// import React, { useState, useEffect } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// import Login from './components/Login';
// import Register from './components/Register';
// import TopNavbar from './components/TopNavbar';
// import Sidebar from './components/Sidebar';
// import Dashboard from './components/Dashboard';
// import Settings from './components/Settings';
// import HealthRecords from './components/HealthRecords';
// import Appointments from './components/Appointments';
// import Medications from './components/Medications';
// import Profile from './components/Profile';

// function App() {
//   // CHANGED: Initialize state by checking Local Storage first
//   const [user, setUser] = useState(() => {
//     return localStorage.getItem('pasyente_user') || null;
//   });

//   const [currentView, setCurrentView] = useState('login'); 

//   const handleLogin = (email) => {
//     const name = email.split('@')[0];
//     const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    
//     // CHANGED: Save the user to Local Storage when they login
//     localStorage.setItem('pasyente_user', formattedName);
//     setUser(formattedName); 
//   };
  
//   const handleLogout = () => {
//     // CHANGED: Remove the user from Local Storage when they logout
//     localStorage.removeItem('pasyente_user');
//     setUser(null);
//     setCurrentView('login');
//   };

//   // --- AUTHENTICATION CHECK ---
//   if (!user) {
//     if (currentView === 'login') {
//       return <Login onLogin={handleLogin} onSwitchToRegister={() => setCurrentView('register')} />;
//     } else {
//       return <Register onRegister={handleLogin} onSwitchToLogin={() => setCurrentView('login')} />;
//     }
//   }

//   return (
//     <BrowserRouter>
//       <div style={styles.layout}>
        
//         <TopNavbar user={user} onLogout={handleLogout} />
//         <Sidebar />

//         <main style={styles.mainContent}>
//           <div style={styles.scrollableArea}>
            
//             <Routes>
//               <Route path="/" element={<Dashboard userName={user} />} />
//               <Route path="/dashboard" element={<Navigate to="/" />} />
//               <Route path="/records" element={<HealthRecords />} />
//               <Route path="/appointments" element={<Appointments />} />
//               <Route path="/medications" element={<Medications />} />
//               <Route path="/settings" element={<Settings />} />
//               <Route path="/profile" element={<Profile />} />
//             </Routes>

//             <footer style={styles.footer}>
//               <div>© 2025 Pasyente Inc.</div>
//               <div style={styles.footerLinks}>
//                 <span>Company</span>
//                 <span>Resources</span>
//                 <span>Legal</span>
//               </div>
//             </footer>
//           </div>
//         </main>
//       </div>
//     </BrowserRouter>
//   );
// }

// const styles = {
//   layout: {
//     backgroundColor: '#f9fafb',
//     minHeight: '100vh',
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
//   },
//   mainContent: {
//     marginLeft: '240px', 
//     paddingTop: '100px', 
//     minHeight: '100vh',
//     display: 'flex',
//     flexDirection: 'column'
//   },
//   scrollableArea: {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'column'
//   },
//   footer: {
//     marginTop: 'auto',
//     padding: '30px 40px',
//     borderTop: '1px solid #e2e8f0',
//     display: 'flex',
//     justifyContent: 'space-between',
//     color: '#718096',
//     fontSize: '0.85rem'
//   },
//   footerLinks: { display: 'flex', gap: '20px', fontWeight: '500', cursor: 'pointer' }
// };

// export default App;


import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

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
  const [user, setUser] = useState(() => localStorage.getItem('pasyente_user'));

  const handleLogin = (email) => {
    const name = email.split('@')[0];
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

    localStorage.setItem('pasyente_user', formattedName);
    setUser(formattedName);
  };

  const handleLogout = () => {
    localStorage.removeItem('pasyente_user');
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* ---------- PUBLIC ROUTES ---------- */}
        {!user && (
          <>
            <Route
              path="/login"
              element={<Login onLogin={handleLogin} />}
            />
            <Route
              path="/register"
              element={<Register onRegister={handleLogin} />}
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}

        {/* ---------- PROTECTED ROUTES ---------- */}
        {user && (
          <Route
            path="/*"
            element={
              <div style={styles.layout}>
                <TopNavbar user={user} onLogout={handleLogout} />
                <Sidebar />

                <main style={styles.mainContent}>
                  <div style={styles.scrollableArea}>
                    <Routes>
                      <Route path="/" element={<Dashboard userName={user} />} />
                      <Route path="/records" element={<HealthRecords />} />
                      <Route path="/appointments" element={<Appointments />} />
                      <Route path="/medications" element={<Medications />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/profile" element={<Profile />} />

                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>

                    <footer style={styles.footer}>
                      <div>© 2025 Pasyente Inc.</div>
                      <div style={styles.footerLinks}>
                        <span>Company</span>
                        <span>Resources</span>
                        <span>Legal</span>
                      </div>
                    </footer>
                  </div>
                </main>
              </div>
            }
          />
        )}
      </Routes>
    </BrowserRouter>
  );
}

const styles = {
  layout: {
    backgroundColor: '#f9fafb',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  mainContent: {
    marginLeft: '240px',
    paddingTop: '100px',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  scrollableArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  footer: {
    marginTop: 'auto',
    padding: '30px 40px',
    borderTop: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    color: '#718096',
    fontSize: '0.85rem'
  },
  footerLinks: {
    display: 'flex',
    gap: '20px',
    fontWeight: '500',
    cursor: 'pointer'
  }
};

export default App;
