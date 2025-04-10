import React, { useEffect, useState } from "react"; import { FaAmazonPay, FaEye } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import { AiOutlineFilePdf } from "react-icons/ai";
import PaymentReminder from "../../forms/payment invoice/PaymentReminder";
import { getallEmployeeData, getAllEmployer, getAllInvioce, DeletePaymentInvoiceApi, GetLastPaymentInvoiceApi, GetSharePointData, getSharePointParticularFolders, GetFilter } from "../../../api/api";
import ConvertTime from "../Common function/ConvertTime";
import SAlert from "../sweetAlert";
import Pagination from "../pagination"
import { toast } from "react-toastify";
import Loader from "../loader";
import PaymentInvoiceForm from "../../forms/payment invoice/PaymentInvoiceForm";
import { FiAlertCircle } from "react-icons/fi";
import ViewPdf from "../Retaineragreement/viewPdf";
import { Link } from "react-router-dom";
const Payment_Page = (props) => {
  const [openAddPaymentForm, setOpenAddPaymentForm] = useState(false);
  const [openPaymentReminder, setOpenPaymentReminder] = useState(false);
  const [apiCall, setApiCall] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [employeeEmployerlist, setEmployeeEmployerlist] = useState([]);
  const [invoiceList, setInvoicelist] = useState([]);
  const [singleInvoiceData, setSingleInvoiceData] = useState();
  const [lastInvoiceNo, setLastInvoiceNo] = useState();
  const [docLoader, setDocLoder] = useState(false);
  const [invoicePdf, setInvoicePdf] = useState("");
  const [openViewInvoice, setOpenViewInvoice] = useState("");
  const [invoiceData, setInvoiceData] = useState("");
  let [json, setJson] = useState()
  /*Pagination */
  const [currentPage, setCurrentPage] = useState(1);
  const [columnName, setColumnName] = useState("updated_at");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [recordsPerPage] = useState(10);
  const [totalData, setTotalData] = useState("" || 1);
  /*delete state */
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteData, setDeleteData] = useState("");
  const GetAllUserData = async () => {
    try {
      let res = await GetFilter()
      setJson(res.data.data)
    } catch (err) {
      console.log(err);
    }
    try {
      setIsLoading(true)
      let invoiceData = {
        "invoice_no": "",
        "user_id": props.user_id,
        "user_type": props.user_type,
        "page": currentPage,
        "limit": recordsPerPage,
        "sort_order": sortOrder,
        "column_name": columnName
      }
      const userData = await getallEmployeeData();
      const CompanyData = await getAllEmployer();
      const InvoiceData = await getAllInvioce(invoiceData);
      const lastInvoice = await GetLastPaymentInvoiceApi()
      let allUserData = [];
      setInvoicelist(InvoiceData.data.data)
      if (userData?.data?.length === 0 && CompanyData?.data?.length === 0) {
        setEmployeeEmployerlist([]);
        setIsLoading(false)
      } else {
        allUserData = [...userData.data, ...CompanyData.data,]; // Merge the arrays
        setEmployeeEmployerlist(allUserData);
        setIsLoading(false)
      }
      setTotalData(InvoiceData.data.total_data)
      setLastInvoiceNo(lastInvoice.data.data.invoice_no)

    } catch (err) {
      console.log(err);
      setIsLoading(false)
    }
  };
  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);
  useEffect(() => {
    GetAllUserData()
    if (apiCall === true) {
      setApiCall(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiCall, currentPage, columnName, sortOrder])

  const CancelDelete = () => {
    setDeleteAlert(false);
    setDeleteData("");
  }
  /*Function to delete the invoice */
  const DeleteInvoice = async (id) => {
    try {
      let res = await DeletePaymentInvoiceApi(id)
      if (res.data.message === "PaymentInvoice has been deleted !") {
        toast.success("Payment inVoice Deleted successful", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
      setDeleteAlert(false)
      setDeleteData(false)
      setApiCall(true)
    } catch (err) {
      console.log(err)
    }
  }
  const GetInvoicePdf = async (data) => {
    setDocLoder(true);
    try {
      let res = await getSharePointParticularFolders(
        props.user_id,
        props.user_type,
        props.folderId
      );
      if (res.data.data === "Lifetime validation failed, the token is expired.") {
        try {
          let response = await GetSharePointData()
          if (response.status === 1 || "1") {
            GetInvoicePdf(data);
          }
        } catch (err) {
          console.log(err);
        }
      }
      if (res.data.status === 1) {
        setDocLoder(false);
        if (res.data.data.find((item) => item.id === data.document_id)) {
          setInvoicePdf(res.data.data.find((item) => item.id === data.document_id));
          // console.log(res.data.data.find((item) => item.id === agreementData.document_id))
        } else if (res.data.data === "No Documents Found") {
          setDocLoder(false);
        } else {
          setDocLoder(false);
        }
      }
    } catch (Err) {
      console.log(Err);
      setDocLoder(false);
    }
  };
  /*Sorting Function */
  const handleSort = (columnName) => {
    setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
    setColumnName(columnName);
  };
  return (
    <div className="response_main_div w-100">
      <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-8 px-2 ">
        <div
          className={` d-flex
              justify-content-between`}
        >
          <div className="p-3">
            <h3 className="">Payment's</h3>
          </div>
          <div className="p-3">
            <button
              className="btn btn-primary"
              onClick={() => {
                setOpenAddPaymentForm(true)
                GetAllUserData()
                setSingleInvoiceData()
              }}
              disabled={lastInvoiceNo ? false : true}
            >
              Add Invoice
            </button>
          </div>
        </div>

        {openAddPaymentForm && (
          <PaymentInvoiceForm
            close={() => setOpenAddPaymentForm(false)}
            show={openAddPaymentForm}
            userId={props.user_id}
            userType={props.user_type}
            userEmail={props.user_email}
            employee_employer_list={employeeEmployerlist}
            totalData={totalData}
            setApiCall={setApiCall}
            singleInvoiceData={singleInvoiceData}
            lastInvoiceNo={lastInvoiceNo}
          />
        )}

        <div className="table-responsive main_table_div">
          {isLoading ? (
            <Loader />
          ) : <table className="table table-striped main_data_table">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="border-0 font-size-4 font-weight-normal"
                >
                  <Link to="" className="text-dark" onClick={() => { handleSort("invoice_no") }}>
                    Invoice No.
                  </Link>
                </th>
                <th
                  scope="col"
                  className="border-0 font-size-4 font-weight-normal"
                >
                  <Link to="" className="text-dark" onClick={() => { handleSort("terms") }}>
                    Terms
                  </Link>
                </th>
                <th
                  scope="col"
                  className="border-0 font-size-4 font-weight-normal"
                >
                  <Link to="" className="text-dark" onClick={() => { handleSort("created_at") }}>
                    Created On
                  </Link>
                </th>
                <th
                  scope="col"
                  className="border-0 font-size-4 font-weight-normal"
                >
                  <Link to="" className="text-dark" onClick={() => { handleSort("status") }}>
                    status</Link>
                </th>
                <th
                  scope="col"
                  className="border-0 font-size-4 font-weight-normal"
                >
                  <Link to="" className="text-dark" onClick={() => { handleSort("due_date") }}>
                    Due date
                  </Link>
                </th>
                <th
                  scope="col"
                  className="border-0 font-size-4 font-weight-normal"
                >
                  <Link to="" className="text-dark" onClick={() => { handleSort("due_amount") }}>
                    Due amount</Link>
                </th>
                {/* <th
                  scope="col"
                  className="border-0 font-size-4 font-weight-normal"
                >
                  status 
                </th>*/}
                <th
                  scope="col"
                  className="border-0 font-size-4 font-weight-normal"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {totalData === 0 || invoiceList.length === 0 ? (
                <tr>
                  <th colSpan={6} className="bg-white text-center">
                    No Data Found
                  </th>
                </tr>
              ) :
                (invoiceList || []).map((item, index) =>
                  <tr key={index}>
                    <td>{item.invoice_no}</td>
                    <td className=" py-5">
                      <p className="font-size-2 font-weight-normal text-black-2 mb-0">
                        <span className="p-1">
                          {json?.payment_invoice_terms.find((res) => res.id === parseInt(item.terms))?.value || "N/A"}
                        </span>
                      </p>
                    </td>
                    <td className=" py-5">
                      <p className="font-size-2 font-weight-normal text-black-2 mb-0">
                        <span className="p-1">
                          <ConvertTime _date={item.created_at} format={"DD MMMM, YYYY"} />
                        </span>
                      </p>
                    </td>
                    <td>
                      <p className="font-size-2 font-weight-normal mb-0">
                        {item.status
                          ? parseInt(item.status) === 1
                            ? <span className="p-1 bg-primary-opacity-8 text-white  border rounded-pill">Payment received</span>
                            : parseInt(item.status) === 2
                              ? <span className="p-1 bg-warning text-white  border rounded-pill">Pending</span>
                              : <span className="p-1 bg-danger text-white  border rounded-pill"> <FiAlertCircle /> Overdue on <ConvertTime _date={item.due_date} format={"DD/MM/YYYY"} /></span>
                          : "N/A"}
                      </p>
                    </td>
                    <td>
                      <p className="font-size-2 font-weight-normal text-black-2 mb-0">
                        <span className="p-1"><ConvertTime _date={item.due_date} format={"DD MMMM, YYYY"} /></span>
                      </p>
                    </td>
                    <td className=" py-5">
                      <p className="font-size-2 font-weight-normal text-black-2 mb-0">
                        <span className="p-1 b">
                          {item.due_amount || "N/A"}
                        </span>
                      </p>

                    </td>
                    {/* <td className=" py-5">
                      <p className="font-size-2 font-weight-normal text-black-2 mb-0">
                        <span className="p-1 bg-primary-opacity-8 text-white  border rounded-pill">
                          completed
                        </span>
                      </p>
                    </td> */}
                    <td className=" py-5">
                      <div className="btn-group button_group" role="group">
                        {/* <button
                          className="btn btn-outline-info action_btn"
                          onClick={() => { }}
                          title="Generate Invoice"
                          v
                        >
                          <span className="text-gray px-2">
                            <IoCreateOutline />
                          </span>
                        </button> */}
                        {/* <button
                          className="btn btn-outline-info action_btn"
                          onClick={() => {
                            setOpenPaymentReminder(true);
                          }}
                          title="Record Payment"
                        >
                          <span className="text-gray px-2">
                            <BsRecordCircle />{" "}
                          </span>
                        </button> */}

                        <button
                          className="btn btn-outline-info action_btn"
                          onClick={() => {
                            setOpenPaymentReminder(true);
                            setSingleInvoiceData(item)
                          }}
                          title="Payment Reminder"
                        >
                          <span className="text-gray px-2">
                            <FaAmazonPay />
                          </span>
                        </button>
                        <button
                          className="btn btn-outline-info action_btn"
                          title="Update"
                          onClick={() => {
                            setOpenAddPaymentForm(true)
                            GetAllUserData()
                            setSingleInvoiceData(item)
                          }}
                        >
                          <span className=" px-2">Update</span>
                        </button>
                        <button
                          className="btn btn-outline-info action_btn d-none"
                          title="View Invoice"
                        >
                          <span className="text-gray px-2"><AiOutlineFilePdf /></span>
                        </button>
                        <button
                          className="btn btn-outline-info action_btn "
                          disabled={!item.document_id}
                          onClick={() => {
                            setOpenViewInvoice(true);
                            setInvoiceData(item);
                            GetInvoicePdf(item);
                          }}
                          title="View Retainer Invoice"
                        >
                          <span className="text-gray px-2">
                            <FaEye />
                          </span>
                        </button>
                        {/* <button
                          className="btn btn-outline-info action_btn"
                          onClick={() => {
                            setOpenAddPaymentForm(true);
                          }}
                          title="Payment Method"
                        >
                          <span className="text-gray px-2">
                            {" "}
                            <RiSecurePaymentLine />
                          </span>
                        </button> */}
                        <button
                          className="btn btn-outline-info action_btn"
                          onClick={() => {
                            setDeleteAlert(true);
                            setDeleteData(item)
                          }}
                          title="Delete"
                        >
                          <span>
                            <span className="text-red px-2">
                              <CiTrash />
                            </span>
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>

                )
              }
            </tbody>
          </table>}
          <div className="pt-2">
            <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              total={totalData}
              count={invoiceList.length}
            />
          </div>
        </div>

        {openPaymentReminder && (
          <PaymentReminder
            show={openPaymentReminder}
            close={() => setOpenPaymentReminder(false)}
            userId={props.user_id}
            userType={props.user_type}
            userEmail={props.user_email}
            invoiceData={singleInvoiceData}
            employee_employer_list={employeeEmployerlist}
            folderId={props.folderId}
          />
        )}

        {/* {openSendMail ? (
            <SendEmailAgreement
              show={openSendMail}
              close={() => setOpenSendMail(false)}
              user_id={user_id}
              emp_user_type={emp_user_type}
              folderId={folderId}
              felidData={agreementData}
              pdf={pdf}
            />
          ) : null}
          {openAddAgreementFelids ? (
            <AgreementOneForm
              show={openAddAgreementFelids}
              close={() => {
                setOpenAddAgreementFelids(false);
                setOpenViewAgreementSign("");
              }}
              userData={userData}
              setApicall={setApicall}
              felidData={agreementData}
              emp_user_type={emp_user_type}
              user_id={user_id}
              openSignature={openViewAgreementSign === "sign" ? "yes" : "no"}
              folderId={folderId}
              index={openViewAgreementSign === "sign" ? "rcic_signature" : null}
            />
          ) : null}
          {openAddClientFeilds ? (
            <AddClientForm
              show={openAddClientFeilds}
              close={() => {
                setOpenAddClientFeilds(false);
                setOpenViewAgreementSign("");
              }}
              userData={userData}
              setApicall={setApicall}
              felidData={agreementData}
              emp_user_type={emp_user_type}
              user_id={user_id}
              openSignature={openViewAgreementSign === "sign" ? "yes" : "no"}
              folderId={folderId}
            />
          ) : null}
          {openAddAgreementForm ? (
            <RetainerAgreement
              show={openAddAgreementForm}
              close={() => setOpenAddAgreementForm(false)}
              emp_user_type={emp_user_type}
              userData={userData}
              setApicall={setApicall}
            />
          ) : null}
          {openSignfPspdfkit ? (
            <Newpdf
            document={pdf["@microsoft.graph.downloadUrl"]}
            show={openSignfPspdfkit}
            close={() => setOpenSignfPspdfkit(false)}
            />
            ) : null} */}
        {openViewInvoice ? (
          <ViewPdf
            show={openViewInvoice}
            close={() => setOpenViewInvoice(false)}
            agreementData={invoiceData}
            emp_user_type={props.user_type}
            userData={props.userData}
            setApicall={setApiCall}
            folderId={props.folderId}
            user_id={props.userId}
            setOpenAddAgreementFelids={""}
            setOpenViewAgreementSign={""}
            docLoader={docLoader}
            pdf={invoicePdf}
            type={"modal"}
            page={"invoice"}
          />
        ) : null}
        <SAlert
          show={deleteAlert}
          title={deleteData?.tags}
          text="Are you Sure you want to delete !"
          onConfirm={() => DeleteInvoice(deleteData.id)}
          showCancelButton={true}
          onCancel={CancelDelete}
        />
      </div>
    </div>
  );
};

export default Payment_Page;
