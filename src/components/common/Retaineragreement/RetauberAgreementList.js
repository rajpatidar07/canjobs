import React, { useEffect, useState }/*, { useEffect, useState } */ from 'react'
// import { Pagination } from 'react-bootstrap'
// import ConvertTime from '../ConvertTime'
// import Loader from "../../common/loader"
// import { useNavigate } from 'react-router-dom'
import RetainerAgreement from '../../forms/Agreement/RetainerAgreement';
import AgreementOneForm from '../../forms/Agreement/AgreementOneForm';
import { GetAgreement } from '../../../api/api';
import { FaEye } from "react-icons/fa";
import MainRetainerAggHtml from './MainRetainerAggHtml';
import ViewPdf from './viewPdf';
// import AggrementOne from './AgreementOne'
export default function RetauberAgreementList({
    user_id,
    emp_user_type,
    folderId,
    userData
}) {
    // let [isLoading, setIsLoading] = useState(true);
    const [openAgreement, setOpenAgreement] = useState(false);
    const [openAddAgreementForm, setOpenAddAgreementForm] = useState(false);
    const [openAddAgreementFelids, setOpenAddAgreementFelids] = useState(false);
    const [openViewAgreement, setOpenViewAgreement] = useState(false);
    const [agreementList, setAgreementList] = useState([]);
    const [agreementData, setAgreementData] = useState("");
    const [apicall, setApicall] = useState(false)
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
    // console.log(userData?)
    useEffect(() => {
        getAgreeFelidData()
        if (apicall === true) {
            setApicall(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apicall])




    return (

        <div className='response_main_div w-100'>
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
                                        {/* <Link
                                        // to={""}
                                        // onClick={() => {
                                        //     handleSort("id");
                                        //     setCurrentPage(1);
                                        // }}
                                        className="text-gray"
                                    // title="Sort by id"
                                    > */}
                                        S.NO.
                                        {/* </Link> */}
                                    </th>
                                    <th scope="col" className="border-0 font-size-4 font-weight-normal">
                                        {/* <Link
                                        // to={""}
                                        // onClick={() => {
                                        //     handleSort("created_at");
                                        //     setCurrentPage(1);
                                        // }}
                                        className="text-gray"
                                    // title="Sort by Time"
                                    >  */}
                                        Agreement
                                        {/* </Link> */}
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
                                                            style={{ fontSize: "10px" }}
                                                            onClick={() => {
                                                                setOpenAgreement(true)
                                                                setAgreementData(data)
                                                                // navigate("/agreepreivew", {
                                                                //     state: {
                                                                //         user_id: user_id,
                                                                //         emp_user_type: emp_user_type,
                                                                //         folderId: folderId,
                                                                //         userData:userData
                                                                //     }
                                                                // });
                                                            }}
                                                            title="View Agreement"
                                                        >                                         View Agreement
                                                        </button>
                                                        <button
                                                            className="btn btn-outline-info action_btn "
                                                            style={{ fontSize: "10px" }}
                                                            onClick={() => {
                                                                setOpenAddAgreementFelids(true)
                                                                setAgreementData(data)
                                                            }}
                                                            title="Add Felids"
                                                        >                                         Add Felids
                                                        </button>
                                                        <button
                                                            className="btn btn-outline-info action_btn "
                                                            style={{ fontSize: "10px" }}
                                                            disabled={!data.document_id}
                                                            onClick={() => {
                                                                setOpenViewAgreement(true)
                                                                setAgreementData(data)
                                                            }}
                                                            title="View Pdf"><FaEye /></button>
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
                {/* {openAgreement ?
             <AggrementOne
                show={openAgreement}
                close={setOpenAgreement(false)}
                user_id={user_id}
                emp_user_type={emp_user_type}
                folderId={folderId}
            />
             : null} */}
                {openAddAgreementFelids ?
                    <AgreementOneForm
                        show={openAddAgreementFelids}
                        close={() => setOpenAddAgreementFelids()}
                        userData={userData}
                        setApicall={setApicall}
                        felidData={agreementData}
                        emp_user_type={emp_user_type} />
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
                    />
                    : null}
            </div>
        </div>
    )
}
