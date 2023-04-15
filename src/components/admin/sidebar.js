import React, { useState } from "react";
import { Link } from "react-router-dom";
// import AddJobModal from "../forms/employer/job";

const AdminSidebar = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // let [showAddJobsModal, setShowAddJobsModal] = useState(false);
  // let [jobId, setJobId] = useState();

  /*-- Function to open sidebar --*/
  function sideBar() {
    setIsMenuOpen(!isMenuOpen);
  }
  /* Function to show the single data to update job */
  // const editJob = (e) => {
  //   // e.preventDefault();
  //   setShowAddJobsModal(true);
  //   setJobId(e);
  // };
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
        <div className="my-15 px-11">
          {/* <Link
            to=""
            onClick={() => editJob("0")}
            className="btn btn-primary btn-xl w-100 text-uppercase"
          >
            <span className="mr-5 d-inline-block">+</span>Post a new job
          </Link>
          <AddJobModal
            show={showAddJobsModal}
            jobdata={jobId}
            close={() => setShowAddJobsModal(false)}
          /> */}
        </div>
        <ul className="list-unstyled dashboard-layout-sidebar">
          <li className={props.heading === "Dashboard" ? "active" : ""}>
            <Link
              to="/dashboard"
              className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="icon icon-layout-11 mr-7"></i>Dashboard
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
          <li className={props.heading === "Manage Companies" ? "active" : ""}>
            <Link
              to="/employer"
              className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="fas fa-users mr-7"></i>Manage Companies
            </Link>
          </li>
          <li className={props.heading === "Manage Follow-ups" ? "active" : ""}>
            <Link
              to="/followup"
              className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="fas fa-user mr-7"></i>Manage Follow-ups
            </Link>
          </li>
          <li className={props.heading === "Manage Applicants" ? "active" : ""}>
            <Link
              to="/employee"
              className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="fas fa-users mr-7"></i>Manage Applicants{" "}
              {/* <span className="ml-auto px-1 h-1 bg-dodger text-white font-size-3 rounded-5 max-height-px-18 flex-all-center">
                14
              </span> */}
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
          {/* <li className="">
            <Link
              to=""
              className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="fas fa-cog mr-7"></i>Settings
            </Link>
          </li> */}
        </ul>
      </div>
    </>
  );
};
export default AdminSidebar;
