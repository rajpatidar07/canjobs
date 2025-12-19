import React, { useState } from "react";
import { toast } from "react-toastify";
import { AddSharePointFolders } from "../../../api/api";
import { Form, Modal, Button } from "react-bootstrap";
import SelectBox from "../Common function/SelectBox";

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
          toast.success(`New folder Created successfully`, { autoClose: 1000 });
          setState((prev) => ({ ...prev, newType: "" }));
          props.close();
          props.setFolderApiCall(true);
        } else if (res?.data?.error?.message === "Name already exists") {
          toast.error(`Folder Already exists`, { autoClose: 1000 });
        }
      } catch (Err) {
        console.error(Err);
      }
    }
  };

  return (
    <Modal
      onHide={props.close}
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
          <div className="form-group text-center">
            {state.docTypeName === "other" ? (
              <>
                <h5 className="text-center mb-7">Create a Folder</h5>
                <div className="form-group " width="100%">
                  <label className="text-center">
                    Name<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    value={state.newType}
                    placeholder="Enter Folder Name"
                    className="me-2 form-control"
                    onChange={handleNewTypeChange}
                  />
                  <div
                    className="d-flex justify-content-center gap-2 text-center py-3 mt-3  w-100"
                    style={{ gap: ".5rem" }}
                  >
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
                      // className="mx-2"
                      onClick={() => {
                        setState((prev) => ({
                          ...prev,
                          newType: "",
                          docTypeName: "",
                        }));
                        props.close();
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="form-group text-center">
                <h5 className="text-center mb-7">Select a Folder</h5>

                {/* <Dropdown className="w-100 form-control">
                  <Dropdown.Toggle size="xl" variant="transparent" className="w-100">
                    + Add New Folder 
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    style={{ maxHeight: "300px", overflowY: "auto", width: "100%" }}
                  >
                    <Dropdown.Item onClick={() => handleDocTypeChange("")} className="w-100">
                      Select Folder Name
                    </Dropdown.Item>
                    {DocTypeData.map((item, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() => handleDocTypeChange(item)} className="w-100"
                      >
                        {item.replaceAll("_", " ")}
                      </Dropdown.Item>
                    ))}
                    <Dropdown.Item onClick={() => handleDocTypeChange("other")}>
                      Other
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown> */}
                <SelectBox
                  Width={"yes"}
                  options={[
                    ...DocTypeData.map((option) => ({
                      value: option,
                      label: option.replaceAll("_", " ")
                    })),
                    {
                      value: "other",
                      label: "Other"
                    }
                  ]
                  }
                  type={"folder"}
                  selectedValue={""}
                  onChange={(e) => { handleDocTypeChange(e ? e.value : "") }}
                />
              </div>
            )}
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
