import React, { useState } from "react";
import { BiBriefcase } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import { MdOutlinePayments } from "react-icons/md"
const JobDetailLeftCardBox = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Handle scroll event
  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    if (scrollTop > 50) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };
  return (
    <div className="jobsearch-RightPane">
      <div>
        <div>
          <button className="jobsearch-ClosableViewJobPage-button-close css-1ge0ifo e8ju0x51" aria-label="Close job details">
            <GrClose />
          </button>
          <div className="fastviewjob jobsearch-ViewJobLayout--embedded css-1s5gqtr eu4oa1w0 hydrated">
            <div className="jobsearch-JobComponent css-17riagq eu4oa1w0" style={{ height: "520px" }}>

              <div className={`jobsearch-HeaderContainer css-n78gek eu4oa1w0 border-bottom pb-5 shadow-sm `}>
                <div className="jobsearch-InfoHeaderContainer css-1toufe4 eu4oa1w0">
                  <div className={`"jobsearch-JobInfoHeader-headerImageContainerEji jobsearch-JobInfoHeader-headerImageContainerEjiFull css-l73gvc eu4oa1w0"${isVisible ? "visible" : "hidden"
                    }`}
                    style={{
                      position: "absolute",
                      top: !isVisible ? "-70%" : 0,
                      right: 0,
                      transition: "0.5s",
                      left: 0,
                      width: "100%",
                    }} data-testid="jobsearch-HeaderImageContainer">
                    <img src="https://d2q79iu7y748jz.cloudfront.net/s/_headerimage/1960x400/6d504529e1ba445aabe7518068baeafc" alt="National Bank of Canada logo" className="jobsearch-JobInfoHeader-headerImage css-p96z1s eu4oa1w0" />
                    <img src="https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/256x256/9b29f519297719e1e75ecddebc6609f1" alt="National Bank of Canada logo" className="jobsearch-JobInfoHeader-logo jobsearch-JobInfoHeader-logo-overlay-lower css-1er9dh7 eu4oa1w0" data-testid="jobsearch-JobInfoHeader-logo-overlay-lower" />
                  </div>
                  <div className="mx-5" style={{ fontSize: !isVisible ? "15px" : "inherit", marginTop: isVisible ? "100px" : 0 }}>
                    <div className={` ${isVisible ? "jobsearch-JobInfoHeader-title-container " : "mt-5"} jobsearch-JobInfoHeader-title-containerEji css-82ysm6 eu4oa1w0 `}>
                      <h2
                        className={`jobsearch-JobInfoHeader-title css-1t78hkx e1tiznh50`}
                        lang="en"
                        dir="ltr"
                        data-testid="jobsearch-JobInfoHeader-title"
                        style={{ fontSize: !isVisible ? "18px" : "inherit" }} // Example for specific elements
                      >
                        <span>Fullstack Developer</span>
                      </h2>
                      <p>
                        <u className="lead" style={{ fontSize: !isVisible ? "15px" : "inherit" }}>National Bank of Canada</u>
                        {isVisible && (
                          <span style={{ fontSize: "inherit" }}>
                            3.9 <FaStar className="mb-2" />
                          </span>
                        )}
                        <br />
                        <span style={{ fontSize: !isVisible ? "15px" : "inherit" }}>Montréal, QC</span>
                        <br />
                        <span style={{ fontSize: !isVisible ? "15px" : "inherit" }}>Full-time</span>
                        <br />
                        <small
                          className="jobsearch-ViewJobButtons-disclaimer css-r468u2 eu4oa1w0"
                          style={{ fontSize: !isVisible ? "12px" : "inherit" }}
                        >
                          You must create an Indeed account before continuing to the company website to apply
                        </small>
                      </p>
                      <button
                        aria-haspopup="dialog"
                        type="button"
                        contenthtml="Apply now"
                        disclaimer="You must create an Indeed account before continuing to the company website to apply"
                        aria-label="Apply now (opens in a new tab)"
                        className="btn btn-secondary rounded"
                        style={{ fontSize: !isVisible ? "15px" : "inherit" }}
                      >
                        <span>Apply now</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
              {/* Detail part */}
              <div className="mx-5" >
                <div tabindex="0">
                  <div>
                    <div style={{
                      maxHeight: isVisible ? "170px" : "280px",
                      overflow: "scroll",
                    }}
                      onScroll={(e) => handleScroll(e)}>
                      <div className="mt-3">
                        <h4>Job Details</h4>
                        <p>
                          <small>Here’s how the job details align with your <Link className="text-dark">profile</Link>.</small>
                        </p>
                        <div className="mb-3">
                          <h6><MdOutlinePayments /> <span className="mx-1"> Pay</span></h6>
                          <span className=" badge text-dark mx-7" style={{ backgroundColor: "#f3f2f1" }}>
                            $24.06–$39.24 an hour
                          </span>
                          <br />
                        </div>
                        <div className="mb-3">
                          <h6><BiBriefcase /> <span className="mx-1"> Job Type</span></h6>
                          <span className=" badge text-dark mx-7" style={{ backgroundColor: "#f3f2f1" }}>
                            Full-time
                          </span>
                        </div>
                      </div>
                      <div className="border-top ">
                        <h2 className="css-1yytfzy mt-5">Location</h2>
                        <div id="jobLocationWrapper" className="css-1u9px01 e37uo190">
                          <FaLocationDot />
                          <div id="jobLocationText" className="css-1tlxeot eu4oa1w0">
                            <div data-testid="jobsearch-JobInfoHeader-companyLocation" className="css-45str8 eu4oa1w0">
                              <span>Montréal, QC</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Job description */}
                      <div className="border-top">
                        <h4 tabindex="-1" id="jobDescriptionTitleHeading" className="css-wpzt8u mt-5">Full job description</h4>
                      </div>
                      <div id="jobDescriptionText" className="jobsearch-JobComponent-description css-16y4thd eu4oa1w0">
                        <div>
                          <p>A career as full stack developer in the wholesale credit risk management IT team, at National Bank of Canada, is acting as an expert in development for a web application used by more than a thousand users at the Bank. It is with your competences in conceptualization and programing, your experience in software lifecycle and your openness to acquire new knowledge that you have a positive impact on the users and the performance of the credit decisioning processes.</p>
                          {/* Position required */}
                          <p>
                            <h4 id="" className="css-wpzt8u ">Position</h4>
                            <p>CARE support-technical non-student (Full stack software developer)</p>
                          </p>
                          {/* Created date */}
                          <p>
                            <h4 id="" className="css-wpzt8u ">Posting period</h4>
                            <p>August 13, 2024 – August 27, 2024</p>
                          </p>
                          {/* Pay */}
                          <p>
                            <h4 id="" className="css-wpzt8u ">Pay range</h4>
                            <p>$24.06 - $39.24 per hour</p>
                          </p>
                          {/* Languages */}
                          <p>
                            <h4 id="" className="css-wpzt8u ">Languages</h4>
                            <p>English required; French preferred</p>
                          </p>
                          {/* Qualifications  experience and skills */}
                          <p>
                            <h4 id="" className="css-wpzt8u ">Qualifications</h4>
                            <p className="mx-5">
                              <p>
                                <b>Required experience</b>
                                <ul className="mx-5">
                                  <li>Bachelor's degree</li>
                                </ul>
                              </p>
                              <p>
                                <b>Desired experience</b>
                                <ul className="mx-5">
                                  <li>Data processing</li>
                                  <li>Working with Linux servers</li>
                                  <li>PostGresQL or similar databases</li>
                                </ul>
                              </p>
                            </p>
                          </p>
                          {/* About company of the job */}
                          <p>
                            <h4 id="" className="css-wpzt8u ">Information about Concordia</h4>
                            <p>Concordia University is located on unceded Indigenous lands. Tiohtià:ke/Montreal, on the traditional lands and waters of the Kanien’kehá:ka Nation, is historically known as a gathering place for many First Nations. Today it is home to a diverse population of Indigenous and other peoples. We respect the continued connections with the past, present and future in our ongoing relationships with Indigenous and other peoples within the Montreal community.
                              <br />
                              <br />
                              Building on the skills of our faculty and the strengths of Indigenous, local, and global partnerships, we set our sights further and more broadly than others and align the quality of learning opportunities to larger trends and substantial challenges facing society.
                              <br />
                              <br />
                              “Concordia is a young, forward-looking university. It’s a unique place where experimentation, innovation and creativity are truly valued. Our community of students, faculty, staff and alumni all contribute to our momentum as Canada’s next-gen university.” — Concordia President Graham Carr.
                              <br />
                              <br />
                              Profoundly global, Concordia is North America’s top university under the age of 50 and is recognized for attracting some of the most talented faculty and students from around the world. Driven by ambition, innovation and a commitment to reconciliation, research and community engagement, Concordia is celebrated for advancing transformative learning, convergent thinking and public impact.</p>
                          </p>
                          {/* Acknowledge */}
                          <p>
                            <b>We're putting people first</b>

                            <br />
                            <br />
                            We're a bank on a human scale that stands out for its courage, entrepreneurial culture, and passion for people. Our mission is to have a positive impact on peoples' lives. Our core values of partnership, agility, and empowerment inspire us, and inclusivity is central to our commitments. We offer a barrier-free workplace that is accessible to all employees.

                            <br />
                            <br />
                            We want our recruitment process to be fully accessible. If you require accommodation, feel free to let us know during your first conversations with us. We welcome all candidates! What can you bring to our team?
                            <br />
                            <br /> Come live your ambitions with us!
                          </p>
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
    </div>
  );
};

export default JobDetailLeftCardBox;
