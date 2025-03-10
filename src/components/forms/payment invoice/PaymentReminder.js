import React from "react";
import { Modal } from "react-bootstrap";
import { SendPaymentInvoiceReminderApi } from "../../../api/api"
import useValidation from "../../common/useValidation";
const PaymentReminder = (props) => {
  let admin_id = localStorage.getItem("admin_id");
  let admin_type = localStorage.getItem("admin_type")
  const initialFormState = {
    due_date: "",
    due_amount: "",
    id: props.invoiceData.id,
    sender_id: admin_id,
    sender_type: admin_type,
  };
  const { state, setState, onInputChange, /*errors, validate*/ } = useValidation(
    initialFormState,);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", state);
    try {
      let res = await SendPaymentInvoiceReminderApi(state)
      if (res.data.message === "success") {
        setState(initialFormState)
        props.close()
      }
    } catch (err) {
      console.log(err)

    }
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
        <form onSubmit={handleSubmit} className="p-4" >
          {/* Date Field */}
          <div className="form-group">
            <label
              for="date"
              className="font-weight-semibold font-size-4 text-black-2 line-height-reset"
            >
              Date:
              <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              className="form-control"
              name="due_date"
              value={state.due_date}
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
            <button className="btn btn-primary">send</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default PaymentReminder;
