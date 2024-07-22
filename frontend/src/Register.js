import React, { useState } from 'react';
import { register } from './auth';
import { Grid, TextField, Button, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(username, password);
            setSuccess('Registration successful! You can now log in.');
            setError('');
            setUsername('');
            setPassword('');
        } catch (err) {
            console.error('Registration error:', err);
            setError('Registration failed');
            setSuccess('');
        }
    };
    return (
        <div>
    <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item xs={12} sm={8} md={6}>
                <Paper elevation={3} style={{ padding: '2rem' }}>
                    <Typography variant="h5" align="center" gutterBottom>
                       New User
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Username"
                            type="text"
                            variant="outlined"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{ marginTop: '1rem' }}
                        >
                            Register
                        </Button>
                        {error && (
                            <Typography variant="body2" color="error" align="center" style={{ marginTop: '1rem' }}>
                                {error}
                            </Typography>
                        )}
                        {success && (
                            <Typography variant="body2" style={{ color: 'green', marginTop: '1rem' }} align="center">
                                {success}
                            </Typography>
                        )}
                    </form>
                    <Grid item>
                <Link to="/login" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
                </Paper>
            </Grid>
        </Grid>
        </div>
    
    );
};

export default Register;
