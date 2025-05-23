/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Loader from "./loader";
import TableInput from "./TableInput";
import useValidation from "./useValidation";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import SAlert from "./sweetAlert";
import UserAvatar from "./UserAvtar";
import { AddUpdateConsultation, GetConsultation, DeleteConsultation } from "../../api/api";
import { Link, useLocation } from "react-router-dom";
import CommentTaskBox from "./commonTaskBox";
import ModalSidebar from "./modalSidebar";
import { BsChat } from "react-icons/bs";
import { Pagination } from "react-bootstrap";

const initialFormState = {
  applicant_name: "",
  phone: 0,
  email: "",
  manager_id: "",
  manager_type: "",
  person_admin_id: "",
  person_admin_type: "",
  date: "",
  ra_sent_signed: "",
  payment_status: "",
  email_secondary: "",
  payment_method: "",
  payment_date: "",
  mode_of_meeting: "",
  notes: "",
};

const validators = {
  applicant_name: [
    (value) =>
      value === "" || value.trim() === "" ? "Applicant name is required" : null,
  ],
  phone: [
    (value) =>
      value === "" ? "Phone is required" : null,
  ],
  email: [
    (value) =>
      value === "" || value === null || value.trim() === ""
        ? "Email is required"
        : /\S+@\S+\.\S+/.test(value)
          ? null
          : "Email is invalid",
  ],
  // Add more validators as needed
};

