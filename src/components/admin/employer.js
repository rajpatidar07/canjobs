import React, { useState , useEffect } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import CustomButton from "../common/button";
import { Link } from "react-router-dom";
import EmployerProfile from "../company/profile";
import CompanyDetails from "../forms/employer/companyDetail";
import { ToastContainer } from "react-toastify";
import EmployerTable from "../common/employerTable";
import { getJson } from "../../api/api";
function Employer() {
  // eslint-disable-next-line
  /*show modal and data, id state */
  let [apiCall, setApiCall] = useState(false);
  let [showAddEmployerModal, setShowEmployerMOdal] = useState(false);
  let [showEmployerDetails, setShowEmployerDetails] = useState(false);
  const [employerId, setEmployerID] = useState();
  /*Filter and search state */
  const [industryFilterValue, setIndutryFilterValue] = useState("");
  const [corporationFilterValue, setcorporationFilterValue] = useState("");
  const [search, setSearch] = useState("");
  const [searcherror, setSearchError] = useState("");
  let [Json , setJson] = useState([])
  /*Function to get the jSon */
 const JsonData=async()=>{
   let Json = await getJson()
   setJson(Json)
 }
 /*Function to Search employer */
 const onSearch = (e) => { setSearch(e.target.value);
  if(/[-]?\d+(\.\d+)?/.test(search) ){
    setSearchError("Admin Name can not have a number.")
  }else if(/[^a-zA-Z0-9]/g.test(search)){
    setSearchError("Cannot use special character")
  }else if(search === ""){
    setSearchError("")
  }} 
  /*Render method to get the json*/
  useEffect(()=>{
    JsonData()
    if((search === "") === true){
      setSearchError("")
    }
  },[industryFilterValue,corporationFilterValue])
  /* Function to show the single data to update Employer */
  const editEmployer = (e) => {
    // e.preventDefault();
    setShowEmployerMOdal(true);
    setEmployerID(e);
  };
  /* Function to show the Job detail data */
  const EmployerDetail = (e) => {
    // e.preventDefault();
    setShowEmployerDetails(true);
    setEmployerID(e);
  };
    /*Corporation Json for not having same data */
    const Corporation = Json.Corporation ? Json.Corporation.filter((thing, index, self) =>
    index === self.findIndex((t) => t.value === thing.value)
    ) : [];
    /*Industry Json for not having same data */
    const Industry = Json.Industry ? Json.Industry.filter((thing, index, self) =>
    index === self.findIndex((t) => t.value === thing.value)
    ) : [];
    
  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader heading={"Manage Companies"} />
        {/* <!-- navbar- --> */}
        <AdminSidebar heading={"Manage Companies"} />
        <ToastContainer />
        {/* <!-- Add Company Details Modal --> */}
        {showAddEmployerModal ? <CompanyDetails
          show={showAddEmployerModal}
          employerId={employerId}
          apiCall={apiCall}
          setApiCall={setApiCall}
          close={() => setShowEmployerMOdal(false)}
        /> : null}
        <div
          className={
            showEmployerDetails === false
              ? "dashboard-main-container mt-16"
              : "d-none"
          }
          id="dashboard-body"
        >
          <div className="container">
            <div className="mb-18">
              <div className="mb-4 align-items-center">
                <div className="page___heading">
                  <h3 className="font-size-6 mb-0">Employer</h3>
                </div>
                {/* <!-- Employer Search and Filter --> */}
                <div className="row m-0 align-items-center">
                  <div className="col p-1 form_group mb-5 mt-4">
                    <p className="input_label">Search Employer:</p>
                    <input
                      required
                      type="text"
                      className="form-control"
                      placeholder={"Search Employer"}
                      value={search}
                      name={"Employer_name"}
                      onChange={(e) => onSearch(e)}
                    />
                  </div>
                  <div className="col p-1 form_group mb-5 mt-4">
                    <p className="input_label">Filter by Corporation:</p>
                    <div className="select_div">
                      <select
                        name="corporation"
                        value={corporationFilterValue}
                        id="corporation"
                        onChange={(e) =>
                          setcorporationFilterValue(e.target.value)
                        }
                        className=" nice-select pl-7 h-100 arrow-3 arrow-3-black form-control text-black-2 w-100"
                      >
                        <option value={""}>Company Corporation</option>
                        {(Corporation || []).map(
                          (corporation) => (
                            <option key={corporation.id} value={corporation.value}>
                              {corporation.value}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="col p-1 form_group mb-5 mt-4">
                    <p className="input_label">Filter by Industry:</p>
                    <div className="select_div">
                      <select
                        name="industry"
                        value={industryFilterValue}
                        id="industry"
                        onChange={(e) => setIndutryFilterValue(e.target.value)}
                        className=" nice-select pl-7 h-100 arrow-3 arrow-3-black form-control text-black-2 w-100"
                      >
                        <option value={""}>Company Industry</option>
                        {(Industry || []).map((industry) => (
                          <option key={industry.id} value={industry.value}>
                            {industry.value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col px-1 form_group mt-4 text-right">
                    <CustomButton
                      className="font-size-3 rounded-3 btn btn-primary border-0"
                      onClick={() => editEmployer("0")}
                    >
                      Add Employer
                    </CustomButton>
                  </div>
                </div>
                <small className="text-danger">{searcherror}</small>
              </div>
              {/* <!-- Employer List Table --> */}
              <EmployerTable
                showAddEmployerModal={showAddEmployerModal}
                EmployerDetail={EmployerDetail}
                search={search}
                industryFilterValue={industryFilterValue}
                corporationFilterValue={corporationFilterValue}
                showEmployerDetails={showEmployerDetails}
                apiCall={apiCall}
                setApiCall={setApiCall}
              />
            </div>
          </div>
        </div>
        {/* <!-- Employer Details- --> */}
        {showEmployerDetails === true ? (
          <div className="dashboard-main-container mt-30">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 dark-mode-texts">
                  <Link
                    to={""}
                    onClick={() => setShowEmployerDetails(false)}
                    className="d-flex align-items-center ml-4"
                  >
                    {" "}
                    <i className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                    <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                      Back
                    </span>
                  </Link>
                </div>
              </div>{" "}
              <EmployerProfile employerId={employerId} />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Employer;
