import React, { useState, useEffect } from "react";
import useValidation from "../../common/useValidation";
// import { Modal } from "react-bootstrap";
import { getSingleFollowup, AddFollowup } from "../../../api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Addfollowup(props) {
  let [response, setResponseData] = useState([]);
  let [loading, setLoading] = useState(false);
  let employId = props.employee_id;
  // le/*tjobId*/ = props.job_id;
  /* Functionality to close the modal */
  const close = () => {
    setState(initialFormState);
    setErrors("");
    setLoading(false);
    // props.close();
  };
  // USER FOLLOW UP PROFILE UPDATE VALIDATION

  /* Function to get the Response data*/
  const ResponseData = async () => {
    try {
      const userData = await getSingleFollowup(
        props.employee_id
        // props.job_id
      );
      if (
        userData.data.followup.length === 0 ||
        props.employee_id === "" ||
        props.employee_id === undefined
      ) {
        setResponseData([]);
      } else {
        setResponseData(userData.data.followup);
      }
    } catch (err) {
      console.log("get error", err);
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    }
  };

  /*Render function to get the Response*/
  useEffect(() => {
    if (props.employee_id === undefined /*|| props.job_id === undefined*/) {
    } else {
      ResponseData();
    }
  }, [props]);

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    remark: "",
    next_followup_date: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    remark: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Discription required"
          : value.length < 2
          ? "Discription should have 2 or more letters."
          : "",
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, onInputChange, errors, setErrors, validate } =
    useValidation(initialFormState, validators);

  // USER FOLLOW UP PROFILE UPDATE SUBMIT BUTTON
  const onAminFollowClick = async (event) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        let responseData = await AddFollowup({ state, employId /*,jobId*/ });
        if (responseData.message === "follow up updated successfully") {
          toast.success("Followup Updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          return close();
        }
      } catch (err) {
        toast.error("Something went wrong", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };
  // END USER FOLLOW UP PROFILE UPDATE VALIDATION
  const moment = require("moment");
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
      <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
        {/* <h5 className="text-center pt-2 mb-7">Follow Ups</h5> */}
        <div className="row">
          <div className="activity_container pr-10 col-md-8 border-right">
            {(response || []).map((res) => (
              <div className="single_note mb-5" key={res.id}>
                <small>
                  Created on: {moment(res.created_at).format("YYYY-MM-DD")}
                </small>
                <div className="card p-5">{res.remark}</div>
              </div>
              // <div className="card mt-5 mb-5" key={res.id}>
              //   <div className="card-header d-flex justify-content-space-between px-3 py-1">
              //     <div className="card-head font-size-3 text-dark card_left">
              //       <span className="text-dark"> Posted date: </span>
              //       {moment(res.created_at).format("YYYY-MM-DD")}
              //     </div>
              //     {res.next_followup_date === "0000-00-00" ? null :
              //       <div className="card-head font-size-3 text-dark card_right">
              //         <span className="text-dark"> Next date: </span>
              //         {moment(res.next_followup_date).format("YYYY-MM-DD")}
              //       </div>}
              //   </div>
              //   <div className="card-body p-3">{res.remark}</div>
              // </div>
            ))}
          </div>
          <div className="px-10 py-5 col-md-4">
            <form>
              <div className="form-group col px-0 pr-3">
                <label
                  htmlFor="remark"
                  className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
                >
                  Add New Note: <span className="text-danger">*</span>
                </label>
                <div className="position-relative">
                  <div
                    className={
                      errors.remark
                        ? "border border-danger rounded overflow-hidden"
                        : "border rounded overflow-hidden"
                    }
                  >
                    <textarea
                      name="remark"
                      value={state.remark}
                      onChange={onInputChange}
                      rows={8}
                      style={{ height: "140px" }}
                      className={
                        errors.remark
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                      id="remark"
                      placeholder="Add Note here"
                    ></textarea>
                  </div>
                  {/*----ERROR MESSAGE FOR DESRIPTION----*/}
                  {errors.remark && (
                    <span
                      key={errors.remark}
                      className="text-danger font-size-3"
                    >
                      {errors.remark}
                    </span>
                  )}
                </div>
              </div>
              {/* <div className="form-group ">
              <label
                htmlFor="next_followup_date"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Next Date :
              </label>
              <div className="position-relative">
                <input
                  type="date"
                  placeholder="Next followup date"
                  id="next_followup_date"
                  name="next_followup_date"
                  min={moment().format("YYYY-MM-DD")}
                  value={moment(state.next_followup_date).format("YYYY-MM-DD")}
                  onChange={onInputChange}
                  onKeyDownCapture={(e) => e.preventDefault()}
                  className={
                    errors.next_followup_date
                      ? "form-control coustam_datepicker border border-danger"
                      : "form-control coustam_datepicker"
                  }
                />
                {/*----ERROR MESSAGE FOR next_followup_date----
                {errors.next_followup_date && (
                  <span
                    key={errors.next_followup_date}
                    className="text-danger font-size-3"
                  >
                    {errors.next_followup_date}
                  </span>
                )}
              </div>
            </div> */}
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
                    onClick={(e) => onAminFollowClick(e)}
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
      </div>
      {/* </Modal> */}
    </>
  );
}

export default Addfollowup;
