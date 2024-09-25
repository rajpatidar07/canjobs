// import React, { useEffect, useState } from 'react';
// import { Modal } from "react-bootstrap"
// import SignaturePadComponent from '../../common/Retaineragreement/SignaturePadComponent';
// import { AddUpdateAgreement, GetAgreement } from "../../../api/api"
// import useValidation from '../../common/useValidation';
// import { toast } from 'react-toastify';
// const AgreementOneForm = ({  folderId, user_id, openSignature, emp_user_type, show, close, userData, setApicall, felidData }) => {
//   const [loading, setLoading] = useState(false);
//   // USER CATEGORY TYPE VALIDATION
//   // INITIAL STATE ASSIGNMENT
//   const initialFormState = {
//     id: "",
//     type: felidData?.type,
//     rcic_membership_no: "",
//     client_file_no: "",
//     agreement_date: "",
//     client_first_name: (emp_user_type === "employee" ? userData?.name : userData?.company_name)?.split(" ")[0]||"",
//     client_last_name: (emp_user_type === "employee" ? userData?.name : userData?.company_name)?.split(" ")[1]||"",
//     client_email: userData?.email,
//     client_contact: userData?.contact_no,
//     client_telephone: "",
//     client_cellphone: "",
//     client_fax: "",
//     client_address: emp_user_type === "employee" ? userData?.current_location + " " + userData?.currently_located_country : userData?.address,
//     client_signature: "",
//     matter: "",
//     summary: "",
//     initial: "",
//     professional_fees: "",
//     courier_charges: "",
//     government_fees: "",
//     application_fees: "",
//     biometrics_fees: "",
//     administrative_fee: "",
//     applicable_taxes: "",
//     balance: "",
//     total_cost: "",
//     applicable_retainer_fee_stape_1: "",
//     applicable_government_processing_fee_stape_1: "",
//     applicable_retainer_fee_stape_2: "",
//     applicable_government_processing_fee_stape_2: "",
//     total_amount_signing_of_contract: "",
//     balance_paid_at_time_of_filing: "",
//     rcic_first_name: "",
//     rcic_last_name: "",
//     rcic_signature: "",
//     date_signature_client: "",
//     date_signature_rcic: "",
//     sender: localStorage.getItem("admin_id"),
//     sender_type: localStorage.getItem("admin_type"),
//     receiver: emp_user_type === "employee" ? userData?.employee_id : userData?.company_id,
//     receiver_type: emp_user_type === "employee" ? "employee" : "employer",
//     assigned_by_id: "",
//     assigned_by_type: "",
//     signature_status: felidData.initial ? 1 : 0
//   };
//   // VALIDATION CONDITIONS
//   const validators = {
//     client_email: [
//       (value) =>
//         value === "" || value.trim() === ""
//           ? "Client's Email is required"
//           : /\S+@\S+\.\S+/.test(value)
//             ? null
//             : "Client's Email is invalid",
//     ],
//   };
//   // CUSTOM VALIDATIONS IMPORT
//   const { state, setState, onInputChange, errors/*, setErrors, validate*/ } =
//     useValidation(initialFormState, validators);
//   useEffect(() => {
//     if (felidData) {
//       const updatedState = { ...initialFormState };
//       for (const key in felidData) {
//         if (felidData[key] !== null && felidData[key] !== undefined) {
//           updatedState[key] = felidData[key];
//         }
//       }
//       setState(updatedState);
//     } else {
//       setState(initialFormState);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [felidData]);
//   // API CALL
//   // USER Test Email SUBMIT BUTTON
//   const onFormSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     // console.log(state)
//     try {
//       let res = await AddUpdateAgreement(state)
//       if (res.data.status === 1 && res.data.message === "Agreement updated successfully.") {
//         setLoading(false)
//         setState(initialFormState)
//         toast.success("Felids added successfully.", {
//           position: toast.POSITION.TOP_RIGHT,
//           autoClose: 1000,
//         });
//         // if (openSignature === "yes") {
//           try {
//             let res = await GetAgreement("", user_id, emp_user_type, felidData.type)

