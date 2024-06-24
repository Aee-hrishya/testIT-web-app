import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <>
      <div className="nav-bar">
        <div className="logo-container">
          <Link className="logo" to={"/"}>
            Test It
          </Link>
        </div>
        <div className="action-section">
          <Link className="about" to="/about">
            About Us
          </Link>
          <Link className="login" to="/login">
            Login/Signup
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
