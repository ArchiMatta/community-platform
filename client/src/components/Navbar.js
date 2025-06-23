import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out');
    navigate('/login');
  };

  if (!isLoggedIn) return null; // Hide navbar if not logged in

  return (
    <nav className="navbar">
      <span className="logo">Community-Platform</span>
      <div className="nav-links">
        <Link to="/feed">Feed</Link>
        <Link to="/create">Create</Link>
        <Link to="/profile">Profile</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
