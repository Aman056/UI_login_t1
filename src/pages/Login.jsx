import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Input from '../components/Input';
import {
  Grid,
  Paper,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Button from '../components/Button';
import { validateUsername, validatePassword } from '../utils/validation';

export default function Login() {
  const location = useLocation();
  const [values, setValues] = useState({ username: '', password: '' });
  const [touched, setTouched] = useState({});
  const [message, setMessage] = useState('');

  const errors = {
    username: validateUsername(values.username),
    password: validatePassword(values.password, values.username),
  };
  const isValid = Object.values(errors).every(e => e === '');

  useEffect(() => {
    if (location.state?.justSignedUp) {
      setMessage('Sign-up successful. Please log in.');
      window.history.replaceState({}, document.title); // clear state
    }
  }, [location.state]);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues(v => ({ ...v, [name]: value }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTouched({ username: true, password: true });
    if (!isValid) return;
    const saved = localStorage.getItem('demo_user');
    if (!saved) {
      setMessage('No account found. Please sign up first.');
      return;
    }
    const user = JSON.parse(saved);
    if (user.username === values.username && user.password === values.password) {
      setMessage('Login successful!');
      // For demo, we just show a message.
    } else {
      setMessage('Invalid username or password.');
    }
  }

  return (
    <main style={{
      backgroundColor: "#cbe2de",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "16px", // prevents cutoff on small screens
    }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 600,
          overflow: "hidden",
        }}
      >
        <section className="card">
          <div className='login-header'>
            <h1 className="title">Welcome Back</h1>
            <p className="subtitle">Log in to continue</p>
          </div>
          <div className='form-space-data'>


            {message && <div className="alert">{message}</div>}
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={4} style={{paddingTop:'25px', paddingBottom:'25px'}}>
                <Grid item xs={12}>
                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your password"
                    error={touched.password ? errors.password : ''}
                    autoComplete="current-password"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Input
                    label="Username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your username"
                    error={touched.username ? errors.username : ''}
                    autoComplete="username"
                  />
                </Grid>
              </Grid>

              <Button type="submit" style={{ marginTop: "50px" }}>Log In</Button>
            </form>

            <p className="muted">
              Don&apos;t have an account? <Link to="/signup" className="link">Sign up</Link>
            </p>
          </div>
        </section>
      </Paper>
    </main>
  );
}
