import React from "react";
import { BiBriefcase } from "react-icons/bi";
import { FaStar } from "react-icons/fa"; import { CiLocationArrow1 } from "react-icons/ci";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";

const JobDetailLeftCardBox = () => {
  return (
    <div className="jobsearch-RightPane css-1wwhdud eu4oa1w0">
      <div id="jobsearch-ViewjobPaneWrapper" aria-labelledby="jobsearch-JobFullDetailsTitle" tabindex="-1" className="css-n0exdb eu4oa1w0">
        <div>
          <button className="jobsearch-ClosableViewJobPage-button-close css-1ge0ifo e8ju0x51" aria-label="Close job details">
            <GrClose />
          </button>
          <div className="fastviewjob jobsearch-ViewJobLayout--embedded css-1s5gqtr eu4oa1w0 hydrated">
            <div className="jobsearch-JobComponent css-17riagq eu4oa1w0" style={{ height: "970px" }}>

              <div className="jobsearch-HeaderContainer css-n78gek eu4oa1w0 border-bottom pb-5 shadow-sm">
                <div className="jobsearch-InfoHeaderContainer css-1toufe4 eu4oa1w0">
                  <div className="jobsearch-JobInfoHeader-headerImageContainerEji jobsearch-JobInfoHeader-headerImageContainerEjiFull css-l73gvc eu4oa1w0" data-testid="jobsearch-HeaderImageContainer">
                    <img src="https://d2q79iu7y748jz.cloudfront.net/s/_headerimage/1960x400/6d504529e1ba445aabe7518068baeafc" alt="National Bank of Canada logo" className="jobsearch-JobInfoHeader-headerImage css-p96z1s eu4oa1w0" />
                    <img src="https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/256x256/9b29f519297719e1e75ecddebc6609f1" alt="National Bank of Canada logo" className="jobsearch-JobInfoHeader-logo jobsearch-JobInfoHeader-logo-overlay-lower css-1er9dh7 eu4oa1w0" data-testid="jobsearch-JobInfoHeader-logo-overlay-lower" />
                  </div>
                  <div>
                    <div className="mx-5">
                      <div className="jobsearch-JobInfoHeader-title-container jobsearch-JobInfoHeader-title-containerEji css-82ysm6 eu4oa1w0">
                        <h2 className="jobsearch-JobInfoHeader-title css-1t78hkx e1tiznh50" lang="en" dir="ltr" data-testid="jobsearch-JobInfoHeader-title">
                          <span>Fullstack Developer</span>
                        </h2>
                        <p>
                          <u className="lead">National Bank of Canada</u> 3.9 <FaStar className="mb-2" /><br />
                          <span>Montréal, QCe</span><br />
                          <span>Full-time</span><br />
                          <small className="jobsearch-ViewJobButtons-disclaimer css-r468u2 eu4oa1w0">You must create an Indeed account before continuing to the company website to apply</small>
                        </p>
                        <div className="">
                          <button aria-haspopup="dialog" type="button" contenthtml="Apply now" disclaimer="You must create an Indeed account before continuing to the company website to apply" aria-label="Apply now (opens in a new tab)" className="btn btn-secondary rounded">
                            <span>Apply now</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-5" >
                <div className="" tabindex="0">
                  <div className="">
                    <div className="" style={{
                      maxHeight: "550px",
                      overflow: "scroll",
                    }}>
                      <div className="mt-3">
                        <h4>Job Details</h4>
                        <p>
                          <small>Here’s how the job details align with your <Link className="text-dark">profile</Link>.</small>
                        </p>
                        <h6><BiBriefcase /> <span className="mx-1"> Job Type</span></h6>
                        <span className=" badge bg-light text-dark mx-7">
                          Full-time
                        </span>
                      </div>
                      <div id="mosaic-aboveFullJobDescription" className="mosaic mosaic-empty-zone">
                      </div>
                      <div id="mosaic-aboveExtractedJobDescription" className="mosaic mosaic-empty-zone">
                      </div>
                      <div id="jobLocationSectionWrapper" className="css-1iyxsfc eu4oa1w0">
                        <h2 id="jobLocationSectionTitle" className="css-1yytfzy e1tiznh50">Location</h2>
                        <div id="jobLocationWrapper" className="css-1u9px01 e37uo190">
                          <CiLocationArrow1 />
                          <div id="jobLocationText" className="css-1tlxeot eu4oa1w0">
                            <div data-testid="jobsearch-JobInfoHeader-companyLocation" className="css-45str8 eu4oa1w0">
                              <span>Montréal, QC</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="benefits" data-testid="benefits-test" className="css-eynugf eu4oa1w0">
                        <h2 id="benefitsSectionTitle" className="css-gfuqm7 e1tiznh50">Benefits<div className="css-1opnqdm e1wnkr790">Pulled from the full job description</div>
                        </h2>
                        <div className="css-1oelwk6 eu4oa1w0">
                          <div className="css-k3ey05 eu4oa1w0">
                            <span className="css-c62ar3 e1wnkr790">
                              <ul className="css-8tnble eu4oa1w0">
                                <li className="css-kyg8or eu4oa1w0">Employee assistance program</li>
                                <li className="css-kyg8or eu4oa1w0">Wellness program</li>
                              </ul>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div id="jobDescriptionTitle">
                        <h2 tabindex="-1" id="jobDescriptionTitleHeading" className="css-wpzt8u e1tiznh50">Full job description</h2>
                      </div>
                      <div id="jobDescriptionText" className="jobsearch-JobComponent-description css-16y4thd eu4oa1w0">
                        <div>
                          <p>A career as full stack developer in the wholesale credit risk management IT team, at National Bank of Canada, is acting as an expert in development for a web application used by more than a thousand users at the Bank. It is with your competences in conceptualization and programing, your experience in software lifecycle and your openness to acquire new knowledge that you have a positive impact on the users and the performance of the credit decisioning processes.</p>
                          <p>
                            <b> Your role:</b>
                          </p>
                          <ul>
                            <li>Conceptualize and develop technological solutions addressing users’ needs and aligned with the architectural orientations</li>
                            <li>Participate to technical analyses and architectural decisions</li>
                            <li>Collaborate with the team members and other contributors (analysts, developers, architects, business partners, etc.)</li>
                            <li>Diagnose situations and take part in the resolution of complex issues</li>
                            <li>Ensure healthiness and maintainability of our technological environments</li>
                            <li>Contribute to the deployment activities</li>
                            <li>Evolve our cloud practices</li>
                            <li>Ensure the efficiency of our DevSecOps practices and tools</li>
                            <li>Evolve the development norms, processes and techniques</li>
                          </ul>
                          <br />
                          <p>
                          </p>
                          <p>
                            <b> Your team:</b>
                          </p>
                          <p>Within the Corporative Services IT sector, you are a member of a team of seven, analysts and developers, and you report to the wholesale credit risk asset manager. Our team stands out for its deep knowledge of its business domain, its strong partnership with its business partners and its versatility in facing a multitude of technological challenges. Involved in several key processes of the Bank, our team is led to collaborate with many other technical or business teams within the Bank.</p>
                          <br />
                          <p>
                          </p>
                          <p>We encourage a variety of continuous learning methods to enrich your development, including learning through action, providing training content and working in collaboration with colleagues of diverse expertise and profiles.</p>
                          <br />
                          <p>
                          </p>
                          <p>
                            <b> Prerequisites:</b>
                          </p>
                          <ul>
                            <li>Bachelor’s degree in the information technology domain or equivalent experience</li>
                            <li>Proven experience in web application development (full stack): Asp.Net MVC 5, C#, javascript, REST API, HTML/CSS, jQuery and AJAX</li>
                            <li>Experience in DevOps</li>
                            <li>Experience in Agile Scrum methodology</li>
                            <li>Experience in cloud technology</li>
                            <li>Team player</li>
                            <li>AWS certification (asset)</li>
                            <li>Knowledge of Bootstrap and Knockout libraries (asset)</li>
                            <li>Knowledge in Windows system administration (asset)</li>
                            <li>Knowledge in MSSQL and PostgreS database administration (asset)</li>
                            <li>Knowledge of Java (asset)</li>
                          </ul>
                          <b>Your benefits</b>
                          <div>
                          </div>
                          <div>
                            <br /> In addition to competitive compensation, upon hiring you’ll be eligible for a wide range of flexible benefits to help promote your wellbeing and that of your family.
                          </div>
                          <div>
                            <ul>
                              <li>Health and wellness program, including many options</li>
                              <li>Flexible group insurance</li>
                              <li>Generous pension plan</li>
                              <li>Employee Share Ownership Plan</li>
                              <li>Employee and Family Assistance Program</li>
                              <li>Preferential banking services</li>
                              <li>Opportunities to get involved in community initiatives</li>
                              <li>Telemedicine service</li>
                              <li>Virtual sleep clinic</li>
                            </ul>
                          </div>
                          <div>
                            These are a few of the benefits available to you. We have an offer that keeps up with trends as well as your needs and those of your family.
                          </div>
                          <div>
                          </div>
                          <div>
                            <br /> Our dynamic work environments and cutting-edge collaboration tools foster a positive employee experience. We actively listen to employees’ ideas. Whether through our surveys or programs, regular feedback and ongoing communication is encouraged.
                          </div>
                          <div>
                          </div>
                          <div>
                            <b>
                              <br /> We're putting people first</b>
                          </div>
                          <div>
                          </div>
                          <div>
                            <br /> We're a bank on a human scale that stands out for its courage, entrepreneurial culture, and passion for people. Our mission is to have a positive impact on peoples' lives. Our core values of partnership, agility, and empowerment inspire us, and inclusivity is central to our commitments. We offer a barrier-free workplace that is accessible to all employees.
                          </div>
                          <div>
                          </div>
                          <div>
                            <br /> We want our recruitment process to be fully accessible. If you require accommodation, feel free to let us know during your first conversations with us. We welcome all candidates! What can you bring to our team?
                          </div>
                          <div>
                          </div>
                          <div>
                            <br /> Come live your ambitions with us!
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
    </div>
  );
};

export default JobDetailLeftCardBox;
