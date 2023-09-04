import React, { useState } from "react";
import useValidation from "../../common/useValidation";
import moment from "moment";
import { ToastContainer } from "react-toastify";
export default function PayentForm() {
  const [loading, setLoading] = useState(false);

  const initialFormState = {
    amount: "",
    method: "",
  };
  const validators = {
    amount: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "amount is required"
          : "",
    ],
    method: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "method is required"
          : "",
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, onInputChange, errors, setErrors, validate } =
    useValidation(initialFormState, validators);
  /*Function to made payment*/
  const onPayentClick = () => {
    console.log("hello payment");
  };
  return (
    <>
      <ToastContainer />
      {/* <Modal
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    > 
      <button
        type="button"
        className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper "
        data-dismiss="modal"
        onClick={close}
      >
        <i className="fas fa-times"></i>
      </button>*/}
      <div className="bg-white rounded h-100 px-10 overflow-y-hidden">
        {/* <h5 className="text-center pt-2 mb-7">Follow Ups</h5> */}
        <div className="row">
          <div className="activity_container col-md-8 border-right p-10">
            {/* {response.length === 0 ? */}
            {/* <div className="single_note mb-5">
              <div className="d-flex justify-content-center">
                <p className="text-italic font-size-3 m-0">
                  No Data Found
                </p>
              </div>
            </div> : */}
            {/* //   (response || []).map((res, index) => ( */}
            <div className="single_note mb-5">
              <div className="d-flex justify-content-between">
                <p className="text-italic font-size-3 m-0">
                  Payment on: {moment().format("Do MM YYYY, h:mm:ss a")}
                </p>
              </div>
              <div className="card rounded-3 py-2 px-5">
                <p className="fw-bold m-0">
                  <b>Cash</b>
                </p>
                <p className="m-0">1500/-</p>
              </div>
            </div>
            {/* //   ))} */}
          </div>
          <form className="col-md-4 p-10">
            <div
              className={`sub-stage text-capitalize`}
              //   onClick={() => handleSubStageSelection(expandedStatus, subStage)}
            >
              <input
                type="radio"
                className="mx-2"
                // checked={(selectedStatus || []).some(
                //   (item) => item.substage === subStage
                // )}
                readOnly
              />
              Cash
            </div>
            <div
              className={`sub-stage text-capitalize`}
              //   onClick={() => handleSubStageSelection(expandedStatus, subStage)}
            >
              <input
                type="radio"
                className="mx-2"
                // checked={(selectedStatus || []).some(
                //   (item) => item.substage === subStage
                // )}
                readOnly
              />
              Paypal
            </div>
            <div className="m-3">
              <label
                htmlFor="amount"
                className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
              >
                Amount: <span className="text-danger">*</span>
              </label>
              <div className="position-relative">
                <div
                  className={
                    errors.amount
                      ? "border border-danger rounded overflow-hidden"
                      : "border rounded overflow-hidden"
                  }
                >
                  <input
                    name="amount"
                    value={state.amount}
                    onChange={onInputChange}
                    type="number"
                    className={
                      errors.amount
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    id="amount"
                  ></input>
                </div>
                {/*----ERROR MESSAGE FOR DESRIPTION----*/}
                {errors.amount && (
                  <span key={errors.amount} className="text-danger font-size-3">
                    {errors.amount}
                  </span>
                )}
              </div>
            </div>
            <div className="form-group text-center">
              {loading === true ? (
                <button
                  className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
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
              ) : (
                <button
                  onClick={(e) => onPayentClick(e)}
                  className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                  type="button"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      {/* </Modal> */}
    </>
  );
}
