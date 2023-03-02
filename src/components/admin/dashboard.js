import React from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";

const AdminDashboard = () => {
  return (
    <div className="site-wrapper overflow-hidden bg-default-2">
      {/* <!-- Header Area --> */}
      <AdminHeader />
      {/* <!-- navbar- --> */}
      <AdminSidebar />
      {/* <a
        className="sidebar-mobile-button"
        data-toggle="collapse"
        href="#sidebar"
        role="button"
        aria-expanded="false"
        aria-controls="sidebar"
      >
        <i className="icon icon-sidebar-2"></i>
      </a> */}
      <div
        className="dashboard-main-container mt-25 mt-lg-22"
        id="dashboard-body"
      >
        <div className="container">
          <div className="row mb-7">
            <div className="col-xxl-3 col-xl-4 col-lg-6 col-sm-6">
              {/* <!-- Single Category --> */}
              <a
                href="http://localhost:3000/"
                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
              >
                <div className="text-blue bg-blue-opacity-1 circle-56 font-size-6 mr-7">
                  <i className="fas fa-briefcase"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div className="">
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
                href="http://localhost:3000/"
                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
              >
                <div className="text-pink bg-pink-opacity-1 circle-56 font-size-6 mr-7">
                  <i className="fas fa-user"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div className="">
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
              <a
                href="http://localhost:3000/"
                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
              >
                <div className="text-orange bg-orange-opacity-1 circle-56 font-size-6 mr-7">
                  <i className="fas fa-eye"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div className="">
                  <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                    <span className="counter">16.5</span>K
                  </h5>
                  <p className="font-size-4 font-weight-normal text-gray mb-0">
                    Jobs View
                  </p>
                </div>
              </a>
              {/* <!-- End Single Category --> */}
            </div>
            <div className="col-xxl-3 col-xl-4 col-lg-6 col-sm-6">
              {/* <!-- Single Category --> */}
              <a
                href="http://localhost:3000/"
                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
              >
                <div className="text-egg-blue bg-egg-blue-opacity-1 circle-56 font-size-6 mr-7">
                  <i className="fas fa-mouse-pointer"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div className="">
                  <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                    <span className="counter">18.6</span>%
                  </h5>
                  <p className="font-size-4 font-weight-normal text-gray mb-0">
                    Applied Rate
                  </p>
                </div>
              </a>
              {/* <!-- End Single Category --> */}
            </div>
          </div>
          <div className="mb-14">
            <div className="row mb-11 align-items-center">
              <div className="col-lg-6 mb-lg-0 mb-4">
                <h3 className="font-size-6 mb-0">Applicants List (12)</h3>
              </div>
              <div className="col-lg-6">
                <div className="d-flex flex-wrap align-items-center justify-content-lg-end">
                  <p className="font-size-4 mb-0 mr-6 py-2">Filter by Job:</p>
                  <div className="h-px-48">
                    <select
                      name="country"
                      id="country"
                      className="nice-select pl-7 h-100 arrow-3 arrow-3-black min-width-px-273 font-weight-semibold text-black-2"
                    >
                      <option value="" data-display="Product Designer">
                        Product Designer
                      </option>
                      <option value="">Graphics Designer</option>
                      <option value="">Web Deverloper</option>
                      <option value="">Front End Developer</option>
                      <option value="">Backend Developer</option>
                    </select>
                  </div>
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
                        Applied as
                      </th>
                      <th
                        scope="col"
                        className="border-0 font-size-4 font-weight-normal"
                      >
                        Applied on
                      </th>
                      <th
                        scope="col"
                        className="border-0 font-size-4 font-weight-normal"
                      ></th>
                      <th
                        scope="col"
                        className="border-0 font-size-4 font-weight-normal"
                      ></th>
                      <th
                        scope="col"
                        className="border-0 font-size-4 font-weight-normal"
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border border-color-2">
                      <th scope="row" className="pl-6 border-0 py-7 pr-0">
                        <a
                          href="candidate-profile.html"
                          className="media min-width-px-235 align-items-center"
                        >
                          <div className="circle-36 mr-6">
                            <img
                              src="image/table-one-profile-image-1.png"
                              alt=""
                              className="w-100"
                            />
                          </div>
                          <h4 className="font-size-4 mb-0 font-weight-semibold text-black-2">
                            Nicolas Bradley
                          </h4>
                        </a>
                      </th>
                      <td className="table-y-middle py-7 min-width-px-235 pr-0">
                        <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                          Senior Project Manager
                        </h3>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-170 pr-0">
                        <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                          12 July, 2020
                        </h3>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-170 pr-0">
                        <div className="">
                          <a
                            href="javacript:"
                            className="font-size-3 font-weight-bold text-black-2 text-uppercase"
                            data-toggle="modal"
                            data-target="#employe-profile"
                          >
                            View Application
                          </a>
                        </div>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-110 pr-0">
                        <div className="">
                          <a
                            href="contact.html"
                            className="font-size-3 font-weight-bold text-green text-uppercase"
                          >
                            Contact
                          </a>
                        </div>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-100 pr-0">
                        <div className="">
                          <a
                            href="http://localhost:3000/"
                            className="font-size-3 font-weight-bold text-red-2 text-uppercase"
                          >
                            Reject
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr className="border border-color-2">
                      <th scope="row" className="pl-6 border-0 py-7 pr-0">
                        <a
                          href="candidate-profile.html"
                          className="media min-width-px-235 align-items-center"
                        >
                          <div className="circle-36 mr-6">
                            <img
                              src="image/table-one-profile-image-2.png"
                              alt=""
                              className="w-100"
                            />
                          </div>
                          <h4 className="font-size-4 mb-0 font-weight-semibold text-black-2">
                            Elizabeth Gomez
                          </h4>
                        </a>
                      </th>
                      <td className="table-y-middle py-7 min-width-px-235 pr-0">
                        <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                          Senior Project Manager
                        </h3>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-170 pr-0">
                        <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                          14 July, 2020
                        </h3>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-170 pr-0">
                        <div className="">
                          <a
                            href="javacript:"
                            className="font-size-3 font-weight-bold text-black-2 text-uppercase"
                            data-toggle="modal"
                            data-target="#employe-profile"
                          >
                            View Application
                          </a>
                        </div>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-110 pr-0">
                        <div className="">
                          <a
                            href="contact.html"
                            className="font-size-3 font-weight-bold text-green text-uppercase"
                          >
                            Contact
                          </a>
                        </div>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-100 pr-0">
                        <div className="">
                          <a
                            href="http://localhost:3000/"
                            className="font-size-3 font-weight-bold text-red-2 text-uppercase"
                          >
                            Reject
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr className="border border-color-2">
                      <th scope="row" className="pl-6 border-0 py-7 pr-0">
                        <a
                          href="candidate-profile.html"
                          className="media min-width-px-235 align-items-center"
                        >
                          <div className="circle-36 mr-6">
                            <img
                              src="image/table-one-profile-image-3.png"
                              alt=""
                              className="w-100"
                            />
                          </div>
                          <h4 className="font-size-4 mb-0 font-weight-semibold text-black-2">
                            Joe Wade
                          </h4>
                        </a>
                      </th>
                      <td className="table-y-middle py-7 min-width-px-235 pr-0">
                        <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                          Head of Marketing
                        </h3>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-170 pr-0">
                        <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                          14 July, 2020
                        </h3>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-170 pr-0">
                        <div className="">
                          <a
                            href="javacript:"
                            className="font-size-3 font-weight-bold text-black-2 text-uppercase"
                            data-toggle="modal"
                            data-target="#employe-profile"
                          >
                            View Application
                          </a>
                        </div>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-110 pr-0">
                        <div className="">
                          <a
                            href="contact.html"
                            className="font-size-3 font-weight-bold text-green text-uppercase"
                          >
                            Contact
                          </a>
                        </div>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-100 pr-0">
                        <div className="">
                          <a
                            href="http://localhost:3000/"
                            className="font-size-3 font-weight-bold text-red-2 text-uppercase"
                          >
                            Reject
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr className="border border-color-2">
                      <th scope="row" className="pl-6 border-0 py-7 pr-0">
                        <a
                          href="candidate-profile.html"
                          className="media min-width-px-235 align-items-center"
                        >
                          <div className="circle-36 mr-6">
                            <img
                              src="image/table-one-profile-image-4.png"
                              alt=""
                              className="w-100"
                            />
                          </div>
                          <h4 className="font-size-4 mb-0 font-weight-semibold text-black-2">
                            Roger Hawkins
                          </h4>
                        </a>
                      </th>
                      <td className="table-y-middle py-7 min-width-px-235 pr-0">
                        <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                          UI Designer
                        </h3>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-170 pr-0">
                        <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                          16 July, 2020
                        </h3>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-170 pr-0">
                        <div className="">
                          <a
                            href="javacript:"
                            className="font-size-3 font-weight-bold text-black-2 text-uppercase"
                            data-toggle="modal"
                            data-target="#employe-profile"
                          >
                            View Application
                          </a>
                        </div>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-110 pr-0">
                        <div className="">
                          <a
                            href="contact.html"
                            className="font-size-3 font-weight-bold text-green text-uppercase"
                          >
                            Contact
                          </a>
                        </div>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-100 pr-0">
                        <div className="">
                          <a
                            href="http://localhost:3000/"
                            className="font-size-3 font-weight-bold text-red-2 text-uppercase"
                          >
                            Reject
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr className="border border-color-2">
                      <th scope="row" className="pl-6 border-0 py-7 pr-0">
                        <a
                          href="candidate-profile.html"
                          className="media min-width-px-235 align-items-center"
                        >
                          <div className="circle-36 mr-6">
                            <img
                              src="image/table-one-profile-image-5.png"
                              alt=""
                              className="w-100"
                            />
                          </div>
                          <h4 className="font-size-4 mb-0 font-weight-semibold text-black-2">
                            Marie Green
                          </h4>
                        </a>
                      </th>
                      <td className="table-y-middle py-7 min-width-px-235 pr-0">
                        <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                          Senior Project Manager
                        </h3>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-170 pr-0">
                        <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                          21 July, 2020
                        </h3>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-170 pr-0">
                        <div className="">
                          <a
                            href="javacript:"
                            className="font-size-3 font-weight-bold text-black-2 text-uppercase"
                            data-toggle="modal"
                            data-target="#employe-profile"
                          >
                            View Application
                          </a>
                        </div>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-110 pr-0">
                        <div className="">
                          <a
                            href="contact.html"
                            className="font-size-3 font-weight-bold text-green text-uppercase"
                          >
                            Contact
                          </a>
                        </div>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-100 pr-0">
                        <div className="">
                          <a
                            href="http://localhost:3000/"
                            className="font-size-3 font-weight-bold text-red-2 text-uppercase"
                          >
                            Reject
                          </a>
                        </div>
                      </td>
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
          <div className="mb-18">
            <div className="row mb-11 align-items-center">
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
                      className="nice-select pl-7 h-100 arrow-3 arrow-3-black min-width-px-273 font-weight-semibold text-black-2"
                    >
                      <option value="" data-display="Product Designer">
                        Full-Time
                      </option>
                      <option value="">Part Time</option>
                    </select>
                  </div>
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
                      ></th>
                      <th
                        scope="col"
                        className="pl-4 border-0 font-size-4 font-weight-normal"
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
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
                            Senior Project Manager
                          </a>
                        </div>
                      </th>
                      <td className="table-y-middle py-7 min-width-px-135">
                        <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                          Full-Time
                        </h3>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-125">
                        <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                          New York
                        </h3>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-155">
                        <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                          12 July, 2020
                        </h3>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-205">
                        <h3 className="font-size-4 font-weight-bold text-black-2 mb-0">
                          47
                        </h3>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-80">
                        <a
                          href="http://localhost:3000/"
                          className="font-size-3 font-weight-bold text-green text-uppercase"
                        >
                          Edit
                        </a>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-100">
                        <a
                          href="http://localhost:3000/"
                          className="font-size-3 font-weight-bold text-red-2 text-uppercase"
                        >
                          Delete
                        </a>
                      </td>
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
                      <td className="table-y-middle py-7 min-width-px-135">
                        <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                          Full-Time
                        </h3>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-125">
                        <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                          Remote
                        </h3>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-155">
                        <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                          24 June, 2020
                        </h3>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-205">
                        <h3 className="font-size-4 font-weight-bold text-black-2 mb-0">
                          145
                        </h3>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-80">
                        <a
                          href="http://localhost:3000/"
                          className="font-size-3 font-weight-bold text-green text-uppercase"
                        >
                          Edit
                        </a>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-100">
                        <a
                          href="http://localhost:3000/"
                          className="font-size-3 font-weight-bold text-red-2 text-uppercase"
                        >
                          Delete
                        </a>
                      </td>
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
                      <td className="table-y-middle py-7 min-width-px-135">
                        <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                          Full-Time
                        </h3>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-125">
                        <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                          London
                        </h3>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-155">
                        <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                          15 June, 2020
                        </h3>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-205">
                        <h3 className="font-size-4 font-weight-bold text-black-2 mb-0">
                          62
                        </h3>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-80">
                        <a
                          href="http://localhost:3000/"
                          className="font-size-3 font-weight-bold text-green text-uppercase"
                        >
                          Edit
                        </a>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-100">
                        <a
                          href="http://localhost:3000/"
                          className="font-size-3 font-weight-bold text-red-2 text-uppercase"
                        >
                          Delete
                        </a>
                      </td>
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
                      <td className="table-y-middle py-7 min-width-px-135">
                        <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                          Part-Time
                        </h3>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-125">
                        <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                          California
                        </h3>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-155">
                        <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                          29 May, 2020
                        </h3>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-205">
                        <h3 className="font-size-4 font-weight-bold text-black-2 mb-0">
                          184
                        </h3>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-80">
                        <a
                          href="http://localhost:3000/"
                          className="font-size-3 font-weight-bold text-green text-uppercase"
                        >
                          Edit
                        </a>
                      </td>
                      <td className="table-y-middle py-7 min-width-px-100">
                        <a
                          href="http://localhost:3000/"
                          className="font-size-3 font-weight-bold text-red-2 text-uppercase"
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
