import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../../comman/button";
import AdminHeader from "../header";
import AdminSidebar from "../sidebar";
import AddModal from "./modal/addModal";
function Job() {
  let [showAddJobsModal, setShowAddJobsModal] = useState(false);
  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader />
        {/* <!-- navbar- --> */}
        <AdminSidebar />
        <a
          className="sidebar-mobile-button"
          data-toggle="collapse"
          href="#sidebar"
          role="button"
          aria-expanded="false"
          aria-controls="sidebar"
        >
          <i className="icon icon-sidebar-2"></i>
        </a>
        <div className="dashboard-main-container mt-24" id="dashboard-body">
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
                    <AddModal
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
                          className="pl-0 border-0 font-size-4 font-weight-normal"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="pl-4 border-0 font-size-4 font-weight-normal"
                        >
                          Job Type
                        </th>
                        <th
                          scope="col"
                          className="pl-4 border-0 font-size-4 font-weight-normal"
                        >
                          City
                        </th>
                        <th
                          scope="col"
                          className="pl-4 border-0 font-size-4 font-weight-normal"
                        >
                          Created on
                        </th>
                        <th
                          scope="col"
                          className="pl-4 border-0 font-size-4 font-weight-normal"
                        >
                          Total Applicants
                        </th>
                        <th
                          scope="col"
                          className="pl-4 border-0 font-size-4 font-weight-normal"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border border-color-2">
                        <th
                          scope="row"
                          className="pl-6 border-0 py-7 min-width-px-235"
                        >
                          <div className="">
                            <Link
                              to={"/jobdetails"}
                              className="font-size-4 mb-0 font-weight-semibold text-black-2"
                            >
                              Senior Project Manager
                            </Link>
                          </div>
                        </th>
                        <th className="table-y-middle py-7">
                          <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                            Software Engineer
                          </h3>
                        </th>
                        <th className="table-y-middle py-7">
                          <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                            New York
                          </h3>
                        </th>
                        <th className="table-y-middle py-7 ">
                          <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                            12 July, 2020
                          </h3>
                        </th>
                        <th className="table-y-middle py-7 ">
                          <h3 className="font-size-4 font-weight-bold text-black-2 mb-0">
                            47
                          </h3>
                        </th>
                        <th className="table-y-middle py-7 min-width-px-100">
                          <Link to="">
                            <span className=" fas fa-edit text-gray px-5">
                              {" "}
                            </span>
                          </Link>
                          <Link to="">
                            <span className=" text-danger">
                              {" "}
                              <i className="fa fa-trash"></i>
                            </span>
                          </Link>
                        </th>
                      </tr>
                      <tr className="border border-color-2">
                        <th
                          scope="row"
                          className="pl-6 border-0 py-7 min-width-px-235"
                        >
                          <div className="">
                            <a
                              href="jobdetails.html"
                              className="font-size-4 mb-0 font-weight-semibold text-black-2"
                            >
                              UI Designer
                            </a>
                          </div>
                        </th>
                        <th className="table-y-middle py-7">
                          <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                            Software Engineer
                          </h3>
                        </th>
                        <th className="table-y-middle py-7">
                          <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                            Remote
                          </h3>
                        </th>
                        <th className="table-y-middle py-7 ">
                          <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                            24 June, 2020
                          </h3>
                        </th>
                        <th className="table-y-middle py-7 ">
                          <h3 className="font-size-4 font-weight-bold text-black-2 mb-0">
                            145
                          </h3>
                        </th>
                        <th className="table-y-middle py-7 min-width-px-100">
                          <Link to="">
                            <span className=" fas fa-edit text-gray px-5">
                              {" "}
                            </span>
                          </Link>
                          <Link to="">
                            <span className=" text-danger">
                              {" "}
                              <i className="fa fa-trash"></i>
                            </span>
                          </Link>
                        </th>
                      </tr>
                      <tr className="border border-color-2">
                        <th
                          scope="row"
                          className="pl-6 border-0 py-7 min-width-px-235"
                        >
                          <div className="">
                            <a
                              href="jobdetails.html"
                              className="font-size-4 mb-0 font-weight-semibold text-black-2"
                            >
                              Head of Marketing
                            </a>
                          </div>
                        </th>
                        <th className="table-y-middle py-7">
                          <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                            MBA
                          </h3>
                        </th>
                        <th className="table-y-middle py-7">
                          <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                            London
                          </h3>
                        </th>
                        <th className="table-y-middle py-7 ">
                          <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                            15 June, 2020
                          </h3>
                        </th>
                        <th className="table-y-middle py-7 ">
                          <h3 className="font-size-4 font-weight-bold text-black-2 mb-0">
                            62
                          </h3>
                        </th>
                        <th className="table-y-middle py-7 min-width-px-100">
                          <Link to="">
                            <span className=" fas fa-edit text-gray px-5">
                              {" "}
                            </span>
                          </Link>
                          <Link to="">
                            <span className=" text-danger">
                              {" "}
                              <i className="fa fa-trash"></i>
                            </span>
                          </Link>
                        </th>
                      </tr>
                      <tr className="border border-color-2">
                        <th
                          scope="row"
                          className="pl-6 border-0 py-7 min-width-px-235"
                        >
                          <div className="">
                            <a
                              href="jobdetails.html"
                              className="font-size-4 mb-0 font-weight-semibold text-black-2"
                            >
                              Full-Stack Developer
                            </a>
                          </div>
                        </th>
                        <th className="table-y-middle py-7">
                          <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                            BE
                          </h3>
                        </th>
                        <th className="table-y-middle py-7">
                          <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                            California
                          </h3>
                        </th>
                        <th className="table-y-middle py-7 ">
                          <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                            29 May, 2020
                          </h3>
                        </th>
                        <th className="table-y-middle py-7 ">
                          <h3 className="font-size-4 font-weight-bold text-black-2 mb-0">
                            184
                          </h3>
                        </th>
                        <th className="table-y-middle py-7 min-width-px-100">
                          <Link to="">
                            <span className=" fas fa-edit text-gray px-5">
                              {" "}
                            </span>
                          </Link>
                          <Link to="">
                            <span className=" text-danger">
                              {" "}
                              <i className="fa fa-trash"></i>
                            </span>
                          </Link>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Job;
