import React, { useState } from "react";
import { BiBriefcase } from "react-icons/bi";
// import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GrClose } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { MdOutlinePayments } from "react-icons/md"
import moment from "moment";
import SAlert from "../sweetAlert";
const JobDetailLeftCardBox = ({
  token,
  OnApplyClick,
  jobData,
  setJobId,
  user_type
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [applyAlert, setApplyAlert] = useState(false);

  let navigate = useNavigate()
  // Handle scroll event
  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    if (scrollTop > 50) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };
  let skills = jobData?.keyskill?.split(",")
  return (
    <div className="jobsearch-RightPane">
      <div>
        <div>
          <button className="jobsearch-ClosableViewJobPage-button-close css-1ge0ifo e8ju0x51" aria-label="Close job details"
            onClick={() => setJobId("")}>
            <GrClose />
          </button>
          <div className="fastviewjob jobsearch-ViewJobLayout--embedded css-1s5gqtr eu4oa1w0 hydrated">
            <div className="jobsearch-JobComponent css-17riagq eu4oa1w0" style={{ height: "520px" }}>

              <div className={`jobsearch-HeaderContainer css-n78gek eu4oa1w0 border-bottom pb-5 shadow-sm `}>
                <div className="jobsearch-InfoHeaderContainer css-1toufe4 eu4oa1w0">
                  {/* <div className={`"jobsearch-JobInfoHeader-headerImageContainerEji jobsearch-JobInfoHeader-headerImageContainerEjiFull css-l73gvc eu4oa1w0"${isVisible ? "visible" : "hidden"
                    }`}
                    style={{
                      position: "absolute",
                      top: !isVisible ? "-80%" : 0,
                      right: 0,
                      transition: "0.5s",
                      left: 0,
                      width: "100%",
                    }} data-testid="jobsearch-HeaderImageContainer">
                    <img src="image/00logo-main-black.png" alt="National Bank of Canada logo" className="jobsearch-JobInfoHeader-headerImage css-p96z1s eu4oa1w0" />
                    <img src={jobData?.logo ? jobData?.logo : "https://macsnh.org/wp-content/uploads/2019/08/demo-logo-black.png"} alt="National Bank of Canada logo" className="bg-white jobsearch-JobInfoHeader-logo jobsearch-JobInfoHeader-logo-overlay-lower css-1er9dh7 eu4oa1w0 " data-testid="jobsearch-JobInfoHeader-logo-overlay-lower" />
                  </div> */}
                  <div className="mx-5" style={{ fontSize: !isVisible ? "15px" : "inherit", transition: "0.5s", }}>
                    <div className={` ${isVisible ? "jobsearch-JobInfoHeader-title-container " : "mt-5"} jobsearch-JobInfoHeader-title-containerEji css-82ysm6 eu4oa1w0 `}>
                      {jobData?.job_title && <h2
                        className={`jobsearch-JobInfoHeader-title css-1t78hkx text-capitalize`}
                        lang="en"
                        dir="ltr"
                        data-testid="jobsearch-JobInfoHeader-title"
                        style={{ fontSize: !isVisible ? "18px" : "", transition: "0.5s", }} // Example for specific elements
                      >
                        <span>{jobData?.job_title}</span>
                      </h2>}
                      <p>
                        {jobData?.company_name && <u className="lead text-capitalize" style={{ fontSize: !isVisible ? "15px" : "", transition: "0.5s", filter: 'blur(5px)' }}>{jobData?.company_name}</u>}
                        {/* {isVisible && (
                          <span style={{ fontSize: "inherit" }}>
                            3.9 <FaStar className="mb-2" />
                          </span>
                        )} */}
                        <br />
                        {jobData?.location && <span style={{ fontSize: !isVisible ? "15px" : "", transition: "0.5s", }} className="text-capitalize">{jobData?.industry_type ? jobData?.industry_type + " ," + jobData?.location : jobData?.location}</span>}
                        {jobData?.job_type && <><br />
                          <span className="text-capitalize" style={{ fontSize: !isVisible ? "15px" : "", transition: "0.5s", }}>{jobData?.job_type}</span></>}
                      </p>
                      <button
                        aria-haspopup="dialog"
                        type="button"
                        contenthtml="Apply now"
                        disclaimer="You must create an Indeed account before continuing to the company website to apply"
                        aria-label="Apply now (opens in a new tab)"
                        style={{ fontSize: isVisible ? "15px" : "", transition: "0.5s", }}
                        className={` ${jobData?.is_applied === "0"
                          ? "btn btn-secondary"
                          : "btn btn-info "} text-uppercase rounded `}
                        onClick={() =>
                          token && user_type === "user"
                            ? setApplyAlert(true)
                            : navigate("/candidate_login")
                        }
                        disabled={jobData?.is_applied !== "0"}>
                        {jobData?.is_applied === "0" ? "Apply now" : "Applied"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Detail part */}
              <div className="mx-5" >
                <div tabIndex="0">
                  <div>
                    <div style={{
                      maxHeight: isVisible ? "320px" : "330px",
                      overflowY: "scroll",
                      transition: "0.5s",
                    }}
                      onScroll={(e) => handleScroll(e)}>
                      <div className="mt-3">
                        <h4>Job Details</h4>
                        {jobData?.salary && <div className="mb-3">
                          <h6><MdOutlinePayments /> <span className="mx-1"> Pay</span></h6>
                          <span className=" badge text-dark mx-7" style={{ backgroundColor: "#f3f2f1" }}>
                            ${jobData?.salary} an hour
                          </span>
                          <br />
                        </div>}
                        {jobData?.job_type && <div className="mb-3">
                          <h6><BiBriefcase /> <span className="mx-1"> Job Type</span></h6>
                          <span className=" badge text-dark mx-7 text-capitalize" style={{ backgroundColor: "#f3f2f1" }}>
                            {jobData?.job_type}
                          </span>
                        </div>}
                      </div>
                      {jobData?.location && <div className="border-top  pb-5">
                        <h2 className="css-1yytfzy mt-5">Location</h2>
                        <div id="jobLocationWrapper" className="css-1u9px01 mx-5">
                          <FaLocationDot />
                          <div id="jobLocationText" className="css-1tlxeot eu4oa1w0">
                            <div data-testid="jobsearch-JobInfoHeader-companyLocation" className="css-45str8 eu4oa1w0">
                              <span>{jobData?.industry_type}{jobData?.industry_type ? " ," + jobData?.location : jobData?.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>}
                      {/* Job description */}
                      {jobData?.job_description && <div className="border-top">
                        <h4 tabIndex="-1" id="jobDescriptionTitleHeading" className="css-wpzt8u mt-5">Full job description</h4>
                      </div>}
                      <div id="jobDescriptionText" className="jobsearch-JobComponent-description css-16y4thd eu4oa1w0">
                        <div>
                          {jobData?.job_description && <p className="card-text mx-5"
                            dangerouslySetInnerHTML={{ __html: jobData?.job_description }}
                          />}
                          {/* Position required */}
                          {/* <p>
                            <h4 id="" className="css-wpzt8u ">Position</h4>
                            <p>CARE support-technical non-student (Full stack software developer)</p>
                          </p> */}
                          {/* Created date */}
                          <div>
                            <h4 id="" className="css-wpzt8u ">Posting period</h4>
                            <p className="mx-5">{moment(jobData?.created_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
                          </div>
                          {/* Pay */}
                          {jobData?.salary && <div>
                            <h4 id="" className="css-wpzt8u ">Pay range</h4>
                            <p className="mx-5">${jobData?.salary} per hour</p>
                          </div>}
                          {/* Languages */}
                          {jobData?.language && <div>
                            <h4 id="" className="css-wpzt8u ">Languages</h4>
                            <p className="mx-5">{jobData?.language} required</p>
                          </div>}
                          {/* Qualifications  experience and skills */}
                          {(jobData?.requirement || jobData?.experience) && <div>
                            <h4 id="" className="css-wpzt8u ">Qualifications</h4>
                            <div className="mx-5">
                              {jobData?.requirement && <p>
                                <b>Requirement</b>
                                <span className="mx-5" dangerouslySetInnerHTML={{ __html: jobData?.requirement }} />
                              </p>}
                              {jobData?.experience_required &&
                                <p>
                                  <b>Experience</b>
                                  <br />
                                  <span className="mx-5">{jobData?.experience_required} years</span>
                                </p>}
                              {jobData?.keyskill &&
                                <div>
                                  <b>Required Skills</b>
                                  <ul className="mx-5">
                                    {(skills || []).map((item, index) =>
                                      <li key={index} style={{ marginBottom: 0 }}>{item}</li>
                                    )}
                                  </ul>
                                </div>}
                            </div>
                          </div>}
                          {/* About company of the job */}
                          <div>
                            <h4 id="" className="css-wpzt8u ">Information about {/*jobData?.company_name*/}

                            </h4>
                            <p className="mx-5"
                              dangerouslySetInnerHTML={{ __html: jobData?.about }}
                            />
                          </div>
                          {/* Acknowledge */}
                          {/* <p>
                            <b>We're putting people first</b>
                            <br />
                            <br />
                            We're a bank on a human scale that stands out for its courage, entrepreneurial culture, and passion for people. Our mission is to have a positive impact on peoples' lives. Our core values of partnership, agility, and empowerment inspire us, and inclusivity is central to our commitments. We offer a barrier-free workplace that is accessible to all employees.
                            <br />
                            <br />
                            We want our recruitment process to be fully accessible. If you require accommodation, feel free to let us know during your first conversations with us. We welcome all candidates! What can you bring to our team?
                            <br />
                            <br /> Come live your ambitions with us!
                          </p> */}
                        </div>
                        <div>
                        </div>
                      </div>
                      <div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SAlert
        show={applyAlert}
        title={jobData?.job_title}
        text="Are you Sure you want to Apply for this job ?"
        onConfirm={() => {
          OnApplyClick(0, jobData?.job_id)
          setApplyAlert(false)
        }}
        showCancelButton={true}
        onCancel={() => setApplyAlert(false)}
      />
    </div>
  );
};

export default JobDetailLeftCardBox;
