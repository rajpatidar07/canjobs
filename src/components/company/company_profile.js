import React, { useState, useEffect } from "react";
import KycComplianceDetails from "../forms/employer/kyc";
import EmployeeHeader from "../common/header";
import EmployeeFooter from "../common/footer";
import CustomButton from "../common/button";
import CompanyDetailPage from "./companydetail";
import CompanyDetails from "../forms/employer/companyDetail";
import { EmployerDetails } from "../../api/api";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../common/loader";
import { Link, useNavigate } from "react-router-dom";
import EmployerDocumentModal from "../forms/admin/EmployerDocumetModal";
import { PiPencilDuotone } from "react-icons/pi";
import AdminHeader from "../admin/header";
import AdminSidebar from "../admin/sidebar";
import JobTable from "../common/jobTable";
import DocumrentContainer from "..//common/employerDocumentContainer";
import Interview from "../common/interviewTable";
import AddCompanyfollowup from "../common/companyFollowUp";
import { BsEnvelope } from "react-icons/bs";
import { RiMailSendLine } from "react-icons/ri";
import { BiPhoneCall } from "react-icons/bi";
function CompanyProfileDetail(props) {
  const user_type = localStorage.getItem("userType");
  const company_id = localStorage.getItem("company_id");
  let cid = company_id;
  let navigate = useNavigate();
  /*Show modal and data state */
  const [lima, setLmia] = useState(false);
  let [apiCall, setApiCall] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  let [showDoc, setShowDoc] = useState(false);
  const [showCompanyInfoModal, setShowCompanyInfoModal] = useState(false);
  const [showKycComplainDetailsModal, setShowKycComplainDetailsModal] =
    useState(false);
  const [TabActive, setTabActive] = useState("profile");
  const [employerData, setEmployerData] = useState("");
  const [employerKycData, setEmployerKycData] = useState("");

  /*Function to get employer data */
  const EmployerData = async () => {
    try {
      let userData = await EmployerDetails(cid);
      localStorage.setItem(
        "profile_photo",
        userData.data.company_detail[0].logo
      );
      if (userData === undefined) {
        setEmployerData("");
        setEmployerKycData("");
      } else if (
        userData.data.kyc_detail.length === 0 ||
        userData.data.kyc_detail === undefined ||
        userData.data.kyc_detail === "0" ||
        userData.data.kyc_detail === [] ||
        userData.data.kyc_detail === null
      ) {
        setEmployerKycData("");
        setEmployerData(userData.data.company_detail[0]);
        setIsLoading(false);
      } else {
        setEmployerData(userData.data.company_detail[0]);
        setEmployerKycData(userData.data.kyc_detail[0]);
        setIsLoading(false);
      }
    } catch (err) {
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    }
  };
  /*Render method to get employer data */
  useEffect(() => {
    EmployerData();
    if (apiCall === true) {
      setApiCall(false);
    }
  }, [apiCall]);

  return (
    <div>
      <AdminHeader
        heading={
          <Link
            className="d-flex align-items-center "
            onClick={() => navigate(-1)}
          >
            <i className="icon icon-small-left bg-white circle-30 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
            <span className="text-uppercase font-size-3 font-weight-bold text-gray">
              <h3 class="font-size-6 mb-0 text-capitalize">Company Profile</h3>
            </span>
          </Link>
        }
      />
      <AdminSidebar />
      <ToastContainer />
      {user_type !== "admin" ? <EmployeeHeader /> : null}
      <div
        className={
          user_type === "admin"
            ? "dashboard-main-container bg-light mt-12 mt-lg-12"
            : "bg-default-2 pt-30 pt-lg-22 pb-lg-27"
        }
      >
        <div className="container-fluid">
          <div className="row text-left mt-5 pt-0">
            <div className="col-12 mb-1">
              <div className="bg-white shadow-9 d-flex">
                <div className="col-md-3 col-sm-6 media align-items-center company_box media border-right">
                  <div className="text_box text-left">
                    <img
                      className="company_logo"
                      src={
                        employerData.logo === null
                          ? "https://macsnh.org/wp-content/uploads/2019/08/demo-logo-black.png"
                          : employerData.logo
                      }
                      alt=""
                    />
                  </div>
                  <div className="text_box text-left w-100 text-capitalize">
                    <h3 className="mb-0 font-size-6 heading-dark-color d-flex align-items-center">
                      {employerData.company_name}{" "}
                      <CustomButton
                        className="font-size-3 rounded-3 btn-primary border-0 ml-2 absolute_top_right"
                        onClick={() => setShowCompanyInfoModal(true)}
                      >
                        <PiPencilDuotone />
                      </CustomButton>
                    </h3>
                    <p className="font-size-3 text-default-color line-height-2 m-0">
                      {employerData.industry}
                    </p>
                  </div>
                </div>
                {employerData.email ? (
                  <div className="col-md-3 col-sm-6 px-5 pt-5 pb-5 border-right">
                    <div className="d-flex justify-content-between align-items-center">
                      <Link
                        className="text-dark font-size-5 w-100 text-break"
                        to={`mailto:${employerData.email}`}
                      >
                        <BsEnvelope className="text-primary font-size-5 " />{" "}
                        {employerData.email}
                      </Link>
                      {user_type === "admin" || props.self === "no" ? (
                        <CustomButton
                          title={"Send Custom Email"}
                          className="font-size-4 rounded-3 btn-primary py-0"
                          /*Functionalities have to be done. */
                        >
                          <RiMailSendLine />
                        </CustomButton>
                      ) : null}
                    </div>
                    <Link
                      className="text-dark font-size-5 w-100"
                      to={`tel:${employerData.contact_no}`}
                    >
                      <BiPhoneCall className="text-primary font-size-5" />{" "}
                      {employerData.contact_no}
                    </Link>
                  </div>
                ) : (
                  ""
                )}
                <div className="col px-5 pt-5 pb-5  border-right position-relative">
                  <CompanyDetailPage
                    employerId={user_type === "company" ? company_id : cid}
                    page={"company_profile"}
                  />
                </div>
                {/* <div className="col-md-2 col-sm-6 d-flex justify-content-between">
           
            <CustomButton
              className=" font-size-4 rounded-3 btn-primary border-0"
              onClick={() => setShowDoc(true)}
            >
              Add Document
            </CustomButton>
          </div> */}
              </div>
            </div>
            <div className="col-12 order arrow-wrapper custome_arrow_wrapper ">
              {(lima || []).map((status, i) => {
                return status.lmia_status === "" ||
                  status.lmia_status === null ||
                  status.lmia_status === undefined ||
                  status.lmia_status === "undefined" ? null : (
                  <div className="bg-white w-100 d-flex flex-wrap mb-1">
                    <div className="arrow-steps p-1 px-7 col-md-4 d-flex border-right border-bottom justify-content-between align-items-center">
                      <div className="job_name text-dark d-flex align-items-center">
                        <span className="m-0 font-size-3">
                          {status.job_title}
                        </span>
                      </div>
                      <div>
                        <div
                          key={i}
                          className={`step text-capitalize ${
                            status.lmia_status === "onboarding" ||
                            status.lmia_status === "advertisements" ||
                            status.lmia_status === "documentation"
                              ? "current"
                              : null
                          }`}
                        >
                          <span>onboarding</span>
                        </div>
                        <div
                          key={i}
                          className={`step text-capitalize ${
                            status.lmia_status === "onboarding" ||
                            status.lmia_status === "advertisements"
                              ? "current"
                              : null
                          }`}
                        >
                          <span>advertisements</span>
                        </div>
                        <div
                          key={i}
                          className={`step text-capitalize ${
                            status.lmia_status === "documentation"
                              ? "current"
                              : null
                          }`}
                        >
                          <span>documentation</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-12 order-2 order-xl-1">
              {/* LMIA */}

              <div className="bg-white">
                {/*----Profile Header----*/}
                <ul
                  className="nav border-top border-bottom border-mercury user_profile_tab"
                  id="myTab"
                  role="tablist"
                >
                  <li className="tab-menu-items nav-item">
                    <Link
                      className={
                        TabActive === "profile"
                          ? "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10 active"
                          : "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10"
                      }
                      id="home-tab"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                      onClick={() => setTabActive("profile")}
                    >
                      Overview
                    </Link>
                  </li>
                  <li className="tab-menu-items nav-item">
                    <Link
                      className={
                        TabActive === "jobs"
                          ? "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10 active"
                          : "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10"
                      }
                      id="appliedJobs"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="appliedJobs"
                      aria-selected="true"
                      onClick={() => setTabActive("jobs")}
                    >
                      Jobs
                    </Link>
                  </li>
                  <li className="tab-menu-items nav-item">
                    <Link
                      className={
                        TabActive === "documents"
                          ? "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10 active"
                          : "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10"
                      }
                      id="docTab"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="docTab"
                      aria-selected="true"
                      onClick={() => setTabActive("documents")}
                    >
                      Documents
                    </Link>
                  </li>
                  <li className="tab-menu-items nav-item">
                    <Link
                      className={
                        TabActive === "interview"
                          ? "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10 active"
                          : "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10"
                      }
                      id="interviewTab"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="interviewTab"
                      aria-selected="true"
                      onClick={() => setTabActive("interview")}
                    >
                      Interview
                    </Link>
                  </li>
                  <li className="tab-menu-items nav-item">
                    <Link
                      className={
                        TabActive === "notes"
                          ? "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10 active"
                          : "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10"
                      }
                      id="notesTab"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="notesTab"
                      aria-selected="true"
                      onClick={() => setTabActive("notes")}
                    >
                      Notes
                    </Link>
                  </li>
                  <li className="tab-menu-items nav-item">
                    <Link
                      className={
                        TabActive === "activity"
                          ? "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10 active"
                          : "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10"
                      }
                      id="activityTab"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="activityTab"
                      aria-selected="true"
                      onClick={() => setTabActive("activity")}
                    >
                      Activity History
                    </Link>
                  </li>
                  {/* <li className="tab-menu-items nav-item pr-12">
                      <CustomButton
                        className=" font-size-4 rounded-3 btn-primary border-0 mt-2"
                        onClick={() => setShowDoc(true)}
                      >
                        {user_type === "user" ? "Add Document" : "Documents"}{" "}
                      </CustomButton>
                    </li> */}
                </ul>
                {/*---Profile Details----*/}
                <div
                  className={TabActive === "profile" ? "tab-content" : "d-none"}
                  id="myTabContent"
                >
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    {/*----About Employee----*/}
                    {isLoading ? (
                      <div className="table-responsive main_table_div">
                        <Loader />{" "}
                      </div>
                    ) : (
                      <div
                        className={
                          user_type === "admin" ? "row m-0" : "row m-0"
                        }
                      >
                        {/* <!-- Company Profile --> */}

                        <div className="text-capitalize company_detail_box w-100 row m-0">
                          <div className="col-md-6 col-lg-6 p-10 border-right">
                            <div>
                              <h4 className="text-black-2 mb-0 font-size-5 d-flex align-items-center justify-content-space-between">
                                <span>About {employerData.company_name}</span>
                                <CustomButton
                                  className="font-size-3 rounded-3 btn-primary border-0  absolute_top_right"
                                  onClick={() => setShowCompanyInfoModal(true)}
                                >
                                  <PiPencilDuotone />
                                </CustomButton>
                              </h4>
                              <div className="pt-5 text-left">
                                {employerData.about ? (
                                  <p className="font-size-4 mb-8">
                                    {employerData.about}
                                  </p>
                                ) : (
                                  <p className="font-size-4 mb-8 text-center">
                                    No data Found
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-6 p-10">
                            <div>
                              <h4 className="text-black-2 mb-5 font-size-5 d-flex align-items-center justify-content-space-between">
                                <span>{/*Kyc Details*/}</span>
                                <CustomButton
                                  className="font-size-3 rounded-3 btn-primary border-0 absolute_top_right"
                                  onClick={() =>
                                    setShowKycComplainDetailsModal(true)
                                  }
                                >
                                  <PiPencilDuotone />
                                </CustomButton>
                              </h4>
                            </div>
                            <div className="pt-5 text-left row m-0">
                              {employerData.industry ? (
                                <div
                                  className="font-size-3 mb-4 mr-10"
                                  title="Industry"
                                >
                                  <i className="far fa-building mr-2"></i>
                                  {employerData.industry}
                                </div>
                              ) : null}

                              {employerData.corporation ? (
                                <div
                                  className="font-size-3 mb-4 mr-10"
                                  title="Business Type"
                                >
                                  <i className="fas fa-briefcase mr-2"></i>
                                  {employerData.corporation}
                                </div>
                              ) : null}
                              {employerData.company_size ? (
                                <div
                                  className="font-size-3 mb-4 mr-10"
                                  title="Company size"
                                >
                                  <i className="fas fa-user-friends mr-2"></i>
                                  {employerData.company_size}
                                </div>
                              ) : null}
                              {employerData.company_start_date ? (
                                <div
                                  className="font-size-3 mb-4 mr-10"
                                  title="Est. Since"
                                >
                                  <i className="fas fa-business-time mr-2"></i>
                                  {moment(
                                    employerData.company_start_date
                                  ).format("YYYY")}
                                </div>
                              ) : null}
                              {employerData.website_url ? (
                                <div
                                  className="font-size-3 mb-4 mr-10"
                                  title="Website URL"
                                >
                                  <i className="fas fa-globe mr-2"></i>
                                  <Link className="text-dark" to={""}>
                                    {employerData.website_url}
                                  </Link>
                                </div>
                              ) : null}
                              {employerData.vacancy_for_post ? (
                                <div
                                  className="font-size-3 mb-4 mr-10"
                                  title="Hiring for"
                                >
                                  <i className="fas fa-bullhorn mr-2"></i>
                                  {employerData.vacancy_for_post}
                                </div>
                              ) : null}
                              {employerKycData === "" ? null : (
                                <>
                                  {employerKycData.pan_no ? (
                                    <div
                                      className="font-size-3 mb-4 mr-10"
                                      title="PAN"
                                    >
                                      <span className="mr-2 font-weight-bold">
                                        PAN
                                      </span>
                                      {employerKycData.pan_no}
                                    </div>
                                  ) : null}
                                  {employerKycData.tan_number ? (
                                    <div
                                      className="font-size-3 mb-4 mr-10"
                                      title="TAN"
                                    >
                                      <span className="mr-2 font-weight-bold">
                                        TAN
                                      </span>
                                      {employerKycData.tan_number}
                                    </div>
                                  ) : null}
                                  {employerKycData.gstin ? (
                                    <div
                                      className="font-size-3 mb-4 mr-10"
                                      title="GSTIN"
                                    >
                                      <span className="mr-2 font-weight-bold">
                                        GSTIN
                                      </span>
                                      {employerKycData.gstin}
                                    </div>
                                  ) : null}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* <!-- Sidebar End --> */}
                <div
                  className={
                    TabActive === "jobs"
                      ? "row m-0  justify-content-center"
                      : "d-none"
                  }
                  id="appliedJobs"
                  role="tabpanel"
                  aria-labelledby="appliedJobs"
                >
                  <div className="response_main_div w-100">
                    <JobTable
                      company_id={cid}
                      heading={"companyprofile"}
                      response={"companyprofile"}
                      setLmia={setLmia}
                    />
                  </div>
                  {/* <!-- Top Start --> */}
                </div>
                <div
                  className={
                    TabActive === "documents"
                      ? "justify-content-center"
                      : "d-none"
                  }
                  id="applieddocuments"
                  role="tabpanel"
                  aria-labelledby="applieddocuments"
                >
                  {/* <LmiaTime
                      // lmia={props.lmia}
                      // job={props.job}
                      // location={location.pathname}
                      doc="yes"
                    /> */}
                  {TabActive === "documents" ? (
                    <DocumrentContainer
                      employer_id={cid}
                      page={"company_profile"}
                    />
                  ) : null}
                </div>
                <div
                  className={
                    TabActive === "interview"
                      ? "justify-content-center "
                      : "d-none"
                  }
                >
                  {TabActive === "interview" ? (
                    <Interview
                      company_id={cid}
                      setApiCall={setApiCall}
                      heading={"userprofile"}
                    />
                  ) : null}
                </div>
                <div
                  className={
                    TabActive === "notes" ? "justify-content-center " : "d-none"
                  }
                >
                  {TabActive === "notes" ? (
                    <AddCompanyfollowup
                      company_id={cid}
                      setApiCall={setApiCall}
                    />
                  ) : //  <div className="p-10 notes_container">
                  //         <div className="single_note mb-5">
                  //           <small>Created on: 2023-08-03 17:10:53</small>
                  //           <div className="card p-5">
                  //             This is some text within a card body.
                  //           </div>
                  //         </div>
                  //         <div className="single_note mb-5">
                  //           <small>Created on: 2023-08-03 17:10:53</small>
                  //           <div className="card p-5">
                  //             This is some text within a card body.
                  //           </div>
                  //         </div>
                  //         <div className="single_note mb-5">
                  //           <small>Created on: 2023-08-03 17:10:53</small>
                  //           <div className="card p-5">
                  //             This is some text within a card body.
                  //           </div>
                  //         </div>
                  //       </div>
                  null}
                </div>
                <div
                  className={
                    TabActive === "activity"
                      ? "justify-content-center "
                      : "d-none"
                  }
                >
                  {TabActive === "activity" ? (
                    <div className="p-10 activity_container">
                      <div className="single_note mb-5">
                        <small>Created on: 2023-08-03 17:10:53</small>
                        <div className="card p-5">
                          This is some text within a card body.
                        </div>
                      </div>
                      <div className="single_note mb-5">
                        <small>Created on: 2023-08-03 17:10:53</small>
                        <div className="card p-5">
                          This is some text within a card body.
                        </div>
                      </div>
                      <div className="single_note mb-5">
                        <small>Created on: 2023-08-03 17:10:53</small>
                        <div className="card p-5">
                          This is some text within a card body.
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {user_type !== "admin" ? <EmployeeFooter /> : null}
      {showCompanyInfoModal ? (
        <CompanyDetails
          employerId={user_type === "company" ? company_id : cid}
          show={showCompanyInfoModal}
          apiCall={apiCall}
          setApiCall={setApiCall}
          close={() => setShowCompanyInfoModal(false)}
        />
      ) : null}
      {showKycComplainDetailsModal ? (
        <KycComplianceDetails
          employerId={user_type === "company" ? company_id : cid}
          show={showKycComplainDetailsModal}
          apiCall={apiCall}
          setApiCall={setApiCall}
          close={() => setShowKycComplainDetailsModal(false)}
        />
      ) : null}
      {showDoc ? (
        <EmployerDocumentModal
          show={showDoc}
          close={() => setShowDoc(false)}
          employer_id={user_type === "company" ? company_id : cid}
        />
      ) : null}
    </div>
  );
}

export default CompanyProfileDetail;
