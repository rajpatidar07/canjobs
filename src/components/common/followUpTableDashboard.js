import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFollowupLastData } from "../../api/api";
import Pagination from "./pagination";
function FollowUpDashBoard(props) {
  const [followUpData, setFollowUpData] = useState([]);
  /*Pagination states */
  const [totalData, setTotalData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  /*Shorting states */
  const [columnName, setcolumnName] = useState("id");
  const [sortOrder, setSortOrder] = useState("DESC");

  /* Function to get the FollowUp data*/
  const FollowUpData = async () => {
    const userData = await getFollowupLastData(
      currentPage,
      columnName,
      recordsPerPage,
      sortOrder,
      props.filter_by_time
    );
    if (userData.data.length === 0) {
      setFollowUpData([]);
    } else {
      setFollowUpData(userData.data);
      setTotalData(userData.total_rows);
    }
  };

  /*Render function to get the interview*/
  useEffect(() => {
    FollowUpData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props,
    currentPage,
    columnName,
    recordsPerPage,
    sortOrder,
    props.filter_by_time,
  ]);
  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);

  /*Category type array to filter*/
  // const CategoryType = InterviewData.filter(
  //   (thing, index, self) =>
  //     index === self.findIndex((t) => t.category_type === thing.category_type)
  // );
  /*Sorting Function */
  /*Sorting Function */
  const handleSort = (columnName) => {
    setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
    setcolumnName(columnName);
  };

  return (
    <>
      <div className="bg-white site-wrapper overflow-hidden bg-default-2">
        <div className="mt-5" id="dashboard-body">
          <div className="container p-0">
            <div className="mb-18">
              <div className="mb-4 align-items-center">
                <div className="page___heading">
                  <h3 className="font-size-6 mb-0">Interview</h3>
                </div>
              </div>
              <div
                className={
                  props.heading === "Dashboard"
                    ? ""
                    : "bg-white shadow-8 datatable_div  pt-7 rounded pb-9 px-5"
                }
              >
                <div className="table-responsive ">
                  <table className="table table-striped main_data_table">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to={""}
                            onClick={() => handleSort("name")}
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
                            onClick={() => handleSort("job_title")}
                            className="text-gray"
                            title="Sort by Job"
                          >
                            Applied Job
                          </Link>
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to={""}
                            onClick={() => handleSort("company_name")}
                            className="text-gray"
                            title="Sort by Company"
                          >
                            Company Name
                          </Link>
                        </th>

                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to={""}
                            onClick={() => handleSort("next_followup_date")}
                            className="text-gray"
                            title="Sort by Date"
                          >
                            Next_Followup date{" "}
                          </Link>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Map function to show the data in the list*/}
                      {totalData === 0 || followUpData.length === 0 ? (
                        <tr>
                          <th className="bg-white"></th>
                          <th className="bg-white"></th>
                          <th className="bg-white">No Data Found</th>
                          <th className="bg-white"></th>
                        </tr>
                      ) : (
                        (followUpData || []).map((data) => (
                          <tr className="" key={data.id}>
                            <th scope="row" className="py-5 ">
                              <div className="font-size-3 mb-0 font-weight-semibold text-black-2">
                                {data.name}
                              </div>
                            </th>
                            <th scope="row" className="py-5 ">
                              <div className="font-size-3 mb-0 font-weight-semibold text-black-2">
                                {data.job_title}
                              </div>
                            </th>
                            <th scope="row" className="py-5 ">
                              <div className="font-size-3 mb-0 font-weight-semibold text-black-2">
                                {data.company_name}
                              </div>
                            </th>
                            <th className=" py-5">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {data.next_followup_date === "0000-00-00"
                                  ? "N/A"
                                  : data.next_followup_date}
                              </h3>
                            </th>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="pt-2">
                  <Pagination
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FollowUpDashBoard;
