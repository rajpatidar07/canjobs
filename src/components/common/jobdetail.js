import React, { useState } from "react";
import { Link } from "react-router-dom";

function JobDetailPage() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className=" bg-white rounded-4 border border-mercury shadow-9  overflow-y-scroll mt-9 mt-xl-0">
      <div className="pt-9 pl-sm-9 pl-5 pr-sm-9 pr-5 pb-8 border-bottom border-width-1 border-default-color light-mode-texts">
        <div className="row">
          <div className="col-12">
            {/* <!-- media start --> */}
            <div className="media align-items-center company_box col-md-6 p-0">
              <Link className="text_box text-left" to="http://localhost:3000/">
                <img
                  className="company_logo"
                  src="https://findlogovector.com/wp-content/uploads/2018/12/huggies-brand-logo-vector.png"
                  alt=""
                />
              </Link>
              <Link
                className="text_box text-left w-100"
                to="http://localhost:3000/"
              >
                <p
                  href="http://localhost:3000/"
                  className="font-size-3 text-default-color line-height-2 m-0"
                >
                  Apple INC
                </p>
                <h3 className="mb-0 font-size-6 heading-dark-color">
                  UI/UX Designer
                </h3>
              </Link>
            </div>
            {/* <!-- media end --> */}
          </div>
        </div>
        {/* <div className="row pt-9">
                          <div className="col-12">
                            <div className="card-btn-group">
                              <Link to={''}
                                className="btn btn-green text-uppercase btn-medium rounded-3 w-180 mr-4 mb-5"
                                href="#"
                              >
                                Apply to this job
                              </Link>
                              <Link to={''}
                                className="btn btn-outline-mercury text-black-2 text-uppercase h-px-48 rounded-3 mb-5 px-5"
                                href="#"
                              >
                                <i className="icon icon-bookmark-2 font-weight-bold mr-4 font-size-4"></i>{" "}
                                Save job
                              </Link>
                            </div>
                          </div>
                        </div> */}
      </div>
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
                <img src="image/svg/icon-briefcase.svg" alt="" />
              </div>
              <p className="font-weight-semibold font-size-5 text-black-2 mb-0">
                Full-time
              </p>
            </div>
          </div>
        </div>
        <div className="row text-left">
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
              <p className="font-size-4 text-gray mb-0">Soft Skill</p>
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
              <p className="font-size-4 text-gray mb-3">Technical Skill</p>
              <ul className="list-unstyled d-flex align-items-center flex-wrap">
                <li>
                  <Link
                    to={""}
                    className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                    href="#"
                  >
                    Editing
                  </Link>
                </li>
                <li>
                  <Link
                    to={""}
                    className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                    href="#"
                  >
                    Wire-framing
                  </Link>
                </li>
                <li>
                  <Link
                    to={""}
                    className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                    href="#"
                  >
                    XD
                  </Link>
                </li>
                <li>
                  <Link
                    to={""}
                    className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                    href="#"
                  >
                    User Persona
                  </Link>
                </li>
                <li>
                  <Link
                    to={""}
                    className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                    href="#"
                  >
                    Sketch
                  </Link>
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
        <div className="row text-left">
          <div className="col-xxl-12 col-xl-9 pr-xxl-18 pr-xl-0 pr-11">
            <div className="">
              <p className="mb-4 font-size-4 text-gray">Job Description</p>
              <p className="font-size-4 text-black-2 mb-7">
                Gubagoo is a fast growing provider of messaging and commerce
                solutions for automotive dealers changing the future of how
                people find, buy and service their vehicles.
              </p>
            </div>
            <div className="">
              <span className="font-size-4 font-weight-semibold text-black-2 mb-7">
                Your Role:
              </span>
              <p className="font-size-4 text-black-2 mb-7">
                We’re looking for a passionate individual to design beautiful
                and functional products for our customers at Gubagoo. We move
                very fast and you will be expected to contribute to a
                cross-functional product development squad, that includes
                product managers and developers, to deliver the UX and UI for
                the team to bring to life.
              </p>
              <p className="font-size-4 text-black-2 mb-7">
                We are serious about remote work. You can work for from
                anywhere.
              </p>
              <span className="font-size-4 font-weight-semibold text-black-2 mb-7">
                What you will be doing:
              </span>
              <ul className="list-unstyled">
                <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-2">
                  <span className="d-inline-block mr-7">•</span>
                  Contribute new controls or design improvements to our
                </li>
                <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-1">
                  <span className="d-inline-block mr-7">•</span>
                  Take ownership of the successful delivery of features
                </li>
                <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-1">
                  <span className="d-inline-block mr-7">•</span>
                  Help set and achieve quarterly goals
                </li>
                <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-1">
                  <span className="d-inline-block mr-7">•</span>
                  Ship a TON of product improvements and features
                </li>
              </ul>
              <Link
                to={""}
                onClick={() => setIsLoading(true)}
                className="btn btn-green text-uppercase btn-medium w-180 h-px-48 rounded-3 mr-4 mt-6"
              >
                {isLoading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  <span>Apply to this job</span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetailPage;
