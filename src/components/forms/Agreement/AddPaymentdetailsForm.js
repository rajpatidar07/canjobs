import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { AddUpdateAgreement } from "../../../api/api";
import { toast } from "react-toastify";
import PaymentDetails from "./PaymentDetails";
const AddPaymentDetailsForm = ({
    show,
    close,
    setApicall,
    felidData,
}) => {
    const [loading, setLoading] = useState(false);
    const [payments, setPayments] = useState(
        felidData.payment_json || []
    );
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
        setNewPayment({ ...newPayment, [name]: value });
    };

    const addPaymentDetails = () => {
        if (editIndex !== null) {
            const updatedClients = payments.map((item, index) =>
                index === editIndex ? { ...newPayment, id: item.id } : item
            );
            setPayments(updatedClients);
            setEditIndex(null);
        } else {
            if (payments.length >= 4) {
                toast.error("Cannot add more than 4 payment items.", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                });
                return;
            }
            // Assuming state.payment_json is an array
            const updatedClients = [
                ...(payments || []),
                { ...newPayment, id: Date.now() },
            ];
            setPayments(updatedClients);
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
        if (window.confirm("Are you sure you want to delete this Payment details?")) {
            let newjson = payments.filter(
                (_, index) => index !== indexToDelete
            );
            setPayments(newjson);
        }
    };
    const editClient = (index, type) => {
        const PaymentToEdit = payments[index];
        setNewPayment(PaymentToEdit);
        setEditIndex(index);
    };


    const onFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let data = {
            id: felidData.id,
            type: felidData.type,
            receiver_type: felidData.receiver_type,
            payment_json: payments,
        }
        try {
            let res = await AddUpdateAgreement(data);
            if (res.data.message === "Agreement updated successfully.") {
                toast.success("Payment details updated successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
                setApicall(true);
                setLoading(false);
                close();
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };
    const IsFamilyFelidsEmpty = JSON.stringify(newPayment) === JSON.stringify({
        description: "",
        notes: "",
        additional_info: "",
        retainer_fee: "",
        government_fee: "",
    });
    console.log(payments)
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
                    <div>
                        <h5 className="text-center mb-7">Payment details List</h5>
                        <PaymentDetails
                            handleInputChange={handleInputChange}
                            newPayment={newPayment}
                            removePayment={removeClient}
                            editPayment={editClient}
                            Payments={payments}
                            addPayments={addPaymentDetails}
                        />
                        <div className="text-center mb-5">
                            <button
                                type="submit"
                                className="btn btn-primary btn-small w-25 mt-5 rounded-5 text-uppercase p-8"
                                disabled={loading || !IsFamilyFelidsEmpty}
                            >
                                {loading ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AddPaymentDetailsForm;
