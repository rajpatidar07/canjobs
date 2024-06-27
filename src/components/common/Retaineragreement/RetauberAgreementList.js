import React/*, { useEffect, useState } */from 'react'
// import { Pagination } from 'react-bootstrap'
// import ConvertTime from '../ConvertTime'
// import Loader from "../../common/loader"
import { useNavigate } from 'react-router-dom'
// import AggrementOne from './AgreementOne'
export default function RetauberAgreementList({
    user_id,
    emp_user_type,
    folderId,
    userData
}) {
    // let [isLoading, setIsLoading] = useState(true);
    // const [openAgreement, setOpenAgreement] = useState([]);
    let navigate = useNavigate()
    /*Pagination states */
    // const [totalData, setTotalData] = useState("");
    // const [recordsPerPage] = useState(10);
    // /*Shorting states */
    // const [columnName,/* setcolumnName*/] = useState("id");
    // const [sortOrder,/* setSortOrder*/] = useState("DESC");
    // const [currentPage, setCurrentPage] = useState(1);

    //   /* Function to get the intervew data*/
    // const InterviewData = async () => {
    //     try {
    //         const userData = await getActivityLog(
    //             currentPage,
    //             "",
    //             "",
    //             "",
    //             "",
    //             recordsPerPage,
    //             employee_id,
    //             "employee",
    //             "interviewHistory",
    //             sortOrder,
    //             columnName
    //         );
    //         if (userData.data.data.length === 0) {
    //             setInterviewHistoryData([]);
    //             setIsLoading(false);
    //         } else {
    //             setInterviewHistoryData(userData.data.data);
    //             setTotalData(userData.total_rows);
    //             setIsLoading(false);
    //         }
    //     } catch (err) {
    //         console.log(err);
    //         setIsLoading(false);
    //     }
    // };

    /*Render function to get the interview*/
    // useEffect(() => {
    //     // eslint-disable-next-line
    // }, [
    //     columnName,
    //     recordsPerPage,
    //     sortOrder,
    //     currentPage,
    // ]);

    /*Pagination Calculation */
    // const nPages = Math.ceil(totalData / recordsPerPage);
    return (
        <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-8 px-2 ">
            <div className="table-responsive main_table_div">
                {
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
                                    S NO.
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
                                    Status
                                </th>
                                <th scope="col" className="border-0 font-size-4 font-weight-normal">
                                    Date
                                </th>
                                <th scope="col" className="border-0 font-size-4 font-weight-normal">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                // interviewHistoryData.length === 0 ?
                                // <tr >
                                //     <td colSpan={7} className="bg-white text-center">No data found</td>
                                // </tr> 
                                // :
                                // interviewHistoryData.map(interview => (
                                <tr >
                                    {/* <td>{interview.id}</td> */}
                                    <td>{
                                        <div className="timeline_date d-flex flex-column">
                                            01
                                        </div>
                                    }</td>
                                    <td className='text-capitalize '>
                                        Retainer Agreement - Client 1 column - Express Entry
                                    </td>
                                    <td>
                                        Not Done
                                    </td>
                                    <td>
                                        N/A
                                    </td>
                                    <td>
                                        <div className="btn-group button_group" role="group">
                                            <button
                                                className="btn btn-outline-info action_btn "
                                                style={{ fontSize: "10px" }}
                                                onClick={() => {
                                                    navigate("/agreepreivew", {
                                                        state: {
                                                            user_id: user_id,
                                                            emp_user_type: emp_user_type,
                                                            folderId: folderId,
                                                            userData:userData
                                                        }
                                                    });
                                                }}
                                                title="Open Agreement"
                                            >                                         Open Agreement
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                // ))
                            }
                        </tbody>
                    </table>}
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
        </div>
    )
}
