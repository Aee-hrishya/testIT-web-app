import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "../../Redux/Slices/userSlice";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("authToken");
    dispatch(clearUser());
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      dispatch(setUser({ token: token }));
    } else {
      console.log("Token is not present.");
      navigate("/login");
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <div className="nav-bar">
        <div className="logo-container">
          <Link className="logo" to={"/"}>
            Test It
          </Link>
        </div>
        {isAuthenticated ? (
          <Link className="authenticated-navbar" onClick={logoutHandler}>
            Logout
          </Link>
        ) : (
          <div className="action-section">
            <Link className="about" to="/about">
              About Us
            </Link>
            <Link className="login" to="/login">
              Login/Signup
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
