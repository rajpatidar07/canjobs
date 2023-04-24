import React, { useEffect, useState } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import { Link } from "react-router-dom";
// import EmployeeDetails from "../common/employeeDetail";
import { ToastContainer } from "react-toastify";
import Interview from "../common/interviewTable";
import JobResponse from "./response";
import JobTable from "../common/jobTable";
import EmployeeTable from "../common/employeeTable";
import EmployerTable from "../common/employerTable";
import { getSummaryCount } from "../../api/api";
import FollowUpDashBoard from "../common/followUpTable";
const AdminDashboard = () => {
  // eslint-disable-next-line
  // let [showEmployeeProfile, setShowEmployeeProfile] = useState(false);
  const [countData, setCountData] = useState("");
  let [state, setState] = useState("");
  let AllCounts = async () => {
    let Data = await getSummaryCount();
    // console.log(Data);
    setCountData(Data);
  };
  useEffect(() => {
    AllCounts();
  }, [state]);
  /*Function to get the percentage in correct form  */
  const appliedRateFormatted =
    countData && countData.applied_rate
      ? countData.applied_rate.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : null;
  // console.log(appliedRateFormatted);

  return (
    <div className="site-wrapper overflow-hidden bg-default-2">
      {/* <!-- Header Area --> */}
      <AdminHeader heading={"Dashboard"} />
      {/* <!-- navbar- --> */}
      <AdminSidebar heading={"Dashboard"} />

      <div
        className={
          // showEmployeeProfile === false
          //   ?
          "dashboard-main-container mt-25 mt-lg-22"
          //   :"dashboard-main-container mt-25 mt-lg-22 d-none"
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
                    <span className="counter">{countData.posted_jobs}</span>
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
                    <span className="counter">
                      {countData.total_applicants}
                    </span>
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
                    <span className="counter">{countData.jobs_viewed}</span>
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
                    <span className="counter">
                      {appliedRateFormatted ?? "N/A"}
                    </span>
                    %
                  </h5>
                  <p className="font-size-4 font-weight-normal text-gray mb-0">
                    Applied Rate
                  </p>
                </div>
              </Link>
              {/* <!-- End Single Category --> */}
            </div>
          </div>
          <div className="mb-14">
            <div className="row mb-11 ">
              <div className="col-6">
                <div className="bg-white">
                  {" "}
                  <div className="d-flex justify-content-between pt-5">
                    <h3 className="font-size-6  px-3 pb-5 ">
                      Recently Added Jobs
                    </h3>
                    <div className="col-lg-6 form_control mt-5">
                      <p className="input_label">Filter by Duration:</p>
                      <div className="select_div">
                        <select
                          name="category"
                          value={state}
                          id="category"
                          onChange={(e) => setState(e.target.value)}
                          className="form-control nice-select pl-7 h-100 arrow-3 arrow-3-black w-100 text-black-2"
                        >
                          <option value={""}>Select Duration</option>
                          <option value={"this_week"}>This Week </option>
                          <option value={"last_week"}>Last Week</option>{" "}
                          <option value={"last_month"}>Last Month</option>
                          <option value={"current_month"}>Current Month</option>
                        </select>
                      </div>
                    </div>
                  </div>{" "}
                  <JobTable heading={"Dashboard"} filter_by_time={state} />
                </div>
              </div>
              <div className="col-6">
                <div className="bg-white">
                  {" "}
                  <div className="d-flex justify-content-between pt-5">
                    <h3 className="font-size-6  px-3 pb-5 ">
                      Recently Added Employee
                    </h3>
                    <div className="col-lg-6 form_control mt-5">
                      <p className="input_label">Filter by Duration:</p>
                      <div className="select_div">
                        <select
                          name="category"
                          value={state}
                          id="category"
                          onChange={(e) => setState(e.target.value)}
                          className="form-control nice-select pl-7 h-100 arrow-3 arrow-3-black w-100 text-black-2"
                        >
                          <option value={""}>Select Duration</option>
                          <option value={"this_week"}>This Week </option>
                          <option value={"last_week"}>Last Week</option>{" "}
                          <option value={"last_month"}>Last Month</option>
                          <option value={"current_month"}>Current Month</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <EmployeeTable heading={"Dashboard"} filter_by_time={state} />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-14">
            <div className="row">
              <div className="col-lg-6">
                <div className="bg-white">
                  <div className="d-flex justify-content-between pt-5">
                    <h3 className="font-size-6  px-3 pb-5 ">
                      Recently Added Interview
                    </h3>
                    <div className="col-lg-6 form_control mt-5">
                      <p className="input_label">Filter by Duration:</p>
                      <div className="select_div">
                        <select
                          name="category"
                          value={state}
                          id="category"
                          onChange={(e) => setState(e.target.value)}
                          className="form-control nice-select pl-7 h-100 arrow-3 arrow-3-black w-100 text-black-2"
                        >
                          <option value={""}>Select Duration</option>
                          <option value={"this_week"}>This Week </option>
                          <option value={"last_week"}>Last Week</option>{" "}
                          <option value={"last_month"}>Last Month</option>
                          <option value={"current_month"}>Current Month</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <Interview heading={"Dashboard"} filter_by_time={state} />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="bg-white">
                  <div className="d-flex justify-content-between pt-5">
                    <h3 className="font-size-6  px-3 pb-5 ">
                      Recently Added Companies
                    </h3>
                    <div className="col-lg-6 form_control mt-5">
                      <p className="input_label">Filter by Duration:</p>
                      <div className="select_div">
                        <select
                          name="category"
                          value={state}
                          id="category"
                          onChange={(e) => setState(e.target.value)}
                          className="form-control nice-select pl-7 h-100 arrow-3 arrow-3-black w-100 text-black-2"
                        >
                          <option value={""}>Select Duration</option>
                          <option value={"this_week"}>This Week </option>
                          <option value={"last_week"}>Last Week</option>{" "}
                          <option value={"last_month"}>Last Month</option>
                          <option value={"current_month"}>Current Month</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <EmployerTable heading="Dashboard" filter_by_time={state} />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-14">
            <div className="row mb-11 ">
              <div className="col-6">
                <div className="bg-white">
                  <div className="d-flex justify-content-between pt-5">
                    <h3 className="font-size-6  px-3 pb-5 ">
                      Recently Added Job Response
                    </h3>
                    <div className="col-lg-6 form_control mt-5">
                      <p className="input_label">Filter by Duration:</p>
                      <div className="select_div">
                        <select
                          name="category"
                          value={state}
                          id="category"
                          onChange={(e) => setState(e.target.value)}
                          className="form-control nice-select pl-7 h-100 arrow-3 arrow-3-black w-100 text-black-2"
                        >
                          <option value={""}>Select Duration</option>
                          <option value={"this_week"}>This Week </option>
                          <option value={"last_week"}>Last Week</option>{" "}
                          <option value={"last_month"}>Last Month</option>
                          <option value={"current_month"}>Current Month</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <JobResponse heading={"Dashboard"} filter_by_time={state} />
                </div>
              </div>
              <div className="col-6">
                <div className="bg-white">
                  {" "}
                  <div className="d-flex justify-content-between pt-5">
                    <h3 className="font-size-6  px-3 pb-5 ">
                      Recently Added FollowUp
                    </h3>
                    <div className="col-lg-6 form_control mt-5">
                      <p className="input_label">Filter by Duration:</p>
                      <div className="select_div">
                        <select
                          name="category"
                          value={state}
                          id="category"
                          onChange={(e) => setState(e.target.value)}
                          className="form-control nice-select pl-7 h-100 arrow-3 arrow-3-black w-100 text-black-2"
                        >
                          <option value={""}>Select Duration</option>
                          <option value={"this_week"}>This Week </option>
                          <option value={"last_week"}>Last Week</option>{" "}
                          <option value={"last_month"}>Last Month</option>
                          <option value={"current_month"}>Current Month</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <FollowUpDashBoard heading={"Dashboard"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {showEmployeeProfile === true ? (
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
      ) : null} */}
    </div>
  );
};
export default AdminDashboard;
