import React from "react";
import PaymentTableData from "../json/PaymentTableJson.json";
// import TableInput from "../common/TableInput";
import StyledDropdown from "../common/StyledDropDown";
import TableInput from "../common/TableInput";

const PaymentTable = () => {
  const records = PaymentTableData.records;

  const paymentStatus = PaymentTableData.paymentStatusOptions;

  const handleUpdateChange = (e, id, field) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    let data = {
      id: id,
      [field]: e.target.value,
    };

    console.log(data);
  };

  const onInputChange = (e, id, field) => {
    console.log("onchange", e.target.value);
  };
  return (
    <>
      <div className="mb-18 height-100">
        <div className="mb-4 align-items-center">
          <div className="page___heading">
            <h3 className="font-size-6 mb-0">Call Log</h3>
          </div>
        </div>

        <div
          className={"bg-white shadow-8 datatable_div pt-7 rounded pb-9 px-5"}
        >
          <div className="table-responsive">
            <form>
              <table className="table table-striped main_data_table text-center align-middle">
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
                      // "Action Taken",
                    ].map((heading, index) => (
                      <th
                        key={index}
                        className="border-0 font-size-3 font-weight-normal"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {records.map((record, index) => (
                    <tr key={index}>
                      <td>
                        <TableInput
                          value={record.name}
                          onChange={onInputChange}
                          type="text"
                          id="name"
                          name="name"
                        />
                        {/* {errors.name && (
                          <span key={errors.name} className="text-danger font-size-3">
                            {errors.name}
                          </span>
                        )} */}
                      </td>
                      <td>
                        {" "}
                        <TableInput
                          value={record.referredBy}
                          onChange={onInputChange}
                          type="text"
                          id="name"
                          name="name"
                        />
                      </td>
                      <td>
                        <TableInput
                          value={record.manager}
                          onChange={onInputChange}
                          type="text"
                          id="name"
                          name="name"
                        />
                      </td>

                      {/* <td>{record.paymentStatus}</td> */}
                      <td>
                        <StyledDropdown
                          options={paymentStatus}
                          value={record.paymentStatus}
                          onChange={(selectedValue) =>
                            handleUpdateChange(selectedValue, 1, "status")
                          }
                          name="status"
                          id="status"
                          status_name={"Status"}
                          width={"600"}
                          // filterItemID={"36"}
                        />
                      </td>

                      <td>
                        {" "}
                        <TableInput
                          value={record.dupPayment}
                          onChange={onInputChange}
                          type="text"
                          id="name"
                          name="name"
                        />
                      </td>
                      <td>
                        {" "}
                        <TableInput
                          value={record.dueDate}
                          onChange={onInputChange}
                          type="text"
                          id="name"
                          name="name"
                        />
                      </td>
                      <td>
                        {" "}
                        <TableInput
                          value={record.method}
                          onChange={onInputChange}
                          type="text"
                          id="name"
                          name="name"
                        />
                      </td>
                      {/* <td>{record.email}</td>
                    <td>{record.callBackDate}</td>
                    <td>{record.additionalNotes}</td>
                    <td>{record.actionTaken}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </form>
          </div>

          {/* Pagination Controls */}
          {/* <div className="pt-2">
                        <Pagination
                            nPages={nPages}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            total={callLogData.length}
                            count={
                                totalData
                            }
                        />
                    </div> */}
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
