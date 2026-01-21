import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { SendPaymentInvoiceReminderApi } from "../../../api/api"
import useValidation from "../../common/useValidation";
import { toast } from "react-toastify";
import EmailSelectionModal from "../../common/EmailSelectionModal";
const PaymentReminder = (props) => {
  const [loading, setLoading] = useState(false)
  let [selectedEmail, setSelectedEmail] = useState(props.userEmail || "")
  let [showEmailModal, setShowEmailModal] = useState(false)
  let admin_id = localStorage.getItem("admin_id");
  let admin_type = localStorage.getItem("admin_type")
  const initialFormState = {
    due_date: props.invoiceData.due_date,
    due_amount: props.invoiceData.due_amount,
    id: props.invoiceData.id,
    sender_id: admin_id,
    sender_type: admin_type,
    folderId: props.folderId,
    user_name: props.userName,
  };
  const { state, setState, onInputChange, /*errors, validate*/ } = useValidation(
    initialFormState,);

  const handleSubmit = async (e, email) => {
    e.preventDefault();
    // setLoading(true)
    try {
      let data = {
        ...state,
        user_email: email ? email : selectedEmail,
      }
      let res = await SendPaymentInvoiceReminderApi(data)
      if (res.data.message === "success") {
        toast.success("Reminder sent successfully.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setState(initialFormState)
        setLoading(false)
        setShowEmailModal(false);
        props.close()
      } else {
        setLoading(false)
      }
    } catch (err) {
      console.log(err)
      setLoading(false)

    }
  };
  /*Function to handle sending with selected email */
  const handleSendWithEmail = async (email) => {
    setState({ ...state, user_email: email });
    setSelectedEmail(email);

    
    // await handleSubmit({ preventDefault: () => { } }, email);

  };

  return (
    <Modal
      show={props.show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      background="rgba(255, 255, 255, 1)"
    >
      <button
        type="button"
        className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
        data-dismiss="modal"
        onClick={() => props.close()}
      >
        <i className="fas fa-times"></i>
      </button>

      <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
        <h5 className="text-center mt-5">Payment Reminder</h5>
        <form className="p-4" >
          {/* Date Field */}
          <div className="form-group">
            <label
              htmlFor="date"
              className="font-weight-semibold font-size-4 text-black-2 line-height-reset"
            >
              Date:
              <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              className="form-control"
              name="due_date"
              value={state.due_date ? state.due_date.split(' ')[0] : ''}
              onChange={onInputChange}
              required
            />
          </div>

          {/* Amount Field */}
          <div className="form-group">
            <label className="font-weight-semibold font-size-4 text-black-2 line-height-reset">
              Amount: <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              className="form-control"
              name="due_amount"
              value={state.due_amount}
              onChange={onInputChange}
              required
            />
          </div>

          {/* Invoice PDF Upload */}
          {/* <div className="form-group d-none">
            <label className="font-weight-semibold font-size-4 text-black-2 line-height-reset">
              Invoice pdf:
            </label>
            <input
              type="file"
              className="form-control"
              accept=".pdf"
              onChange={handleFileChange}
              required
            />
          </div> */}

          {/* Submit & Cancel Buttons */}
          <div className="d-flex justify-content-center gap-2">
            <button className="btn btn-primary" type="button" disabled={loading} onClick={() => setShowEmailModal(true)}>{loading ? "Sending..." : "Send"}</button>
          </div>
        </form>
      </div>
      <EmailSelectionModal
        show={showEmailModal}
        onHide={() => setShowEmailModal(false)}
        userEmail={props.userEmail}
        userSecondaryEmail={props.userSecondaryEmail}
        selectedEmail={selectedEmail}
        onSelectEmail={handleSendWithEmail}
        title={"Select Email to Send Reminder"}
        handleSubmit={handleSubmit}
      />
    </Modal>
  );
};

export default PaymentReminder;
