import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddJobModal from "../forms/employer/job";

const AdminSidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let [showAddJobsModal, setShowAddJobsModal] = useState(false);

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
          <Link to="/">
            <img src="image/logo-main-black.png" alt="" />
          </Link>
        </div>
        <div className="my-15 px-11">
          <Link
            to=""
            onClick={() => setShowAddJobsModal(true)}
            className="btn btn-primary btn-xl w-100 text-uppercase"
          >
            <span className="mr-5 d-inline-block">+</span>Post a new job
          </Link>
          <AddJobModal
            show={showAddJobsModal}
            close={() => setShowAddJobsModal(false)}
          />
        </div>
        <ul className="list-unstyled dashboard-layout-sidebar">
          <li className="active">
            <Link
              to="/dashboard"
              className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="icon icon-layout-11 mr-7"></i>Dashboard
            </Link>
          </li>
          <li className="">
            <Link
              to="/job"
              className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="fas fa-briefcase mr-7"></i>Posted Jobs
            </Link>
          </li>
          <li className="">
            <Link
              to="/category"
              className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="fas fa-qrcode mr-7"></i>Job Category
            </Link>
          </li>
          <li className="">
            <Link
              to="/employee"
              className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="fas fa-users mr-7"></i>Applicants{" "}
              <span className="ml-auto px-1 h-1 bg-dodger text-white font-size-3 rounded-5 max-height-px-18 flex-all-center">
                14
              </span>
            </Link>
          </li>
          <li className="">
            <Link
              to="/employer"
              className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="fas fa-users mr-7"></i>Employer
            </Link>
          </li>
          <li className="">
            <Link
              to="/adminprofile"
              className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
            >
              <i className="fas fa-user mr-7"></i>profile
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
