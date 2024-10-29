import React, { useState, useEffect } from 'react'
import StudyAdminHeader from '../StudyComman/studyAdminHeader'
import StudyAdminSidebar from '../StudyComman/studySiderbar'
import { Link } from 'react-router-dom'
import ActivityTable from '../../common/activity_table'
import { BsUsbMiniFill } from 'react-icons/bs'
import { FaWindowMaximize } from 'react-icons/fa'
import EmployeeTable from '../../common/employeeTable'
import AppliedProgramTable from '../StudyComman/appliedProgramTable'
import DataChart from '../../common/DataChart'
import Loader from '../../common/loader'
import { GetAllChartData } from '../../../api/api'
export default function StudyDashboard() {
    const [openTable, setOpenTable] = useState(null);
    const [activityNo, setActivityNo] = useState(1);
    const [studentsPageNo, setStudentsPageNo] = useState(1);
    const [appliedProgramPageNo, setAppliedProgramNo] = useState(1);
    let [appliedProgram, setAppliedProgram] = useState("");
    let [activity, setActivity] = useState("");
    let [students, setStudents] = useState("");
    let [apiCall, setApiCall] = useState(false);
    let adminId = localStorage.getItem("admin_id");
    const [applicantStatusChartData, setApplicantStatusData] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState(true);
    let adminType = localStorage.getItem("userType")
    /*Function to maximixe and minimize the tables*/
    const toggleTable = (tableNumber) => {
        if (openTable === tableNumber) {
            setOpenTable(null);
        } else {
            setOpenTable(tableNumber);
        }
        // Function to focus on the particular div we select for maximizing and minimizing.
        window.requestAnimationFrame(() => {
            const element = document.getElementById(`table${tableNumber}`);
            element && element.scrollIntoView({ behavior: "smooth" });
        });
    };
    /*Function get minimize maximize icons */
    const getIcon = (tableNumber) => {
        return openTable === tableNumber ? <BsUsbMiniFill /> : <FaWindowMaximize />;
    };
    /*Function to Get Graph data */
    const GetChartData = async () => {
        //Applicants status data
        try {
            let res = await GetAllChartData("", adminType, "study permit");
            if (res.status === 1) {
                console.log(res.data)
                // setLoginCondition(false)
                setApplicantStatusData(res.data);
                setLoadingStatus(false);
            } else {
                setApplicantStatusData([]);
                setLoadingStatus(false);
            }
        } catch (err) {
            console.log(err);
            setLoadingStatus(false);
        }
    }
    useEffect(() => {
        GetChartData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="site-wrapper overflow-hidden bg-default-2">
            {/* <!-- Header Area --> */}
            <StudyAdminHeader heading={"Dashboard"} />
            {/* <!-- navbar- --> */}
            <StudyAdminSidebar heading={"Dashboard"} />

            <div
                className={
                    "dashboard-main-container mt-12 mt-lg-12"
                }
                id="dashboard-body"
            >

                <div className="container-fluid mt-15">
                    <div className="row">
                        <div className="col-xxl-3 col-xl-4 col-md-6 col-xs-12 col-sm-6">
                            {/* <!-- Single Category --> */}
                            <Link
                                to=""
                                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
                            >
                                <div className="text-blue bg-blue-opacity-1 circle-56 font-size-6 mr-7">
                                    <i className="fas fa-briefcase"></i>
                                </div>
                                {/* <!-- Category Content --> */}
                                <div>
                                    <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                                        <span className="counter">
                                            10
                                        </span>
                                    </h5>
                                    <p className="font-size-4 font-weight-normal text-gray mb-0">
                                        Programs
                                    </p>
                                </div>
                            </Link>
                            {/* <!-- End Single Category --> */}
                        </div>
                        <div className="col-xxl-3 col-xl-4 col-md-6 col-xs-12 col-sm-6">
                            {/* <!-- Single Category --> */}
                            <Link
                                to=""
                                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
                            >
                                <div className="text-pink bg-pink-opacity-1 circle-56 font-size-6 mr-7">
                                    <i className="fas fa-user"></i>
                                </div>
                                {/* <!-- Category Content --> */}
                                <div>
                                    <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                                        <span className="counter">
                                            550
                                        </span>
                                    </h5>
                                    <p className="font-size-4 font-weight-normal text-gray mb-0">
                                        Total Students
                                    </p>
                                </div>
                            </Link>
                            {/* <!-- End Single Category --> */}
                        </div>
                        <div className="col-xxl-3 col-xl-4 col-md-6 col-xs-12 col-sm-6">
                            {/* <!-- Single Category --> */}
                            <Link
                                to=""
                                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
                            >
                                <div className="text-orange bg-orange-opacity-1 circle-56 font-size-6 mr-7">
                                    <i className="fas fa-eye"></i>
                                </div>
                                {/* <!-- Category Content --> */}
                                <div>
                                    <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                                        <span className="counter">
                                            10
                                        </span>
                                    </h5>
                                    <p className="font-size-4 font-weight-normal text-gray mb-0">
                                        Total documents
                                    </p>
                                </div>
                            </Link>
                            {/* <!-- End Single Category --> */}
                        </div>
                        {/* <div className="col-xxl-3 col-xl-4 col-md-6 col-xs-12 col-sm-6">
                            <Link
                                to=""
                                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
                            >
                                <div className="text-egg-blue bg-egg-blue-opacity-1 circle-56 font-size-6 mr-7">
                                    <i className="fas fa-mouse-pointer"></i>
                                </div>
                                <div>
                                    <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                                        <span className="counter">50</span>
                                        %
                                    </h5>
                                    <p className="font-size-4 font-weight-normal text-gray mb-0">
                                        Applied Rate
                                    </p>
                                </div>
                            </Link>
                        </div> */}
                        <div className="col-xxl-3 col-xl-4 col-md-6 col-xs-12 col-sm-6">
                            {/* <!-- Single Category --> */}
                            <Link
                                to=""
                                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
                            >
                                <div className="text-orange bg-orange-opacity-1 circle-56 font-size-6 mr-7">
                                    <i className="fas fa-users"></i>
                                </div>
                                {/* <!-- Category Content --> */}
                                <div>
                                    <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                                        <span className="counter">
                                            50
                                        </span>
                                    </h5>
                                    <p className="font-size-4 font-weight-normal text-gray mb-0">
                                        Total Applied Applicants
                                    </p>
                                </div>
                            </Link>
                            {/* <!-- End Single Category --> */}
                        </div>
                        {/* <div className="col-xxl-3 col-xl-4 col-md-6 col-xs-12 col-sm-6">
                            <Link
                                to=""
                                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
                            >
                                <div className="text-egg-blue bg-egg-blue-opacity-1 circle-56 font-size-6 mr-7">
                                    <i className="fas fa-check "></i>
                                </div>
                                <div>
                                    <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                                        <span className="counter">7</span>
                                    </h5>
                                    <p className="font-size-4 font-weight-normal text-gray mb-0">
                                        Placed Job
                                    </p>
                                </div>
                            </Link>
                        </div> */}

                    </div>
                    <div className='row'
                    >
                        <div id="table0" className={"col-md-6"}>
                            <div className="bg-white dashboard_card mb-7">
                                <div className="d-flex justify-content-between p-5 align-items-center">
                                    <h3 className="font-size-5 px-3 m-0 ">Applicant's status</h3>
                                </div>
                                <div className="bg-white dashboard_card ">
                                    {loadingStatus ? (
                                        <Loader />
                                    ) : (
                                        <DataChart
                                            data={applicantStatusChartData}
                                            dataType={"status"}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div
                            id="table1"
                            className={openTable === 1 ? "col-md-12" : "col-md-6"}
                        >
                            <div className="bg-white dashboard_card mb-7">
                                <div className="d-flex justify-content-between p-5 align-items-center">
                                    <h3 className="font-size-5 px-3 m-0  ">
                                        Recently Added Activity
                                    </h3>
                                    <div className="d-flex justify-content-between p-0">
                                        <div className="select_div mr-5">
                                            <select
                                                name="activity"
                                                value={activity}
                                                id="activity"
                                                onChange={(e) => {
                                                    setActivity(e.target.value);
                                                    setActivityNo(1);
                                                }}
                                                className="form-control-sm bg-white dashboard_select rounded-3"
                                            >
                                                <option value={""}>Time Duration</option>
                                                <option value={"today"}>Today </option>
                                                <option value={"this_week"}>This Week </option>
                                                <option value={"last_week"}>Last Week</option>
                                                <option value={"last_month"}>Last Month</option>
                                                <option value={"current_month"}>Current Month</option>
                                            </select>
                                        </div>
                                        <Link
                                            className={`text-dark mx-5 ${openTable === 1 ? "open" : ""
                                                }`}
                                            to=""
                                            onClick={() => toggleTable(1)}
                                            title={openTable === 1 ? "Minimize" : "Maximize"}
                                        >
                                            {getIcon(1)}
                                        </Link>
                                    </div>
                                </div>
                                <ActivityTable
                                    heading={openTable === 1 ? "" : "Dashboard"}
                                    filter_by_time={activity}
                                    setpageNo={setActivityNo}
                                    pageNo={activityNo}
                                    apiCall={apiCall}
                                    setApiCall={setApiCall}
                                    applicantType={"study permit"}
                                />
                            </div>
                        </div>
                        {/* <!-- Recent students- --> */}
                        <div
                            id="table2"
                            className={openTable === 2 ? "col-md-12" : "col-md-6"}
                        >
                            <div className="bg-white dashboard_card mb-7">
                                <div className="d-flex justify-content-between p-5 align-items-center">
                                    <h3 className="font-size-5 px-3 m-0  ">
                                        Recently Added Students
                                    </h3>
                                    <div className="d-flex justify-content-between p-0">
                                        <div className="select_div mr-5">
                                            <select
                                                name="students"
                                                value={students}
                                                id="students"
                                                onChange={(e) => {
                                                    setStudents(e.target.value);
                                                    setStudentsPageNo(1);
                                                }}
                                                className="form-control-sm bg-white dashboard_select rounded-3"
                                            >
                                                <option value={""}>Time Duration</option>
                                                <option value={"today"}>Today </option>
                                                <option value={"this_week"}>This Week </option>
                                                <option value={"last_week"}>Last Week</option>
                                                <option value={"last_month"}>Last Month</option>
                                                <option value={"current_month"}>Current Month</option>
                                            </select>
                                        </div>
                                        <div className="">
                                            <Link
                                                className="text-center btn-sm p-2 btn-outline-info border border-info mt-0 rounded-3 dashboard_view_"
                                                to={"/students"}
                                                title="View all Applicants"
                                            >
                                                View All
                                            </Link>
                                        </div>
                                        <Link
                                            className={`text-dark mx-5 ${openTable === 2 ? "open" : ""
                                                }`}
                                            to=""
                                            onClick={() => toggleTable(2)}
                                            title={openTable === 2 ? "Minimize" : "Maximize"}
                                        >
                                            {getIcon(2)}
                                        </Link>
                                    </div>
                                </div>
                                <EmployeeTable
                                    heading={openTable === 2 ? "" : "Dashboard"}
                                    filter_by_time={students}
                                    setpageNo={setStudentsPageNo}
                                    pageNo={studentsPageNo}
                                    self={"yes"}
                                    apiCall={apiCall}
                                    setApiCall={setApiCall}
                                    ApplicantType={"study permit"}
                                    pageName={"employee"}
                                    adminFilterValue={adminId}
                                />
                            </div>
                        </div>
                        {/* <!-- Recent Applied programs- --> */}
                        <div
                            id="table3"
                            className={openTable === 3 ? "col-md-12" : "col-md-6"}
                        >
                            <div className="bg-white dashboard_card mb-7">
                                <div className="d-flex justify-content-between p-5 align-items-center">
                                    <h3 className="font-size-5 px-3 m-0  ">
                                        Recently Applied Programs
                                    </h3>
                                    <div className="d-flex justify-content-between p-0">
                                        <div className="select_div mr-5">
                                            <select
                                                name="appliedProgram"
                                                value={appliedProgram}
                                                id="appliedProgram"
                                                onChange={(e) => {
                                                    setAppliedProgram(e.target.value);
                                                    setAppliedProgramNo(1);
                                                }}
                                                className="form-control-sm bg-white dashboard_select rounded-3"
                                            >
                                                <option value={""}>Time Duration</option>
                                                <option value={"today"}>Today </option>
                                                <option value={"this_week"}>This Week </option>
                                                <option value={"last_week"}>Last Week</option>
                                                <option value={"last_month"}>Last Month</option>
                                                <option value={"current_month"}>Current Month</option>
                                            </select>
                                        </div>
                                        {/* <div className="">
                                            <Link
                                                className="text-center btn-sm p-2 btn-outline-info border border-info mt-0 rounded-3 dashboard_view_"
                                                to={"/students"}
                                                title="View all Applicants"
                                            >
                                                View All
                                            </Link>
                                        </div> */}
                                        <Link
                                            className={`text-dark mx-5 ${openTable === 3 ? "open" : ""
                                                }`}
                                            to=""
                                            onClick={() => toggleTable(3)}
                                            title={openTable === 3 ? "Minimize" : "Maximize"}
                                        >
                                            {getIcon(3)}
                                        </Link>
                                    </div>
                                </div>
                                <AppliedProgramTable
                                    heading={openTable === 3 ? "" : "Dashboard"}
                                    filter_by_time={appliedProgram}
                                    setpageNo={setAppliedProgramNo}
                                    pageNo={appliedProgramPageNo}
                                    apiCall={apiCall}
                                    setApiCall={setApiCall}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
