import React, { useEffect, useState } from "react";
// import { Pagination } from 'react-bootstrap'
import RetainerAgreement from "../../forms/Agreement/RetainerAgreement";
import AgreementOneForm from "../../forms/Agreement/AgreementOneForm";
import {
  GetAgreement,
  getSharePointParticularFolders,
  DeleteAgreement,
  GetSharePointData,
  SendEmail,
} from "../../../api/api";
import { Link } from "react-router-dom";
import { FaFilePdf, FaFileSignature, FaPlus } from "react-icons/fa";
import MainRetainerAggHtml from "./MainRetainerAggHtml";
import ViewPdf from "./viewPdf";
import { IoMdMail } from "react-icons/io";
import SendEmailAgreement from "../../forms/Agreement/SendEmailAgreement";
import { RiDeleteBin5Line } from "react-icons/ri";
import SAlert from "../sweetAlert";
import { toast } from "react-toastify";
import Newpdf from "../Adobe/newpdf";
import { IoDocumentTextSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import AddClientForm from "../../forms/Agreement/AddClientForm";
import Loader from "../loader";
import AddPaymentDetailsForm from "../../forms/Agreement/AddPaymentdetailsForm";
import UploadAgreement from "../../forms/Agreement/UploadAgreement";
import ConvertTime from "../Common function/ConvertTime";
import SetReminderSchedule from "../../forms/payment invoice/SetReminderSchedule";
export default function RetauberAgreementList({
  user_id,
  emp_user_type,
  folderId,
  userData,
}) {
  let [isLoading, setIsLoading] = useState(true);
  const [openSendMail, setOpenSendMail] = useState(false);
  const [openAgreement, setOpenAgreement] = useState(false);
  const [openAddAgreementForm, setOpenAddAgreementForm] = useState(false);
  const [openUploadAgreementForm, setOpenUploadAgreementForm] = useState(false);
  const [openAddAgreementFelids, setOpenAddAgreementFelids] = useState(false);
  const [openAddClientFeilds, setOpenAddClientFeilds] = useState(false);
  const [openAddPaymentDetails, setOpenAddPaymentDetails] = useState(false);
  const [openViewAgreement, setOpenViewAgreement] = useState(false);
  const [openSignfPspdfkit, setOpenSignfPspdfkit] = useState(false);
  const [openViewAgreementSign, setOpenViewAgreementSign] = useState("");
  const [agreementList, setAgreementList] = useState([]);
  const [agreementData, setAgreementData] = useState("");
  const [apicall, setApiCall] = useState(false);
  let [docLoader, setDocLoder] = useState(false);
  let [pdf, setPdf] = useState("");
  const [showReminderScheduleModal, setShowReminderScheduleModal] = useState(false);

  /*delete state */
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteID] = useState();
  const [deleteName, setDeleteName] = useState("");
  // let navigate = useNavigate()
  /*Pagination states */
  // const [totalData, setTotalData] = useState("");
  // const [recordsPerPage] = useState(10);
  // /*Shorting states */
  const [columnName, setColumnName] = useState("id");
  const [sortOrder, setSortOrder] = useState("DESC");
  // const [currentPage, setCurrentPage] = useState(1);

  /*Pagination Calculation */
  // const nPages = Math.ceil(totalData / recordsPerPage);
  /*Function to get the Agreement Data */
  const getAgreeFelidData = async () => {
    try {
      setIsLoading(true)
      let res = await GetAgreement("", user_id, emp_user_type, sortOrder, columnName);
      if (res.data.data) {
        setAgreementList(res.data.data);
        setIsLoading(false)
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
        localStorage.setItem("navigation_url", "")
      } else {
        setAgreementList([]);
        setIsLoading(false)
      }
    } catch (err) {
      console.log(err);
    }
  };

  const GetAgreementPdf = async (data) => {
    setDocLoder(true);
    try {
      let res = await getSharePointParticularFolders(
        user_id,
        emp_user_type,
        folderId
      );
      if (res.data.data === "Lifetime validation failed, the token is expired.") {
        try {
          let response = await GetSharePointData()
          if (response.status === 1 || "1") {
            GetAgreementPdf(data);
          }
        } catch (err) {
          console.log(err);
        }
      }
      if (res.data.status === 1) {
        setDocLoder(false);
        if (res.data.data.find((item) => item.id === data.document_id)) {
          setPdf(res.data.data.find((item) => item.id === data.document_id));
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
  useEffect(() => {
    // Call the function when the component first renders
    getAgreeFelidData();
    let timer;
    timer = apicall ? 0 : setTimeout(() => {
      // Function to be executed after 20 seconds when apicall is true because document update's take time
      getAgreeFelidData();
      // Reset the state to false
    }, 20000);

    if (apicall) {
      setApiCall(false);
    }
    // // Cleanup function to clear the timer if the component unmounts or myState changes
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apicall, sortOrder]);
  /*To Show the delete alert box */
  const ShowDeleteAlert = (e) => {
    setDeleteID(e.id);
    setDeleteName(e.agreement_subject || e.type);
    setDeleteAlert(true);
  };
  /*To cancel the delete alert box */
  const CancelDelete = () => {
    setDeleteAlert(false);
  };
  /*To call Api to delete category */
  async function deleteAdmin(e) {
    try {
      const responseData = await DeleteAgreement(e);
      if (responseData.message === "Agreement deleted successfully.") {
        toast.error("Agreement deleted successfully.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
        setDeleteAlert(false);
      }
    } catch (err) {
      console.log(err);
    }
  }
  const addSignatureCLick = async () => {
    setOpenViewAgreementSign("sign");
    setOpenAddAgreementFelids(true);
  };

  /*Sorting Function */
  const handleSort = (columnName) => {
    setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
    setColumnName(columnName);
  };
  const ReSendMail = async (fileData) => {
    try {
      let data = {
        agreement_id: fileData.id,
        resend: "1"
      }
      const response = await SendEmail(data, [])
      // console.log(response)
      if (response.message === "email sent successfully") {
        toast.success("Email Resend successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
    } catch (err) {
      console.log(err)

    }
  }
  return (
    <div className="response_main_div w-100">
      <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-8 px-2 ">
        <div
          className={`${openAgreement ? "d-none" : "d-flex"
            } justify-content-between`}
        >
          <div className="p-3">
            <h3 className="">Agreement's</h3>
          </div>
          <div className="p-5 d-flex justify-content-space-between">
            <button
              className="btn btn-primary mx-2"
              onClick={() => setOpenAddAgreementForm(true)}
            >
              Add Agreement
            </button>
            <button className="btn btn-primary" onClick={() => {
              setOpenUploadAgreementForm(true)
              setAgreementData("")
            }}>
              Upload Agreement
            </button>
          </div>
        </div>

        <div className="main_agreement_html_div">
          {openAgreement ? (
            <MainRetainerAggHtml
              userData={userData}
              user_id={user_id}
              emp_user_type={emp_user_type}
              folderId={folderId}
              setOpenAgreement={setOpenAgreement}
              agreementData={agreementData}
              setApicall={setApiCall}
            />
          ) : (

            <table className="table table-striped main_data_table">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="border-0 font-size-4 font-weight-normal"
                  >
                    S.No
                  </th>
                  <th
                    scope="col"
                    className="border-0 font-size-4 font-weight-normal"
                  >
                    <Link onClick={() => {
                      handleSort("agreement_subject")
                    }} className="text-dark">
                      Agreement
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className="border-0 font-size-4 font-weight-normal"
                  >
                    <Link to="" className="text-dark" onClick={() => { handleSort("created_by_name") }}>
                      Created By
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className="border-0 font-size-4 font-weight-normal"
                  >
                    <Link to="" className="text-dark" onClick={() => { handleSort("updated_by_name") }}>
                      Last Updated By
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className="border-0 font-size-4 font-weight-normal"
                  >
                    <Link onClick={() => {
                      handleSort("send_date")
                    }} className="text-dark">
                      Sent Date
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className="border-0 font-size-4 font-weight-normal"
                  >
                    <Link onClick={() => {
                      handleSort("received_date")
                    }} className="text-dark">
                      Receive Date
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className="border-0 font-size-4 font-weight-normal"
                  >
                    <Link onClick={() => {
                      handleSort("pdf_genrated_status")
                    }} className="text-dark">
                      Pdf generated status
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className="border-0 font-size-4 font-weight-normal"
                  >
                    <Link onClick={() => {
                      handleSort("signature_status")
                    }} className="text-dark">
                      Signature status
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className="border-0 font-size-4 font-weight-normal"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <Loader />
                ) : agreementList.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="bg-white text-center">
                      No data found
                    </td>
                  </tr>
                ) : (
                  agreementList.map((data, index) => (
                    <tr key={index}>
                      {/* <td>{interview.id}</td> */}
                      <td>
                        {
                          <p className="timeline_date d-flex flex-column">
                            {index + 1}
                          </p>
                        }
                      </td>
                      <td className="text-capitalize ">{data?.agreement_subject ? data.agreement_subject : data.type || "N/A"}</td>

                      <td className=" py-5">
                        <p className="font-size-2 font-weight-normal text-black-2 mb-0">
                          <span className="p-1">
                            {data.created_by_name || "N/A"}
                          </span>
                        </p>
                      </td>
                      <td className=" py-5">
                        <p className="font-size-2 font-weight-normal text-black-2 mb-0">
                          <span className="p-1">
                            {data.updated_by_name || "N/A"}
                          </span>
                        </p>
                      </td>
                      <td className="text-capitalize "
                        title={
                          ConvertTime({ _date: data.send_date, format: "D-MM-YYYY" })
                        }>
                        {data.send_date ?
                          <ConvertTime _date={data.send_date} format={"D-MM-YYYY"} />
                          : "N/A"}
                      </td>
                      <td className="text-capitalize " title={
                        ConvertTime({ _date: data.received_date, format: "D-MM-YYYY" })
                      }>
                        {data.received_date ?
                          <ConvertTime _date={data.received_date} format={"D-MM-YYYY"} />
                          : "N/A"}
                      </td>
                      <td className="text-center py-5">
                        <p className="font-size-2 font-weight-normal text-black-2 mb-0">
                          {data.pdf_genrated_status === "1" ? (
                            <span className="p-1 bg-primary-opacity-8 text-white text-center  border rounded-pill">
                              Complete
                            </span>
                          ) : (
                            <span className="p-1 bg-warning text-white text-center  border rounded-pill">
                              Incomplete
                            </span>
                          )}
                        </p>
                      </td>
                      <td className="text-center py-5">
                        <p className="font-size-2 font-weight-normal text-black-2 mb-0">
                          {data.signature_status === "2" ? (
                            <span className="p-1 bg-primary-opacity-8 text-white text-center  border rounded-pill">
                              Complete
                            </span>
                          ) : (
                            <span className="p-1 bg-warning text-white text-center  border rounded-pill">
                              Incomplete
                            </span>
                          )}
                        </p>
                      </td>
                      <td>
                        <div className="btn-group button_group" role="group">
                          <button
                            className={data.added_type === "uploaded_agreement" ? "d-none" : "btn btn-outline-info action_btn "}
                            onClick={() => {
                              setOpenAgreement(true);
                              setAgreementData(data);
                              setOpenViewAgreementSign("");
                              // navigate("/agreepreivew", {
                              //     state: {
                              //         user_id: user_id,
                              //         emp_user_type: emp_user_type,
                              //         folderId: folderId,
                              //         userData:userData
                              //     }
                              // });
                            }}
                            // disabled={data.initial}
                            title=" View and update doc"
                          >
                            <span className="text-gray px-2">
                              <IoDocumentTextSharp />
                            </span>
                          </button>
                          <button
                            className={"btn btn-outline-info action_btn "}
                            onClick={() => {
                              if (data.added_type === "uploaded_agreement") {
                                setOpenUploadAgreementForm(true)
                              } else {
                                setOpenAddAgreementFelids(true);
                              }
                              setAgreementData(data);

                            }}
                            title="Add fields"
                          // disabled={data.initial}
                          >
                            <span className="text-gray px-2">
                              <FaEdit />
                            </span>
                          </button>
                          <button
                            className={data.added_type === "uploaded_agreement" ? "d-none" : `btn btn-outline-info action_btn ${data.type === "recruitment services agreement" || data.type === "initial consultation" || data.type === "employer renewal stream" || data.type === "employers" || data.type === "three column" || data.type === "express entry" || data.type === "Alberta PNP and federal PR" || data.type === "work permit" || data.type === "work permit application-2 stage" ? "d-none" : ""}`}
                            onClick={() => {
                              if (data.type === "dynamic RA") {
                                setOpenAddPaymentDetails(true)
                              } else {
                                setOpenAddClientFeilds(true);
                              }
                              setAgreementData(data);
                            }}
                            title={data.type === "dynamic RA" ? "Add Payment Details" : "Add Family"}
                          >
                            <span className="text-gray px-2">
                              <FaPlus />
                            </span>
                          </button>
                          <button
                            className={"btn btn-outline-info action_btn "}
                            disabled={!data.document_id}
                            onClick={() => {
                              setOpenViewAgreement(true);
                              setAgreementData(data);
                              GetAgreementPdf(data);
                            }}
                            title="View Retainer Agreement"
                          >
                            <span className="text-gray px-2">
                              <FaFilePdf />
                            </span>
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-info action_btn"
                            onClick={() => {
                              setShowReminderScheduleModal(true);
                              setAgreementData(data)
                            }}
                            title="Set Reminder Schedule"
                            disabled={
                              (!data.client_email && !data.document_id) ||
                              (data.initial
                                ? data.rcic_signature
                                  ? true
                                  : false
                                : false)
                            }>
                            Set Reminder Schedule
                          </button>
                          <button
                            className={data.added_type === "uploaded_agreement" ? "d-none" : "btn btn-outline-info action_btn "}
                            onClick={() => {
                              setOpenSendMail(true);
                              setAgreementData(data);
                              GetAgreementPdf(data);
                            }}
                            disabled={
                              (!data.client_email && !data.document_id) ||
                              (data.initial
                                ? data.rcic_signature
                                  ? true
                                  : false
                                : false)
                            }
                            title="Send Retainer Agreement"
                          >
                            <span className="text-gray px-2">
                              <IoMdMail />
                            </span>
                          </button>
                          <button
                            className={data.added_type === "uploaded_agreement" ? "d-none" : "btn btn-outline-info action_btn "}
                            onClick={() => {
                              ReSendMail(data);
                            }}
                            disabled={
                              (data.agreement_sent
                                ? false
                                : true
                              )
                            }
                            title="Send Retainer Agreement"
                          >
                            <span className="text-gray px-2">
                              ReSend
                            </span>
                          </button>
                          <button
                            className={data.added_type === "uploaded_agreement" ? "d-none" : "btn btn-outline-info action_btn d-none"}
                            onClick={() => {
                              setOpenSignfPspdfkit(true);
                              setAgreementData(data);
                              GetAgreementPdf(data);
                            }}
                            disabled={!data.document_id}
                            title="Sign document with pspdfkit"
                          >
                            Sign document with pspdfkit
                          </button>
                          <button
                            className={data.added_type === "uploaded_agreement" ? "d-none" : "btn btn-outline-info action_btn "}
                            onClick={() => {
                              addSignatureCLick();
                              setAgreementData(data);
                              GetAgreementPdf(data);
                            }}
                            disabled={
                              data?.signature_status === "2"
                                ? false
                                : data?.rcic_signature
                                  ? true
                                  : true
                            }
                            title="RCIC Sign"
                          >
                            <span className="text-gray px-2">
                              <FaFileSignature />
                            </span>
                          </button>
                          <button
                            className="btn btn-outline-info action_btn"
                            onClick={() => ShowDeleteAlert(data)}
                            title="Delete"
                          >
                            <span className="px-2 text-danger">
                              <RiDeleteBin5Line />
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
        {/* <div className="pt-2">
                <Pagination
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    total={totalData}
                    count={interviewHistoryData.length}
                />
            </div> */}
        {openSendMail ? (
          <SendEmailAgreement
            show={openSendMail}
            close={() => setOpenSendMail(false)}
            user_id={user_id}
            emp_user_type={emp_user_type}
            folderId={folderId}
            felidData={agreementData}
            pdf={pdf}
            setApicall={setApiCall}
            userData={userData}
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
            setApicall={setApiCall}
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
            setApicall={setApiCall}
            felidData={agreementData}
            emp_user_type={emp_user_type}
            user_id={user_id}
            openSignature={openViewAgreementSign === "sign" ? "yes" : "no"}
            folderId={folderId}
          />
        ) : null}
        {openAddPaymentDetails ?
          (<AddPaymentDetailsForm
            show={openAddPaymentDetails}
            close={() => {
              setOpenAddPaymentDetails(false);
              setOpenViewAgreementSign("");
            }}
            userData={userData}
            setApicall={setApiCall}
            felidData={agreementData}
            emp_user_type={emp_user_type}
            user_id={user_id}
            openSignature={openViewAgreementSign === "sign" ? "yes" : "no"}
            folderId={folderId}
          />
          )
          : null}
        {openAddAgreementForm ? (
          <RetainerAgreement
            show={openAddAgreementForm}
            close={() => setOpenAddAgreementForm(false)}
            emp_user_type={emp_user_type}
            userData={userData}
            setApicall={setApiCall}
          />
        ) : null}
        {openUploadAgreementForm ? (
          <UploadAgreement
            show={openUploadAgreementForm}
            close={() => setOpenUploadAgreementForm(false)}
            emp_user_type={emp_user_type}
            userData={userData}
            setApicall={setApiCall}
            folderId={folderId}
            felidData={agreementData}
            setAgreementData={setAgreementData}
          />
        ) : null}
        {openViewAgreement ? (
          <ViewPdf
            show={openViewAgreement}
            close={() => setOpenViewAgreement(false)}
            agreementData={agreementData}
            emp_user_type={emp_user_type}
            userData={userData}
            setApicall={setApiCall}
            folderId={folderId}
            user_id={user_id}
            setOpenAddAgreementFelids={setOpenAddAgreementFelids}
            setOpenViewAgreementSign={setOpenViewAgreementSign}
            docLoader={docLoader}
            pdf={pdf}
            type={"modal"}
            page={"agreement"}
          />
        ) : null}
        {showReminderScheduleModal &&
          <SetReminderSchedule
            show={showReminderScheduleModal}
            close={() => setShowReminderScheduleModal(false)}
            Data={agreementData}
            type={"signed_agreement"}
          />
        }
        {openSignfPspdfkit ? (
          <Newpdf
            document={pdf["@microsoft.graph.downloadUrl"]}
            show={openSignfPspdfkit}
            close={() => setOpenSignfPspdfkit(false)}
          />
        ) : null}
        {deleteAlert && <SAlert
          show={deleteAlert}
          title={deleteName}
          text="Are you Sure you want to delete !"
          onConfirm={() => deleteAdmin(deleteId)}
          showCancelButton={true}
          onCancel={CancelDelete}
        />}
      </div>
    </div>
  );
}
