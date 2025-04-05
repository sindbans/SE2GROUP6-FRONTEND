// src/components/Header.js
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <h1 className="logo">EventHub</h1>
          <nav className="main-nav">
            <a href="/" className="nav-item active">Movies</a>
            <a href="/" className="nav-item">Events</a>
            <a href="/" className="nav-item">Plays</a>
          </nav>
          <div className="user-actions">
            <button className="sign-in-btn">Sign In</button>
            <div className="location-selector">
              <span>Mumbai</span>
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;




