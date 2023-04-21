import React, { useState } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import CustomButton from "../common/button";
import { Link } from "react-router-dom";
import PersonalDetails from "../forms/user/personal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProfile from "../user/profile";
import FilterJson from "../json/filterjson";
import EmployeeTable from "../common/employeeTable";
function Employee() {
  /*Show modal states */
  let [showAddEmployeeModal, setShowEmployeeMOdal] = useState(false);
  let [showEmployeeProfile, setShowEmployeeProfile] = useState(false);
  /*data and id states */
  let [employeeId, setemployeeId] = useState();
  /*Filter and search state */
  const [experienceFilterValue, setExperienceFilterValue] = useState("");
  const [skillFilterValue, setSkillFilterValue] = useState("");
  const [educationFilterValue, setEducationFilterValue] = useState("");
  const [search, setSearch] = useState("");

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
  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader heading={"Manage Applicants"} />
        {/* <!-- navbar- --> */}
        <AdminSidebar heading={"Manage Applicants"} />
        <ToastContainer />
        <PersonalDetails
          show={showAddEmployeeModal}
          employeeId={employeeId}
          close={() => setShowEmployeeMOdal(false)}
        />
        <div
          className={
            showEmployeeProfile === false
              ? "dashboard-main-container mt-20"
              : "d-none"
          }
          id="dashboard-body"
        >
          <div className="container">
            <div className="mb-18">
              <div className="mb-8 align-items-center">
                <div className="page___heading">
                  <h3 className="font-size-6 mb-0">Applicants</h3>
                </div>
                <div className="row align-items-center">
                  <div className="col-xl-3 col-md-6  form_control mb-5 mt-4">
                    <p className="input_label">Search Employee:</p>
                    <input
                      required
                      type="text"
                      className="form-control"
                      placeholder={"Search Employee"}
                      value={search}
                      name={"Employee_name"}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <div className="col-xl-3 col-md-6  form_control mb-5 mt-4">
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
                  <div className="col-xl-3 col-md-6  form_control mb-5 mt-4">
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
                        {(FilterJson.keyskill || []).map((data, i) => {
                          return (
                            <option value={data} key={i}>
                              {data}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6  form_control mb-5 mt-4">
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
                        {(FilterJson.education || []).map((data, i) => {
                          return (
                            <option value={data} key={i}>
                              {data}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="text-end px-6 w-100">
                    <div className="float-md-right mt-6">
                      <CustomButton
                        className="font-size-3 rounded-3 btn btn-primary border-0"
                        onClick={() => editEmployee("0")}
                      >
                        Add Employee
                      </CustomButton>
                    </div>
                  </div>
                </div>
              </div>
              <EmployeeTable
                employeeDetails={employeeDetails}
                search={search}
                experienceFilterValue={experienceFilterValue}
                educationFilterValue={educationFilterValue}
                skillFilterValue={skillFilterValue}
              />
            </div>
          </div>
        </div>
        {showEmployeeProfile === true ? (
          <div className="dashboard-main-container mt-20">
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
