import React, { useState } from "react";
import AccountDetails from "./modal/accountDetailsModal";
import CompanyDetails from "./modal/companyDetailsModal";
import KycComplianceDetails from "./modal/kycComplianceDetails";
import CompanyInfo from "./modal/companyInfoModal";
import EmployeeHeader from "../../employee/header";
import EmployeeFooter from "../../employee/footer";
import CustomButton from "../../comman/button";
import { Link } from "react-router-dom";
function CompanyProfile() {
  const [showAccountDetailsModal, setShowAccountDetailsModal] = useState(false);
  const [showCompanyDetailsModal, setShowCompanyDetailsModal] = useState(false);
  const [
    showKycComplainDetailsModal,
    setShowKycComplainDetailsModal,
  ] = useState(false);
  const [showCompanyInfoModal, setShowCompanyInfoModal] = useState(false);
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [showCompanyDetails, setShowCompanyDetails] = useState(false);
  const [showKycComplainDetails, setShowKycComplainDetails] = useState(false);

  return (
    <div>
      <EmployeeHeader />
      <div className="bg-default-2 pt-16 pt-lg-22 pb-lg-27">
        <div className="container">
          {/* <!-- back Button --> */}
          <div className="row justify-content-center">
            <div className="col-12 mt-13 dark-mode-texts">
              <div className="mb-9">
                <a
                  className="d-flex align-items-center ml-4"
                  href="http://localhost:3000/"
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
          {/* <!-- back Button End --> */}
          <div className="row ">
            {/* <!-- Company Profile --> */}
            <div className="col-12 col-xl-9 col-lg-8">
              <div className="bg-white rounded-4 pt-11 shadow-9">
                <div className="d-xs-flex align-items-center pl-xs-12 mb-8 text-center text-xs-left">
                  <a
                    className="mr-xs-7 mb-5 mb-xs-0"
                    href="http://localhost:3000/"
                  >
                    <img
                      className="square-72 rounded-6"
                      src="image/l2/png/featured-job-logo-1.png"
                      alt=""
                    />
                  </a>
                  <div className="">
                    <h2 className="mt-xs-n5">
                      <a
                        className="font-size-6 text-black-2 font-weight-semibold"
                        href="http://localhost:3000/"
                      >
                        Airbnb INC.
                      </a>
                    </h2>
                    <span className="mb-0 text-gray font-size-4">
                      Online Marketplace
                    </span>
                  </div>
                </div>
                {/* <!-- Tab Section Start --> */}
                <ul
                  className="nav border-bottom border-mercury pl-12"
                  id="myTab"
                  role="tablist"
                >
                  <li className="tab-menu-items nav-item pr-12">
                    <Link
                      className={
                        showAccountDetails === false &&
                        showCompanyDetails === false &&
                        showKycComplainDetails === false
                          ? "active text-uppercase font-size-3 font-weight-bold text-default-color py-3"
                          : " text-uppercase font-size-3 font-weight-bold text-default-color py-3"
                      }
                      onClick={() => {
                        setShowCompanyDetails(false);
                        setShowKycComplainDetails(false);
                        setShowAccountDetails(false);
                      }}
                      to={""}
                    >
                      Company
                    </Link>
                  </li>
                  <li className="tab-menu-items nav-item pr-12">
                    <Link
                      className={
                        showAccountDetails === true
                          ? "active text-uppercase font-size-3 font-weight-bold text-default-color py-3"
                          : "text-uppercase font-size-3 font-weight-bold text-default-color py-3"
                      }
                      to={""}
                      onClick={() => {
                        setShowCompanyDetails(false);
                        setShowKycComplainDetails(false);
                        setShowAccountDetails(true);
                      }}
                    >
                      Account Details
                    </Link>
                  </li>
                  <li className="tab-menu-items nav-item pr-12">
                    <Link
                      className={
                        showCompanyDetails === true
                          ? "active text-uppercase font-size-3 font-weight-bold text-default-color py-3"
                          : "text-uppercase font-size-3 font-weight-bold text-default-color py-3"
                      }
                      to={""}
                      onClick={() => {
                        setShowCompanyDetails(true);
                        setShowKycComplainDetails(false);
                        setShowAccountDetails(false);
                      }}
                    >
                      Company Details
                    </Link>
                  </li>
                  <li className="tab-menu-items nav-item pr-12">
                    <Link
                      className={
                        showKycComplainDetails === true
                          ? "active text-uppercase font-size-3 font-weight-bold text-default-color py-3"
                          : "text-uppercase font-size-3 font-weight-bold text-default-color py-3"
                      }
                      to={""}
                      onClick={() => {
                        setShowCompanyDetails(false);
                        setShowKycComplainDetails(true);
                        setShowAccountDetails(false);
                      }}
                    >
                      KYC Details
                    </Link>
                  </li>
                </ul>
                {/* <!-- Tab Content --> */}
                <div
                  className="tab-content pl-12 pt-10 pb-7 pr-12 pr-xxl-24"
                  id="myTabContent"
                >
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    {/* <!-- Excerpt Start --> */}
                    {/* <!-- Company Info  --> */}
                    {showAccountDetails === false &&
                    showCompanyDetails === false &&
                    showKycComplainDetails === false ? (
                      <div>
                        <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                          <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold text-left">
                            About Airbnb
                          </h4>
                          <CustomButton
                            className="font-size-3 rounded-3 btn-primary border-0"
                            onClick={() => setShowCompanyInfoModal(true)}
                          >
                            Edit
                          </CustomButton>
                          <CompanyInfo
                            show={showCompanyInfoModal}
                            close={() => setShowCompanyInfoModal(false)}
                          />
                        </div>
                        <div className="pt-5 text-left">
                          <p className="font-size-4 mb-8">
                            If you’re like most of my clients, you know creative
                            content marketing and killer copywriting are
                            fundamental to the success of your business.
                          </p>
                          <p className="font-size-4 mb-8">
                            But with so much to do to keep your business
                            growing, you don’t have time to learn how to write
                            sales copy that actually sells, or create a content
                            marketing strategy that resonates with your target
                            audience.
                          </p>
                          <p className="font-size-4  mb-8">
                            You’ve been disappointed with your traffic and
                            conversions so far, but with an overwhelming number
                            of things to do, you’ve put off doing anything about
                            it until now.
                          </p>
                          <p className="font-size-4 mb-8">
                            So you’ve come to Upwork, looking for someone that
                            can craft creative content and killer sales copy to
                            help you reach more people and make more sales.
                          </p>
                          <p className="font-size-4 mb-8">
                            But your troubles aren’t over just yet; it isn’t
                            easy to find someone who can create the high-quality
                            content you need. But your troubles aren’t over just
                            yet.
                          </p>
                        </div>
                      </div>
                    ) : null}

                    {/* <!-- Account Details --> */}
                    {showAccountDetails === true ? (
                      <div className="">
                        <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                          <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold text-left">
                            Account Details
                          </h4>
                          <CustomButton
                            className="font-size-3 rounded-3 btn-primary border-0"
                            onClick={() => setShowAccountDetailsModal(true)}
                          >
                            Edit
                          </CustomButton>
                          <AccountDetails
                            show={showAccountDetailsModal}
                            close={() => setShowAccountDetailsModal(false)}
                          />
                        </div>
                        <div className="pt-5 text-left row">
                          <div className="col-md-3">
                            {" "}
                            <h5 className="mb-0 font-size-5 font-weight-semibold text-gray">
                              User Name
                            </h5>
                            <p className="font-size-4 mb-8">Shan Maxio</p>
                          </div>
                          <div className="col-md-3">
                            {" "}
                            <h5 className="mb-0 font-size-5 font-weight-semibold text-gray">
                              E-mail
                            </h5>
                            <p className="font-size-4 mb-8">Shan23@gmail.com</p>
                          </div>
                          <div className="col-md-3">
                            {" "}
                            <h5 className="mb-0 font-size-5 font-weight-semibold text-gray">
                              Role
                            </h5>
                            <p className="font-size-4 mb-8">Data analytics</p>
                          </div>
                          <div className="col-md-3">
                            {" "}
                            <h5 className="mb-0 font-size-5 font-weight-semibold text-gray">
                              Reporting Manager
                            </h5>
                            <p className="font-size-4 mb-8">Shaq Aasif</p>
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {/* <!-- Company Details --> */}
                    {showCompanyDetails === true ? (
                      <div className="">
                        <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                          <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold text-left">
                            Company Details
                          </h4>
                          <CustomButton
                            className="font-size-3 rounded-3 btn-primary border-0"
                            onClick={() => setShowCompanyDetailsModal(true)}
                          >
                            Edit
                          </CustomButton>
                          <CompanyDetails
                            show={showCompanyDetailsModal}
                            close={() => setShowCompanyDetailsModal(false)}
                          />
                        </div>
                        <div className="pt-5 text-left row">
                          <div className="col-md-3">
                            {" "}
                            <h5 className="mb-0 font-size-5 font-weight-semibold text-gray">
                              Company Type
                            </h5>
                            <p className="font-size-4 mb-8">It</p>
                          </div>
                          <div className="col-md-3">
                            {" "}
                            <h5 className="mb-0 font-size-5 font-weight-semibold text-gray">
                              Industry
                            </h5>
                            <p className="font-size-4 mb-8">It</p>
                          </div>
                          <div className="col-md-3">
                            {" "}
                            <h5 className="mb-0 font-size-5 font-weight-semibold text-gray">
                              Contact Person
                            </h5>
                            <p className="font-size-4 mb-8">Shaq Muqlit</p>
                          </div>
                          <div className="col-md-3">
                            {" "}
                            <h5 className="mb-0 font-size-5 font-weight-semibold text-gray">
                              Alias
                            </h5>
                            <p className="font-size-4 mb-8">Baba</p>
                          </div>
                        </div>
                        <div className="pt-5 text-left row">
                          <div className="col-md-3">
                            {" "}
                            <h5 className="mb-0 font-size-5 font-weight-semibold text-gray">
                              Contact Person's Designation
                            </h5>
                            <p className="font-size-4 mb-8">Manager</p>
                          </div>
                          <div className="col-md-3">
                            {" "}
                            <h5 className="mb-0 font-size-5 font-weight-semibold text-gray">
                              Website Url
                            </h5>
                            <p className="font-size-4 mb-8">www.skjd.com</p>
                          </div>
                          <div className="col-md-3">
                            {" "}
                            <h5 className="mb-0 font-size-5 font-weight-semibold text-gray">
                              Profile for Hot Vacancies
                            </h5>
                            <p className="font-size-4 mb-8">
                              Frontend developer
                            </p>
                          </div>
                          <div className="col-md-3">
                            {" "}
                            <h5 className="mb-0 font-size-5 font-weight-semibold text-gray">
                              Profile for Classifieds
                            </h5>
                            <p className="font-size-4 mb-8">BCA / MCA / BE</p>
                          </div>
                        </div>
                        <div className="pt-5 text-left row">
                          <div className="col-md-3">
                            {" "}
                            <h5 className="mb-0 font-size-5 font-weight-semibold text-gray">
                              Phone Number 1
                            </h5>
                            <p className="font-size-4 mb-8">+ 632 740 4445</p>
                          </div>
                          <div className="col-md-3">
                            {" "}
                            <h5 className="mb-0 font-size-5 font-weight-semibold text-gray">
                              Phone Number 2
                            </h5>
                            <p className="font-size-4 mb-8">+ 852 987 9510</p>
                          </div>
                          <div className="col-md-3">
                            {" "}
                            <h5 className="mb-0 font-size-5 font-weight-semibold text-gray">
                              Fax Number
                            </h5>
                            <p className="font-size-4 mb-8">Fax Number :</p>
                          </div>
                          <div className="col-md-3">
                            {" "}
                            <h5 className="mb-0 font-size-5 font-weight-semibold text-gray">
                              Tax Number :
                            </h5>
                            <p className="font-size-4 mb-8">963201100145785</p>
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {/* <!-- KYC Details --> */}
                    {showKycComplainDetails === true ? (
                      <div className="">
                        <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                          <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold text-left">
                            KYC Details
                          </h4>
                          <CustomButton
                            className="font-size-3 rounded-3 btn-primary border-0"
                            onClick={() => setShowKycComplainDetailsModal(true)}
                          >
                            Edit
                          </CustomButton>
                          <KycComplianceDetails
                            show={showKycComplainDetailsModal}
                            close={() => setShowKycComplainDetailsModal(false)}
                          />
                        </div>
                        <div className="pt-5 text-left row">
                          <div className="col-md-3">
                            {" "}
                            <h5 className="mb-0 font-size-5 font-weight-semibold text-gray">
                              KYC Status
                            </h5>
                            <p className="font-size-4 mb-8">Active</p>
                          </div>
                          <div className="col-md-3">
                            {" "}
                            <h5 className="mb-0 font-size-5 font-weight-semibold text-gray">
                              PAN Number
                            </h5>
                            <p className="font-size-4 mb-8">01236574110</p>
                          </div>
                          <div className="col-md-3">
                            {" "}
                            <h5 className="mb-0 font-size-5 font-weight-semibold text-gray">
                              Name on PAN Card
                            </h5>
                            <p className="font-size-4 mb-8">Shaq Muqlit</p>
                          </div>
                          <div className="col-md-3">
                            {" "}
                            <h5 className="mb-0 font-size-5 font-weight-semibold text-gray">
                              Date on PAN Card
                            </h5>
                            <p className="font-size-4 mb-8">28/03/2024</p>
                          </div>
                        </div>
                        <div className="pt-5 text-left row">
                          <div className="col-md-3">
                            {" "}
                            <h5 className="mb-0 font-size-5 font-weight-semibold text-gray">
                              Address Label
                            </h5>
                            <p className="font-size-4 mb-8">Near C21</p>
                          </div>
                          <div className="col-md-3">
                            {" "}
                            <h5 className="mb-0 font-size-5 font-weight-semibold text-gray">
                              Address
                            </h5>
                            <p className="font-size-4 mb-8">Royal valley</p>
                          </div>
                          <div className="col-md-3">
                            {" "}
                            <h5 className="mb-0 font-size-5 font-weight-semibold text-gray">
                              State
                            </h5>
                            <p className="font-size-4 mb-8">U.P</p>
                          </div>
                          <div className="col-md-3">
                            {" "}
                            <h5 className="mb-0 font-size-5 font-weight-semibold text-gray">
                              City
                            </h5>
                            <p className="font-size-4 mb-8">Indore</p>
                          </div>
                        </div>
                        <div className="pt-5 text-left row">
                          <div className="col-md-3">
                            {" "}
                            <h5 className="mb-0 font-size-5 font-weight-semibold text-gray">
                              Pincode
                            </h5>
                            <p className="font-size-4 mb-8">204445</p>
                          </div>
                          <div className="col-md-3">
                            {" "}
                            <h5 className="mb-0 font-size-5 font-weight-semibold text-gray">
                              GSTIN
                            </h5>
                            <p className="font-size-4 mb-8">Smart building</p>
                          </div>
                          <div className="col-md-3">
                            {" "}
                            <h5 className="mb-0 font-size-5 font-weight-semibold text-gray">
                              Fax Number
                            </h5>
                            <p className="font-size-4 mb-8">Fax Number :</p>
                          </div>
                          <div className="col-md-3">
                            {" "}
                            <h5 className="mb-0 font-size-5 font-weight-semibold text-gray">
                              Tax Number :
                            </h5>
                            <p className="font-size-4 mb-8">963201100145785</p>
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {/* <!-- Excerpt End --> */}
                  </div>{" "}
                  {/* <!-- Middle Body Start --> */}
                  <div className="row text-left pt-5 border-top">
                    {/* <!-- Single Widgets Start --> */}
                    <div className="col-12 col-lg-4 col-md-4 col-xs-6">
                      <div className="mb-8">
                        <p className="font-size-4">Company size</p>
                        <h5 className="font-size-4 font-weight-semibold text-black-2">
                          11-50 employees
                        </h5>
                      </div>
                      <div className="mb-8">
                        <p className="font-size-4">Est. Since</p>
                        <h5 className="font-size-4 font-weight-semibold text-black-2">
                          2020
                        </h5>
                      </div>
                    </div>
                    {/* <!-- Single Widgets End --> */}
                    {/* <!-- Single Widgets Start --> */}
                    <div className="col-12 col-lg-4 col-md-4 col-xs-6">
                      <div className="mb-8">
                        <p className="font-size-4">Type of corporation</p>
                        <h5 className="font-size-4 font-weight-semibold text-black-2">
                          B2B & B2C
                        </h5>
                      </div>
                      <div className="mb-8">
                        <p className="font-size-4">Social Media</p>
                        <div className="icon-link d-flex align-items-center">
                          <a
                            className="text-smoke circle-32 bg-concrete mr-5 hover-bg-green"
                            href="http://localhost:3000/"
                          >
                            <i className="fab fa-linkedin-in"></i>
                          </a>
                          <a
                            className="text-smoke circle-32 bg-concrete mr-5 hover-bg-green"
                            href="http://localhost:3000/"
                          >
                            <i className="fab fa-facebook-f"></i>
                          </a>
                          <a
                            className="text-smoke circle-32 bg-concrete mr-5 hover-bg-green"
                            href="http://localhost:3000/"
                          >
                            <i className="fab fa-twitter"></i>
                          </a>
                          <a
                            className="text-smoke circle-32 bg-concrete mr-5 hover-bg-green"
                            href="http://localhost:3000/"
                          >
                            <i className="fa fa-globe"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    {/* <!-- Single Widgets End --> */}
                    {/* <!-- Single Widgets Start --> */}
                    <div className="col-12 col-lg-4 col-md-4 col-xs-6">
                      <div className="mb-8">
                        <p className="font-size-4">Location</p>
                        <h5 className="font-size-4 font-weight-semibold text-black-2">
                          New York City
                        </h5>
                      </div>
                    </div>
                    {/* <!-- Single Widgets End --> */}
                  </div>
                  {/* <!-- Middle Body End --> */}
                  <div
                    className="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    {/* <!-- Middle Body Start --> */}
                    <div className="row">
                      {/* <!-- Single Widgets Start --> */}
                      <div className="col-12 col-lg-4 col-md-4 col-xs-6">
                        <div className="mb-8">
                          <p className="font-size-4">Company size</p>
                          <h5 className="font-size-4 font-weight-semibold">
                            11-50 employees
                          </h5>
                        </div>
                        <div className="mb-8">
                          <p className="font-size-4">Est. Since</p>
                          <h5 className="font-size-4 font-weight-semibold">
                            2020
                          </h5>
                        </div>
                      </div>
                      {/* <!-- Single Widgets End --> */}
                      {/* <!-- Single Widgets Start --> */}
                      <div className="col-12 col-lg-4 col-md-4 col-xs-6">
                        <div className="mb-8">
                          <p className="font-size-4">Type of corporation</p>
                          <h5 className="font-size-4 font-weight-semibold">
                            B2B & B2C
                          </h5>
                        </div>
                        <div className="mb-8">
                          <p className="font-size-4">Social Media</p>
                          <div className="icon-link d-flex align-items-center">
                            <a
                              className="text-smoke circle-32 bg-concrete mr-5"
                              href="http://localhost:3000/"
                            >
                              <i className="fab fa-linkedin"></i>
                            </a>
                            <a
                              className="text-smoke circle-32 bg-concrete mr-5"
                              href="http://localhost:3000/"
                            >
                              <i className="fab fa-facebook-f"></i>
                            </a>
                            <a
                              className="text-smoke circle-32 bg-concrete mr-5"
                              href="http://localhost:3000/"
                            >
                              <i className="fab fa-twitter"></i>
                            </a>
                            <a
                              className="text-smoke circle-32 bg-concrete mr-5"
                              href="http://localhost:3000/"
                            >
                              <i className="fa fa-globe"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      {/* <!-- Single Widgets End --> */}
                      {/* <!-- Single Widgets Start --> */}
                      <div className="col-12 col-lg-4 col-md-4 col-xs-6">
                        <div className="mb-8">
                          <p className="font-size-4">Location</p>
                          <h5 className="font-size-4 font-weight-semibold">
                            New York City
                          </h5>
                        </div>
                      </div>
                      {/* <!-- Single Widgets End --> */}
                    </div>
                    {/* <!-- Middle Body End --> */}
                    {/* <!-- Excerpt Start --> */}
                    <div className="pr-xl-0 pr-xxl-22 pt-5">
                      <h4 className="font-size-6 mb-7">Job Airbnb</h4>
                      <p className="font-size-4 mb-8">
                        If you’re like most of my clients, you know creative
                        content marketing and killer copywriting are fundamental
                        to the success of your business.
                      </p>
                      <p className="font-size-4 mb-8">
                        But with so much to do to keep your business growing,
                        you don’t have time to learn how to write sales copy
                        that actually sells, or create a content marketing
                        strategy that resonates with your target audience.
                      </p>
                      <p className="font-size-4  mb-8">
                        You’ve been disappointed with your traffic and
                        conversions so far, but with an overwhelming number of
                        things to do, you’ve put off doing anything about it
                        until now.
                      </p>
                      <p className="font-size-4 mb-8">
                        So you’ve come to Upwork, looking for someone that can
                        craft creative content and killer sales copy to help you
                        reach more people and make more sales.
                      </p>
                      <p className="font-size-4 mb-8">
                        But your troubles aren’t over just yet; it isn’t easy to
                        find someone who can create the high-quality content you
                        need. But your troubles aren’t over just yet.
                      </p>
                    </div>
                    {/* <!-- Excerpt End --> */}
                  </div>
                </div>
                {/* <!-- Tab Content End --> */}
                {/* <!-- Tab Section End --> */}
              </div>
            </div>
            {/* <!-- Company Profile End --> */}
            {/* <!-- Sidebar --> */}
            <div className="col-12 col-xl-3 col-lg-4 col-md-5 col-sm-6">
              <div className="pt-11 pt-lg-0 pl-lg-5">
                <h4 className="font-size-6 font-weight-semibold mb-0">
                  Similar Companies
                </h4>
                <ul className="list-unstyled">
                  {/* <!-- Single List --> */}
                  <li className="border-bottom">
                    <a
                      className="media align-items-center py-9"
                      href="http://localhost:3000/"
                    >
                      <div className="mr-7">
                        <img
                          className="square-72 rounded-5"
                          src="image/l1/png/feature-brand-1.png"
                          alt=""
                        />
                      </div>
                      <div className="mt-n4">
                        <h4 className="mb-0 font-size-6 font-weight-semibold">
                          Google INC.
                        </h4>
                        <p className="mb-0 font-size-4">Online Marketplace</p>
                      </div>
                    </a>
                  </li>
                  {/* <!-- Single List End --> */}
                  {/* <!-- Single List --> */}
                  <li className="border-bottom">
                    <a
                      className="media align-items-center py-9"
                      href="http://localhost:3000/"
                    >
                      <div className="mr-7">
                        <img
                          className="square-72 rounded-5"
                          src="image/l1/png/feature-brand-4.png"
                          alt=""
                        />
                      </div>
                      <div className="mt-n4">
                        <h4 className="mb-0 font-size-6 font-weight-semibold">
                          Uber
                        </h4>
                        <p className="mb-0 font-size-4">Ride Sharing Company</p>
                      </div>
                    </a>
                  </li>
                  {/* <!-- Single List End --> */}
                  {/* <!-- Single List --> */}
                  <li className="border-bottom">
                    <a
                      className="media align-items-center py-9"
                      href="http://localhost:3000/"
                    >
                      <div className="mr-7">
                        <img
                          className="square-72 rounded-5"
                          src="image/l1/png/feature-brand-5.png"
                          alt=""
                        />
                      </div>
                      <div className="mt-n4">
                        <h4 className="mb-0 font-size-6 font-weight-semibold">
                          Facebook
                        </h4>
                        <p className="mb-0 font-size-4">Social Network</p>
                      </div>
                    </a>
                  </li>
                  {/* <!-- Single List End --> */}
                  {/* <!-- Single List --> */}
                  <li className="border-bottom">
                    <a
                      className="media align-items-center py-9"
                      href="http://localhost:3000/"
                    >
                      <div className="mr-5">
                        <img
                          className="square-72 rounded-5"
                          src="image/l3/png/github-mark.png"
                          alt=""
                        />
                      </div>
                      <div className="mt-n4">
                        <h4 className="mb-0 font-size-6 font-weight-semibold">
                          GitHub
                        </h4>
                        <p className="mb-0 font-size-4">Online Software</p>
                      </div>
                    </a>
                  </li>
                  {/* <!-- Single List End --> */}
                  {/* <!-- Single List --> */}
                  <li className="">
                    <a
                      className="media align-items-center py-9"
                      href="http://localhost:3000/"
                    >
                      <div className="mr-7">
                        <img
                          className="square-72 rounded-5"
                          src="image/l3/png/universal.png"
                          alt=""
                        />
                      </div>
                      <div className="mt-n4">
                        <h4 className="mb-0 font-size-6 font-weight-semibold">
                          Uniliver
                        </h4>
                        <p className="mb-0 font-size-4">Manufacturer</p>
                      </div>
                    </a>
                  </li>
                  {/* <!-- Single List End --> */}
                </ul>
              </div>
            </div>
            {/* <!-- end Sidebar --> */}
          </div>
        </div>
      </div>
      <EmployeeFooter />
    </div>
  );
}

export default CompanyProfile;
