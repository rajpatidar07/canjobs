import React, { useEffect, useState } from "react";
import StyledDropdown from "../common/StyledDropDown";
import TableInput from "../common/TableInput";
import { AddUpdatePaymentInvoiceRecordApi, getAllInvioceRecord, GetFilter, DeletePaymentIvoiceRecord } from "../../api/api";
import useValidation from "./useValidation";
import { FaTrash } from "react-icons/fa";
import Pagination from "../common/pagination"
import SAlert from "../common/sweetAlert";
import { toast } from "react-toastify";
import Loader from "../common/loader";
import { Link } from "react-router-dom";
const PaymentTable = (props) => {
  let [filterListapiCall, setFilterListApiCall] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  const [jsonList, setJsonList] = useState([]);
  const [paymentRecordsList, setPaymentRecordsList] = useState([]);
  const [totalData, setTotalData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [columnName, setcolumnName] = useState("updated_at");
  const [sortOrder, setSortOrder] = useState("DESC");
  const recordsPerPage = 10;
  const nPages = Math.ceil(totalData / recordsPerPage);
  const [loading, setLoading] = useState(false);
  const [deleteAlertPaymentRecordData, setDeleteAlertPaymentRecordData] =
    useState(false);
  const [deleteAlertPaymentRecord, setDeleteAlertPaymentRecord] =
    useState(false);
  let initialFormState = {
    user_id: "",
    user_type: "",
    referred_by_id: "",
    referred_by_type: "",
    manager_id: "",
    manager_type: "",
    payment_status: "",
    duplicate_payment: "",
    due_date: "",
    payment_method: ""
  }
  const validators = {
    user_id: [
      (value) =>
        value === "" || value.trim() === ""
          ? "user is required"
          : "",
    ],

  }
  const { state, setState, setErrors, onInputChange, errors, validate } =
    useValidation(initialFormState, validators);
  /*function to get the list */
  let getFilterList = async () => {
    try {
      setIsLoading(true)
      let getPaymentRecData = {
        limit: recordsPerPage,
        page: currentPage,
        search: props.search,
        admin_id: props.selectedAdminId,
        admin_type: props.selectedAdminType,
        column_name: columnName,
        sort_order: sortOrder,
      }
      let json = await GetFilter();
      let resRecords = await getAllInvioceRecord(getPaymentRecData);
      if (resRecords.data.status === 1 || resRecords.data.status === "1") {
        setIsLoading(false)
        setTotalData(resRecords.data.data.total_rows)
        setPaymentRecordsList(resRecords.data.data.data)
      } else {
        setIsLoading(false)
      }
      setJsonList(json.data.data);
    } catch (err) {
      setIsLoading(false)
      console.log(err);
    }
  };

  useEffect(() => {
    getFilterList();
    if (filterListapiCall === true) {
      setFilterListApiCall(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterListapiCall,
    props.search,
    props.selectedAdminId,
    props.selectedAdminType, sortOrder, columnName]);

  /*FUnction to update the payment invoice record */
  const handleUpdateChange = async (e, id, field) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    let data = { id };

    if (["user_id", "referred_by_id", "manager_id"].includes(field)) {
      const [idValue, typeValue] = e.target.value.split(",");
      data = { ...data, [field]: idValue, [`${field.replace("_id", "_type")}`]: typeValue };
    } else {
      data[field] = e.target.value;
    }
    try {
      let res = await AddUpdatePaymentInvoiceRecordApi(data);
      if (res.data.status === 1 || res.data.status === "1") {
        toast.success("Invoice Record Updated successfully !", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setFilterListApiCall(true)
      }
    } catch (err) {
      console.log(err);
    }
  };
  /*function to add payment record  */
  const AddPaymentRecord = async () => {
    if (validate()) {
      try {
        setLoading(true)
        let res = await AddUpdatePaymentInvoiceRecordApi(state)
        if (res.data.status === 1 || res.data.status === "1") {
          toast.success("Invoice Record Added successfully !", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setErrors({})
          setState(initialFormState)
          setLoading(false)
          props.setShowAddForm(false)
          setFilterListApiCall(true)
        }
      } catch (err) {
        console.log(err)
        setLoading(false)

      }
    }
  }
  /*function to delete the invoice record */
  const deletePaymentInoiceRecord = async (id) => {
    try {
      let data = {
        id: id
      }
      let res = await DeletePaymentIvoiceRecord(data)
      if (res.data.status === 1) {
        toast.error("Invoice Record has been deleted !", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setDeleteAlertPaymentRecord(false)
        setDeleteAlertPaymentRecordData({})
        setFilterListApiCall((true))
      };
    } catch (err) {
      console.log(err)

    }
  }
  /*Sorting Function */
  const handleSort = (columnName) => {
    setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
    setcolumnName(columnName);
  };
  return (
    <>
      <div className="mb-18 height-100">
        <div className="mb-4 align-items-center">
          <div className="page___heading">
            <h3 className="font-size-6 mb-0">Payment</h3>
          </div>
        </div>

        <div
          className={"bg-white shadow-8 datatable_div pt-7 rounded pb-9 px-5"}
        >
          <div >
            <form className="table-responsive main_table_div">
              {isLoading ? (
                <Loader />
              ) : <table className="table table-striped main_data_table text-center align-middle">
                <thead>
                  <tr className="py-2">
                    {[
                      "Name",
                      "Referred By",
                      "Manager",
                      "Payment Status",
                      "Duplicate Payment",
                      "Due Date",
                      "Method",
                      // "Email",
                      // "Call back Date/time",
                      // "Additional Notes",
                      "Action ",
                    ].map((heading, index) => (
                      <th
                        key={index}
                        className="border-0 font-size-3 font-weight-normal"
                      >
                        <Link to="" className="text-dark"
                          onClick={() => { if (heading !== "Action") { handleSort(heading === "Name" ? "user_name	" : heading === "Referred By" ? "referred_name" : heading === "Manager" ? "manager_name" : heading === "Method" ? "payment_method" : (heading.toLowerCase().replaceAll(" ", "_"))) } }}
                        >
                          {heading}</Link>                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {props.showAddForm && (
                    <tr>
                      <td>
                        <select
                          name="user_id"
                          value={state.user_id + "," + state.user_type}
                          id="user_id"
                          onChange={(e) => {
                            const [user_id, user_type] = e.target.value.split(",");
                            setState((prevState) => ({
                              ...prevState,
                              user_id,
                              user_type,
                            }));
                          }}
                          className="form-control mt-3"
                        >
                          <option value="">Select Applicant/Client</option>
                          {(props.employeeEmployerlist || []).map((item, index) => {
                            return (
                              <option
                                className="text-capitalize"
                                key={index}
                                value={
                                  item.employee_id
                                    ? `${item.employee_id},employee`
                                    : item.company_id
                                      ? `${item.company_id},employer`
                                      : `${item.id},applicant_type`
                                }
                              >
                                {item.employee_id
                                  ? item.name + " (Candidate)"
                                  : item.company_id
                                    ? item.company_name + " (Client)"
                                    : item.title + " (Applicant Type)" || "unknown user"}
                              </option>
                            );
                          })}
                        </select>

                        {errors.user_id && (
                          <span key={errors.user_id} className="text-danger font-size-3">
                            {errors.user_id}
                          </span>
                        )}
                      </td>
                      <td>
                        {" "}
                        <td style={{ minWidth: "150px" }}>
                          <select className="form-control" value={state.referred_by_id + "," + state.referred_by_type} id="referred_by_id" onChange={(e) => {
                            const [referred_by_id, referred_by_type] = e.target.value.split(",");
                            setState((prevState) => ({
                              ...prevState,
                              referred_by_id,
                              referred_by_type,
                            }));
                          }} name="referred_by_id">
                            <option>Select Refer by</option>
                            {(props.adminList || []).map((item, index) => (
                              <option value={`${item.admin_id},${item.admin_type}`} key={index}>{`${item.name} (${item.admin_type})`}</option>
                            ))}
                          </select>
                        </td>
                      </td>
                      <td>
                        <select className="form-control" value={state.manager_id + "," + state.manager_type} onChange={(e) => {
                          const [manager_id, manager_type] = e.target.value.split(",");
                          setState((prevState) => ({
                            ...prevState,
                            manager_id,
                            manager_type,
                          }));
                        }} id="manager_id" name="manager_id">
                          <option>Select Manager</option>
                          {(props.adminList || []).map((item, index) => (
                            <option value={`${item.admin_id},${item.admin_type}`} key={index}>{`${item.name} (${item.admin_type})`}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <StyledDropdown
                          options={jsonList.payment_status}
                          value={state.payment_status}
                          onChange={onInputChange}
                          name="payment_status"
                          id="payment_status"
                          status_name={"payment status"}
                          width={"600"}
                          filterItemID={"40"}
                          setFilterListApiCall={setFilterListApiCall}
                        />
                      </td>
                      <td>
                        <TableInput
                          value={state.duplicate_payment}
                          onChange={onInputChange}
                          type="number"
                          id="duplicate_payment"
                          name="duplicate_payment"
                        />
                      </td>
                      <td>
                        {" "}
                        <TableInput
                          value={state.due_date}
                          onChange={onInputChange}
                          type="date"
                          id="due_date"
                          name="due_date"
                        />
                      </td>
                      <td>
                        {" "}
                        <TableInput
                          value={state.payment_method}
                          onChange={onInputChange}
                          type="text"
                          id="payment_method"
                          name="payment_method"
                        />
                      </td>
                      {/* Button Column */}
                      <td style={{ minWidth: "50px", textAlign: "center" }}>
                        {loading === true ? (
                          <button
                            className="btn-sm btn-primary"
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
                        ) :
                          <> <button
                            title="Submit"
                            type="button"
                            className="btn-sm btn-primary"
                            onClick={(e) => AddPaymentRecord(e)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();  // Prevents form submission
                                AddPaymentRecord();
                              }
                            }}
                          >
                            +
                          </button>
                            <button type="button" title="Cancel" onClick={() => {
                              props.setShowAddForm(false)
                              setState(initialFormState)
                              setErrors({})
                            }} className="btn-sm btn-dark mx-2">x</button>
                          </>
                        }
                      </td>
                    </tr>
                  )}
                  {paymentRecordsList.length === 0 ?
                    <tr>
                      <td style={{ minWidth: "150px" }} colSpan={8}>No Data Found</td>
                    </tr> :
                    (paymentRecordsList || []).map((record, index) => (
                      <tr key={index}>
                        <td>
                          <select
                            name="user_id"
                            value={record.user_id + "," + record.user_type}
                            id="user_id"
                            onChange={(e) => handleUpdateChange(e, record.id, "user_id")}
                            className="form-control mt-3"
                          >
                            <option value="">Select Applicant/Client</option>
                            {(props.employeeEmployerlist || []).map((item, index) => {
                              return (
                                <option
                                  className="text-capitalize"
                                  key={index}
                                  value={
                                    item.employee_id
                                      ? `${item.employee_id},employee`
                                      : item.company_id
                                        ? `${item.company_id},employer`
                                        : `${item.id},applicant_type`
                                  }
                                >
                                  {item.employee_id
                                    ? item.name + " (Candidate)"
                                    : item.company_id
                                      ? item.company_name + " (Client)"
                                      : item.title + " (Applicant Type)" || "unknown user"}
                                </option>
                              );
                            })}
                          </select>
                        </td>
                        <td>
                          <select className="form-control" value={record.referred_by_id + "," + record.referred_by_type} id="referred_by_id" onChange={(e) => handleUpdateChange(e, record.id, "referred_by_id")}
                            name="referred_by_id">
                            <option>Select Refer by</option>
                            {(props.adminList || []).map((item, index) => (
                              <option value={`${item.admin_id},${item.admin_type}`} key={index}>{`${item.name} (${item.admin_type})`}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select className="form-control" value={record.manager_id + "," + record.manager_type} id="manager_id" onChange={(e) => handleUpdateChange(e, record.id, "manager_id")}
                            name="manager_id">
                            <option>Select Refer by</option>
                            {(props.adminList || []).map((item, index) => (
                              <option value={`${item.admin_id},${item.admin_type}`} key={index}>{`${item.name} (${item.admin_type})`}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <StyledDropdown
                            options={jsonList.payment_status}
                            value={record.payment_status}
                            onChange={(selectedValue) =>
                              handleUpdateChange(selectedValue, record.id, "payment_status")
                            }
                            name="payment_status"
                            id="payment_status"
                            status_name={"Payment status"}
                            width={"600"}
                            filterItemID={"40"}
                            setFilterListApiCall={setFilterListApiCall}
                          />
                        </td>
                        <td>
                          {" "}
                          <TableInput
                            value={record.duplicate_payment}
                            onChange={(e) => handleUpdateChange(e, record.id, "payment_status")}
                            type="number"
                            id="duplicate_payment"
                            name="duplicate_payment"
                          />
                        </td>
                        <td>
                          {" "}
                          <TableInput
                            value={record.due_date}
                            onChange={(e) => handleUpdateChange(e, record.id, "due_date")}
                            type="date"
                            id="due_date"
                            name="due_date"
                          />
                        </td>
                        <td>
                          {" "}
                          <TableInput
                            value={record.payment_method}
                            onChange={(e) => handleUpdateChange(e, record.id, "payment_method")}
                            type="text"
                            id="payment_method"
                            name="payment_method"
                          />
                        </td>
                        <td className={""} style={{ minWidth: "150px" }}>  <button
                          className="btn  btn-outline-info action_btn "
                          style={{
                            fontSize: "10px",
                            color: "red"
                          }}
                          type="button"
                          onClick={() => {
                            setDeleteAlertPaymentRecordData(record)
                            setDeleteAlertPaymentRecord(true)
                          }
                          }
                          title="Delete Payment Record">
                          <FaTrash />
                        </button></td>
                      </tr>
                    ))}
                </tbody>
              </table>}
            </form>
          </div>

          {/* Pagination Controls */}
          <div className="pt-2">
            <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              total={paymentRecordsList.length}
              count={
                totalData
              }
            />
            <SAlert
              show={deleteAlertPaymentRecord}
              title={props?.employeeEmployerlist ?
                props?.employeeEmployerlist
                  .filter((item) =>
                    item.employee_id
                      ? item.employee_id === deleteAlertPaymentRecordData?.user_id
                      : item.company_id === deleteAlertPaymentRecordData?.user_id
                  )
                  .map((item) => (item.employee_id ? item.name : item.company_name))[0] : "Payment Invoice record"}
              text="Are you Sure you want to delete !"
              onConfirm={() => deletePaymentInoiceRecord(deleteAlertPaymentRecordData?.id)}
              showCancelButton={true}
              onCancel={() => {
                setDeleteAlertPaymentRecord(false)
                setDeleteAlertPaymentRecordData({})
              }}
            />
          </div>
        </div>
      </div>
      {/* <ModalSidebar
                show={showCallLogModal}
                onClose={() => {
                    setShowCallLogModal(false)
                    setTaskId("")
                    setCallLogId("")
                }}
                children={
                    <CommentTaskBox
                        userId={singelCallLogData?.id}
                        taskType={"call_log_chat"}
                        taskUserType={"call_log"}
                        setOpenReplyBox={setShowCallLogModal}
                        openReplyBox={showCallLogModal}
                        taskName={"Discussion for Call log"}
                        TaskId={taskId}
                    />
                }
            >
                {showCallLogModal ? (
                    <CommentTaskBox
                        userId={singelCallLogData?.id}
                        taskType={"call_log_chat"}
                        taskUserType={"call_log"}
                        setOpenReplyBox={setShowCallLogModal}
                        openReplyBox={showCallLogModal}
                        taskName={"Discussion for Call log"}
                        TaskId={taskId}
                    />
                ) : null}
            </ModalSidebar> */}
    </>
  );
};

export default PaymentTable;
