import React, { useEffect, useState } from 'react'
import AdminHeader from '../admin/header';
import AdminSidebar from '../admin/sidebar';
import ApplicantsFilter from './applicantsFilter';
import EmployeeTable from './employeeTable';
import { getApplicanTypeApi } from '../../api/api';
import { Link, useLocation } from 'react-router-dom';
import ApplicantTypeDocuments from './ApplicantTypeDocuments';
import { BsThreeDots } from 'react-icons/bs';
import { GrLineChart } from "react-icons/gr";
import { HiOutlineBell } from "react-icons/hi2";
import { BsChat } from "react-icons/bs";
import ModalSidebar from "./modalSidebar";
import CommentTaskBox from "./commonTaskBox";
import ExportExcelButton from './exportExcelButton';

export default function CommonApplicatTypePage() {
    /*Filter and search state */
    let user_type = localStorage.getItem("userType")
    let location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    let taskId = searchParams.get("taskId")
    let docId = searchParams.get("docId")
    let docParentId = searchParams.get("docParentId");
    let docHighAnnoId = searchParams.get("annotationId");
    const [experienceFilterValue, setExperienceFilterValue] = useState("");
    const [skillFilterValue, setSkillFilterValue] = useState("");
    const [pageNo, setpageNo] = useState(localStorage.getItem("PageNo") || 1);
    const [educationFilterValue, setEducationFilterValue] = useState("");
    const [agentFilterValue, setAgentFilterValue] = useState("");
    const [adminFilterValue, setAdminFilterValue] = useState("");
    const [interestFilterValue, setinterestFilterValue] = useState("");
    const [categoryFilterValue, setCategoryFilterValue] = useState("");
    const [search, setSearch] = useState("");
    const [searcherror, setSearchError] = useState("");
    let [apiCall, setApiCall] = useState(false);
    let [showGrpChatBox, setShowGrpChatBox] = useState(false);
    let [isOpen, setIsOpen] = useState(false);
    const [applicantTypeId, setApplicanttypeId] = useState(location?.state?.applicantType || "");
    const [applicantTypeFolderId, setApplicanttypeFolderId] = useState(location?.state?.folderId || "");
    const [applicantTypename, setApplicanttypeName] = useState("");
    const [selectedTab, setSelectedTab] = useState(docId ? "documents" : "candidate");
    let localApplicantTypeId = localStorage.getItem("applicantType")
    let localApplicantTypeFolderId = localStorage.getItem("applicantTypeFolderId")
    useEffect(() => {
        // Update only if applicantType is present
        if (location?.state?.applicantType && location?.state?.applicantType !== applicantTypeId) {
            setApplicanttypeId(location.state.applicantType);
            localStorage.setItem("applicantType", location.state.applicantType)
        } else {
            setApplicanttypeId(localApplicantTypeId);
        }
        if (location?.state?.folderId && location?.state?.folderId !== applicantTypeFolderId) {
            setApplicanttypeFolderId(location.state.folderId);
            localStorage.setItem("applicantTypeFolderId", location.state.folderId)
        } else {
            setApplicanttypeFolderId(localApplicantTypeFolderId);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location?.state?.applicantType, location?.state?.folderId, docId,localApplicantTypeId,localApplicantTypeFolderId]);
    useEffect(() => {
        if (!applicantTypeId) return;

        getApplicanTypeApi()
            .then((res) => {
                const foundItem = (res.data.data || []).find((item) => item.id === applicantTypeId);
                if (foundItem) {
                    setApplicanttypeName(foundItem.title);
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }, [applicantTypeId]);
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
    console.log(localApplicantTypeId,localApplicantTypeFolderId)
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
                                    }}
                                    title="Documents"
                                >
                                    Documents
                                </button>
                            </div>
                            <div
                                className="position-relative d-inline-block header-btn-devider ml-auto ml-lg-5 pl-2 d-xs-flex align-items-center"
                                onMouseEnter={() => setIsOpen(true)}
                                onMouseLeave={() => setIsOpen(false)}
                                onClick={() => setIsOpen(true)}
                            >
                                <Link
                                    className="d-flex align-items-center justify-content-center"
                                >
                                    <BsThreeDots size={15} />
                                </Link>

                                {isOpen && (
                                    <div className="dropdown-menu show position-absolute bg-white shadow rounded border-0 "
                                        style={{ left: "auto", right: "0" }} // Align dropdown to the left
                                    >
                                        {user_type !== "agent" && (
                                            <Link to="#" className="dropdown-item align-items-center d-none">
                                                <HiOutlineBell className="mx-3" /> Notification
                                            </Link>
                                        )}
                                        {user_type !== "agent" && (
                                            <Link to="#" className="dropdown-item d-none align-items-center ">
                                                <GrLineChart className="mx-3" /> Activity Log
                                            </Link>
                                        )}
                                        {user_type !== "agent" && (
                                            <button
                                                onClick={() => setShowGrpChatBox(true)}
                                                className="dropdown-item d-flex align-items-center border-0 bg-transparent m-3"
                                            >
                                                <BsChat className="mx-3" /> Group Chat
                                            </button>
                                        )}

                                        {user_type !== "agent" && (
                                            <div
                                                className="dropdown-item d-flex align-items-center border-0 bg-transparent"
                                            >
                                                <ExportExcelButton tableName={"employee"} type={""} portal={""} applicantType={applicantTypeId} status={"-1"} local={""} tableData={[]} />                                           </div>
                                        )}
                                    </div>
                                )}
                            </div>
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
                                            applicantTypeId={applicantTypeId}
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
                                            pageName={applicantTypeId}
                                            categoryFilterValue={categoryFilterValue}
                                            setCategoryFilterValue={setCategoryFilterValue}
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
                                    ApplicantType={applicantTypeId}
                                    categoryFilterValue={categoryFilterValue}
                                />
                            </div>
                        </div> : <div>
                            <ApplicantTypeDocuments
                                emp_user_type={"applicant_type"}
                                user_id={applicantTypeId}
                                folderId={docId ? docParentId : applicantTypeFolderId}
                                notification={docId ? "ddyes" : "no"}
                                docId={docId || ""}
                                docTypePage={""}
                                user_name={""}
                                partnerId={""}
                                AnnoteId={docId ? docHighAnnoId : ""}
                                docTaskId={taskId} /></div>}
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
                        userId={applicantTypeId}
                        taskType={"applicant_type_group_chat"}
                        taskUserType={"applicant_type"}
                        setOpenReplyBox={setShowGrpChatBox}
                        openReplyBox={showGrpChatBox}
                        taskName={"Group Chat"}
                    />
                }
            >
                {showGrpChatBox ? (
                    <CommentTaskBox
                        userId={applicantTypeId}
                        taskType={"applicant_type_group_chat"}
                        taskUserType={"applicant_type"}
                        setOpenReplyBox={setShowGrpChatBox}
                        openReplyBox={showGrpChatBox}
                        taskName={"Group Chat"}
                    />
                ) : null}
            </ModalSidebar>
        </>
    );
}
