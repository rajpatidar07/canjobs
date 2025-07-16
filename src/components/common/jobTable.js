import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AddJobModal from "../forms/employer/job";
import EmployerDocumentModal from "../forms/admin/EmployerDocumetModal";
import {
  GetAllJobs,
  DeleteJob,
  ApplyJob,
  GetEmployeeFilterJob,
  GetJobLimaSubStages,
  GetFilter,
} from "../../api/api";
import { toast } from "react-toastify";
import SAlert from "../common/sweetAlert";
import Pagination from "../common/pagination";
import Loader from "../common/loader";
import EmployeeModal from "../admin/Modal/employeeModal";
import JobResponse from "../admin/response";
import LmiaStatus from "../forms/admin/lmiastatus";
import { LiaUserEditSolid, LiaUserTieSolid } from "react-icons/lia";
import { BsArrow90DegRight } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { GrDocumentUpload } from "react-icons/gr";
import ConvertTime from "./Common function/ConvertTime";
import LmiaInfo from "../forms/admin/lmiaInfo";
import MondayBadge from "./MondayBadge";
import determineBackgroundColor from "./Common function/DetermineBackgroundColour";
import filterjson from "../json/filterjson";
export default function JobTable(props) {
  /*show Modal and props state */
  let [isLoading, setIsLoading] = useState(true);
  let [showAddJobsModal, setShowAddJobsModal] = useState(false);
  let [showAddCompanyDocModal, setShowAddCompanyDocModal] = useState(false);
  let [openLimia, setOpenLimia] = useState(false);
  let [showCandidateModal, setShowCandidateModal] = useState(false);
  let [showLmiaAdditionalInfobModal, setShowLmiaAdditionalInfobModal] = useState(false);
  let [apiCall, setApiCall] = useState(false);
  const [jobData, setjobData] = useState([]);
  const [lmiaStatus, setLmiaStatus] = useState([]);
  const [lmiaStatusRejectComment, setLmiaStatusRejectComment] = useState([]);
  const [JobId, setJobId] = useState();
  const [CompanyId, setCompanyId] = useState();
  const [candidateSkill, setCandidateSkill] = useState();
  /*Delete state */
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteID] = useState();
  const [deleteName, setDeleteName] = useState("");
  /*Pagination states */
  const [totalData, setTotalData] = useState("");
  // const [currentPage, setCurrentPage] = useState(props.pageNo);
  const [recordsPerPage] = useState(10);
  /*Shorting states */
  const [columnName, setcolumnName] = useState("job_id");
  const [sortOrder, setSortOrder] = useState("");
  /*Response states */
  const [responseId, setresponseId] = useState();
  const [responseDropDown, setresponseDropDown] = useState(false);
  let location = useLocation();
  let user_type = localStorage.getItem("userType");
  let job_id = location.state
    ? location.state.id
    : location.pathname === "/job_detail"
      ? localStorage.getItem("job_id")
      : "";
  let [Json, setJson] = useState([]);
  /*Function to get the jSon */
  const JsonData = async () => {
    try {
      let Json = await GetFilter();
      if (Json.data.message === "No data found") {
        setJson([]);
      } else {
        setJson(Json.data.data);
      }
      setJson(Json.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  /* Function to get Job data*/
  const JobData = async () => {
    setIsLoading(true);
    try {
      let userData;
      if (props.employee_id) {
        userData = await GetEmployeeFilterJob(
          props.employee_id,
          // props.SkillFilterValue
          props.search,
          props.locationFilterValue,
          props.categoryFilterValue,
          props.SkillFilterValue,
          props.jobSwapFilterValue,
          props.pageNo,
          recordsPerPage,
          columnName,
          sortOrder,
          props.company
        );
      } else {
        userData = await GetAllJobs(
          location.state ? location.state.company_name : props.search,
          props.locationFilterValue,
          props.categoryFilterValue,
          props.SkillFilterValue,
          props.jobSwapFilterValue,
          props.pageNo,
          recordsPerPage,
          columnName,
          sortOrder,
          props.company,
          props.filter_by_time,
          job_id,
          props.response === "self" ? "1" : "0",
          props.response === "lmia" ? "1" : "0",
          props.response === "lmia" ? "1" : "0",
          location.state ? location.state.company_id : props.company_id
        );
      }
      if (
        userData.data.data.length === 0 ||
        userData.data.length === 0 ||
        userData.data.data === undefined
      ) {
        setjobData([]);
        setresponseId();
        setIsLoading(false);
      } else {
        if (
          props.heading ||
          location.pathname === "/employee" ||
          props.lima === "no" ||
          user_type === "user" ||
          props.skill || props.response === "lmia"
        ) {
          setresponseId();
        } else {
          //condition to get the response from job id
          const filteredItems = userData.data.data.filter(
            (item) =>
              (props.selfJob === "yes"
                ? item.applied_by_self
                : item.applied_by_admin) > 0
          );
          if (filteredItems.length === 0) {
            setresponseId();
          } else {
            // Step 4: Get the First Item
            setresponseId(filteredItems[0].job_id);
          }
        }
        setjobData(userData.data.data);
        /*Logic for finding reject substage of decision lima status */
        if (userData.data.data.length >= 0) {
          let LmiaData = userData.data.data;
          let LmiaCommentArray = [];
          for (let i = 0; i < userData.data.data.length; i++) {
            if (userData.data.data[i].lmia_status === "decision") {
              const data = userData.data.data[i];
              const subStageRes = await GetJobLimaSubStages(
                data.job_id,
                data.lmia_status
              );
              let index = subStageRes.data.data.length - 1;
              LmiaCommentArray.push(subStageRes.data.data[index]);
              if (
                subStageRes.data.data.filter(
                  (item) => item.lmia_substage === "rejected"
                ).length > 0
              ) {
                LmiaData = LmiaData.filter(
                  (item) => item.job_id !== data.job_id
                );
              }
            }
          }
          if (
            // props.detail === "company_detail" ||
            props?.detail === "job_detail"
          ) {
            props?.setLmiaStatusRejectComment(LmiaCommentArray);
            props?.setLmia(LmiaData);
          }
          setLmiaStatus(LmiaData);
          setLmiaStatusRejectComment(LmiaCommentArray);
        }
      }
      setTotalData(userData.data.total_rows);
      setIsLoading(false);
      //condition for limia and visa page
      // if (props.response === "lmia" || props.response === "visa") {
      //   setjobData(userData.data.data.filter((item) => item.applied_by_self !== "0" || item.applied_by_admin !== "0"));
      //   setIsLoading(false);
      // }
      // //condition for Self job applied page
      // else if (props.response === "self") {
      //   setjobData(userData.data.data.filter((item) => item.applied_by_self !== "0"));
      //   setresponseId(userData.data.data.filter((item) => item.applied_by_self !== "0")[0].job_id)
      //   setIsLoading(false);
      // } else
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  /*Render function to get the job */
  useEffect(() => {
    JobData();
    JsonData()
    if (apiCall === true || props.apiCall === true) {
      props.setApiCall(false);
      setApiCall(false);
    }
    // eslint-disable-next-line
  }, [
    props.categoryFilterValue,
    props.SkillFilterValue,
    props.locationFilterValue,
    props.jobSwapFilterValue,
    props.search,
    props.pageNo,
    sortOrder,
    props.company,
    props.filter_by_time,
    apiCall,
    props.apiCall,
    props.heading,
  ]);
  /* Function to show the Job detail data */
  // const JobDetail = (e) => {
  //   props.JobDetail(e);
  // };
  /*Function to open additionlima info modal */
  const AdditionalLmiaInfo = (e) => {
    setShowLmiaAdditionalInfobModal(true)
    setJobId(e);
  }
  /* Function to show the Table of the employee of perticular skill */
  const matchingCandidates = (e) => {
    setShowCandidateModal(true);
    setCandidateSkill(e);
  };

  /* Function to show the single data to update job */
  const editJob = (e) => {
    setShowAddJobsModal(true);
    setJobId(e);
  };

  /**function to open document modal */
  const OpenAddDocModal = (e) => {
    setShowAddCompanyDocModal(true);
    setCompanyId(e);
  };
  /*To Show the delete alert box */
  const ShowDeleteAlert = (e) => {
    setDeleteID(e.job_id);
    setDeleteName(e.job_title);
    setDeleteAlert(true);
  };
  // const GetLimaSubStageReject = (id) => {
  //   return
  // };
  /*To call Api to delete Job */
  async function deleteJob(e) {
    try {
      const responseData = await DeleteJob(e);
      if (responseData.message === "job has been deleted") {
        toast.error("Job deleted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
        setDeleteAlert(false);
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
    props.setpageNo(1);
    setApiCall(true);
  };

  /*Function to Apply employee for job */
  const onApplyJobClick = async (id) => {
    try {
      const responseData = await ApplyJob(id, props.employee_id, 0);
      if (responseData.message === "already applied on this job") {
        toast.error("Already applied on this job", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
      }
      if (responseData.message === "Job applied successfully") {
        toast.success("Applied successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
        props.jobCall(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /*Function to open update LIMA */
  const updateLima = (job) => {
    setJobId(job);
    setOpenLimia(true);
  };
  return (
    <>
      <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-9 px-5">
        <div className="table-responsive main_table_div">
          {isLoading ? (
            <Loader load={"yes"} />
          ) : (
            <table className="table table-striped main_data_table">
              <thead>
                <tr className="py-2">
                  {[
                    { key: "job_id", label: "Job ID", sticky: true },
                    { key: "job_title", label: "Job Title", sticky: true },
                    ...(props.heading === "Dashboard"
                      ? []
                      : [
                        { key: "job_type", label: "Job Type" },
                        { key: "location", label: "Address" },
                      ]),
                    ...(props.response === "lmia" && props.response !== "response"
                      ? [
                        { key: "lmia_number", label: "LMIA Number" },
                        { key: "lmia_status", label: "LMIA Status" },
                        { key: "monday_status", label: "Monday Status" },
                        { key: "lmia_creation_date", label: "LMIA Creation Date" },
                        { key: "lmia_date_approved", label: "LMIA Date Approved" },
                        { key: "lmia_date_expiry", label: "LMIA Expiry Date" },
                        { key: "job_category", label: "Position/Job Category" },
                        { key: "salary", label: "LMIA Wages" },
                        { key: "lmia_submissiom_date", label: "LMIA Submission Date" },
                        { key: "lmia_payment_status", label: "LMIA Payment" },
                        { key: "lmia_payment_by", label: "LMIA Payment By" },
                        { key: "type_of_lmia", label: "Type of LMIA" },
                        { key: "lmia_notes", label: "LMIA Notes" },
                      ]
                      : []),
                    ...(props.heading === "Dashboard"
                      ? []
                      : [
                        { key: "education", label: "Education", hidden: true },
                        { key: "keyskill", label: "Skills", hidden: true },
                      ]),
                    { key: "experience_required", label: "Experience" },
                    ...(user_type === "user"
                      ? []
                      : [
                        {
                          key: props.selfJob === "yes" ? "applied_by_self" : "applied_by_admin",
                          label: "Vacancies / Responses",
                        },
                      ]),
                    ...(props.heading === "Dashboard" ||
                      user_type === "user" ||
                      user_type === "company" ||
                      user_type === "agent"
                      ? []
                      : [{ key: "action", label: "Action", isAction: true }]),
                  ].map((col, index) => (
                    <th
                      key={index}
                      className={`border-0 font-size-3 font-weight-normal ${col.sticky ? "table_sticky_col sticky_col1" : ""
                        }  ${col.hidden ? "d-none" : ""}`}
                      style={{
                        ...(col.sticky && { background: "#fcb6b6", transition: "background 0.3s ease" }),
                        ...(col.key === "job_title" && { left: "100px" })
                      }}

                      title={col.isAction ? "Actions" : `Sort by ${col.label}`}
                    >
                      {col.isAction ? (
                        col.label
                      ) : (
                        <Link
                          to=""
                          className="text-dark"
                          onClick={() => handleSort(col.key)}
                        >
                          {col.label}
                        </Link>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Map function to show the data in the list*/}
                {totalData === 0 || jobData.length === 0 ? (
                  <tr>
                    <th colSpan={props.response === "lmia" ? 21 : 11} className="bg-white text-center">
                      No Data Found
                    </th>
                  </tr>
                ) : (
                  (jobData || []).map((job, i) => {
                    let LmiaStatusData = lmiaStatus.filter(
                      (item) => item.job_id === job.job_id
                    );
                    return (
                      <React.Fragment key={job.job_id}>
                        {props.heading === "Dashboard" ||
                          props.detail === "job_detail" ||
                          user_type === "user" ? null : (
                          <tr
                            className={
                              props.heading === "Dashboard" ||
                                props.skill === null ||
                                props.skill === undefined ||
                                Object.keys(props.skill).length === 0
                                ? "col-12 "
                                : "d-none"
                            }
                            style={{ border: "0" }}
                          >

                            <td
                              style={{ paddingBottom: "0!important" }}
                              colSpan={props.response === "lmia" ? 21 : 11}
                              className={
                                job.lmia_status ? "bg-white text-center" : "d-none"
                              }
                            >
                              <div className="arrow-wrapper custome_arrow_wrapper  d-flex flex-wrap mb-0">
                                <div className="arrow-steps" key={i}>
                                  <div className="job_name text-dark">
                                    <span className="m-0 font-size-2 d-block mb-1">
                                      {LmiaStatusData.job_title}
                                    </span>
                                  </div>
                                  <div>
                                    <div
                                      key={i + 1}
                                      className={`step text-capitalize ${job.lmia_status === "advertisements" ||
                                        job.lmia_status === "documentation" ||
                                        job.lmia_status ===
                                        "candidate placement" ||
                                        job.lmia_status === "submission" ||
                                        job.lmia_status === "decision"
                                        ? "approved"
                                        : job.lmia_status === "onboarding"
                                          ? "pending"
                                          : ""
                                        }`}
                                    >
                                      <span>onboarding </span>
                                    </div>
                                    <div
                                      key={i + 2}
                                      className={`step text-capitalize ${job.lmia_status === "documentation" ||
                                        job.lmia_status ===
                                        "candidate placement" ||
                                        job.lmia_status === "submission" ||
                                        job.lmia_status === "decision"
                                        ? "approved"
                                        : job.lmia_status === "advertisements"
                                          ? "pending"
                                          : ""
                                        }`}
                                    >
                                      <span>advertisements </span>
                                    </div>
                                    <div
                                      key={i + 3}
                                      className={`step text-capitalize ${job.lmia_status ===
                                        "candidate placement" ||
                                        job.lmia_status === "submission" ||
                                        job.lmia_status === "decision"
                                        ? "approved"
                                        : job.lmia_status === "documentation"
                                          ? "pending"
                                          : ""
                                        }`}
                                    >
                                      <span>documentation </span>
                                    </div>
                                    <div
                                      key={i + 4}
                                      className={`step text-capitalize ${job.lmia_status === "submission" ||
                                        job.lmia_status === "decision"
                                        ? "approved"
                                        : job.lmia_status ===
                                          "candidate placement"
                                          ? "pending"
                                          : ""
                                        }`}
                                    >
                                      <span>candidate placement </span>
                                    </div>
                                    <div
                                      key={i + 5}
                                      className={`step text-capitalize ${job.lmia_status === "decision"
                                        ? "approved"
                                        : job.lmia_status === "submission"
                                          ? "pending"
                                          : ""
                                        }`}
                                    >
                                      <span>submission </span>
                                    </div>
                                    {job.lmia_status === "decision" &&
                                      lmiaStatusRejectComment ? (
                                      lmiaStatusRejectComment[0] !==
                                      undefined &&
                                      (lmiaStatusRejectComment || []).map(
                                        (item, i) => {
                                          return (
                                            item === undefined ||
                                              item === "undefined" ||
                                              item === null ||
                                              item === ""
                                              ? null
                                              : item.job_id === job.job_id
                                          ) ? (
                                            <div
                                              key={i + 6}
                                              className={`step text-capitalize ${job.lmia_status ===
                                                "decision" &&
                                                item.lmia_substage ===
                                                "approved"
                                                ? "approved"
                                                : item.lmia_substage ===
                                                  "refused"
                                                  ? "reject"
                                                  : "pending"
                                                }`}
                                            >
                                              <span>
                                                {item.lmia_substage ===
                                                  "approved"
                                                  ? "Approved"
                                                  : item.lmia_substage ===
                                                    "refused"
                                                    ? "Refused"
                                                    : "Awaiting Decision"}
                                              </span>
                                            </div>
                                          ) : // <small className="mx-10" key={i}>
                                            // {item.lmia_substage === "approved"
                                            //   ? "Congratulation your Limia is Approved"
                                            //   : item.lmia_substage === "awaiting decision"
                                            //   ? "Your Limia status is in progress"
                                            //   : item.lmia_substage === "reject"
                                            //   ? "Sorry to inform you your Limia got rejected."
                                            //   : ""}
                                            // </small>
                                            null;
                                        }
                                      )
                                    ) : (
                                      <div
                                        className={`step text-capitalize${job.lmia_status === "decision"
                                          ? "pending"
                                          : ""
                                          } `}
                                      >
                                        {job.lmia_status === "decision"
                                          ? " Awaiting Decision"
                                          : "Decision"}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                        <tr
                          className={
                            /*job.is_applied === "1" ? "d-none" : */ "col-12 text-capitalize job_row"
                          }
                        >
                          <th scope="row" className="table_sticky_col sticky_col1 py-5 bg-white" >{job.job_id}</th>
                          <th className="table_sticky_col sticky_col1 py-5 bg-white" style={{ left: "100px" }}>
                            <div className="d-flex align-items-center">
                              {(job.is_monday_data === 1 || job.is_monday_data === "1") && (
                                <MondayBadge />
                              )}
                              <div>
                                <Link
                                  to={`/job_detail`}
                                  onClick={
                                    () =>
                                      localStorage.setItem("job_id", job.job_id)
                                    // JobDetail(job.job_id)
                                  }
                                  className="font-size-3 mb-0 font-weight-semibold text-black-2 "
                                  title={job.job_title + (job.employement ? ` (${job.employement})` : "")}
                                >
                                  <>
                                    <p className="m-0 text-truncate text-black-2 font-weight-bold text-capitalize">
                                      {job.job_title}{" "}
                                      {job.employement
                                        ? `(${job.employement})`
                                        : ""}
                                    </p>
                                    <p className="text-gray font-size-2 m-0 text-capitalize"
                                      title={job.company_name}>
                                      {job.company_name}
                                      {/* - {job.industry_type} */}
                                      <br />
                                      {job.is_featured === "1" ? (
                                        <span className="bg-orange text-white featured_tag">
                                          Featured
                                        </span>
                                      ) : null}
                                    </p>
                                  </>
                                </Link>
                              </div>
                            </div>
                          </th>
                          {props.heading === "Dashboard" ? null : (
                            <th className=" py-5"
                              title={job.job_type}>
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {/* {job.employement} -  */}
                                {job.job_type}
                                <br />
                                {/* {job.industry_type} */}
                              </h3>
                            </th>
                          )}
                          {props.heading === "Dashboard" ? null : (
                            <th className=" py-5" title={job.industry_type || job.location
                              ? `${job.industry_type ? job.industry_type + "," : ""} ${job.location}`
                              : "N/A"}>
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {job.industry_type || job.location
                                  ? `${job.industry_type ? job.industry_type + "," : ""} ${job.location}`
                                  : "N/A"}
                              </h3>
                            </th>
                          )}
                          {props.response === "lmia" && props.response !== "response" ?
                            <>
                              <th className="py-5 ">
                                <h3 className="font-size-3 font-weight-normal text-black-2 mb-0"
                                  title={job.lmia_number || "N/A"}>
                                  {job.lmia_number || "N/A"}
                                </h3>
                              </th>
                              <th
                                className={
                                  user_type === "user" ? "d-none" : " py-5"
                                }
                              >
                                <div className="font-size-3 font-weight-normal text-black-2 mb-0"
                                  title={job.lmia_status || "N/A"}>
                                  {
                                    job.lmia_status === "onboarding" ? (
                                      <span className="px-3 py-2 badge badge-pill badge-shamrock">
                                        Onboarding
                                      </span>
                                    ) : job.lmia_status === "advertisements" ? (
                                      <span className="px-3 py-2 badge badge-pill bg-info text-white">
                                        Advertisements
                                      </span>
                                    ) : job.lmia_status === "documentation" ? (
                                      <span className="px-3 py-2 badge badge-pill badge-gray">
                                        Documentation
                                      </span>
                                    ) : job.lmia_status ===
                                      "candidate placement" ? (
                                      <span className="px-3 py-2 badge badge-pill bg-primary-opacity-9 text-white">
                                        Candidate Placement
                                      </span>
                                    ) : job.lmia_status === "submission" ? (
                                      <span className="px-3 py-2 badge badge-pill badge-warning">
                                        Submission
                                      </span>
                                    ) : job.lmia_status === "decision" ?
                                      job.lmia_status === "decision" &&
                                        lmiaStatusRejectComment ? (
                                        lmiaStatusRejectComment[0] !==
                                        undefined &&
                                        (lmiaStatusRejectComment || []).map(
                                          (item, i) => {
                                            return (
                                              item === undefined ||
                                                item === "undefined" ||
                                                item === null ||
                                                item === ""
                                                ? null
                                                : item.job_id === job.job_id
                                            ) ? (
                                              <div
                                                key={i + 6}
                                                className={`px-3 py-2 badge badge-pill ${item.lmia_substage ===
                                                  "approved"
                                                  ? " badge-shamrock"
                                                  : item.lmia_substage ===
                                                    "refused"
                                                    ? " badge-danger"
                                                    : " badge-waring"
                                                  }`}
                                              >
                                                <span>
                                                  {item.lmia_substage ===
                                                    "approved"
                                                    ? "Approved"
                                                    : item.lmia_substage ===
                                                      "refused"
                                                      ? "Refused"
                                                      : "Awaiting Decision"}
                                                </span>
                                              </div>
                                            ) : // <small className="mx-10" key={i}>
                                              // {item.lmia_substage === "approved"
                                              //   ? "Congratulation your Limia is Approved"
                                              //   : item.lmia_substage === "awaiting decision"
                                              //   ? "Your Limia status is in progress"
                                              //   : item.lmia_substage === "reject"
                                              //   ? "Sorry to inform you your Limia got rejected."
                                              //   : ""}
                                              // </small>
                                              null;
                                          }
                                        )
                                      ) : (
                                        null
                                      )
                                        (
                                        // <span className={`px-3 py-2 badge badge-pill ${job.lmia_substage ===
                                        //   "approved"
                                        //   ? " badge-shamrock"
                                        //   : job.lmia_substage ===
                                        //     "refused"
                                        //     ? " badge-danger"
                                        //     : " badge-waring"
                                        //   }`}>
                                        //   {
                                        //     job.lmia_substage ===
                                        //       "approved"
                                        //       ? "Approved"
                                        //       : job.lmia_substage ===
                                        //         "refused"
                                        //         ? "Refused"
                                        //         : "Awaiting Decision"
                                        //   }
                                        // </span>
                                      ) : (
                                        <span>N/A</span>
                                      )
                                    // ) : (job.lmia_status === "application submitted" ? (
                                    //   <span className="px-3 py-2 badge badge-pill badge-info">
                                    //     Application submitted
                                    //   </span>
                                    // )
                                  }
                                </div>
                              </th>
                              <th className="py-5 " title={filterjson.monday_status.find(
                                (item) => item.value === job.lmia_monday_status
                              )?.label || "N/A"}>
                                <span
                                  className={`font-size-3 font-weight-normal text-center text-capitalize rounded-pill font-size-1 px-3  ${job.lmia_monday_status ? `${determineBackgroundColor(job)} text-white` : " text-dark"}`}
                                >
                                  <span
                                    className="font-size-3 font-weight-normal m-0"> {filterjson.monday_status.find(
                                      (item) => item.value === job.lmia_monday_status
                                    )?.label || "N/A"}
                                  </span>
                                </span>
                              </th>
                              <th className="py-5 ">
                                <h3 className="font-size-3 font-weight-normal text-black-2 mb-0"
                                  title={job.lmia_creation_date || "N/A"}>
                                  {job.lmia_creation_date || "N/A"}
                                </h3>
                              </th>
                              <th className="py-5 ">
                                <h3
                                  className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate"
                                  title={
                                    ConvertTime({
                                      _date: job.lmia_date_approved
                                      , format: "DD MMMM, YYYY"
                                    })
                                  }
                                >
                                  {<ConvertTime _date={job.lmia_date_approved
                                  } format={"DD MMMM, YYYY"} />}
                                </h3>
                              </th>
                              <th className="py-5 ">
                                <h3
                                  className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate"
                                  title={
                                    ConvertTime({
                                      _date: (user_type === "admin" &&
                                        props.response === "lmia")
                                        ? job.lmia_date_expiry
                                        : job.created_at
                                      , format: "DD MMMM, YYYY"
                                    })
                                  }
                                >
                                  {<ConvertTime _date={job.lmia_date_expiry
                                  } format={"DD MMMM, YYYY"} />}
                                </h3>
                              </th>
                              <th className="py-5 ">
                                <h3 className={`font-size-3 font-weight-normal mb-0 text-capitalize text-center  font-size-1 px-1  mr-2`}
                                  title={Json?.Category?.filter((item) => item.id ===parseInt(job.job_category_id ))[0]?.value || "N/A"}>
                                  <span
                                    className="font-size-3 font-weight-normal m-0">  {Json?.Category?.filter((item) => item.id ===parseInt(job.job_category_id ))[0]?.value
                                      || "N/A"}
                                  </span>
                                </h3>
                              </th>
                              <th className="py-5 ">
                                <h3 className="font-size-3 font-weight-normal text-black-2 mb-0"
                                  title={job.salary ? "$" + job.salary : "N/A"}>
                                  {job.salary ? "$" + job.salary : "N/A"}
                                </h3>
                              </th>
                              <th className="py-5 ">
                                <h3
                                  className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate"
                                  title={
                                    ConvertTime({
                                      _date: (user_type === "admin" &&
                                        props.response === "lmia")
                                        ? job.lmia_submissiom_date
                                        : job.created_at
                                      , format: "DD MMMM, YYYY"
                                    })
                                    //   moment(job.created_at).format(
                                    //   "DD MMMM, YYYY"
                                    // ) 
                                  }
                                >
                                  {/* {job.created_at ? job.created_at : "N/A"} */}
                                  {<ConvertTime _date={(user_type === "admin" &&
                                    props.response === "lmia")
                                    ? job.lmia_submissiom_date
                                    : job.created_at} format={"DD MMMM, YYYY"} />}
                                  {/* {moment(job.created_at).format("DD MMMM, YYYY")} */}
                                </h3>
                              </th>
                              <th className="py-5 ">
                                <h3 className="font-size-3 font-weight-normal text-black-2 mb-0"
                                  title={job.lmia_payment_status || "N/A"}>
                                  {job.lmia_payment_status || "N/A"}
                                </h3>
                              </th>
                              <th className="py-5 ">
                                <h3 className="font-size-3 font-weight-normal text-black-2 mb-0"
                                  title={job.lmia_payment_by || "N/A"}>
                                  {job.lmia_payment_by || "N/A"}
                                </h3>
                              </th>
                              <th className="py-5 ">
                                <h3 className={`font-size-3 font-weight-normal mb-0 text-capitalize text-center ${job.type_of_lmia ? `${determineBackgroundColor(job)} text-white` : " text-dark"} rounded-pill font-size-1 px-1  mr-2`}
                                  title={job.type_of_lmia || "N/A"}>
                                  <span
                                    className="font-size-3 font-weight-normal m-0">  {filterjson.type_of_lmia.find((item) => item.value === job.type_of_lmia)?.label
                                      || "N/A"}
                                  </span>
                                </h3>
                              </th>
                              <th className="py-5 ">
                                <h3 className="font-size-3 font-weight-normal text-black-2 mb-0"
                                  title={job.lmia_notes || "N/A"}>
                                  {job.lmia_notes || "N/A"}
                                </h3>
                              </th>
                            </>
                            : null}
                          {props.heading === "Dashboard" ? null : (
                            <th className="py-5 d-none">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {job.education ? job.education : "N/A"}
                              </h3>
                            </th>
                          )}
                          {props.heading === "Dashboard" ? null : (
                            <th className="py-5 d-none">
                              <h3
                                className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate"
                                title={job.keyskill}
                              >
                                {job.keyskill ? job.keyskill : "N/A"}
                              </h3>
                            </th>
                          )}
                          <th className="py-5 ">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0"
                              title={job.experience_required + (
                                job.experience_required === "1-3 " ||
                                  job.experience_required === "1-2 " ||
                                  job.experience_required === "3-5 " ||
                                  job.experience_required === "5-7 " ||
                                  job.experience_required === "7+ "
                                  ? "Years"
                                  : job.experience_required === "0-1 "
                                    ? "Year"
                                    : "")}>
                              {job.experience_required}
                              {job.experience_required === "1-3 " ||
                                job.experience_required === "1-2 " ||
                                job.experience_required === "3-5 " ||
                                job.experience_required === "5-7 " ||
                                job.experience_required === "7+ "
                                ? "Years"
                                : job.experience_required === "0-1 "
                                  ? "Year"
                                  : ""
                              }
                            </h3>
                          </th>
                          <th
                            className={
                              user_type === "user" ? "d-none" : "py-5 "
                            }
                          >
                            <h3 className="font-size-3 font-weight-bold text-black-2 mb-0"
                              title={`${job.role_category} /${props.selfJob === "yes"
                                ? job.applied_by_self
                                : job.applied_by_admin}`}>
                              {props.heading === "Dashboard" || user_type === "agent" ? (
                                <span>
                                  {job.role_category} /
                                  {props.selfJob === "yes"
                                    ? job.applied_by_self
                                    : job.applied_by_admin}
                                </span>
                              ) : (
                                <Link
                                  onClick={() => {
                                    setresponseId(job.job_id);
                                    setresponseDropDown(
                                      responseDropDown === false ? true : false
                                    );
                                  }}
                                  className="text-dark"
                                >
                                  {job.role_category} /
                                  {props.selfJob === "yes"
                                    ? job.applied_by_self
                                    : job.applied_by_admin}
                                </Link>
                              )}
                            </h3>
                          </th>
                          {props.heading === "Dashboard" ||
                            user_type === "user" ||
                            user_type === "company" || user_type === "agent" ? null : (
                            <th className="py-5 min-width-px-100">
                              <div
                                className="btn-group button_group"
                                role="group"
                              >
                                {
                                  // props.response === "lmia" ?
                                  // <>
                                  //   <button
                                  //     className="btn btn-outline-info action_btn"
                                  //     onClick={() => {
                                  //       setresponseId(job.job_id);
                                  //       setresponseDropDown(
                                  //         responseDropDown === false
                                  //           ? true
                                  //           : false
                                  //       );
                                  //     }}
                                  //     disabled={
                                  //       props.selfJob === "yes"
                                  //         ? job.applied_by_self > 0 ? false : true
                                  //         : job.applied_by_admin > 0 ? false : true
                                  //     }
                                  //     title="Job LMIA"
                                  //   >
                                  //     LMIA Responses
                                  //   </button>
                                  //   <button
                                  //             className="btn btn-outline-info action_btn"
                                  //             onClick={() => updateLima(job)}
                                  //             title="Update LMIA for jobs"
                                  //           >
                                  //             LMIA
                                  //           </button>
                                  //           </>:
                                  //   props.response === "visa" ?
                                  //     <button
                                  //       className="btn btn-outline-info action_btn"
                                  //       onClick={() => {
                                  //         setresponseId(job.job_id);
                                  //         setresponseDropDown(
                                  //           responseDropDown === false
                                  //             ? true
                                  //             : false
                                  //         );
                                  //       }}
                                  //       disabled={
                                  //         props.selfJob === "yes"
                                  //           ? job.applied_by_self > 0 ? false : true
                                  //           : job.applied_by_admin > 0 ? false : true
                                  //       }
                                  //       title="Job visa"
                                  //     >
                                  //       Visa Responses
                                  //     </button> :
                                  props.skill === null ||
                                    props.skill === undefined ||
                                    Object.keys(props.skill).length === 0 ? (
                                    <>
                                      <div
                                        className="btn-group button_group">
                                        <button
                                          className="btn btn-outline-info action_btn"
                                          onClick={() => {
                                            setresponseId(job.job_id);
                                          }}
                                          disabled={
                                            props.selfJob === "yes"
                                              ? job.applied_by_self > 0
                                                ? false
                                                : true
                                              : job.applied_by_admin > 0
                                                ? false
                                                : true
                                          }
                                          title="Job Response"
                                        >
                                          <span className="text-gray px-2">
                                            <MdFormatListBulletedAdd />
                                          </span>
                                          {/* <i className="fa fa-list"></i> */}
                                        </button>
                                      </div>
                                      {props.selfJob === "yes" ? null : (
                                        <>
                                          <button
                                            className={
                                              user_type === "admin" &&
                                                props.response === "lmia"
                                                ? "btn btn-outline-info action_btn "
                                                : "d-none"
                                            }
                                            onClick={() => updateLima(job)}
                                            title="Update LMIA"
                                          >
                                            <span className="text-gray px-2">
                                              LMIA
                                            </span>
                                          </button>
                                          <button
                                            className={
                                              props.response === "lmia" ||
                                                props.response === "visa"
                                                ? "d-none"
                                                : "btn btn-outline-info action_btn"
                                            }
                                            onClick={() =>
                                              matchingCandidates(job)
                                            }
                                            title="All candidates"
                                          // disabled={
                                          //   Number(job.applied_by_admin) >= Number(job.role_category)
                                          //     ? true
                                          //     : false
                                          // }
                                          >
                                            <span className="text-gray px-2">
                                              <LiaUserTieSolid />
                                            </span>
                                            {/* <span className="fas fa-user-tie text-gray"></span> */}
                                          </button>
                                          <button
                                            className={
                                              props.response === "visa"
                                                ? "d-none"
                                                : "btn btn-outline-info action_btn"
                                            }
                                            onClick={() => editJob(job.job_id)}
                                            title="Edit Job"
                                          >
                                            <span className="text-gray px-1">
                                              <LiaUserEditSolid />
                                            </span>
                                            {/* <span className=" fas fa-edit text-gray"></span> */}
                                          </button>

                                          <button
                                            className={
                                              (props.response === "response" &&
                                                location.pathname === "/job") ||
                                                (user_type === "admin" &&
                                                  location.pathname ===
                                                  "/job_detail")
                                                ? "btn btn-outline-info action_btn"
                                                : "d-none"
                                            }
                                            title="Job LMIA"
                                          >
                                            <Link
                                              to="/lmia"
                                              className="text-dark"
                                              state={{ id: job.job_id }}
                                            >
                                              <span className="text-gray px-2">
                                                <BsArrow90DegRight />
                                              </span>
                                              {/* <span className="fas fa-arrow-left text-gray px-2"></span> */}
                                            </Link>
                                          </button>
                                          <button
                                            className={
                                              user_type === "admin" &&
                                                props.response === "lmia"
                                                ? "btn btn-outline-info action_btn "
                                                : "d-none"
                                            }
                                            onClick={() => AdditionalLmiaInfo(job)}
                                            title="Edit LMIA Info"
                                          // disabled={!job.lmia_status}
                                          >
                                            LMIA Info
                                          </button>
                                          <button
                                            className={`d-none ${props.detail === "company_detail"
                                              ? "d-none"
                                              : "btn btn-outline-info action_btn"
                                              }`}
                                            title="Client's document"
                                            onClick={() =>
                                              OpenAddDocModal(job.company_id)
                                            }
                                          >
                                            <span className="text-gray px-2">
                                              <GrDocumentUpload />
                                            </span>
                                          </button>
                                          <button
                                            className={
                                              props.response === "lmia" ||
                                                props.response === "visa"
                                                ? "d-none"
                                                : "btn btn-outline-info action_btn"
                                            }
                                            onClick={() => ShowDeleteAlert(job)}
                                            title="Delete"
                                          >
                                            <span className=" text-danger px-1">
                                              <RiDeleteBin5Line />
                                              {/* <i className="fa fa-trash"></i> */}
                                            </span>
                                          </button>
                                        </>
                                      )}
                                    </>
                                  ) : (
                                    <button
                                      className="btn btn-outline-info action_btn"
                                      disabled={
                                        job.is_applied === "1"
                                          ? true
                                          : false ||
                                            Number(job.applied_by_admin) >=
                                            Number(job.role_category)
                                            ? true
                                            : false
                                      }
                                      onClick={() =>
                                        onApplyJobClick(job.job_id)
                                      }
                                      title="Apply For job"
                                    >
                                      {job.is_applied === "1"
                                        ? "Already Applied"
                                        : "Apply"}
                                    </button>
                                  )
                                }
                              </div>
                            </th>
                          )}
                        </tr>

                        {(responseId !== undefined ||
                          responseId !== "undefined") &&
                          job.job_id === responseId &&
                          job.total_applicants > 0 ? (
                          <tr>
                            <td colSpan={props.response === "lmia" ? 21 : 11}>
                              <>
                                {/* <!-- Job Responses --> */}
                                <JobResponse
                                  responseId={responseId}
                                  apiCall={apiCall}
                                  setApiCall={setApiCall}
                                  heading={"Manage Jobs"}
                                  self={props.selfJob}
                                  total_applicants={job.total_applicants}
                                  role_category={job.role_category}
                                  status={
                                    props.response === "response" ||
                                      props.response === "visa" ||
                                      props.response === "lmia" ||
                                      props.response === "companyprofile"
                                      ? "1"
                                      : "0"
                                  }
                                  response={props.response}
                                  employee_id={
                                    location.state
                                      ? location.state.employee_id
                                        ? location.state.employee_id
                                        : ""
                                      : ""
                                  }
                                />
                              </>
                            </td>
                          </tr>
                        ) : null}
                      </React.Fragment>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
        </div>
        {totalData === 0 || totalData === "0" ? null : (
          <div className="pt-2">
            <Pagination
              nPages={nPages}
              currentPage={props.pageNo}
              setCurrentPage={props.setpageNo}
              total={totalData}
              count={jobData.length}
            />
          </div>
        )}
      </div>

      {showAddCompanyDocModal ? (
        <EmployerDocumentModal
          employer_id={CompanyId}
          show={showAddCompanyDocModal}
          close={() => setShowAddCompanyDocModal(false)}
        />
      ) : null}
      {showAddJobsModal ? (
        <AddJobModal
          show={showAddJobsModal}
          jobdata={JobId}
          admin={"admin"}
          setApiCall={setApiCall}
          apiCall={apiCall}
          setDetailApiCall={props.setApiCall}
          job_page="job_detail"
          close={() => setShowAddJobsModal(false)}
        />
      ) : null}
      {showCandidateModal ? (
        <EmployeeModal
          show={showCandidateModal}
          close={() => setShowCandidateModal(false)}
          data={candidateSkill}
          setApiCall={setApiCall}
          job_id={candidateSkill.job_id}
        />
      ) : null}
      {showLmiaAdditionalInfobModal ? (
        <LmiaInfo
          show={showLmiaAdditionalInfobModal}
          resData={JobId}
          apiCall={apiCall}
          setApiCall={setApiCall}
          job={"yes"}
          close={() => {
            setShowLmiaAdditionalInfobModal(false);
            setJobId("");
          }}
        />
      ) : null}
      {openLimia ? (
        <LmiaStatus
          resData={JobId}
          show={openLimia}
          close={() => setOpenLimia(false)}
          job={"yes"}
          setApiCall={setApiCall}
        />
      ) : null}
      <SAlert
        show={deleteAlert}
        title={deleteName}
        text="Are you Sure you want to delete !"
        onConfirm={() => deleteJob(deleteId)}
        showCancelButton={true}
        onCancel={() => setDeleteAlert(false)}
      />
    </>
  );
}
