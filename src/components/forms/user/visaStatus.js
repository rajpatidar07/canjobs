import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
// import { CKEditor } from "ckeditor4-react";
import { AddUpdateVisa } from "../../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FilterJson from "../../json/filterjson";
export default function VisaStatus(props) {
  const [loading, setLoading] = useState(false);
  // USER PERSONAL DETAIL VALIDATION
  // INITIAL STATE ASSIGNMENT
  const initialFormStateuser = {
    status: props.employeeData.visa_status,
    country: props.employeeData.visa_country,
  };
  /* Functionality to close the modal */

  const close = () => {
    setState(initialFormStateuser);
    setErrors("");
    setLoading(false);
    props.close();
  };

  // VALIDATION CONDITIONS

  const validators = {
    status: [
      (value) =>
        value === "" || value === null ? "Visa is required" : null,
    ],
  };

  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, onInputChange, errors, validate, setErrors } =
    useValidation(initialFormStateuser, validators);
  // API CALL
  // const UserData = async () => {
  //   const userData = await EmployeeDetails(props.employeeId);
  //   if (userData.data.employee.length === 0) {
  //     setState([]);
  //   } else {
  //     setState(userData.data.employee[0]);
  //   }
  // };
  // useEffect(() => {
  //   if (props.employeeId === "0" || props.employeeId === undefined) {
  //     setState(initialFormStateuser);
  //   } else {
  //     UserData();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [props]);
  // USER PERSONAL DETAIL SUBMIT BUTTON
  async function onVisaUpdateClick(event) {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const responseData = await AddUpdateVisa(props.employeeData.employee_id, state, props.employeeData.visa_id);
        console.log(responseData)
        if (responseData.data.message === "created successfully") {
          toast.success("Visa created successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          return close();
        }
        if (responseData.data.message === "updated successfully") {
          toast.success("Visa status Updated successfully", {
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
        setLoading(false)
      }
    } else {
      //   setLoading(false);
    }
  }
  return (
    <>
      <Modal
        show={props.show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <button
          type="button"
          className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
          data-dismiss="modal"
          onClick={close}
        >
          <i className="fas fa-times"></i>
        </button>
        {/* <div className="modal-dialog max-width-px-540 position-relative"> */}
        <div className="bg-white rounded h-100 px-md-11 px-6 pt-7">
          <form onSubmit={onVisaUpdateClick}>
            <h5 className="text-center pt-2 mb-7">Update Visa status</h5>
            <div className="form-group col">
              <label
                htmlFor="status"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Work Permit : <span className="text-danger">*</span>
              </label>
              <select
                name="status"
                value={state.status || ""}
                onChange={onInputChange}
                className={
                  errors.status
                    ? "form-control text-capitalize border border-danger"
                    : "form-control text-capitalize"
                }
                id="status"
              >
                <option value={""}>Select visa status </option>
                <option value={"pending"}>Pending</option>
                <option value={"approved"}>Approved</option>
                <option value={"reject"}>Reject</option>
                <option value={"experied"}>experied</option>
                <option value={"cancel"}>Cancel</option>
              </select>
              {/*----ERROR MESSAGE FOR WORK PERMIT----*/}
              {errors.status && (
                <span
                  key={errors.status}
                  className="text-danger font-size-3"
                >
                  {errors.status}
                </span>
              )}
            </div>
            <div className="form-group col">
              <label
                htmlFor="status"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Country :
              </label>
              <select
                name="country"
                value={state.country || ""}
                onChange={onInputChange}
                className={"form-control text-capitalize"}
                id="country"
              >
                <option value={""}>Select visa Country </option>
                {(FilterJson.location || []).map((item, index) => (
                  <option value={item} key={index}>{item}</option>
                ))}
              </select>
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
                  className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                  type="submit"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
          {/* </div> */}
        </div>
      </Modal>
    </>)
}
