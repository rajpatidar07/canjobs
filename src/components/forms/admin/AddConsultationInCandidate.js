import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import useValidation from '../../common/useValidation';
import { AddEmployeeDetails } from '../../../api/api';
import { toast } from 'react-toastify';
export default function AddConsultationInCandidate(props) {
    let [loading, setLoading] = useState(false)

    // USER PERSONAL DETAIL VALIDATION
    // INITIAL STATE ASSIGNMENT
    const initialFormStateuser = {
        consultation_date: props.employeeId?.consultation_date || "",
        consultation_opted: props.employeeId?.consultation_opted || ""

    };

    // VALIDATION CONDITIONS

    const validators = {
        consultation_opted: [
            (value) =>
                value === "" || value === null || value.trim() === ""
                    ? "Consultation Opted is requried"
                    : "",
        ],
        consultation_date: [
            (value) =>
                ((value === "" || value === null || value.trim() === "") && state.consultation_opted !== "0")
                    ? "Consultation date is required"
                    : "",
        ],
    };

    // CUSTOM VALIDATIONS IMPORT
    const { state, setState, onInputChange, errors, validate, setErrors } =
        useValidation(initialFormStateuser, validators);

    /*Function to close the modal */
    const close = () => {
        props.close()
        setState(initialFormStateuser)
        setLoading(false)
        setErrors("")
    }

    // USER PERSONAL DETAIL SUBMIT BUTTON
    async function onAddConsultationClick(event) {
        event.preventDefault();
        if (validate()) {
            setLoading(true);
            try {
                let data = {
                    ...state,
                    employee_id: props.employeeId.employee_id
                }
                const responseData = await AddEmployeeDetails(data);
                if (responseData.message === "Employee data inserted successfully") {
                    try {
                        // let Response = await AddEmployeePermission(Permissions);
                        // conditions for the response toaster message
                        // if (Response.message === "successfully") {
                        toast.success("Candidate added successfully", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 1000,
                        });
                        props.setApiCall(true);
                        return close();
                        // }
                    } catch (err) {
                        console.log(err);
                    }
                }
                if (responseData.message === "Employee data updated successfully") {
                    toast.success("Candidate Updated successfully", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 1000,
                    });
                    props.setApiCall(true);
                    return close();
                }
                if (responseData.message === "Email already exists") {
                    toast.error("Email already exists", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 1000,
                    });
                    // props.setApiCall(true);
                    setLoading(false)
                    setErrors({ ...errors, email: "Email already exists" })
                }
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        } else {
            toast.error("Please complete the profile first!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
            });
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
                    className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper "
                    data-dismiss="modal"
                    onClick={close}
                >
                    <i className="fas fa-times"></i>
                </button>
                <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
                    <form onSubmit={(e) => onAddConsultationClick(e)}>
                        <h5 className="text-center pt-2 mb-7">
                            {state.id ? "Update" : "Add"} Consultation</h5>
                        <div className="row pt-5">
                            <div className="form-group col-12 ">
                                <label
                                    htmlFor="consultation_opted"
                                    className="font-size-4 text-black-2  line-height-reset">
                                    Consultation Opted <span className="text-danger">*</span> :
                                </label>
                                <select
                                    type={"text"}
                                    className={
                                        errors.consultation_opted
                                            ? "form-control border border-danger text-capitalize"
                                            : "form-control"
                                    }
                                    value={state.consultation_opted}
                                    onChange={onInputChange}
                                    id="consultation_opted"
                                    name="consultation_opted"
                                    multiple={false}
                                >
                                    <option value={""}>Select</option>
                                    <option value={"1"}>Yes</option>
                                    <option
                                        value={"0"}
                                        className=" text-capitalize"
                                    >
                                        No
                                    </option>
                                </select>
                                {/*----ERROR MESSAGE FOR agent TYPE----*/}
                                {errors.type && (
                                    <span key={errors.type} className="text-danger font-size-3">
                                        {errors.type}
                                    </span>
                                )}
                            </div>
                            <div className={`form-group col-12 `}>
                                <label
                                    htmlFor="consultation_date"
                                    className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                                >
                                    Date of Consultation:
                                </label>
                                <input
                                    type="date"
                                    placeholder="Date Of Birth "
                                    name="consultation_date"
                                    value={state.consultation_date || ""}
                                    onChange={onInputChange}
                                    // onKeyDownCapture={(e) => e.preventDefault()}
                                    className={
                                        `form-control ${errors.consultation_date
                                            ? " border border-danger"
                                            : ""}`
                                    }
                                    id="consultation_date"
                                />
                                {/*----ERROR MESSAGE FOR DOB----*/}
                                {errors.consultation_date && (
                                    <span
                                        key={errors.consultation_date}
                                        className="text-danger font-size-3"
                                    >
                                        {errors.consultation_date}
                                    </span>
                                )}
                            </div>
                            <div className="form-group text-center mx-auto w-100">
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
                        </div>
                    </form>
                </div>
            </Modal >
        </>
    )
}
