import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GetAllJobs, ApplyJob } from "../../api/api";
import AddJobModal from "../forms/employer/job";
import EmployeeLoginModal from "../user/login";
import { toast } from "react-toastify";
function JobBox({
  showAddJobModal,
  categoryFilterValue,
  SkillFilterValue,
  jobSwapFilterValue,
  locationFilterValue,
  jobLocation,
  apiCall,
  // setCategoryFilterValue,
  // setSkillFilterValue,
  // setJobSwapFilterValue,
  // setJobLocation,

}) {
  /*States */
  let [ApiCall, setApiCall] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  let [showAddJobsModal, setShowAddJobsModal] = useState(false);
  let [jobData, setjobData] = useState([]);
  const [JobId, setJobId] = useState([]);
  let [noData, setNoData] = useState("");

  /*Data from local storage */
  const token = localStorage.getItem("token");
  const user_type = localStorage.getItem("userType");
  const user_id = localStorage.getItem("employee_id");

  /*Functionality to get the data to search the jobs */
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search");
  const country = searchParams.get("country");
  const category = searchParams.get("category");
  const path = location.pathname;
  // console.log("search =>",search,"country =>",country,"category =>",category)
  // {console.log("categoryFilterValue =>",categoryFilterValue , "SkillFilterValue =>", SkillFilterValue ,
  // "jobSwapFilterValue =>",jobSwapFilterValue)}
  // /* Function to get Job data*/
  const JobData = async () => {
    const userData = await GetAllJobs(
      search,
      path === "/jobs" || path === "/managejobs" || path === "/response"  ? jobLocation : country,
      path === "/jobs" || path === "/managejobs" || path === "/response"  ? categoryFilterValue : category  ,
      SkillFilterValue,
      jobSwapFilterValue
    );
    if (userData.data.data.length === 0) {
      setjobData([]);
    } else {
      setjobData(userData.data.data);
      setNoData(userData.data.total_rows);
    }
  };

  /*Render Function */
  useEffect(() => {
    JobData();
  }, [
    showAddJobsModal,
    showAddJobModal,
    categoryFilterValue,
    SkillFilterValue,
    jobSwapFilterValue,
    locationFilterValue,
    apiCall,
    ApiCall,
    search,
    country,
    category,
    jobLocation
  ]);

  /*FUnction to apply to the job */
  const OnApplyClick = async (status, job_id) => {
    let Response = await ApplyJob(job_id, user_id, status);
    if (Response.message === "Job applied successfully") {
      toast.success("Job Applied successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    }
    if (Response.message === "already applied on this job") {
      toast.success("Already applied on this job", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    }
    setApiCall(true);
  };
  // let onReset = () => {
  //   setCategoryFilterValue("");
  //   setSkillFilterValue("");
  //  setJobSwapFilterValue("");
  // setJobLocation("");
  // }
  return (
    <>
      <div
        className="col-xxl-12 col-xl-12 col-lg-12 mb-8 pb-5 job_box"
        data-aos="fade-right"
        data-aos-duration="800"
        data-aos-once="true"
      >
        {/* <!-- Maped Job --> */}
        {noData === 0 || noData === "" ? (
          <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 text-center">
            <h4>No Data Found</h4>
          </div>
        ) : (
          (jobData || []).map((job , i) => (
            <div
              key={i}
              className="pt-9 w-100 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 my-5 hover-border-green main_job_box_"
            >
              <Link
                to={token && ( user_type === "user" || user_type === "company") ? "/jobdetail" : "" }
                onClick={
                  token && user_type === "user"
                    ? job.is_applied === "0"
                      ? () => {
                          localStorage.setItem("jobId", job.job_id);
                          OnApplyClick(1, job.job_id);
                        }
                      : null
                    : () => setShowLogin(true)
                }
              >
                {job.job_type === "swap" ? (
                  <span className="job_swap_label">SWAP</span>
                ) : null}
                <div className="row job_header m-0">
                  <div className="media align-items-center company_box col-md-6 p-0">
                    <div className="text_box text-left">
                      <img
                        className="company_logo"
                        src={job.logo ? job.logo : "image/logo-main-black.png"}
                        alt=""
                      />
                    </div>
                    <div className="text_box text-left w-100">
                      <p className="font-size-3 text-default-color line-height-2 m-0">
                        {job.company_name}
                      </p>
                      <h3 className="mb-0 font-size-6 heading-dark-color">
                        {job.job_title}
                      </h3>
                    </div>
                  </div>
                  <div className="col-md-6 p-0">
                    <ul className="d-flex list-unstyled mr-n3 flex-wrap mr-n8 justify-content-md-end">
                      <li
                        className="mt-2 mr-8 font-size-small text-black-2 d-flex"
                        title="Job Category"
                      >
                        <span className="mr-4">
                          <img
                            src="image/svg/icon-loaction-pin-black.svg"
                            alt=""
                          />
                        </span>
                        <span className="font-weight-semibold">
                          {job.industry_type}
                        </span>
                      </li>
                      <li
                        className="mt-2 mr-8 font-size-small text-black-2 d-flex"
                        title="Location"
                      >
                        <span className="mr-4">
                          <img
                            src="image/svg/icon-loaction-pin-black.svg"
                            alt=""
                          />
                        </span>
                        <span className="font-weight-semibold">
                          {job.location}
                        </span>
                      </li>
                      <li
                        className="mt-2 mr-8 font-size-small text-black-2 d-flex"
                        title="Job Type"
                      >
                        <span className="mr-4">
                          <img src="image/svg/icon-suitecase.svg" alt="" />
                        </span>
                        <span className="font-weight-semibold">
                          {job.employement}
                        </span>
                      </li>
                      <li
                        className="mt-2 mr-8 font-size-small text-black-2 d-flex"
                        title="Posted Time"
                      >
                        <span className="mr-4">
                          <img src="image/svg/icon-clock.svg" alt="" />
                        </span>
                        <span className="font-weight-semibold">
                          {moment(job.created_at).format("YYYY-MM-DD")}
                        </span>
                      </li>
                      <li
                        className="mt-2 mr-8 font-size-small text-black-2 d-flex"
                        title="Salary"
                      >
                        <span className="mr-4">
                          <img src="image/svg/icon-clock.svg" alt="" />
                        </span>
                        <span className="font-weight-semibold">
                          {job.salary}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Link>
              <div className="row pt-4">
                <div className="col-md-12 text-left">
                  <p>{job.job_description}</p>
                </div>
                <div className="col-md-8">
                  <ul className="d-flex list-unstyled mr-n3 flex-wrap">
                    <li>
                      <span
                        to={""}
                        className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                      >
                        {job.keyskill}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="media justify-content-md-end col-md-4">
                  {user_type === "company" ? (
                    <>
                      <button
                        className="btn btn-secondary text-uppercase font-size-3"
                        onClick={() => {
                          setJobId(job.job_id);
                          setShowAddJobsModal(true);
                        }}
                      >
                        Edit
                      </button>
                    </>
                  ) : (
                    <button
                      className={
                        job.is_applied === "0"
                          ? "btn btn-secondary text-uppercase font-size-3"
                          : "btn btn-info text-uppercase font-size-3"
                      }
                      onClick={() =>
                        token && user_type === "user"
                          ? OnApplyClick(0, job.job_id)
                          : setShowLogin(true)
                      }
                      disabled={job.is_applied === "0" ? false : true}
                    >
                      {job.is_applied === "0" ? "Apply" : "Applied"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        {/* <!-- End Maped Job --> */}
      </div>
      {showLogin ? (
        <EmployeeLoginModal
          show={showLogin}
          close={() => setShowLogin(false)}
        />
      ) : null}
      {showAddJobsModal ? (
        <AddJobModal
          show={showAddJobsModal}
          jobdata={JobId}
          close={() => setShowAddJobsModal(false)}
          setApiCall={setApiCall}
          apiCall={ApiCall}
        />
      ) : null}
    </>
  );
}
export default JobBox;
