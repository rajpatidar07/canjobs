import React, { useEffect, useState } from "react";
import EmployeeHeader from "../common/header";
import EmployeeFooter from "../common/footer";
import SearchForm from "../common/search_form";
import { getJson } from "../../api/api";
import CustomButton from "../common/button";
import filterjson from "../json/filterjson";
import DetailedMainJobComponent from "../common/New job box/detailedMainJobComponent";
function DemoJob() {
    const [jobsNo, setJobsNo] = useState(6);
    const [jobCount, setJobCount] = useState();
    const [totaljob, setTotalJob] = useState();

    // let token = localStorage.getItem("token");
    /*Filter states */
    const [categoryFilterValue, setCategoryFilterValue] = useState("");
    const [SkillFilterValue, setSkillFilterValue] = useState("");
    const [jobSwapFilterValue, setJobSwapFilterValue] = useState("");
    const [jobLocation, setJobLocation] = useState("");
    let [Json, setJson] = useState([]);
    /*Function to get thejSon */
    const JsonData = async () => {
        try {
            let Json = await getJson();
            setJson(Json);
        } catch (err) {
            console.log(err);
        }
    };
    /*Render Method */
    useEffect(() => {
        JsonData();
    }, [categoryFilterValue, SkillFilterValue, jobSwapFilterValue, jobLocation]);
    // eslint-disable-next-line no-use-before-define
    /*Function to Rest the feilds */
    let onReset = () => {
        setCategoryFilterValue("");
        setSkillFilterValue("");
        setJobSwapFilterValue("");
        setJobLocation("");
    };


    return (
        <div className="site-wrapper overflow-hidden ">
            <EmployeeHeader />
            {/* <!-- Hero Area --> */}
            <div className="position-relative z-index-1 bg-home-banner pt-26 pb-26 dark-mode-texts">
                <div className="container position-static hero_container">
                    <div className="row position-relative align-items-center justify-content-center position-static w-80">
                        {/* <!-- Hero Form --> */}
                        <div className="col-lg-12 col-12 translateY-25 pt-lg-12 pb-lg-33 pb-md-28 pb-xs-26 pb-29 pt-md-20">
                            <SearchForm />
                        </div>
                        {/* <!-- End Hero Form --> */}{" "}
                    </div>

                </div>
            </div>
            {/* <!-- Hero Area --> */}
            {/* <!-- featuredJobOne Area --> */}
            <section className="bg-athens pt-12 pt-lg-25">
                <div className="container ">
                    <div className="row ">
                        <div className="col-12 col-lg-12 col-xl-12 text-center">
                            <form className="mb-8" action="/">
                                <div className="search-filter from-group d-flex align-items-center justify-content-center job_search_filter">
                                    <div className="col-md-5 col-lg-5 mb-5">
                                        <select
                                        style={{height:"4rem"}}
                                            name="skill"
                                            id="skill"
                                            value={SkillFilterValue}
                                            /*Skill Onchange function to filter the data */
                                            onChange={(e) => setSkillFilterValue(e.target.value)}
                                            className="form-control text-capitalize font-size-4 text-black-2 arrow-4-black mr-5 rounded-0"
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
                                    <div className="col-md-5 col-lg-5 mb-5">
                                        <select
                                        style={{height:"4rem"}}
                                            name="job_type"
                                            id="job_type"
                                            value={jobSwapFilterValue}
                                            /*Job Onchange function to filter the data */
                                            onChange={(e) => setJobSwapFilterValue(e.target.value)}
                                            className="form-control text-capitalize font-size-4 text-black-2 arrow-4-black mr-5 rounded-0"
                                        >
                                            <option value="">Select Job type</option>
                                            {(filterjson.job_type || []).map((job_type) => (
                                                <option key={job_type} value={job_type}>
                                                    {job_type}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-2 col-lg-2 mb-5">
                                        <CustomButton
                                            className="font-size-3 rounded-3 btn btn-primary border-0"
                                            onClick={() => onReset()}
                                            title="Reset"
                                            type="button"
                                        >
                                            Reset
                                        </CustomButton>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <DetailedMainJobComponent
                            setJobCount={setJobCount}
                            jobsNo={jobsNo}
                            setTotalJob={setTotalJob}
                            SkillFilterValue={SkillFilterValue}
                            column="job_id"
                            // sort_order="ASC"
                            categoryFilterValue={categoryFilterValue}
                            jobSwapFilterValue={jobSwapFilterValue}
                            jobLocation={jobLocation}
                            setJobLocation={setJobLocation}
                            setJobsNo={setJobsNo}
                            totaljob={totaljob}
                            jobCount={jobCount} />

                    </div>
                </div>

            </section >
            <EmployeeFooter />
        </div >
    );
}
export default DemoJob;
