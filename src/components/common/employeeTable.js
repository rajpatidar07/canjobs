import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PersonalDetails from "../forms/user/personal";
import Education from "../forms/user/education";
import Skills from "../forms/user/skills";
import {
  getallEmployeeData,
  DeleteJobEmployee,
  ApplyJob,
  getallAdminData,
  getApplicanTypeApi,
  AddEmployeeDetails,
  AddUpdateVisa,
} from "../../api/api";
import moment from "moment";
import { BiSolidCategory } from "react-icons/bi";
import SAlert from "../common/sweetAlert";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../common/pagination";
import EmployementDetails from "../forms/user/employement";

import Loader from "../common/loader";
import JobModal from "../admin/Modal/jobModal";
import VisaStatus from "../forms/user/visaStatus";
import ApplicantsStatusModal from "../forms/admin/ApplicantsStatusModal";
import {
  /* MdOutlineCastForEducation,*/ MdTypeSpecimen,
  MdRealEstateAgent,
  MdEditNote,
} from "react-icons/md";
// import { LiaUserEditSolid, LiaUserTieSolid } from "react-icons/lia";
import { GoTasklist } from "react-icons/go";
// import { GiSkills } from "react-icons/gi";
import { AiOutlineFilePdf } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { PiBriefcaseLight } from "react-icons/pi";
import ConvertTime from "./Common function/ConvertTime";
import VisaTimeLine from "./visaTimeLine";
import CustomButton from "./button";
import determineBackgroundColor from "./Common function/DetermineBackgroundColour";
import CommentTaskBox from "./commonTaskBox";
import ModalSidebar from "./modalSidebar";
import { BsChat } from "react-icons/bs";
import CommonThreeDots from "./Common function/commonThreeDots";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import filterjson from "../json/filterjson";
import AddConsultationInCandidate from "../forms/admin/AddConsultationInCandidate";
import { FaHandshake } from "react-icons/fa";

