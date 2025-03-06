import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../common/useValidation";
// import Fatrash from "react-icons/fa"

import { CiTrash } from "react-icons/ci";

const PaymentInvoice = (props) => {
  let [paymentInvoiceData/*,setPaymentInvoiceData*/]= useState([])
  const initialFormState =
  {
    user_id:"",//Employee /employer id
    user_type:"",//Employee /employer type
    referred_by_id:"",//Creating by admin id
    referred_by_type:"",//Creating by admin type
    manager_id:"",//assigning manger ( admin id)
    manager_type:"",//assigning manger ( admin type)
    payment_status: "",
    duplicate_payment: "",
    due_date: "",
    payment_method: ""}
    ;
  const { state/*, onInputChange, setState, errors, validate*/ } = useValidation(
    initialFormState, );
  const handleAddNew = (e) => {
    e.preventDefault();

  };

  const handleChange = (index, fieldName, value) => {

  };

  const handleDelete = (index) => {
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted ", state);
    // Here you can send the data to an API or process it further.
  };

  return (
    <Modal
      show={props.openAddPaymentForm}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      background="rgba(255, 255, 255, 1)"
    >
      <button
        type="button"
        className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
        data-dismiss="modal"
        onClick={() => props.setOpenAddPaymentForm(false)}
      >
        <i className="fas fa-times"></i>
      </button>

      <div className="px-11 py-7 bg-white rounded-3">
        <h2 className="font-size-6 text-center">Payment Invoice</h2>

        <h5 className="font-size-6 mb-4"> Invoice no.492</h5>
        {/* first row */}

        <div className="row ">
          <div className="form-group col-md-3 p-1">
            <label className="font-size-4 text-black-2 line-height-reset font-weight-semibold">
              Customer
            </label>
            <select name="customer" id="1" className="form-control w-100 ">
              <option value="value1">select customer</option>
              <option value="value1">user 1</option>
            </select>
          </div>
          <div className="form-group col-md-3">
            <div className="d-flex justify-content-end align-items-start">
              <label className="font-size-4 text-black-2 line-height-reset font-weight-semibold">
                Customer Email
              </label>
              <button
                className="position-absolute border-0 bg-transparent text-blue font-size"
                style={{ top: "-25px" }}
              >
                Cc/Bcc
              </button>
            </div>

            <input type="text" className="form-control" />

            {/* <div className="d-flex justify-content-start g-2 mt-3">
                <input type="checkbox" className="pr-2 mr-2" />
                <label htmlFor="" className="form-check-label">
                  {" "}
                  Send Later
                </label>
              </div> */}
          </div>

          <div className="form-group col-md-3">
            <div className="d-flex justify-content-end align-items-start">
              <label className="font-size-4 text-black-2 line-height-reset font-weight-semibold">
                {" "}
                Online Payment
              </label>
              <button className="position-absolute border-0 bg-transparent text-blue font-size-3 " style={{ top: "-15px" }}>
                Edit
              </button>
            </div>
            <div className="d-flex justify-content-between align-items-center p-2">
              <p>Cards</p>
            </div>
          </div>
          <div className="col-md-3 d-flex justify-content-start mt-n8 flex-column align-items-end">
            <p className="font-size-4 text-muted m-0">Balance due</p>
            <h2 className="font-size-6 ">$5500.00</h2>
            <button className="btn btn-primary">Receive Payment</button>
          </div>
        </div>

        {/* second row */}
        <div className=" row mt-8">
          <div className="form-group col-md-3 p-1">
            <label className="font-size-4 text-black-2 line-height-reset font-weight-semibold">
              Terms
            </label>
            <select name="customer" id="" className="form-control ">
              <option value="value1">New 30</option>
              <option value="value1">user 1</option>
            </select>
          </div>
          <div className="form-group col-md-3 p-1">
            <label className="font-size-4 text-black-2 line-height-reset font-weight-semibold">
              Billing Address
            </label>
            <input type="text" className="form-control" />
          </div>

          <div className="form-group col-md-3 p-1">
            <label className="font-size-4 text-black-2 line-height-reset font-weight-semibold">
              Invoice Date
            </label>
            <input
              type="date"
              className="form-control"
              defaultValue={"2023-01-01"}
            />
          </div>
          <div className="form-group col-md-3 p-1">
            <label className="font-size-4 text-black-2 line-height-reset font-weight-semibold ">
              Due Date
            </label>
            <input
              type="text"
              className="form-control"
              defaultValue={"2023-01-01"}
            />
          </div>

          {/* <div className="col-auto "></div> */}
        </div>

        {/* third section */}
        <div className=" row mt-8">
          <div className="form-group col-sm-6 p-1">
            <label className="font-size-4 text-black-2 line-height-reset font-weight-semibold">
              Invoice no.
            </label>
            <input type="text" className="form-control" />
          </div>

          <div className="form-group col-sm-6 p-0 pr-10">
            <div className=" d-flex  justify-content-end">
              <label className="font-size-4 text-black-2 line-height-reset font-weight-semibold">
                Tages{" "}
              </label>
              <button
                className="position-absolute border-0 bg-transparent text-blue font-size"
                style={{ top: "-25px" }}
              >
                Managed Tags
              </button>
            </div>
            <div className="select_div">
              <input type="text" className="form-control" />
            </div>
          </div>
        </div>

        {/* fourth section */}

        <div className="row justify-content-end mt-8">
          <div className="col-md-3 form-group">
            <label className="text-black-2 line-height-reset font-weight-semibold font-size-4">
              Amounts are{" "}
            </label>
            <select name="customer" id="" className="form-control">
              <option value="value1">Inclusive of tax</option>
              <option value="value1">Exclusive of tax</option>
            </select>
          </div>
        </div>

        {/* invoice table */}
        <form action="submit" onSubmit={(e) => handleSubmit(e)}>
          <div className="table-responsive main_table_div">
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
                {paymentInvoiceData.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        className="border-0 bg-transparent"
                        style={{ width: "100%" }}
                        value={item.id}
                        onChange={(e) =>
                          handleChange(index, "id", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="border-0 bg-transparent"
                        style={{ width: "100%" }}
                        value={item.serviceDate}
                        onChange={(e) =>
                          handleChange(index, "serviceDate", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="border-0 bg-transparent"
                        style={{ width: "100%" }}
                        value={item.product}
                        onChange={(e) =>
                          handleChange(index, "product", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="border-0 bg-transparent"
                        style={{ width: "100%" }}
                        value={item.description}
                        onChange={(e) =>
                          handleChange(index, "description", e.target.value)
                        }
                      />
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <input
                        type="text"
                        className="border-0 bg-transparent"
                        style={{ width: "100%", textAlign: "right" }}
                        value={item.quantity}
                        onChange={(e) =>
                          handleChange(index, "quantity", e.target.value)
                        }
                      />
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <input
                        type="text"
                        className="border-0 bg-transparent"
                        style={{ width: "100%", textAlign: "right" }}
                        value={item.rate}
                        onChange={(e) =>
                          handleChange(index, "rate", e.target.value)
                        }
                      />
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <input
                        type="text"
                        className="border-0 bg-transparent"
                        style={{ width: "100%", textAlign: "right" }}
                        value={item.amount}
                        onChange={(e) =>
                          handleChange(index, "amount", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="border-0 bg-transparent"
                        style={{ width: "100%" }}
                        value={item.serviceTax}
                        onChange={(e) =>
                          handleChange(index, "serviceTax", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <button
                        className="border-0 bg-transparent"
                        onClick={() => handleDelete(index)}
                      >
                        <CiTrash color="red" fontSize={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex gap-2 justify-content-between align-items-start">
            <div>
              <button
                className="btn btn-primary py-1 "
                onClick={(e) => handleAddNew(e)}
              >
                Add New{" "}
              </button>

              <div className="form_group pt-4">
                <p className="input_label">message on Invoice</p>
                <div className="select_div">
                  <textarea
                    type="text"
                    className="form-control overflow-scroll"
                  />
                </div>
              </div>
              <div className="form_group pt-4">
                <p className="input_label">message on Statement</p>
                <div className="select_div">
                  <textarea
                    type="text"
                    className="form-control overflow-scroll"
                  />
                </div>
              </div>
            </div>
            <div className="py-1" style={{ minWidth: "250px" }}>
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
    </Modal>
  );
};

export default PaymentInvoice;
