import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetJobDetail } from "../../api/api";
import moment from "moment";
// eslint-disable-next-line
function JobDetailPage(props) {
  let [jobDetatilsData, setJobDetailsData] = useState("");
  let skill = [];
  /*Function to get job details data*/
  const JobData = async () => {
    let userData = await GetJobDetail(props.jobdata);
    if (props.jobdata !== undefined && props.jobdata !== "0") {
      setJobDetailsData(userData.data.data[0]);
    }
  };
  /*Render method to get job detail data */
  useEffect(() => {
    JobData();
  });
  /*Set skill variable to array frm string */
  if (jobDetatilsData !== "") {
    skill = jobDetatilsData.keyskill.split(",");
  }
  return (
    <div className=" bg-white rounded-4 border border-mercury shadow-9  overflow-y-scroll mt-9 mt-xl-0">
      <div className="pt-9 pl-sm-9 pl-5 pr-sm-9 pr-5 pb-8 border-bottom border-width-1 border-default-color light-mode-texts">
        <div className="row">
          <div className="col-12">
            {/* <!-- media start --> */}
            <div className="media align-items-center company_box col-md-6 p-0">
              <Link className="text_box text-left" to="">
                <img
                  className="company_logo"
                  src="https://findlogovector.com/wp-content/uploads/2018/12/huggies-brand-logo-vector.png"
                  alt=""
                />
              </Link>
              <Link className="text_box text-left w-100" to="">
                <p
                  href=""
                  className="font-size-3 text-default-color line-height-2 m-0"
                >
                  {jobDetatilsData.job_title}
                </p>
                <h3 className="mb-0 font-size-6 heading-dark-color">
                  {jobDetatilsData.department}
                </h3>
              </Link>
            </div>
            {/* <!-- media end --> */}
          </div>
        </div>
        {/* <div className="row pt-9">
                          <div className="col-12">
                            <div className="card-btn-group">
                              <Link to={''}
                                className="btn btn-green text-uppercase btn-medium rounded-3 w-180 mr-4 mb-5"
                                href="#"
                              >
                                Apply to this job
                              </Link>
                              <Link to={''}
                                className="btn btn-outline-mercury text-black-2 text-uppercase h-px-48 rounded-3 mb-5 px-5"
                                href="#"
                              >
                                <i className="icon icon-bookmark-2 font-weight-bold mr-4 font-size-4"></i>{" "}
                                Save job
                              </Link>
                            </div>
                          </div>
                        </div> */}
      </div>
      <div className="job-details-content pt-8 pl-sm-9 pl-6 pr-sm-9 pr-6 pb-10 border-bottom border-width-1 border-default-color light-mode-texts">
        <div className="row mb-5">
          <div className="col-md-12">
            <div className="media justify-content-md-start mb-6">
              <div className="image mr-5">
                <img src="image/svg/icon-location.svg" alt="" />
              </div>
              <p className="font-size-5 text-gray mb-0">
                {jobDetatilsData.location}
              </p>
            </div>
          </div>
          {jobDetatilsData.salary !== "0" ? (
            <div className="col-md-6">
              <div className="media justify-content-md-start mb-6">
                <>
                  <div className="image mr-5">
                    <img src="image/svg/icon-dolor.svg" alt="" />
                  </div>
                  <p className="font-weight-semibold font-size-5 text-black-2 mb-0">
                    {jobDetatilsData.salary}
                  </p>{" "}
                </>
              </div>
            </div>
          ) : null}
          <div className="col-md-6">
            <div className="media justify-content-md-start mb-md-0 mb-6">
              <div className="image mr-5">
                <img src="image/svg/icon-briefcase.svg" alt="" />
              </div>
              <p className="font-weight-semibold font-size-5 text-black-2 mb-0">
                {jobDetatilsData.job_type}
              </p>
            </div>
          </div>
        </div>
        <div className="row text-left">
          <div className="col-md-6">
            <div className="mb-lg-0 mb-10">
              <span className="font-size-4 d-block mb-4 text-gray">
                Type of corporation
              </span>
              <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">
                {jobDetatilsData.corporation}
              </h6>
            </div>
            <div className="tags">
              <p className="font-size-4 text-gray mb-0"> Skill</p>

              <ul className="list-unstyled d-flex align-items-center flex-wrap row">
                {(skill || []).map((skill) => (
                  <li key={skill}>
                    <Link
                      to={""}
                      className="bg-polar text-black-2  mr-6 px-7 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                      href="#"
                    >
                      {skill}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-md-6 mb-lg-0 mb-8">
            <div className="">
              <span className="font-size-4 d-block mb-4 text-gray">
                Career Level
              </span>
              <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">
                Project Manangement
              </h6>
            </div>
          </div>
          <div className="col-md-6">
            <div className="">
              <span className="font-size-4 d-block mb-4 text-gray">
                Company size
              </span>
              <h6 className="font-size-5 text-black-2 font-weight-semibold mb-0">
                {jobDetatilsData.company_size}
              </h6>
            </div>
          </div>
          <div className="col-md-6">
            <div className="">
              <span className="font-size-4 d-block mb-4 text-gray">
                Posted Time
              </span>
              <h6 className="font-size-5 text-black-2 font-weight-semibold mb-0">
                {moment(jobDetatilsData.created_at).format("DD MMMM, YYYY")}
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-8 pl-sm-9 pl-6 pb-10 light-mode-texts">
        <div className="row text-left">
          <div className="col-xxl-12 col-xl-9 pr-xxl-18 pr-xl-0 pr-11">
            <div className="">
              <p className="mb-4 font-size-4 text-gray">Job Description</p>
              <p className="font-size-4 text-black-2 mb-7">
                {jobDetatilsData.job_description}
              </p>
            </div>
            <div className="">
              <span className="font-size-4 font-weight-semibold text-black-2 mb-7">
                Your Role:
              </span>
              <p className="font-size-4 text-black-2 mb-7">
                {jobDetatilsData.your_duties}
              </p>
              <span className="font-size-4 font-weight-semibold text-black-2 mb-7">
                What you will be doing:
              </span>
              <p className="font-size-4 text-black-2 mb-7">
                {jobDetatilsData.about}
              </p>
              {/* <Link
                to={""}
                className="btn btn-green text-uppercase btn-medium w-180 h-px-48 rounded-3 mr-4 mt-6"
                href="#"
              >
                Apply to this job
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetailPage;
