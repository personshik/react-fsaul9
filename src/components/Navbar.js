import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">Product Store</Link>
        </div>
        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/add-product">Add Product</Link>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="menu-icon">&#9776;</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
