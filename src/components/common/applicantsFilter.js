import React, { useState, useEffect } from 'react'
import FilterJson from "../json/filterjson";
import { GetFilter, GetAgentJson, getallAdminData } from "../../api/api";

export default function ApplicantsFilter({ search,
    onSearch,
    experienceFilterValue,
    setExperienceFilterValue,
    skillFilterValue,
    setSkillFilterValue,
    educationFilterValue,
    setEducationFilterValue,
    setpageNo,
    agentFilterValue,
    setAgentFilterValue,
    user_type,
    adminFilterValue,
    setAdminFilterValue,
    interestFilterValue,
    setinterestFilterValue,
    setSearchError,
    skill,
    pageName,
}) {
    let [SkillList, setSkillList] = useState([]);
    let [EducationList, setEducationList] = useState([]);
    let [AgentList, setAgentList] = useState([]);
    let [AdminList, setAdmintList] = useState([]);
    /*Function to get thejSon */
    const JsonData = async () => {
        try {
            let Json = await GetFilter();
            let agentjson = await GetAgentJson();
            if (Json.data.message === "No data found") {
                setSkillList([]);
                setEducationList([]);
            } else {
                setSkillList(Json.data.data.Skill);
                setEducationList(Json.data.data.Education);
            }
            if (agentjson.length === 0) {
                setAgentList([]);
            } else {
                setAgentList(agentjson);
            }

        } catch (err) {
            console.log(err);
        }
        if (user_type === "admin") {
            try {
                let adminJson = await getallAdminData()
                if (adminJson.data.length === 0) {
                    setAdmintList([]);
                } else {
                    setAdmintList(adminJson.data);
                }
            } catch (err) {
                console.log(err)
            }
        }
    };
    /*Render method to get the json*/
    useEffect(() => {
        JsonData();
        if ((search === "") === true) {
            setSearchError("");
        }
    }, [skillFilterValue, educationFilterValue]);
    return (
        <>
            <div
                className={
                    skill === null || skill === undefined
                        ? "col p-1 form_group mb-3"
                        : "d-none"
                }
            >
                <p className="input_label">Search Employee:</p>
                <input
                    required
                    type="text"
                    className="form-control"
                    placeholder={"Search Employee"}
                    value={search}
                    name={"Employee_name"}
                    onChange={(e) => onSearch(e)}
                />
            </div>
            <div
                className={
                    skill === null || skill === undefined
                        ? "col p-1 form_group mb-3"
                        : "d-none"
                }
            >
                <p className="input_label">Filter by Experience:</p>
                <div className="select_div">
                    <select
                        name="experience"
                        value={experienceFilterValue}
                        id="experience"
                        onChange={(e) => {
                            setExperienceFilterValue(e.target.value);
                            setpageNo(1);
                        }}
                        className="text-capitalize form-control"
                    >
                        <option value={""}>Select Experience</option>
                        {(FilterJson.experience || []).map((ex, i) => (
                            <option value={ex} key={i}>
                                {ex}
                                {ex === "fresher" || ex === "Other" ? "" : "Years"}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {/* <div
                className={
                    skill === null || skill === undefined
                        ? "col p-1 form_group mb-3"
                        : "d-none"
                }
            >
                <p className="input_label">Filter by Skill:</p>
                <div className="select_div">
                    <select
                        name="skill"
                        value={skillFilterValue}
                        id="Skill"
                        onChange={(e) => {
                            setSkillFilterValue(e.target.value);
                            setpageNo(1);
                        }}
                        className="text-capitalize form-control"
                    >
                        <option value={""}>Select Skill</option>
                        {(SkillList || []).map((data) => {
                            return (
                                <option value={data.value} key={data.id}>
                                    {data.value}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div> */}
            {/* <div
                className={
                    skill === null || skill === undefined
                        ? "col p-1 form_group mb-3"
                        : "d-none"
                }
            >
                <p className="input_label">Filter by Education:</p>
                <div className="select_div">
                    <select
                        name="education"
                        value={educationFilterValue}
                        id="education"
                        onChange={(e) => {
                            setEducationFilterValue(e.target.value);
                            setpageNo(1);
                        }}
                        className="text-capitalize form-control"
                    >
                        <option value="" data-display="Product Designer">
                            Select Education
                        </option>
                        {(EducationList || []).map((data) => {
                            return (
                                <option value={data.value} key={data.id}>
                                    {data.value}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div> */}

            <div
                className={
                    skill === null || skill === undefined && user_type === "admin"
                        ? "col p-1 form_group mb-3"
                        : "d-none"
                }
            >
                <p className="input_label">Filter by Agent:</p>
                <div className="select_div">
                    <select
                        name="agent"
                        value={agentFilterValue}
                        id="agent"
                        onChange={(e) => {
                            setAgentFilterValue(e.target.value);
                            setpageNo(1);
                        }}
                        className="text-capitalize form-control"
                    >
                        <option value="" data-display="Product Designer">
                            Select Agent
                        </option>
                        {(AgentList || []).map((data) => {
                            return (
                                <option value={data.id} key={data.id}>
                                    {data.name}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
            <div
                className={
                    skill === null || skill === undefined
                        && user_type === "admin" ? "col p-1 form_group mb-3 "
                        : "d-none"
                }
            >
                <p className="input_label">Filter by Admin:</p>
                <div className="select_div">
                    <select
                        name="admin"
                        value={adminFilterValue}
                        id="admin"
                        onChange={(e) => {
                            setAdminFilterValue(e.target.value);
                            setpageNo(1);
                        }}
                        className="text-capitalize form-control"
                    >
                        <option value="" data-display="Product Designer">
                            Select Admin
                        </option>
                        {(AdminList || []).map((data) => {
                            return (
                                <option value={data.admin_id} key={data.admin_id}>
                                    {data.name}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
            <div
                className={
                    skill === null || skill === undefined && (pageName === "employee") ?
                        "col p-1 form_group mb-3 "
                        : "d-none"
                }
            >
                <p className="input_label">Filter by Appication type:</p>
                <div className="select_div">
                    <select
                        name="interest"
                        value={interestFilterValue}
                        id="interest"
                        onChange={(e) => {
                            setinterestFilterValue(e.target.value);
                            setpageNo(1);
                        }}
                        className="text-capitalize form-control"
                    >
                        <option value="" data-display="Product Designer">
                            Select Appication type
                        </option>
                        {(FilterJson.Applicantscategories || []).map((data) => {
                            return (
                                <option value={data.label} key={data.value}
                                    className={data.label === "pnp" ?
                                        `text-uppercase` :
                                        "text-capitalize"}>
                                    {data.label}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
        </>
    )
}
