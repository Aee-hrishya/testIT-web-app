import React, { useState } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import useLocalStorage from "../../Hooks/useLocalStorage";
import checkPasswordStrength from "../../Utils/checkPasswordStrength";
import CREATE_USER from "../../graphql/mutations/createUser";
import { useMutation } from "@apollo/client";
import LOGIN_USER from "../../graphql/mutations/loginUser";
import checkUsernameStrength from "../../Utils/checkUsernameStrength";

const Login = () => {
  const [signup, setSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameStrength, setUsernameStrength] = useState("");
  const [password, setPassword] = useState("");
  const [passStrength, setPassStrength] = useState("");
  const [submit, setSubmit] = useState(false);
  const [
    createUser,
    {
      data: createUserData,
      loading: createUserLoading,
      error: createUserError,
    },
  ] = useMutation(CREATE_USER);
  const [
    loginUser,
    { data: loginUserData, loading: loginUserLoading, error: loginUserError },
  ] = useMutation(LOGIN_USER);

  const switchToSignupOrLoginPage = (e) => {
    e.preventDefault();
    setSignup(!signup);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameStrength(checkUsernameStrength(username));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPassStrength(checkPasswordStrength(password));
  };

  const handleSubmit = async (e) => {
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
      setUsernameStrength("Username is not in proper format.");
      setSubmit(false);
    }

    //check if frontend username and password validations are done and then call the endpoint we need
    if (submit && signup) {
      try {
        const { data } = await createUser({
          variables: { username, password },
        });
        if (data && data.createUser.success) {
          console.log("User created:", data.createUser.user);
        } else {
          console.error(
            "Error creating user:",
            data.createUser.error || "Unknown error"
          );
          if (data.createUser.error.includes("User")) {
            setUsernameStrength(data.createUser.error);
          } else {
            setPassStrength(data.createUser.error);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    } else if (submit && !signup) {
      try {
        const { data } = await loginUser({
          variables: { username, password },
        });
        if (data && data.loginUser.success) {
          console.log("User logged in: ", data.loginUser.user);
        } else {
          console.log(
            "Error logging into the user",
            data.loginUser.error || "Unknown error"
          );
          if (data.loginUser.error.includes("User")) {
            setUsernameStrength(data.loginUser.error);
          } else {
            setPassStrength(data.loginUser.error);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
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
                {usernameStrength === "" ? "" : usernameStrength}
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
                {passStrength === "" ? "" : passStrength}
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
