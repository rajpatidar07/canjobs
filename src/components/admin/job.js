import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../common/button";
import JobDetailsBox from "../common/jobdetail";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import AddJobModal from "../forms/employer/job";
import { GetAllJobs, DeleteJob, getAllJobsCategory } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import SAlert from "../common/sweetAlert";
import Pagination from "../common/pagination";

function Job() {
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
  const [recordsPerPage] = useState(5);
  /*Shorting states */
  const [columnName, setcolumnName] = useState("job_id");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [clicksort, setClicksort] = useState(0);

  /* Function to get Job data*/
  const JobData = async () => {
    const userData = await GetAllJobs(
      categoryFilterValue,
      SkillFilterValue,
      locationFilterValue,
      jobSwapFilterValue,
      search,
      currentPage,
      recordsPerPage,
      columnName,
      sortOrder
    );
    setjobData(userData.data.data);
    setTotalData(userData.data.total_rows);

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
  const CategoryType = Categorylist.filter(
    (thing, index, self) =>
      index === self.findIndex((t) => t.category_type === thing.category_type)
  );
  /*Job type array to filter*/
  const JobType = jobData.filter(
    (thing, index, self) =>
      index === self.findIndex((t) => t.job_type === thing.job_type)
  );
  /*Skill type array to filter*/
  const SkillType = jobData.filter(
    (thing, index, self) =>
      index === self.findIndex((t) => t.skill === thing.skill)
  );
  /*Location type array to filter*/
  const LocationType = jobData.filter(
    (thing, index, self) =>
      index === self.findIndex((t) => t.Location === thing.Location)
  );

  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader />
        {/* <!-- navbar- --> */}
        <AdminSidebar />
        <ToastContainer />
        <div
          className={
            showJobDetails === false
              ? "dashboard-main-container mt-24"
              : "d-none"
          }
          id="dashboard-body"
        >
          <div className="container">
            <div className="mb-18">
              <div className="mb-8 align-items-center">
                <div className="">
                  <h3 className="font-size-6 mb-0">Posted Jobs </h3>
                </div>
                <div className="row">
                  <div className="col-xl-3 col-md-6 ">
                    <p className="font-size-4 mb-0 mr-6 py-2">
                      Search by name :
                    </p>
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
                  <div className="col-xl-3 col-md-6 ">
                    <p className="font-size-4 mb-0 mr-6 py-2">
                      Filter by Category:
                    </p>
                    <div className="h-px-48">
                      <select
                        name="country"
                        id="country"
                        value={categoryFilterValue}
                        onChange={onCategoryFilterChange}
                        className=" nice-select pl-7 h-100 arrow-3 arrow-3-black w-100 font-weight-semibold text-black-2"
                      >
                        <option value="">Select category</option>
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
                  <div className="col-xl-3 col-md-6 ">
                    <p className="font-size-4 mb-0 mr-6 py-2">
                      Filter by Job Swap:
                    </p>
                    <div className="h-px-48">
                      <select
                        name="country"
                        id="country"
                        value={jobSwapFilterValue}
                        onChange={onJobSwapFilterChange}
                        className=" nice-select pl-7 h-100 arrow-3 arrow-3-black w-100 font-weight-semibold text-black-2"
                      >
                        <option value="">SelectJob type</option>
                        {(JobType || []).map((job) => (
                          <option key={job.job_id} value={job.job_type}>
                            {job.job_type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6 ">
                    <p className="font-size-4 mb-0 mr-6 py-2">
                      Filter by Key skill:
                    </p>
                    <div className="h-px-48">
                      <select
                        name="country"
                        id="country"
                        value={SkillFilterValue}
                        onChange={onSkillFilterChange}
                        className=" nice-select pl-7 h-100 arrow-3 arrow-3-black w-100 font-weight-semibold text-black-2"
                      >
                        <option value="">Select Skill</option>{" "}
                        {(SkillType || []).map((data) => {
                          return (
                            <option value={data.skill} key={data.job_id}>
                              {data.skill}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <p className="font-size-4 mb-0 mr-6 py-2">
                      Filter by Location:
                    </p>
                    <div className="h-px-48">
                      <select
                        name="country"
                        id="country"
                        value={locationFilterValue}
                        onChange={onLocationFilterChange}
                        className=" nice-select pl-7 h-100 arrow-3 arrow-3-black w-100 font-weight-semibold text-black-2"
                      >
                        <option value="">Select location</option>{" "}
                        {(LocationType || []).map((data) => {
                          return (
                            <option value={data.location} key={data.job_id}>
                              {data.location}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="text-end col-xl-9">
                    <div className="float-md-right mt-6 mt-xl-12">
                      <CustomButton
                        className="font-size-3 rounded-3 btn btn-primary border-0"
                        onClick={() => editJob("0")}
                      >
                        Add Job
                      </CustomButton>
                      <AddJobModal
                        show={showAddJobsModal}
                        jobdata={JobId}
                        close={() => setShowAddJobsModal(false)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white shadow-8 pt-7 rounded pb-9 px-5">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          <Link onClick={sortByNameClick} className="text-gray">
                            Job title / Industry{" "}
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
                            Job Type{" "}
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
                            Education{" "}
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
                            Salary{" "}
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
                            Experience{" "}
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
                          <th></th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th>No Data Found</th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th></th>
                        </tr>
                      ) : (
                        (jobData || []).map((job) => (
                          <tr
                            className="border border-color-2"
                            key={job.job_id}
                          >
                            <th scope="row" className=" border-0 py-7 ">
                              <div className="">
                                <Link
                                  to={""}
                                  onClick={() => JobDetail(job.job_id)}
                                  className="font-size-3 mb-0 font-weight-semibold text-black-2"
                                >
                                  {job.job_title} ({job.industry_type})
                                </Link>
                              </div>
                            </th>
                            <th className=" py-7">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {job.employement} - {job.job_type}
                              </h3>
                            </th>
                            <th className=" py-7">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {job.location}
                              </h3>
                            </th>
                            <th className=" py-7 ">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {job.education}
                              </h3>
                            </th>
                            <th className=" py-7 ">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {job.keyskill}
                              </h3>
                            </th>
                            <th className=" py-7 ">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {job.language}
                              </h3>
                            </th>
                            <th className=" py-7 ">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {job.salary}
                              </h3>
                            </th>
                            <th className=" py-7 ">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {job.experience_required}
                              </h3>
                            </th>
                            <th className=" py-7 ">
                              <h3 className="font-size-3 font-weight-bold text-black-2 mb-0">
                                {job.total_applicants}
                              </h3>
                            </th>
                            <th className=" py-7 min-width-px-100">
                              <Link to="" onClick={() => editJob(job.job_id)}>
                                <span className=" fas fa-edit text-gray px-5"></span>
                              </Link>
                              <Link to="" onClick={() => ShowDeleteAlert(job)}>
                                <span className=" text-danger">
                                  <i className="fa fa-trash"></i>
                                </span>
                              </Link>
                            </th>
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
          <div className="dashboard-main-container mt-24 ">
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

export default Job;
