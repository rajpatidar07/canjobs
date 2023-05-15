import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminSidebar = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function sideBar() {
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <>
      <Link
        to={""}
        onClick={sideBar}
        className="sidebar-mobile-button"
        data-toggle="collapse"
        role="button"
        aria-expanded="false"
        aria-controls="sidebar"
      >
        <i className="icon icon-sidebar-2"></i>
      </Link>
      <div
        className={`dashboard-sidebar-wrapper pt-5 ${isMenuOpen ? "show" : ""}`}
        id="sidebar"
      >
        <div className="brand-logo px-11">
          <Link to="">
            <img src="image/logo-main-black.png" alt="" />
          </Link>
        </div>
        <div className="my-9 px-11"></div>
        <ul className="list-unstyled dashboard-layout-sidebar">
          <li className={props.heading === "Dashboard" ? "active" : ""}>
            <Link
              to="/dashboard"
              className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="icon icon-layout-11 mr-7"></i>Dashboard
            </Link>
          </li>
          <li className={props.heading === "Manage Applicants" ? "active" : ""}>
            <Link
              to="/employee"
              className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="fas fa-users mr-7"></i>Manage Applicants{" "}
            </Link>
          </li>
          <li className={props.heading === "Manage Companies" ? "active" : ""}>
            <Link
              to="/employer"
              className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="fas fa-users mr-7"></i>Manage Companies
            </Link>
          </li>
          <li className={props.heading === "Manage Jobs" ? "active" : ""}>
            <Link
              to="/job"
              className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="fas fa-briefcase mr-7"></i>Manage Jobs
            </Link>
          </li>{" "}
          <li className={props.heading === "Manage Follow-ups" ? "active" : ""}>
            <Link
              to="/followup"
              className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="fas fa-user mr-7"></i>Manage Follow-ups
            </Link>
          </li>
          <li className={props.heading === "Interview" ? "active" : ""}>
            <Link
              to="/interview"
              className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="fas fa-podcast mr-7"></i>Manage Interview
            </Link>
          </li>
          <li className={props.heading === "Response" ? "active" : ""}>
            <Link
              to="/responses"
              className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="fas fa-reply mr-7"></i>Manage Response
            </Link>
          </li>
          <li className={props.heading === "Manage Category" ? "active" : ""}>
            <Link
              to="/category"
              className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="fas fa-qrcode mr-7"></i>Manage Job Category
            </Link>
          </li>
          <li className={props.heading === "Manage Admin" ? "active" : ""}>
            <Link
              to="/adminprofile"
              className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="fas fa-user mr-7"></i>Manage Admin
            </Link>
          </li>
          <li className={props.heading === "Filter List" ? "active" : ""}>
            <Link
              to="/filter"
              className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="fas fa-filter mr-7"></i>Manage Filter List
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
export default AdminSidebar;
