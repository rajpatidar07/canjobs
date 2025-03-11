import React, { useEffect, useState } from "react"; import { FaAmazonPay } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import { AiOutlineFilePdf } from "react-icons/ai";
import PaymentReminder from "../../forms/payment invoice/PaymentReminder";
import { getallEmployeeData, getAllEmployer, getAllInvioce, DeletePaymentInvoiceApi, GetLastPaymentInvoiceApi } from "../../../api/api";
import ConvertTime from "../Common function/ConvertTime";
import SAlert from "../sweetAlert";
import Pagination from "../pagination"
import { toast } from "react-toastify";
import Loader from "../loader";
import PaymentInvoiceForm from "../../forms/payment invoice/PaymentInvoiceForm";
import { FiAlertCircle } from "react-icons/fi";
const Payment_Page = (props) => {
  const [openAddPaymentForm, setOpenAddPaymentForm] = useState(false);
  const [openPaymentReminder, setOpenPaymentReminder] = useState(false);
  const [apiCall, setApiCall] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [employeeEmployerlist, setEmployeeEmployerlist] = useState([]);
  const [invoiceList, setInvoicelist] = useState([]);
  const [singleInvoiceData, setSingleInvoiceData] = useState();
  const [lastInvoiceNo, setLastInvoiceNo] = useState();
  /*Pagination */
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [totalData, setTotalData] = useState("" || 1);
  /*delete state */
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteData, setDeleteData] = useState("");
  const GetAllUserData = async () => {
    try {
      setIsLoading(true)
      let invoiceData = {
        "invoice_no": "",
        "user_id": props.user_id,
        "user_type": props.user_type,
        "page": currentPage,
        "limit": recordsPerPage
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
  }, [apiCall])

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
                setSingleInvoiceData()
              }}
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
                  Invoice No.
                </th>
                <th
                  scope="col"
                  className="border-0 font-size-4 font-weight-normal"
                >
                  Tag
                </th>
                <th
                  scope="col"
                  className="border-0 font-size-4 font-weight-normal"
                >
                  Created On
                </th>
                <th
                  scope="col"
                  className="border-0 font-size-4 font-weight-normal"
                >
                  status
                </th>
                <th
                  scope="col"
                  className="border-0 font-size-4 font-weight-normal"
                >
                  Due date
                </th>
                <th
                  scope="col"
                  className="border-0 font-size-4 font-weight-normal"
                >
                  Due amount
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
                          {item.tags || "N/A"}
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
                        {parseInt(item.status) === 1 ? <span className="p-1 text-green">Payment recevied</span> : parseInt(item.status) === 2 ? <span className="p-1 text-warning">Pending</span> : <span className="p-1 text-danger"> <FiAlertCircle /> Overdue on <ConvertTime _date={item.due_date} format={"DD/MM/YYYY"} /></span>
                        }
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
            <div className="pt-2">
              <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                total={totalData}
                count={invoiceList.length}
              />
            </div>
          </table>}
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
          {openViewAgreement ? (
            <ViewPdf
              show={openViewAgreement}
              close={() => setOpenViewAgreement(false)}
              agreementData={agreementData}
              emp_user_type={emp_user_type}
              userData={userData}
              setApicall={setApicall}
              folderId={folderId}
              user_id={user_id}
              setOpenAddAgreementFelids={setOpenAddAgreementFelids}
              setOpenViewAgreementSign={setOpenViewAgreementSign}
              docLoader={docLoader}
              pdf={pdf}
              type={"modal"}
            />
          ) : null}
          {openSignfPspdfkit ? (
            <Newpdf
              document={pdf["@microsoft.graph.downloadUrl"]}
              show={openSignfPspdfkit}
              close={() => setOpenSignfPspdfkit(false)}
            />
          ) : null} */}
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
