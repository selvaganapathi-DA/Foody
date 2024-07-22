// Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Navbar = () => {
    
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    ProductApp
                </Typography>
             
                <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
                <Link to="/logout" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Logout
                </Link>
                </Typography>
            </Toolbar>
        </AppBar>
    );
};



export default Navbar;
