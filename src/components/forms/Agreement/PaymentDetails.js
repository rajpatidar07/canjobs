import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function PaymentDetails({
    handleInputChange,
    newPayment,
    removePayment,
    editPayment,
    Payments,
    addPayments,
}) {
    return (
        <div
            className="main_table_div w-100"
            style={{ minHeight: "50px !important" }}
        >
            <table className="table table-striped main_data_table overflow-auto">
                <thead>
                    <tr>
                        <th className="border-0 font-size-4 ">S.no</th>
                        <th scope="col" className="border-0 font-size-4 font-weight-normal">
                            RCIC Service Milestone
                        </th>
                        <th scope="col" className="border-0 font-size-4 font-weight-normal">
                            Estimated date of Completion
                        </th>
                        <th scope="col" className="border-0 font-size-4 font-weight-normal">
                            Professional Fees (Non-Refundable)
                        </th>
                        <th scope="col" className="border-0 font-size-4 font-weight-normal">
                            Applicable Retainer Fee for this stage (Non- Refundable)
                        </th>
                        <th scope="col" className="border-0 font-size-4 font-weight-normal">
                            Applicable Government Processing Fee
                        </th>
                        <th scope="col" className="border-0 font-size-4 font-weight-normal">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(Payments) && Payments.length > 0 ? (
                        Payments.map((client, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td className="text-capitalize" title={client.description || "N/A"}>{client.description || "N/A"}</td>
                                <td className="text-capitalize" title={client.notes || "N/A"}>{client.notes || "N/A"}</td>
                                <td className="text-capitalize" title={client.additional_info || "N/A"}>{client.additional_info || "N/A"}</td>
                                <td className="text-capitalize" title={client.retainer_fee || "N/A"}>{client.retainer_fee || "N/A"}</td>
                                <td className="text-capitalize" title={client.government_fee || "N/A"}>{client.government_fee || "N/A"}</td>
                                <td>
                                    <div className="btn-group button_group" role="group">
                                        <button
                                            type="button"
                                            className="btn btn-outline-info action_btn"
                                            onClick={() => editPayment(index, "payment")}
                                            title="Edit"
                                        >
                                            <span className="text-gray px-5">
                                                <FaEdit />
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger action_btn"
                                            onClick={() => removePayment(index, "payment")}
                                            title="Delete"
                                        >
                                            <span className="text-danger px-5">
                                                <FaTrash />
                                            </span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="text-center">No Payment details found</td>
                        </tr>
                    )}

                </tbody>
            </table>
            <div
                className="form-group row align-items-center mt-2 mb-2"
                style={{ padding: "0!important" }}
            >
                <div className="col-md-3 mb-2">
                    <input
                        className="form-control"
                        type="text"
                        name="description"
                        value={newPayment.description}
                        onChange={(e) => handleInputChange(e, "payment")}
                        placeholder="RCIC Service Milestone"
                    />
                </div>
                <div className="col-md-2 mb-2">
                    <input
                        className="form-control"
                        type="text"
                        name="notes"
                        value={newPayment.notes}
                        onChange={(e) => handleInputChange(e, "payment")}
                        placeholder="Estimated date of Completion"
                    />
                </div>
                <div className="col-md-2 mb-2">
                    <input
                        className="form-control"
                        type="text"
                        name="additional_info"
                        value={newPayment.additional_info}
                        onChange={(e) => handleInputChange(e, "payment")}
                        placeholder="Professional Fees (Non-Refundable)"
                    />
                </div>
                <div className="col-md-2 mb-2">
                    <input
                        className="form-control"
                        type="text"
                        name="retainer_fee"
                        value={newPayment.retainer_fee}
                        onChange={(e) => handleInputChange(e, "payment")}
                        placeholder="Applicable Retainer Fee for this stage (Non- Refundable)"
                    />
                </div>
                <div className="col-md-2 mb-2">
                    <input
                        className="form-control"
                        type="text"
                        name="government_fee"
                        value={newPayment.government_fee}
                        onChange={(e) => handleInputChange(e, "payment")}
                        placeholder="Applicable Government Processing Fee"
                    />
                </div>
                <div className="col-md-1 mb-2">
                    <button
                        type="button"
                        className="btn btn-primary w-100"
                        onClick={addPayments}
                        style={{ minWidth: "auto" }}
                    >
                        +          </button>
                </div>
            </div>
        </div>
    );
}

export default PaymentDetails;
