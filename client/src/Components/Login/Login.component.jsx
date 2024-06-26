import React, { useState } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import useLocalStorage from "../../Hooks/useLocalStorage";
import checkPasswordStrength from "../../Utils/checkPasswordStrength";

const Login = () => {
  const [signup, setSignup] = useLocalStorage("userSignup", false);
  const [username, setUsername] = useLocalStorage("username", "");
  const [password, setPassword] = useLocalStorage("password", "");
  const [passStrength, setPassStrength] = useLocalStorage(
    "passwordStrength",
    password
  );
  const [submit, setSubmit] = useState(false);

  const switchToSignupOrLoginPage = (e) => {
    e.preventDefault();
    setSignup(!signup);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPassStrength(checkPasswordStrength(password));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length >= 8 && passStrength.includes("Password is strong")) {
      setSubmit(true);
    } else if (password.length === 0) {
      setPassStrength("Password is Required.");
      setSubmit(false);
    } else {
      setSubmit(false);
    }

    if (username.length >= 3 && username.length <= 20) {
      setSubmit(true);
    } else {
      setUsername("Username is not in proper format.");
      setSubmit(false);
    }

    //check if frontend username and password validations are done and then call the endpoint we need
    if (submit) {
    }
  };

  return (
    <>
      <div className="main-container">
        <form className="login-form">
          <h2 className="heading">{signup ? "Sign Up" : "Login"}</h2>
          <div className="main-form-contents">
            <div className="username-section">
              <label for="username" id="username">
                Username:
              </label>
              <input
                type="text"
                id="username-field"
                name="username"
                placeholder="Enter username here..."
                onChange={handleUsernameChange}
              />
              <p className="username-error-hint">
                {username.includes("Username is not in proper format.")
                  ? "Username is not in proper format."
                  : ""}
              </p>
            </div>
            <br />
            <div className="password-section">
              <label for="password" id="password">
                Password:
              </label>
              <input
                type="password"
                id="password-field"
                name="password"
                placeholder="Enter password here..."
                value={password}
                onChange={handlePasswordChange}
              />
              <p
                className={
                  passStrength.includes("strong")
                    ? "password-strong"
                    : passStrength.includes("medium")
                    ? "password-medium"
                    : "password-weak"
                }
              >
                {password ? passStrength : passStrength}
              </p>
            </div>
            <br />
          </div>
          <input
            type="submit"
            value={signup ? "Sign Up" : "Login"}
            className="login-btn"
            onClick={handleSubmit}
          />
        </form>
        <Link
          className="sign-up"
          to="/login"
          onClick={switchToSignupOrLoginPage}
        >
          {signup
            ? "Click here to login."
            : "Create an account if not registered."}
        </Link>
      </div>
    </>
  );
};

export default Login;
