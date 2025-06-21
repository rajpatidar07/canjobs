import React, { useEffect, useState } from "react";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";
import TaskCount from "../common/taskCount";
import AdminTaskTable from "../common/AdminTaskTable";
import {
  getallAdminData,
  getallEmployeeData,
  getAllEmployer,
  getApplicanTypeApi,
  GetCommentsAndAssign,
  GetFilter,
} from "../../api/api";
import AdminListTaskTable from "../common/AdminListTaskTabel";
import CustomButton from "../common/button";
import AddTaskForm from "../forms/admin/addTaskForm";
import { Link, useLocation } from "react-router-dom";
import CommonThreeDots from "../common/commonThreeDots";
import { CiSearch } from "react-icons/ci";
import SelectBox from "../common/Common function/SelectBox";

export default function ManageTask() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let NotifiTaskId = searchParams.get("taskId") || ""
  let NotifiReplyId = searchParams.get("replyId") || ""
  const [apiCall, setApiCall] = useState(false);
  const [userId, setUserId] = useState();
  const [adminId, setAdminId] = useState();
  const [byAdminId, setByAdminId] = useState();
  const [userType, setUserType] = useState();
  const [adminType, setAdminType] = useState();
  const [byAdminType, setByAdminType] = useState();
  const [status, setStatus] = useState(NotifiTaskId ? "" : "-1");
  const [statusList, setStatusList] = useState([]);
  let [applicantTypeList, setApplicantTypeList] = useState([])
  const [count, setCount] = useState();
  const [taskPage, setTaskPage] = useState(1);
  const [adminPage, setAdminPage] = useState(1);
  const [employeeList, setEmployeeList] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [updateTaskData, setUpdateTaskData] = useState();
  const [adminList, setAdminList] = useState([]);
  const [allTaskList, setAllTaskList] = useState([]);
  const [taskId, setTaskId] = useState(NotifiTaskId)
  const [replyId, setReplyId] = useState(NotifiReplyId)
  const [searchError, setSearchError] = useState("");
  const [search, setSearch] = useState("");

  /*Function to get all user data */
  const GetAllUserData = async () => {
    try {
      const userData = await getallEmployeeData();
      const AdminData = await getallAdminData();
      const CompanyData = await getAllEmployer();
      const allTaskres = await GetCommentsAndAssign("", "", "", "task");
      const resStatus = await GetFilter();
      const resApplicantType = await getApplicanTypeApi("")
      setStatusList(resStatus.data.data.status_type);
      setAllTaskList(allTaskres.data.data.data)
      setApplicantTypeList(resApplicantType.data.data.filter((i) => i.parent_id === "0"))
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

      if (userData?.data?.length === 0 && CompanyData?.data?.length === 0 && resApplicantType.data.data.length === 0) {
        setEmployeeList([]);
      } else {
        allUserData = [...userData.data, ...CompanyData.data,]; // Merge the arrays
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
    if (NotifiTaskId) {
      setTaskId(NotifiTaskId)
    }
    if (NotifiReplyId) {
      setReplyId(NotifiReplyId)
    }
  }, [NotifiTaskId, NotifiReplyId])

  useEffect(() => {
    GetAllUserData();
    if (apiCall === true) {
      setApiCall(false);
    }

  }, [apiCall, taskId, replyId]);
  const onSearch = () => {
    const inputValue = search.trim();

    if (inputValue === "") {
      setSearchError("The search field cannot be empty.");
      return;
    }

    if (/^\d/.test(inputValue)) {
      setSearchError("Candidate Name cannot start with a number.");
      return;
    }

    if (!/^[A-Za-z0-9 ]*$/.test(inputValue)) {
      setSearchError("Cannot use special characters.");
      return;
    }

    setSearchError("");

    const filteredList = allTaskList.filter((task) =>
      task.subject_description?.toLowerCase().includes(inputValue.toLowerCase()) ||
      task.task_creator_user_name?.toLowerCase().includes(inputValue.toLowerCase())
    );

    setAllTaskList(filteredList); // Show only filtered tasks
  };
  const SearchAll = () => {
    onSearch();
  };
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
              {/* Search */}
              <div
                className={"col px-1 form_group mb-3"}>
                <p className="input_label">Search:</p>
                <div className="input-group ">
                  <input
                    required
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    name="Employee_name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") SearchAll();
                    }}
                  />

                  <div className="input-group-append">
                    <button
                      className=""
                      type="button"
                      onClick={SearchAll}
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
                <small className="text-danger">{searchError}</small>
              </div>
              <div className="col px-1 form_group mb-3">
                <p className="input_label">Filter by Assign to admin:</p>
                <SelectBox
                  Width={"yes"} options={adminList ? adminList.map((option) => ({
                    value: option.admin_id + "," + option.admin_type,
                    label: option.name,
                  })) : []}
                  selectedValue={adminId + "," + adminType}
                  onChange={(e) => {
                    setAdminId(e ? e.value.split(",")[0] : null);
                    setAdminType(e ? e.value.split(",")[1] : null);
                    setAdminPage(1);
                    setTaskPage(1);
                    setReplyId("")
                    setTaskId("")
                  }}
                  type={"adminId"}
                />
              </div>
              <div className="col px-1 form_group mb-3">
                <p className="input_label">Filter by Assign by admin:</p>
                <SelectBox
                  Width={"yes"} options={adminList ? adminList.map((option) => ({
                    value: option.admin_id + "," + option.admin_type,
                    label: option.name,
                  })) : []}
                  selectedValue={byAdminId + "," + byAdminType}
                  onChange={(e) => {
                    setByAdminId(e ? e.value.split(",")[0] : null);
                    setByAdminType(e ? e.value.split(",")[1] : null);
                    setAdminPage(1);
                    setTaskPage(1);
                    setReplyId("")
                    setTaskId("")
                  }}
                  type={"by_admin_id"}
                />
              </div>
              <div className="col px-1 form_group mb-3">
                <p className="input_label">Filter by Applicant/Client:</p>
                <SelectBox
                  Width={"yes"} options={employeeList ? employeeList.map((option) => ({
                    value: option.employee_id
                      ? `${option.employee_id},employee`
                      : option.company_id
                        ? `${option.company_id},employer`
                        : `${option.id},applicant_type`,
                    label: option.employee_id
                      ? (option.name + " (Candidate)")
                      : option.company_id
                        ? option.company_name + " (Client)"
                        : option.title + " (Applicant Type)" ||
                        "unknown user",
                  })) : []}
                  selectedValue={userId + "," + userType}
                  onChange={(e) => {
                    setUserId(e ? e.value.split(",")[0] : null);
                    setUserType(e ? e.value.split(",")[1] : null);
                    setAdminPage(1);
                    setTaskPage(1);
                    setReplyId("")
                    setTaskId("")
                  }}
                  type={"user"}
                />
              </div>
              <div className="col px-1 form_group mb-3">
                <p className="input_label">Filter by Applicant Type:</p>
                <SelectBox
                  Width={"yes"} options={applicantTypeList ? applicantTypeList.map((option) => ({
                    value: `${option.id},applicant_type`,
                    label: option.title,
                  })) : []}
                  selectedValue={userId + "," + userType}
                  onChange={(e) => {
                    setUserId(e ? e.value.split(",")[0] : null);
                    setUserType(e ? e.value.split(",")[1] : null);
                    setAdminPage(1);
                    setTaskPage(1);
                    setReplyId("")
                    setTaskId("")
                  }}
                  type={"applicantType"}
                />  </div>
              <div className="col px-1 form_group mb-3">
                <p className="input_label">Filter by Status:</p>
                <SelectBox
                  Width={"yes"} options={statusList ? statusList.map((option) => ({
                    value: `${option.id}`,
                    label: option.value,
                  })) : []}
                  selectedValue={status}
                  onChange={(e) => {
                    setStatus(e ? e.value.split(",")[0] : null);
                    setAdminPage(1);
                    setTaskPage(1);
                    setReplyId("")
                    setTaskId("")
                  }}
                  type={"status"}
                />
              </div>
              <div className="col px-1 form_group mt-7 ">
                <CustomButton
                  style={{ height: "29px" }}
                  className="col font-size-3 rounded-3 btn btn-primary border-0"
                  onClick={() => {
                    setStatus("-1");
                    setUserId();
                    setUserType();
                    setAdminId();
                    setAdminType();
                    setByAdminId();
                    setByAdminType()
                    setAdminPage(1);
                    setTaskPage(1);
                    setReplyId("")
                    setTaskId("")
                    setSearch("")
                    setSearchError("")
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
                  <div className="d-flex">
                    <h3 className="d-flex font-size-5 px-3">
                      Tasks
                      <Link
                        className="page-link font-size-3 ml-3 font-weight-semibold px-3 rounded"
                        onClick={() => {
                          setShowTaskForm(true)
                          setTaskId("")
                          setReplyId("")
                        }}
                      >
                        + Add New Task
                      </Link>
                    </h3>
                    <div className="mt-4">
                      <CommonThreeDots
                        tableName={"task"}
                        tableData={allTaskList} />
                    </div>
                  </div>
                  {showTaskForm ? (
                    <AddTaskForm
                      // userId={userId}
                      // TaskUserType={userType}
                      employee_employer_applicantType_list={[...employeeList, ...applicantTypeList]}
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
                    taskId={NotifiTaskId}
                    replyId={NotifiReplyId}
                    setUpdateTaskData={setUpdateTaskData}
                    setShowTaskForm={setShowTaskForm}
                    setReplyId={setReplyId}
                    setTaskId={setTaskId}
                    setStatus={setStatus}
                    statusList={statusList}
                    byAdminId={byAdminId}
                    byAdminType={byAdminType}
                    search={search}
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
