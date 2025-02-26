import React, { useState } from "react";

// import Fatrash from "react-icons/fa"

import { CiTrash } from "react-icons/ci";


const PaymentInvoice = () => {

    const [paymentData, setPaymentData] = useState(
        [{ id: 1, serviceDate: "", product: "", description: "", quantity: "", rate: "", amount: "", serviceTax: "" }
        ]
    );
    const handleAddNew = (e) => {
        e.preventDefault();
        setPaymentData([...paymentData, { id: paymentData.length + 1, serviceDate: "", product: "", description: "", quantity: "", rate: "", amount: "", serviceTax: "" }]);
    };


    const handleChange = (index, field, value) => {
        const updatedData = paymentData.map((row, i) => 
            i === index ? { ...paymentData, [field]: value } : paymentData
        );
        setPaymentData(updatedData);
    };
    const handleDelete = (index) => {
        setPaymentData(paymentData.filter((_, i) => i !== index));
    };

    return (
        <div className="p-1">
            <h2 className="font-size-6"> Invoice no.492</h2>
            {/* first row */}
            <div className="row">
                <div className="col-sm-6 row">
                    <div className="form_group col-sm-4 p-1">
                        <p className="input_label">Customer</p>
                        <div className="select_div">
                            <select name="customer" id="1" className="form-control ">
                                <option value="value1">select customer</option>
                                <option value="value1">user 1</option>
                            </select>
                        </div>
                    </div>
                    <div className="form_group col-sm-4 p-1">
                        <div className="d-flex justify-content-between">
                            <p className="input_label">Customer Email</p>
                            <span className="input_label text-blue">Cc/Bcc</span>
                        </div>
                        <div className="select_div">
                            <input type="text" className="form-control" />
                        </div>
                        <div className="d-flex justify-content-start g-2 mt-3">
                            <input type="checkbox" className="pr-2 mr-2" />
                            <label htmlFor="" className="form-check-label">
                                {" "}
                                Send Later
                            </label>
                        </div>
                    </div>

                    <div className="form_group col-sm-4 p-1">
                        <div className="d-flex justify-content-between align-items-center">
                            <h2 className="font-size-2"> Online Payment</h2>
                            <button className="border-0 bg-transparent text-blue font-size-3 ">
                                Edit
                            </button>
                        </div>

                        <div className="d-flex justify-content-between">
                            <p>Cards</p>
                        </div>
                    </div>
                </div>

                <div className="col-sm-6">
                    <div className="d-flex justify-content-end flex-column align-items-end">
                        <p className="font-size-4 text-muted m-0">Balance due</p>
                        <h2 className="font-size-6 ">$5500.00</h2>
                        <button className="btn btn-primary">Receive Payment</button>
                    </div>
                </div>
            </div>
            {/* second row */}
            <div className="row mt-4">
                <div className="col-sm-6 row">
                    <div className="form_group col-sm-3 p-1">
                        <p className="input_label">Billing Address</p>
                        <div className="select_div">
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="form_group col-sm-3 p-1">
                        <p className="input_label">Terms</p>
                        <div className="select_div">
                            <select name="customer" id="" className="form-control ">
                                <option value="value1">New 30</option>
                                <option value="value1">user 1</option>
                            </select>
                        </div>
                    </div>
                    <div className="form_group col-sm-3 p-1">
                        <p className="input_label">Invoice Date</p>
                        <div className="select_div">
                            <input
                                type="date"
                                className="form-control"
                                defaultValue={"2023-01-01"}
                            />
                        </div>
                    </div>
                    <div className="form_group col-sm-3 p-1">
                        <p className="input_label">Due Date</p>
                        <div className="select_div">
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={"2023-01-01"}
                            />
                        </div>
                    </div>
                </div>

                <div className="col-sm-6 d-flex justify-content-end">
                    <div className="form_group col-sm-3 p-1">
                        <p className="input_label">Invoice no.</p>
                        <div className="select_div">
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                </div>
            </div>

            {/* third section */}
            <div className="row mt-3">
                <div className="form_group col-sm-6 p-0 pr-10">
                    <div className=" d-flex  justify-content-between">
                        <p className="input_label m-0">Tages </p>
                        <button className="input_label text-blue border-0 bg-transparent p-0 ">
                            Managed Tags
                        </button>
                    </div>
                    <div className="select_div">
                        <input type="text" className="form-control" />
                    </div>
                </div>
            </div>

            {/* fourth section */}

            <div className="d-flex from_group gap-2 justify-content-end">
                <h2 className="font-size-5 text-muted mr-2">Amounts are </h2>
                <div className="select_div">
                    <select name="customer" id="" className="form-control ">
                        <option value="value1">Inclusive of tax</option>
                        <option value="value1">Exclusive of tax</option>
                    </select>
                </div>
            </div>

            {/* invoice table */}
            <form
                action="submit" onSubmit={(e) => e.preventDefault()}
            >
                <div className="table_responsive overflow-scroll">
                    <table className="table table-striped main_data_table text-start align-middle">
                        <thead>
                            <tr>
                                <th style={{ width: "5%" }}>#</th>
                                <th style={{ width: "10%" }}>Service Date</th>
                                <th style={{ width: "20%" }}>Product/Service</th>
                                <th style={{ width: "20%" }}>Description</th>
                                <th style={{ width: "5%", textAlign: "right" }}>Quantity</th>
                                <th style={{ width: "5%", textAlign: "right" }}>Rate</th>
                                <th style={{ width: "10%", textAlign: "right" }}>Amount</th>
                                <th style={{ width: "10%" }}>Service Tax</th>
                                <th style={{ width: "5%" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentData.map((item, index) => (
                                <tr key={index}>
                                    <td tyle={{ width: "5%" }}>
                                        <input
                                            type="text"
                                            class="border-0 bg-transparent"
                                            style={{ width: "100%" }}
                                            value={item.id}
                                            onChange={(e)=>handleChange(index,"",e.target.value)}
                                        />
                                    </td>
                                    <td style={{ width: "10%" }}>
                                        <input
                                            type="text"
                                            class="border-0 bg-transparent"
                                            width={"100%"}
                                            value={item.serviceDate}
                                            onChange={(e)=>handleChange(index,"",e.target.value)}
                                        />
                                    </td>
                                    <td style={{ width: "20%" }}>
                                        <input
                                            type="text"
                                            class="border-0 bg-transparent"
                                            style={{ width: "100%" }}
                                            value={item.product}
                                            onChange={(e)=>handleChange(index,"",e.target.value)}
                                        />
                                    </td>
                                    <td style={{ width: "20%" }}>
                                        <input
                                            type="text"
                                            class="border-0 bg-transparent"
                                            style={{ width: "100%" }}
                                            value={item.description}
                                            onChange={(e)=>handleChange(index,"",e.target.value)}
                                        />
                                    </td>
                                    <td style={{ width: "5%", textAlign: "right" }}>
                                        <input
                                            type="text"
                                            class="border-0 bg-transparent"
                                            style={{ width: "100%", textAlign: "right" }}
                                            value={item.quantity}
                                            onChange={(e)=>handleChange(index,"",e.target.value)}
                                        />
                                    </td>
                                    <td style={{ width: "5%", textAlign: "right" }}>
                                        <input
                                            type="text"
                                            class="border-0 bg-transparent"
                                            style={{ width: "100%", textAlign: "right" }}
                                            value={item.rate}
                                            onChange={(e)=>handleChange(index,"",e.target.value)}
                                        />
                                    </td>
                                    <td style={{ width: "10%", textAlign: "right" }}>
                                        <input
                                            type="text"
                                            class="border-0 bg-transparent"
                                            style={{ width: "100%", textAlign: "right" }}
                                            value={item.amount}
                                            onChange={(e)=>handleChange(index,"",e.target.value)}
                                        />
                                    </td>
                                    <td style={{ width: "10%", textAlign: "right" }}>
                                        <input
                                            type="text"
                                            class="border-0 bg-transparent"
                                            style={{ width: "100%" }}
                                            value={item.serviceTax}
                                            onChange={(e)=>handleChange(index,"",e.target.value)}
                                        />
                                    </td>
                                    {/* <td style={{ width: "5%" }}>
                                   <input
                                       type="text"
                                       class="form-control"
                                       style={{ width: "100%" }}
                                       value="4"
                                   />
                               </td> */}

                                    <td style={{ width: "5%" }}>
                                        <button
                                            className="border-0 bg-transparent"
                                            onClick={() => {
                                                handleDelete(index);
                                            }}
                                        >
                                            {" "}
                                            <CiTrash color="red" fontSize={20} />
                                        </button>{" "}
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="d-flex gap-2 justify-content-between align-items-start">
                    <div>
                        <button className="btn btn-primary py-1 " onClick={(e) => handleAddNew(e)}>Add New </button>

                        <div className="form_group pt-4">
                            <p className="input_label">message on Invoice</p>
                            <div className="select_div">
                                <input type="text" className="form-control overflow-scroll" />
                            </div>
                        </div>
                        <div className="form_group pt-4">
                            <p className="input_label">message on Statement</p>
                            <div className="select_div">
                                <input type="text" className="form-control overflow-scroll" />
                            </div>
                        </div>
                    </div>
                    <div className="py-1" style={{ minWidth: '250px' }}>
                        <ul className="d-flex justify-content-between gap-2">
                            <li className="list-unstyled ">Sub Total</li>
                            <li className="list-unstyled ">50</li>
                        </ul>
                        <ul className="d-flex justify-content-between">
                            <li className="list-unstyled ">Gst@18%</li>
                            <li className="list-unstyled ">5</li>
                        </ul>
                        <ul className="d-flex justify-content-between">
                            <li className="list-unstyled ">Total</li>
                            <li className="list-unstyled ">55</li>
                        </ul>
                        <ul className="d-flex justify-content-between">
                            <li className="list-unstyled ">Balance Due</li>
                            <li className="list-unstyled ">55</li>
                        </ul>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PaymentInvoice;
