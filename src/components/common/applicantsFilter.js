import React, { useState, useEffect } from "react";
import FilterJson from "../json/filterjson";
import { /*GetFilter,*/ GetAgentJson, getallAdminData } from "../../api/api";
import { CiSearch } from "react-icons/ci";

export default function ApplicantsFilter({
  search,
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
  setCategoryFilterValue,
  categoryFilterValue,
  localFilterValue,
  setLocalFilterValue
}) {
  // let [SkillList, setSkillList] = useState([]);
  // let [EducationList, setEducationList] = useState([]);
  // const [searchcall, setsearchcall] = useState(false);
  const [candidateSearch, setcandidateSearch] = useState("");
  let [AgentList, setAgentList] = useState([]);
  let [AdminList, setAdmintList] = useState([]);
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
        <p className="input_label">Search Candidate:</p>
        <div className="input-group ">
          <input
            required
            type="text"
            className="form-control"
            placeholder="Search Candidate"
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
              Candidate's partner
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
              Admin's Candidates
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
        <p className="input_label">Filter by Application type:</p>
        <div className="select_div">
          <select
            name="interest"
            value={interestFilterValue}
            id="interest"
            onChange={(e) => {
              setinterestFilterValue(e.target.value);
              setpageNo(1);
            }}
            className={` form-control ${interestFilterValue === "pnp"
                ? `text-uppercase`
                : "text-capitalize"
              }`}
          >
            <option value="" data-display="Product Designer">
              Candidate's Application type
            </option>
            {(FilterJson.interested || []).map((interest) => (
              <option
                key={interest}
                value={interest}
                className={
                  interest === "pnp" ? `text-uppercase` : "text-capitalize"
                }
              >
                {interest}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div
        className={
          (skill === null || skill === undefined) &&
            (pageName === "pnp" || pageName === "employee")
            ? "col p-1 form_group mb-3"
            : "d-none"
        }
      >
        <p className="input_label">Search by Candidate ID:</p>
        <div className="select_div">
          <input
            type="text"
            className="form-control"
            placeholder={"Search by ID"}
            value={categoryFilterValue}
            id="sub type"
            name="sub type"
            onChange={(e) => {
              setCategoryFilterValue(e.target.value);
              setpageNo(1);
            }}
          />
        </div>
      </div>
      <div className={
        (skill === null || skill === undefined) &&
          (pageName === "local" || pageName === "employee")
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
              setLocalFilterValue(1)
            }
          /> <span >Local</span>
        </label>
      </div>
      {/* <div
                className={
                    (skill === null || skill === undefined) && (
                        pageName === "pnp" || pageName === "employee")
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
                        <option value={"aos"}>AOS</option>
                        <option value={"rrs"}>RRS</option>
                        <option value={"tech pathway"}>Tech Pathway</option>
                    </select>
                </div>
            </div> */}
    </>
  );
}
