import React from "react";
import EmployeeHeader from "./header";
import EmployeeFooter from "./footer";
import { Link } from "react-router-dom";
function JobSearchPage() {
  return (
    <div className="site-wrapper overflow-hidden ">
      <EmployeeHeader />
      <div className="bg-default-1 pt-26 pt-lg-28 pb-13 pb-lg-25">
        <div className="container">
          <div className="row">
            <div className="col-12 col-xl-3 col-lg-3 col-md-4 col-xs-8">
              {/* <!-- Sidebar Start --> */}

              <div className="widgets mb-11">
                <h4 className="font-size-6 font-weight-semibold mb-6">
                  Job Type
                </h4>
                <ul className="list-unstyled filter-check-list">
                  <li className="mb-2">
                    <a href="http://localhost:3000/" className="toggle-item">
                      Full Time
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="http://localhost:3000/" className="toggle-item">
                      Part Time
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="http://localhost:3000/" className="toggle-item">
                      Contract
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="http://localhost:3000/" className="toggle-item">
                      Internship
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="http://localhost:3000/" className="toggle-item">
                      Temporary
                    </a>
                  </li>
                </ul>
              </div>
              <div className="widgets mb-11">
                <h4 className="font-size-6 font-weight-semibold mb-6">
                  Experience Level{" "}
                </h4>
                <ul className="list-unstyled filter-check-list">
                  <li className="mb-2">
                    <a href="http://localhost:3000/" className="toggle-item">
                      All
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="http://localhost:3000/" className="toggle-item">
                      Senior
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="http://localhost:3000/" className="toggle-item">
                      Mid
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="http://localhost:3000/" className="toggle-item">
                      Junior
                    </a>
                  </li>
                </ul>
              </div>
              <div className="widgets mb-11">
                <h4 className="font-size-6 font-weight-semibold mb-6">
                  Posted Time
                </h4>
                <ul className="list-unstyled filter-check-list">
                  <li className="mb-2">
                    <a href="http://localhost:3000/" className="toggle-item">
                      Anytime
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="http://localhost:3000/" className="toggle-item">
                      Last day
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="http://localhost:3000/" className="toggle-item">
                      Last 3 days
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="http://localhost:3000/" className="toggle-item">
                      Last week
                    </a>
                  </li>
                </ul>
              </div>
              {/* <!-- Sidebar End --> */}
            </div>
            {/* <!-- Main Body --> */}
            <div className="col-12 col-xl-9 col-lg-9 col-md-8 col-xs-8">
              {/* <!-- form --> */}
              <form className="search-form">
                <div className="filter-search-form-2 search-1-adjustment bg-white rounded-sm shadow-7 pr-6 py-6 pl-6">
                  <div className="filter-inputs">
                    <div className="form-group position-relative w-lg-45 w-xl-40 w-xxl-45">
                      <input
                        className="form-control focus-reset pl-13"
                        type="text"
                        id="keyword"
                        placeholder="UI Designer"
                      />
                      <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
                        <i className="icon icon-zoom-2 text-primary font-weight-bold"></i>
                      </span>
                    </div>
                    {/* <!-- .select-city starts --> */}
                    <div className="form-group position-relative w-lg-55 w-xl-60 w-xxl-55">
                      <select
                        name="country"
                        id="country"
                        className="nice-select font-size-4 pl-13 h-100 arrow-3"
                      >
                        <option data-display="City, state, zip code or (Remote)">
                          City
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
                    <button className="btn btn-primary line-height-reset h-100 btn-submit w-100 text-uppercase">
                      Search
                    </button>
                  </div>
                </div>
              </form>
              <div className="pt-12">
                <div className="d-flex align-items-center justify-content-between mb-6">
                  <h5 className="font-size-4 font-weight-normal text-gray">
                    <span className="heading-default-color">120</span>
                    results for{" "}
                    <span className="heading-default-color">UI Designer</span>
                  </h5>
                  <div className="d-flex align-items-center result-view-type">
                    <a
                      className="heading-default-color pl-5 font-size-6 hover-text-hitgray active"
                      href="http://localhost:3000/"
                    >
                      <i className="fa fa-list-ul"></i>
                    </a>
                    <a
                      className="heading-default-color pl-5 font-size-6 hover-text-hitgray"
                      href="http://localhost:3000/"
                    >
                      <i className="fa fa-th-large"></i>
                    </a>
                  </div>
                </div>
                <div className="mb-8">
                  {/* <!-- Single Featured Job --> */}
                  <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 ">
                    {" "}
                    <div className="row">
                      <div className="col-md-6">
                        <div className="media align-items-center">
                          <div className="square-72 d-block mr-8">
                            <img
                              src="image/l2/png/featured-job-logo-1.png"
                              alt=""
                            />
                          </div>
                          <div>
                            <h3 className="mb-0">
                              <a
                                className="font-size-6 heading-default-color"
                                href="/jobdetails"
                              >
                                Product Designer
                              </a>
                            </h3>
                            <a
                              href="http://localhost:3000/"
                              className="font-size-3 text-default-color line-height-2"
                            >
                              AirBnb
                            </a>
                          </div>
                        </div>
                        {/* <!-- Main Body --> */}
                        <div className="col-12 col-xl-9 col-lg-9 col-md-8 col-xs-8">
                          {/* <!-- form --> */}
                          <form
                            action="https://canjobs.com/"
                            className="search-form"
                          >
                            <div className="filter-search-form-2 search-1-adjustment bg-white rounded-sm shadow-7 pr-6 py-6 pl-6">
                              <div className="filter-inputs">
                                <div className="form-group position-relative w-lg-45 w-xl-40 w-xxl-45">
                                  <input
                                    className="form-control focus-reset pl-13"
                                    type="text"
                                    id="keyword"
                                    placeholder="UI Designer"
                                  />
                                  <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
                                    <i className="icon icon-zoom-2 text-primary font-weight-bold"></i>
                                  </span>
                                </div>
                                {/* <!-- .select-city starts --> */}
                                <div className="form-group position-relative w-lg-55 w-xl-60 w-xxl-55">
                                  <select
                                    name="country"
                                    id="country"
                                    className="nice-select font-size-4 pl-13 h-100 arrow-3"
                                  >
                                    <option data-display="City, state, zip code or (Remote)">
                                      City
                                    </option>
                                    <option value="">
                                      United States of America
                                    </option>
                                    <option value="">
                                      United Arab Emirates
                                    </option>
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
                                <button className="btn btn-primary line-height-reset h-100 btn-submit w-100 text-uppercase">
                                  Search
                                </button>
                              </div>
                            </div>
                          </form>
                          <div className="pt-12">
                            <div className="d-flex align-items-center justify-content-between mb-6">
                              <h5 className="font-size-4 font-weight-normal text-gray">
                                <span className="heading-default-color">
                                  120
                                </span>
                                results for{" "}
                                <span className="heading-default-color">
                                  UI Designer
                                </span>
                              </h5>
                              <div className="d-flex align-items-center result-view-type">
                                <a
                                  className="heading-default-color pl-5 font-size-6 hover-text-hitgray active"
                                  href="http://localhost:3000/"
                                >
                                  <i className="fa fa-list-ul"></i>
                                </a>
                                <a
                                  className="heading-default-color pl-5 font-size-6 hover-text-hitgray"
                                  href="http://localhost:3000/"
                                >
                                  <i className="fa fa-th-large"></i>
                                </a>
                              </div>
                            </div>
                            <div className="mb-8">
                              {/* <!-- Single Featured Job --> */}
                              <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 ">
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="media align-items-center">
                                      <div className="square-72 d-block mr-8">
                                        <img
                                          src="image/l2/png/featured-job-logo-1.png"
                                          alt=""
                                        />
                                      </div>
                                      <div>
                                        <h3 className="mb-0">
                                          <a
                                            className="font-size-6 heading-default-color"
                                            href="http://localhost:3000/"
                                          >
                                            Product Designer
                                          </a>
                                        </h3>
                                        <a
                                          href="http://localhost:3000/"
                                          className="font-size-3 text-default-color line-height-2"
                                        >
                                          AirBnb
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 text-right pt-7 pt-md-5">
                                    <div className="media justify-content-md-end">
                                      <div className="image mr-5 mt-2">
                                        <img
                                          src="image/svg/icon-fire-rounded.svg"
                                          alt=""
                                        />
                                      </div>
                                      <p className="font-weight-bold font-size-7 text-hit-gray mb-0">
                                        <span className="text-black-2">
                                          80-90K
                                        </span>{" "}
                                        PLN
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="row pt-8">
                                  <div className="col-md-7">
                                    <ul className="d-flex list-unstyled mr-n3 flex-wrap">
                                      <li>
                                        <a
                                          className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                                          href="http://localhost:3000/"
                                        >
                                          Agile
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                                          href="http://localhost:3000/"
                                        >
                                          Wireframing
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                                          href="http://localhost:3000/"
                                        >
                                          Prototyping
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="col-md-5">
                                    <ul className="d-flex list-unstyled mr-n3 flex-wrap mr-n8 justify-content-md-end">
                                      <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                                        <span className="mr-4">
                                          <img
                                            src="image/svg/icon-loaction-pin-black.svg"
                                            alt=""
                                          />
                                        </span>
                                        <span className="font-weight-semibold">
                                          Berlyn, UK
                                        </span>
                                      </li>
                                      <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                                        <span className="mr-4">
                                          <img
                                            src="image/svg/icon-suitecase.svg"
                                            alt=""
                                          />
                                        </span>
                                        <span className="font-weight-semibold">
                                          Full-time
                                        </span>
                                      </li>
                                      <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                                        <span className="mr-4">
                                          <img
                                            src="image/svg/icon-clock.svg"
                                            alt=""
                                          />
                                        </span>
                                        <span className="font-weight-semibold">
                                          9d ago
                                        </span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              {/* <!-- End Single Featured Job --> */}
                            </div>
                            <div className="mb-8">
                              {/* <!-- Single Featured Job --> */}
                              <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 ">
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="media align-items-center">
                                      <div className="square-72 d-block mr-8">
                                        <img
                                          src="image/l2/png/featured-job-logo-2.png"
                                          alt=""
                                        />
                                      </div>
                                      <div>
                                        <h3 className="mb-0">
                                          <a
                                            className="font-size-6 heading-default-color"
                                            href="http://localhost:3000/"
                                          >
                                            UI/UX Designer
                                          </a>
                                        </h3>
                                        <a
                                          href="http://localhost:3000/"
                                          className="font-size-3 text-default-color line-height-2"
                                        >
                                          Apple INC
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 text-right pt-7 pt-md-5">
                                    <div className="media justify-content-md-end">
                                      <div className="image mr-5 mt-2">
                                        <img
                                          src="image/svg/icon-fire-rounded.svg"
                                          alt=""
                                        />
                                      </div>
                                      <p className="font-weight-bold font-size-7 text-hit-gray mb-0">
                                        <span className="text-black-2">
                                          120-150K
                                        </span>{" "}
                                        PLN
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="row pt-8">
                                  <div className="col-md-7">
                                    <ul className="d-flex list-unstyled mr-n3 flex-wrap">
                                      <li>
                                        <a
                                          className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                                          href="http://localhost:3000/"
                                        >
                                          Visual Design
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                                          href="http://localhost:3000/"
                                        >
                                          Wireframing
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                                          href="http://localhost:3000/"
                                        >
                                          Scrum
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="col-md-5">
                                    <ul className="d-flex list-unstyled mr-n3 flex-wrap mr-n8 justify-content-md-end">
                                      <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                                        <span className="mr-4">
                                          <img
                                            src="image/svg/icon-loaction-pin-black.svg"
                                            alt=""
                                          />
                                        </span>
                                        <span className="font-weight-semibold">
                                          Berlyn, UK
                                        </span>
                                      </li>
                                      <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                                        <span className="mr-4">
                                          <img
                                            src="image/svg/icon-suitecase.svg"
                                            alt=""
                                          />
                                        </span>
                                        <span className="font-weight-semibold">
                                          Full-time
                                        </span>
                                      </li>
                                      <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                                        <span className="mr-4">
                                          <img
                                            src="image/svg/icon-clock.svg"
                                            alt=""
                                          />
                                        </span>
                                        <span className="font-weight-semibold">
                                          9d ago
                                        </span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              {/* <!-- End Single Featured Job --> */}
                            </div>
                            <div className="mb-8">
                              {/* <!-- Single Featured Job --> */}
                              <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 ">
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="media align-items-center">
                                      <div className="square-72 d-block mr-8">
                                        <img
                                          src="image/l2/png/featured-job-logo-3.png"
                                          alt=""
                                        />
                                      </div>
                                      <div>
                                        <h3 className="mb-0">
                                          <a
                                            className="font-size-6 heading-default-color"
                                            href="http://localhost:3000/"
                                          >
                                            iOS Developer
                                          </a>
                                        </h3>
                                        <a
                                          href="http://localhost:3000/"
                                          className="font-size-3 text-default-color line-height-2"
                                        >
                                          Shopify
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 text-right pt-7 pt-md-5">
                                    <div className="media justify-content-md-end">
                                      <div className="image mr-5 mt-2">
                                        <img
                                          src="image/svg/icon-fire-rounded.svg"
                                          alt=""
                                        />
                                      </div>
                                      <p className="font-weight-bold font-size-7 text-hit-gray mb-0">
                                        <span className="text-black-2">
                                          100-120K
                                        </span>{" "}
                                        PLN
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="row pt-8">
                                  <div className="col-md-7">
                                    <ul className="d-flex list-unstyled mr-n3 flex-wrap">
                                      <li>
                                        <a
                                          className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                                          href="http://localhost:3000/"
                                        >
                                          Swift
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                                          href="http://localhost:3000/"
                                        >
                                          Objective C
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                                          href="http://localhost:3000/"
                                        >
                                          X Code
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="col-md-5">
                                    <ul className="d-flex list-unstyled mr-n3 flex-wrap mr-n8 justify-content-md-end">
                                      <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                                        <span className="mr-4">
                                          <img
                                            src="image/svg/icon-loaction-pin-black.svg"
                                            alt=""
                                          />
                                        </span>
                                        <span className="font-weight-semibold">
                                          Berlyn, UK
                                        </span>
                                      </li>
                                      <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                                        <span className="mr-4">
                                          <img
                                            src="image/svg/icon-suitecase.svg"
                                            alt=""
                                          />
                                        </span>
                                        <span className="font-weight-semibold">
                                          Full-time
                                        </span>
                                      </li>
                                      <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                                        <span className="mr-4">
                                          <img
                                            src="image/svg/icon-clock.svg"
                                            alt=""
                                          />
                                        </span>
                                        <span className="font-weight-semibold">
                                          9d ago
                                        </span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              {/* <!-- End Single Featured Job --> */}
                            </div>
                            <div className="mb-8">
                              {/* <!-- Single Featured Job --> */}
                              <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 ">
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="media align-items-center">
                                      <div className="square-72 d-block mr-8">
                                        <img
                                          src="image/l2/png/featured-job-logo-4.png"
                                          alt=""
                                        />
                                      </div>
                                      <div>
                                        <h3 className="mb-0">
                                          <a
                                            className="font-size-6 heading-default-color"
                                            href="http://localhost:3000/"
                                          >
                                            Creative Director
                                          </a>
                                        </h3>
                                        <a
                                          href="http://localhost:3000/"
                                          className="font-size-3 text-default-color line-height-2"
                                        >
                                          Facebook
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 text-right pt-7 pt-md-5">
                                    <div className="media justify-content-md-end">
                                      <div className="image mr-5 mt-2">
                                        <img
                                          src="image/svg/icon-fire-rounded.svg"
                                          alt=""
                                        />
                                      </div>
                                      <p className="font-weight-bold font-size-7 text-hit-gray mb-0">
                                        <span className="text-black-2">
                                          80-90K
                                        </span>{" "}
                                        PLN
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="row pt-8">
                                  <div className="col-md-7">
                                    <ul className="d-flex list-unstyled mr-n3 flex-wrap">
                                      <li>
                                        <a
                                          className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                                          href="http://localhost:3000/"
                                        >
                                          Agile
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                                          href="http://localhost:3000/"
                                        >
                                          Wireframing
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                                          href="http://localhost:3000/"
                                        >
                                          Prototyping
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="col-md-5">
                                    <ul className="d-flex list-unstyled mr-n3 flex-wrap mr-n8 justify-content-md-end">
                                      <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                                        <span className="mr-4">
                                          <img
                                            src="image/svg/icon-loaction-pin-black.svg"
                                            alt=""
                                          />
                                        </span>
                                        <span className="font-weight-semibold">
                                          Berlyn, UK
                                        </span>
                                      </li>
                                      <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                                        <span className="mr-4">
                                          <img
                                            src="image/svg/icon-suitecase.svg"
                                            alt=""
                                          />
                                        </span>
                                        <span className="font-weight-semibold">
                                          Full-time
                                        </span>
                                      </li>
                                      <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                                        <span className="mr-4">
                                          <img
                                            src="image/svg/icon-clock.svg"
                                            alt=""
                                          />
                                        </span>
                                        <span className="font-weight-semibold">
                                          9d ago
                                        </span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              {/* <!-- End Single Featured Job --> */}
                            </div>
                            <div className="mb-8">
                              {/* <!-- Single Featured Job --> */}
                              <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 ">
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="media align-items-center">
                                      <div className="square-72 d-block mr-8">
                                        <img
                                          src="image/l2/png/featured-job-logo-5.png"
                                          alt=""
                                        />
                                      </div>
                                      <div>
                                        <h3 className="mb-0">
                                          <a
                                            className="font-size-6 heading-default-color"
                                            href="http://localhost:3000/"
                                          >
                                            Software Engineer
                                          </a>
                                        </h3>
                                        <a
                                          href="http://localhost:3000/"
                                          className="font-size-3 text-default-color line-height-2"
                                        >
                                          Oculus
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 text-right pt-7 pt-md-5">
                                    <div className="media justify-content-md-end">
                                      <div className="image mr-5 mt-2">
                                        <img
                                          src="image/svg/icon-fire-rounded.svg"
                                          alt=""
                                        />
                                      </div>
                                      <p className="font-weight-bold font-size-7 text-hit-gray mb-0">
                                        <span className="text-black-2">
                                          80-90K
                                        </span>{" "}
                                        PLN
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="row pt-8">
                                  <div className="col-md-7">
                                    <ul className="d-flex list-unstyled mr-n3 flex-wrap">
                                      <li>
                                        <a
                                          className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                                          href="http://localhost:3000/"
                                        >
                                          C++
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                                          href="http://localhost:3000/"
                                        >
                                          JavaScprit
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                                          href="http://localhost:3000/"
                                        >
                                          ReactJS
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="col-md-5">
                                    <ul className="d-flex list-unstyled mr-n3 flex-wrap mr-n8 justify-content-md-end">
                                      <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                                        <span className="mr-4">
                                          <img
                                            src="image/svg/icon-loaction-pin-black.svg"
                                            alt=""
                                          />
                                        </span>
                                        <span className="font-weight-semibold">
                                          Berlyn, UK
                                        </span>
                                      </li>
                                      <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                                        <span className="mr-4">
                                          <img
                                            src="image/svg/icon-suitecase.svg"
                                            alt=""
                                          />
                                        </span>
                                        <span className="font-weight-semibold">
                                          Full-time
                                        </span>
                                      </li>
                                      <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                                        <span className="mr-4">
                                          <img
                                            src="image/svg/icon-clock.svg"
                                            alt=""
                                          />
                                        </span>
                                        <span className="font-weight-semibold">
                                          9d ago
                                        </span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              {/* <!-- End Single Featured Job --> */}
                            </div>
                            <div className="mb-8">
                              {/* <!-- Single Featured Job --> */}
                              <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 ">
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="media align-items-center">
                                      <div className="square-72 d-block mr-8">
                                        <img
                                          src="image/l2/png/featured-job-logo-1.png"
                                          alt=""
                                        />
                                      </div>
                                      <div>
                                        <h3 className="mb-0">
                                          <a
                                            className="font-size-6 heading-default-color"
                                            href="http://localhost:3000/"
                                          >
                                            Product Designer
                                          </a>
                                        </h3>
                                        <a
                                          href="http://localhost:3000/"
                                          className="font-size-3 text-default-color line-height-2"
                                        >
                                          AirBnb
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 text-right pt-7 pt-md-5">
                                    <div className="media justify-content-md-end">
                                      <div className="image mr-5 mt-2">
                                        <img
                                          src="image/svg/icon-fire-rounded.svg"
                                          alt=""
                                        />
                                      </div>
                                      <p className="font-weight-bold font-size-7 text-hit-gray mb-0">
                                        <span className="text-black-2">
                                          80-90K
                                        </span>{" "}
                                        PLN
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="row pt-8">
                                  <div className="col-md-7">
                                    <ul className="d-flex list-unstyled mr-n3 flex-wrap">
                                      <li>
                                        <a
                                          className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                                          href="http://localhost:3000/"
                                        >
                                          Agile
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                                          href="http://localhost:3000/"
                                        >
                                          Wireframing
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                                          href="http://localhost:3000/"
                                        >
                                          Prototyping
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="col-md-5">
                                    <ul className="d-flex list-unstyled mr-n3 flex-wrap mr-n8 justify-content-md-end">
                                      <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                                        <span className="mr-4">
                                          <img
                                            src="image/svg/icon-loaction-pin-black.svg"
                                            alt=""
                                          />
                                        </span>
                                        <span className="font-weight-semibold">
                                          Berlyn, UK
                                        </span>
                                      </li>
                                      <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                                        <span className="mr-4">
                                          <img
                                            src="image/svg/icon-suitecase.svg"
                                            alt=""
                                          />
                                        </span>
                                        <span className="font-weight-semibold">
                                          Full-time
                                        </span>
                                      </li>
                                      <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                                        <span className="mr-4">
                                          <img
                                            src="image/svg/icon-clock.svg"
                                            alt=""
                                          />
                                        </span>
                                        <span className="font-weight-semibold">
                                          9d ago
                                        </span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              {/* <!-- End Single Featured Job --> */}
                            </div>
                            <div className="text-center pt-5 pt-lg-13">
                              <a
                                className="text-green font-weight-bold text-uppercase font-size-3"
                                href="http://localhost:3000/"
                              >
                                Load More{" "}
                                <i className="fas fa-sort-down ml-3"></i>
                              </a>
                            </div>
                          </div>
                          {/* <!-- form end --> */}
                        </div>
                      </div>
                    </div>
                    <div className="row pt-8">
                      <div className="col-md-7">
                        <ul className="d-flex list-unstyled mr-n3 flex-wrap">
                          <li>
                            <a
                              className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                              href="http://localhost:3000/"
                            >
                              Swift
                            </a>
                          </li>
                          <li>
                            <a
                              className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                              href="http://localhost:3000/"
                            >
                              Objective C
                            </a>
                          </li>
                          <li>
                            <a
                              className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                              href="http://localhost:3000/"
                            >
                              X Code
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-5">
                        <ul className="d-flex list-unstyled mr-n3 flex-wrap mr-n8 justify-content-md-end">
                          <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                            <span className="mr-4">
                              <img
                                src="image/svg/icon-loaction-pin-black.svg"
                                alt=""
                              />
                            </span>
                            <span className="font-weight-semibold">
                              Berlyn, UK
                            </span>
                          </li>
                          <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                            <span className="mr-4">
                              <img src="image/svg/icon-suitecase.svg" alt="" />
                            </span>
                            <span className="font-weight-semibold">
                              Full-time
                            </span>
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
                  </div>
                  {/* <!-- End Single Featured Job --> */}
                </div>
                <div className="mb-8">
                  {/* <!-- Single Featured Job --> */}
                  <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 ">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="media align-items-center">
                          <div className="square-72 d-block mr-8">
                            <img
                              src="image/l2/png/featured-job-logo-4.png"
                              alt=""
                            />
                          </div>
                          <div>
                            <h3 className="mb-0">
                              <a
                                className="font-size-6 heading-default-color"
                                href="http://localhost:3000/"
                              >
                                Creative Director
                              </a>
                            </h3>
                            <a
                              href="http://localhost:3000/"
                              className="font-size-3 text-default-color line-height-2"
                            >
                              Facebook
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 text-right pt-7 pt-md-5">
                        <div className="media justify-content-md-end">
                          <div className="image mr-5 mt-2">
                            <img src="image/svg/icon-fire-rounded.svg" alt="" />
                          </div>
                          <p className="font-weight-bold font-size-7 text-hit-gray mb-0">
                            <span className="text-black-2">80-90K</span> PLN
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row pt-8">
                      <div className="col-md-7">
                        <ul className="d-flex list-unstyled mr-n3 flex-wrap">
                          <li>
                            <a
                              className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                              href="http://localhost:3000/"
                            >
                              Agile
                            </a>
                          </li>
                          <li>
                            <a
                              className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                              href="http://localhost:3000/"
                            >
                              Wireframing
                            </a>
                          </li>
                          <li>
                            <a
                              className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                              href="http://localhost:3000/"
                            >
                              Prototyping
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-5">
                        <ul className="d-flex list-unstyled mr-n3 flex-wrap mr-n8 justify-content-md-end">
                          <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                            <span className="mr-4">
                              <img
                                src="image/svg/icon-loaction-pin-black.svg"
                                alt=""
                              />
                            </span>
                            <span className="font-weight-semibold">
                              Berlyn, UK
                            </span>
                          </li>
                          <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                            <span className="mr-4">
                              <img src="image/svg/icon-suitecase.svg" alt="" />
                            </span>
                            <span className="font-weight-semibold">
                              Full-time
                            </span>
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
                  </div>
                  {/* <!-- End Single Featured Job --> */}
                </div>
                <div className="mb-8">
                  {/* <!-- Single Featured Job --> */}
                  <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 ">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="media align-items-center">
                          <div className="square-72 d-block mr-8">
                            <img
                              src="image/l2/png/featured-job-logo-5.png"
                              alt=""
                            />
                          </div>
                          <div>
                            <h3 className="mb-0">
                              <a
                                className="font-size-6 heading-default-color"
                                href="http://localhost:3000/"
                              >
                                Software Engineer
                              </a>
                            </h3>
                            <a
                              href="http://localhost:3000/"
                              className="font-size-3 text-default-color line-height-2"
                            >
                              Oculus
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 text-right pt-7 pt-md-5">
                        <div className="media justify-content-md-end">
                          <div className="image mr-5 mt-2">
                            <img src="image/svg/icon-fire-rounded.svg" alt="" />
                          </div>
                          <p className="font-weight-bold font-size-7 text-hit-gray mb-0">
                            <span className="text-black-2">80-90K</span> PLN
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row pt-8">
                      <div className="col-md-7">
                        <ul className="d-flex list-unstyled mr-n3 flex-wrap">
                          <li>
                            <a
                              className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                              href="http://localhost:3000/"
                            >
                              C++
                            </a>
                          </li>
                          <li>
                            <a
                              className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                              href="http://localhost:3000/"
                            >
                              JavaScprit
                            </a>
                          </li>
                          <li>
                            <a
                              className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                              href="http://localhost:3000/"
                            >
                              ReactJS
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-5">
                        <ul className="d-flex list-unstyled mr-n3 flex-wrap mr-n8 justify-content-md-end">
                          <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                            <span className="mr-4">
                              <img
                                src="image/svg/icon-loaction-pin-black.svg"
                                alt=""
                              />
                            </span>
                            <span className="font-weight-semibold">
                              Berlyn, UK
                            </span>
                          </li>
                          <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                            <span className="mr-4">
                              <img src="image/svg/icon-suitecase.svg" alt="" />
                            </span>
                            <span className="font-weight-semibold">
                              Full-time
                            </span>
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
                  </div>
                  {/* <!-- End Single Featured Job --> */}
                </div>
                <div className="mb-8">
                  {/* <!-- Single Featured Job --> */}
                  <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 ">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="media align-items-center">
                          <div className="square-72 d-block mr-8">
                            <img
                              src="image/l2/png/featured-job-logo-1.png"
                              alt=""
                            />
                          </div>
                          <div>
                            <h3 className="mb-0">
                              <a
                                className="font-size-6 heading-default-color"
                                href="http://localhost:3000/"
                              >
                                Product Designer
                              </a>
                            </h3>
                            <a
                              href="http://localhost:3000/"
                              className="font-size-3 text-default-color line-height-2"
                            >
                              AirBnb
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 text-right pt-7 pt-md-5">
                        <div className="media justify-content-md-end">
                          <div className="image mr-5 mt-2">
                            <img src="image/svg/icon-fire-rounded.svg" alt="" />
                          </div>
                          <p className="font-weight-bold font-size-7 text-hit-gray mb-0">
                            <span className="text-black-2">80-90K</span> PLN
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row pt-8">
                      <div className="col-md-7">
                        <ul className="d-flex list-unstyled mr-n3 flex-wrap">
                          <li>
                            <a
                              className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                              href="http://localhost:3000/"
                            >
                              Agile
                            </a>
                          </li>
                          <li>
                            <a
                              className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                              href="http://localhost:3000/"
                            >
                              Wireframing
                            </a>
                          </li>
                          <li>
                            <a
                              className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                              href="http://localhost:3000/"
                            >
                              Prototyping
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-5">
                        <ul className="d-flex list-unstyled mr-n3 flex-wrap mr-n8 justify-content-md-end">
                          <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                            <span className="mr-4">
                              <img
                                src="image/svg/icon-loaction-pin-black.svg"
                                alt=""
                              />
                            </span>
                            <span className="font-weight-semibold">
                              Berlyn, UK
                            </span>
                          </li>
                          <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                            <span className="mr-4">
                              <img src="image/svg/icon-suitecase.svg" alt="" />
                            </span>
                            <span className="font-weight-semibold">
                              Full-time
                            </span>
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
                  </div>
                  {/* <!-- End Single Featured Job --> */}
                </div>
                <div className="text-center pt-5 pt-lg-13">
                  <a
                    className="text-green font-weight-bold text-uppercase font-size-3"
                    href="http://localhost:3000/"
                  >
                    Load More <i className="fas fa-sort-down ml-3"></i>
                  </a>
                </div>
              </div>
              {/* <!-- form end --> */}
            </div>
          </div>
        </div>
      </div>
      <EmployeeFooter />
    </div>
  );
}
export default JobSearchPage;
