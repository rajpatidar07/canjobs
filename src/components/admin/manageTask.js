import React, { useEffect, useState } from "react";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";
import TaskCount from "../common/taskCount";
import AdminTaskTable from "../common/AdminTaskTable";
import {
  getallAdminData,
  getallEmployeeData,
  getAllEmployer,
} from "../../api/api";
import AdminListTaskTable from "../common/AdminListTaskTabel";
import CustomButton from "../common/button";
import AddTaskForm from "../forms/admin/addTaskForm";
import { Link, useLocation } from "react-router-dom";

export default function ManageTask() {
  const [apiCall, setApiCall] = useState(false);
  const [userId, setUserId] = useState();
  const [adminId, setAdminId] = useState();
  const [userType, setUserType] = useState();
  const [adminType, setAdminType] = useState();
  const [status, setStatus] = useState();
  const [count, setCount] = useState();
  const [taskPage, setTaskPage] = useState(1);
  const [adminPage, setAdminPage] = useState(1);
  const [employeeList, setEmployeeList] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [updateTaskData, setUpdateTaskData] = useState();
  const [adminList, setAdminList] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const taskId = searchParams.get("taskId");
  /*Function to get all user data */
  const GetAllUserData = async () => {
    try {
      const userData = await getallEmployeeData();
      const AdminData = await getallAdminData();
      const CompanyData = await getAllEmployer();
      //   if (window.location.pathname === `/${user_id}`) {
      //     const Partnerdata = await GetAgent();
      //     let newPartnerList = Partnerdata.data.data.filter(
      //       (item) => item.id === partnerId
      //     );
      //     // let otherPartners = Partnerdata.data.data.filter((item) => item.id!== partnerId);
      //     // newPartnerList = [...newPartnerList,...otherPartners];
      //     setPartnerist(newPartnerList);
      //   }
      let allUserData = [];

      if (userData?.data?.length === 0 && CompanyData?.data?.length === 0) {
        setEmployeeList([]);
      } else {
        allUserData = [...userData.data, ...CompanyData.data]; // Merge the arrays
        setEmployeeList(allUserData);
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
      setApiCall(false);
    }
  }, [apiCall]);
  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader heading={"Task Dashboard"} />
        {/* <!-- navbar- --> */}
        <AdminSidebar heading={"Task Dashboard"} />

        <div className="dashboard-main-container mt-14" id="dashboard-body">
          <div className="container-fluid ">
            <div className="row m-0">
              <div className="col px-1 form_group mb-3">
                <p className="input_label">Filter by Admin:</p>
                <select
                  name="adminId"
                  value={adminId + "," + adminType}
                  id="adminId"
                  onChange={(e) => {
                    setAdminId(e.target.value.split(",")[0]);
                    setAdminType(e.target.value.split(",")[1]);
                    setAdminPage(1);
                    setTaskPage(1);
                  }}
                  className="form-control bg-white dashboard_select rounded-3"
                >
                  <option value={""}>Select Admin</option>
                  {(adminList || []).map((item, index) => {
                    return (
                      <option
                        key={index}
                        value={item.admin_id + "," + item.admin_type}
                      >
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col px-1 form_group mb-3">
                <p className="input_label">Filter by Candidate:</p>
                <select
                  name="userId"
                  value={userId + "," + userType}
                  id="userId"
                  onChange={(e) => {
                    // console.log(e.target.value.split(",")[0])
                    setUserId(e.target.value.split(",")[0]);
                    setUserType(e.target.value.split(",")[1]);
                    setAdminPage(1);
                    setTaskPage(1);
                  }}
                  className="form-control bg-white dashboard_select rounded-3"
                >
                  <option value={""}>Select Candidate</option>
                  {(employeeList || []).map((item, index) => {
                    return (
                      <option
                        className="text-capitalize"
                        key={index}
                        value={
                          item.employee_id
                            ? `${item.employee_id},employee`
                            : `${item.company_id},employer`
                        }
                      >
                        {(item.employee_id ? item.name : item.company_name) ||
                          "unknown user"}
                      </option>
                    );
                  })}{" "}
                </select>
                {/* <small className="text-danger">{searcherror}</small> */}
              </div>
              <div className="col px-1 form_group mb-3">
                <p className="input_label">Filter by Status:</p>
                <select
                  name="status"
                  value={status}
                  id="status"
                  onChange={(e) => {
                    // console.log(e.target.value.split(",")[0])
                    setStatus(e.target.value.split(",")[0]);
                    setAdminPage(1);
                    setTaskPage(1);
                  }}
                  className="form-control bg-white dashboard_select rounded-3"
                >
                  <option value={""}>Select status</option>
                  <option value={"1"}>Completed Tasks</option>
                  <option value={"0"}>Incomplete Tasks</option>
                  <option value={"2"}>Overdue Tasks</option>
                  <option value={"3"}>Processing Tasks</option>
                </select>
                {/* <small className="text-danger">{searcherror}</small> */}
              </div>
              <div className="col px-1 form_group mt-7 ">
                <CustomButton
                  style={{ height: "29px" }}
                  className="col font-size-3 rounded-3 btn btn-primary border-0"
                  onClick={() => {
                    setStatus("");
                    setUserId();
                    setUserType();
                    setAdminId();
                    setAdminType();
                    setAdminPage(1);
                    setTaskPage(1);
                  }}
                >
                  Reset
                </CustomButton>
              </div>
            </div>
            <div>
              <TaskCount count={count} />
              <div className="row">
                <div className="col-12 mb-18">
                  <h3 className="d-flex font-size-5 px-3">
                    Tasks
                    <Link
                      className="page-link font-size-3 py-2 ml-3 font-weight-semibold px-3 rounded"
                      onClick={() => setShowTaskForm(true)}
                    >
                      + Add New Task
                    </Link>
                  </h3>
                  {showTaskForm ? (
                    <AddTaskForm
                      userId={userId}
                      TaskUserType={userType}
                      setApiCall={setApiCall}
                      setShowTaskForm={setShowTaskForm}
                      updateTaskData={updateTaskData}
                      setUpdateTaskData={setUpdateTaskData}
                    />
                  ) : null}
                  <AdminTaskTable
                    heading={"Task Dashboard"}
                    filter_by_time={""}
                    apiCall={apiCall}
                    setApiCall={setApiCall}
                    employeeId={userId}
                    TaskUserType={userType}
                    setCount={setCount}
                    status={status}
                    adminId={adminId}
                    pageNo={taskPage}
                    setpageNo={setTaskPage}
                    adminType={adminType}
                    taskId={taskId}
                    setUpdateTaskData={setUpdateTaskData}
                    setShowTaskForm={setShowTaskForm}
                  />
                </div>

                <div className="col-6 mb-18 d-none">
                  <h3 className="font-size-5 px-3 m-0  ">Admin tasks</h3>
                  <AdminListTaskTable
                    heading={""}
                    filter_by_time={""}
                    apiCall={apiCall}
                    setApiCall={setApiCall}
                    employeeId={userId}
                    TaskUserType={userType}
                    // setCount={setCount}
                    adminId={adminId}
                    adminType={adminType}
                    status={status}
                    pageNo={adminPage}
                    setpageNo={setAdminPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
}
