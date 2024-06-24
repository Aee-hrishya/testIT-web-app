import React from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import useLocalStorage from "../../Hooks/useLocalStorage";
import checkPasswordStrength from "../../Utils/checkPasswordStrength";

const Login = () => {
  const [signup, setSignup] = useLocalStorage("userSignup", false);
  const [password, setPassword] = useLocalStorage("password", "");
  const [passStrength, setPassStrength] = useLocalStorage(
    "passwordStrength",
    password
  );

  const switchToSignupOrLoginPage = (e) => {
    e.preventDefault();
    setSignup(!signup);
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
    setPassStrength(checkPasswordStrength(password));
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
              />
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
                onChange={handleChange}
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
                {password === "" ? "" : passStrength}
              </p>
            </div>
            <br />
          </div>
          <input
            type="submit"
            value={signup ? "Sign Up" : "Login"}
            className="login-btn"
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
