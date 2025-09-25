
import React, { /*useEffect, useRef,*/ useEffect, useState } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import { CiSearch } from "react-icons/ci";
// import { IoPersonCircleOutline } from "react-icons/io5";
// import { FaAngleDown } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { getallAdminData } from "../../api/api";
// import ConsultationTable from "../common/ConsultationTable";
import EmployeeTable from "../common/employeeTable";
import DatePicker from "react-datepicker";
import PersonalDetails from "../forms/user/personal";
import SelectBox from "../common/Common function/SelectBox";
import filterjson from "../json/filterjson";
import CommonThreeDots from "../common/Common function/commonThreeDots";
import { getallEmployeeData } from "../../api/api";

  const getThirtyDaysAgo = () => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date;
  };
const ManageConsultation = () => {
  // const [showdropdown, setShowdropdown] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");
  const [consultationOptedFilterValue, setConsultationOptedFilterValue] = useState("");
  const [consultationStartDateFilterValue, setConsultationStartDateFilterValue] = useState(getThirtyDaysAgo());
  const [consultationEndDateFilterValue, setConsultationEndDateFilterValue] = useState(new Date());
  const [filterByEmployeeId, setFilterByEmployeeId] = useState("");
  const [statusFilterValue, setStatusFilterValue] = useState("");
  // const [selectedAdminId, setSelectedAdminId] = useState(null);
  // const [selectedAdminType, setSelectedAdminType] = useState(null);
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [employeeId, setEmployeeId] = useState();
  const [apiCall, setApiCall] = useState(false);
  // const [dayFilterValue, setDayFilterValue] = useState("");
  const [exportrData, setExportData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  // const [showfilterdropdown, setShowfilterdropdown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  // const [adminList, setAdminList] = useState([false]);
  const [searchCandidate, setSearchCandidate] = useState("");
  // const [resetWithoutConsultationId, setResetWithoutConsultationId] = useState(false);
  // const dropdownRef = useRef(null);

  let getExportedConsultationData = async () => {
    try {
      const userData = await getallEmployeeData(
        searchCandidate,
        "",// props.experienceFilterValue,
        "",// props.skillFilterValue,
        "",// props.educationFilterValue,
        null,// props.pageNo,
        null,//recordsPerPage,
        "",//columnName,
        "",//sortOrder,
        "",// props.filter_by_time,
        "",
        statusFilterValue,
        "",// props.job_id
        filterByEmployeeId,
        "",// location.pathname === "/slots"? props?.ApplicantType: props.interestFilterValue,
        "",
        "",// user_type === "agent" ? agentId : props.agentFilterValue,
        "",//props.adminFilterValue,
        "", // props.categoryFilterValue,
        "",//  props.localFilterValue,
        "",//  props.webFilterValue,
        consultationOptedFilterValue,
        consultationStartDateFilterValue,
        consultationEndDateFilterValue,
        // props.subCategoryFilterValue
      );
      console.log(userData.data,"p")
      // const newArray = transformUserData(userData.data);
      // console.log(newArray);
      setExportData(userData.data)
    } catch (err) {
      console.log(err);
    }
  };
  // key mapping
// const keyMap = {
//   employee_id: "EID",
//   name: "Name",
//   created_by_admin: "Created by",
//   assigned_by: "Assigned Admin",
//   last_updated_by_name: "Last Modified",
//   created_at: "Date added",
//   reffer_by: "Partner",
//   applicant_process_status: "Applicant Stage",
//   interested_in_id: "Applicant Type",
//   status: "Status",
//   consultation_opted: "Consultation Opted",
//   consultation_date: "Consultation Date",
//   signature_status: "RA Signature status",
//   received_date: "RA Received date",
//   payment_mode: "Payment Mode",
//   payment_date: "Payment Date",
//   email: "email",
//   contact_no: "contact_no",
//   description: "description",
//   date_of_birth: "date_of_birth",
//   gender: "gender",
//   marital_status: "marital_status",
//   nationality: "nationality",
//   current_location: "current_location",
//   currently_located_country: "currently_located_country",
//   experience: "experience",
//   work_permit_canada: "work_permit_canada",
//   work_permit_other_country: "work_permit_other_country",
//   category: "category",
//   profile_complete: "profile"
// };

// function transformUserData(userData) {
//   return userData.map(user => {
//     let newObj = {};
//     for (let key in keyMap) {
//       newObj[keyMap[key]] = user[key] ?? null;
//     }
//     return newObj;
//   });
// }


  useEffect(() => {
    console.log(consultationOptedFilterValue,
    consultationStartDateFilterValue,
    consultationEndDateFilterValue,
    searchCandidate,
    statusFilterValue,
    filterByEmployeeId)
    getExportedConsultationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consultationOptedFilterValue,
    consultationStartDateFilterValue,
    consultationEndDateFilterValue,
    searchCandidate,
    statusFilterValue,
    filterByEmployeeId,]);
  // const filteredAdmins = adminList
  //   ? adminList?.filter((admin) =>
  //     admin?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  //   )
  //   : [];

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setShowdropdown(false);
  //     }
  //   }
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);
  /*on change function of date piker of consultation */
  const handleChange = (range) => {
    const [startDate, endDate] = range;
    setConsultationStartDateFilterValue(startDate);
    setConsultationEndDateFilterValue(endDate);
  };
  /* Function to show the single data to update Employee*/
  const editEmployee = (e) => {
    setShowAddItemForm(true);
    setEmployeeId(e);
  };
  return (
    <div className="site-wrapper overflow-hidden bg-default-2">
      {showAddItemForm ? (
        <PersonalDetails
          show={showAddItemForm}
          employeeId={employeeId}
          apiCall={apiCall}
          setApiCall={setApiCall}
          close={() => setShowAddItemForm(false)}
        />
      ) : null}
      {/* Header & Sidebar */}
      <AdminHeader heading={"Manage Consultation Log"} />
      <AdminSidebar heading={"Manage Consultation Log"} />

      <div className="dashboard-main-container" id="dashboard-body">
        <div className="container-fluid">
          <div className="mb-18">
            <div className="mb-4 align-items-center">
              <div className="page___heading">
                <h3 className="font-size-6 mb-0">Manage Consultation Log</h3>
              </div>
            </div>

            <div className="d-flex ">
              {/* New Item Dropdown */}
              {/* <div className="position-relative mr-2">
                <button
                  className="font-size-4 rounded-3 border-0 btn btn-primary p-2 mr-4"
                  onClick={() => {
                    editEmployee("0")
                    // setShowdropdown(false);
                    // // setShowfilterdropdown(false);
                    // setShowAddItemForm(true);
                  }}
                >
                  <span className="ml-4">New Item</span>
                  <span className=" d-none ml-4 font-size-3 border-left-1">
                    <FaAngleDown />
                  </span>
                </button>
              </div> */}

              {/* Search */}
              <div
                className="input-group mr-4 "
                style={{
                  width: isFocused ? "300px" : "100px",
                  transition: "width 0.3s ease-in-out",
                }}
              >
                <div className="input-group-append">
                  <button
                    className="form-control"
                    type="button"
                    style={{
                      background: "#fff",
                      border: "none",
                      outline: 0,
                      height: "2.5rem",
                    }}
                  >
                    <CiSearch />
                  </button>
                </div>
                <input
                  required
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  style={{ height: "2.5rem" }}
                  value={searchCandidate}
                  onChange={(e) => setSearchCandidate(e.target.value)}
                />
              </div>
              <div className="col form_group mr-4 ">
                <div className="select_div">
                  <select
                    className={"form-control"}
                    value={consultationOptedFilterValue}
                    onChange={(e) => setConsultationOptedFilterValue(e.target.value)}
                    id="consultation_opted"
                    name="consultation_opted"
                    style={{ height: "2.5rem" }}

                  >
                    <option value={""}> Filter by Consultation Opted</option>
                    <option value={"1"}>Yes</option>
                    <option value={"0"}>No</option>
                  </select>
                </div>
              </div>

              <div
                className={"col form_group"}      >
                <div className="select_div">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={"Search by ID"}
                    value={filterByEmployeeId}
                    style={{ height: "2.5rem" }}
                    id="id"
                    name="id"
                    onChange={(e) => {
                      setFilterByEmployeeId(e.target.value);
                      setPageNo(1);
                    }}
                  />
                </div>
              </div>
              <div
                className={"col form_group "}>
                <div className="select_div">
                  <SelectBox
                    Width={"yes"}
                    options={(filterjson.employee_status.map((option, index) => ({
                      value: option.value,
                      label: option.label,
                    })) || [])}
                    selectedValue={statusFilterValue}
                    onChange={(e) => {
                      setStatusFilterValue(e ? e.value : null);
                      setPageNo(1);
                    }}
                    type={"status"}
                    placeholder={"Filter by status"}
                  />
                </div>
              </div>
              <div className="col form_group">
                <div className="select_div" style={{ height: "2.5rem" }}>
                  <DatePicker
                    selected={consultationStartDateFilterValue}
                    onChange={handleChange}
                    startDate={consultationStartDateFilterValue}
                    endDate={consultationEndDateFilterValue}
                    selectsRange
                    dateFormat="dd-MM-yyyy"
                    className="form-control"
                    placeholderText="Filter by Consultation Date"
                  />
                </div>
              </div>
              {/* <div className="position-relative" ref={dropdownRef}>
                <button
                  className="font-size-4 rounded-3 border-0 btn bg-white p-2 mr-4"
                  onClick={() => setShowdropdown((prev) => !prev)}
                >
                  <IoPersonCircleOutline />
                  <span className="ml-2">Person</span>
                </button>

                {showdropdown && (
                  <div
                    className="position-absolute bg-white z-index-4 p-8 shadow-lg"
                    style={{ width: "500px" }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <h3 className="font-size-4">Filter this board by person</h3>
                    </div>
                    <div className="position-relative w-100">
                      <input
                        type="text"
                        className="form-control font-size-4 mb-4 w-100 px-4"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                     Admin List 
                    <ul className="list-unstyled d-flex align-items-center flex-wrap">
                      {filteredAdmins.length > 0 ? (
                        filteredAdmins.map((admin, index) => (
                          <li
                            key={index}
                            className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                          >
                            <Link
                              onClick={() => {
                                setSelectedAdminId(admin.admin_id);
                                setSelectedAdminType(admin.admin_type);
                                // setShowfilterdropdown((prev) => !prev);
                                setShowdropdown(false);
                                setSearchQuery("");
                                setPageNo(1);
                              }}
                            >
                              <span className="font-size-4 text-decoration-none">
                                {admin.name}
                              </span>
                            </Link>
                          </li>
                        ))
                      ) : (
                        <p className="text-muted text-center">No results found</p>
                      )}
                    </ul>
                  </div>
                )}
              </div> */}
              <button
                className="btn btn-primary"
                onClick={() => {
                  // setSelectedAdminId("");
                  // setSelectedAdminType("");
                  // setSearchQuery("");
                  // setDayFilterValue("");
                  setPageNo(1);
                  setConsultationEndDateFilterValue("")
                  setConsultationOptedFilterValue("")
                  setConsultationStartDateFilterValue("")
                  setSearchCandidate("")
                  setFilterByEmployeeId("")
                  setStatusFilterValue("")
                  // setResetWithoutConsultationId(true);
                  const newUrl = window.location.pathname;
                  window.history.replaceState({}, document.title, newUrl);
                  // Reset the flag after a short delay to allow ConsultationTable to react
                  // setTimeout(() => setResetWithoutConsultationId(false), 100);
                }}
              >
                Reset
              </button>
              {console.log(exportrData)}
              <CommonThreeDots
                tableName={"Consultation"}
                local={""}
                portal={""}
                exportCandidatestatus={""}
                tableData={exportrData}
              />
            </div>
            <EmployeeTable
              // showEmployeeProfile={showEmployeeProfile}
              // employeeDetails={employeeDetails}
              search={searchCandidate}
              // experienceFilterValue={experienceFilterValue}
              // educationFilterValue={educationFilterValue}
              // skillFilterValue={skillFilterValue}
              apiCall={apiCall}
              setApiCall={setApiCall}
              // skill={props.skill}
              editEmployee={editEmployee}
              // job_id={props.job_id}
              // self={"yes"}
              // status={"0"}
              pageName={"consultation"}
              pageNo={pageNo}
              setpageNo={setPageNo}
              // agentFilterValue={agentFilterValue}
              // adminFilterValue={adminFilterValue}
              // interestFilterValue={interestFilterValue}
              // categoryFilterValue={categoryFilterValue}
              // localFilterValue={localFilterValue}
              // webFilterValue={webFilterValue}
              statustFilterValue={statusFilterValue}
              filterByEmployeeId={filterByEmployeeId}
              consultationOptedFilterValue={consultationOptedFilterValue}
              consultationStartDateFilterValue={consultationStartDateFilterValue}
              consultationEndDateFilterValue={consultationEndDateFilterValue}
            />
            {/* Consultation Table */}
            {/* <ConsultationTable
              heading={"Consultation"}
              showAddForm={showAddItemForm}
              adminList={adminList}
              searchCandidate={searchCandidate}
              setShowAddForm={setShowAddItemForm}
              selectedAdminId={selectedAdminId}
              selectedAdminType={selectedAdminType}
              day={dayFilterValue}
              // setFilterData={setFilterData}
              pageNo={pageNo}
              setPageNo={setPageNo}
              resetWithoutConsultationId={resetWithoutConsultationId}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageConsultation;
