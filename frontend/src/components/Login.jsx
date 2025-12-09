// import React, { useState } from 'react';
// import { Link } from 'react-router-dom'; // 1. Import Link for routing

// function Login({ onLogin }) { // 2. Removed onSwitchToRegister prop (not needed anymore)
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Simulating a login check
//     if(email && password) {
//         onLogin(email); 
//     } else {
//         alert("Please enter email and password");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         {/* Logo and Title Area */}
//         <div style={styles.header}>
//           <div style={styles.logo}>
//             <span style={styles.logoIcon}>✲</span> PASYENTE
//           </div>
//           <h2 style={styles.title}>Login to PASYENTE</h2>
//         </div>
        
//         <form onSubmit={handleSubmit} style={styles.form}>
//           {/* Email Input */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>Email or Username</label>
//             <input 
//               type="email" 
//               placeholder="john.doe@example.com" 
//               style={styles.input}
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
          
//           {/* Password Input */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>Password</label>
//             <input 
//               type="password" 
//               placeholder="••••••••" 
//               style={styles.input}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
          
//           {/* Login Button */}
//           <button type="submit" style={styles.button}>Login</button>
//         </form>
        
//         {/* Footer Links */}
//         <div style={styles.footer}>
//           <a href="#" style={styles.forgotLink}>Forgot Password?</a>
//           <p style={styles.registerText}>
//             Don't have an account? 
//             {/* 3. REPLACED SPAN WITH LINK */}
//             <Link to="/register" style={styles.registerLink}> Register</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     minHeight: '100vh',
//     backgroundColor: '#f9fafb',
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
//   },
//   card: {
//     width: '100%',
//     maxWidth: '400px',
//     padding: '40px',
//     backgroundColor: 'white',
//     borderRadius: '8px',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
//     textAlign: 'center'
//   },
//   header: {
//     marginBottom: '30px'
//   },
//   logo: {
//     color: '#5865F2',
//     fontWeight: 'bold',
//     fontSize: '1.5rem',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: '10px'
//   },
//   logoIcon: {
//     marginRight: '8px',
//     fontSize: '1.8rem'
//   },
//   title: {
//     color: '#1a1a1a',
//     fontSize: '1.5rem',
//     fontWeight: '600',
//     margin: 0
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '20px'
//   },
//   inputGroup: {
//     textAlign: 'left'
//   },
//   label: {
//     display: 'block',
//     marginBottom: '8px',
//     color: '#4a5568',
//     fontSize: '0.9rem',
//     fontWeight: '500'
//   },
//   input: {
//     width: '100%',
//     padding: '12px',
//     borderRadius: '6px',
//     border: '1px solid #e2e8f0',
//     fontSize: '1rem',
//     color: '#2d3748',
//     boxSizing: 'border-box',
//     outline: 'none',
//     transition: 'border-color 0.2s'
//   },
//   button: {
//     width: '100%',
//     padding: '12px',
//     backgroundColor: '#5865F2',
//     color: 'white',
//     border: 'none',
//     borderRadius: '6px',
//     fontSize: '1rem',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'background-color 0.2s'
//   },
//   footer: {
//     marginTop: '25px',
//     fontSize: '0.9rem',
//     color: '#718096'
//   },
//   forgotLink: {
//     color: '#5865F2',
//     textDecoration: 'none',
//     display: 'inline-block',
//     marginBottom: '15px',
//     fontWeight: '500'
//   },
//   registerText: {
//     margin: 0
//   },
//   // Updated Link Style (Added textDecoration none)
//   registerLink: {
//     color: '#5865F2',
//     cursor: 'pointer',
//     fontWeight: '600',
//     marginLeft: '4px',
//     textDecoration: 'none' 
//   }
// };

// export default Login;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: email,       // send email instead of name
          password: password
        })
      });

      if (!response.ok) {
        // 401 or other error
        alert("Invalid credentials or server error");
        return;
      }

      // Only parse JSON if response is OK
      const data = await response.json();

      if (data && data.name) {
        // Fetch patient ID from user ID (role-aware)
        try {
          const patientResponse = await fetch(`http://localhost:8080/api/patients/user/${data.id}`);
          let userObj;
          
          if (patientResponse.ok) {
            const patientData = await patientResponse.json();
            // Store the full user object including patient ID
            userObj = {
              name: data.name,
              id: patientData.patientId, // Use patient ID
              email: data.email,
              userId: data.id,
              role: "Patient"
            };
          } else {
            // Not a patient - might be a doctor or other role
            console.log("User is not a patient, storing basic info");
            userObj = {
              name: data.name,
              id: data.id,
              email: data.email,
              userId: data.id,
              role: data.role || "Unknown"
            };
          }
          
          localStorage.setItem('pasyente_user_obj', JSON.stringify(userObj));
          onLogin(data.name); // successful login
        } catch (patientError) {
          console.error("Error fetching patient:", patientError);
          // Still login even if patient fetch fails
          const userObj = {
            name: data.name,
            id: data.id,
            email: data.email,
            userId: data.id,
            role: data.role || "Unknown"
          };
          localStorage.setItem('pasyente_user_obj', JSON.stringify(userObj));
          onLogin(data.name);
        }
      } else {
        alert("Login failed");
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Error connecting to server");
    }
  };


  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>✲</span> PASYENTE
          </div>
          <h2 style={styles.title}>Login to PASYENTE</h2>
        </div>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email or Username</label>
            <input 
              type="text" 
              placeholder="john.doe@example.com" 
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
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
          
          <button type="submit" style={styles.button}>Login</button>
        </form>
        
        <div style={styles.footer}>
          {/* <a href="#" style={styles.forgotLink}>Forgot Password?</a> */}
          <Link to="/forgot-password" style={styles.forgotLink}>Forgot Password?</Link>
          <p style={styles.registerText}>
            Don't have an account? 
            <Link to="/register" style={styles.registerLink}> Register</Link>
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
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    padding: '40px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    textAlign: 'center'
  },
  header: {
    marginBottom: '30px'
  },
  logo: {
    color: '#5865F2',
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
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
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
    marginLeft: '4px',
    textDecoration: 'none'
  }
};


export default Login;
