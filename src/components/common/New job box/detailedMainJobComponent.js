import React, { useState, useEffect } from 'react'
import ShortJobBox from './shortJobBox'
import JobDetailLeftCardBox from './jobDetailLeftCard'
import { toast } from 'react-toastify';
import { ApplyJob, GetAllJobs } from '../../../api/api';
import { Link, useLocation } from 'react-router-dom';

export default function DetailedMainJobComponent({
  showAddJobModal,
  categoryFilterValue,
  SkillFilterValue,
  jobSwapFilterValue,
  locationFilterValue,
  jobLocation,
  apiCall,
  setJobCount,
  jobsNo,
  setTotalJob,
  featured,
  column,
  sort_order,
  setJobsNo,
  totaljob,
  jobCount
}) {
  /*States */
  let [ApiCall, setApiCall] = useState(false);
  // const [showLogin, setShowLogin] = useState(false);
  // const [showDataForm, setShowDataForm] = useState(false);
  let [showAddJobsModal, setShowAddJobsModal] = useState(false);
  let [jobData, setjobData] = useState([]);
  const [JobId, setJobId] = useState(0);
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
  // const name = localStorage.getItem("name");
  /* Function to get Job data*/
  const JobData = async () => {
    try {
      const userData = await GetAllJobs(
        search,
        (path === "/jobs" && !country) ||
          path === "/managejobs" ||
          (path === "/response" && !country) ||
          jobLocation
          ? jobLocation
          : country,
        path === "/jobs" ||
          path === "/managejobs" ||
          (path === "/response" && !category)
          ? categoryFilterValue
          : category,
        SkillFilterValue,
        jobSwapFilterValue,
        1,
        jobsNo,
        column,
        sort_order,
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        featured
      );
      if (userData.data.data.length === 0) {
        setjobData([]);
      } else {
        setjobData(userData.data.data);
        setJobCount(userData.data.data.length);
        setTotalJob(userData.data.total_rows);
        // }
        setNoData(userData.data.total_rows);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /*Render Function */
  useEffect(() => {
    JobData();
    //Function to replace the url path after searching Job
    if (search) {
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
    if (ApiCall === true) {
      setApiCall(false);
    }
    // eslint-disable-next-line
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
    jobLocation,
    jobsNo,
  ]);

  /*FUnction to apply to the job */
  const OnApplyClick = async (status, job_id) => {
    try {
      let Response = await ApplyJob(job_id, user_id, status);
      if (Response.message === "Job applied successfully") {
        toast.success("Job Applied successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
      }
      if (Response.message === "already applied on this job") {
        toast.success("Already applied on this job", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
      setApiCall(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="border-top w-100">
    {noData === 0 || noData === "" || jobData.length === 0 ? (
      <div className=" text-center mt-5 mb-10">
        <h4>
          {SkillFilterValue
            ? "No jobs found for your skills"
            : "No jobs found"}
        </h4>
      </div>
    ) : (
      <div className="row mt-5 mb-10">
        <div
          className="col-5"
          style={{
            maxHeight: "calc(100vh - 100px)", // Adjust according to header/footer height
            overflowY: "auto", // Enable scrolling for the left column
          }}
        >
          {(jobData || []).map((job, i) => {
            // Convert the skill string to an array
            let skill = [];
            if (job !== "") {
              skill =
                job.keyskill === null ||
                job.keyskill === undefined ||
                job.keyskill === "undefined"
                  ? []
                  : job.keyskill.split(",");
            }
            return (
              <React.Fragment key={i}>
                <ShortJobBox
                  setJobId={setJobId}
                  job={job}
                  token={token}
                  user_type={user_type}
                  OnApplyClick={OnApplyClick}
                  setShowAddJobsModal={setShowAddJobsModal}
                  skill={skill}
                  i={i}
                />
              </React.Fragment>
            );
          })}
          {jobsNo <= totaljob ? (
            <div className="text-center pt-5 pt-lg-13">
              <Link
                className="text-green font-weight-bold text-uppercase font-size-3 d-flex align-items-center justify-content-center"
                onClick={() => setJobsNo(jobCount + 6)}
              >
                Load More
                <i className="fas fa-sort-down ml-3 mt-n2 font-size-4"></i>
              </Link>
            </div>
          ) : null}
        </div>
        {JobId !== "" && jobData.length > 0 && (
          <div
            className="col-7"
            style={{
              position: "sticky", // Makes the right column sticky
              top: "100px", // Adjust based on the height of your header
              overflowY: "auto", // Enable scrolling within the right column
            }}
          >
            <JobDetailLeftCardBox
              token={token}
              OnApplyClick={OnApplyClick}
              jobData={jobData[JobId]}
              setJobId={setJobId}
              user_type={user_type}
            />
          </div>
        )}
      </div>
    )}
  </div>
  
  )
}
