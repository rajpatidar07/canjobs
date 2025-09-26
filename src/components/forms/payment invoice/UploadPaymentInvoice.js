import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import useValidation from '../../common/useValidation';
import { toast } from 'react-toastify';
import { AddUpdatePaymentInvoiceApi } from '../../../api/api';
import { Link } from 'react-router-dom';
import SelectBox from '../../common/Common function/SelectBox';

export default function UploadPaymentInvoice(props) {
    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState("");

    // Modified initial state to hold a single file as a string (Base64)
    let initialFormState = {
        "invoice_no": parseFloat(props.lastInvoiceNo) + 1,
        "user_email": props.userEmail,
        "terms": "",
        "invoice_date": "",
        "user_id": props.userId,
        "user_type": props.userType,
        "due_date": "",
        "due_amount": "",
        "received_amount": "",
        "added_type": "uploaded_invoice",
        "file": "", // Now holds a single file content as Base64 string
    };

    // Updated validators for the single file field
    let validators = {
        file: props.singleInvoiceData?.id ? null : [
            (value) => (value === "" || value === null ? "File is required" : null),
        ],
        // Add other validators as needed for other fields
        terms: [],
        invoice_date: [],
        due_date: [],
        due_amount: [],
        received_amount: [],
        user_id: [
            (value) =>
                value === "" || value === null || value === undefined
                    ? "User is required"
                    : "",
        ],
    };

    const { state, setState, onInputChange, errors, validate, setErrors } =
        useValidation(initialFormState, validators);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };
    useEffect(() => {
        if (props.singleInvoiceData) {
            setState({
                ...state,
                "invoice_no": props.singleInvoiceData?.invoice_no,
                "user_email": props.singleInvoiceData?.user_email,
                "terms": props.singleInvoiceData?.terms,
                "invoice_date": props.singleInvoiceData?.invoice_date,
                "user_id": props.singleInvoiceData?.user_id,
                "user_type": props.singleInvoiceData?.user_type,
                "due_date": props.singleInvoiceData?.due_date,
                "due_amount": props.singleInvoiceData?.due_amount,
                "received_amount": props.singleInvoiceData?.received_amount,
                "added_type": props.singleInvoiceData?.added_type,
                "file": props.singleInvoiceData?.file,
                "id": props.singleInvoiceData?.id,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.singleInvoiceData])

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            // Since we only allow one file, take the first one
            const file = e.dataTransfer.files[0];
            handleFileChange({ target: { files: [file] } });
        }
    };

    /* Function to convert file to Base64 and set in state */
    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    /* On change function to handle a single file upload */
    const handleFileChange = async (event) => {
        const file = event.target.files[0]; // Get the single file

        if (!file) {
            return; // No file selected
        }

        const maxSize = 1024 * 8000; // 8 MB
        const allowedTypes = [".pdf", ".jpg", ".jpeg", ".png"];
        const fileExtension = file.name.split('.').pop().toLowerCase();
        const fileType = `.${fileExtension}`;

        // Validate file type
        if (!allowedTypes.includes(fileType)) {
            toast.error(
                `Invalid document type for file '${file.name}'. Allowed types: PDF, JPG, JPEG, PNG`,
                {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                }
            );
            return;
        }

        // Validate file size
        if (file.size > maxSize) {
            toast.error(
                `Document size can't be more than 8 MB for file '${file.name}'`,
                {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                }
            );
            return;
        }

        try {
            const base64File = await toBase64(file);
            // Set the Base64 content and file name in the state
            setState({
                ...state,
                file: base64File,
            });
            setFileName(file.name)
            // Clear previous file validation error if any
            setErrors(prevErrors => ({ ...prevErrors, file: null }));
        } catch (error) {
            console.error("Error converting file to Base64:", error);
            toast.error("Error processing the file.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
            });
        }
    };

    /* Function to remove the file from the selected file list */
    const removeFile = () => {
        setState(prevState => ({
            ...prevState,
            file: "", // Clear the Base64 file content
        }));
        setFileName("")
        // Clear the file input value so that the same file can be selected again
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };

    /* function to close the modal */
    const close = () => {
        props.close();
        setState(initialFormState);
        setErrors({}); // Clear all errors
    };

    /* Function to submit the form */
    const onFormSubmit = async () => {
        // Ensure file validation is considered
        const isValid = validate();
        if (!state.file && !props.singleInvoiceData?.id) { // Explicitly check if a file is selected
            setErrors(prevErrors => ({ ...prevErrors, file: "File is required" }));
            return;
        }
        if (isValid) {
            setLoading(true)
            try {
                let res = await AddUpdatePaymentInvoiceApi(state);
                if (res.data.status === 1 || res.data.status === "1") {
                    toast.success("Payment invoice Created successful", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 1000,
                    });
                    close();
                    props.setApiCall(true);
                    setLoading(false)
                } else {
                    // Handle API errors if status is not 1 or "1"
                    toast.error(res.data.message || "Failed to create payment invoice.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 1000,
                    });
                    setLoading(false)
                }
            } catch (err) {
                console.error("API Error:", err);
                setLoading(false)
                toast.error("An error occurred while submitting the form.", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
            }
        }
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
                onClick={() => close()}>
                <i className="fas fa-times"></i>
            </button>
            <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
                <form>
                    <h5 className="text-center pt-2 mb-7">Upload Payment Invoice</h5>
                    <div
                        className=" align-items-center mt-2 mb-2"
                        style={{ padding: "0!important" }}
                    >
                        <div className="form-group col mt-5">
                            <label className="font-size-4 text-black-2 line-height-reset font-weight-semibold">
                                Customer
                            </label>
                            <div className={errors.user_id ? "border border-danger rounded" : ""}>
                                <SelectBox
                                    Width={"yes"}
                                    options={(props.employee_employer_list || []).map((item) => {
                                        const value = item.employee_id
                                            ? `${item.employee_id},employee`
                                            : item.company_id
                                                ? `${item.company_id},employer`
                                                : `${item.id},applicant_type`;

                                        const label = item.employee_id
                                            ? `${item.name} (Candidate)`
                                            : item.company_id
                                                ? `${item.company_name} (Client)`
                                                : item.title
                                                    ? `${item.title} (Applicant Type)`
                                                    : "Unknown User";

                                        return {
                                            value,
                                            label,
                                        };
                                    })}
                                    type="userId"
                                    selectedValue={
                                        state.user_id && state.user_type
                                            ? `${state.user_id},${state.user_type}`
                                            : ""
                                    }
                                    onChange={(e) => {
                                        const val = e ? e.value.split(",") : ["", ""];
                                        setState((prev) => ({
                                            ...prev,
                                            user_id: val[0],
                                            user_type: val[1],
                                            user_email: props.employee_employer_list.find((item) => item.employee_id === val[0] || item.company_id === val[0])?.email
                                        }));
                                    }}
                                    isDisabled={!!(state.user_id && state.user_type)}
                                />
                            </div>
                            {errors.user_id && (
                                <span
                                    key={errors.user_id}
                                    className="text-danger font-size-3"
                                >
                                    {errors.user_id}
                                </span>
                            )}
                        </div>
                        <div className="form-group col mt-5">
                            <label
                                htmlFor="term"
                                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                            >
                                Term :
                            </label>
                            <input
                                type="text"
                                onChange={(e) => onInputChange(e)}
                                value={state.terms}
                                id="terms"
                                name="terms"
                                className='form-control'
                            />
                        </div>
                        <div className="form-group col mt-5">
                            <label htmlFor='invoice_date'>Invoice Date</label>
                            <input
                                type="date"
                                onChange={(e) => onInputChange(e)}
                                value={state.invoice_date}
                                id="invoice_date"
                                name="invoice_date"
                                className='form-control'
                            />
                        </div>
                        <div className="form-group col mt-5">
                            <label htmlFor='due_date'>Due Date</label>
                            <input
                                type="date"
                                onChange={(e) => onInputChange(e)}
                                value={state.due_date}
                                id="due_date"
                                name="due_date"
                                className='form-control'
                            />
                        </div>
                        <div className="form-group col mt-5">
                            <label htmlFor='due_amount'>Due Amount</label>
                            <input
                                type="number"
                                onChange={(e) => onInputChange(e)}
                                value={state.due_amount}
                                id="due_amount"
                                name="due_amount"
                                className='form-control'
                            />
                        </div>
                        <div className="form-group col mt-5">
                            <label htmlFor='received_amount'>Received Amount</label>
                            <input
                                type="number"
                                onChange={(e) => onInputChange(e)}
                                value={state.received_amount}
                                id="received_amount"
                                name="received_amount"
                                className='form-control'
                            />
                        </div>

                        {/* Display selected file name */}
                        {fileName && (
                            <div className="form-group">
                                <ul className="list-unstyled d-flex align-items-center flex-wrap">
                                    <li
                                        className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                    >
                                        {fileName}
                                        <Link
                                            className="p-0 ms-1"
                                            onClick={removeFile} // Call removeFile without arguments
                                        >
                                            <i className="px-3 fa fa-times-circle" aria-hidden="true"></i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )}

                        <div className={props?.singleInvoiceData?.id ? "d-none" : "d-flex align-items-center justify-content-start col-12"}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <label
                                className={`btn btn-white rounded `}
                                style={{
                                    margin: 10,
                                    color: "grey",
                                    minHeight: "auto",
                                    fontSize: 18,
                                    flexDirection: "row",
                                    lineHeight: 1,
                                    padding: "10px 15px",
                                    border: isDragging ? "2px dashed #007bff" : "",
                                }}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={handleFileChange} // Use the new handler
                                // accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" // Optional: to filter in the browser
                                />
                                <span className="mr-3" style={{ fontSize: 24 }}>+</span>
                                <p className="m-0" style={{ fontWeight: 400, fontSize: 14 }}>
                                    Upload file
                                </p>
                            </label>
                            {errors.file && (
                                <span
                                    key={errors.file}
                                    className="text-danger font-size-3"
                                >
                                    {errors.file}
                                </span>
                            )}
                        </div>

                        <div className=' d-flex justify-content-center'>
                            <button type="button" disabled={loading} onClick={onFormSubmit} className="btn btn-primary">
                                {loading ? "submitting..." : "submit"}
                            </button>
                        </div>
                    </div>
                </form>
            </div >
        </Modal >
    );
}