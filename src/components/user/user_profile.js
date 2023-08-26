import React, { useEffect, useState } from "react";
import EmployeeFooter from "../common/footer";
import EmployementDetails from "../forms/user/employement";
import PersonalDetails from "../forms/user/personal";
import EducationDetails from "../forms/user/education";
import ItSkills from "../forms/user/skills";
import FilterJson from "../json/filterjson";
import CustomButton from "../common/button";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  EmployeeDetails,
  EmployeeAppliedJob,
  AddEmployeeDetails,
  GetEmployeeByLima,
  GetLimaSubStages
} from "../../api/api";
import moment from "moment";
import Addfollowup from "../forms/admin/addfollowup";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../common/loader";
import { PiPencilDuotone } from "react-icons/pi";
import AdminHeader from "../admin/header";
import AdminSidebar from "../admin/sidebar";
import DocumrentContainer from "../common/employeeDocumrentContainer";
import { BiPhoneCall } from "react-icons/bi";
import { BsEnvelope } from "react-icons/bs";
import JobProfileResponse from "../admin/profile_response";
import VisaTable from "../common/visaTable";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { RiMailSendLine } from "react-icons/ri";
import EmployeeHeader from "../common/header";
const NewUserProfile = (props) => {
  const { eid } = useParams();
  let navigate = useNavigate();

  // console.log(eid, "PARATATATA");
  const [apiCall, setApiCall] = useState(false);
  const [lima, setLmia] = useState(false);
  const [showEmplyomentDetails, setShowEmplyomentDetails] = useState(false);
  const [showPersonalDetails, setShowPersonalDetails] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showItSkills, setShowItSkills] = useState(false);
  const [TabActive, setTabActive] = useState("profile");
  const [userDetail, setuserDetail] = useState([]);
  const [PersonalDetail, setPersonalDetail] = useState([]);
  const [appliedJob, setAppliedJob] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  const user_type = localStorage.getItem("userType");
  // let id = localStorage.getItem("employee_id");
  const name = localStorage.getItem("name");
  const employeeId = eid

  /*Function to get user Data */
  const UserData = async () => {
    try {
      const userData = await EmployeeDetails(employeeId);
      if (
        userData.data === undefined ||
        userData.data.length === 0 ||
        userData.data.employee.length === 0
      ) {
        setuserDetail([]);
        setPersonalDetail([]);
        setIsLoading(false);
      } else {
        setuserDetail(userData.data);
        setStatus(userData.data.employee[0].status);
        setPersonalDetail(userData.data.employee[0]);
        if (user_type === "user") {
          localStorage.setItem(
            "profile_photo",
            userData.data.employee[0].profile_photo
          );
          localStorage.setItem("name", userData.data.employee[0].name);
          localStorage.setItem(
            "skill",
            userData.data.skill.map((obj) => obj.skill).join(", ")
          );
        }
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err)
      setIsLoading(false);
    }
  };
  // console.log(userDetail)
  /*FUnction to get Lmia */
  const getLimaOfuser = async () => {
    try {
      let response = await GetEmployeeByLima(
        "",
        "",
        "",
        "1",
        "10",
        null,
        null,
        "",
        eid
      );
      if (response.message === "successful") {
        /*Logic for finding reject substage of decision lima status */
        if (response.data.filter((item) => item.lmia_status === "decision")) {
          const filteredData = response.data.filter(item => item.lmia_status === "decision");
          if (filteredData.length >= 0) {
            for (let i = 0; i < filteredData.length; i++) {
              const data = filteredData[i];
              const subStageRes = await GetLimaSubStages(data.id, data.lmia_status);
              if ((subStageRes.data.data.filter(
                (item) => (item.lmia_status === "decision" && item.lmia_substage === "reject")).length > 0)) {
                setLmia(response.data.filter((item) => item.job_id !== data.job_id))
              } else {
                setLmia(response.data)
              }
            }
          }
        }
      }
    } catch (err) {
      console.log(err)
      setIsLoading(false);
    }
  };
  /*Function to Geyt applied job data */
  const AppliedJob = async () => {
    try {
      const applied = await EmployeeAppliedJob(employeeId);
      if (applied.data === undefined || applied.data.length === 0) {
        setAppliedJob([]);
      } else {
        setAppliedJob(applied.data);
      }
    } catch (err) {
      console.log(err)
    }
  };

  /*Render function to get user Data */
  useEffect(() => {
    if (appliedJob) {
      AppliedJob();
    }
    UserData();
    getLimaOfuser();
    if (apiCall === true) {
      setApiCall(false);
      // if (PersonalDetail.name !== (undefined || "undefined" || null || "null")
      //   || PersonalDetail.profile_photo !== (undefined || "undefined" || null || "null")) {
      //   localStorage.setItem("profile_photo", PersonalDetail.profile_photo)
      //   localStorage.setItem("name", PersonalDetail.name)
      // }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiCall]);

  /*Function to See uploaded resume */
  const handleViewResume = (pdfUrl) => {
    window.open(pdfUrl, "_blank");
  };

  /*Function to calculate the time duration of two dates */
  const calculateDuration = (startDate, endDate) => {
    const start = moment(startDate);
    const end = moment(endDate);
    const duration = moment.duration(end.diff(start));
    const years = duration.years();
    const months = duration.months();
    const days = duration.days();

    return `${years === 1 ? years + "year ," : years > 1 ? years + "years ," : ""
      } ${months === 1 ? months + "month ," : months > 1 ? months + "months ," : ""
      } ${days === 1 ? days + "day" : days !== 1 ? days + "days" : ""}`;
  };
  const [status, setStatus] = useState("");
  /*function to change applicants status */
  const OnStatusChange = async (e) => {
    // e.preventDefault()
    setStatus(e);
    let data = {
      employee_id: eid,
      status: e,
    };
    try {
      let response = await AddEmployeeDetails(data);
      if (response.message === "Employee data updated successfully") {
        toast.success("Employee status changes successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
      }
    } catch (err) {
      console.log(err)
    }
  };
  return (
    /*---- Employee Profile Details Page ----*/
    <div className="site-wrapper overflow-hidden bg-default-2">
      {/* <!-- Header Area --> */}
      {user_type === "admin" ? <>
        <AdminHeader
          heading={
            <Link
              className="d-flex align-items-center "
              onClick={() => navigate(-1)}
            >
              <i className="icon icon-small-left bg-white circle-30 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
              <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                <h3 className="font-size-6 mb-0 text-capitalize">User Profile</h3>
              </span>
            </Link>
          }
        />
        {/* <!-- navbar- --> */}
        <AdminSidebar heading={"User Profile"} />
      </>
        :
        <EmployeeHeader />}
      <div
        className={
          user_type === "admin" ?
            "dashboard-main-container mt-12 mt-lg-12"
            :
            "mt-22 mt-lg-22"
        }
        id="dashboard-body"
      >
        <ToastContainer />
        <div className="container-fluid">
          {name === null || name === "null" ? <h4>Complete profile</h4> : ""}
          {isLoading ? (
            <div className="table-responsive main_table_div">
              <Loader />
            </div>
          ) : (
            <div className="row text-left mt-5 pt-0">
              <div className="col-12 mb-1">
                <div className="bg-white shadow-9 d-flex">
                  <div className="col-md-3 col-sm-6 px-5 pt-5 pb-5 d-flex align-items-center border-right">
                    <Link
                      className="position-relative text-white"
                      onClick={
                        user_type === "company" || props.self === "yes"
                          ? null
                          : () => setShowPersonalDetails(true)
                      }
                    >
                      {user_type === "admin" ? (
                        <>
                          <input
                            type="file"
                            id="ImgUploadInput"
                            className="d-none"
                          />
                          <label
                            className="image_upload_btn image_upload_btn_2 m-0 bg-warning"
                            htmlFor="ImgUploadInput"
                          >
                            <span className="text-">
                              <PiPencilDuotone />
                            </span>
                            {/* <span className="fas fa-pen text-gray"> </span> */}
                          </label>
                        </>
                      ) : (
                        ""
                      )}
                      <img
                        className="rounded-circle"
                        src={
                          PersonalDetail.profile_photo
                            ? PersonalDetail.profile_photo
                            : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png`
                        }
                        alt=""
                        width={"50px"}
                        height={"50px"}
                      />
                    </Link>
                    <div className="ml-2">
                      <h4 className="mb-0 text-capitalize line-height-1">
                        {PersonalDetail.name ? PersonalDetail.name : ""}
                      </h4>
                      <p className="m-0 age_gender font-size-3 d-flex align-items-center">
                        {PersonalDetail.gender ||
                          PersonalDetail.marital_status ||
                          PersonalDetail.marital_status ||
                          PersonalDetail.date_of_birth
                          ? `(${PersonalDetail.gender === "female"
                            ? "F"
                            : PersonalDetail.gender === "male"
                              ? "M"
                              : "O"
                          },
                        ${PersonalDetail.marital_status},
                        ${moment().diff(PersonalDetail.date_of_birth, "years")}
                        Y)`
                          : ""}
                        {/* <DropdownButton
                          as={ButtonGroup}
                          title={"Variant"}
                          size={"sm"}
                          value={status || ""}
                          className="user_status_btn ml-1"
                          onChange={(e) => OnStatusChange(e)}
                        >
                          <Dropdown.Item value="" eventKey="0">Selectstatus</Dropdown.Item>
                          {(FilterJson.employee_status || []).map((item, index) => {
                            return (
                              <Dropdown.Item value={index + 1} eventKey={index + 1}>{item}</Dropdown.Item>
                            )
                          })}
                        </DropdownButton> */}
                        {user_type === "admin" && <DropdownButton
                          as={ButtonGroup}
                          title={
                            status === "1"
                              ? "New"
                              : status === "2"
                                ? "Prospect"
                                : status === "3"
                                  ? "Lead"
                                  : status === "4"
                                    ? "Reatined"
                                    : status === "5"
                                      ? "Lost"
                                      : status === "6"
                                        ? "Dead"
                                        : // ) : status === "7" ? (
                                        //   "Reserved"
                                        status === "0"
                                          ? "New"
                                          : "status"
                          }
                          size="sm"
                          className="user_status_btn btn-primary text-white ml-1"
                          onSelect={OnStatusChange}
                        >
                          {(FilterJson.employee_status || []).map(
                            (item, index) => (
                              <Dropdown.Item
                                key={index}
                                value={index + 1}
                                eventKey={index + 1}
                                className="text-capitalize"
                              >
                                {item}
                              </Dropdown.Item>
                            )
                          )}
                        </DropdownButton>}
                      </p>
                    </div>
                    {/* <p className="mb-8 text-gray font-size-4">
                    {PersonalDetail.gender}
                    </p> */}
                  </div>
                  {PersonalDetail.email ? (
                    <div className="col-md-3 col-sm-6 px-5 pt-5 pb-5 border-right">
                      <div className="d-flex justify-content-between align-items-center">
                        <Link
                          className="text-dark font-size-5 w-100 text-break"
                          to={`mailto:${PersonalDetail.email}`}
                        >
                          <BsEnvelope className="text-primary font-size-5 " />{" "}
                          {PersonalDetail.email}
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
                        to={`tel:${PersonalDetail.contact_no}`}
                      >
                        <BiPhoneCall className="text-primary font-size-5" />{" "}
                        {PersonalDetail.contact_no}
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="col px-5 pt-5 pb-5 d-flex border-right">
                    {PersonalDetail.email === "" ||
                      PersonalDetail.length === 0 ? (
                      <div>
                        <p className="text-center">No Data Found</p>
                      </div>
                    ) : (
                      <div className="personal_info_box d-flex align-items-center justify-content-left flex-wrap">
                        <div className="info_box text-left text-capitalize">
                          {PersonalDetail.current_location ? (
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
                              {PersonalDetail.current_location}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="info_box text-left text-capitalize">
                          {PersonalDetail.language ? (
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
                              {PersonalDetail.language}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="info_box text-left text-capitalize">
                          {PersonalDetail.currently_located_country ? (
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
                              {PersonalDetail.currently_located_country}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="info_box text-left text-capitalize">
                          {PersonalDetail.experience ? (
                            <span
                              className="font-size-3 text-smoke  mr-7"
                              title="Total Experience"
                            >
                              <img
                                className="mr-1"
                                height={"16px"}
                                src="image/icons/envelope.svg"
                                alt="Email"
                              />
                              {PersonalDetail.experience} Years
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                        {PersonalDetail.nationality ? (
                          <div
                            className="info_box text-left"
                            title="Nationality"
                          >
                            <span className="font-size-3 text-smoke  mr-7 text-capitalize">
                              Nationality: <b> {PersonalDetail.nationality}</b>
                            </span>
                          </div>
                        ) : null}
                        {PersonalDetail.work_permit_canada ? (
                          <div className="info_box text-left">
                            <span
                              className="font-size-3 text-smoke  mr-7 text-capitalize"
                              title="Canada Work Permit"
                            >
                              Canada Work Permit:
                              <b> {PersonalDetail.work_permit_canada}</b>
                            </span>
                          </div>
                        ) : null}
                        {PersonalDetail.work_permit_other_country ? (
                          <div className="info_box text-left">
                            <span className="font-size-3 text-smoke  mr-7 text-capitalize">
                              Work Permit of Other Country:
                              <b> {PersonalDetail.work_permit_other_country}</b>
                            </span>
                          </div>
                        ) : null}
                      </div>
                    )}
                    {user_type === "company" || props.self === "yes" ? null : (
                      <CustomButton
                        className="font-size-3 rounded-3 btn-primary border-0 ml-2 absolute_top_right"
                        onClick={() => setShowPersonalDetails(true)}
                      >
                        <PiPencilDuotone />
                      </CustomButton>
                    )}
                  </div>

                  {PersonalDetail.resume ? (
                    <div className="col-1 px-5 pt-5 pb-5 d-flex align-items-center">
                      <span className="font-size-5">
                        <Link
                          to={""}
                          onClick={() =>
                            handleViewResume(PersonalDetail.resume)
                          }
                        >
                          Resume
                        </Link>
                      </span>
                    </div>
                  ) : (
                    ""
                  )}

                  {/* <div className="col px-5 pt-5 pb-5 d-flex align-items-center border-right"></div>
                  <div className="profile_email_mobile"></div> */}
                </div>
              </div>
              <div className={
                // noLima==="1"?"d-none":
                "col-12"}>
                <div className="bg-white w-100 d-flex flex-wrap mb-1">
                  <div className="arrow-wrapper custome_arrow_wrapper w-100 d-flex flex-wrap mb-0">
                    {(lima || []).map((status, i) => {
                      return status.lmia_status === "" ||
                        status.lmia_status === null ||
                        status.lmia_status === undefined ||
                        status.lmia_status === "undefined" ? null : (
                        <div className="arrow-steps p-1 px-7 col-md-4 d-flex border-right border-bottom justify-content-between" key={i}>
                          <div className="job_name text-dark">
                            <span className="m-0 font-size-2 d-block mb-1">
                              {status.job_title}
                            </span>
                            <span className="m-0 font-size-2 d-block">
                              {status.company_name}
                            </span>
                          </div>
                          <div>
                            <div
                              key={i + 1}
                              className={`step text-capitalize ${status.lmia_status === "candidate placement" ||
                                status.lmia_status === "submission" ||
                                status.lmia_status === "decision"
                                ? "current"
                                : null
                                }`}
                            >
                              <span>candidate placement</span>
                            </div>
                            <div
                              key={i + 2}
                              className={`step text-capitalize ${status.lmia_status === "submission" ||
                                status.lmia_status === "decision"
                                ? "current"
                                : null
                                }`}
                            >
                              <span>submission</span>
                            </div>
                            <div
                              key={i + 3}
                              className={`step text-capitalize ${status.lmia_status === "decision"
                                ? "current"
                                : null
                                }`}
                            >
                              <span>decision</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="col-12 order-2 order-xl-1">
                <div className="bg-white">
                  {/* LMIA */}
                  {/* <ul
                    className="nav border-bottom border-bottom border-mercury user_profile_tab"
                    id="myTab"
                    role="tablist"
                  >
                    
                  </ul> */}
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
                        Applied Jobs
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
                    <li className={user_type === "user" ? "d-none" : "tab-menu-items nav-item"}>
                      <Link
                        className={
                          TabActive === "visa"
                            ? "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10 active"
                            : "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10"
                        }
                        id="visaTab"
                        data-toggle="tab"
                        role="tab"
                        aria-controls="visaTab"
                        aria-selected="true"
                        onClick={() => setTabActive("visa")}
                      >
                        Visa
                      </Link>
                    </li>
                    <li className={user_type === "user" || user_type === "company" ? "d-none" : "tab-menu-items nav-item"}>
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
                    <li className="tab-menu-items nav-item d-none">{/*Take off "d-none" when you use the activity log API or when you're told to remove it*/}
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
                    className={
                      TabActive === "profile" ? "tab-content" : "d-none"
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
                      <div className="row m-0">
                        <div className="col-md-6 p-10 border-right ">
                          <h4 className="text-black-2 mb-5 font-size-5 d-flex align-items-center justify-content-space-between">
                            <span>About</span>
                          </h4>
                          <p className="text-break m-0">
                            {PersonalDetail.description}
                          </p>
                        </div>
                        {/* <div className="col-md-4 p-10 border-right border-mercury">
                          <h4 className="text-black-2 mb-5 font-size-5 d-flex align-items-center justify-content-space-between">
                            <span>Personal Info</span>

                            {showDoc ? (
                              <DocumentModal
                                show={showDoc}
                                close={() => setShowDoc(false)}
                                employee_id={employeeId}
                              />
                            ) : null}
                            </h4>
                          </div> */}
                        {showPersonalDetails ? (
                          <PersonalDetails
                            show={showPersonalDetails}
                            employeeId={employeeId}
                            apiCall={apiCall}
                            setApiCall={setApiCall}
                            close={() => setShowPersonalDetails(false)}
                          />
                        ) : null}
                        {/*----Employee's Education Profile----*/}
                        <div
                          id="Career_Profile"
                          className="border-top p-10 col-md-6 border-right"
                        >
                          <h4 className="text-black-2 mb-5 font-size-5 d-flex align-items-center justify-content-space-between">
                            <span>Career Profile</span>
                            {user_type === "company" ||
                              props.self === "yes" ? null : (
                              <CustomButton
                                className="font-size-3 rounded-3 btn-primary border-0 ml-2 absolute_top_right"
                                onClick={() => setShowEmplyomentDetails(true)}
                              >
                                <PiPencilDuotone />
                              </CustomButton>
                            )}
                            {showEmplyomentDetails ? (
                              <EmployementDetails
                                show={showEmplyomentDetails}
                                employeeId={employeeId}
                                apiCall={apiCall}
                                setApiCall={setApiCall}
                                close={() => setShowEmplyomentDetails(false)}
                              />
                            ) : null}
                          </h4>
                          {/* {moment(PersonalDetail.start_date)}
                              {moment([PersonalDetail.start_date]).diff(moment([PersonalDetail.end_date]), 'years', true)} */}

                          {userDetail.career === undefined ||
                            userDetail.career.length === 0 ? (
                            <div>
                              <p className="text-center">No Data Found</p>
                            </div>
                          ) : (
                            (userDetail.career || []).map((CareerDetails) => (
                              <div
                                className="w-100"
                                key={CareerDetails.career_id}
                              >
                                <div className="d-flex align-items-center mb-5 flex-wrap flex-sm-nowrap justify-content-md-between border-top">
                                  <div className="media align-items-center company_box col-md-6 p-0">
                                    <div className="text_box text-left w-100 mt-n2 text-capitalize">
                                      <h3 className="mb-0">
                                        <span className="font-size-6 text-black-2 font-weight-semibold">
                                          {CareerDetails.designation} -
                                          <span className="font-size-4">
                                            {CareerDetails.functional_area}
                                          </span>
                                        </span>
                                      </h3>
                                      <span className="font-size-4 text-default-color line-height-2">
                                        {CareerDetails.company} (
                                        {CareerDetails.industry})
                                      </span>
                                    </div>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-right flex-wrap text-right text-capitalize">
                                    <span className="font-size-4 text-gray w-100">
                                      {/* {moment(CareerDetails.start_date).format(
                                    "YYYY-MM-DD"
                                  )}
                                  -
                                  {moment(CareerDetails.end_date).format(
                                    "YYYY-MM-DD"
                                  )} */}
                                      {calculateDuration(
                                        CareerDetails.start_date,
                                        CareerDetails.end_date
                                      )}
                                    </span>
                                    <span className="font-size-3 text-gray w-100">
                                      <span
                                        className="mr-4"
                                        style={{ marginTop: "-2px" }}
                                      >
                                        <img
                                          src="image/svg/icon-loaction-pin-black.svg"
                                          alt=""
                                        />
                                      </span>
                                      {CareerDetails.company_location}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                        {/* Employee's Skills */}
                        <div className="border-top p-10 col-md-6 border-right">
                          <h4 className="text-black-2 mb-5 font-size-5 d-flex align-items-center justify-content-space-between">
                            <span>Skill</span>
                            {user_type === "company" ||
                              props.self === "yes" ? null : (
                              <CustomButton
                                className="font-size-3 rounded-3 btn-primary border-0 ml-2 absolute_top_right"
                                onClick={() => setShowItSkills(true)}
                              >
                                <PiPencilDuotone />
                              </CustomButton>
                            )}
                          </h4>
                          <div className="icon-link d-flex align-items-center justify-content-center flex-wrap ">
                            {showItSkills ? (
                              <ItSkills
                                show={showItSkills}
                                employeeId={employeeId}
                                apiCall={apiCall}
                                setApiCall={setApiCall}
                                close={() => setShowItSkills(false)}
                              />
                            ) : null}

                            <ul className="list-unstyled d-flex align-items-start flex-wrap">
                              {userDetail.skill === undefined ? (
                                <li>No Data Found</li>
                              ) : (
                                (userDetail.skill || []).map(
                                  (employeeSkills) => (
                                    <li key={employeeSkills.skill_id}>
                                      <span className="bg-polar text-black-2 mr-3 mb-2 p-2 font-size-3 rounded-3 d-flex align-items-center">
                                        {employeeSkills.skill}
                                      </span>
                                    </li>
                                  )
                                )
                              )}
                            </ul>
                          </div>
                        </div>

                        {/*----Employee's Education Profile----*/}
                        <div
                          id="Education_Profile"
                          className="border-top col-md-6 p-10"
                        >
                          <h4 className="text-black-2 mb-5 font-size-5 d-flex align-items-center justify-content-space-between">
                            <span>Education</span>
                            {user_type === "company" ||
                              props.self === "yes" ? null : (
                              <CustomButton
                                className="font-size-3 rounded-3 btn-primary border-0 ml-2 absolute_top_right"
                                onClick={() => setShowEducation(true)}
                              >
                                <PiPencilDuotone />
                              </CustomButton>
                            )}
                            {showEducation ? (
                              <EducationDetails
                                show={showEducation}
                                employeeId={employeeId}
                                apiCall={apiCall}
                                setApiCall={setApiCall}
                                close={() => setShowEducation(false)}
                              />
                            ) : null}
                          </h4>
                          {userDetail.education === undefined ||
                            userDetail.education.length === 0 ? (
                            <div>
                              <p className="text-center">No Data Found</p>
                            </div>
                          ) : (
                            (userDetail.education || []).map(
                              (EducationDetails, index) => (
                                <div
                                  className="w-100"
                                  key={EducationDetails.education_id}
                                >
                                  <div className="d-flex align-items-center mb-5 flex-wrap flex-sm-nowrap justify-content-md-between border-top">
                                    <div className="media align-items-center company_box p-0">
                                      <div className="text_box text-left w-100 mt-n2 text-capitalize">
                                        <h3 className="mb-0">
                                          <span className="font-size-6 text-black-2 font-weight-semibold">
                                            {EducationDetails.qualification}
                                            <span className="font-size-4">
                                              (
                                              {
                                                EducationDetails.university_institute
                                              }
                                              )
                                            </span>
                                          </span>
                                        </h3>
                                        <span className="font-size-4 text-default-color line-height-2">
                                          {EducationDetails.course},
                                          {EducationDetails.specialization}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-right flex-wrap text-right text-capitalize">
                                      <span className="font-size-4 text-gray w-100">
                                        {EducationDetails.passing_year}
                                      </span>
                                      <span className="font-size-3 text-gray w-100">
                                        <span
                                          className="mr-4"
                                          style={{ marginTop: "-2px" }}
                                        >
                                          <img
                                            src="image/svg/icon-loaction-pin-black.svg"
                                            alt=""
                                          />
                                        </span>
                                        {EducationDetails.institute_location}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )
                            )
                          )}
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
                    {/* <EmployeeTable /> */}
                    {TabActive === "jobs" ? (
                      <JobProfileResponse
                        employee_id={eid}
                        heading={"userprofile"}
                      />
                    ) : null}
                    {/* <!-- Top Start --> */}
                    {/* <div className="mb-5">
                      <h4 className="font-size-7 mb-9 mt-5">Applied Jobs</h4>
                      <div className="row justify-content-center">
                        {appliedJob === undefined || appliedJob.length === 0 ? (
                          <div className="text-center text-dark">
                            No Data Found
                          </div>
                        ) : (
                          (appliedJob || []).map((data, i) => {
                            return (
                              <Link
                                to={
                                  user_type === "admin"
                                    ? "/job"
                                    : user_type === "user"
                                    ? "/jobs"
                                    : "/managejobs"
                                }
                                className="col-lg-6 col-sm-11 mb-9"
                                key={i}
                              >
                                <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3">
                                  <div className="media align-items-center">
                                    <div className="square-52 mr-8 rounded">
                                      <img
                                        src={
                                          data.logo
                                            ? data.logo
                                            : "image/l3/png/fimize.png"
                                        }
                                        alt=""
                                        width={100}
                                      />
                                    </div>
                                    <div className=" mx-5 text-capitalize">
                                      <span
                                        to=""
                                        className="font-size-3 text-default-color line-height-2"
                                      >
                                        {data.company_name}
                                      </span>
                                      <h3 className="font-size-5 mb-0">
                                        <span
                                          className="heading-default-color font-weight-semibold"
                                          to=""
                                        >
                                          {data.job_title}
                                        </span>
                                      </h3>
                                    </div>
                                  </div>
                                  <div className="pt-5">
                                    <span className="font-size-3 text-gray  mr-7">
                                      Resume:<b>{data.employee_lmia_status}</b>
                                    </span>
                                  </div>

                                  <div className="d-flex pt-10">
                                    <ul className="list-unstyled mb-1 d-flex flex-wrap text-capitalize">
                                      <li>
                                        <span
                                          to=""
                                          className="bg-regent-opacity-15 text-denim font-size-3 rounded-3 min-width-px-100 px-3 flex-all-center mr-6 h-px-33 mt-4"
                                        >
                                          <i className="icon icon-pin-3 mr-2 font-weight-bold"></i>
                                          {data.location}
                                        </span>
                                      </li>
                                      <li>
                                        <span
                                          to=""
                                          className="bg-regent-opacity-15 text-orange font-size-3 rounded-3 min-width-px-100 px-3 flex-all-center mr-6 h-px-33 mt-4"
                                        >
                                          <i className="fa fa-briefcase mr-2 font-weight-bold"></i>
                                          {data.job_type}
                                        </span>
                                      </li>
                                      <li>
                                        <span
                                          to=""
                                          className="bg-regent-opacity-15 text-eastern font-size-3 rounded-3 min-width-px-100 px-3 flex-all-center mr-6 h-px-33 mt-4"
                                        >
                                          <i className="text-eastern fa fa-briefcase mr-2 font-weight-bold"></i>
                                          {data.experience_required}
                                        </span>
                                      </li>
                                      <li>
                                        <span
                                          to=""
                                          className="bg-regent-opacity-15 text-gray font-size-3 rounded-3 min-width-px-100 px-3 flex-all-center mr-6 h-px-33 mt-4"
                                        >
                                          <i className="text-gray fa fa-clock mr-2 font-weight-bold"></i>
                                          {moment(data.created_at).format(
                                            "YYYY-MM-DD"
                                          )}
                                        </span>
                                      </li>

                                      <li>
                                        <span
                                          to=""
                                          className="bg-regent-opacity-15 text-red font-size-3 rounded-3 min-width-px-100 px-3 flex-all-center mr-6 h-px-33 mt-4"
                                        >
                                          <i className="fas fa-rupee-sign mr-2 font-weight-bold"></i>
                                          {data.salary}
                                        </span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </Link>
                            );
                          })
                        )}
                      </div>
                    </div> */}
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
                      <DocumrentContainer employee_id={eid} />
                    ) : null}
                  </div>
                  <div
                    className={
                      TabActive === "visa"
                        ? "justify-content-center "
                        : "d-none"
                    }
                  >
                    {TabActive === "visa" ? (
                      <VisaTable
                        employee_id={eid}
                        setApiCall={setApiCall}
                        page={"user_profile"}
                      />
                    ) : null}
                  </div>
                  <div
                    className={
                      TabActive === "notes"
                        ? "justify-content-center "
                        : "d-none"
                    }
                  >
                    {TabActive === "notes" ? (
                      <Addfollowup employee_id={eid} setApiCall={setApiCall} />
                    ) : null}
                    {/* <div className="p-10 notes_container">
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
                    </div> */}
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
          )}
        </div>
      </div>
      {user_type === "admin" ? "" : <EmployeeFooter />}
    </div>
  );
};

export default NewUserProfile;
