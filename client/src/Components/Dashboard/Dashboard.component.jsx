import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Redux/Slices/userSlice";
import GET_DASHBOARD_DETAILS from "../../graphql/queries/getDashboardDetails";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";

const Dashboard = () => {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    const tokenInLocalStorage = localStorage.getItem("authToken");
    if (!tokenInLocalStorage) {
      // Redirect to login if token is not found in local storage
      setLoader(true);
      navigate("/login");
    } else {
      setToken(tokenInLocalStorage);
    }
  }, [navigate]);

  useEffect(() => {
    // Check token validity and redirect if necessary
    if (!token) {
      setLoader(true);
      navigate("/login");
    }
  }, [token, navigate]);

  const { data, loading, error } = useQuery(GET_DASHBOARD_DETAILS, {
    skip: !token, //kindly skip the api call if token is not present
  });
  const { success, error: dashboardError, userDetails } = data?.dashboard || {};

  useEffect(() => {
    if (success && userDetails) {
      // Update user data in Redux store if authentication is successful
      dispatch(
        setUser({
          user: userDetails,
        })
      );
    }
  }, [userDetails, success, dispatch]);

  if (!token || loading || loader) {
    return (
      <div className="loader">
        <CircleLoader size={80} />
      </div>
    );
  }

  if (error || dashboardError) {
    return <div>Error: {error?.message || dashboardError}</div>;
  }

  return (
    <>
      <div className="main">
        <h2>Welcome{user.userId}</h2>
        <h3>This is your username{user.username}</h3>
        <h4>This is your assigned role {user.role}</h4>
      </div>
    </>
  );
};

export default Dashboard;
