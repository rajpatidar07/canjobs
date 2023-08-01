import React, { useEffect, useState } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
// import CustomButton from "../common/button";
import { Link, json } from "react-router-dom";
// import PersonalDetails from "../forms/user/personal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import UserProfile from "../user/profile";
import { GetFilter } from "../../api/api"
// import EmployeeTable from "../common/employeeTable";
import FilterJson from "../json/filterjson";
import JobTable from "../common/jobTable";
import JobDetailsBox from "../common/jobdetail" 
export default function Visa() {
     /*Show modal states */
  let [apiCall, setApiCall] = useState(false);
//   let [showAddEmployeeModal, setShowEmployeeMOdal] = useState(false);
  let [showEmployeeProfile, setShowEmployeeProfile] = useState(false);
  /*data and id states */
  // let [employeeId, setemployeeId] = useState();
  let [showJobDetails, setShowJobDetails] = useState(false);
  const [JobId, setJobId] = useState([]);
  /*Filter and search state */
  // const [experienceFilterValue, setExperienceFilterValue] = useState("");
  const [skillFilterValue, setSkillFilterValue] = useState("");
  // const [educationFilterValue, setEducationFilterValue] = useState("");
  const [search, setSearch] = useState("");
  const [searcherror, setSearchError] = useState("");
 const [categoryFilterValue, setCategoryFilterValue] = useState("");
 const [locationFilterValue, setLocationFilterValue] = useState("");
 const [jobSwapFilterValue, setJobSwapFilterValue] = useState("");
 const [company, setCompany] = useState("");
 let [Json, setJson] = useState([]);

 /*Render function to get the job */
 useEffect(() => {
   JsonData();
   if ((search === "") === true) {
     setSearchError("");
   }
 }, [
  skillFilterValue,
   categoryFilterValue,
   locationFilterValue,
   jobSwapFilterValue,
   apiCall,
   search,
   company,
 ]);

 /* Function to show the Job detail data */
 const JobDetail = (e) => {
   setShowJobDetails(true);
   setJobId(e);
 };
  /*Function to get thejSon */
  const JsonData = async () => {
    let Json = await GetFilter()
    setJson(Json.data.data)
  }
  /*Render method to get the json*/
  useEffect(() => {
    JsonData()
    if ((search === "") === true) {
      setSearchError("")
    }
  }, [skillFilterValue])
  /* Function to show the single data to update Employee*/
  // const employeeDetails = (e) => {
  //   setShowEmployeeProfile(true);
  //   setemployeeId(e);
  // };

  /*Function to search the employee */
  const onSearch = (e) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
    if (inputValue.length > 0) {
      if (/[-]?\d+(\.\d+)?/.test(inputValue.charAt(0))) {
        setSearchError("Company Name cannot start with a number.");
      } else if (!/^[A-Za-z0-9 ]*$/.test(inputValue)) {
        setSearchError("Cannot use special characters.");
      } else {
        setSearchError("");
      }
    } else {
      setSearchError("");
    }
  }
  return (
    <>
    <div className="site-wrapper overflow-hidden bg-default-2">
    {/* <!-- Header Area --> */}
        <AdminHeader heading={"Visa status"} />
        {/* <!-- navbar- --> */}
        <AdminSidebar heading={"Visa status"} />

      <ToastContainer />
      <div
        className={
          showJobDetails === false?
              "dashboard-main-container mt-16"
            : "d-none"
        }
        id="dashboard-body"
      >
        <div className="container">
          <div className="mb-18">
            <div className="mb-4 align-items-center">
              <div className="page___heading">
                <h3 className="font-size-6 mb-0">Applicants</h3>
              </div>
              {/* <!-- Employee Search and Filter- --> */}
              {/* <div className="row m-0 align-items-center">
                <div className="col p-1 form_group mb-5 mt-4">
                  <p className="input_label">Search Employee:</p>
                  <input
                    required
                    type="text"
                    className="form-control"
                    placeholder={"Search Employee"}
                    value={search}
                    name={"Employee_name"}
                    onChange={(e) => onSearch(e)}
                  />

                </div>
                <div className="col p-1 form_group mb-5 mt-4">
                  <p className="input_label">Filter by Experience:</p>
                  <div className="select_div">
                    <select
                      name="experience"
                      value={experienceFilterValue}
                      id="experience"
                      onChange={(e) =>
                        setExperienceFilterValue(e.target.value)
                      }
                      className=" form-control"
                    >
                      <option value={""}>Select Experience</option>
                      {(FilterJson.experience || []).map((ex, i) => (
                        <option value={ex} key={i}>
                          {ex}
                          {ex === "Fresher" || ex === "Other" ? "" : "Years"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col p-1 form_group mb-5 mt-4">
                  <p className="input_label">Filter by Skill:</p>
                  <div className="select_div">
                    <select
                      name="skill"
                      value={skillFilterValue}
                      id="Skill"
                      onChange={(e) => setSkillFilterValue(e.target.value)}
                      className=" form-control"
                    >
                      <option value={""}>Select Skill</option>
                      {(SkillList || []).map((data) => {
                        return (
                          <option value={data.value} key={data.id}>
                            {data.value}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="col p-1 form_group mb-5 mt-4">
                  <p className="input_label">Filter by Education:</p>
                  <div className="select_div">
                    <select
                      name="education"
                      value={educationFilterValue}
                      id="education"
                      onChange={(e) =>setEducationFilterValue(e.target.value)}
                      className=" form-control">
                      <option value="" data-display="Product Designer">
                        Select Education
                      </option>
                      {(EducationList || []).map((data) => {
                        return (
                          <option value={data.value} key={data.id}>
                            {data.value}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                {props.skill === null || props.skill === undefined || Object.keys(props.skill).length === 0 ? <div className="col px-1 form_group mt-4 text-right">
                  <CustomButton
                    className="font-size-3 rounded-3 btn btn-primary border-0"
                    onClick={() => editEmployee("0")}
                    title="Add Employee"
                  >
                    Add Employee
                  </CustomButton>
                </div> : null}
              </div> */}
                {/*<-- Job Search and Filter -->*/}
                <div className="row m-0 align-items-center">
                  <div className="col p-1 form_group mb-5 mt-4">
                    <p className="input_label">Search:</p>
                    <input
                      required
                      type="text"
                      className="form-control w-100"
                      placeholder={"Search Job"}
                      value={search}
                      name={"name"}
                      onChange={(e) => onSearch(e)}
                    />
                    <small className="text-danger">{searcherror}</small>
                  </div>{" "}
                  <div className="col p-1 form_group mb-5 mt-4">
                    <p className="input_label">Company Name:</p>
                    <input
                      required
                      type="text"
                      className="form-control w-100"
                      placeholder={"Company name"}
                      value={company}
                      name={"compnay_name"}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                  <div className="col p-1 form_group mb-5 mt-4">
                    <p className="input_label">Filter by Job Category:</p>
                    <div className="select_div">
                      <select
                        name="country"
                        id="country"
                        value={categoryFilterValue}
                        onChange={(e) => setCategoryFilterValue(e.target.value)}
                        className=" form-control"
                      >
                        <option value="">Job Category</option>
                        {(Json.Category || []).map((data) => {
                          return (
                            <option value={data.id} key={data.id}>
                              {data.value}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col p-1 form_group mb-5 mt-4">
                    <p className="input_label">Filter by Job Type:</p>
                    <div className="select_div">
                      <select
                        name="country"
                        id="country"
                        value={jobSwapFilterValue}
                        onChange={(e) => {
                          setJobSwapFilterValue(e.target.value);
                        }}
                        className=" form-control"
                      >
                        <option value="">Job Type</option>
                        {(FilterJson.job_type || []).map((job, i) => (
                          <option key={i} value={job}>
                            {job}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col p-1 form_group mb-5 mt-4">
                    <p className="input_label">Filter by Job Skill:</p>
                    <div className="select_div">
                      <select
                        name="country"
                        id="country"
                        value={skillFilterValue}
                        onChange={(e) => setSkillFilterValue(e.target.value)}
                        className=" form-control"
                      >
                        <option value="">Job Skill</option>
                        {(json.skill || []).map((data) => {
                          return (
                            <option value={data.value} key={data.id}>
                              {data.value}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col p-1 form_group mb-5 mt-4">
                    <p className="input_label">Filter by Job Location:</p>
                    <div className="select_div">
                      <select
                        name="country"
                        id="country"
                        value={locationFilterValue}
                        onChange={(e) => setLocationFilterValue(e.target.value)}
                        className=" form-control"
                      >
                        <option value="">Job Location</option>
                        {(FilterJson.location || []).map((data) => {
                          return (
                            <option value={data} key={data}>
                              {data}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              <small className="text-danger">{searcherror}</small>
            </div>
            {/* <!-- Employee List Table- --> */}
            {/* <EmployeeTable
              showEmployeeProfile={showEmployeeProfile}
              employeeDetails={employeeDetails}
              search={search}
              experienceFilterValue={experienceFilterValue}
              educationFilterValue={educationFilterValue}
              skillFilterValue={skillFilterValue}
              apiCall={apiCall}
              setApiCall={setApiCall}
            //   skill={props.skill}
            //   job_id={props.job_id}
              visa={"yes"}
            /> */}
            <JobTable
            search={search}
            jobSwapFilterValue={jobSwapFilterValue}
            locationFilterValue={locationFilterValue}
            SkillFilterValue={skillFilterValue}
            categoryFilterValue={categoryFilterValue}
            company={company}
            JobDetail={JobDetail}
            apiCall={apiCall}
            setApiCall={setApiCall}
            selfJob={"no"}
            response="visa"/>
          </div>
        </div>
      </div>
      {/* <!-- Employee Details- --> */}
      {showEmployeeProfile === true ? (
        <div className="dashboard-main-container mt-16">
          <div className="container">
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
            {/* <div className="mb-18">
              <UserProfile employeeId={employeeId} />
            </div> */}
          </div>
        </div>
      ) : null}
    </div>
    {/*<-- Job Detail -->*/}
    {showJobDetails === true ? (
          <div className="dashboard-main-container mt-16">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 dark-mode-texts">
                  <div className="mb-9">
                    <Link
                      to={""}
                      onClick={() => setShowJobDetails(false)}
                      className="d-flex align-items-center ml-4"
                    >
                      <i className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                      <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                        Back
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mb-18">
                <JobDetailsBox jobdata={JobId} />
              </div>
            </div>
          </div>
        ) : null}
  </>  )
}

