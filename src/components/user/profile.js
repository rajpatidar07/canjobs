import React, { useState } from "react";
import EmployeeHeader from "../common/header";
import EmployeeFooter from "../common/footer";
import EmployementDetails from "../forms/user/employement";
import PersonalDetails from "../forms/user/personal";
import EducationDetails from "../forms/user/education";
import ItSkills from "../forms/user/skills";
import CustomButton from "../common/button";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [showEmplyomentDetails, setShowEmplyomentDetails] = useState(false);
  const [showPersonalDetails, setShowPersonalDetails] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showItSkills, setShowItSkills] = useState(false);
  const [showAppliedJobs, setShowAppliedJobs] = useState(false);

  return (
    /*---- Employee Profile Details Page ----*/
    <div className="site-wrapper overflow-hidden ">
      <EmployeeHeader />
      <div className="bg-default-2 pt-22 pt-lg-25 pb-13 pb-xxl-32 mt-5">
        <div className="container mt-5 pt-5">
          <div className="row text-left mt-5 pt-5">
            <div className="col-12 mb-3 ">
              <div className="pl-lg-5">
                {/*----Slide Employee profile-----*/}
                <div className="bg-white row shadow-9 rounded-4">
                  <div className="px-5 col-lg-3 col-sm-4 col-md-4 pt-11 pb-5 text-center border-mercury">
                    <Link className="mb-4 position-relative">
                      <input
                        type="file"
                        id="ImgUploadInput"
                        className="d-none"
                      />
                      <label
                        className="image_upload_btn m-0"
                        htmlFor="ImgUploadInput"
                      >
                        <span className="fas fa-pen text-gray"> </span>
                      </label>
                      <img
                        className="rounded-circle"
                        src="image/user1.jpg"
                        alt=""
                        width={"100px"}
                        height={"100px"}
                      />
                    </Link>
                    <h4 className="mb-0">
                      {/* <Link
                        className="text-black-2 font-size-6 font-weight-semibold"
                        onClick={() => setShowRegistration(true)}
                      > */}
                      David Henricks{" "}
                      <span className="age_gender font-size-3 text-smoke">
                        (Male 29)
                      </span>
                      {/* </Link>
                      <Registration
                        show={showRegistration}
                        close={() => setShowRegistration(false)}
                      /> */}
                    </h4>
                    <p className="mb-8 text-gray font-size-4">
                      Product Designer
                    </p>
                  </div>
                  <div className="px-9 col-lg-5 col-sm-4 col-md-4 pt-lg-5 pt-9 pt-xl-9 pb-10  border-mercury">
                    <h4 className="text-black-2 mb-5 font-size-5 d-flex align-items-center justify-content-space-between">
                      <span>Personal Info</span>
                      <CustomButton
                        className="fas fa-pen font-size-3 rounded-3 btn-primary border-0"
                        onClick={() => setShowPersonalDetails(true)}
                      />
                      <PersonalDetails
                        show={showPersonalDetails}
                        close={() => setShowPersonalDetails(false)}
                      />
                    </h4>
                    <div className="personal_info_box d-flex align-items-center justify-content-left flex-wrap">
                      <div className="info_box text-left">
                        <span className="font-size-3 text-smoke  mr-3">
                          <img
                            className="mr-1"
                            height={"16px"}
                            src="image/icons/envelope.svg"
                            alt="Email"
                          />
                          name_ac@domain.com
                        </span>
                      </div>
                      <div className="info_box text-left">
                        <span className="font-size-3 text-smoke  mr-3">
                          <img
                            className="mr-1"
                            height={"16px"}
                            src="image/icons/mobile-button.svg"
                            alt="Mobile Number"
                          />
                          +91-0987654321
                        </span>
                      </div>
                      <div className="info_box text-left">
                        <span className="font-size-3 text-smoke  mr-3">
                          <img
                            className="mr-1"
                            height={"16px"}
                            src="image/icons/marker.svg"
                            alt="Location"
                          />
                          New York, USA
                        </span>
                      </div>
                      <div className="info_box text-left">
                        <span className="font-size-3 text-smoke  mr-3">
                          <img
                            className="mr-1"
                            height={"16px"}
                            src="image/icons/language.svg"
                            alt="language"
                          />
                          Hindi, English
                        </span>
                      </div>
                      <div className="info_box text-left">
                        <span className="font-size-3 text-smoke  mr-3">
                          <img
                            className="mr-1"
                            height={"16px"}
                            src="image/icons/address-book.svg"
                            alt="Address"
                          />
                          45, Universal Tower Scheme 54, PU4, Indore, MP
                          (452001)
                        </span>
                      </div>
                      <div className="info_box text-left">
                        <span className="font-size-3 text-smoke  mr-3">
                          <b>Work Permit of Canada:</b> Yes
                        </span>
                      </div>
                      <div className="info_box text-left">
                        <span className="font-size-3 text-smoke  mr-3">
                          <b>Work Permit of Other Country:</b> No
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="px-9 col-lg-4 col-sm-4 col-md-4 pt-lg-5 pt-9 pt-xl-9 pb-10 w-100">
                    <h4 className="text-black-2 mb-5 font-size-5 d-flex align-items-center justify-content-space-between">
                      <span>Skill</span>
                      <CustomButton
                        className="fas fa-pen font-size-3 rounded-3 btn-primary border-0 float-right"
                        onClick={() => setShowItSkills(true)}
                      />
                    </h4>
                    <div className="icon-link d-flex align-items-center justify-content-center flex-wrap ">
                      {/*----Employee's Skills----*/}

                      <ItSkills
                        show={showItSkills}
                        close={() => setShowItSkills(false)}
                      />

                      <ul className="list-unstyled d-flex align-items-center flex-wrap">
                        <li>
                          <Link
                            className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                            to="http://localhost:3000/"
                          >
                            Agile
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                            to="http://localhost:3000/"
                          >
                            Wireframing
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                            to="http://localhost:3000/"
                          >
                            Prototyping
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                            to="http://localhost:3000/"
                          >
                            Information
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                            to="http://localhost:3000/"
                          >
                            Waterfall Model
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                            to="http://localhost:3000/"
                          >
                            New Layout
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                            to="http://localhost:3000/"
                          >
                            Browsing
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-xxl-12 col-lg-12 col-md-12 order-2 order-xl-1">
              <div className="bg-white rounded-4 shadow-9">
                {/*----Profile Header----*/}
                <ul
                  className="nav border-bottom border-mercury pl-12"
                  id="myTab"
                  role="tablist"
                >
                  <li className="tab-menu-items nav-item pr-12">
                    <Link
                      className={
                        showAppliedJobs === true
                          ? "text-uppercase font-size-3 font-weight-bold text-default-color py-3"
                          : " active text-uppercase font-size-3 font-weight-bold text-default-color py-3"
                      }
                      id="home-tab"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                      onClick={() => setShowAppliedJobs(false)}
                    >
                      Overview
                    </Link>
                  </li>
                  <li className="tab-menu-items nav-item pr-12">
                    <Link
                      className={
                        showAppliedJobs === false
                          ? "text-uppercase font-size-3 font-weight-bold text-default-color py-3"
                          : " active text-uppercase font-size-3 font-weight-bold text-default-color py-3"
                      }
                      id="appliedJobs"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="appliedJobs"
                      aria-selected="true"
                      onClick={() => setShowAppliedJobs(true)}
                    >
                      Applied Jobs
                    </Link>
                  </li>
                </ul>
                {/*---Profile Details----*/}
                <div
                  className={
                    showAppliedJobs === false ? "tab-content" : "d-none"
                  }
                  id="myTabContent"
                >
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    {/*----About Employee----*/}
                    <div className="pr-xl-0 pr-xxl-14 p-5 px-xs-12 pt-7 pb-5 px-9">
                      <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">
                        About
                      </h4>
                      <p className="font-size-4 mb-8">
                        A talented professional with an academic background in
                        IT and proven commercial development experience as C++
                        developer since 1999. Has a sound knowledge of the
                        software development life cycle. Was involved in more
                        than 140 software development outsourcing projects.
                      </p>
                      <p className="font-size-4 mb-8">
                        Programming Languages: C/C++, .NET C++, Python, Bash,
                        Shell, PERL, Regular expressions, Python, Active-script.
                      </p>
                    </div>
                    {/*----Employee's Career Profile----*/}
                    <div
                      id="Career_Profile"
                      className="border-top px-9 pt-lg-5 pt-9 pt-xl-9 pb-10"
                    >
                      <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold text-left d-flex align-items-center justify-content-space-between">
                        <span>Career Profile</span>
                        <CustomButton
                          className="fas fa-pen font-size-3 rounded-3 btn-primary border-0"
                          onClick={() => setShowEmplyomentDetails(true)}
                        />
                        <EmployementDetails
                          show={showEmplyomentDetails}
                          close={() => setShowEmplyomentDetails(false)}
                        />
                      </h4>

                      <div className="w-100">
                        <div className="d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap justify-content-md-between">
                          <div className="media align-items-center company_box col-md-6 p-0">
                            <Link
                              className="text_box text-left"
                              to="http://localhost:3000/"
                            >
                              <img
                                className="company_logo"
                                src="https://findlogovector.com/wp-content/uploads/2018/12/huggies-brand-logo-vector.png"
                                alt=""
                              />
                            </Link>
                            <div className="text_box text-left w-100 mt-n2">
                              <h3 className="mb-0">
                                <Link
                                  className="font-size-6 text-black-2 font-weight-semibold"
                                  to="http://localhost:3000/"
                                >
                                  Lead Product Designer
                                </Link>
                              </h3>
                              <Link
                                to="http://localhost:3000/"
                                className="font-size-4 text-default-color line-height-2"
                              >
                                Airabnb
                              </Link>
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-right flex-wrap text-right">
                            <Link
                              to="http://localhost:3000/"
                              className="font-size-4 text-gray w-100"
                            >
                              Jun 2017 - April 2020- 3 years
                            </Link>
                            <Link
                              to="http://localhost:3000/"
                              className="font-size-3 text-gray w-100"
                            >
                              <span
                                className="mr-4"
                                style={{ marginTop: "-2px" }}
                              >
                                <img
                                  src="image/svg/icon-loaction-pin-black.svg"
                                  alt=""
                                />
                              </span>
                              New York, USA
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="w-100">
                        <div className="d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap justify-content-md-between">
                          <div className="media align-items-center company_box col-md-6 p-0">
                            <Link
                              className="text_box text-left"
                              to="http://localhost:3000/"
                            >
                              <img
                                className="company_logo"
                                src="https://findlogovector.com/wp-content/uploads/2018/12/huggies-brand-logo-vector.png"
                                alt=""
                              />
                            </Link>
                            <div className="text_box text-left w-100 mt-n2">
                              <h3 className="mb-0">
                                <Link
                                  className="font-size-6 text-black-2 font-weight-semibold"
                                  to="http://localhost:3000/"
                                >
                                  Lead Product Designer
                                </Link>
                              </h3>
                              <Link
                                to="http://localhost:3000/"
                                className="font-size-4 text-default-color line-height-2"
                              >
                                Airabnb
                              </Link>
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-right flex-wrap text-right">
                            <Link
                              to="http://localhost:3000/"
                              className="font-size-4 text-gray w-100"
                            >
                              Jun 2017 - April 2020- 3 years
                            </Link>
                            <Link
                              to="http://localhost:3000/"
                              className="font-size-3 text-gray w-100"
                            >
                              <span
                                className="mr-4"
                                style={{ marginTop: "-2px" }}
                              >
                                <img
                                  src="image/svg/icon-loaction-pin-black.svg"
                                  alt=""
                                />
                              </span>
                              New York, USA
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*----Employee's Education Profile----*/}
                    <div
                      id="Career_Profile"
                      className="border-top 
                      px-9 pt-lg-5 pt-9 pt-xl-9 pb-10"
                    >
                      <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold text-left d-flex align-items-center justify-content-space-between">
                        <span>Education</span>
                        <CustomButton
                          className="fas fa-pen font-size-3 rounded-3 btn-primary border-0"
                          onClick={() => setShowEducation(true)}
                        />
                        <EducationDetails
                          show={showEducation}
                          close={() => setShowEducation(false)}
                        />
                      </h4>

                      <div className="w-100">
                        <div className="d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap justify-content-md-between">
                          <div className="media align-items-center company_box p-0">
                            <Link
                              className="text_box text-left"
                              to="http://localhost:3000/"
                            >
                              <img
                                className="company_logo"
                                src="image/svg/harvard.svg"
                                alt=""
                              />
                            </Link>
                            <div className="text_box text-left w-100 mt-n2">
                              <h3 className="mb-0">
                                <Link
                                  className="font-size-6 text-black-2 font-weight-semibold"
                                  to="http://localhost:3000/"
                                >
                                  Masters in Art Design
                                </Link>
                              </h3>
                              <Link
                                to="http://localhost:3000/"
                                className="font-size-4 text-default-color line-height-2"
                              >
                                Harvard University
                              </Link>
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-right flex-wrap text-right">
                            <Link
                              to="http://localhost:3000/"
                              className="font-size-4 text-gray w-100"
                            >
                              Jun 2017 - April 2020- 3 years
                            </Link>
                            <Link
                              to="http://localhost:3000/"
                              className="font-size-3 text-gray w-100"
                            >
                              <span
                                className="mr-4"
                                style={{ marginTop: "-2px" }}
                              >
                                <img
                                  src="image/svg/icon-loaction-pin-black.svg"
                                  alt=""
                                />
                              </span>
                              New York, USA
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="w-100">
                        <div className="d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap justify-content-md-between">
                          <div className="media align-items-center company_box p-0">
                            <Link
                              className="text_box text-left"
                              to="http://localhost:3000/"
                            >
                              <img
                                className="company_logo"
                                src="image/svg/mit.svg"
                                alt=""
                              />
                            </Link>
                            <div className="text_box text-left w-100 mt-n2">
                              <h3 className="mb-0">
                                <Link
                                  className="font-size-6 text-black-2 font-weight-semibold"
                                  to="http://localhost:3000/"
                                >
                                  Bachelor in Software Engineering
                                </Link>
                              </h3>
                              <Link
                                to="http://localhost:3000/"
                                className="font-size-4 text-default-color line-height-2"
                              >
                                Manipal Institute of Technology
                              </Link>
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-right flex-wrap text-right">
                            <Link
                              to="http://localhost:3000/"
                              className="font-size-4 text-gray w-100"
                            >
                              Jun 2017 - April 2020- 3 years
                            </Link>
                            <Link
                              to="http://localhost:3000/"
                              className="font-size-3 text-gray w-100"
                            >
                              <span
                                className="mr-4"
                                style={{ marginTop: "-2px" }}
                              >
                                <img
                                  src="image/svg/icon-loaction-pin-black.svg"
                                  alt=""
                                />
                              </span>
                              New York, USA
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <div className="pr-xl-11 p-5 pl-xs-12 pt-9 pb-11">
                      <form>
                        <div className="row">
                          <div className="col-12 mb-7">
                            <label
                              htmlFor="name3"
                              className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                            >
                              Your Name
                            </label>
                            <input
                              id="name3"
                              type="text"
                              className="form-control"
                              placeholder="Jhon Doe"
                            />
                          </div>
                          <div className="col-lg-6 mb-7">
                            <label
                              htmlFor="email3"
                              className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                            >
                              E-mail
                            </label>
                            <input
                              id="email3"
                              type="email"
                              className="form-control"
                              placeholder="example@gmail.com"
                            />
                          </div>
                          <div className="col-lg-6 mb-7">
                            <label
                              htmlFor="subject3"
                              className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                            >
                              Subject
                            </label>
                            <input
                              id="subject3"
                              type="text"
                              className="form-control"
                              placeholder="Special contract"
                            />
                          </div>
                          <div className="col-lg-12 mb-7">
                            <label
                              htmlFor="message3"
                              className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                            >
                              Message
                            </label>
                            <textarea
                              name="message"
                              id="message3"
                              placeholder="Type your message"
                              className="form-control h-px-144"
                            ></textarea>
                          </div>
                          <div className="col-lg-12 pt-4">
                            <button className="btn btn-primary text-uppercase w-100 h-px-48">
                              Send Now
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Sidebar End --> */}
              <div
                className={
                  showAppliedJobs === true
                    ? "row justify-content-center p-8"
                    : "d-none"
                }
                id="appliedJobs"
                role="tabpanel"
                aria-labelledby="appliedJobs"
              >
                {/* <!-- Top Start --> */}
                <div className="mb-5">
                  <h4 className="font-size-7 mb-9">Applied Jobs</h4>
                  <div className="row justify-content-center">
                    <div className="col-lg-6 col-sm-11 mb-9">
                      {/* <!-- Single Featured Job --> */}
                      <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3">
                        <div className="media align-items-center">
                          <div className="square-52 bg-indigo mr-8 rounded">
                            <Link to="http://localhost:3000/">
                              <img src="image/l3/png/fimize.png" alt="" />
                            </Link>
                          </div>
                          <div>
                            <Link
                              to="http://localhost:3000/"
                              className="font-size-3 text-default-color line-height-2"
                            >
                              Fimize
                            </Link>
                            <h3 className="font-size-5 mb-0">
                              <Link
                                className="heading-default-color font-weight-semibold"
                                to="http://localhost:3000/"
                              >
                                Senior Marketing Expert
                              </Link>
                            </h3>
                          </div>
                        </div>
                        <div className="d-flex pt-17">
                          <ul className="list-unstyled mb-1 d-flex flex-wrap">
                            <li>
                              <Link
                                to="http://localhost:3000/"
                                className="bg-regent-opacity-15 text-denim font-size-3 rounded-3 min-width-px-100 px-3 flex-all-center mr-6 h-px-33 mt-4"
                              >
                                <i className="icon icon-pin-3 mr-2 font-weight-bold"></i>{" "}
                                London
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="http://localhost:3000/"
                                className="bg-regent-opacity-15 text-orange font-size-3 rounded-3 min-width-px-100 px-3 flex-all-center mr-6 h-px-33 mt-4"
                              >
                                <i className="fa fa-briefcase mr-2 font-weight-bold"></i>{" "}
                                Full-time
                              </Link>
                            </li>
                          </ul>
                          <Link
                            to="http://localhost:3000/"
                            className="bookmark-button toggle-item font-size-6 ml-auto line-height-reset px-0 mt-6 text-default-color  clicked  "
                          ></Link>
                        </div>
                      </div>
                      {/* <!-- End Single Featured Job --> */}
                    </div>
                    <div className="col-lg-6 col-sm-11 mb-9">
                      {/* <!-- Single Featured Job --> */}
                      <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3">
                        <div className="media align-items-center">
                          <div className="square-52 bg-regent mr-8 rounded">
                            <Link to="http://localhost:3000/">
                              <img src="image/svg/icon-shark-2.svg" alt="" />
                            </Link>
                          </div>
                          <div>
                            <Link
                              to="http://localhost:3000/"
                              className="font-size-3 text-default-color line-height-2"
                            >
                              Shark
                            </Link>
                            <h3 className="font-size-5 mb-0">
                              <Link
                                className="heading-default-color font-weight-semibold"
                                to="http://localhost:3000/"
                              >
                                3D ui / ux frontend developer
                              </Link>
                            </h3>
                          </div>
                        </div>
                        <div className="d-flex pt-17">
                          <ul className="list-unstyled mb-1 d-flex flex-wrap">
                            <li>
                              <Link
                                to="http://localhost:3000/"
                                className="bg-regent-opacity-15 text-denim font-size-3 rounded-3 min-width-px-100 px-3 flex-all-center mr-6 h-px-33 mt-4"
                              >
                                <i className="icon icon-pin-3 mr-2 font-weight-bold"></i>{" "}
                                California
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="http://localhost:3000/"
                                className="bg-regent-opacity-15 text-orange font-size-3 rounded-3 min-width-px-100 px-3 flex-all-center mr-6 h-px-33 mt-4"
                              >
                                <i className="fa fa-briefcase mr-2 font-weight-bold"></i>{" "}
                                Remote
                              </Link>
                            </li>
                          </ul>
                          <Link
                            to="http://localhost:3000/"
                            className="bookmark-button toggle-item font-size-6 ml-auto line-height-reset px-0 mt-6 text-default-color  "
                          ></Link>
                        </div>
                      </div>
                      {/* <!-- End Single Featured Job --> */}
                    </div>
                    <div className="col-lg-6 col-sm-11 mb-9">
                      {/* <!-- Single Featured Job --> */}
                      <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3">
                        <div className="media align-items-center">
                          <div className="square-52 bg-orange-2 mr-8 rounded">
                            <Link to="http://localhost:3000/">
                              <img src="image/svg/icon-thunder.svg" alt="" />
                            </Link>
                          </div>
                          <div>
                            <Link
                              to="http://localhost:3000/"
                              className="font-size-3 text-default-color line-height-2"
                            >
                              Thunder
                            </Link>
                            <h3 className="font-size-5 mb-0">
                              <Link
                                className="heading-default-color font-weight-semibold"
                                to="http://localhost:3000/"
                              >
                                Product Manager
                              </Link>
                            </h3>
                          </div>
                        </div>
                        <div className="d-flex pt-17">
                          <ul className="list-unstyled mb-1 d-flex flex-wrap">
                            <li>
                              <Link
                                to="http://localhost:3000/"
                                className="bg-regent-opacity-15 text-denim font-size-3 rounded-3 min-width-px-100 px-3 flex-all-center mr-6 h-px-33 mt-4"
                              >
                                <i className="icon icon-pin-3 mr-2 font-weight-bold"></i>{" "}
                                London
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="http://localhost:3000/"
                                className="bg-regent-opacity-15 text-orange font-size-3 rounded-3 min-width-px-100 px-3 flex-all-center mr-6 h-px-33 mt-4"
                              >
                                <i className="fa fa-briefcase mr-2 font-weight-bold"></i>{" "}
                                Full-time
                              </Link>
                            </li>
                          </ul>
                          <Link
                            to="http://localhost:3000/"
                            className="bookmark-button toggle-item font-size-6 ml-auto line-height-reset px-0 mt-6 text-default-color  "
                          ></Link>
                        </div>
                      </div>
                      {/* <!-- End Single Featured Job --> */}
                    </div>
                    <div className="col-lg-6 col-sm-11 mb-9">
                      {/* <!-- Single Featured Job --> */}
                      <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3">
                        <div className="media align-items-center">
                          <div className="square-52 bg-helio mr-8 rounded">
                            <Link to="http://localhost:3000/">
                              <img src="image/l3/png/asios.png" alt="" />
                            </Link>
                          </div>
                          <div>
                            <Link
                              to="http://localhost:3000/"
                              className="font-size-3 text-default-color line-height-2"
                            >
                              Shark
                            </Link>
                            <h3 className="font-size-5 mb-0">
                              <Link
                                className="heading-default-color font-weight-semibold"
                                to="http://localhost:3000/"
                              >
                                Front-end Developer
                              </Link>
                            </h3>
                          </div>
                        </div>
                        <div className="d-flex pt-17">
                          <ul className="list-unstyled mb-1 d-flex flex-wrap">
                            <li>
                              <Link
                                to="http://localhost:3000/"
                                className="bg-regent-opacity-15 text-denim font-size-3 rounded-3 min-width-px-100 px-3 flex-all-center mr-6 h-px-33 mt-4"
                              >
                                <i className="icon icon-pin-3 mr-2 font-weight-bold"></i>{" "}
                                Alabama
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="http://localhost:3000/"
                                className="bg-regent-opacity-15 text-orange font-size-3 rounded-3 min-width-px-100 px-3 flex-all-center mr-6 h-px-33 mt-4"
                              >
                                <i className="fa fa-briefcase mr-2 font-weight-bold"></i>{" "}
                                Full-time
                              </Link>
                            </li>
                          </ul>
                          <Link
                            to="http://localhost:3000/"
                            className="bookmark-button toggle-item font-size-6 ml-auto line-height-reset px-0 mt-6 text-default-color  clicked  "
                          ></Link>
                        </div>
                      </div>
                      {/* <!-- End Single Featured Job --> */}
                    </div>
                  </div>
                </div>
                {/* <!-- Top End --> */}
                {/* <!-- Bottom Start --> */}
                <div className="">
                  <h4 className="font-size-7 mb-9">Saved Jobs</h4>
                  <div className="row justify-content-center">
                    <div className="col-lg-6 col-sm-11 mb-9">
                      {/* <!-- Single Featured Job --> */}
                      <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3">
                        <div className="media align-items-center">
                          <div className="square-52 bg-orange-2 mr-8 rounded">
                            <Link to="http://localhost:3000/">
                              <img src="image/svg/icon-thunder.svg" alt="" />
                            </Link>
                          </div>
                          <div>
                            <Link
                              to="http://localhost:3000/"
                              className="font-size-3 text-default-color line-height-2"
                            >
                              Thunder
                            </Link>
                            <h3 className="font-size-5 mb-0">
                              <Link
                                className="heading-default-color font-weight-semibold"
                                to="http://localhost:3000/"
                              >
                                Product Manager
                              </Link>
                            </h3>
                          </div>
                        </div>
                        <div className="d-flex pt-17">
                          <ul className="list-unstyled mb-1 d-flex flex-wrap">
                            <li>
                              <Link
                                to="http://localhost:3000/"
                                className="bg-regent-opacity-15 text-denim font-size-3 rounded-3 min-width-px-100 px-3 flex-all-center mr-6 h-px-33 mt-4"
                              >
                                <i className="icon icon-pin-3 mr-2 font-weight-bold"></i>{" "}
                                New York
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="http://localhost:3000/"
                                className="bg-regent-opacity-15 text-orange font-size-3 rounded-3 min-width-px-100 px-3 flex-all-center mr-6 h-px-33 mt-4"
                              >
                                <i className="fa fa-briefcase mr-2 font-weight-bold"></i>{" "}
                                Part-time
                              </Link>
                            </li>
                          </ul>
                          <Link
                            to="http://localhost:3000/"
                            className="bookmark-button toggle-item font-size-6 ml-auto line-height-reset px-0 mt-6 text-default-color  "
                          ></Link>
                        </div>
                      </div>
                      {/* <!-- End Single Featured Job --> */}
                    </div>
                    <div className="col-lg-6 col-sm-11 mb-9">
                      {/* <!-- Single Featured Job --> */}
                      <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3">
                        <div className="media align-items-center">
                          <div className="square-52 bg-helio mr-8 rounded">
                            <Link to="http://localhost:3000/">
                              <img src="image/l3/png/asios.png" alt="" />
                            </Link>
                          </div>
                          <div>
                            <Link
                              to="http://localhost:3000/"
                              className="font-size-3 text-default-color line-height-2"
                            >
                              Shark
                            </Link>
                            <h3 className="font-size-5 mb-0">
                              <Link
                                className="heading-default-color font-weight-semibold"
                                to="http://localhost:3000/"
                              >
                                Front-end Developer
                              </Link>
                            </h3>
                          </div>
                        </div>
                        <div className="d-flex pt-17">
                          <ul className="list-unstyled mb-1 d-flex flex-wrap">
                            <li>
                              <Link
                                to="http://localhost:3000/"
                                className="bg-regent-opacity-15 text-denim font-size-3 rounded-3 min-width-px-100 px-3 flex-all-center mr-6 h-px-33 mt-4"
                              >
                                <i className="icon icon-pin-3 mr-2 font-weight-bold"></i>{" "}
                                Alabama
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="http://localhost:3000/"
                                className="bg-regent-opacity-15 text-orange font-size-3 rounded-3 min-width-px-100 px-3 flex-all-center mr-6 h-px-33 mt-4"
                              >
                                <i className="fa fa-briefcase mr-2 font-weight-bold"></i>{" "}
                                Full-time
                              </Link>
                            </li>
                          </ul>
                          <Link
                            to="http://localhost:3000/"
                            className="bookmark-button toggle-item font-size-6 ml-auto line-height-reset px-0 mt-6 text-default-color  "
                          ></Link>
                        </div>
                      </div>
                      {/* <!-- End Single Featured Job --> */}
                    </div>
                  </div>
                </div>
                {/* <!-- Bottom End --> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <EmployeeFooter />
    </div>
  );
};

export default UserProfile;
