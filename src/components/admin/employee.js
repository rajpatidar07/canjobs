import React, { useState } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import CustomButton from "../common/button";
import { Link } from "react-router-dom";
import PersonalDetails from "../forms/user/personal";
import EmployeeDetails from "../common/employeeDetail";
import Education from "../forms/user/education";
import Skills from "../forms/user/skills";

function Employee() {
  let [showAddEmployeeModal, setShowEmployeeMOdal] = useState(false);
  let [showEducationModal, setShowEducationModal] = useState(false);
  let [showSkillsModal, setShowSkillsModal] = useState(false);
  let [showEmployeeProfile, setShowEmployeeProfile] = useState(false);

  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader />
        {/* <!-- navbar- --> */}
        <AdminSidebar />
        <div
          className={
            showEmployeeProfile === false
              ? "dashboard-main-container mt-24"
              : "d-none"
          }
          id="dashboard-body"
        >
          <div className="container">
            <div className="mb-18">
              <div className="row mb-8 align-items-center">
                <div className="col-lg-6 mb-lg-0 mb-4">
                  <h3 className="font-size-6 mb-0">Applicants (14)</h3>
                </div>
                <div className="col-lg-6">
                  <div className="d-flex flex-wrap align-items-center justify-content-lg-end">
                    <p className="font-size-3 mb-0 mr-6 py-2">Filter by Job:</p>
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
                      onClick={() => setShowEmployeeMOdal(true)}
                    >
                      Add Employee
                    </CustomButton>
                    <PersonalDetails
                      show={showAddEmployeeModal}
                      close={() => setShowEmployeeMOdal(false)}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white shadow-8 pt-7 rounded pb-8 px-11">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="pl-0 text-center border-0 font-size-4 font-weight-normal"
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
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          Contact
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          Education
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          Skills
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          Salary
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          Experience
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border border-color-2">
                        <th scope="row" className="pl-6 border-0 py-7 pr-0  ">
                          <div className="media  align-items-center">
                            <div className="circle-36 mx-auto">
                              <img
                                src="https://cdn.vectorstock.com/i/preview-1x/32/12/default-avatar-profile-icon-vector-39013212.webp"
                                alt=""
                                className="w-100"
                              />
                            </div>
                          </div>
                        </th>
                        <th className=" py-7  pr-0">
                          <Link
                            to={""}
                            onClick={() => setShowEmployeeProfile(true)}
                          >
                            <h4 className="font-size-3 mb-0 font-weight-semibold text-black-2">
                              Nicolas Bradley <br />
                              <span className="text-gray font-size-2">
                                single <br />
                                (Male 25)
                              </span>
                            </h4>
                          </Link>
                        </th>
                        <th className=" py-7  pr-0">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            +9863254170 <br />
                            <span className="text-gray font-size-2">
                              Nicolas25@gmail.com
                            </span>
                          </h3>
                        </th>

                        <Education
                          close={() => setShowEducationModal(false)}
                          show={showEducationModal}
                        />
                        <Skills
                          show={showSkillsModal}
                          close={() => setShowSkillsModal(false)}
                        />
                        <th className=" py-7 min-width-px-100">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            M.tech
                          </h3>
                        </th>
                        <th className=" py-7 min-width-px-100">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            JAVA, PHP, React
                          </h3>
                        </th>
                        <th className=" py-7 min-width-px-100">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            25,000
                          </h3>
                        </th>
                        <th className=" py-7 min-width-px-100">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            2 years in React js
                          </h3>
                        </th>
                        <th className=" py-7 min-width-px-100">
                          <Link
                            to=""
                            onClick={() => setShowEducationModal(true)}
                          >
                            <span className="	fas fa-graduation-cap text-gray px-2"></span>
                          </Link>
                          <Link to="" onClick={() => setShowSkillsModal(true)}>
                            <span className=" fa fa-cogs text-gray px-2"></span>
                          </Link>
                          <Link
                            to=""
                            onClick={() => setShowEmployeeMOdal(true)}
                          >
                            <span className=" fas fa-edit text-gray px-2"></span>
                          </Link>
                          <Link to="">
                            <span className=" text-danger">
                              <i className="fa fa-trash "></i>
                            </span>
                          </Link>
                        </th>
                      </tr>
                      <tr className="border border-color-2">
                        <th scope="row" className="pl-6 border-0 py-7 pr-0  ">
                          <div className="media  align-items-center">
                            <div className="circle-36 mx-auto">
                              <img
                                src="https://cdn.vectorstock.com/i/preview-1x/32/12/default-avatar-profile-icon-vector-39013212.webp"
                                alt=""
                                className="w-100"
                              />
                            </div>
                          </div>
                        </th>
                        <th className="pl-6 border-0 py-7 pr-0">
                          <Link
                            to={""}
                            onClick={() => setShowEmployeeProfile(true)}
                          >
                            <h4 className="font-size-3 mb-0 font-weight-semibold text-black-2">
                              Minny jeson <br />
                              <span className="text-gray font-size-2">
                                Married <br />
                                (Female 28)
                              </span>
                            </h4>
                          </Link>
                        </th>
                        <th className=" py-7  pr-0">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            +9863254170 <br />
                            <span className="text-gray font-size-2">
                              Elizabeth28@gmail.com
                            </span>
                          </h3>
                        </th>
                        <th className=" py-7 min-width-px-100">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            M.tech
                          </h3>
                        </th>
                        <th className=" py-7 min-width-px-100">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            JAVA, PHP, React
                          </h3>
                        </th>
                        <th className=" py-7 min-width-px-100">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            25,000
                          </h3>
                        </th>
                        <th className=" py-7 min-width-px-100">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            2 years in React js
                          </h3>
                        </th>
                        <th className=" py-7 min-width-px-100">
                          <Link
                            to=""
                            onClick={() => setShowEducationModal(true)}
                          >
                            <span className="	fas fa-graduation-cap text-gray px-2"></span>
                          </Link>
                          <Link to="" onClick={() => setShowSkillsModal(true)}>
                            <span className=" fa fa-cogs text-gray px-2"></span>
                          </Link>
                          <Link
                            to=""
                            onClick={() => setShowEmployeeMOdal(true)}
                          >
                            <span className=" fas fa-edit text-gray px-2"></span>
                          </Link>
                          <Link to="">
                            <span className=" text-danger">
                              <i className="fa fa-trash "></i>
                            </span>
                          </Link>
                        </th>
                      </tr>
                      <tr className="border border-color-2">
                        <th scope="row" className="pl-6 border-0 py-7 pr-0  ">
                          <div className="media  align-items-center">
                            <div className="circle-36 mx-auto">
                              <img
                                src="https://cdn.vectorstock.com/i/preview-1x/32/12/default-avatar-profile-icon-vector-39013212.webp"
                                alt=""
                                className="w-100"
                              />
                            </div>
                          </div>
                        </th>
                        <th className="pl-6 border-0 py-7 pr-0">
                          <Link
                            to={""}
                            onClick={() => setShowEmployeeProfile(true)}
                          >
                            <h4 className="font-size-3 mb-0 font-weight-semibold text-black-2">
                              Joe Wade <br />
                              <span className="text-gray font-size-2">
                                single <br />
                                (Male 32)
                              </span>
                            </h4>
                          </Link>
                        </th>
                        <th className=" py-7  pr-0">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            +9863254170 <br />
                            <span className="text-gray font-size-2">
                              Joe23@gmail.com
                            </span>
                          </h3>
                        </th>
                        <th className=" py-7 min-width-px-100">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            M.tech
                          </h3>
                        </th>
                        <th className=" py-7 min-width-px-100">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            JAVA, PHP, React
                          </h3>
                        </th>
                        <th className=" py-7 min-width-px-100">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            25,000
                          </h3>
                        </th>
                        <th className=" py-7 min-width-px-100">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            2 years in React js
                          </h3>
                        </th>
                        <th className=" py-7 min-width-px-100">
                          <Link
                            to=""
                            onClick={() => setShowEducationModal(true)}
                          >
                            <span className="	fas fa-graduation-cap text-gray px-2"></span>
                          </Link>
                          <Link to="" onClick={() => setShowSkillsModal(true)}>
                            <span className=" fa fa-cogs text-gray px-2"></span>
                          </Link>
                          <Link
                            to=""
                            onClick={() => setShowEmployeeMOdal(true)}
                          >
                            <span className=" fas fa-edit text-gray px-2"></span>
                          </Link>
                          <Link to="">
                            <span className=" text-danger">
                              <i className="fa fa-trash "></i>
                            </span>
                          </Link>
                        </th>
                      </tr>
                      <tr className="border border-color-2">
                        <th scope="row" className="pl-6 border-0 py-7 pr-0  ">
                          <div className="media  align-items-center">
                            <div className="circle-36 mx-auto">
                              <img
                                src="https://cdn.vectorstock.com/i/preview-1x/32/12/default-avatar-profile-icon-vector-39013212.webp"
                                alt=""
                                className="w-100"
                              />
                            </div>
                          </div>
                        </th>
                        <th className="pl-6 border-0 py-7 pr-0">
                          <Link
                            to={""}
                            onClick={() => setShowEmployeeProfile(true)}
                          >
                            <h4 className="font-size-3 mb-0 font-weight-semibold text-black-2">
                              Roger Hawkins
                              <br />
                              <span className="text-gray font-size-2">
                                Married <br />
                                (Male 30)
                              </span>
                            </h4>
                          </Link>
                        </th>
                        <th className=" py-7  pr-0">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            +9863254170 <br />
                            <span className="text-gray font-size-2">
                              Roger36@gmail.com
                            </span>
                          </h3>
                        </th>
                        <th className=" py-7 min-width-px-100">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            M.tech
                          </h3>
                        </th>
                        <th className=" py-7 min-width-px-100">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            JAVA, PHP, React
                          </h3>
                        </th>
                        <th className=" py-7 min-width-px-100">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            25,000
                          </h3>
                        </th>
                        <th className=" py-7 min-width-px-100">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            2 years in React js
                          </h3>
                        </th>
                        <th className=" py-7 min-width-px-100">
                          <Link
                            to=""
                            onClick={() => setShowEducationModal(true)}
                          >
                            <span className="	fas fa-graduation-cap text-gray px-2"></span>
                          </Link>
                          <Link to="" onClick={() => setShowSkillsModal(true)}>
                            <span className=" fa fa-cogs text-gray px-2"></span>
                          </Link>
                          <Link
                            to=""
                            onClick={() => setShowEmployeeMOdal(true)}
                          >
                            <span className=" fas fa-edit text-gray px-2"></span>
                          </Link>
                          <Link to="">
                            <span className=" text-danger">
                              <i className="fa fa-trash "></i>
                            </span>
                          </Link>
                        </th>
                      </tr>
                      <tr className="border border-color-2">
                        <th scope="row" className="pl-6 border-0 py-7 pr-0  ">
                          <div className="media  align-items-center">
                            <div className="circle-36 mx-auto">
                              <img
                                src="https://cdn.vectorstock.com/i/preview-1x/32/12/default-avatar-profile-icon-vector-39013212.webp"
                                alt=""
                                className="w-100"
                              />
                            </div>
                          </div>
                        </th>
                        <th className="pl-6 border-0 py-7 pr-0">
                          <Link
                            to={""}
                            onClick={() => setShowEmployeeProfile(true)}
                          >
                            <h4 className="font-size-3 mb-0 font-weight-semibold text-black-2">
                              Marie Green
                              <br />
                              <span className="text-gray font-size-2">
                                Married <br />
                                (Female 23)
                              </span>
                            </h4>
                          </Link>
                        </th>
                        <th className=" py-7  pr-0">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            +9863 <br />
                            <span className="text-gray font-size-2">
                              <br /> Marie32@gmail.com
                            </span>
                          </h3>
                        </th>
                        <th className=" py-7 min-width-px-100">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            M.tech
                          </h3>
                        </th>
                        <th className=" py-7 min-width-px-100">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            JAVA, PHP, React
                          </h3>
                        </th>
                        <th className=" py-7 min-width-px-100">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            25,000
                          </h3>
                        </th>
                        <th className=" py-7 min-width-px-100">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            2 years in React js
                          </h3>
                        </th>
                        <th className=" py-7 min-width-px-100">
                          <Link
                            to=""
                            onClick={() => setShowEducationModal(true)}
                          >
                            <span className="	fas fa-graduation-cap text-gray px-2"></span>
                          </Link>
                          <Link to="" onClick={() => setShowSkillsModal(true)}>
                            <span className=" fa fa-cogs text-gray px-2"></span>
                          </Link>
                          <Link
                            to=""
                            onClick={() => setShowEmployeeMOdal(true)}
                          >
                            <span className=" fas fa-edit text-gray px-2"></span>
                          </Link>
                          <Link to="">
                            <span className=" text-danger">
                              <i className="fa fa-trash "></i>
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
        {showEmployeeProfile === true ? (
          <div className="dashboard-main-container mt-24">
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
    </>
  );
}

export default Employee;
