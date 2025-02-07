import React, { useState, useEffect } from "react";
import { /*GetFilter,*/ GetAgentJson, getallAdminData, getApplicanTypeApi } from "../../api/api";
import { CiSearch } from "react-icons/ci";
import filterjson from "../json/filterjson";

export default function ApplicantsFilter({
  search,
  onSearch,
  // experienceFilterValue,
  // setExperienceFilterValue,
  skillFilterValue,
  // setSkillFilterValue,
  educationFilterValue,
  // setEducationFilterValue,
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
  setCategoryFilterValue,
  categoryFilterValue,
  localFilterValue,
  setLocalFilterValue,
  setFilterByEmployeeId,
  filterByEmployeeId,
  statustFilterValue,
  setStatustFilterValue,
  applicantTypeId
}) {
  // let [SkillList, setSkillList] = useState([]);
  // let [EducationList, setEducationList] = useState([]);
  const [candidateSearch, setcandidateSearch] = useState("");
  let [AgentList, setAgentList] = useState([]);
  let [AdminList, setAdmintList] = useState([]);
  const [applicantTypeList, setApplicantTypeList] = useState([]);
  let portal = localStorage.getItem("portal")
  /*Function to get thejSon */
  const SearchCandidate = () => {
    if (candidateSearch === "") {
      setSearchError("The search field cannot be empty.");
    } else {
      onSearch(candidateSearch);
    }
  };
  /*Render method to get Partner data */
  // useEffect(() => {
  //   if (candidateSearch !== undefined && candidateSearch !== null) {
  //     onSearch(candidateSearch);
  //     setsearchcall(false);
  //   }
  // }, [searchcall]);
  const JsonData = async () => {
    try {
      // let Json = await GetFilter();
      let agentjson = await GetAgentJson();
      // if (Json.data.message === "No data found") {
      //     setSkillList([]);
      //     setEducationList([]);
      // } else {
      //     setSkillList(Json.data.data.Skill);
      //     setEducationList(Json.data.data.Education);
      // }
      if (agentjson.length === 0) {
        setAgentList([]);
      } else {
        setAgentList(agentjson);
      }
    } catch (err) {
      console.log(err);
    }
    try {
      let response = await getApplicanTypeApi();
      setApplicantTypeList(response.data.data);
    } catch (err) {
      console.log(err);
    }
    if (user_type === "admin") {
      try {
        let adminJson = await getallAdminData();
        if (adminJson.data.length === 0) {
          setAdmintList([]);
        } else {
          setAdmintList(adminJson.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      SearchCandidate();
    }
  };
  /*Render method to get the json*/
  useEffect(() => {
    JsonData();
    if ((search === "") === true) {
      setSearchError("");
    }
    // eslint-disable-next-line
  }, [skillFilterValue, educationFilterValue]);
  return (
    <>
      <div
        className={
          // (skill === null || skill === undefined)
          // ?
          "col p-1 form_group mb-3"
          // : "d-none"
        }
      >
        <p className="input_label">Search {portal === "study" ? "Student" : "Candidate"}:</p>
        <div className="input-group ">
          <input
            required
            type="text"
            className="form-control"
            placeholder={`Search ${portal === "study" ? "Student" : "Candidate"}`}
            name="Employee_name"
            onChange={(e) => setcandidateSearch(e)}
            onKeyPress={handleKeyPress}
          />
          <div className="input-group-append">
            <button
              className=""
              type="button"
              onClick={SearchCandidate}
              style={{
                background: "#fff",
                border: "1px solid #ccc",
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                outline: 0,
              }}
            >
              <CiSearch />
            </button>
          </div>
        </div>
        {/* <input
          required
          type="text"
          className="form-control"
          placeholder={"Search Candidate"}
          value={search}
          name={"Employee_name"}
          onChange={(e) => onSearch(e)}
        /> */}
      </div>
      {/* <div
                className={
                    (skill === null || skill === undefined)
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
            </div> */}
      {/* <div
                className={
                    (skill === null || skill === undefined)
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
                    (skill === null || skill === undefined)
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
          (skill === null || skill === undefined) && user_type === "admin"
            ? "col p-1 form_group mb-3"
            : "d-none"
        }
      >
        <p className="input_label">Filter by Partner</p>
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
              {portal === "study" ? "Student" : "Candidate"}'s partner
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
          (skill === null || skill === undefined) && user_type === "admin" && portal === "study"
            ? "col p-1 form_group mb-3"
            : "d-none"
        }
      >
        <p className="input_label">Filter by status</p>
        <div className="select_div">
          <select
            name="status"
            value={statustFilterValue}
            id="status"
            onChange={(e) => {
              setStatustFilterValue(e.target.value);
              setpageNo(1);
            }}
            className="text-capitalize form-control"
          >
            <option value="" data-display="Product Designer">
              Select status            </option>
            {(filterjson.employee_status || []).map((data, index) => {
              return (
                <option value={index + 1} key={index}>
                  {data}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div
        className={
          (skill === null || skill === undefined) && user_type === "admin"
            ? "col p-1 form_group mb-3 "
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
              Admin's {portal === "study" ? "Students" : "Candidates"}
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
          (skill === null || skill === undefined) && pageName === "employee"
            ? "col p-1 form_group mb-3 "
            : "d-none"
        }
      >
        <p className="input_label">Filter by type:</p>
        <div className="select_div">
          <select
            name="interest"
            value={interestFilterValue}
            id="interest"
            onChange={(e) => {
              setinterestFilterValue(e.target.value);
              setpageNo(1);
            }}
            className={` form-control`}
          >
            <option value="" data-display="Product Designer">
              Candidate's Application type
            </option>
            {(applicantTypeList.filter((item) => item.level === (0 || "0")) || []).map((interest, index) => (
              <option
                key={index}
                value={interest.id}
              >
                {interest.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div
        className={
          (skill === null || skill === undefined) &&
            (pageName === "pnp" || pageName === "wes" | pageName === "atip" || pageName === "pgwp" || pageName === "employee")
            ? "col p-1 form_group mb-3"
            : "d-none"
        }
      >
        <p className="input_label">Search by ID:</p>
        <div className="select_div">
          <input
            type="text"
            className="form-control"
            placeholder={"Search by ID"}
            value={filterByEmployeeId}
            id="id"
            name="id"
            onChange={(e) => {
              setFilterByEmployeeId(e.target.value);
              setpageNo(1);
            }}
          />
        </div>
      </div>
      <div
        className={
          (skill === null || skill === undefined) && (
            ["temporary_resident_(visiting_,_studying_,_working)", "economic_immigration", "family_sponsorship", "pnp"].includes(pageName.toLowerCase()) || pageName === "employee")
            ? "col p-1 form_group mb-3"
            : "d-none"
        }
      >
        <p className="input_label">Filter by Sub Type:</p>
        <div className="select_div">
          <select
            name="sub type"
            value={categoryFilterValue}
            id="sub type"
            onChange={(e) => {
              setCategoryFilterValue(e.target.value);
              setpageNo(1);
            }}
            className="text-capitalize form-control"
          >
            <option value={""}>Candidate's sub type</option>
            {(applicantTypeList.filter((item) => pageName === "employee" ? item.level === "1" : (item.level === "1" && item.parent_id === applicantTypeId))).map((subType, index) => (
              <option key={index} value={subType.id} className={`text-capitalize`}>
                {subType.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={
        (skill === null || skill === undefined) &&
          (pageName === "employee")
          ? "col form_group mt-8"
          : "d-none"
      }>
        <label
          htmlFor="local"
          className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
        >

          <input
            type="checkbox"
            id="local"
            name="local"
            checked={localFilterValue === 1}
            value={localFilterValue}
            onChange={(e) =>
              setLocalFilterValue(localFilterValue === 1 ? 0 : 1)
            }
          /> <span >Local</span>
        </label>
      </div>

    </>
  );
}
