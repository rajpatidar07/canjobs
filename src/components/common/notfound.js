import React from "react";
import { Link } from "react-router-dom";

const NotFound = (props) => {
  return (
    <div className="page_not_found p-6 text-center">
      <h1>404</h1>
      <h5>Ooops! Page Not Found</h5>
      <Link className="btn btn-primary mt-5" to={props.userType === "company"
          ? "/client"
          : props.userType === "agent"
            ? "/partner_profile"
            : props.userType === "admin"
              ? "/dashboard"
              : "/"}>
        Go to Home
      </Link>
    </div>
  );
};
export default NotFound;
