
import React, { useState } from "react";
import EmployeeTable from "../../common/employeeTable";
import ApplicantsFilter from "../../common/applicantsFilter";
import StudyAdminHeader from "../StudyComman/studyAdminHeader";
import StudyAdminSidebar from "../StudyComman/studySiderbar";
import AdminHeader from "../../admin/header";
import AdminSidebar from "../../admin/sidebar";
import PersonalDetails from "../../forms/user/personal";
export default function StudentList(props) {
  /*Filter and search state */
  const [experienceFilterValue, setExperienceFilterValue] = useState("");
  const [skillFilterValue, setSkillFilterValue] = useState("");
  const [pageNo, setpageNo] = useState(props.page === "program" ? 1 : localStorage.getItem("PageNo") || 1);
  const [educationFilterValue, setEducationFilterValue] = useState("");
  const [agentFilterValue, setAgentFilterValue] = useState("");
  const [adminFilterValue, setAdminFilterValue] = useState("");
  const [interestFilterValue, setinterestFilterValue] = useState("");
  const [statustFilterValue, setStatustFilterValue] = useState("");
  const [search, setSearch] = useState("");
  const [searcherror, setSearchError] = useState("");
  let [showAddEmployeeModal, setShowEmployeeMOdal] = useState(false);
  let [employeeId, setemployeeId] = useState();
  let user_type = localStorage.getItem("userType")
  let [apiCall, setApiCall] = useState(false);
  /*Function to search the employee */
  const onSearch = (e) => {
    const inputValue = e.target.value;
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
  /* Function to show the single data to update Employee*/
  const editEmployee = (e) => {
    setShowEmployeeMOdal(true);
    setemployeeId(e);
  };
  return (
    <>
      <div className={
        props.skill === null || props.skill === undefined
          ? "site-wrapper overflow-hidden bg-default-2"
          : "site-wrapper overflow-hidden "
      }>
        {/* <!-- Header Area --> */}
        {props.skill === null ||
          props.skill === undefined ||
          Object.keys(props.skill).length === 0 ? (
          <>
            {/* <!-- Header Area --> */}
            {user_type === "agent" ? <AdminHeader heading={"Students"} /> : <StudyAdminHeader heading={"Students"} />}
            {/* <!-- navbar- --> */}
            {user_type === "agent" ? <AdminSidebar heading={"Students"} /> : <StudyAdminSidebar heading={"Students"} />}          </>
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
        <div className={props.skill === null ||
          props.skill === undefined ||
          Object.keys(props.skill).length === 0
          ? "dashboard-main-container mt-16"
          : ""

        } id="dashboard-body">
          <div className="container-fluid">
            <div className="mb-18">
              <div className="mb-4 align-items-center">
                <div className="page___heading">
                  <h3 className="font-size-6 mb-0">Students</h3>
                </div>
                {/*<-- Search Students -->*/}
                <div className="row m-0 align-items-center">
                  {/* Employees filter's */}
                  <ApplicantsFilter
                    user_type={user_type}
                    search={search}
                    onSearch={onSearch}
                    skill={props.skill}
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
                    setSearchError={setSearchError}
                    statustFilterValue={statustFilterValue}
                     setStatustFilterValue={setStatustFilterValue}
                    // skill={props.skill}
                    pageName={"study_permit"}
                  />
                </div>
                <small className="text-danger">{searcherror}</small>
              </div>
              {/*<-- Students for study permit Table -->*/}
              <EmployeeTable
                // showEmployeeProfile={showEmployeeProfile}
                // employeeDetails={employeeDetails}
                search={search}
                experienceFilterValue={experienceFilterValue}
                educationFilterValue={educationFilterValue}
                skillFilterValue={skillFilterValue}
                agentFilterValue={agentFilterValue}
                adminFilterValue={adminFilterValue}
                interestFilterValue={interestFilterValue}
                apiCall={apiCall}
                statustFilterValue={statustFilterValue}
                setApiCall={setApiCall}
                skill={props.skill}
                // job_id={props.job_id}
                // self={"no"}
                status={"-1"}
                pageNo={pageNo}
                setpageNo={setpageNo}
                ApplicantType={"study permit"}
                pageName={props.skill ? "" : "employee"}
                editEmployee={editEmployee}
                OnProgramApplyClick={props.OnProgramApplyClick}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
