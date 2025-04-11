import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdminHeader from '../admin/header';
import AdminSidebar from '../admin/sidebar';
import ApplicantsFilter from './applicantsFilter';
import EmployeeTable from './employeeTable';
import { getApplicanTypeApi } from '../../api/api';
import ApplicantTypeDocuments from './ApplicantTypeDocuments';
import ModalSidebar from "./modalSidebar";
import CommentTaskBox from "./commonTaskBox";
import CommonThreeDots from './commonThreeDots';

export default function CommonApplicatTypePage() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const user_type = localStorage.getItem("userType");
    const taskIdParam = searchParams.get("taskId");
    const docId = searchParams.get("docId");
    const docParentId = searchParams.get("docParentId");
    const annotationId = searchParams.get("annotationId");
    const notifiType = searchParams.get("notifiType") || "";
    const sId = searchParams.get("sId");
    const sCId = searchParams.get("sCId");

    const localApplicantTypeId = localStorage.getItem("applicantType");
    const localApplicantTypeChildId = localStorage.getItem("applicantTypeChild");
    const localApplicantTypeFolderId = localStorage.getItem("applicantTypeFolderId");

    const state = location?.state || {};

    const [taskId, setTaskId] = useState(taskIdParam);
    const [selectedTab, setSelectedTab] = useState(docId ? "documents" : "candidate");

    const [search, setSearch] = useState("");
    const [searcherror, setSearchError] = useState("");
    const [apiCall, setApiCall] = useState(false);
    const [showGrpChatBox, setShowGrpChatBox] = useState(false);
    const [folderApiCall, setFolderApiCall] = useState(false);

    const [applicantTypeId, setApplicantTypeId] = useState(sId || state.applicantType || localApplicantTypeId);
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

    // Handle tab switch and task assignment
    useEffect(() => {
        if (taskIdParam) {
            setTaskId(taskIdParam);
            if (notifiType === "candidate") {
                setSelectedTab("candidate");
            }
        }
        if (docId) setSelectedTab("documents");
    }, [location.key]);

    // Set applicant type IDs and folder ID from params, state, or localStorage
    useEffect(() => {
        if (["group", "candidate"].includes(notifiType) && sId) {
            setApplicantTypeId(sId);
            setApplicantTypeChildId(sCId);
            localStorage.setItem("applicantType", sId);
            localStorage.setItem("applicantTypeChild", sCId);
        } else {
            if (state.applicantType && state.applicantType !== applicantTypeId) {
                setApplicantTypeId(state.applicantType);
                localStorage.setItem("applicantType", state.applicantType);
            }
            if (state.applicantTypeChild && state.applicantTypeChild !== applicantTypeChildId) {
                setApplicantTypeChildId(state.applicantTypeChild);
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
        if (!targetId) return;

        getApplicanTypeApi("")
            .then((res) => {
                const found = (res.data?.data || []).find(item => item.id === targetId);
                if (found) {
                    setApplicantTypeName(found.title);
                    setApplicantTypeFolderId(found.doc_folder_id);
                    setApplicantTypeIdForApi(found.id);

                    if (taskId && notifiType === "group") {
                        setShowGrpChatBox(true);
                        window.history.replaceState({}, document.title, window.location.pathname);
                        localStorage.setItem("navigation_url", "");
                    }
                }
            })
            .catch(console.error);
    }, [applicantTypeId, applicantTypeChildId]);

    const onSearch = (e) => {
        const inputValue = e.target.value;
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

    return (
        <>
            <div className="site-wrapper overflow-hidden bg-default-2">
                {/* <!-- Header Area --> */}
                <AdminHeader heading={applicantTypeName} />
                {/* <!-- navbar- --> */}
                <AdminSidebar heading={applicantTypeName} />
                <div className="dashboard-main-container mt-16" id="dashboard-body">
                    <div className="container-fluid">
                        <div className='d-flex justify-content-between'>
                            <div
                                className={`btn-group mb-5`}
                                role="group"
                                aria-label="Basic example"
                            >
                                <button
                                    type="button"
                                    className={
                                        selectedTab === "candidate"
                                            ? "btn btn-primary"
                                            : "btn btn-outline-primary"
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
                                        selectedTab === "documents"
                                            ? "btn btn-primary"
                                            : "btn btn-outline-primary"
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
                                folderId={docId ? docParentId : applicantTypeFolderId} />
                        </div>
                        {selectedTab === "candidate" ? <div>
                            <div className="mb-18">
                                <div className="mb-4 align-items-center">
                                    <div className="page___heading">
                                        <h3 className="font-size-6 mb-0 Text-capitalize">{applicantTypeName}</h3>
                                    </div>
                                    {/*<-- Search applicant Type -->*/}
                                    <div className="row m-0 align-items-center">
                                        {/* Employees filter's */}
                                        <ApplicantsFilter
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
                                            setPageNo={setPageNo}
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
                                        />
                                    </div>
                                    <small className="text-danger">{searcherror}</small>
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
                                    setPageNo={setPageNo}
                                    ApplicantType={applicantTypeIdForApi}
                                // categoryFilterValue={applicantTypeChildId ? applicantTypeChildId : categoryFilterValue}
                                />

                            </div>
                        </div> : <div>
                            <ApplicantTypeDocuments
                                emp_user_type={"applicant_type"}
                                user_id={applicantTypeIdForApi}
                                folderId={docId ? docParentId : applicantTypeFolderId}
                                notification={docId ? "yes" : "no"}
                                docId={docId || ""}
                                docTypePage={""}
                                user_name={""}
                                partnerId={""}
                                AnnoteId={docId ? annotationId : ""}
                                docTaskId={taskId}
                                folderApiCall={folderApiCall}
                                setFolderApiCall={setFolderApiCall} /></div>}
                    </div>
                </div>
            </div>
            <ModalSidebar
                show={showGrpChatBox}
                onClose={() => {
                    setShowGrpChatBox(false)
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
