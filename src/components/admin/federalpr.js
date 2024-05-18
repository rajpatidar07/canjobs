import React, { useState } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import EmployeeTable from "../common/employeeTable";
import ApplicantsFilter from "../common/applicantsFilter";

export default function Federalpr() {

/*Filter and search state */
const [experienceFilterValue, setExperienceFilterValue] = useState("");
const [skillFilterValue, setSkillFilterValue] = useState("");
const [pageNo, setpageNo] = useState(1);
const [educationFilterValue, setEducationFilterValue] = useState("");
const [agentFilterValue, setAgentFilterValue] = useState("");
const [adminFilterValue, setAdminFilterValue] = useState("");
const [interestFilterValue, setinterestFilterValue] = useState("");
const [search, setSearch] = useState("");
const [searcherror, setSearchError] = useState("");
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
  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader heading={"Federal PR"} />
        {/* <!-- navbar- --> */}
        <AdminSidebar heading={"Federal PR"} />
        <div className="dashboard-main-container mt-16" id="dashboard-body">
          <div className="container-fluid">
            <div className="mb-18">
              <div className="mb-4 align-items-center">
                <div className="page___heading">
                  <h3 className="font-size-6 mb-0">Federal PR</h3>
                </div>
                {/*<-- Search Federal pr -->*/}
                <div className="row m-0 align-items-center">
              {/* Employees filter's */}
             <ApplicantsFilter
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
                    setSearchError={setSearchError}
                    // skill={props.skill}
                    pageName={"Federal_pr"}
  />
            </div>
                <small className="text-danger">{searcherror}</small>
              </div>
              {/*<-- Business visa Table -->*/}
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
                setApiCall={setApiCall}
                // skill={props.skill}
                // job_id={props.job_id}
                // self={"no"}
                status={"-1"}
                pageNo={pageNo}
                setpageNo={setpageNo}
                ApplicantType={"Federal PR"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
