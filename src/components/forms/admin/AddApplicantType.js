import React, { useEffect, useState } from "react";
import { AddApplicanTypeApi, getApplicanTypeApi } from "../../../api/api";
import useValidation from "../../common/useValidation"; // Adjust path if needed
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import SelectBox from "../../common/Common function/SelectBox";

export default function AddApplicantType(props) {
    const [loading, setLoading] = useState(false)
    const [apicall, setApicall] = useState(false)
    const [applicantTypeList, setApplicantTypeList] = useState([])

    // INITIAL STATE ASSIGNMENT
    const initialFormState = {
        title: "",
        selectedParent: "",
        selectedChild: "",
        level: 0,
        admin_access_id: ""
    };

    // VALIDATION CONDITIONS
    const validators = {
        title: [
            (value) =>
                value.trim() === ""
                    ? "Title is required"
                    : value.length < 3
                        ? "Title must be at least 3 characters long"
                        : /[-]?\d+(\.\d+)?/.test(value)
                            ? "Title cannot contain numbers"
                            : "",
        ],
    };

    // CUSTOM VALIDATION HOOK
    const { state, setState, errors, validate, setErrors } =
        useValidation(initialFormState, validators);
    /*Function to get Latest applicant type data */
    const getApplicanrData = async () => {
        try {
            let response = await getApplicanTypeApi("");
            setApplicantTypeList(response.data.data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getApplicanrData()
        if (apicall === true) {
            setApicall(false)
        }
        if (props?.updateApplicantTypeData?.id) {
            setState({ ...state, title: props.updateApplicantTypeData.title, selectedParent: props?.updateApplicantTypeData?.parent_id, level: props?.updateApplicantTypeData?.level, admin_access_id: props?.updateApplicantTypeData.admin_access_id });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apicall, props?.updateApplicantTypeData])

    const adminAccessIds = new Set(state?.admin_access_id?.split(",") || []);

    // HANDLE INPUT CHANGES AND SET LEVEL DYNAMICALLY
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => {
            let newLevel = prevState.level; // Preserve the current level by default

            if (name === "selectedParent") {
                newLevel = value ? 1 : 0; // Level 1 when parent is selected
            }
            if (name === "selectedChild") {
                newLevel = value ? 2 : prevState.selectedParent ? 1 : 0; // Level 2 when child is selected
            }
            // If the field being updated is not 'title', update the level
            if (name !== "title") {
                return {
                    ...prevState,
                    [name]: value,
                    level: newLevel,
                };
            }

            // If the field being updated is 'title', keep the level unchanged
            return {
                ...prevState,
                [name]: value,
            };
        });
    };
    /*Function to close the modal */
    let close = () => {
        props.close()
        setState(initialFormState)
    }
    /*Function to add applicant type ,sub type and sub sub type  */
    const addApplicantTypeClick = async (e) => {
        e.preventDefault()
        if (validate()) {
            setLoading(true)
            const newItem = {
                id: props?.updateApplicantTypeData?.id || "",
                title: state.title,
                parent_id: state.level === 2 ? state.selectedChild : state.selectedParent,
                level: state.level, // Dynamic level
                admin_access_id: state.admin_access_id
            };
            try {
                const response = await AddApplicanTypeApi(newItem);
                if (response.message === 'Applicant type already exist') {
                    setErrors({ ...errors, title: 'Applicant type already exist' })
                    setLoading(false)
                }
                // console.log(response.status === (1 || "1"), response)
                if (response.status === 1 || response.status === "1") {
                    if (state.level === 0 || state.level === "0") {
                        toast.success("Applicant Type Added successfully", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 1000,
                        });
                    } else if (state.level === 1 || state.level === "1") {
                        toast.success("Applicant Sub Type Added successfully", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 1000,
                        });
                    } else {
                        let selectedChildName = applicantTypeList.find(item => item.id === state.selectedChild)
                        toast.success(`Applicant ${selectedChildName.title} Sub Type Added successfully`, {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 1000,
                        });
                    }
                    props.setApicall(true)
                    setApicall(true)
                    setLoading(false)
                    setState(initialFormState);
                    close()
                }
            } catch (err) {
                console.log(err);
                setLoading(false)
            }
        }
    };
    // Handle checkbox selection
    const handleCheckboxChange = (id) => {
        setState((prevState) => {
            let selectedIds = prevState.admin_access_id ? prevState.admin_access_id.split(",") : [];

            if (selectedIds.includes(id.toString())) {
                // Remove the ID if already selected
                selectedIds = selectedIds.filter((adminId) => adminId !== id.toString());
            } else {
                // Add the ID if not selected
                selectedIds.push(id.toString());
            }

            return {
                ...prevState,
                admin_access_id: selectedIds.join(",") // Convert array back to comma-separated string
            };
        });
    };

    return (
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
            <div className="bg-white rounded h-100 p-7">
                <form onSubmit={(e) => addApplicantTypeClick(e)}>
                    <h5 className="text-center mb-7">Add Applicant Type </h5>
                    <div className="row">
                        <div className="form-group col-6">
                            <label
                                htmlFor="title"
                                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                            >
                                Title<span className="text-danger">*</span> :
                            </label>
                            <input
                                type="text"
                                placeholder="Enter title"
                                name="title"
                                className={`form-control ${errors.title ? "border border-danger" : ""}`}
                                value={state.title}
                                onChange={handleChange}
                            />
                            {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
                        </div>
                        <div className={props.updateApplicantTypeData ? "d-none" : "form-group col-6"}>
                            <label
                                htmlFor="selectedParent"
                                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                            >
                                Select Applicant Type :
                            </label>
                            <SelectBox
                                Width={"yes"}
                                options={applicantTypeList ?
                                    applicantTypeList?.filter((item) => item.level === (0 || "0")).map((option) => ({
                                        value: option.id,
                                        label: option.title,
                                    }))
                                    : []}
                                type={"selectedParent"}
                                selectedValue={state.selectedParent}
                                onChange={(e) => { setState({ ...state, selectedParent: e ? e.value : "" }) }}
                            />
                        </div>
                        <div classNme="form-group col-12">
                            <label
                                htmlFor="access_admin_id"
                                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                            >
                                Grant access to the admin :
                            </label>
                            <ul className="list-unstyled row px-8 d-flex flex-wrap">
                                {(props.admins || []).map(({ id, admin_id, name }) => {
                                    return (
                                        <li key={id} className="col-md-4 col-sm-6 d-flex align-items-center gap-2">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                checked={adminAccessIds.has(String(admin_id))}
                                                onChange={() => handleCheckboxChange(admin_id)}
                                                id={`admin-checkbox-${id}`}
                                            />
                                            <label htmlFor={`admin-checkbox-${id}`} className="form-check-label">
                                                {name}
                                            </label>
                                        </li>
                                    );
                                })}
                            </ul>

                        </div>
                        <div className="form-group col d-none">
                            <label
                                htmlFor="selectedChild"
                                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                            >
                                Select Sub Type :
                            </label>
                            <SelectBox
                                Width={"yes"}
                                options={applicantTypeList ?
                                    applicantTypeList?.filter((item) => item.parent_id === state.selectedParent).map((option) => ({
                                        value: option.id,
                                        label: option.title,
                                    }))
                                    : []}
                                type={"selectedChild"}
                                selectedValue={state.selectedChild}
                                onChange={(e) => { setState({ ...state, selectedChild: e ? e.value : "" }) }}
                            />
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
                                className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                                type="submit"
                            >
                                Submit
                            </button>
                        )}
                    </div>
                </form>
            </div >
        </Modal >
    );
}
