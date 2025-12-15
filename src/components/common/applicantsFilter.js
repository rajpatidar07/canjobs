import React, { useState, useEffect } from "react";
import {
  /*GetFilter,*/ GetAgentJson,
  getallAdminData,
  getApplicanTypeApi,
} from "../../api/api";
import { CiSearch } from "react-icons/ci";
import filterjson from "../json/filterjson";
import SelectBox from "./Common function/SelectBox";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
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
  applicantTypeId,
  applicantTypeChildId,
  setSearch,
  webFilterValue,
  setWebFilterValue,
  setConsultationOptedFilterValue,
  setConsultationStartDateFilterValue,
  setConsultationEndDateFilterValue,
  consultationOptedFilterValue,
  consultationStartDateFilterValue,
  consultationEndDateFilterValue,

}) {
  // let [SkillList, setSkillList] = useState([]);
  // let [EducationList, setEducationList] = useState([]);
  const [candidateSearch, setcandidateSearch] = useState("");
  let [AgentList, setAgentList] = useState([]);
  let [AdminList, setAdmintList] = useState([]);
  const [applicantTypeList, setApplicantTypeList] = useState([]);
  let portal = localStorage.getItem("portal");
  let header = localStorage.getItem("admin_heading");
  // let StatusTab = localStorage.getItem("StatusTab");

  /*Function to search */
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
      let response = await getApplicanTypeApi("");
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
  }, [skillFilterValue, educationFilterValue, applicantTypeId]);

  /*on change function of date piker of consultation */
  const handleChange = (range) => {
    const [startDate, endDate] = range;
    setConsultationStartDateFilterValue(startDate);
    setConsultationEndDateFilterValue(endDate);
  };
  return (
    <div
      className="row mb-3"
      // style={{ gap: "5px", margin: 0 }}
    >
      <div
        className={
          // (skill === null || skill === undefined)
          // ?
          "col-sm-12 col-sx-12 col-md-6 col-lg col-xl col-md-4 form_group p-2"
          // : "d-none"
        }
      >
        <p className="input_label">
          Search {portal === "study" ? "Student" : "Candidate"}:
        </p>
        <div className="input-group ">
          <input
            required
            type="text"
            className="form-control input-height"
            placeholder={`Search ${portal === "study" ? "Student" : "Candidate"
              }`}
            name="Employee_name"
            value={candidateSearch}
            onChange={(e) => setcandidateSearch(e.target.value)}
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
                height: "40px"
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
                        ? "col form_group p-2"
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
                        ? "col form_group p-2"
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
                        ? "col form_group p-2"
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
            ? "col-sm-12 col-sx-12 col-md-6 col-lg col-xl col-md-4 form_group p-2"
            : "d-none"
        }
      >
        <p className="input_label">Filter by Partner</p>
        <div className="select_div">
          <SelectBox
            Width={"yes"} options={(AgentList.map((option) => ({
              value: option.id,
              label: option.name,
            })) || [])}
            selectedValue={agentFilterValue}
            onChange={(e) => {
              setAgentFilterValue(e ? e.value : null);
              setpageNo(1);
            }}
            type={"agent"}
          />
        </div>
      </div>
      <div
        className={
          (skill === null || skill === undefined) &&
            user_type === "admin" &&
            portal === "study"
            ? "col-sm-12 col-sx-12 col-md-6 col-lg col-xl col-md-4 form_group p-2"
            : "d-none"
        }
      >
        <p className="input_label">Filter by status</p>
        <div className="select_div">
          <SelectBox
            Width={"yes"} options={(filterjson.employee_status.map((option, index) => ({
              value: option.value,
              label: option.label,
            })) || [])}
            selectedValue={statustFilterValue}
            onChange={(e) => {
              setStatustFilterValue(e ? e.value : null);
              setpageNo(1);
            }}
            type={"status"}
          />
        </div>
      </div>
      <div
        className={
          (skill === null || skill === undefined) && user_type === "admin"
            ? "col-sm-12 col-sx-12 col-md-6 col-lg col-xl col-md-4 form_group p-2 "
            : "d-none"
        }
      >
        <p className="input_label">Filter by Admin:</p>
        <div className="select_div">
          <SelectBox
            Width={"yes"} options={(AdminList.map((option, index) => ({
              value: option.admin_id,
              label: option.name,
            })) || [])}
            selectedValue={adminFilterValue}
            onChange={(e) => {
              setAdminFilterValue(e ? e.value : null);
              setpageNo(1);
            }}
            type={"admin"}
          />
        </div>
      </div>
      <div
        className={
          (skill === null || skill === undefined) && pageName === "employee"
            ? "col-sm-12 col-sx-12 col-md-6 col-lg col-xl col-md-4 form_group p-2 "
            : "d-none"
        }
      >
        <p className="input_label">Filter by type:</p>
        <div className="select_div">
          <SelectBox
            Width={"yes"} options={(applicantTypeList.map((option) => ({
              value: option.id,
              label: option.title,
            })) || [])}
            selectedValue={interestFilterValue}
            onChange={(e) => {
              setinterestFilterValue(e ? e.value : null);
              setpageNo(1);
            }}
            type={"interest"}
          />
        </div>
      </div>
      <div
        className={
          (skill === null || skill === undefined) &&
            (pageName === "4" ||
              pageName === 4 ||
              (pageName === "21" || pageName === 21) |
              (pageName === "22" || pageName === 22) ||
              pageName === "12" ||
              pageName === 12 ||
              pageName === "employee")
            ? "col-sm-12 col-sx-12 col-md-6 col-lg col-xl col-md-4 form_group p-2"
            : "d-none"
        }
      >
        <p className="input_label">Search by ID:</p>
        <div className="select_div">
          <input
            type="text"
            className="form-control input-height"
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
          (skill === null || skill === undefined) &&
            ([14, "14", 15, "15", 16, "16", 4, "4"].includes(pageName) ||
              pageName === "employee") &&
            !applicantTypeChildId
            ? "col-sm-12 col-sx-12 col-md-6 col-lg col-xl col-md-4 form_group p-2"
            : "d-none"
        }
      >
        <p className="input_label">Filter by Sub Type:</p>
        <div className="select_div">
          <SelectBox
            Width={"yes"} options={(applicantTypeList
              .filter((item) =>
                pageName === "employee"
                  ? item.level === "1"
                  : item.level === "1" && item.parent_id === applicantTypeId
              ).map((option) => ({
                value: option.id,
                label: option.title,
              })) || [])}
            selectedValue={categoryFilterValue}
            onChange={(e) => {
              setCategoryFilterValue(e ? e.value : null);
              setpageNo(1);
            }}
            type={"sub_type"}
          />
        </div>
      </div>
      {(header === "New Applicants" || header === "Manage Applicants") &&
        <>
          <div className="col-sm-12 col-sx-12 col-md-6 col-lg col-xl col-md-4 form_group p-2">
            <p className="input_label">
             Consult Opted:
            </p>
            <select
              className={"form-control input-height"}
              value={consultationOptedFilterValue}
              onChange={(e) => setConsultationOptedFilterValue(e.target.value)}
              id="consultation_opted"
              name="consultation_opted"
            >
              <option value={""}>Select</option>
              <option value={"1"}>Yes</option>
              <option value={"0"}>No</option>
            </select>
          </div>
          <div className="col-sm-12 col-sx-12 col-md-6 col-lg col-xl col-md-4 form_group p-2">
            <p className="input_label">
              Consultation Date:
            </p>
            <DatePicker
              selected={consultationStartDateFilterValue}
              onChange={handleChange}
              startDate={consultationStartDateFilterValue}
              endDate={consultationEndDateFilterValue}
              selectsRange
              dateFormat="dd-MM-yyyy"
              className="form-control input-height"
              placeholderText="DD-MM-YYYY DD-MM-YYYY"
            />
          </div>
        </>}
      <div
        className={
          (skill === null || skill === undefined) && pageName === "employee"
            ? "col form_group p-2"
            : "d-none"
        }
      >
        <label
          htmlFor="web"
          className="font-size-3 text-black-2 font-weight-semibold line-height-reset d-flex pb-1 m-0"
        >
          <input
            type="checkbox"
            id="web"
            name="web"
            checked={webFilterValue === 0 || webFilterValue === "0"}
            value={webFilterValue}
            onChange={(e) =>
              setWebFilterValue(webFilterValue === "" ? 0 : "")
            }
          />
          <span>Web</span>
        </label>
        <label
          htmlFor="local"
          className="font-size-3 text-black-2 font-weight-semibold line-height-reset d-flex pb-1 m-0"
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
          />
          <span>Local</span>
        </label>
      </div>

      <div className={"col-sm-12 col-sx-12 col-md-6 col-lg col-xl col-md-4 form_group p-2"}>
        <button
          className="btn btn-primary w-100"
          onClick={() => {
            const clearFiltersByPageName = () => {
              if (pageName === "employee") {
                setLocalFilterValue("");
                setCategoryFilterValue("");
                setFilterByEmployeeId("");
                setinterestFilterValue("");
                setAdminFilterValue("");
                setAgentFilterValue("");
                setcandidateSearch("");
                setSearch("");
                setWebFilterValue("");
                localStorage.setItem("StatusTab", "");
                if (portal === "study") {
                  setStatustFilterValue("");
                  setSearch("");
                  setcandidateSearch("");
                }
                if (header === "New Applicants" || header === "Manage Applicants") {
                  setConsultationStartDateFilterValue("")
                  setConsultationEndDateFilterValue("")
                  setConsultationOptedFilterValue("")
                }
              } else if (["4", "21", "22", "12"].includes(pageName)) {
                setFilterByEmployeeId("");
                setSearch("");
                setcandidateSearch("");
              } else if (
                ["14", "15", "16"].includes(pageName) &&
                !applicantTypeChildId
              ) {
                setCategoryFilterValue("");
                setSearch("");
                setcandidateSearch("");
              } else {
                // Default clear all filters if pageName does not match above
                if (pageName !== "local_candidate") {
                  setCategoryFilterValue("");
                  setcandidateSearch("");
                } setinterestFilterValue("");
                setAdminFilterValue("");
                setAgentFilterValue("");
                setcandidateSearch("");
                setSearch("");
                if (portal === "study") {
                  setStatustFilterValue("");
                  setcandidateSearch("");
                }
              }
              setSearch("");
              setpageNo(1);
            };
            clearFiltersByPageName();
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
