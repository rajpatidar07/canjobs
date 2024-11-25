import React, { useEffect, useState } from "react";
import SignaturePadComponent from "../../common/Retaineragreement/SignaturePadComponent";
import { AddUpdateAgreement, GetAgreement } from "../../../api/api";
import useValidation from "../../common/useValidation";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import ClietFamilyFeilds from "../../common/Retaineragreement/clietFamilyFeilds";
const AgreementOneForm = ({
  folderId,
  user_id,
  openSignature,
  emp_user_type,
  show,
  close,
  userData,
  setApicall,
  felidData,
  index,
  setFelidData,
}) => {
  const [loading, setLoading] = useState(false);
  let SigningUserType = localStorage.getItem("userType");

  const initialClientState = {
    client_first_name:
      emp_user_type === "employee" ? userData?.name?.split(" ")[0] : "",
    client_last_name:
      emp_user_type === "employee" ? userData?.name?.split(" ")[1] : "",
    client_signature: "",
    date_signature_client: "",
    client_date_of_birth: "",
  };
  const initialFormState = {
    type: "",
    rcic_membership_no: "",
    matter: "",
    summary: "",
    initial: "",
    professional_fees: "",
    courier_charges: "",
    government_fees: "",
    application_fees: "",
    biometrics_fees: "",
    administrative_fee: "",
    applicable_taxes: "",
    balance: "",
    total_cost: "",
    applicable_retainer_fee_stape_1: "",
    applicable_government_processing_fee_stape_1: "",
    applicable_retainer_fee_stape_2: "",
    applicable_government_processing_fee_stape_2: "",
    total_amount_signing_of_contract: "",
    balance_paid_at_time_of_filing: "",
    rcic_first_name: "",
    rcic_last_name: "",
    rcic_signature: "",
    date_signature_client: "",
    date_signature_rcic: "",
    sender: localStorage.getItem("admin_id"),
    sender_type: localStorage.getItem("admin_type"),
    receiver:
      emp_user_type === "employee"
        ? userData?.employee_id
        : userData?.company_id,
    receiver_type: emp_user_type === "employee" ? "employee" : "employer",
    assigned_by_id: "",
    assigned_by_type: "",
    signature_status: "",
    id: "",
    client_file_no: "",
    agreement_date: "",
    client_email: userData?.email || "",
    client_contact: userData?.contact_no || "",
    client_telephone: "",
    client_cellphone: "",
    client_fax: "",
    client_address:
      emp_user_type === "employee"
        ? userData?.current_location + " " + userData?.currently_located_country
        : userData?.address,
    family_json: [initialClientState],
    client_first_name:
      emp_user_type === "employee" ? userData?.name : userData?.company_name,
  };
  const validators = {
    family_json: {
      validateClientEmail: [(value) =>
        value === "" || value.trim() === ""
          ? "Client's Email is required"
          : /\S+@\S+\.\S+/.test(value)
            ? null
            : "Client's Email is invalid"],
      validateClientFirstName: [(value) =>
        value === "" || value.trim() === "" ? "First name is required" : null],
      validateClientLastName: [(value) =>
        value === "" || value.trim() === "" ? "Last name is required" : null],
    },
    client_address: [(value) =>
      value === "" || value.trim() === "" ? "Client Address is required" : null],
    client_contact: [(value) =>
      value === "" || value.trim() === ""
        ? "Client Contact No is required"
        : null],
    client_telephone: [(value) =>
      value === "" || value.trim() === ""
        ? "Client's Telephone Number is required"
        : null],
    client_cellphone: [(value) =>
      value === "" || value.trim() === ""
        ? "Client's Cellphone Number is required"
        : null],
    initial: [(value) =>
      value === "" || value.trim() === "" ? "Initial is required" : null],
    summary: [(value) =>
      value === "" || value.trim() === ""
        ? "Summary of prelimi nary advice is required"
        : null],
  };

  const { state,/* validate,*/ setState, onInputChange, errors } = useValidation(
    initialFormState,
    validators
  );

  useEffect(() => {
    if (felidData) {
      const updatedState = { ...initialFormState };

      // Parse the family_json field
      if (felidData?.family_json) {
        try {
          updatedState.family_json = felidData?.family_json;
        } catch (err) {
          console.err("Failed to parse family_json:", err);
        }
      }

      // Update the rest of the state with felidData
      for (const key in felidData) {
        if (
          felidData[key] !== null &&
          felidData[key] !== undefined &&
          key !== "family_json"
        ) {
          updatedState[key] = felidData[key];
        }
      }

      setState(updatedState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [felidData]);
  /*Function and states for the family member */
  const [newClient, setNewClient] = useState({
    client_first_name: "",
    client_last_name: "",
    client_signature: "",
    date_signature_client: "",
    client_date_of_birth: "",
  });

  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const addClient = () => {
    if (editIndex !== null) {
      const updatedClients = state?.family_json.map((client, index) =>
        index === editIndex ? { ...newClient, id: client.id } : client
      );
      setState({ ...state, family_json: updatedClients });
      setEditIndex(null);
    } else {
      // Assuming state.family_json is an array
      const updatedClients = [
        ...(state?.family_json || []),
        { ...newClient, id: Date.now() },
      ];
      setState({ ...state, family_json: updatedClients });
    }
    setNewClient({
      client_first_name: "",
      client_last_name: "",
      client_signature: "",
      date_signature_client: "",
      client_date_of_birth: "",
    });
  };

  const removeClient = (indexToDelete) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      let newjson = state?.family_json.filter(
        (_, index) => index !== indexToDelete
      );
      setState({ ...state, family_json: newjson });
    }
  };
  const editClient = (index) => {
    const clientToEdit = state?.family_json[index];
    setNewClient(clientToEdit);
    setEditIndex(index);
  };

  /*on change function for the main client */
  const handleClientChange = (index, event) => {
    const { name, value } = event.target;
    setState((prevState) => {
      const family_json = [...prevState.family_json];
      family_json[index] = { ...family_json[index], [name]: value };
      return { ...prevState, family_json };
    });
  };

  /*Function to submit the form */
  const onFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      (openSignature === "yes" &&
        (index === "rcic_signature" || index === "final")) ||
      openSignature === "no"
    ) {
      // console.log(index, e ``                                                        rrors)
      // if (index === "update details" ? validate() : "") {
      console.log("first")
      try {
        let res = await AddUpdateAgreement(state);
        console.log(res);
        if (
          res.data.status === 1 &&
          res.data.message === "Agreement updated successfully."
        ) {
          setLoading(false);
          setState(initialFormState);
          toast.success("Felids added successfully.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          // if (openSignature === "yes") {
          try {
            let res = await GetAgreement(
              "",
              user_id,
              emp_user_type,
              felidData.type
            );
            /*FUnction to generate pdf after adding signature */
            if (
              openSignature === "yes" &&
              (res.data.data[0].signature_status === "2" ||
                res.data.data[0].signature_status === "1" ||
                index === "rcic_signature")
            ) {
              const stateData = {
                user_id: user_id,
                emp_user_type: emp_user_type,
                folderId: folderId,
                felidData: res.data.data[0],
                family_json: res.data.data[0].family_json,
              };
              // console.log(stateData);
              const newPageUrl = state.type === "initial consultation" ? `/initial_consultation ` : state.type === "recruitment services agreement" || state.type === "initial consultation" ? `/recruitment_service` : `/agreeone`;
              localStorage.setItem(
                "agreementStateData",
                JSON.stringify(stateData)
              );
              // Open the new page in a new tab
              setApicall(true);
              close();
              if (index === "final") {
                window.open(newPageUrl, "_blank");
                window.close();
              } else {
                window.open(newPageUrl, "_blank");
              }
            }
          } catch (err) {
            console.log(err);
          }
          // }
          close();
          setApicall(true);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
      // }
    } else {
      setFelidData({
        ...felidData,
        family_json: state.family_json,
        signature_status: state.signature_status,
      });
      setLoading(false);
      close();
    }
  };
  useEffect(() => {
    if (state.initial) {
      setState({ ...state, signature_status: "1", pdf_genrated_status: "1" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.initial]);

  /*Function to add signature */
  const handleSignature = (signature, clientIndex, label) => {
    const now = new Date();
    const today = now.toISOString().split("T")[0]; // Date in YYYY-MM-DD format
    const time = now.toTimeString().split(" ")[0]; // Time in HH:MM:SS format
    const dateTime = `${today} ${time}`; // Combine date and time

    setState((prevState) => {
      const updatedState = { ...prevState };

      if (label === "rcic_signature") {
        updatedState.rcic_signature = signature;
        updatedState.date_signature_rcic = dateTime;
      } else if (label === "initial") {
        updatedState.initial = signature;
      } else {
        const family_json = [...prevState.family_json];
        family_json[clientIndex] = {
          ...family_json[clientIndex],
          client_signature: signature,
          date_signature_client: dateTime,
        };
        updatedState.family_json = family_json;
        updatedState.signature_status = family_json[0].client_signature ? 1 : 0;
      }
      return updatedState;
    });
  };
  const IsFamilyFelidsEmpty = JSON.stringify(newClient) === JSON.stringify({
    "client_first_name": "",
    "client_last_name": "",
    "client_signature": "",
    "date_signature_client": "",
    "client_date_of_birth": ""
  });
  return (
    <Modal
      show={show}
      size={
        openSignature === "yes" ? "md" : state.type === "recruitment services agreement" || state.type === "initial consultation" ? "lg" : "xl"}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <button
        type="button"
        className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
        data-dismiss="modal"
        onClick={() => {
          close();
        }}
      >
        <i className="fas fa-times"></i>
      </button>
      <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
        <form onSubmit={onFormSubmit}>
          <h5 className="text-center mb-7 pt-2">
            {openSignature === "yes"
              ? "Add Signature"
              : "Add Retainer Agreement Fields"}
          </h5>
          <div className="row">
            {/* Render client-specific fields */}
            {openSignature === "yes"
              ? null
              : state?.family_json[0] && (
                <React.Fragment key={index}>
                  <div className="form-group col-lg-3 col-md-4 col-sm-6">
                    <label
                      htmlFor={`client_first_name_0`}
                      className="font-size-4 text-black-2 line-height-reset"
                    >
                      Client's First Name
                      {/* <span className="text-danger">*</span> */}
                    </label>
                    <input
                      type="text"
                      className="form-control col"
                      value={state?.family_json[0]?.client_first_name}
                      onChange={(e) => handleClientChange(0, e)}
                      required
                      id={`client_first_name_0`}
                      name="client_first_name"
                      placeholder="Client's first name"
                    />
                  </div>
                  <div className="form-group col-lg-3 col-md-4 col-sm-6">
                    <label
                      htmlFor={`client_last_name_0`}
                      className="font-size-4 text-black-2 line-height-reset"
                    >
                      Client's Last Name
                      {/* <span className="text-danger">*</span> */}
                    </label>
                    <input
                      type="text"
                      className="form-control col"
                      value={state?.family_json[0]?.client_last_name}
                      onChange={(e) => handleClientChange(0, e)}
                      id={`client_last_name_0`}
                      required
                      name="client_last_name"
                      placeholder="Client's last name"
                    />
                  </div>
                </React.Fragment>
              )}

            {openSignature === "yes"
              ? null
              : (index === "update details"
                ? [
                  {
                    label: "Client Address",
                    display: "",
                    name: "client_address",
                    type: "text",
                    requried: true,
                  },
                  {
                    label: "Client Email",
                    name: "client_email",
                    type: "email",
                    requried: true,
                  },
                  {
                    label: "Client Contact No",
                    name: "client_contact",
                    display: state.type === "recruitment services agreement" ? "d-none" : "",
                    type: "number",
                    requried: state.type === "recruitment services agreement" ? false : true,
                  },
                  {
                    label: "Client's Telephone Number",
                    display: state.type === "initial consultation" ? "d-none" : "",
                    name: "client_telephone",
                    type: "number",
                    requried: state.type === "initial consultation" ? false : true,
                  },
                  {
                    label: "Client's Cellphone Number",
                    display: state.type === "initial consultation" ? "d-none" : "",
                    name: "client_cellphone",
                    type: "number",
                    requried: state.type === "initial consultation" ? false : true,
                  },
                  {
                    label: "Client's Fax Number",
                    display: state.type === "initial consultation" ? "d-none" : "",
                    name: "client_fax",
                    type: "number",
                    requried: false,
                  },
                  {
                    label: "Initial",
                    name: "initial",
                    type: "text",
                    requried: true,
                  },
                  {
                    label:
                      "Summary of preliminary advice given to the client",
                    name: "summary",
                    display: state.type === "recruitment services agreement" || state.type === "initial consultation" ? "d-none" : "",
                    type: "text",
                    requried: state.type === "recruitment services agreement" || state.type === "initial consultation" ? false : true,
                  },
                ]
                : [
                  {
                    label: "Client Address",
                    display: "",
                    name: "client_address",
                    type: "text",
                  },
                  {
                    label: "Client Email",
                    display: "",
                    name: "client_email",
                    type: "email",
                  },
                  {
                    label: "Client Contact No",
                    display: state.type === "recruitment services agreement" ? "d-none" : "",
                    name: "client_contact",
                    type: "number",
                  },
                  {
                    label: "Client's Telephone Number",
                    display: state.type === "initial consultation" ? "d-none" : "",
                    name: "client_telephone",
                    type: "number",
                  },
                  {
                    label: "Client's Cellphone Number",
                    display: state.type === "initial consultation" ? "d-none" : "",
                    name: "client_cellphone",
                    type: "number",
                  },
                  {
                    label: "Client's Fax Number",
                    display: state.type === "initial consultation" ? "d-none" : "",
                    name: "client_fax",
                    type: "number",
                  },
                  {
                    label: "Client File Number",
                    display: state.type === "recruitment services agreement" || state.type === "initial consultation" ? "d-none" : "",
                    name: "client_file_no",
                    type: "number",
                  },
                  {
                    label: "Agreement Creation Date",
                    display: "",
                    name: "agreement_date",
                    type: "date",
                  },
                  {
                    label: "Professional Fees",
                    display: state.type === "recruitment services agreement" || state.type === "initial consultation" ? "d-none" : "",
                    name: "professional_fees",
                    type: "number",
                  },
                  {
                    label: "Courier charges",
                    display: state.type === "recruitment services agreement" || state.type === "initial consultation" ? "d-none" : "",
                    name: "courier_charges",
                    type: "number",
                  },
                  {
                    label: "Administrative Fee",
                    display: state.type === "recruitment services agreement" || state.type === "initial consultation" ? "d-none" : "",
                    name: "administrative_fee",
                    type: "number",
                  },
                  {
                    label: "Government fees",
                    display: state.type === "recruitment services agreement" || state.type === "initial consultation" ? "d-none" : "",
                    name: "government_fees",
                    type: "number",
                  },
                  {
                    label: "Applicable Taxes",
                    display: state.type === "recruitment services agreement" || state.type === "initial consultation" ? "d-none" : "",
                    name: "application_fees",
                    type: "number",
                  },
                  {
                    label: "Balance (Paid at time of filing)",
                    display: state.type === "recruitment services agreement" || state.type === "initial consultation" ? "d-none" : "",
                    name: "balance",
                    type: "number",
                  },
                  {
                    label: "Total Cost",
                    display: state.type === "recruitment services agreement" || state.type === "initial consultation" ? "d-none" : "",
                    name: "total_cost",
                    type: "number",
                  },
                  {
                    label:
                      "The Client asked the RCIC, and the RCIC has agreed, to act for the Client in the matter of",
                    display: state.type === "recruitment services agreement" || state.type === "initial consultation" ? "d-none" : "",
                    name: "matter",
                    type: "text",
                  },
                  {
                    label:
                      "Summary of preliminary advice given to the client",
                    display: state.type === "recruitment services agreement" || state.type === "initial consultation" ? "d-none" : "",
                    name: "summary",
                    type: "text",
                  },
                  {
                    label:
                      "Applicable Retainer Fee for this stage (Non-Refundable) for Step 1",
                    display: state.type === "recruitment services agreement" || state.type === "initial consultation" ? "d-none" : "",
                    name: "applicable_retainer_fee_stape_1",
                    type: "number",
                  },
                  {
                    label:
                      "Applicable Government Processing Fee for Step 1",
                    display: state.type === "recruitment services agreement" || state.type === "initial consultation" ? "d-none" : "",
                    name: "applicable_government_processing_fee_stape_1",
                    type: "number",
                  },
                  {
                    label:
                      "Applicable Retainer Fee for this stage (Non-Refundable) for Step 2",
                    display: state.type === "recruitment services agreement" || state.type === "initial consultation" ? "d-none" : "",
                    name: "applicable_retainer_fee_stape_2",
                    type: "number",
                  },
                  {
                    label:
                      "Total Amount: (Non-Refundable) (Paid at signing of contract and sharing of checklist)",
                    display: state.type === "recruitment services agreement" || state.type === "initial consultation" ? "d-none" : "",
                    name: "total_amount_signing_of_contract",
                    type: "number",
                  },
                  {
                    label:
                      "Balance (Non-Refundable) (Paid at time of filing)",
                    display: state.type === "recruitment services agreement" || state.type === "initial consultation" ? "d-none" : "",
                    name: "balance_paid_at_time_of_filing",
                    type: "number",
                  },
                  {
                    label:
                      "Other Professional Advice INitial Consultation",
                    display: state.type === "initial consultation" ? "" : "d-none",
                    name: "other_professional_advice_initial_consultation",
                    type: "text",
                  },
                  {
                    label:
                      "Additional Relevant Information",
                    display: state.type === "initial consultation" ? "" : "d-none",
                    name: "additional_relevant_information",
                    type: "text",
                  },


                ]
              ).map(({ label, name, type, requried, display, index }) => (
                <div
                  className={`form-group ${label.split(" ").length > 6
                    ? "col-lg-6 col-md-12"
                    : "col-lg-3 col-md-4 col-sm-6"
                    } ${display}`}
                  key={index}
                >
                  <label
                    htmlFor={name}
                    className="font-size-4 text-black-2 line-height-reset"
                  >
                    {label}
                    {/* {requried === true ? <span className="text-danger">*</span> : ""} */}
                  </label>
                  <input
                    type={type}
                    className={`${errors[name] ? "border border-danger" : ""
                      } form-control col ${type === "date" ? "coustam_datepicker" : ""
                      }`}
                    value={state?.[name] || ""}
                    onKeyDownCapture={
                      type === "date" ? (e) => e.preventDefault() : null
                    }
                    onChange={onInputChange}
                    placeholder={label}
                    id={name}
                    name={name}
                    required={requried}
                  />
                  {errors[name] && (
                    <span className="text-danger font-size-3 mx-5">
                      {errors[name]}
                    </span>
                  )}
                </div>
              ))}
            <div
              className={
                openSignature === "yes" || state.type === "recruitment services agreement" || state.type === "initial consultation" ? "d-none" : "form-group col-md-12 "
              }
            >
              <h3 className="font-size-4 text-black-2 line-height-reset">
                Add Family Members
              </h3>
              <div className="">
                <ClietFamilyFeilds
                  handleInputChange={handleInputChange}
                  newClient={newClient}
                  removeClient={removeClient}
                  editClient={editClient}
                  clients={state?.family_json}
                  addClient={addClient}
                />
              </div>
            </div>
            <div
              className={
                openSignature === "yes" &&
                  index !== "final" &&
                  index !== "rcic_signature"
                  ? "form-group col-md-12 "
                  : "d-none"
              }
            >
              <SignaturePadComponent
                signature={state?.family_json[index]?.client_signature}
                onEnd={(signature) =>
                  handleSignature(signature, index, "client_signature")
                }
                canvasProps={{ className: "form-control mx-5 col" }}
                setState={setState}
                state={state}
                index={index}
                label={`client_signature`}
                name={`Client Signature`}
                onSignature={handleSignature}
              />
            </div>
            <div
              className={
                index === "rcic_signature" &&
                  SigningUserType === "admin" &&
                  openSignature === "yes"
                  ? "form-group col-md-12 mb-0 mt-4"
                  : "d-none"
              }
            >
              <SignaturePadComponent
                onEnd={(signature) =>
                  handleSignature(signature, "", "rcic_signature")
                }
                canvasProps={{ className: "form-control mx-5 col" }}
                setState={setState}
                state={state}
                label={`rcic_signature`}
                name={`RCIC Signature`}
                onSignature={handleSignature}
                index={index}
              />
            </div>
          </div>
          <div className="form-group d-flex flex-column">
            {index === "final"
              ? "Are you sure to confirm submission? This signature cannot be updated later!"
              : ""}
            <p
              className={index === "final" ? "text-start p-2" : "d-none"}
              style={{ backgroundColor: index === "final" ? "#fdff00" : "" }}
            >
              Note: Allow access to open a pop-up window
            </p>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary btn-small w-25 mt-5 rounded-5 text-uppercase p-8"
                disabled={loading || !IsFamilyFelidsEmpty}
              >
                {loading
                  ? "Saving..."
                  : openSignature === "yes" && index !== "final"
                    ? "Save signature"
                    : "Save Agreement"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AgreementOneForm;
