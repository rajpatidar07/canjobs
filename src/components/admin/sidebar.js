import React from "react";

const AdminSidebar = () => {
  return (
    <div className="dashboard-sidebar-wrapper pt-5" id="sidebar">
      <div className="brand-logo px-11">
        <a href="https://shade.uxtheme.net/shade-pro">
          <img src="image/logo-main-black.png" alt="" />
        </a>
      </div>
      <div className="my-15 px-11">
        <a
          href="http://localhost:3000/"
          className="btn btn-primary btn-xl w-100 text-uppercase"
        >
          <span className="mr-5 d-inline-block">+</span>Post a new job
        </a>
      </div>
      <ul className="list-unstyled dashboard-layout-sidebar">
        <li className="active">
          <a
            href="/dashboard"
            className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
          >
            <i className="icon icon-layout-11 mr-7"></i>Dashboard
          </a>
        </li>
        <li className="">
          <a
            href="/job"
            className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
          >
            <i className="fas fa-briefcase mr-7"></i>Posted Jobs
          </a>
        </li>
        <li className="">
          <a
            href="/category"
            className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
          >
            <i className="fas fa-qrcode mr-7"></i>Job Category
          </a>
        </li>
        <li className="">
          <a
            href="/employee"
            className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
          >
            <i className="fas fa-users mr-7"></i>Applicants{" "}
            <span className="ml-auto px-1 h-1 bg-dodger text-white font-size-3 rounded-5 max-height-px-18 flex-all-center">
              14
            </span>
          </a>
        </li>
        <li className="">
          <a
            href="/employer"
            className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
          >
            <i className="fas fa-users mr-7"></i>Employer
          </a>
        </li>
        <li className="">
          <a
            href="/adminprofile"
            className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
          >
            <i className="fas fa-user mr-7"></i>profile
          </a>
        </li>
        <li className="">
          <a
            href="dashboard-settings.html"
            className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
          >
            <i className="fas fa-cog mr-7"></i>Settings
          </a>
        </li>
      </ul>
    </div>
  );
};
export default AdminSidebar;