//             /*FUnction to generate pdf after adding signature */
//             // if (openSignature === "yes" && res.data.data[0].initial && res.data.data[0].signature_status === "1") {
//             const stateData = {
//               user_id: user_id,
//               emp_user_type: emp_user_type,
//               folderId: folderId,
//               felidData: res.data.data[0],
//               family_json: res.data.data[0].family_json,
//             };
//             const newPageUrl = `/agreeone`
//             localStorage.setItem('agreementStateData', JSON.stringify(stateData));
//             // Open the new page in a new tab
//             setApicall(true)
//             close()
//             window.open(newPageUrl, '_blank')
//             // }
//           } catch (error) {
//             console.log(error)
//           }
//         // }
//         close()
//         setApicall(true)
//       }
//     } catch (err) {
//       console.log(err)
//       setLoading(false)
//     }
//   };
//   useEffect(() => {
//     if (state.initial) {
//       setState({ ...state, signature_status: "1", pdf_genrated_status: "1" });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [state.initial])
//   const handleSignature = (signature, clientIndex) => {
//     const today = new Date().toISOString().split('T')[0];
//     setState((prevState) => {
//       const family_json = [...prevState.family_json];
//       family_json[clientIndex] = { ...family_json[clientIndex], client_signature: signature, date_signature_client: today };
//       return { ...prevState, family_json };
//     });
//   };
//   return (
//     <Modal
//       show={show}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <button
//         type="button"
//         className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
//         data-dismiss="modal"
//         onClick={() => { close() }}
//       >
//         <i className="fas fa-times"></i>
//       </button>
//       <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
//         <form onSubmit={onFormSubmit}>
//           <h5 className="text-center mb-7 pt-2">{openSignature === "yes" ? "Add Signature" : "Add Retainer Agreement Felids"}</h5>
//           <div className="row">
//             {openSignature === "yes" ?
//               null : [
//                 { label: "Client File Number", name: "client_file_no", type: "number" },
//                 { label: "Agreement Creation Date", name: "agreement_date", type: "date" },
//                 { label: "Client Name", name: "client_first_name", type: "text" },
//                 { label: "Client Address", name: "client_address", type: "text" },
//                 { label: "Client Email", name: "client_email", type: "email" },
//                 { label: "Client Contact No", name: "client_contact", type: "number" },
//                 { label: "The Client asked the RCIC, and the RCIC has agreed, to act for the Client in the matter of", name: "matter", type: "text" },
//                 { label: "Summary of preliminary advice given to the client", name: "summary", type: "text" },
//                 { label: "Professional Fees", name: "professional_fees", type: "number" },
//                 { label: "Courier charges", name: "courier_charges", type: "number" },
//                 { label: "Administrative Fee", name: "administrative_fee", type: "number" },
//                 { label: "Government fees", name: "government_fees", type: "number" },
//                 { label: "Applicable Taxes", name: "application_fees", type: "number" },
//                 { label: "Balance (Paid at time of filing)", name: "balance", type: "number" },
//                 { label: "Total Cost", name: "total_cost", type: "number" },
//                 { label: "Applicable Retainer Fee for this stage (Non-Refundable) for Step 1", name: "applicable_retainer_fee_stape_1", type: "number" },
//                 { label: "Applicable Government Processing Fee for Step 1", name: "applicable_government_processing_fee_stape_1", type: "number" },
//                 { label: "Applicable Retainer Fee for this stage (Non-Refundable) for Step 2", name: "applicable_retainer_fee_stape_2", type: "number" },
//                 { label: "Total Amount: (Non-Refundable) (Paid at signing of contract and sharing of checklist)", name: "total_amount_signing_of_contract", type: "number" },
//                 { label: "Balance (Non-Refundable) (Paid at time of filing)", name: "balance_paid_at_time_of_filing", type: "number" },
//                 { label: "Client's Family Name", name: "client_last_name", type: "text" },
//                 { label: "Client's Telephone Number", name: "client_telephone", type: "number" },
//                 { label: "Client's Cellphone Number", name: "client_cellphone", type: "number" },
//                 { label: "Client's Fax Number", name: "client_fax", type: "number" },
//                 { label: "Date for Client", name: "date_signature_client", type: "date" },
//                 { label: "Date for RCIC", name: "date_signature_rcic", type: "date" },
//                 { label: "Authorization's Name", name: "authorizationName", type: "text" },
//               ].map(({ label, name, type }) => (
//                 <div className="form-group col-md-6 mb-0 mt-4" key={name}>
//                   <label htmlFor={name} className="font-size-4 text-black-2 line-height-reset">
//                     {label}
//                   </label>
//                   <input
//                     type={type}
//                     className={`${errors[name] ? "border border-danger" : ""} form-control mx-5 col ${type === "date" ? "coustam_datepicker" : ""}`}
//                     value={state[name] || ""}
//                     onKeyDownCapture={type === "date" ? (e) => e.preventDefault() : null}
//                     onChange={onInputChange}
//                     placeholder={label}
//                     id={name}
//                     name={name}
//                   />
//                   {errors[name] && <span className="text-danger font-size-3 mx-5">{errors[name]}</span>}
//                 </div>
//               ))}
//             <div className={openSignature === "yes" ? "d-none" : "form-group col-md-6 mb-0 mt-4"}>
//               <label className="font-size-4 text-black-2 line-height-reset">GST</label>
//               <select
//                 className="form-control col mx-5"
//                 name="gst"
//                 value={state.gst || ""}
//                 onChange={onInputChange}
//               >
//                 <option value="">Select GST option</option>
//                 {[...Array(31).keys()].slice(10).map(value => (
//                   <option key={value} value={value}>{`${value}%`}</option>
//                 ))}
//               </select>
//             </div>
//             <div className="form-group col-md-6 mb-0 mt-4">
//               <SignaturePadComponent
//                onEnd={(signature) => handleSignature(signature)}
//                canvasProps={{ className: 'form-control mx-5 col' }}
//                setState={setState}
//                state={state}
//                label={`rcic_signature`}
//                name={`RCIC Signature`}
//                onSignature={handleSignature}/>
//             </div>
//             {/* <div className={localStorage.getItem("userType") === "admin" ? "d-none" : "form-group col-md-6 mb-0 mt-4"}>
//               <SignaturePadComponent
//                 signature={state.client_signature}
//                 onEnd={(signature) => handleSignature(signature)}
//                 canvasProps={{ className: 'form-control mx-5 col' }}
//                 setState={setState}
//                 state={state}
//                 label={`client_signature`}
//                 name={`Client Signature`}
//                 onSignature={handleSignature} />

