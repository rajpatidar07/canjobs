import React, { useEffect, useState } from 'react';
import { Modal } from "react-bootstrap"
import SignaturePadComponent from '../../common/Retaineragreement/SignaturePadComponent';
import { AddUpdateAgreement } from "../../../api/api"
import useValidation from '../../common/useValidation';
import { toast } from 'react-toastify';
const AgreementOneForm = ({ emp_user_type, show, close, userData, setApicall, felidData, em }) => {
  const [loading, setLoading] = useState(false);
  // USER CATEGORY TYPE VALIDATION
  console.log(userData)


  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    id: "",
    type: "",
    rcic_membership_no: "",
    client_file_no: "",
    agreement_date: "",
    client_first_name: (emp_user_type === "employee" ? userData.name : userData.company_name).split(" ")[0],
    client_last_name: (emp_user_type === "employee" ? userData.name : userData.company_name).split(" ")[1],
    client_email: userData.email,
    client_contact: userData.contact_no,
    client_telephone: "",
    client_cellphone: "",
    client_fax: "",
    client_address: emp_user_type === "employee" ? userData.current_location + " " + userData.currently_located_country : userData.address,
    client_signature: "",
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
    receiver: emp_user_type === "employee" ? userData.employee_id : userData.company_id,
    receiver_type: emp_user_type === "employee" ? "employee" : "employer",
    assigned_by_id: "",
    assigned_by_type: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    client_email: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Client's Email is required"
          : /\S+@\S+\.\S+/.test(value)
            ? null
            : "Client's Email is invalid",
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, onInputChange, errors/*, setErrors, validate*/ } =
    useValidation(initialFormState, validators);

  useEffect(() => {
    setState(felidData ? felidData : initialFormState)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // API CALL
  // USER Test Email SUBMIT BUTTON
  const onFormSubmit = async (e) => {
    e.preventDefault();
    console.log(state)
    setLoading(true);
    try {
      let res = await AddUpdateAgreement(state)
      if (res.data.status === 1 && res.data.message === "Agreement updated successfully.") {
        setLoading(false)
        setState(initialFormState)
        toast.success("Felids added successfully.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        close()
        setApicall(true)
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
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
        onClick={close}
      >
        <i className="fas fa-times"></i>
      </button>
      <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
        <form onSubmit={onFormSubmit}>
          <h5 className="text-center mb-7 pt-2">Client Retainer Agreement Form</h5>
          <div className="row">
            {[
              { label: "Client File Number", name: "client_file_no", type: "number" },
              { label: "Agreement Creation Date", name: "agreement_date", type: "date" },
              { label: "Client Name", name: "client_first_name", type: "text" },
              { label: "Client Address", name: "client_address", type: "text" },
              { label: "Client Email", name: "client_email", type: "email" },
              { label: "Client Contact No", name: "client_contact", type: "number" },
              { label: "The Client asked the RCIC, and the RCIC has agreed, to act for the Client in the matter of", name: "matter", type: "text" },
              { label: "Summary of preliminary advice given to the client", name: "summary", type: "text" },
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
              { label: "Client's Family Name", name: "client_last_name", type: "text" },
              { label: "Client's Telephone Number", name: "client_telephone", type: "number" },
              { label: "Client's Cellphone Number", name: "client_cellphone", type: "number" },
              { label: "Client's Fax Number", name: "client_fax", type: "number" },
              { label: "Date for Client", name: "date_signature_client", type: "date" },
              { label: "Date for RCIC", name: "date_signature_rcic", type: "date" },
              { label: "Authorization's Name", name: "authorizationName", type: "text" },
            ].map(({ label, name, type }) => (
              <div className="form-group col-md-6 mb-0 mt-4" key={name}>
                <label htmlFor={name} className="font-size-4 text-black-2 line-height-reset">
                  {label}
                </label>
                <input
                  type={type}
                  className={errors[name] ? "form-control mx-5 border border-danger col" : "form-control col mx-5"}
                  value={state[name] || ""}
                  onChange={onInputChange}
                  placeholder={label}
                  id={name}
                  name={name}
                />
                {errors[name] && <span className="text-danger font-size-3 mx-5">{errors[name]}</span>}
              </div>
            ))}
            <div className="form-group col-md-6 mb-0 mt-4">
              <SignaturePadComponent setState={setState} state={state} label="Signature of RCIC" name="rcic_signature" />
            </div>
            <div className="form-group col-md-6 mb-0 mt-4">
              <SignaturePadComponent setState={setState} state={state} label="Client’s Signature" name="client_signature" />
            </div>
            <div className="form-group col-md-6 mb-0 mt-4">
              <SignaturePadComponent setState={setState} state={state} label="Initial" name="initial" />
            </div>
            <div className="form-group col-md-6 mb-0 mt-4">
              <label className="font-size-4 text-black-2 line-height-reset">GST</label>
              <select
                className="form-control col mx-5"
                name="gst"
                value={state.gst || ""}
                onChange={onInputChange}
              >
                <option value="">Select GST option</option>
                {[...Array(31).keys()].slice(10).map(value => (
                  <option key={value} value={value}>{`${value}%`}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group text-center">
            {loading ? (
              <button className="btn btn-primary btn-small w-25 mt-5 rounded-5 text-uppercase" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span className="sr-only">Loading...</span>
              </button>
            ) : (
              <button className="btn btn-primary btn-small w-25 mt-5 rounded-5 text-uppercase" type="submit">
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AgreementOneForm;
