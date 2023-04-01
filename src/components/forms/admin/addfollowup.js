import React, { useState, useEffect } from "react";
import { CKEditor } from "ckeditor4-react";
import useValidation from "../../common/useValidation";
import { Modal } from "react-bootstrap";
import { getSingleFollowup, AddFollowup } from "../../../api/api";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Addfollowup(props) {
  let [response, setResponseData] = useState([]);
  let [employId, setEmployeId] = useState();
  let [adminId, setAdminId] = useState();
  let [jobId, setJobId] = useState();
  const close = () => {
    setState(initialFormState);
    setErrors("");
    props.close();
  };
  // USER FOLLOW UP PROFILE UPDATE VALIDATION

  /* Function to get the Response data*/
  const ResponseData = async () => {
    const userData = await getSingleFollowup();
    setResponseData(userData.data);
    setEmployeId(userData.data[0].employee_id);
    setAdminId(userData.data[0].admin_id);
    setJobId(userData.data[0].job_id);
  };

  /*Render function to get the Response*/
  useEffect(() => {
    ResponseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.show]);

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    remark: "",
    next_followup_date: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    remark: [
      (value) =>
        value === "" || value.trim() === "" ? "Discription required" : null,
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, onInputChange, errors, setErrors, validate } =
    useValidation(initialFormState, validators);

  // USER FOLLOW UP PROFILE UPDATE SUBMIT BUTTON
  const onAminFollowClick = async (event) => {
    event.preventDefault();
    if (validate()) {
      let responseData = await AddFollowup({ state, employId, adminId, jobId });
      if (responseData.message === "follow up updated successfully") {
        toast.success("Followup Updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        return close();
      }
    }
  };
  // END USER FOLLOW UP PROFILE UPDATE VALIDATION
  return (
    <>
      <ToastContainer />
      <Modal
        show={props.show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <button
          type="button"
          className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper "
          data-dismiss="modal"
          onClick={props.close}
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
          <h5 className="text-center pt-2">Add Follow Up</h5>
          <form onSubmit={onAminFollowClick} className="pt-5">
            <div className=" col px-0 pr-3 pb-5 mb-5">
              {(response || []).map((res) => (
                <div className="d-flex justify-content-between" key={res.id}>
                  {moment(res.created_at).format("YYYY-MM-DD")}
                  <ul>
                    <li>{res.remark}</li>
                  </ul>
                </div>
              ))}
            </div>
            <div className="form-group col px-0 pr-3">
              <label
                htmlFor="remark"
                className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
              >
                Discription : <span className="text-danger">*</span>
              </label>
              <div className="position-relative">
                <div
                  sm="6"
                  className={
                    errors.remark
                      ? "border border-danger rounded overflow-hidden"
                      : "border rounded overflow-hidden"
                  }
                >
                  {/* <CKEditor
                    type={"classic"}
                    name={"remark"}
                    id={"remark"}
                    data={state.remark}
                    value={state.remark}
                    onChange={onInputChange}
                    initData="Add Discription"
                  /> */}
                  <textarea
                    name="remark"
                    value={state.remark}
                    onChange={onInputChange}
                    className={
                      errors.remark
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    id="remark"
                  ></textarea>
                </div>
                {/*----ERROR MESSAGE FOR DESRIPTION----*/}
                {errors.remark && (
                  <span key={errors.remark} className="text-danger font-size-3">
                    {errors.remark}
                  </span>
                )}
              </div>
            </div>
            <div className="form-group col-md-6">
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
                  value={state.next_followup_date}
                  onChange={onInputChange}
                  className={
                    errors.next_followup_date
                      ? "form-control border border-danger"
                      : "form-control"
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
              <button
                className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default Addfollowup;
