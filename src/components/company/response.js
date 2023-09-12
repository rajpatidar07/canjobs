import React, { useState, useEffect } from "react";
import Footer from "../common/footer";
import Headers from "../common/header";
import JobBoxResponse from "./jobBoxResponse";
import SearchForm from "../common/search_form";
import { Link } from "react-router-dom";
import { GetFilter } from "../../api/api";
import FilterJson from "../json/filterjson";
import Loader from '../common/loader';
function Response() {
  let [filter, SetFilter] = useState([]);
  /*Filter states */
  const [categoryFilterValue, setCategoryFilterValue] = useState("");
  const [jobSwapFilterValue, setJobSwapFilterValue] = useState("");
  const [SkillFilterValue, setSkillFilterValue] = useState("");
  const [locationFilterValue, setLocationFilterValue] = useState("");

  /* Function to get the JSON data*/
  const FilterData = async () => {
    try {
      const Json = await GetFilter();
      if(Json.data.message ==='No data found' ||Json.length === 0){
        SetFilter([])
      }else{
        SetFilter(Json.data.data);
      }
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    FilterData();
  }, [categoryFilterValue, SkillFilterValue, jobSwapFilterValue, locationFilterValue]);
  return (
    <>
      <div>
        <Headers />
        {/* <!-- Main Content Start --> */}
        <div className="bg-black-2 mt-15 mt-lg-18 pt-18 pt-lg-13 pb-13">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-12 translateY-25  pb-10">
                {/* <!-- form --> */}
                <SearchForm />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-default-1 pt-9 pb-10 pb-xl-30 pb-13 position-relative overflow-hidden">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10 col-xl-12">

                <form className="mb-8" action="/">
                  <div className="search-filter from-group d-flex align-items-center ">
                    <div className="col-md-3 col-lg-3 mb-5">
                      <select
                        name="category"
                        id="category"
                        value={categoryFilterValue}
                        /*Category Onchange function to filter the data */
                        onChange={(e) => setCategoryFilterValue(e.target.value)}
                        className="text-capitalize form-control font-size-4 text-black-2 arrow-4-black mr-5 rounded-0"
                      >
                        <option value="">Select Job Category</option>
                        {(filter.Category || []).map((data, i) => {
                          return (
                            <option value={data.value} key={data.id}>
                              {data.value}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col-md-3 col-lg-3 mb-5">
                      <select
                        name="skill"
                        id="skill"
                        value={SkillFilterValue}
                        /*Skill Onchange function to filter the data */
                        onChange={(e) => setSkillFilterValue(e.target.value)}
                        className="text-capitalize form-control font-size-4 text-black-2 arrow-4-black mr-5 rounded-0"
                      >
                        <option value={''}>Select Job Skills</option>
                        {(FilterJson.keyskill || []).map((data, i) => {
                          return (
                            <option value={data} key={i}>
                              {data}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col-md-3 col-lg-3 mb-5">
                      <select
                        name="skill"
                        id="skill"
                        value={locationFilterValue}
                        /*Skill Onchange function to filter the data */
                        onChange={(e) => setLocationFilterValue(e.target.value)}
                        className="text-capitalize form-control font-size-4 text-black-2 arrow-4-black mr-5 rounded-0"
                      >
                        <option value="">Select Job Location</option>
                        {(FilterJson.location || []).map((data, i) => {
                          return (
                            <option value={data} key={i}>
                              {data}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col-md-3 col-lg-3 mb-5">
                      <select
                        name="job_type"
                        id="job_type"
                        value={jobSwapFilterValue}
                        /*Job Onchange function to filter the data */
                        onChange={(e) => setJobSwapFilterValue(e.target.value)}
                        className="form-control font-size-4 text-black-2 arrow-4-black mr-5 rounded-0"
                      >
                        <option value="">Select Job Type</option>
                        {(FilterJson.job_type || []).map((data, i) => {
                          return (
                            <option value={data} key={i}>
                              {data}
                            </option>
                          );
                        })}
                        {/* {(FilterJson.job_type || []).map((job_type) => (
                          <option key={job_type} value={job_type}>
                            {job_type}
                          </option>
                        ))} */}
                      </select>
                    </div>
                  </div>
                </form>
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
                    {<JobBoxResponse /> ? <div className="mb-8 p-0 w-100 active nav-link active">
                      {/* <!-- Single Featured Job --> */}
                      <JobBoxResponse
                        categoryFilterValue={categoryFilterValue}
                        jobSwapFilterValue={jobSwapFilterValue}
                        SkillFilterValue={SkillFilterValue}
                        locationFilterValue={locationFilterValue}
                      />
                      {/* <!-- End Single Featured Job --> */}
                    </div> : <div className="table-responsive main_table_div"><Loader /> </div>}
                  </div>
                  <div className="text-center pt-5 pt-lg-13">
                    <Link
                      to={""}
                      className="text-green font-weight-bold text-uppercase font-size-3 d-flex align-items-center justify-content-center"
                    >
                      Load More
                      <i className="fas fa-sort-down ml-3 mt-n2 font-size-4"></i>
                    </Link>
                  </div>
                </div>
                {/* <!-- form end --> */}
              </div>
              {/* <!-- Right Section --> */}
            </div>
          </div>
        </div>
        {/* <!-- Main Content end --> */}
        <Footer />
      </div>
    </>
  );
}

export default Response;
