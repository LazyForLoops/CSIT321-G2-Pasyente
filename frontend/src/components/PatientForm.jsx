import React, { useState } from 'react';

function PatientForm({ onAddPatient }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name || !age) return; // Don't submit empty forms
    
    // Send the data back to the Main App
    onAddPatient({ name, age, id: Date.now() });
    
    // Clear the inputs
    setName("");
    setAge("");
  };

  return (
    <div style={styles.card}>
      <h3>Add New Patient</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input 
          style={styles.input}
          type="text" 
          placeholder="Patient Full Name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          style={styles.input}
          type="number" 
          placeholder="Age" 
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button type="submit" style={styles.button}>Add Record</button>
      </form>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '20px'
  },
  form: {
    display: 'flex', 
    gap: '10px'
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    flex: 1
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#2ecc71', // Green
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default PatientForm;