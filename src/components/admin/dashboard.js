import React, { useState } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import { Link } from "react-router-dom";
import EmployeeDetails from "../common/employeeDetail";
import { ToastContainer } from "react-toastify";
import Interview from "../common/interviewTable";
import JobResponse from "./response";
import JobTable from "../common/jobTable";
import EmployeeTable from "../common/employeeTable";
import EmployerTable from "../common/employerTable";
const AdminDashboard = () => {
  // eslint-disable-next-line
  let [showEmployeeProfile, setShowEmployeeProfile] = useState(false);
  return (
    <div className="site-wrapper overflow-hidden bg-default-2">
      {/* <!-- Header Area --> */}
      <AdminHeader heading={"Dashboard"} />
      {/* <!-- navbar- --> */}
      <AdminSidebar heading={"Dashboard"} />

      <div
        className={
          showEmployeeProfile === false
            ? "dashboard-main-container mt-25 mt-lg-22"
            : "dashboard-main-container mt-25 mt-lg-22 d-none"
        }
        id="dashboard-body"
      >
        <ToastContainer />
        <div className="container">
          <div className="row mb-7">
            <div className="col-xxl-3 col-xl-4 col-lg-6 col-sm-6">
              {/* <!-- Single Category --> */}
              <a
                href="/job"
                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
              >
                <div className="text-blue bg-blue-opacity-1 circle-56 font-size-6 mr-7">
                  <i className="fas fa-briefcase"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div>
                  <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                    <span className="counter">05</span>
                  </h5>
                  <p className="font-size-4 font-weight-normal text-gray mb-0">
                    Posted Jobs
                  </p>
                </div>
              </a>
              {/* <!-- End Single Category --> */}
            </div>
            <div className="col-xxl-3 col-xl-4 col-lg-6 col-sm-6">
              {/* <!-- Single Category --> */}
              <a
                href="/employee"
                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
              >
                <div className="text-pink bg-pink-opacity-1 circle-56 font-size-6 mr-7">
                  <i className="fas fa-user"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div>
                  <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                    <span className="counter">256</span>
                  </h5>
                  <p className="font-size-4 font-weight-normal text-gray mb-0">
                    Total Applicants
                  </p>
                </div>
              </a>
              {/* <!-- End Single Category --> */}
            </div>
            <div className="col-xxl-3 col-xl-4 col-lg-6 col-sm-6">
              {/* <!-- Single Category --> */}
              <Link
                to=""
                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
              >
                <div className="text-orange bg-orange-opacity-1 circle-56 font-size-6 mr-7">
                  <i className="fas fa-eye"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div>
                  <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                    <span className="counter">16.5</span>K
                  </h5>
                  <p className="font-size-4 font-weight-normal text-gray mb-0">
                    Jobs View
                  </p>
                </div>
              </Link>
              {/* <!-- End Single Category --> */}
            </div>
            <div className="col-xxl-3 col-xl-4 col-lg-6 col-sm-6">
              {/* <!-- Single Category --> */}
              <Link
                to=""
                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
              >
                <div className="text-egg-blue bg-egg-blue-opacity-1 circle-56 font-size-6 mr-7">
                  <i className="fas fa-mouse-pointer"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div>
                  <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                    <span className="counter">18.6</span>%
                  </h5>
                  <p className="font-size-4 font-weight-normal text-gray mb-0">
                    Applied Rate
                  </p>
                </div>
              </Link>
              {/* <!-- End Single Category --> */}
            </div>
          </div>{" "}
          <div className="mb-14">
            <div className="row mb-11 ">
              <div className="col-6">
                <h3 className="font-size-6 mb-5 pb-5">Recently Added Jobs</h3>
                <JobTable heading={"Dashboard"} />
              </div>
              <div className="col-6">
                <h3 className="font-size-6 mb-5 pb-5">
                  Recently Added Applicants
                </h3>
                <EmployeeTable heading={"Dashboard"} />
              </div>
            </div>
          </div>
          <div className="mb-14">
            <div className="row">
              <div className="col-lg-6">
                <div className="d-flex">
                  <h3 className="font-size-6 col-lg-6">Shedualed Interview</h3>
                  <div className="col-lg-6 form_control">
                    <p className="input_label">Filter by Duration:</p>
                    <div className="select_div">
                      <select
                        name="category"
                        // value={categoryTypeFilterValue}
                        id="category"
                        // onChange={onCategoryTypeFilterChange}
                        className="form-control nice-select pl-7 h-100 arrow-3 arrow-3-black w-100 text-black-2"
                      >
                        <option value={""}>Select Duration</option>
                        {/* {(FilterJson.Duration || []).map((data, i) => {
                        return (
                          <option value={data} key={i}>
                            {data}
                          </option>
                        );
                      })} */}
                      </select>
                    </div>
                  </div>
                </div>
                <Interview heading={"Dashboard"} />
              </div>
              <div className="col-lg-6">
                <h3 className="font-size-6 mb-5 pb-5">
                  Recently Added Companies
                </h3>
                <EmployerTable heading="Dashboard" />
              </div>
            </div>
          </div>{" "}
          <JobResponse heading={"Dashboard"} />
        </div>
      </div>
      {showEmployeeProfile === true ? (
        <div className="dashboard-main-container mt-20">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 dark-mode-texts">
                <div className="mb-9">
                  <Link
                    to={""}
                    onClick={() => setShowEmployeeProfile(false)}
                    className="d-flex align-items-center ml-4"
                  >
                    <i className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                    <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                      Back
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mb-18">
              <EmployeeDetails />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default AdminDashboard;
