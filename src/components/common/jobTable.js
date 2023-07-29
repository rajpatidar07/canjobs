import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddJobModal from "../forms/employer/job";
import { GetAllJobs, DeleteJob, ApplyJob, GetEmployeeFilterJob } from "../../api/api";
import { toast } from "react-toastify";
import SAlert from "../common/sweetAlert";
import Pagination from "../common/pagination";
import Loader from '../common/loader';
import EmployeeModal from "../admin/Modal/employeeModal"
import JobResponse from "../admin/response";
import LmiaStatus from "../forms/admin/lmiastatus";
export default function JobTable(props) {
  /*show Modal and props state */
  let [isLoading, setIsLoading] = useState(true);
  let [showAddJobsModal, setShowAddJobsModal] = useState(false);
  let [openLimia, setOpenLimia] = useState(false);
  let [showCandidateModal, setShowCandidateModal] = useState(false);
  let [apiCall, setApiCall] = useState(false);
  const [jobData, setjobData] = useState([]);
  const [JobId, setJobId] = useState();
  const [candidateSkill, setCandidateSkill] = useState([]);

  /*Delete state */
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteID] = useState();
  const [deleteName, setDeleteName] = useState("");
  /*Pagination states */
  const [totalData, setTotalData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  /*Shorting states */
  const [columnName, setcolumnName] = useState("job_id");
  const [sortOrder, setSortOrder] = useState("DESC");
  /*Response states */
  const [responseId, setresponseId] = useState();
  const [responseDropDown, setresponseDropDown] = useState(false);
  /* Function to get Job data*/
  const JobData = async () => {
    setIsLoading(true)
    let userData;
    if (props.employee_id) {
      userData = await GetEmployeeFilterJob(props.employee_id, props.SkillFilterValue)
    }
    else {
      userData = await GetAllJobs(
        props.search,
        props.locationFilterValue,
        props.categoryFilterValue,
        props.SkillFilterValue,
        props.jobSwapFilterValue,
        props.company || props.search || props.locationFilterValue || props.categoryFilterValue || props.SkillFilterValue || props.jobSwapFilterValue || props.filter_by_time ? 1 : currentPage,
        recordsPerPage,
        columnName,
        sortOrder,
        props.company,
        props.filter_by_time
      );
    }
    if (userData.data.data.length === 0 || userData.data.length === 0) {
      setjobData([]);
      setIsLoading(false)
    } else {
      setjobData(userData.data.data);
      setTotalData(userData.data.total_rows);
      setIsLoading(false)
    }
  };

  /*Render function to get the job */
  useEffect(() => {
    JobData();
    if (apiCall === true || props.apiCall === true) {
      props.setApiCall(false);
      setApiCall(false);
    }
  }, [
    props.categoryFilterValue,
    props.SkillFilterValue,
    props.locationFilterValue,
    props.jobSwapFilterValue,
    props.search,
    currentPage,
    sortOrder,
    props.company,
    props.filter_by_time,
    apiCall,
    props.apiCall,
  ]);

  /* Function to show the Job detail data */
  const JobDetail = (e) => {
    props.JobDetail(e);
  };

  /* Function to show the Table of the employee of perticular skill */
  const matchingCandidates = (e) => {
    console.log("kljkjmlmkl", e)

    setShowCandidateModal(true);
    setCandidateSkill(e);
  };

  /* Function to show the single data to update job */
  const editJob = (e) => {
    setShowAddJobsModal(true);
    setJobId(e);
  };
  /*To Show the delete alert box */
  const ShowDeleteAlert = (e) => {
    setDeleteID(e.job_id);
    setDeleteName(e.job_title);
    setDeleteAlert(true);
  };

  /*To call Api to delete Job */
  async function deleteJob(e) {
    const responseData = await DeleteJob(e);
    if (responseData.message === "job has been deleted") {
      toast.error("Job deleted Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setApiCall(true);
      setDeleteAlert(false);
    }
  }
  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);

  /*Sorting Function */
  const handleSort = (columnName) => {
    setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
    setcolumnName(columnName);
    setApiCall(true);
  };

  /*Function to change job */
  const onChangeJobClick = async (id) => {
    const responseData = await ApplyJob(id, props.employee_id, 0);
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
    }

  };

  /*Function to open update LIMA */
  const updateLima = (job) => {
    setJobId(job)
    setOpenLimia(true)
  }
  return (
    <>


      <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-9 px-5">
        <div className="table-responsive main_table_div">
          {isLoading ?
            <Loader load={"yes"} /> :
            <table className="table table-striped main_data_table">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      onClick={() => { handleSort("job_title"); setCurrentPage(1) }}
                      title="Sort by Industry"
                      className="text-gray"
                    >
                      Job title / Industry
                    </Link>
                  </th>
                  {props.heading === "Dashboard" ? null : (
                    <th
                      scope="col"
                      className=" border-0 font-size-4 font-weight-normal"
                    >
                      <Link
                        to=""
                        onClick={() => { handleSort("job_type"); setCurrentPage(1) }}
                        title="Sort by Job"
                        className="text-gray"
                      >
                        Job Type
                      </Link>
                    </th>
                  )}
                  {props.heading === "Dashboard" ? null : (
                    <th
                      scope="col"
                      className=" border-0 font-size-4 font-weight-normal"
                    >
                      <Link
                        to=""
                        onClick={() => { handleSort("location"); setCurrentPage(1) }}
                        className="text-gray"
                        title="Sort by Address"
                      >
                        Address
                      </Link>
                    </th>
                  )}
                  {props.heading === "Dashboard" ? null : (
                    <th
                      scope="col"
                      className=" border-0 font-size-4 font-weight-normal"
                    >
                      <Link
                        to=""
                        onClick={() => { handleSort("education"); setCurrentPage(1) }}
                        className="text-gray"
                        title="Sort by Education"
                      >
                        Education
                      </Link>
                    </th>
                  )}
                  {props.heading === "Dashboard" ? null : (
                    <th
                      scope="col"
                      className=" border-0 font-size-4 font-weight-normal"
                    >
                      <Link
                        to=""
                        onClick={() => { handleSort("keyskill"); setCurrentPage(1) }}
                        className="text-gray"
                        title="Sort by Skill"
                      >
                        Skills
                      </Link>
                    </th>
                  )}
                  {props.heading === "Dashboard" ? null : (
                    <th
                      scope="col"
                      className=" border-0 font-size-4 font-weight-normal"
                    >
                      <Link
                        to=""
                        onClick={() => { handleSort("language"); setCurrentPage(1) }}
                        className="text-gray"
                        title="Sort by Language"
                      >
                        Language
                      </Link>
                    </th>
                  )}
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to=""
                      onClick={() => { handleSort("salary"); setCurrentPage(1) }}
                      className="text-gray"
                      title="Sort by Salary"
                    >
                      Salary
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to=""
                      onClick={() => { handleSort("experience_required"); setCurrentPage(1) }}
                      className="text-gray"
                      title="Sort by Experience"
                    >
                      Experience
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    Vacancies  / Total Resposes
                  </th>
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    LIMIA status
                  </th>
                  {props.heading === "Dashboard" ? null : (
                    <th
                      scope="col"
                      className=" border-0 font-size-4 font-weight-normal"
                    >
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {/* Map function to show the data in the list*/}
                {totalData === 0 || jobData.length === 0 ? (
                  <tr>
                    <th className="bg-white"></th>
                    {props.heading === "Dashboard" ? (
                      <th className="bg-white text-center">No Data Found</th>
                    ) : (
                      <th className="bg-white"></th>
                    )}
                    <th className="bg-white"></th>
                    <th className="bg-white"></th>
                    {props.heading !== "Dashboard" ? (
                      <>
                        <th className="bg-white text-center">No Data Found</th>
                        <th className="bg-white"></th>
                        <th className="bg-white"></th>
                        <th className="bg-white"></th>
                        <th className="bg-white"></th>
                        <th className="bg-white"></th>
                      </>
                    ) : null}
                  </tr>
                ) : (
                  (jobData || []).map((job) => (
                    <React.Fragment key={job.job_id}>
                      <tr className={job.is_applied === "1" ? "d-none" : ""} >
                        <th scope="row" className="py-5 ">
                          <div className="">
                            {props.heading === "Dashboard" ? (
                              <>
                                <p className="m-0 text-black-2 font-weight-bold text-capitalize">
                                  {job.job_title}
                                </p>
                                <p className="text-gray font-size-2 m-0 text-capitalize">
                                  {job.company_name} - {job.industry_type}
                                  <br />
                                  {job.is_featured === "1" ?<span className="bg-info text-white p-1"> Featured </span>:null}
                                </p>
                              </>
                            ) : (
                              <Link
                                title="Job Details"
                                to={""}
                                onClick={() => JobDetail(job.job_id)}
                                className="font-size-3 mb-0 font-weight-semibold text-black-2"
                              >
                                <>
                                  <p className="m-0 text-black-2 font-weight-bold text-capitalize">
                                    {job.job_title}
                                  </p>
                                  <p className="text-gray font-size-2 m-0 text-capitalize">
                                    {job.company_name} - {job.industry_type}
                                    <br />
                                    {job.is_featured === "1" ?<span className="bg-info text-white p-1"> Featured </span>:null}
                                  </p>
                                </>
                              </Link>
                            )}
                          </div>
                        </th>
                        {props.heading === "Dashboard" ? null : (
                          <th className=" py-5">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {job.employement} - {job.job_type}
                            </h3>
                          </th>
                        )}
                        {props.heading === "Dashboard" ? null : (
                          <th className=" py-5">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {job.location}
                            </h3>
                          </th>
                        )}
                        {props.heading === "Dashboard" ? null : (
                          <th className="py-5 ">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {job.education}
                            </h3>
                          </th>
                        )}
                        {props.heading === "Dashboard" ? null : (
                          <th className="py-5 ">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate">
                              {job.keyskill}
                            </h3>
                          </th>
                        )}
                        {props.heading === "Dashboard" ? null : (
                          <th className="py-5 ">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate">
                              {job.language}
                            </h3>
                          </th>
                        )}
                        <th className="py-5 ">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            {job.salary}
                          </h3>
                        </th>
                        <th className="py-5 ">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            {job.experience_required}
                            {job.experience_required === "Fresher" ? "" : "years"}
                          </h3>
                        </th>
                        <th className="py-5 ">
                          <h3 className="font-size-3 font-weight-bold text-black-2 mb-0">
                            {job.role_category} / {job.total_applicants}
                          </h3>
                        </th>
                        <th className=" py-5">
                          <div className="font-size-3 font-weight-normal text-black-2 mb-0">
                            <Link to="/limia" state={{ id: job.job_id }}>
                              {job.lmia_status === "Reject" ? (
                                <span className="px-3 py-2 badge badge-pill badge-danger">
                                  Reject
                                </span>
                              ) : job.lmia_status === "Approved" ? (
                                <span className="px-3 py-2 badge badge-pill bg-info text-white">
                                  Approved
                                </span>
                              ) : job.lmia_status === "Draft" ? (
                                <span className="px-3 py-2 badge badge-pill badge-gray">
                                  Draft
                                </span>
                              ) : job.lmia_status === "Complete" ? (
                                <span className="px-3 py-2 badge badge-pill bg-primary-opacity-9 text-white">
                                  Complete
                                </span>
                              ) : job.lmia_status === "Pending" ? (
                                <span className="px-3 py-2 badge badge-pill badge-warning">
                                  Pending
                                </span>
                              ) : job.lmia_status === "Other" ? (
                                <span className="px-3 py-2 badge badge-pill badge-dark">
                                  Other
                                </span>
                              ) : (
                                <span>NA</span>
                              )}
                            </Link>
                          </div>
                        </th>
                        {props.heading === "Dashboard" ? null : (
                          <th className="py-5 min-width-px-100">
                            <div className="btn-group button_group" role="group">
                              {props.skill === null || props.skill === undefined || Object.keys(props.skill).length === 0 ?
                                <>
                                  <button
                                    className="btn btn-outline-info action_btn"
                                    onClick={() => updateLima(job)}
                                    title="Update LIMA"
                                  >
                                    LIMIA
                                  </button>
                                  <button
                                    className="btn btn-outline-info action_btn"
                                    onClick={() => matchingCandidates(job)}
                                    title="Matching candidates"
                                    disabled={job.total_applicants 
                                      >= job.role_category ? true : false}
                                  >
                                    <span className="fas fa-user-tie text-gray"></span>
                                  </button>
                                  <button
                                    className="btn btn-outline-info action_btn"
                                    onClick={() => editJob(job.job_id)}
                                    title="Edit Job"
                                  >
                                    <span className=" fas fa-edit text-gray"></span>
                                  </button>
                                  <div
                                    className="btn-group button_group"
                                  // role="group"
                                  >
                                    <button
                                      className="btn btn-outline-info action_btn"
                                      onClick={() => {
                                        setresponseId(job.job_id);
                                        setresponseDropDown(responseDropDown === false ? true : false)
                                      }}
                                      disabled={job.total_applicants > 0 ? false : true}
                                      title="Job Response"
                                    >
                                      Responses
                                    </button>
                                  </div>
                                  <button
                                    className="btn btn-outline-info action_btn"
                                    onClick={() => ShowDeleteAlert(job)}
                                    title="Delete"
                                  >
                                    <span className=" text-danger">
                                      <i className="fa fa-trash"></i>
                                    </span>
                                  </button>
                                </>
                                : <button
                                  className="btn btn-outline-info action_btn"
                                  disabled={job.is_applied === "1" ? true : false||
                                  job.total_applicants >= job.role_category ? true : false}
                                  onClick={() => onChangeJobClick(job.job_id)}
                                  title="Apply For job"
                                >
                                  {job.is_applied === "1" ? "Already Applied" : "Apply"}
                                </button>}
                            </div>
                          </th>
                        )}
                      </tr>
                      {job.job_id === responseId &&
                        job.total_applicants > 0 && responseDropDown === true ? (
                        <tr>
                          <td colSpan={10}>
                            {/* <!-- Job Responses --> */}
                            <JobResponse
                              responseId={responseId}
                              apiCall={apiCall}
                              setApiCall={setApiCall}
                              heading={"Manage Jobs"}
                              total_applicants={job.total_applicants}
                              role_category={job.role_category} 
                            />
                          </td>
                        </tr>
                      ) : null}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>}
        </div>
        {totalData === 0 || totalData === "0" ? null : <div className="pt-2">
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage} total={totalData} count={jobData.length}
          />
        </div>}
      </div>
      {showAddJobsModal ? (
        <AddJobModal
          show={showAddJobsModal}
          jobdata={JobId}
          admin={"admin"}
          setApiCall={setApiCall}
          apiCall={apiCall}
          close={() => setShowAddJobsModal(false)}
        />
      ) : null}
      {
        showCandidateModal ?
          <EmployeeModal
            show={showCandidateModal}
            close={() => setShowCandidateModal(false)}
            data={candidateSkill} />

          : null
      }
      {openLimia ?
        <LmiaStatus
          resData={JobId}
          show={openLimia}
          close={() => setOpenLimia(false)}
          job={"yes"}
          setApiCall={setApiCall} /> :
        null}
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
