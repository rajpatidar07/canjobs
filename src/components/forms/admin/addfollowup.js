import React, { useState, useEffect } from "react";
import useValidation from "../../common/useValidation";
import { Modal } from "react-bootstrap";
import {
  getallAdminData,
  GetCommentsAndAssign,
  UpdateDocuentcommentAssign,
  ADocAnnotation,
  DeleteCommentsAndAssign,
} from "../../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import ConvertTime from "../../common/Common function/ConvertTime";
import AdminTaskTable from "../../common/AdminTaskTable";
import Pagination from "../../common/pagination";
import { FaEdit, FaTrash } from "react-icons/fa";
import SAlert from "../../common/sweetAlert";

function Addfollowup(props) {
  let [response, setResponseData] = useState([]);
  let [loading, setLoading] = useState(false);
  let [deleteAlert, setDeleteAlert] = useState(false);
  let [deleteData, setDeleteData] = useState("");
  let [apiCall, setApiCall] = useState(false);

  /* Pagination states */
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState("");
  const [recordsPerPage] = useState(10);
  /* Shorting states */
  const [columnName, setcolumnName] = useState("created_on");
  const [sortOrder, setSortOrder] = useState("DESC");
  // let employId = props.employee_id;
  let user_type = localStorage.getItem("userType");
  let adminType = localStorage.getItem("admin_type");
  const [taskPage, setTaskPage] = useState(1)
  const [AdminList, setAdminList] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [userErrorforadminAssign, setUserErrorforadminAssign] = useState(false)

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
  let assigned_by_name = user_type === "user" || user_type === "company"
    ? localStorage.getItem("name")
    : localStorage.getItem("admin")
  let assigned_by_email = localStorage.getItem("email");
  /* Function to get the Response data*/
  const ResponseData = async () => {
    try {
      /*For follow up data*/
      // const userData = await getAllUsersFollowUpData(
      //   props.userId,
      //   props.userType,
      //   columnName,
      //   sortOrder,
      //   "",
      //   currentPage,
      //   recordsPerPage,
      //   props.page === "dashboard" ? 1 : ""
      // );
      /**for task data */
      let userData = await GetCommentsAndAssign(
        "", //docId,
        "",//adminfilter, // adminid,
        "",//annotStatus, // annotationStatus,
        "note",
        currentPage, recordsPerPage, sortOrder, columnName, "", "", props.userId, props.userType
      );
      let adminRes = await getallAdminData()
      // console.log(userData.data.data)
      if (adminRes.data.length > 0) {
        setAdminList(adminRes.data)
      } else {
        setAdminList([])
      }
      if (
        userData.data.data.data === null ||
        userData.data.data.data === undefined ||
        userData.data.data.data === "undefined" ||
        userData.data.data.data === "" ||
        userData.data.data.data.length === 0
      ) {
        setResponseData([]);
      } else {
        setResponseData(userData.data.data.data);
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
  }, [props.noteNotification, props.userId, props.userType, apiCall, sortOrder]);
  // INITIAL STATE ASSIGNMENT
  // const initialFormState = {
  //   /*only for employee*/
  //   // remark: "",
  //   next_followup_date: "",
  //   // subject: "",
  //   // employee_id: employId,
  //   // status: "",
  //   // For all user
  //   admin_id: adminId,
  //   user_id: props.userId,
  //   user_type: props.userType,
  //   remark: "",
  //   next_date: "",
  //   subject: "",
  //   status: "",
  //   assigned_by_id: assigned_id,
  //   assigned_by_type: assigned_by_type,
  //   assigned_to_email: "",
  //   assigned_to_name: "",
  //   assigned_user_type: "",
  //   assined_to_user_id: "",
  // };
  const initialFormState = {
    "task_creator_user_id": assigned_id,
    "task_creator_user_type": assigned_by_type,
    "next_followup_date": "",
    "user_admin_assigned": "",
    // "followup_status": "",
    "assined_to_user_id": "",
    "assigned_user_type": "",
    "document_url": "",
    "subject_description": "",
    "employee_id": props.userId,
    "assigned_to": "",
    "assigned_to_name": "",
    "subject": ""
  }
  // VALIDATION CONDITIONS
  const validators = {
    subject: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "subject required"
          : value.length < 2
            ? "subject should have 2 or more letters."
            : "",
    ],
    subject_description: [
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
    setErrors("");
    setLoading(false);
    // setSelectedAdmin([])
    props.close();
    if (props.page === "yes") {
      props.skip();
    }
  };
  // useEffect(() => {
  //   if (typeof state.assigned_to_name === "string") {
  //     setState({ ...state, assigned_to_name: state.assigned_to_name.split(","), assigned_to_email: state.assigned_to_email.split(","), assigned_user_type: state.assigned_user_type.split(","), assined_to_user_id: state.assined_to_user_id.split(",") });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [updateNote])
  // Function to add annotation based on conditions for followup
  // const handleInputChange = (e, type) => {
  //   let value = e.target.value;
  //   setState({ ...state, subject_description: value });

  //   // Check if the last typed character is '@'
  //   value = value.trim();
  //   const lastChar = value.slice(-1);

  //   // If last character is '@', show the dropdown
  //   if (lastChar === "@") {
  //     setDropdownVisible(true);
  //     setFilteredEmails(AdminList);
  //   } else {
  //     // Match @username pattern
  //     const match = value.match(/@(\w*)$/);
  //     if (match) {
  //       const query = match[1].toLowerCase();
  //       const filtered = AdminList.filter((user) =>
  //         user.name.toLowerCase().includes(query)
  //       );
  //       setFilteredEmails(filtered);
  //     } else {
  //       setFilteredEmails([]);
  //       setDropdownVisible(false);
  //     }
  //   }

  //   // Update the state to remove users from arrays when their @username is removed from the subject_description
  //   const usersInRemark = value.match(/@(\w*)/g)?.map((mention) => mention.slice(1)); // Extract all mentioned usernames from subject_description

  //   setState((prevState) => {
  //     // Filter out users not mentioned in the updated subject_description
  //     const updatedAssignedEmails = prevState.assigned_to_email.filter((email, index) => {
  //       const userName = prevState.assigned_to_name[index];
  //       return usersInRemark?.includes(userName);
  //     });

  //     const updatedAssignedNames = prevState.assigned_to_name.filter((name) => usersInRemark?.includes(name));
  //     const updatedAssignedUserTypes = prevState.assigned_user_type.filter((_, index) => usersInRemark?.includes(prevState.assigned_to_name[index]));
  //     const updatedAssignedUserIds = prevState.assined_to_user_id.filter((_, index) => usersInRemark?.includes(prevState.assigned_to_name[index]));

  //     return {
  //       ...prevState,
  //       assigned_to_email: updatedAssignedEmails,
  //       assigned_to_name: updatedAssignedNames,
  //       assigned_user_type: updatedAssignedUserTypes,
  //       assined_to_user_id: updatedAssignedUserIds,
  //     };
  //   });
  // };

  // /* Function to handle email click (add user to the state)  for followup*/
  // const handleEmailClick = (user, type) => {
  //   // Check if the user is already in the assigned lists to prevent duplicates
  //   const isUserAlreadyAssigned = state.assigned_to_email.includes(user.email);

  //   if (isUserAlreadyAssigned) {
  //     // If the user is already assigned, do not add them again
  //     return;
  //   }

  //   // Add the selected user to the state
  //   setSelectedAdmin((prev) => [...prev, user]);

  //   // Replace @username in the comment
  //   const updatedComment = state.subject_description.replace(/@\w*$/, `@${user.name} `);

  //   // Update the state with the selected admin details
  //   setState((prevState) => ({
  //     ...prevState,
  //     subject_description: updatedComment,
  //     assigned_to_email: [
  //       ...(Array.isArray(prevState.assigned_to_email)
  //         ? prevState.assigned_to_email
  //         : prevState.assigned_to_email.split(",")) || [],
  //       user.email,
  //     ].join(","),
  //     assigned_to_name: [
  //       ...(Array.isArray(prevState.assigned_to_name)
  //         ? prevState.assigned_to_name
  //         : prevState.assigned_to_name.split(",")) || [],
  //       user.name,
  //     ].join(","),
  //     assigned_user_type: [
  //       ...(Array.isArray(prevState.assigned_user_type)
  //         ? prevState.assigned_user_type
  //         : prevState.assigned_user_type.split(",")) || [],
  //       user.admin_type,
  //     ].join(","),
  //     assined_to_user_id: [
  //       ...(Array.isArray(prevState.assined_to_user_id)
  //         ? prevState.assined_to_user_id
  //         : prevState.assined_to_user_id.split(",")) || [],
  //       user.admin_id,
  //     ].join(","),
  //   }));

  //   // Hide the dropdown
  //   setDropdownVisible(false);
  // };

  // Function to add annotation based on conditions
  const handleInputChange = (e, type) => {
    let value = e.target.value;
    const lastChar = value.slice(-1);
    // setType(type); // Set type once, as it is common in both cases
    // if (type === "reply") {
    //     setReplyComment(value);
    // } else {
    setState({ ...state, subject_description: value });
    // }

    setUserErrorforadminAssign("");

    if (assigned_by_type === "admin") {
      if (lastChar === "@") {
        setDropdownVisible(true);
        setFilteredEmails(AdminList);
      } else {
        const match = value.match(/@(\w*)$/);
        if (match) {
          const query = match[1].toLowerCase();
          const filtered = AdminList.filter((user) =>
            user.name?.toLowerCase().includes(query)
          );
          setFilteredEmails(filtered);
        } else {
          setFilteredEmails([]);
          setDropdownVisible(false);
        }
      }
    } else {
      if (lastChar === "@") {
        setUserErrorforadminAssign(`Sorry ! you can't assign admin`);
      } else {
        setUserErrorforadminAssign("");
      }
    }

  };
  const handleEmailClick = (user, type) => {
    // Add the selected user to the assigned list
    if (type === "reply") {
      // setSelectedAdminReplye((prev) => [...prev, user]);

      // Replace @username in the comment
      // const updatedComment = replyComment.replace(/@\w*$/, `@${user.name} `);
      // setReplyComment(updatedComment);

      // Hide the dropdown and update the filtered users list
      setDropdownVisible(false)
      setFilteredEmails((prev) =>
        prev.filter((u) => u.id !== user.id)
      );
    } else {
      setSelectedAdmin((prev) => [...prev, user]);

      // Replace @username in the comment
      const updatedComment = state.subject_description.replace(/@\w*$/, `@${user.name} `);
      setState({ ...state, subject_description: updatedComment });

      // Hide the dropdown and update the filtered users list
      setDropdownVisible(false)
      setFilteredEmails((prev) =>
        prev.filter((u) => u.id !== user.id)
      );
    }
  };
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
      const assignedAdminsemail = selectedAdmin ? selectedAdmin?.map((item) => item.email).toString() : "";
      const assignedAdmins = AdminList.filter((item) => assignedAdminsemail.includes(item.email));
      const assignedAdminName = assignedAdmins.map((admin) => admin.name).join(",") || "";
      const assignedUserId = assignedAdmins.map((admin) => admin.u_id || admin.admin_id).join(",") || "";
      const assignedUserType = assignedAdmins.map((admin) => admin.u_id ? "agent" : admin.admin_type).join(",") || "";
      try {
        /*only for employee*/
        // let responseData = await AddFollowup(state);
        /*For all foollow up api user*/
        // let responseData = await AddAllUserFollowup(state);
        const responseData = await ADocAnnotation(
          assigned_id,
          "",
          assignedUserId || "",
          assignedAdminsemail,
          state.subject,
          state.subject_description,//actual
          "", //annotation.x_axis,
          "", //annotation.y_axis,
          "note",
          assigned_by_type, //sender type
          assigned_by_name, //sender name,
          assignedAdminName || "", //assigned Admin or user Name,
          "",//state.status, //follow up status(for notes only)
          "",//state.next_followup_date, //Next follow up date(for notes only)
          assignedUserType || "", //Assign user type,
          "", //Document url(for notes only)
          assigned_by_email, //Sender email
          state.employee_id, //employee id,
          "", //assigned_by_id
          "",//docData.parentReference.id, // document parent code
          "",//annotationDrawBox, //Annotation data,
          "", //annotationId
          props.userType, //User type of document
          "",// docData.name,//document name
          "",//start date
          "",//end date
        );
        if (responseData.data.message === "task inserted successfully!") {
          toast.success("Followup Updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          setApiCall(true)
          setSelectedAdmin([])
          setState(initialFormState)
          return close();
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  };
  /*Function to update comment */
  const OnHandleUpdateCommentStatus = async (originalData, status) => {
    const {
      assigned_to,
      subject_description,
      assigned_to_name,
      assigned_user_type,
      assined_to_user_id,
    } = originalData;

    let updatedCommentToApi = state.subject_description || subject_description;

    // Parse the original admin details
    let emailsArray = assigned_to?.split(",") || [];
    let namesArray = assigned_to_name?.split(",") || [];
    let userIdArray = assined_to_user_id?.split(",") || [];
    let userTypeArray = assigned_user_type?.split(",") || [];

    // Create new arrays for users who should remain after removal
    const newEmailsArray = [];
    const newNamesArray = [];
    const newUserIdArray = [];
    const newUserTypeArray = [];

    // Ensure we check for @mentions dynamically
    namesArray.forEach((name, index) => {
      if (updatedCommentToApi.includes(`@${name}`)) {
        // Keep only users still mentioned
        newEmailsArray.push(emailsArray[index]);
        newNamesArray.push(namesArray[index]);
        newUserIdArray.push(userIdArray[index]);
        newUserTypeArray.push(userTypeArray[index]);
      }
    });

    // **Remove unmentioned admins from selectedAdmin**
    const filteredSelectedAdmins = selectedAdmin.filter(admin =>
      updatedCommentToApi.includes(`@${admin.name}`)
    );

    // Update selectedAdmin state
    setSelectedAdmin(filteredSelectedAdmins);

    // Add selected admins if they are not already present
    (filteredSelectedAdmins || []).forEach((admin) => {
      if (!newEmailsArray.includes(admin.email)) {
        newEmailsArray.push(admin.email);
        newNamesArray.push(admin.name);
        newUserIdArray.push(admin.admin_id);
        newUserTypeArray.push(admin.admin_type);
      }
    });

    // Prepare updated strings for each array
    const updatedEmails = newEmailsArray.join(",");
    const updatedNames = newNamesArray.join(",");
    const updatedUserIds = newUserIdArray.join(",");
    const updatedUserTypes = newUserTypeArray.join(",");

    // Construct the final data to send to the API
    const updatedData = {
      subject_description: updatedCommentToApi,
      task_creator_user_id: assigned_id,
      task_creator_user_type: assigned_by_type,
      assined_to_user_id: updatedUserIds,
      assigned_user_type: updatedUserTypes,
      assigned_to: updatedEmails,
      assigned_to_name: updatedNames,
      id: originalData.id,
      type: originalData.type,
      task_complete_date: state.next_followup_date,
      subject: state.subject
    };

    // console.log("Updated Selected Admins:", filteredSelectedAdmins);
    // console.log(updatedData);

    // Call API to update
    try {
      let res = await UpdateDocuentcommentAssign(updatedData, props.userType);
      if (res.message === "Task updated successfully!") {
        toast.success("Task completed Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setSelectedAdmin([]);
        setState(initialFormState);
        setApiCall(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /*To Show the delete alert box */
  const ShowDeleteAlert = (e) => {
    setDeleteData(e);
    setDeleteAlert(true);
  };
  /*Function to delete comment */
  const OnDeleteComment = async (id) => {
    try {
      let res = await DeleteCommentsAndAssign("", id, props.userId, props.userType, assigned_id, assigned_by_type);
      if (res.data.message === "Task deleted successfully!") {
        toast.success("Task Deleted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setState(initialFormState);
        setDeleteAlert(false)
        setApiCall(true);
      }
    } catch (err) {
      console.log(err);
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
  // const handleAdminSelect = (e) => {
  //   const selectedAdminId = e.target.value;

  //   const selectedAdminObj = AdminList.find(user => user.admin_id === selectedAdminId);

  //   if (selectedAdminObj && !selectedAdmin.some(admin => admin.admin_id === selectedAdminObj.admin_id)) {
  //     setSelectedAdmin([...selectedAdmin, selectedAdminObj]);

  //     setState((prevState) => ({
  //       ...prevState,
  //       assigned_to_email: [...(Array.isArray(prevState.assigned_to_email) ? prevState.assigned_to_email : prevState.assigned_to_email.split(",")) || [], selectedAdminObj.email],
  //       assigned_to_name: [...(Array.isArray(prevState.assigned_to_name) ? prevState.assigned_to_name : prevState.assigned_to_name.split(",")) || [], selectedAdminObj.name],
  //       assigned_user_type: [...(Array.isArray(prevState.assigned_user_type) ? prevState.assigned_user_type : prevState.assigned_user_type.split(",")) || [], selectedAdminObj.admin_type],
  //       assined_to_user_id: [...(Array.isArray(prevState.assined_to_user_id) ? prevState.assined_to_user_id : prevState.assined_to_user_id.split(",")) || [], selectedAdminObj.admin_id],
  //     }));
  //   }
  // };

  /*Delete function for group by field */
  // const removeAdmin = (adminId) => {
  //   const updatedSelectedAdmin = selectedAdmin.filter((admin) => admin.admin_id !== adminId);

  //   // Update selectedAdmin state
  //   setSelectedAdmin(updatedSelectedAdmin);

  //   // Remove corresponding admin details from the state
  //   setState({
  //     ...state,
  //     assigned_to_email: state?.assigned_to_email.filter((email, index) =>
  //       selectedAdmin[index].admin_id !== adminId
  //     ),
  //     assigned_to_name: state?.assigned_to_name.filter((name, index) =>
  //       selectedAdmin[index].admin_id !== adminId
  //     ),
  //     assigned_user_type: state?.assigned_user_type.filter((type, index) =>
  //       selectedAdmin[index].admin_id !== adminId
  //     ),
  //     assined_to_user_id: state?.assined_to_user_id.filter((id, index) =>
  //       selectedAdmin[index].admin_id !== adminId
  //     ),
  //   });
  // };

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
                  status={"-1"}
                  adminId={""}
                  pageNo={taskPage}
                  setpageNo={setTaskPage}
                  adminType={""}
                />
              </div>
              <div className={response.length === 0 || !response ? "d-none" : "p-5 rounded "}
                style={{
                  height: "50vh",
                  overflowY: "scroll"
                }}>

                <h5>Notes</h5>
                {response.length === 0 || !response ? (
                  <div className="d-flex justify-content-center">
                    <p className="text-italic font-size-3 m-0">No Data Found</p>
                  </div>
                ) : (
                  (response || []).map((res, index) => (
                    <div className={`rounded p-5 mb-2 ${props?.note_id === res.id ? "bg-light" : "bg-white"}`} key={index}>
                      <div className="m-0 d-flex justify-content-between align-items-center">
                        <b className="font-size-4 font-weight-bold text-dark text-break">
                          {res.subject}
                        </b>
                        <div className="d-flex flex-column align-items-end">
                          <p className="m-0 text-capitalize font-size-3 mb-1 d-flex justify-content-between align-items-center w-100">
                            <b>Created by: {res.task_creator_user_name}</b>
                            <Link className={res.task_creator_user_id === assigned_id && res.task_creator_user_type === assigned_by_type ? "text-gray mb-1 pl-8" : "d-none"} title="Update notes" onClick={() => {
                              // Merge current state with res and admin_id
                              setState(res)
                              setFilteredEmails([]);
                              setSelectedAdmin(res?.assined_to_user_id ? AdminList.filter((item) => res?.assined_to_user_id.split(",").includes(item.admin_id.toString())) : [])
                            }}>  <FaEdit />
                            </Link>
                            <Link className={res.task_creator_user_id === assigned_id && res.task_creator_user_type === assigned_by_type ? "text-gray mb-1 pl-8" : "d-none"} title="Delete notes" onClick={() => {
                              ShowDeleteAlert(res)
                            }}>  <FaTrash color={"red"} />
                            </Link>

                          </p>
                          {res?.assigned_to_name && <span className="font-size-3">
                            Assigned admin:
                            {res?.assigned_to_name?.split(",").map((item, index) => <span key={index} className="badge-light rounded-pill p-1 m-1">{item}</span>)}
                          </span>}
                          <i className="font-size-2">
                            Created on: {"  "}
                            <ConvertTime
                              _date={res.created_at}
                              format={'LL'}
                            />
                          </i>
                        </div>
                      </div>
                      <div className="font-size-4 m-0">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: res.subject_description,
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
                {/* <div className="form-group col px-0 pr-3 d-none">
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
                  /*----ERROR MESSAGE FOR name----*
                  {errors.status && (
                    <span
                      key={errors.status}
                      className="text-danger font-size-3"
                    >
                      {errors.status}
                    </span>
                  )}
                </div> */}
                {/* <div className="form-group col px-0 pr-3">
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
                </div> */}
                <div className="form-group col px-0 pr-3">
                  <label
                    htmlFor="subject_description"
                    className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
                  >
                    Description: <span className="text-danger">*</span>
                  </label>
                  <div className="position-relative">
                    <div

                    >
                      {/* <TextEditor
                        setState={setState}
                        state={state}
                        page={"FollowUp"}
                      /> */}
                      <textarea
                        type="text"
                        value={state.subject_description || ""}
                        onChange={handleInputChange}
                        placeholder="Comments or add others with @"
                        className={
                          `comment-input rounded overflow-hidden  ${errors.subject_description
                            ? "border border-danger"
                            : ""}`
                        }
                        rows={4}
                        style={{ outline: 0, }}
                      ></textarea>
                      {dropdownVisible && filteredEmails.length > 0 ? (
                        <ul
                          className="email-suggestions"
                          style={{
                            maxHeight: 400,
                            overflowY: "auto",
                            zIndex: "999 !important",
                          }}
                        >
                          {filteredEmails.map((email, index) => (
                            <li
                              key={index}
                              onClick={() => handleEmailClick(email)}
                              // onMouseOver={() => handleEmailMouseOver(email.email)}
                              className="email-suggestion-item"
                            >
                              <strong>
                                {email.name +
                                  (email.u_id ? " (Partner)" : "") +
                                  "(" +
                                  email.email +
                                  ")"}
                              </strong>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                    {userErrorforadminAssign ?
                      <span className="text-danger font-size-3">{userErrorforadminAssign}</span> : null}
                    {/*----ERROR MESSAGE FOR DESRIPTION----*/}
                    {errors.subject_description && (
                      <span
                        key={errors.subject_description}
                        className="text-danger font-size-3"
                      >
                        {errors.subject_description}
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
                      onClick={(e) => { state.id ? OnHandleUpdateCommentStatus(state) : onAminFollowClick(e) }}
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
                      }
                    }}

                    className={`btn btn-small w-25 rounded-5 ${props.page === "yes" ? " mx-2 " : " mt-2 "}text-uppercase`}
                    type="button"
                  >
                    {props.page === "yes" ? "Skip" : "Cancel"}
                  </button>}
                </div>
              </form>
              {/* <CommentTaskBox
                userId={props.userId}
                taskType={"note"}
                taskUserType={props.userType}
                // taskId={taskId}
                noteId={props.note_id}
                page={props.page}
                skip={props.skip}
                userType={user_type}
                assigned_id={assigned_id}
                assigned_by_name={assigned_by_name}
                assigned_by_email={assigned_by_email}
              /> */}
              <SAlert
                show={deleteAlert}
                title={deleteData.subject}
                text="Are you Sure you want to delete !"
                onConfirm={() => OnDeleteComment(deleteData.id)}
                showCancelButton={true}
                onCancel={() => setDeleteAlert(false)}
              />
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
                      handleSort("subject_description");
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
                          {res.subject_description === "" ||
                            res.subject_description === "null" ||
                            res.subject_description === null ||
                            res.subject_description === undefined ? (
                            <p className="font-size-3 mb-0">N/A</p>
                          ) : (
                            <p
                              className="m-0 text-black-2 font-weight-bold text-capitalize  text-truncate"
                              dangerouslySetInnerHTML={{
                                __html: res.subject_description,
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
