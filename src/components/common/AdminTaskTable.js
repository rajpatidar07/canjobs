import React, { useState, useEffect, useRef } from "react";
import Loader from "./loader";
import { Link } from "react-router-dom";
import {
  DeleteCommentsAndAssign,
  GetCommentsAndAssign,
  GetFilter,
  UpdateDocuentcommentAssign,
} from "../../api/api";
import Pagination from "./pagination";
import { Dropdown, DropdownButton } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { toast } from "react-toastify";
import ConvertTime from "./Common function/ConvertTime";
import moment from "moment";
import SAlert from "./sweetAlert";
import { RiDeleteBin5Line } from "react-icons/ri";
import CommonTaskReplyBox from "./CommonTaskReplyBox";
import AssignedUserList from "./assignedUserList";
import UserAvatar from "./UserAvtar";
import ModalSidebar from "./modalSidebar";
import { CiEdit } from "react-icons/ci";
import { AiOutlineMessage } from "react-icons/ai";
import determineBackgroundColor from "./Common function/DetermineBackgroundColour";
export default function AdminTaskTable(props) {
  const [taskData, setTaskData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [taskStatus /*, setTaskStatus*/] = useState("");
  const [columnName, setcolumnName] = useState("updated_on");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [groupBy, setGroupBy] = useState([]);
  const [priority, setPriority] = useState([]);
  const [openReplyBox, setOpenReplyBox] = useState(false);
  const [singleTaskData, setSingleTaskData] = useState();
  const [statusList, setStatusList] = useState([]);

  /*delete state */
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteID] = useState();
  const [deleteName, setDeleteName] = useState("");
  let adminId = localStorage.getItem("admin_id");

  /*Pagination states */
  const [totalData, setTotalData] = useState(true);
  // const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);
  const rowRefs = useRef([]);
  /*To Show the delete alert box */
  const ShowDeleteAlert = (e) => {
    setDeleteID(e.id);
    setDeleteName(e.subject_description);
    setDeleteAlert(true);
  };
  /*Function to delete comment */
  const OnDeleteTask = async (id) => {
    try {
      let res = await DeleteCommentsAndAssign(
        "",
        id,
        "",
        "",
        props.adminId,
        props.adminType
      );
      if (res.data.message === "Task deleted successfully!") {
        toast.success("Task Deleted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setDeleteAlert(false);
        getCommentsList();
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (props.taskId) {
      // Find the index of the task data that matches taskId
      const index = taskData.findIndex((data) => data.id === props.taskId);
      if (index !== -1) {
        // Scroll to the matching row
        rowRefs.current[index]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [props.taskId, taskData]);
  // Generate a list of admin;s task
  const getCommentsList = async () => {
    try {
      let res = await GetCommentsAndAssign(
        "",
        props.adminId, //adminEmail,
        props.status ? props.status : taskStatus,
        "task",
        props.pageNo,
        recordsPerPage,
        sortOrder,
        columnName,
        props.filter_by_time,
        props.adminType,
        props.employeeId,
        props.TaskUserType,
        props.taskId,
        props.byAdminId,
        props.byAdminType
      );
      let JsonRes = await GetFilter();
      setPriority(JsonRes?.data?.data?.priority);
      setGroupBy(JsonRes?.data?.data?.group_by);
      setStatusList(JsonRes?.data?.data?.status_type);
      if (res.data.status === (1 || "1")) {
        setTaskData(res.data.data.data);
        setIsLoading(false);
        setTotalData(res.data.data.total_rows);
        if (window.location.pathname === "/managetasks") {
          props.setCount(res.data.employee_task_count[0]);
        }
        if (props.replyId) {
          setSingleTaskData(res.data.data.data[0])
          setOpenReplyBox(true)
        }
      } else if (res.data.message === "Task data not found") {
        setIsLoading(false);
        setTaskData([]);
        setTotalData(0);
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
      }
      setIsLoading(false);
    }
  };
  useEffect(() => {
    console.log(props.taskId)
    getCommentsList();
    const newUrl = window.location.pathname;
    window.history.replaceState({}, document.title, newUrl);
    // eslint-disable-next-line
  }, [
    taskStatus,
    props.pageNo,
    props.apiCall,
    props.adminType,
    props.status,
    props.adminId,
    props.employeeId,
    props.filter_by_time,
    sortOrder,
    columnName,
    recordsPerPage,
    props.taskId,
    props.replyId,
    props.byAdminId,
    props.byAdminType
  ]);
  /*Sorting Function */
  const handleSort = (columnName) => {
    setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
    setcolumnName(columnName);
  };
  /*function to change task status */
  const OnStatusChange = async (originalData, status) => {
    const {
      assigned_to,
      assigned_to_name,
      assigned_user_type,
      assined_to_user_id,
    } = originalData;

    // ;
    // Construct the final data to send to the API
    const updatedData = {
      // ...originalData,
      doc_id: originalData.doc_id,
      status: status,
      is_status_update: true,
      // subject_description: updatedCommentToApi,
      task_creator_user_id: localStorage.getItem(
        localStorage.getItem("userType") === "admin" ? "admin_id" : "agent_id"
      ),
      task_creator_user_type:
        localStorage.getItem("userType") === "admin" ? "admin" : "agent",
      assined_to_user_id: assined_to_user_id,
      assigned_user_type: assigned_user_type,
      doc_parent_id: originalData.doc_parent_id,
      assigned_to: assigned_to,
      assigned_to_name: assigned_to_name,
      id: originalData.id,
      type: originalData.type,
    };

    // Call the API to update the document
    try {
      let res = await UpdateDocuentcommentAssign(
        updatedData,
        props.TaskUserType
      );
      if (res.message === "Task updated successfully!") {
        toast.success("Task completed Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        if (window.location.pathname === "/managetasks") {
          props.setApiCall(true);
          props.setStatus("-1")
        }
      }
    } catch (err) {
      if (window.location.pathname === "/managetasks") {
        props.setApiCall(true);
        props.setStatus("-1")
      }
      console.log(err);
    }
  };
  return (
    <>
      <div className="bg-white shadow-8 datatable_div pt-7 rounded pb-8 px-2">
        <div className={`table-responsive main_table_div col-12`}>
          {isLoading ? (
            <Loader />
          ) : (
            <table className="table table-striped main_data_table">
              <thead>
                <tr className="">
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to={""}
                      onClick={() => {
                        handleSort("task_creator_user_name");
                        props.setpageNo(1);
                      }}
                      className="text-gray"
                      title="Sort by Assigned From"
                    >
                      Assigned From
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to={""}
                      onClick={() => {
                        handleSort("assigned_to_name");
                        props.setpageNo(1);
                      }}
                      className="text-gray"
                      title="Sort by Assigned To"
                    >
                      Assigned To
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className="border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to={""}
                      onClick={() => {
                        handleSort("subject_description");
                        props.setpageNo(1);
                      }}
                      className="text-gray"
                      title="Sort by Description"
                    >
                      Description
                    </Link>
                  </th>
                  {props.heading === "Dashboard" ? (
                    ""
                  ) : (
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal"
                    >
                      <Link
                        to={""}
                        onClick={() => {
                          handleSort("type");
                          props.setpageNo(1);
                        }}
                        className="text-gray"
                        title="Sort by Type"
                      >
                        Timeline
                      </Link>
                    </th>
                  )}
                  {props.heading === "Dashboard" ? (
                    ""
                  ) : (
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal"
                    >
                      <Link
                        to={""}
                        onClick={() => {
                          handleSort("Priority");
                          props.setpageNo(1);
                        }}
                        className="text-gray"
                        title="Sort by Priority"
                      >
                        Priority
                      </Link>
                    </th>
                  )}
                  {props.heading === "Dashboard" ? (
                    ""
                  ) : (
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal"
                    >
                      <Link
                        to={""}
                        onClick={() => {
                          handleSort("group_by");
                          props.setpageNo(1);
                        }}
                        className="text-gray"
                        title="Sort by Status"
                      >
                        Group by
                      </Link>
                    </th>
                  )}
                  {
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal"
                    >
                      <Link
                        to={""}
                        onClick={() => {
                          handleSort("status");
                          props.setpageNo(1);
                        }}
                        className="text-gray"
                        title="Sort by Status"
                      >
                        Status
                      </Link>
                    </th>
                  }
                  {props.heading === "Dashboard" ||
                    props.heading !== "Task Dashboard" ? (
                    ""
                  ) : (
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal"
                    >
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {/* Map function to show the data in the list*/}
                {totalData === 0 || taskData.length === 0 ? (
                  <tr>
                    <th colSpan={8} className="bg-white text-center">
                      No Data Found
                    </th>
                  </tr>
                ) : (
                  (taskData || []).map((data, index) => (
                    <React.Fragment key={data.id}>
                      <tr
                        className={`applicant_row ${props.taskId === data.id ? "bg-light" : ""
                          }`}
                        ref={(el) => (rowRefs.current[index] = el)}
                      >
                        <td className="text-capitalize py-5">
                          {/* <p className="font-size-3 font-weight-normal text-black-2 mb-0">
                            {data.task_creator_user_name === null ||
                            data.task_creator_user_name === undefined ||
                            data.task_creator_user_name === "undefined" ||
                            data.task_creator_user_name === "" ||
                            data.task_creator_user_name === "0" ? (
                              <span className="font-size-3  mb-0">N/A</span>
                            ) : (
                              data.task_creator_user_name
                            )}
                          </p> */}
                          <UserAvatar
                            profileImage={data.task_creator_user_profile_image}
                            name={data.task_creator_user_name}
                            userType={data.task_creator_user_type}
                            index={index}
                            userId={data.task_creator_user_id}
                          />
                        </td>
                        <td className="text-capitalize py-5">
                          {/* <p className="font-size-3 font-weight-normal text-black-2 mb-0">
                            {data.assigned_to_name === null ||
                            data.assigned_to_name === undefined ||
                            data.assigned_to_name === "undefined" ||
                            data.assigned_to_name === "" ||
                            data.assigned_to_name === "0" ? (
                              <span className="font-size-3  mb-0">N/A</span>
                            ) : (
                              data.assigned_to_name
                            )}
                          </p> */}
                          <AssignedUserList
                            assined_to_user_id={data.assined_to_user_id}
                            assigned_to_name={data.assigned_to_name}
                            assigned_to_profile_image={
                              data.assigned_to_profile_image
                            }
                            assigned_user_type_new={data.assigned_user_type_new}
                          />
                        </td>
                        <td className="py-5">
                          {data.subject_description === null ||
                            data.subject_description === undefined ||
                            data.subject_description === "undefined" ||
                            data.subject_description === "" ||
                            data.subject_description === "0" ? (
                            <p className="font-size-3  mb-0">N/A</p>
                          ) : (
                            <div className="m-0" style={{ maxWidth: 300 }}>
                              <div
                                className="font-size-3 text-italic text-black-2 mb-0 text-truncate"
                                title={data.subject_description}
                                dangerouslySetInnerHTML={{
                                  __html: data.subject_description,
                                }}
                              />
                              {/* {data.subject_description.replace(/@/g, "")} */}
                            </div>
                          )}
                        </td>

                        {props.heading === "Dashboard" ? (
                          ""
                        ) : (
                          <td className=" py-5">
                            {data.start_date === null ? (
                              <p className="font-size-3 mb-0">N/A</p>
                            ) : (
                              // <p className="font-size-2 m-0 border rounded-pill p-2 text-center bg-light">
                              //   {/* {moment(data.start_date).format("ll") +
                              //     (data.end_date !== "0000-00-00 00:00:00"
                              //       ? "-" + moment(data.end_date).format("ll")
                              //       : "")} */}

                              //   {moment(data.end_date).endOf("day").fromNow()}
                              // </p>
                              <p
                                className="font-size-2 m-0 border rounded-pill p-2 text-center"
                                style={{
                                  backgroundColor: isNaN(
                                    new Date(data.end_date)
                                  ) // Check if the date is invalid
                                    ? "#f5f5f5" // Light gray for invalid dates
                                    : new Date(data.end_date) <
                                      new Date(new Date().setHours(0, 0, 0, 0))
                                      ? "#f8d7da" // Light red for past dates
                                      : new Date(data.end_date).toDateString() ===
                                        new Date().toDateString()
                                        ? "#fff8e1" // Light blue for today's date
                                        : "#d4edda", // Light green for future dates
                                  color: isNaN(new Date(data.end_date)) // Check if the date is invalid
                                    ? "#6c757d" // Gray text for invalid dates
                                    : new Date(data.end_date) <
                                      new Date(new Date().setHours(0, 0, 0, 0))
                                      ? "#721c24" // Dark red for past dates
                                      : new Date(data.end_date).toDateString() ===
                                        new Date().toDateString()
                                        ? "#0c5460" // Dark blue text for today
                                        : "#155724", // Dark green text for future dates
                                  fontWeight: "bold",
                                }}
                              >
                                {isNaN(new Date(data.end_date)) // Check if the date is invalid
                                  ? "Not Available"
                                  : moment(data.end_date)
                                    .endOf("day")
                                    .fromNow()}
                              </p>
                            )}
                          </td>
                        )}
                        {props.heading === "Dashboard" ? (
                          ""
                        ) : (
                          <td className=" py-5">
                            {!data.priority ||
                              data.priority === null ||
                              data.priority.length === 0 ||
                              data.priority === (0 || "0") ? (
                              <p
                                className="rounded-pill text-center font-size-3 badge-light mb-0"
                                style={{
                                  fontSize: 12,
                                  padding: 4,
                                  width: "max-content",
                                  minWidth: 55,
                                }}
                              >
                                N/A
                              </p>
                            ) : (
                              // <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              <p
                                className={`text-white rounded-pill text-center m-0 ${data.priority === ("1" || 1)
                                  ? "badge-danger"
                                  : data.priority === ("2" || 2)
                                    ? "badge-orange"
                                    : data.priority === ("3" || 3)
                                      ? "badge-warning"
                                      : data.priority === ("4" || 4)
                                        ? "badge-info"
                                        : ""
                                  }`}
                                style={{
                                  fontSize: 12,
                                  padding: 4,
                                  width: "max-content",
                                  minWidth: 55,
                                }}
                              >
                                {
                                  priority?.filter(
                                    (i) => i.id === parseInt(data.priority)
                                  )[0].value
                                }
                              </p>
                              // </h3>
                            )}
                          </td>
                        )}
                        {props.heading === "Dashboard" ? (
                          ""
                        ) : (
                          <td className=" py-5">
                            {!data.group_by ||
                              data.group_by === null ||
                              data.group_by.length === 0 ||
                              data.group_by === (0 || "0") ? (
                              <p className="font-size-3  mb-0">N/A</p>
                            ) : (
                              <p className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {groupBy
                                  .filter((i) =>
                                    data.group_by
                                      .split(",")
                                      .includes(String(i.id))
                                  )
                                  .map(
                                    (item, index, arr) =>
                                      item.value +
                                      (index < arr.length - 1 ? ", " : "")
                                  )}
                              </p>
                            )}
                          </td>
                        )}
                        <td className=" py-5">
                          {data.status === null ||
                            data.status === undefined ||
                            data.status === "undefined" ||
                            data.status === "" ? (
                            <p className="font-size-3  mb-0">N/A</p>
                          ) : (
                            <>
                              {window.location.pathname === "/managetasks" ? (
                                <div style={{ display: "table-caption" }}>
                                  <DropdownButton
                                    as={ButtonGroup}
                                    title={(statusList || []).find((item) => item.id === parseInt(data.status))?.value || "Unknown"}
                                    variant={data.status === ("0" || 0) ? "warning" : data.status === ("1" || 1)
                                      ? "shamrock"
                                      : data.status === ("2" || 2)
                                        ? "danger"
                                        : determineBackgroundColor(data)}
                                    size="xs"
                                    className={`user_status_btn btn-xs ${data.status === "0" ? "btn-warning" : data.status === "1"
                                      ? "btn-shamrock" : data.status === "2"
                                        ? "btn-danger px-4" : determineBackgroundColor(data)} rounded-pill font-size-1 px-1 text-white mr-2`}
                                    onSelect={(eventKey, e) => OnStatusChange(data, eventKey)}
                                  >
                                    {(statusList || []).map((item, index) => (
                                      <Dropdown.Item
                                        key={index}
                                        value={item.id}
                                        eventKey={item.id}
                                        className="text-capitalize"
                                      >
                                        {item.value}
                                      </Dropdown.Item>
                                    ))}
                                  </DropdownButton>

                                  {data.status === ("1" || 1) && data.task_complete_date ? (
                                    <small className="font-size-1 d-flex justify-content-center mt-2 text-capitalize">
                                      <ConvertTime _date={data.task_complete_date} format={".fromNow()"} />
                                    </small>
                                  ) : null}
                                </div>

                              ) : (
                                <p
                                  className="font-size-2 font-weight-normal text-black-2 mb-0 text-truncate"

                                >
                                  <span
                                    className={`p-1 text-white text-center border rounded-pill text-capitalize ${data.status === ("0" || 0) ? "bg-warning" : data.status === ("1" || 1) ? "bg-shamrock" : determineBackgroundColor(data)}`} title={statusList[data.status]?.value} key={index}
                                  >
                                    {statusList[data.status]?.value}</span>


                                </p>
                              )}
                            </>
                          )}
                        </td>

                        {/* {props.heading === "Dashboard" ? (
                        ""
                      ) : (
                        <td className=" py-5">
                          {(data.city === null ||
                            data.city === undefined ||
                            data.city === "undefined" ||
                            data.city === "") &&
                          (data.state === null ||
                            data.state === undefined ||
                            data.state === "undefined" ||
                            data.state === "") &&
                          (data.country === null ||
                            data.country === undefined ||
                            data.country === "undefined" ||
                            data.country === "") ? (
                            <p className="font-size-3  mb-0">N/A</p>
                          ) : (
                            <p
                              className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate"
                              title={` ${data.city},${data.state},${data.country}`}
                            >
                              {` ${data.city},${data.state},${data.country}`}
                            </p>
                          )}
                        </td>
                      )} */}
                        <td
                          className={
                            props.heading === "dashboard" ||
                              props.heading !== "Task Dashboard"
                              ? "d-none"
                              : " py-5 min-width-px-100"
                          }
                        >
                          <div
                            className="btn-group button_group"
                            role="group"
                            aria-label="Basic example"
                          >
                            <button
                              className="btn btn-outline-info action_btn"
                              onClick={() => {
                                setOpenReplyBox(true);
                                setSingleTaskData(data);
                              }}
                              title="Add Reply"
                            >
                              <span className="text-gray px-2">
                                <AiOutlineMessage />
                              </span>
                            </button>
                            <button
                              className="btn btn-outline-info action_btn"
                              onClick={() => {
                                props.setUpdateTaskData(data);
                                props.setShowTaskForm(true);
                              }}
                              title="Edit Task"
                              disabled={adminId !== data.task_creator_user_id}
                            >
                              <span className="text-gray px-2">
                                <CiEdit />
                              </span>
                            </button>
                            <button
                              className={
                                props.user === "agent"
                                  ? "d-none"
                                  : "btn btn-outline-info action_btn"
                              }
                              onClick={() => ShowDeleteAlert(data)}
                              title="Delete Partner"
                              disabled={adminId !== data.task_creator_user_id}
                            >
                              <span className="px-2 text-danger">
                                <RiDeleteBin5Line />
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          )}
          <div className={`pt-2 `}>
            <Pagination
              nPages={nPages}
              currentPage={props.pageNo}
              setCurrentPage={props.setpageNo}
              total={totalData}
              count={taskData.length}
              setRecordsPerPage={setRecordsPerPage}
              recordsPerPage={recordsPerPage}
              page={"task"}
            />
          </div>
        </div>
        <ModalSidebar
          show={openReplyBox}
          onClose={() => {
            setOpenReplyBox(false)
            props.setReplyId("")
            props.setTaskId("")
          }}
          children={
            <CommonTaskReplyBox
              openReplyBox={openReplyBox}
              setOpenReplyBox={setOpenReplyBox}
              taskData={singleTaskData}
              replyId={props.replyId}
            />
          }
        >
          {openReplyBox ? (
            <CommonTaskReplyBox
              openReplyBox={openReplyBox}
              setOpenReplyBox={setOpenReplyBox}
              taskData={singleTaskData}
              replyId={props.replyId}
            />
          ) : null}
        </ModalSidebar>
      </div>

      <SAlert
        show={deleteAlert}
        title={deleteName}
        text="Are you Sure you want to delete !"
        onConfirm={() => OnDeleteTask(deleteId)}
        showCancelButton={true}
        onCancel={() => setDeleteAlert(false)}
      />
    </>
  );
}
