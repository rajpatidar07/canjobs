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
import FilterJson from "../json/filterjson";
import JobTable from "../common/jobTable";

function Job() {
  /*show Modal and props state */
  let [showAddJobsModal, setShowAddJobsModal] = useState(false);
  let [showJobDetails, setShowJobDetails] = useState(false);
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
  const [company, setCompany] = useState("");
  const [Categorylist, setCategoryList] = useState([]);

  // if (userData.message === "No data found") {
  // //console.log((userData.status);
  // }
  /*Render function to get the job */
  useEffect(() => {
    CategoryData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    categoryFilterValue,
    SkillFilterValue,
    locationFilterValue,
    jobSwapFilterValue,
    showAddJobsModal,
    search,
    company,
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

  /* Function to get the job category data*/
  const CategoryData = async () => {
    const userData = await getAllJobsCategory();
    setCategoryList(userData.data);
  };

  /*Category type array to filter*/
  const CategoryType = Categorylist.filter(
    (thing, index, self) =>
      index === self.findIndex((t) => t.category_type === thing.category_type)
  );
  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader heading={"Manage Jobs"} />
        {/* <!-- navbar- --> */}
        <AdminSidebar heading={"Manage Jobs"} />
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
                    <p className="input_label">Search by Job:</p>
                    <input
                      required
                      type="text"
                      className="form-control w-100"
                      placeholder={"Search Job"}
                      value={search}
                      name={"name"}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>{" "}
                  <div className="col-xl-3 col-md-6  form_control mb-5 mt-4">
                    <p className="input_label">Search by Company:</p>
                    <input
                      required
                      type="text"
                      className="form-control w-100"
                      placeholder={"Search Job by company"}
                      value={company}
                      name={"compnay_name"}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                  <div className="col-xl-3 col-md-6  form_control mb-5 mt-4">
                    <p className="input_label">Filter by Category:</p>
                    <div className="select_div">
                      <select
                        name="country"
                        id="country"
                        value={categoryFilterValue}
                        onChange={(e) => setCategoryFilterValue(e.target.value)}
                        className=" form-control"
                      >
                        <option value="">Select Category</option>
                        {(CategoryType || []).map((data) => {
                          return (
                            <option
                              value={data.job_category_id}
                              key={data.category_type}
                            >
                              {data.category_type}
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
                        onChange={(e) => {
                          setJobSwapFilterValue(e.target.value);
                        }}
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
                        onChange={(e) => setSkillFilterValue(e.target.value)}
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
                        onChange={(e) => setLocationFilterValue(e.target.value)}
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
                  <div className="text-end col-xl-12">
                    <div className="float-md-right">
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
              <JobTable
                search={search}
                jobSwapFilterValue={jobSwapFilterValue}
                locationFilterValue={locationFilterValue}
                SkillFilterValue={SkillFilterValue}
                categoryFilterValue={categoryFilterValue}
                company={company}
                JobDetail={JobDetail}
              />
              {/* <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-9 px-5">
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
                    <tbody> */}
              {/* Map function to show the data in the list*/}
              {/* {totalData === 0 ? (
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
                          <tr className="" key={job.job_id}>
                            <th scope="row" className="py-5 ">
                              <div className="">
                                <Link
                                  to={""}
                                  onClick={() => JobDetail(job.job_id)}
                                  className="font-size-3 mb-0 font-weight-semibold text-black-2"
                                >
                                  {job.job_title} {job.company_name}(
                                  {job.industry_type})
                                </Link>
                              </div>
                            </th>
                            <th className=" py-5">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {job.employement} - {job.job_type}
                              </h3>
                            </th>
                            <th className=" py-5">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {job.location}
                              </h3>
                            </th>
                            <th className="py-5 ">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {job.education}
                              </h3>
                            </th>
                            <th className="py-5 ">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate">
                                {job.keyskill}
                              </h3>
                            </th>
                            <th className="py-5 ">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate">
                                {job.language}
                              </h3>
                            </th>
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
                            <th className="py-5 min-width-px-100">
                              <div
                                className="btn-group button_group"
                                role="group"
                              >
                                <button
                                  className="btn btn-outline-info action_btn"
                                  onClick={() => editJob(job.job_id)}
                                >
                                  <span className=" fas fa-edit text-gray"></span>
                                </button>
                                <button
                                  className="btn btn-outline-info action_btn"
                                  onClick={() => ShowDeleteAlert(job)}
                                >
                                  <span className=" text-danger">
                                    <i className="fa fa-trash"></i>
                                  </span>
                                </button>
                              </div>
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
              </div> */}
            </div>
          </div>
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

export default Job;
