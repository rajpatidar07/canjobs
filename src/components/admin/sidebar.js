import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminSidebar = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /*-- Function to open sidebar --*/
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
        <ul className="list-unstyled dashboard-layout-sidebar mt-10">
          <li className={props.heading === "Dashboard" ? "active" : ""}>
            <Link
              to="/dashboard"
              className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="icon icon-layout-11 mr-7"></i><span className="px-2">Dashboard</span>
            </Link>
          </li>
          <li className={props.heading === "Manage Applicants" ? "active" : ""}>
            <Link
              to="/employee"
              className="px-9 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="fas fa-users mr-7"></i>
              <span className="px-2">Manage Applicants</span>
            </Link>
          </li>
          <li className={props.heading === "Manage Companies" ? "active" : ""}>
            <Link
              to="/employer"
              className="px-9 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="fas fa-users mr-7"></i>
              <span className="px-2">Manage Companies</span>
            </Link>
          </li>
          <li className={props.heading === "Manage Jobs" ? "active" : ""}>
            <Link
              to="/job"
              className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="fas fa-briefcase mr-7">
                </i><span className="px-2">Manage Jobs</span>
            </Link>
          </li>
          <li className={props.heading === "Manage Follow-ups" ? "active" : ""}>
            <Link
              to="/followup"
              className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="fas fa-user mr-7"></i>
              <span className="px-2">Manage Follow-ups</span>
            </Link>
          </li>
          <li className={props.heading === "Interview" ? "active" : ""}>
            <Link
              to="/interview"
              className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="fas fa-podcast mr-7"></i>
              <span className="px-2">Manage Interview</span>
            </Link>
          </li>
          <li className={props.heading === "Response" ? "active" : ""}>
            <Link
              to="/responses"
              className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="fas fa-reply mr-7"></i>
              <span className="px-2">Manage Response</span>
            </Link>
          </li>
          <li className={props.heading === "Manage Category" ? "active" : ""}>
            <Link
              to="/category"
              className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="fas fa-qrcode mr-7"></i>
              <span className="px-2">Manage Job Category</span>
            </Link>
          </li>
          <li className={props.heading === "Manage Admin" ? "active" : ""}>
            <Link
              to="/adminprofile"
              className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="fas fa-user mr-7"></i> 
              <span className="px-2">Manage Admin</span>
            </Link>
          </li>
          <li className={props.heading === "Filter List" ? "active" : ""}>
            <Link
              to="/filter"
              className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="fas fa-filter mr-7"></i>
              <span className="px-2">Manage Filter List</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
export default AdminSidebar;
