import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import useValidation from '../../common/useValidation';
import moment from 'moment';
import { toast } from "react-toastify"
import { AddLmiaAdditionalInformationJob, AddLmiaAdditionalInformationEmployee } from '../../../api/api';
import filterjson from '../../json/filterjson';
export default function LmiaInfo(props) {
    const [loading, setLoading] = useState(false)
    // USER CATEGORY VALIDATION

    // INITIAL STATE ASSIGNMENT
    const initialFormState = props.job === "yes" ?
        {
            job_id: props.resData.job_id,
            lmia_number: props.resData.lmia_number || "",
            creation_date: props.resData.lmia_creation_date || "",
            submissiom_date: props.resData.lmia_submissiom_date || "",
            payment_status: props.resData.lmia_payment_status || "",
            payment_by: props.resData.lmia_payment_by || "",
            lmia_date_expiry: props.resData.lmia_date_expiry || "",
            lmia_monday_status: props.resData.lmia_monday_status || "",
            lmia_notes: props.resData.lmia_notes || "",
            type_of_lmia: props.resData.type_of_lmia || "",
            lmia_date_approved: props.resData.lmia_date_approved || ""
        } : {
            apply_id: props.resData.apply_id,
            lmia_number: props.resData.lmia_number || "",
            creation_date: props.resData.creation_date || "",
            submissiom_date: props.resData.submissiom_date || "",
            payment_status: props.resData.payment_status || "",
            payment_by: props.resData.payment_by || "",
            date_approved: props.resData.date_approved || "",
            date_expiry: props.resData.date_expiry || "",
            monday_status: props.resData.monday_status || "",
            notes: props.resData.notes || "",
            type_of_lmia: props.resData.type_of_lmia || "",
        };
    //   VALIDATION CONDITIONS
    const validators = {
        lmia_number: [
            (value) =>
                value === "" || value.trim() === ""
                    ? "LMIA Number  is required"
                    : /[^A-Za-z 0-9]/g.test(value)
                        ? "Cannot use special character "
                        //   : /[-]?\d+(\.\d+)?/.test(value)
                        //   ? "LMIA Number can not have a number."
                        : value.length < 2
                            ? "LMIA Number should have 2 or more letters"
                            : "",
        ],
        // submission_date: [
        //   (value) =>
        //     value === "" || value.trim() === ""
        //       ? "Category Type is required"
        //       : null,
        // ],
    };

    // CUSTOM VALIDATIONS IMPORT
    const { state, setState, onInputChange, errors, setErrors, validate } =
        useValidation(initialFormState, validators);
    /*function to close modalll */
    let close = () => {
        setState(initialFormState)
        props.close()
        setLoading(false)
        setErrors("");
    }
    /*Function to update additional lmia info */
    const onAddInfo = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (validate()) {
            try {
                let res = props.job === "yes"
                    ? await AddLmiaAdditionalInformationJob(state)
                    : await AddLmiaAdditionalInformationEmployee(state)
                if (res.message === 'Data updated successfully') {
                    toast.success("Information Added successfully", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 1000,
                    });
                    props.setApiCall(true);
                    return close();
                }
            } catch (err) {
                console.log(err)
                setLoading(false)
            }
        }
    }
    console.log(state)
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
                    <h5 className="text-center pt-2 mb-7">Add LMIA Additional Info</h5>
                    <form
                        onSubmit={(e) => onAddInfo(e)}
                    >
                        <div className="form-group">
                            <label
                                htmlFor="lmia_number"
                                className="font-size-4 text-black-2  line-height-reset"
                            >
                                LMIA Number {/*<span className="text-danger">*</span>*/}
                            </label>
                            <input
                                type="text"
                                className={
                                    errors.lmia_number
                                        ? "form-control border border-danger"
                                        : "form-control"
                                }
                                value={state.lmia_number}
                                onChange={onInputChange}
                                id="lmia_number"
                                name="lmia_number"
                                placeholder="LMIA No."
                                maxLength={60}
                            />
                            {/*----ERROR MESSAGE FOR LMIA NUMBER----*/}
                            {errors.lmia_number && (
                                <span key={errors.lmia_number} className="text-danger font-size-3">
                                    {errors.name}
                                </span>
                            )}
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="creation_date"
                                className="font-size-4 text-black-2  line-height-reset"
                            >
                                Creation date {/*<span className="text-danger">*</span>*/}
                            </label>
                            <input
                                type="date"
                                className={
                                    errors.creation_date
                                        ? "form-control coustam_datepicker border border-danger"
                                        : "form-control coustam_datepicker"
                                }
                                value={state.creation_date}
                                onChange={onInputChange}
                                id="creation_date"
                                name="creation_date"
                                onKeyDownCapture={(e) => e.preventDefault()}
                                min={moment().format("DD-MM-YYYY")}
                                placeholder="Enter contact no"
                                maxLength={13}
                            />
                            {/*----ERROR MESSAGE FOR Creation date----*/}
                            {errors.creation_date && (
                                <span
                                    key={errors.creation_date}
                                    className="text-danger font-size-3"
                                >
                                    {errors.creation_date}
                                </span>
                            )}
                        </div>
                        <div className="form-group ">
                            <label
                                htmlFor="submissiom_date"
                                className="font-size-4 text-black-2  line-height-reset"
                            >
                                Submission Date {/*<span className="text-danger">*</span> :*/}
                            </label>
                            <input
                                className={
                                    errors.submissiom_date
                                        ? "form-control coustam_datepicker border border-danger text-lowercase"
                                        : "form-control coustam_datepicker text-lowercase"
                                }
                                value={state.submissiom_date}
                                onChange={onInputChange}
                                id="submissiom_date"
                                name="submissiom_date"
                                type="date"
                                onKeyDownCapture={(e) => e.preventDefault()}
                                min={moment().format("DD-MM-YYYY")}
                                maxLength={60}
                            />
                            {/*----ERROR MESSAGE FOR Submission Date ----*/}
                            {errors.submissiom_date && (
                                <span key={errors.submissiom_date} className="text-danger font-size-3">
                                    {errors.submissiom_date}
                                </span>
                            )}
                        </div>
                        <div className="form-group ">
                            <label
                                htmlFor={props.job === "yes" ? "lmia_date_expiry" : "date_expiry"}
                                className="font-size-4 text-black-2  line-height-reset"
                            >
                                Expiry Date {/*<span className="text-danger">*</span> :*/}
                            </label>
                            <input
                                className={"form-control coustam_datepicker text-lowercase"}
                                value={props.job === "yes" ? state.lmia_date_expiry : state.date_expiry}
                                onChange={onInputChange}
                                id={props.job === "yes" ? "lmia_date_expiry" : "date_expiry"}
                                name={props.job === "yes" ? "lmia_date_expiry" : "date_expiry"}
                                type="date"
                                onKeyDownCapture={(e) => e.preventDefault()}
                                min={moment().format("DD-MM-YYYY")}
                            />
                            {/*----ERROR MESSAGE FOR Submission Date ----*/}
                            {/* {errors.lmia_date_expiry && (
                                <span key={errors.lmia_date_expiry} className="text-danger font-size-3">
                                    {errors.lmia_date_expiry}
                                </span>
                            )} */}
                        </div>
                        <div className="form-group ">
                            <label
                                htmlFor={props.job === "yes" ? "lmia_date_approved" : "date_approved"}
                                className="font-size-4 text-black-2  line-height-reset"
                            >
                                Approved Date {/*<span className="text-danger">*</span> :*/}
                            </label>
                            <input
                                className={"form-control coustam_datepicker text-lowercase"}
                                value={props.job === "yes" ? state.lmia_date_approved : state.date_approved}
                                onChange={onInputChange}
                                id={props.job === "yes" ? "lmia_date_approved" : "date_approved"}
                                name={props.job === "yes" ? "lmia_date_approved" : "date_approved"}
                                type="date"
                                onKeyDownCapture={(e) => e.preventDefault()}
                                min={moment().format("DD-MM-YYYY")}
                                    />
                        </div>
                        <div className="form-group ">
                            <label
                                htmlFor="payment_status"
                                className="font-size-4 text-black-2  line-height-reset"
                            >
                                Payment {/*<span className="text-danger">*</span> :*/}
                            </label>
                            <select
                                type={"text"}
                                className={
                                    errors.payment_status
                                        ? "form-control border border-danger text-capitalize"
                                        : "form-control"
                                }
                                value={state.payment_status}
                                onChange={onInputChange}
                                id="payment_status"
                                name="payment_status"
                                multiple={false}
                            >
                                <option value={""}>Select</option>
                                <option value={"yes"}>Yes</option>
                                <option value={"no"}>No</option>
                            </select>
                            {/*----ERROR MESSAGE FOR payment_status----*/}
                            {errors.payment_status && (
                                <span
                                    key={errors.payment_status}
                                    className="text-danger font-size-3"
                                >
                                    {errors.payment_status}
                                </span>
                            )}
                        </div>
                        <div className="form-group ">
                            <label
                                htmlFor="payment_by"
                                className="font-size-4 text-black-2  line-height-reset"
                            >
                                Payment by {/*<span className="text-danger">*</span> :*/}
                            </label>
                            <select
                                type={"text"}
                                className={
                                    errors.payment_by
                                        ? "form-control border border-danger text-capitalize"
                                        : "form-control"
                                }
                                value={state.payment_by}
                                onChange={onInputChange}
                                id="payment_by"
                                name="payment_by"
                                multiple={false}
                            >
                                <option value={""}>Select</option>
                                <option value={"employer"}>Client</option>
                                <option value={"employee"}>Candidate</option>
                                <option value={"canpathway"}>Canpathway</option>
                            </select>
                            {/*----ERROR MESSAGE FOR PAYMENT BY----*/}
                            {errors.payment_by && (
                                <span
                                    key={errors.payment_by}
                                    className="text-danger font-size-3"
                                >
                                    {errors.payment_by}
                                </span>
                            )}
                        </div>
                        <div className="form-group ">
                            <label
                                htmlFor="type_of_lmia"
                                className="font-size-4 text-black-2  line-height-reset"
                            >
                                Type of LMIA {/*<span className="text-danger">*</span> :*/}
                            </label>
                            <select
                                type={"text"}
                                className={"form-control text-capitalize"
                                }
                                value={state.type_of_lmia}
                                onChange={onInputChange}
                                id="type_of_lmia"
                                name="type_of_lmia"
                                multiple={false}
                            >
                                <option value={""}>Select status</option>
                                {filterjson.type_of_lmia.map((item) =>
                                    <option value={item.value} key={item.value}>{item.label}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group ">
                            <label
                                htmlFor={props.job === "yes" ? "lmia_monday_status" : "monday_status"}
                                className="font-size-4 text-black-2  line-height-reset"
                            >
                                Status {/*<span className="text-danger">*</span> :*/}
                            </label>
                            <select
                                type={"text"}
                                className={"form-control text-capitalize"
                                }
                                value={props.job === "yes" ? state.lmia_monday_status : state.monday_status}
                                onChange={onInputChange}
                                id={props.job === "yes" ? "lmia_monday_status" : "monday_status"}
                                name={props.job === "yes" ? "lmia_monday_status" : "monday_status"}
                                multiple={false}
                            >
                                <option value={""}>Select status</option>
                                {filterjson.monday_status.map((item) =>
                                    <option value={item.value} key={item.value}>{item.label}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group ">
                            <label
                                htmlFor={props.job === "yes" ? "lmia_notes" : "notes"}
                                className="font-size-4 text-black-2  line-height-reset"
                            >
                                Notes {/*<span className="text-danger">*</span> :*/}
                            </label>
                            <input
                                className={"form-control text-lowercase"
                                }
                                value={props.job === "yes" ? state.lmia_notes : state.notes}
                                onChange={onInputChange}
                                id={props.job === "yes" ? "lmia_notes" : "notes"}
                                name={props.job === "yes" ? "lmia_notes" : "notes"}
                                type="text"
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
                                    type="submit"
                                // onClick={onAddInfo}
                                >
                                    Submit
                                </button>
                            )}
                        </div>
                    </form>
                </div >
            </Modal >
        </>
    )
}
