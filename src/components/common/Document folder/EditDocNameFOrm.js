import React, { useState } from 'react';
import { ChangeDocNameSharpoint, ChangeFolderNameSharpoint } from "../../../api/api";
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function EditDocNameForm({ EditNameType, setApiCall, userId, name, docId, userType, show, close }) {
    const [newName, setNewName] = useState(EditNameType === "folder"
        ? name :
        name.split(".")[0]);
    const [loading, setLoading] = useState(false);
    console.log(EditNameType)
    const onEditNameClick = async () => {
        setLoading(true);
        if (EditNameType === "folder") {
            try {
                let res = await ChangeFolderNameSharpoint(userId, userType, newName, docId);
                console.log(res)
                if (res.data.message ===
                    "Folder name updated successfully!") {
                    toast.success(
                        `Folder name updated successfully`,
                        {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 1000,
                        }
                    );
                    setLoading(false);
                    setApiCall(true);
                    close();
                }
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        } else {
            try {
                let UpdatedName = newName + "." + name.split(".")[1];
                let res = await ChangeDocNameSharpoint(userId, userType, UpdatedName, docId);
                if (res.data.message === "Document name updated successfully!") {
                    toast.success(
                        `Document Uploaded successfully`,
                        {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 1000,
                        }
                    );
                    setLoading(false);
                    setApiCall(true);
                    close();
                }
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }
    };
    //Calling update Function
    const OnFormSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        onEditNameClick(); // Call your custom submission function
    };

    return (
        <Modal
            show={show}
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
                <form onSubmit={OnFormSubmit}> {/* Use onSubmit event */}
                    <h5 className="text-center mb-7">Update {EditNameType === "folder"
                        ? "Folder" : "File"} Name</h5>
                    <div className="form-group d-flex mb-3 p-0">
                        <label
                            htmlFor="name"
                            className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                        >
                            Name<span className="text-danger">*</span> :
                        </label>
                        <input
                            maxLength={30}
                            type="text"
                            placeholder="Document Name"
                            className="form-control"
                            id="name"
                            name="name"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                    </div>
                    <div className='row'>
                        <div className="form-group text-center col">
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
                                    type="submit" /* Change button type to submit */
                                >
                                    Submit
                                </button>
                            )}
                        </div>
                        <div className="form-group text-center mb-0 col">
                            <button
                                type="button"
                                className="btn btn-primary "
                                data-dismiss="modal"
                                onClick={close}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
