import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRouteElement({ children, ...props }) {

  return  props.loggedIn ? children : <Navigate to="/sign-in" replace />;
}

export default ProtectedRouteElement;
