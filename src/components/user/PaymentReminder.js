import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const PaymentReminder = ({ openPaymentReminder, setOpenPaymentReminder }) => {
  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    user: "",
    invoice: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, invoice: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setOpenPaymentReminder(false); // Close the modal after submission
  };

  return (
    <Modal
      show={openPaymentReminder}
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
        onClick={() => setOpenPaymentReminder(false)}
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
              name="date"
              value={formData.date}
              onChange={handleChange}
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
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>

          {/* User Field */}
          <div className="form-group">
            <label className="font-weight-semibold font-size-4 text-black-2 line-height-reset ">
              User: <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="user"
              value={formData.user}
              onChange={handleChange}
              required
            />
          </div>

          {/* Invoice PDF Upload */}
          <div className="form-group">
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
          </div>

          {/* Submit & Cancel Buttons */}
          <div className="d-flex justify-content-center gap-2">
           <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default PaymentReminder;
