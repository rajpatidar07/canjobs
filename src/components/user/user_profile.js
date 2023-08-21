import React, { useEffect, useState } from "react";
import EmployeeHeader from "../common/header";
import EmployeeFooter from "../common/footer";
import EmployementDetails from "../forms/user/employement";
import PersonalDetails from "../forms/user/personal";
import EducationDetails from "../forms/user/education";
import ItSkills from "../forms/user/skills";
import CustomButton from "../common/button";
import { Link, useParams } from "react-router-dom";
import { EmployeeDetails, EmployeeAppliedJob } from "../../api/api";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../common/loader";
import DocumentModal from "../forms/admin/EmployeeDocumentModal";
import { PiPencilDuotone } from "react-icons/pi";
import AdminHeader from "../admin/header";
import AdminSidebar from "../admin/sidebar";
import { Tab, Tabs } from "react-bootstrap";
import DocumrentContainer from "../common/employeeDocumrentContainer";
import LmiaTime from "../common/lmiaTime";
import { BiPhoneCall } from "react-icons/bi";
import { BsEnvelope } from "react-icons/bs";
import EmployeeTable from "../common/employeeTable";
import JobResponse from "../admin/response";
import JobProfileResponse from "../admin/profile_response";
import VisaTable from "../common/visaTable";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
const NewUserProfile = (props) => {
  const { eid } = useParams();
  console.log(eid, "PARATATATA");
  const [apiCall, setApiCall] = useState(false);
  const [showDoc, setShowDoc] = useState(false);
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
  let id = localStorage.getItem("employee_id");
  const name = localStorage.getItem("name");
  const employeeId = user_type === "admin" ? eid : id;
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
        setPersonalDetail(userData.data.employee[0]);
        localStorage.setItem(
          "profile_photo",
          userData.data.employee[0].profile_photo
        );
        localStorage.setItem("name", userData.data.employee[0].name);
        localStorage.setItem(
          "skill",
          userData.data.skill.map((obj) => obj.skill).join(", ")
        );
        setIsLoading(false);
      }
    } catch (err) {
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setIsLoading(false);
    }
  };
  // console.log(userDetail)

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
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    }
  };

  /*Render function to get user Data */
  useEffect(() => {
    if (appliedJob) {
      AppliedJob();
    }
    UserData();
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

    return `${
      years === 1 ? years + "year ," : years > 1 ? years + "years ," : ""
    } ${
      months === 1 ? months + "month ," : months > 1 ? months + "months ," : ""
    } ${days === 1 ? days + "day" : days !== 1 ? days + "days" : ""}`;
  };
  return (
    /*---- Employee Profile Details Page ----*/
    <div className="site-wrapper overflow-hidden bg-default-2">
      {/* <!-- Header Area --> */}
      <AdminHeader heading={"User Profile"} />
      {/* <!-- navbar- --> */}
      <AdminSidebar heading={"User Profile"} />

      <div
        className={
          // showEmployeeProfile === false
          //   ?
          "dashboard-main-container mt-12 mt-lg-12"
          //   :"dashboard-main-container mt-25 mt-lg-22 d-none"
        }
        id="dashboard-body"
      >
        <ToastContainer />
        <div className="container-fluid">
          {name === null || name === "null" ? "<h4>Complete profile</h4>" : ""}
          {isLoading ? (
            <div className="table-responsive main_table_div">
              <Loader />
            </div>
          ) : (
            <div className="row text-left mt-5 pt-0">
              <div className="col-12 mb-2">
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
                          ? `(${
                              PersonalDetail.gender === "female"
                                ? "F"
                                : PersonalDetail.gender === "male"
                                ? "M"
                                : "O"
                            },
                        ${PersonalDetail.marital_status},
                        ${moment().diff(PersonalDetail.date_of_birth, "years")}
                        Y)`
                          : ""}
                        <DropdownButton
                          as={ButtonGroup}
                          title={"Variant"}
                          size={"sm"}
                          className="user_status_btn ml-1"
                        >
                          <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                          <Dropdown.Item eventKey="2">
                            Another action
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="3" active>
                            Active Item
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="4">
                            Separated link
                          </Dropdown.Item>
                        </DropdownButton>
                      </p>
                    </div>
                    {/* <p className="mb-8 text-gray font-size-4">
                    {PersonalDetail.gender}
                    </p> */}
                  </div>
                  {PersonalDetail.email ? (
                    <div className="col-md-3 col-sm-6 px-5 pt-5 pb-5 border-right">
                      <Link
                        className="text-dark font-size-5 w-100"
                        to={`mailto:${PersonalDetail.email}`}
                      >
                        <BsEnvelope className="text-primary font-size-5" />{" "}
                        {PersonalDetail.email}
                      </Link>
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
                        className="font-size-3 rounded-3 btn-primary border-0"
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

              <div className="col-12 order-2 order-xl-1">
                <div className="bg-white">
                  {/*----Profile Header----*/}
                  <ul
                    className="nav border-bottom border-bottom border-mercury user_profile_tab"
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
                    <li className="tab-menu-items nav-item">
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
                        <div className="col-md-4 p-10 border-right ">
                          <h4 className="text-black-2 mb-5 font-size-5 d-flex align-items-center justify-content-space-between">
                            <span>About</span>
                          </h4>
                          <p className="text-break m-0">
                            {PersonalDetail.description}
                          </p>
                        </div>
                        <div className="col-md-4 p-10 border-right border-mercury">
                          <h4 className="text-black-2 mb-5 font-size-5 d-flex align-items-center justify-content-space-between">
                            <span>Personal Info</span>

                            {showDoc ? (
                              <DocumentModal
                                show={showDoc}
                                close={() => setShowDoc(false)}
                                employee_id={employeeId}
                              />
                            ) : null}
                            {showPersonalDetails ? (
                              <PersonalDetails
                                show={showPersonalDetails}
                                employeeId={employeeId}
                                apiCall={apiCall}
                                setApiCall={setApiCall}
                                close={() => setShowPersonalDetails(false)}
                              />
                            ) : null}
                          </h4>
                        </div>
                        <div className="col-md-4 p-10">
                          <h4 className="text-black-2 mb-5 font-size-5 d-flex align-items-center justify-content-space-between">
                            <span>Skill</span>
                            {user_type === "company" ||
                            props.self === "yes" ? null : (
                              <CustomButton
                                className="font-size-3 rounded-3 btn-primary border-0"
                                onClick={() => setShowItSkills(true)}
                              >
                                <PiPencilDuotone />
                              </CustomButton>
                            )}
                          </h4>
                          <div className="icon-link d-flex align-items-center justify-content-center flex-wrap ">
                            {/*----Employee's Skills----*/}

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
                          id="Career_Profile"
                          className="border-top p-10 col-md-6 border-right"
                        >
                          <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold text-left d-flex align-items-center justify-content-space-between">
                            <span>Career Profile</span>
                            {user_type === "company" ||
                            props.self === "yes" ? null : (
                              <CustomButton
                                className="font-size-3 rounded-3 btn-primary border-0"
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
                                <div className="d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap justify-content-md-between">
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
                        {/*----Employee's Career Profile----*/}
                        <div
                          id="Career_Profile"
                          className="border-top col-md-6 p-10"
                        >
                          <h4 className="w-100 font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold text-left d-flex align-items-center justify-content-space-between">
                            <span>Education</span>
                            {user_type === "company" ||
                            props.self === "yes" ? null : (
                              <CustomButton
                                className="font-size-3 rounded-3 btn-primary border-0"
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
                                  <div className="d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap justify-content-md-between">
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
                    <JobProfileResponse
                      employee_id={eid}
                      heading={"userprofile"}
                    />
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
                    id="appliedJobs"
                    role="tabpanel"
                    aria-labelledby="appliedJobs"
                  >
                    {/* <LmiaTime
                      // lmia={props.lmia}
                      // job={props.job}
                      // location={location.pathname}
                      doc="yes"
                    /> */}
                    <DocumrentContainer
                      employee_id={PersonalDetail.employee_id}
                    />
                  </div>
                  <div
                    className={
                      TabActive === "visa"
                        ? "justify-content-center "
                        : "d-none"
                    }
                  >
                    <VisaTable employee_id={eid} />
                  </div>
                  <div
                    className={
                      TabActive === "notes"
                        ? "justify-content-center "
                        : "d-none"
                    }
                  >
                    <div className="p-10 notes_container">
                      <div className="single_note mb-5">
                        <small>Created on: 2023-08-03 17:10:53</small>
                        <div class="card p-5">
                          This is some text within a card body.
                        </div>
                      </div>
                      <div className="single_note mb-5">
                        <small>Created on: 2023-08-03 17:10:53</small>
                        <div class="card p-5">
                          This is some text within a card body.
                        </div>
                      </div>
                      <div className="single_note mb-5">
                        <small>Created on: 2023-08-03 17:10:53</small>
                        <div class="card p-5">
                          This is some text within a card body.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      TabActive === "activity"
                        ? "justify-content-center "
                        : "d-none"
                    }
                  >
                    <div className="p-10 activity_container">
                      <div className="single_note mb-5">
                        <small>Created on: 2023-08-03 17:10:53</small>
                        <div class="card p-5">
                          This is some text within a card body.
                        </div>
                      </div>
                      <div className="single_note mb-5">
                        <small>Created on: 2023-08-03 17:10:53</small>
                        <div class="card p-5">
                          This is some text within a card body.
                        </div>
                      </div>
                      <div className="single_note mb-5">
                        <small>Created on: 2023-08-03 17:10:53</small>
                        <div class="card p-5">
                          This is some text within a card body.
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
      {user_type === "admin" ? "" : <EmployeeFooter />}
    </div>
  );
};

export default NewUserProfile;
