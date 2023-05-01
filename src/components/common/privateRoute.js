import { Route, Navigate } from "react-router-dom";

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to="/adminlogin" replace={true} />
        )
      }
    />
  );
}
export default PrivateRoute;
