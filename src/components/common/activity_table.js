import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../common/pagination";
import Loader from "../common/loader";
import { /*GetAgent,*/ getActivityLog } from "../../api/api";
import { Link } from "react-router-dom";
import ConvertTime from "./ConvertTime";
export default function ActivityTable(props) {
  /*Show modal states */
  // let [apiCall, setApiCall] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  const [hide /*, sethide*/] = useState(props.hide || false);
  const [user_id /*, setuser_id*/] = useState(props.user_id);
  const [user_type /*, setuser_type*/] = useState(props.user_type);
  const [action_id /*, setaction_id*/] = useState(props.action_id);
  const [action_type /*, setaction_type*/] = useState(props.action_type);
  const [activityData, setactivityData] = useState([]);
  /*Pagination states */
  // const [status, setStatus] = useState(props.self === "yes" ? -1 : 4);
  const [callapi, setCallApi] = useState(false);
  const [page, setpage] = useState(1);
  const [totalData, setTotalData] = useState("");
  const [recordsPerPage] = useState(10);
  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);

  let activity_json = {
    1: "Candidate updated",
    2: "Candidate inserted",
    3: "Candidate skill inserted",
    4: "Candidate education details inserted",
    5: "Candidate education details updated",
    6: "Candidate career details inserted",
    7: "Candidate career details updated",
    8: "Candidate document inserted",
    9: "Candidate document updated",
    10: "Candidate visa inserted",
    11: "Candidate visa updated",
    12: "Employer details updated",
    13: "Employer details inserted",
    14: "Employer contact details updated",
    15: "Employer kyc details inserted",
    16: "Employer kyc details updated",
    17: "Job details updated",
    18: "Job details inserted",
    19: "Job switch",
    20: "Apply on job",
    21: "Interview schedule",
    22: "Lmia updated",
    23: "Lmia inserted",
    24: "Employer document inserted",
    25: "Employer document updated",
    26: "Employee lmia substage added",
    27: "Employee lmia substage updated",
    28: "Job lmia substage inserted",
    29: "Job lmia substage updated",
    30: "Category inserted",
    31: "Category updated",
    32: "Category type inserted",
    33: "Category type updated",
    34: "Miscellaneous Substage inserted",
    35: "Miscellaneous Substage updated",
    36: "interview complete",
    37: "Delete Employee",
    38: "Employee career delete",
    39: "Employee Education delete",
    40: "Employee Skills delete",
    41: "Admin Document upload on sharepoint",
    42: "Employee password update",
    43: "Employee document delete",
    44: "Employee visa delete",
    45: "Employee reserve add",
    46: "Employee reserve remove",
    47: "Employee setting update",
  };
  //   let activityData;
  /* Function to get Activity data*/
  const ActivityLog = async () => {
    // const params = useParams();
    setIsLoading(true);
    try {
      let adata = await getActivityLog(
        page, // Page no.
        user_id,
        user_type,
        action_id,
        action_type,
        recordsPerPage //data  per page
      );
      setactivityData(adata.data.data);
      setTotalData(adata.data.total_rows);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  //   const SetHtml = async (htmll) => {
  //     const markup = { __html: htmll };
  //     return { markup };
  //   };
  /*Render function to get the employer*/
  useEffect(() => {
    ActivityLog();
    if (callapi === true) {
      setCallApi(false)
    }
    // eslint-disable-next-line
  }, [page, callapi]);
  return (
    <>
      <div className="table-responsive main_table_div">
        {isLoading ? (
          <Loader />
        ) : (
          <table className="table table-striped main_data_table">
            {/* <button onClick={() => setCallApi(true)}>call</button> */}
            <thead>
              <tr className="">
                {hide ? null : <th>User ID</th>}
                {hide ? null : <th>User Type</th>}
                {hide ? null : <th>User Name</th>}
                <th>Log</th>
                <th>Date Time</th>
              </tr>
            </thead>
            <tbody>
              {totalData === 0 || activityData.length === 0 ? (
                <tr>
                  <th colSpan={5} className="bg-white text-center font-size-3">
                    No Data Found
                  </th>
                </tr>
              ) : (
                (activityData || []).map((data) => (
                  <tr key={data.id} className="font-size-3">
                    {hide ? null : <td>{data.user_id}</td>}
                    {hide ? null : <td>{data.user_type}</td>}
                    {hide ? null : <td>{data.created_by}</td>}
                    <td>
                      {/* {data.msg} */}
                      <Link to={"/" + data.action_id}>
                        {data.employee_name === ("" || undefined || null)
                          ? "Candidate"
                          : data.employee_name}
                      </Link>{" "}
                      <span className="text-capitalize">{activity_json[`${data.status}`]?.replace("Miscellaneous", data.action_type)}</span>
                      {/* {" for "} */}
                      {" by "}
                      {data.user_type === "agent"
                        ? "partner"
                        : data.user_type + " " + data.created_by}
                    </td>
                    <td>
                      <ConvertTime _date={data.created_at} format={'MMMM Do YYYY, h:mm:ss a'} />
                      {/* {moment(data.created_at).format("lll")} */}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
      <div className="pt-2">
        <Pagination
          nPages={nPages}
          currentPage={page}
          setCurrentPage={setpage}
          total={totalData}
          count={activityData.length}
        />
      </div>
    </>
  );
}
