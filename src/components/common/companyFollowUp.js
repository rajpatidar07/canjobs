import React, { useState, useEffect } from "react";
import useValidation from "./useValidation";
import { getSingleCompanyFollowup, AddCompanyFollowup } from "../../api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextEditor from "./TextEditor";
import ConvertTime from "./ConvertTime";

function AddCompanyfollowup(props) {
  let [response, setResponseData] = useState([]);
  let [loading, setLoading] = useState(false);
  let cid = props.company_id;
  let user_type = localStorage.getItem("userType");
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
      const userData = await getSingleCompanyFollowup(
        props.company_id
        // props.job_id
      );
      if (
        userData.data.length === 0 ||
        props.company_id === "" ||
        props.company_id === undefined
      ) {
        setResponseData([]);
      } else {
        setResponseData(userData.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /*Render function to get the Response*/
  useEffect(() => {
    if (props.company_id === undefined /*|| props.job_id === undefined*/) {
    } else {
      ResponseData();
    }
    // eslint-disable-next-line
  }, [props]);

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    remark: "",
    next_date: "",
    company_id: cid,
    subject: "",
    status: "",
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
    subject: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Subject required"
          : value.length < 2
            ? "Subject should have 2 or more letters."
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
        let responseData = await AddCompanyFollowup(state);
        if (responseData.message === "follow up updated successfully") {
          toast.success("Followup Updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          return close();
        }
      } catch (err) {
        console.log(err);
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
      

      <div className="bg-white rounded h-100 px-10 overflow-y-hidden">
        {/* <h5 className="text-center pt-2 mb-7">Follow Ups</h5> */}
        <div className="row">
          <div
            className={`activity_container ${user_type === "company" ? "col-md-12" : "col-md-8 border-right"
              } p-10`}
          >
            {response.length === (0 || "0") ? (
              <div className="single_note mb-5">
                <div className="d-flex justify-content-center">
                  <p className="text-italic font-size-3 m-0">No Data Found</p>
                </div>
              </div>
            ) : (
              (response || []).map((res, index) => (
                <div className="single_note mb-5" key={index}>
                  <div className="d-flex justify-content-between">
                    <p className="text-italic font-size-3 m-0">
                      Created on:
                      <ConvertTime _date={res.created_at} format={"Do MM YYYY, h:mm:ss a"} />
                      {/* {moment(res.created_at).format("Do MM YYYY, h:mm:ss a")} */}
                    </p>
                  </div>
                  <div className="card rounded-3 py-2 px-5">
                    <p className="fw-bold m-0">
                      <b>{res.subject}</b>
                    </p>
                    <p className="m-0">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: res.remark,
                        }}
                      /></p>
                  </div>
                </div>
              ))
            )}
          </div>
          <form className={user_type === "admin" ? "col-md-4 p-10" : "d-none"}>
            <div className="form-group col px-0 pr-3">
              <label
                htmlFor="subject"
                className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
              >
                Subject: <span className="text-danger">*</span>
              </label>
              <div className="position-relative">
                <input
                  maxLength={20}
                  name="subject"
                  value={state.subject || ""}
                  onChange={onInputChange}
                  type="text"
                  className={
                    errors.subject
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="subject"
                  id="subject"
                />
              </div>
              {/*----ERROR MESSAGE FOR name----*/}
              {errors.subject && (
                <span key={errors.subject} className="text-danger font-size-3">
                  {errors.subject}
                </span>
              )}
            </div>

            <div className="form-group col px-0 pr-3">
              <label
                htmlFor="subject"
                className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
              >
                Status:
              </label>
              <div className="position-relative">
                <select
                  name="status"
                  value={state.status || ""}
                  onChange={onInputChange}
                  type="text"
                  className={
                    errors.status
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="status"
                  id="status"
                >
                  <option value={""}>Select Status</option>
                  <option value={1}>Private</option>
                </select>
              </div>
              {/*----ERROR MESSAGE FOR name----*/}
              {errors.status && (
                <span key={errors.status} className="text-danger font-size-3">
                  {errors.status}
                </span>
              )}
            </div>
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
                  <TextEditor
                    setState={setState}
                    state={state}
                    page={"FollowUp"} />
                  {/* <textarea
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
                  ></textarea> */}
                </div>
                {/*----ERROR MESSAGE FOR DESRIPTION----*/}
                {errors.remark && (
                  <span key={errors.remark} className="text-danger font-size-3">
                    {errors.remark}
                  </span>
                )}
              </div>
            </div>
            <div className="form-group col px-0 pr-3">
              <label
                htmlFor="next_date"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Next Date :
              </label>
              <div className="position-relative">
                <input
                  type="date"
                  placeholder="Next followup date"
                  id="next_date"
                  name="next_date"
                  min={moment().format("DD-MM-YYYY")}
                  value={state.next_date}
                  onChange={onInputChange}
                  onKeyDownCapture={(e) => e.preventDefault()}
                  className={
                    errors.next_date
                      ? "form-control coustam_datepicker border border-danger"
                      : "form-control coustam_datepicker"
                  }
                />
                {/*----ERROR MESSAGE FOR next_date----*/}
                {errors.next_date && (
                  <span
                    key={errors.next_date}
                    className="text-danger font-size-3"
                  >
                    {errors.next_date}
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

    </>
  );
}

export default AddCompanyfollowup;
