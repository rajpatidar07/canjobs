import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PersonalDetails from "../forms/user/personal";
import Education from "../forms/user/education";
import Skills from "../forms/user/skills";
import { getallEmployeeData, DeleteJobEmployee, ApplyJob, getallAdminData } from "../../api/api";
import moment from "moment";
import { BiSolidCategory } from "react-icons/bi";
import SAlert from "../common/sweetAlert";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../common/pagination";
import EmployementDetails from "../forms/user/employement";
// import DocumentModal from "../forms/admin/DocumentModal";
import Loader from "../common/loader";
import JobModal from "../admin/Modal/jobModal";
import VisaStatus from "../forms/user/visaStatus";
import ApplicantsStatusModal from "../forms/admin/ApplicantsStatusModal";
import {/* MdOutlineCastForEducation,*/MdTypeSpecimen, MdRealEstateAgent, MdEditNote } from "react-icons/md";
// import { LiaUserEditSolid, LiaUserTieSolid } from "react-icons/lia";
import { GoTasklist } from "react-icons/go";
// import { GiSkills } from "react-icons/gi";
import { AiOutlineFilePdf } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { PiBriefcaseLight } from "react-icons/pi";
import ConvertTime from "./ConvertTime";
import VisaTimeLine from "./visaTimeLine";
// import ApplicantCategory from "../forms/user/ApplicantCategory";
export default function EmployeeTable(props) {
  let agentId = localStorage.getItem("agent_id");
  let user_type = localStorage.getItem("userType");
  let StatusTab = localStorage.getItem("StatusTab")
  /*Show modal states */
  let [apiCall, setApiCall] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  const [showEmplyomentDetails, setShowEmplyomentDetails] = useState(false);
  let [showAddEmployeeModal, setShowEmployeeMOdal] = useState(false);
  let [showVisaModal, setVisaModal] = useState(false);
  let [showChangeJobModal, setShowChangeJobModal] = useState(false);
  let [showEducationModal, setShowEducationModal] = useState(false);
  let [showSkillsModal, setShowSkillsModal] = useState(false);
  let [pageNameForForm, setPageNameForForm] = useState(false);
  let [admintList, setAdmintList] = useState([]);
  let [showStatusChangeModal, setShowStatusChange] = useState(false);
  /*data and id states */
  const [employeeData, setemployeeData] = useState([]);
  const [alredyApplied, setAlredyApplied] = useState(false);
  let [employeeId, setemployeeId] = useState();
  /*delete state */
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteID] = useState();
  const [deleteName, setDeleteName] = useState("");
  /*Pagination states */
  const [status, setStatus] = useState(StatusTab
    ? StatusTab
    : props.pageName === "local_candidate"
      ? ""
      : props.self === "yes"
        ? -1
        : 4);
  const [totalData, setTotalData] = useState("");
  const [recordsPerPage] = useState(10);
  /*Shorting states */
  const [columnName, setcolumnName] = useState(
    props.heading === "Dashboard" ? "created_at" : "employee_id"
  );
  const [sortOrder, setSortOrder] = useState("DESC");
  /* Function to get Employee data*/
  const EmpData = async () => {
    // const params = useParams();
    setIsLoading(true);
    try {
      const userData = await getallEmployeeData(
        props.search,
        props.experienceFilterValue,
        props.skillFilterValue,
        props.educationFilterValue,
        props.pageNo,
        recordsPerPage,
        columnName,
        sortOrder,
        props.filter_by_time,
        "",
        props.skill || props.heading === "Dashboard" || status === "00" ? "" : status,
        props.job_id ? props.job_id : "",
        props.filterByEmployeeId,
        props.ApplicantType ? props.ApplicantType : props.interestFilterValue,
        "",
        user_type === "agent" ? agentId : props.agentFilterValue,
        props.adminFilterValue,
        props.categoryFilterValue,
        props.localFilterValue,
      );
      if (userData.data.length === 0) {
        setemployeeData([]);
        setIsLoading(false);
        setTotalData(0);
      } else {
        /*Condition for candidate with PGWP applicant type can not able to apply  for the job */
        if (props.skill) {
          setemployeeData(userData.data.filter((item) => item.interested_in !== "pgwp"))
        } else {
          setemployeeData(userData.data);
        }
        setTotalData(userData.total_rows);
        setIsLoading(false);
        localStorage.setItem("StatusTab", "")

      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
    try {
      let adminJson = await getallAdminData();
      if (adminJson.data.length === 0) {
        setAdmintList([]);
      } else {
        setAdmintList(adminJson.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /*Render function to get the employer*/
  useEffect(() => {
    EmpData();
    if (props.apiCall === true || apiCall === true) {
      props.setApiCall(false);
      setApiCall(false);
    }
    if (alredyApplied === true) {
      setAlredyApplied(false);
    }
    // eslint-disable-next-line
  }, [
    props.experienceFilterValue,
    props.skillFilterValue,
    props.educationFilterValue,
    props.search,
    props.pageNo,
    recordsPerPage,
    columnName,
    sortOrder,
    props.filter_by_time,
    props.apiCall,
    apiCall,
    props.showEmployeeProfile,
    status,
    props.heading,
    props.agentFilterValue,
    props.adminFilterValue,
    props.interestFilterValue,
    props.categoryFilterValue,
    props.localFilterValue,
    props.filterByEmployeeId
  ]);

  /* Function to show the single data to update Employee*/
  // const employeeDetails = (e) => {
  // props.employeeDetails(e);
  // };

  /* Function to show the single data to update Employee Education*/
  // const editEmployeeEducation = (e) => {
  // setShowEducationModal(true);
  // setemployeeId(e);
  // };

  /* Function to show the single data to update Employee*/
  // const editEmployee = (e) => {
  // setShowEmployeeMOdal(true);
  // setemployeeId(e);
  // };

  /* Function to show the single data to update Employee*/
  const editVisa = (e) => {
    setVisaModal(true);
    setemployeeId(e);
  };

  /* Function to show the single data to update Employee Skills*/
  // const editEmployeeSkills = (e) => {
  // setShowSkillsModal(true);
  // setemployeeId(e);
  // };

  /* Function to show the single data to update Employee Career*/
  // const editEmployeeCareer = (e) => {
  // setShowEmplyomentDetails(true);
  // setemployeeId(e);
  // };

  /* Function to show the single data to Edit job */
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
  // const AddDoucument = (e) => {
  // setDocumentModal(true);
  // setemployeeId(e);
  // };
  // /*
  /*To call Api to delete employee */
  async function deleteEmployee(e) {
    try {
      const responseData = await DeleteJobEmployee(e);
      if (responseData.message === "Employee has been deleted") {
        toast.error("Candidate deleted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setDeleteAlert(false);
        setApiCall(true);
      }
    } catch (err) {
      console.log(err);
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

  /*Function to Apply job */
  const onApplyJobClick = async (id) => {
    try {
      const responseData = await ApplyJob(props.job_id, id, 0);
      if (responseData.message === "already applied on this job") {
        toast.error("Already applied on this job", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
        props.setApiCall(true);
        props.EmployeeCall(true);
      }
      if (responseData.message === "Job applied successfully") {
        toast.success("Applied successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        props.setApiCall(true);
        setApiCall(true);
        setAlredyApplied(true);
        props.EmployeeCall(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /*function to Open  change applicants status Modal */
  const ChangeApplicantsStatus = (e) => {
    setemployeeId(e);
    setShowStatusChange(true);
  };
  /*function to Open  change applicants category Modal */
  const ChangeApplicantsCategory = (e) => {
    setemployeeId(e);
    setShowEmployeeMOdal(true);
    setPageNameForForm("Category")
  };
  /*function to Open  change applicants type Modal */
  const ChangeApplicantsType = (e) => {
    setemployeeId(e);
    setShowEmployeeMOdal(true);
    setPageNameForForm("ApplicantType")
  };
  /*function to Open  change applicants Agent "Reffer_by" Modal */
  const ChangeApplicantsAgent = (e) => {
    setemployeeId(e);
    setShowEmployeeMOdal(true);
    setPageNameForForm("agentAssigned")
  };
  /*Function to get the new user */
  // const currentDate = new Date(); // Get current date
  // const oneMonthAgo = new Date(); // Create a new date object for one month ago
  // oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); // Subtract one month from the current date
  /*Funcion to get the user time from updated time */
  function isTimeWithin24Hours(createdTime) {
    return Date.now() - new Date(createdTime).getTime() <= 86400000;
  }
  const clearPageNo = () => {
    localStorage.removeItem("PageNo");
    props.setpageNo(1);
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
          pageNameForForm={pageNameForForm}
        />
      ) : null}
      {showVisaModal ? (
        <VisaStatus
          show={showVisaModal}
          employeeData={employeeId}
          apiCall={apiCall}
          setApiCall={setApiCall}
          close={() => setVisaModal(false)}
          type={props.ApplicantType}
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
      {showStatusChangeModal ? (
        <ApplicantsStatusModal
          show={showStatusChangeModal}
          close={() => setShowStatusChange(false)}
          data={employeeId}
          setApiCall={setApiCall}
          self={props.self}
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
        <JobModal
          show={showChangeJobModal}
          close={() => {
            setShowChangeJobModal(false);
          }}
          data={employeeId}
          setApiCall={setApiCall}
        />
      ) : null}
      {/* {documentModal ? (
        <DocumentModal
          show={documentModal}
          close={() => setDocumentModal(false)}
          employee_id={employeeId}
        />
      ) : null} */}
      {/* {showCategoryModal ?
        <ApplicantCategory
          show={showCategoryModal}
          close={() => setShowCategoryModal(false)}
          data={employeeId} />
        : null} */}
      <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-9 px-5 ">
        {props.heading === "Dashboard" ? null : (
          <div
            className={`btn-group mb-5 ${props.skill ? "d-none" : ""}`}
            role="group"
            aria-label="Basic example"
          >
            {props.self === "yes" ? (
              <>
                <button
                  type="button"
                  className={
                    status === -1 || status === "-1" || status === "1"
                      ? "btn btn-primary"
                      : "btn btn-outline-primary"
                  }
                  onClick={() => {
                    setStatus(-1)
                    clearPageNo()
                  }}
                  title="New"
                >
                  New
                </button>
                <button
                  type="button"
                  className={
                    status === 2 || status === "2" ? "btn btn-primary" : "btn btn-outline-primary"
                  }
                  onClick={() => {
                    setStatus(2)
                    clearPageNo()
                  }}
                  title="Prospect"
                >
                  Prospect
                </button>
                <button
                  type="button"
                  className={
                    status === 3 || status === "3" ? "btn btn-primary" : "btn btn-outline-primary"
                  }
                  onClick={() => {
                    setStatus(3)
                    clearPageNo()
                  }}
                  title="Lead"
                >
                  Lead
                </button>
                <button
                  type="button"
                  className={
                    status === "5" || status === 5 ? "btn btn-primary" : "btn btn-outline-primary"
                  }
                  onClick={() => {
                    setStatus(5)
                    clearPageNo()
                  }}
                  title="Lost"
                >
                  Lost
                </button>
                <button
                  type="button"
                  className={
                    status === "6" || status === 6 ? "btn btn-primary" : "btn btn-outline-primary"
                  }
                  onClick={() => {
                    setStatus(6)
                    clearPageNo()
                  }}
                  title="Dead"
                >
                  Dead
                </button>
              </>
            ) : props.pageName === "local_candidate"
              ? null
              : (
                <>
                  <button
                    type="button"
                    className={
                      status === "4" || status === 4 ? "btn btn-primary" : "btn btn-outline-primary"
                    }
                    onClick={() => {
                      setStatus(4)
                      clearPageNo()
                    }}
                    title="Retained"
                  >
                    Retained
                  </button>
                  <button
                    type="button"
                    className={
                      status === "7" || status === 7 ? "btn btn-primary" : "btn btn-outline-primary"
                    }
                    onClick={() => {
                      setStatus(7)
                      clearPageNo()
                    }}
                    title="Working on"
                  >
                    Working on
                  </button>
                  <button
                    type="button"
                    className={
                      status === "8" || status === 8 ? "btn btn-primary" : "btn btn-outline-primary"
                    }
                    onClick={() => {
                      setStatus(8)
                      clearPageNo()
                    }}
                    title="Submitted"
                  >
                    Submitted
                  </button>
                </>
              )}
            <button
              type="button"
              className={
                props.pageName === "local_candidate"
                  ? "d-none"
                  : status === "" || status === "00"
                    ? "btn btn-primary"
                    : "btn btn-outline-primary"
              }
              onClick={() => {
                setStatus("")
                clearPageNo()
              }}
              title="All"
            >
              All
            </button>
          </div>
        )}
        <div className="table-responsive main_table_div">
          {isLoading ? (
            <Loader />
          ) : (
            <table className="table table-striped main_data_table">
              <thead>
                <tr className="">
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to={""}
                      onClick={() => {
                        handleSort("employee_id");
                        props.setpageNo(1);
                      }}
                      className="text-gray"
                      title="Sort by Id"
                    >
                      EID
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to={""}
                      onClick={() => {
                        handleSort("name");
                        props.setpageNo(1);
                      }}
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
                      onClick={() => {
                        handleSort("created_by_admin");
                        props.setpageNo(1);
                      }}
                      className="text-gray"
                      title="Sort by created by "
                    >
                      Created by
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
                        onClick={() => {
                          handleSort("updated_at");
                          props.setpageNo(1);
                        }}
                        className="text-gray"
                        title="Sort by Last Modified"
                      >
                        Last Modified
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
                        onClick={() => {
                          handleSort("created_at");
                          props.setpageNo(1);
                        }}
                        className="text-gray"
                        title="Sort by date added"
                      >
                        Date added
                      </Link>
                    </th>
                  )}
                  {props.heading === "Dashboard" || user_type === "agent" ? (
                    ""
                  ) : (
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal"
                    >
                      <Link
                        to={""}
                        onClick={() => {
                          handleSort("agent_name");
                          props.setpageNo(1);
                        }}
                        className="text-gray"
                        title="Sort by date added"
                      >
                        Partner
                      </Link>
                    </th>
                  )}
                  {/* {props.heading === "Dashboard" ? (
                    ""
                  ) : (
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal"
                    >
                      <Link
                        to={""}
                        onClick={() => {
                          handleSort("education");
                          props.setpageNo(1);
                        }}
                        className="text-gray"
                        title="Sort by Education"
                      >
                        Education
                      </Link>
                    </th>
                  )} */}
                  {props.heading === "Dashboard" || !props.ApplicantType ? (
                    ""
                  ) : (
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal"
                    >
                      {/* <Link
                        to={""}
                        onClick={() => {
                          handleSort("applicant_process_status");
                          props.setpageNo(1);
                        }}
                        className="text-gray"
                        title="Sort by Applicant Stage"
                      > */}
                        Applicant Stage
                      {/* </Link> */}
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
                        onClick={() => {
                          handleSort("interested_in");
                          props.setpageNo(1);
                        }}
                        className="text-gray"
                        title="Sort by Applicant Type"
                      >
                        Applicant Type
                      </Link>
                    </th>
                  )}
                  {props.ApplicantType === "pnp" &&
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal"
                      title="Sub Type"
                    >
                      Sub Type
                    </th>}
                  {props.visa === "yes" ? null : (
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal"
                      title="Status"
                    >
                      Status
                    </th>
                  )}
                  <th
                    scope="col"
                    className="border-0 font-size-4 font-weight-normal"
                    title="Profile"
                  >
                    Profile
                  </th>
                  {props.heading === "Dashboard" ? (
                    ""
                  ) : (
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal"
                      title="Actions"
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
                    <th colSpan={12} className="bg-white text-center">
                      No Data Found
                    </th>
                  </tr>
                ) : (
                  (employeeData || []).map((empdata) => (
                    <>
                      <tr className="applicant_row" key={empdata.employee_id}>
                        <td className=" py-5" title={empdata.employee_id}>
                          <p className="font-size-3 font-weight-normal text-black-2 mb-0">
                            {empdata.employee_id}
                          </p>
                        </td>
                        <td className=" py-5">
                          <div
                          >
                            <div className="d-flex profile_box gx-2">
                              <div className="media  align-items-center">
                                <Link
                                  to={`/${empdata.employee_id}`}
                                  onClick={() => {
                                    localStorage.setItem("StatusTab", status === "" ? "00" : status)
                                  }
                                    //   empdata.name !== null
                                    //     ? () => employeeDetails(empdata.employee_id)
                                    //     : null
                                  }
                                  title="Candidate Details">
                                  <div className="circle-30 mx-auto overflow-hidden">
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
                                </Link>
                              </div>

                              <div className=" mb-0">
                                {empdata.name === null ||
                                  empdata.name === undefined ||
                                  empdata.name === "undefined" ||
                                  empdata.name === "" ? (
                                  <p className="font-size-3  mb-0">N/A</p>
                                ) : (

                                  <Link
                                    to={`/${empdata.employee_id}`}
                                    onClick={() => {
                                      localStorage.setItem("StatusTab", status === "" ? "00" : status)
                                      localStorage.setItem("PageNo", props.pageNo)
                                    }
                                      //   empdata.name !== null
                                      //     ? () => employeeDetails(empdata.employee_id)
                                      //     : null
                                    }
                                    title="Candidate Details">
                                    <p
                                      className="m-0 text-black-2 font-weight-bold text-capitalize text-truncate"
                                      title={empdata.name}
                                    >
                                      {empdata.name}
                                    </p>
                                  </Link>
                                )}
                                {empdata.gender || empdata.marital_status ? (
                                  <p className="text-gray font-size-2 m-0 text-capitalize" title={(empdata.gender === "female"
                                    ? "F"
                                    : empdata.gender === "male"
                                      ? "M"
                                      : "O") + (empdata.marital_status ||
                                        empdata.date_of_birth
                                        ? `${empdata.marital_status
                                        },${moment().diff(
                                          empdata.date_of_birth,
                                          "years"
                                        )} Y`
                                        : null)}>
                                    {empdata.gender === "female"
                                      ? "F"
                                      : empdata.gender === "male"
                                        ? "M"
                                        : "O"}
                                    {/*Calculation of age from date of birth*/}(
                                    {empdata.marital_status ||
                                      empdata.date_of_birth
                                      ? `${empdata.marital_status
                                      },${moment().diff(
                                        empdata.date_of_birth,
                                        "years"
                                      )} Y`
                                      : null}
                                    )
                                  </p>
                                ) : null}
                                {empdata.contact_no === null || !empdata.contact_no || empdata.contact_no === (0 || "0") ? null : (
                                  <p className="m-0" title={empdata.contact_no}>
                                    +
                                    <Link
                                      className="text-dark font-size-2"
                                      to={`tel:${empdata.contact_no}`}
                                    >
                                      {empdata.contact_no}
                                    </Link>
                                  </p>
                                )}
                                <h3 className=" font-weight-normal text-black-2 mb-0">
                                  <p className="text-gray font-size-2 m-0" title={empdata.email}>
                                    <Link
                                      className="text-dark"
                                      to={`mailto:${empdata.email}`}
                                    >
                                      {empdata.email}
                                    </Link>
                                  </p>
                                </h3>
                                {empdata.is_featured === "1" ||
                                  empdata.is_featured === 1 ? (
                                  <span className="bg-orange text-white featured_tag">
                                    Featured
                                  </span>
                                ) : null}
                                {empdata.created_by_admin === "0" ||
                                  empdata.created_by_admin === 0 ? (
                                  <span className="bg-info text-white web_tag">
                                    Web
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          {empdata.is_featured === "1" ||
                            empdata.is_featured === 1 ? (
                            <span className="bg-orange text-white featured_tag">
                              Featured
                            </span>
                          ) : null}
                        </td>
                        {props.heading === "Dashboard" ? (
                          ""
                        ) :
                          <td className="py-5 ">
                            {empdata.created_by_admin === null || !empdata.created_by_admin || empdata.created_by_admin === ("0" || 0) ? (
                              <p className="font-size-3  mb-0">N/A</p>
                            ) : (
                              <p
                                className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate text-capitalize"
                                title={admintList?.find((item) => item.admin_id === empdata?.created_by_admin)?.name}
                              >
                                {admintList?.find((item) => item.admin_id === empdata?.created_by_admin)?.name}
                              </p>
                            )}
                          </td>}
                        {props.heading === "Dashboard" ? (
                          ""
                        ) :
                          <td className="py-5 ">
                            {empdata.updated_at === null || !empdata.updated_at || empdata.updated_at === "0000-00-00 00:00:00" ? (
                              <p className="font-size-3  mb-0">N/A</p>
                            ) : (
                              <p
                                className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate text-capitalize"
                                title={moment(empdata?.updated_at).fromNow()}
                              >
                                {moment(empdata?.updated_at).fromNow()}
                              </p>
                            )}
                          </td>}
                        {props.heading === "Dashboard" ? (
                          ""
                        ) : (
                          <td className=" py-5">
                            {empdata.language === null ? (
                              <p className="font-size-3  mb-0">N/A</p>
                            ) : (
                              <p className="font-size-3 font-weight-normal text-black-2 mb-0" title={ConvertTime({ _date: empdata.created_at, format: "DD MMMM, YYYY" })}>
                                {/* {empdata.language} */}
                                <ConvertTime _date={empdata.created_at} format={"DD MMMM, YYYY"} />
                                {/* {moment(empdata.created_at).format(
                                "DD MMMM, YYYY"
                              )} */}
                              </p>
                            )}
                          </td>
                        )}
                        {props.heading === "Dashboard" || user_type === "agent" ? (
                          ""
                        ) : (
                          <td className=" py-5">
                            {empdata.agent_name === null ? (
                              <p className="font-size-3  mb-0">N/A</p>
                            ) : (
                              <Link
                                to={`/partner_profile`}
                                onClick={localStorage.setItem("agent_id", empdata.reffer_by)}
                              >
                                <p
                                  className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate"
                                  title={
                                    empdata.agent_u_id + " " + empdata.agent_name
                                  }
                                >
                                  {empdata.agent_u_id + " "}
                                  {empdata.agent_name}
                                </p>
                              </Link>
                            )}
                          </td>
                        )}
                        {/* {props.heading === "Dashboard" ? (
                        ""
                      ) : (
                        <td className=" py-5">
                          {empdata.education === null ? (
                            <p className="font-size-3  mb-0">N/A</p>
                          ) : (
                            <p
                              className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate"
                              title={empdata.education}
                            >
                              {empdata.education}
                            </p>
                          )}
                        </td>
                      )} */}
                        <td className={!props.ApplicantType ? "d-none" : ""}>
                          <p className="font-size-2 font-weight-normal text-black-2 mb-0"
                            title={empdata.applicant_process_status || "N/A"}>
                            {empdata.applicant_process_status === "onboard" ? (
                              <span className="p-1 bg-coral-opacity-visible text-white text-center w-100 border rounded-pill">
                                On Board
                              </span>
                            ) : empdata.applicant_process_status === "documentation" ? (
                              <span className="p-1 bg-warning text-white text-center w-100 border rounded-pill">
                                Documentation
                              </span>
                            ) : empdata.applicant_process_status === "file preparation" ? (
                              <span className="p-1 bg-info text-white text-center w-100 border rounded-pill">
                                File Preparation
                              </span>
                            ) : empdata.applicant_process_status === "file review" ? (
                              <span className="p-1 bg-primary-opacity-8 text-white text-center w-100 border rounded-pill">
                                File Review
                              </span>
                            ) : empdata.applicant_process_status === "file submission" ? (
                              <span className="p-1 bg-dark text-white text-center w-100 border rounded-pill">
                                File Submission
                              </span>
                            ) : empdata.applicant_process_status === "file decision" ? (
                              <div
                                className={`px-3 py-2 badge badge-pill ${empdata.applicant_process_substages ===
                                  "approved"
                                  ? " badge-shamrock"
                                  : empdata.applicant_process_substages ===
                                    "rejected"
                                    ? " badge-danger"
                                    : " badge-warning text-white"
                                  }`}
                              >
                                <span>
                                  {empdata.applicant_process_substages ===
                                    "approved"
                                    ? "Approved"
                                    : empdata.applicant_process_substages ===
                                      "rejected"
                                      ? "Rejected"
                                      : "Awaiting Decision"}
                                </span>
                              </div>
                            ) : (
                              <span className="font-size-3 font-weight-normal text-black-2 mb-0">
                                N/A
                              </span>
                            )}
                          </p>
                        </td>
                        {props.heading === "Dashboard" ? (
                          ""
                        ) : (
                          // <td className=" py-5">
                          //   {empdata.experience === null ? (
                          //     <p className="font-size-3 mb-0">N/A</p>
                          //   ) : (
                          //     <p className="font-size-3 font-weight-normal text-black-2 mb-0">
                          //       {empdata.experience === "1-3 " ||
                          //         empdata.experience === "1-2 " ||
                          //         empdata.experience === "3-5 " ||
                          //         empdata.experience === "5-7 " ||
                          //         empdata.experience === "7+ "
                          //         ? empdata.experience + "years"
                          //         : empdata.experience}
                          //     </p>
                          //   )}
                          // </td>
                          <td className="text-center ">
                            {empdata.interested_in === null || !empdata.interested_in ? (
                              <p className="font-size-3 mb-0" title="N/A">N/A</p>
                            ) : (
                              <p className={`font-size-2 font-weight-normal text-black-2 mb-0 ${empdata.interested_in === "pnp" || empdata.interested_in === "pgwp" ?
                                `text-uppercase` :
                                "text-capitalize"}`}
                                title={empdata.interested_in}>
                                <span
                                  className={
                                    `p-1 ${empdata.interested_in === "visitor visa"
                                      ? "text-dark" : "text-white"} text-center  border rounded-pill 
                                  ${empdata.interested_in === "business visa"
                                      ? "bg-eastern"
                                      : empdata.interested_in === "co-op"
                                        ? "bg-secondary"
                                        : empdata.interested_in === "express entry"
                                          ? "bg-violet"
                                          : empdata.interested_in === "full-time"
                                            ? "bg-info"
                                            : empdata.interested_in === "pnp"
                                              ? "bg-warning"
                                              : empdata.interested_in === "spousal open work permit"
                                                ? "bg-coral-opacity-visible"
                                                : empdata.interested_in === "super visa"
                                                  ? "bg-allports"
                                                  : empdata.interested_in === "visitor visa"
                                                    ? "bg-conch"
                                                    : empdata.interested_in === "work permit extension"
                                                      ? "bg-pink"
                                                      : empdata.interested_in === "working visa"
                                                        ? "bg-poppy"
                                                        : empdata.interested_in === "workpermit application"
                                                          ? "bg-success"
                                                          : empdata.interested_in === "federal PR"
                                                            ? "bg-poppy" : empdata.interested_in === "visitor record" ?
                                                              "bg-helio"
                                                              : "bg-primary"
                                    }`
                                  }
                                >
                                  {empdata.interested_in}
                                </span>
                              </p>
                            )}
                          </td>
                        )}
                        {props.ApplicantType === "pnp" && (
                          <td className="text-center">
                            {empdata.category === null || !empdata.category ? (
                              <p className="font-size-3 mb-0" title="N/A">N/A</p>
                            ) : (
                              <p className={`font-size-2 font-weight-normal text-black-2 mb-0 
                            ${(empdata.category === "tech pathway" || empdata.category === "Tech Pathway") ? "text-capitalize" : `text-uppercase`
                                }`}
                                title={empdata.category}>
                                <span
                                  className={`p-1 text-white text-center border rounded-pill ${(empdata.category === "tech pathway" || empdata.category === "Tech Pathway") ? "bg-info " : (empdata.category === "rrs" || empdata.category === "RRS") ?
                                    "bg-warning" : (empdata.category === "aos" || empdata.category === "AOS") ?
                                      "bg-coral-opacity-visible" : ""
                                    }`}
                                >
                                  {empdata.category}
                                </span>
                              </p>
                            )}
                          </td>
                        )}
                        {props.visa === "yes" ? null : (
                          <td className="text-center ">
                            <p className="font-size-2 font-weight-normal text-black-2 mb-0"
                              title={empdata.status === "1" || empdata.status === "0" ?
                                "New" : empdata.status === "2" ?
                                  "Prospect" : empdata.status === "3" ?
                                    "Lead" : empdata.status === "4" ?
                                      "Retained" : empdata.status === "5" ?
                                        "Lost" : empdata.status === "6" ?
                                          "Dead" : empdata.status === "7" ?
                                            "Working on" : empdata.status === "8" ?
                                              "Submitted" : "N/A"}>
                              <span
                                className={`p-1 text-white text-center  border rounded-pill ${empdata.status === "1" || empdata.status === "0" ? (
                                  !isTimeWithin24Hours(empdata.created_at)
                                    ? "bg-danger "
                                    : "bg-info ") : empdata.status === "2" ?
                                  "bg-warning" : empdata.status === "3" ?
                                    "bg-coral-opacity-visible" : empdata.status === "4" ?
                                      "bg-secondary" : empdata.status === "5" ?
                                        "bg-spray" : empdata.status === "6" ?
                                          "bg-dark" : empdata.status === "7" ?
                                            "bg-primary-opacity-8" : empdata.status === "8" ?
                                              "bg-eastern" : ""
                                  }`}
                              >
                                {empdata.status === "1" || empdata.status === "0" ?
                                  "New" : empdata.status === "2" ?
                                    "Prospect" : empdata.status === "3" ?
                                      "Lead" : empdata.status === "4" ?
                                        "Retained" : empdata.status === "5" ?
                                          "Lost" : empdata.status === "6" ?
                                            "Dead" : empdata.status === "7" ?
                                              "Working on" : empdata.status === "8" ?
                                                "Submitted" : ""}
                              </span>

                            </p>
                          </td>
                        )}
                        <td className="text-center py-5">
                          <p className="font-size-2 font-weight-normal text-black-2 mb-0"
                            title={empdata.profile_complete === "100.00" ? "Complete" :
                              "Incomplete"}>
                            {empdata.profile_complete === "100.00" ? (
                              <span className="p-1 bg-primary-opacity-8 text-white text-center  border rounded-pill">
                                Complete
                              </span>
                            ) : (
                              <span className="p-1 bg-warning text-white text-center  border rounded-pill">
                                Incomplete
                              </span>
                            )}
                          </p>
                        </td>
                        {/* Calculation to get user is new or retained */}
                        {/* <td className=" py-5">
          <p className="font-size-3 font-weight-normal text-black-2 mb-0">
            {(new Date(empdata.created_at) >= oneMonthAgo && new Date(empdata.created_at) <= currentDate) === true ? "New" : "Retained"}          
            </p>
        </td> */}
                        {props.heading === "Dashboard" ? (
                          ""
                        ) : (
                          <td className=" py-5 min-width-px-100">
                            <div
                              className="btn-group button_group"
                              role="group"
                              aria-label="Basic example"
                            >
                              {props.skill === null ||
                                props.skill === undefined ? (
                                <>
                                  <button
                                    className={!props.ApplicantType ? "d-none" : "btn btn-outline-info action_btn"}
                                    onClick={() => editVisa(empdata)}
                                    title={`Add/Update ${props.ApplicantType} status`}
                                  >
                                    <span className="text-gray px-2">
                                      <MdEditNote />
                                    </span>
                                  </button>
                                  {/* {props.visa === "yes" ? (
      <button
        className="btn btn-outline-info action_btn"
        onClick={() =>
          AddDoucument(empdata.employee_id)
        }
        title="Documents"
      >
        
        <span className="fas fa-file text-gray"></span>
      </button>
    ) :
     ( */}
                                  <>
                                    <button
                                      className={
                                        props.ApplicantType === "pnp"
                                          ? "btn btn-outline-info action_btn"
                                          : "d-none"

                                      }
                                      // disabled={empdata.interested_in !== "pnp"}
                                      onClick={() =>
                                        ChangeApplicantsCategory(empdata.employee_id)
                                      }
                                      title="Change Applicant's Category"
                                    >
                                      <span className="text-gray px-2">
                                        <BiSolidCategory />
                                      </span>
                                    </button>
                                    <button
                                      className="btn btn-outline-info action_btn"
                                      onClick={() =>
                                        ChangeApplicantsType(empdata.employee_id)
                                      }
                                      title="Change Applicant's Type"
                                    >
                                      <span className="text-gray px-2">
                                        <MdTypeSpecimen />
                                      </span>
                                    </button>
                                    <button
                                      className="btn btn-outline-info action_btn"
                                      onClick={() =>
                                        ChangeApplicantsStatus(empdata)
                                      }
                                      title="Change status"
                                    >
                                      <span className="text-gray px-2">
                                        <GoTasklist />
                                      </span>
                                      {/* <i className="fas fa-stream text-gray"></i> */}
                                    </button>
                                    <button
                                      className={user_type === "admin" ? "btn btn-outline-info action_btn" : " d-none"}
                                      onClick={() =>
                                        ChangeApplicantsAgent(empdata.employee_id)
                                      }
                                      title="Change partner"
                                    >
                                      <span className="text-gray px-2">
                                        <MdRealEstateAgent />
                                      </span>
                                      {/* <i className="fas fa-stream text-gray"></i> */}
                                    </button>
                                    <Link
                                      style={{
                                        padding: "0 5px",
                                        minWidth: "auto",
                                        height: "auto",
                                      }}
                                      className="btn btn-sm btn-outline-info action_btn text-center"
                                      to={`/${empdata.employee_id}`}
                                      title="Candidate Details"
                                      onClick={() => localStorage.setItem("StatusTab", status === "" ? "00" : status)}
                                    >
                                      Update
                                    </Link>
                                    {/* <button
        className="btn btn-outline-info action_btn"
        onClick={() =>
          editEmployee(empdata.employee_id)
        }
        title="Edit Employee"
      >
        <span className="text-gray px-2">
          <LiaUserEditSolid />
        </span>
      </button>
      <button
        className="btn btn-outline-info action_btn"
        onClick={() =>
          editEmployeeEducation(empdata.employee_id)
        }
        title="Education"
      >
        <span className="text-gray px-2">
          <MdOutlineCastForEducation />
        </span>
      </button>
      <button
        className="btn btn-outline-info action_btn"
        onClick={() =>
          editEmployeeSkills(empdata.employee_id)
        }
        title="Skills"
      >
        <span className="text-gray px-2">
          <GiSkills />
        </span>
      </button>
      <button
        className="btn btn-outline-info action_btn"
        onClick={() =>
          editEmployeeCareer(empdata.employee_id)
        }
        title="Edit Career"
      >
        <span className="text-gray px-2">
          <LiaUserTieSolid />
        </span>
      </button> */}
                                    <button
                                      className="btn btn-outline-info action_btn text-center"
                                      onClick={() =>
                                        ResumeClick(empdata.employee_id)
                                      }
                                      title="View Resume"
                                    >
                                      <span className="text-gray px-2">
                                        <AiOutlineFilePdf />
                                      </span>
                                      {/* <span className="fas fa-file text-gray"></span> */}
                                    </button>
                                    <button
                                      className="btn btn-outline-info action_btn text-gray"
                                      onClick={() => editJob(empdata)}
                                      title="All jobs "
                                      disabled={empdata.interested_in === "pgwp"}
                                    >
                                      <span className="text-gray px-2">
                                        <PiBriefcaseLight />
                                      </span>
                                      {/* <i className="fas fa-briefcase"></i> */}
                                    </button>
                                    <button
                                      className="btn btn-outline-info action_btn"
                                      onClick={() => ShowDeleteAlert(empdata)}
                                      title="Delete"
                                    >
                                      <span className="px-2 text-danger">
                                        <RiDeleteBin5Line />
                                        {/* <i className="fa fa-trash "></i> */}
                                      </span>
                                    </button>
                                  </>
                                  {/* )} */}
                                </>
                              ) : (
                                <button
                                  className="btn btn-outline-info action_btn"
                                  // disabled={alredyApplied ? false : true}
                                  disabled={empdata.interested_in === "pgwp"}
                                  onClick={() =>
                                    onApplyJobClick(empdata.employee_id)
                                  }
                                  title="Apply For job"
                                >
                                  {alredyApplied ? "Already Applied" : "Apply"}
                                </button>
                              )}
                            </div>
                          </td>
                        )}
                        {/* {props.self === "yes" ? (
          <td>
            <button
className="btn btn-outline-info action_btn"
onClick={() => ChangeApplicantsStatus(empdata)}
title="Approve Applicant"
            >
<span className="text-gray px-2">
  <GoTasklist />
</span>
            </button>
          </td>
        ) : (
          ""
        )} */}
                      </tr>
                      {props.ApplicantType ? <tr>
                        <td
                          colSpan="12"
                          className={
                            empdata.applicant_process_status ? "bg-white text-center" : "d-none"
                          }
                        ><VisaTimeLine visa={empdata.applicant_process_status} substage={empdata.applicant_process_substages} />
                        </td>
                      </tr> : null}
                    </>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
        <div className="pt-2">
          <Pagination
            nPages={nPages}
            currentPage={props.pageNo}
            setCurrentPage={props.setpageNo}
            total={totalData}
            count={employeeData.length}
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
