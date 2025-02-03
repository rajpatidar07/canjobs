import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
import {
    ReassignAdminApi,
    getallAdminData,
} from "../../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

function ReassignAdmin(props) {
    const [loading, setLoading] = useState(false);
    let [AdminList, setAdminList] = useState([]);
    let [AdminOption, setAdminOption] = useState([]);
    /* Functionality to close the modal */
    const close = () => {
        setState(initialFormState);
        setErrors("");
        setLoading(false);
        props.close();
    };

    // USER ReassignAdmin VALIDATION

    // INITIAL STATE ASSIGNMENT
    const initialFormState = {
        replace_admin_id: "",
        admin_id: props?.adminData?.admin_id
    };
    // VALIDATION CONDITIONS
    const validators = {
        replace_admin_id: [
            (value) =>
                value === "" || value.trim() === ""
                    ? "Admin is required"
                    : "",
        ],
    };
    // CUSTOM VALIDATIONS IMPORT
    const { state, setState, errors, setErrors, validate } = useValidation(
        initialFormState,
        validators
    );
    const GetAdminData = async () => {
        try {
            let res = await getallAdminData(props?.adminData?.admin_type)
            if (res.status === 1 || res.status === "1") {
                setAdminList(res.data)
            }
        } catch (err) {
            console.log(err)

        }
    }
    /*Render method to get the Admin data */
    useEffect(() => {
        GetAdminData()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);

    /*Function to set data to the search job by country */
    const onSelectChange = (option) => {
        setState({ ...state, replace_admin_id: option.value });
    };

    /*Function to redender the data in the option of the select box*/
    useEffect(() => {
        const options = (AdminList || []).map((option) => ({
            value: option.admin_id,
            label: option.name,
        }));
        setAdminOption({ ...state, Admin: options });
        // eslint-disable-next-line
    }, [AdminList]);

    // USER ReassignAdmin SUBMIT BUTTON
    const onUserReassignAdminClick = async (event) => {
        event.preventDefault();
        if (validate()) {
            setLoading(true);
            try {
                console.log(props?.adminData, state)
                const response = await ReassignAdminApi(state);
                if (response.status === 1) {
                    toast.success("Admin Deleted and Re assigned Updated successfully", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 1000,
                    });
                    setState({ ...state, Admin: "" });
                    setAdminOption({ ...state, Admin: "" });
                    setErrors("");
                    setLoading(false);
                    props.setApiCall(true);
                    props.close()
                }
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }
    };

    // END USER PERSONAL DETAIL VALIDATION

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
                <div className="bg-white rounded h-100 p-7">
                    <form onSubmit={onUserReassignAdminClick}>
                        <h5 className="text-center mb-7 lead">Please assign the admin in place of deleting <b className="text-dark">{props?.adminData?.name}</b> as the admin. </h5>
                        <div className="form-group d-flex mb-3 p-0">
                            <label
                                htmlFor="Admin"
                                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                            >
                                Assign Admin<span className="text-danger">*</span> :
                            </label>

                            <Select
                                options={"" || AdminOption.Admin}
                                name="Admin"
                                id="Admin"
                                onChange={onSelectChange}
                                className={
                                    errors.replace_admin_id
                                        ? "border border-danger w-100 text-capitalize"
                                        : "text-capitalize w-100"
                                }
                                isClearable={""}
                            />

                        </div>
                        {/*----ERROR MESSAGE FOR ReassignAdmin----*/}
                        {errors.replace_admin_id && (
                            <span key={errors.replace_admin_id} className="text-danger font-size-3 mx-5">
                                {errors.replace_admin_id}
                            </span>
                        )}
                        <div className="form-group text-center mb-0">
                            {loading === true ? (
                                <button
                                    className="btn btn-primary  mx-2 rounded-5 text-uppercase"
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
                                    className="btn btn-primary  mx-2 rounded-5 text-uppercase"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            )}
                            <button
                                type="button"
                                className="btn btn-primary ml-auto mr-auto mx-2 rounded-5"
                                data-dismiss="modal"
                                onClick={close}
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}

export default ReassignAdmin;
