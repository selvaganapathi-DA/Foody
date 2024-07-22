import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Grid, Paper, TextField, Button, Typography } from '@mui/material';

const Login = ({ setAuth }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/login', {
                username,
                password,
            });
            localStorage.setItem('token', response.data.token);
           
            navigate('/crud'); // Redirect to '/crud' after successful login
        } catch (err) {
            console.error('Login error:', err);
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '80vh' }}
        ><h4>Product Management</h4>
            <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} style={{ padding: '2rem' }}>
                    <Typography variant="h6" align="center" gutterBottom>
                        Login
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
                            required
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{ marginTop: '1rem' }}
                            size="large"
                        >
                            Login
                        </Button>

                        {error && (
                            <Typography
                                variant="body2"
                                color="error"
                                align="center"
                                style={{ marginTop: '1rem' }}
                            >
                                {error}
                            </Typography>
                        )}

                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/register" variant="body2">
                                    {"Don't have an account? Sign up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Login;
