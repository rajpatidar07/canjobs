import React, { useEffect, useState } from 'react'
import { AiOutlineFilePdf } from 'react-icons/ai'
import { CiEdit, CiTrash } from 'react-icons/ci'
import { FaAmazonPay, FaEye } from 'react-icons/fa'
import { HiOutlineInboxIn } from 'react-icons/hi'
import CommonRetainerAgreementDate from '../Retaineragreement/CommonRetainerAgreementDate'
import ConvertTime from '../Common function/ConvertTime'
import { FiAlertCircle } from 'react-icons/fi'
import { GetFilter } from '../../../api/api'
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
                            <th colSpan={6} className="bg-white text-center">
                                No Data Found
                            </th>
                        </tr>
                    ) :
                        (props.invoiceList || []).map((item, index) =>
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
