import React, { useState } from 'react';

function Register({ onRegister, onSwitchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(name && email && password) {
        // Simulate Registration
        alert("Account Created!");
        onRegister(email);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input 
            type="text" 
            placeholder="Full Name" 
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input 
            type="email" 
            placeholder="Email Address" 
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" style={styles.button}>Register</button>
        </form>
        
        <p style={styles.text}>
          Already have an account? 
          <span onClick={onSwitchToLogin} style={styles.link}> Login here</span>
        </p>
      </div>
    </div>
  );
}

// Reusing the same styles as Login for consistency
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5'
  },
  card: {
    width: '350px',
    padding: '30px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginTop: '20px'
  },
  input: {
    padding: '12px',
    borderRadius: '4px',
    border: '1px solid #ddd'
  },
  button: {
    padding: '12px',
    backgroundColor: '#27ae60', // Green for Register
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  text: {
    marginTop: '20px',
    fontSize: '0.9rem'
  },
  link: {
    color: '#3498db',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginLeft: '5px'
  }
};

export default Register;