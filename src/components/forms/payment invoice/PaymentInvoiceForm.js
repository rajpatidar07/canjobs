import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
// import Fatrash from "react-icons/fa"

import { CiTrash } from "react-icons/ci";
import { AddUpdatePaymentInvoiceApi } from "../../../api/api";
import { toast } from "react-toastify";

const PaymentInvoiceForm = (props) => {
  let [loading, setLoading] = useState(false)
  const initialFormState =
  {
    invoice_no: parseInt(props.lastInvoiceNo) + 1,
    user_id: props.userId,//Employee /employer id
    user_type: props.userType,//Employee /employer type
    user_email: props.userEmail,//Employee /employer email
    referred_by_id: "",//Creating by admin id
    referred_by_type: "",//Creating by admin type
    manager_id: "",//assigning manger ( admin id)
    manager_type: "",//assigning manger ( admin type)
    payment_status: "",
    duplicate_payment: "",
    due_date: "",
    payment_method: "",
    due_amount: "",
    product_json: [],
    billing_address: "",
    terms: "",
    invoice_date: "",
    tags: "",
    subtotal: "",
    total: "",
    message_on_invoice: "",
    message_on_statement: "",
    amounts_are: "",
    gst_percentage: ""
  }
    ;
  const { state, setState, onInputChange, /*errors, validate*/ } = useValidation(
    initialFormState,);
  useEffect(() => {
    if (props.singleInvoiceData) {
      const updatedData = {
        ...props.singleInvoiceData,
        product_json: props.singleInvoiceData?.product_json ? JSON.parse(props.singleInvoiceData.product_json) : [], // Convert string to array
      };

      setState(updatedData); // Set updated state
      console.log(updatedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.singleInvoiceData]);



  /*Function to close the modal */
  let close = () => {
    props.close()
    setState(initialFormState)
    setLoading(false)
  }
  /*function to submit payment invoice  form */
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted ", state);
    try {
      setLoading(true)
      let res = await AddUpdatePaymentInvoiceApi(state)
      if (res.data.status === 1 || res.data.status === "1") {
        toast.success("Payment invoice Created successful", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        close()
        props.setApiCall(true)
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
    // Here you can send the data to an API or process it further.
  };
  // Handle Input Change
  const handleProductChange = (index, field, value) => {
    const updatedData = [...state.product_json];
    updatedData[index][field] = value;
    setState({ ...state, product_json: updatedData });
  };

  /*Function to add new product */
  const handleAddNewProduct = () => {
    setState((prevState) => {
      const updatedProducts = [
        ...(prevState.product_json || []),
        {
          id: "", // Temporary, will be reassigned
          service_date: "",
          product: "",
          description: "",
          quantity: "",
          rate: "",
          amount: "",
          service_tax: "",
        },
      ].map((item, index) => ({ ...item, id: index.toString() })); // Assign index as ID

      return { ...prevState, product_json: updatedProducts };
    });
  };

  /*Function to delete the product */
  const handleDeleteProduct = (index) => {
    setState((prevState) => {
      const updatedProducts = prevState.product_json
        .filter((_, i) => i !== index) // Remove selected item
        .map((item, index) => ({ ...item, id: index.toString() })); // Reassign IDs

      return { ...prevState, product_json: updatedProducts };
    });
  };

  return (
    <Modal
      show={props.show}
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
        onClick={() => close()}
      >
        <i className="fas fa-times"></i>
      </button>

      <div className="px-11 py-7 bg-white rounded-3">
        <h2 className="font-size-6 text-center">Payment Invoice</h2>

        <h5 className="font-size-6 mb-4"> Invoice no. {state.invoice_no}</h5>
        {/* first row */}
        <form>
          <div className="row ">
            <div className="form-group col-md-3 p-1">
              <label className="font-size-4 text-black-2 line-height-reset font-weight-semibold">
                Customer
              </label>
              <select
                name="userId"
                value={state.user_id + "," + state.user_type}
                id="userId"
                onChange={(e) => {
                  console.log(e.target.value.split(",")[1])
                  setState({ ...state, user_id: (e.target.value.split(",")[0]) });
                  setState({ ...state, user_type: (e.target.value.split(",")[1]) });
                }}
                disabled={state.user_id && state.user_type}
                className="form-control mt-3"
              >
                <option value={""}>Select Applicant/Client</option>
                {(props.employee_employer_list || []).map((item, index) => {
                  return (
                    <option
                      className="text-capitalize"
                      key={index}
                      value={
                        item.employee_id
                          ? `${item.employee_id},employee`
                          : item.company_id
                            ? `${item.company_id},employer`
                            : `${item.id},applicant_type`
                      }
                    >
                      {item.employee_id
                        ? (item.name + " (Candidate)")
                        : item.company_id
                          ? item.company_name + " (Client)"
                          : item.title + " (Applicant Type)" ||
                          "unknown user"}
                    </option>
                  );
                })}{" "}
              </select>
            </div>
            <div className="form-group col-md-3">
              <div className="d-flex justify-content-end align-items-start">
                <label className="font-size-4 text-black-2 line-height-reset font-weight-semibold">
                  Customer Email
                </label>
                <button
                  className="d-none position-absolute border-0 bg-transparent text-blue font-size"
                  style={{ top: "-25px" }}
                >
                  Cc/Bcc
                </button>
              </div>

              <input type="email" disabled={state.user_email} className="form-control" value={state.user_email} name="user_email" onChange={onInputChange} />

              {/* <div className="d-flex justify-content-start g-2 mt-3">
                <input type="checkbox" className="pr-2 mr-2" />
                <label htmlFor="" className="form-check-label">
                  {" "}
                  Send Later
                </label>
              </div> */}
            </div>

            <div className="form-group col-md-3 d-none">
              <div className="d-flex justify-content-end align-items-start">
                <label className="font-size-4 text-black-2 line-height-reset font-weight-semibold">
                  {" "}
                  Online Payment
                </label>
                <button className=" d-none position-absolute border-0 bg-transparent text-blue font-size-3 " style={{ top: "-15px" }}>
                  Edit
                </button>
              </div>
              <div className="d-flex justify-content-between align-items-center p-2">
                <p>Cards</p>
              </div>
            </div>
            <div className="form-group col-md-3">
              <label className="font-size-4 text-black-2 line-height-reset font-weight-semibold">Balance due</label>
              <input
                type="number"
                className="form-control"
                value={state.due_amount}
                onChange={onInputChange}
                name="due_amount"
                min={0}
              />
              <button className="btn btn-primary d-none">Receive Payment</button>
            </div>
          </div>

          {/* second row */}
          <div className=" row mt-8">
            <div className="form-group col-md-3 p-1">
              <label className="font-size-4 text-black-2 line-height-reset font-weight-semibold">
                Terms
              </label>
              <select name="terms" id="" className="form-control" value={state.terms} onChange={onInputChange}>
                <option value="1">New 30</option>
                <option value="2">user 1</option>
              </select>
            </div>
            <div className="form-group col-md-3 p-1">
              <label className="font-size-4 text-black-2 line-height-reset font-weight-semibold">
                Billing Address
              </label>
              <input type="text" className="form-control" name="billing_address" value={state.billing_address} onChange={onInputChange} />
            </div>

            <div className="form-group col-md-3 p-1">
              <label className="font-size-4 text-black-2 line-height-reset font-weight-semibold">
                Invoice Date
              </label>
              <input
                type="date"
                className="form-control"
                name="invoice_date" value={state.invoice_date} onChange={onInputChange} />
            </div>
            <div className="form-group col-md-3 p-1">
              <label className="font-size-4 text-black-2 line-height-reset font-weight-semibold ">
                Due Date
              </label>
              <input
                type="date"
                className="form-control"
                name="due_date" value={state.due_date} onChange={onInputChange} />
            </div>

            {/* <div className="col-auto "></div> */}
          </div>

          {/* third section */}
          <div className=" row mt-8 ">
            <div className="form-group col-sm-6 p-0 pr-10">
              <label className="font-size-4 text-black-2 line-height-reset font-weight-semibold">
                Tags{" "}
              </label>
              <input type="text" className="form-control" name="tags" value={state.tags} onChange={onInputChange} />
              <button
                className="d-none position-absolute border-0 bg-transparent text-blue font-size"
                style={{ top: "-25px" }}
              >
                Managed Tags
              </button>
            </div>
            <div className="col-md-6 form-group">
              <label className="text-black-2 line-height-reset font-weight-semibold font-size-4">
                Amounts are{" "}
              </label>
              <select name="amounts_are" value={state.amounts_are} onChange={onInputChange} id="" className="form-control">
                <option value="Inclusive of tax">Inclusive of tax</option>
                <option value="Exclusive of tax">Exclusive of tax</option>
              </select>
            </div>
          </div>


          {/* invoice table */}

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
                {console.log(typeof state?.product_json)}
                {
                  state?.product_json.length === 0 ? (
                    <tr>
                      <th colSpan={9} className="bg-white text-center">
                        No products have been added yet.
                      </th>
                    </tr>
                  ) : (state?.product_json || []).map((item, index) => (
                    <tr key={index}>
                      <td>
                        {index + 1}
                      </td>
                      <td>
                        <input
                          type="date"
                          className="border-0 bg-transparent"
                          style={{ width: "100%" }}
                          value={item.serviceDate}
                          onChange={(e) =>
                            handleProductChange(index, "service_date", e.target.value)
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
                            handleProductChange(index, "product", e.target.value)
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
                            handleProductChange(index, "description", e.target.value)
                          }
                        />
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <input
                          type="number"
                          className="border-0 bg-transparent"
                          style={{ width: "100%", textAlign: "right" }}
                          value={item.quantity}
                          onChange={(e) =>
                            handleProductChange(index, "quantity", e.target.value)
                          }
                        />
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <input
                          type="number"
                          className="border-0 bg-transparent mx-2"
                          style={{ width: "100%", textAlign: "right" }}
                          value={item.rate}
                          onChange={(e) => handleProductChange(index, "rate", e.target.value)}
                        />
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <input
                          type="number"
                          className="border-0 bg-transparent"
                          style={{ width: "100%", textAlign: "right" }}
                          value={item.amount}
                          onChange={(e) =>
                            handleProductChange(index, "amount", e.target.value)
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
                            handleProductChange(index, "service_tax", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <button
                          className="border-0 bg-transparent"
                          onClick={() => handleDeleteProduct(index)}
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
                onClick={(e) => handleAddNewProduct(e)}
                type="button"
              >
                Add New{" "}
              </button>

              <div className="form_group pt-4">
                <p className="input_label">message on Invoice</p>
                <div className="select_div">
                  <textarea
                    type="text"
                    className="form-control overflow-scroll"
                    value={state.message_on_invoice}
                    name="message_on_invoice"
                    onChange={onInputChange}
                  />
                </div>
              </div>
              <div className="form_group pt-4">
                <p className="input_label">message on Statement</p>
                <div className="select_div">
                  <textarea
                    type="text"
                    className="form-control overflow-scroll"
                    value={state.message_on_statement}
                    name="message_on_statement"
                    onChange={onInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="py-1" style={{ minWidth: "250px" }}>
              <ul className="d-flex justify-content-between">
                <li className="list-unstyled ">Sub Total {" "}</li>
                <li className="list-unstyled "><input
                  type="number"
                  className="form-control"
                  name="subtotal" value={state.subtotal} onChange={onInputChange} /></li>
              </ul>
              <ul className="d-flex justify-content-between">
                <li className="list-unstyled ">Gst@${state.gst_percentage}%</li>
                <li className="list-unstyled "><input
                  type="number"
                  className="form-control"
                  name="gst_percentage" value={state.gst_percentage} onChange={onInputChange} /></li>
              </ul>
              <ul className="d-flex justify-content-between">
                <li className="list-unstyled ">Total</li>
                <li className="list-unstyled "><input
                  type="number"
                  className="form-control"
                  name="total" value={state.total} onChange={onInputChange} /></li>
              </ul>
              <ul className="d-flex justify-content-between">
                <li className="list-unstyled ">Balance Due</li>
                <li className="list-unstyled ">{state.due_amount}</li>
              </ul>
            </div>
          </div>
          <div className="text-center mb-5">
            <button
              type="button"
              className="btn btn-primary btn-small w-25 mt-5 rounded-5 text-uppercase p-8"
              disabled={loading}
              onClick={(e) => handleSubmit(e)}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="btn btn-primary btn-small w-25 mt-5 rounded-5 text-uppercase p-8"
              disabled={loading}
            >
              {loading ? "Saving..." : "save and send"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default PaymentInvoiceForm;
