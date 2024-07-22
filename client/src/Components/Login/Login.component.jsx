import React, { useState, useEffect } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "../../Hooks/useLocalStorage";
import checkPasswordStrength from "../../Utils/checkPasswordStrength";
import CREATE_USER from "../../graphql/mutations/createUser";
import { useMutation } from "@apollo/client";
import LOGIN_USER from "../../graphql/mutations/loginUser";
import checkUsernameStrength from "../../Utils/checkUsernameStrength";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Redux/Slices/userSlice";

const Login = () => {
  const [signup, setSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameStrength, setUsernameStrength] = useState("");
  const [password, setPassword] = useState("");
  const [passStrength, setPassStrength] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

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

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const switchToSignupOrLoginPage = (e) => {
    e.preventDefault();
    setUsernameStrength("");
    setPassStrength("");
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

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.length < 3 || username.length > 20) {
      setUsernameStrength("Username is not in proper format.");
      return;
    }

    if (password.length === 0) {
      setPassStrength("Password is Required.");
      return;
    } else if (
      password.length < 8 ||
      !passStrength.includes("Password is strong")
    ) {
      setPassStrength("Password is not in proper format.");
      return;
    }

    // At this point, all validations have passed
    try {
      let role;
      isChecked ? (role = "admin") : (role = "student");

      if (signup) {
        const { data } = await createUser({
          variables: { username, password, role },
        });

        if (data && data.createUser.success) {
          console.log("User created:", data.createUser.user);
          const token = data.createUser.token;
          localStorage.setItem("authToken", token); // set token in local storage
          dispatch(
            setUser({
              token: token,
              user: data.createUser.user,
            })
          );
          navigate("/dashboard");
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
      } else {
        const { data } = await loginUser({
          variables: { username, password },
        });

        if (data && data.loginUser.success) {
          console.log("User logged in: ", data.loginUser.user);
          const token = data.loginUser.token;
          localStorage.setItem("authToken", token);
          dispatch(
            setUser({
              token: token,
              user: data.loginUser.user,
            })
          );
          navigate("/dashboard");
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
      }
    } catch (error) {
      console.log(error.message);
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
            <label className="role-label">
              <input
                type="checkbox"
                className={!signup ? "role-checkbox-hidden" : "role-checkbox"}
                checked={isChecked}
                onChange={handleCheckboxChange}
                value="admin"
              />
              {signup ? "Admin" : ""}
            </label>
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
