import React, { useState } from 'react';
import SignaturePadComponent from '../../common/Retaineragreement/SignaturePadComponent';
const AgreementOneForm = () => {
  const [state, setState] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
  };

  return (
    <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
      <form onSubmit={onFormSubmit}>
        <h5 className="text-center mb-7 pt-2">Client Retainer Agreement Form</h5>

        {[
          { label: "Client File Number", name: "clientFileNumber", type: "number" },
          { label: "Agreement Creation Date", name: "agreementCreationDate", type: "date" },
          { label: "Client Name", name: "clientName", type: "text" },
          { label: "Client Address", name: "clientAddress", type: "text" },
          { label: "Client Email", name: "clientEmail", type: "email" },
          { label: "Client Contact No", name: "clientContactNo", type: "number" },
          { label: "The Client asked the RCIC, and the RCIC has agreed, to act for the Client in the matter of", name: "clientMatter", type: "text" },
          { label: "Summary of preliminary advice given to the client", name: "preliminaryAdvice", type: "text" },
          { label: "Professional Fees", name: "professionalFees", type: "number" },
          { label: "Courier charges", name: "courierCharges", type: "number" },
          { label: "Government fees", name: "governmentFees", type: "number" },
          { label: "Applicable Taxes: 13%", name: "applicableTaxes", type: "number" },
          { label: "Balance (Paid at time of filing)", name: "balanceAtFiling", type: "number" },
          { label: "Total Cost", name: "totalCost", type: "number" },
          { label: "Applicable Retainer Fee for this stage (Non-Refundable) for Step 1", name: "retainerFeeStep1", type: "number" },
          { label: "Applicable Government Processing Fee for Step 1", name: "governmentProcessingFeeStep1", type: "number" },
          { label: "Applicable Retainer Fee for this stage (Non-Refundable) for Step 1", name: "retainerFeeStage1", type: "number" },
          { label: "Total Amount: (Non-Refundable) (Paid at signing of contract and sharing of checklist)", name: "totalAmountNonRefundable", type: "number" },
          { label: "Balance (Non-Refundable) (Paid at time of filing)", name: "balanceNonRefundable", type: "number" },
          { label: "Client's Given Name", name: "clientGivenName", type: "text" },
          { label: "Client's Family Name", name: "clientFamilyName", type: "text" },
          { label: "Client's Address", name: "clientAddress2", type: "text" },
          { label: "Client's Telephone Number", name: "clientTelephoneNumber", type: "number" },
          { label: "Client's Cellphone Number", name: "clientCellphoneNumber", type: "number" },
          { label: "Client's Fax Number", name: "clientFaxNumber", type: "number" },
          { label: "Client's Email Address", name: "clientEmail2", type: "email" },
          { label: "Name of Client", name: "nameOfClient", type: "text" },
          { label: "Date for Client", name: "dateForClient", type: "date" },
          { label: "Date for RCIC", name: "dateForRCIC", type: "date" },
          { label: "Authorization's Name", name: "authorizationName", type: "text" },
          { label: "Client’s full name", name: "clientsFullName", type: "text" },
          { label: "Client’s Date", name: "clientsDate", type: "date" }
        ].map(({ label, name, type }) => (
          <div className="form-group row mb-0" key={name}>
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

        <SignaturePadComponent label="Client Signature" name="clientSignature" />
        <SignaturePadComponent label="Initial (At every page)" name="initial" />
        <SignaturePadComponent label="Signature of Client" name="signatureOfClient" />
        <SignaturePadComponent label="Signature of RCIC" name="signatureOfRCIC" />
        <SignaturePadComponent label="Client’s Signature" name="clientsSignature" />

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
  );
};

export default AgreementOneForm;
