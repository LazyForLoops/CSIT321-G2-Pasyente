import React, { useState } from 'react';

function Register({ onRegister, onSwitchToLogin }) {
  // --- Form State ---
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userRole, setUserRole] = useState("Patient"); // Default role

  // const handleSubmit = (e) => {
  //   e.preventDefault();
    
  //   // Basic Validation
  //   if (!fullName || !email || !password || !confirmPassword) {
  //     alert("Please fill in all fields.");
  //     return;
  //   }
  //   if (password !== confirmPassword) {
  //     alert("Passwords do not match.");
  //     return;
  //   }
  //   if (password.length < 8) {
  //     alert("Password must be at least 8 characters long.");
  //     return;
  //   }

  //   // Simulate successful registration
  //   // In a real app, you would send this data to your backend here.
  //   console.log("Registering:", { fullName, email, password, userRole });
  //   onRegister(email);
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!fullName || !email || !password || !confirmPassword) {
    alert("Please fill in all fields.");
    return;
  }
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }
  if (password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return;
  }

  try {
    // const response = await fetch("http://localhost:8080/api/users/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     name: fullName,
    //     password: password
    //   })
    // });
    const response = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: fullName,
        email: email,
        password: password
      })
    });

    if (!response.ok) {
      throw new Error("Failed to register");
    }

    const data = await response.json();
    console.log("Registered user:", data);

    // Automatically log in after registration
    onRegister(email);

  } catch (error) {
    console.error(error);
    alert("Registration failed. Please try again.");
  }
};


  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header Section */}
        <div style={styles.header}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>✲</span> PASYENTE
          </div>
          <h2 style={styles.title}>Create Your PASYENTE Account</h2>
          <p style={styles.subtitle}>Begin your journey to better health management.</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Full Name Input */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              style={styles.input}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Email Address Input */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
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
            <p style={styles.helperText}>Password must be at least 8 characters long.</p>
          </div>

          {/* Confirm Password Input */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              style={styles.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* User Role Dropdown */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>User Role</label>
            <select
              style={styles.select}
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
            >
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <button type="submit" style={styles.button}>Register</button>
        </form>

        {/* Footer / Switch to Login */}
        <div style={styles.footer}>
          <p style={styles.loginText}>
            Already have an account?
            <span onClick={onSwitchToLogin} style={styles.loginLink}> Login</span>
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
    backgroundColor: '#f9fafb',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '20px'
  },
  card: {
    width: '100%',
    maxWidth: '480px', // Slightly wider than login for more fields
    padding: '40px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    textAlign: 'center'
  },
  header: { marginBottom: '30px' },
  logo: {
    color: '#5865F2',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px'
  },
  logoIcon: { marginRight: '8px', fontSize: '1.8rem' },
  title: { color: '#1a1a1a', fontSize: '1.5rem', fontWeight: '600', margin: '0 0 10px 0' },
  subtitle: { color: '#718096', fontSize: '0.9rem', margin: 0 },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGroup: { textAlign: 'left' },
  label: { display: 'block', marginBottom: '8px', color: '#4a5568', fontSize: '0.9rem', fontWeight: '500' },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    fontSize: '1rem',
    color: '#2d3748',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  select: {
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    fontSize: '1rem',
    color: '#2d3748',
    backgroundColor: 'white',
    boxSizing: 'border-box',
    outline: 'none',
    cursor: 'pointer'
  },
  helperText: { fontSize: '0.8rem', color: '#718096', marginTop: '5px' },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#5865F2',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginTop: '10px'
  },
  footer: { marginTop: '25px', fontSize: '0.9rem', color: '#718096' },
  loginText: { margin: 0 },
  loginLink: { color: '#5865F2', cursor: 'pointer', fontWeight: '600', marginLeft: '4px' }
};

export default Register;