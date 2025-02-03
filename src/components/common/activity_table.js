import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../common/pagination";
import Loader from "../common/loader";
import { /*GetAgent,*/ getActivityLog } from "../../api/api";
import { Link } from "react-router-dom";
import ConvertTime from "./Common function/ConvertTime";
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
  const [page, setpage] = useState(props.pageNo || 1);
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
    12: "Client details updated",
    13: "Client details inserted",
    14: "Client contact details updated",
    15: "Client kyc details inserted",
    16: "Client kyc details updated",
    17: "Job details updated",
    18: "Job details inserted",
    19: "Job switch",
    20: "Apply on job",
    21: "Interview schedule",
    22: "Lmia updated",
    23: "Lmia inserted",
    24: "Client document inserted",
    25: "Client document updated",
    26: "Candidate lmia substage added",
    27: "Candidate lmia substage updated",
    28: "Job lmia substage inserted",
    29: "Job lmia substage updated",
    30: "Category inserted",
    31: "Category updated",
    32: "Category type inserted",
    33: "Category type updated",
    34: "Miscellaneous Substage inserted",
    35: "Miscellaneous Substage updated",
    36: "interview complete",
    37: "Delete Candidate",
    38: "Candidate career delete",
    39: "Candidate Education delete",
    40: "Candidate Skills delete",
    41: "Admin Document upload on sharepoint",
    42: "Candidate password update",
    43: "Candidate document delete",
    44: "Candidate visa delete",
    45: "Candidate reserve add",
    46: "Candidate reserve remove",
    47: "Candidate setting update",
    48: "Job post delete",
    49: "Client delete",
    50: "Job category delete",
    51: "Job delete",
    52: "Client password update",
    53: "Client document delete",
    54: "Client setting update",
    55: " Partner updated",
    56: " Partner delete",
    57: "Created comment's on document",
    58: " Notes Created",
    59: "Reply for document's comment",
    60: " Agreement added",
    61: " Agreement updated",
    62: "Agreement deleted",
    63: "Updated comment's on document",
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
        recordsPerPage, //data  per page
        "",
        "",
        "",
        "",
        "",
        props.filter_by_time,
        props.applicantType
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
  /*Render function to get the Client*/
  useEffect(() => {
    ActivityLog();
    if (callapi === true) {
      setCallApi(false)
    }
    // eslint-disable-next-line
  }, [page, callapi, props.filter_by_time]);
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
              {totalData === 0 || activityData?.length === 0 ? (
                <tr>
                  <th colSpan={5} className="bg-white text-center font-size-3">
                    No Data Found
                  </th>
                </tr>
              ) : (
                (activityData || []).map((data) => (
                  <tr key={data.id} className="font-size-3">
                    {hide ? null : <td>{data.user_id}</td>}
                    {hide ? null : <td>{data.user_type === "employee" ? "candidate" : data.user_type === "employer" ? "client" : data.user_type}</td>}
                    {hide ? null : <td>{data.created_by || data.employer_name || data.employee_name_stackholder}</td>}
                    <td>
                      {data.created_by ? <span> <Link to={"/" + data.action_id}>
                        {data.Candidate_name === ("" || undefined || null)
                          ? "Candidate"
                          : data.Candidate_name}
                      </Link>{" "}
                        <span className="text-capitalize">{activity_json[`${data.status}`]?.replace("Miscellaneous", data.action_type)}</span>
                        {/* {" for "} */}
                        {" by "}
                        {data.user_type === "agent"
                          ? "partner"
                          : data.user_type === "employee" ? "candidate" : data.user_type === "employer" ? "client" : data.user_type + " " + data.created_by ? data.created_by : "unknown user"}
                      </span> : <div dangerouslySetInnerHTML={{ __html: data.msg }} />}
                    </td>
                    <td>
                      <ConvertTime _date={data.created_at} format={'MMMM Do YYYY, h:mm:ss a'} />
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
          count={activityData?.length}
        />
      </div>
    </>
  );
}
