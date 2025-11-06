import React, { useEffect, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import useValidation from '../../common/useValidation';
import filterjson from '../../json/filterjson';
import SelectBox from '../../common/Common function/SelectBox';
import { toast } from 'react-toastify';
import { AddSharePointDOcument } from '../../../api/api';
import { AddDocIdToAGreementApiFun } from '../../common/Retaineragreement/CommonThings/AddDocIdToAGreementApiFun';
import { Link } from 'react-router-dom';

const agreementOptions = [
    ...(filterjson.Rerainer_Agreement_subCategories || []),
    "Other"
].map((item, index) => ({
    value: item,
    label: item,
}));

export default function UploadAgreement(props) {
    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [loading, setLoading] = useState(false);
    const [docFileBase, setDocFileBase] = useState("");
    const [docFileBaseErr, setDocFileBaseErr] = useState("");
    const [isOtherSelected, setIsOtherSelected] = useState(false);
    let initialFormState = {
        "type": "",
        "signature_status": "0",
        "send_date": "",
        "received_date": "",
        "receiver": props.emp_user_type === "employee" ? props.userData.employee_id : props.userData.company_id,
        "receiver_type": props.emp_user_type === "employee" ? "employee" : "employer",
        "added_type": "uploaded_agreement"
    }
    let validators = {
        type: [
            (value) => (value === "" || value === null ? "Agreement Type is required" : null),
        ],
    }

    const { state, setState, onInputChange, errors, validate, setErrors } =
        useValidation(initialFormState, validators);

    useEffect(() => {
        if (props.felidData) {
            setState({
                ...state, type: props.felidData.type, "signature_status": props.felidData.signature_status,
                "send_date": props.felidData.send_date,
                "received_date": props.felidData.received_date,
                "receiver": props.felidData.receiver,
                "receiver_type": props.felidData.receiver_type,
                "added_type": props.felidData.added_type,
                id: props.felidData.id
            })
            // Check if the type is "Other" or not in the predefined list
            const isCustom = props.felidData.type === "Other" || !(filterjson.Rerainer_Agreement_subCategories || []).includes(props.felidData.type);
            setIsOtherSelected(isCustom);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.felidData])

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const fakeEvent = { target: { files: e.dataTransfer.files } };
            handleBulkFileChange(fakeEvent);
        }
    };

    /*On change function to upload bulk document in 1 array*/
    const handleBulkFileChange = async (event, id) => {
        const files = event.target.files;

        // Limit to 15 files
        if (files.length > 15) {
            toast.error("You can only upload a maximum of 15 files at a time", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
            });
            return;
        }

        const maxSize = 1024 * 8000; // 8 MB
        const allowedTypes = [".pdf", ".jpg", ".jpeg", ".png"];

        // Start with existing files or initialize
        const existingFiles = Array.isArray(docFileBase) ? [...docFileBase] : [];
        const newFiles = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            const lastDotIndex = file.name.lastIndexOf(".");
            let fileName = file.name.substring(0, lastDotIndex).replace(/\.+/g, "");
            const fileExtension = file.name.substring(lastDotIndex + 1);
            const finalFileName = `${fileName}.${fileExtension}`;

            const updatedFile = new File([file], finalFileName, {
                type: file.type,
                lastModified: file.lastModified,
            });

            // Validate file type
            const fileType = `.${fileExtension.toLowerCase()}`;
            if (!allowedTypes.includes(fileType)) {
                toast.error(
                    `Invalid document type for file '${finalFileName}'. Allowed types: PDF, JPG, JPEG, PNG`,
                    {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 1000,
                    }
                );
                return;
            }

            // Validate file size
            if (updatedFile.size > maxSize) {
                toast.error(
                    `Document size can't be more than 8 MB for file '${finalFileName}'`,
                    {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 1000,
                    }
                );
                return;
            }

            // Prevent duplicates
            const isDuplicate = existingFiles.some(f => f.name === finalFileName) || newFiles.some(f => f.name === finalFileName);
            if (!isDuplicate) {
                newFiles.push(updatedFile);
            }
        }

        const updatedFiles = [...existingFiles, ...newFiles];

        // Save states
        setDocFileBase(updatedFiles); // List of files
    };

    /*Function to remove the file from the selected file list */
    const removeFile = (fileName) => {
        setDocFileBase((prevFiles) =>
            prevFiles.filter((file) => file.name !== fileName)
        ); // Remove file by name
    };

    /*function to close the modal */
    const close = () => {
        props.close()
        setState(initialFormState)
        setErrors("")
        props.setAgreementData("")
    }

    /*Function to submit the form */
    const onFormSubmit = async () => {
        if (validate() && (docFileBase || state.id)) {
            setLoading(true);
            try {
                let res;
                if (docFileBase) {
                    res = await AddSharePointDOcument(
                        props.emp_user_type === "employee" ? props.userData.employee_id : props.userData.company_id,
                        props.emp_user_type === "employee" ? "employee" : "employer",
                        props.folderId,
                        "",
                        docFileBase,
                        1
                    );
                    // Move the dependent code here, inside the check where 'res' is guaranteed to be defined
                    if (res?.data?.message === "Document Upload" || props?.felidData?.id) {
                        setDocFileBaseErr("");
                        try {
                            let resApi = await AddDocIdToAGreementApiFun({
                                felidData: state,
                                user_id: state.receiver,
                                emp_user_type: state.receiver_type,
                                folderID: props.folderID,
                                document_id: res.data.data[0][0].document_id,
                                // email_for
                            });
                            console.log(resApi);
                            props.setApicall(true);
                            setLoading(false);
                            close();
                        } catch (err) {
                            console.log(err);
                            setLoading(false);
                        }
                    }
                } else { // This block handles the case where there is no new document to upload but an existing one to update
                    if (props?.felidData?.id) {
                        setDocFileBaseErr("");
                        try {
                            let resApi = await AddDocIdToAGreementApiFun({
                                felidData: state,
                                user_id: state.receiver,
                                emp_user_type: state.receiver_type,
                                // The document_id is not available here, so you need to handle that
                                // For example, by getting it from the existing fieldData
                                document_id: props.felidData.document_id,
                            });
                            console.log(resApi);
                            props.setApicall(true);
                            close();
                            setLoading(false);
                        } catch (err) {
                            console.log(err);
                            setLoading(false);
                        }
                    }
                }
            } catch (error) {
                console.log("Error saving doc to sharepoint", error);
                setLoading(false);
            }
        } else {
            setDocFileBaseErr("Please Select the Agreement file");
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
                onClick={close}
            >
                <i className="fas fa-times"></i>
            </button>
            <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
                <form>
                    <h5 className="text-center pt-2 mb-7">Upload Retainer Agreement</h5>
                    <div
                        className=" align-items-center mt-2 mb-2"
                        style={{ padding: "0!important" }}
                    >
                        <div className="form-group col mt-5">
                            <label
                                htmlFor="type"
                                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                            >
                                Agreement Type  : <span className="text-danger">*</span>
                            </label>
                            <div className={errors.type ? "border border-danger rounded" : ""}>
                                <SelectBox
                                    Width={"yes"}
                                    options={agreementOptions}
                                    type="type"
                                    isDisabled={isOtherSelected}
                                    selectedValue={isOtherSelected ? "Other" : state.type || ""}
                                    onChange={(e) => {
                                        if (e && e.value === "Other") {
                                            setIsOtherSelected(true);
                                            setState({ ...state, type: "" });
                                        } else {
                                            setIsOtherSelected(false);
                                            onInputChange({
                                                target: {
                                                    name: "type",
                                                    value: e ? e.value : "",
                                                },
                                            });
                                        }
                                    }}
                                />
                                {isOtherSelected && (
                                    <input
                                        type="text"
                                        className="form-control mt-2"
                                        placeholder="Enter custom agreement type"
                                        value={state.type}
                                        onChange={(e) => setState({ ...state, type: e.target.value })}
                                    />
                                )}
                            </div>
                            {/*----ERROR MESSAGE FOR WORK PERMIT----*/}
                            {errors.type && (
                                <span key={errors.type} className="text-danger font-size-3">
                                    {errors.type}
                                </span>
                            )}
                        </div>
                        <div className="form-group col mt-5">
                            <label htmlFor='send_date'>Send Date</label>
                            <input type="date" onChange={(e) => onInputChange(e)}
                                value={state.send_date}
                                id="send_date"
                                name="send_date"
                                className='form-control'
                            />
                        </div>
                        <div className="form-group col mt-5">
                            <label htmlFor='received_date'>Received Date</label>
                            <input type="date" onChange={(e) => onInputChange(e)}
                                value={state.received_date}
                                id="received_date"
                                name="received_date"
                                className='form-control'
                            />
                        </div>
                        <div className="form-group col mt-5">
                            <label htmlFor='signature_status'>Signature status</label>
                            <select onChange={onInputChange}
                                value={state.signature_status}
                                id="signature_status"
                                name="signature_status"
                                className='form-control'>
                                <option value="">select</option>
                                <option value="2">Completed</option>
                                <option value="1">Incomplete</option>
                            </select>
                        </div>
                        {docFileBase.length > 0 && (
                            <div className="form-group">
                                <ul className="list-unstyled d-flex align-items-center flex-wrap">
                                    {docFileBase.map((file, index) => (
                                        <li
                                            key={index}
                                            className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                        >
                                            {file.name}
                                            <Link
                                                className="p-0 ms-1"
                                                onClick={() => removeFile(file.name)}
                                            >
                                                <i className="px-3 fa fa-times-circle" aria-hidden="true"></i>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div className={props?.felidData?.id ? "d-none" : "d-flex align-items-center justify-content-start col-12"}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            // onPaste={handlePaste}
                            onClick={() => fileInputRef.current.click()}>
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
                                    onChange={(e) => {
                                        handleBulkFileChange(e);
                                    }}
                                />
                                <span className="mr-3" style={{ fontSize: 24 }}>+</span>
                                <p className="m-0" style={{ fontWeight: 400, fontSize: 14 }}>
                                    Upload file
                                </p>
                            </label>
                            {docFileBaseErr ? <span className="text-danger font-size-3">
                                {docFileBaseErr}
                            </span> : null}
                        </div>
                        <div className=' d-flex justify-content-center'>
                            <button type="button" disabled={loading} onClick={(e) => { onFormSubmit(e) }} className="btn btn-primary">
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </div>
                </form>
            </div >
        </Modal >
    )
}
