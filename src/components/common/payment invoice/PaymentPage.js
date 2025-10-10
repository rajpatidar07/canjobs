import React, { useEffect, useState } from "react";
import PaymentReminder from "../../forms/payment invoice/PaymentReminder";
import { getallEmployeeData, getAllEmployer, getAllInvioce, DeletePaymentInvoiceApi, GetLastPaymentInvoiceApi, GetSharePointData, getSharePointParticularFolders, GetFilter } from "../../../api/api";
import SAlert from "../sweetAlert";
import Pagination from "../pagination"
import { toast } from "react-toastify";
import Loader from "../loader";
import PaymentInvoiceForm from "../../forms/payment invoice/PaymentInvoiceForm";
import ViewPdf from "../Retaineragreement/viewPdf";
import ReceiveAmountModal from "../../forms/admin/ReceiveAmountModal";
import UploadPaymentInvoice from '../../forms/payment invoice/UploadPaymentInvoice';
import PaymentInvoiceTable from "./PaymentInvoiceTable";
import DatePicker from "react-datepicker";
import GetThirtyDaysAgo from "../Common function/GetThirtyDaysAgo";
const PaymentPage = (props) => {
  const [openAddPaymentForm, setOpenAddPaymentForm] = useState(false);
  const [openUploadPaymentForm, setOpenUploadPaymentForm] = useState(false);
  const [openRecPaymentForm, setOpenRecPaymentForm] = useState(false);
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
  const [startDateFilterValue, setStartDateFilterValue] = useState(GetThirtyDaysAgo());
  const [endDateFilterValue, setEndDateFilterValue] = useState(new Date());
  const [filterByInvoiceNumber, setFilterByInvoiceNumber] = useState("")
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

  /*Function to get user data */
  const GetAllUserData = async () => {
    try {
      let res = await GetFilter()
      setJson(res.data.data)
    } catch (err) {
      console.log(err);
    }
    try {
      const userData = await getallEmployeeData();
      const CompanyData = await getAllEmployer();
      const lastInvoice = await GetLastPaymentInvoiceApi()
      let allUserData = [];
      if (userData?.data?.length === 0 && CompanyData?.data?.length === 0) {
        setEmployeeEmployerlist([]);
        setIsLoading(false)
      } else {
        allUserData = [...userData.data, ...CompanyData.data,]; // Merge the arrays
        setEmployeeEmployerlist(allUserData);
        setIsLoading(false)
      }
      setLastInvoiceNo(lastInvoice.data.data.invoice_no)

    } catch (err) {
      console.log(err);
      setIsLoading(false)
    }
  };

  const GetInvoiceList = async () => {
    try {
      setIsLoading(true)
      let sentInvoiceData = {
        "invoice_no": filterByInvoiceNumber,
        "user_id": props.user_id,
        "user_type": props.user_type,
        "page": currentPage,
        "limit": recordsPerPage,
        "sort_order": sortOrder,
        "column_name": columnName,
        "start_date": startDateFilterValue,
        "end_date": endDateFilterValue
      }
      const ResInvoiceData = await getAllInvioce(sentInvoiceData);
      if (ResInvoiceData) {
        setInvoicelist(ResInvoiceData.data.data)
        setTotalData(ResInvoiceData.data.total_data)
        setIsLoading(false)
      }
    } catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  }

  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);
  useEffect(() => {
    GetAllUserData()
    GetInvoiceList()
    if (apiCall === true) {
      setApiCall(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiCall,])

  useEffect(() => {
    GetInvoiceList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, columnName, sortOrder, startDateFilterValue, endDateFilterValue, filterByInvoiceNumber])

  /*Function to cancel the delete pop up */
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

  /*Function to get invoice pdf */
  const GetInvoicePdf = async (data) => {
    setDocLoder(true);
    try {
      let res = await getSharePointParticularFolders(
        props.user_id || data.user_id,
        props.user_type || data.user_type,
        props.folderId || data.doc_folder_id,
        "", "", 10, 1, data.document_id
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

  /*on change function of date piker of consultation */
  const handleChange = (range) => {
    const [startDate, endDate] = range;
    setStartDateFilterValue(startDate);
    setEndDateFilterValue(endDate);
  };


  return (
    <div className="response_main_div w-100">
      <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-8 px-2 ">
        <div className={` d-flex justify-content-between mb-3`}>
          <div className=" d-flex justify-content-space-between">
            <div className="col form_group  ">
              <p className="input_label">
                Filter by Created Date  :
              </p>
              <DatePicker
                selected={startDateFilterValue}
                onChange={handleChange}
                startDate={startDateFilterValue}
                endDate={endDateFilterValue}
                selectsRange
                className="form-control input-height"
              />
            </div>
            <div
              className={"col form_group p-0"}
            >
              <p className="input_label">Search by Invoice number:</p>
              <div className="select_div">
                <input
                  type="text"
                  className="form-control input-height"
                  placeholder={"Search by Invoice no."}
                  value={filterByInvoiceNumber}
                  id="invoice_number"
                  name="invoice_number"
                  onChange={(e) => {
                    setFilterByInvoiceNumber(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col form_group ">
              <button
                className="btn btn-primary mx-2 mt-5"
                onClick={() => {
                  setStartDateFilterValue("");
                  setEndDateFilterValue("");
                  setFilterByInvoiceNumber("");
                }}
              >
                Reset
              </button>
            </div>
          </div>
          <div className={" d-flex justify-content-space-between "}>
            <button
              className="btn btn-primary mx-2 mt-5"
              onClick={() => {
                setOpenAddPaymentForm(true)
                GetAllUserData()
                setSingleInvoiceData()
              }}
              disabled={lastInvoiceNo ? false : true}
            >
              Add Invoice
            </button>
            <button
              className="btn btn-primary mt-5"
              onClick={() => {
                setOpenUploadPaymentForm(true)
                GetAllUserData()
                setSingleInvoiceData()
              }}
              disabled={lastInvoiceNo ? false : true}
            >
              Upload Invoice
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
            userSecondaryEmail={props.user_secondary_email}
            employee_employer_list={employeeEmployerlist}
            totalData={totalData}
            setApiCall={setApiCall}
            singleInvoiceData={singleInvoiceData}
            lastInvoiceNo={lastInvoiceNo}
          />
        )}
        {openUploadPaymentForm &&
          <UploadPaymentInvoice
            close={() => {
              setOpenUploadPaymentForm(false)
              GetAllUserData()
            }}
            show={openUploadPaymentForm}
            userId={props.user_id}
            userType={props.user_type}
            userEmail={props.user_email}
            lastInvoiceNo={lastInvoiceNo}
            setApiCall={setApiCall}
            singleInvoiceData={singleInvoiceData}
            employee_employer_list={employeeEmployerlist}

          />
        }
        {openRecPaymentForm ? (
          <ReceiveAmountModal
            close={() => setOpenRecPaymentForm(false)}
            show={openRecPaymentForm}
            employee_employer_list={employeeEmployerlist}
            setApiCall={setApiCall}
            singleInvoiceData={singleInvoiceData} />
        ) : null}
        <div className="table-responsive main_table_div">
          {isLoading ? (
            <Loader />
          ) :
            <PaymentInvoiceTable
              handleSort={handleSort}
              setDeleteAlert={setDeleteAlert}
              setDeleteData={setDeleteData}
              setOpenViewInvoice={setOpenViewInvoice}
              setInvoiceData={setInvoiceData}
              GetInvoicePdf={GetInvoicePdf}
              setOpenRecPaymentForm={setOpenRecPaymentForm}
              setOpenPaymentReminder={setOpenPaymentReminder}
              setOpenUploadPaymentForm={setOpenUploadPaymentForm}
              setOpenAddPaymentForm={setOpenAddPaymentForm}
              setSingleInvoiceData={setSingleInvoiceData}
              json={json}
              invoiceList={invoiceList}
              totalData={totalData}
              employeeEmployerlist={employeeEmployerlist}
              invoiceId={props.invoiceId}
              userSecondaryEmail={props.user_secondary_email}

            />
          }
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
            userSecondaryEmail={props.user_secondary_email}
            userName={props.user_name}
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
    </div >
  );
};

export default PaymentPage;
