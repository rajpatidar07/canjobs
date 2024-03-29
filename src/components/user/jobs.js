import React, { useState } from "react";
// import { Link } from "react-router-dom";
import EmployeeFooter from "../common/footer";
import EmployeeHeader from "../common/header";
import JobBox from "../common/jobbox";
import FilterJson from "../json/filterjson";
// import JobDetailPage from "../common/jobdetail";
import SearchForm from "../common/search_form";
import { getJson } from "../../api/api";
import { useEffect } from "react";
function JobSearch() {
  /*Filter states */
  const [categoryFilterValue, setCategoryFilterValue] = useState("");
  const [SkillFilterValue, setSkillFilterValue] = useState("");
  const [jobSwapFilterValue, setJobSwapFilterValue] = useState("");
  let [Json , setJson] = useState([])
  /*Function to get thejSon */
 const JsonData = async () =>{
   let Json = await getJson()
   setJson(Json)
 }
 /*Render Method */
 useEffect(()=>{
  JsonData()
 },[categoryFilterValue , SkillFilterValue])
  // eslint-disable-next-line no-use-before-define
  return (
    <>
      <div className="site-wrapper overflow-hidden ">
        <EmployeeHeader />
        {/* <!-- Main Content Start --> */}
        <div className="bg-black-2 mt-15 mt-lg-18 pt-18 pt-lg-13 pb-13">
          <div className="container">
            <div className="row ">
              {/* <!-- Hero Form --> */}
              <div className="col-lg-12 col-12 translateY-25  pb-10">
                <SearchForm />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-default-1 pt-9 pb-13 pb-xl-30 pb-13 position-relative overflow-hidden">
          <div className="container">
            <div className="row ">
              <div className="col-12 col-lg-10 col-xl-12 text-center">
                <form className="mb-8" action="/">
                  <div className="search-filter from-group d-flex align-items-center flex-wrap justify-content-center">
                    <div className="mr-5 mb-5">
                      <select
                        name="category"
                        id="category"
                        value={categoryFilterValue}
                        /*Category Onchange function to filter the data */
                        onChange={(e) => setCategoryFilterValue(e.target.value)}
                        className="form-control font-size-4 text-black-2 arrow-4-black mr-5 rounded-0"
                      >
                        <option value="">Select Category</option>
                        {(Json.Category || []).map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.value}
                          </option>
                        ))}
                        
                      </select>
                    </div>
                    <div className="mr-5 mb-5">
                      <select
                        name="skill"
                        id="skill"
                        value={SkillFilterValue}
                        /*Skill Onchange function to filter the data */
                        onChange={(e) => setSkillFilterValue(e.target.value)}
                        className="form-control font-size-4 text-black-2 arrow-4-black mr-5 rounded-0"
                      >
                        <option value="">Select Skill</option>
                        {(Json.Skill || []).map((data) => {
                          return (
                            <option value={data.value} key={data.id}>
                              {data.value}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="mr-5 mb-5">
                      <select
                        name="job_type"
                        id="job_type"
                        value={jobSwapFilterValue}
                        /*Job Onchange function to filter the data */
                        onChange={(e) => setJobSwapFilterValue(e.target.value)}
                        className="form-control font-size-4 text-black-2 arrow-4-black mr-5 rounded-0"
                      >
                        <option data-display="Experience Level ">
                       Select Job type
                        </option>
                        {(FilterJson.job_type || []).map((job_type) => (
                          <option key={job_type} value={job_type}>
                            {job_type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="row justify-content-center position-static">
              <div className="col-12 col-xxl-10 col-xl-12 col-lg-12">
                {/* <!-- Left Section --> */}
                <div className="Left">
                  <div
                    className="justify-content-center search-nav-tab nav nav-tabs border-bottom-0"
                    id="search-nav-tab"
                    role="tablist"
                  >
                    <div className="mb-8 p-0 w-100 active nav-link active">
                      {/* <!-- Single Featured Job --> */}
                      <JobBox
                        categoryFilterValue={categoryFilterValue}
                        SkillFilterValue={SkillFilterValue}
                        jobSwapFilterValue={jobSwapFilterValue}
                      />
                      {/* <!-- End Single Featured Job --> */}
                    </div>
                  </div>
                </div>
                {/* <!-- form end --> */}
              </div>
              {/* <!-- Right Section --> */}

              {/* <div className="col-12 col-xxl-4 col-xl-5 col-lg-10 position-static">
                <div className="tab-content" id="serachlist-tab">
                  <div className="tab-pane fade show active">
                    <JobDetailPage />
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        {/* <!-- Main Content end --> */}
        <EmployeeFooter />
      </div>
    </>
  );
}

export default JobSearch;
