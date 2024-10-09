import React, { useEffect, useState } from 'react'
import AdminSidebar from './sidebar'
import AdminHeader from './header'
import TaskCount from '../common/taskCount'
import AdminTaskTable from '../common/AdminTaskTable'
import { getallAdminData, getallEmployeeData } from '../../api/api'

export default function ManageTask() {
    const [apiCall, setApiCall] = useState(false)
    const [userId, setUserId] = useState()
    const [adminId, setAdminId] = useState()
    const [userType, setUserType] = useState()
    const [adminType, setAdminType] = useState()
    const [count, setCount] = useState()
    const [employeeList, setEmployeeList] = useState([])
    const [employerList, setEmployerList] = useState([])
    const [adminList, setAdminList] = useState([])
    /*FUnction to get all user data */
    const GetAllUserData = async () => {
        try {
            const userData = await getallEmployeeData();
            const AdminData = await getallAdminData();
            //   if (window.location.pathname === `/${user_id}`) {
            //     const Partnerdata = await GetAgent();
            //     let newPartnerList = Partnerdata.data.data.filter(
            //       (item) => item.id === partnerId
            //     );
            //     // let otherPartners = Partnerdata.data.data.filter((item) => item.id!== partnerId);
            //     // newPartnerList = [...newPartnerList,...otherPartners];
            //     setPartnerist(newPartnerList);
            //   }
            if (userData.data.length === 0) {
                setEmployeeList([]);
            } else {
                setEmployeeList(userData.data);
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
    }, [apiCall])
    return (

        <>
            <div className="site-wrapper overflow-hidden bg-default-2">
                {/* <!-- Header Area --> */}
                <AdminHeader heading={"Manage Task"} />
                {/* <!-- navbar- --> */}
                <AdminSidebar heading={"Manage Task"} />
                <div>
                </div>
                <div className="dashboard-main-container mt-16" id="dashboard-body">
                    <div className="container-fluid ">

                        <div className="row">
                            <div className="col-6 mb-18">
                                <div className=" p-1 form_group mb-3">
                                    <p className="input_label">Filter by user:</p>
                                    <select
                                        name="userId"
                                        value={userId + "," + userType}
                                        id="userId"
                                        onChange={(e) => {
                                            // console.log(e.target.value.split(",")[0])
                                            setUserId(e.target.value.split(",")[0]);
                                            setUserType(e.target.value.split(",")[1])
                                        }}
                                        className="form-control bg-white dashboard_select rounded-3"
                                    >
                                        <option value={""}>Select user</option>
                                        {(employeeList || []).map((item, index) => {
                                            return <option key={index} value={item.employee_id + "," + userType}>{item.name}</option>
                                        })}                                    </select>
                                    {/* <small className="text-danger">{searcherror}</small> */}
                                </div>
                                <h3 className="font-size-5 mb-0">Candidate's Task</h3>
                                <div>
                                    <TaskCount count={count} />
                                    <AdminTaskTable
                                        heading={""}
                                        filter_by_time={""}
                                        apiCall={apiCall}
                                        setApiCall={setApiCall}
                                        employeeId={userId}
                                        TaskUserType={userType}
                                        setCount={setCount}
                                    />
                                </div>
                            </div>
                            <div className="col-6 mb-18">
                                <div className="col p-1 form_group mb-3">
                                    <p className="input_label">Search by admin:</p>
                                    <select
                                        name="adminId"
                                        value={adminId}
                                        id="adminId"
                                        onChange={(e) => {
                                            setAdminId(e.target.value.split(",")[0]);
                                            setAdminType(e.target.value.split(",")[1])
                                        }}
                                        className="form-control bg-white dashboard_select rounded-3"
                                    >
                                        <option value={""}>Select Admin</option>
                                        {(adminList || []).map((item, index) => {
                                            return <option key={index} value={item.admin_id + "," + item.admin_type}>{item.name}</option>
                                        })}
                                    </select>
                                </div>
                                <h3 className="font-size-5 mb-0">Admin's task</h3>
                                <div>
                                    <TaskCount />
                                    <AdminTaskTable
                                        heading={""}
                                        filter_by_time={""}
                                        apiCall={apiCall}
                                        setApiCall={setApiCall}
                                        adminId={adminId}
                                        adminType={adminType}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ;
        </>
    )
}
