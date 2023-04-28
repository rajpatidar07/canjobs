import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GetAllJobs } from "../../api/api";
import AddJobModal from "../forms/employer/job";
function JobBox({ showAddJobModal, handleIdClick }) {
  /*Functionality to get the data to search the jobs */
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search");
  const country = searchParams.get("country");

  let [showAddJobsModal, setShowAddJobsModal] = useState(false);
  let [jobData, setjobData] = useState([]);
  const [JobId, setJobId] = useState([]);
  let [noData, setNoData] = useState("");
  const user_type = localStorage.getItem("userType");

  /* Function to get Job data*/
  const JobData = async () => {
    const userData = await GetAllJobs(search, country);
    if (userData.data.data.length === 0) {
      setjobData([]);
    } else {
      setjobData(userData.data.data);
      setNoData(userData.data.total_rows);
    }
  };
  useEffect(() => {
    JobData();
  }, [showAddJobsModal, showAddJobModal]);

  return (
    <>
      <div
        className="col-xxl-12 col-xl-12 col-lg-12 mb-8 pb-5 job_box p-0"
        data-aos="fade-right"
        data-aos-duration="800"
        data-aos-once="true"
      >
        {/* <!-- Maped Job --> */}
        {noData === 0 ? (
          <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 text-center">
            <h4>No Data Found</h4>
          </div>
        ) : (
          (jobData || []).map((job) => (
            <Link
              key={job.job_id}
              onClick={() => handleIdClick(job.job_id)}
              className="pt-9 w-100 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 my-5 hover-border-green"
            >
              {job.job_type === "swap" ? (
                <span className="job_swap_label">SWAP</span>
              ) : null}
              <div className="row job_header m-0">
                <div className="media align-items-center company_box col-md-6 p-0">
                  <div className="text_box text-left" to={"/jobdetail"}>
                    <img
                      className="company_logo"
                      src={
                        job.logo
                          ? job.logo
                          : "https://findlogovector.com/wp-content/uploads/2018/12/huggies-brand-logo-vector.png"
                      }
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
                      <span className="font-weight-semibold">{job.salary}</span>
                    </li>
                  </ul>
                </div>
              </div>
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
                      <Link
                        className="btn btn-secondary text-uppercase font-size-3"
                        onClick={() => {
                          setJobId(job.job_id);
                          setShowAddJobsModal(true);
                        }}
                      >
                        Edit
                      </Link>
                    </>
                  ) : (
                    <Link>
                      <Link
                        className="btn btn-secondary text-uppercase font-size-3"
                        onClick={() => undefined}
                      >
                        Apply
                      </Link>
                    </Link>
                  )}
                </div>
              </div>
            </Link>
          ))
        )}
        {/* <!-- End Maped Job --> */}
      </div>{" "}
      <AddJobModal
        show={showAddJobsModal}
        jobdata={JobId}
        close={() => setShowAddJobsModal(false)}
      />
    </>
  );
}
export default JobBox;
