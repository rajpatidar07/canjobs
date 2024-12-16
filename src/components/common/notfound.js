import React, { useEffect } from "react";
import Loader from "../common/loader";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NotFound = (props) => {
  let token = localStorage.getItem("token")
  let location = useLocation()
  const searchParams = new URLSearchParams(location.search);
  // const agreement = searchParams.get("agreement");
  const docId = searchParams.get("docId");
  const notes = searchParams.get("note");
  const portal = localStorage.getItem("portal")
  let navigate = useNavigate()
  useEffect(() => {
    if (docId || notes) {
      localStorage.setItem("navigation_url", location.pathname + location.search)
      if (!token) {
        navigate("/adminlogin")
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log(token && (location.pathname === "/partner_profile"
    || location.pathname === "/dashboard"
    || location.pathname === "/client"
    || props.userType === "user"
    ? location.pathname === `/${localStorage.getItem("employee_id")}`
    : location.pathname === "/")
    ? "<Loader />"
    : "pppppp", token, props.userType === "company"
    ? "/client"
    : props.userType === "agent"
      ? "/partner_profile"
      : props.userType === "admin" ?
        "/dashboard"
        : (docId || notes)
          ? "/adminlogin"
          : portal === "study"
            ? "/study"
            : "/")
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
        <Link onClick={() => localStorage.setItem("navigation_url", "")} className="btn btn-primary mt-5"
          to={props.userType === "company"
            ? "/client"
            : props.userType === "agent"
              ? "/partner_profile"
              : props.userType === "admin" ?
                "/dashboard"
                : (docId || notes)
                  ? "/adminlogin"
                  : portal === "study"
                    ? "/study"
                    : "/"}>
          Go to Home
        </Link>
      </div>
  );
};
export default NotFound;
