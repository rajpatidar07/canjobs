import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../common/button";
import JobDetailsBox from "../common/jobdetail";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import AddJobModal from "../forms/employer/job";
function Job() {
  let [showAddJobsModal, setShowAddJobsModal] = useState(false);
  let [showJobDetails, setShowJobDetails] = useState(false);
  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader />
        {/* <!-- navbar- --> */}
        <AdminSidebar />
        <div
          className={
            showJobDetails === false
              ? "dashboard-main-container mt-24"
              : "d-none"
          }
          id="dashboard-body"
        >
          <div className="container">
            <div className="mb-18">
              <div className="row mb-8 align-items-center">
                <div className="col-lg-6 mb-lg-0 mb-4">
                  <h3 className="font-size-6 mb-0">Posted Jobs (4)</h3>
                </div>
                <div className="col-lg-6">
                  <div className="d-flex flex-wrap align-items-center justify-content-lg-end">
                    <p className="font-size-4 mb-0 mr-6 py-2">Filter by Job:</p>
                    <div className="h-px-48">
                      <select
                        name="country"
                        id="country"
                        className=" nice-select pl-7 h-100 arrow-3 arrow-3-black min-width-px-273 font-weight-semibold text-black-2"
                      >
                        <option value="" data-display="Product Designer">
                          Software Engineer
                        </option>
                        <option value="">MBA</option>
                        <option value="">BE</option>
                      </select>
                    </div>
                  </div>
                  <div className="float-md-right mt-6">
                    <CustomButton
                      className="font-size-3 rounded-3 btn btn-primary border-0"
                      onClick={() => setShowAddJobsModal(true)}
                    >
                      Add Job
                    </CustomButton>
                    <AddJobModal
                      show={showAddJobsModal}
                      close={() => setShowAddJobsModal(false)}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white shadow-8 pt-7 rounded pb-9 px-11">
                <div className="table-responsive ">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          Job Type
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          Address
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          Education
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          Skills
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          Experience
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          Applied
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border border-color-2">
                        <th className=" border-0 py-7">1</th>
                        <th scope="row" className=" border-0 py-7 ">
                          <div className="">
                            <Link
                              to={""}
                              onClick={() => setShowJobDetails(true)}
                              className="font-size-4 mb-0 font-weight-semibold text-black-2"
                            >
                              Senior Project Manager
                            </Link>
                          </div>
                        </th>
                        <th className=" py-7">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            Software Engineer
                          </h3>
                        </th>
                        <th className=" py-7">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            24, main cancel near yok tower, New York
                          </h3>
                        </th>
                        <th className=" py-7 ">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            BE /B.tech /BCS
                          </h3>
                        </th>
                        <th className=" py-7 ">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            Java script , HTLM and CSS
                          </h3>
                        </th>
                        <th className=" py-7 ">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            0-5 years
                          </h3>
                        </th>
                        <th className=" py-7 ">
                          <Link to="/followup">
                            <h3 className="font-size-3 font-weight-bold text-black-2 mb-0">
                              47
                            </h3>
                          </Link>
                        </th>
                        <th className=" py-7 min-width-px-100">
                          <Link to="" onClick={() => setShowAddJobsModal(true)}>
                            <span className=" fas fa-edit text-gray px-5"></span>
                          </Link>
                          <Link to="">
                            <span className=" text-danger">
                              <i className="fa fa-trash"></i>
                            </span>
                          </Link>
                        </th>
                      </tr>
                      <tr className="border border-color-2">
                        <th className=" border-0 py-7">2</th>
                        <th scope="row" className=" border-0 py-7 ">
                          <div className="">
                            <Link
                              to=""
                              onClick={() => setShowJobDetails(true)}
                              className="font-size-4 mb-0 font-weight-semibold text-black-2"
                            >
                              UI Designer
                            </Link>
                          </div>
                        </th>
                        <th className=" py-7">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            Software Engineer
                          </h3>
                        </th>
                        <th className=" py-7">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            24, main cancel near yok tower, New York
                          </h3>
                        </th>
                        <th className=" py-7 ">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            BE /B.tech /BCS
                          </h3>
                        </th>
                        <th className=" py-7 ">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            Java script , HTLM and CSS
                          </h3>
                        </th>
                        <th className=" py-7 ">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            0-5 years
                          </h3>
                        </th>
                        <th className=" py-7 ">
                          <Link to="/followup">
                            <h3 className="font-size-3 font-weight-bold text-black-2 mb-0">
                              145
                            </h3>
                          </Link>
                        </th>
                        <th className=" py-7 min-width-px-100">
                          <Link to="" onClick={() => setShowAddJobsModal(true)}>
                            <span className=" fas fa-edit text-gray px-5"></span>
                          </Link>
                          <Link to="">
                            <span className=" text-danger">
                              <i className="fa fa-trash"></i>
                            </span>
                          </Link>
                        </th>
                      </tr>
                      <tr className="border border-color-2">
                        <th className=" border-0 py-7">3</th>
                        <th scope="row" className=" border-0 py-7 ">
                          <div className="">
                            <Link
                              to=""
                              onClick={() => setShowJobDetails(true)}
                              className="font-size-4 mb-0 font-weight-semibold text-black-2"
                            >
                              Head of Marketing
                            </Link>
                          </div>
                        </th>
                        <th className=" py-7">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            MBA
                          </h3>
                        </th>
                        <th className=" py-7">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            24, main cancel near yok tower, New York
                          </h3>
                        </th>
                        <th className=" py-7 ">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            BE /B.tech /BCS
                          </h3>
                        </th>
                        <th className=" py-7 ">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            Java script , HTLM and CSS
                          </h3>
                        </th>
                        <th className=" py-7 ">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            0-5 years
                          </h3>
                        </th>
                        <th className=" py-7 ">
                          <Link to="/followup">
                            <h3 className="font-size-3 font-weight-bold text-black-2 mb-0">
                              62
                            </h3>
                          </Link>
                        </th>
                        <th className=" py-7 min-width-px-100">
                          <Link to="" onClick={() => setShowAddJobsModal(true)}>
                            <span className=" fas fa-edit text-gray px-5"></span>
                          </Link>
                          <Link to="">
                            <span className=" text-danger">
                              <i className="fa fa-trash"></i>
                            </span>
                          </Link>
                        </th>
                      </tr>
                      <tr className="border border-color-2">
                        <th className=" border-0 py-7">4</th>
                        <th scope="row" className=" border-0 py-7 ">
                          <div className="">
                            <Link
                              to=""
                              onClick={() => setShowJobDetails(true)}
                              className="font-size-4 mb-0 font-weight-semibold text-black-2"
                            >
                              Full-Stack Developer
                            </Link>
                          </div>
                        </th>
                        <th className=" py-7">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            BE
                          </h3>
                        </th>
                        <th className=" py-7">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            24, main cancel near yok tower, New York
                          </h3>
                        </th>
                        <th className=" py-7 ">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            BE /B.tech /BCS
                          </h3>
                        </th>
                        <th className=" py-7 ">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            Java script , HTLM and CSS
                          </h3>
                        </th>
                        <th className=" py-7 ">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            0-5 years
                          </h3>
                        </th>
                        <th className=" py-7 ">
                          <Link to="/followup">
                            <h3 className="font-size-3 font-weight-bold text-black-2 mb-0">
                              184
                            </h3>
                          </Link>
                        </th>
                        <th className=" py-7 min-width-px-100">
                          <Link to="" onClick={() => setShowAddJobsModal(true)}>
                            <span className=" fas fa-edit text-gray px-5"></span>
                          </Link>
                          <Link to="">
                            <span className=" text-danger">
                              <i className="fa fa-trash"></i>
                            </span>
                          </Link>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="pt-2">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination pagination-hover-primary rounded-0 ml-n2">
                      <li className="page-item rounded-0 flex-all-center">
                        <Link
                          to={""}
                          className="page-link rounded-0 border-0 px-3active"
                          aria-label="Previous"
                        >
                          <i className="fas fa-chevron-left"></i>
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          to={""}
                          className="page-link border-0 font-size-3 font-weight-semibold px-3"
                        >
                          1
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          to={""}
                          className="page-link border-0 font-size-3 font-weight-semibold px-3"
                        >
                          2
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          to={""}
                          className="page-link border-0 font-size-3 font-weight-semibold px-3"
                        >
                          3
                        </Link>
                      </li>
                      <li className="page-item disabled">
                        <Link
                          to={""}
                          className="page-link border-0 font-size-3 font-weight-semibold px-3"
                        >
                          ...
                        </Link>
                      </li>
                      <li className="page-item ">
                        <Link
                          to={""}
                          className="page-link border-0 font-size-3 font-weight-semibold px-3"
                        >
                          7
                        </Link>
                      </li>
                      <li className="page-item rounded-0 flex-all-center">
                        <Link
                          to={""}
                          className="page-link rounded-0 border-0 px-3"
                          aria-label="Next"
                        >
                          <i className="fas fa-chevron-right"></i>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Job detail imported- --> */}
        {showJobDetails === true ? (
          <div className="dashboard-main-container mt-24 ">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 dark-mode-texts">
                  <div className="mb-9">
                    <Link
                      to={""}
                      onClick={() => setShowJobDetails(false)}
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
                <JobDetailsBox />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Job;
