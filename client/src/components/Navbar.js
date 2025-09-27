import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

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
      <div className="nav-wrapper">
        <span className="logo">Community-Platform</span>
        
        <div className="nav-links-left">
          <NavLink to="/feed" className={({ isActive }) => (isActive ? "active" : "")}>Feed</NavLink>
          <NavLink to="/create" className={({ isActive }) => (isActive ? "active" : "")}>Create</NavLink>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>Profile</NavLink>
        </div>

        <div className="nav-links-right">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
