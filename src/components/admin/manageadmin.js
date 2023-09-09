import React, { useState, useEffect } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import CustomButton from "../common/button";
import Addadmin from "../forms/admin/addadmin";
import { getallAdminData, DeleteAdmin } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import SAlert from "../common/sweetAlert";
import Pagination from "../common/pagination";
import FilterJson from "../json/filterjson";
import Loader from "../common/loader";
import ExecutiveBox from "../common/executiveBox";
import AdminTable from "../common/adminTable";
function ManageAdmin() {
  /*data and id state */
  let [apiCall, setApiCall] = useState(false);
  let [showAminDetails /*, setShowAminDetails*/] = useState(false);
  let [showAddAdminModal, setShowAdminModal] = useState(false);
  let [adminData, setAdminData] = useState([]);
  let [executiveData, setexecutiveData] = useState([]);
  let [adminId, setAdminID] = useState();
  let [isLoading, setIsLoading] = useState(true);
  let [addTeamListShow, setAddTeamListShow] = useState(true);
  /*delete state */
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteID] = useState();
  const [deleteName, setDeleteName] = useState("");
  /*Filter and search state */
  const [typeFilterValue, setTypeFilterValue] = useState("");
  const [search, setSearch] = useState("");
  const [searcherror, setSearchError] = useState("");
  /*Pagination states */
  const [totalData, setTotalData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  /*Shorting states */
  const [columnName, setcolumnName] = useState("admin_id");
  const [sortOrder, setSortOrder] = useState("DESC");
  /* Function to get the Amin data*/
  const AdminData = async () => {
    setIsLoading(true);
    try {
      const userData = await getallAdminData(
        typeFilterValue,
        search,
        currentPage,
        recordsPerPage,
        columnName,
        sortOrder
      );
      if (userData.data.length === 0) {
        setAdminData([]);
        setIsLoading(false);
      } else {
        setAdminData(userData.data);
        setexecutiveData(
          userData.data.filter((item) => item.admin_type === "executive")
        );
        setTotalData(userData.total_rows);
        if (apiCall === true) {
          let Admin_name = userData.data.filter(
            (data) => data.admin_id === localStorage.getItem("admin_id")
          );
          if (Admin_name[0].admin_id === localStorage.getItem("admin_id")) {
            localStorage.setItem("admin", Admin_name[0].name);
          }
        }
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  /*Render function to get the Admin*/
  useEffect(() => {
    AdminData();
    if (apiCall === true) {
      setApiCall(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    typeFilterValue,
    search,
    currentPage,
    recordsPerPage,
    columnName,
    sortOrder,
    apiCall,
  ]);

  /* Function to show the single data to update Admin*/
  const editAdmin = (e) => {
    // e.preventDefault();
    setShowAdminModal(true);
    setAdminID(e);
  };
  /*To Show the delete alert box */
  const ShowDeleteAlert = (e) => {
    setDeleteID(e.admin_id);
    setDeleteName(e.name);
    setDeleteAlert(true);
  };
  /*To cancel the delete alert box */
  const CancelDelete = () => {
    setDeleteAlert(false);
  };
  /*To call Api to delete category */
  async function deleteAdmin(e) {
    try {
      const responseData = await DeleteAdmin(e);
      if (responseData.message === "admin has been deleted") {
        toast.error("Admin deleted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
        setDeleteAlert(false);
      }
    } catch (err) {
      console.log(err);
    }
  }
  /*Search Onchange function to filter the data */
  const onSearch = (e) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
    setCurrentPage(1);
    if (inputValue.length > 0) {
      if (/[-]?\d+(\.\d+)?/.test(inputValue.charAt(0))) {
        setSearchError("Admin Name cannot start with a number.");
      } else if (!/^[A-Za-z0-9 ]*$/.test(inputValue)) {
        setSearchError("Cannot use special characters.");
      } else {
        setSearchError("");
      }
    } else {
      setSearchError("");
    }
  };
  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);

  /*Sorting Function */
  const handleSort = (columnName) => {
    setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
    setcolumnName(columnName);
    setCurrentPage(1);
  };
  /*Function to add team to the manager */
  const addTeam = async () => {
    setAddTeamListShow(true);
    console.log("add team to manager");
  };
  /*Function o add task to the executive */
  const AddTask = async () => {
    setAddTeamListShow(false);
    console.log("add task to executive");
  };

  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader heading={"Manage Admin"} />
        {/* <!-- navbar- --> */}
        <AdminSidebar heading={"Manage Admin"} />
        <ToastContainer />
        {showAddAdminModal ? (
          <Addadmin
            show={showAddAdminModal}
            adminId={adminId}
            apiCall={apiCall}
            setApiCall={setApiCall}
            close={() => setShowAdminModal(false)}
          />
        ) : null}
        <div
          className={
            showAminDetails === false
              ? "dashboard-main-container mt-16"
              : "d-none"
          }
          id="dashboard-body"
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-6 mb-18">
                <div className="mb-4 align-items-center">
                  <div className="page___heading">
                    <h3 className="font-size-6 mb-0">Admin</h3>
                  </div>
                  <div className="row m-0 align-items-center">
                    <div className="col p-1 form_group mb-3">
                      <p className="input_label">Search:</p>
                      <input
                        required
                        maxLength={30}
                        type="text"
                        className="form-control "
                        placeholder={"Admin Name"}
                        value={search}
                        name={"Admin_name"}
                        onChange={(e) => {
                          onSearch(e);
                        }}
                      />
                    </div>
                    <div className="col p-1 form_group mb-3">
                      <p className="input_label">Filter by Admin:</p>
                      <div className="select_div">
                        <select
                          name="type"
                          value={typeFilterValue}
                          id="type"
                          onChange={(e) => {
                            setTypeFilterValue(e.target.value);
                            setCurrentPage(1);
                          }}
                          className=" form-control"
                        >
                          <option value="">Admin type</option>
                          {(FilterJson.admintype || []).map((type, i) => (
                            <option value={type} key={i}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col px-1 form_group mt-4 text-right">
                      <CustomButton
                        className="font-size-3 rounded-3 btn btn-primary border-0"
                        onClick={() => editAdmin("0")}
                        title="Add Admin"
                      >
                        Add Admin
                      </CustomButton>
                    </div>
                  </div>
                  <small className="text-danger">{searcherror}</small>
                </div>
                {
                  <AdminTable
                  data={adminData}
                  isLoading={isLoading}
                  handleSort={handleSort}
                  editAdmin={editAdmin}
                  ShowDeleteAlert={ShowDeleteAlert}
                  nPages={nPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalData={totalData}
                  page={"admin page"}/>
                }
              </div>
              <div className="card p-3 mt-2 col-6 mb-18 text-capitalize">
                <div className="mb-4 align-items-center">
                  <div className="page___heading">
                    <h3 className="font-size-6 mb-0">Admin</h3>
                  </div>
                  <div className="row m-0 align-items-center">
                    <div className="col p-1 form_group mb-3 ">
                      <div className="d-flex executive_box gx-2">
                        <div className="media  align-items-center">
                          <div className="circle-40 mx-auto overflow-hidden">
                            {/* {empdata.profile_photo === null ? ( */}
                            <img
                              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                              alt=""
                              className="w-100"
                            />
                            {/* ) : (
                                  <img
                                    src={empdata.profile_photo}
                                    alt=""
                                    className="w-100"
                                  />
                                )} */}
                          </div>
                        </div>

                        <div className=" mb-0">
                          {/* {empdata.name === null ||
                              empdata.name === undefined ||
                              empdata.name === "undefined" ||
                              empdata.name === "" ? (
                                <p className="font-size-3  mb-0">Unavailable</p>
                              ) : ( */}
                          <h5 className="m-0 text-black-3 font-weight-bold text-capitalize">
                            ram <small className="text-gray font-size-3 m-0 text-capitalize">(manager)</small>
                          </h5>
                          {/* )} */}
                          {/* {empdata.email || empdata.contact_no ? ( */}
                          <p className="text-gray font-size-3 m-0 text-capitalize">
                            ram@gmail.com
                          </p>
                          <p className="text-gray font-size-3 m-0 text-capitalize">
                            987456321
                          </p>
                          {/* ) : null} */}
                        </div>
                      </div>
                    </div>
                    <div className="col px-1 form_group mt-4 text-right">
                      <CustomButton
                        className="font-size-3 rounded-3 btn btn-primary border-0"
                        onClick={
                          addTeamListShow === true
                            ? () => AddTask()
                            : () => addTeam()
                        }
                        title={
                          addTeamListShow === true ? "Add Task" : "Add Team"
                        }
                      >
                        {addTeamListShow === true ? "Add Task" : "Add Team"}
                      </CustomButton>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-9 px-5">
                  <div className="">
                    {isLoading ? (
                      <Loader />
                    ) : addTeamListShow === true ? (
                      <div
                        className="accordion accordion-flush"
                        id="accordionFlushExample"
                      >
                        {(executiveData || []).map((item, index) => (
                          <ExecutiveBox data={item} index={index} key={index} />
                        ))}
                      </div>
                    ) : (
                      <div className="card-text">
                        <h5>Executive's List</h5>
                        <div className="card-text row">
                          {(executiveData || []).map((item, index) => {
                            return (
                              <div
                                className={`sub-stage text-capitalize col-md-6`}
                                // onClick={() => handleSubStageSelection(expandedStatus, subStage)}
                                key={index}
                              >
                                <input
                                  type="checkbox"
                                  className="mx-2"
                                  // checked={(selectedStatus || []).some(
                                  //   (item) => item.substage === subStage
                                  // )}
                                  // readOnly
                                />
                                {item.name}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-2">
                    <Pagination
                      nPages={nPages}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      total={totalData}
                      count={adminData.length}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SAlert
          show={deleteAlert}
          title={deleteName}
          text="Are you Sure you want to delete !"
          onConfirm={() => deleteAdmin(deleteId)}
          showCancelButton={true}
          onCancel={CancelDelete}
        />
      </div>
    </>
  );
}

export default ManageAdmin;
