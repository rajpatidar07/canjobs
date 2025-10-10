import React, { useState } from "react";
// import AdminHeader from "./header";
// import AdminSidebar from "./sidebar";
// import CustomButton from "../common/button";
import { Link } from "react-router-dom";
import PersonalDetails from "../forms/user/personal";
import "react-toastify/dist/ReactToastify.css";
import UserProfile from "../user/profile";
// import { GetFilter, GetAgentJson,getallAdminData } from "../../api/api";
import EmployeeTable from "../common/employeeTable";
import ApplicantsFilter from "../common/applicantsFilter";
import GetThirtyDaysAgo from "../common/Common function/GetThirtyDaysAgo";

function SelfApplicat(props) {
  /*Show modal states */
  let [apiCall, setApiCall] = useState(false);
  let [showAddEmployeeModal, setShowEmployeeMOdal] = useState(false);
  let [showEmployeeProfile, setShowEmployeeProfile] = useState(false);
  /*data and id states */
  let [employeeId, setEmployeeId] = useState();
  /*Filter and search state */
  const [experienceFilterValue, setExperienceFilterValue] = useState("");
  const [skillFilterValue, setSkillFilterValue] = useState(
    props ? props.skill : ""
  );
  const [localFilterValue, setLocalFilterValue] = useState("");
  const [webFilterValue, setWebFilterValue] = useState("");
  const [agentFilterValue, setAgentFilterValue] = useState("");
  const [adminFilterValue, setAdminFilterValue] = useState("");
  const [educationFilterValue, setEducationFilterValue] = useState("");
  const [interestFilterValue, setinterestFilterValue] = useState("");
  const [consultationOptedFilterValue, setConsultationOptedFilterValue] = useState("");
  const [consultationStartDateFilterValue, setConsultationStartDateFilterValue] = useState(GetThirtyDaysAgo());
  const [consultationEndDateFilterValue, setConsultationEndDateFilterValue] = useState(new Date());
  const [filterByEmployeeId, setFilterByEmployeeId] = useState("");
  const [search, setSearch] = useState("");
  const [searcherror, setSearchError] = useState("");
  let [pageNo, setpageNo] = useState(localStorage.getItem("PageNo") || 1);
  let user_type = localStorage.getItem("userType");

  /* Function to show the single data to update Employee*/
  const employeeDetails = (e) => {
    setShowEmployeeProfile(true);
    setEmployeeId(e);
  };
  /* Function to show the single data to update Employee*/
  const editEmployee = (e) => {
    setShowEmployeeMOdal(true);
    setEmployeeId(e);
  };
  /*Function to search the employee */
  const onSearch = (e) => {
    const inputValue = e//.target.value;
    setSearch(inputValue);
    setpageNo(1);
    if (inputValue.length > 0) {
      if (/[-]?\d+(\.\d+)?/.test(inputValue.charAt(0))) {
        setSearchError("Candidate Name cannot start with a number.");
      } else if (!/^[A-Za-z0-9 ]*$/.test(inputValue)) {
        setSearchError("Cannot use special characters.");
      } else {
        setSearchError("");
      }
    } else {
      setSearchError("");
    }
  };
  return (
    <>
      <div
        className={
          props.skill === null || props.skill === undefined
            ? "site-wrapper overflow-hidden bg-default-2"
            : "site-wrapper overflow-hidden "
        }
      >
        {props.skill === null ||
          props.skill === undefined ||
          Object.keys(props.skill).length === 0 ? (
          <>
            {/* <!-- Header Area --> */}
            {/* <AdminHeader heading={"New Applicants"} /> */}
            {/* <!-- navbar- --> */}
            {/* <AdminSidebar heading={"New Applicants"} /> */}
          </>
        ) : null}

        {/* <!--Add Employee Details Modal --> */}
        {showAddEmployeeModal ? (
          <PersonalDetails
            show={showAddEmployeeModal}
            employeeId={employeeId}
            apiCall={apiCall}
            setApiCall={setApiCall}
            close={() => setShowEmployeeMOdal(false)}
          />
        ) : null}
        <div
          className={
            showEmployeeProfile === false
              ? props.skill === null ||
                props.skill === undefined ||
                Object.keys(props.skill).length === 0
                ? "dashboard-main-container mt-14"
                : ""
              : "d-none"
          }
          id="dashboard-body"
        >
          <div className="container-fluid">
            <div className="mb-0">
              <div className="align-items-center">
                <div className="page___heading">
                  <h3 className="font-size-6 mb-0">Applicants</h3>
                </div>
                {/* <!-- Employee Search and Filter- --> */}
                <div className="row m-0 align-items-center">
                  {/* Employees filter's */}
                  <ApplicantsFilter
                    setSearch={setSearch}
                    applicantTypeId={""}
                    user_type={user_type}
                    search={search}
                    onSearch={onSearch}
                    experienceFilterValue={experienceFilterValue}
                    setExperienceFilterValue={setExperienceFilterValue}
                    skillFilterValue={skillFilterValue}
                    setSkillFilterValue={setSkillFilterValue}
                    educationFilterValue={educationFilterValue}
                    setEducationFilterValue={setEducationFilterValue}
                    setpageNo={setpageNo}
                    agentFilterValue={agentFilterValue}
                    setAgentFilterValue={setAgentFilterValue}
                    adminFilterValue={adminFilterValue}
                    setAdminFilterValue={setAdminFilterValue}
                    interestFilterValue={interestFilterValue}
                    setinterestFilterValue={setinterestFilterValue}
                    setCategoryFilterValue={setinterestFilterValue}
                    categoryFilterValue={interestFilterValue}
                    setSearchError={setSearchError}
                    skill={props.skill}
                    pageName={"employee"}
                    setLocalFilterValue={setLocalFilterValue}
                    localFilterValue={localFilterValue}
                    webFilterValue={webFilterValue}
                    setWebFilterValue={setWebFilterValue}
                    filterByEmployeeId={filterByEmployeeId}
                    setFilterByEmployeeId={setFilterByEmployeeId}
                    consultationOptedFilterValue={consultationOptedFilterValue}
                    consultationStartDateFilterValue={consultationStartDateFilterValue}
                    consultationEndDateFilterValue={consultationEndDateFilterValue}
                    setConsultationOptedFilterValue={setConsultationOptedFilterValue}
                    setConsultationStartDateFilterValue={setConsultationStartDateFilterValue}
                    setConsultationEndDateFilterValue={setConsultationEndDateFilterValue}
                  />
                </div>
                <small className="text-danger">{searcherror}</small>
              </div>
              {/* <!-- Employee List Table- --> */}
              <EmployeeTable
                showEmployeeProfile={showEmployeeProfile}
                employeeDetails={employeeDetails}
                search={search}
                experienceFilterValue={experienceFilterValue}
                educationFilterValue={educationFilterValue}
                skillFilterValue={skillFilterValue}
                apiCall={apiCall}
                setApiCall={setApiCall}
                skill={props.skill}
                editEmployee={editEmployee}
                job_id={props.job_id}
                self={"yes"}
                status={"0"}
                pageName={"employee"}
                pageNo={pageNo}
                setpageNo={setpageNo}
                agentFilterValue={agentFilterValue}
                adminFilterValue={adminFilterValue}
                interestFilterValue={interestFilterValue}
                // categoryFilterValue={categoryFilterValue}
                localFilterValue={localFilterValue}
                webFilterValue={webFilterValue}
                filterByEmployeeId={filterByEmployeeId}
                consultationOptedFilterValue={consultationOptedFilterValue}
                consultationStartDateFilterValue={consultationStartDateFilterValue}
                consultationEndDateFilterValue={consultationEndDateFilterValue}
              />
            </div>
          </div>
        </div>
        {/* <!-- Employee Details- --> */}
        {showEmployeeProfile === true ? (
          <div
            className={
              props.skill === null ||
                props.skill === undefined ||
                Object.keys(props.skill).length === 0
                ? "dashboard-main-container mt-14"
                : ""
            }
          >
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-12 dark-mode-texts">
                  <div className="mb-9">
                    <Link
                      to={""}
                      onClick={() => setShowEmployeeProfile(false)}
                      className="d-flex align-items-center ml-4"
                    >
                      <i className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8 mt-10"></i>
                      <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                        Back
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mb-18">
                <UserProfile employeeId={employeeId} self={"yes"} />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default SelfApplicat;
