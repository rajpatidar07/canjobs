import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Loader from './loader';
import { getActivityLog } from "../../api/api"
import Pagination from './pagination';
const InterviewHistoryTable = ({ employee_id }) => {
    let [isLoading, setIsLoading] = useState(true);
    // let [showAddInterviewModal, setShowAddInterviewModal] = useState(false);
    const [interviewHistoryData, setInterviewHistoryData] = useState([]);
    // const [jobId, setJobId] = useState();
    // let [resData, setResData] = useState("");
    // let [apiCall, setApiCall] = useState(false);

    /*Pagination states */
    const [totalData, setTotalData] = useState("");
    // const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    /*Shorting states */
    const [columnName,/* setcolumnName*/] = useState("id");
    const [sortOrder,/* setSortOrder*/] = useState("DESC");
    const [currentPage, setCurrentPage] = useState(1);

    //   /* Function to get the intervew data*/
    const InterviewData = async () => {
        try {
            const userData = await getActivityLog(
                currentPage,
                "",
                "",
                "",
                "",
                recordsPerPage,
                employee_id,
                "employee",
                "interviewHistory",
                sortOrder,
                columnName
            );
            if (userData.data.data.length === 0) {
                setInterviewHistoryData([]);
                setIsLoading(false);
            } else {
                setInterviewHistoryData(userData.data.data);
                setTotalData(userData.total_rows);
                setIsLoading(false);
            }
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    };

    /*Render function to get the interview*/
    useEffect(() => {
        InterviewData();
        // eslint-disable-next-line
    }, [
        columnName,
        recordsPerPage,
        sortOrder,
        currentPage,
    ]);

    /* Function to show the single data to update interview*/
    // const editInterview = (e) => {
    //   setShowAddInterviewModal(true);
    //   setJobId(e.job_id);
    //   setResData(e);
    // };

    /*Pagination Calculation */
    const nPages = Math.ceil(totalData / recordsPerPage);

    /*Sorting Function */
    // const handleSort = (columnName) => {
    //     setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
    //     setcolumnName(columnName);
    // };
    /* Function to replace the _ and correct the document type */
    // const textReplaceFunction = (e) => {
    //     if (e && e.includes("_")) {
    //         let new_text = e.replaceAll("_", " ");
    //         return new_text;
    //     } else {
    //         return e;
    //     }
    // };
    return (
        <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-8 px-2 ">
            <div className="table-responsive main_table_div">
                {isLoading ? (
                    <Loader />
                ) :
                    <table className="table table-striped main_data_table">
                        <thead>
                            <tr>
                                {/* <th scope="col" className="border-0 font-size-4 font-weight-normal">
                                    <Link
                                        // to={""}
                                        // onClick={() => {
                                        //     handleSort("id");
                                        //     setCurrentPage(1);
                                        // }}
                                        className="text-gray"
                                    // title="Sort by id"
                                    >   ID
                                    </Link>
                                </th> */}
                                <th scope="col" className="border-0 font-size-4 font-weight-normal">
                                    <Link
                                        // to={""}
                                        // onClick={() => {
                                        //     handleSort("created_at");
                                        //     setCurrentPage(1);
                                        // }}
                                        className="text-gray"
                                    // title="Sort by Time"
                                    >  Scheduled By
                                    </Link>
                                </th>
                                <th scope="col" className="border-0 font-size-4 font-weight-normal">
                                    Interview Status
                                </th>
                                <th scope="col" className="border-0 font-size-4 font-weight-normal">
                                    Date
                                </th>
                                <th scope="col" className="border-0 font-size-4 font-weight-normal">
                                    Message
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {interviewHistoryData.length === 0 ?
                                <tr >
                                    <td colSpan={7} className="bg-white text-center">No data found</td>
                                </tr> :
                                interviewHistoryData.map(interview => (
                                    <tr key={interview.id}>
                                        {/* <td>{interview.id}</td> */}
                                        <td>{
                                            <div className="timeline_date d-flex flex-column">
                                                <b className="text-dark font-size-3 text-capitalize">
                                                    {interview.created_by}
                                                </b>
                                            </div>
                                        }</td>
                                        <td className='text-capitalize '>
                                            {interview.status === 36 ||interview.status === "36"?
                                                "Interview completed" :
                                                "Interview Schedule"}</td>
                                        <td><i className="font-size-2">
                                            {moment(interview.created_at).format("lll")}
                                        </i></td>
                                        <td>
                                            <p className="timeline_date text-dark font-size-3 intervire-msg mt-5">
                                                {interview.msg}
                                            </p>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>}
            </div>
            <div className="pt-2">
                <Pagination
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    total={totalData}
                    count={interviewHistoryData.length}
                />
            </div>
        </div>
    );
};

export default InterviewHistoryTable;
