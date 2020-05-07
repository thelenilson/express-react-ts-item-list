import React, { FunctionComponent } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import Cookies from "universal-cookie";

interface PrivateRouteProps extends RouteProps {
  component: any;
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const cookies = new Cookies();
  const authInfo = cookies.get("auth_info");

  let isAuthenticated = false;

  if (authInfo) {
    isAuthenticated = true;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
