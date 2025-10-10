import React, { useEffect, useRef, useState } from "react";
import ApplicantTypeTable from "../common/ApplicantTypeTable";
import AdminHeader from "./header";
import AdminSidebar from "../admin/sidebar";
import { getallAdminData, getApplicanTypeApi } from "../../api/api";
import AddApplicantType from "../forms/admin/AddApplicantType";
import Loader from "../common/loader";

export default function ManageApplicantType(props) {
  // let [search, setSearch] = useState("");
    let [loading, setLoading] = useState(false);
  const [parentApplicant, setParentApplicant] = useState("");
  const [pageNo, setPageNo] = useState(localStorage.getItem("PageNo") || 1);
  const [allApplicantType, setAllApplicantType] = useState([]);
  const [allAdmin, setAllAdmin] = useState([]);
  const [apiCall, setApiCall] = useState(false);
  const [updateApplicantTypeData, setUpdateApplicantTypeData] = useState();
  const liRefs = useRef([]);
  let [showApplicantTypeForm, setShowApplicantTypeForm] = useState(false);
  const [columnName, setColumnName] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("DESC");

  /*Sorting Function */
  const handleSort = (columnName) => {
    setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
    setColumnName(columnName);
    setPageNo(1)
  };

  const getAllSlotsData = async () => {
    try {
      setLoading(true)
      let response = await getApplicanTypeApi("", columnName, sortOrder);
      let AdminResponse = await getallAdminData();
      setAllApplicantType(response.data.data.reverse());
      setAllAdmin(AdminResponse.data);
      setLoading(false)
    } catch (err) {
      console.log(err);
      setLoading(false)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNo,props.heading, apiCall, sortOrder, columnName]);

  /*Search Onchange function to Search applicant type data data */
  // const onSearch = (e) => {
  //   const inputValue = e.target.value;
  //   setSearch(inputValue);
  //   setPageNo(1);
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
      <div className="dashboard-main-container " id="dashboard-body">
        {/*removing class for now mt-14 */}
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
                parentApplicant={parentApplicant}
              />
            )}
            <div className="d-flex justify-content-end">
              <button
                className="font-size-3 rounded-3 btn btn-primary border-0 mr-4"
                onClick={() => {
                  setShowApplicantTypeForm(true);
                  setUpdateApplicantTypeData();
                  setParentApplicant("0")
                }}
              >
                Add Applicant Type
              </button>
              <button
                className="font-size-3 rounded-3 btn btn-primary border-0 mr-4"
                onClick={() => {
                  setShowApplicantTypeForm(true);
                  setUpdateApplicantTypeData();
                  setParentApplicant("1")
                }}
              >
                Add Sub Applicant Type
              </button>
            </div>
            {/*<-- Applicant type  Table -->*/}
           {loading?
           <Loader load={"yes"} />
           : <ApplicantTypeTable
              heading={"Applicant Type"}
              setpageNo={setPageNo}
              pageNo={pageNo}
              allApplicantType={allApplicantType}
              setApiCall={setApiCall}
              setShowApplicantTypeForm={setShowApplicantTypeForm}
              setUpdateApplicantTypeData={setUpdateApplicantTypeData}
              handleSort={handleSort}
              setParentApplicant={setParentApplicant}
            />}
          </div>
        </div>
      </div>
    </div>
  );
}
