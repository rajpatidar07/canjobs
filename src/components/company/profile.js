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
      <div className="bg-default-2 pt-30 pt-lg-22 pb-lg-27">
        <div className="container">
          {/* <!-- back Button --> */}
          {/* <div className="row justify-content-center">
            <div className="mt-8 dark-mode-texts col-12 translateY-25">
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
          </div> */}
          {/* <!-- back Button End --> */}
          <div className="row bg-white rounded-4 pt-11 shadow-9">
            {/* <!-- Company Profile --> */}
            <div className="w-100 row m-0 align-items-center px-12 mb-8 text-center text-xs-left">
              <div className="media align-items-center company_box col-10 p-0">
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
              <div
                className="company_info_box text-md-right fd-column col-2 m-0 p-0"
                title="Edit KYC Details"
              >
                <CustomButton
                  className="fas fa-pen font-size-3 rounded-3 btn-primary border-0"
                  onClick={() => setShowKycComplainDetailsModal(true)}
                />
                <KycComplianceDetails
                  show={showKycComplainDetailsModal}
                  close={() => setShowKycComplainDetailsModal(false)}
                />
              </div>
            </div>
            <div className="company_detail_box w-100 row m-0 pl-12 pt-5 pb-7 pr-12 pr-xxl-12">
              <div class="font-size-3 mb-4 mr-10" title="Industry">
                <i class="far fa-building mr-2"></i>
                Hotel
              </div>
              <div class="font-size-3 mb-4 mr-10" title="Business Type">
                <i class="fas fa-briefcase mr-2"></i>
                B2B
              </div>
              <div class="font-size-3 mb-4 mr-10" title="Company size">
                <i class="fas fa-user-friends mr-2"></i>
                50-60
              </div>
              <div class="font-size-3 mb-4 mr-10" title="Est. Since">
                <i class="fas fa-business-time mr-2"></i>
                1976
              </div>
              <div class="font-size-3 mb-4 mr-10" title="Website URL">
                <i class="fas fa-globe mr-2"></i>
                www.domain.com
              </div>
              <div class="font-size-3 mb-4 mr-10" title="Hiring for">
                <i class="fas fa-bullhorn mr-2"></i>
                Superwiser, Electrician, Driver
              </div>
              <div class="font-size-3 mb-4 mr-10" title="PAN">
                <span class="mr-2 font-weight-bold">PAN</span>
                AASD1234FF
              </div>
              <div class="font-size-3 mb-4 mr-10" title="TAN">
                <span class="mr-2 font-weight-bold">TAN</span>
                AASD1234FF
              </div>
              <div class="font-size-3 mb-4 mr-10" title="GSTIN">
                <span class="mr-2 font-weight-bold">GSTIN</span>
                AASD1234FF
              </div>
            </div>
            {/* <!-- Middle Body Start --> */}
            <div className="w-100 row m-0 pl-12 pt-10 pb-7 pr-12 pr-xxl-12 border-top">
              <CompanyDetailPage />

              <div className="col-md-8 col-xl-9 col-lg-8 col-12 ">
                <div>
                  <h4 className="text-black-2 mb-5 font-size-5 d-flex align-items-center justify-content-space-between">
                    <span>About Airbnb</span>
                    <CustomButton
                      className="fas fa-pen font-size-3 rounded-3 btn-primary border-0"
                      onClick={() => setShowCompanyInfoModal(true)}
                    ></CustomButton>
                    <CompanyDetails
                      title={"Edit Company de"}
                      show={showCompanyInfoModal}
                      close={() => setShowCompanyInfoModal(false)}
                    />
                  </h4>
                  <div className="pt-5 text-left">
                    <p className="font-size-4 mb-8">
                      If you’re like most of my clients, you know creative
                      content marketing and killer copywriting are fundamental
                      to the success of your business.
                    </p>
                    <p className="font-size-4 mb-8">
                      But with so much to do to keep your business growing, you
                      don’t have time to learn how to write sales copy that
                      actually sells, or create a content marketing strategy
                      that resonates with your target audience.
                    </p>
                    <p className="font-size-4  mb-8">
                      You’ve been disappointed with your traffic and conversions
                      so far, but with an overwhelming number of things to do,
                      you’ve put off doing anything about it until now.
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {1 == 1 ? null : <EmployeeFooter />}
    </div>
  );
}

export default CompanyProfile;
