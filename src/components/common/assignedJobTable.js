import React/*,{useState}*/ from 'react'
import Pagination from './pagination';
// import Loader from './loader';
import { Link } from 'react-router-dom';
export default function AssignedJobTable(props) {
    // const [isLoading, setIsLoading] = useState(true)

  return (
    <>
    <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-8 px-11">
      <div className="table-responsive main_table_div">
        {
        // isLoading ? (
        //   <Loader />
        // ) :
        //  (
            <table className="table table-striped main_data_table">
            <thead>
              <tr>
                <th
                  scope="col"
                  className=" border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    // onClick={() => {
                    //   handleSort("job_title");
                    // }}
                    title="Sort by Industry"
                    className="text-gray"
                  >
                    Job title / Industry
                  </Link>
                </th>
                {props.heading === "Dashboard" ? null : (
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to=""
                    //   onClick={() => {
                    //     handleSort("job_type");
                    //   }}
                      title="Sort by Job"
                      className="text-gray"
                    >
                      Job Type
                    </Link>
                  </th>
                )}
                {props.heading === "Dashboard" ? null : (
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to=""
                    //   onClick={() => {
                    //     handleSort("location");
                    //   }}
                      className="text-gray"
                      title="Sort by Address"
                    >
                      Address
                    </Link>
                  </th>
                )}
                {props.heading === "Dashboard" ? null : (
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to=""
                    //   onClick={() => {
                    //     handleSort("education");
                    //   }}
                      className="text-gray"
                      title="Sort by Education"
                    >
                      Education
                    </Link>
                  </th>
                )}
                {props.heading === "Dashboard" ? null : (
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to=""
                    //   onClick={() => {
                    //     handleSort("keyskill");
                    //   }}
                      className="text-gray"
                      title="Sort by Skill"
                    >
                      Skills
                    </Link>
                  </th>
                )}
                {props.heading === "Dashboard" ? null : (
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to=""
                    //   onClick={() => {
                    //     handleSort("language");
                    //   }}
                      className="text-gray"
                      title="Sort by Language"
                    >
                      Language
                    </Link>
                  </th>
                )}
                <th
                  scope="col"
                  className=" border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    to=""
                    // onClick={() => {
                    //   handleSort("salary");
                    // }}
                    className="text-gray"
                    title="Sort by Salary"
                  >
                    Salary
                  </Link>
                </th>
                <th
                  scope="col"
                  className=" border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    to=""
                    // onClick={() => {
                    //   handleSort("experience_required");
                    // }}
                    className="text-gray"
                    title="Sort by Experience"
                  >
                    Experience
                  </Link>
                </th>
                <th
                  scope="col"
                  className=" border-0 font-size-4 font-weight-normal"
                >
                  LMIA status
                </th>
                {props.heading === "Dashboard"
                ? null : (
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    Action
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {/* Map function to show the data in the list*/}
              {/* {totalData === 0 || jobData.length === 0 ? (
                <tr>
                  <th className="bg-white"></th>
                  <th className="bg-white"></th>
                  {props.heading === "Dashboard" ? (
                    <th className="bg-white text-center">No Data Found</th>
                  ) : (
                    <th className="bg-white"></th>
                  )}
                  <th className="bg-white"></th>
                  {props.heading !== "Dashboard" ? (
                    <>
                      <th className="bg-white"></th>
                      <th className="bg-white text-center">No Data Found</th>
                      <th className="bg-white"></th>
                      <th className="bg-white"></th>
                      <th className="bg-white"></th>
                      <th className="bg-white"></th>
                      <th className="bg-white"></th>
                    </>
                  ) : null}
                </tr>
              ) : ( 
                // (jobData || []).map((job, i) => {
                //   let LmiaStatusData = lmiaStatus.filter(
                //     (item) => item.job_id === job.job_id
                //   );return */}
                  {/* ( */}
                    {/* <React.Fragmentkey={job.job_id}> */}
                      <tr
                        className={
                          /*job.is_applied === "1" ? "d-none" : */ "col-12 text-capitalize job_row"
                        }
                      >
                        <th scope="row" className="py-5 ">
                          <div className="">
                            <Link
                              title="Job Details"
                            //   to={`/jobdetailpage`}
                            //   onClick={
                            //     () =>
                            //       localStorage.setItem("job_id", job.job_id)
                            //     // JobDetail(job.job_id)
                            //   }
                              className="font-size-3 mb-0 font-weight-semibold text-black-2"
                            >
                              <>
                                <p className="m-0 text-black-2 font-weight-bold text-capitalize">
                                  {/* {job.job_title} */}
                                  React Developer
                                </p>
                                <p className="text-gray font-size-2 m-0 text-capitalize">
                                  {/* {job.company_name} - {job.industry_type} */}
                                  We2code - Full-Time
                                  <br />
                                  {/* {job.is_featured === "1" ? (
                                    <span className="bg-orange text-white featured_tag">
                                      Featured
                                    </span>
                                  ) : null} */}
                                </p>
                              </>
                            </Link>
                          </div>
                        </th>
                        {props.heading === "Dashboard" ? null : (
                          <th className=" py-5">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {/* {job.employement} - {job.job_type} */}
                              Full-Time
                            </h3>
                          </th>
                        )}
                        {props.heading === "Dashboard" ? null : (
                          <th className=" py-5">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {/* {job.location} */}
                              Indore
                            </h3>
                          </th>
                        )}
                        {props.heading === "Dashboard" ? null : (
                          <th className="py-5 ">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {/* {job.education ? job.education : "N/A"} */}
                              B.tech
                            </h3>
                          </th>
                        )}
                        {props.heading === "Dashboard" ? null : (
                          <th className="py-5 ">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate">
                              {/* {job.keyskill ? job.keyskill : "N/A"} */}
                              HTML,CSS,JAVA,C++
                            </h3>
                          </th>
                        )}
                        {props.heading === "Dashboard" ? null : (
                          <th className="py-5 ">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate">
                              {/* {job.language ? job.language : "N/A"} */}
                              English
                            </h3>
                          </th>
                        )}
                        <th className="py-5 ">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            {/* {job.salary ? job.salary : "N/A"} */}
                            10k-1lac
                          </h3>
                        </th>
                        <th className="py-5 ">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            {/* {job.experience_required}
                            {job.experience_required === "fresher"
                              ? ""
                              : "years"} */}
                              fresher
                          </h3>
                        </th>
                        
                        <th className=" py-5">
                          <div className="font-size-3 font-weight-normal text-black-2 mb-0">
                            {/* {
                              job.lmia_status === "onboarding" ? (
                                <span className="px-3 py-2 badge badge-pill badge-shamrock">
                                  Onboarding
                                </span>
                              ) : job.lmia_status === "advertisements" ? (
                                <span className="px-3 py-2 badge badge-pill bg-info text-white">
                                  Advertisements
                                </span>
                              ) : job.lmia_status === "documentation" ? (
                                <span className="px-3 py-2 badge badge-pill badge-gray">
                                  Documentation
                                </span>
                              ) : job.lmia_status ===
                                "candidate placement" ? (
                                <span className="px-3 py-2 badge badge-pill bg-primary-opacity-9 text-white">
                                  Candidate Placement
                                </span>
                              ) : job.lmia_status === "submission" ? (
                                <span className="px-3 py-2 badge badge-pill badge-warning">
                                  Submission
                                </span>
                              ) : job.lmia_status === "decision" ? (
                                <span className="px-3 py-2 badge badge-pill badge-dark">
                                  Decision
                                </span>
                              ) : (
                                <span>NA</span>
                              )
                            } */}
                               <span className="px-3 py-2 badge badge-pill badge-info">
                                 On boarding
                               </span>
                            
                          </div>
                        </th>
                        {props.heading === "Dashboard" 
                        ? null : (
                          <th className="py-5 min-width-px-100">
                            <div
                              className="btn-group button_group"
                              role="group"
                            >
                                 <button
                                    className="btn btn-outline-info action_btn"
                                    // onClick={() => {
                                    //   setresponseId(job.job_id);
                                    //   setresponseDropDown(
                                    //     responseDropDown === false
                                    //       ? true
                                    //       : false
                                    //   );
                                    // }}
                                    title="Reassign"
                                  >
                                    Reassign Manager
                                  </button>
                             
                            </div>
                          </th>
                        )}
                      </tr>
                      {/* {props.heading === "Dashboard" ||
                      props.detail === "job_detail" ? null : (
                        <tr
                          className={
                            props.heading === "Dashboard" ||
                            props.skill === null ||
                            props.skill === undefined ||
                            Object.keys(props.skill).length === 0
                              ? "col-12 "
                              : "d-none"
                          }
                        >
                          <td
                            colSpan="11"
                            className={
                              job.lmia_status ? "bg-white" : "d-none"
                            }
                          >
                            <div className="arrow-wrapper custome_arrow_wrapper w-100 d-flex flex-wrap mb-0">
                              <div className="arrow-steps" key={i}>
                                <div className="job_name text-dark">
                                  <span className="m-0 font-size-2 d-block mb-1">
                                    {LmiaStatusData.job_title}
                                  </span>
                                </div>
                                <div>
                                  <div
                                    key={i + 1}
                                    className={`step text-capitalize ${
                                      job.lmia_status === "advertisements" ||
                                      job.lmia_status === "documentation" ||
                                      job.lmia_status === "candidate placement" ||
                                      job.lmia_status === "submission" ||
                                      job.lmia_status === "decision"
                                        ? "approved"
                                        : job.lmia_status === "onboarding"
                                        ? "pending"
                                        : ""
                                    }`}
                                  >
                                    <span>onboarding</span>
                                  </div>
                                  <div
                                    key={i + 2}
                                    className={`step text-capitalize ${
                                      job.lmia_status === "documentation" ||
                                      job.lmia_status === "candidate placement" ||
                                      job.lmia_status === "submission" ||
                                      job.lmia_status === "decision"
                                        ? "approved"
                                        : job.lmia_status === "advertisements"
                                        ? "pending"
                                        : ""
                                    }`}
                                  >
                                    <span>advertisements</span>
                                  </div>
                                  <div
                                    key={i + 3}
                                    className={`step text-capitalize ${
                                      job.lmia_status === "candidate placement" ||
                                      job.lmia_status === "submission" ||
                                      job.lmia_status === "decision"
                                        ? "approved"
                                        : job.lmia_status === "documentation"
                                        ? "pending"
                                        : ""
                                    }`}
                                  >
                                    <span>documentation</span>
                                  </div>
                                  <div
                                    key={i + 4}
                                    className={`step text-capitalize ${
                                      job.lmia_status === "submission" ||
                                      job.lmia_status === "decision"
                                        ? "approved"
                                        : job.lmia_status === "candidate placement"
                                        ? "pending"
                                        : ""
                                    }`}
                                  >
                                    <span>candidate placement</span>
                                  </div>
                                  <div
                                    key={i + 5}
                                    className={`step text-capitalize ${
                                      job.lmia_status === "decision"
                                        ? "approved"
                                        : job.lmia_status === "submission"
                                        ? "pending"
                                        : ""
                                    }`}
                                  >
                                    <span>submission</span>
                                  </div>
                                  {job.lmia_status === "decision" &&
                                  lmiaStatusRejectComment ? (
                                    lmiaStatusRejectComment[0] !==
                                      undefined &&
                                    (lmiaStatusRejectComment || []).map(
                                      (item, i) => {
                                        return (
                                          item === undefined ||
                                          item === "undefined" ||
                                          item === null ||
                                          item === "null"
                                            ? null
                                            : item.job_id === job.job_id
                                        ) ? (
                                          <div
                                          key={i + 6}
                                          className={`step text-capitalize ${
                                            job.lmia_status === "decision" &&
                                            item.lmia_substage === "approved"
                                              ? "approved"
                                              : item.lmia_substage === "rejected"
                                              ? "reject"
                                              : "pending"
                                          }`}
                                        >
                                          <span>
                                            {item.lmia_substage === "approved"
                                              ? "Approved"
                                              : item.lmia_substage === "rejected"
                                              ? "Rejected"
                                              : "Awaiting Decision"}
                                          </span>
                                        </div>
                                        ) : // <small className="mx-10" key={i}>
                                        // {item.lmia_substage === "approved"
                                        //   ? "Congratulation your Limia is Approved"
                                        //   : item.lmia_substage === "awaiting decision"
                                        //   ? "Your Limia status is in progress"
                                        //   : item.lmia_substage === "reject"
                                        //   ? "Sorry to inform you your Limia got rejected."
                                        //   : ""}
                                        // </small>
                                        null;
                                      }
                                    )
                                  ) : (
                                    <div
                                    className={`step text-capitalize${
                                      job.lmia_status === "decision" ? "pending" : ""
                                    } `}
                                  >
                                    {job.lmia_status === "decision"
                                      ? " Awaiting Decision"
                                      : "Decision"}
                                  </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )} */}
                      {/* {job.job_id === responseId &&
                      job.total_applicants > 0 ? (
                        <tr>
                          <td colSpan={11}>
                            {
                              <>
                                <!-- Job Responses -->
                                <JobResponse
                                  responseId={responseId}
                                  apiCall={apiCall}
                                  setApiCall={setApiCall}
                                  heading={"Manage Jobs"}
                                  self={props.selfJob}
                                  total_applicants={job.total_applicants}
                                  role_category={job.role_category}
                                  status={
                                    props.response === "response" ||
                                    props.response === "visa" ||
                                    props.response === "lmia" ||
                                    props.response === "companyprofile"
                                      ? "1"
                                      : "0"
                                  }
                                  response={props.response}
                                  employee_id={
                                    location.state
                                      ? location.state.employee_id
                                        ? location.state.employee_id
                                        : ""
                                      : ""
                                  }
                                />
                              </>
                            }
                          </td>
                        </tr>
                      ) : null} 
                    </React.Fragment>*/}
                  {/* ); */}
                {/* })
              )} */}
            </tbody>
          </table>
        // )
        }
      </div>
      <div className="pt-2">
        <Pagination
        //   nPages={nPages}
        //   currentPage={props.pageNo}
        //   setCurrentPage={props.setpageNo}
        //   total={totalData}
        //   count={employerData.length}
        />
      </div>
    </div>
    {/* <SAlert
      show={deleteAlert}
      title={deleteName}
      text="Are you Sure you want to delete !"
      onConfirm={() => deleteEmployer(deleteId)}
      showCancelButton={true}
      onCancel={CancelDelete}
    /> */}
  </>
  )
}
