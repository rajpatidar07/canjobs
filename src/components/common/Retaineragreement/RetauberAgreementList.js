import React, { useEffect, useState } from 'react'
// import { Pagination } from 'react-bootstrap'
import RetainerAgreement from '../../forms/Agreement/RetainerAgreement';
import AgreementOneForm from '../../forms/Agreement/AgreementOneForm';
import { GetAgreement, getSharePointParticularFolders, DeleteAgreement } from '../../../api/api';
import { FaFilePdf, FaFileSignature, FaPlus } from "react-icons/fa";
import MainRetainerAggHtml from './MainRetainerAggHtml';
import ViewPdf from './viewPdf';
import { IoMdMail } from "react-icons/io";
import SendEmailAgreement from '../../forms/Agreement/SendEmailAgreement';
import { RiDeleteBin5Line } from 'react-icons/ri';
import SAlert from '../sweetAlert';
import { toast } from 'react-toastify';
import Newpdf from '../Adobe/newpdf';
import { IoDocumentTextSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import AddClientForm from '../../forms/Agreement/AddClientForm';
export default function RetauberAgreementList({
    user_id,
    emp_user_type,
    folderId,
    userData
}) {
    // let [isLoading, setIsLoading] = useState(true);
    const [openSendMail, setOpenSendMail] = useState(false);
    const [openAgreement, setOpenAgreement] = useState(false);
    const [openAddAgreementForm, setOpenAddAgreementForm] = useState(false);
    const [openAddAgreementFelids, setOpenAddAgreementFelids] = useState(false);
    const [openAddClientFeilds, setOpenAddClientFeilds] = useState(false);
    const [openViewAgreement, setOpenViewAgreement] = useState(false);
    const [openSignfPspdfkit, setOpenSignfPspdfkit] = useState(false);
    const [openViewAgreementSign, setOpenViewAgreementSign] = useState("");
    const [agreementList, setAgreementList] = useState([]);
    const [agreementData, setAgreementData] = useState("");
    const [apicall, setApicall] = useState(false)
    let [docLoader, setDocLoder] = useState(false)
    let [pdf, setPdf] = useState("")
    /*delete state */
    const [deleteAlert, setDeleteAlert] = useState(false);
    const [deleteId, setDeleteID] = useState();
    const [deleteName, setDeleteName] = useState("");
    // let navigate = useNavigate()
    /*Pagination states */
    // const [totalData, setTotalData] = useState("");
    // const [recordsPerPage] = useState(10);
    // /*Shorting states */
    // const [columnName,/* setcolumnName*/] = useState("id");
    // const [sortOrder,/* setSortOrder*/] = useState("DESC");
    // const [currentPage, setCurrentPage] = useState(1);

    /*Pagination Calculation */
    // const nPages = Math.ceil(totalData / recordsPerPage);
    /*Function to get the Agreement Data */
    const getAgreeFelidData = async () => {
        try {
            let res = await GetAgreement("", user_id, emp_user_type)
            if (res.data.data) {
                setAgreementList(res.data.data)
            } else {
                setAgreementList([])
            }
        } catch (err) {
            console.log(err)
        }
    }

    const GetAgreementPdf = async (data) => {
        setDocLoder(true)
        try {
            let res = await getSharePointParticularFolders(
                user_id,
                emp_user_type,
                folderId
            );
            if (res.data.status === 1) {
                setDocLoder(false);
                if (res.data.data.find((item) => item.id === data.document_id)) {
                    setPdf(res.data.data.find((item) => item.id === data.document_id))
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
    }
    useEffect(() => {
        // Call the function when the component first renders
        getAgreeFelidData();
        let timer;
        if (apicall) {
            timer = setTimeout(() => {
                // Function to be executed after 20 seconds when apicall is true because document update's take time 
                getAgreeFelidData();
                // Reset the state to false
                setApicall(false);
            }, 20000);
        }

        // Cleanup function to clear the timer if the component unmounts or myState changes
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apicall]);
    /*To Show the delete alert box */
    const ShowDeleteAlert = (e) => {
        setDeleteID(e.id);
        setDeleteName(e.type);
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
                setApicall(true);
                setDeleteAlert(false);
            }
        } catch (err) {
            console.log(err);
        }
    }
    const addSignatureCLick = async () => {
        setOpenViewAgreementSign("sign")
        setOpenAddAgreementFelids(true)
    }

    return (

        <div className='response_main_div w-100 mb-10'>
            <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-8 px-2 ">
                <div className={`${openAgreement ? "d-none" : "d-flex"} justify-content-between`}>
                    <div className='p-3'>
                        <h3 className=''>Agreement's</h3>
                    </div>
                    <div className='p-3'>
                        <button className='btn btn-primary' onClick={() => setOpenAddAgreementForm(true)}>Add Agreement</button>
                    </div>
                </div>

                <div className="table-responsive main_table_div w-100">
                    {openAgreement ?
                        <MainRetainerAggHtml
                            userData={userData}
                            user_id={user_id}
                            emp_user_type={emp_user_type}
                            folderId={folderId}
                            setOpenAgreement={setOpenAgreement}
                            agreementData={agreementData}
                            setApicall={setApicall}
                        /> :
                        // isLoading ? (
                        //     <Loader />
                        // ) :
                        <table className="table table-striped main_data_table">
                            <thead>
                                <tr>
                                    <th scope="col" className="border-0 font-size-4 font-weight-normal">

                                        S.No
                                    </th>
                                    <th scope="col" className="border-0 font-size-4 font-weight-normal">

                                        Agreement
                                    </th>
                                    <th scope="col" className="border-0 font-size-4 font-weight-normal">
                                        Sent Date
                                    </th>
                                    <th scope="col" className="border-0 font-size-4 font-weight-normal">
                                        Receive Date
                                    </th>
                                    <th scope="col" className="border-0 font-size-4 font-weight-normal">
                                        Pdf generated status
                                    </th>
                                    <th scope="col" className="border-0 font-size-4 font-weight-normal">
                                        Signature status
                                    </th>
                                    <th scope="col" className="border-0 font-size-4 font-weight-normal">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    agreementList.length === 0 ?
                                        <tr >
                                            <td colSpan={7} className="bg-white text-center">No data found</td>
                                        </tr>
                                        :
                                        agreementList.map((data, index) => (
                                            <tr key={index}>
                                                {/* <td>{interview.id}</td> */}
                                                <td>{
                                                    <div className="timeline_date d-flex flex-column">
                                                        {index + 1}
                                                    </div>
                                                }</td>
                                                <td className='text-capitalize '>
                                                    {data.type || "N/A"}
                                                </td>
                                                <td className='text-capitalize '>
                                                    {data.sent_date || "N/A"}
                                                </td>
                                                <td className='text-capitalize '>
                                                    {data.receive_Date || "N/A"}
                                                </td>
                                                <td className="text-center py-5">
                                                    <p className="font-size-2 font-weight-normal text-black-2 mb-0">
                                                        {data.pdf_genrated_status === "1" ?
                                                            (<span className="p-1 bg-primary-opacity-8 text-white text-center  border rounded-pill">
                                                                Complete
                                                            </span>
                                                            ) : (
                                                                <span className="p-1 bg-warning text-white text-center  border rounded-pill">
                                                                    Incomplete
                                                                </span>
                                                            )}</p>
                                                </td>
                                                <td className="text-center py-5">
                                                    <p className="font-size-2 font-weight-normal text-black-2 mb-0">
                                                        {data.signature_status === "1" ?
                                                            (<span className="p-1 bg-primary-opacity-8 text-white text-center  border rounded-pill">
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
                                                            className="btn btn-outline-info action_btn "

                                                            onClick={() => {
                                                                setOpenAgreement(true)
                                                                setAgreementData(data)
                                                                setOpenViewAgreementSign("")
                                                                // navigate("/agreepreivew", {
                                                                //     state: {
                                                                //         user_id: user_id,
                                                                //         emp_user_type: emp_user_type,
                                                                //         folderId: folderId,
                                                                //         userData:userData
                                                                //     }
                                                                // });
                                                            }}
                                                            disabled={data.initial}
                                                            title=" View and update doc"
                                                        >
                                                            <span className='text-gray px-2'>
                                                                <IoDocumentTextSharp />
                                                            </span>
                                                        </button>
                                                        <button
                                                            className="btn btn-outline-info action_btn "

                                                            onClick={() => {
                                                                setOpenAddAgreementFelids(true)
                                                                setAgreementData(data)
                                                            }}
                                                            title="Add Felids"
                                                            disabled={data.initial}
                                                        >
                                                            <span className='text-gray px-2'>
                                                                <FaEdit />
                                                            </span>
                                                        </button>
                                                        <button
                                                            className="btn btn-outline-info action_btn d-none"

                                                            onClick={() => {
                                                                setOpenAddClientFeilds(true)
                                                                setAgreementData(data)
                                                            }}
                                                            title="Add Client"
                                                        >
                                                            <span className='text-gray px-2'>
                                                                <FaPlus />
                                                            </span>
                                                        </button>
                                                        <button
                                                            className="btn btn-outline-info action_btn "

                                                            disabled={!data.document_id}
                                                            onClick={() => {
                                                                setOpenViewAgreement(true)
                                                                setAgreementData(data)
                                                                GetAgreementPdf(data)
                                                            }}
                                                            title="View Retainer Agreement">
                                                            <span className='text-gray px-2'>
                                                                <FaFilePdf />
                                                            </span>
                                                        </button>
                                                        <button
                                                            className="btn btn-outline-info action_btn "

                                                            onClick={() => {
                                                                setOpenSendMail(true)
                                                                setAgreementData(data)
                                                                GetAgreementPdf(data)
                                                            }}
                                                            disabled={(!data.client_email && !data.document_id)
                                                                || (data.initial ?
                                                                    data.rcic_signature ?
                                                                        true :
                                                                        false :
                                                                    false)}
                                                            title="Send Retainer Agreement">
                                                            <span className='text-gray px-2'>
                                                                <IoMdMail />
                                                            </span>
                                                        </button>
                                                        <button
                                                            className="btn btn-outline-info action_btn d-none"
                                                            onClick={() => {
                                                                setOpenSignfPspdfkit(true)
                                                                setAgreementData(data)
                                                                GetAgreementPdf(data)
                                                            }}
                                                            disabled={!data.document_id}
                                                            title="Sign document with pspdfkit"
                                                        >
                                                            Sign document with pspdfkit
                                                        </button>
                                                        <button
                                                            className="btn btn-outline-info action_btn "
                                                            onClick={() => {
                                                                addSignatureCLick()
                                                                setAgreementData(data)
                                                                GetAgreementPdf(data)
                                                            }}
                                                            disabled={data.initial ?
                                                                data.rcic_signature
                                                                    ? true
                                                                    : false
                                                                : data.initial
                                                                    ? false
                                                                    : true}
                                                            title="RCIC Sign"

                                                        >
                                                            <span className='text-gray px-2'>
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
                                }
                            </tbody>
                        </table>
                    }
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
                {openSendMail ?
                    <SendEmailAgreement
                        show={openSendMail}
                        close={() => setOpenSendMail(false)}
                        user_id={user_id}
                        emp_user_type={emp_user_type}
                        folderId={folderId}
                        felidData={agreementData}
                        pdf={pdf}
                    />
                    : null}
                {openAddAgreementFelids ?
                    <AgreementOneForm
                        show={openAddAgreementFelids}
                        close={() => {
                            setOpenAddAgreementFelids(false)
                            setOpenViewAgreementSign("")
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
                    : null}
                {openAddClientFeilds ?
                    <AddClientForm
                        show={openAddClientFeilds}
                        close={() => {
                            setOpenAddClientFeilds(false)
                            setOpenViewAgreementSign("")
                        }}
                        userData={userData}
                        setApicall={setApicall}
                        felidData={agreementData}
                        emp_user_type={emp_user_type}
                        user_id={user_id}
                        openSignature={openViewAgreementSign === "sign" ? "yes" : "no"}
                        folderId={folderId}
                    />
                    : null}
                {openAddAgreementForm ?
                    <RetainerAgreement
                        show={openAddAgreementForm}
                        close={() => setOpenAddAgreementForm(false)}
                        emp_user_type={emp_user_type}
                        userData={userData}
                        setApicall={setApicall}
                    /> :
                    null}
                {openViewAgreement ?
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
                    />
                    : null}
                {openSignfPspdfkit ? <Newpdf
                    document={pdf["@microsoft.graph.downloadUrl"]}
                    show={openSignfPspdfkit}
                    close={() => setOpenSignfPspdfkit(false)}
                /> : null}
                <SAlert
                    show={deleteAlert}
                    title={deleteName}
                    text="Are you Sure you want to delete !"
                    onConfirm={() => deleteAdmin(deleteId)}
                    showCancelButton={true}
                    onCancel={CancelDelete}
                />
            </div>
        </div>
    )
}
