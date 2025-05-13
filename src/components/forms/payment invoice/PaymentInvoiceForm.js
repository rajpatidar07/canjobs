import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
// import Fatrash from "react-icons/fa"
import { CiTrash } from "react-icons/ci";
import { AddFIlter, AddUpdatePaymentInvoiceApi, GetFilter } from "../../../api/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const PaymentInvoiceForm = (props) => {
  let [loading, setLoading] = useState(false)
  let [showTermsInput, setShowTermsInput] = useState(false)
  let [json, setJson] = useState()
  let [newTerms, setNewTerms] = useState("")
  let [termsErrors, setTermsErrors] = useState("")
  let [addTermsloading, setAddTermsLoading] = useState(false)
  let [saveType, setSaveType] = useState("")
  const [recAmt, setRecAmt] = useState(0);

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
    payment_Terms: "",
    duplicate_payment: "",
    due_date: "",
    payment_method: "",
    due_amount: 0,
    product_json: [],
    billing_address: "",
    terms: "",
    invoice_date: "",
    tags: "",
    subtotal: 0,
    total: 0,
    message_on_invoice: "",
    message_on_statement: "",
    amounts_are: "Inclusive of tax",
    gst_percentage: "",
    status: props.singleInvoiceData ? props.singleInvoiceData.status : 2,
    received_amount: ""
  }
    ;
  const { state, setState, onInputChange, /*errors, validate*/ } = useValidation(
    initialFormState,);
  /*Function to get the  payment invoice terms list */
  let GetAllJsonList = async () => {
    try {
      let res = await GetFilter()
      setJson(res.data.data)
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    GetAllJsonList()
    if (props.singleInvoiceData) {
      const updatedData = {
        ...props.singleInvoiceData,
        product_json: props.singleInvoiceData?.product_json ? JSON.parse(props.singleInvoiceData.product_json) : [], // Convert string to array
      };

      setState(updatedData); // Set updated state
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.singleInvoiceData]);

  /*Function to add the new term */
  let onAddNewTermsClick = async (event) => {
    event.preventDefault();

    if (newTerms) {
      let data = {
        json_item: newTerms,
      };
      try {
        /*Id for the payment_invoice_terms is 42 */
        const responseData = await AddFIlter(data, 42);
        if (responseData.message === "item already exist !") {
          setTermsErrors("Terms already exist !");
          setNewTerms("");
          setLoading(false);
        }
        if (responseData.message === "filter item added successfully") {
          toast.success("Terms added successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          GetAllJsonList()
          setShowTermsInput(false);
          setNewTerms("");
          setAddTermsLoading(false);
          setTermsErrors("");
        }
      } catch (err) {
        console.log(err);
        setAddTermsLoading(false);
        setTermsErrors("");
      }
    } else {
      alert("No Terms found");
    }
  }

  /*Function to close the modal */
  let close = () => {
    props.close()
    setState(initialFormState)
    setLoading(false)
  }

  /*function to submit payment invoice  form */
  const handleSubmit = async (e, send) => {
    e.preventDefault();
    // console.log("Submitted ", state);
    try {
      let data = {
        ...state,
        is_send_mail: send ? send : 0,
        due_amount: recAmt ?
          parseInt(state.due_amount) - parseInt(recAmt)
          : parseInt(state.due_amount) + parseInt(state.total),
        received_amount: parseInt(state.received_amount||0) + parseInt(recAmt)
      }
      console.log(data,)
      setLoading(true)
      let res = await AddUpdatePaymentInvoiceApi(data)
      if (res.data.status === 1 || res.data.status === "1") {
        toast.success("Payment invoice Created successful", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        close()
        props.setApiCall(true)
      }
      if (res.data.status === 0 || res.data.status === "0") {
        if (res.data.message ===
          "Duplicate Invoice no.!") {
          toast.error("Payment invoice No can not be same", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true)
        }
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
          service_date: state.invoice_date,
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
  // const handleDeleteProduct = (index) => {
  //   setState((prevState) => {
  //     const updatedProducts = prevState.product_json
  //       .filter((_, i) => i !== index) // Remove selected item
  //       .map((item, index) => ({ ...item, id: index.toString() })); // Reassign IDs

  //     return { ...prevState, product_json: updatedProducts };
  //   });
  // };

  return (
    <Modal
      show={props.show}
      size={state.id ? "lg" : "xl"}
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
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
          setSaveType("save")

        }}>
          {

            <>
              <div className="row ">
                <div className="form-group col-md-3">
                  <label className="font-size-4 text-black-2 line-height-reset font-weight-semibold">
                    Customer
                  </label>
                  <select
                    name="userId"
                    value={state.user_id + "," + state.user_type}
                    id="userId"
                    onChange={(e) => {
                      // console.log(e.target.value.split(",")[1])
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
                    disabled={state.id}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label className="font-size-4 text-black-2 line-height-reset font-weight-semibold">Receive Payment</label>
                  <input
                    type="number"
                    className="form-control"
                    value={recAmt}
                    onChange={(e) => setRecAmt(e.target.value)}
                    name="recAmt"
                    min={0}
                  />
                </div>
                {state.received_amount && <small className="mx-5">Previous Receive Amount : {state.received_amount}</small>}
              </div>
            </>
          }
          {/* second row */}
          <div className={state.id ? "d-none" : " row mt-8"}>
            <div className="form-group col-md-3 p-1">
              <div className="d-flex flex-column">
                <label className="font-size-4 text-black-2 line-height-reset font-weight-semibold">
                  Terms
                </label>
                <div className="d-flex  align-items-center mb-2">
                  <select
                    name="terms" id="terms"

                    className={`form-control text-capitalize ${showTermsInput ? "" : "flex-grow-1 me-2"
                      }`}
                    value={state.terms} onChange={onInputChange}
                  >
                    <option value="">Select Terms</option>
                    {(json?.payment_invoice_terms || []).map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                  {showTermsInput ? (
                    <Link
                      className="btn-sm btn-light rounded-3 p-2"
                      onClick={() => setShowTermsInput(false)}
                      title="Close"
                    >
                      x
                    </Link>
                  ) : (
                    <Link
                      className="btn-sm btn-primary rounded-3 p-2 mx-1"
                      onClick={() => setShowTermsInput(true)}
                      title="Add New Option"
                    >
                      +
                    </Link>
                  )}
                </div>
                {showTermsInput && (
                  <div className="d-flex align-items-center">
                    <div>
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Enter Terms"
                        value={newTerms}

                        onChange={(e) => setNewTerms(e.target.value)}
                      />
                      {termsErrors && (
                        <small className="text-danger">{termsErrors}</small>
                      )}
                    </div>
                    {addTermsloading ? (
                      <Link
                        className="btn-sm btn-primary rounded-3 p-2"
                        type="button"
                        disabled
                      >
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          // eslint-disable-next-line jsx-a11y/aria-role
                          role="terms"
                          aria-hidden="true"
                        ></span>
                        ...
                      </Link>
                    ) : newTerms ? (
                      <Link
                        className="btn-sm btn-primary rounded-3 p-2 mx-1"
                        onClick={onAddNewTermsClick}
                        title="Save Terms"
                      >
                        ➡
                      </Link>
                    ) : null}
                  </div>
                )}
              </div>
              {/* <select name="terms" id="" className="form-control" value={state.terms} onChange={onInputChange}>
                <option value="1">New 30</option>
                <option value="2">user 1</option>
              </select> */}
            </div>
            <div className="form-group col-md-3 p-1">
              <label className="font-size-4 text-black-2 line-height-reset font-weight-semibold">
                Billing Address
              </label>
              <input type="text" className="form-control"

                name="billing_address" value={state.billing_address} onChange={onInputChange} />
            </div>

            <div className="form-group col-md-3 p-1">
              <label className="font-size-4 text-black-2 line-height-reset font-weight-semibold">
                Invoice Date
              </label>
              <input
                type="date"
                className="form-control"
                name="invoice_date"
                value={state.invoice_date} onChange={onInputChange} />
            </div>
            <div className="form-group col-md-3 p-1">
              <label className="font-size-4 text-black-2 line-height-reset font-weight-semibold ">
                Due Date
              </label>
              <input
                type="date"
                className="form-control"
                name="due_date" value={state.due_date} onChange={onInputChange}
                min={state.invoice_date}
              />
            </div>

            {/* <div className="col-auto "></div> */}
          </div>
          {/* third section */}
          <div className={state.id ? "d-none" : " row mt-8"}>
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
          <div className={state.id ? "d-none" : "table-responsive main_table_div"}>
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
                {
                  (state?.product_json?.length ?? 0) === 0 ? (
                    <tr>
                      <th colSpan={9} className="bg-white text-center">
                        No products have been added yet.
                      </th>
                    </tr>
                  ) : state.product_json.map((item, index) => {
                    // const quantity = parseFloat(item.quantity) || 0;
                    // const rate = parseFloat(item.rate) || 0;
                    // const amount = quantity * rate;

                    const updateCalculations = (updatedItems) => {
                      const newSubtotal = updatedItems.reduce(
                        (acc, curr) => acc + (parseFloat(curr.quantity) || 0) * (parseFloat(curr.rate) || 0),
                        0
                      );

                      const newGST = state.amounts_are === "Inclusive of tax"
                        ? updatedItems.reduce(
                          (acc, curr) =>
                            acc +
                            ((parseFloat(curr.quantity) || 0) *
                              (parseFloat(curr.rate) || 0) *
                              (parseFloat(curr.service_tax) || 0)) / 100,
                          0
                        )
                        : 0;

                      setState((prev) => ({
                        ...prev,
                        product_json: updatedItems,
                        subtotal: newSubtotal,
                        gst_percentage: newGST,
                        total: newSubtotal + newGST,
                        // due_amount: new_balance,
                      }));
                    };

                    const handleValueChange = (field, value) => {
                      const updatedItems = [...state.product_json];
                      updatedItems[index][field] = value;

                      const quantity = parseFloat(updatedItems[index].quantity) || 0;
                      const rate = parseFloat(updatedItems[index].rate) || 0;
                      updatedItems[index].amount = quantity * rate; // Update amount

                      if (field === "rate") {
                        updatedItems[index].service_tax =
                          state.amounts_are === "Inclusive of tax"
                            ? updatedItems[index].service_tax || 0
                            : 0;
                      }

                      updateCalculations(updatedItems);
                    };

                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <input type="date" className="border-0 bg-transparent" style={{ width: "100%" }} value={state.invoice_date} disabled />
                        </td>
                        <td>
                          <input type="text" className="border-0 bg-transparent" style={{ width: "100%" }} value={item.product}
                            onChange={(e) => handleProductChange(index, "product", e.target.value)} />
                        </td>
                        <td>
                          <input type="text" className="border-0 bg-transparent" style={{ width: "100%" }} value={item.description}
                            onChange={(e) => handleProductChange(index, "description", e.target.value)} />
                        </td>
                        <td>
                          <input type="number" className="border-0 bg-transparent" style={{ width: "100%", textAlign: "right" }} value={item.quantity}
                            onChange={(e) => handleValueChange("quantity", e.target.value)} />
                        </td>
                        <td>
                          <input type="number" className="border-0 bg-transparent" style={{ width: "100%", textAlign: "right" }} value={item.rate}
                            onChange={(e) => handleValueChange("rate", e.target.value)} />
                        </td>
                        <td style={{ textAlign: "right" }}>{item?.amount}</td>
                        <td>
                          <input type="number" className="border-0 bg-transparent" style={{ width: "100%" }} value={item.service_tax}
                            onChange={(e) => handleValueChange("service_tax", e.target.value)} />
                        </td>
                        <td>
                          <button

                            className="border-0 bg-transparent"
                            onClick={() => {
                              const updatedProducts = [...state.product_json];
                              const deletedItem = updatedProducts.splice(index, 1)[0];

                              const quantity = parseFloat(deletedItem.quantity) || 0;
                              const rate = parseFloat(deletedItem.rate) || 0;
                              const tax = parseFloat(deletedItem.service_tax) || 0;

                              const itemAmount = quantity * rate;
                              const itemGST = state.amounts_are === "Inclusive of tax" ? (itemAmount * tax) / 100 : 0;
                              const totalDeduct = itemAmount + itemGST;

                              setState({
                                ...state,
                                product_json: updatedProducts,
                                subtotal: state.subtotal - itemAmount,
                                gst_percentage: state.gst_percentage - itemGST,
                                total: state.total - totalDeduct,
                                due_amount: state.due_amount - totalDeduct,
                              });
                            }}
                          >
                            <CiTrash color="red" fontSize={20} />
                          </button>

                        </td>
                      </tr>
                    );
                  })

                }
              </tbody>

            </table>
          </div>
          <div className={state.id ? "d-none" : "d-flex gap-2 justify-content-between align-items-start"}>
            <div>
              <button
                className="btn btn-primary "
                onClick={(e) => handleAddNewProduct(e)}
                type="button"

              >
                Add New Product
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
                <li className="list-unstyled text-center" style={{
                  display: "inline-block",
                  width: 100,
                  height: 50,
                  border: "1px solid #ccc",
                }}>{state.subtotal || ""}</li>
              </ul>
              <ul className="d-flex justify-content-between">
                <li className="list-unstyled ">Total GST</li>
                <li className="list-unstyled text-center" style={{
                  display: "inline-block",
                  width: 100,
                  height: 50,
                  border: "1px solid #ccc",
                }}>{state.gst_percentage || ""}</li>
              </ul>
              <ul className="d-flex justify-content-between">
                <li className="list-unstyled ">Total</li>
                <li className="list-unstyled text-center" style={{
                  display: "inline-block",
                  width: 100,
                  height: 50,
                  border: "1px solid #ccc",
                }}>{state.total || ""}</li>
              </ul>
              <ul className="d-flex justify-content-between">
                <li className="list-unstyled ">Balance Due</li>
                <li className="list-unstyled text-center" style={{
                  display: "inline-block",
                  width: 100,
                  height: 50,
                  border: "1px solid #ccc",
                }}>{parseInt(state.due_amount) + parseInt(state.total) || ""}</li>
              </ul>
            </div>
          </div>
          <div className={`d-flex justify-content-${state.id ? "center" : "space-between"} text-center mb-5 px-3`}>
            <button
              type="button"
              className="btn btn-primary btn-small w-25 mt-5 rounded-5 text-uppercase p-8"
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();  // Prevent the default form submission
                handleSubmit(e)
                setSaveType("save")
              }}
            >
              {saveType === "save" && loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className={state.id ? "d-none" : "btn btn-primary btn-small w-25 mt-5 rounded-5 text-uppercase p-8"}
              disabled={loading}
              onClick={(e) => {
                handleSubmit(e, 1)
                setSaveType("send")
              }}
            >
              {saveType === "send" && loading ? "Sending..." : "save and send"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default PaymentInvoiceForm;
