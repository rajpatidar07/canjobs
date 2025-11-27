/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import AdminHeader from "../admin/header";
// import AdminSidebar from "../admin/sidebar";
import ApplicantsFilter from "./applicantsFilter";
import EmployeeTable from "./employeeTable";
import { getApplicanTypeApi } from "../../api/api";
import ApplicantTypeDocuments from "./ApplicantTypeDocuments";
import ModalSidebar from "./modalSidebar";
import CommentTaskBox from "./commonTaskBox";
import CommonThreeDots from "./Common function/commonThreeDots";
import SelectBox from "./Common function/SelectBox";

export default function CommonApplicatTypePage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const user_type = localStorage.getItem("userType");
  const admin_id = localStorage.getItem("admin_id");
  const admin_type = localStorage.getItem("admin_type")
  const taskIdParam = searchParams.get("taskId");
  const docId = searchParams.get("docId");
  const docParentId = searchParams.get("docParentId");
  const annotationId = searchParams.get("annotationId");
  const notifiType = searchParams.get("notifiType") || "";
  const sId = searchParams.get("sId");
  const sCId = searchParams.get("sCId");
  const localApplicantTypeId = localStorage.getItem("applicantType");
  const localApplicantTypeChildId = localStorage.getItem("applicantTypeChild");
  const localApplicantTypeFolderId = localStorage.getItem(
    "applicantTypeFolderId"
  );

  const state = location?.state || {};

  const [taskId, setTaskId] = useState(taskIdParam);
  const [selectedTab, setSelectedTab] = useState(
    docParentId ? "documents" : "candidate"
  );

  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState("");
  const [apiCall, setApiCall] = useState(false);
  const [showGrpChatBox, setShowGrpChatBox] = useState(false);
  const [folderApiCall, setFolderApiCall] = useState(false);
  const [filterByEmployeeId, setFilterByEmployeeId] = useState("");
  const [applicantTypeList, setApplicantTypeList] = useState([]);
  const [main, setMain] = useState(sId || state.applicantType || localApplicantTypeId || "1");
  const [sub, setSub] = useState(sCId || state.applicantTypeChild || localApplicantTypeChildId);
  const [applicantTypeId, setApplicantTypeId] = useState(sId || state.applicantType || localApplicantTypeId ||"1");
  const [applicantTypeChildId, setApplicantTypeChildId] = useState(sCId || state.applicantTypeChild || localApplicantTypeChildId);
  const [applicantTypeFolderId, setApplicantTypeFolderId] = useState(state.folderId || localApplicantTypeFolderId);
  const [applicantTypeIdForApi, setApplicantTypeIdForApi] = useState("");
  const [applicantTypeName, setApplicantTypeName] = useState("");
  const [pageNo, setPageNo] = useState(localStorage.getItem("PageNo") || 1);
  const [experienceFilterValue, setExperienceFilterValue] = useState("");
  const [skillFilterValue, setSkillFilterValue] = useState("");
  const [educationFilterValue, setEducationFilterValue] = useState("");
  const [agentFilterValue, setAgentFilterValue] = useState("");
  const [adminFilterValue, setAdminFilterValue] = useState("");
  const [interestFilterValue, setInterestFilterValue] = useState("");

  const onSearch = (e) => {
    const inputValue = e//.target.value;
    setSearch(inputValue);
    setPageNo(1);
    if (inputValue.length > 0) {
      if (/^\d/.test(inputValue)) {
        setSearchError("Candidate Name cannot start with a number.");
      } else if (!/^[A-Za-z0-9 ]*$/.test(inputValue)) {
        setSearchError("Cannot use special characters.");
      } else {
        setSearchError("");
      }
    } else {
      setSearchError("");
    }
  };

  // Handle tab switch and task assignment
  useEffect(() => {
    if (taskIdParam) {
      setTaskId(taskIdParam);
      if (notifiType === "candidate") {
        setSelectedTab("candidate");
      }
    }
    if (docParentId) setSelectedTab("documents");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  // Set applicant type IDs and folder ID from params, state, or localStorage
  useEffect(() => {
    if (["group", "candidate"].includes(notifiType) && sId) {
      setApplicantTypeId(sId);
      setMain(sId)
      setApplicantTypeChildId(sCId);
      setSub(sCId)
      localStorage.setItem("applicantType", sId);
      localStorage.setItem("applicantTypeChild", sCId);
    } else {
      if (state.applicantType && state.applicantType !== applicantTypeId) {
        setApplicantTypeId(state.applicantType);
        setMain(state.applicantType)
        localStorage.setItem("applicantType", state.applicantType);
      }
      if (
        state.applicantTypeChild &&
        state.applicantTypeChild !== applicantTypeChildId
      ) {
        setApplicantTypeChildId(state.applicantTypeChild);
        setSub(state.applicantTypeChild)
        localStorage.setItem("applicantTypeChild", state.applicantTypeChild);
      }
      if (state.folderId && state.folderId !== applicantTypeFolderId) {
        setApplicantTypeFolderId(state.folderId);
        localStorage.setItem("applicantTypeFolderId", state.folderId);
      }
    }
  }, [location.key]);


  // Fetch applicant type details
  useEffect(() => {
    const targetId = applicantTypeId || applicantTypeChildId;
    // if (!targetId) return;

    getApplicanTypeApi(admin_type === "super-admin" ? "" : admin_id)
      .then((res) => {
        setApplicantTypeList(res.data.data);
        if (!applicantTypeIdForApi && !targetId) {
          setApplicantTypeIdForApi(res.data.data[0]?.id)
          setMain(res.data.data[0]?.id)
          setApplicantTypeFolderId(res.data.data[0]?.doc_folder_id);
          setApplicantTypeName(res.data.data[0]?.title)
        }
        const found = (res.data?.data || []).find(
          (item) => item.id === targetId
        );
        if (found) {
          setApplicantTypeName(found.title);
          setApplicantTypeFolderId(found.doc_folder_id);
          setApplicantTypeIdForApi(found.id);


          if (taskId && notifiType === "group") {
            setShowGrpChatBox(true);
            window.history.replaceState(
              {},
              document.title,
              window.location.pathname
            );
            localStorage.setItem("navigation_url", "");
          }
        }
      })
      .catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicantTypeId, applicantTypeChildId]);


  // Handle changes in main or sub types
  const onInputChange = (e) => {
    const selectedValue = e ? e.value : null;
    setApplicantTypeIdForApi(selectedValue)
    // eslint-disable-next-line eqeqeq
    const selectedItem = applicantTypeList.find(item => item.id == selectedValue);

    if (selectedItem) {
      if (selectedItem.level === "0") {
        setMain(selectedValue);
        setSub(''); // Reset sub when main changes
      } else if (selectedItem.level === "1") {
        setSub(selectedValue);
      }

      setApplicantTypeFolderId(selectedItem.doc_folder_id);
      setApplicantTypeName(selectedItem.title)
      if ([
        "test typw",
        "All Checklists",
        "Checklists",
        "Invitation letters/Declarations",
        "Daily hours log",
        "Training Modules",
        "Admission/student/college"
      ].some(it => selectedItem.title?.includes(it))) { setSelectedTab("documents") }
    }
  }
  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        {/* <AdminHeader heading={applicantTypeName} /> */}
        {/* <!-- navbar- --> */}
        {/* <AdminSidebar heading={applicantTypeName} /> */}
        <div className="dashboard-main-container mt-14" id="dashboard-body">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mt-3 w-50">
              {/* MAIN TYPE */}
              <div className="form-group col-md-6">
                <label className="font-size-4 text-black-2 font-weight-semibold line-height-reset">
                  Applicant's Type:
                </label>
                <SelectBox
                  Width={"yes"}
                  options={(applicantTypeList.filter((item) => item.level === "0").map((option) => ({
                    value: option.id,
                    label: option.title,
                  })) || [])}
                  selectedValue={main}
                  onChange={(e) => {
                    onInputChange(e)
                  }}
                  type={"main"}
                />
              </div>
              {/* SUB TYPE */}
              {main && applicantTypeList.some(item => item.level === "1" && item.parent_id === main) && (
                <div className="form-group col-md-6">
                  <label className="font-size-4 text-black-2 font-weight-semibold line-height-reset">
                    Sub Type:
                  </label>
                  <SelectBox
                    Width={"yes"} options={(applicantTypeList
                      .filter(item => item.level === "1" && item.parent_id === main)
                      .map((option) => ({
                        value: option.id,
                        label: option.title,
                      })) || [])}
                    selectedValue={sub}
                    onChange={(e) => {
                      onInputChange(e)
                    }}
                    type={"sub"}
                  />
                </div>
              )}

            </div>
            <div
              className="d-flex justify-content-between align-items-center mb-3"
              style={{ gap: "5px" }}
            >
              <div
                className={`btn-group`}
                role="group"
                aria-label="Basic example"
              >
                <button
                  type="button"
                  className={
                    `${[
                      "test typw",
                      "All Checklists",
                      "Checklists",
                      "Invitation letters/Declarations",
                      "Daily hours log",
                      "Training Modules",
                      "Admission/student/college"
                    ].some(it => applicantTypeName?.includes(it)) ? "d-none" : ""} ${selectedTab === "candidate"
                      ? "btn btn-primary"
                      : "btn btn-outline-primary"}`
                  }
                  onClick={() => {
                    setSelectedTab("candidate");
                  }}
                  title="Candidate"
                >
                  Candidate
                </button>
                <button
                  type="button"
                  className={
                    `${selectedTab === "documents"
                      ? "btn btn-primary"
                      : "btn btn-outline-primary"} `
                  }
                  onClick={() => {
                    setSelectedTab("documents");
                    // setApplicanttypeFolderId(location?.state?.folderId || localApplicantTypeFolderId)
                  }}
                  title="Documents"
                >
                  Documents
                </button>
              </div>
              <CommonThreeDots
                setShowGrpChatBox={setShowGrpChatBox}
                applicantTypeId={applicantTypeIdForApi}
                tableName={"employee"}
                exportCandidatestatus={"4,7,8,9"}
                emp_user_type={"applicant_type"}
                user_id={applicantTypeIdForApi}
                setFolderApiCall={setFolderApiCall}
                folderId={docParentId ? docParentId : applicantTypeFolderId}
              />
            </div>
            {selectedTab === "candidate" ? (
              <div>
                <div className="mb-4 align-items-center">
                  {/* <div className="page___heading">
                      <h3 className="font-size-6 mb-0 Text-capitalize">
                        {applicantTypeName}
                      </h3>
                    </div> */}
                  {/*<-- Search applicant Type -->*/}

                  {/* Employees filter's */}
                  <ApplicantsFilter
                    setSearch={setSearch}
                    applicantTypeId={applicantTypeIdForApi}
                    user_type={user_type}
                    search={search}
                    onSearch={onSearch}
                    experienceFilterValue={experienceFilterValue}
                    setExperienceFilterValue={setExperienceFilterValue}
                    skillFilterValue={skillFilterValue}
                    setSkillFilterValue={setSkillFilterValue}
                    educationFilterValue={educationFilterValue}
                    setEducationFilterValue={setEducationFilterValue}
                    setpageNo={setPageNo}
                    agentFilterValue={agentFilterValue}
                    setAgentFilterValue={setAgentFilterValue}
                    adminFilterValue={adminFilterValue}
                    setAdminFilterValue={setAdminFilterValue}
                    interestFilterValue={interestFilterValue}
                    setinterestFilterValue={setInterestFilterValue}
                    setSearchError={setSearchError}
                    // skill={props.skill}
                    pageName={applicantTypeIdForApi}
                    categoryFilterValue={interestFilterValue}
                    setCategoryFilterValue={setInterestFilterValue}
                    applicantTypeChildId={applicantTypeChildId}
                    setFilterByEmployeeId={setFilterByEmployeeId}
                    filterByEmployeeId={filterByEmployeeId}
                  />
                  <small className="text-danger">{searchError}</small>
                </div>
                {/*<-- Employee Table according to applicant Type -->*/}
                <EmployeeTable
                  search={search}
                  experienceFilterValue={experienceFilterValue}
                  educationFilterValue={educationFilterValue}
                  skillFilterValue={skillFilterValue}
                  agentFilterValue={agentFilterValue}
                  adminFilterValue={adminFilterValue}
                  interestFilterValue={interestFilterValue}
                  apiCall={apiCall}
                  setApiCall={setApiCall}
                  status={"-1"}
                  pageNo={pageNo}
                  setpageNo={setPageNo}
                  ApplicantType={applicantTypeIdForApi}
                  filterByEmployeeId={filterByEmployeeId}
                // categoryFilterValue={applicantTypeChildId ? applicantTypeChildId : categoryFilterValue}
                />
              </div>
            ) : (
              <div>
                <ApplicantTypeDocuments
                  emp_user_type={"applicant_type"}
                  user_id={applicantTypeIdForApi}
                  folderId={docParentId ? docParentId : applicantTypeFolderId}
                  notification={docId ? "yes" : "no"}
                  docId={docId || ""}
                  docTypePage={""}
                  user_name={""}
                  partnerId={""}
                  AnnoteId={docId ? annotationId : ""}
                  docTaskId={taskId}
                  folderApiCall={folderApiCall}
                  setFolderApiCall={setFolderApiCall}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <ModalSidebar
        show={showGrpChatBox}
        onClose={() => {
          setShowGrpChatBox(false);
        }}
        children={
          <CommentTaskBox
            userId={applicantTypeIdForApi}
            taskType={"applicant_type_group_chat"}
            taskUserType={"applicant_type"}
            setOpenReplyBox={setShowGrpChatBox}
            openReplyBox={showGrpChatBox}
            taskName={"Group discussion"}
            TaskId={taskId}
          />
        }
      >
        {showGrpChatBox ? (
          <CommentTaskBox
            userId={applicantTypeIdForApi}
            taskType={"applicant_type_group_chat"}
            taskUserType={"applicant_type"}
            setOpenReplyBox={setShowGrpChatBox}
            openReplyBox={showGrpChatBox}
            taskName={"Group discussion"}
            TaskId={taskId}
          />
        ) : null}
      </ModalSidebar>
    </>
  );
}
