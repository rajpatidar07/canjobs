import React, { useState } from "react";
import KycComplianceDetails from "../forms/employer/kyc";
import EmployeeHeader from "../common/header";
import EmployeeFooter from "../common/footer";
import CustomButton from "../common/button";
import { Link } from "react-router-dom";
import CompanyDetailPage from "./companydetail";
import CompanyDetails from "../forms/employer/companyDetail";

function CompanyProfile() {
  const [showCompanyInfoModal, setShowCompanyInfoModal] = useState(false);

  const [showKycComplainDetailsModal, setShowKycComplainDetailsModal] =
    useState(false);
  return (
    <div>
      <EmployeeHeader />
      <div className="bg-default-2 pt-16 pt-lg-22 pb-lg-27">
        <div className="container">
          {/* <!-- back Button --> */}
          <div className="row justify-content-center">
            <div className="mt-20 dark-mode-texts col-12 translateY-25">
              <div className="mb-9">
                <Link
                  className="d-flex align-items-center ml-4"
                  href="http://localhost:3000/"
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
          {/* <!-- back Button End --> */}
          <div className="row bg-white rounded-4 pt-11 shadow-9">
            {/* <!-- Company Profile --> */}
            <div className="w-100 row m-0 align-items-center pl-xs-12 mb-8 text-center text-xs-left">
              <div className="media align-items-center company_box col-md-6 p-0">
                <Link className="text_box text-left" href="/jobdetail">
                  <img
                    className="company_logo"
                    src="https://findlogovector.com/wp-content/uploads/2018/12/huggies-brand-logo-vector.png"
                    alt=""
                  />
                </Link>
                <Link className="text_box text-left w-100" href="/jobdetail">
                  <h3 className="mb-0 font-size-6 heading-dark-color">
                    Apple INC
                  </h3>
                  <p className="font-size-3 text-default-color line-height-2 m-0">
                    Online Marketplace
                  </p>
                </Link>
              </div>
              <div className="company_info_box col-md-6 m-0 p-0">
                <small className="w-100"><strong>PAN:</strong>AASD1234FF</small>
                <small className="w-100"><strong>TAN:</strong>AASD1234FF</small>
                <small className="w-100"><strong>GSTIN:</strong>AASD1234FF</small>
              </div>
            </div>
            <div className="company_info_box w-100 row m-0 pl-12 pt-10 pb-7 pr-12 pr-xxl-12 border-top">
              <div class="font-size-4 mb-4 mr-24" title="Industry">
                <img class="mr-2" src="image/icons/envelope.svg" alt="" />
                Hotel
              </div>
              <div class="font-size-4 mb-4 mr-24" title="Company size">
                <img class="mr-2" src="image/icons/envelope.svg" alt="" />
                50-60
              </div>
              <div class="font-size-4 mb-4 mr-24" title="Company exist since">
                <img class="mr-2" src="image/icons/envelope.svg" alt="" />
                1976
              </div>
              <div class="font-size-4 mb-4 mr-24" title="Website URL">
                <img class="mr-2" src="image/icons/envelope.svg" alt="" />
                www.domain.com
              </div>
            </div>
            {/* <!-- Middle Body Start --> */}
            <div className="w-100 row m-0 pl-12 pt-10 pb-7 pr-12 pr-xxl-12 border-top">
              <CompanyDetailPage />

              <div className="col-md-8 col-xl-9 col-lg-8 col-12 ">
                <div className="row text-left pt-5 ">
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
                        <Link
                          className="text-smoke circle-32 bg-concrete mr-5 hover-bg-green"
                          href="http://localhost:3000/"
                        >
                          <i className="fab fa-linkedin-in"></i>
                        </Link>
                        <Link
                          className="text-smoke circle-32 bg-concrete mr-5 hover-bg-green"
                          href="http://localhost:3000/"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </Link>
                        <Link
                          className="text-smoke circle-32 bg-concrete mr-5 hover-bg-green"
                          href="http://localhost:3000/"
                        >
                          <i className="fab fa-twitter"></i>
                        </Link>
                        <Link
                          className="text-smoke circle-32 bg-concrete mr-5 hover-bg-green"
                          href="http://localhost:3000/"
                        >
                          <i className="fa fa-globe"></i>
                        </Link>
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
              </div>
            </div>
            {/* <!-- Middle Body End --> */}
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
                {/* {showAccountDetails === false &&
                      showCompanyDetails === false &&
                      showKycComplainDetails === false ? ( */}
                <div>
                  <h4 className="text-black-2 mb-5 font-size-5 d-flex align-items-center justify-content-space-between">
                    <span>About Airbnb</span>
                    <CustomButton
                      className="fas fa-pen font-size-3 rounded-3 btn-primary border-0"
                      onClick={() => setShowCompanyInfoModal(true)}
                    >
                    </CustomButton>
                    <CompanyDetails
                      show={showCompanyInfoModal}
                      close={() => setShowCompanyInfoModal(false)}
                    />
                  </h4>
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
                {/* ) : null} */}

                {/* <!-- Company Details --> */}
                {/* {showCompanyDetails === true ? ( */}

                {/* ) : null} */}
                {/* <!-- KYC Details --> */}
                {/* {showKycComplainDetails === true ? ( */}
                <div>
                  <h4 className="text-black-2 mb-5 font-size-5 d-flex align-items-center justify-content-space-between">
                    <span>KYC Details</span>
                    <CustomButton
                      className="fas fa-pen font-size-3 rounded-3 btn-primary border-0"
                      onClick={() => setShowKycComplainDetailsModal(true)}
                    />
                    <KycComplianceDetails
                      show={showKycComplainDetailsModal}
                      close={() => setShowKycComplainDetailsModal(false)}
                    />
                  </h4>
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
                {/* ) : null} */}
                {/* <!-- Excerpt End --> */}
              </div>{" "}
            </div>
            {/* <!-- Tab Content End --> */}

            {/* <!-- Tab Section End --> */}
            {/* <!-- Company Profile End --> */}
            {/* <!-- Sidebar --> */}


            {/* <!-- end Sidebar --> */}
          </div>
        </div>
      </div>
      <EmployeeFooter />
    </div>
  );
}

export default CompanyProfile;
