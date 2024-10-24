import React from 'react'
import { Link } from 'react-router-dom';

export default function AppliedProgramTable() {
    return (
        <>
            <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-8 px-2 ">
                <div className="table-responsive main_table_div">
                    {
                        //   isLoading ? (
                        //     <Loader />
                        //   ) :
                        (
                            <table className="table table-striped main_data_table">
                                <thead>
                                    <tr className="">
                                        <th
                                            scope="col"
                                            className=" border-0 font-size-4 font-weight-normal"
                                        >
                                            <Link
                                                to={""}
                                                //   onClick={() => {
                                                //     handleSort("employee_id");
                                                //     props.setpageNo(1);
                                                //   }}
                                                className="text-gray"
                                                title="Sort by Id"
                                            >
                                                EID
                                            </Link>
                                        </th>
                                        <th
                                            scope="col"
                                            className=" border-0 font-size-4 font-weight-normal"
                                        >
                                            <Link
                                                to={""}
                                                //   onClick={() => {
                                                //     handleSort("name");
                                                //     props.setpageNo(1);
                                                //   }}
                                                className="text-gray"
                                                title="Sort by Name"
                                            >
                                                Name
                                            </Link>
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-0 font-size-4 font-weight-normal"
                                        >
                                            <Link
                                                to={""}
                                                //   onClick={() => {
                                                //     handleSort("contact_no");
                                                //     props.setpageNo(1);
                                                //   }}
                                                className="text-gray"
                                                title="Sort by Contact"
                                            >
                                                Contact
                                            </Link>
                                        </th>
                                        {
                                            //   props.heading === "Dashboard" ? (
                                            //     ""
                                            //   ) : 
                                            (
                                                <th
                                                    scope="col"
                                                    className="border-0 font-size-4 font-weight-normal"
                                                >
                                                    <Link
                                                        to={""}
                                                        // onClick={() => {
                                                        //   handleSort("interested_in");
                                                        //   props.setpageNo(1);
                                                        // }}
                                                        className="text-gray"
                                                        title="Sort by interested in"
                                                    >
                                                        Interested in
                                                    </Link>
                                                </th>
                                            )}
                                        {
                                            //   props.heading === "Dashboard" ? (
                                            //     ""
                                            //   ) : 
                                            (
                                                <th
                                                    scope="col"
                                                    className="border-0 font-size-4 font-weight-normal"
                                                >
                                                    <Link
                                                        to={""}
                                                        // onClick={() => {
                                                        //   handleSort("visa_country");
                                                        //   props.setpageNo(1);
                                                        // }}
                                                        className="text-gray"
                                                        title="Sort by visa country"
                                                    >
                                                        Visa country
                                                    </Link>
                                                </th>
                                            )}
                                        {
                                            //   props.heading === "Dashboard" ? (
                                            //     ""
                                            //   ) :
                                            (
                                                <th
                                                    scope="col"
                                                    className="border-0 font-size-4 font-weight-normal"
                                                >
                                                    <Link
                                                        to={""}
                                                        // onClick={() => {
                                                        //   handleSort("experience");
                                                        //   props.setpageNo(1);
                                                        // }}
                                                        className="text-gray"
                                                        title="Sort by Experience"
                                                    >
                                                        Experience
                                                    </Link>
                                                </th>
                                            )}
                                        <th
                                            scope="col"
                                            className="border-0 font-size-4 font-weight-normal"
                                            title="Profile"
                                        >
                                            Profile
                                        </th>
                                        {
                                            //   props.visa === "yes" ? null : 
                                            (
                                                <th
                                                    scope="col"
                                                    className="border-0 font-size-4 font-weight-normal"
                                                    title="Status"
                                                >
                                                    Status
                                                </th>
                                            )}
                                        {
                                            //   props.heading === "Dashboard" || user_type === "company" ? (
                                            //     ""
                                            //   ) : 
                                            (
                                                <th
                                                    scope="col"
                                                    className="border-0 font-size-4 font-weight-normal"
                                                    title="Actions"
                                                >
                                                    Action
                                                </th>
                                            )}
                                    </tr>
                                </thead>

                            </table>
                        )}
                </div>
                <div className="pt-2">
                    {/* <Pagination
            nPages={nPages}
            currentPage={props.pageNo}
            setCurrentPage={props.setpageNo}
            total={totalData}
            count={employeeData.length}
          /> */}
                </div>
            </div></>
    )
}
