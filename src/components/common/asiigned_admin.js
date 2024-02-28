import React, { useState } from "react";
// import CustomButton from "../common/button";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminSidebar from "../admin/sidebar";
import AdminHeader from "../admin/header";
import Admin_assigned_list from "./admin_assigned_list";
export default function Asiigned_admin() {

  /*Show modal states */
  let [apiCall, setApiCall] = useState(false);
  let [showAddEAgentModal, setShowAgentMOdal] = useState(false);
  /*data and id states */
  let [agentId, setAgentId] = useState();
  /*Filter and search state */
  const [pageNo, setpageNo] = useState(1);
  //   const [educationFilterValue, setEducationFilterValue] = useState("");
  const [search, setSearch] = useState("");
  const [searcherror, setSearchError] = useState("");
  //   let [SkillList, setSkillList] = useState([]);
  //   let [EducationList, setEducationList] = useState([]);
  let user_type = localStorage.getItem("userType");

  /* Function to show the single data to update Employee*/
//   const EditAgent = (e) => {
//     setShowAgentMOdal(true);
//     setAgentId(e);
//   };
  /*Function to search the agent */
  const onSearch = (e) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
    // setpageNo(1);
    if (inputValue.length > 0) {
      if (/[-]?\d+(\.\d+)?/.test(inputValue.charAt(0))) {
        setSearchError("Partner Name cannot start with a number.");
      } else if (!/^[A-Za-z0-9 ]*$/.test(inputValue)) {
        setSearchError("Cannot use special characters.");
      } else {
        setSearchError("");
      }
    } else {
      setSearchError("");
    }
  };
  return (
    <>
    <div className={"site-wrapper overflow-hidden bg-default-2"}>
      {/* <!-- Header Area --> */}
      <AdminHeader
        heading={
         "Assigned Admin"
        }
      />
      {/* <!-- navbar- --> */}
      <AdminSidebar
        heading={
         "Assigned Admin"
        }
      />
      <ToastContainer />
      {/* <!--Add Adgent Details Modal --> */}

      <div className={"dashboard-main-container mt-16"} id="dashboard-body">
        <div className="container-fluid">
          <div className="mb-18">
            <div
              className={
                "mb-4 align-items-center"
              }
            >
              <div className="page___heading">
                <h3 className="font-size-6 mb-0">Admin's</h3>
              </div>
              {/* <!-- Agent Search and Filter- --> */}
              <div className="row m-0 align-items-center">
                <div className={"col p-1 form_group"}>
                  <p className="input_label">Search Admin:</p>
                  <input
                    required
                    type="text"
                    className="form-control"
                    placeholder={"Search Admin"}
                    value={search}
                    name={"admin_name"}
                    onChange={(e) => onSearch(e)}
                  />
                </div>
                {/* <div className="col px-1 form_group mt-4 text-right">
                  <CustomButton
                    className="font-size-3 rounded-3 btn btn-primary border-0"
                    onClick={() => EditAdmin("0")}
                    title="Add Admin"
                  >
                    Add Admin
                  </CustomButton>
                </div> */}
              </div>
              <small className="text-danger">{searcherror}</small>
            </div>
            {/* <!-- Admi List Table- --> */}
            <Admin_assigned_list
              // showEmployeeProfile={showEmployeeProfile}
              // employeeDetails={employeeDetails}
              search={search}
              // experienceFilterValue={experienceFilterValue}
              // educationFilterValue={educationFilterValue}
              // skillFilterValue={skillFilterValue}
              apiCall={apiCall}
              setApiCall={setApiCall}
              pageNo={pageNo}
              setpageNo={setpageNo}
            //   EditAgent={EditAgent}
              user={user_type}
            />
            {/* {showAddEAgentModal ? (
              <AddAgent
                show={showAddEAgentModal}
                agentId={agentId}
                apiCall={apiCall}
                setApiCall={setApiCall}
                close={() => setShowAgentMOdal(false)}
              />
            ) : null} */}
          </div>
        </div>
      </div>
    </div>
  </>
  )
}
