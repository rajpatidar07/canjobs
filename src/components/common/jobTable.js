import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddJobModal from "../forms/employer/job";
import { GetAllJobs, DeleteJob } from "../../api/api";
import { toast } from "react-toastify";
import SAlert from "../common/sweetAlert";
import Pagination from "../common/pagination";
import Loader  from '../common/loader';

export default function JobTable(props) {
  // console.log(props.filter_by_time);

  /*show Modal and props state */
  let [isLoading, setIsLoading] = useState(true);
  let [showAddJobsModal, setShowAddJobsModal] = useState(false);
  let [apiCall, setApiCall] = useState(false);
  const [jobData, setjobData] = useState([]);
  const [JobId, setJobId] = useState([]);
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

  /* Function to get Job data*/
  const JobData = async () => {
    setIsLoading(true)
    const userData = await GetAllJobs(
      props.search,
      props.locationFilterValue,
      props.categoryFilterValue,
      props.SkillFilterValue,
      props.jobSwapFilterValue,
      currentPage,
      recordsPerPage,
      columnName,
      sortOrder,
      props.company,
      props.filter_by_time
    );
    if (userData.data.data.length === 0) {
      setjobData([]);
      setIsLoading(false)
    } else {
      setjobData(userData.data.data);
      setTotalData(userData.data.total_rows);
      setIsLoading(false)
    }
    // // console.log(userData.data.data);
  };

  /*Render function to get the job */
  useEffect(() => {
    JobData();
    if (apiCall === true || props.apiCall === true) {
      props.setApiCall(false);
      setApiCall(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // e.preventDefault();
    props.JobDetail(e);
  };
  /* Function to show the single data to update job */
  const editJob = (e) => {
    // e.preventDefault();
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
  // console.log(jobData, "List Data");
  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);

  /*Sorting Function */
  const handleSort = (columnName) => {
    setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
    setcolumnName(columnName);
    setApiCall(true);
  };
  return (
    <>
  
     
      <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-9 px-5">
        <div className="table-responsive main_table_div">
        { isLoading ? 
           <Loader load={"yes"}/>  :  
           <table className="table table-striped main_data_table">
            <thead>
              <tr>
                <th
                  scope="col"
                  className=" border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    onClick={() => handleSort("job_title")}
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
                      onClick={() => handleSort("job_type")}
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
                      onClick={() => handleSort("location")}
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
                      onClick={() => handleSort("education")}
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
                      onClick={() => handleSort("keyskill")}
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
                      onClick={() => handleSort("language")}
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
                    onClick={() => handleSort("salary")}
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
                    onClick={() => handleSort("experience_required")}
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
                    Total Applicants
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
                  <tr className="" key={job.job_id}>
                    <th scope="row" className="py-5 ">
                      <div className="">
                        {props.heading === "Dashboard" ? (
                          <>
                            <p className="m-0 text-black-2 font-weight-bold text-capitalize">
                              {job.job_title}
                            </p>
                            <p className="text-gray font-size-2 m-0 text-capitalize">
                              {job.company_name} - {job.industry_type}
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
                        {job.total_applicants}
                      </h3>
                    </th>
                    {props.heading === "Dashboard" ? null : (
                      <th className="py-5 min-width-px-100">
                        <div className="btn-group button_group" role="group">
                          <button
                            className="btn btn-outline-info action_btn"
                            onClick={() => editJob(job.job_id)}
                            title="Edit Job"
                          >
                            <span className=" fas fa-edit text-gray"></span>
                          </button>
                          <button
                            className="btn btn-outline-info action_btn"
                            onClick={() => ShowDeleteAlert(job)}
                            title="Delete"
                          >
                            <span className=" text-danger">
                              <i className="fa fa-trash"></i>
                            </span>
                          </button>
                        </div>
                      </th>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>}
        </div>
        {totalData === 0  || totalData === "0" ? null : <div className="pt-2">
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
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
