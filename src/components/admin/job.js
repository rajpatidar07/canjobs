import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../common/button";
import JobDetailsBox from "../common/jobdetail";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import AddJobModal from "../forms/employer/job";
import { GetAllJobs, DeleteJob, getAllJobsCategory } from "../../api/api";
import className from "../json/filterjson";
import { ToastContainer, toast } from "react-toastify";
import SAlert from "../common/sweetAlert";
import FilterJson from "../json/filterjson";
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
  const [columnName, setcolumnName] = useState("");
  const [sortOrder, setSortOrder] = useState("");

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
    // if (userData.message === "No data found")
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
  console.log(columnName, sortOrder);
  // console.log(("userData--" + JSON.stringify(jobData)))

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
  /*<-----Pagination Calculator----> */
  const nPages = Math.ceil(totalData / recordsPerPage);
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
              <div className="row mb-8 align-items-center">
                <div className="col-lg-6 mb-lg-0 mb-4">
                  <h3 className="font-size-6 mb-0">Posted Jobs </h3>
                </div>
                <div className="col-lg-6">
                  <div className="d-flex flex-wrap align-items-center justify-content-lg-end pb-2">
                    <input
                      required
                      type="text"
                      className="form-control col-6"
                      placeholder={"Search Job"}
                      value={search}
                      name={"category_name"}
                      onChange={(e) => onSearch(e)}
                    />
                  </div>
                  <div className="d-flex flex-wrap align-items-center justify-content-lg-end pb-2">
                    <p className="font-size-4 mb-0 mr-6 py-2">
                      Filter by Category:
                    </p>
                    <div className="h-px-48">
                      <select
                        name="country"
                        id="country"
                        value={categoryFilterValue}
                        onChange={onCategoryFilterChange}
                        className=" nice-select pl-7 h-100 arrow-3 arrow-3-black min-width-px-273 font-weight-semibold text-black-2"
                      >
                        <option value="">Select category</option>
                        {(Categorylist || []).map((data, i) => {
                          return (
                            <option
                              value={data.job_category_id}
                              key={data.job_category_id}
                            >
                              {data.category_name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="d-flex flex-wrap align-items-center justify-content-lg-end pb-2">
                    <p className="font-size-4 mb-0 mr-6 py-2">
                      Filter by Job Swap:
                    </p>
                    <div className="h-px-48">
                      <select
                        name="country"
                        id="country"
                        value={jobSwapFilterValue}
                        onChange={onJobSwapFilterChange}
                        className=" nice-select pl-7 h-100 arrow-3 arrow-3-black min-width-px-273 font-weight-semibold text-black-2"
                      >
                        <option value="">SelectJob type</option>
                        {(FilterJson.job_type || []).map((job_type) => (
                          <option key={job_type} value={job_type}>
                            {job_type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="d-flex flex-wrap align-items-center justify-content-lg-end pb-2">
                    <p className="font-size-4 mb-0 mr-6 py-2">
                      Filter by Key skill:
                    </p>
                    <div className="h-px-48">
                      <select
                        name="country"
                        id="country"
                        value={SkillFilterValue}
                        onChange={onSkillFilterChange}
                        className=" nice-select pl-7 h-100 arrow-3 arrow-3-black min-width-px-273 font-weight-semibold text-black-2"
                      >
                        <option value="">Select Skill</option>{" "}
                        {(className.keyskill || []).map((data, i) => {
                          return (
                            <option value={data} key={i}>
                              {data}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="d-flex flex-wrap align-items-center justify-content-lg-end pb-2">
                    <p className="font-size-4 mb-0 mr-6 py-2">
                      Filter by Location:
                    </p>
                    <div className="h-px-48">
                      <select
                        name="country"
                        id="country"
                        value={locationFilterValue}
                        onChange={onLocationFilterChange}
                        className=" nice-select pl-7 h-100 arrow-3 arrow-3-black min-width-px-273 font-weight-semibold text-black-2"
                      >
                        <option value="">Select location</option>{" "}
                        {(className.location || []).map((data, i) => {
                          return (
                            <option value={data} key={i}>
                              {data}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="float-md-right mt-6">
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
              <div className="bg-white shadow-8 pt-7 rounded pb-9 px-11">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          <span className="col-8">Job title / Industry </span>
                          <span className="col-1">
                            <Link
                              to={""}
                              className="row"
                              onClick={() => {
                                setcolumnName("job_title");
                                setSortOrder("ASC");
                              }}
                            >
                              <i className="fas fa-chevron-up"></i>
                            </Link>
                            <Link
                              to={""}
                              className="row"
                              onClick={() => {
                                setcolumnName("job_title");
                                setSortOrder("DESC");
                              }}
                            >
                              <i className="fas fa-chevron-down"></i>
                            </Link>
                          </span>{" "}
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          <span className="col-8">Job Type </span>
                          <span className="col-1">
                            <Link
                              to={""}
                              className="row"
                              onClick={() => {
                                setcolumnName("job_type");
                                setSortOrder("ASC");
                              }}
                            >
                              <i className="fas fa-chevron-up"></i>
                            </Link>
                            <Link
                              to={""}
                              className="row"
                              onClick={() => {
                                setcolumnName("job_type");
                                setSortOrder("DESC");
                              }}
                            >
                              <i className="fas fa-chevron-down"></i>
                            </Link>
                          </span>{" "}
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          <span className="col-8">Address</span>
                          <span className="col-1">
                            <Link
                              to={""}
                              className="row"
                              onClick={() => {
                                setcolumnName("location");
                                setSortOrder("ASC");
                              }}
                            >
                              <i className="fas fa-chevron-up"></i>
                            </Link>
                            <Link
                              to={""}
                              className="row"
                              onClick={() => {
                                setcolumnName("location");
                                setSortOrder("DESC");
                              }}
                            >
                              <i className="fas fa-chevron-down"></i>
                            </Link>
                          </span>{" "}
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          <span className="col-8">Education </span>
                          <span className="col-1">
                            <Link
                              to={""}
                              className="row"
                              onClick={() => {
                                setcolumnName("education");
                                setSortOrder("ASC");
                              }}
                            >
                              <i className="fas fa-chevron-up"></i>
                            </Link>
                            <Link
                              to={""}
                              className="row"
                              onClick={() => {
                                setcolumnName("education");
                                setSortOrder("DESC");
                              }}
                            >
                              <i className="fas fa-chevron-down"></i>
                            </Link>
                          </span>{" "}
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          <span className="col-8">Skills</span>
                          <span className="col-1">
                            <Link
                              to={""}
                              className="row"
                              onClick={() => {
                                setcolumnName("keyskill");
                                setSortOrder("ASC");
                              }}
                            >
                              <i className="fas fa-chevron-up"></i>
                            </Link>
                            <Link
                              to={""}
                              className="row"
                              onClick={() => {
                                setcolumnName("keyskill");
                                setSortOrder("DESC");
                              }}
                            >
                              <i className="fas fa-chevron-down"></i>
                            </Link>
                          </span>{" "}
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          <span className="col-8">Language</span>
                          <span className="col-1">
                            <Link
                              to={""}
                              className="row"
                              onClick={() => {
                                setcolumnName("language");
                                setSortOrder("ASC");
                              }}
                            >
                              <i className="fas fa-chevron-up"></i>
                            </Link>
                            <Link
                              to={""}
                              className="row"
                              onClick={() => {
                                setcolumnName("language");
                                setSortOrder("DESC");
                              }}
                            >
                              <i className="fas fa-chevron-down"></i>
                            </Link>
                          </span>{" "}
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          <span className="col-8">Salary </span>
                          <span className="col-1">
                            <Link
                              to={""}
                              className="row"
                              onClick={() => {
                                setcolumnName("salary");
                                setSortOrder("ASC");
                              }}
                            >
                              <i className="fas fa-chevron-up"></i>
                            </Link>
                            <Link
                              to={""}
                              className="row"
                              onClick={() => {
                                setcolumnName("salary");
                                setSortOrder("DESC");
                              }}
                            >
                              <i className="fas fa-chevron-down"></i>
                            </Link>
                          </span>{" "}
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          <span className="col-8">Experience </span>
                          <span className="col-1">
                            <Link
                              to={""}
                              className="row"
                              onClick={() => {
                                setcolumnName("experience_required");
                                setSortOrder("ASC");
                              }}
                            >
                              <i className="fas fa-chevron-up"></i>
                            </Link>
                            <Link
                              to={""}
                              className="row"
                              onClick={() => {
                                setcolumnName("experience_required");
                                setSortOrder("DESC");
                              }}
                            >
                              <i className="fas fa-chevron-down"></i>
                            </Link>
                          </span>{" "}
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          Total Vacancy{" "}
                          <span className="col-8">Total Vacancy </span>
                          {/* <span className="col-1">
                            <Link
                              to={""}
                              className="row"
                              onClick={() => {
                                setcolumnName("job_title");
                                setSortOrder("ASC");
                              }}
                            >
                              <i className="fas fa-chevron-up"></i>
                            </Link>
                            <Link
                              to={""}
                              className="row"
                              onClick={() => {
                                setcolumnName("job_title");
                                setSortOrder("DESC");
                              }}
                            >
                              <i className="fas fa-chevron-down"></i>
                            </Link>
                          </span>{" "} */}
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
                      {(jobData || []).map((job) => (
                        <tr className="border border-color-2" key={job.job_id}>
                          <th scope="row" className=" border-0 py-7 ">
                            <div className="">
                              <Link
                                to={""}
                                onClick={() => setShowJobDetails(true)}
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
                              47
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
                      ))}
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
                <JobDetailsBox />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Job;
