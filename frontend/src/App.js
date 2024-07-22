import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import Edit from './components/Edit';
import Crud from './components/Crud';
import Navbar from './components/NavBar';
import Register from './Register';
import Logout from './Pages/Logout'; // Adjust the path as necessary
import Home from './components/Home';
import Menu from './components/Menu';

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Verify token validity
        const response = await axios.get('http://localhost:5001/verifyToken', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Token verification failed:', err);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    }
  };

  return (
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/crud" element={<Crud />} />
        <Route path="/home" element={<Home/>} />
        {/* <PrivateRoute path="/home" element={<Home />} isAuthenticated={isAuthenticated} /> */}

        <Route
          path="/edit/:id"
          element={<Edit />}
          loader={({ params }) => fetch(`http://localhost:5000/products/${params.id}`)}
        />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/logout" element={<Logout setAuth={setIsAuthenticated} />} />
        <Route path="/menu" element={<Menu/>} />

        {/* Add a catch-all route for unknown paths */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    
  );
};
export default App;