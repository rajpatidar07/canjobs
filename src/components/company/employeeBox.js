import React, { useState } from "react";
import { Link } from "react-router-dom";
function EmployeeBox(props) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div
      className="col-xxl-4 col-xl-4 col-lg-6 col-md-6 job_box p-3"
      data-aos="fade-right"
      data-aos-duration="800"
      data-aos-once="true"
    >
      {/* <!-- Single Featured Job --> */}
      <div className="pt-9 px-xl-10 px-lg-10 px-8 pb-7 light-mode-texts bg-white rounded hover-shadow-3 hover-border-green position-relative">
        {props.swap === true ? (
          <span className="job_swap_label">SWAP</span>
        ) : null}
        <div className="row job_header m-0 align-items-center">
          <div className="media align-items-center company_box col-9 p-0">
            <div className="text_box text-left">
              {/* <img className="company_logo" src="https://findlogovector.com/wp-content/uploads/2018/12/huggies-brand-logo-vector.png" alt="" /> */}
              <img
                className="rounded-circle company_logo"
                src="image/user1.jpg"
                width="50"
                height="50"
                alt=""
              />
            </div>
            <div className="text_box text-left w-100">
              <p className="font-size-3 text-default-color line-height-2 m-0">
                Mathew Wade{" "}
                <span className="age_gender font-size-3 text-smoke">
                  (Male 29)
                </span>
              </p>
              <h3 className="mb-0 font-size-6 heading-dark-color">
                UI/UX Designer
              </h3>
            </div>
          </div>
          <div className="media justify-content-md-end col-3 p-0">
            <Link
              className="btn btn-secondary text-uppercase font-size-3 connect_btn"
              to=""
              data-toggle="modal"
              data-target="#signup"
              onClick={() => setIsLoading(true)}
            >
              {isLoading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                <span>Connect</span>
              )}
            </Link>
          </div>
          <div className="col-md-12 p-0 mt-2">
            <ul className="d-flex list-unstyled mb-0 flex-wrap justify-content-md-start">
              <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                <span className="mr-4">
                  <img src="image/svg/icon-loaction-pin-black.svg" alt="" />
                </span>
                <span className="font-weight-semibold">Indore, India</span>
              </li>
              <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                <span className="mr-4">
                  <img src="image/svg/icon-suitecase.svg" alt="" />
                </span>
                <span className="font-weight-semibold">3Y Experience</span>
              </li>
              <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                <span className="mr-4">
                  <img src="image/icons/language.svg" alt="" />
                </span>
                <span className="font-weight-semibold">Hindi, English</span>
              </li>
              <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                <span className="mr-4">
                  <img src="image/svg/icon-suitecase.svg" alt="" />
                </span>
                <span className="font-weight-semibold">Canada</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="row pt-4">
          <div className="col-md-12 text-left">
            <p>
              Gubagoo is a fast growing provider of messaging and commerce
              solutions for automotive dealers changing the future of how people
              find, buy and service their vehicles.
            </p>
          </div>
          <div className="col-md-12">
            <ul className="d-flex list-unstyled mr-n3 flex-wrap">
              <li>
                <Link
                  className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                  to=""
                >
                  Visual Design
                </Link>
              </li>
              <li>
                <Link
                  className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                  to=""
                >
                  Wireframing
                </Link>
              </li>
              <li>
                <Link
                  className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                  to=""
                >
                  Scrum
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <!-- End Single Featured Job --> */}
    </div>
  );
}
export default EmployeeBox;
