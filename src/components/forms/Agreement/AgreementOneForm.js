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

import React, { useEffect, useState } from 'react';
import SignaturePadComponent from '../../common/Retaineragreement/SignaturePadComponent';
import { AddUpdateAgreement, GetAgreement } from "../../../api/api";
import useValidation from '../../common/useValidation';
import { toast } from 'react-toastify';
import { Modal } from "react-bootstrap"
const AgreementOneForm = ({
  folderId,
  user_id,
  openSignature,
  emp_user_type,
  show,
  close,
  userData,
  setApicall,
  felidData
}) => {
  const [loading, setLoading] = useState(false);
  let SigningUserType = localStorage.getItem("userType");

  const initialClientState = {
    client_first_name: (emp_user_type === "employee" ? userData?.name : userData?.company_name)?.split(" ")[0]||"",
    client_last_name: (emp_user_type === "employee" ? userData?.name : userData?.company_name)?.split(" ")[1]||"",  
    client_signature: "",
    date_signature_client: "",
    client_date_of_birth: ""
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
    receiver: emp_user_type === "employee" ? userData?.employee_id : userData?.company_id,
    receiver_type: emp_user_type === "employee" ? "employee" : "employer",
    assigned_by_id: "",
    assigned_by_type: "",
    signature_status: felidData.initial ? 1 : 0,
    id: "",
    client_file_no: "",
    agreement_date: "",
    client_email: userData?.email||"",
    client_contact: userData?.contact_no||"",
    client_telephone: "",
    client_cellphone: "",
    client_fax: "",
    client_address: emp_user_type === "employee" ? userData?.current_location + " " + userData?.currently_located_country : userData?.address,
    family_json: [initialClientState]
    
  };

  const validators = {
    family_json: {
      validateClientEmail: (value) =>
        value === "" || value.trim() === "" ? "Client's Email is required" : /\S+@\S+\.\S+/.test(value) ? null : "Client's Email is invalid",
    },
  };

  const { state, setState, onInputChange, errors } = useValidation(initialFormState, validators);

  // useEffect(() => {
  //   if (felidData) {
  //     const updatedState = { ...initialFormState };
  //     for (const key in felidData) {
  //       if (felidData[key] !== null && felidData[key] !== undefined) {
  //         updatedState[key] = felidData[key];
  //       }
  //     }
  //     setState(updatedState);
  //   } else {
  //     setState(initialFormState);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [felidData]);
  useEffect(() => {
    if (felidData) {
      const updatedState = { ...initialFormState };

      // Parse the family_json field
      if (felidData.family_json) {
        try {
          updatedState.family_json = JSON.parse(felidData.family_json);
        } catch (error) {
          console.error('Failed to parse family_json:', error);
        }
      }

      // Update the rest of the state with felidData
      for (const key in felidData) {
        if (felidData[key] !== null && felidData[key] !== undefined && key !== 'family_json') {
          updatedState[key] = felidData[key];
        }
      }

      setState(updatedState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [felidData]);

  const addClient = () => {
    const emptyClientState = {
      client_first_name: "",
      client_last_name: "",
      client_signature: "",
      date_signature_client: "",
      client_date_of_birth: ""
    };
    setState((prevState) => ({
      ...prevState,
      family_json: [...prevState.family_json, { ...emptyClientState }]
    }));
  };

  const removeClient = (index) => {
    setState((prevState) => ({
      ...prevState,
      family_json: prevState.family_json.filter((_, i) => i !== index)
    }));
  };

  const handleClientChange = (index, event) => {
    const { name, value } = event.target;
    setState((prevState) => {
      const family_json = [...prevState.family_json];
      family_json[index] = { ...family_json[index], [name]: value };
      return { ...prevState, family_json };
    });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await AddUpdateAgreement(state);
      if (res.data.status === 1 && res.data.message === "Agreement updated successfully.") {
        setLoading(false);
        setState(initialFormState);
        toast.success("Fields added successfully.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });

        try {
          let res = await GetAgreement("", user_id, emp_user_type, felidData.type);
          const stateData = {
            user_id: user_id,
            emp_user_type: emp_user_type,
            folderId: folderId,
            felidData: res.data.data[0],
          };
          const newPageUrl = `/agreeone`;
          localStorage.setItem('agreementStateData', JSON.stringify(stateData));
          setApicall(true);
          close();
          window.open(newPageUrl, '_blank');
        } catch (error) {
          console.log(error);
        }
        close();
        setApicall(true);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state.initial) {
      setState({ ...state, signature_status: "1", pdf_genrated_status: "1" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.initial]);

  const handleSignature = (signature, clientIndex, label) => {
    const today = new Date().toISOString().split('T')[0];
    if (label === "rcic_signature") {
      setState({ ...state, rcic_signature: signature, date_signature_rcic: today });
    } else if (label === "initial") {
      setState({ ...state, initial: signature });
    } else {
      setState((prevState) => {
        const family_json = [...prevState.family_json];
        family_json[clientIndex] = { ...family_json[clientIndex], client_signature: signature, date_signature_client: today };
        return { ...prevState, family_json };
      });
    }
  };

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <button
        type="button"
        className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
        data-dismiss="modal"
        onClick={() => { close() }}
      >
        <i className="fas fa-times"></i>
      </button>
      <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
        <form onSubmit={onFormSubmit}>
          <h5 className="text-center mb-7 pt-2">{openSignature === "yes" ? "Add Signature" : "Add Retainer Agreement Fields"}</h5>
          <div className="row">
            {openSignature === "yes" ? null :
              (SigningUserType === "admin" ? [
                { label: "Client Address", name: "client_address", type: "text" },
                { label: "Client Email", name: "client_email", type: "email" },
                { label: "Client Contact No", name: "client_contact", type: "number" },
                { label: "The Client asked the RCIC, and the RCIC has agreed, to act for the Client in the matter of", name: "matter", type: "text" },
                { label: "Summary of preliminary advice given to the client", name: "summary", type: "text" },
                // { label: "Client's Family Name", name: "client_last_name", type: "text" },
                { label: "Client's Telephone Number", name: "client_telephone", type: "number" },
                { label: "Client's Cellphone Number", name: "client_cellphone", type: "number" },
                { label: "Client's Fax Number", name: "client_fax", type: "number" },
                { label: "Client File Number", name: "client_file_no", type: "number" },
                { label: "Agreement Creation Date", name: "agreement_date", type: "date" },
                { label: "Professional Fees", name: "professional_fees", type: "number" },
                { label: "Courier charges", name: "courier_charges", type: "number" },
                { label: "Administrative Fee", name: "administrative_fee", type: "number" },
                { label: "Government fees", name: "government_fees", type: "number" },
                { label: "Applicable Taxes", name: "application_fees", type: "number" },
                { label: "Balance (Paid at time of filing)", name: "balance", type: "number" },
                { label: "Total Cost", name: "total_cost", type: "number" },
                { label: "Applicable Retainer Fee for this stage (Non-Refundable) for Step 1", name: "applicable_retainer_fee_stape_1", type: "number" },
                { label: "Applicable Government Processing Fee for Step 1", name: "applicable_government_processing_fee_stape_1", type: "number" },
                { label: "Applicable Retainer Fee for this stage (Non-Refundable) for Step 2", name: "applicable_retainer_fee_stape_2", type: "number" },
                { label: "Total Amount: (Non-Refundable) (Paid at signing of contract and sharing of checklist)", name: "total_amount_signing_of_contract", type: "number" },
                { label: "Balance (Non-Refundable) (Paid at time of filing)", name: "balance_paid_at_time_of_filing", type: "number" },
              ] : [
                { label: "Client Address", name: "client_address", type: "text" },
                { label: "Client Email", name: "client_email", type: "email" },
                { label: "Client Contact No", name: "client_contact", type: "number" },
                { label: "The Client asked the RCIC, and the RCIC has agreed, to act for the Client in the matter of", name: "matter", type: "text" },
                { label: "Summary of preliminary advice given to the client", name: "summary", type: "text" },
                // { label: "Client's Family Name", name: "client_last_name", type: "text" },
                { label: "Client's Telephone Number", name: "client_telephone", type: "number" },
                { label: "Client's Cellphone Number", name: "client_cellphone", type: "number" },
                { label: "Client's Fax Number", name: "client_fax", type: "number" },
              ]).map(({ label, name, type, index }) => (
                <div className="form-group col-md-6 mb-0 mt-4" key={index}>
                  <label htmlFor={name} className="font-size-4 text-black-2 line-height-reset">
                    {label}
                  </label>
                  <input
                    type={type}
                    className={`${errors[name] ? "border border-danger" : ""} form-control mx-5 col ${type === "date" ? "coustam_datepicker" : ""}`}
                    value={state?.[name] || ""}
                    onKeyDownCapture={type === "date" ? (e) => e.preventDefault() : null}
                    onChange={onInputChange}
                    placeholder={label}
                    id={name}
                    name={name}
                  />
                  {errors[name] && <span className="text-danger font-size-3 mx-5">{errors[name]}</span>}
                </div>
              ))}
            {/* Render client-specific fields */}
            {state.family_json.map((client, index) => (
              <React.Fragment key={index}>
                <div className="form-group col-md-6 mb-0 mt-4">
                  <label htmlFor={`client_first_name_${index}`} className="font-size-4 text-black-2 line-height-reset">
                    Client's First Name
                  </label>
                  <input
                    type="text"
                    className="form-control mx-5 col"
                    value={client.client_first_name}
                    onChange={(e) => handleClientChange(index, e)}
                    id={`client_first_name_${index}`}
                    name="client_first_name"
                    placeholder="Client's first name"
                  />
                </div>
                <div className="form-group col-md-6 mb-0 mt-4">
                  <label htmlFor={`client_last_name_${index}`} className="font-size-4 text-black-2 line-height-reset">
                    Client's Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control mx-5 col"
                    value={client.client_last_name}
                    onChange={(e) => handleClientChange(index, e)}
                    id={`client_last_name_${index}`}
                    name="client_last_name"
                    placeholder="Client's last name"
                  />
                </div>
                <div className="form-group col-md-6 mb-0 mt-4">
                  <label htmlFor={`client_date_of_birth_${index}`} className="font-size-4 text-black-2 line-height-reset">
                    Client's Date of Birth
                  </label>
                  <input
                    type="date"
                    className="coustam_datepicker form-control mx-5 col"
                    value={client.client_date_of_birth}
                    onChange={(e) => handleClientChange(index, e)}
                    onKeyDownCapture={(e) => e.preventDefault()}
                    id={`client_date_of_birth_${index}`}
                    name="client_date_of_birth"
                    placeholder="Client's DOB"
                  />
                </div>
                <div className="form-group col-md-6 mb-0 mt-4">
                  <SignaturePadComponent
                    signature={state.family_json[index].client_signature}
                    onEnd={(signature) => handleSignature(signature, index,"client_signature")}
                    canvasProps={{ className: 'form-control mx-5 col' }}
                    setState={setState}
                    state={state}
                    index={index}
                    label={`client_signature`}
                    name={`Client Signature`}
                    onSignature={handleSignature}
                  />
                </div>

                {index > 0 && (
                  <div className="col-3 mt-2 d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-danger mb-4"
                      onClick={() => removeClient(index)}
                      title='Remove Client'
                    >
                      Remove Client
                    </button>
                  </div>
                )}
              </React.Fragment>
            ))}
            <div className="form-group col-md-6 mb-0 mt-4">
              <SignaturePadComponent
                onEnd={(signature) => handleSignature(signature, "", "initial")}
                canvasProps={{ className: 'form-control mx-5 col' }}
                setState={setState}
                state={state}
                label={`initial`}
                name={`Initial`}
                onSignature={handleSignature} />
            </div>
            <div className={SigningUserType === "admin" ? "form-group col-md-6 mb-0 mt-4" : "d-none"}>
              <SignaturePadComponent
                onEnd={(signature) => handleSignature(signature, "", "rcic_signature")}
                canvasProps={{ className: 'form-control mx-5 col' }}
                setState={setState}
                state={state}
                label={`rcic_signature`}
                name={`RCIC Signature`}
                onSignature={handleSignature} />
            </div>
            <div className='d-flex justify-content-center'>
              <button
                type="button"
                className="btn btn-info mt-2"
                onClick={addClient}
                title='Add Client'
              >
                Add more client
              </button>
            </div>
          </div>
          <div className='form-group text-center'>
            <button
              type="submit"
              className="btn btn-primary btn-small w-25 mt-5 rounded-5 text-uppercase p-8"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Agreement"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AgreementOneForm;
