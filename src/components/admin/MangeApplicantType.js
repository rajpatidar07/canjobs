import React, { useEffect, useRef, useState } from "react";
import ApplicantTypeTable from "../common/ApplicantTypeTable";
import AdminHeader from "./header";
import AdminSidebar from "../admin/sidebar";
import { getallAdminData, getApplicanTypeApi } from "../../api/api";
import AddApplicantType from "../forms/admin/AddApplicantType";

export default function ManageApplicantType(props) {
  // let [search, setSearch] = useState("");
  //   let [statusFilterValue, setStatusFilterValue] = useState("");
  // const [searcherror, setSearchError] = useState("");
  const [pageNo, setpageNo] = useState(localStorage.getItem("PageNo") || 1);
  const [allApplicantType, setAllApplicantType] = useState([]);
  const [allAdmin, setAllAdmin] = useState([]);
  const [apiCall, setApiCall] = useState(false);
  const [updateApplicantTypeData, setUpdateApplicantTypeData] = useState();
  const liRefs = useRef([]);
  let [showApplicantTypeForm, setShowApplicantTypeForm] = useState(false);

  const getAllSlotsData = async () => {
    try {
      let response = await getApplicanTypeApi("");
      let Adminresponse = await getallAdminData();
      setAllApplicantType(response.data.data.reverse());
      setAllAdmin(Adminresponse.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllSlotsData();
    if (props.heading) {
      const activityLi = liRefs.current[props.heading];
      if (activityLi) {
        activityLi.scrollIntoView({ behavior: "smooth" });
      }
    }
    if (apiCall === true) {
      setApiCall(false);
    }
  }, [props.heading, apiCall]);

  /*Search Onchange function to Search applicanttypedata data */
  // const onSearch = (e) => {
  //   const inputValue = e.target.value;
  //   setSearch(inputValue);
  //   setpageNo(1);
  //   if (inputValue.length > 0) {
  //     if (/[-]?\d+(\.\d+)?/.test(inputValue.charAt(0))) {
  //       setSearchError("Applicant name cannot start with a number.");
  //     } else if (!/^[A-Za-z0-9 ]*$/.test(inputValue)) {
  //       setSearchError("Cannot use special characters.");
  //     } else {
  //       setSearchError("");
  //     }
  //   } else {
  //     setSearchError("");
  //   }
  // };
  return (
    <div className="site-wrapper overflow-hidden bg-default-2">
      <AdminHeader heading={"Manage Applicant Type"} />
      {/* <!-- navbar- --> */}
      <AdminSidebar heading={"Manage Applicant Type"} />
      <div className="dashboard-main-container mt-14" id="dashboard-body">
        <div className="container-fluid">
          <div className="mb-18">
            <div className="mb-4 align-items-center">
              <div className="page___heading">
                <h3 className="font-size-6 mb-0">Applicant Type</h3>
              </div>{" "}
            </div>
            {showApplicantTypeForm && (
              <AddApplicantType
                show={showApplicantTypeForm}
                close={() => {
                  setShowApplicantTypeForm(false);
                  setUpdateApplicantTypeData();
                }}
                setApicall={setApiCall}
                apicall={apiCall}
                admins={allAdmin}
                updateApplicantTypeData={updateApplicantTypeData}
              />
            )}
            <div className="d-flex justify-content-end">
              <button
                className="font-size-3 rounded-3 btn btn-primary border-0 mr-4"
                onClick={() => {
                  setShowApplicantTypeForm(true);
                  setUpdateApplicantTypeData();
                }}
              >
                Add Applicant Type
              </button>
            </div>
            {/*<-- Applicant type  Table -->*/}
            <ApplicantTypeTable
              heading={"Applicant Type"}
              setpageNo={setpageNo}
              pageNo={pageNo}
              allApplicantType={allApplicantType}
              setApiCall={setApiCall}
              setShowApplicantTypeForm={setShowApplicantTypeForm}
              setUpdateApplicantTypeData={setUpdateApplicantTypeData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
