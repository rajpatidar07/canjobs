import React from "react";
import Loader from "../common/loader";
import { Link, useLocation } from "react-router-dom";

const NotFound = (props) => {
  let token = localStorage.getItem("token")
  let location = useLocation()
  return (
    token && (location.pathname === "/partner_profile"
      || location.pathname === "/dashboard"
      || location.pathname === "/client"
      || props.userType === "user"
      ? location.pathname === `/${localStorage.getItem("employee_id")}` 
      : location.pathname === "/")
      ? <Loader />
      :
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