function ConsultationTable(props) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const NotificationConsultationId = searchParams.get("consultation_id") || "";
  const NotifiTaskId = searchParams.get("taskId") || "";

  // const [setIsScrolled] = useState(false);
  const [showConsultationModal, setShowConsultationModal] = useState(NotifiTaskId);
  const [taskId, setTaskId] = useState(NotifiTaskId);
  const [isLoading, setIsLoading] = useState(false);
  const [columnName, setColumnName] = useState("updated_at");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [ConsultationId, setConsultationId] = useState(NotificationConsultationId);
  const [dataList, setDataList] = useState([]);
  const [singledata, setSingleData] = useState();
  const [deleteAlertData, setDeleteAlertData] = useState();
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [apiCall, setApiCall] = useState(false);
  const [editField, setEditField] = useState({ rowId: null, field: null });
  const tableContainerRef = useRef(null);
  const [totalData, setTotalData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const nPages = Math.ceil(totalData / recordsPerPage);
  const GetConsultationList = async () => {
    try {
      setIsLoading(true);
      const data = {
        id: ConsultationId,
        applicant_name: "",
        email: "",
        manager_id: props.selectedAdminId,
        manager_type: props.selectedAdminType,
        limit: recordsPerPage,
        page: currentPage,
        column_name: columnName,
        sort_order: sortOrder
      };
      const Res = await GetConsultation(data);
      const adminList = Res.data.data;
      setDataList(adminList);
      setTotalData(Res.data.total_row)
      if (taskId) {
        console.log(adminList[0])
        setSingleData(adminList[0]);
        if (adminList[0]) {
          setShowConsultationModal(true);
          const newUrl = window.location.pathname;
          window.history.replaceState({}, document.title, newUrl);
          localStorage.setItem("navigation_url", "");
        }
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  const { state, setState, setErrors, onInputChange, errors, validate } = useValidation(initialFormState, validators);

  const handleAdd = async (e, data) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    if (validate() || data.id) {
      try {
        console.log(state)
        let res = await AddUpdateConsultation(data ? data : state)
        if (res.data.status === 1 || res.data.status === "1") {
          toast.success(`Consultation ${ConsultationId ? "updated" : "added"} successfully`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setApiCall(true)
          setState(initialFormState);
          setConsultationId(null);
          props.setShowAddForm(false);
          setErrors("")
        }
      } catch (error) {
        console.error(error);
        toast.error("Error saving Consultation");
      }
    } else {
      setIsLoading(false);
    }
  };
  const handleUpdate = (e, id, field) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    const data = { id, [field]: e.target.value };
    console.log(data)
    return handleAdd(e, data);
  };
  const handleDelete = async (id) => {
    try {
      // Placeholder for API call to delete data
      let res = await DeleteConsultation({ id: id });
      if (res.data.status === 1 || res.data.status === "1") {
        toast.error("Consultation has been deleted successfully !", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setDeleteAlert(false);
        setDeleteAlertData(null);
        setApiCall(true)
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (NotifiTaskId) {
      setTaskId(NotifiTaskId)
    }
    if (NotificationConsultationId) {
      setConsultationId(NotificationConsultationId)
    }
  }, [location.key, NotificationConsultationId, NotifiTaskId])
  // Placeholder: Load data list from API or props
  useEffect(() => {
    GetConsultationList()
    if (apiCall) {
      setApiCall(false)
    }
    // setDataList(props.dataList || []);
  }, [columnName, sortOrder, apiCall, currentPage, props.selectedAdminId, ConsultationId, NotificationConsultationId, taskId]);
  const handleSort = (columnName) => {
    setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
    setColumnName(columnName);
  };
  return (
    <>
      <div className="mb-18 height-100">
        <div className="mb-4 align-items-center">
          <div className="page___heading">
            <h3 className="font-size-6 mb-0">{props.heading || "Consultation"}</h3>
          </div>
        </div>

        <div
          className={
            props.heading === "Dashboard"
              ? ""
              : "bg-white shadow-8 datatable_div pt-7 rounded pb-9 px-5"
          }
        >
          <div
            className="datatable_div  pt-7 rounded pb-8 px-2"
            style={{ overflowX: "auto", overflowY: "hidden" }}
            ref={tableContainerRef}
          >
            <form className="table-responsive main_table_div" onSubmit={handleAdd}>
              {isLoading ? (
                <Loader />
              ) : (
                <table className="table table-striped main_data_table text-center align-middle">
                  <thead>
                    <tr className="py-2">
                      {[
                        "Applicant Name",
                        "Phone",
                        "Email",
                        "Manager Harpreet/Sham",
                        "Person Admin",
                        "Date",
                        "RA sent/Signed",
                        "Paid/Unpaid",
                        "Second Email",
                        "Payment Method",
                        "Date of Payment",
                        "Mode of meeting",
                        "Notes",
                        "Action",
                      ].map((heading, index) => (
                        <th
                          key={index}
                          className={`border-0 font-size-3 font-weight-normal ${index === 0 ? "table_sticky_col sticky_col1" : ""
                            }`}
                          style={
                            index === 0
                              ? {
                                background: "white",
                                transition: "background 0.3s ease",
                              }
                              : {}
                          }
                        >
                          <Link to=""
                            className="text-dark"
                            onClick={() => {
                              console.log(heading, sortOrder)
                              if (heading !== "Action") {
                                handleSort(
                                  heading === "RA sent/Signed"
                                    ? "ra_sent_signed"
                                    : heading === "Paid/Unpaid"
                                      ? "payment_status"
                                      : heading === "Second Email"
                                        ? "email_secondary"
                                        : heading === "Date of Payment"
                                          ? "payment_date"
                                          : heading === "Mode of meeting"
                                            ? "mode_of_meeting"
                                            : heading === "Manager Harpreet/Sham"
                                              ? "manager_id"
                                              : heading === "Person Admin"
                                                ? "person_admin_id"
                                                : heading.toLowerCase().replaceAll(" ", "_")
                                );
                              }
                            }
                            }>
                            {heading}
                          </Link>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {props.showAddForm && (
                      <tr>
                        <td className="table_sticky_col sticky_col1" style={{ minWidth: "150px", maxWidth: "190px", background: "white", transition: "background 0.3s ease" }}>
                          <TableInput
                            type="text"
                            name="applicant_name"
                            value={state.applicant_name}
                            onChange={onInputChange}
                            className="form-control"
                            required
                          />
                          {errors.applicant_name && <span className="text-danger font-size-3">{errors.applicant_name}</span>}
                        </td>
                        <td>
                          <TableInput
                            type="number"
                            name="phone"
                            value={state.phone}
                            onChange={onInputChange}
                            className="form-control"
                            required
                          />
                          {errors.phone && <span className="text-danger font-size-3">{errors.phone}</span>}
                        </td>
                        <td>
                          <TableInput
                            type="email"
                            name="email"
                            value={state.email}
                            onChange={onInputChange}
                            className="form-control"
                            required
                          />
                          {errors.email && <span className="text-danger font-size-3">{errors.email}</span>}
                        </td>
                        <td style={{ minWidth: "150px" }}>
                          <select
                            className="form-control"
                            value={`${state.manager_id},${state.manager_type}`}
                            onChange={(e) => {
                              const [id, type] = e.target.value.split(",");
                              setState((prev) => ({
                                ...prev,
                                manager_id: id,
                                manager_type: type,
                              }));
                            }}
                            id="manager_id"
                            name="manager_id"
                          >
                            <option value="">Select Manger</option>
                            {props.adminList
                              .filter((i) => i.admin_type === "super-admin")
                              .map((item) => (
                                <option value={`${item.admin_id},${item.admin_type}`} key={item.admin_id}>
                                  {item.name}
                                </option>
                              ))}
                          </select>
                        </td>

                        <td style={{ minWidth: "150px" }}>
                          <select
                            className="form-control"
                            value={`${state.person_admin_id},${state.person_admin_type}`}
                            onChange={(e) => {
                              const [id, type] = e.target.value.split(",");
                              setState((prev) => ({
                                ...prev,
                                person_admin_id: id,
                                person_admin_type: type,
                              }));
                            }}
                            id="person_admin_id"
                            name="person_admin_id"
                          >
                            <option value="">Select person</option>
                            {props.adminList
                              .map((item) => (
                                <option value={`${item.admin_id},${item.admin_type}`} key={item.admin_id}>
                                  {item.name}
                                </option>
                              ))}
                          </select>
                        </td>

                        <td>
                          <TableInput
                            type="date"
                            name="date"
                            value={state.date}
                            onChange={onInputChange}
                            className="form-control"
                          />
                        </td>
                        <td>
                          <TableInput
                            type="text"
                            name="ra_sent_signed"
                            value={state.ra_sent_signed}
                            onChange={onInputChange}
                            className="form-control"
                          />
                        </td>
                        <td>
                          <select
                            name="payment_status"
                            value={state.payment_status}
                            onChange={onInputChange}
                            className="form-control"
                          >
                            <option value="">Select</option>
                            <option value="Paid">Paid</option>
                            <option value="Unpaid">Unpaid</option>
                          </select>
                        </td>
                        <td>
                          <TableInput
                            type="email"
                            name="email_secondary"
                            value={state.email_secondary}
                            onChange={onInputChange}
                            className="form-control"
                          />
                        </td>
                        <td>
                          <TableInput
                            type="text"
                            name="payment_method"
                            value={state.payment_method}
                            onChange={onInputChange}
                            className="form-control"
                          />
                        </td>
                        <td>
                          <TableInput
                            type="date"
                            name="payment_date"
                            value={state.payment_date}
                            onChange={onInputChange}
                            className="form-control"
                          />
                        </td>
                        <td>
                          <TableInput
                            type="text"
                            name="mode_of_meeting"
                            value={state.mode_of_meeting}
                            onChange={onInputChange}
                            className="form-control"
                          />
                        </td>
                        <td>
                          <TableInput
                            type="text"
                            name="notes"
                            value={state.notes}
                            onChange={onInputChange}
                            className="form-control"
                          />
                        </td>
                        <td style={{ minWidth: "50px", textAlign: "center" }}>
                          {isLoading ? (
                            <button className="btn-sm btn-primary" type="button" disabled>
                              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                              <span className="sr-only">Loading...</span>
                            </button>
                          ) : (
                            <>
                              <button title="Submit" type="submit" className="btn-sm btn-primary">
                                +
                              </button>
                              <button
                                type="button"
                                title="Cancel"
                                onClick={() => {
                                  props.setShowAddForm(false);
                                  setState(initialFormState);
                                }}
                                className="btn-sm btn-dark mx-2"
                              >
                                x
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    )}

                    {dataList.length === 0 ? (
                      <tr>
                        <td colSpan={14} className="text-center font-weight-bold text-capitalize">
                          No Data found
                        </td>
                      </tr>
                    ) : (
                      dataList.map((item, index) => (
                        <tr key={index}>
                          {/* Sticky First Column */}
                          <td
                            className="table_sticky_col sticky_col1 "
                            style={{
                              minWidth: "150px",
                              maxWidth: "190px",
                              background: "white",
                              transition: "background 0.3s ease",
                            }}
                          >
                            <div className="d-flex">
                              <TableInput
                                value={item.applicant_name}
                                onChange={(newValue) =>
                                  handleUpdate(newValue, item.id, "applicant_name")
                                }
                                type="text"
                                name="applicant_name"
                                id="applicant_name"

                              />
                              <Link onClick={() => {
                                setSingleData(item)
                                setShowConsultationModal(true)
                              }}>
                                <span className="text-gray px-2">
                                  <BsChat />
                                </span>
                              </Link>
                            </div>
                          </td>

                          {/* Other Columns */}
                          <td>
                            <TableInput
                              type="number"
                              name="phone"
                              id="phone"
                              value={item.phone}
                              onChange={(newValue) =>
                                handleUpdate(newValue, item.id, "phone")
                              } className="form-control"
                              required
                            />
                          </td>
                          <td>
                            <TableInput
                              type="email"
                              name="email"
                              id="email"
                              value={item.email}
                              onChange={(newValue) =>
                                handleUpdate(newValue, item.id, "email")
                              } className="form-control"
                              required
                            />
                          </td>
                          <td style={{ minWidth: "150px" }}>
                            {editField.rowId === item.id && editField.field === "manager" ? (
                              <select
                                className="form-control"
                                value={item.manager_id && item.manager_type
                                  ? `${item.manager_id},${item.manager_type}`
                                  : ""}
                                onChange={(e) => {
                                  const [id, type] = e.target.value.split(",");
                                  const data = {
                                    id: item.id,
                                    manager_id: id,
                                    manager_type: type,
                                  };
                                  handleAdd(e, data);
                                }}
                                onBlur={() => setEditField({ rowId: null, field: null })}
                                autoFocus
                                id="admin_id"
                                name="admin_id"
                              >
                                <option value="">Select Manager</option>
                                {(props.adminList.filter((i) => i.admin_type === "super-admin") || []).map((admin) => (
                                  <option value={`${admin.admin_id},${admin.admin_type}`} key={admin.admin_id}>
                                    {admin.name}
                                  </option>
                                ))}
                              </select>
                            ) : item.manager_id ? (
                              <div
                                onClick={() => setEditField({ rowId: item.id, field: "manager" })}
                                style={{ cursor: "pointer" }}
                              >
                                <UserAvatar
                                  profileImage={(props.adminList || []).find((i) => i.admin_id === item.manager_id)?.profile_image}
                                  name={(props.adminList || []).find((i) => i.admin_id === item.manager_id)?.name}
                                  userType={(props.adminList || []).find((i) => i.admin_id === item.manager_id)?.admin_type}
                                  index={index}
                                  userId={item.manager_id}
                                />
                              </div>
                            ) : null}
                          </td>

                          <td style={{ minWidth: "150px" }}>
                            {editField.rowId === item.id && editField.field === "person" ? (
                              <select
                                className="form-control"
                                value={item.person_admin_id && item.person_admin_type
                                  ? `${item.person_admin_id},${item.person_admin_type}`
                                  : ""}
                                onChange={(e) => {
                                  const [id, type] = e.target.value.split(",");
                                  const data = {
                                    id: item.id,
                                    person_admin_id: id,
                                    person_admin_type: type,
                                  };
                                  handleAdd(e, data);
                                }}
                                onBlur={() => setEditField({ rowId: null, field: null })}
                                autoFocus
                                id="person_admin_id"
                                name="person_admin_id"
                              >
                                <option value="">Select person</option>
                                {(props.adminList || []).map((admin) => (
                                  <option value={`${admin.admin_id},${admin.admin_type}`} key={admin.admin_id}>
                                    {admin.name}
                                  </option>
                                ))}
                              </select>
                            ) : item.person_admin_id ? (
                              <div
                                onClick={() => setEditField({ rowId: item.id, field: "person" })}
                                style={{ cursor: "pointer" }}
                              >
                                <UserAvatar
                                  profileImage={(props.adminList || []).find((i) => i.admin_id === item.person_admin_id)?.profile_image}
                                  name={(props.adminList || []).find((i) => i.admin_id === item.person_admin_id)?.name}
                                  userType={(props.adminList || []).find((i) => i.admin_id === item.person_admin_id)?.admin_type}
                                  index={index}
                                  userId={item.person_admin_id}
                                />
                              </div>
                            ) : null}
                          </td>


                          <td>
                            <TableInput
                              type="date"
                              name="date"
                              value={item.date}
                              onChange={(newValue) =>
                                handleUpdate(newValue, item.id, "date")
                              } className="form-control"
                            />
                          </td>
                          <td>
                            <TableInput
                              type="text"
                              name="ra_sent_signed"
                              value={item.ra_sent_signed}
                              onChange={(newValue) =>
                                handleUpdate(newValue, item.id, "ra_sent_signed")
                              } className="form-control"
                            />
                          </td>
                          <td>
                            <select
                              name="payment_status"
                              value={item.payment_status}
                              onChange={(newValue) =>
                                handleUpdate(newValue, item.id, "payment_status")
                              } className="form-control"
                            >
                              <option value="">Select</option>
                              <option value="Paid">Paid</option>
                              <option value="Unpaid">Unpaid</option>
                            </select>
                          </td>
                          <td>
                            <TableInput
                              type="email"
                              name="email_secondary"
                              value={item.email_secondary}
                              onChange={(newValue) =>
                                handleUpdate(newValue, item.id, "email_secondary")
                              } className="form-control"
                            />
                          </td>
                          <td>
                            <TableInput
                              type="text"
                              name="payment_method"
                              value={item.payment_method}
                              onChange={(newValue) =>
                                handleUpdate(newValue, item.id, "payment_method")
                              } className="form-control"
                            />
                          </td>
                          <td>
                            <TableInput
                              type="date"
                              name="payment_date"
                              value={item.payment_date}
                              onChange={(newValue) =>
                                handleUpdate(newValue, item.id, "payment_date")
                              } className="form-control"
                            />
                          </td>
                          <td>
                            <TableInput
                              type="text"
                              name="mode_of_meeting"
                              value={item.mode_of_meeting}
                              onChange={(newValue) =>
                                handleUpdate(newValue, item.id, "mode_of_meeting")
                              } className="form-control"
                            />
                          </td>
                          <td>
                            <TableInput
                              type="text"
                              name="notes"
                              value={item.notes}
                              onChange={(newValue) =>
                                handleUpdate(newValue, item.id, "notes")
                              } className="form-control"
                            />
                          </td>
                          <td className={""} style={{ minWidth: "150px" }}>  <button
                            className="btn btn-outline-info action_btn "
                            style={{
                              fontSize: "10px",
                              color: "red"
                            }}
                            type="button"
                            onClick={() => {
                              setDeleteAlertData(item)
                              setDeleteAlert(true)
                            }
                            }
                            title="Delete Consultation">
                            <FaTrash />
                          </button></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </form>

            <SAlert
              show={deleteAlert}
              title={deleteAlertData?.applicant_name}
              text="Are you sure you want to delete!"
              onConfirm={() => handleDelete(deleteAlertData?.id)}
              showCancelButton={true}
              onCancel={() => {
                setDeleteAlert(false);
              }}
            />
          </div>
          {/* Pagination Controls */}
          <div className="pt-2">
            <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              total={dataList.length}
              count={totalData}
            />
          </div>
        </div>
      </div>
      <ModalSidebar
        show={showConsultationModal}
        onClose={() => {
          setShowConsultationModal(false)
          setTaskId("")
          setConsultationId("")
        }}
        children={
          <CommentTaskBox
            userId={singledata?.id || ConsultationId}
            taskType={"consultation_chat"}
            taskUserType={"consultation"}
            setOpenReplyBox={setShowConsultationModal}
            openReplyBox={showConsultationModal}
            taskName={"Discussion for consultation"}
            TaskId={taskId}
          />
        }
      >
        {showConsultationModal ? (
          <CommentTaskBox
            userId={singledata?.id || ConsultationId}
            taskType={"consultation_chat"}
            taskUserType={"consultation"}
            setOpenReplyBox={setShowConsultationModal}
            openReplyBox={showConsultationModal}
            taskName={"Discussion for consultation"}
            TaskId={taskId}
          />
        ) : null}
      </ModalSidebar>
    </>
  );
}

export default ConsultationTable;
