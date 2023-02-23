import React, { useState } from "react";
import EmployeeHeader from "../header";
import EmployeeFooter from "../footer";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Registration from "./modals/registration";
import EmployementDetails from "./modals/employementDetails";
import PersonalDetails from "./modals/personalDetails";
import CareerProfile from "./modals/careerProfile";
import EducationDetails from "./modals/educationDetails";
import Projects from "./modals/projects";
import Patent from "./modals/patent";
import Certificate from "./modals/certificate";
import ItSkills from "./modals/itSkills";
import OnlineProfile from "./modals/onlineProfile";
import WorkSample from "./modals/workSample";
import CustomButton from "../../comman/button";

const UserProfile = () => {
  const [show, setShow] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showEmplyomentDetails, setShowEmplyomentDetails] = useState(false);
  const [showPersonalDetails, setShowPersonalDetails] = useState(false);
  const [showCareerProfile, setShowCareerProfile] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showPatents, setShowPatents] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showItSkills, setShowItSkills] = useState(false);
  const [showOnlineProfile, setShowOnlineProfile] = useState(false);
  const [showWorkSample, setShowWorkSample] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    /*---- Employee Profile Details Page ----*/
    <div className="site-wrapper overflow-hidden ">
      <EmployeeHeader />
      <div className="bg-default-2 pt-22 pt-lg-25 pb-13 pb-xxl-32">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 dark-mode-texts">
              <div className="mb-9">
                <a
                  className="d-flex align-items-center ml-4"
                  href="dashboard-main.html"
                >
                  {" "}
                  <i className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                  <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                    Back
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="row text-left">
            <div className="col-12 col-xxl-3 col-lg-4 col-md-5 mb-11 mb-lg-0">
              <div className="pl-lg-5">
                {/*----Slide Employee profile-----*/}
                <div className="bg-white shadow-9 rounded-4">
                  <div className="px-5 py-11 text-center border-bottom border-mercury">
                    <a className="mb-4" href="">
                      <input
                        type="file"
                        id="file"
                        style={{ display: "none" }}
                      />
                      <label htmlFor="file">
                        <span className="z-2 position-absolute  mt-15 mx-4  rounded-3 fas fa-pencil-alt">
                          {" "}
                        </span>
                      </label>
                      <img
                        className="circle-54"
                        src="image/l3/png/pro-img.png"
                        alt=""
                      />
                    </a>
                    <h4 className="mb-0">
                      <a
                        className="text-black-2 font-size-6 font-weight-semibold"
                        href="#"
                        onClick={() => setShowRegistration(true)}
                      >
                        David Henricks
                      </a>
                      <Registration
                        show={showRegistration}
                        close={() => setShowRegistration(false)}
                      />
                    </h4>
                    <p className="mb-8">
                      <a className="text-gray font-size-4" href="#">
                        Product Designer
                      </a>
                    </p>
                    <div className="icon-link d-flex align-items-center justify-content-center flex-wrap ">
                      {/*----Employee's Skills----*/}
                      <div className="row">
                        <div className="col">
                          {" "}
                          <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold text-left ">
                            Skill{" "}
                          </h4>{" "}
                        </div>
                        <div className="col"></div>
                        <div className="col"></div>
                        <div className="col"></div>
                        <div className="col"></div>
                        <div className="col mb-7 mt-5">
                          {" "}
                          <CustomButton
                            className="btn-primary rounded"
                            onClick={() => setShowItSkills(true)}
                          >
                            Edit
                          </CustomButton>
                        </div>
                        <ItSkills
                          show={showItSkills}
                          close={() => setShowItSkills(false)}
                        />
                      </div>
                      <ul className="list-unstyled d-flex align-items-center flex-wrap">
                        <li>
                          <a
                            className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                            href="#"
                          >
                            Agile
                          </a>
                        </li>
                        <li>
                          <a
                            className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                            href="#"
                          >
                            Wireframing
                          </a>
                        </li>
                        <li>
                          <a
                            className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                            href="#"
                          >
                            Prototyping
                          </a>
                        </li>
                        <li>
                          <a
                            className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                            href="#"
                          >
                            Information
                          </a>
                        </li>
                        <li>
                          <a
                            className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                            href="#"
                          >
                            Waterfall Model
                          </a>
                        </li>
                        <li>
                          <a
                            className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                            href="#"
                          >
                            New Layout
                          </a>
                        </li>
                        <li>
                          <a
                            className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                            href="#"
                          >
                            Browsing
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="px-9 pt-lg-5 pt-9 pt-xl-9 pb-5">
                    <h5 className="text-black-2 mb-8 font-size-5">
                      Contact Info
                    </h5>

                    <div className="mb-7">
                      <p className="font-size-4 mb-0">Location</p>
                      <h5 className="font-size-4 font-weight-semibold mb-0 text-black-2 text-break">
                        New York , USA
                      </h5>
                    </div>

                    <div className="mb-7">
                      <p className="font-size-4 mb-0">E-mail</p>
                      <h5 className="font-size-4 font-weight-semibold mb-0">
                        <a
                          className="text-black-2 text-break"
                          href="mailto:name_ac@gmail.com"
                        >
                          name_ac@gmail.com
                        </a>
                      </h5>
                    </div>

                    <div className="mb-7">
                      <p className="font-size-4 mb-0">Phone</p>
                      <h5 className="font-size-4 font-weight-semibold mb-0">
                        <a
                          className="text-black-2 text-break"
                          href="tel:+999565562"
                        >
                          +999 565 562
                        </a>
                      </h5>
                    </div>

                    <div className="mb-7">
                      <p className="font-size-4 mb-0">Website Linked</p>
                      <h5 className="font-size-4 font-weight-semibold mb-0">
                        <a className="text-break" href="#">
                          www.nameac.com
                        </a>
                      </h5>
                    </div>
                  </div>
                  {/*----Employee's Personal Details----*/}
                  <div className="px-5 d-flex align-items-center justify-content-md-between flex-wrap">
                    <div className="row">
                      <div className="col-5">
                        {" "}
                        <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold text-left ">
                          Personal Details{" "}
                        </h4>{" "}
                      </div>
                      <div className="col"></div>
                      <div className="col mb-7 mt-5">
                        {" "}
                        <CustomButton
                          className="btn-primary rounded"
                          onClick={() => setShowPersonalDetails(true)}
                        >
                          Edit
                        </CustomButton>
                      </div>
                      <PersonalDetails
                        show={showPersonalDetails}
                        close={() => setShowPersonalDetails(false)}
                      />
                    </div>
                  </div>

                  <div className="w-100">
                    <div className="d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap">
                      <div className="w-100 mt-n2 text-left">
                        <div className="px-4 pt-lg-5 pt-9 pt-xl-9 pb-5">
                          <div className="mb-3">
                            <div className="row">
                              <div className="col-5">
                                <p className="font-size-4 mb-0">Age</p>
                                <h5 className="font-size-4 font-weight-semibold mb-0 text-black-2 text-break">
                                  23{" "}
                                </h5>
                              </div>
                              <div className="col-7">
                                <p className="font-size-4 mb-0">Gender</p>
                                <h5 className="font-size-4 font-weight-semibold mb-0 text-black-2 text-break">
                                  Male{" "}
                                </h5>
                              </div>
                            </div>
                          </div>
                          <div className="mb-3"></div>
                          <div className="mb-3">
                            <div className="row">
                              <div className="col-5">
                                <p className="font-size-4 mb-0">Category</p>
                                <h5 className="font-size-4 font-weight-semibold mb-0 text-black-2 text-break">
                                  General{" "}
                                </h5>
                              </div>
                              <div className="col-7">
                                <p className="font-size-4 mb-0">
                                  Marital Status
                                </p>
                                <h5 className="font-size-4 font-weight-semibold mb-0 text-black-2 text-break">
                                  single{" "}
                                </h5>
                              </div>
                            </div>
                          </div>
                          <div className="mb-3">
                            <div className="row">
                              <div className="col-5">
                                <p className="font-size-4 mb-0">Disablity</p>
                                <h5 className="font-size-4 font-weight-semibold mb-0 text-black-2 text-break">
                                  No{" "}
                                </h5>
                              </div>
                              <div className="col-7">
                                <p className="font-size-4 mb-0">Career Break</p>
                                <h5 className="font-size-4 font-weight-semibold mb-0 text-black-2 text-break">
                                  Np{" "}
                                </h5>
                              </div>
                            </div>
                          </div>
                          <div className="mb-3">
                            <p className="font-size-4 mb-0">
                              Languages Known
                              <a
                                className="mb-4 px-8"
                                href="#"
                                onClick={() => setShowPersonalDetails(true)}
                              >
                                <span className="fas fa-pencil-alt"> </span>
                              </a>
                            </p>
                            <h5 className="font-size-4 font-weight-semibold mb-0 text-black-2 text-break">
                              Hindi / English{" "}
                            </h5>
                          </div>
                          <div className="mb-3">
                            <p className="font-size-4 mb-0">
                              Permanent Address
                            </p>
                            <h5 className="font-size-4 font-weight-semibold mb-0 text-black-2 text-break">
                              24, near ram bag hoshangabad
                            </h5>
                          </div>
                          <div className="mb-3">
                            <p className="font-size-4 mb-0">Homwtown</p>
                            <h5 className="font-size-4 font-weight-semibold mb-0 text-black-2 text-break">
                              Hoshangabad
                            </h5>
                          </div>
                          <div className="mb-3">
                            <p className="font-size-4 mb-0">Pincode</p>
                            <h5 className="font-size-4 font-weight-semibold mb-0">
                              4501366
                            </h5>
                          </div>

                          <div className="mb-3">
                            <p className="font-size-4 mb-0">
                              Work Permit of Usa
                            </p>
                            <h5 className="font-size-4 font-weight-semibold mb-0">
                              Yes
                            </h5>
                          </div>

                          <div className="mb-3">
                            <p className="font-size-4 mb-0">
                              Work Permit of other country
                            </p>
                            <h5 className="font-size-4 font-weight-semibold mb-0">
                              No
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-xxl-6 col-lg-8 col-md-7 order-2 order-xl-1">
              <div className="bg-white rounded-4 shadow-9">
                {/*----Profile Header----*/}
                <ul
                  className="nav border-bottom border-mercury pl-12"
                  id="myTab"
                  role="tablist"
                >
                  <li className="tab-menu-items nav-item pr-12">
                    <a
                      className="active text-uppercase font-size-3 font-weight-bold text-default-color py-3"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      Overview
                    </a>
                  </li>
                  {/* <li className="tab-menu-items nav-item pr-12">
                    <a
                      className="text-uppercase font-size-3 font-weight-bold text-default-color py-3"
                      id="employement-tab"
                      data-toggle="tab"
                      href="#employement"
                      role="tab"
                      aria-controls="employement"
                      aria-selected="false"
                    >
                      Employment
                    </a>
                  </li>
                  <li className="tab-menu-items nav-item pr-12">
                    <a
                      className="text-uppercase font-size-3 font-weight-bold text-default-color py-3"
                      id="personal_details-tab"
                      data-toggle="tab"
                      href="#personal_details"
                      role="tab"
                      aria-controls="personal_details"
                      aria-selected="false"
                    >
                      Personal Details
                    </a>
                  </li>
                  <li className="tab-menu-items nav-item pr-12">
                    <a
                      className="text-uppercase font-size-3 font-weight-bold text-default-color py-3"
                      id="Career_Profile-tab"
                      data-toggle="tab"
                      href="#Career_Profile"
                      role="tab"
                      aria-controls="Career_Profile"
                      aria-selected="false"
                    >
                      Career Profile
                    </a>
                  </li>
                  <li className="tab-menu-items nav-item pr-12">
                    <a
                      className="text-uppercase font-size-3 font-weight-bold text-default-color py-3"
                      id="Projects-tab"
                      data-toggle="tab"
                      href="#Projects"
                      role="tab"
                      aria-controls="Projects"
                      aria-selected="false"
                    >
                      Projects
                    </a>
                  </li>
                  <li className="tab-menu-items nav-item pr-12">
                    <a
                      className="text-uppercase font-size-3 font-weight-bold text-default-color py-3"
                      id="Education-tab"
                      data-toggle="tab"
                      href="#Education"
                      role="tab"
                      aria-controls="Education"
                      aria-selected="false"
                    >
                      Education
                    </a>
                  </li>
                  <li className="tab-menu-items nav-item pr-12">
                    <a
                      className="text-uppercase font-size-3 font-weight-bold text-default-color py-3"
                      // id="Education-tab"
                      // data-toggle="tab"
                      href="#"
                      // role="tab"
                      // aria-controls="Education"
                      // aria-selected="false"
                      onClick={() => setShowPatents(true)}
                    >
                      Patent
                    </a>
                    <Patent
                      show={showPatents}
                      close={() => setShowPatents(false)}
                    />
                  </li>
                  <li className="tab-menu-items nav-item pr-12">
                    <a
                      className="text-uppercase font-size-3 font-weight-bold text-default-color py-3"
                      // id="Education-tab"
                      // data-toggle="tab"
                      href="#"
                      // role="tab"
                      // aria-controls="Education"
                      // aria-selected="false"
                      onClick={() => setShowCertificate(true)}
                    >
                      Certificate
                    </a>
                    <Certificate
                      show={showCertificate}
                      close={() => setShowCertificate(false)}
                    />
                  </li>{" "}
                  <li className="tab-menu-items nav-item pr-12">
                    <a
                      className="text-uppercase font-size-3 font-weight-bold text-default-color py-3"
                      id="skills-tab"
                      data-toggle="tab"
                      href="#skills"
                      role="tab"
                      aria-controls="skills"
                      aria-selected="false"
                    >
                      It Skills
                    </a>
                  </li>
                  <li className="tab-menu-items nav-item pr-12">
                    <a
                      className="text-uppercase font-size-3 font-weight-bold text-default-color py-3"
                      // id="skills-tab"
                      // data-toggle="tab"
                      href="#"
                      // role="tab"
                      // aria-controls="skills"
                      // aria-selected="false"
                      onClick={() => setShowOnlineProfile(true)}
                    >
                      Online profile
                    </a>
                    <OnlineProfile
                      show={showOnlineProfile}
                      close={() => setShowOnlineProfile(false)}
                    />
                  </li>
                  <li className="tab-menu-items nav-item pr-12">
                    <a
                      className="text-uppercase font-size-3 font-weight-bold text-default-color py-3"
                      // id="skills-tab"
                      // data-toggle="tab"
                      href="#"
                      // role="tab"
                      // aria-controls="skills"
                      // aria-selected="false"
                      onClick={() => setShowWorkSample(true)}
                    >
                      Work Sample
                    </a>
                    <WorkSample
                      show={showWorkSample}
                      close={() => setShowWorkSample(false)}
                    />
                  </li> */}
                </ul>
                {/*---Profile Details----*/}
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    {/*----About Employee----*/}
                    <div className="pr-xl-0 pr-xxl-14 p-5 px-xs-12 pt-7 pb-5">
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
                      className="border-top p-5 pl-xs-12 pt-7 pb-5 d-flex align-items-center justify-content-md-between flex-wrap"
                    >
                      <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold text-left">
                        Career Profile
                      </h4>
                      <CustomButton
                        className="btn-primary rounded"
                        onClick={() => setShowCareerProfile(true)}
                      >
                        Edit
                      </CustomButton>
                      <CareerProfile
                        show={showCareerProfile}
                        close={() => setShowCareerProfile(false)}
                      />
                      <div className="w-100">
                        <div className="d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap">
                          <div className="square-72 d-block mr-8 mb-7 mb-sm-0">
                            <img
                              src="image/l2/png/featured-job-logo-1.png"
                              alt=""
                            />
                          </div>
                          <div className="w-100 mt-n2">
                            <h3 className="mb-0">
                              <a
                                className="font-size-6 text-black-2 font-weight-semibold"
                                href="#"
                              >
                                Lead Product Designer
                              </a>
                            </h3>
                            <a
                              href="#"
                              className="font-size-4 text-default-color line-height-2"
                            >
                              Airabnb
                            </a>
                            <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                              <a
                                href="#"
                                className="font-size-4 text-gray mr-5"
                              >
                                Jun 2017 - April 2020- 3 years
                              </a>
                              <a href="#" className="font-size-3 text-gray">
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
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-100">
                        <div className="d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap">
                          <div className="square-72 d-block mr-8 mb-7 mb-sm-0">
                            <img
                              src="image/l1/png/feature-brand-1.png"
                              alt=""
                            />
                          </div>
                          <div className="w-100 mt-n2">
                            <h3 className="mb-0">
                              <a
                                className="font-size-6 text-black-2 font-weight-semibold"
                                href="#"
                              >
                                Senior UI/UX Designer
                              </a>
                            </h3>
                            <a
                              href="#"
                              className="font-size-4 text-default-color line-height-2"
                            >
                              Google Inc
                            </a>
                            <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                              <a
                                href="#"
                                className="font-size-3 text-gray mr-5"
                              >
                                Jun 2017 - April 2020- 3 years
                              </a>
                              <a href="#" className="font-size-3 text-gray">
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
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*----Employee's Education Profile----*/}
                    <div
                      id="Education"
                      className="border-top p-5 pl-xs-12 pt-7 pb-5 d-flex justify-content-md-between flex-wrap"
                    >
                      <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold text-left">
                        Education
                      </h4>
                      <CustomButton
                        className="btn-primary rounded"
                        onClick={() => setShowEducation(true)}
                      >
                        Edit
                      </CustomButton>
                      <EducationDetails
                        show={showEducation}
                        close={() => setShowEducation(false)}
                      />
                      <div className="w-100">
                        <div className="d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap">
                          <div className="square-72 d-block mr-8 mb-7 mb-sm-0">
                            <img src="image/svg/harvard.svg" alt="" />
                          </div>
                          <div className="w-100 mt-n2">
                            <h3 className="mb-0">
                              <a className="font-size-6 text-black-2" href="#">
                                Masters in Art Design
                              </a>
                            </h3>
                            <a
                              href="#"
                              className="font-size-4 text-default-color line-height-2"
                            >
                              Harvard University
                            </a>
                            <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                              <a
                                href="#"
                                className="font-size-3 text-gray mr-5"
                              >
                                Jun 2017 - April 2020- 3 years
                              </a>
                              <a href="#" className="font-size-3 text-gray">
                                <span
                                  className="mr-4"
                                  style={{ marginTop: "-2px" }}
                                >
                                  <img
                                    src="image/svg/icon-loaction-pin-black.svg"
                                    alt=""
                                  />
                                </span>
                                Brylin, USA
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-100">
                        <div className="d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap">
                          <div className="square-72 d-block mr-8 mb-7 mb-sm-0">
                            <img src="image/svg/mit.svg" alt="" />
                          </div>
                          <div className="w-100 mt-n2">
                            <h3 className="mb-0">
                              <a className="font-size-6 text-black-2" href="#">
                                Bachelor in Software Engineering{" "}
                              </a>
                            </h3>
                            <a
                              href="#"
                              className="font-size-4 text-default-color line-height-2"
                            >
                              Manipal Institute of Technology
                            </a>
                            <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                              <a
                                href="#"
                                className="font-size-3 text-gray mr-5"
                              >
                                Fed 2012 - April 2016 - 4 years
                              </a>
                              <a href="#" className="font-size-3 text-gray">
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
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*----Employee's Employement Profile----*/}
                    <div
                      className="border-top p-5 pl-xs-12 pt-7 pb-5"
                      id="employement"
                    >
                      <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                        <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold text-left">
                          Employment Details
                        </h4>
                        <CustomButton
                          className="btn-primary rounded"
                          onClick={() => setShowEmplyomentDetails(true)}
                        >
                          Edit
                        </CustomButton>
                        <EmployementDetails
                          show={showEmplyomentDetails}
                          close={() => setShowEmplyomentDetails(false)}
                        />
                      </div>

                      <div className="w-100">
                        <div className="d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap">
                          <div className="w-100 mt-n2 text-left">
                            <h3 className="mb-0">
                              <a className="font-size-6 text-black-2" href="#">
                                Fresh Graduate
                              </a>
                            </h3>
                            <small>Fresher</small>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*----Employee's Projects----*/}
                    <div
                      className="border-top p-5 pl-xs-12 pt-7 pb-5"
                      id="Projects"
                    >
                      <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                        <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold text-left">
                          Projects
                        </h4>
                        <CustomButton
                          className="btn-primary rounded"
                          onClick={() => setShowProjects(true)}
                        >
                          Edit
                        </CustomButton>
                        <Projects
                          show={showProjects}
                          close={() => setShowProjects(false)}
                        />
                      </div>

                      <div className="w-100">
                        <div className="d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap">
                          <div className="w-100 mt-n2 text-left">
                            <div className="px-4 pt-lg-5 pt-9 pt-xl-9 pb-5">
                              <div className="mb-3">
                                <h5 className="font-size-4 mb-0">
                                  Home Project
                                </h5>
                                <p className="font-size-4 font-weight-semibold mb-0  text-break">
                                  ABC
                                </p>
                              </div>
                              <div className="mb-3">
                                <h5 className="font-size-4 mb-0">
                                  Industry Project
                                </h5>
                                <p className="font-size-4 font-weight-semibold mb-0  text-break">
                                  Fresher
                                </p>
                              </div>
                            </div>
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
            </div>
            {/*----Other Experts----*/}
            <div className="col-12 col-xxl-3 col-md-4 offset-xxl-0 offset-lg-4 offset-md-5 order-3 order-xl-2 mt-xxl-0 mt-md-12">
              <div className="pl-lg-5">
                <h4 className="font-size-6 font-weight-semibold mb-0">
                  Other experts
                </h4>
                <ul className="list-unstyled">
                  <li className="border-bottom">
                    <a
                      className="media align-items-center py-9 flex-wrap"
                      href="#"
                    >
                      <div className="mr-7">
                        <img
                          className="square-72 rounded-3"
                          src="image/l3/png/team-member-1.png"
                          alt=""
                        />
                      </div>
                      <div className="">
                        <h4 className="mb-0 font-size-5 font-weight-semibold">
                          David Herison
                        </h4>
                        <p className="mb-0 font-size-3 heading-default-color">
                          UX/UI Designer
                        </p>
                        <span className="font-size-3 text-smoke">
                          <img
                            className="mr-2"
                            src="image/svg/icon-loaction-pin-black.svg"
                            alt=""
                          />
                          New York, USA
                        </span>
                      </div>
                    </a>
                  </li>

                  <li className="border-bottom">
                    <a
                      className="media align-items-center py-9 flex-wrap"
                      href="#"
                    >
                      <div className="mr-7">
                        <img
                          className="square-72 rounded-3"
                          src="image/l3/png/team-member-2.png"
                          alt=""
                        />
                      </div>
                      <div className="">
                        <h4 className="mb-0 font-size-5 font-weight-semibold">
                          Mark Zanitos
                        </h4>
                        <p className="mb-0 font-size-3 heading-default-color">
                          Lead Product Designer
                        </p>
                        <span className="font-size-3 text-smoke">
                          <img
                            className="mr-2"
                            src="image/svg/icon-loaction-pin-black.svg"
                            alt=""
                          />
                          New York, USA
                        </span>
                      </div>
                    </a>
                  </li>

                  <li className="border-bottom">
                    <a
                      className="media align-items-center py-9 flex-wrap"
                      href="#"
                    >
                      <div className="mr-7">
                        <img
                          className="square-72 rounded-3"
                          src="image/l3/png/team-member-3.png"
                          alt=""
                        />
                      </div>
                      <div className="">
                        <h4 className="mb-0 font-size-5 font-weight-semibold">
                          Anna Frankin
                        </h4>
                        <p className="mb-0 font-size-3 heading-default-color">
                          Visual Designer
                        </p>
                        <span className="font-size-3 text-smoke">
                          <img
                            className="mr-2"
                            src="image/svg/icon-loaction-pin-black.svg"
                            alt=""
                          />
                          New York, USA
                        </span>
                      </div>
                    </a>
                  </li>

                  <li className="border-bottom">
                    <a
                      className="media align-items-center py-9 flex-wrap"
                      href="#"
                    >
                      <div className="mr-7">
                        <img
                          className="square-72 rounded-3"
                          src="image/l3/png/team-member-4.png"
                          alt=""
                        />
                      </div>
                      <div className="">
                        <h4 className="mb-0 font-size-5 font-weight-semibold">
                          Jhony Vino
                        </h4>
                        <p className="mb-0 font-size-3 heading-default-color">
                          Creative Director
                        </p>
                        <span className="font-size-3 text-smoke">
                          <img
                            className="mr-2"
                            src="image/svg/icon-loaction-pin-black.svg"
                            alt=""
                          />
                          New York, USA
                        </span>
                      </div>
                    </a>
                  </li>

                  <li className="">
                    <a
                      className="media align-items-center py-9 flex-wrap"
                      href="#"
                    >
                      <div className="mr-7">
                        <img
                          className="square-72 rounded-3"
                          src="image/l3/png/team-member-5.png"
                          alt=""
                        />
                      </div>
                      <div className="">
                        <h4 className="mb-0 font-size-5 font-weight-semibold">
                          Aniasta Hemberg
                        </h4>
                        <p className="mb-0 font-size-3 heading-default-color">
                          Creative Director
                        </p>
                        <span className="font-size-3 text-smoke">
                          <img
                            className="mr-2"
                            src="image/svg/icon-loaction-pin-black.svg"
                            alt=""
                          />
                          New York, USA
                        </span>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <>
          {/* <Button variant="primary" onClick={handleShow}>
            Launch demo modal
          </Button> */}

          {/* <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Woohoo, you're reading this text in a modal!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal> */}
        </>
      </div>
      <EmployeeFooter />
    </div>
  );
};

export default UserProfile;
