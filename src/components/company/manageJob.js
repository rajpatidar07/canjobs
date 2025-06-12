import React, { useState, useEffect } from "react";
import EmployeeFooter from "../common/footer";
import Header from "../common/header";
import SearchForm from "../common/search_form";
import AddJobModal from "../forms/employer/job";
import JobBox from "../common/jobbox";
import { GetFilter } from "../../api/api";
import FilterJson from "../json/filterjson";
import { Link } from "react-router-dom";
import Loader from "../common/loader";
import States from "../json/states";
import SelectBox from "../common/Common function/SelectBox";

function ManageJobs() {
  /*Data and modal states */
  let [showAddJobModal, setShowAddJobModal] = useState(false);
  let [apiCall, setApiCall] = useState(false);
  let [jobId, setJobId] = useState();
  let [filter, SetFilter] = useState([]);

  /*Filter states */
  const [categoryFilterValue, setCategoryFilterValue] = useState("");
  const [SkillFilterValue, setSkillFilterValue] = useState("");
  const [jobSwapFilterValue, setJobSwapFilterValue] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobsNo, setJobsNo] = useState(10);
  const [jobCount, setJobCount] = useState();
  const [totaljob, setTotalJob] = useState();

  let Company_name = localStorage.getItem("name");
  /* Function to get the JSON data*/
  const FilterData = async () => {
    try {
      const Json = await GetFilter();
      if (Json.data.message === "No data found" || Json.length === 0) {
        SetFilter([]);
      } else {
        SetFilter(Json.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /*Function to open edit job modal */
  const editJob = (e) => {
    // e.preventDefault();
    setShowAddJobModal(true);
    setJobId(e);
  };
  const CompleteProfileAlert = () => [
    alert("Complete your profile before adding jobs."),
  ];
  /*Render function to get filter list */
  useEffect(() => {
    FilterData();
  }, [showAddJobModal, jobId]);

  return (
    <>
      <div>

        <Header />
        {/* <!-- Main Content Start --> */}
        <div className="bg-black-2 mt-15 mt-lg-18 pt-18 pt-lg-13 pb-13">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-12 translateY-25  pb-10">
                {/* <!-- Search form --> */}
                <SearchForm />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-default-1 pt-9 pb-13 pb-xl-30 pb-13 position-relative overflow-hidden">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10 col-xl-12">
                {/* <h2 className="font-size-8 mb-6">
                  You’re searching "UI Designer"
                </h2> */}
                {/*<-- Job filter -->*/}
                <form className="mb-8">
                  <div className="d-flex align-items-center justify-content-space-between">
                    <div className=" search-filter from-group row">
                      <div className="col-md-3 col-6 mb-5 filter_input_div">
                        <SelectBox
                          options={filter ?
                            filter.Category.map((option) => ({
                              value: option.id,
                              label: option.value,
                            }))
                            : []}
                          type={"category"}
                          selectedValue={categoryFilterValue}
                          onChange={(e) => { setCategoryFilterValue(e ? e.value : "") }}
                        />
                      </div>
                      <div className="col-md-3 col-6 mb-5 filter_input_div">
                         <SelectBox
                          options={FilterJson ?
                            FilterJson.keyskill.map((option) => ({
                              value: option,
                              label: option,
                            }))
                            : []}
                          type={"skill"}
                          selectedValue={SkillFilterValue}
                          onChange={(e) => { setSkillFilterValue(e ? e.value : "") }}
                        />
                      </div>
                      <div className="col-md-3 col-6 mb-5 filter_input_div">
                        <SelectBox
                          options={FilterJson ?
                            FilterJson.job_type.map((option) => ({
                              value: option,
                              label: option,
                            }))
                            : []}
                          type={"job_type"}
                          selectedValue={jobSwapFilterValue}
                          onChange={(e) => { setJobSwapFilterValue(e ? e.value : "") }}
                        />
                      </div>
                      <div className="col-md-3 col-6 mb-5 filter_input_div">
                        <SelectBox
                          options={States ?
                            Object.keys(States).map((option) => ({
                              value: option,
                              label: option,
                            }))
                            : []}
                          type={"location"}
                          selectedValue={jobLocation}
                          onChange={(e) => { setJobLocation(e ? e.value : "") }}
                        />
                      </div>
                      <div className="col-12 mb-5 filter_input_div text-right">
                        <button
                          onClick={() =>
                            Company_name === null ||
                              Company_name === "null" ||
                              Company_name === "undefined" ||
                              Company_name === undefined ||
                              Company_name === ""
                              ? CompleteProfileAlert()
                              : editJob("0")
                          }
                          className="btn btn-secondary text-uppercase btn-medium w-10 h-px-48 rounded-3"
                          type="button"
                        >
                          Add jobs
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <div></div>
                {/*<-- Add job Modal -->*/}
                {showAddJobModal ? (
                  <AddJobModal
                    show={showAddJobModal}
                    jobData={jobId}
                    close={() => setShowAddJobModal(false)}
                    apiCall={apiCall}
                    setApiCall={setApiCall}
                  />
                ) : null}
              </div>
            </div>
            <div className="row justify-content-center position-static">
              <div className="col-12 col-xxl-10 col-xl-10 col-lg-10">
                {/* <!-- Left Section --> */}
                <div className="Left">
                  <div
                    className="justify-content-center search-nav-tab nav nav-tabs border-bottom-0"
                    id="search-nav-tab"
                    role="tablist"
                  >
                    {<JobBox /> ? (
                      <div className="mb-8 p-0 w-100 active nav-link">
                        {/* <!-- Single Featured Job --> */}
                        <JobBox
                          categoryFilterValue={categoryFilterValue}
                          SkillFilterValue={SkillFilterValue}
                          jobSwapFilterValue={jobSwapFilterValue}
                          showAddJobModal={showAddJobModal}
                          jobLocation={jobLocation}
                          apiCall={apiCall}
                          setJobCount={setJobCount}
                          jobsNo={jobsNo}
                          setTotalJob={setTotalJob}
                        />
                        {/* <!-- End Single Featured Job --> */}
                      </div>
                    ) : (
                      <div className="table-responsive main_table_div">
                        <Loader />
                      </div>
                    )}
                  </div>
                  {jobsNo <= totaljob
                    ? <div className="text-center pt-5 pt-lg-13">
                      <Link className="text-green font-weight-bold text-uppercase font-size-3 d-flex align-items-center justify-content-center"
                        onClick={() => setJobsNo(jobCount + 10)}>
                        Load More
                        <i className="fas fa-sort-down ml-3 mt-n2 font-size-4"></i>
                      </Link>
                    </div>
                    : null}
                </div>
                {/* <!-- form end --> */}
              </div>
              {/* <!-- Right Section --> */}
            </div>
          </div>
        </div>
        {/* <!-- Main Content end --> */}
        {/*<-- Footer -->*/}
        <EmployeeFooter />
      </div>
    </>
  );
}

export default ManageJobs;
