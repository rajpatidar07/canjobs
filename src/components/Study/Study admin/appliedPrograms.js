
import React, { useState } from "react";
import EmployeeTable from "../../common/employeeTable";
import StudyAdminHeader from "../StudyComman/studyAdminHeader";
import StudyAdminSidebar from "../StudyComman/studySiderbar";
import AdminHeader from "../../admin/header";
import AdminSidebar from "../../admin/sidebar";
import AppliedProgramTable from "../StudyComman/appliedProgramTable";
export default function AppliedPrograms(props) {
    /*Filter and search state */
    const [pageNo, setpageNo] = useState(props.page === "program" ? 1 : localStorage.getItem("PageNo") || 1);
    let [employeeId, setemployeeId] = useState();
    const [employeeTypeFilterValue, setemployeeTypeFilterValue] = useState("");
    const [appliedUserIdFilterValue, setAppliedUserIdFilterValue] = useState("");
    const [appliedUserTypeFilterValue, setAppliedUserTypeFilterValue] = useState("");
    let [programId, setProgramsId] = useState();
    const [search, setSearch] = useState("");
    const [searcherror, setSearchError] = useState("");
    let user_type = localStorage.getItem("userType")
    let [apiCall, setApiCall] = useState(false);
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
            <div className={
                props.skill === null || props.skill === undefined
                    ? "site-wrapper overflow-hidden bg-default-2"
                    : "site-wrapper overflow-hidden "
            }>
                {/* <!-- Header Area --> */}
                {props.skill === null ||
                    props.skill === undefined ||
                    Object.keys(props.skill).length === 0 ? (
                    <>
                        {/* <!-- Header Area --> */}
                        {user_type === "agent" ? <AdminHeader heading={"Applied Programs"} /> : <StudyAdminHeader heading={"Applied Programs"} />}
                        {/* <!-- navbar- --> */}
                        {user_type === "agent" ? <AdminSidebar heading={"Applied Programs"} /> : <StudyAdminSidebar heading={"Applied Programs"} />}          </>
                ) : null}

                <div className={props.skill === null ||
                    props.skill === undefined ||
                    Object.keys(props.skill).length === 0
                    ? "dashboard-main-container mt-16"
                    : ""

                } id="dashboard-body">
                    <div className="container-fluid">
                        <div className="mb-18">
                            <div className="mb-4 align-items-center">
                                <div className="page___heading">
                                    <h3 className="font-size-6 mb-0">Applied Programs</h3>
                                </div>
                                {/*<-- Search Applied Programs -->*/}
                                <div className="row m-0 align-items-center">
                                    {/* Applied programs filter's */}

                                </div>
                                <small className="text-danger">{searcherror}</small>
                            </div>
                            {/*<-- Applied Programs for study permit Table -->*/}
                            <AppliedProgramTable
                                search={search}
                                appliedUserIdFilterValue={appliedUserIdFilterValue}
                                appliedUserTypeFilterValue={appliedUserTypeFilterValue}
                                employeeId={employeeId}
                                employeeTypeFilterValue={employeeTypeFilterValue}
                                apiCall={apiCall}
                                setApiCall={setApiCall}
                                pageNo={pageNo}
                                setpageNo={setpageNo}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
