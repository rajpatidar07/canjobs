import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import Pagination from "../common/pagination";
import Loader from "../common/loader";
// import { MdFormatListBulletedAdd } from "react-icons/md";
import AgentsEmployee from "./AgentEmployee";
import ActivityTable from "./activity_table";
// import DataChart from "./DataChart";

export default function AdminPage(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [adminData, setAdminData] = useState({});
//   const [chartData, setChartData] = useState([]);
  const [apiCall, setApiCall] = useState(false);
  const [AdminId, setAdminId] = useState(
    props.user === "admin" ? localStorage.getItem("admin_id") : ""
  );

  useEffect(() => {
    fetchAdminData();
    // fetchChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AdminId, apiCall, props.user]);

  const fetchAdminData = async () => {
    setIsLoading(true);
    try {
      // Simulating API call to fetch admin data
      const adminData = {
        admin_id: "52",
        email: "babu@gmail.com",
        name: "Babu",
        contact_no: "3021405690",
        admin_type: "super-admin",
        profile_image:
          "https://apnaorganicstore.in/canjobs/uploads/1716282346.jpeg",
        created_at: "2024-03-15 16:18:31",
        updated_at: "2024-05-21 14:35:46",
        admin_employee_count: "0",
      };
      setAdminData(adminData);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching admin data: ", err);
      setIsLoading(false);
    }
  };

//   const fetchChartData = async () => {
//     try {
//       // Simulating API call to fetch chart data
//       const chartData = [
//         { status: "Pending", count: 20 },
//         { status: "Approved", count: 50 },
//         { status: "Rejected", count: 10 },
//       ];
//       setChartData(chartData);
//     } catch (error) {
//       console.error("Error fetching chart data: ", error);
//     }
//   };

//   const handleApiCall = () => {
//     setApiCall(true);
//   };

  return (
    <>
      <div className="bg-white rounded p-4">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="d-flex align-items-center">
            {adminData.profile_image ? (
              <img
                src={adminData.profile_image}
                alt={adminData.name}
                className="rounded-circle mr-3"
                width="100"
                height="100"
              />
            ) : (
              <div className="rounded-circle bg-secondary mr-3" style={{ width: "100px", height: "100px" }}></div>
            )}
            <div>
              <h2>{adminData.name}</h2>
              <p>
                <strong>Email:</strong> {adminData.email}
                <br />
                <strong>Contact No:</strong> {adminData.contact_no}
                <br />
                <strong>Admin Type:</strong> {adminData.admin_type}
                <br />
                <strong>Created At:</strong> {adminData.created_at}
                <br />
                <strong>Updated At:</strong> {adminData.updated_at}
                <br />
                <strong>Total Employees:</strong> {adminData.admin_employee_count}
              </p>
              
            </div>
          </div>
        )}
        {/* Chart and Employee list */}
        {/* {!isLoading && (
          <div className="row mt-4">
            <div className="col-md-6">
              <div className="bg-white dashboard_card mb-4 p-4">
                <h3 className="mb-4">Applicant's Status</h3>
                <DataChart data={chartData} dataType={"status"} />
              </div>
            </div>
            <div className="col-md-6">
              <AgentsEmployee
                Agentid={AdminId}
                apiCall={apiCall}
                setApiCall={setApiCall}
                heading={"Admin Dashboard"}
                user_of_page={"adminAssigned"}
              />
            </div>
          </div>
        )} */}
        {/* Activity log */}
        {!isLoading && (
          <div className="mt-4">
            <ActivityTable user_id={AdminId} user_type={"admin"} hide={true} />
          </div>
        )}
        {/* Pagination */}
        {!isLoading && (
          <Pagination
            nPages={1} // Adjust as per actual pagination logic
            currentPage={1} // Adjust as per actual pagination logic
            setCurrentPage={() => {}} // Adjust as per actual pagination logic
            total={1} // Adjust as per actual pagination logic
            count={1} // Adjust as per actual pagination logic
          />
        )}
      </div>
    </>
  );
}
