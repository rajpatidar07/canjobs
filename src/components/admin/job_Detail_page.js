import React, { useState, useEffect } from "react";
import AddJobModal from "../forms/employer/job";
import EmployeeHeader from "../common/header";
import CustomButton from "../common/button";
import { AddJob, GetJobDetail } from "../../api/api";
import Loader from "../common/loader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PiPencilDuotone } from "react-icons/pi";
// import AdminHeader from "../admin/header";
// import AdminSidebar from "../admin/sidebar";
import JobTable from "../common/jobTable";
import { BsEnvelope } from "react-icons/bs";
import { RiMailSendLine } from "react-icons/ri";
import { BiPhoneCall } from "react-icons/bi";
import LimaArrowProfile from "../common/LimaArrowProfile";
import EmployeeFooter from "../common/footer";
import { getInitials } from "../common/GetInitials";
import SharePointDocument from "../common/Document folder/SharePointDocument";
import Addfollowup from "../forms/admin/addfollowup";
import JobChatBox from "../common/JobChatBox";
import determineBackgroundColor from "../common/Common function/DetermineBackgroundColour";
import filterjson from "../json/filterjson";
import ConvertTime from "../common/Common function/ConvertTime";
import LmiaInfo from "../forms/admin/lmiaInfo";
function JobDetailpageAdmim(props) {
  const user_type = localStorage.getItem("userType");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const docId = searchParams.get("docId");
  const notes = searchParams.get("note");
  const note_id = searchParams.get("noteid");
  const docParentId = searchParams.get("docParentId");
  const docHighAnnoId = searchParams.get("annotationId");
  const docTaskId = searchParams.get("taskId");
  const chat = searchParams.get("chat");
  let jid = chat ? chat : (localStorage.getItem("job_id") || searchParams.get("job_id"))
  let skill = [];
  let navigate = useNavigate();
  /*Show modal and data state */
  const [lima, setLmia] = useState([]);
  const [addNote, setAddNote] = useState(false);
  const [lmiaStatusRejectComment, setLmiaStatusRejectComment] = useState([]);
  let [apiCall, setApiCall] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  const [showJobEditModal, setShowJobEditModal] = useState(false);
  const [showLmiaAdditionalInfobModal, setShowLmiaAdditionalInfobModal] = useState(false);
  const [TabActive, setTabActive] = useState(
    docParentId
      ? "documents"
      : chat
        ? "chat"
        : notes
          ? "note"
          : "detail");
  const [jobData, setJobData] = useState("");
  const [pageNo, setpageNo] = useState(localStorage.getItem("PageNo") || 1);
  // const [employerKycData, setEmployrKycData] = useState("");

  /*Function to get employer data */
  const JobData = async () => {
    try {
      let resJobData = await GetJobDetail(jid);
      if (
        resJobData.data.data === null ||
        resJobData.data.data === undefined ||
        resJobData.data.data === "undefined" ||
        resJobData.data.data.length === 0
      ) {
        setJobData([]);
        setIsLoading(false);
      } else {
        setJobData(resJobData.data.data[0]);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /*Render method to get employer data */
  useEffect(() => {
    JobData();
    if (apiCall === true) {
      setApiCall(false);
    }
    if (docParentId) {
      setTabActive("documents");
    }
    if (chat) {
      setTabActive("chat")
    }
    if (notes) {
      setTabActive("notes")
    }
    // eslint-disable-next-line
  }, [apiCall, location.key, docParentId]);

  /*Set skill variable to array frm string */
  if (jobData !== "") {
    skill =
      jobData.keyskill === null ||
        jobData.keyskill === undefined ||
        jobData.keyskill === "undefined"
        ? []
        : jobData.keyskill.split(",");
  }

  return (
    <div className="">
      {(user_type === "admin" || user_type === "agent") && (
        <>
          <Link
            className="d-flex align-items-center "
            style={{
              position: "absolute",
              top: 5,
              left: 15,
              zIndex: 1000,
              backgroundColor: "#992b32",
              minWidth: "50%",
            }}
            onClick={() => {
              if (TabActive === "notes") {
                navigate(-1);
              } else {
                setAddNote(true);
              }
            }}          >
            <i className="icon icon-small-left bg-white circle-30 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
            <span className="text-uppercase font-size-3 font-weight-bold">
              <h3 className="font-size-6 mb-0 text-capitalize text-white">
                Job Details
              </h3>
            </span>
          </Link>
          {/* <AdminHeader
            heading={
              <Link
                className="d-flex align-items-center "
                onClick={() => navigate(-1)}
              >
                <i className="icon icon-small-left bg-white circle-30 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                  <h3 className="font-size-6 mb-0 text-capitalize">
                    Job Details
                  </h3>
                </span>
              </Link>
            }
          />
          <AdminSidebar /> */}
        </>
      )}

      {user_type === "admin" || user_type === "agent" ? null : (
        <EmployeeHeader />
      )}
      <div
        className={
          user_type === "admin" || user_type === "agent"
            ? "dashboard-main-container bg-light mt-12 mt-lg-12"
            : "bg-default-2 employer-detail-top-padding"
        }
      >
        <div
          className={`container${user_type === "admin" || user_type === "agent" ? "-fluid" : ""
            }`}
        >
          <div className="row text-left mt-5 pt-0">
            <div className="col-12 mb-1 d-none">
              <div className="bg-white shadow-9 d-flex">
                <div className="col-md-3 col-sm-6 media align-items-center company_box media border-right">
                  <div className="text_box text-left">
                    {jobData.logo ? (
                      <img
                        className="company_logo"
                        src={
                          jobData.logo === null
                            ? "image/logo-main-black.png"
                            : jobData.logo
                        }
                        alt=""
                      />
                    ) : (
                      <p className="company_logo">AT</p>
                    )}
                  </div>
                  <div className="text_box text-left w-100 text-capitalize">
                    <h3 className="mb-0 font-size-6 heading-dark-color d-flex align-items-center text-break">
                      {jobData.job_title}
                      <CustomButton
                        className={
                          user_type === "user" ||
                            user_type === "agent" ||
                            jobData.length === 0
                            ? "d-none"
                            : "font-size-3 rounded-3 btn-primary border-0  absolute_top_right"
                        }
                        onClick={() => setShowJobEditModal(true)}
                      >
                        <PiPencilDuotone />
                      </CustomButton>
                    </h3>
                    <span>
                      {/* <b title="Operating Name">
                        {jobData.franchise
                          ? jobData.franchise
                          : "Unknown Employer"}
                      </b> */}
                    </span>
                    {/* {jobData.address ? (
                      <div
                        className="font-size-3 text-default-color line-height-2 m-0 text-break mr-7"
                        title="Address"
                      >
                        <i className="fas fa-map-marker-alt mr-2"></i>
                        {jobData.address}
                        {", "} {jobData.city}
                        {" asdasa "}
                        {jobData.pin_code}
                        {", "}
                        {jobData.state}
                        {", "}
                        {jobData.country}
                      </div>
                    ) : null} */}
                    {/* <p className="font-size-3 text-default-color line-height-2 m-0">
                      {jobData.department}
                    </p> */}
                  </div>
                </div>
                {jobData.email ? (
                  <div className="col-md-3 col-sm-6 px-5 pt-5 pb-5 border-right">
                    <div className="d-flex justify-content-between align-items-center">
                      <Link
                        className="text-dark font-size-5 w-100 text-break"
                        to={`mailto:${jobData.email}`}
                      >
                        <BsEnvelope className="text-primary font-size-5 " />
                        {jobData.email}
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
                    {jobData.contact_no_other && (
                      <Link
                        className="text-dark font-size-5 w-100"
                        to={`tel:+${jobData.contact_no_other}`}
                      >
                        <BiPhoneCall className="text-primary font-size-5" />
                        {jobData.contact_no_other}
                      </Link>
                    )}
                  </div>
                ) : (
                  ""
                )}
                <div className="col px-5 pt-5 pb-5  border-right position-relative">
                  <div className="personal_info_box d-flex align-items-center justify-content-left flex-wrap">
                    {!jobData.location &&
                      !jobData.language &&
                      !jobData.address ? (
                      <div className="info_box text-left text-capitalize">
                        <span className="font-size-3 text-smoke  mr-7">
                          No Data FOund
                        </span>
                      </div>
                    ) : (
                      <>
                        <div className="info_box text-left text-capitalize text-break">
                          {jobData.your_duties ? (
                            <span
                              className="font-size-3 text-smoke  mr-7"
                              title="Current Location"
                            >
                              <img
                                className="mr-1"
                                height={"16px"}
                                src="image/icons/marker.svg"
                                alt="Location"
                              />
                              {jobData.your_duties} , {jobData.industry_type}
                              {jobData.location}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="info_box text-left text-capitalize text-break">
                          {jobData.language ? (
                            <span
                              className="font-size-3 text-smoke  mr-7"
                              title="User Language"
                            >
                              <img
                                className="mr-1"
                                height={"16px"}
                                src="image/icons/language.svg"
                                alt="language"
                              />
                              {jobData.language}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="info_box text-left text-capitalize text-break">
                          {jobData.address ? (
                            <span
                              className="font-size-3 text-smoke  mr-7"
                              title="Currently Located Country"
                            >
                              <img
                                className="mr-1"
                                height={"16px"}
                                src="image/icons/address-book.svg"
                                alt="Address"
                              />
                              {jobData.address}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* LMIA */}
            <div className="col-12">
              {lima && user_type !== "user" ? (
                <LimaArrowProfile
                  lmia={lima}
                  lmiaStatusRejectComment={lmiaStatusRejectComment}
                />
              ) : null}
            </div>
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
                        TabActive === "detail"
                          ? "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10 active"
                          : "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10"
                      }
                      id="home-tab"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                      onClick={() => setTabActive("detail")}
                    >
                      Details
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
                      Job Responses
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
                        TabActive === "notes"
                          ? "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10 active"
                          : "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10"
                      }
                      id="notes"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="notes"
                      aria-selected="true"
                      onClick={() => setTabActive("notes")}
                    >
                      Notes
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
                      id="documents"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="documents"
                      aria-selected="true"
                      onClick={async () => {
                        if (
                          !jobData.doc_folder_id &&
                          jobData.job_title
                        ) {
                          // Call the API with the modified object
                          await AddJob(jobData);
                          setApiCall(true);
                          // if (responseData.status === 1) {
                          //   setTabActive("documents");
                          // }else{
                          setTabActive("documents");
                          // }
                        } else {
                          setTabActive("documents");
                        }
                      }}
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
                        TabActive === "chat"
                          ? "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10 active"
                          : "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10"
                      }
                      id="chat"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="chat"
                      aria-selected="true"
                      onClick={() => setTabActive("chat")}
                    >
                      Chat
                    </Link>
                  </li>
                </ul>
                {/*---Profile Details----*/}
                <div
                  className={TabActive === "detail" ? "tab-content" : "d-none"}
                  id="myTabContent"
                >
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    {/*----About Job----*/}
                    {isLoading ? (
                      <div className="table-responsive main_table_div">
                        <Loader />
                      </div>
                    ) : (
                      <div
                        className={
                          user_type === "admin"
                            ? "row m-0 p-8 overflow-hidden"
                            : "row m-0 p-8 overflow-hidden"
                        }
                      >
                        {/* <!-- Company Profile --> */}

                        <div className="text-capitalize company_detail_box w-100 m-0 bg-light rounded p-8 position-relative">
                          <CustomButton
                            className={
                              user_type === "user" ||
                                user_type === "agent" ||
                                jobData.length === 0
                                ? "d-none"
                                : "font-size-3 rounded-3 btn-primary border-0  absolute_top_right"
                            }
                            onClick={() => setShowJobEditModal(true)}
                          >
                            <PiPencilDuotone />
                          </CustomButton>
                          <div className="col-md-12 col-sm-12 media align-items-center company_box media">
                            <div className="text_box text-left">
                              {jobData.logo ? (
                                <img
                                  className="company_logo"
                                  src={
                                    jobData.logo === null
                                      ? "https://macsnh.org/wp-content/uploads/2019/08/demo-logo-black.png"
                                      : jobData.logo
                                  }
                                  alt=""
                                />
                              ) : (
                                <p
                                  className="company_logo"
                                  style={{ fontSize: "50px" }}
                                >
                                  {jobData.company_name
                                    ? getInitials(jobData.company_name)
                                    : ""}
                                </p>
                              )}
                            </div>
                            <div className="text_box text-left w-100 text-capitalize">
                              <h3 className="mb-0 font-size-6 heading-dark-color d-flex align-items-center text-break">
                                {jobData.job_title}
                                {/* {jobData.employement
                                  ? `(${jobData.employement})`
                                  : ""} */}
                              </h3>
                              <h5 className="mb-0 font-size-6 heading-dark-color d-flex align-items-center text-break">
                                {/* <b> {jobData.franchise}</b> */}
                                {/*<small>
                                  {jobData.company_name
                                    ? `(${jobData.company_name})`
                                    : ""}</small>*/}
                              </h5>

                              <hr
                                className={`my-3 ${!jobData.location &&
                                  !jobData.language &&
                                  !jobData.address &&
                                  !jobData.your_duties
                                  ? "d-none"
                                  : ""
                                  }`}
                              />
                              <div className="personal_info_box d-flex align-items-center justify-content-left flex-wrap w-100">
                                {!jobData.location &&
                                  !jobData.language &&
                                  !jobData.address &&
                                  !jobData.your_duties ? (
                                  ""
                                ) : (
                                  <>
                                    <div className="info_box text-left text-capitalize">
                                      {jobData.your_duties ? (
                                        <div
                                          className="font-size-3 text-smoke mr-7"
                                          title="Current Location"
                                        >
                                          <img
                                            className="mr-1"
                                            height={"16px"}
                                            src="image/icons/marker.svg"
                                            alt="Location"
                                          />
                                          <span
                                            dangerouslySetInnerHTML={{
                                              __html: jobData.your_duties,
                                            }}
                                          />
                                          {jobData.industry_type &&
                                            `${jobData.industry_type} ,`}
                                          {jobData.location &&
                                            ` ${jobData.location}`}
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                    <div className="info_box text-left text-capitalize">
                                      {jobData.language ? (
                                        <div
                                          className="font-size-3 text-smoke  mr-7"
                                          title="User Language"
                                        >
                                          <img
                                            className="mr-1"
                                            height={"16px"}
                                            src="image/icons/language.svg"
                                            alt="language"
                                          />
                                          {jobData.language}
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                    {/* <div className="info_box text-left text-capitalize text-break">
                                      {jobData.address ? (
                                        <span
                                          className="font-size-3 text-smoke  mr-7"
                                          title="Currently Address"
                                        >
                                          <img
                                            className="mr-1"
                                            height={"16px"}
                                            src="image/icons/address-book.svg"
                                            alt="Address"
                                          />
                                          {jobData.address}
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </div> */}
                                  </>
                                )}
                              </div>
                              <hr className="my-3" />
                              <div className="">
                                <div className="d-none">
                                  <h4 className="text-black-2 mb-5 font-size-5 d-flex align-items-center justify-content-space-between">
                                    <span>{/*Kyc Details*/}</span>
                                    <CustomButton
                                      className="font-size-3 rounded-3 btn-primary border-0  absolute_top_right"
                                      onClick={() => setShowJobEditModal(true)}
                                      title="Edit Job"
                                    >
                                      <PiPencilDuotone />
                                    </CustomButton>
                                  </h4>
                                </div>
                                {!jobData.industry &&
                                  !jobData.corporation &&
                                  !jobData.company_size &&
                                  !jobData.job_type &&
                                  !jobData.education &&
                                  !jobData.role_category &&
                                  !jobData.experience_required &&
                                  !jobData.department ? (
                                  <div className="text-left row m-0">
                                    <div className="font-size-3 mb-4 mr-10">
                                      No Data Found
                                    </div>
                                  </div>
                                ) : (
                                  <div className="text-left row m-0">
                                    {/* {jobData.industry ? (
                                  <div
                                    className="font-size-3 mb-4 mr-10"
                                    title="Industry"
                                  >
                                    <i className="far fa-building mr-2"></i>
                                    {jobData.industry}
                                  </div>
                                ) : null} */}

                                    {jobData.corporation ? (
                                      <div
                                        className="font-size-3 mb-4 mr-10"
                                        title="Business Type"
                                      >
                                        <i className="fas fa-briefcase mr-2"></i>
                                        {jobData.corporation}
                                      </div>
                                    ) : null}
                                    {jobData.company_size ? (
                                      <div
                                        className="font-size-3 mb-4 mr-10"
                                        title="Employer's team size"
                                      >
                                        <i className="fas fa-user-friends mr-2"></i>
                                        {jobData.company_size}
                                      </div>
                                    ) : null}
                                    {jobData.job_type ? (
                                      <div
                                        className="info_box text-left font-size-3 mb-4 mr-10"
                                        title="Job Type"
                                      >
                                        <span className="font-size-3 text-smoke text-capitalize">
                                          <b>Job Type </b> {jobData.job_type}
                                        </span>
                                      </div>
                                    ) : null}
                                    {jobData.education ? (
                                      <div
                                        className="font-size-3 mb-4 mr-10"
                                        title="Edication"
                                      >
                                        <i className="fas fa-graduation-cap mr-2"></i>
                                        <Link className="text-dark" to={""}>
                                          {jobData.education}
                                        </Link>
                                      </div>
                                    ) : null}
                                    {jobData.role_category ? (
                                      <div
                                        className="font-size-3 mb-4 mr-10"
                                        title="Hiring for"
                                      >
                                        <i className="fas fa-bullhorn mr-2"></i>
                                        {jobData.role_category}
                                      </div>
                                    ) : null}
                                    <div className="info_box text-left font-size-3 mb-4 mr-10 text-capitalize">
                                      {jobData.experience_required ? (
                                        <span
                                          className="font-size-3 text-smoke"
                                          title="Total Experience"
                                        >
                                          <img
                                            className="mr-1"
                                            height={"16px"}
                                            src="image/icons/envelope.svg"
                                            alt="Email"
                                          />
                                          {jobData.experience_required} Years
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                    {jobData.salary ? (
                                      <div className="info_box text-left font-size-3 mb-4 mr-10">
                                        <span
                                          className="font-size-3 text-smoke  text-capitalize"
                                          title="Salary"
                                        >
                                          <b> Salary: </b>$ {jobData.salary}
                                        </span>
                                      </div>
                                    ) : null}
                                    {jobData.department ? (
                                      <div className="info_box text-left font-size-3 mb-4 mr-10">
                                        <span
                                          className="font-size-3 text-smoke text-capitalize"
                                          title="NOC code"
                                        >
                                          <b> NOC Code: </b>
                                          {jobData.department}
                                        </span>
                                      </div>
                                    ) : null}
                                  </div>
                                )}
                              </div>
                              {jobData.email ? (
                                <div className="p-0 d-none">
                                  <div className="d-flex justify-content-between align-items-center">
                                    <Link
                                      className="font-size-3 text-break btn btn-outline-secondary btn-rounded px-4"
                                      to={`mailto:${jobData.email}`}
                                    >
                                      <BsEnvelope className="text-secondary font-size-5 mr-2" />
                                      {jobData.email}
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
                                  {jobData.contact_no_other && (
                                    <Link
                                      className="text-dark font-size-5 w-100"
                                      to={`tel:+${jobData.contact_no_other}`}
                                    >
                                      <BiPhoneCall className="text-primary font-size-5" />
                                      {jobData.contact_no_other}
                                    </Link>
                                  )}
                                </div>
                              ) : (
                                ""
                              )}
                              {/* <p className="font-size-3 text-default-color line-height-2 m-0 text-break">
                                    {jobData.department}
                                  </p> */}
                            </div>
                          </div>
                        </div>
                        <div className=" row text-capitalize company_detail_box w-100 m-0 mt-5  rounded p-8 position-relative">
                          <div className="col-md-12 col-lg-12 p-0">
                            <div className="row bg-light">
                              <div className="col-lg-5 col-md-6 p-8 border-right">
                                <h4 className="text-black-2 mb-0 font-size-5 d-flex text-break align-items-center justify-content-space-between">
                                  <b className="block text-sm text-indigo-600">
                                    Job Description
                                  </b>
                                  {/* <CustomButton
                                  className="font-size-3 rounded-3 btn-primary border-0  absolute_top_right"
                                  onClick={() => setShowJobEditModal(true)}
                                >
                                  <PiPencilDuotone />
                                </CustomButton> */}
                                </h4>
                                <div className="lmia-details mt-3 p-4 border rounded bg-white from-blue-50 to-indigo-50 shadow-lg">
                                  {jobData.job_description ? (
                                    // <p className="font-size-4 mb-8 ">
                                    //   {jobData.job_description}
                                    // </p>
                                    <div className="font-size-4 mb-8">
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: jobData.job_description,
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
                              <div className="col-lg-7 col-md-6 p-8">
                                <h4 className="text-black-2 mb-0 font-size-5 d-flex text-break align-items-center justify-content-space-between">
                                  <b className="block text-sm text-indigo-600">LMIA Details: </b>
                                </h4>
                                <CustomButton
                                  className={
                                    user_type === "user" ||
                                      user_type === "agent" ||
                                      jobData.length === 0
                                      ? "d-none"
                                      : "font-size-3 rounded-3 btn-primary border-0  absolute_top_right"
                                  }
                                  title="Edit LMIA Info"
                                  onClick={(e) => setShowLmiaAdditionalInfobModal(true)}
                                >
                                  <PiPencilDuotone />
                                </CustomButton>
                                {jobData.lmia_number ? (
                                  <div className="lmia-details mt-3 p-4 border rounded bg-white from-blue-50 to-indigo-50 shadow-lg">
                                    <div className="row text-indigo-900 font-semibold">
                                      <div className="col-6 mb-3">
                                        <b className="block text-sm text-indigo-600">LMIA Number: </b>

                                        <span className="block text-base"> {jobData.lmia_number || "N/A"}</span>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <b className="block text-sm text-indigo-600">Creation Date: </b>
                                        <span className="block text-base">
                                          <ConvertTime
                                            _date={jobData.lmia_creation_date}
                                            format={"DD-MM-YYYY"}
                                          />
                                        </span>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <b className="block text-sm text-indigo-600">Submission Date: </b>
                                        <span className="block text-base">
                                          <ConvertTime
                                            _date={jobData.lmia_submissiom_date}
                                            format={"DD-MM-YYYY"}
                                          />
                                        </span>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <b className="block text-sm text-indigo-600">Approved Date: </b>
                                        <span className="block text-base">
                                          <ConvertTime
                                            _date={jobData.lmia_date_approved}
                                            format={"DD-MM-YYYY"}
                                          />
                                        </span>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <b className="block text-sm text-indigo-600">Expiry Date: </b>
                                        <span className="block text-base">
                                          <ConvertTime
                                            _date={jobData.lmia_date_expiry}
                                            format={"DD-MM-YYYY"}
                                          /></span>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <b className="block text-sm text-indigo-600">Payment Status: </b>
                                        <span className="block text-base"> {jobData.lmia_payment_status || " N/A"}</span>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <b className="block text-sm text-indigo-600">Payment By: </b>
                                        <span className="block text-base"> {jobData.lmia_payment_by || " N/A"}</span>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <b className="block text-sm text-indigo-600">Notes: </b>
                                        <span className="block text-base"> {jobData.lmia_notes || " N/A"}</span>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <b className="block text-sm text-indigo-600">Type of LMIA: </b>
                                        <span className={`block text-baser ${jobData.type_of_lmia ? `${determineBackgroundColor(jobData)} text-white` : " text-dark"} rounded-pill font-size-1 px-1  mr-2`}
                                          title={filterjson.type_of_lmia.find((item) => item.value === jobData.type_of_lmia)?.label
                                            || "N/A"}>
                                          <span
                                            className="font-size-3 font-weight-normal m-0">  {filterjson.type_of_lmia.find((item) => item.value === jobData.type_of_lmia)?.label
                                              || "N/A"}
                                          </span>
                                        </span>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <b className="block text-sm text-indigo-600">Monday Status: </b>
                                        <span className={`block text-baser ${jobData.lmia_monday_status ? `${determineBackgroundColor(jobData)} text-white` : " text-dark"} rounded-pill font-size-1 px-1  mr-2`}
                                          title={filterjson.monday_status.find((item) => item.value === jobData.lmia_monday_status)?.label
                                            || "N/A"}>
                                          <span
                                            className="font-size-3 font-weight-normal m-0">  {filterjson.monday_status.find((item) => item.value === jobData.lmia_monday_status)?.label
                                              || "N/A"}
                                          </span>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="text-muted font-italic">No LMIA details available</div>
                                )}
                                <h4 className="text-black-2 mb-0 font-size-5 pt-10 d-flex text-break align-items-center justify-content-space-between">
                                  <b className="block text-sm text-indigo-600">
                                    Skills
                                  </b>
                                </h4>
                                <div className="lmia-details mt-3 p-4 border rounded bg-white from-blue-50 to-indigo-50 shadow-lg">
                                  <div className="tags">

                                    {skill.length > 0 ? (
                                      <ul className="list-unstyled d-flex align-items-center flex-wrap row px-2">
                                        {(skill || []).map((skill, i) =>
                                          skill === "" ? null : (
                                            <li key={i}>
                                              <span className="text-capitalize bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2 m-1 text-break">
                                                {skill}
                                              </span>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    ) : (
                                      <div className="text-center">
                                        <b>No Skill's found</b>
                                      </div>
                                    )}
                                  </div>
                                </div>
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
                      job_id={jid}
                      heading={"jobdetail"}
                      response={"response"}
                      detail={"job_detail"}
                      setLmia={setLmia}
                      apiCall={apiCall}
                      setApiCall={setApiCall}
                      setLmiaStatusRejectComment={setLmiaStatusRejectComment}
                      pageNo={pageNo}
                      setpageNo={setpageNo}
                    />
                  </div>
                  {/* <!-- Top Start --> */}
                </div>
                <div
                  className={
                    TabActive === "notes"
                      ? "justify-content-center "
                      : "d-none"
                  }
                >
                  <Addfollowup
                    userId={jid}
                    userType={"job"}
                    setApiCall={setApiCall}
                    assigned_by_id={jobData.assigned_by}
                    noteNotification={notes}
                    show={TabActive === "notes" || addNote}
                    page={TabActive === "notes" ? "no" : "yes"}
                    close={() => {
                      setAddNote(false);
                    }}
                    note_id={notes ? note_id : ""}
                    skip={() => navigate(-1)}
                  />
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
                  {TabActive === "documents" ? (
                    <SharePointDocument
                      user_id={jid}
                      emp_user_type={"job"}
                      folderId={
                        docParentId
                          ? docParentId
                          : jobData.doc_folder_id
                      }
                      AnnoteId={docHighAnnoId}
                      docTaskId={docTaskId}
                      notification={docId ? "yes" : "no"}
                      docId={docId ? docId : ""}
                      docTypePage={"adobe"}
                      user_name={jobData.job_title}
                      partnerId={""}//jobData.reffer_by
                    />
                  ) : null}
                </div>
                <div
                  className={TabActive === "chat" ? "justify-content-center " : "d-none"}>
                  <div className="response_main_div w-100">
                    <JobChatBox
                      userId={jid}
                      partnerChatNav={chat}
                      type={"job_chat"}
                      emp_user_type={"job"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {user_type === "admin" || user_type === "agent" ? "" : <EmployeeFooter />}
      {showJobEditModal ? (
        <AddJobModal
          show={showJobEditModal}
          jobdata={jid}
          admin={"admin"}
          setApiCall={setApiCall}
          apiCall={apiCall}
          close={() => setShowJobEditModal(false)}
        />
      ) : null}
      {
        showLmiaAdditionalInfobModal ? (
          <LmiaInfo
            show={showLmiaAdditionalInfobModal}
            resData={jobData}
            apiCall={apiCall}
            setApiCall={setApiCall}
            job={"yes"}
            close={() => {
              setShowLmiaAdditionalInfobModal(false);
            }}
          />
        ) : null
      }
      {/* {showCompanyInfoModal ? (
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
      ) : null} */}
    </div>
  );
}

export default JobDetailpageAdmim;
