import React from "react";
import { Route, Redirect } from "react-router";
import { UserContext } from "./UserContext";

const PublicRoute = ({ component: Component, ...rest }) => {
  const { login } = React.useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        !login ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/home", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PublicRoute;