export default function EmployeeTable(props) {
  // Sticky column left positions
  const stickyLeftEID = 0;
  const stickyLeftName = stickyLeftEID + 50;
  const stickyLeftNote = stickyLeftName + 150;

  let agentId = localStorage.getItem("agent_id");
  let user_type = localStorage.getItem("userType");
  let StatusTab = localStorage.getItem("StatusTab");
  let portal = localStorage.getItem("portal");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let canID = searchParams.get("canId");
  let taskID = searchParams.get("taskId");
  let notifiType = searchParams.get("notifiType");
  let [CandidateId, setCandidateId] = useState(canID || "");
  let [TaskId, setTaskId] = useState(taskID || "");
  /*Show modal states */
  let [apiCall, setApiCall] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  const [showEmploymentDetails, setShowEmploymentDetails] = useState(false);
  const [showAddConsultationForm, setShowAddConsultationForm] = useState(false);
  let [showAddEmployeeModal, setShowEmployeeMOdal] = useState(false);
  let [showVisaModal, setVisaModal] = useState(false);
  let [showChangeJobModal, setShowChangeJobModal] = useState(false);
  let [showEducationModal, setShowEducationModal] = useState(false);
  let [showSkillsModal, setShowSkillsModal] = useState(false);
  let [pageNameForForm, setPageNameForForm] = useState(false);
  let [admintList, setAdmintList] = useState([]);
  let [applicantTypeList, setApplicantTypeList] = useState([]);
  let [showStatusChangeModal, setShowStatusChange] = useState(false);
  let [showChatModal, setShowChatModal] = useState(false);
  /*data and id states */
  const [employeeData, setEmployeeData] = useState([]);
  const [alredyApplied, setAlredyApplied] = useState(false);
  let [employeeId, setemployeeId] = useState();
  /*delete state */
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteID] = useState();
  const [deleteName, setDeleteName] = useState("");
  // const [statusList, ] = useState([...filterjson.employee_status]);
  // const statusList = [...filterjson.employee_status];
  /*Pagination states */
  const [status, setStatus] = useState(
    StatusTab
      ? StatusTab === "0"
        ? props.self === "yes"
          ? "-1,0,1,2,3,5,6,10"
          : "4,7,8,9"
        : StatusTab
      : props.pageName === "local_candidate"
        ? ""
        : props.pageName === "consultation"
          ? "-1,0,1,2,3,5,6,10,4,7,8,9"
          : props.ApplicantType
            ? "4,7,8,9"
            : props.self === "yes"
              ? "-1"
              : "4,7,8,9"
  );

  const [totalData, setTotalData] = useState("");
  const [recordsPerPage] = useState(10);
  /*Shorting states */
  const [columnName, setcolumnName] = useState(
    props.heading === "Dashboard" ? "created_at" : ""
  );
  const [sortOrder, setSortOrder] = useState(
    props.heading === "Dashboard" ? "DESC" : ""
  );


  let getApplicantType = (id) =>
    applicantTypeList?.find((x) => x.id === id)?.title;

  /* Function to get Employee data*/
  const EmpData = async () => {
    // const params = useParams();
    setIsLoading(true);
    if (
      (location.pathname === "/slots" && props?.ApplicantType) ||
      location.pathname !== "/slots"
    ) {
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
          props.statustFilterValue
            ? props.statustFilterValue
            : props.skill ||
              props.heading === "Dashboard" ||
              status === "00" ||
              portal === "study"
              ? ""
              : StatusTab
                ? StatusTab
                : props.pageName === "local_candidate"
                  ? ""
                  : props?.ApplicantType
                    ? "4,7,8,9"
                    : status,
          props.job_id ? props.job_id : "",
          CandidateId ? CandidateId : props.filterByEmployeeId,
          location.pathname === "/slots"
            ? props?.ApplicantType
            : props.interestFilterValue,
          "",
          user_type === "agent" ? agentId : props.agentFilterValue,
          props.adminFilterValue,
          "", // props.categoryFilterValue,
          props.localFilterValue,
          props.webFilterValue,
          props.consultationOptedFilterValue,
          props.consultationStartDateFilterValue,
          props.consultationEndDateFilterValue,
          // props.subCategoryFilterValue
        );
        if (userData.data.length === 0) {
          setEmployeeData([]);
          setIsLoading(false);
          setTotalData(0);
        } else {
          /*Condition for candidate with PGWP applicant type can not able to apply  for the job */
          if (props.skill) {
            setEmployeeData(
              userData.data.filter((item) => item.interested_in !== "pgwp")
            );
          } else {
            setEmployeeData(userData.data);
            if (TaskId && CandidateId && notifiType === "candidate") {
              setShowChatModal(true);
              setemployeeId(userData.data[0] || "");
              window.history.replaceState(
                {},
                document.title,
                window.location.pathname
              );
              localStorage.removeItem("navigation_url");
              setCandidateId("");
              setTaskId("");
            }
          }
          setTotalData(userData.total_rows);
          setIsLoading(false);
          localStorage.setItem("StatusTab", "");
        }
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    } else {
      setEmployeeData([]);
      setIsLoading(false);
      setTotalData(0);
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
    try {
      let response = await getApplicanTypeApi("");
      setApplicantTypeList(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (canID) setCandidateId(canID);
    if (taskID) setTaskId(taskID);
  }, [location.key, canID, taskID]);

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
    location.key,
    props?.ApplicantType,
    CandidateId,
    TaskId,
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
    // props.categoryFilterValue,
    props.localFilterValue,
    props.filterByEmployeeId,
    props.statustFilterValue,
    props.webFilterValue,
    props.consultationOptedFilterValue,
    props.consultationStartDateFilterValue,
    props.consultationEndDateFilterValue,
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
  // setShowEmploymentDetails(true);
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
  /*function to Open  Add Consultation form Modal */
  const AddConsultaionClick = (e) => {
    setemployeeId(e);
    setShowAddConsultationForm(true);
  };


  /*function to Open  change applicants category Modal */
  const ChangeApplicantsCategory = (e) => {
    setemployeeId(e);
    setShowEmployeeMOdal(true);
    setPageNameForForm("Category");
  };

  /*function to Open  change applicants type Modal */
  const ChangeApplicantsType = (e) => {
    setemployeeId(e);
    setShowEmployeeMOdal(true);
    setPageNameForForm("ApplicantType");
  };

  /*function to Open  change applicants Agent "Reffer_by" Modal */
  const ChangeApplicantsAgent = (e) => {
    setemployeeId(e);
    setShowEmployeeMOdal(true);
    setPageNameForForm("agentAssigned");
  };

  /*Function to get the new user */

  /*Function to clear the page no of the pagination */
  const clearPageNo = () => {
    localStorage.removeItem("PageNo");
    props.setpageNo(1);
  };



  /*Onchange function to change the status */
  const OnStatusChange = async (e, empData, eventKey) => {
    e.preventDefault();
    setIsLoading(true);
    let data = {
      employee_id: empData.employee_id,
      status: eventKey,
      name: empData.name,
      documents_folder_id: empData.documents_folder_id,
    };
    try {
      let response = await AddEmployeeDetails(data);
      if (response.message === "Employee data updated successfully") {
        toast.success("Candidate status changes successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        if (empData.status === "4" && !props.data.visa_status) {
          let state = { status: "onboard" };
          try {
            let VisaResponse = await AddUpdateVisa(
              empData.employee_id,
              state,
              "",
              "visa"
            );
            if (VisaResponse.data.message === "visa inserted successfully") {
              props.setApiCall(true);
              setIsLoading(false);
              props.close();
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          props.setApiCall(true);
          setIsLoading(false);
          props.close();
        }
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  /*Function to change the applicant type of the employee */
  const OnApplicantTypeChange = async (e, empData, eventKey) => {
    e.preventDefault();
    setIsLoading(true);
    let data = {
      employee_id: empData.employee_id,
      interested_in_id: eventKey,
      name: empData.name,
      documents_folder_id: empData.documents_folder_id,
    };
    try {
      let response = await AddEmployeeDetails(data);
      if (response.message === "Employee data updated successfully") {
        toast.success("Candidate Applicant Type updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        props.setApiCall(true);
        setIsLoading(false);
      } else {
        props.setApiCall(true);
        setIsLoading(false);
        props.close();
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };



  /*Function to get the parent interested in of the employee that is applicant type */
  let ApplicantType = (id) => {
    const selectedItem = applicantTypeList.find((item) => item.id === id);
    if (!selectedItem) return null; // Handle case where no match is found

    if (selectedItem.level === "0") {
      return selectedItem.title;
    } else if (selectedItem.level === "2") {
      const data = selectedItem.all_parent_id.split(",")[0];
      const parentItem = applicantTypeList.find((item) => item.id === data);
      return parentItem ? parentItem.title : null;
    } else {
      const data = selectedItem.parent_id;
      const parentItem = applicantTypeList.find((item) => item.id === data);
      return parentItem ? parentItem.title : null;
    }
  };

  /*Function to get the child interested in of the employee that is sub applicant type */
  let ApplicantSubType = (id) => {
    const selectedItem = applicantTypeList.find((item) => item.id === id && item.level === "1");
    if (!selectedItem) return null; // Handle case where no match is found
    return selectedItem.title;
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
          type={props?.ApplicantType}
          typeName={getApplicantType(props?.ApplicantType)}
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
      {showEmploymentDetails ? (
        <EmployementDetails
          show={showEmploymentDetails}
          employeeId={employeeId}
          apiCall={apiCall}
          setApiCall={setApiCall}
          close={() => setShowEmploymentDetails(false)}
        />
      ) : null}
      {showAddConsultationForm ?
        <AddConsultationInCandidate
          show={showAddConsultationForm}
          employeeId={employeeId}
          apiCall={apiCall}
          setApiCall={setApiCall}
          close={() => setShowAddConsultationForm(false)}
        />
        : null}
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
      <ModalSidebar
        show={showChatModal}
        onClose={() => {
          setShowChatModal(false);
          setemployeeId();
          setTaskId("");
          setCandidateId("");
          canID = "";
          taskID = "";
        }}
        children={
          <CommentTaskBox
            userId={employeeId?.employee_id}
            taskType={props.ApplicantType ? "applicant_type_candidate_chat" : "note"}
            taskUserType={"employee"}
            setOpenReplyBox={setShowChatModal}
            openReplyBox={showChatModal}
            taskName={"Note for Candidate"}
            TaskId={taskID}
          />
        }
      >
      </ModalSidebar>
      {/* {showApplicantTypeForm ?
        <AddApplicantType
          show={showApplicantTypeForm}
          close={() => {
            setShowApplicantTypeForm(false);
          }}
        />
        : null} */}
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
      <div className="bg-white shadow-8 datatable_div pt-7 rounded pb-9 px-5 ">
        {props.heading === "Dashboard" ? null : (
          <div className="d-flex justify-content-between align-items-center w-100">
            <div
              className={`btn-group d-flex flex-wrap mb-3 ${props.skill || location.pathname === "/slots" || props.pageName === "consultation" ? "d-none" : ""}`}
              role="group" aria-label="Basic example">
              <button
                type="button"
                className={
                  props.pageName === "local_candidate"
                    ? "d-none"
                    : status === "" ||
                      status === "00" ||
                      status === "-1,0,1,2,3,5,6,10" ||
                      status === "4,7,8,9"
                      ? "btn btn-primary"
                      : "btn btn-outline-primary"
                }
                onClick={() => {
                  setStatus(props.self === "yes" ? "-1,0,1,2,3,5,6,10" : "4,7,8,9");
                  clearPageNo();
                  localStorage.setItem(
                    "StatusTab",
                    props.self === "yes" ? "-1,0,1,2,3,5,6,10" : "4,7,8,9"
                  );
                }}
                title="All"
              >
                All
              </button>
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
                      setStatus(-1);
                      clearPageNo();
                      localStorage.setItem("StatusTab", -1);
                    }}
                    title="New"
                  >
                    New
                  </button>
                  <button
                    type="button"
                    className={
                      status === 2 || status === "2"
                        ? "btn btn-primary"
                        : "btn btn-outline-primary"
                    }
                    onClick={() => {
                      setStatus(2);
                      clearPageNo();
                      localStorage.setItem("StatusTab", 2);
                    }}
                    title="Prospect"
                  >
                    Prospect
                  </button>
                  <button
                    type="button"
                    className={
                      status === 3 || status === "3"
                        ? "btn btn-primary"
                        : "btn btn-outline-primary"
                    }
                    onClick={() => {
                      setStatus(3);
                      clearPageNo();
                      localStorage.setItem("StatusTab", 3);
                    }}
                    title="Lead"
                  >
                    Lead
                  </button>
                  <button
                    type="button"
                    className={
                      status === 10 || status === "10"
                        ? "btn btn-primary"
                        : "btn btn-outline-primary"
                    }
                    onClick={() => {
                      setStatus(10);
                      clearPageNo();
                      localStorage.setItem("StatusTab", 10);
                    }}
                    title="Consultation"
                  >
                    Consultation
                  </button>
                  <button
                    type="button"
                    className={
                      status === "5" || status === 5
                        ? "btn btn-primary"
                        : "btn btn-outline-primary"
                    }
                    onClick={() => {
                      setStatus(5);
                      clearPageNo();
                      localStorage.setItem("StatusTab", 5);
                    }}
                    title="Lost"
                  >
                    Lost
                  </button>
                  <button
                    type="button"
                    className={
                      status === "6" || status === 6
                        ? "btn btn-primary"
                        : "btn btn-outline-primary"
                    }
                    onClick={() => {
                      setStatus(6);
                      clearPageNo();
                      localStorage.setItem("StatusTab", 6);
                    }}
                    title="Dead"
                  >
                    Dead
                  </button>
                </>
              ) : props.pageName === "local_candidate" ? null : (
                <>
                  <button
                    type="button"
                    className={
                      status === "4" || status === 4
                        ? "btn btn-primary"
                        : "btn btn-outline-primary"
                    }
                    onClick={() => {
                      setStatus(4);
                      clearPageNo();
                      localStorage.setItem("StatusTab", 4);
                    }}
                    title="Retained"
                  >
                    Retained
                  </button>
                  <button
                    type="button"
                    className={
                      status === "7" || status === 7
                        ? "btn btn-primary"
                        : "btn btn-outline-primary"
                    }
                    onClick={() => {
                      setStatus(7);
                      clearPageNo();
                      localStorage.setItem("StatusTab", 7);
                    }}
                    title="Working on"
                  >
                    Working on
                  </button>
                  <button
                    type="button"
                    className={
                      status === "8" || status === 8
                        ? "btn btn-primary"
                        : "btn btn-outline-primary"
                    }
                    onClick={() => {
                      setStatus(8);
                      clearPageNo();
                      localStorage.setItem("StatusTab", 8);
                    }}
                    title="Submitted"
                  >
                    Submitted
                  </button>
                  <button
                    type="button"
                    className={
                      status === "9" || status === 9
                        ? "btn btn-primary"
                        : "btn btn-outline-primary"
                    }
                    onClick={() => {
                      setStatus(9);
                      clearPageNo();
                      localStorage.setItem("StatusTab", 9);
                    }}
                    title="Submitted"
                  >
                    Completed
                  </button>
                </>
              )}
            </div>
            {props.pageName === "employee" ? (
              <>
                <div className="col mb-3 px-1 form_group text-right">
                  <CustomButton
                    className="font-size-3 rounded-3 btn btn-primary border-0"
                    onClick={() => props.editEmployee("0")}
                    title="Add Candidate"
                  >
                    Add Candidate
                  </CustomButton>
                  {/* <Link
                      className={user_type === "admin" ? ` btn-sm  btn-primary m-1` : "d-none"}
                      onClick={() => setShowApplicantTypeForm(true)}
                      title={"Add New Applicant type"}
                    >
                      {<MdOutlineTypeSpecimen size={10} />}
                    </Link> */}
                </div>
              </>
            ) : null}
            <div className={location.pathname === "/slots" || props.pageName === "consultation" || props.job_id ? "d-none" : ""}>
              <div className="mt-2">
                <CommonThreeDots
                  tableName={"employee"}
                  local={props.localFilterValue ? props.localFilterValue : ""}
                  portal={portal}
                  exportCandidatestatus={
                    status === "00" || !status ? "" : status
                  }
                  tableData={[]}
                />
              </div>
            </div>
          </div>
        )}
        <div
          className="table-responsive main_table_div"
          style={{ maxHeight: "calc(100vh - 205px)" }}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <table className="table table-striped main_data_table m-0">
              <thead>
                <tr className="">
                  <th
                    scope="col"
                    className=" border-0 font-size-3 font-weight-normal table_sticky_col sticky_col1   "
                    style={{ background: "rgb(252, 182, 182)", transition: "background 0.3s", minWidth: "50px", position: "sticky", }}
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
                      {portal === "study" ? "SID" : "EID"}
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className="border-0 font-size-3 font-weight-normal table_sticky_col sticky_col1   table_sticky_col"
                    style={{ background: "rgb(252, 182, 182)", transition: "background 0.3s", minWidth: "150px", left: `${stickyLeftName}px` }}
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
                  {props.heading === "Dashboard" ? (
                    ""
                  ) : <th
                    scope="col"
                    className="border-0 font-size-3 font-weight-normal  sticky_col1  "
                    style={{
                      background: "rgb(252, 182, 182)", position: "sticky",
                      transition: "background 0.3s ease",
                      minWidth: "50px", left: `${stickyLeftNote}px`,
                    }}
                  >
                    Note
                  </th>}
                  {props.heading === "Dashboard" ? (
                    ""
                  ) : (
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal text-truncate"
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
                  )}
                  {props.heading === "Dashboard" ? (
                    ""
                  ) : (
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal text-truncate"
                    >
                      <Link
                        to={""}
                        onClick={() => {
                          handleSort("assigned_by	");
                          props.setpageNo(1);
                        }}
                        className="text-gray"
                        title="Sort by Assigned	Admin "
                      >
                        Assigned Admin
                      </Link>
                    </th>
                  )}
                  {props.heading === "Dashboard" ? (
                    ""
                  ) : (
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal text-truncate"
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
                  {
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal text-truncate"
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
                  }
                  {props.heading === "Dashboard" || user_type === "agent" ? (
                    ""
                  ) : (
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal text-truncate"
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
                      className="border-0 font-size-4 font-weight-normal text-truncate"
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
                  {!location.pathname === "/slots" ? (
                    ""
                  ) : (
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal text-truncate"
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
                      className="border-0 font-size-4 font-weight-normal text-truncate"
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
                  {props?.ApplicantType && (
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal text-truncate"
                      title="Sub Type"
                    >
                      Sub Type
                    </th>
                  )}
                  {props.visa === "yes" ? null : (
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal text-truncate"
                      title="Status"
                    >
                      Status
                    </th>
                  )}
                  <th
                    scope="col"
                    className="border-0 font-size-4 font-weight-normal text-truncate"
                    title="Profile"
                  >
                    Profile
                  </th>
                  {status === "10" || props.pageName === "consultation" || status === 10 || status === "-1,0,1,2,3,5,6,10" || status === "4,7,8,9" ?
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal text-truncate"
                    >
                      <Link
                        to={""}
                        onClick={() => {
                          handleSort("consultation_opted");
                          props.setpageNo(1);
                        }}
                        className="text-gray"
                        title="Sort by Consultation Opted"
                      >
                        Consultation Opted
                      </Link>
                    </th>
                    : null}
                  {status === "10" || props.pageName === "consultation" || status === 10 || status === "-1,0,1,2,3,5,6,10" || status === "4,7,8,9" ?
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal text-truncate"
                    >
                      <Link
                        to={""}
                        onClick={() => {
                          handleSort("consultation_date");
                          props.setpageNo(1);
                        }}
                        className="text-gray"
                        title="Sort by Consultation Date"
                      >
                        Consultation Date
                      </Link>
                    </th>
                    : null}
                  {props.pageName === "consultation" ?
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal text-truncate"
                    >
                      <Link
                        to={""}
                        onClick={() => {
                          handleSort("signature_status");
                          props.setpageNo(1);
                        }}
                        className="text-gray"
                        title="Sort by RA Signature status"
                      >
                        RA Signature status
                      </Link>
                    </th>
                    : null}
                  {props.pageName === "consultation" ?
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal text-truncate"
                    >
                      <Link
                        to={""}
                        onClick={() => {
                          handleSort("received_date");
                          props.setpageNo(1);
                        }}
                        className="text-gray"
                        title="Sort by RA Received date"
                      >
                        RA Received date
                      </Link>
                    </th>
                    : null}
                  {props.pageName === "consultation" ?
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal text-truncate"
                    >
                      <Link
                        to={""}
                        onClick={() => {
                          handleSort("payment_mode");
                          props.setpageNo(1);
                        }}
                        className="text-gray"
                        title="Sort by Payment Mode"
                      >
                        Payment Mode
                      </Link>
                    </th>
                    : null}
                  {props.pageName === "consultation" ?
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal text-truncate"
                    >
                      <Link
                        to={""}
                        onClick={() => {
                          handleSort("payment_date");
                          props.setpageNo(1);
                        }}
                        className="text-gray"
                        title="Sort by Payment Date"
                      >
                        Payment Date
                      </Link>
                    </th>
                    : null}
                  {props.heading === "Dashboard" ? (
                    ""
                  ) : (
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal text-truncate"
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
                    <th colSpan={props.pageName === "consultation" ? 18 : 15} className="bg-white text-center">
                      No Data Found
                    </th>
                  </tr>
                ) : (
                  (employeeData || []).map((empData, index) => (
                    <React.Fragment key={empData.employee_id}>
                      <tr style={{ border: "0", position: "sticky" }}>
                        <td
                          style={{ paddingBottom: "0!important" }}
                          colSpan="15"
                          className={
                            empData.applicant_process_status
                              ? "bg-white text-center m-0"
                              : "d-none"
                          }
                        >
                          <VisaTimeLine
                            visa={empData.applicant_process_status}
                            substage={empData.applicant_process_substages}
                            type={location.pathname === "/slots" ? "" : ApplicantType(empData.interested_in_id)}
                          />
                        </td>
                      </tr>
                      {/* <tr style={{ border: "0" }}>
                        <td
                          style={{ paddingBottom: "0!important" }}
                          colSpan="14"
                          className={user_type === "admin" ? "bg-white text-center m-0"
                            : "d-none"}
                        >
                          <ApplicantTypeTimeLine
                            All_types={empData.all_interested_in_id}
                            ApplicantTypeList={applicantTypeList}
                          />
                        </td>
                      </tr> */}
                      <tr
                        className={
                          empData.applicant_process_status
                            ? "applicant_row applicant_row_status"
                            : "applicant_row"
                        }
                        key={empData.employee_id}
                      >
                        <td className=" sticky_col1 py-5  text-capitalize  py-5" title={empData.employee_id} style={{ position: "sticky", transition: "background 0.3s", backgroundColor: "rgb(244, 244, 244)", minWidth: "50px", }}>
                          <p className="font-size-3 font-weight-normal text-black-2 mb-0">
                            {empData.employee_id}
                          </p>
                        </td>
                        <td className=" table_sticky_col sticky_col1 py-5  text-capitalize py-5"
                          style={{ left: `${stickyLeftName}px`, backgroundColor: "rgb(244, 244, 244)", }}>
                          <div>
                            <div className="d-flex profile_box gx-2">
                              <div className="media  align-items-center">
                                <Link
                                  to={
                                    portal === "study"
                                      ? `/student_profile`
                                      : `/${empData.employee_id}`
                                  }
                                  onClick={
                                    () => {
                                      if (portal === "study") {
                                        localStorage.setItem(
                                          "employee_id",
                                          empData.employee_id
                                        );
                                      } else {
                                        localStorage.setItem(
                                          "StatusTab",
                                          status === "" ? "00" : status
                                        );
                                      }
                                    }

                                    //   empData.name !== null
                                    //     ? () => employeeDetails(empData.employee_id)
                                    //     : null
                                  }
                                  title={
                                    portal === "study"
                                      ? "Student Details"
                                      : "Candidate Details"
                                  }
                                  className="w-100"
                                >
                                  <div className="circle-30 mx-auto overflow-hidden">
                                    {empData.profile_photo === null ? (
                                      <img
                                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                                        alt=""
                                        className="w-100"
                                      />
                                    ) : (
                                      <img
                                        src={empData.profile_photo}
                                        alt=""
                                        className="w-100"
                                      />
                                    )}
                                  </div>
                                </Link>
                              </div>

                              <div className=" mb-0">
                                {empData.name === null ||
                                  empData.name === undefined ||
                                  empData.name === "undefined" ||
                                  empData.name === "" ? (
                                  <p className="font-size-3  mb-0">N/A</p>
                                ) : (
                                  <Link
                                    to={
                                      portal === "study"
                                        ? `/student_profile`
                                        : `/${empData.employee_id}`
                                    }
                                    onClick={
                                      () => {
                                        if (portal === "study") {
                                          localStorage.setItem(
                                            "employee_id",
                                            empData.employee_id
                                          );
                                        } else {
                                          localStorage.setItem(
                                            "StatusTab",
                                            status === "" ? "00" : status
                                          );
                                        }
                                      }

                                      //   empData.name !== null
                                      //     ? () => employeeDetails(empData.employee_id)
                                      //     : null
                                    }
                                    title="Candidate Details"
                                    className="w-100"
                                  >
                                    <p
                                      className="m-0 text-black-2 font-weight-bold text-capitalize text-truncate"
                                      title={empData.name}
                                    >
                                      {empData.name}
                                    </p>
                                  </Link>
                                )}
                                {empData.gender || empData.marital_status ? (
                                  <p
                                    className="text-gray font-size-2 m-0 text-capitalize"
                                    title={
                                      (empData.gender
                                        ? empData.gender === "female"
                                          ? "F"
                                          : empData.gender === "male"
                                            ? "M"
                                            : "O"
                                        : "") +
                                      (empData.marital_status ||
                                        empData.date_of_birth
                                        ? `${empData.marital_status},${empData.date_of_birth
                                          ? moment().diff(
                                            empData.date_of_birth + " Y",
                                            "years"
                                          )
                                          : ""
                                        }`
                                        : null)
                                    }
                                  >
                                    {empData.gender
                                      ? empData.gender === "female"
                                        ? "F"
                                        : empData.gender === "male"
                                          ? "M"
                                          : "O"
                                      : ""}
                                    {/*Calculation of age from date of birth*/}(
                                    {empData.marital_status ||
                                      empData.date_of_birth
                                      ? `${empData.marital_status},${empData.date_of_birth
                                        ? moment().diff(
                                          empData.date_of_birth,
                                          "years"
                                        ) + " Y"
                                        : ""
                                      }`
                                      : null}
                                    )
                                  </p>
                                ) : null}
                                {empData.contact_no === null ||
                                  !empData.contact_no ||
                                  empData.contact_no === (0 || "0") ? null : (
                                  <p className="m-0" title={empData.contact_no}>
                                    +
                                    <Link
                                      className="text-dark font-size-2"
                                      to={`tel:+${empData.contact_no}`}
                                    >
                                      {empData.contact_no}
                                    </Link>
                                  </p>
                                )}
                                <h3 className=" font-weight-normal text-black-2 mb-0">
                                  <p
                                    className="text-gray font-size-2 m-0 text-break"
                                    title={empData.email}
                                  >
                                    <Link
                                      className="text-dark"
                                      to={`mailto:${empData.email}`}
                                    >
                                      {empData.email}
                                    </Link>
                                  </p>
                                </h3>
                                {empData.is_featured === "1" ||
                                  empData.is_featured === 1 ? (
                                  <span className="bg-orange text-white featured_tag">
                                    Featured
                                  </span>
                                ) : null}
                                {empData.created_by_admin === "0" ||
                                  empData.created_by_admin === 0 ? (
                                  <span className="bg-info text-white web_tag">
                                    Web
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          {empData.is_featured === "1" ||
                            empData.is_featured === 1 ? (
                            <span className="bg-orange text-white featured_tag">
                              Featured
                            </span>
                          ) : null}
                        </td>
                        {props.heading === "Dashboard" ? (
                          ""
                        ) : <td className="  sticky_col1 py-5  text-capitalize"
                          style={{
                            left: `${stickyLeftNote}px`, position: "sticky",
                            transition: "background 0.3s ease",
                            minWidth: "50px", backgroundColor: "rgb(244, 244, 244)",
                          }}>
                          <Link
                            onClick={() => {
                              setShowChatModal(true);
                              setemployeeId(empData);
                            }}
                            title="Note"
                          >
                            <span className="text-gray px-2">
                              <BsChat />
                            </span>
                          </Link>
                        </td>}
                        {props.heading === "Dashboard" ? (
                          ""
                        ) : (
                          <td className="py-5 ">
                            {empData.created_by_admin === null ||
                              !empData.created_by_admin ||
                              empData.created_by_admin === ("0" || 0) ? (
                              <p className="font-size-3  mb-0">N/A</p>
                            ) : (
                              <p
                                className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate text-capitalize"
                                title={
                                  admintList?.find(
                                    (item) =>
                                      item.admin_id ===
                                      empData?.created_by_admin
                                  )?.name
                                }
                              >
                                {admintList?.find(
                                  (item) =>
                                    item.admin_id === empData?.created_by_admin
                                )?.name || "N/A"}
                              </p>
                            )}
                          </td>
                        )}
                        {props.heading === "Dashboard" ? (
                          ""
                        ) : (
                          <td className="py-5 ">
                            {empData.assigned_by === null ||
                              !empData.assigned_by ||
                              empData.assigned_by === ("0" || 0) ? (
                              <p className="font-size-3  mb-0">N/A</p>
                            ) : (
                              <p
                                className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate text-capitalize"
                                title={
                                  admintList?.find(
                                    (item) =>
                                      item.admin_id === empData?.assigned_by
                                  )?.name
                                }
                              >
                                {admintList?.find(
                                  (item) =>
                                    item.admin_id === empData?.assigned_by
                                )?.name || "N/A"}
                              </p>
                            )}
                          </td>
                        )}
                        {props.heading === "Dashboard" ? (
                          ""
                        ) : (
                          <td className="py-5 ">
                            {empData.last_updated_by_name === null ||
                              !empData.last_updated_by_name ? (
                              <p className="font-size-3  mb-0">N/A</p>
                            ) : (
                              <p
                                className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate text-capitalize"
                                title={empData?.last_updated_by_name}
                              >
                                {empData?.last_updated_by_name}
                              </p>
                            )}
                          </td>
                        )}
                        {
                          <td className=" py-5">
                            {empData.language === null ? (
                              <p className="font-size-3  mb-0">N/A</p>
                            ) : (
                              <p
                                className="font-size-3 font-weight-normal text-black-2 mb-0"
                                title={ConvertTime({
                                  _date: empData.created_at,
                                  format: "DD MMM, YYYY",
                                })}
                              >
                                {/* {empData.language} */}
                                <ConvertTime
                                  _date={empData.created_at}
                                  format={"DD MMM, YYYY"}
                                />
                                {/* {moment(empData.created_at).format(
                                "DD MMMM, YYYY"
                              )} */}
                              </p>
                            )}
                          </td>
                        }
                        {props.heading === "Dashboard" ||
                          user_type === "agent" ? (
                          ""
                        ) : (
                          <td className=" py-5">
                            {empData.agent_name === null ? (
                              <p className="font-size-3  mb-0">N/A</p>
                            ) : (
                              <Link
                                to={`/partner_profile`}
                                onClick={() => {
                                  localStorage.setItem(
                                    "agent_id",
                                    empData.reffer_by
                                  )
                                }}
                              >
                                <p
                                  className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate"
                                  title={
                                    empData.agent_u_id +
                                    " " +
                                    empData.agent_name
                                  }
                                >
                                  {empData.agent_u_id + " "}
                                  {empData.agent_name}
                                </p>
                              </Link>
                            )}
                          </td>
                        )}
                        {/* {props.heading === "Dashboard" ? (
                        ""
                      ) : (
                        <td className=" py-5">
                          {empData.education === null ? (
                            <p className="font-size-3  mb-0">N/A</p>
                          ) : (
                            <p
                              className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate"
                              title={empData.education}
                            >
                              {empData.education}
                            </p>
                          )}
                        </td>
                      )} */}
                        <td
                          className={
                            !location.pathname === "/slots" ? "d-none" : ""
                          }
                        >
                          <p
                            className="font-size-2 font-weight-normal text-black-2 mb-0"
                            title={empData.applicant_process_status || "N/A"}
                          >
                            {empData.applicant_process_status === "onboard" ? (
                              <span className="p-1 bg-coral-opacity-visible text-white text-center w-100 border rounded-pill">
                                On Board
                              </span>
                            ) : empData.applicant_process_status ===
                              "documentation" ? (
                              <span className="p-1 bg-warning text-white text-center w-100 border rounded-pill">
                                Documentation
                              </span>
                            ) : empData.applicant_process_status ===
                              "file preparation" ? (
                              <span className="p-1 bg-info text-white text-center w-100 border rounded-pill">
                                File Preparation
                              </span>
                            ) : empData.applicant_process_status ===
                              "file review" ? (
                              <span className="p-1 bg-primary-opacity-8 text-white text-center w-100 border rounded-pill">
                                File Review
                              </span>
                            ) : empData.applicant_process_status ===
                              "file submission" ? (
                              <span className="p-1 bg-dark text-white text-center w-100 border rounded-pill">
                                File Submission
                              </span>
                            ) : empData.applicant_process_status ===
                              "file decision" ? (
                              <span
                                className={`px-3 py-2 badge badge-pill ${empData.applicant_process_substages ===
                                  "approved"
                                  ? " badge-shamrock"
                                  : empData.applicant_process_substages ===
                                    "rejected"
                                    ? " badge-danger"
                                    : " badge-warning text-white"
                                  }`}
                              >
                                <span>
                                  {empData.applicant_process_substages ===
                                    "approved"
                                    ? "Approved"
                                    : empData.applicant_process_substages ===
                                      "rejected"
                                      ? "Rejected"
                                      : "Awaiting Decision"}
                                </span>
                              </span>
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
                          //   {empData.experience === null ? (
                          //     <p className="font-size-3 mb-0">N/A</p>
                          //   ) : (
                          //     <p className="font-size-3 font-weight-normal text-black-2 mb-0">
                          //       {empData.experience === "1-3 " ||
                          //         empData.experience === "1-2 " ||
                          //         empData.experience === "3-5 " ||
                          //         empData.experience === "5-7 " ||
                          //         empData.experience === "7+ "
                          //         ? empData.experience + "years"
                          //         : empData.experience}
                          //     </p>
                          //   )}
                          // </td>
                          // <td className="text-center ">
                          //   {empData.interested_in_id === null ||
                          //   !empData.interested_in_id ? (
                          //     <p className="font-size-3 mb-0" title="N/A">
                          //       N/A
                          //     </p>
                          //   ) : (
                          //     <p
                          //       className={`font-size-2 font-weight-normal text-white mb-0 `}
                          // title={
                          //   empData.interested_in_id === 14 ||
                          //   empData.interested_in_id === "14"
                          //     ? "temporary resident"
                          //     : getApplicantType(empData.interested_in_id)
                          // }
                          //     >
                          //       <span
                          //         className={`p-3 text-center  border rounded-pill
                          //         ${determineBackgroundColor(empData)}`}
                          //       >
                          //         {empData.interested_in_id === 14 ||
                          //         empData.interested_in_id === "14"
                          //           ? "temporary resident"
                          //           : getApplicantType(
                          //               empData.interested_in_id
                          //             )}
                          //       </span>
                          //     </p>
                          //   )}
                          // </td>
                          <td
                            className="text-center"
                            style={{ width: "15%", zIndex: 9999 }}
                          >
                            <div className="exclude-mark-read py-5">
                              {empData.interested_in_id === null ||
                                empData.interested_in_id === undefined ||
                                empData.interested_in_id === "undefined" ||
                                empData.interested_in_id === "" ? (
                                <p className="font-size-3  mb-0">N/A</p>
                              ) : (
                                <div
                                  style={{
                                    display: "table-caption",
                                    maxHeight: "100px",
                                  }}
                                >
                                  <DropdownButton
                                    as={ButtonGroup}
                                    title={
                                      ApplicantType(empData.interested_in_id) ||
                                      "Unknown"}
                                    variant={
                                      empData.interested_in_id === ("0" || 0)
                                        ? "warning"
                                        : empData.interested_in_id ===
                                          ("1" || 1)
                                          ? "shamrock"
                                          : empData.interested_in_id ===
                                            ("2" || 2)
                                            ? "danger"
                                            : determineBackgroundColor(empData)}
                                    size="xs"
                                    className={`user_status_btn btn-xs ${empData.interested_in_id === "0"
                                      ? "btn-warning"
                                      : empData.interested_in_id === "1"
                                        ? "btn-shamrock"
                                        : empData.interested_in_id === "2"
                                          ? "btn-danger px-4"
                                          : determineBackgroundColor(empData)
                                      } rounded-pill font-size-1 px-1 text-white mr-2`}
                                    onSelect={(eventKey, e) =>
                                      OnApplicantTypeChange(
                                        e,
                                        empData,
                                        eventKey
                                      )
                                    }
                                  >
                                    <div
                                      style={{
                                        maxHeight: "300px",
                                        overflow: "scroll",
                                      }}
                                    >
                                      {(applicantTypeList || [])
                                        .filter((item) => item.level === "0")
                                        .map((item, index) => (
                                          <Dropdown.Item
                                            key={index}
                                            value={item.title}
                                            eventKey={item.id}
                                            className="text-capitalize"
                                            style={{ maxHeight: "100px" }}
                                            active={ApplicantType(empData.interested_in_id) === item.title}>
                                            {item.title}
                                          </Dropdown.Item>
                                        ))}
                                    </div>
                                  </DropdownButton>
                                </div>
                              )}
                            </div>
                          </td>
                        )}

                        <td
                          className={
                            props?.ApplicantType && props?.ApplicantType
                              ? "d-flex justify-content-center text-center"
                              : "d-none"
                          }
                        >
                          {props?.ApplicantType && ApplicantSubType(
                            empData.interested_in_id
                          ) ? (
                            <>
                              {/* <p
                                className={`font-size-2 font-weight-normal text-white mb-0 text-capitalize  `}
                                title={getApplicantSubType(empData.category_id)}
                              >
                                <span
                                  className={`p-1 text-white text-center border rounded-pill ${determineBackgroundColor(
                                    empData
                                  )}`}
                                >
                                  {getApplicantSubType(empData.category_id)}
                                </span>
                              </p> */}

                              <div style={{ display: "table-caption" }}>
                                <DropdownButton
                                  as={ButtonGroup}
                                  title={ApplicantSubType(
                                    empData.interested_in_id
                                  )}
                                  variant={
                                    empData.interested_in_id === ("0" || 0)
                                      ? "warning"
                                      : empData.interested_in_id === ("1" || 1)
                                        ? "shamrock"
                                        : empData.interested_in_id === ("2" || 2)
                                          ? "danger"
                                          : determineBackgroundColor(empData)
                                  }
                                  size="xs"
                                  className={`user_status_btn btn-xs ${empData.interested_in_id === "0"
                                    ? "btn-warning"
                                    : empData.interested_in_id === "1"
                                      ? "btn-shamrock"
                                      : empData.interested_in_id === "2"
                                        ? "btn-danger px-4"
                                        : determineBackgroundColor(empData)
                                    } rounded-pill font-size-1 px-1 text-white mr-2`}
                                  onSelect={(eventKey, e) =>
                                    OnApplicantTypeChange(e, empData, eventKey)
                                  }
                                >
                                  {(applicantTypeList || [])
                                    .filter(
                                      (x) => x.id === empData.interested_in_id
                                    )
                                    .map((item, index) => (
                                      <>
                                        {(applicantTypeList || [])
                                          .filter(
                                            (x) =>
                                              x.level === "1" &&
                                              x.parent_id === item.parent_id
                                          )
                                          .map((item, index) => (
                                            <Dropdown.Item
                                              key={index}
                                              value={item.title}
                                              eventKey={item.id}
                                              className="text-capitalize"
                                              active={empData.interested_in_id === item.id}
                                            >
                                              {item.title}
                                            </Dropdown.Item>
                                          ))}
                                      </>
                                    ))}
                                </DropdownButton>
                              </div>
                            </>
                          ) : (
                            <p className="font-size-3 mb-0" title="N/A">
                              N/A
                            </p>
                          )}
                        </td>
                        {props.visa === "yes" ? null : (
                          <td className="text-center ">
                            {/* <p
                              className="font-size-2 font-weight-normal text-black-2 mb-0"
                              title={
                                empData.status === "1" || empData.status === "0"
                                  ? "New"
                                  : empData.status === "2"
                                    ? "Prospect"
                                    : empData.status === "3"
                                      ? "Lead"
                                      : empData.status === "4"
                                        ? "Retained"
                                        : empData.status === "5"
                                          ? "Lost"
                                          : empData.status === "6"
                                            ? "Dead"
                                            : empData.status === "7"
                                              ? "Working on"
                                              : empData.status === "8"
                                                ? "Submitted"
                                                : empData.status === "9"
                                                  ? "Completed"
                                                  : "N/A"
                              }
                            >
                              <span
                                className={`p-1 text-white text-center  border rounded-pill ${empData.status === "1" ||
                                  empData.status === "0"
                                  ? !isTimeWithin24Hours(empData.created_at)
                                    ? "bg-danger "
                                    : "bg-info "
                                  : empData.status === "2"
                                    ? "bg-warning"
                                    : empData.status === "3"
                                      ? "bg-coral-opacity-visible"
                                      : empData.status === "4"
                                        ? "bg-secondary"
                                        : empData.status === "5"
                                          ? "bg-spray"
                                          : empData.status === "6"
                                            ? "bg-dark"
                                            : empData.status === "7"
                                              ? "bg-primary-opacity-8"
                                              : empData.status === "8"
                                                ? "bg-eastern"
                                                : empData.status === "9"
                                                  ? "bg-shamrock"
                                                  : ""
                                  }`}
                              >
                                {empData.status === "1" ||
                                  empData.status === "0"
                                  ? "New"
                                  : empData.status === "2"
                                    ? "Prospect"
                                    : empData.status === "3"
                                      ? "Lead"
                                      : empData.status === "4"
                                        ? "Retained"
                                        : empData.status === "5"
                                          ? "Lost"
                                          : empData.status === "6"
                                            ? "Dead"
                                            : empData.status === "7"
                                              ? "Working on"
                                              : empData.status === "8"
                                                ? "Submitted"
                                                : empData.status === "9"
                                                  ? "Completed" : ""}
                              </span>
                            </p> */}
                            <div className="exclude-mark-read py-5">
                              {empData.status === null ||
                                empData.status === undefined ||
                                empData.status === "undefined" ||
                                empData.status === "" ? (
                                <p className="font-size-3  mb-0">N/A</p>
                              ) : (
                                <>
                                  <div style={{ display: "table-caption" }}>
                                    <DropdownButton
                                      as={ButtonGroup}
                                      title={
                                        empData.status === "1"
                                          ? "New"
                                          : empData.status === "2"
                                            ? "Prospect"
                                            : empData.status === "3"
                                              ? "Lead"
                                              : empData.status === "4"
                                                ? "Retained"
                                                : empData.status === "5"
                                                  ? "Lost"
                                                  : empData.status === "6"
                                                    ? "Dead"
                                                    : empData.status === "7"
                                                      ? "Working on"
                                                      : empData.status === "8"
                                                        ? "Submitted"
                                                        : empData.status === "0"
                                                          ? "New"
                                                          : empData.status === "9"
                                                            ? "Complete"
                                                            : empData.status === "10"
                                                              ? "Consultation"
                                                              : "status"
                                      }
                                      variant={
                                        empData.status === ("0" || 0)
                                          ? "warning"
                                          : empData.status === ("1" || 1)
                                            ? "shamrock"
                                            : empData.status === ("2" || 2)
                                              ? "danger"
                                              : determineBackgroundColor(empData)
                                      }
                                      size="xs"
                                      className={`user_status_btn btn-xs ${empData.status === "0"
                                        ? "btn-warning"
                                        : empData.status === "1"
                                          ? "btn-shamrock"
                                          : empData.status === "2"
                                            ? "btn-danger px-4"
                                            : determineBackgroundColor(empData)
                                        } rounded-pill font-size-1 px-1 text-white mr-2`}
                                      onSelect={(eventKey, e) =>
                                        OnStatusChange(e, empData, eventKey)}>
                                      {(filterjson.employee_status || [])
                                        .filter(item =>
                                          props.self === "all" || props.job_id
                                            ? ["new", "prospect", "lead", "consultation", "lost", "dead", "retained", "working on", "submitted", "completed"].includes(item.label.toLowerCase())
                                            : props.self === "yes"
                                              ? !["working on", "submitted", "completed",].includes(item.label.toLowerCase())
                                              : !["new", "prospect", "lead", "consultation", "lost", "dead"].includes(item.label.toLowerCase())
                                        )
                                        .sort(
                                          (a, b) =>
                                            ["new", "prospect", "lead", "consultation", "lost", "dead", "retained", "working on", "submitted", "completed"]
                                              .indexOf(a.label.toLowerCase()) -
                                            ["new", "prospect", "lead", "consultation", "lost", "dead", "retained", "working on", "submitted", "completed"]
                                              .indexOf(b.label.toLowerCase())
                                        )
                                        .map((item, index) => (
                                          <Dropdown.Item
                                            key={index}
                                            value={item.value}
                                            eventKey={item.value}   // keep eventKey same as value if you want real mapping
                                            className="text-capitalize"
                                            active={item.value === empData.status}
                                          >
                                            {item.label}
                                          </Dropdown.Item>
                                        ))}
                                    </DropdownButton>

                                    {empData.status === ("1" || 1) &&
                                      empData.task_complete_date ? (
                                      <small className="font-size-1 d-flex justify-content-center mt-2 text-capitalize">
                                        <ConvertTime
                                          _date={empData.task_complete_date}
                                          format={".fromNow()"}
                                        />
                                      </small>
                                    ) : null}
                                  </div>
                                </>
                              )}
                            </div>
                          </td>
                        )}
                        <td className="text-center py-5">
                          <p
                            className="font-size-2 font-weight-normal text-black-2 mb-0"
                            title={
                              empData.profile_complete === "100.00"
                                ? "Complete"
                                : "Incomplete"
                            }
                          >
                            {empData.profile_complete === "100.00" ? (
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
            {(new Date(empData.created_at) >= oneMonthAgo && new Date(empData.created_at) <= currentDate) === true ? "New" : "Retained"}          
            </p>
        </td> */}
                        {status === "10" || props.pageName === "consultation" || status === 10 || status === "-1,0,1,2,3,5,6,10" || status === "4,7,8,9" ?
                          <td className="text-center py-5">
                            <p
                              className="font-size-2 font-weight-normal text-black-2 mb-0"
                              title={empData.consultation_opted === "1"
                                ? "Yes"
                                : "No"
                              }
                            >
                              {empData.consultation_opted === "1"
                                ? "Yes"
                                : "No"}
                            </p>
                          </td>
                          : null}
                        {status === "10" || props.pageName === "consultation" || status === 10 || status === "-1,0,1,2,3,5,6,10" || status === "4,7,8,9" ?
                          <td className="text-center py-5">
                            <p
                              className="font-size-2 font-weight-normal text-black-2 mb-0"
                              title={
                                ConvertTime({ _date: empData.consultation_date, format: "DD MMMM, YYYY" })
                              }
                            >
                              <ConvertTime _date={empData.consultation_date} format={"DD MMMM, YYYY"} />
                            </p>
                          </td>
                          : null}
                        {props.pageName === "consultation" ?
                          <td className="text-center py-5">
                            <p className="font-size-2 font-weight-normal text-black-2 mb-0">
                              {empData.signature_status === "2" ? (
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
                          : null
                        }
                        {props.pageName === "consultation" ? <td className="text-capitalize ">
                          <p className="font-size-2 font-weight-normal text-black-2 mb-0">

                            {empData.received_date ? <ConvertTime _date={empData.received_date} format={"DD MMMM, YYYY"} /> : "N/A"}
                          </p>
                        </td> : null}
                        {props.pageName === "consultation" ? <td className=" py-5">
                          <p className="font-size-2 font-weight-normal text-black-2 mb-0 text-capitalize">
                            {empData.payment_mode ? empData.payment_mode : "N/A"}
                          </p>
                        </td> : null}
                        {props.pageName === "consultation" ? <td className=" py-5">
                          <p className="font-size-2 font-weight-normal text-black-2 mb-0">
                            {empData.payment_date ? <ConvertTime _date={empData.payment_date} format={"DD MMMM, YYYY"} /> : "N/A"}
                          </p>
                        </td> : null}
                        {props.heading === "Dashboard" ? (
                          ""
                        ) : (
                          <td className=" py-5 min-width-px-100">
                            <div
                              className="btn-group button_group"
                              role="group"
                              aria-label="Basic example"
                            >
                              {(props.skill === null ||
                                props.skill === undefined) &&
                                portal !== "study" ? (
                                <>
                                  <button
                                    className={
                                      !props?.ApplicantType
                                        ? "d-none"
                                        : "btn btn-outline-info action_btn"
                                    }
                                    onClick={() => editVisa(empData)}
                                    title={`Add/Update ${props?.ApplicantType === (14 || "14")
                                      ? "Temporary Resident"
                                      : getApplicantType(props?.ApplicantType)
                                      } status`}
                                  >
                                    <span className="text-gray px-2">
                                      <MdEditNote />
                                    </span>
                                  </button>
                                  {/* {props.visa === "yes" ? (
      <button
        className="btn btn-outline-info action_btn"
        onClick={() =>
          AddDoucument(empData.employee_id)
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
                                        props?.ApplicantType
                                          ? "btn btn-outline-info action_btn"
                                          : "d-none"
                                      }
                                      // disabled={empData.interested_in !== "pnp"}
                                      onClick={() =>
                                        ChangeApplicantsCategory(
                                          empData.employee_id
                                        )
                                      }
                                      title="Change Candidate Applicant's Sub Type"
                                    >
                                      <span className="text-gray px-2">
                                        <BiSolidCategory />
                                      </span>
                                    </button>
                                    <button
                                      className="btn btn-outline-info action_btn"
                                      onClick={() =>
                                        ChangeApplicantsType(
                                          empData.employee_id
                                        )
                                      }
                                      title="Change Candidate Applicant's Type"
                                    >
                                      <span className="text-gray px-2">
                                        <MdTypeSpecimen />
                                      </span>
                                    </button>
                                    <button
                                      className="btn btn-outline-info action_btn"
                                      onClick={() =>
                                        ChangeApplicantsStatus(empData)
                                      }
                                      title="Change status"
                                    >
                                      <span className="text-gray px-2">
                                        <GoTasklist />
                                      </span>
                                      {/* <i className="fas fa-stream text-gray"></i> */}
                                    </button>
                                    <button
                                      className={"btn btn-outline-info action_btn"}
                                      onClick={() =>
                                        AddConsultaionClick(empData)
                                      }
                                      title="Add Consultation"
                                    >
                                      <span className="text-gray px-2">
                                        <FaHandshake />
                                      </span>
                                    </button>
                                    <button
                                      className={
                                        user_type === "admin"
                                          ? "btn btn-outline-info action_btn"
                                          : " d-none"
                                      }
                                      onClick={() =>
                                        ChangeApplicantsAgent(
                                          empData.employee_id
                                        )
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
                                      to={`/${empData.employee_id}`}
                                      title="Candidate Details"
                                      onClick={() =>
                                        localStorage.setItem(
                                          "StatusTab",
                                          status === "" ? "00" : status
                                        )
                                      }
                                    >
                                      Update
                                    </Link>
                                    {/* <button
        className="btn btn-outline-info action_btn"
        onClick={() =>
          editEmployee(empData.employee_id)
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
          editEmployeeEducation(empData.employee_id)
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
          editEmployeeSkills(empData.employee_id)
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
          editEmployeeCareer(empData.employee_id)
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
                                        ResumeClick(empData.employee_id)
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
                                      onClick={() => editJob(empData)}
                                      title="All jobs "
                                      disabled={
                                        empData.interested_in === "pgwp"
                                      }
                                    >
                                      <span className="text-gray px-2">
                                        <PiBriefcaseLight />
                                      </span>
                                      {/* <i className="fas fa-briefcase"></i> */}
                                    </button>
                                    <button
                                      className="btn btn-outline-info action_btn"
                                      onClick={() => ShowDeleteAlert(empData)}
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
                              ) : portal === "study" &&
                                (props.skill === null ||
                                  props.skill === undefined) ? (
                                <>
                                  <button
                                    className="btn btn-outline-info action_btn"
                                    onClick={() =>
                                      ChangeApplicantsStatus(empData)
                                    }
                                    title="Change status"
                                  >
                                    <span className="text-gray px-2">
                                      <GoTasklist />
                                    </span>
                                  </button>
                                  <button
                                    className={
                                      !props?.ApplicantType
                                        ? "d-none"
                                        : "btn btn-outline-info action_btn"
                                    }
                                    onClick={() => editVisa(empData)}
                                    title={`Add/Update ${props?.ApplicantType === (14 || "14")
                                      ? "Temporary Resident"
                                      : getApplicantType(props?.ApplicantType)
                                      } status`}
                                  >
                                    <span className="text-gray px-2">
                                      <MdEditNote />
                                    </span>
                                  </button>
                                  <Link
                                    style={{
                                      padding: "0 5px",
                                      minWidth: "auto",
                                      height: "auto",
                                    }}
                                    className="btn btn-sm btn-outline-info action_btn text-center"
                                    to={`/student_profile`}
                                    title="Candidate Details"
                                    onClick={() =>
                                      localStorage.setItem(
                                        "employee_id",
                                        empData.employee_id
                                      )
                                    }
                                  >
                                    Update
                                  </Link>
                                </>
                              ) : (
                                <button
                                  className="btn btn-outline-info action_btn"
                                  // disabled={alredyApplied ? false : true}
                                  disabled={empData.interested_in === "pgwp"}
                                  onClick={() =>
                                    portal === "study"
                                      ? props.OnProgramApplyClick(
                                        null,
                                        empData.employee_id
                                      )
                                      : onApplyJobClick(empData.employee_id)
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
onClick={() => ChangeApplicantsStatus(empData)}
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
                    </React.Fragment>
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
