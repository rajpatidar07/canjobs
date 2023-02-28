import React, { useState } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import CustomButton from "../common/button";
import { Link } from "react-router-dom";
import PersonalDetails from "../forms/personal";
import EmployeeDetails from "../common/employeeDetail";
import Education from "../forms/education";
import Skills from "../forms/skills";

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
                          className="pl-0  border-0 font-size-4 font-weight-normal"
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
                          Work status
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
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border border-color-2">
                        <th scope="row" className="pl-6 border-0 py-7 pr-0">
                          <div className="media  align-items-center">
                            <div className="circle-36 mr-6">
                              <img
                                src="image/table-one-profile-image-1.png"
                                alt=""
                                className="w-100"
                              />
                            </div>
                            <Link
                              to={""}
                              onClick={() => setShowEmployeeProfile(true)}
                            >
                              <h4 className="font-size-4 mb-0 font-weight-semibold text-black-2">
                                Nicolas Bradley <br />
                                <span className="text-gray font-size-2">
                                  {" "}
                                  single <br />
                                  (Male 25)
                                </span>
                              </h4>
                            </Link>
                          </div>
                        </th>
                        <th className="table-y-middle py-7  pr-0">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            +9863254170
                            <br />
                            Nicolas25@gmail.com
                          </h3>
                        </th>
                        <th className="table-y-middle py-7 ">
                          <select className="form-control">
                            <option value={""}>Select status</option>
                            <option value={""}>Part-Time</option>
                            <option value={""}>Full-Time</option>
                            <option value={""}>Temporary</option>
                            <option value={""}>Contract</option>
                            <option value={""}>Unemployed</option>
                          </select>
                        </th>
                        <th className="table-y-middle py-7  pr-0">
                          <Link
                            to=""
                            onClick={() => setShowEducationModal(true)}
                          >
                            <span className="	fas fa-graduation-cap text-gray px-5 mx-5">
                              {" "}
                            </span>
                          </Link>
                        </th>
                        <Education
                          close={() => setShowEducationModal(false)}
                          show={showEducationModal}
                        />
                        <th className="table-y-middle py-7  pr-0">
                          <Link to="" onClick={() => setShowSkillsModal(true)}>
                            <span className=" fas fa-edit text-gray px-5">
                              {" "}
                            </span>
                          </Link>
                        </th>
                        <Skills
                          show={showSkillsModal}
                          close={() => setShowSkillsModal(false)}
                        />
                        <th className="table-y-middle py-7">
                          <Link to="">
                            <span className=" fas fa-edit text-gray px-5">
                              {" "}
                            </span>
                          </Link>
                          <Link to="">
                            <span className=" text-danger">
                              <i className="fa fa-trash"></i>
                            </span>
                          </Link>
                        </th>
                      </tr>
                      <tr className="border border-color-2">
                        <th scope="row" className="pl-6 border-0 py-7 pr-0">
                          <div className="media  align-items-center">
                            <div className="circle-36 mr-6">
                              <img
                                src="image/table-one-profile-image-2.png"
                                alt=""
                                className="w-100"
                              />
                            </div>
                            <Link
                              to={""}
                              onClick={() => setShowEmployeeProfile(true)}
                            >
                              <h4 className="font-size-4 mb-0 font-weight-semibold text-black-2">
                                Minny jeson <br />
                                <span className="text-gray font-size-2">
                                  Married <br />
                                  (Female 28)
                                </span>
                              </h4>
                            </Link>
                          </div>
                        </th>
                        <th className="table-y-middle py-7  pr-0">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            +9863254170
                            <br />
                            Elizabeth28@gmail.com
                          </h3>
                        </th>
                        <th className="table-y-middle py-7 ">
                          <select className="form-control">
                            <option value={""}>Select status</option>
                            <option value={""}>Part-Time</option>
                            <option value={""}>Full-Time</option>
                            <option value={""}>Temporary</option>
                            <option value={""}>Contract</option>
                            <option value={""}>Unemployed</option>
                          </select>
                        </th>
                        <th className="table-y-middle py-7  pr-0">
                          <Link
                            to=""
                            onClick={() => setShowEducationModal(true)}
                          >
                            <span className="	fas fa-graduation-cap text-gray px-5 mx-5">
                              {" "}
                            </span>
                          </Link>
                        </th>
                        <th className="table-y-middle py-7  pr-0">
                          <Link to="" onClick={() => setShowSkillsModal(true)}>
                            <span className=" fas fa-edit text-gray px-5">
                              {" "}
                            </span>
                          </Link>
                        </th>

                        <th className="table-y-middle py-7">
                          <Link to="">
                            <span className=" fas fa-edit text-gray px-5">
                              {" "}
                            </span>
                          </Link>
                          <Link to="">
                            <span className=" text-danger">
                              <i className="fa fa-trash"></i>
                            </span>
                          </Link>
                        </th>
                      </tr>
                      <tr className="border border-color-2">
                        <th scope="row" className="pl-6 border-0 py-7 pr-0">
                          <div className="media  align-items-center">
                            <div className="circle-36 mr-6">
                              <img
                                src="image/table-one-profile-image-3.png"
                                alt=""
                                className="w-100"
                              />
                            </div>
                            <Link
                              to={""}
                              onClick={() => setShowEmployeeProfile(true)}
                            >
                              <h4 className="font-size-4 mb-0 font-weight-semibold text-black-2">
                                Joe Wade <br />
                                <span className="text-gray font-size-2">
                                  single <br />
                                  (Male 32)
                                </span>
                              </h4>
                            </Link>
                          </div>
                        </th>
                        <th className="table-y-middle py-7  pr-0">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            +9863254170
                            <br />
                            Joe23@gmail.com
                          </h3>
                        </th>
                        <th className="table-y-middle py-7 ">
                          <select className="form-control">
                            <option value={""}>Select status</option>
                            <option value={""}>Part-Time</option>
                            <option value={""}>Full-Time</option>
                            <option value={""}>Temporary</option>
                            <option value={""}>Contract</option>
                            <option value={""}>Unemployed</option>
                          </select>
                        </th>
                        <th className="table-y-middle py-7  pr-0">
                          <Link
                            to=""
                            onClick={() => setShowEducationModal(true)}
                          >
                            <span className="	fas fa-graduation-cap text-gray px-5 mx-5">
                              {" "}
                            </span>
                          </Link>
                        </th>
                        <th className="table-y-middle py-7  pr-0">
                          <Link to="" onClick={() => setShowSkillsModal(true)}>
                            <span className=" fas fa-edit text-gray px-5">
                              {" "}
                            </span>
                          </Link>
                        </th>

                        <th className="table-y-middle py-7">
                          <Link to="">
                            <span className=" fas fa-edit text-gray px-5">
                              {" "}
                            </span>
                          </Link>
                          <Link to="">
                            <span className=" text-danger">
                              <i className="fa fa-trash"></i>
                            </span>
                          </Link>
                        </th>
                      </tr>
                      <tr className="border border-color-2">
                        <th scope="row" className="pl-6 border-0 py-7 pr-0">
                          <div className="media  align-items-center">
                            <div className="circle-36 mr-6">
                              <img
                                src="image/table-one-profile-image-4.png"
                                alt=""
                                className="w-100"
                              />
                            </div>
                            <Link
                              to={""}
                              onClick={() => setShowEmployeeProfile(true)}
                            >
                              <h4 className="font-size-4 mb-0 font-weight-semibold text-black-2">
                                Roger Hawkins
                                <br />
                                <span className="text-gray font-size-2">
                                  Married <br />
                                  (Male 30)
                                </span>
                              </h4>
                            </Link>
                          </div>
                        </th>
                        <th className="table-y-middle py-7  pr-0">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            +9863254170
                            <br />
                            Roger36@gmail.com
                          </h3>
                        </th>
                        <th className="table-y-middle py-7 ">
                          <select className="form-control">
                            <option value={""}>Select status</option>
                            <option value={""}>Part-Time</option>
                            <option value={""}>Full-Time</option>
                            <option value={""}>Temporary</option>
                            <option value={""}>Contract</option>
                            <option value={""}>Unemployed</option>
                          </select>
                        </th>
                        <th className="table-y-middle py-7  pr-0">
                          <Link
                            to=""
                            onClick={() => setShowEducationModal(true)}
                          >
                            <span className="	fas fa-graduation-cap text-gray px-5 mx-5">
                              {" "}
                            </span>
                          </Link>
                        </th>
                        <th className="table-y-middle py-7  pr-0">
                          <Link to="" onClick={() => setShowSkillsModal(true)}>
                            <span className=" fas fa-edit text-gray px-5">
                              {" "}
                            </span>
                          </Link>
                        </th>

                        <th className="table-y-middle py-7">
                          <Link to="">
                            <span className=" fas fa-edit text-gray px-5">
                              {" "}
                            </span>
                          </Link>
                          <Link to="">
                            <span className=" text-danger">
                              <i className="fa fa-trash"></i>
                            </span>
                          </Link>
                        </th>
                      </tr>
                      <tr className="border border-color-2">
                        <th scope="row" className="pl-6 border-0 py-7 pr-0">
                          <div className="media  align-items-center">
                            <div className="circle-36 mr-6">
                              <img
                                src="image/table-one-profile-image-5.png"
                                alt=""
                                className="w-100"
                              />
                            </div>
                            <Link
                              to={""}
                              onClick={() => setShowEmployeeProfile(true)}
                            >
                              <h4 className="font-size-4 mb-0 font-weight-semibold text-black-2">
                                Marie Green
                                <br />
                                <span className="text-gray font-size-2">
                                  Married <br />
                                  (Female 23)
                                </span>
                              </h4>
                            </Link>
                          </div>
                        </th>
                        <th className="table-y-middle py-7  pr-0">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            +9863254170
                            <br />
                            Marie32@gmail.com
                          </h3>
                        </th>
                        <th className="table-y-middle py-7 ">
                          <select className="form-control">
                            <option value={""}>Select status</option>
                            <option value={""}>Part-Time</option>
                            <option value={""}>Full-Time</option>
                            <option value={""}>Temporary</option>
                            <option value={""}>Contract</option>
                            <option value={""}>Unemployed</option>
                          </select>
                        </th>
                        <th className="table-y-middle py-7  pr-0">
                          <Link
                            to=""
                            onClick={() => setShowEducationModal(true)}
                          >
                            <span className="	fas fa-graduation-cap text-gray px-5 mx-5">
                              {" "}
                            </span>
                          </Link>
                        </th>
                        <th className="table-y-middle py-7  pr-0">
                          <Link to="" onClick={() => setShowSkillsModal(true)}>
                            <span className=" fas fa-edit text-gray px-5">
                              {" "}
                            </span>
                          </Link>
                        </th>

                        <th className="table-y-middle py-7">
                          <Link to="">
                            <span className=" fas fa-edit text-gray px-5">
                              {" "}
                            </span>
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
                        <a
                          className="page-link rounded-0 border-0 px-3active"
                          href="http://localhost:3000/"
                          aria-label="Previous"
                        >
                          <i className="fas fa-chevron-left"></i>
                        </a>
                      </li>
                      <li className="page-item">
                        <a
                          className="page-link border-0 font-size-4 font-weight-semibold px-3"
                          href="http://localhost:3000/"
                        >
                          1
                        </a>
                      </li>
                      <li className="page-item">
                        <a
                          className="page-link border-0 font-size-4 font-weight-semibold px-3"
                          href="http://localhost:3000/"
                        >
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <a
                          className="page-link border-0 font-size-4 font-weight-semibold px-3"
                          href="http://localhost:3000/"
                        >
                          3
                        </a>
                      </li>
                      <li className="page-item disabled">
                        <a
                          className="page-link border-0 font-size-4 font-weight-semibold px-3"
                          href="http://localhost:3000/"
                        >
                          ...
                        </a>
                      </li>
                      <li className="page-item ">
                        <a
                          className="page-link border-0 font-size-4 font-weight-semibold px-3"
                          href="http://localhost:3000/"
                        >
                          7
                        </a>
                      </li>
                      <li className="page-item rounded-0 flex-all-center">
                        <a
                          className="page-link rounded-0 border-0 px-3"
                          href="http://localhost:3000/"
                          aria-label="Next"
                        >
                          <i className="fas fa-chevron-right"></i>
                        </a>
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
                      {" "}
                      <i className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                      <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                        Back
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mb-18">
                {" "}
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