//             </div>
//             <div className={localStorage.getItem("userType") === "admin" ? "d-none" : "form-group col-md-6 mb-0 mt-4"}>
//               <SignaturePadComponent setState={setState} state={state} label="Initial" name="initial" />
//             </div> */}
//           </div>
//           <div className="form-group text-center">
//             {loading ? (
//               <button className="btn btn-primary btn-small w-25 mt-5 rounded-5 text-uppercase" type="button" disabled>
//                 <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
//                 <span className="sr-only">Loading...</span>
//               </button>
//             ) : (
//               <button className="btn btn-primary btn-small w-25 mt-5 rounded-5 text-uppercase" type="submit">
//                 Submit
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </Modal>
//   );
// };

// export default AgreementOneForm;

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
    type: "temporary resident visa",
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
      validateClientEmail: (value) =>
        value === "" || value.trim() === ""
          ? "Client's Email is required"
          : /\S+@\S+\.\S+/.test(value)
          ? null
          : "Client's Email is invalid",
    },
  };

  const { state, setState, onInputChange, errors } = useValidation(
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
        } catch (error) {
          console.error("Failed to parse family_json:", error);
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
              console.log(stateData);
              const newPageUrl = `/agreeone`;
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
          } catch (error) {
            console.log(error);
          }
          // }
          close();
          setApicall(true);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
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
  return (
    <Modal
      show={show}
      size="xl"
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
                      </label>
                      <input
                        type="text"
                        className="form-control col"
                        value={state?.family_json[0]?.client_first_name}
                        onChange={(e) => handleClientChange(0, e)}
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
                      </label>
                      <input
                        type="text"
                        className="form-control col"
                        value={state?.family_json[0]?.client_last_name}
                        onChange={(e) => handleClientChange(0, e)}
                        id={`client_last_name_0`}
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
                        name: "client_address",
                        type: "text",
                      },
                      {
                        label: "Client Email",
                        name: "client_email",
                        type: "email",
                      },
                      {
                        label: "Client Contact No",
                        name: "client_contact",
                        type: "number",
                      },
                      {
                        label: "Client's Telephone Number",
                        name: "client_telephone",
                        type: "number",
                      },
                      {
                        label: "Client's Cellphone Number",
                        name: "client_cellphone",
                        type: "number",
                      },
                      {
                        label: "Client's Fax Number",
                        name: "client_fax",
                        type: "number",
                      },
                    ]
                  : [
                      {
                        label: "Client Address",
                        name: "client_address",
                        type: "text",
                      },
                      {
                        label: "Client Email",
                        name: "client_email",
                        type: "email",
                      },
                      {
                        label: "Client Contact No",
                        name: "client_contact",
                        type: "number",
                      },
                      {
                        label: "Client's Telephone Number",
                        name: "client_telephone",
                        type: "number",
                      },
                      {
                        label: "Client's Cellphone Number",
                        name: "client_cellphone",
                        type: "number",
                      },
                      {
                        label: "Client's Fax Number",
                        name: "client_fax",
                        type: "number",
                      },
                      {
                        label: "Client File Number",
                        name: "client_file_no",
                        type: "number",
                      },
                      {
                        label: "Agreement Creation Date",
                        name: "agreement_date",
                        type: "date",
                      },
                      {
                        label: "Professional Fees",
                        name: "professional_fees",
                        type: "number",
                      },
                      {
                        label: "Courier charges",
                        name: "courier_charges",
                        type: "number",
                      },
                      {
                        label: "Administrative Fee",
                        name: "administrative_fee",
                        type: "number",
                      },
                      {
                        label: "Government fees",
                        name: "government_fees",
                        type: "number",
                      },
                      {
                        label: "Applicable Taxes",
                        name: "application_fees",
                        type: "number",
                      },
                      {
                        label: "Balance (Paid at time of filing)",
                        name: "balance",
                        type: "number",
                      },
                      {
                        label: "Total Cost",
                        name: "total_cost",
                        type: "number",
                      },
                      {
                        label:
                          "The Client asked the RCIC, and the RCIC has agreed, to act for the Client in the matter of",
                        name: "matter",
                        type: "text",
                      },
                      {
                        label:
                          "Summary of preliminary advice given to the client",
                        name: "summary",
                        type: "text",
                      },
                      {
                        label:
                          "Applicable Retainer Fee for this stage (Non-Refundable) for Step 1",
                        name: "applicable_retainer_fee_stape_1",
                        type: "number",
                      },
                      {
                        label:
                          "Applicable Government Processing Fee for Step 1",
                        name: "applicable_government_processing_fee_stape_1",
                        type: "number",
                      },
                      {
                        label:
                          "Applicable Retainer Fee for this stage (Non-Refundable) for Step 2",
                        name: "applicable_retainer_fee_stape_2",
                        type: "number",
                      },
                      {
                        label:
                          "Total Amount: (Non-Refundable) (Paid at signing of contract and sharing of checklist)",
                        name: "total_amount_signing_of_contract",
                        type: "number",
                      },
                      {
                        label:
                          "Balance (Non-Refundable) (Paid at time of filing)",
                        name: "balance_paid_at_time_of_filing",
                        type: "number",
                      },
                    ]
                ).map(({ label, name, type, index }) => (
                  <div
                    className={`form-group ${
                      label.split(" ").length > 6
                        ? "col-lg-6 col-md-12"
                        : "col-lg-3 col-md-4 col-sm-6"
                    } `}
                    key={index}
                  >
                    <label
                      htmlFor={name}
                      className="font-size-4 text-black-2 line-height-reset"
                    >
                      {label}
                    </label>
                    <input
                      type={type}
                      className={`${
                        errors[name] ? "border border-danger" : ""
                      } form-control col ${
                        type === "date" ? "coustam_datepicker" : ""
                      }`}
                      value={state?.[name] || ""}
                      onKeyDownCapture={
                        type === "date" ? (e) => e.preventDefault() : null
                      }
                      onChange={onInputChange}
                      placeholder={label}
                      id={name}
                      name={name}
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
                openSignature === "yes" ? "d-none" : "form-group col-md-12 "
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
                disabled={loading}
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
