
import React, { useEffect, useState } from "react";
import StudyAdminHeader from "../StudyComman/studyAdminHeader";
import StudyAdminSidebar from "../StudyComman/studySiderbar";
import AdminHeader from "../../admin/header";
import AdminSidebar from "../../admin/sidebar";
import AppliedProgramTable from "../StudyComman/appliedProgramTable";
import { CiSearch } from "react-icons/ci";
import { getallAdminData, getallEmployeeData } from "../../../api/api";
export default function AppliedPrograms(props) {
    /*Filter and search state */
    const [pageNo, setpageNo] = useState(props.page === "program" ? 1 : localStorage.getItem("PageNo") || 1);
    let [employeeId, setemployeeId] = useState();
    // const [employeeTypeFilterValue, setemployeeTypeFilterValue] = useState("");
    const [appliedUserIdFilterValue, setAppliedUserIdFilterValue] = useState("");
    const [appliedUserTypeFilterValue, setAppliedUserTypeFilterValue] = useState("");
    // let [programId, setProgramsId] = useState();
    const [employeeList, setEmployeeList] = useState([])
    const [adminList, setAdminList] = useState([])
    const [search, setSearch] = useState("");
    const [searcherror, setSearchError] = useState("");
    const [candidateSearch, setcandidateSearch] = useState("");
    let user_type = localStorage.getItem("userType")
    let [apiCall, setApiCall] = useState(false);
    /*Function to get thejSon */
    const SearchCandidate = () => {
        if (candidateSearch === "") {
            setSearchError("The search field cannot be empty.");
        } else {
            onSearch(candidateSearch);
        }
    };
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
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            SearchCandidate();
        }
    };
    /*FUnction to get all user data */
    const GetAllUserData = async () => {
        try {
            const userData = await getallEmployeeData();
            const AdminData = await getallAdminData();

            if (userData?.data?.length === 0) {
                setEmployeeList([]);
            } else {
                setEmployeeList(userData?.data);
            }

            if (AdminData.data.length === 0) {
                setAdminList([]);
            } else {
                setAdminList(AdminData.data);
            }
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {

        GetAllUserData();
        if (apiCall === true) {
            setApiCall(false)
        }
    }, [apiCall])
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
                                    <div className={"col p-1 form_group mb-3"}>
                                        <p className="input_label">Search Students:</p>
                                        <div className="input-group ">
                                            <input
                                                required
                                                type="text"
                                                className="form-control"
                                                placeholder="Search Student"
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
                                    </div>
                                    <div className="col p-1 form_group mb-3">
                                        <p className="input_label">Search by admin:</p>
                                        <select
                                            name="appliedUserIdFilterValue"
                                            value={appliedUserIdFilterValue + "," + appliedUserTypeFilterValue}
                                            id="appliedUserIdFilterValue"
                                            onChange={(e) => {
                                                setAppliedUserIdFilterValue(e.target.value.split(",")[0]);
                                                setAppliedUserTypeFilterValue(e.target.value.split(",")[1])
                                                setpageNo(1)

                                            }}
                                            className="form-control bg-white dashboard_select rounded-3"
                                        >
                                            <option value={""}>Select Admin</option>
                                            {(adminList || []).map((item, index) => {
                                                return <option key={index} value={item.admin_id + "," + item.admin_type}>{item.name}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="col p-1 form_group mb-3">
                                        <p className="input_label">Filter by Student:</p>
                                        <select
                                            name="employeeId"
                                            value={employeeId}
                                            id="employeeId"
                                            onChange={(e) => {
                                                // console.log(e.target.value.split(",")[0])
                                                setemployeeId(e.target.value.split(",")[0]);
                                                setpageNo(1)

                                            }}
                                            className="form-control bg-white dashboard_select rounded-3"
                                        >
                                            <option value={""}>Select Student</option>
                                            {(employeeList || []).map((item, index) => {
                                                return <option className='text-capitalize' key={index} value={item.employee_id}
                                                >{item.name || "unknown user"}</option>
                                            })}                                    </select>
                                        {/* <small className="text-danger">{searcherror}</small> */}
                                    </div>
                                </div>
                                <small className="text-danger">{searcherror}</small>
                            </div>
                            {/*<-- Applied Programs for study permit Table -->*/}
                            <AppliedProgramTable
                                search={search}
                                appliedUserIdFilterValue={appliedUserIdFilterValue}
                                appliedUserTypeFilterValue={appliedUserTypeFilterValue}
                                employeeId={employeeId}
                                employeeTypeFilterValue={"employee"}
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
