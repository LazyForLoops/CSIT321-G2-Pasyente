import React, { useState } from 'react';

function Login({ onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulating a login check
    if(email && password) {
        onLogin(email); 
    } else {
        alert("Please enter email and password");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Logo and Title Area */}
        <div style={styles.header}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>✲</span> PASYENTE
          </div>
          <h2 style={styles.title}>Login to PASYENTE</h2>
        </div>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Email Input */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email or Username</label>
            <input 
              type="email" 
              placeholder="john.doe@example.com" 
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          {/* Password Input */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          {/* Login Button */}
          <button type="submit" style={styles.button}>Login</button>
        </form>
        
        {/* Footer Links */}
        <div style={styles.footer}>
          <a href="#" style={styles.forgotLink}>Forgot Password?</a>
          <p style={styles.registerText}>
            Don't have an account? 
            <span onClick={onSwitchToRegister} style={styles.registerLink}> Register</span>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f9fafb', // A very light gray background
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    padding: '40px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)', // Softer shadow
    textAlign: 'center'
  },
  header: {
    marginBottom: '30px'
  },
  logo: {
    color: '#5865F2', // The blue brand color
    fontWeight: 'bold',
    fontSize: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px'
  },
  logoIcon: {
    marginRight: '8px',
    fontSize: '1.8rem'
  },
  title: {
    color: '#1a1a1a',
    fontSize: '1.5rem',
    fontWeight: '600',
    margin: 0
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  inputGroup: {
    textAlign: 'left'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#4a5568',
    fontSize: '0.9rem',
    fontWeight: '500'
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    fontSize: '1rem',
    color: '#2d3748',
    boxSizing: 'border-box', // Important for padding to not affect width
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#5865F2', // Brand blue color
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  footer: {
    marginTop: '25px',
    fontSize: '0.9rem',
    color: '#718096'
  },
  forgotLink: {
    color: '#5865F2',
    textDecoration: 'none',
    display: 'inline-block',
    marginBottom: '15px',
    fontWeight: '500'
  },
  registerText: {
    margin: 0
  },
  registerLink: {
    color: '#5865F2',
    cursor: 'pointer',
    fontWeight: '600',
    marginLeft: '4px'
  }
};

export default Login;