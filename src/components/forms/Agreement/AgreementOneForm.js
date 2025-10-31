import React, { useEffect, useState } from "react";
import SignaturePadComponent from "../../common/Retaineragreement/SignaturePadComponent";
import { AddUpdateAgreement, GetAgreement } from "../../../api/api";
import useValidation from "../../common/useValidation";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import ClietFamilyFeilds from "./clietFamilyFeilds";
import PaymentDetails from "./PaymentDetails";
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
  const [agreementType, setAgreementType] = useState(felidData.type);
  const [showTextInput, setShowTextInput] = useState(false);

  let SigningUserType = localStorage.getItem("userType");

  const initialClientState = {
    client_first_name:
      emp_user_type === "employee" ? userData?.name?.split(" ")[0] : userData?.contact_person_name?.split(" ")[0],
    client_last_name:
      emp_user_type === "employee" ? userData?.name?.split(" ")[1] : "",
    client_signature: "",
    date_signature_client: "",
    client_date_of_birth: emp_user_type === "employee" ? userData?.date_of_birth : "",
  };
  // const initialPaymentState = {
  //   description: "",
  //   notes: "",
  //   additional_info: "",
  //   retainer_fee: "",
  //   government_fee: "",
  // }
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
    applicable_retainer_fee_stape_3: "",
    applicable_government_processing_fee_stape_3: "",
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
    note: "",
    client_file_no: "",
    agreement_date: "",
    client_email: userData?.email || "",
    client_contact: userData?.contact_no || "",
    client_telephone: "",
    client_cellphone: "",
    client_fax: "",
    client_address:
      emp_user_type === "employee"
        ? userData?.current_location ? userData?.current_location + " " + userData?.currently_located_country : ""
        : userData?.address ? userData?.address : "",
    family_json: [initialClientState],
    client_first_name:
      emp_user_type === "employee" ? userData?.name : userData?.company_name,
    business_name: userData?.company_name || "",
    payment_json: []
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
        ? "Summary of preliminary advice is required"
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

      // Preserve business_name if felidData.business_name is empty or missing
      if (!felidData.business_name || felidData.business_name.trim() === "") {
        updatedState.business_name = userData?.company_name || "";
      }

      setState(updatedState);
      setAgreementType(updatedState.type)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [felidData]);
  /*Function and states for the family member and payment details */
  const [newClient, setNewClient] = useState({
    client_first_name: "",
    client_last_name: "",
    client_signature: "",
    date_signature_client: "",
    client_date_of_birth: "",
    applicant_type: "",
  });
  const [newPayment, setNewPayment] = useState({
    description: "",
    notes: "",
    additional_info: "",
    retainer_fee: "",
    government_fee: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "payment") {
      setNewPayment({ ...newPayment, [name]: value });
    } else { setNewClient({ ...newClient, [name]: value }); }
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
  const addPaymentDetails = () => {
    if (editIndex !== null) {
      const updatedClients = state?.payment_json.map((item, index) =>
        index === editIndex ? { ...newPayment, id: item.id } : item
      );
      setState({ ...state, payment_json: updatedClients });
      setEditIndex(null);
    } else {
      // Assuming state.payment_json is an array
      const updatedClients = [
        ...(state?.payment_json || []),
        { ...newPayment, id: Date.now() },
      ];
      setState({ ...state, payment_json: updatedClients });
    }
    setNewPayment({
      description: "",
      notes: "",
      additional_info: "",
      retainer_fee: "",
      government_fee: "",
    });
  };

  const removeClient = (indexToDelete, type) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      if (type === "payment") {
        let newjson = state?.payment_json.filter(
          (_, index) => index !== indexToDelete
        );
        setState({ ...state, payment_json: newjson });
      } else {
        let newjson = state?.family_json.filter(
          (_, index) => index !== indexToDelete
        );
        setState({ ...state, family_json: newjson });
      }
    }
  };
  const editClient = (index, type) => {
    if (type === "payment") {
      const PaymentToEdit = state?.payment_json[index];
      setNewPayment(PaymentToEdit);
      setEditIndex(index);
    } else {
      const clientToEdit = state?.family_json[index];
      setNewClient(clientToEdit);
      setEditIndex(index);
    }
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
      let filteredState = { ...state, email_for: index === "final" ? "admin" : "" };
      delete filteredState.created_by_name;
      if (state.id) {
        delete filteredState.updated_by_name;
        delete filteredState.agreement_sent;
      }
      // Conditionally include signature_status
      if (!(index === "rcic_signature" || index === "final" || state.initial)) {
        delete filteredState.signature_status;
      }

      // ✅ Convert signature text to image only if it's plain text (not already an image)
      const textToImage = (text) => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        const fontSize = 20;
        context.font = `bold ${fontSize}px 'Imperial Script', cursive`;
        const textWidth = context.measureText(text).width;

        canvas.width = textWidth + 20;
        canvas.height = fontSize + 20;

        context.fillStyle = "black";
        context.font = `bold ${fontSize}px 'Imperial Script', cursive`;
        context.fillText(text, 10, fontSize);

        return canvas.toDataURL("image/png");
      };

      // Convert rcic_signature if it's plain text
      if (
        state.rcic_signature &&
        !state.rcic_signature.startsWith("data:image/")
      ) {
        filteredState.rcic_signature = textToImage(state.rcic_signature);
      }
      if (
        state.initial &&
        !state.initial.startsWith("data:image/")
      ) {
        const words = state.initial.trim().split(" ").filter(word => word);
        let initials = "";

        if (words.length > 1) {
          // Multiple words: take first letter of each
          initials = words.map(word => word[0]).join(" ");
        } else if (words.length === 1) {
          const word = words[0];
          if (word.length === 2) {
            // Single word with 2 letters: return both with space
            initials = word[0] + " " + word[1];
          } else {
            // Single word with more than 2 letters: return only first letter
            initials = word[0];
          }
        }

        filteredState.initial = textToImage(initials || "");

      }


      // Convert only text-based client_signature to image
      filteredState.family_json = state.family_json.map((client) => {
        if (
          client.client_signature &&
          !client.client_signature.startsWith("data:image/")
        ) {
          return {
            ...client,
            client_signature: textToImage(client.client_signature),
          };
        }
        return client;
      });
      try {
        let res = await AddUpdateAgreement(filteredState);
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
              felidData.id,
              user_id,
              emp_user_type,
              "", "",
              felidData.type
            );
            /*Function to generate pdf after adding signature */
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
                email_for: state.rcic_signature ? "client" : ""
              };
              // console.log(stateData);
              const newPageUrl = agreementType === "initial consultation" ? `/initial_consultation ` : agreementType === "recruitment services agreement" || agreementType === "initial consultation" ? `/recruitment_service` : agreementType === "employer renewal stream"
                ? `/renewal_application` : agreementType === "more than one applicant"
                  ? "/more_than_one_applicant" :
                  agreementType === "employers"
                    ? "/employers_agreement"
                    : agreementType === "work permit"
                      ? "/work_permit"
                      : agreementType === "Alberta PNP and federal PR"
                        ? '/alberta_pnp'
                        : agreementType === "three column"
                          ? "/three_column"
                          : agreementType === "work permit application-2 stage" ?
                            "/work_permit_application_2_stage"
                            : agreementType === "dynamic RA"
                              ? "/dynamic_ra"
                              : `/agreeone`;
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
      setState({ ...state, signature_status: index === "final" ? "1" : felidData?.signature_status || "0", pdf_genrated_status: "1" });
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
        // updatedState.folderId = folderId;
        // updatedState.itemId = state.document_id
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
        // updatedState.signature_status = family_json[0].client_signature ? 1 : 0;
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
        openSignature === "yes" ? "md" : agreementType === "recruitment services agreement" || agreementType === "initial consultation" || agreementType === "employer renewal stream" || agreementType === "employers" ? "lg" : "xl"}
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
                      disabled={!SigningUserType}
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
                      disabled={!SigningUserType}
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
                    required: true,
                    disabled: !SigningUserType
                  },
                  {
                    label: "Client Email",
                    name: "client_email",
                    type: "email",
                    required: true,
                    disabled: !SigningUserType
                  },
                  {
                    label: "Client Contact No",
                    name: "client_contact",
                    display: agreementType === "recruitment services agreement" ? "d-none" : "",
                    type: "number",
                    required: agreementType === "recruitment services agreement" ? false : true,
                    disabled: !SigningUserType
                  },
                  {
                    label: "Client's Telephone Number",
                    display: agreementType === "initial consultation" || agreementType === "employer renewal stream" || agreementType === "employers" ? "d-none" : "",
                    name: "client_telephone",
                    type: "number",
                    disabled: !SigningUserType
                    // required: agreementType === "initial consultation" || agreementType === "employer renewal stream" || agreementType === "employers" ? false : true,
                  },
                  {
                    label: "Client's Cellphone Number",
                    display: agreementType === "initial consultation" || agreementType === "employer renewal stream" || agreementType === "employers" ? "d-none" : "",
                    name: "client_cellphone",
                    type: "number",
                    disabled: !SigningUserType
                    // required: agreementType === "initial consultation" || agreementType === "employer renewal stream" || agreementType === "employers" ? false : true,
                  },
                  {
                    label: "Client's Fax Number",
                    display: agreementType === "initial consultation" || agreementType === "employer renewal stream" || agreementType === "employers" ? "d-none" : "",
                    name: "client_fax",
                    type: "number",
                    required: false,
                    disabled: !SigningUserType
                  },
                  {
                    label: "Initial",
                    name: "initial",
                    type: "text",
                    required: true,
                    disabled: false
                  },
                  {
                    label:
                      "Summary of preliminary advice given to the client",
                    name: "summary",
                    display: agreementType === "recruitment services agreement" || agreementType === "initial consultation" || agreementType === "employer renewal stream" || agreementType === "employers" ? "d-none" : "",
                    type: "text",
                    required: agreementType === "recruitment services agreement" || agreementType === "initial consultation" || agreementType === "employer renewal stream" || agreementType === "employers" ? false : true,
                    disabled: false
                  },
                ]
                : [
                  {
                    label: "Client Address",
                    display: "",
                    name: "client_address",
                    type: "text",
                    disabled: false
                  },
                  {
                    label: "Client Email",
                    display: "",
                    name: "client_email",
                    type: "email",
                    disabled: false
                  },
                  {
                    label: "Client Contact No",
                    display: agreementType === "recruitment services agreement" ? "d-none" : "",
                    name: "client_contact",
                    type: "number",
                    disabled: false
                  },
                  {
                    label: "Client's Telephone Number",
                    display: agreementType === "initial consultation" || agreementType === "employer renewal stream" || agreementType === "employers" ? "d-none" : "",
                    name: "client_telephone",
                    type: "number",
                    disabled: false
                  },
                  {
                    label: "Client's Cellphone Number",
                    display: agreementType === "initial consultation" || agreementType === "employer renewal stream" || agreementType === "employers" ? "d-none" : "",
                    name: "client_cellphone",
                    type: "number",
                    disabled: false
                  },
                  {
                    label: "Client's Fax Number",
                    display: agreementType === "initial consultation" || agreementType === "employer renewal stream" || agreementType === "employers" ? "d-none" : "",
                    name: "client_fax",
                    type: "number",
                    disabled: false
                  },
                  {
                    label: "Client File Number",
                    display: agreementType === "recruitment services agreement" || agreementType === "employer renewal stream" || agreementType === "employers" ? "d-none" : "",
                    name: "client_file_no",
                    type: "number",
                    disabled: false
                  },
                  {
                    label: "Agreement Creation Date",
                    display: "",
                    name: "agreement_date",
                    type: "date",
                    disabled: false
                  },
                  {
                    label: "Professional Fees",
                    display: agreementType === "recruitment services agreement" || agreementType === "initial consultation" || agreementType === "employer renewal stream" || agreementType === "employers" ? "d-none" : "",
                    name: "professional_fees",
                    type: "text",
                    disabled: false
                  },
                  {
                    label: "Disbursement",
                    display: agreementType === "recruitment services agreement" || agreementType === "initial consultation" || agreementType === "employer renewal stream" || agreementType === "employers" ? "d-none" : "",
                    name: "courier_charges",
                    type: "text",
                    disabled: false
                  },
                  {
                    label: "Discount",
                    display: agreementType === "recruitment services agreement" || agreementType === "initial consultation" || agreementType === "employer renewal stream" || agreementType === "employers" ? "d-none" : "",
                    name: "administrative_fee",
                    type: "text",
                    disabled: false
                  },
                  {
                    label: "Government fees",
                    display: agreementType === "recruitment services agreement" || agreementType === "initial consultation" || agreementType === "employer renewal stream" || agreementType === "employers" ? "d-none" : "",
                    name: "government_fees",
                    type: "text",
                    disabled: false
                  },
                  {
                    label: "Applicable Taxes",
                    display: agreementType === "recruitment services agreement" || agreementType === "initial consultation" || agreementType === "employer renewal stream" || agreementType === "employers" ? "d-none" : "",
                    name: "application_fees",
                    type: "text",
                    disabled: false
                  },
                  {
                    label: "Balance (Paid at time of filing)",
                    display: agreementType === "recruitment services agreement" || agreementType === "initial consultation" || agreementType === "employer renewal stream" || agreementType === "employers" ? "d-none" : "",
                    name: "balance",
                    type: "text",
                    disabled: false
                  },
                  {
                    label: "Total Cost",
                    display: agreementType === "recruitment services agreement" || agreementType === "initial consultation" || agreementType === "employer renewal stream" || agreementType === "employers" ? "d-none" : "",
                    name: "total_cost",
                    type: "text",
                    disabled: false
                  },
                  {
                    label:
                      "The Client asked the RCIC, and the RCIC has agreed, to act for the Client in the matter of",
                    display: agreementType === "recruitment services agreement" || agreementType === "initial consultation" || agreementType === "employer renewal stream" || agreementType === "employers" ? "d-none" : "",
                    name: "matter",
                    type: "text",
                    disabled: false
                  },
                  {
                    label:
                      "Summary of preliminary advice given to the client",
                    display: agreementType === "recruitment services agreement" || agreementType === "initial consultation" || agreementType === "employer renewal stream" || agreementType === "employers" ? "d-none" : "",
                    name: "summary",
                    type: "text",
                    disabled: false
                  },
                  {
                    label:
                      "Applicable Retainer Fee for this stage (Non-Refundable) for Step 1",
                    display: agreementType === "recruitment services agreement" || agreementType === "initial consultation" || agreementType === "employer renewal stream" || agreementType === "employers" || agreementType === "dynamic RA" ? "d-none" : "",
                    name: "applicable_retainer_fee_stape_1",
                    type: "text",
                    disabled: false
                  },
                  {
                    label:
                      "Applicable Government Processing Fee for Step 1",
                    display: agreementType === "recruitment services agreement" || agreementType === "initial consultation" || agreementType === "employer renewal stream" || agreementType === "employers" || agreementType === "dynamic RA" ? "d-none" : "",
                    name: "applicable_government_processing_fee_stape_1",
                    type: "text",
                    disabled: false
                  },
                  {
                    label:
                      "Applicable Government Processing Fee for Step 2",
                    display: agreementType === "recruitment services agreement" || agreementType === "initial consultation" || agreementType === "employer renewal stream" || agreementType === "employers" || agreementType === "work permit" || agreementType === "dynamic RA" ? "d-none" : "",
                    name: "applicable_government_processing_fee_stape_2",
                    type: "text",
                    disabled: false
                  },
                  {
                    label:
                      "Applicable Government Processing Fee for Step 3",
                    display: agreementType === "three column" ? "" : "d-none",
                    name: "applicable_government_processing_fee_stape_3",
                    type: "text",
                    disabled: false
                  },
                  {
                    label:
                      "Applicable Retainer Fee for this stage (Non-Refundable) for Step 2",
                    display: agreementType === "recruitment services agreement" || agreementType === "initial consultation" || agreementType === "employer renewal stream" || agreementType === "employers" || agreementType === "work permit" || agreementType === "dynamic RA" ? "d-none" : "",
                    name: "applicable_retainer_fee_stape_2",
                    type: "text",
                    disabled: false
                  },
                  {
                    label:
                      "Applicable Retainer Fee for this stage (Non-Refundable) for Step 3",
                    display: agreementType === "three column" ? "" : "d-none",
                    name: "applicable_retainer_fee_stape_3",
                    type: "text",
                    disabled: false
                  },
                  {
                    label:
                      "Total Amount: (Non-Refundable) (Paid at signing of contract and sharing of checklist)",
                    display: agreementType === "recruitment services agreement" || agreementType === "initial consultation" || agreementType === "employer renewal stream" || agreementType === "employers" || agreementType === "dynamic RA" ? "d-none" : "",
                    name: "total_amount_signing_of_contract",
                    type: "text",
                    disabled: false
                  },
                  {
                    label:
                      "Balance (Non-Refundable) (Paid at time of filing)",
                    display: agreementType === "recruitment services agreement" || agreementType === "initial consultation" || agreementType === "employer renewal stream" || agreementType === "employers" || agreementType === "dynamic RA" ? "d-none" : "",
                    name: "balance_paid_at_time_of_filing",
                    type: "text",
                    disabled: false
                  },

                  {
                    label:
                      "Note",
                    display: "",
                    name: "note",
                    type: "text",
                    disabled: false
                  },

                  {
                    label:
                      "Business Name",
                    display: agreementType === "employers" || agreementType === "employer renewal stream" ? "" : "d-none",
                    name: "business_name",
                    type: "text",
                    disabled: false
                  },
                  {
                    label:
                      "Other Professional Advice Initial Consultation",
                    display: agreementType === "initial consultation" ? "" : "d-none",
                    name: "other_professional_advice_initial_consultation",
                    type: "text",
                    disabled: false
                  },
                  {
                    label:
                      "Additional Relevant Information",
                    display: agreementType === "initial consultation" ? "" : "d-none",
                    name: "additional_relevant_information",
                    type: "text",
                    disabled: false
                  },

                ]
              ).map(({ label, name, type, required, display, disabled, index }) => (
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
                  </label>

                  {/* Check if base64 and editable state */}
                  {state?.initial?.startsWith("data:image") && !showTextInput && name === "initial" ? (
                    <img
                      src={state.initial}
                      alt="Initial"
                      style={{ width: "100%", height: "38px", objectFit: "contain", cursor: "pointer", border: '1px solid #ced4da', borderRadius: '0.25rem' }}
                      onClick={() => {
                        setState((prev) => ({
                          ...prev,
                          initial: "" // Clear image when switching to input
                        }))
                        setShowTextInput(true)
                      }
                      }
                    />
                  ) : (
                    <>
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
                        required={required}
                        disabled={disabled}
                      />
                      <small className="text-warning">
                        {name === "initial" ? "Note : At least two letters required." : ""}
                      </small>
                      {errors[name] && (
                        <span className="text-danger font-size-3 mx-5">
                          {errors[name]}
                        </span>
                      )}
                    </>
                  )}
                </div>
              ))}
            <div
              className={
                openSignature === "yes" || agreementType === "recruitment services agreement" || agreementType === "initial consultation" || agreementType === "employer renewal stream" || agreementType === "employers" || agreementType === "three column" || agreementType === "Alberta PNP and federal PR" || agreementType === "express entry" || agreementType === "work permit" || agreementType === "dynamic RA" || agreementType === "work permit application-2 stage" || SigningUserType === "employee" || SigningUserType === "company" ? "d-none" : "form-group col-md-12 "
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
                openSignature === "no" && agreementType === "dynamic RA" && (SigningUserType && SigningUserType !== "employee" && SigningUserType !== "company") ? "form-group col-md-12 " : "d-none"
              }
            >
              <h3 className="font-size-4 text-black-2 line-height-reset">
                Add Payment Details
              </h3>
              <div className="">
                <PaymentDetails
                  handleInputChange={handleInputChange}
                  newPayment={newPayment}
                  removePayment={removeClient}
                  editPayment={editClient}
                  Payments={state?.payment_json}
                  addPayments={addPaymentDetails}
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
              <div
                className={`form-group col-md-12`}
              >
                <label
                  htmlFor={"sign"}
                  className="font-size-4 text-black-2 line-height-reset"
                >
                  Add Text for signature
                  {/* {required === true ? <span className="text-danger">*</span> : ""} */}
                </label>
                <input
                  type="text"
                  className={`form-control`}
                  value={state?.family_json[index]?.client_signature.includes("data:image/png;base64") ? "" : state?.family_json[index]?.client_signature}
                  onChange={(e) => handleSignature(e.target.value, index, "client_signature")}
                  placeholder={"Signature"}
                  id={"sign"}
                  name={"sign"}
                />
              </div>
              <h6 className="text-center">Or</h6>
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
              <div
                className={`form-group col-md-12`}
              >
                <label
                  htmlFor={"rcic_sign"}
                  className="font-size-4 text-black-2 line-height-reset"
                >
                  Add Text for signature
                  {/* {required === true ? <span className="text-danger">*</span> : ""} */}
                </label>
                <input
                  type="text"
                  className={`form-control`}
                  value={state?.rcic_signature.includes("data:image/png;base64") ? "" : state?.family_json[index]?.client_signature}
                  onChange={(e) => handleSignature(e.target.value, "", "rcic_signature")}
                  placeholder={"Signature"}
                  id={"rcic_sign"}
                  name={"rcic_sign"}
                />
              </div>
              <h6 className="text-center">Or</h6>
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
            {index === "final" && !state.initial ?
              <small className="text-danger">Please add the initials and required fields for the agreement.</small> : index === "final" && !state?.family_json[0]?.client_signature ? <small className="text-danger">Please Add Signature</small> : null}
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
                disabled={(loading || IsFamilyFelidsEmpty !== false || index === "final" ? (!state.initial || !state?.family_json[0]?.client_signature) : (openSignature === "yes" && index !== "final" && (!state?.family_json[0]?.client_signature || (!state?.rcic_signature && index === "rcic_signature" &&
                  SigningUserType === "admin")))) ? true : false}
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
