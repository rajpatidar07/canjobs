import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../common/button";
import JobDetailsBox from "../common/jobdetail";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import AddJobModal from "../forms/employer/job";
import { getAllJobs } from "../../api/api";
import className from "../json/filterjson";
function Job() {
  let [showAddJobsModal, setShowAddJobsModal] = useState(false);
  let [showJobDetails, setShowJobDetails] = useState(false);
  const [jobData, setjobData] = useState([]);
  const [JobId, setJobId] = useState([]);

  /* Function to get Job data*/
  const JobData = async () => {
    const userData = await getAllJobs();
    setjobData(userData);
  };

  /*Render function to get the job */
  useEffect(() => {
    JobData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("user_id")]);
  // console.log(("userData--" + JSON.stringify(jobData)))

  /* Function to show the single data to update job category*/
  const editJob = (e) => {
    // e.preventDefault();
    setShowAddJobsModal(true);
    setJobId(e);
  };
  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader />
        {/* <!-- navbar- --> */}
        <AdminSidebar />
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
                  <h3 className="font-size-6 mb-0">
                    Posted Jobs ({jobData.length})
                  </h3>
                </div>
                <div className="col-lg-6">
                  <div className="d-flex flex-wrap align-items-center justify-content-lg-end">
                    <p className="font-size-4 mb-0 mr-6 py-2">
                      Filter by Job type:
                    </p>
                    <div className="h-px-48">
                      <select
                        name="country"
                        id="country"
                        className=" nice-select pl-7 h-100 arrow-3 arrow-3-black min-width-px-273 font-weight-semibold text-black-2"
                      >
                        {" "}
                        {(className.job_type || []).map((data, i) => {
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
                      onClick={() => setShowAddJobsModal(true)}
                    >
                      Add Job
                    </CustomButton>
                    <AddJobModal
                      show={showAddJobsModal}
                      jobData={JobId}
                      close={() => setShowAddJobsModal(false)}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white shadow-8 pt-7 rounded pb-9 px-11">
                <div className="table-responsive ">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          Job title / Industry
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          Job Type
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          Address
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          Education
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          Skills
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          Language
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          Salary
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          Experience
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          Total Vacancy
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
                      {(jobData || []).map((jobdata) => (
                        <tr
                          className="border border-color-2"
                          key={jobdata.job_id}
                        >
                          <th scope="row" className=" border-0 py-7 ">
                            <div className="">
                              <Link
                                to={""}
                                onClick={() => setShowJobDetails(true)}
                                className="font-size-3 mb-0 font-weight-semibold text-black-2"
                              >
                                {jobdata.job_title} ({jobdata.industry_type})
                              </Link>
                            </div>
                          </th>
                          <th className=" py-7">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {jobdata.employement} - {jobdata.job_type}
                            </h3>
                          </th>
                          <th className=" py-7">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {jobdata.location}
                            </h3>
                          </th>
                          <th className=" py-7 ">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {jobdata.education}
                            </h3>
                          </th>
                          <th className=" py-7 ">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {jobdata.keyskill}
                            </h3>
                          </th>
                          <th className=" py-7 ">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {jobdata.language}
                            </h3>
                          </th>
                          <th className=" py-7 ">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {jobdata.salary}
                            </h3>
                          </th>
                          <th className=" py-7 ">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {jobdata.experience_required}
                            </h3>
                          </th>
                          <th className=" py-7 ">
                            <h3 className="font-size-3 font-weight-bold text-black-2 mb-0">
                              47
                            </h3>
                          </th>
                          <th className=" py-7 min-width-px-100">
                            <Link to="" onClick={(jobdata) => editJob(jobdata)}>
                              <span className=" fas fa-edit text-gray px-5">
                                {" "}
                              </span>
                            </Link>
                            <Link to="">
                              <span className=" text-danger">
                                {" "}
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
                  <nav aria-label="Page navigation example">
                    <ul className="pagination pagination-hover-primary rounded-0 ml-n2">
                      <li className="page-item rounded-0 flex-all-center">
                        <Link
                          to={""}
                          className="page-link rounded-0 border-0 px-3active"
                          aria-label="Previous"
                        >
                          <i className="fas fa-chevron-left"></i>
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          to={""}
                          className="page-link border-0 font-size-3 font-weight-semibold px-3"
                        >
                          1
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          to={""}
                          className="page-link border-0 font-size-3 font-weight-semibold px-3"
                        >
                          2
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          to={""}
                          className="page-link border-0 font-size-3 font-weight-semibold px-3"
                        >
                          3
                        </Link>
                      </li>
                      <li className="page-item disabled">
                        <Link
                          to={""}
                          className="page-link border-0 font-size-3 font-weight-semibold px-3"
                        >
                          ...
                        </Link>
                      </li>
                      <li className="page-item ">
                        <Link
                          to={""}
                          className="page-link border-0 font-size-3 font-weight-semibold px-3"
                        >
                          7
                        </Link>
                      </li>
                      <li className="page-item rounded-0 flex-all-center">
                        <Link
                          to={""}
                          className="page-link rounded-0 border-0 px-3"
                          aria-label="Next"
                        >
                          <i className="fas fa-chevron-right"></i>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
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
