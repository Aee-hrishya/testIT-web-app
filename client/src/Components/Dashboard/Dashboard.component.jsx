import React, { useEffect } from "react";
import "./Dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Redux/Slices/userSlice";
import GET_DASHBOARD_DETAILS from "../../graphql/queries/getDashboardDetails";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const token = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_DASHBOARD_DETAILS, {
    skip: !token, //kindly skip the api call if token is not present
  });
  const { success, error: dashboardError, userDetails } = data?.dashboard || {};
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (success && userDetails) {
      dispatch(
        setUser({
          user: userDetails,
        })
      );
    }
  }, [success, userDetails, dispatch]);

  if (!token) {
    return navigate("/login");
  }

  if (loading) {
    return <div>Loading...</div>;
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
