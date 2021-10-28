import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const GuestGuard = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return children;
};

export default GuestGuard;
