import React from "react";
import "react-toastify/dist/ReactToastify.css";
import AdminSidebar from "../admin/sidebar";
import AdminHeader from "../admin/header";
import ActivityTable from "./activity_table";
function ActivityLog(props) {

  return (
    <>
      <div className={"site-wrapper overflow-hidden bg-default-2"}>
        {/* <!-- Header Area --> */}
        <AdminHeader heading="Activity Log" />
        {/* <!-- navbar- --> */}
        <AdminSidebar heading="Activity Log" />
        <div className={"dashboard-main-container mt-14"} id="dashboard-body">
          <div className="container-fluid">
            <div className="mb-18">
              <ActivityTable
                user_type={props.user_type}
                user_id={props.user_id}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ActivityLog;
