import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setAuth }) => {
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth(false);
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <button onClick={handleLogout}>Are you Confirm? Logout</button>
  );
};

export default Logout;
