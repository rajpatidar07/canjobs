import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import CustomButton from "../common/button";
import JobDetailsBox from "../common/jobdetail";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
// import AddJobModal from "../forms/employer/job";
import { GetAllJobs, DeleteJob, getAllJobsCategory } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import SAlert from "../common/sweetAlert";
import Pagination from "../common/pagination";
import FilterJson from "../json/filterjson";
import JobResponse from "./response";

function Followup() {
  /*show Modal and props state */
  let [showAddJobsModal, setShowAddJobsModal] = useState(false);
  let [showJobDetails, setShowJobDetails] = useState(false);
  const [jobData, setjobData] = useState([]);
  const [JobId, setJobId] = useState([]);
  /*Delete state */
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteID] = useState();
  const [deleteName, setDeleteName] = useState("");
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
    // //console.log((userData.status);
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
    setShowJobDetails(true);
    setJobId(e);
  };
  /* Function to show the single data to update job */
  // const getJobResponse = (e) => {
  //   // e.preventDefault();
  //   setShowAddJobsModal(true);
  //   setJobId(e);
  // };
  /*To Show the delete alert box */
  // const ShowDeleteAlert = (e) => {
  //   setDeleteID(e.job_id);
  //   setDeleteName(e.job_title);
  //   setDeleteAlert(true);
  // };
  /*To cancel the delete alert box */
  const CancelDelete = () => {
    setDeleteAlert(false);
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
  /*Category Onchange function to filter the data */
  let onCategoryFilterChange = (e) => {
    setCategoryFilterValue(e.target.value);
  };
  /* Function to get the job category data*/
  const CategoryData = async () => {
    const userData = await getAllJobsCategory();
    setCategoryList(userData.data);
  };

  /*Skill Onchange function to filter the data */
  let onSkillFilterChange = (e) => {
    setSkillFilterValue(e.target.value);
  };
  /*Location Onchange function to filter the data */
  let onLocationFilterChange = (e) => {
    setLocationFilterValue(e.target.value);
  };
  /*JobSwap Onchange function to filter the data */
  let onJobSwapFilterChange = (e) => {
    setJobSwapFilterValue(e.target.value);
  };
  /*Searcg Onchange function to filter the data */
  let onSearch = (e) => {
    setSearch(e.target.value);
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
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader heading={"Manage Follow-ups"} />
        {/* <!-- navbar- --> */}
        <AdminSidebar heading={"Manage Follow-ups"} />
        <ToastContainer />
        <div
          className={
            showJobDetails === false
              ? "dashboard-main-container mt-20"
              : "d-none"
          }
          id="dashboard-body"
        >
          <div className="container">
            <div className="mb-18">
              <div className="mb-8 align-items-center">
                <div className="page___heading">
                  <h3 className="font-size-6 mb-0">Posted Jobs </h3>
                </div>
                <div className="row align-items-center">
                  <div className="col-xl-3 col-md-6  form_control mb-5 mt-4">
                    <p className="input_label">Search by Name:</p>
                    <input
                      required
                      type="text"
                      className="form-control w-100"
                      placeholder={"Search Job"}
                      value={search}
                      name={"category_name"}
                      onChange={(e) => onSearch(e)}
                    />
                  </div>
                  <div className="col-xl-3 col-md-6  form_control mb-5 mt-4">
                    <p className="input_label">Filter by Category:</p>
                    <div className="select_div">
                      <select
                        name="country"
                        id="country"
                        value={categoryFilterValue}
                        onChange={onCategoryFilterChange}
                        className=" form-control"
                      >
                        <option value="">Select Category</option>
                        {(CategoryType || []).map((data) => {
                          return (
                            <option
                              value={data.job_category_id}
                              key={data.category_type}
                            >
                              {data.category_name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6  form_control mb-5 mt-4">
                    <p className="input_label">Filter by Job Swap:</p>
                    <div className="select_div">
                      <select
                        name="country"
                        id="country"
                        value={jobSwapFilterValue}
                        onChange={onJobSwapFilterChange}
                        className=" form-control"
                      >
                        <option value="">Select Job Type</option>
                        {(FilterJson.job_type || []).map((job, i) => (
                          <option key={i} value={job}>
                            {job}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6  form_control mb-5 mt-4">
                    <p className="input_label">Filter by Key Skill:</p>
                    <div className="select_div">
                      <select
                        name="country"
                        id="country"
                        value={SkillFilterValue}
                        onChange={onSkillFilterChange}
                        className=" form-control"
                      >
                        <option value="">Select Skill</option>
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
                  <div className="col-xl-3 col-md-6 form_control mb-5 mt-4">
                    <p className="input_label">Filter by Location:</p>
                    <div className="select_div">
                      <select
                        name="country"
                        id="country"
                        value={locationFilterValue}
                        onChange={onLocationFilterChange}
                        className=" form-control"
                      >
                        <option value="">Select Location</option>
                        {(FilterJson.location || []).map((data, i) => {
                          return (
                            <option value={data} key={i}>
                              {data}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-9 px-5">
                <div className="table-responsive main_table_div">
                  <table className="table table-striped main_data_table">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          <Link onClick={sortByNameClick} className="text-gray">
                            Job title / Industry
                          </Link>
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to=""
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
                          <th className="bg-white"></th>
                          <th className="bg-white"></th>
                          <th className="bg-white">No Data Found</th>
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
                                  <div
                                    class="btn-group button_group"
                                    role="group"
                                  >
                                    <button
                                      className="btn btn-outline-info action_btn"
                                      onClick={() => setresponseId(job.job_id)}
                                    >
                                      Responses
                                    </button>
                                  </div>
                                ) : null}
                              </td>
                            </tr>
                            {job.job_id === responseId &&
                            job.total_applicants > 0 ? (
                              <tr>
                                <td colSpan={10}>
                                  <JobResponse
                                    responseId={responseId}
                                    heading={"Manage Follow-ups"}
                                  />
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
            </div>
          </div>
          <SAlert
            show={deleteAlert}
            title={deleteName}
            text="Are you Sure you want to delete !"
            onConfirm={() => deleteJob(deleteId)}
            showCancelButton={true}
            onCancel={CancelDelete}
          />
        </div>
        {showJobDetails === true ? (
          <div className="dashboard-main-container mt-20 ">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 dark-mode-texts">
                  <div className="mb-9">
                    <Link
                      to={""}
                      onClick={() => setShowJobDetails(false)}
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
                <JobDetailsBox jobdata={JobId} />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Followup;
