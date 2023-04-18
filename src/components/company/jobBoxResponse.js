import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GetAllJobs, GetAllResponse } from "../../api/api";
import moment from "moment";
function JobBoxResponse() {
  const [showTable, setShowTable] = useState(false);
  let [jobData, setjobData] = useState([]);
  const [JobId, setJobId] = useState([]);
  let [noData, setNoData] = useState("");
  // const user_type = localStorage.getItem("userType");
  let Skill = [];
  /* Function to get Job data*/
  const JobData = async () => {
    const userData = await GetAllJobs();
    setjobData(userData.data.data);
    setNoData(userData.data.total_rows);
  };
  /*---- Function to Open response Table on Click ----*/
  const OpenReposnseTable = async (e) => {
    setJobId(e);
    setShowTable(!showTable);
    const userData = await GetAllResponse(JobId);
    // console.log(userData);
  };

  useEffect(() => {
    JobData();
  }, [showTable]);

  return (
    <div
      className="col-xxl-12 col-xl-12 col-lg-12 mb-8 job_box p-0"
      data-aos="fade-right"
      data-aos-duration="800"
      data-aos-once="true"
    >
      {/* <!-- Single Featured Job --> */}
      {noData === 0 ? (
        <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 text-center">
          <h4>No Data Found</h4>
        </div>
      ) : (
        (jobData || []).map((job) => (
          <div
            className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 hover-border-green"
            key={job.job_id}
          >
            <div className="row job_header m-0">
              <div className="media align-items-center company_box col-md-6 p-0">
                <div className="text_box text-left">
                  <img
                    className="company_logo"
                    src={
                      job.logo === null
                        ? "https://findlogovector.com/wp-content/uploads/2018/12/huggies-brand-logo-vector.png"
                        : job.logo
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
                  <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                    <span className="mr-4">
                      <img src="image/svg/icon-loaction-pin-black.svg" alt="" />
                    </span>
                    <span className="font-weight-semibold">{job.location}</span>
                  </li>
                  <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                    <span className="mr-4">
                      <img src="image/svg/icon-suitecase.svg" alt="" />
                    </span>
                    <span className="font-weight-semibold">{job.job_type}</span>
                  </li>
                  <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                    <span className="mr-4">
                      <img src="image/svg/icon-clock.svg" alt="" />
                    </span>
                    <span className="font-weight-semibold">
                      {moment
                        .duration(moment().diff(moment(job.created_at)))
                        .humanize()}
                    </span>
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
                  {job.keyskill
                    ? ((Skill = job.keyskill.split(",")),
                      (Skill || []).map((skill, i) => (
                        <li key={i}>
                          <Link
                            to={""}
                            className="bg-polar mt-2 text-black-2  mr-6 px-7 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                          >
                            {skill}
                          </Link>
                        </li>
                      )))
                    : null}
                </ul>
              </div>

              <div className="media justify-content-md-end col-md-4">
                <Link
                  to={""}
                  className="btn btn-secondary text-uppercase font-size-3"
                  onClick={() => OpenReposnseTable(job.job_id)}
                >
                  View Response
                </Link>
              </div>
            </div>
            {JobId === job.job_id ? (
              <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-8">
                <div className="table-responsive main_table_div">
                  <table className="table table-striped main_data_table">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="text-center border-0 font-size-4 font-weight-normal"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          Applied for
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          Skills
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          Experience
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          Salary
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          Contact
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="">
                        <th scope="row" className="pl-5 py-5 pr-0   ">
                          <div className="media  align-items-center">
                            <div className="circle-36 mx-auto">
                              <img
                                src="https://cdn.vectorstock.com/i/preview-1x/32/12/default-avatar-profile-icon-vector-39013212.webp"
                                alt=""
                                className="w-100"
                              />
                            </div>
                          </div>
                        </th>
                        <th className="border-0 py-5">
                          <h4 className="font-size-3 mb-0 font-weight-semibold text-black-2">
                            Nicolas Bradley
                          </h4>
                        </th>
                        <td className=" py-5 pr-0">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            Senior Project Manager
                          </h3>
                        </td>
                        <td className=" py-5  pr-0">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            JAVA , REACT JS ,HTML and CSS
                          </h3>
                        </td>
                        <td className=" py-5  pr-0">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            4 years
                          </h3>
                        </td>
                        <td className=" py-5  pr-0">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            20,000
                          </h3>
                        </td>
                        <td className=" py-5  pr-0">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            +9632587410
                            <br />
                            email@gmail.com
                          </h3>
                        </td>
                      </tr>
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
                          className="page-link border-0 font-size-4 font-weight-semibold px-3"
                        >
                          1
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          to={""}
                          className="page-link border-0 font-size-4 font-weight-semibold px-3"
                        >
                          2
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          to={""}
                          className="page-link border-0 font-size-4 font-weight-semibold px-3"
                        >
                          3
                        </Link>
                      </li>
                      <li className="page-item disabled">
                        <Link
                          to={""}
                          className="page-link border-0 font-size-4 font-weight-semibold px-3"
                        >
                          ...
                        </Link>
                      </li>
                      <li className="page-item ">
                        <Link
                          to={""}
                          className="page-link border-0 font-size-4 font-weight-semibold px-3"
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
            ) : null}
          </div>
        ))
      )}
      {/* <!-- End Single Featured Job --> */}
    </div>
  );
}

export default JobBoxResponse;
