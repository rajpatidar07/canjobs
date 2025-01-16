import React, { useState, useEffect } from "react";
import useValidation from "../../common/useValidation";
import { Modal } from "react-bootstrap";
import {
  /* getSingleFollowup*/ getAllUsersFollowUpData,
  AddAllUserFollowup, /*AddFollowup*/
  getallAdminData,
} from "../../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import TextEditor from "../../common/TextEditor";
import ConvertTime from "../../common/Common function/ConvertTime";
import { FaEdit } from "react-icons/fa";
import AdminTaskTable from "../../common/AdminTaskTable";
import Pagination from "../../common/pagination";

function Addfollowup(props) {
  let [response, setResponseData] = useState([]);
  let [loading, setLoading] = useState(false);
  let [updateNote, setUpdateNote] = useState(false);
  let [apiCall, setApiCall] = useState(false);

  /* Pagination states */
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState("");
  const [recordsPerPage] = useState(10);
  /* Shorting states */
  const [columnName, setcolumnName] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("DESC");
  // let employId = props.employee_id;
  let user_type = localStorage.getItem("userType");
  let adminType = localStorage.getItem("admin_type");
  const [taskPage, setTaskPage] = useState(1)
  const [AdminList, setAdminList] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState([]);
  // const [taskPage, setTaskPage] = useState(1)
  let adminId =
    adminType === "agent"
      ? localStorage.getItem("agent_id")
      : localStorage.getItem("admin_id");
  // USER FOLLOW UP PROFILE UPDATE VALIDATION
  let assigned_id = user_type === "user"
    ? localStorage.getItem("employee_id")
    : user_type === "company"
      ? localStorage.getItem("company_id")
      : adminId
  let assigned_by_type = user_type === "user"
    ? "employee"
    : user_type === "company"
      ? "employer"
      : adminType

  /* Function to get the Response data*/
  const ResponseData = async () => {
    try {
      /*only for employee*/
      // const userData = await getSingleFollowup(
      //   props.employee_id !== "" ? props.employee_id : null,
      //   columnName,
      //   sortOrder
      //   // props.job_id
      // );
      /*For All user*/
      const userData = await getAllUsersFollowUpData(
        props.userId,
        props.userType,
        columnName,
        sortOrder,
        "",
        currentPage,
        recordsPerPage,
        props.page === "dashboard" ? 1 : ""
      );
      let adminRes = await getallAdminData()
      // console.log(userData.data.data)
      if (adminRes.data.length > 0) {
        setAdminList(adminRes.data)
      } else {
        setAdminList([])
      }
      if (
        userData.data === null ||
        userData.data === undefined ||
        userData.data === "undefined" ||
        userData.data === "" ||
        userData.data.length === 0
        // ||
        // props.employee_id === "" ||
        // props.employee_id === undefined
      ) {
        console.log("pppp")
        setResponseData([]);
      } else {
        setResponseData(userData.data.data);
        setTotalData(userData.data.total_rows)
      }
    } catch (err) {
      console.log(err);
      setResponseData([]);
    }
  };

  /*Render function to get the Response*/
  useEffect(() => {
    // if (props.userId === undefined || !props.userId/*|| props.job_id === undefined*/) {
    // } else {
    ResponseData();
    // }
    if (props.noteNotification) {
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
      localStorage.setItem("navigation_url", "")
    }
    if (apiCall) {
      setApiCall(false)
    }
    // eslint-disable-next-line
  }, [props.noteNotification, props.userId,
  props.userType, apiCall,
    sortOrder]);
  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    /*only for employee*/
    // remark: "",
    next_followup_date: "",
    // subject: "",
    // employee_id: employId,
    // status: "",
    // For all user
    admin_id: adminId,
    user_id: props.userId,
    user_type: props.userType,
    remark: "",
    next_date: "",
    subject: "",
    status: "",
    assigned_by_id: assigned_id,
    assigned_by_type: assigned_by_type,
    assigned_to_email: [],
    assigned_to_name: [],
    assigned_user_type: [],
    assined_to_user_id: [],
  };
  // VALIDATION CONDITIONS
  const validators = {
    subject: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "subject required"
          : value.length < 2
            ? "subjectz should have 2 or more letters."
            : "",
    ],
    remark: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Discription required"
          : value.length < 2
            ? "Discription should have 2 or more letters."
            : "",
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const {
    state = {},
    setState,
    onInputChange,
    errors,
    setErrors,
    validate,
  } = useValidation(initialFormState, validators);

  /* Functionality to close the modal */
  const close = () => {
    setState(initialFormState);
    setUpdateNote(false)
    setErrors("");
    setLoading(false);
    setSelectedAdmin([])
    props.close();
    if (props.page === "yes") {
      props.skip();
    }
  };
  useEffect(() => {
    if (typeof state.assigned_to_name === "string") {
      setState({ ...state, assigned_to_name: state.assigned_to_name.split(","), assigned_to_email: state.assigned_to_email.split(","), assigned_user_type: state.assigned_user_type.split(","), assined_to_user_id: state.assined_to_user_id.split(",") });
      setUpdateNote(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateNote])

  // USER FOLLOW UP PROFILE UPDATE SUBMIT BUTTON
  const onAminFollowClick = async (event) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      // if (!props.assigned_by_id) {
      //   toast.error("Please assign the admin first!", {
      //     position: toast.POSITION.TOP_RIGHT,
      //     autoClose: 2000,
      //   });
      //   setLoading(false);
      //   setState(initialFormState);
      // } else {
      try {
        /*only for employee*/
        // let responseData = await AddFollowup(state);
        /*For all user*/
        let responseData = await AddAllUserFollowup(state);
        if (responseData.message === "follow up updated successfully") {
          toast.success("Followup Updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          setApiCall(true)
          return close();
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
      // }
    } else {
      setLoading(false);
    }
  };
  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);
  // END USER FOLLOW UP PROFILE UPDATE VALIDATION
  const moment = require("moment");
  /*Sorting Function */
  const handleSort = (columnName) => {
    setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
    setcolumnName(columnName);
    // setCurrentPage(1);
  };
  const handleAdminSelect = (e) => {
    const selectedAdminId = e.target.value;

    const selectedAdminObj = AdminList.find(user => user.admin_id === selectedAdminId);

    if (selectedAdminObj && !selectedAdmin.some(admin => admin.admin_id === selectedAdminObj.admin_id)) {
      setSelectedAdmin([...selectedAdmin, selectedAdminObj]);

      setState((prevState) => ({
        ...prevState,
        assigned_to_email: [...(Array.isArray(prevState.assigned_to_email) ? prevState.assigned_to_email : prevState.assigned_to_email.split(",")) || [], selectedAdminObj.email],
        assigned_to_name: [...(Array.isArray(prevState.assigned_to_name) ? prevState.assigned_to_name : prevState.assigned_to_name.split(",")) || [], selectedAdminObj.name],
        assigned_user_type: [...(Array.isArray(prevState.assigned_user_type) ? prevState.assigned_user_type : prevState.assigned_user_type.split(",")) || [], selectedAdminObj.admin_type],
        assined_to_user_id: [...(Array.isArray(prevState.assined_to_user_id) ? prevState.assined_to_user_id : prevState.assined_to_user_id.split(",")) || [], selectedAdminObj.admin_id],
      }));
    }
  };

  /*Delete function for group by field */
  const removeAdmin = (adminId) => {
    const updatedSelectedAdmin = selectedAdmin.filter((admin) => admin.admin_id !== adminId);

    // Update selectedAdmin state
    setSelectedAdmin(updatedSelectedAdmin);

    // Remove corresponding admin details from the state
    setState({
      ...state,
      assigned_to_email: state?.assigned_to_email.filter((email, index) =>
        selectedAdmin[index].admin_id !== adminId
      ),
      assigned_to_name: state?.assigned_to_name.filter((name, index) =>
        selectedAdmin[index].admin_id !== adminId
      ),
      assigned_user_type: state?.assigned_user_type.filter((type, index) =>
        selectedAdmin[index].admin_id !== adminId
      ),
      assined_to_user_id: state?.assined_to_user_id.filter((id, index) =>
        selectedAdmin[index].admin_id !== adminId
      ),
    });
  };

  let content = (
    <>

      {props.userId !== "" ? (
        <div
          className={`bg-white rounded ${props.page === "yes" ? "" : "h-100vh"
            } overflow-y-auto`}
        >
          {props.page === "yes" ? (
            <h5 className="text-center pt-2 mb-7">Add Notes</h5>
          ) : null}
          <div className="row pb-5 m-0">
            <div
              className={`activity_container px-8 py-6 col-md-8 border-right ${props.page === "yes" ? "d-none" : ""}`}
            >
              <div>
                <h5>Tasks</h5>
                <AdminTaskTable
                  heading={""}
                  filter_by_time={""}
                  // apiCall={apiCall}
                  // setApiCall={setApiCall}
                  employeeId={props.userId}
                  TaskUserType={props.userType}
                  // setCount={setCount}
                  status={""}
                  adminId={""}
                  pageNo={taskPage}
                  setpageNo={setTaskPage}
                  adminType={""}
                />
              </div>
              <div className="single_note  p-5 rounded">
                <h5>Notes</h5>
                {response.length === 0 || !response ? (
                  <div className="d-flex justify-content-center">
                    <p className="text-italic font-size-3 m-0">No Data Found</p>
                  </div>
                ) : (
                  (response || []).map((res) => (
                    <div className={`rounded p-5 mb-2 ${props?.note_id === res.id ? "bg-light" : "bg-white"}`} key={res.id}>
                      <div className="m-0 d-flex justify-content-between align-items-center">
                        <b className="font-size-4 font-weight-bold text-dark text-break">
                          {res.subject}
                        </b>
                        <div className="d-flex flex-column align-items-end">
                          <p className="m-0 text-capitalize font-size-3 mb-1 d-flex justify-content-between align-items-center w-100">
                            <b>Created by: {res.created_by_name}</b>
                            <Link className={res.created_by === assigned_id && res.type === assigned_by_type ? "text-gray mb-1 pl-8" : "d-none"} title="Update notes" onClick={() => {
                              // Merge current state with res and admin_id
                              setState(prevState => ({
                                ...prevState,        // Spread the existing state
                                admin_id: adminId,   // Add or update admin_id
                                ...res
                              }));
                              setUpdateNote(true)
                              setSelectedAdmin(res?.assined_to_user_id ? AdminList.filter((item) => res?.assined_to_user_id.split(",").includes(item.admin_id.toString())) : [])
                            }}>  <FaEdit />
                            </Link>
                          </p>
                          {res?.assigned_to_name && <span className="font-size-3">
                            Assigned admin:
                            {res?.assigned_to_name?.split(",").map((item, index) => <span className="badge-light rounded-pill p-1 m-1">{item}</span>)}
                          </span>}
                          <i className="font-size-2">
                            Created on:
                            <ConvertTime
                              _date={res.created_at}
                              format={"Do MM YYYY, h:mm:ss a"}
                            />
                            {/* {moment(res.created_at).format(
                            "Do MMM YYYY, h:mm:ss a"
                          )} */}
                          </i>
                        </div>
                      </div>
                      <div className="font-size-4 m-0">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: res.remark,
                          }}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div
              className={
                props.page === "yes"
                  ? "px-6 py-7 col-md-12 "
                  : "px-6 py-7 col-md-4"
              }
              style={{ right: 0 }}
            >
              <form className="">
                <div className="form-group col px-0 pr-3">
                  <label
                    htmlFor="subject"
                    className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
                  >
                    Subject: <span className="text-danger">*</span>
                  </label>
                  <div className="position-relative">
                    <input
                      // maxLength={60}
                      name="subject"
                      value={state.subject || ""}
                      onChange={onInputChange}
                      type="text"
                      className={
                        errors.subject
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                      placeholder="subject"
                      id="subject"
                    />
                  </div>
                  {/*----ERROR MESSAGE FOR name----*/}
                  {errors.subject && (
                    <span
                      key={errors.subject}
                      className="text-danger font-size-3"
                    >
                      {errors.subject}
                    </span>
                  )}
                </div>
                <div className="form-group col px-0 pr-3">
                  <label
                    htmlFor="subject"
                    className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
                  >
                    Status:
                  </label>
                  <div className="position-relative">
                    <select
                      name="status"
                      value={state.status || ""}
                      onChange={onInputChange}
                      type="text"
                      className={
                        errors.status
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                      placeholder="status"
                      id="status"
                    >
                      <option value={""}>Select Status</option>
                      <option value={0}>Normal</option>
                      <option value={1}>Private</option>
                    </select>
                  </div>
                  {/*----ERROR MESSAGE FOR name----*/}
                  {errors.status && (
                    <span
                      key={errors.status}
                      className="text-danger font-size-3"
                    >
                      {errors.status}
                    </span>
                  )}
                </div>
                <div className="form-group col px-0 pr-3">
                  <label
                    htmlFor="admin"
                    className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
                  >
                    Select admin:
                  </label>
                  <div className="position-relative">
                    <select
                      className="form-control mb-2 text-capitalize"
                      onChange={handleAdminSelect}
                      value=""
                    >
                      <option value="">Select Admin</option>
                      {(AdminList || []).map((user) => (
                        <option key={user.admin_id} value={user.admin_id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="row m-0 p-0">
                    {selectedAdmin.length === 0 ? (
                      null
                    ) : (
                      (selectedAdmin || []).map((item) => (
                        <div
                          key={item.admin_id}
                          className="position-relative d-inline-block mr-3 mb-2"
                          style={{ width: '25px', height: '25px' }}
                        >
                          <img
                            className="rounded-circle"
                            src={item.profile_image || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'}
                            alt={`Profile of ${item.name}`}
                            title={`Profile image of ${item.name}`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              border: '2px solid #dee2e6',
                            }}
                          />
                          <button
                            onClick={() => removeAdmin(item.admin_id)}
                            aria-label={`Remove ${item.name}`}
                            className="position-absolute text-danger bg-transparent border-0 p-0"
                            style={{
                              top: '-5px',
                              right: '-5px',
                              cursor: 'pointer',
                            }}
                          >
                            <i
                              className="fa fa-times-circle"
                              aria-hidden="true"
                              style={{
                                fontSize: '10px',
                                backgroundColor: 'white',
                                borderRadius: '50%',
                                boxShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
                              }}
                            ></i>
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <div className="form-group col px-0 pr-3">
                  <label
                    htmlFor="remark"
                    className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
                  >
                    Add New Note: <span className="text-danger">*</span>
                  </label>
                  <div className="position-relative">
                    <div
                      className={
                        errors.remark
                          ? "border border-danger rounded overflow-hidden"
                          : "border rounded overflow-hidden"
                      }
                    >
                      <TextEditor
                        setState={setState}
                        state={state}
                        page={"FollowUp"}
                      />
                    </div>
                    {/*----ERROR MESSAGE FOR DESRIPTION----*/}
                    {errors.remark && (
                      <span
                        key={errors.remark}
                        className="text-danger font-size-3"
                      >
                        {errors.remark}
                      </span>
                    )}
                  </div>
                </div>
                <div className="form-group col px-0 pr-3">
                  <label
                    htmlFor="next_followup_date"
                    className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                  >
                    Next Date :
                  </label>
                  <div className="position-relative">
                    <input
                      type="date"
                      placeholder="Next followup date"
                      id="next_followup_date"
                      name="next_followup_date"
                      min={moment().format("DD-MM-YYYY")}
                      value={state.next_followup_date}
                      onChange={onInputChange}
                      onKeyDownCapture={(e) => e.preventDefault()}
                      className={
                        errors.next_followup_date
                          ? "form-control coustam_datepicker border border-danger"
                          : "form-control coustam_datepicker"
                      }
                    />
                    {/*----ERROR MESSAGE FOR next_followup_date----*/}
                    {errors.next_followup_date && (
                      <span
                        key={errors.next_followup_date}
                        className="text-danger font-size-3"
                      >
                        {errors.next_followup_date}
                      </span>
                    )}
                  </div>
                </div>
                <div className="form-group text-center">

                  {loading === true ? (
                    <button
                      className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                      type="button"
                      disabled
                    >
                      <span
                        className="spinner-border spinner-border-sm "
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Loading...</span>
                    </button>
                  ) : (
                    <button
                      onClick={(e) => onAminFollowClick(e)}
                      className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                      type="button"
                    >
                      Submit
                    </button>
                  )}
                  {(state.subject || props.page === "yes") && <button
                    onClick={() => {
                      if (props.page === "yes") {
                        props.skip();
                      } else {
                        setState(initialFormState);
                        setSelectedAdmin([]);
                        setLoading(false)
                        setUpdateNote(false)
                      }
                    }}

                    className={`btn btn-small w-25 rounded-5 ${props.page === "yes" ? " mx-2 " : " mt-2 "}text-uppercase`}
                    type="button"
                  >
                    {props.page === "yes" ? "Skip" : "Cancel"}
                  </button>}
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="table-responsive main_table_div">
          <table className="table table-striped main_data_table">
            <thead>
              <tr>
                <th
                  scope="col"
                  className=" border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    to={""}
                    onClick={() => {
                      handleSort("name");
                    }}
                    className="text-gray"
                    title="Sort by Description"
                  >
                    Name
                  </Link>
                </th>
                <th
                  scope="col"
                  className=" border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    to={""}
                    onClick={() => {
                      handleSort("subject");
                    }}
                    className="text-gray"
                    title="Sort by Description"
                  >
                    Subject
                  </Link>
                </th>
                <th
                  scope="col"
                  className=" border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    to={""}
                    onClick={() => {
                      handleSort("remark");
                    }}
                    className="text-gray"
                    title="Sort by Description"
                  >
                    Note
                  </Link>
                </th>
                <th
                  scope="col"
                  className=" border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    to={""}
                    onClick={() => {
                      handleSort("created_at");
                    }}
                    className="text-gray"
                    title="Sort by Description"
                  >
                    Added date
                  </Link>
                </th>
                <th
                  scope="col"
                  className=" border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    to={""}
                    onClick={() => {
                      handleSort("next_followup_date");
                    }}
                    className="text-gray"
                    title="Sort by Description"
                  >
                    Next Date
                  </Link>
                </th>
                <th
                  scope="col"
                  className=" border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    to={""}
                    onClick={() => {
                      handleSort("status");
                    }}
                    className="text-gray"
                    title="Sort by Description"
                  >
                    Status
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {response.length !== 0 && response.map((item) => item.status === "1") ? (
                (response || []).map(
                  (res) =>
                    res.status === "1" && (
                      <tr key={res.id}>
                        <td>
                          <Link
                            className="d-flex align-items-center"
                            to={`/${res.user_id}`}
                          >
                            <div className="d-flex profile_box gx-2">
                              <div className="media  align-items-center">
                                <div className="circle-30 mx-auto overflow-hidden">
                                  <img
                                    src={
                                      res.profile_photo === "" ||
                                        res.profile_photo === null ||
                                        res.profile_photo === undefined
                                        ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                                        : res.profile_photo
                                    }
                                    alt=""
                                    className="w-100"
                                  />
                                </div>
                              </div>
                              <div className=" mb-0">
                                {res.name === "" ||
                                  res.name === "null" ||
                                  res.name === null ||
                                  res.name === undefined ? (
                                  <p className="font-size-3 mb-0">N/A</p>
                                ) : (
                                  <p
                                    className="m-0 text-black-2 font-weight-bold text-capitalize text-truncate"
                                    title={res.name}
                                  >
                                    {res.name}
                                  </p>
                                )}
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td>
                          {res.subject === "" ||
                            res.subject === "null" ||
                            res.subject === null ||
                            res.subject === undefined ? (
                            <p className="font-size-3 mb-0">N/A</p>
                          ) : (
                            <p
                              className="m-0 text-black-2 font-weight-bold text-capitalize text-truncate"
                              title={res.subject}
                            >
                              {res.subject}
                            </p>
                          )}
                        </td>
                        <td>
                          {res.remark === "" ||
                            res.remark === "null" ||
                            res.remark === null ||
                            res.remark === undefined ? (
                            <p className="font-size-3 mb-0">N/A</p>
                          ) : (
                            <p
                              className="m-0 text-black-2 font-weight-bold text-capitalize  text-truncate"
                              dangerouslySetInnerHTML={{
                                __html: res.remark,
                              }}
                            />
                          )}
                        </td>
                        <td>
                          {res.created_at === "" ||
                            res.created_at === "null" ||
                            res.created_at === null ||
                            res.created_at === undefined ? (
                            <p className="font-size-3 mb-0">N/A</p>
                          ) : (
                            <small>
                              <ConvertTime
                                _date={res.created_at}
                                format={".calendar()"}
                              />
                              {/* {moment(res.created_at).calendar()} */}
                            </small>
                          )}
                        </td>
                        <td>
                          {res.next_followup_date === "" ||
                            res.next_followup_date === "null" ||
                            res.next_followup_date === null ||
                            res.next_followup_date === undefined ? (
                            <p className="font-size-3 mb-0">N/A</p>
                          ) : (
                            <small>
                              {moment(res.next_followup_date).format(
                                "MMM Do YY"
                              )}
                            </small>
                          )}
                        </td>
                        <td>
                          {res.status === "" ||
                            res.status === "null" ||
                            res.status === null ||
                            res.status === undefined ? (
                            <p className="font-size-3 mb-0"></p>
                          ) : (
                            <small>{res.status === "1" ? "Private" : ""}</small>
                          )}
                        </td>
                      </tr>
                    )
                )
              ) : (
                <tr className="text-center">
                  <th colSpan={6}>No data found</th>
                </tr>
              )}
            </tbody>
          </table>
          <div className="pt-2">
            <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              total={totalData}
              count={response.length}
            />
          </div>
        </div>
      )}

    </>
  );
  return props.page === "yes" ? (
    <Modal show={props.show} onHide={close}>
      <button
        type="button"
        className="circle-32 btn-reset bg-white pos-abs-tr focus-reset z-index-supper "
        data-dismiss="modal"
        onClick={close}
      >
        <i className="fas fa-times"></i>
      </button>
      <Modal.Body>{content}</Modal.Body>
    </Modal>
  ) : (
    content
  );
}

export default Addfollowup;
