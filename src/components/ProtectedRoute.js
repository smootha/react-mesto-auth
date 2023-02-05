import React from "react";
import { Route, Navigate, Redirect } from "react-router-dom";

function ProtectRouteElement({ element: Component, ...props }) {

  return(
    props.loggedIn
    ? <Component {...props} />
    : <Navigate to="/sign-in" replace />
  );
}

export default ProtectRouteElement;
