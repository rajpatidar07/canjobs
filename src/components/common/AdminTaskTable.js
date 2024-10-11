import React, { useState, useEffect } from "react";
import Loader from "./loader";
import { Link } from "react-router-dom";
import { GetCommentsAndAssign, UpdateDocuentcommentAssign } from "../../api/api";
import Pagination from "./pagination";
import { Dropdown, DropdownButton } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { toast } from "react-toastify";
export default function AdminTaskTable(props) {
  const [taskData, setTaskData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [taskStatus/*, setTaskStatus*/] = useState("");
  const [columnName, setcolumnName] = useState("updated_on");
  const [sortOrder, setSortOrder] = useState("DESC");
  // let adminEmail = localStorage.getItem("admin_id");

  /*Pagination states */
  const [totalData, setTotalData] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);

  // Generate a list of admin;s task
  const getCommentsList = async () => {
    try {
      let res = await GetCommentsAndAssign(
        "",
        props.adminId,//adminEmail,
        props.status ? props.status : taskStatus,
        "document",
        window.location.pathname === "/dashboard" ? props.pageNo : currentPage,
        recordsPerPage,
        sortOrder,
        columnName,
        props.filter_by_time,
        props.adminType,
        props.employeeId,
        props.TaskUserType,

      );
      if (res.data.status === (1 || "1")) {
        setTaskData(res.data.data.data);
        setIsLoading(false);
        setTotalData(res.data.data.total_rows);
        if (window.location.pathname === "/managetasks") {
          props.setCount(res.data.employee_task_count[0])
        }
      } else if (res.data.message === "Task data not found") {
        setIsLoading(false);
        setTaskData([]);
        setTotalData(0);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getCommentsList();
    // eslint-disable-next-line
  }, [taskStatus, props.apiCall, props.adminType, props.status, props.adminId, props.employeeId, props.filter_by_time, currentPage, sortOrder, columnName]);
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
      task_creator_user_id: localStorage.getItem(localStorage.getItem("userType") === "admin" ? "admin_id" : "agent_id"),
      task_creator_user_type:
        localStorage.getItem("userType") === "admin" ? "admin" : "agent",
      assined_to_user_id: assined_to_user_id,
      assigned_user_type: assigned_user_type,
      doc_parent_id: originalData.doc_parent_id,
      assigned_to: assigned_to,
      assigned_to_name: assigned_to_name,
      id: originalData.id,
    };

    // Call the API to update the document
    try {
      let res = await UpdateDocuentcommentAssign(updatedData, props.TaskUserType);
      if (res.message === "Task updated successfully!") {
        toast.success("Task completed Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        if (window.location.pathname === "/managetasks") { props.setApiCall(true) }
      }
    } catch (err) {
      if (window.location.pathname === "/managetasks") { props.setApiCall(true) }
      console.log(err);
    }
  };
  return (
    <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-8 px-2 ">
      <div className="table-responsive main_table_div">
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
                      window.location.pathname === "/dashboard" ? props.setpageNo(1) : setCurrentPage(1)
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
                      window.location.pathname === "/dashboard" ? props.setpageNo(1) : setCurrentPage(1)
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
                      window.location.pathname === "/dashboard" ? props.setpageNo(1) : setCurrentPage(1)
                    }}
                    className="text-gray"
                    title="Sort by Description"
                  >
                    Description
                  </Link>
                </th>
                {/* {props.heading === "Dashboard" ? (
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
                           window.location.pathname === "/dashboard"?props.setpageNo(1):setCurrentPage(1)
                        }}
                        className="text-gray"
                        title="Sort by Type"
                      >
                        Type
                      </Link>
                    </th>
                  )} */}
                {
                  <th
                    scope="col"
                    className="border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to={""}
                      onClick={() => {
                        handleSort("status");
                        window.location.pathname === "/dashboard" ? props.setpageNo(1) : setCurrentPage(1)
                      }}
                      className="text-gray"
                      title="Sort by Status"
                    >
                      Status
                    </Link>
                  </th>
                }
                {/* {props.heading === "Dashboard" ? (
                  ""
                ) : (
                  <th
                    scope="col"
                    className="border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to={""}
                      // onClick={() => {
                      //   handleSort("country");
                      //    window.location.pathname === "/dashboard"?props.setpageNo(1):setCurrentPage(1)
                      // }}
                      className="text-gray"
                      title="Sort by Country"
                    >
                      Country
                    </Link>
                  </th>
                )} */}
                {/* {props.heading === "Dashboard" ? (
                    ""
                  ) : (
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal"
                    >
                      Action
                    </th>
                  )} */}
              </tr>
            </thead>
            <tbody>
              {/* Map function to show the data in the list*/}
              {totalData === 0 || taskData.length === 0 ? (
                <tr>
                  <th colSpan={6} className="bg-white text-center">
                    No Data Found
                  </th>
                </tr>
              ) : (
                (taskData || []).map((data) => (
                  <React.Fragment key={data.id}>
                    <tr className="text-capitalize applicant_row">
                      <td className=" py-5">
                        <p className="font-size-3 font-weight-normal text-black-2 mb-0">
                          {data.task_creator_user_name === null ||
                            data.task_creator_user_name === undefined ||
                            data.task_creator_user_name === "undefined" ||
                            data.task_creator_user_name === "" ||
                            data.task_creator_user_name === "0" ? (
                            <span className="font-size-3  mb-0">N/A</span>
                          ) : (
                            data.task_creator_user_name
                          )}
                        </p>
                      </td>
                      <td className=" py-5">
                        <p className="font-size-3 font-weight-normal text-black-2 mb-0">
                          {data.assigned_to_name === null ||
                            data.assigned_to_name === undefined ||
                            data.assigned_to_name === "undefined" ||
                            data.assigned_to_name === "" ||
                            data.assigned_to_name === "0" ? (
                            <span className="font-size-3  mb-0">N/A</span>
                          ) : (
                            data.assigned_to_name
                          )}
                        </p>
                      </td>
                      <td className="py-5 ">
                        {data.subject_description === null ||
                          data.subject_description === undefined ||
                          data.subject_description === "undefined" ||
                          data.subject_description === "" ||
                          data.subject_description === "0" ? (
                          <p className="font-size-3  mb-0">N/A</p>
                        ) : (
                          <div className="m-0">
                            <div className="text-gray font-size-2 m-0"
                              dangerouslySetInnerHTML={{ __html: data.subject_description }} />
                            {/* {data.subject_description.replace(/@/g, "")} */}

                          </div>
                        )}
                      </td>

                      {/* {props.heading === "Dashboard" ? (
                        ""
                      ) : (
                        <td className=" py-5">
                          {data.type === null ? (
                            <p className="font-size-3  mb-0">N/A</p>
                          ) : (
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              <p className="text-gray font-size-2 m-0">
                                {data.type}
                              </p>
                            </h3>
                          )}
                        </td>
                      )} */}

                      <td className=" py-5">
                        {data.status === null ||
                          data.status === undefined ||
                          data.status === "undefined" ||
                          data.status === "" ? (
                          <p className="font-size-3  mb-0">N/A</p>
                        ) : (
                          <>
                            {window.location.pathname === "/managetasks" ? <DropdownButton
                              as={ButtonGroup}
                              title={
                                data.status === "1"
                                  ? "Completed"
                                  : data.status === "2"
                                    ? "OverDue"
                                    : "Incomplete"
                              }
                              variant={data.status === ("1" || 1)
                                ? "shamrock"
                                : data.status === ("2" || 2)
                                  ? "danger"
                                  : "warning"}
                              size="xs"
                              className={`user_status_btn btn-xs ${data.status === "1"
                                ? "btn-shamrock"
                                : data.status === "2"
                                  ? "btn-danger"
                                  : "btn-warning"
                                } rounded-pill font-size-1 px-1 text-white mr-2`}
                              disabled={data.status === "2"}
                              onSelect={(eventKey, e) => OnStatusChange(data, eventKey)}                          >
                              <Dropdown.Item
                                value={1}
                                eventKey={1}
                                className="text-capitalize"
                              >
                                Complete
                              </Dropdown.Item>
                              <Dropdown.Item
                                value={0}
                                eventKey={0}
                                className="text-capitalize"
                              >
                                Incomplete
                              </Dropdown.Item>
                              {/* <Dropdown.Item
                                value={2}
                                eventKey={2}
                                className="text-capitalize"
                              >
                                Overdue
                              </Dropdown.Item> */}
                            </DropdownButton>
                              :
                              <p
                                className="font-size-2 font-weight-normal text-black-2 mb-0 text-truncate"
                                title={
                                  data.status === (0 || "0")
                                    ? "Incomplete"
                                    : "Completed"
                                }
                              >
                                {data.status === (0 || "0") ? (
                                  <span className="p-1 bg-warning text-white text-center w-100 border rounded-pill">
                                    Incomplete
                                  </span>
                                ) : (
                                  <span className="p-1 bg-primary-opacity-8 text-white text-center w-100 border rounded-pill">
                                    Complete
                                  </span>
                                )}
                              </p>}
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
                      {/* <td className=" py-5 min-width-px-100">
                          <div
                            className="btn-group button_group"
                            role="group"
                            aria-label="Basic example"
                          >
                            <button
                              className="btn btn-outline-info action_btn"
                              onClick={() => {
                                setAgentId(data.id);
                              }}
                              title="Candidate's"
                              disabled={data.agent_employee_count === "0" || 0}
                            >
                              <span className="text-gray px-2">
                                <MdFormatListBulletedAdd />
                              </span>
                            </button>
                            <button
                              className="btn btn-outline-info action_btn"
                              onClick={() => props.EditAgent(data.id)}
                              title="Edit Partner"
                            >
                              <span className="text-gray px-2">
                                <LiaUserEditSolid />
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
                            >
                              <span className="px-2 text-danger">
                                <RiDeleteBin5Line />
                              </span>
                            </button>
                          </div>
                        </td> */}
                    </tr>
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
      <div className="pt-2">
        <Pagination
          nPages={nPages}
          currentPage={window.location.pathname === "/dashboard" ? props.pageNo : currentPage}
          setCurrentPage={window.location.pathname === "/dashboard" ? props.setpageNo : setCurrentPage}
          total={totalData}
          count={taskData.length}
        />
      </div>
    </div>
  );
}
