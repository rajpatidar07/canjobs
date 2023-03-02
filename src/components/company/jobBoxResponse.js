import React, { useState } from "react";
import { Link } from "react-router-dom";

function JobBoxResponse() {
  const [showTable, setShowTable] = useState(false);

  /*---- Function to Open response Table on Click ----*/
  function OpenReposnseTable() {
    setShowTable(!showTable);
  }
  return (
    <div
      className="col-xxl-12 col-xl-12 col-lg-12 mb-8 job_box p-0"
      data-aos="fade-right"
      data-aos-duration="800"
      data-aos-once="true"
    >
      {/* <!-- Single Featured Job --> */}
      <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 hover-border-green">
        <div className="row job_header m-0">
          <div className="media align-items-center company_box col-md-6 p-0">
            <div className="text_box text-left">
              <img
                className="company_logo"
                src="https://findlogovector.com/wp-content/uploads/2018/12/huggies-brand-logo-vector.png"
                alt=""
              />
            </div>
            <div className="text_box text-left w-100">
              <p className="font-size-3 text-default-color line-height-2 m-0">
                Apple INC
              </p>
              <h3 className="mb-0 font-size-6 heading-dark-color">
                UI/UX Designer
              </h3>
            </div>
          </div>
          <div className="col-md-6 p-0">
            <ul className="d-flex list-unstyled mr-n3 flex-wrap mr-n8 justify-content-md-end">
              <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                <span className="mr-4">
                  <img src="image/svg/icon-loaction-pin-black.svg" alt="" />
                </span>
                <span className="font-weight-semibold">Berlyn, UK</span>
              </li>
              <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                <span className="mr-4">
                  <img src="image/svg/icon-suitecase.svg" alt="" />
                </span>
                <span className="font-weight-semibold">Full-time</span>
              </li>
              <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                <span className="mr-4">
                  <img src="image/svg/icon-clock.svg" alt="" />
                </span>
                <span className="font-weight-semibold">9d ago</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="row pt-4">
          <div className="col-md-12 text-left">
            <p>
              Gubagoo is Link fast growing provider of messaging and commerce
              solutions for automotive dealers changing the future of how people
              find, buy and service their vehicles.
            </p>
          </div>
          <div className="col-md-8">
            <ul className="d-flex list-unstyled mr-n3 flex-wrap">
              <li>
                <Link
                  to={""}
                  className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                >
                  Visual Design
                </Link>
              </li>
              <li>
                <Link
                  to={""}
                  className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                >
                  Wireframing
                </Link>
              </li>
              <li>
                <Link
                  to={""}
                  className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                >
                  Scrum
                </Link>
              </li>
            </ul>
          </div>

          <div className="media justify-content-md-end col-md-4">
            <Link
              to={""}
              className="btn btn-secondary text-uppercase font-size-3"
              onClick={OpenReposnseTable}
            >
              View Response
            </Link>
          </div>
        </div>
        {showTable && (
          <div className="bg-white shadow-8 pt-7 rounded pb-8">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
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
                      Applied as
                    </th>
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal"
                    >
                      Applied on
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border border-color-2">
                    <th scope="row" className="border-0 py-7">
                      <div className="media min-width-px-235 align-items-center">
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
                      </div>
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
                  </tr>
                  <tr className="border border-color-2">
                    <th scope="row" className="pl-6 border-0 py-7 pr-0">
                      <div className="media min-width-px-235 align-items-center">
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
                      </div>
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
                  </tr>
                  <tr className="border border-color-2">
                    <th scope="row" className="pl-6 border-0 py-7 pr-0">
                      <div className="media min-width-px-235 align-items-center">
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
                      </div>
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
                  </tr>
                  <tr className="border border-color-2">
                    <th scope="row" className="pl-6 border-0 py-7 pr-0">
                      <div className="media min-width-px-235 align-items-center">
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
                      </div>
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
                  </tr>
                  <tr className="border border-color-2">
                    <th scope="row" className="pl-6 border-0 py-7 pr-0">
                      <div className="media min-width-px-235 align-items-center">
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
                      </div>
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
                      className="page-link border-0 font-size-4 font-weight-semibold px-3"
                    >
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link
                      to={""}
                      className="page-link border-0 font-size-4 font-weight-semibold px-3"
                    >
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link
                      to={""}
                      className="page-link border-0 font-size-4 font-weight-semibold px-3"
                    >
                      3
                    </Link>
                  </li>
                  <li className="page-item disabled">
                    <Link
                      to={""}
                      className="page-link border-0 font-size-4 font-weight-semibold px-3"
                    >
                      ...
                    </Link>
                  </li>
                  <li className="page-item ">
                    <Link
                      to={""}
                      className="page-link border-0 font-size-4 font-weight-semibold px-3"
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
        )}
      </div>
      {/* <!-- End Single Featured Job --> */}
    </div>
  );
}

export default JobBoxResponse;
