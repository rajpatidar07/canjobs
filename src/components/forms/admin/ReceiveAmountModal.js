import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
import { toast } from "react-toastify";
import { AddUpdatePaymentInvoiceApi } from "../../../api/api";

export default function ReceiveAmountModal(props) {
  const [recAmt, setRecAmt] = useState("");
  const [loading, setLoading] = useState(false);

  const initialFormState = {
    received_amount: "",
  };

  const validators = {
    received_amount: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Received amount is required"
          : "",
    ],
  };
  /*Function to close the modal */
  let close = () => {
    props.close();
    setState(initialFormState);
    setLoading(false);
    setRecAmt("");
  };

  const { setState, errors, setErrors } =
    useValidation(initialFormState, validators);

  const [prevReceived, setPrevReceived] = useState(0);
  const [originalDue, setOriginalDue] = useState(0);
  const [totalReceived, setTotalReceived] = useState(0);
  const [remainingDue, setRemainingDue] = useState(0);

  useEffect(() => {
    if (props.singleInvoiceData) {
      const receivedAmt = props.singleInvoiceData.received_amount
        ? Number(props.singleInvoiceData.received_amount)
        : 0;
      const dueAmt = props.singleInvoiceData.due_amount
        ? Number(props.singleInvoiceData.due_amount)
        : 0;
      setPrevReceived(receivedAmt);
      setOriginalDue(dueAmt);
      setRemainingDue(dueAmt);
      setTotalReceived(receivedAmt);
    }
  }, [props.singleInvoiceData]);

  useEffect(() => {
    const newReceived = Number(recAmt) || 0;

    const updatedTotalReceived = prevReceived + newReceived;
    const updatedRemainingDue = originalDue - updatedTotalReceived;

    setTotalReceived(updatedTotalReceived);
    setRemainingDue(updatedRemainingDue >= 0 ? updatedRemainingDue : 0);
  }, [recAmt, prevReceived, originalDue]);

  const handleSave = async () => {
    if (!recAmt) {
      setErrors({
        ...errors,
        received_amount: "Received amount is required"
      });
      return;
    }
    const amountNum = Number(recAmt);
    if (amountNum > remainingDue + amountNum) {
      setErrors({
        ...errors,
        received_amount: "Received amount cannot exceed the due amount.",
      });
      return;
    }
    try {
      let data = {
        id: props.singleInvoiceData.id,
        due_amount: remainingDue,
        received_amount: totalReceived,
      };
      setLoading(true);
      let res = await AddUpdatePaymentInvoiceApi(data)
      if (res.data.status === 1 || res.data.status === "1") {
        toast.success("Payment invoice Created successful", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        close();
        props.setApiCall(true);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Modal   show={props.show}
      size={"md"}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      background="rgba(255, 255, 255, 1)">
      <button
        type="button"
        className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
        data-dismiss="modal"
        onClick={close}
      >
        <i className="fas fa-times"></i>
      </button>
      <div className="px-11 py-7 bg-white rounded-3">
        <Modal.Header closeButton>
          <Modal.Title>Add Received Amount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <strong>Previous Received Amount:</strong> {prevReceived.toFixed(2)}
          </div>
          <div>
            <strong>Current Due Amount:</strong> {originalDue.toFixed(2)}
          </div>
          <div className="form-group mt-3">
            <label htmlFor="received_amount">Add Received Amount:</label>
            <input
              type="number"
              id="received_amount"
              name="received_amount"
              className={`form-control ${errors.received_amount ? "border border-danger" : ""}`}
              min="0"
              step="0.01"
              value={recAmt}
              onChange={(e) => setRecAmt(e.target.value)}
              placeholder="Enter amount"
            />
            {errors.received_amount && (
              <small className="text-danger">{errors.received_amount}</small>
            )}
          </div>
          <div className="mt-3">
            <strong>Total Received Amount (including new):</strong> {totalReceived.toFixed(2)}
          </div>
          <div>
            <strong>Remaining Due Amount (after new):</strong> {remainingDue.toFixed(2)}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-light" onClick={close}>
            Close
          </button>
          <button className="btn btn-primary" disabled={loading} onClick={handleSave}>
            {loading ? "Saving..." : "Save Amount"}
          </button>
        </Modal.Footer>
      </div>
    </Modal>
  );
}
