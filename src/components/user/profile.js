import React, { useEffect, useState } from "react";
import EmployeeHeader from "../common/header";
import EmployeeFooter from "../common/footer";
import EmployementDetails from "../forms/user/employement";
import PersonalDetails from "../forms/user/personal";
import EducationDetails from "../forms/user/education";
import ItSkills from "../forms/user/skills";
import CustomButton from "../common/button";
import { Link } from "react-router-dom";
import { EmployeeDetails , EmployeeAppliedJob} from "../../api/api";
import moment from "moment";
import { ToastContainer } from "react-toastify";
const UserProfile = (props) => {
  const [apiCall, setApiCall] = useState(false);
  const [showEmplyomentDetails, setShowEmplyomentDetails] = useState(false);
  const [showPersonalDetails, setShowPersonalDetails] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showItSkills, setShowItSkills] = useState(false);
  const [showAppliedJobs, setShowAppliedJobs] = useState(false);
  const [userDetail, setuserDetail] = useState([]);
  const [PersonalDetail, setPersonalDetail] = useState([]);
  const [appliedJob, setAppliedJob] = useState([]);
  const user_type = localStorage.getItem("userType");
  let id = localStorage.getItem("employee_id");
  const employeeId = user_type === "admin" ? props.employeeId : id;
 /*Function to get user Data */
  const UserData = async () => {
    const userData = await EmployeeDetails(employeeId);
    if (userData.data === undefined ||
        userData.data.length === 0 || 
        userData.data.employee.length === 0) {
      setuserDetail([]);
      setPersonalDetail([]);
    } else {
      setuserDetail(userData.data);
      setPersonalDetail(userData.data.employee[0]);
    }
  };
  // console.log(userDetail)
  
   /*Function to Geyt applied job data */
  const AppliedJob = async () => {
    const applied = await EmployeeAppliedJob(employeeId);
    if (applied.data === undefined ||
        applied.data.length === 0 
       ) {
           setAppliedJob([])
    } else {
           setAppliedJob(applied.data);
    }
  };
  /*Render function to get user Data */
  useEffect(() => {
   if(appliedJob){
     AppliedJob()
    }
    UserData();
    if(apiCall=== true){
      setApiCall(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiCall]);
  /*Function to generate resume */
  // const ResumeClick = (employee_id) => {
  //   const id = employee_id;
  //   window.open(`/resume/${id}`, "_blank");
  // };
  const handleViewResume = (pdfUrl) => {
    window.open(pdfUrl, '_blank');
  };
  return (
    /*---- Employee Profile Details Page ----*/
    <div className="site-wrapper overflow-hidden ">
      {user_type === "admin" ? "" : <> <EmployeeHeader />
      <ToastContainer/>
      </>}

      <div className="bg-default-2 mt-5">
        <div className="container p-0">
          {user_type === "admin" ? (
            ""
          ) : (
            <div className="row justify-content-center mt-15">
              <div className="col-12 dark-mode-texts">
                <div className="mb-2">
                  <Link to={user_type === "company"?"/company":"/"} className="d-flex align-items-center">
                    <i className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                    <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                      Back
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          )}
          <div className="row text-left mt-5 pt-5">
            <div className="col-12 col-xxl-4 col-lg-4 col-md-5 mb-11 mb-lg-0 ">
              <div className="p-0">
                {/*----Slide Employee profile-----*/}
                <div className="bg-white shadow-9 rounded-4">
                  <div className="px-5 pt-11 pb-5 text-center border-bottom border-mercury">
                    <Link
                      className="mb-4 position-relative"
                      onClick={() => setShowPersonalDetails(true)}
                    >
                    {user_type==="admin"?<>  <input
                        type="file"
                        id="ImgUploadInput"
                        className="d-none"
                      />
                      <label
                        className="image_upload_btn m-0"
                        htmlFor="ImgUploadInput"
                      >
                        <span className="fas fa-pen text-gray"> </span>
                      </label></>:""}
                      <img
                        className="rounded-circle"
                        src={
                          PersonalDetail.profile_photo
                            ? PersonalDetail.profile_photo
                            : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png`
                        }
                        alt=""
                        width={"100px"}
                        height={"100px"}
                      />
                    </Link>
                    <h4 className="mb-0">
                      {/* <Link
                        className="text-black-2 font-size-6 font-weight-semibold"
                        onClick={() => setShowRegistration(true)}
                      > */}
                      {PersonalDetail.name}
                      <br />
                      <span className="age_gender font-size-3 text-smoke">
                        ({PersonalDetail.gender},
                        {PersonalDetail.marital_status},
                        {moment().diff(PersonalDetail.date_of_birth, "years")}
                        Y)
                      </span>
                      {/* </Link>
                      <Registration
                        show={showRegistration}
                        close={() => setShowRegistration(false)}
                      /> */}
                    </h4>
                    {/* <p className="mb-8 text-gray font-size-4">
                    {PersonalDetail.gender}
                    </p> */}
                  </div>
                  <div className="px-9 pt-lg-5 pt-9 pt-xl-9 pb-10  border-bottom border-mercury">
                    <h4 className="text-black-2 mb-5 font-size-5 d-flex align-items-center justify-content-space-between">
                      <span>Personal Info</span>
                      {user_type === "company" ? null : (
                        <CustomButton
                          className="fas fa-pen font-size-3 rounded-3 btn-primary border-0"
                          onClick={() => setShowPersonalDetails(true)}
                        />
                      )}
                   { showPersonalDetails ?  <PersonalDetails
                        show={showPersonalDetails}
                        employeeId={employeeId}
                        apiCall={apiCall}
                        setApiCall={setApiCall}   
                        close={() => setShowPersonalDetails(false)}
                      /> : null }
                    </h4>
                    {PersonalDetail.email === "" ||
                    PersonalDetail.length === 0 ? (
                      <div>
                        
                        <p className="text-center">No Data Found</p>
                      </div>
                    ) : (
                      <div className="personal_info_box d-flex align-items-center justify-content-left flex-wrap">
                        <div className="info_box text-left">
                          <span className="font-size-3 text-smoke  mr-7">
                            <img
                              className="mr-1"
                              height={"16px"}
                              src="image/icons/envelope.svg"
                              alt="Email"
                            />
                            {PersonalDetail.email}
                          </span>
                        </div>

                        <div className="info_box text-left">
                          <span className="font-size-3 text-smoke  mr-7">
                            <img
                              className="mr-1"
                              height={"16px"}
                              src="image/icons/mobile-button.svg"
                              alt="Mobile Number"
                            />
                            {PersonalDetail.contact_no}
                          </span>
                        </div>
                        <div className="info_box text-left">
                          <span className="font-size-3 text-smoke  mr-7">
                            <img
                              className="mr-1"
                              height={"16px"}
                              src="image/icons/marker.svg"
                              alt="Location"
                            />
                            {PersonalDetail.current_location}
                          </span>
                        </div>
                        <div className="info_box text-left">
                          <span className="font-size-3 text-smoke  mr-7">
                            <img
                              className="mr-1"
                              height={"16px"}
                              src="image/icons/language.svg"
                              alt="language"
                            />
                            {PersonalDetail.language}
                          </span>
                        </div>
                        <div className="info_box text-left">
                          <span className="font-size-3 text-smoke  mr-7">
                            <img
                              className="mr-1"
                              height={"16px"}
                              src="image/icons/address-book.svg"
                              alt="Address"
                            />
                            {PersonalDetail.currently_located_country}
                          </span>
                        </div>
                        <div className="info_box text-left">
                          <span className="font-size-3 text-smoke  mr-7">
                            <img
                              className="mr-1"
                              height={"16px"}
                              src="image/icons/envelope.svg"
                              alt="Email"
                            />
                            {PersonalDetail.experience} Years
                          </span> 
                        </div>
                        {/* <div className="info_box text-left">
                          <span className="font-size-3 text-smoke  mr-7">
                            Religion: <b>{PersonalDetail.religion}</b>
                          </span>
                        </div> */}
                       {PersonalDetail.nationality ? <div className="info_box text-left">
                          <span className="font-size-3 text-smoke  mr-7">
                            Nationality: <b> {PersonalDetail.nationality}</b>
                          </span>
                        </div> : null}
                        {PersonalDetail.work_permit_canada ? <div className="info_box text-left">
                          <span className="font-size-3 text-smoke  mr-7">
                            Work Permit of Canada:
                            <b> {PersonalDetail.work_permit_canada}</b>
                          </span>
                        </div> : null}
                        {PersonalDetail.work_permit_other_country ? <div className="info_box text-left">
                          <span className="font-size-3 text-smoke  mr-7">
                            Work Permit of Other Country:
                            <b> {PersonalDetail.work_permit_other_country}</b>
                          </span>
                        </div> : null}
                        <div className="info_box text-left">
                          <span className="font-size-3 text-smoke  mr-7">
                            Resume:

                          <Link to={""} onClick={()=> handleViewResume(PersonalDetail.resume)}>View Resume</Link>
                      
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="px-9 pt-lg-5 pt-9 pt-xl-9 pb-10">
                    <h4 className="text-black-2 mb-5 font-size-5 d-flex align-items-center justify-content-space-between">
                      <span>Skill</span>
                      {user_type === "company" ? null : (
                        <CustomButton
                          className="fas fa-pen font-size-3 rounded-3 btn-primary border-0"
                          onClick={() => setShowItSkills(true)}
                        />
                      )}
                    </h4>
                    <div className="icon-link d-flex align-items-center justify-content-center flex-wrap ">
                      {/*----Employee's Skills----*/}

                     {showItSkills ? <ItSkills
                        show={showItSkills}
                        employeeId={employeeId}
                        apiCall={apiCall}
                         setApiCall={setApiCall}
                        close={() => setShowItSkills(false)}
                      /> : null}

                      <ul className="list-unstyled d-flex align-items-center flex-wrap">
                        {
                        userDetail.skill === undefined ? (
                          <li>No Data Found</li>
                        ) : (
                          (userDetail.skill || []).map((employeeSkills) => (
                            <li key={employeeSkills.skill_id}>
                              <span className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center">
                                {employeeSkills.skill}
                              </span>
                            </li>
                          ))
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-xxl-8 col-lg-8 col-md-7 order-2 order-xl-1">
              <div className="bg-white rounded-4 shadow-9">
                {/*----Profile Header----*/}
                <ul
                  className="nav border-bottom border-mercury pl-12"
                  id="myTab"
                  role="tablist"
                >
                  <li className="tab-menu-items nav-item pr-12">
                    <Link
                      className={
                        showAppliedJobs === true
                          ? "text-uppercase font-size-3 font-weight-bold text-default-color py-3"
                          : " active text-uppercase font-size-3 font-weight-bold text-default-color py-3"
                      }
                      id="home-tab"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                      onClick={() => setShowAppliedJobs(false)}
                    >
                      Overview
                    </Link>
                  </li>
                  <li className="tab-menu-items nav-item pr-12">
                    <Link
                      className={
                        showAppliedJobs === false
                          ? "text-uppercase font-size-3 font-weight-bold text-default-color py-3"
                          : " active text-uppercase font-size-3 font-weight-bold text-default-color py-3"
                      }
                      id="appliedJobs"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="appliedJobs"
                      aria-selected="true"
                      onClick={() => setShowAppliedJobs(true)}
                    >
                      Applied Jobs
                    </Link>
                  </li>
                </ul>
                {/*---Profile Details----*/}
                <div
                  className={
                    showAppliedJobs === false ? "tab-content" : "d-none"
                  }
                  id="myTabContent"
                >
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    {/*----About Employee----*/}
                    <div className="pr-xl-0 pr-xxl-14 p-5 px-xs-12 pt-7 pb-5 px-9">
                      <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">
                        About
                      </h4>
                      <p className="font-size-4 mb-8">
                        {PersonalDetail.description}
                      </p>
                    </div>
                    {/*----Employee's Career Profile----*/}
                    <div
                      id="Career_Profile"
                      className="border-top px-9 pt-lg-5 pt-9 pt-xl-9 pb-10"
                    >
                      <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold text-left d-flex align-items-center justify-content-space-between">
                        <span>Career Profile</span>
                        {user_type === "company" ? null : (
                          <CustomButton
                            className="fas fa-pen font-size-3 rounded-3 btn-primary border-0"
                            onClick={() => setShowEmplyomentDetails(true)}
                          />
                        )}
                     { showEmplyomentDetails ?  <EmployementDetails
                          show={showEmplyomentDetails}
                          employeeId={employeeId}
                          apiCall={apiCall}
                          setApiCall={setApiCall}
                          close={() => setShowEmplyomentDetails(false)}
                        /> : null}
                      </h4>
                      {/* {moment(PersonalDetail.start_date)}
                              {moment([PersonalDetail.start_date]).diff(moment([PersonalDetail.end_date]), 'years', true)} */}

                      {userDetail.career === undefined || userDetail.career.length ===0 ? (
                        <div>
                          <p className="text-center">No Data Found</p>
                        </div>
                      ) : (
                        (userDetail.career || []).map((CareerDetails) => (
                          <div className="w-100" key={CareerDetails.career_id}>
                            <div className="d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap justify-content-md-between">
                              <div className="media align-items-center company_box col-md-6 p-0">
                                <div className="text_box text-left w-100 mt-n2">
                                  <h3 className="mb-0">
                                    <span className="font-size-6 text-black-2 font-weight-semibold">
                                      {CareerDetails.designation} -
                                      <span className="font-size-4">
                                        {CareerDetails.functional_area}
                                      </span>
                                    </span>
                                  </h3>
                                  <span className="font-size-4 text-default-color line-height-2">
                                    {CareerDetails.company} (
                                    {CareerDetails.industry})
                                  </span>
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-right flex-wrap text-right">
                                <span className="font-size-4 text-gray w-100">
                                  {moment(CareerDetails.start_date).format(
                                    "YYYY-MM-DD"
                                  )}
                                  -
                                  {moment(CareerDetails.end_date).format(
                                    "YYYY-MM-DD"
                                  )}
                                </span>
                                <span className="font-size-3 text-gray w-100">
                                  <span
                                    className="mr-4"
                                    style={{ marginTop: "-2px" }}
                                  >
                                    <img
                                      src="image/svg/icon-loaction-pin-black.svg"
                                      alt=""
                                    />
                                  </span>
                                  {CareerDetails.company_location}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    {/*----Employee's Education Profile----*/}
                    <div
                      id="Career_Profile"
                      className="border-top 
                      px-9 pt-lg-5 pt-9 pt-xl-9 pb-10"
                    >
                      <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold text-left d-flex align-items-center justify-content-space-between">
                        <span>Education</span>
                        {user_type === "company" ? null : (
                          <CustomButton
                            className="fas fa-pen font-size-3 rounded-3 btn-primary border-0"
                            onClick={() => setShowEducation(true)}
                          />
                        )}
                        {showEducation ? <EducationDetails
                          show={showEducation}
                          employeeId={employeeId}
                          apiCall={apiCall}
                          setApiCall={setApiCall}
                          close={() => setShowEducation(false)}
                        /> : null}
                      </h4>
                      {userDetail.education === undefined || userDetail.education.length === 0 ? (
                        <div>
                          <p className="text-center">No Data Found</p>
                        </div>
                      ) : (
                        (userDetail.education || []).map(
                          (EducationDetails, index) => (
                            <div
                              className="w-100"
                              key={EducationDetails.education_id}
                            >
                              <div className="d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap justify-content-md-between">
                                <div className="media align-items-center company_box p-0">
                                  <div className="text_box text-left w-100 mt-n2">
                                    <h3 className="mb-0">
                                      <span className="font-size-6 text-black-2 font-weight-semibold">
                                        {EducationDetails.qualification}
                                        <span className="font-size-4">
                                          (
                                          {
                                            EducationDetails.university_institute
                                          }
                                          )
                                        </span>
                                      </span>
                                    </h3>
                                    <span className="font-size-4 text-default-color line-height-2">
                                      {EducationDetails.course},
                                      {EducationDetails.specialization}
                                    </span>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-right flex-wrap text-right">
                                  <span className="font-size-4 text-gray w-100">
                                    {EducationDetails.passing_year}
                                  </span>
                                  <span className="font-size-3 text-gray w-100">
                                    <span
                                      className="mr-4"
                                      style={{ marginTop: "-2px" }}
                                    >
                                      <img
                                        src="image/svg/icon-loaction-pin-black.svg"
                                        alt=""
                                      />
                                    </span>
                                    {EducationDetails.institute_location}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )
                        )
                      )}
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <div className="pr-xl-11 p-5 pl-xs-12 pt-9 pb-11">
                      <form>
                        <div className="row">
                          <div className="col-12 mb-7">
                            <label
                              htmlFor="name3"
                              className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                            >
                              Your Name
                            </label>
                            <input
                              id="name3"
                              type="text"
                              className="form-control"
                              placeholder="Jhon Doe"
                            />
                          </div>
                          <div className="col-lg-6 mb-7">
                            <label
                              htmlFor="email3"
                              className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                            >
                              E-mail
                            </label>
                            <input
                              id="email3"
                              type="email"
                              className="form-control"
                              placeholder="example@gmail.com"
                            />
                          </div>
                          <div className="col-lg-6 mb-7">
                            <label
                              htmlFor="subject3"
                              className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                            >
                              Subject
                            </label>
                            <input
                              id="subject3"
                              type="text"
                              className="form-control"
                              placeholder="Special contract"
                            />
                          </div>
                          <div className="col-lg-12 mb-7">
                            <label
                              htmlFor="message3"
                              className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                            >
                              Message
                            </label>
                            <textarea
                              name="message"
                              id="message3"
                              placeholder="Type your message"
                              className="form-control h-px-144"
                            ></textarea>
                          </div>
                          <div className="col-lg-12 pt-4">
                            <button className="btn btn-primary text-uppercase w-100 h-px-48">
                              Send Now
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Sidebar End --> */}
              <div
                className={
                  showAppliedJobs === true
                    ? "justify-content-center"
                    : "d-none"
                }
                id="appliedJobs"
                role="tabpanel"
                aria-labelledby="appliedJobs"
              >
                {/* <!-- Top Start --> */}
                <div className="mb-5">
                  <h4 className="font-size-7 mb-9">Applied Jobs</h4>
                  <div className="row justify-content-center">
                    {appliedJob === undefined || appliedJob.length === 0 ? 
                     <div className="text-center text-dark" >No Data Found</div>
                    : (appliedJob || []).map((data,i)=>{
                    return (  
                    <div className="col-lg-6 col-sm-11 mb-9" key={i}>
                      {/* <!-- Single Featured Job --> */}
                      <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3">
                        <div className="media align-items-center">
                          <div className="square-52 mr-8 rounded">
                              <img src={data.logo ? data.data : "image/l3/png/fimize.png"} alt="" />
                          </div>
                          <div>
                            <span
                              to=""
                              className="font-size-3 text-default-color line-height-2"
                            >
                             {data.company_name}
                            </span>
                            <h3 className="font-size-5 mb-0">
                              <span
                                className="heading-default-color font-weight-semibold"
                                to=""
                              >
                                {data.job_title}
                              </span>
                            </h3>
                          </div>
                        </div>
                        <div className="d-flex pt-17">
                          <ul className="list-unstyled mb-1 d-flex flex-wrap">
                            <li>
                              <span
                                to=""
                                className="bg-regent-opacity-15 text-denim font-size-3 rounded-3 min-width-px-100 px-3 flex-all-center mr-6 h-px-33 mt-4"
                              >
                                <i className="icon icon-pin-3 mr-2 font-weight-bold"></i>
                                {data.location}
                              </span>
                            </li>
                            <li>
                              <span
                                to=""
                                className="bg-regent-opacity-15 text-orange font-size-3 rounded-3 min-width-px-100 px-3 flex-all-center mr-6 h-px-33 mt-4"
                              >
                                <i className="fa fa-briefcase mr-2 font-weight-bold"></i>
                                {data.job_type}
                              </span>
                            </li>
                          </ul>
                          {/* <Link
                            to=""
                            className="bookmark-button toggle-item font-size-6 ml-auto line-height-reset px-0 mt-6 text-default-color clicked  "
                          ></Link> */}
                        </div>
                      </div>
                      {/* <!-- End Single Featured Job --> */}
                    </div>
                   ) })}
                  </div>
                </div>
                {/* <!-- Top End --> */}
                {/* <!-- Bottom Start --> */}
                <div className="">
                  <h4 className="font-size-7 mb-9">Saved Jobs</h4>
                  <div className="row justify-content-center">
                    <div className="col-lg-6 col-sm-11 mb-9">
                      {/* <!-- Single Featured Job --> */}
                      <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3">
                        <div className="media align-items-center">
                          <div className="square-52 bg-orange-2 mr-8 rounded">
                            <Link to="">
                              <img src="image/svg/icon-thunder.svg" alt="" />
                            </Link>
                          </div>
                          <div>
                            <Link
                              to=""
                              className="font-size-3 text-default-color line-height-2"
                            >
                              Thunder
                            </Link>
                            <h3 className="font-size-5 mb-0">
                              <Link
                                className="heading-default-color font-weight-semibold"
                                to=""
                              >
                                Product Manager
                              </Link>
                            </h3>
                          </div>
                        </div>
                        <div className="d-flex pt-17">
                          <ul className="list-unstyled mb-1 d-flex flex-wrap">
                            <li>
                              <Link
                                to=""
                                className="bg-regent-opacity-15 text-denim font-size-3 rounded-3 min-width-px-100 px-3 flex-all-center mr-6 h-px-33 mt-4"
                              >
                                <i className="icon icon-pin-3 mr-2 font-weight-bold"></i>
                                New York
                              </Link>
                            </li>
                            <li>
                              <Link
                                to=""
                                className="bg-regent-opacity-15 text-orange font-size-3 rounded-3 min-width-px-100 px-3 flex-all-center mr-6 h-px-33 mt-4"
                              >
                                <i className="fa fa-briefcase mr-2 font-weight-bold"></i>
                                Part-time
                              </Link>
                            </li>
                          </ul>
                          <Link
                            to=""
                            className="bookmark-button toggle-item font-size-6 ml-auto line-height-reset px-0 mt-6 text-default-color  "
                          ></Link>
                        </div>
                      </div>
                      {/* <!-- End Single Featured Job --> */}
                    </div>
                    <div className="col-lg-6 col-sm-11 mb-9">
                      {/* <!-- Single Featured Job --> */}
                      <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3">
                        <div className="media align-items-center">
                          <div className="square-52 bg-helio mr-8 rounded">
                            <Link to="">
                              <img src="image/l3/png/asios.png" alt="" />
                            </Link>
                          </div>
                          <div>
                            <Link
                              to=""
                              className="font-size-3 text-default-color line-height-2"
                            >
                              Shark
                            </Link>
                            <h3 className="font-size-5 mb-0">
                              <Link
                                className="heading-default-color font-weight-semibold"
                                to=""
                              >
                                Front-end Developer
                              </Link>
                            </h3>
                          </div>
                        </div>
                        <div className="d-flex pt-17">
                          <ul className="list-unstyled mb-1 d-flex flex-wrap">
                            <li>
                              <Link
                                to=""
                                className="bg-regent-opacity-15 text-denim font-size-3 rounded-3 min-width-px-100 px-3 flex-all-center mr-6 h-px-33 mt-4"
                              >
                                <i className="icon icon-pin-3 mr-2 font-weight-bold"></i>
                                Alabama
                              </Link>
                            </li>
                            <li>
                              <Link
                                to=""
                                className="bg-regent-opacity-15 text-orange font-size-3 rounded-3 min-width-px-100 px-3 flex-all-center mr-6 h-px-33 mt-4"
                              >
                                <i className="fa fa-briefcase mr-2 font-weight-bold"></i>
                                Full-time
                              </Link>
                            </li>
                          </ul>
                          <Link
                            to=""
                            className="bookmark-button toggle-item font-size-6 ml-auto line-height-reset px-0 mt-6 text-default-color  "
                          ></Link>
                        </div>
                      </div>
                      {/* <!-- End Single Featured Job --> */}
                    </div>
                  </div>
                </div>
                {/* <!-- Bottom End --> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {user_type === "admin" ? "" : <EmployeeFooter />}
    </div>
  );
};

export default UserProfile;
