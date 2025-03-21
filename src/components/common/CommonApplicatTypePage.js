import React, { useEffect, useState } from 'react'
import AdminHeader from '../admin/header';
import AdminSidebar from '../admin/sidebar';
import ApplicantsFilter from './applicantsFilter';
import EmployeeTable from './employeeTable';
import { getApplicanTypeApi } from '../../api/api';
import { useLocation } from 'react-router-dom';
import ApplicantTypeDocuments from './ApplicantTypeDocuments';
import ModalSidebar from "./modalSidebar";
import CommentTaskBox from "./commonTaskBox";
import CommonThreeDots from './commonThreeDots';

export default function CommonApplicatTypePage() {
    /*Filter and search state */
    let user_type = localStorage.getItem("userType")
    let location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    let taskId = searchParams.get("taskId")
    let docId = searchParams.get("docId")
    let docParentId = searchParams.get("docParentId");
    let docHighAnnoId = searchParams.get("annotationId");
    let notifiType = searchParams.get("notifiType") || "";
    const ApplicantTypeUrlId = searchParams.get("sId");
    let ApplicantTypeChildUrlId = searchParams.get("sCId");
    let [TaskId, setTaskId] = useState(taskId)
    const [experienceFilterValue, setExperienceFilterValue] = useState("");
    const [skillFilterValue, setSkillFilterValue] = useState("");
    const [pageNo, setpageNo] = useState(localStorage.getItem("PageNo") || 1);
    const [educationFilterValue, setEducationFilterValue] = useState("");
    const [agentFilterValue, setAgentFilterValue] = useState("");
    const [adminFilterValue, setAdminFilterValue] = useState("");
    const [interestFilterValue, setinterestFilterValue] = useState("");
    // const [categoryFilterValue, setCategoryFilterValue] = useState("");
    const [search, setSearch] = useState("");
    const [searcherror, setSearchError] = useState("");
    let [apiCall, setApiCall] = useState(false);
    let [showGrpChatBox, setShowGrpChatBox] = useState(false);
    let [folderApiCall, setFolderApiCall] = useState(false);
    const [applicantTypeId, setApplicanttypeId] = useState(ApplicantTypeUrlId ? ApplicantTypeUrlId : location?.state?.applicantType);
    const [applicantTypeChildId, setApplicanttypeChildId] = useState(ApplicantTypeChildUrlId ? ApplicantTypeChildUrlId : location?.state?.applicantTypeChild);
    const [applicantTypeFolderId, setApplicanttypeFolderId] = useState(location?.state?.folderId);
    const [applicantTypeIdForApi, setApplicantTypeIdForApi] = useState("");
    const [applicantTypename, setApplicanttypeName] = useState("");
    const [selectedTab, setSelectedTab] = useState(docId ? "documents" : "candidate");
    let localApplicantTypeId = localStorage.getItem("applicantType");
    let localApplicantTypeChildId = localStorage.getItem("applicantTypeChild");
    let localApplicantTypeFolderId = localStorage.getItem("applicantTypeFolderId")
    useEffect(() => {
        if (taskId) {
            setTaskId(taskId)
            if (notifiType === "candidate") {
                setSelectedTab("candidate")
            }
        }
        if (docId) {
            setSelectedTab("documents")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.key])

    useEffect(() => {
        // Update only if applicantType is present
        if ((notifiType === "group" || notifiType === "candidate") && (ApplicantTypeUrlId)) {
            setApplicanttypeId(ApplicantTypeUrlId);
            setApplicanttypeChildId(ApplicantTypeChildUrlId)
            localStorage.setItem("applicantType", ApplicantTypeUrlId)
        } else {
            if (location?.state?.applicantType && location?.state?.applicantType !== applicantTypeId) {
                setApplicanttypeId(location.state.applicantType);
                localStorage.setItem("applicantType", location.state.applicantType)
            } else {
                setApplicanttypeId(localApplicantTypeId);

            }
            if (location?.state?.applicantTypeChild && location?.state?.applicantTypeChild !== applicantTypeChildId) {
                setApplicanttypeChildId(location.state.applicantTypeChild);
                localStorage.setItem("applicantTypeChild", location.state.applicantTypeChild)
            } else {
                setApplicanttypeFolderId(localApplicantTypeChildId);
            }
            if (location?.state?.folderId && location?.state?.folderId !== applicantTypeFolderId) {
                setApplicanttypeFolderId(location.state.folderId);
                localStorage.setItem("applicantTypeFolderId", location.state.folderId)
            } else {
                setApplicanttypeFolderId(localApplicantTypeFolderId);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.key, ApplicantTypeUrlId, taskId, notifiType, location?.state?.applicantType, location?.search?.applicantTypeChild, location?.state?.folderId, docId, localApplicantTypeId, localApplicantTypeFolderId]);
    useEffect(() => {
        if (applicantTypeId || applicantTypeChildId) {
            getApplicanTypeApi("")
                .then((res) => {
                    let filterNameById = applicantTypeId ? applicantTypeId : applicantTypeChildId
                    const foundItem = (res.data.data || []).find((item) => item.id === filterNameById);
                    if (foundItem) {
                        setApplicanttypeName(foundItem.title);
                        setApplicanttypeFolderId(foundItem.doc_folder_id)
                        setApplicantTypeIdForApi(foundItem.id)
                        if (taskId && notifiType === "group") {
                            setShowGrpChatBox(true)
                            const newUrl = window.location.pathname;
                            window.history.replaceState({}, document.title, newUrl);
                            localStorage.setItem("navigation_url", "")
                        }
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [applicantTypeId, applicantTypeChildId, location.key, ApplicantTypeUrlId, ApplicantTypeChildUrlId, taskId, notifiType, location?.state?.applicantType, location?.search?.applicantTypeChild, location?.state?.folderId, docId]);

    /*Function to search the employee */
    const onSearch = (e) => {
        const inputValue = e.target.value;
        setSearch(inputValue);
        setpageNo(1);
        if (inputValue.length > 0) {
            if (/[-]?\d+(\.\d+)?/.test(inputValue.charAt(0))) {
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
                <AdminHeader heading={applicantTypename} />
                {/* <!-- navbar- --> */}
                <AdminSidebar heading={applicantTypename} />
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
                                        <h3 className="font-size-6 mb-0 Text-capitalize">{applicantTypename}</h3>
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
                                            setpageNo={setpageNo}
                                            agentFilterValue={agentFilterValue}
                                            setAgentFilterValue={setAgentFilterValue}
                                            adminFilterValue={adminFilterValue}
                                            setAdminFilterValue={setAdminFilterValue}
                                            interestFilterValue={interestFilterValue}
                                            setinterestFilterValue={setinterestFilterValue}
                                            setSearchError={setSearchError}
                                            // skill={props.skill}
                                            pageName={applicantTypeIdForApi}
                                            categoryFilterValue={interestFilterValue}
                                            setCategoryFilterValue={setinterestFilterValue}
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
                                    setpageNo={setpageNo}
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
                                AnnoteId={docId ? docHighAnnoId : ""}
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
                        TaskId={TaskId}
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
                        TaskId={TaskId}
                    />
                ) : null}
            </ModalSidebar>
        </>
    );
}
