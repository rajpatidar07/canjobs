import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetAllJobs, DeleteJob, getAllJobsCategory } from "../../api/api";
import { toast } from "react-toastify";
import JobResponse from "./response";

function FollowupTable() {
  /*show Modal and props state */
  let [showAddJobsModal, setShowAddJobsModal] = useState(false);
  const [jobData, setjobData] = useState([]);
  const [JobId, setJobId] = useState([]);
  /*Delete state */
  /*Filter and search state */
  const [categoryFilterValue, setCategoryFilterValue] = useState("");
  const [SkillFilterValue, setSkillFilterValue] = useState("");
  const [locationFilterValue, setLocationFilterValue] = useState("");
  const [jobSwapFilterValue, setJobSwapFilterValue] = useState("");
  const [search, setSearch] = useState("");
  const [Categorylist, setCategoryList] = useState([]);
  /*Pagination states */
  const [totalData, setTotalData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  /*Shorting states */
  const [columnName, setcolumnName] = useState("job_id");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [clicksort, setClicksort] = useState(0);
  const [responseId, setresponseId] = useState();

  /* Function to get Job data*/
  const JobData = async () => {
    const userData = await GetAllJobs(
      search,
      locationFilterValue,
      categoryFilterValue,
      SkillFilterValue,
      jobSwapFilterValue,
      currentPage,
      recordsPerPage,
      columnName,
      sortOrder
    );
    setjobData(userData.data.data);
    setTotalData(userData.data.total_rows);
    setresponseId(userData.data.data[0].job_id);
    // if (userData.message === "No data found") {
    // //// console.log((userData.status);
    // }
  };

  /*Render function to get the job */
  useEffect(() => {
    JobData();
    CategoryData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    categoryFilterValue,
    SkillFilterValue,
    locationFilterValue,
    jobSwapFilterValue,
    showAddJobsModal,
    search,
    deleteAlert,
    currentPage,
    columnName,
    sortOrder,
  ]);

  /* Function to show the Job detail data */
  const JobDetail = (e) => {
    // e.preventDefault();
    setJobId(e);
  };

  /* Function to get the job category data*/
  const CategoryData = async () => {
    const userData = await getAllJobsCategory();
    setCategoryList(userData.data);
  };

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
  /*Category type array to filter*/
  const CategoryType = (Categorylist || []).filter(
    (thing, index, self) =>
      index === self.findIndex((t) => t.category_type === thing.category_type)
  );

  return (
    <>
      <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-9 px-5">
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
                <th
                  scope="col"
                  className=" border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    to=""
                    title="Sort by Job"
                    onClick={sortByTypeClick}
                    className="text-gray"
                  >
                    Job Type
                  </Link>
                </th>
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
                <th
                  scope="col"
                  className=" border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    to=""
                    onClick={sortBySkillClick}
                    title="Sort by Skills"
                    className="text-gray"
                  >
                    Skills
                  </Link>
                </th>
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
                <th
                  scope="col"
                  className=" border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    to=""
                    onClick={sortBySalaryClick}
                    title="Sort by Salary"
                    className="text-gray"
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
                  <Link to="" className="text-gray" title="Sort by Experience">
                    Total Applicants
                  </Link>
                </th>
                <th
                  scope="col"
                  className=" border-0 font-size-4 font-weight-normal"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Map function to show the data in the list*/}
              {totalData === 0 ? (
                <tr>
                  <th className="bg-white"></th>
                  <th className="bg-white"></th>
                  {props.heading === "Dashboard" ? (
                    <th className="bg-white">No Data Found</th>
                  ) : (
                    <th className="bg-white"></th>
                  )}
                  <th className="bg-white"></th>
                  {props.heading !== "Dashboard" ? (
                    <th className="bg-white">No Data Found</th>
                  ) : (
                    <th className="bg-white"></th>
                  )}{" "}
                  <th className="bg-white"></th>
                  <th className="bg-white"></th>
                  <th className="bg-white"></th>
                  <th className="bg-white"></th>
                  <th className="bg-white"></th>
                </tr>
              ) : (
                (jobData || []).map((job) => (
                  <>
                    <tr
                      className="aos-init aos-animate"
                      data-aos="fade-right"
                      data-aos-duration="800"
                      data-aos-once="true"
                      key={job.job_id}
                    >
                      <td scope="row" className="py-5 ">
                        <div className="">
                          <Link
                            to={""}
                            title="Job Detail"
                            onClick={() => JobDetail(job.job_id)}
                            className="font-size-3 mb-0 font-weight-semibold text-black-2"
                          >
                            {job.job_title} ({job.industry_type})
                          </Link>
                        </div>
                      </td>
                      <td className=" py-5">
                        <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                          {job.employement} - {job.job_type}
                        </h3>
                      </td>
                      <td className=" py-5">
                        <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                          {job.location}
                        </h3>
                      </td>
                      <td className="py-5 ">
                        <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                          {job.education}
                        </h3>
                      </td>
                      <td className="py-5 ">
                        <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                          {job.keyskill}
                        </h3>
                      </td>
                      <td className="py-5 ">
                        <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                          {job.language}
                        </h3>
                      </td>
                      <td className="py-5 ">
                        <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                          {job.salary}
                        </h3>
                      </td>
                      <td className="py-5 ">
                        <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                          {job.experience_required}
                        </h3>
                      </td>
                      <td className="py-5 ">
                        <h3 className="font-size-3 font-weight-bold text-black-2 mb-0">
                          {job.total_applicants}
                        </h3>
                      </td>
                      <td className="py-5 min-width-px-100">
                        {job.total_applicants > 0 ? (
                          <div className="btn-group button_group" role="group">
                            <button
                              className="btn btn-outline-info action_btn"
                              onClick={() => setresponseId(job.job_id)}
                              title="Job Responses"
                            >
                              Responses
                            </button>
                          </div>
                        ) : null}
                      </td>
                    </tr>
                    {job.job_id === responseId && job.total_applicants > 0 ? (
                      <tr>
                        <td colSpan={10}>
                          <JobResponse responseId={responseId} />
                        </td>
                      </tr>
                    ) : null}
                  </>
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
    </>
  );
}

export default FollowupTable;
