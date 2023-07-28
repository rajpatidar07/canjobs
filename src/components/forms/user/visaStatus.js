import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
// import { CKEditor } from "ckeditor4-react";
import { AddEmployeeDetails, EmployeeDetails } from "../../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function VisaStatus(props) {
    const [loading, setLoading] = useState(false);
    // USER PERSONAL DETAIL VALIDATION
    // INITIAL STATE ASSIGNMENT
    const initialFormStateuser = {
      work_permit_other_country: "",
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
      work_permit_canada: [
        (value) =>
          value === "" || value === null ? "Work Permit is required" : null,
      ],
    };
  
    // CUSTOM VALIDATIONS IMPORT
    const { state, setState, onInputChange, errors, validate, setErrors } =
      useValidation(initialFormStateuser, validators);
    // API CALL
    const UserData = async () => {
      const userData = await EmployeeDetails(props.employeeId);
      if (userData.data.employee.length === 0) {
        setState([]);
      } else {
        setState(userData.data.employee[0]);
      }
    };
    useEffect(() => {
      if (props.employeeId === "0" || props.employeeId === undefined) {
        setState(initialFormStateuser);
      } else {
        UserData();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);
    // USER PERSONAL DETAIL SUBMIT BUTTON
    async function onVisaUpdateClick(event) {
      event.preventDefault();
      if (validate()) {
        setLoading(true);
        const responseData = await AddEmployeeDetails(state);
        if (responseData.message === "Employee data inserted successfully") {
          toast.success("Employee added successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          return close();
        }
        if (responseData.message === "Employee data updated successfully") {
          toast.success("Visa status Updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          return close();
        }
      } else {
        setLoading(false);
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
      <div className="bg-white rounded h-100 px-11 pt-7">
        <form onSubmit={onVisaUpdateClick}>
            <h5 className="text-center pt-2 mb-7">Update Visa status</h5>
                        <div className="form-group col">
              <label
                htmlFor="work_permit_canada"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Work Permit of Canada: <span className="text-danger">*</span>
              </label>
              <select
                name="work_permit_canada"
                value={state.work_permit_canada || ""}
                onChange={onInputChange}
                className={
                  errors.work_permit_canada
                    ? "form-control border border-danger"
                    : "form-control"
                }
                id="work_permit_canada"
              >
                <option value={""}>Permit </option>
                <option value={"no"}>No</option>
                <option value={"yes"}>Yes</option>
              </select>
              {/*----ERROR MESSAGE FOR WORK PERMIT----*/}
              {errors.work_permit_canada && (
                <span
                  key={errors.work_permit_canada}
                  className="text-danger font-size-3"
                >
                  {errors.work_permit_canada}
                </span>
              )}
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
  </>  )
}