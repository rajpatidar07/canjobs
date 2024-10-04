import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import useValidation from '../../common/useValidation';
import filterjson from '../../json/filterjson';
import { AddUpdateAgreement } from '../../../api/api';
import { toast } from 'react-toastify';
export default function RetainerAgreement(props) {
  const [loading, setLoading] = useState(false)

  // USER Retainer Agreement VALIDATION
  // INITIAL STATE ASSIGNMENT
  const initialFormStateuser = {
    type: "",
    receiver: props.emp_user_type === "employee" ? props.userData.employee_id : props.userData.company_id,
    receiver_type: props.emp_user_type === "employee" ? "employee" : "employer",
    // daterasigned: "",
    // daterasent: "",
  };
  // VALIDATION CONDITIONS

  const validators = {
    type: [
      (value) => (value === "" || value === null ? "Sub categories is required" : null),
    ],
    daterasigned: [
      (value) => (value === "" || value === null ? "Date of R A Signed is required" : null),
    ],
    daterasent: [
      (value) => (value === "" || value === null ? "Date of R A Sent is required" : null),
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, onInputChange, errors,/* validate,*/ setErrors } =
    useValidation(initialFormStateuser, validators);
    
  /* Functionality to close the modal */
  const close = () => {
    setState(initialFormStateuser);
    setErrors("");
    setLoading(false);
    props.close();
  };

  /*Function to add update retainer agreement */
  const onAddUpdateRetaine =async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await AddUpdateAgreement(state)
      // console.log(res)
      if (res.data.status === 1 && res.data.message === "Agreement added successfully.") {
        setLoading(false)
        setState(initialFormStateuser)
        toast.success("Felids added successfully.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        close()
        props.setApicall(true)
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
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
          <form>
            <h5 className="text-center pt-2 mb-7">Add Retainer Agreement</h5>
            <div className="form-group col mt-5">
              <label
                htmlFor="type"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Sub categories  : <span className="text-danger">*</span>
              </label>
              <select
                name="type"
                value={state.type || ""}
                onChange={onInputChange}
                multiple={false}
                className={
                  errors.status
                    ? "form-control text-capitalize border border-danger"
                    : "form-control text-capitalize"
                }
                id="type"
              >
                <option value={""}>Select Sub Categories  </option>
                {(filterjson.Rerainer_Agreement_subCategories || []).map((item, index) =>
                  <option value={item}
                    key={index}>{item}  </option>
                )}
              </select>
              {/*----ERROR MESSAGE FOR WORK PERMIT----*/}
              {errors.type && (
                <span key={errors.type} className="text-danger font-size-3">
                  {errors.type}
                </span>
              )}
            </div>
            <div className="form-group col d-none">
              <label
                htmlFor="daterasent"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Date RA Sent :
              </label>
              <input
                name="daterasent"
                value={state.daterasent || ""}
                onChange={onInputChange}
                className={"form-control coustam_datepicker"}
                onKeyDownCapture={(e) => e.preventDefault()}
                // disabled={props.employeeData.visa_country}
                id="daterasent"
                type='date'
              />
            </div>
            <div className="form-group col d-none">
              <label
                htmlFor="daterasigned"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Date RA Signed :
              </label>
              <input
                name="daterasigned"
                value={state.daterasigned || ""}
                onChange={onInputChange}
                className={"form-control coustam_datepicker"}
                onKeyDownCapture={(e) => e.preventDefault()}
                // disabled={props.employeeData.visa_country}
                id="daterasigned"
                type='date'
              />
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
                  type="button"
                  onClick={onAddUpdateRetaine}
                >
                  Submit
                </button>
              )}
            </div>
          </form>
          {/* </div> */}
        </div>
      </Modal>
    </>
  )
}
