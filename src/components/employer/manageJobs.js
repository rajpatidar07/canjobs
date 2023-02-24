import React from "react";
import EmployerFooter from "./footer";
import EmployerHeader from "./header";
import JobBox from "./jobBox";

function ManageJobs() {
  return (
    <>
      {/* <!-- Main Content Start --> */}
      <div class="bg-default-1 pt-26 pt-lg-28 pb-13 pb-lg-25">
        <EmployerHeader />
        {/* <!-- Main Content Start --> */}
        <div className="bg-black-2 mt-15 mt-lg-22 pt-18 pt-lg-13 pb-13">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* <!-- form --> */}
                <form className="search-form">
                  <div className="filter-search-form-2 bg-white rounded-sm shadow-7 pr-6 py-7 pl-6  search-1-adjustment">
                    <div className="filter-inputs">
                      <div className="form-group position-relative w-xl-50">
                        <input
                          className="form-control focus-reset pl-13"
                          type="text"
                          id="keyword"
                          placeholder="Type Job title, keywords"
                        />
                        <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
                          <i className="icon icon-zoom-2 text-primary font-weight-bold"></i>
                        </span>
                      </div>
                      {/* <!-- .select-city starts --> */}
                      <div className="form-group position-relative w-lg-50">
                        <select
                          name="country"
                          id="country"
                          className="form-control font-size-4 pl-13 h-100 arrow-3"
                        >
                          <option data-display="City, state, zip code or (Remote)">
                            City, state, zip code or (Remote){" "}
                          </option>
                          <option value="">United States of America</option>
                          <option value="">United Arab Emirates</option>
                          <option value="">Bangladesh</option>
                          <option value="">Pakistan</option>
                        </select>
                        <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
                          <i className="icon icon-pin-3 text-primary font-weight-bold"></i>
                        </span>
                      </div>
                      {/* <!-- ./select-city ends --> */}
                    </div>
                    <div className="button-block">
                      <button className="btn btn-primary btn-medium line-height-reset h-100 btn-submit w-100 text-uppercase">
                        Search
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-default-1 pt-9 pb-13 pb-xl-30 pb-13 position-relative overflow-hidden">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10 col-xl-12">
                <h2 className="font-size-8 mb-6">
                  You’re searching "UI Designer"
                </h2>
                <form
                  className="mb-8"
                  action="https://finestwp.co/demos/html/jobcamp/index.html"
                >
                  <div className="search-filter from-group d-flex align-items-center flex-wrap">
                    <div className="mr-5 mb-5">
                      <select
                        name="country"
                        id="country"
                        className="form-control font-size-4 text-black-2 arrow-4-black mr-5 rounded-0"
                      >
                        <option data-display="Job Type">Job Type</option>
                        <option value="">United States of America</option>
                        <option value="">United Arab Emirates</option>
                        <option value="">Bangladesh</option>
                        <option value="">Pakistan</option>
                      </select>
                    </div>
                    <div className="mr-5 mb-5">
                      <select
                        name="country"
                        id="country"
                        className="form-control font-size-4 text-black-2 arrow-4-black mr-5 rounded-0"
                      >
                        <option data-display="Salary Range">
                          Salary Range
                        </option>
                        <option value="">United States of America</option>
                        <option value="">United Arab Emirates</option>
                        <option value="">Bangladesh</option>
                        <option value="">Pakistan</option>
                      </select>
                    </div>
                    <div className="mr-5 mb-5">
                      <select
                        name="country"
                        id="country"
                        className="form-control font-size-4 text-black-2 arrow-4-black mr-5 rounded-0"
                      >
                        <option data-display="Experience Level ">
                          Experience Level{" "}
                        </option>
                        <option value="">United States of America</option>
                        <option value="">United Arab Emirates</option>
                        <option value="">Bangladesh</option>
                        <option value="">Pakistan</option>
                      </select>
                    </div>
                    <div className="mr-5 mb-5">
                      <select
                        name="country"
                        id="country"
                        className="form-control font-size-4 text-black-2 arrow-4-black mr-5 rounded-0"
                      >
                        <option data-display="Posted Time">Posted Time</option>
                        <option value="">United States of America</option>
                        <option value="">United Arab Emirates</option>
                        <option value="">Bangladesh</option>
                        <option value="">Pakistan</option>
                      </select>
                    </div>
                  </div>
                </form>
                <div className="d-flex align-items-center justify-content-between mb-6">
                  <h5 className="font-size-4 font-weight-normal text-gray">
                    Showing
                    <span className="text-black-2">120</span> matched jobs
                  </h5>
                  <div className="card-btn-group mx-10">
                    <a
                      className="btn btn-secondary text-uppercase btn-medium rounded-3 w-100 mr-4 mb-5"
                      href="#"
                    >
                      Add Job
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center position-static">
              <div className="col-12 col-xxl-8 col-xl-7 col-lg-10">
                {/* <!-- Left Section --> */}
                <div className="Left">
                  <div
                    className="justify-content-center search-nav-tab nav nav-tabs border-bottom-0"
                    id="search-nav-tab"
                    role="tablist"
                  >
                    <a
                      className="mb-8 p-0 w-100 active nav-link"
                      id="tab-nav-1"
                      data-toggle="tab"
                      href="#tab-pane-1"
                      role="tab"
                      aria-controls="tab-pane-1"
                      aria-selected="true "
                    >
                      <JobBox />
                      <JobBox />
                      <JobBox />
                      <JobBox />
                      <JobBox />
                      <JobBox />
                      <JobBox />
                      {/* <!-- End Single Featured Job --> */}
                    </a>
                  </div>
                  <div className="text-center pt-5 pt-lg-13">
                    <a
                      className="text-green font-weight-bold text-uppercase font-size-3 d-flex align-items-center justify-content-center"
                      href="#"
                    >
                      Load More{" "}
                      <i className="fas fa-sort-down ml-3 mt-n2 font-size-4"></i>
                    </a>
                  </div>
                </div>
                {/* <!-- form end --> */}
              </div>
              {/* <!-- Right Section --> */}
              <div className="col-12 col-xxl-4 col-xl-5 col-lg-10 position-static">
                <div className="tab-content" id="serachlist-tab">
                  <div
                    className="tab-pane fade show active"
                    id="tab-pane-1"
                    role="tabpanel"
                    aria-labelledby="tab-nav-1"
                  >
                    <div className="text-left bg-white rounded-4 border border-mercury shadow-9 pos-abs-xl ml-xl-8 h-1413 overflow-y-scroll mt-9 mt-xl-0">
                      {/* <!-- Single Featured Job --> */}
                      <div className="pt-9 pl-sm-9 pl-5 pr-sm-9 pr-5 pb-8 border-bottom border-width-1 border-default-color light-mode-texts">
                        <div className="row">
                          <div className="col-12">
                            {/* <!-- media start --> */}
                            <div className="media align-items-center">
                              {/* <!-- media logo start --> */}
                              <div className="square-72 d-block mr-8">
                                <img
                                  src="image/l2/png/featured-job-logo-1.png"
                                  alt=""
                                />
                              </div>
                              {/* <!-- media logo end --> */}
                              {/* <!-- media texts start --> */}
                              <div>
                                <h3 className="font-size-6 mb-0">
                                  Product Designer
                                </h3>
                                <span className="font-size-3 text-gray line-height-2">
                                  AirBnb
                                </span>
                              </div>
                              {/* <!-- media texts end --> */}
                            </div>
                            {/* <!-- media end --> */}
                          </div>
                        </div>
                        <div className="row pt-9">
                          <div className="col-12">
                            {/* <!-- card-btn-group start --> */}
                            <div className="card-btn-group">
                              <a
                                className="btn btn-secondary text-uppercase btn-medium rounded-3 w-180 mr-4 mb-5"
                                href="#"
                              >
                                Edit Job
                              </a>
                            </div>
                            {/* <!-- card-btn-group end --> */}
                          </div>
                        </div>
                      </div>
                      {/* <!-- End Single Featured Job --> */}
                      <div className="job-details-content pt-8 pl-sm-9 pl-6 pr-sm-9 pr-6 pb-10 border-bottom border-width-1 border-default-color light-mode-texts">
                        <div className="row mb-5">
                          <div className="col-md-12">
                            <div className="media justify-content-md-start mb-6">
                              <div className="image mr-5">
                                <img src="image/svg/icon-location.svg" alt="" />
                              </div>
                              <p className="font-size-5 text-gray mb-0">
                                777 Brockton Avenue, Abington MA 2351
                              </p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="media justify-content-md-start mb-6">
                              <div className="image mr-5">
                                <img src="image/svg/icon-dolor.svg" alt="" />
                              </div>
                              <p className="font-weight-semibold font-size-5 text-black-2 mb-0">
                                80-90K PLN PLN
                              </p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="media justify-content-md-start mb-md-0 mb-6">
                              <div className="image mr-5">
                                <img
                                  src="image/svg/icon-briefcase.svg"
                                  alt=""
                                />
                              </div>
                              <p className="font-weight-semibold font-size-5 text-black-2 mb-0">
                                Full-time
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-lg-0 mb-10">
                              <span className="font-size-4 d-block mb-4 text-gray">
                                Type of corporation
                              </span>
                              <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">
                                B2B &amp; B2C
                              </h6>
                            </div>
                            <div className="tags">
                              <p className="font-size-4 text-gray mb-0">
                                Soft Skill
                              </p>
                              <ul className="list-unstyled mr-n3 mb-0">
                                <li className="d-block font-size-4 text-black-2 mt-2">
                                  <span className="d-inline-block mr-2">•</span>
                                  Slack
                                </li>
                                <li className="d-block font-size-4 text-black-2 mt-2">
                                  <span className="d-inline-block mr-2">•</span>
                                  Basic English
                                </li>
                                <li className="d-block font-size-4 text-black-2 mt-2">
                                  <span className="d-inline-block mr-2">•</span>
                                  Well Organized
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="col-md-6 mb-lg-0 mb-8">
                            <div className="">
                              <span className="font-size-4 d-block mb-4 text-gray">
                                Career Level
                              </span>
                              <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">
                                Project Manangement
                              </h6>
                            </div>
                            <div className="tags">
                              <p className="font-size-4 text-gray mb-3">
                                Technical Skill
                              </p>
                              <ul className="list-unstyled d-flex align-items-center flex-wrap">
                                <li>
                                  <a
                                    className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                    href="#"
                                  >
                                    Editing
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                    href="#"
                                  >
                                    Wire-framing
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                    href="#"
                                  >
                                    XD
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                    href="#"
                                  >
                                    User Persona
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                    href="#"
                                  >
                                    Sketch
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="">
                              <span className="font-size-4 d-block mb-4 text-gray">
                                Company size
                              </span>
                              <h6 className="font-size-5 text-black-2 font-weight-semibold mb-0">
                                11-50 employees
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="">
                              <span className="font-size-4 d-block mb-4 text-gray">
                                Posted Time
                              </span>
                              <h6 className="font-size-5 text-black-2 font-weight-semibold mb-0">
                                16 November 2020
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="pt-8 pl-sm-9 pl-6 pb-10 light-mode-texts">
                        <div className="row">
                          <div className="col-xxl-12 col-xl-9 pr-xxl-18 pr-xl-0 pr-11">
                            <div className="">
                              <p className="mb-4 font-size-4 text-gray">
                                Job Description
                              </p>
                              <p className="font-size-4 text-black-2 mb-7">
                                Gubagoo is a fast growing provider of messaging
                                and commerce solutions for automotive dealers
                                changing the future of how people find, buy and
                                service their vehicles.
                              </p>
                            </div>
                            <div className="">
                              <span className="font-size-4 font-weight-semibold text-black-2 mb-7">
                                Your Role:
                              </span>
                              <p className="font-size-4 text-black-2 mb-7">
                                We’re looking for a passionate individual to
                                design beautiful and functional products for our
                                customers at Gubagoo. We move very fast and you
                                will be expected to contribute to a
                                cross-functional product development squad, that
                                includes product managers and developers, to
                                deliver the UX and UI for the team to bring to
                                life.
                              </p>
                              <p className="font-size-4 text-black-2 mb-7">
                                We are serious about remote work. You can work
                                for from anywhere.
                              </p>
                              <span className="font-size-4 font-weight-semibold text-black-2 mb-7">
                                What you will be doing:
                              </span>
                              <ul className="list-unstyled">
                                <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-2">
                                  <span className="d-inline-block mr-7">•</span>
                                  Contribute new controls or design improvements
                                  to our
                                </li>
                                <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-1">
                                  <span className="d-inline-block mr-7">•</span>
                                  Take ownership of the successful delivery of
                                  features
                                </li>
                                <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-1">
                                  <span className="d-inline-block mr-7">•</span>
                                  Help set and achieve quarterly goals
                                </li>
                                <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-1">
                                  <span className="d-inline-block mr-7">•</span>
                                  Ship a TON of product improvements and
                                  features
                                </li>
                              </ul>
                              <a
                                className="btn btn-secondary text-uppercase btn-medium w-180 h-px-48 rounded-3 mr-4 mt-6"
                                href="#"
                              >
                                Edit
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Main Content end --> */}
        <EmployerFooter />
      </div>
      {/* <!-- Main Content end --></> */}
    </>
  );
}

export default ManageJobs;
