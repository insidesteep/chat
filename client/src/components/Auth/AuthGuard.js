import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return children;
};

export default AuthGuard;
