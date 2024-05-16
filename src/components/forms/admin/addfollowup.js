import React, { useState, useEffect } from "react";
import useValidation from "../../common/useValidation";
// import { Modal } from "react-bootstrap";
import {/* getSingleFollowup*/getAllUsersFollowUpData, AddAllUserFollowup /*AddFollowup*/ } from "../../../api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import TextEditor from "../../common/TextEditor";

function Addfollowup(props) {
  let [response, setResponseData] = useState([]);
  let [loading, setLoading] = useState(false);
  /* Shorting states */
  const [columnName, setcolumnName] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("DESC");
  // let employId = props.employee_id;
  let user_type = localStorage.getItem("userType");
  let adminId = localStorage.getItem("admin_id")
  let adminType = localStorage.getItem("admin_type")
  // USER FOLLOW UP PROFILE UPDATE VALIDATION

  /* Function to get the Response data*/
  const ResponseData = async () => {
    try {
      /*only for employee*/
      // const userData = await getSingleFollowup(
      //   props.employee_id !== "" ? props.employee_id : null,
      //   columnName,
      //   sortOrder
      //   // props.job_id
      // );
      /*For All user*/
      const userData = await getAllUsersFollowUpData(props.userId, props.userType, columnName, sortOrder)
      if (
        userData.data === null ||
        userData.data === undefined ||
        userData.data === "undefined" ||
        userData.data === "" ||
        userData.data.length === 0
        // ||
        // props.employee_id === "" ||
        // props.employee_id === undefined
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
    // if (props.userId === undefined || !props.userId/*|| props.job_id === undefined*/) {
    // } else {
    ResponseData();
    // }
    if (props.noteNotification) {
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
    // eslint-disable-next-line
  }, [props, sortOrder]);

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    /*only for employee*/
    // remark: "",
    next_followup_date: "",
    // subject: "",
    // employee_id: employId,
    // status: "",
    // For all user
    "admin_id": adminId,
    "user_id": props.userId,
    "user_type": props.userType,
    "remark": "",
    "next_date": "",
    "subject": "",
    "status": "",
    "assigned_by_id": props.assigned_by_id,
    "assigned_by_type": adminType
  };
  // VALIDATION CONDITIONS
  const validators = {
    subject: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "subject required"
          : value.length < 2
            ? "subjectz should have 2 or more letters."
            : "",
    ],
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

  /* Functionality to close the modal */
  const close = () => {
    setState(initialFormState);
    setErrors("");
    setLoading(false);
    // props.close();
  };

  // USER FOLLOW UP PROFILE UPDATE SUBMIT BUTTON
  const onAminFollowClick = async (event) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      if (!props.assigned_by_id) {
        toast.error("Please assign the admin first!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        setLoading(false);
        setState(initialFormState);
      } else {
        try {
          /*only for employee*/
          // let responseData = await AddFollowup(state);
          /*For all user*/
          let responseData = await AddAllUserFollowup(state);
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
      }
    } else {
      setLoading(false);
    }
  };
  // END USER FOLLOW UP PROFILE UPDATE VALIDATION
  const moment = require("moment");
  /*Sorting Function */
  const handleSort = (columnName) => {
    setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
    setcolumnName(columnName);
    // setCurrentPage(1);
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

      {/* <h5 className="text-center pt-2 mb-7">Follow Ups</h5> */}
      {props.userId !== "" ? (
        <div className="bg-white rounded h-100vh px-11 py-7 overflow-y-hidden">
          <div className="row">
            <div
              className={`activity_container pr-10 ${user_type === "admin"|| user_type === "agent" ? "col-md-8 border-right" : "col-md-12"
                }`}
            >
              {/* {console.log(response)} */}
              {response.length === 0 || !response ? (
                <div className="single_note mb-5">
                  <div className="d-flex justify-content-center">
                    <p className="text-italic font-size-3 m-0">No Data Found</p>
                  </div>
                </div>
              ) : (
                (response || []).map((res) => (
                  <div className="single_note mb-5" key={res.id}>
                    <div className="card p-2">
                      <div className="m-0 d-flex justify-content-between align-items-center">
                        <b className="font-size-4 font-weight-bold text-dark">
                          {res.subject}
                        </b>
                        <i className="font-size-2">
                          Created on:
                          {moment(res.created_at).format(
                            "Do MMM YYYY, h:mm:ss a"
                          )}
                        </i>
                      </div>
                      <p className="font-size-4 m-0">
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
            <div
              className={
                user_type === "admin" || user_type === "agent" ? "px-10 py-5 col-md-4" : "d-none"
              }
            >
              <form>
                <div className="form-group col px-0 pr-3">
                  <label
                    htmlFor="subject"
                    className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
                  >
                    Subject: <span className="text-danger">*</span>
                  </label>
                  <div className="position-relative">
                    <input
                      maxLength={60}
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
                    <span
                      key={errors.subject}
                      className="text-danger font-size-3"
                    >
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
                      <option value={0}>Normal</option>
                      <option value={1}>Private</option>
                    </select>
                  </div>
                  {/*----ERROR MESSAGE FOR name----*/}
                  {errors.status && (
                    <span
                      key={errors.status}
                      className="text-danger font-size-3"
                    >
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
                      <span
                        key={errors.remark}
                        className="text-danger font-size-3"
                      >
                        {errors.remark}
                      </span>
                    )}
                  </div>
                </div>
                <div className="form-group col px-0 pr-3">
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
                      min={moment().format("DD-MM-YYYY")}
                      value={state.next_followup_date}
                      onChange={onInputChange}
                      onKeyDownCapture={(e) => e.preventDefault()}
                      className={
                        errors.next_followup_date
                          ? "form-control coustam_datepicker border border-danger"
                          : "form-control coustam_datepicker"
                      }
                    />
                    {/*----ERROR MESSAGE FOR next_followup_date----*/}
                    {errors.next_followup_date && (
                      <span
                        key={errors.next_followup_date}
                        className="text-danger font-size-3"
                      >
                        {errors.next_followup_date}
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
        </div>
      ) : (
        <div className="table-responsive main_table_div">
          <table className="table table-striped main_data_table">
            <thead>
              <tr>
                <th
                  scope="col"
                  className=" border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    to={""}
                    onClick={() => {
                      handleSort("employee_name");
                    }}
                    className="text-gray"
                    title="Sort by Description"
                  >
                    Name
                  </Link>
                </th>
                <th
                  scope="col"
                  className=" border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    to={""}
                    onClick={() => {
                      handleSort("subject");
                    }}
                    className="text-gray"
                    title="Sort by Description"
                  >
                    Subject
                  </Link>
                </th>
                <th
                  scope="col"
                  className=" border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    to={""}
                    onClick={() => {
                      handleSort("remark");
                    }}
                    className="text-gray"
                    title="Sort by Description"
                  >
                    Note
                  </Link>
                </th>
                <th
                  scope="col"
                  className=" border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    to={""}
                    onClick={() => {
                      handleSort("created_at");
                    }}
                    className="text-gray"
                    title="Sort by Description"
                  >
                    Added date
                  </Link>
                </th>
                <th
                  scope="col"
                  className=" border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    to={""}
                    onClick={() => {
                      handleSort("next_followup_date");
                    }}
                    className="text-gray"
                    title="Sort by Description"
                  >
                    Next Date
                  </Link>
                </th>
                <th
                  scope="col"
                  className=" border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    to={""}
                    onClick={() => {
                      handleSort("status");
                    }}
                    className="text-gray"
                    title="Sort by Description"
                  >
                    Status
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                response.map((item) => item.status === "1") ?
                  (response || []).map(
                    (res) =>
                      res.status === "1" && (
                        <tr key={res.id}>
                          <td>
                            <Link
                              className="d-flex align-items-center"
                              to={`/${res.user_id}`}
                            >
                              <div className="d-flex profile_box gx-2">
                                <div className="media  align-items-center">
                                  <div className="circle-30 mx-auto overflow-hidden">
                                    <img
                                      src={
                                        res.profile_photo === "" ||
                                          res.profile_photo === null ||
                                          res.profile_photo === undefined
                                          ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                                          : res.profile_photo
                                      }
                                      alt=""
                                      className="w-100"
                                    />
                                  </div>
                                </div>
                                <div className=" mb-0">
                                  {res.name === "" ||
                                    res.name === "null" ||
                                    res.name === null ||
                                    res.name === undefined ? (
                                    <p className="font-size-3 mb-0">N/A</p>
                                  ) : (
                                    <p
                                      className="m-0 text-black-2 font-weight-bold text-capitalize text-truncate"
                                      title={res.name}
                                    >
                                      {res.name}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </Link>
                          </td>
                          <td>
                            {res.subject === "" ||
                              res.subject === "null" ||
                              res.subject === null ||
                              res.subject === undefined ? (
                              <p className="font-size-3 mb-0">N/A</p>
                            ) : (
                              <p
                                className="m-0 text-black-2 font-weight-bold text-capitalize text-truncate"
                                title={res.subject}
                              >
                                {res.subject}
                              </p>
                            )}
                          </td>
                          <td>
                            {res.remark === "" ||
                              res.remark === "null" ||
                              res.remark === null ||
                              res.remark === undefined ? (
                              <p className="font-size-3 mb-0">N/A</p>
                            ) : (
                              <p className="m-0 text-black-2 font-weight-bold text-capitalize  text-truncate"
                                dangerouslySetInnerHTML={{
                                  __html: res.remark
                                }} />

                            )}
                          </td>
                          <td>
                            {res.created_at === "" ||
                              res.created_at === "null" ||
                              res.created_at === null ||
                              res.created_at === undefined ? (
                              <p className="font-size-3 mb-0">N/A</p>
                            ) : (
                              <small>{moment(res.created_at).calendar()}</small>
                            )}
                          </td>
                          <td>
                            {res.next_followup_date === "" ||
                              res.next_followup_date === "null" ||
                              res.next_followup_date === null ||
                              res.next_followup_date === undefined ? (
                              <p className="font-size-3 mb-0">N/A</p>
                            ) : (
                              <small>
                                {moment(res.next_followup_date).format("MMM Do YY")}
                              </small>
                            )}
                          </td>
                          <td>
                            {res.status === "" ||
                              res.status === "null" ||
                              res.status === null ||
                              res.status === undefined ? (
                              <p className="font-size-3 mb-0"></p>
                            ) : (
                              <small>{res.status === "1" ? "Private" : ""}</small>
                            )}
                          </td>
                        </tr>
                      )

                  ) : <tr className="text-center">
                    <th colSpan={6}>No data found</th>
                  </tr>}
            </tbody>
          </table>
        </div>
      )}

      {/* </Modal> */}
    </>
  );
}

export default Addfollowup;
