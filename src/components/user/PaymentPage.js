import React, { useEffect, useState } from "react";
import PaymentInvoice from "../common/PaymentInvoice";
import { IoCreateOutline } from "react-icons/io5";
import { BsRecordCircle } from "react-icons/bs";
import { FaAmazonPay } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";
import { CiTrash } from "react-icons/ci";
import { AiOutlineFilePdf } from "react-icons/ai";
import PaymentReminder from "./PaymentReminder";
import { getallEmployeeData, getAllEmployer, getAllInvioce } from "../../api/api";
import ConvertTime from "../common/Common function/ConvertTime";

const Payment_Page = (props) => {
  const [openAddPaymentForm, setOpenAddPaymentForm] = useState(false);
  const [openPaymentReminder, setOpenPaymentReminder] = useState(false);

  const [employeeEmployerlist, setEmployeeEmployerlist] = useState([]);
  const [invoiceList, setInvoicelist] = useState([]);
  const [totalData, setTotalData] = useState(""|| 1);

  const GetAllUserData = async () => {
    try {
      let invoiceData = {
        "invoice_no": "",
        "user_id": props.user_id,
        "user_type": props.user_type
      }
      const userData = await getallEmployeeData();
      const CompanyData = await getAllEmployer();
      const InvoiceData = await getAllInvioce(invoiceData);
      let allUserData = [];
      console.log(InvoiceData)
      setInvoicelist(InvoiceData.data.data)
      setTotalData(InvoiceData.data.total_row)
      if (userData?.data?.length === 0 && CompanyData?.data?.length === 0) {
        setEmployeeEmployerlist([]);
      } else {
        allUserData = [...userData.data, ...CompanyData.data,]; // Merge the arrays
        setEmployeeEmployerlist(allUserData);
      }

    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    GetAllUserData()
  }, [])

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
              onClick={() => setOpenAddPaymentForm(true)}
            >
              Add Invoice
            </button>
          </div>
        </div>

        {openAddPaymentForm && (
          <PaymentInvoice
            setOpenAddPaymentForm={setOpenAddPaymentForm}
            openAddPaymentForm={openAddPaymentForm}
            userId={props.user_id}
            userType={props.user_type}
            employee_employer_list={employeeEmployerlist}
            totalData={totalData}
          />
        )}

        <div className="table-responsive main_table_div">
          <table className="table table-striped main_data_table">
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
              {
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
                        <button
                          className="btn btn-outline-info action_btn"
                          onClick={() => { }}
                          title="Generate Invoice"
                          v
                        >
                          <span className="text-gray px-2">
                            <IoCreateOutline />
                          </span>
                        </button>
                        <button
                          className="btn btn-outline-info action_btn"
                          onClick={() => {
                            setOpenPaymentReminder(true);
                          }}
                          title="Record Payment"
                        >
                          <span className="text-gray px-2">
                            <BsRecordCircle />{" "}
                          </span>
                        </button>

                        <button
                          className="btn btn-outline-info action_btn"
                          onClick={() => {
                            setOpenPaymentReminder(true);
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
                        >
                          <span className=" px-2">Update</span>
                        </button>
                        <button
                          className="btn btn-outline-info action_btn"
                          title="View Invoice"
                        >
                          <span className="text-gray px-2"><AiOutlineFilePdf /></span>
                        </button>

                        <button
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
                        </button>
                        <button
                          className="btn btn-outline-info action_btn"
                          onClick={() => {
                            setOpenAddPaymentForm(true);
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
          </table>
          {/* )} */}
        </div>

        {openPaymentReminder && (
          <PaymentReminder
            openPaymentReminder={openPaymentReminder}
            setOpenPaymentReminder={setOpenPaymentReminder}
            userId={props.user_id}
            userType={props.user_type}
            employee_employer_list={employeeEmployerlist}
          />
        )}
        {/* <div className="pt-2">
                  <Pagination
                    //   nPages={nPages}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      total={totalData}
                      count={interviewHistoryData.length}
                  />
              </div> */}
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
          ) : null}
          <SAlert
            show={deleteAlert}
            title={deleteName}
            text="Are you Sure you want to delete !"
            onConfirm={() => deleteAdmin(deleteId)}
            showCancelButton={true}
            onCancel={CancelDelete}
          /> */}
      </div>
    </div>
  );
};

export default Payment_Page;
