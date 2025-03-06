// src/pages/LoginSignup.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import { UserContext } from '../UserContext';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Extra sign-up fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [location, setLocation] = useState('');
  const [stateName, setStateName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  // Access user context
  const { user, setUser, registeredUsers, setRegisteredUsers } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    // Simulate a network call
    setTimeout(() => {
      if (isLogin) {
        // LOGIN scenario
        const userData = registeredUsers[email];
        if (userData) {
          // User exists - use stored details
          setUser({ ...userData, email });
          setMessage('Login successful!');
          navigate('/');
        } else {
          // User not found - fallback or show error
          setMessage('No account found. Please sign up first.');
        }
      } else {
        // SIGNUP scenario
        // Store new user details in `registeredUsers`
        setRegisteredUsers((prev) => ({
          ...prev,
          [email]: {
            firstName,
            lastName,
            pinCode,
            location,
            stateName,
            phone,
          },
        }));
        setMessage('Sign up successful! Please log in.');
        // Switch to login mode
        setIsLogin(true);
      }
    }, 1000);
  };

  return (
    <div style={styles.container}>
      <Typography variant="h4" style={{ marginBottom: '20px' }}>
        {isLogin ? 'Login' : 'Sign Up'}
      </Typography>

      <form onSubmit={handleSubmit} style={styles.form}>
        {!isLogin && (
          <>
            <TextField
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              style={styles.input}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              style={styles.input}
            />
          </>
        )}
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        {!isLogin && (
          <>
            <TextField
              label="PIN Code"
              variant="outlined"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              required
              style={styles.input}
            />
            <TextField
              label="Location"
              variant="outlined"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              style={styles.input}
            />
            <TextField
              label="State"
              variant="outlined"
              value={stateName}
              onChange={(e) => setStateName(e.target.value)}
              required
              style={styles.input}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              style={styles.input}
            />
          </>
        )}

        <Button variant="contained" color="primary" type="submit" style={styles.button}>
          {isLogin ? 'Login' : 'Sign Up'}
        </Button>
      </form>

      {message && (
        <Typography variant="body1" style={styles.message}>
          {message}
        </Typography>
      )}

      <Button
        onClick={() => {
          setIsLogin(!isLogin);
          setMessage('');
        }}
        style={styles.toggleButton}
      >
        {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
      </Button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '20px',
    textAlign: 'center',
    border: '1px solid #ccc',
    borderRadius: '8px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    width: '100%',
  },
  button: {
    marginTop: '10px',
  },
  toggleButton: {
    marginTop: '15px',
  },
  message: {
    marginTop: '10px',
    color: 'green',
  },
};

export default LoginSignup;
