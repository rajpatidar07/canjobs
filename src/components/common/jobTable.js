import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddJobModal from "../forms/employer/job";
import { GetAllJobs, DeleteJob } from "../../api/api";
import { toast } from "react-toastify";
import SAlert from "../common/sweetAlert";
import Pagination from "../common/pagination";

export default function JobTable(props) {
  console.log(props.filter_by_time);

  /*show Modal and props state */
  let [showAddJobsModal, setShowAddJobsModal] = useState(false);
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
  const [clicksort, setClicksort] = useState(0);

  /* Function to get Job data*/
  const JobData = async () => {
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
    setjobData(userData.data.data);
    // // console.log(userData.data.data);
    setTotalData(userData.data.total_rows);
  };

  /*Render function to get the job */
  useEffect(() => {
    JobData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.categoryFilterValue,
    props.SkillFilterValue,
    props.locationFilterValue,
    props.jobSwapFilterValue,
    showAddJobsModal,
    props.search,
    deleteAlert,
    currentPage,
    columnName,
    sortOrder,
    props.company,
    props.filter_by_time,
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
      setDeleteAlert(false);
    }
  }
  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);

  /*Sorting Function by name */
  let sortByNameClick = () => {
    if (clicksort === 0 || sortOrder === "DESC" || columnName === "job_id") {
      setcolumnName("job_title");
      setSortOrder("ASC");
      setClicksort(1);
    } else {
      setcolumnName("job_title");
      setSortOrder("DESC");
      setClicksort(0);
    }
  };
  /*Sorting Function by Type */
  let sortByTypeClick = () => {
    if (clicksort === 0 || sortOrder === "DESC" || columnName === "job_id") {
      setcolumnName("job_type");
      setSortOrder("ASC");
      setClicksort(1);
    } else {
      setcolumnName("job_type");
      setSortOrder("DESC");
      setClicksort(0);
    }
  };
  /*Sorting Function by Location */
  let sortByLocationClick = () => {
    if (clicksort === 0 || sortOrder === "DESC" || columnName === "job_id") {
      setcolumnName("location");
      setSortOrder("ASC");
      setClicksort(1);
    } else {
      setcolumnName("location");
      setSortOrder("DESC");
      setClicksort(0);
    }
  };
  /*Sorting Function by Education */
  let sortByEducationClick = () => {
    if (clicksort === 0 || sortOrder === "DESC" || columnName === "job_id") {
      setcolumnName("education");
      setSortOrder("ASC");
      setClicksort(1);
    } else {
      setcolumnName("education");
      setSortOrder("DESC");
      setClicksort(0);
    }
  };
  /*Sorting Function by Skill */
  let sortBySkillClick = () => {
    if (clicksort === 0 || sortOrder === "DESC" || columnName === "job_id") {
      setcolumnName("keyskill");
      setSortOrder("ASC");
      setClicksort(1);
    } else {
      setcolumnName("keyskill");
      setSortOrder("DESC");
      setClicksort(0);
    }
  };
  /*Sorting Function by Language */
  let sortByLanguageClick = () => {
    if (clicksort === 0 || sortOrder === "DESC" || columnName === "job_id") {
      setcolumnName("language");
      setSortOrder("ASC");
      setClicksort(1);
    } else {
      setcolumnName("language");
      setSortOrder("DESC");
      setClicksort(0);
    }
  };
  /*Sorting Function by Salary */
  let sortBySalaryClick = () => {
    if (clicksort === 0 || sortOrder === "DESC" || columnName === "job_id") {
      setcolumnName("salary");
      setSortOrder("ASC");
      setClicksort(1);
    } else {
      setcolumnName("salary");
      setSortOrder("DESC");
      setClicksort(0);
    }
  };
  /*Sorting Function by Experience  */
  let sortByExperienceClick = () => {
    if (clicksort === 0 || sortOrder === "DESC" || columnName === "job_id") {
      setcolumnName("experience_required");
      setSortOrder("ASC");
      setClicksort(1);
    } else {
      setcolumnName("experience_required");
      setSortOrder("DESC");
      setClicksort(0);
    }
  };

  return (
    <>
      {" "}
      <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-9 px-5">
        {props.heading === "Dashboard" ? (
          <Link
            className="btn btn-outline-info action_btn float-right mb-2"
            to={"/job"}
            title="Veiw All Jobs"
          >
            View All
          </Link>
        ) : (
          ""
        )}
        <div className="table-responsive main_table_div">
          <table className="table table-striped main_data_table">
            <thead>
              <tr>
                <th
                  scope="col"
                  className=" border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    onClick={sortByNameClick}
                    title="Sort by Industry"
                    className="text-gray"
                  >
                    Job title / Industry
                  </Link>
                </th>
                {props.heading === "Dashboard" ? (
                  ""
                ) : (
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to=""
                      onClick={sortByTypeClick}
                      title="Sort by Job"
                      className="text-gray"
                    >
                      Job Type
                    </Link>
                  </th>
                )}
                {props.heading === "Dashboard" ? (
                  ""
                ) : (
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to=""
                      onClick={sortByLocationClick}
                      className="text-gray"
                      title="Sort by Address"
                    >
                      Address
                    </Link>
                  </th>
                )}
                {props.heading === "Dashboard" ? (
                  ""
                ) : (
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to=""
                      onClick={sortByEducationClick}
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
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to=""
                      onClick={sortBySkillClick}
                      className="text-gray"
                      title="Sort by Skill"
                    >
                      Skills
                    </Link>
                  </th>
                )}
                {props.heading === "Dashboard" ? (
                  ""
                ) : (
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to=""
                      onClick={sortByLanguageClick}
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
                    onClick={sortBySalaryClick}
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
                    onClick={sortByExperienceClick}
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
                  <Link to="" className="text-gray">
                    Total Applicants
                  </Link>
                </th>
                {props.heading === "Dashboard" ? (
                  ""
                ) : (
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
              {totalData === 0 ? (
                <tr>
                  <th className="bg-white"></th>
                  {props.heading === "Dashboard" ? (
                    <th className="bg-white">No Data Found</th>
                  ) : (
                    <th className="bg-white"></th>
                  )}{" "}
                  <th className="bg-white"></th>
                  <th className="bg-white"></th>
                  {props.heading !== "Dashboard" ? (
                    <>
                      <th className="bg-white"></th>
                      <th className="bg-white">No Data Found</th>{" "}
                      <th className="bg-white"></th>
                      <th className="bg-white"></th>
                      <th className="bg-white"></th>
                      <th className="bg-white"></th>
                      <th className="bg-white"></th>
                    </>
                  ) : (
                    ""
                  )}
                </tr>
              ) : (
                (jobData || []).map((job) => (
                  <tr className="" key={job.job_id}>
                    <th scope="row" className="py-5 ">
                      <div className="">
                        {props.heading === "Dashboard" ? (
                          <span className="font-size-3 mb-0 font-weight-semibold text-black-2">
                            {job.job_title} {job.company_name}(
                            {job.industry_type})
                          </span>
                        ) : (
                          <Link
                            title="Job Details"
                            to={""}
                            onClick={() => JobDetail(job.job_id)}
                            className="font-size-3 mb-0 font-weight-semibold text-black-2"
                          >
                            {job.job_title} {job.company_name}(
                            {job.industry_type})
                          </Link>
                        )}
                      </div>
                    </th>
                    {props.heading === "Dashboard" ? (
                      ""
                    ) : (
                      <th className=" py-5">
                        <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                          {job.employement} - {job.job_type}
                        </h3>
                      </th>
                    )}
                    {props.heading === "Dashboard" ? (
                      ""
                    ) : (
                      <th className=" py-5">
                        <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                          {job.location}
                        </h3>
                      </th>
                    )}
                    {props.heading === "Dashboard" ? (
                      ""
                    ) : (
                      <th className="py-5 ">
                        <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                          {job.education}
                        </h3>
                      </th>
                    )}
                    {props.heading === "Dashboard" ? (
                      ""
                    ) : (
                      <th className="py-5 ">
                        <h3 className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate">
                          {job.keyskill}
                        </h3>
                      </th>
                    )}
                    {props.heading === "Dashboard" ? (
                      ""
                    ) : (
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
                      </h3>
                    </th>
                    <th className="py-5 ">
                      <h3 className="font-size-3 font-weight-bold text-black-2 mb-0">
                        {job.total_applicants}
                      </h3>
                    </th>
                    {props.heading === "Dashboard" ? (
                      ""
                    ) : (
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
          </table>
        </div>
        <div className="pt-2">
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      <AddJobModal
        show={showAddJobsModal}
        jobdata={JobId}
        close={() => setShowAddJobsModal(false)}
      />{" "}
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
