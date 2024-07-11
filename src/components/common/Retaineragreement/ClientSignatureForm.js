import React, { useEffect, useState } from 'react'
import { AddUpdateAgreement, GetAgreement } from '../../../api/api';
import { toast } from 'react-toastify';
import useValidation from '../useValidation';
import SignaturePadComponent from './SignaturePadComponent';

export default function ClientSignatureForm() {
    const [loading, setLoading] = useState(false);
    let [clientSignature, setClientSignature] = useState("notdone")
    // USER CATEGORY TYPE VALIDATION
    // INITIAL STATE ASSIGNMENT
    const initialFormState = {
        id: "",
        type: "",
        rcic_membership_no: "",
        client_file_no: "",
        agreement_date: "",
        client_first_name: "",
        client_last_name: "",
        client_email: "",
        client_contact: "",
        client_telephone: "",
        client_cellphone: "",
        client_fax: "",
        client_address: "",
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
        sender: "",
        sender_type: "",
        receiver: "",
        receiver_type: "",
        assigned_by_id: "",
        assigned_by_type: "",
        signature_status: ""
    };
    // VALIDATION CONDITIONS
    const validators = {
        date_signature_client: [
            (value) =>
                value === "" || value.trim() === ""
                    ? "Client's Signature date is required"
                    : null
        ],
        client_signature: [
            (value) =>
                value === "" || value.trim() === ""
                    ? "Client's Signature is required"
                    : null
        ],
    };
    // CUSTOM VALIDATIONS IMPORT
    const { state, setState, onInputChange, errors/*, setErrors, validate*/ } =
        useValidation(initialFormState, validators);
    let GetFeildData = async () => {
        try {
            let res = await GetAgreement("",/* user_id, emp_user_type, agreementData.type*/)
            if (res.status === 1) {
                setState(res.data.data[0]);
            }
            /*FUnction to generate pdf after adding signature */
            if (clientSignature === "done" && res.data.data[0].client_signature && res.data.data[0].signature_status === "1") {
                const stateData = {
                    // user_id: user_id,
                    // emp_user_type: emp_user_type,
                    // folderId: folderId,
                    felidData: res.data.data[0],
                };
                const newPageUrl = `/agreeone`
                localStorage.setItem('agreementStateData', JSON.stringify(stateData));
                // Open the new page in a new tab


                window.open(newPageUrl, '_blank')
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        GetFeildData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // API CALL
    // USER Test Email SUBMIT BUTTON
    const onFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // console.log(state)
        try {
            let res = await AddUpdateAgreement(state)
            if (res.data.status === 1 && res.data.message === "Agreement updated successfully.") {
                setLoading(false)
                setState(initialFormState)
                toast.success("Felids added successfully.", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
                setClientSignature("done")


            }
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    };
    useEffect(() => {
        if (state.initial) {
            setState({ ...state, signature_status: "1", pdf_genrated_status: "1" });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.initial])
    return (
        <div>
            <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
                <form onSubmit={onFormSubmit}>
                    <h5 className="text-center mb-7 pt-2">Add Signature</h5>
                    <div className="row">
                        <div className="form-group col-md-6 mb-0 mt-4">
                            <SignaturePadComponent setState={setState} state={state} label="Client’s Signature" name="client_signature" />
                        </div>
                        <div className="form-group col-md-6 mb-0 mt-4">
                            <label htmlFor={"date_signature_client"} className="font-size-4 text-black-2 line-height-reset">
                                Date signature client
                            </label>
                            <input
                                type={"date"}
                                className={errors.date_signature_client ? "form-control coustam_datepicker mx-5 border border-danger col" : "form-control coustam_datepicker col mx-5"}
                                onKeyDownCapture={(e) => e.preventDefault()}
                                value={state.date_signature_client || ""}
                                onChange={onInputChange}
                                id={"date_signature_client"}
                                name={"date_signature_client"}
                            />
                            {errors.date_signature_client && <span className="text-danger font-size-3 mx-5">{errors.date_signature_client}</span>}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
