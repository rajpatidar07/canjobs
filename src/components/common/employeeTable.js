import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PersonalDetails from "../forms/user/personal";
import Education from "../forms/user/education";
import Skills from "../forms/user/skills";
import { getallEmployeeData, DeleteJobEmployee, ApplyJob } from "../../api/api";
import moment from "moment";
import SAlert from "../common/sweetAlert";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../common/pagination";
import EmployementDetails from "../forms/user/employement";
import DocumentModal from "../admin/Modal/DocumentModal";
import Loader from '../common/loader';
import JobModal from "../admin/Modal/jobModal";
import VisaStatus from "../forms/user/visaStatus";
import ApplicantsStatusModal from "../admin/Modal/ApplicantsStatusModal";
export default function EmployeeTable(props) {
  /*Show modal states */
  let [apiCall, setApiCall] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  const [showEmplyomentDetails, setShowEmplyomentDetails] = useState(false);
  let [showAddEmployeeModal, setShowEmployeeMOdal] = useState(false);
  let [showVisaModal, setVisaModal] = useState(false);
  let [showChangeJobModal, setShowChangeJobModal] = useState(false);
  let [showEducationModal, setShowEducationModal] = useState(false);
  let [showSkillsModal, setShowSkillsModal] = useState(false);
  let [documentModal, setDocumentModal] = useState(false);
  let [showStatusChangeModal, setShowStatusChange] = useState(false);
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
      sortOrder || props.filter_by_time || props.search || props.experienceFilterValue || props.skillFilterValue || props.educationFilterValue ? 1 : currentPage,
      recordsPerPage,
      columnName,
      sortOrder,
      props.filter_by_time,"",
      props.status
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
    props.employeeDetails(e);
  };

  /* Function to show the single data to update Employee Education*/
  const editEmployeeEducation = (e) => {
    setShowEducationModal(true);
    setemployeeId(e);
  };

  /* Function to show the single data to update Employee*/
  const editEmployee = (e) => {
    setShowEmployeeMOdal(true);
    setemployeeId(e);
  };

  /* Function to show the single data to update Employee*/
  const editVisa = (e) => {
    setVisaModal(true);
    setemployeeId(e);
  };

  /* Function to show the single data to update Employee Skills*/
  const editEmployeeSkills = (e) => {
    setShowSkillsModal(true);
    setemployeeId(e);
  };

  /* Function to show the single data to update Employee Career*/
  const editEmployeeCareer = (e) => {
    setShowEmplyomentDetails(true);
    setemployeeId(e);
  };

  /* Function to show the single data to apply job */
  const editJob = (e) => {
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

  /*Function to open add Document up modal */
  const AddDoucument = (e) => {
    setDocumentModal(true)
    setemployeeId(e)
  }
  /*
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

  /*Function to change job */
  const onChangeJobClick = async (id) => {
    const responseData = await ApplyJob(props.job_id, id, 0);
    if (responseData.message === "already applied on this job") {
      toast.error("Already applied on this job", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setApiCall(true)
    }
    if (responseData.message === "Job applied successfully") {
      toast.success("Applied successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setApiCall(true)
    }

  };

  /*function to Open  change applicants status Modal */
  const ChangeApplicantsStatus = (e) => {
    setemployeeId(e)
    setShowStatusChange(true)
  }
  /*Function to get the new user */
  // const currentDate = new Date(); // Get current date
  // const oneMonthAgo = new Date(); // Create a new date object for one month ago
  // oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); // Subtract one month from the current date
  /*Funcion to get the user time from updated time */
  function isTimeWithin24Hours(createdTime) {
    return Date.now() - new Date(createdTime).getTime() <= 86400000;
  }
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
      {showVisaModal ?
        <VisaStatus
          show={showVisaModal}
          employeeId={employeeId}
          apiCall={apiCall}
          setApiCall={setApiCall}
          close={() => setVisaModal(false)} />
        :
        null}
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
      {showStatusChangeModal ?
        <ApplicantsStatusModal
          show={showStatusChangeModal}
          close={() => setShowStatusChange(false)}
          data={employeeId}
          setApiCall={setApiCall} /> :
        null}
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
        <JobModal
          show={showChangeJobModal}
          close={() => { setShowChangeJobModal(false) }}
          data={employeeId} />
      ) : null}
      {documentModal ?
        <DocumentModal
          show={documentModal}
          close={() => setDocumentModal(false)}
          employee_id={employeeId} /> :
        null}
      <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-8 px-2 ">
        <div className="table-responsive main_table_div">
          {isLoading ?
            <Loader />
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
                      onClick={() => { handleSort("name"); setCurrentPage(1) }}
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
                      onClick={() => { handleSort("contact_no"); setCurrentPage(1) }}
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
                        onClick={() => { handleSort("language"); setCurrentPage(1) }}
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
                        onClick={() => { handleSort("education"); setCurrentPage(1) }}
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
                        onClick={() => { handleSort("skill"); setCurrentPage(1) }}
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
                      onClick={() => { handleSort("experience"); setCurrentPage(1) }}
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
                  {props.visa === "yes" ? null : <th
                    scope="col"
                    className="border-0 font-size-4 font-weight-normal"
                  >
                    Status
                  </th>}
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
                      : <th className="bg-white text-center">No Data Found</th>}
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
                                {empdata.gender === "female" ? "F" : "M"} ({empdata.marital_status + ", "}
                                {/*Calculation of age from date of birth*/}
                                {moment().diff(empdata.date_of_birth, "years")}
                                Y)<br />
                                {empdata.is_featured === "1" ? <span className="bg-info text-white p-1"> Featured </span>
                                  : null}
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
                                    {empdata.gender === "female" ? "F" : "M"} (
                                    {empdata.marital_status + ", "}
                                    {/*Calculation of age from date of birth*/}
                                    {moment().diff(
                                      empdata.date_of_birth,
                                      "years"
                                    )}
                                    Y)
                                    <br />
                                    {empdata.is_featured === "1" ? <span className="bg-info text-white p-1"> Featured </span>
                                      : null}
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
                          <p className="m-0">
                            +<Link className="text-dark" to={`tel:${empdata.contact_no}`}>{empdata.contact_no}</Link>
                          </p>
                        )}
                        <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                          <p className="text-gray font-size-2 m-0">
                            <Link className="text-dark" to={`mailto:${empdata.email}`}>
                              {empdata.email}
                            </Link>
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
                            <p className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate">
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
                      {props.visa === "yes" ? null : <td className="">
                      <p className="font-size-2 font-weight-normal text-black-2 mb-0">
                          {empdata.status === "1" ?
                           <span
                           className={!isTimeWithin24Hours(empdata.created_at) ? "p-1 bg-danger text-white text-center w-100 border rounded-pill" : "p-1 bg-primary-opacity-8 text-white text-center w-100 border rounded-pill"}> New </span> :
                            empdata.status === "2" ?
                            <span
                            className="p-1 bg-warning text-white text-center w-100 border rounded-pill"> Prospect </span> :
                              empdata.status === "3" ?
                              <span
                              className="p-1 bg-info text-white text-center w-100 border rounded-pill"> Lead </span> :
                                empdata.status === "4" ?
                                <span
                                className="p-1 bg-secondary text-white text-center w-100 border rounded-pill"> Reatined </span> :
                                  empdata.status === "5" ?
                                  <span
                                  className="p-1 bg-spray text-white text-center w-100 border rounded-pill"> Lost </span> :
                                    empdata.status === "6" ?
                                    <span
                                    className="p-1 bg-dark text-white text-center w-100 border rounded-pill"> Dead </span>  :
                                    <span
                                    className="p-1 bg-gray text-white text-center w-100 border rounded-pill"> Self </span>}
                        </p>
                      </td>}

                      {/* Calulation to get user is new or retained */}
                      {/* <td className=" py-5">
                        <p className="font-size-3 font-weight-normal text-black-2 mb-0">
                          {(new Date(empdata.created_at) >= oneMonthAgo && new Date(empdata.created_at) <= currentDate) === true ? "New" : "Retained"}                        
                          </p>
                      </td> */}
                      {props.heading === "Dashboard" || props.self === "yes" ? (
                        ""
                      ) : (
                        <td className=" py-5 min-width-px-100">
                          <div
                            className="btn-group button_group"
                            role="group"
                            aria-label="Basic example"
                          >
                            {props.skill === null || props.skill === undefined ?
                              <>
                                <button
                                  className="btn btn-outline-info action_btn"
                                  onClick={() => editVisa(empdata.employee_id)}
                                  title="Update Visa status"
                                >
                                  <span className="fab fa-cc-visa text-gray px-2"></span>
                                </button>
                                {props.visa === "yes" ?
                                  <button
                                    className="btn btn-outline-info action_btn"
                                    onClick={() => AddDoucument(empdata.employee_id)}
                                    title="Documents" >
                                    {/* <Link
                                  to={"/document"}
                                  state={{ employee_id: res.employee_id }}
                                   >
                                  </Link> */}
                                    <span className="fas fa-file text-gray"></span>
                                  </button> : <>
                                    <button
                                      className="btn btn-outline-info action_btn"
                                      onClick={() =>
                                        ChangeApplicantsStatus(empdata)
                                      }
                                      title="Change Applicant status"
                                    >
                                      <span className="fa fa-badge text-gray px-2"></span>
                                    </button>
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
                                      title="Matching jobs "
                                      disabled={empdata.skill ? false : true}
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
                                    </button></>}
                              </> :
                              <button
                                className="btn btn-outline-info action_btn"
                                disabled={empdata.is_applied ? true : false}
                                onClick={() => onChangeJobClick(empdata.employee_id)}
                                title="Apply For job"
                              >
                                {empdata.is_applied ? "Already Applied" : "Apply"}
                              </button>
                            }
                          </div>
                        </td>
                      )}
                      { props.self === "yes" ? 
                        <button
                                      className="btn btn-outline-info action_btn"
                                      onClick={() =>
                                        ChangeApplicantsStatus(empdata)
                                      }
                                      title="Change Applicant status"
                                    ></button>:""}
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
