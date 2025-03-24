// import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <nav>
        
        <div className="buttons">
          <Link to='/login' className="btn-outline">Login</Link>
          <Link to='/register' className="btn-outline">Register</Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
