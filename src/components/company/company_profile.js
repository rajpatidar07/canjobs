import React, { useState, useEffect } from "react";
import KycComplianceDetails from "../forms/employer/kyc";
import EmployeeHeader from "../common/header";
import EmployeeFooter from "../common/footer";
import CustomButton from "../common/button";
import CompanyDetailPage from "./companydetail";
import CompanyDetails from "../forms/employer/companyDetail";
import { AddCompany, EmployerDetails } from "../../api/api";
import { ToastContainer } from "react-toastify";
import Loader from "../common/loader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import EmployerDocumentModal from "../forms/admin/EmployerDocumetModal";
import { PiPencilDuotone } from "react-icons/pi";
import AdminHeader from "../admin/header";
import AdminSidebar from "../admin/sidebar";
import JobTable from "../common/jobTable";
// import DocumrentContainer from "..//common/employeeDocumrentContainer";
import Interview from "../common/interviewTable";
// import AddCompanyfollowup from "../common/companyFollowUp";
import Addfollowup from "../forms/admin/addfollowup";
import { BsEnvelope } from "react-icons/bs";
import { RiMailSendLine } from "react-icons/ri";
import { BiPhoneCall } from "react-icons/bi";
import ContactPage from "../common/contactPage";
import PayentForm from "../forms/admin/payentForm";
import MainEmailPage from "../email/mainemailPage";
import SharePointDocument from "../common/Document folder/SharePointDocument";
import ConvertTime from "../common/ConvertTime";
// import LimaArrowProfile from "../common/LimaArrowProfile";
function CompanyProfileDetail(props) {
  const user_type = localStorage.getItem("userType");
  const company_id = localStorage.getItem("company_id");
  let cid = company_id;
  let location = useLocation()
  const searchParams = new URLSearchParams(location.search);
  const docId = searchParams.get("docId");
  const docParentId = searchParams.get("docParentId");
  const notes = searchParams.get("note")

  let navigate = useNavigate();
  /*Show modal and data state */
  // const [lima, setLmia] = useState(false);
  let [apiCall, setApiCall] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  let [showDoc, setShowDoc] = useState(false);
  // const [lmiaStatusRejectComment, setLmiaStatusRejectComment] = useState([]);
  const [showCompanyInfoModal, setShowCompanyInfoModal] = useState(false);
  const [showKycComplainDetailsModal, setShowKycComplainDetailsModal] =
    useState(false);
  const [TabActive, setTabActive] = useState(docId
    ? "documents"
    : notes === "true"
      ? "notes"
      : "profile");
  const [addNote, setAddNote] = useState(false);
  const [employerData, setEmployerData] = useState("");
  const [employerKycData, setEmployerKycData] = useState("");
  const [jobPageNo, setJobPageNO] = useState(1);
  const [interviewPageNo, setInterviewPageNO] = useState(1);

  /*Function to get employer data */
  const EmployerData = async () => {
    try {
      let userData = await EmployerDetails(cid);
      if (user_type === "company") {
        localStorage.setItem(
          "profile_photo",
          userData.data.company_detail[0].logo
        );
        localStorage.setItem(
          "name",
          userData.data.company_detail[0].company_name
        );
      }
      if (userData === undefined) {
        setEmployerData("");
        setEmployerKycData("");
      } else if (
        userData.data.kyc_detail.length === 0 ||
        userData.data.kyc_detail === undefined ||
        userData.data.kyc_detail === "0" ||
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
      console.log(err);
    }
  };
  const params = new URLSearchParams(window.location.search);
  const transactionId = params.get("payment_intent");
  /*Render method to get employer data */
  useEffect(() => {
    EmployerData();
    if (apiCall === true) {
      setApiCall(false);
    }
    if (transactionId) {
      setTabActive("payment");
    }
    if (docId) {
      setTabActive("documents");
    }
    if (notes) {
      setTabActive("notes");
    }
    // eslint-disable-next-line
  }, [apiCall, company_id, notes]);

  return (
    <div>
      {(user_type === "admin" || user_type === "agent") && (
        <>
          <AdminHeader
            heading={
              <Link
                className="d-flex align-items-center "
                onClick={() => {
                  if (TabActive === "notes") {
                    navigate(-1)
                  } else {
                    setAddNote(true)
                  }
                }
                }
              >
                <i className="icon icon-small-left bg-white circle-30 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                  <h3 className="font-size-6 mb-0 text-capitalize">
                    {employerData.company_name ? employerData.company_name + " (Company)" : ""}
                  </h3>
                </span>
              </Link>
            }
          />
          <AdminSidebar />
        </>
      )}
      <ToastContainer />
      {user_type === "admin" || user_type === "agent" ? null : <EmployeeHeader />}
      <div
        className={
          user_type === "admin" || user_type === "agent"
            ? "dashboard-main-container bg-light mt-12 mt-lg-12 mt-sm-22" 
            : "bg-default-2 employer-detail-top-padding"
        }
      >
        <div className={`container${user_type === "admin" || user_type === "agent" ? "-fluid" : ""}`}>
          <div className="row text-left mt-5 pt-0">
            <div className="col-12 mb-1 d-none">
              <div className="bg-white shadow-9 d-flex">
                <div className="col-md-12 col-sm-12 media align-items-center company_box media border-right">
                  <div className="text_box text-left">
                    <img
                      className="company_logo"
                      src={
                        employerData.logo === null ||
                          employerData.logo === null ||
                          employerData.logo === undefined ||
                          employerData.logo === "undefined"
                          ? "https://macsnh.org/wp-content/uploads/2019/08/demo-logo-black.png"
                          : employerData.logo
                      }
                      alt=""
                    />
                  </div>
                  <div className="text_box text-left w-100 text-capitalize">
                    <h3 className="mb-0 font-size-6 heading-dark-color d-flex align-items-center">
                      <span>
                        <b>{employerData.franchise}</b>
                        <small>{employerData.company_name}</small>
                      </span>
                      <CustomButton
                        className={
                          user_type === "user"
                            ? "d-none"
                            : "font-size-3 rounded-3 btn-primary border-0 ml-2 absolute_top_right"
                        }
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
                {!employerData.email || user_type === "user" ? null : (
                  <div className="col-md-3 col-sm-6 px-5 pt-5 pb-5 border-right">
                    <div
                      className={
                        "d-flex justify-content-between align-items-center"
                      }
                    >
                      <Link
                        className="text-dark font-size-5 w-100 text-break"
                        to={`mailto:${employerData.email}`}
                      >
                        <BsEnvelope className="text-primary font-size-5 " />
                        {"  "}
                        {employerData.email}
                      </Link>
                      {user_type === "admin" || props.self === "no" ? (
                        <CustomButton
                          title={"Send Custom Email"}
                          className="font-size-4 rounded-3 btn-primary py-0 d-none"
                        /*Functionalities have to be done. */
                        >
                          {/*Take off "d-none" when you Send Custom Email API or when you're told to remove it*/}
                          <RiMailSendLine />
                        </CustomButton>
                      ) : null}
                    </div>
                    <Link
                      className="text-dark font-size-5 w-100"
                      to={`tel:${employerData.contact_no}`}
                    >
                      <BiPhoneCall className="text-primary font-size-5" />
                      {employerData.contact_no}
                    </Link>
                  </div>
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
            {/* LMIA */}
            {/* <div className="col-12">
              {lima && user_type !== "user" ? (
                <LimaArrowProfile
                  lmia={lima}
                  lmiaStatusRejectComment={lmiaStatusRejectComment}
                />
              ) : null}
            </div> */}
            <div className="col-12 order-2 order-xl-1">
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
                      Profile
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
                  <li
                    className={
                      user_type === "user"
                        ? "d-none"
                        : "tab-menu-items nav-item"
                    }
                  >
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
                      onClick={async () => {
                        if (!employerData.documents_folder_id) {
                          const responseData = await AddCompany(employerData);
                          setApiCall(true)
                          if (responseData.status === 1) {
                            setTabActive("documents")
                          }
                        } else {
                          setTabActive("documents")
                        }
                      }}
                    // onClick={() => setTabActive("documents")}
                    >
                      Documents
                    </Link>
                  </li>
                  <li
                    className={
                      user_type === "user"
                        ? "d-none"
                        : "tab-menu-items nav-item"
                    }
                  >
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
                  <li
                    className={
                      user_type === "admin" 
                        ? "tab-menu-items nav-item"
                        : "d-none"
                    }
                  >
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
                  <li className="tab-menu-items nav-item d-none">
                    {/*Take off "d-none" when you use the activity log API or when you're told to remove it*/}
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
                  <li className={user_type === "user" ? "d-none" : "tab-menu-items nav-item"}>
                    {/*Take off "d-none" when you use the activity log API or when you're told to remove it*/}

                    <Link
                      className={
                        TabActive === "payment"
                          ? "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10 active"
                          : "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10"
                      }
                      id="activityTab"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="activityTab"
                      aria-selected="true"
                      onClick={() => setTabActive("payment")}
                    >
                      Payment
                    </Link>
                  </li>
                  <li
                    className={
                      user_type === "admin"
                        ? "tab-menu-items nav-item"
                        : "d-none"
                    }
                  >
                    {/*Take off "d-none" when you use the activity log API or when you're told to remove it*/}
                    <Link
                      className={
                        TabActive === "contact"
                          ? "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10 active"
                          : "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10"
                      }
                      id="activityTab"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="activityTab"
                      aria-selected="true"
                      onClick={() => setTabActive("contact")}
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li className={user_type === "user" ? "d-none" : "tab-menu-items nav-item"}>
                    <Link
                      className={
                        TabActive === "email"
                          ? "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10 active"
                          : "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10"
                      }
                      id="docTab"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="docTab"
                      aria-selected="true"
                      onClick={() => setTabActive("email")}
                    >
                      Email
                    </Link>
                  </li>
                  {/* <li className="tab-menu-items nav-item pr-12">
                      <CustomButton
                        className=" font-size-4 rounded-3 btn-primary border-0 mt-2"
                        onClick={() => setShowDoc(true)}
                      >
                        {user_type === "user" ? "Add Document" : "Documents"}
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
                        <Loader />
                      </div>
                    ) : (
                      <div
                        className={
                          user_type === "admin" ? "row m-0" : "row m-0"
                        }
                      >
                        {/* <!-- Company Profile --> */}

                        <div className="company_detail_box w-100 row m-0 p-8">
                          <div className="bg-white row m-0 w-100 ">
                            <div className="col-md-12 col-sm-12 p-0 media align-items-center company_box media bg-light rounded p-8">
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
                              <div className="text_box text-left w-100">
                                <h3 className="mb-0 font-size-6 heading-dark-color d-flex align-items-center text-break text-capitalize">
                                  <span>
                                    <b title="Operating Name">
                                      {employerData.franchise
                                        ? employerData.franchise
                                        : "Unknown Client"}
                                    </b>
                                  </span>
                                </h3>
                                <CustomButton
                                  className={
                                    user_type === "user"
                                      ? "d-none"
                                      : "font-size-3 rounded-3 btn-primary border-0 ml-2 absolute_top_right"
                                  }
                                  onClick={() => setShowCompanyInfoModal(true)}
                                >
                                  <PiPencilDuotone />
                                </CustomButton>
                                <p className="font-size-3 text-default-color line-height-2 m-0 text-break">
                                  <span className="mr-3" title="Legal Name">
                                    {employerData.company_name}
                                  </span>
                                  {employerData.industry === ""
                                    ? null
                                    : "(" + employerData.industry + ")"}
                                </p>
                                <hr className="my-3" />
                                <div className="position-relative">
                                  <CompanyDetailPage
                                    employerId={
                                      user_type === "company" ? company_id : cid
                                    }
                                    page={"company_profile"}
                                  />
                                </div>
                                <hr className="my-3" />
                                <div className="position-relative">
                                  {!employerData.industry &&
                                    !employerData.corporation &&
                                    !employerData.company_size &&
                                    !employerData.company_start_date &&
                                    !employerData.website_url &&
                                    !employerData.vacancy_for_post &&
                                    !employerKycData.pan_no &&
                                    !employerKycData.tan_number &&
                                    !employerKycData.gstin ? (
                                    <div className="text-left row m-0">
                                      <div className="font-size-4 mb-8 text-center mr-10">
                                        No Data Found
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="text-left row m-0">
                                      {employerData.industry ? (
                                        <div
                                          className="font-size-3 mb-1 mr-10"
                                          title="Industry"
                                        >
                                          <i className="far fa-building mr-2"></i>
                                          {employerData.industry}
                                        </div>
                                      ) : null}
                                      {employerData.corporation ? (
                                        <div
                                          className="font-size-3 mb-1 mr-10"
                                          title="Sole Proprietor"
                                        >
                                          <i className="fas fa-briefcase mr-2"></i>
                                          {employerData.corporation}
                                        </div>
                                      ) : null}
                                      {employerData.company_size ? (
                                        <div
                                          className="font-size-3 mb-1 mr-10"
                                          title="Client's team size (Full time)"
                                        >
                                          <i className="fas fa-user-friends mr-2"></i>
                                          {employerData.company_size}
                                        </div>
                                      ) : null}
                                      {employerData.company_size_partTime ? (
                                        <div
                                          className="font-size-3 mb-1 mr-10"
                                          title="Client's team size (Part time)"
                                        >
                                          <i className="fas fa-user-friends mr-2"></i>
                                          {employerData.company_size_partTime}
                                        </div>
                                      ) : null}
                                      {employerData.company_start_date ? (
                                        <div
                                          className="font-size-3 mb-1 mr-10"
                                          title="Est. Since"
                                        >
                                          <i className="fas fa-business-time mr-2"></i>
                                          <ConvertTime _date={employerData.company_start_date} format={"YYYY"} />
                                          {/* {moment(
                                            employerData.company_start_date
                                          ).format("YYYY")} */}
                                        </div>
                                      ) : null}
                                      {employerData.website_url ? (
                                        <div
                                          className="font-size-3 mb-1 mr-10"
                                          title="Website URL"
                                        >
                                          <i className="fas fa-globe mr-2"></i>
                                          <Link
                                            className="text-dark"
                                            to={employerData.website_url}
                                            target="_blank"
                                          >
                                            {employerData.website_url}
                                          </Link>
                                        </div>
                                      ) : null}
                                      {employerData.vacancy_for_post ? (
                                        <div
                                          className="font-size-3 mb-1 mr-10"
                                          title="Hiring for"
                                        >
                                          <i className="fas fa-bullhorn mr-2"></i>
                                          {employerData.vacancy_for_post}
                                        </div>
                                      ) : null}
                                      {employerKycData === "" ||
                                        user_type === "user" ? null : (
                                        <div className="d-none">
                                          {employerKycData.pan_no ? (
                                            <div
                                              className="font-size-3 mb-1 mr-10"
                                              title="PAN"
                                            >
                                              <span className="mr-2 font-weight-bold">
                                                PAN
                                              </span>
                                              {employerKycData.pan_no}
                                            </div>
                                          ) : null}
                                          {!employerKycData.tan_number ||
                                            user_type === "user" ? null : (
                                            <div
                                              className="font-size-3 mb-1 mr-10"
                                              title="TAN"
                                            >
                                              <span className="mr-2 font-weight-bold">
                                                TAN
                                              </span>
                                              {employerKycData.tan_number}
                                            </div>
                                          )}
                                          {!employerKycData.gstin ||
                                            user_type === "user" ? null : (
                                            <div
                                              className="font-size-3 mb-1 mr-10"
                                              title="GSTIN"
                                            >
                                              <span className="mr-2 font-weight-bold">
                                                GSTIN
                                              </span>
                                              {employerKycData.gstin}
                                            </div>
                                          )}
                                        </div>
                                      )}
                                      <CustomButton
                                        className={
                                          user_type === "user"
                                            ? "d-none"
                                            : "font-size-3 rounded-3 btn-primary border-0 d-none"
                                        }
                                        onClick={() =>
                                          setShowKycComplainDetailsModal(true)
                                        }
                                      >
                                        <PiPencilDuotone />
                                      </CustomButton>
                                    </div>
                                  )}
                                </div>
                                <hr className="my-3" />
                                {!employerData.email || user_type === "user" ? (
                                  ""
                                ) : (
                                  <div
                                    className="d-flex"
                                    style={{ gap: "10px" }}
                                  >
                                    <div className="d-flex justify-content-between align-items-center">
                                      <Link
                                        className="font-size-3 text-break btn btn-outline-secondary btn-rounded px-4"
                                        to={`mailto:${employerData.email}`}
                                      >
                                        <BsEnvelope className="text-secondary font-size-5 mr-2" />
                                        {employerData.email}
                                      </Link>
                                      {user_type === "admin" ||
                                        props.self === "no" ? (
                                        <CustomButton
                                          title={"Send Custom Email"}
                                          className="font-size-4 rounded-3 btn-primary py-0 d-none"
                                        /*Functionalities have to be done. */
                                        >
                                          {/*Take off "d-none" when you Send Custom Email API or when you're told to remove it*/}
                                          <RiMailSendLine />
                                        </CustomButton>
                                      ) : null}
                                    </div>
                                    <Link
                                      className="font-size-3 text-break btn btn-outline-secondary btn-rounded px-4"
                                      to={`tel:${employerData.contact_no}`}
                                    >
                                      <BiPhoneCall className="text-secondary font-size-5 mr-2" />
                                      {employerData.contact_no}
                                    </Link>
                                  </div>
                                )}
                              </div>
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
                          <div className="col-md-12 col-lg-12 p-8 mt-5 bg-light rounded">
                            <div>
                              <h4 className="text-black-2 mb-0 font-size-5 d-flex align-items-center justify-content-space-between text-break">
                                <span>About {employerData.company_name}</span>
                                {/* <CustomButton
                                  className={user_type === "user"?"d-none":"font-size-3 rounded-3 btn-primary border-0  absolute_top_right"}
                                  onClick={() => setShowCompanyInfoModal(true)}
                                >
                                  <PiPencilDuotone />
                                </CustomButton> */}
                              </h4>
                              <div className="pt-5 text-left">
                                {employerData.about ? (
                                  // <p className="font-size-4 mb-8">
                                  //   {employerData.about}
                                  // </p>
                                  <div className="w-100 card p-5 shadow-8 border-0 m-0 text-break">
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: employerData.about,
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <p className="font-size-4 mb-8 text-center">
                                    No data Found
                                  </p>
                                )}
                              </div>
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
                      detail={"company_detail"}
                      // setLmia={setLmia}
                      setApiCall={setApiCall}
                      pageNo={jobPageNo}
                      setpageNo={setJobPageNO}
                    // setLmiaStatusRejectComment={setLmiaStatusRejectComment}
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
                  {/* {TabActive === "documents" ? (
                    <DocumrentContainer
                      employer_id={cid}
                      page={"company_profile"}
                    />
                  ) : null} */}
                  {TabActive === "documents" ? (
                    // <DocumrentContainer
                    //   employee_id={cid}
                    //   emp_user_type={"employer"}
                    // />
                    < SharePointDocument
                      user_id={cid}
                      emp_user_type={"employer"}
                      folderId={docId ? docParentId : employerData.documents_folder_id}
                      notification={docId ? "yes" : "no"}
                      docId={docId ? docId : ""}
                      user_name={employerData.company_name}
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
                      pageNo={interviewPageNo}
                      setpageNo={setInterviewPageNO}
                      user_type={user_type}
                    />
                  ) : null}
                </div>
                <div
                  className={
                    TabActive === "notes" ? "justify-content-center " : "d-none"
                  }
                >
                  {/* {TabActive === "notes" ? (
                    <AddCompanyfollowup
                      company_id={cid}
                      setApiCall={setApiCall}
                    />
                  ) : 
                    null} */}
                  {/* {TabActive === "notes" ? ( */}
                  <Addfollowup
                    userId={cid}
                    userType={"employer"}
                    setApiCall={setApiCall}
                    noteNotification={notes}
                    assigned_by_id={localStorage.getItem("admin_id")}
                    show={TabActive === "notes" || addNote}
                    page={TabActive === "notes" ? "no" : "yes"}
                    close={() => {
                      setAddNote(false)
                    }}
                    skip={() => navigate(-1)}
                  />
                  {/* // ) : null} */}
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
                <div
                  className={
                    TabActive === "payment"
                      ? "justify-content-center "
                      : "d-none"
                  }
                >
                  {TabActive === "payment" ? (
                    <div className="p-10 activity_container">
                      <PayentForm
                        data={employerData}
                        user_id={cid}
                        user_type={"employer"}
                      />
                    </div>
                  ) : null}
                </div>
                <div
                  className={
                    TabActive === "contact"
                      ? "justify-content-center "
                      : "d-none"
                  }
                >
                  {TabActive === "contact" ? (
                    <ContactPage email={employerData.email} />
                  ) : null}
                </div>
                <div
                  className={
                    TabActive === "email" ? "justify-content-center " : "d-none"
                  }
                >
                  {TabActive === "email" ? (
                    <MainEmailPage email={employerData.email} />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {user_type === "admin" || user_type === "agent" ? "" : <EmployeeFooter />}
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
