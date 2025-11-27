import React, { useEffect, useState } from 'react'
import { AiOutlineFilePdf } from 'react-icons/ai'
import { CiEdit, CiTrash } from 'react-icons/ci'
import { FaAmazonPay, FaDownload, FaEye } from 'react-icons/fa'
import { HiOutlineInboxIn } from 'react-icons/hi'
import CommonRetainerAgreementDate from '../Retaineragreement/CommonRetainerAgreementDate'
import ConvertTime from '../Common function/ConvertTime'
import { FiAlertCircle } from 'react-icons/fi'
import { GetFilter, getSharePointParticularFolders } from '../../../api/api'
import { Link } from 'react-router-dom'

export default function PaymentInvoiceTable(props) {
    let [json, setJson] = useState()

    const GetAllUserData = async () => {
        try {
            let res = await GetFilter()

            setJson(res.data.data)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        GetAllUserData()
    }, [])

    const handleDownloadInvoice = async (data) => {
        let res = await getSharePointParticularFolders(
            props.user_id || data.user_id,
            props.user_type || data.user_type,
            props.folderId || data.doc_folder_id,
            "", "", 10, 1, data.document_id
        );
        let fileData = res.data.data.find((item) => item.id === data.document_id)
        // Create an anchor element dynamically
        const link = document.createElement('a');
        link.href = fileData["@microsoft.graph.downloadUrl"];
        link.setAttribute('download', fileData["@microsoft.graph.downloadUrl"]);

        // Append the link to the body
        document.body.appendChild(link);

        // Trigger the click event
        link.click();

        // Clean up by removing the link
        document.body.removeChild(link);
    };

    return (
        <div>
            <table className="table table-striped main_data_table">
                <thead>
                    <tr>
                        <th
                            scope="col"
                            className="border-0 font-size-4 font-weight-normal"
                        >
                            <Link to="" className="text-dark" onClick={() => { props.handleSort("invoice_no") }}>
                                Invoice No.
                            </Link>
                        </th>
                        <th
                            scope="col"
                            className={window.location.pathname === "/daily_pages" ? "border-0 font-size-4 font-weight-normal" : "d-none"}
                        >
                            <Link to="" className="text-dark" onClick={() => { props.handleSort("user_id") }}>
                                User
                            </Link>
                        </th>
                        <th
                            scope="col"
                            className="border-0 font-size-4 font-weight-normal"
                        >
                            <Link to="" className="text-dark" onClick={() => { props.handleSort("terms") }}>
                                Terms
                            </Link>
                        </th>
                        <th
                            scope="col"
                            className="border-0 font-size-4 font-weight-normal"
                        >
                            <Link to="" className="text-dark" onClick={() => { props.handleSort("created_by_name") }}>
                                Created By
                            </Link>
                        </th>
                        <th
                            scope="col"
                            className="border-0 font-size-4 font-weight-normal"
                        >
                            <Link to="" className="text-dark" onClick={() => { props.handleSort("updated_by_name") }}>
                                Last Updated By
                            </Link>
                        </th>
                        <th
                            scope="col"
                            className="border-0 font-size-4 font-weight-normal"
                        >
                            <Link to="" className="text-dark" onClick={() => { props.handleSort("created_at") }}>
                                Created On
                            </Link>
                        </th>
                        <th
                            scope="col"
                            className="border-0 font-size-4 font-weight-normal"
                        >
                            <Link to="" className="text-dark" onClick={() => { props.handleSort("status") }}>
                                status</Link>
                        </th>
                        <th
                            scope="col"
                            className="border-0 font-size-4 font-weight-normal"
                        >
                            <Link to="" className="text-dark" onClick={() => { props.handleSort("due_date") }}>
                                Due date
                            </Link>
                        </th>
                        <th
                            scope="col"
                            className="border-0 font-size-4 font-weight-normal"
                        >
                            <Link to="" className="text-dark" onClick={() => { props.handleSort("due_amount") }}>
                                Due amount</Link>
                        </th>
                        <th
                            scope="col"
                            className="border-0 font-size-4 font-weight-normal"
                        >
                            Receive amount
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
                    {props.totalData === 0 || props.invoiceList.length === 0 ? (
                        <tr>
                            <th colSpan={window.location.pathname === "/daily_pages" ? 9 : 8} className="bg-white text-center">
                                No Data Found
                            </th>
                        </tr>
                    ) :
                        (props.invoiceList || []).map((item, index) =>
                            <tr key={index} style={{ backgroundColor: props.invoiceId === item.id ? "#c2e3ef63" : "" }}>
                                <td>{item.invoice_no}</td>
                                <td className={window.location.pathname === "/daily_pages" ? "" : "d-none"}>
                                    <Link
                                        to={item.user_type === "employee" ? `/${item.user_id}?user_payment=true&invoiceId=${item.id}` : `/client_detail?user_payment=true&invoiceId=${item.id}`}
                                        onClick={() => {
                                            if (item.user_type === "employer") {
                                                localStorage.setItem("company_id", item.user_id);
                                            }
                                        }}
                                        className={"text-dark"}
                                    >
                                        {props.employeeEmployerlist.filter(res =>
                                            (item.user_type === "employee" && item.user_id === res?.employee_id) ||
                                            (item.user_type === "employer" && item.user_id === res?.company_id)
                                        )[0]?.[item.user_type === "employee" ? 'name' : 'company_name'] + (item.user_type === "employee" ? " (Candidate)" : " (Employer)")}
                                    </Link>
                                </td>
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
                                            {item.created_by_name || "N/A"}
                                        </span>
                                    </p>
                                </td>
                                <td className=" py-5">
                                    <p className="font-size-2 font-weight-normal text-black-2 mb-0">
                                        <span className="p-1">
                                            {item.updated_by_name || "N/A"}
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
                                        <span className="p-1"><CommonRetainerAgreementDate _date={item.due_date} format={"DD MMMM, YYYY"} /></span>
                                    </p>
                                </td>
                                <td className=" py-5">
                                    <p className="font-size-2 font-weight-normal text-black-2 mb-0">
                                        <span className="p-1 ">
                                            {item.due_amount || 0}
                                        </span>
                                    </p>

                                </td>
                                <td className=" py-5">
                                    <p className="font-size-2 font-weight-normal text-black-2 mb-0">
                                        <span className="p-1 ">
                                            {item.received_amount || 0}
                                        </span>
                                    </p>
                                </td>
                                <td className=" py-5">
                                    <div className="btn-group button_group" role="group">

                                        <button
                                            type="button"
                                            className={item.is_send_mail === 1 || item.is_send_mail === "1" ? "d-none" : "btn btn-outline-info action_btn"}
                                            onClick={() => {
                                                if (item.added_type === "uploaded_invoice") {
                                                    props.setOpenUploadPaymentForm(true)
                                                } else {
                                                    props.setOpenAddPaymentForm(true)
                                                }
                                                props.setSingleInvoiceData(item)
                                            }}
                                            title="Edit pdf"
                                        >
                                            <span className="text-gray px-2">
                                                <CiEdit />
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            className={item.added_type === "uploaded_invoice" ? "d-none" : "btn btn-outline-info action_btn"}
                                            onClick={() => {
                                                props.setShowReminderScheduleModal(true);
                                                props.setSingleInvoiceData(item)
                                            }}
                                            title="Set Reminder Schedule"
                                            disabled={!item.due_amount || item.due_amount === 0 || item.due_amount === "0"}>
                                            Set Reminder Schedule
                                        </button>

                                        <button
                                            type="button"
                                            className={item.added_type === "uploaded_invoice" ? "d-none" : "btn btn-outline-info action_btn"}
                                            onClick={() => {
                                                props.setOpenPaymentReminder(true);
                                                props.setSingleInvoiceData(item)
                                            }}
                                            title="Payment Reminder"
                                        >
                                            <span className="text-gray px-2">
                                                <FaAmazonPay />
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            className={item.added_type === "uploaded_invoice" ? "d-none" : "btn btn-outline-info action_btn "}
                                            title="Receive amount"
                                            onClick={() => {
                                                props.setOpenRecPaymentForm(true);
                                                props.setSingleInvoiceData(item);
                                            }}
                                            disabled={item.due_amount === 0 || item.due_amount === "0"}
                                        >
                                            <span className=" px-2"><HiOutlineInboxIn /></span>
                                        </button>
                                        <button
                                            className="btn btn-outline-info action_btn d-none"
                                            title="View Invoice"
                                        >
                                            <span className="text-gray px-2"><AiOutlineFilePdf /></span>
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-info action_btn "
                                            disabled={!item.document_id}
                                            onClick={() => {
                                                props.setOpenViewInvoice(true);
                                                props.setInvoiceData(item);
                                                props.GetInvoicePdf(item);
                                            }}
                                            title="View Invoice"
                                        >
                                            <span className="text-gray px-2">
                                                <FaEye />
                                            </span>
                                        </button>
                                        <button type="button" className="btn btn-outline-info action_btn"
                                            onClick={() => { handleDownloadInvoice(item) }}
                                            title="Download Invoice">
                                            <span className="text-gray px-2">
                                                <FaDownload />
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
                                    
                                    <RiSecurePaymentLine />
                                  </span>
                                </button> */}
                                        <button
                                            type="button"
                                            className="btn btn-outline-info action_btn"
                                            onClick={() => {
                                                props.setDeleteAlert(true);
                                                props.setDeleteData(item)
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
        </div>
    )
}
