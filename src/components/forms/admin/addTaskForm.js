import React, { useEffect, useState } from "react";
import { AddFIlter, ADocAnnotation, getallAdminData, GetFilter, UpdateDocuentcommentAssign } from "../../../api/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
export default function AddTaskForm(props) {
  const [taskTitle, setTaskTitle] = useState("");
  const [stardivate, setStardivate] = useState(new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState("");
  const [AdminList, setAdminList] = useState([]);
  const [selectedGroupBy, setSelectedGroupBy] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState([]);
  const [groupBy, setGroupBy] = useState([]);
  const [status, setStatus] = useState([]);
  const [priority, setPriority] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [loading, setLoading] = useState(false);
  const [addStatusloading, setAddStatusLoading] = useState(false);
  const [showStatusInput, setShowStatusInput] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [statusErrors, setStatusErrors] = useState("");
  let admin_id = localStorage.getItem("admin_id");
  let admin_type = localStorage.getItem("admin_type"); //sender type
  let admin_name = localStorage.getItem("admin");
  let admin_email = localStorage.getItem("admin_email");
  /*FunctioN to get the json of group by */
  const GetJson = async () => {
    try {
      let res = await GetFilter();
      let adminRes = await getallAdminData();
      // console.log(res.data.status === 1)
      if (adminRes.data.length > 0) {
        setAdminList(adminRes.data);
      } else {
        setAdminList([]);
      }
      if (res.data.status === 1) {
        setPriority(res.data.data.priority);
        setGroupBy(res.data.data.group_by);
        setStatus(res.data.data.status_type);
        // if (newStatus) {
        //     console.log(selectedStatus)
        //     // eslint-disable-next-line eqeqeq
        //     setSelectedStatus(res.data.data.status_type.find((item) => item.value == newStatus)?.value)
        //     // setNewStatus("");
        // }
      } else {
        setPriority([]);
        setGroupBy([]);
        setStatus([]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    GetJson();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log(groupBy, props?.updateTaskData.group_by.split(","))
  /*On change function for group by field */
  const handleGroupSelect = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue && !selectedGroupBy.includes(selectedValue)) {
      setSelectedGroupBy([...selectedGroupBy, selectedValue]);
    }
  };
  /*Delete function for group by field */
  const removeGroup = (user) => {
    setSelectedGroupBy(selectedGroupBy.filter((item) => item !== user));
  };
  const handleAdminSelect = (e) => {
    const selectedAdminId = e.target.value;
    // console.log('Current selectedAdmin:', selectedAdmin); // Debugging line

    const selectedAdminObj = AdminList.find(
      (user) => user.admin_id === selectedAdminId
    );

    if (
      selectedAdminObj &&
      !selectedAdmin.some(
        (admin) => admin.admin_id === selectedAdminObj.admin_id
      )
    ) {
      setSelectedAdmin([...selectedAdmin, selectedAdminObj]);
    }
  };
  /*Delete function for group by field */
  const removeAdmin = (adminId) => {
    setSelectedAdmin(
      selectedAdmin.filter((admin) => admin.admin_id !== adminId)
    );
  };
  /*Function to submit the form */
  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let assignedAdminId =
      selectedAdmin?.length > 0
        ? selectedAdmin.map((admin) => admin.admin_id).join(",")
        : "";
    let email =
      selectedAdmin?.length > 0
        ? selectedAdmin.map((admin) => admin.email).join(",")
        : "";
    let assignedAdminName =
      selectedAdmin?.length > 0
        ? selectedAdmin.map((admin) => admin.name).join(",")
        : "";
    let assignedUserType =
      selectedAdmin?.length > 0
        ? selectedAdmin.map((admin) => admin.admin_type).join(",")
        : "";
    try {
      let res = await ADocAnnotation(
        admin_id,
        "",
        assignedAdminId,
        email,
        "", //     subject,
        taskTitle,
        "", //annotation.x_axis,
        "", //annotation.y_axis,
        "task",
        admin_type, //sender type
        admin_name, //sender name,
        assignedAdminName, //assigned Admin or user Name,
        "", //follow up status(for notes only)
        "", //Next follow up date(for notes only)
        assignedUserType, //Assign user type,
        "", //Document url(for notes only)
        admin_email, //Sender email
        props.userId ? props.userId : "", //employee id,
        "", //assigned_by_id
        "", // document parent code
        "", //Annotation data,
        "", //annotationId
        props.userId ? props.TaskUserType : "", //User type of document
        "", //document name
        stardivate,
        endDate,
        selectedGroupBy.toString(),
        selectedPriority,
        selectedStatus
      );
      if (res.data.message === "task inserted successfully!") {
        toast.success("Task added Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setTaskTitle("");
        setStardivate(new Date().toISOString().split("T")[0]);
        setEndDate("");
        setSelectedGroupBy([]);
        setSelectedAdmin([]);
        setSelectedStatus("");
        setSelectedPriority("");
        setLoading(false);
        props.setApiCall(true);
        props.setShowTaskForm(false);
      }
      if (
        res.data.message ===
        "required fields cannot be blank assined_to_user_id"
      ) {
        toast.error("Please add the fields", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  /*Function to add more status */
  const onAddStatusClick = async (event) => {
    event.preventDefault();

    if (newStatus) {
      let data = {
        json_item: newStatus,
      };
      try {
        const responseData = await AddFIlter(data, 36);
        if (responseData.message === "item already exist !") {
          setStatusErrors("Status already exist !");
          setNewStatus("");
          setLoading(false);
        }
        if (responseData.message === "filter item added successfully") {
          toast.success("Status added successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setShowStatusInput(false);
          setNewStatus("");
          setStatus((prevStatus) => [
            ...prevStatus,
            { id: responseData.newStatusId, value: newStatus },
          ]);
          setSelectedStatus(newStatus);
          setAddStatusLoading(false);
          setStatusErrors("");
        }
      } catch (err) {
        console.log(err);
        setAddStatusLoading(false);
        setStatusErrors("");
      }
    } else {
      alert("No status found");
    }
  };
  // Load task data into form fields
  useEffect(() => {
    if (props?.updateTaskData) {
      setTaskTitle(props?.updateTaskData.subject_description || "");
      setStardivate(
        props?.updateTaskData.start_date
          ? props?.updateTaskData.start_date.split(" ")[0]
          : ""
      );
      setEndDate(
        props?.updateTaskData.end_date
          ? props?.updateTaskData.end_date.split(" ")[0]
          : ""
      );
      setSelectedPriority(props?.updateTaskData.priority || "");
      setSelectedStatus(props?.updateTaskData.status || "");
      setSelectedGroupBy(
        props?.updateTaskData.group_by
          ? props?.updateTaskData.group_by.split(",")
          : []
      );
      setSelectedAdmin(
        props?.updateTaskData.assigned_to
          ? props?.updateTaskData.assigned_to.split(",").map((email, index) => {
            const admin_id =
              props?.updateTaskData.assined_to_user_id.split(",")[index];
            const name =
              props?.updateTaskData.assigned_to_name.split(",")[index];
            const admin_type =
              props?.updateTaskData.assigned_user_type.split(",")[index];

            // Find the matching admin in the adminList array
            const admin = AdminList.find(
              (admin) =>
                admin.admin_id ===
                props?.updateTaskData.assined_to_user_id.split(",")[index]
            );
            return {
              admin_id,
              name,
              profile_image: admin ? admin.profile_image : "", // Use profile_image if found
              admin_type,
              email,
            };
          })
          : []
      );
    }
  }, [props?.updateTaskData, groupBy, priority, status, AdminList]);

  const onUpdateTaskSubmit = async (e) => {
    e.preventDefault();

    // Construct the updated task object
    const updatedTask = {
      subject_description: taskTitle,
      start_date: stardivate,
      end_date: endDate,
      priority: selectedPriority,
      status: selectedStatus,
      group_by: selectedGroupBy.join(","),
      assigned_to: selectedAdmin.map((admin) => admin.email).join(","),
      assigned_to_name: selectedAdmin.map((admin) => admin.name).join(","),
      assined_to_user_id: selectedAdmin
        .map((admin) => admin.admin_id)
        .join(","),
      assigned_user_type: selectedAdmin
        .map((admin) => admin.admin_type)
        .join(","),
      id: props?.updateTaskData.id,
      type: props?.updateTaskData.type,
      task_creator_user_id: admin_id,
      task_creator_user_type: admin_type,
    };

    try {
      setLoading(true);
      let res = await UpdateDocuentcommentAssign(updatedTask); // Call the update function
      if (res.status === (1 || "1")) {
        if (res.message === "Task updated successfully!") {
          toast.success("Task updated Successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setTaskTitle("");
          setStardivate(new Date().toISOString().split("T")[0]);
          setEndDate("");
          setSelectedGroupBy([]);
          setSelectedAdmin([]);
          setSelectedStatus("");
          setSelectedPriority("");
          setLoading(false);
          props.setShowTaskForm(false); // Close the form
          props.setUpdateTaskData(false);
          props.setApiCall(true);
        }
      }
    } catch (error) { }
  };
  return (
    <form className="mt-6 mb-0 task_dashboard_form">
      <div className="row m-0">
        <div className="mb-3 form-group col">
          <label
            htmlFor="title"
            className="font-size-4 text-black-2  line-height-reset"
          >
            Task
          </label>
          <input
            type="text"
            className="form-control"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Enter Text comment"
            id="title"
          />
        </div>
        <div className="mb-3 form-group col">
          <label
            htmlFor="start_date"
            className="font-size-4 text-black-2  line-height-reset"
          >
            Start date
          </label>
          <input
            id="start_date"
            type="date"
            className="form-control"
            value={stardivate}
            onChange={(e) => setStardivate(e.target.value)}
          />
        </div>
        <div className="mb-3 form-group  col">
          <label
            htmlFor="end_date"
            className="font-size-4 text-black-2  line-height-reset"
          >
            End date
          </label>
          <input
            id="end_date"
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="mb-3 form-group col">
          <label
            htmlFor="priority"
            className="font-size-4 text-black-2  line-height-reset"
          >
            Priority
          </label>
          <select
            id="Priority"
            className="form-control"
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
          >
            {(priority || []).map((user) => (
              <option key={user.id} value={user.id}>
                {user.value}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3 form-group col">
          <div className="d-flex flex-column">
            <label
              htmlFor="status"
              className="font-size-4 text-black-2  line-height-reset"
            >
              Status
            </label>
            {/* Status Dropdown and Add Button */}
            <div className="d-flex  align-items-center mb-2">
              <select
                id="status"
                className={`form-control text-capitalize ${showStatusInput ? "" : "flex-grow-1 me-2"
                  }`}
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                {(status || []).map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.value}
                  </option>
                ))}
              </select>
              {showStatusInput ? (
                <Link
                  className="btn-sm btn-light rounded-3 p-2"
                  onClick={() => setShowStatusInput(false)}
                  title="Close"
                >
                  x
                </Link>
              ) : (
                <Link
                  className="btn-sm btn-primary rounded-3 p-2 mx-1"
                  onClick={() => setShowStatusInput(true)}
                  title="Add New Option"
                >
                  +
                </Link>
              )}
            </div>
            {/* Add New Status Input and Save Button */}
            {showStatusInput && (
              <div className="d-flex align-items-center">
                <div>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Enter status"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  />
                  {statusErrors && (
                    <small className="text-danger">{statusErrors}</small>
                  )}
                </div>
                {addStatusloading ? (
                  <Link
                    className="btn-sm btn-primary rounded-3 p-2"
                    type="button"
                    disabled
                  >
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    ...
                  </Link>
                ) : newStatus ? (
                  <Link
                    className="btn-sm btn-primary rounded-3 p-2 mx-1"
                    onClick={onAddStatusClick}
                    title="Save Status"
                  >
                    ➡
                  </Link>
                ) : null}
              </div>
            )}
          </div>
        </div>
        <div className="mb-3 form-group  col">
          <label
            htmlFor="group"
            className="font-size-4 text-black-2  line-height-reset"
          >
            Group by
          </label>
          <select
            className={`form-control mb-2 text-capitalize`}
            onChange={handleGroupSelect}
            id="group"
          >
            <option value="">Select Group</option>
            {(groupBy || []).map((user) => (
              <option
                key={user.id}
                value={user.id}
                className={
                  user.value === "pgwp" ||
                    user.value === "wes" ||
                    user.value === "atip"
                    ? `text-uppercase`
                    : "text-capitalize"
                }
              >
                {user.value === "pnp" ? "Alberta PNP" : user.value}
              </option>
            ))}
          </select>
          <div className="row m-0 p-0">
            {selectedGroupBy.length === 0
              ? null
              : selectedGroupBy.map((item, index) => {
                const group = Array.isArray(groupBy)
                  ? groupBy.find((i) => i.id === parseInt(item))
                  : null;
                return (
                  <span
                    key={index}
                    className="text-capitalize text-black-2 font-size-2 d-flex align-items-center p-1"
                    title={group ? group.value : "Unknown"}
                  >
                    {group ? group.value : "Unknown"}
                    <Link
                      onClick={() => removeGroup(item)}
                      title={`Delete ${group ? group.value : "Unknown"}`}
                    >
                      <i
                        className="px-1 fa fa-times-circle"
                        aria-hidden="true"
                      ></i>
                    </Link>
                  </span>
                );
              })}
          </div>
        </div>
        <div className="mb-3 form-group col">
          <label
            htmlFor="admin"
            className="font-size-4 text-black-2  line-height-reset"
          >
            Admin
          </label>
          <select
            id="admin"
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

          <div className="row m-0 p-0">
            {selectedAdmin.length === 0
              ? null
              : (selectedAdmin || []).map((item) => (
                <div
                  key={item.admin_id}
                  className="position-relative d-inline-block mr-3 mb-2"
                  style={{ width: "25px", height: "25px" }}
                >
                  <img
                    className="rounded-circle"
                    src={
                      item.profile_image ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                    }
                    alt={`Profile of ${item.name}`}
                    title={`Profile image of ${item.name}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      border: "2px solid #dee2e6",
                    }}
                  />
                  <button
                    onClick={() => removeAdmin(item.admin_id)}
                    aria-label={`Remove ${item.name}`}
                    className="position-absolute text-danger bg-transparent border-0 p-0"
                    style={{
                      top: "-5px",
                      right: "-5px",
                      cursor: "pointer",
                    }}
                  >
                    <i
                      className="fa fa-times-circle"
                      aria-hidden="true"
                      style={{
                        fontSize: "10px",
                        backgroundColor: "white",
                        borderRadius: "50%",
                        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.2)",
                      }}
                    ></i>
                  </button>
                </div>
              ))}
          </div>
        </div>

        <div className="col form-group mb-3 d-flex justify-content-center align-items-top">
          {loading === true ? (
            <Link
              className="btn-md btn-primary p-1 px-12 rounded-4"
              style={{ height: "max-content" }}
            >
              <span
                className="spinner-border spinner-border-sm "
                role="status"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Loading...</span>
            </Link>
          ) : (
            <Link
              onClick={(e) => {
                props?.updateTaskData
                  ? onUpdateTaskSubmit(e)
                  : handleTaskSubmit(e);
              }}
              style={{ height: "max-content", maxWidth: 70 }}
              className="btn-md btn-primary p-1 px-5 rounded-3"
            >
              Save
            </Link>
          )}
          <Link
            className="btn-md p-1 px-5 rounded-3"
            onClick={() => {
              props.setShowTaskForm(false);
              props.setUpdateTaskData(false);
            }}
            title="Close form"
            style={{ height: "max-content", maxWidth: 70, color: "#333" }}
          >
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
}
