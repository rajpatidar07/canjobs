import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PersonalDetails from "../forms/user/personal";
import Education from "../forms/user/education";
import Skills from "../forms/user/skills";
import { getallEmployeeData, DeleteJobEmployee } from "../../api/api";
import moment from "moment";
import SAlert from "../common/sweetAlert";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../common/pagination";
import EmployementDetails from "../forms/user/employement";
import ChangeJob from "../forms/admin/changeJobs";
import Loader  from '../common/loader';

export default function EmployeeTable(props) {
  /*Show modal states */
  let [apiCall, setApiCall] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  const [showEmplyomentDetails, setShowEmplyomentDetails] = useState(false);
  let [showAddEmployeeModal, setShowEmployeeMOdal] = useState(false);
  let [showChangeJobModal, setShowChangeJobModal] = useState(false);
  let [showEducationModal, setShowEducationModal] = useState(false);
  let [showSkillsModal, setShowSkillsModal] = useState(false);
  /*data and id states */
  const [employeeData, setemployeeData] = useState([]);
  let [employeeId, setemployeeId] = useState();
  /*delete state */
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteID] = useState();
  const [deleteName, setDeleteName] = useState("");
  /*Pagination states */
  const [totalData, setTotalData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  /*Shorting states */
  const [columnName, setcolumnName] = useState("employee_id");
  const [sortOrder, setSortOrder] = useState("DESC");

  /* Function to get Employee data*/
  const EmpData = async () => {
    setIsLoading(true)
    const userData = await getallEmployeeData(
      props.search,
      props.experienceFilterValue,
      props.skillFilterValue,
      props.educationFilterValue,
      sortOrder ||props.filter_by_time || props.search || props.experienceFilterValue || props.skillFilterValue || props.educationFilterValue ? 1 : currentPage,
      recordsPerPage,
      columnName,
      sortOrder,
      props.filter_by_time
    );
    if (userData.data.length === 0) {
      setemployeeData([]);
      setIsLoading(false)
    } else {
      setemployeeData(userData.data);
      setTotalData(userData.total_rows);
      setIsLoading(false)
    }
  };

  /*Render function to get the employer*/
  useEffect(() => {
    EmpData();
    if (props.apiCall === true || apiCall === true) {
      props.setApiCall(false);
      setApiCall(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.experienceFilterValue,
    props.skillFilterValue,
    props.educationFilterValue,
    props.search,
    currentPage,
    recordsPerPage,
    columnName,
    sortOrder,
    props.filter_by_time,
    props.apiCall,
    apiCall,
    props.showEmployeeProfile,
  ]);

  /* Function to show the single data to update Employee*/
  const employeeDetails = (e) => {
    // e.preventDefault();
    props.employeeDetails(e);
  };
  /* Function to show the single data to update Employee Education*/
  const editEmployeeEducation = (e) => {
    // e.preventDefault();
    setShowEducationModal(true);
    setemployeeId(e);
  };
  /* Function to show the single data to update Employee*/
  const editEmployee = (e) => {
    // e.preventDefault();
    setShowEmployeeMOdal(true);
    setemployeeId(e);
  };
  /* Function to show the single data to update Employee Skills*/
  const editEmployeeSkills = (e) => {
    // e.preventDefault();
    setShowSkillsModal(true);
    setemployeeId(e);
  };
  /* Function to show the single data to update Employee Career*/
  const editEmployeeCareer = (e) => {
    // e.preventDefault();
    setShowEmplyomentDetails(true);
    setemployeeId(e);
  };
  /* Function to show the single data to apply job */
  const editJob = (e) => {
    // e.preventDefault();
    setShowChangeJobModal(true);
    setemployeeId(e);
  };

  /*To Show the delete alert box */
  const ShowDeleteAlert = (e) => {
    setDeleteID(e.employee_id);
    setDeleteName(e.name);
    setDeleteAlert(true);
  };
  /*To cancel the delete alert box */
  const CancelDelete = () => {
    setDeleteAlert(false);
  };
  /*To call Api to delete employee */
  async function deleteEmployee(e) {
    const responseData = await DeleteJobEmployee(e);
    if (responseData.message === "Employee has been deleted") {
      toast.error("Employee deleted Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setDeleteAlert(false);
      setApiCall(true)
    }
  }
  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);

  /*Sorting Function */
  const handleSort = (columnName) => {
    setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
    setcolumnName(columnName);
  };
  /*Function to generate resume */
  const ResumeClick = (employee_id) => {
    const id = employee_id;
    window.open(`/resume/${id}`, "_blank");
  };
  return (
    <>
      {showAddEmployeeModal ? (
        <PersonalDetails
          show={showAddEmployeeModal}
          employeeId={employeeId}
          apiCall={apiCall}
          setApiCall={setApiCall}
          close={() => setShowEmployeeMOdal(false)}
        />
      ) : null}
      {showEducationModal ? (
        <Education
          close={() => setShowEducationModal(false)}
          employeeId={employeeId}
          apiCall={apiCall}
          setApiCall={setApiCall}
          show={showEducationModal}
        />
      ) : null}
      {showSkillsModal ? (
        <Skills
          show={showSkillsModal}
          employeeId={employeeId}
          apiCall={apiCall}
          setApiCall={setApiCall}
          close={() => setShowSkillsModal(false)}
        />
      ) : null}
      {showEmplyomentDetails ? (
        <EmployementDetails
          show={showEmplyomentDetails}
          employeeId={employeeId}
          apiCall={apiCall}
          setApiCall={setApiCall}
          close={() => setShowEmplyomentDetails(false)}
        />
      ) : null}
      {showChangeJobModal ? (
        <ChangeJob
          resData={employeeId}
          close={() => {
            setShowChangeJobModal(false);
          }}
          apiCall={apiCall}
          setApiCall={setApiCall}
          status={0}
          show={showChangeJobModal}
          apply={"apply"}
        />
      ) : null}
      
        <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-8 px-2 ">
        <div className="table-responsive main_table_div">
        {isLoading ? 
       <Loader/>
        :
          <table className="table table-striped main_data_table">
            <thead>
              <tr className="">
                <th
                  scope="col"
                  className=" border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    to={""}
                    onClick={() => {handleSort("name");setCurrentPage(1)}}
                    className="text-gray"
                    title="Sort by Name"
                  >
                    Name
                  </Link>
                </th>
                <th
                  scope="col"
                  className="border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    to={""}
                    onClick={() => {handleSort("contact_no");setCurrentPage(1)}}
                    className="text-gray"
                    title="Sort by Contact"
                  >
                    Contact
                  </Link>
                </th>
                {props.heading === "Dashboard" ? (
                  ""
                ) : (
                  <th
                    scope="col"
                    className="border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to={""}
                      onClick={() => {handleSort("language");setCurrentPage(1)}}
                      className="text-gray"
                      title="Sort by Languages"
                    >
                      Languages
                    </Link>
                  </th>
                )}
                {props.heading === "Dashboard" ? (
                  ""
                ) : (
                  <th
                    scope="col"
                    className="border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to={""}
                      onClick={() => {handleSort("education");setCurrentPage(1)}}
                      className="text-gray"
                      title="Sort by Education"
                    >
                      Education
                    </Link>
                  </th>
                )}
                {props.heading === "Dashboard" ? (
                  ""
                ) : (
                  <th
                    scope="col"
                    className="border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to={""}
                      onClick={() => {handleSort("skill");setCurrentPage(1)}}
                      className="text-gray"
                      title="Sort by Skill"
                    >
                      Skills
                    </Link>
                  </th>
                )}

                <th
                  scope="col"
                  className="border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    to={""}
                    onClick={() => {handleSort("experience");setCurrentPage(1)}}
                    className="text-gray"
                    title="Sort by Experience"
                  >
                    Experience
                  </Link>
                </th>
                <th
                  scope="col"
                  className="border-0 font-size-4 font-weight-normal"
                >
                  Profile
                </th>
                {props.heading === "Dashboard" ? (
                  ""
                ) : (
                  <th
                    scope="col"
                    className="border-0 font-size-4 font-weight-normal"
                  >
                    Action
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {/* Map function to show the data in the list*/}
              {totalData === 0 || employeeData.length === 0 ? (
                <tr>
                  <th className="bg-white"></th>
                  <th className="bg-white"></th>
                  {props.heading === "Dashboard" ? (
                    <th className="bg-white text-center">No Data Found</th>
                  ) : (
                    <th className="bg-white"></th>
                  )}
                  {props.heading === "Dashboard" ? null
                  :<th className="bg-white text-center">No Data Found</th>}
                  <th className="bg-white"></th>
                  {props.heading !== "Dashboard" ? (
                    <>
                      <th className="bg-white"></th>
                      <th className="bg-white"></th>
                      <th className="bg-white"></th>
                    </>
                  ) : (
                    ""
                  )}
                </tr>
              ) : (
                (employeeData || []).map((empdata) => (
                  <tr className="" key={empdata.employee_id}>
                    <td className=" py-5">
                      <div className="d-flex profile_box gx-2">
                        <div className="media  align-items-center">
                          <div className="circle-36 mx-auto overflow-hidden">
                            {empdata.profile_photo === null ? (
                              <img
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                                alt=""
                                className="w-100"
                              />
                            ) : (
                              <img
                                src={empdata.profile_photo}
                                alt=""
                                className="w-100"
                              />
                            )}
                          </div>
                        </div>
                        {props.heading === "Dashboard" ? (
                          <div className=" mb-0">
                            <p className="m-0 text-black-2 font-weight-bold text-capitalize">
                              {empdata.name}
                            </p>
                            <p className="text-gray font-size-2 m-0 text-capitalize">
                              {empdata.gender} ({empdata.marital_status + ", "}
                              {/*Calculation of age from date of birth*/}
                              {moment().diff(empdata.date_of_birth, "years")}
                              Y)
                            </p>
                          </div>
                        ) : (
                          <Link
                            to={""}
                            onClick={
                              empdata.name !== null
                                ? () => employeeDetails(empdata.employee_id)
                                : null
                            }
                            title="Employee Details"
                          >
                            {empdata.name === null ? (
                              <div className="font-size-3 mb-0 text-capitalize">
                                Unavailable
                              </div>
                            ) : (
                              <div className=" mb-0">
                                <p className="m-0 text-black-2 font-weight-bold text-capitalize">
                                  {empdata.name}
                                </p>
                                <p className="text-gray font-size-2 m-0 text-capitalize">
                                  {empdata.gender} (
                                  {empdata.marital_status + ", "}
                                  {/*Calculation of age from date of birth*/}
                                  {moment().diff(
                                    empdata.date_of_birth,
                                    "years"
                                  )}
                                  Y)
                                </p>
                              </div>
                            )}
                          </Link>
                        )}
                      </div>
                    </td>
                    <td className="py-5 ">
                      {empdata.contact_no === null ? (
                        <p className="font-size-3 mb-0">Unavailable</p>
                      ) : (
                        <p className="m-0">+{empdata.contact_no}</p>
                      )}
                      <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                        <p className="text-gray font-size-2 m-0">
                          {empdata.email}
                        </p>
                      </h3>
                    </td>

                    {props.heading === "Dashboard" ? (
                      ""
                    ) : (
                      <td className=" py-5">
                        {empdata.language === null ? (
                          <p className="font-size-3  mb-0">Unavailable</p>
                        ) : (
                          <p className="font-size-3 font-weight-normal text-black-2 mb-0">
                            {empdata.language}
                          </p>
                        )}
                      </td>
                    )}
                    {props.heading === "Dashboard" ? (
                      ""
                    ) : (
                      <td className=" py-5">
                        {empdata.education === null ? (
                          <p className="font-size-3  mb-0">Unavailable</p>
                        ) : (
                          <p className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate">
                            {empdata.education}
                          </p>
                        )}
                      </td>
                    )}
                    {props.heading === "Dashboard" ? (
                      ""
                    ) : (
                      <td className=" py-5">
                        {empdata.skill === null ? (
                          <p className="font-size-3  mb-0">Unavailable</p>
                        ) : (
                          <p className="font-size-3 font-weight-normal text-black-2 mb-0">
                            {empdata.skill}
                          </p>
                        )}
                      </td>
                    )}
                    <td className=" py-5">
                      {empdata.experience === null ? (
                        <p className="font-size-3 mb-0">Unavailable</p>
                      ) : (
                        <p className="font-size-3 font-weight-normal text-black-2 mb-0">
                          {empdata.experience} Years
                        </p>
                      )}
                    </td>
                    <td className=" py-5">
                      <p className="font-size-2 font-weight-normal text-black-2 mb-0">
                        {empdata.profile_complete === "100.00" ? (
                          <span className="p-1 bg-primary-opacity-8 text-white text-center w-100 border rounded-pill">
                            Complete
                          </span>
                        ) : (
                          <span className="p-1 bg-warning text-white text-center w-100 border rounded-pill">
                            Incompelete
                          </span>
                        )}
                      </p>
                    </td>
                    {props.heading === "Dashboard" ? (
                      ""
                    ) : (
                      <td className=" py-5 min-width-px-100">
                        <div
                          className="btn-group button_group"
                          role="group"
                          aria-label="Basic example"
                        >
                          <button
                            className="btn btn-outline-info action_btn"
                            onClick={() => editEmployee(empdata.employee_id)}
                            title="Edit Employee"
                          >
                            <span className=" fas fa-edit text-gray px-2"></span>
                          </button>
                          <button
                            className="btn btn-outline-info action_btn"
                            onClick={() =>
                              editEmployeeEducation(empdata.employee_id)
                            }
                            title="Education"
                          >
                            <span className="	fas fa-graduation-cap text-gray px-2"></span>
                          </button>
                          <button
                            className="btn btn-outline-info action_btn"
                            onClick={() =>
                              editEmployeeSkills(empdata.employee_id)
                            }
                            title="Skills"
                          >
                            <span className=" fa fa-cogs text-gray px-2"></span>
                          </button>
                          <button
                            className="btn btn-outline-info action_btn"
                            onClick={() =>
                              editEmployeeCareer(empdata.employee_id)
                            }
                            title="Edit Career"
                          >
                            <span className="text-gray">
                              <i className="fas fa-user-tie"></i>
                            </span>
                          </button>
                          <button
                            className="btn btn-outline-info action_btn text-center"
                            onClick={() => ResumeClick(empdata.employee_id)}
                            title="View Resume"
                          >
                            <span className="fas fa-file text-gray"></span>
                          </button>

                          <button
                            className="btn btn-outline-info action_btn text-gray"
                            onClick={() => editJob(empdata)}
                            title="Apply for job"
                          >
                            <i className="fas fa-briefcase"></i>
                          </button>
                          <button
                            className="btn btn-outline-info action_btn"
                            onClick={() => ShowDeleteAlert(empdata)}
                            title="Delete"
                          >
                            <span className=" text-danger">
                              <i className="fa fa-trash "></i>
                            </span>
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>}
        </div>
        <div className="pt-2">
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage} total={totalData} count={employeeData.length}
          />
        </div>
      </div>
      <SAlert
        show={deleteAlert}
        title={deleteName}
        text="Are you Sure you want to delete !"
        onConfirm={() => deleteEmployee(deleteId)}
        showCancelButton={true}
        onCancel={CancelDelete}
      />
    </>
  );
}
