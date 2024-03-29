import React, { useEffect, useState } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import CustomButton from "../common/button";
import { Link } from "react-router-dom";
import PersonalDetails from "../forms/user/personal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProfile from "../user/profile";
import {getJson} from "../../api/api"
import EmployeeTable from "../common/employeeTable";
import FilterJson from "../json/filterjson";
function Employee() {
  /*Show modal states */
  let [apiCall, setApiCall] = useState(false);
  let [showAddEmployeeModal, setShowEmployeeMOdal] = useState(false);
  let [showEmployeeProfile, setShowEmployeeProfile] = useState(false);
  /*data and id states */
  let [employeeId, setemployeeId] = useState();
  /*Filter and search state */
  const [experienceFilterValue, setExperienceFilterValue] = useState("");
  const [skillFilterValue, setSkillFilterValue] = useState("");
  const [educationFilterValue, setEducationFilterValue] = useState("");
  const [search , setSearch] = useState("");
  const [searcherror, setSearchError] = useState("");
  let [SkillList , setSkillList] = useState([])
  let [EducationList , setEducationList] = useState([])
  /*Function to get thejSon */
 const JsonData=async()=>{
   let Json = await getJson()
   setSkillList(Json.Skill)
   setEducationList(Json.Education)
 }
  /*Render method to get the json*/
  useEffect(()=>{
    JsonData()
    if((search === "") === true){
      setSearchError("")
    }
  },[skillFilterValue , educationFilterValue])
  /* Function to show the single data to update Employee*/
  const employeeDetails = (e) => {
    // e.preventDefault();
    setShowEmployeeProfile(true);
    setemployeeId(e);
  };
  /* Function to show the single data to update Employee*/
  const editEmployee = (e) => {
    // e.preventDefault();
    setShowEmployeeMOdal(true);
    setemployeeId(e);
  };
  /*Function to search the employee */
 const onSearch = (e) => { setSearch(e.target.value);
    if(/[-]?\d+(\.\d+)?/.test(search) ){
      setSearchError("Admin Name can not have a number.")
    }else if(/[^a-zA-Z0-9]/g.test(search)){
      setSearchError("Cannot use special character")
    }else if(search === ""){
      setSearchError("")
    }}
  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader heading={"Manage Applicants"} />
        {/* <!-- navbar- --> */}
        <AdminSidebar heading={"Manage Applicants"} />
        <ToastContainer />
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
              ? "dashboard-main-container mt-16"
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
                <div className="row m-0 align-items-center">
                  <div className="col p-1 form_group mb-5 mt-4">
                    <p className="input_label">Search Employee:</p>
                    <input
                      required
                      type="text"
                      className="form-control"
                      placeholder={"Search Employee"}
                      value={search}
                      name={"Employee_name"}
                      onChange={(e) =>onSearch(e)}
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
                        onChange={(e) =>
                          setEducationFilterValue(e.target.value)
                        }
                        className=" form-control"
                      >
                        <option value="" data-display="Product Designer">
                          Select Education
                        </option>
                        {(EducationList|| []).map((data) => {
                          return (
                            <option value={data.value} key={data.id}>
                              {data.value}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col px-1 form_group mt-4 text-right">
                    <CustomButton
                      className="font-size-3 rounded-3 btn btn-primary border-0"
                      onClick={() => editEmployee("0")}
                      title="Add Employee"
                    >
                      Add Employee
                    </CustomButton>
                  </div>
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
              />
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
                      <i className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                      <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                        Back
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mb-18">
                <UserProfile employeeId={employeeId} />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Employee;
