import React, { useState } from "react";
import AdminHeader from "../header";
import AdminSidebar from "../sidebar";
import CustomButton from "../../comman/button";
import { Link } from "react-router-dom";
import AddModal from "./modal/addModal";
import EmployerProfile from "../../comman/employerProfile";

function Employer() {
  let [showAddEmployerModal, setShowEmployerMOdal] = useState(false);
  let [showEmployerDetails, setShowEmployerDetails] = useState(false);

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
            showEmployerDetails === false
              ? "dashboard-main-container mt-24"
              : "d-none"
          }
          id="dashboard-body"
        >
          <div className="container">
            <div className="mb-18">
              <div className="row mb-8 align-items-center">
                <div className="col-lg-6 mb-lg-0 mb-4">
                  <h3 className="font-size-6 mb-0">Employer</h3>
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
                      onClick={() => setShowEmployerMOdal(true)}
                    >
                      Add Employer
                    </CustomButton>
                    <AddModal
                      show={showAddEmployerModal}
                      close={() => setShowEmployerMOdal(false)}
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
                          Vacancies
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          Location
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          Information status
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
                              onClick={() => setShowEmployerDetails(true)}
                            >
                              <h4 className="font-size-4 mb-0 font-weight-semibold text-black-2">
                                We2code
                              </h4>
                            </Link>
                          </div>
                        </th>
                        <th className="table-y-middle py-7  pr-0">
                          <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                            50
                          </h3>
                        </th>
                        <th className="table-y-middle py-7  pr-0">
                          <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                            indore
                          </h3>
                        </th>

                        <th className="table-y-middle py-7 ">
                          <select className="form-control">
                            <option value={""}>Select status</option>
                            <option value={""}>Incomplete</option>
                            <option value={""}>Complete</option>
                          </select>
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
                                src="image/table-one-profile-image-2.png"
                                alt=""
                                className="w-100"
                              />
                            </div>
                            <Link
                              to={""}
                              onClick={() => setShowEmployerDetails(true)}
                            >
                              <h4 className="font-size-4 mb-0 font-weight-semibold text-black-2">
                                Syska
                              </h4>
                            </Link>
                          </div>
                        </th>
                        <th className="table-y-middle py-7  pr-0">
                          <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                            32
                          </h3>
                        </th>
                        <th className="table-y-middle py-7  pr-0">
                          <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                            Mumbai
                          </h3>
                        </th>

                        <th className="table-y-middle py-7 ">
                          <select className="form-control">
                            <option value={""}>Select status</option>
                            <option value={""}>Incomplete</option>
                            <option value={""}>Complete</option>
                          </select>
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
                              onClick={() => setShowEmployerDetails(true)}
                            >
                              <h4 className="font-size-4 mb-0 font-weight-semibold text-black-2">
                                Tata
                              </h4>
                            </Link>
                          </div>
                        </th>
                        <th className="table-y-middle py-7  pr-0">
                          <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                            10
                          </h3>
                        </th>
                        <th className="table-y-middle py-7  pr-0">
                          <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                            Jamnagar
                          </h3>
                        </th>

                        <th className="table-y-middle py-7 ">
                          <select className="form-control">
                            <option value={""}>Select status</option>
                            <option value={""}>Incomplete</option>
                            <option value={""}>Complete</option>
                          </select>
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
                              onClick={() => setShowEmployerDetails(true)}
                            >
                              <h4 className="font-size-4 mb-0 font-weight-semibold text-black-2">
                                Wipro
                              </h4>
                            </Link>
                          </div>
                        </th>
                        <th className="table-y-middle py-7  pr-0">
                          <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                            25
                          </h3>
                        </th>
                        <th className="table-y-middle py-7  pr-0">
                          <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                            Pume
                          </h3>
                        </th>

                        <th className="table-y-middle py-7 ">
                          <select className="form-control">
                            <option value={""}>Select status</option>
                            <option value={""}>Incomplete</option>
                            <option value={""}>Complete</option>
                          </select>
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
                              onClick={() => setShowEmployerDetails(true)}
                            >
                              <h4 className="font-size-4 mb-0 font-weight-semibold text-black-2">
                                Ariod
                              </h4>
                            </Link>
                          </div>
                        </th>
                        <th className="table-y-middle py-7  pr-0">
                          <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                            5
                          </h3>
                        </th>
                        <th className="table-y-middle py-7  pr-0">
                          <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                            indore
                          </h3>
                        </th>

                        <th className="table-y-middle py-7 ">
                          <select className="form-control">
                            <option value={""}>Select status</option>
                            <option value={""}>Incomplete</option>
                            <option value={""}>Complete</option>
                          </select>
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
        {showEmployerDetails === true ? (
          <div className="dashboard-main-container mt-24">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 dark-mode-texts">
                  <div className="mb-9">
                    <Link
                      to={""}
                      onClick={() => setShowEmployerDetails(false)}
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
                <div className="bg-white shadow-8 pt-7 rounded pb-9 px-11">
                  {" "}
                  <EmployerProfile />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Employer;
