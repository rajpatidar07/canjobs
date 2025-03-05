import React, { useState } from "react";
import { toast } from "react-toastify";
import { AddSharePointFolders } from "../../../api/api";
import { Form, Dropdown, Modal, Button } from "react-bootstrap";

export default function AddFolderModal(props) {
    const [state, setState] = useState({
        docTypeName: "",
        newType: "",
        folderID: props?.folderId,
        docTypeList: [],
        showDropDown: false,
    });

    const DocTypeData =
    props?.emp_user_type === "employer"
      ? [
        "Business T2",
        "Recent PD7A",
        "Business T4",
        "Business Incorporation Certificate",
        "Employment Contract",
        "Schedule A",
        "Signed Job Offer",
        "PD7A of year",
        "T2 Schedule 100 and 125",
        "Certificate of incorporation",
        "Business license",
        "T4 summary of year",
        "Request for Exception from English Language Requirement for LMIA Application",
        "CPA Attestation Letter",
        "Representative Submission Letter",
      ]
      : [
        "passport",
        "drivers_license",
        "photograph",
        "immigration_status",
        "lmia",
        "job_offer_letter",
        "provincial_nominee_letter",
        "proof_of_funds",
        "proof_of_employment",
        "marriage_certificate",
        "education_metric",
        "education_higher_secondary",
        "education_graduation",
        "education_post_graduation",
        "resume_or_cv",
        "ielts",
        "medical",
        "police_clearance",
        "refusal_letter",
        "Employment Contract",
        "Reference Letters",
        "Client Info",
        "Representative Submission Letter",
        "Bank Statement",
      ];

    const handleNewTypeChange = (e) => {
        setState((prev) => ({
            ...prev,
            newType: e.target.value.replace(/[^a-zA-Z0-9 ]/g, ""),
        }));
    };

    const handleDocTypeChange = async (selectedType) => {
        setState((prev) => ({
            ...prev,
            docTypeName: selectedType,
            showDropDown: false,
        }));

        if (selectedType === "other") {
            setState((prev) => ({ ...prev, newType: "" }));
        } else {
            try {
                let res = await AddSharePointFolders(selectedType, state?.folderID);
                if (res?.data?.message === "Folder created successfully!") {
                    toast.success(`Type Created successfully`, { autoClose: 1000 });
                    setState((prev) => ({ ...prev, newType: "" }));
                    props.close()
                    props.setFolderApiCall(true)
                } else if (res?.data?.error?.message === "Name already exists") {
                    toast.error(`Type Already exists`, { autoClose: 1000 });
                }
            } catch (Err) {
                console.error(Err);
            }
        }
    };

    return (
        <Modal onHide={props.close}
            show={props.show}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <button
                type="button"
                className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper "
                data-dismiss="modal"
                onClick={props.close}
            >
                <i className="fas fa-times"></i>
            </button>
            <Modal.Body className="bg-white rounded h-100 ">
                <Form>
                    <h5 className="text-center mb-7">Change Applicants Status</h5>
                    <div className="form-group text-center">
                        {state.docTypeName === "other" ? (
                            <div className="d-flex flex-column">
                                <Form.Control
                                    type="text"
                                    value={state.newType}
                                    placeholder="Enter new type"
                                    className="me-2 form-control"
                                    onChange={handleNewTypeChange}
                                />
                                <div className="d-flex text-center p-3  ">
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => handleDocTypeChange(state.newType)}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="mx-2"
                                        onClick={() => {setState((prev) => ({ ...prev, newType: "", docTypeName: "" }))
                                    props.close()}}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <Dropdown>
                                <Dropdown.Toggle size="xl" variant="gray">
                                    + Add New Folder
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{ maxHeight: "300px", overflowY: "auto" }}>
                                    <Dropdown.Item onClick={() => handleDocTypeChange("")}>
                                        Select Folder Name
                                    </Dropdown.Item>
                                    {DocTypeData.map((item, index) => (
                                        <Dropdown.Item key={index} onClick={() => handleDocTypeChange(item)}>
                                            {item.replaceAll("_", " ")}
                                        </Dropdown.Item>
                                    ))}
                                    <Dropdown.Item onClick={() => handleDocTypeChange("other")}>
                                        Other
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        )}
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
