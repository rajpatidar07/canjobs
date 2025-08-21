import React, { useState, useEffect } from "react";
import CustomButton from "../common/button";
import { Link } from "react-router-dom";
import EmployerProfile from "../company/profile";
import CompanyDetails from "../forms/employer/companyDetail";
import EmployerTable from "../common/employerTable";
import { GetFilter } from "../../api/api";
import CommonThreeDots from  "../common/Common function/commonThreeDots";
import SelectBox from "../common/Common function/SelectBox";

function Employer() {
  /*show modal and data, id state */
  let [apiCall, setApiCall] = useState(false);
  let [showAddEmployerModal, setShowEmployerMOdal] = useState(false);
  let [showEmployerDetails, setShowEmployerDetails] = useState(false);
  const [employerId, setEmployerID] = useState();
  const [pageNo, setpageNo] = useState(localStorage.getItem("PageNo") || 1);
  /*Filter and search state */
  const [industryFilterValue, setIndutryFilterValue] = useState("");
  const [corporationFilterValue, setcorporationFilterValue] = useState("");
  const [search, setSearch] = useState("");
  const [searcherror, setSearchError] = useState("");
  let [Json, setJson] = useState([]);

  /*Function to get the jSon */
  const JsonData = async () => {
    try {
      let Json = await GetFilter();
      if (Json.data.message === "No data found") {
        setJson([]);
      } else {
        setJson(Json.data.data);
      }
      setJson(Json.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  /*Function to Search employer */
  const onSearch = (e) => {
    setSearch(e.target.value);
    setpageNo(1);
    if (/[^a-zA-Z0-9]/g.test(search)) {
      setSearchError("Cannot use special character");
    } else if (search === "") {
      setSearchError("");
    }
  };
  /*Render method to get the json*/
  useEffect(() => {
    JsonData();
    if ((search === "") === true) {
      setSearchError("");
    }
    // eslint-disable-next-line
  }, [industryFilterValue, corporationFilterValue]);
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
  const Corporation =
    Json && Json.Corporation
      ?
      Json.Corporation.filter(
        (thing, index, self) =>
          index === self.findIndex((t) => t.value === thing.value)
      ).map((option) => ({
        value: option.value,
        label: option.value,
      }))
      : [];
  /*Industry Json for not having same data */
  const Industry =
    Json && Json.Industry
      ? Json.Industry.filter(
        (thing, index, self) =>
          index === self.findIndex((t) => t.value === thing.value)
      ).map((option) => ({
        value: option.value,
        label: option.value,
      }))
      : [];

  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        {/* <AdminHeader heading={"Manage Employers"} /> */}
        {/* <!-- navbar- --> */}
        {/* <AdminSidebar heading={"Manage Employers"} /> */}

        {/* <!-- Add Company Details Modal --> */}
        {showAddEmployerModal ? (
          <CompanyDetails
            show={showAddEmployerModal}
            employerId={employerId}
            apiCall={apiCall}
            setApiCall={setApiCall}
            close={() => setShowEmployerMOdal(false)}
          />
        ) : null}
        <div
          className={
            showEmployerDetails === false
              ? "dashboard-main-container mt-14"
              : "d-none"
          }
          id="dashboard-body"
        >
          <div className="container-fluid">
            <div className="mb-18">
              <div className="mb-4 align-items-center">
                <div className="page___heading">
                  <h3 className="font-size-6 mb-0">Employer</h3>
                </div>
                {/* <!-- Employer Search and Filter --> */}
                <div className="row m-0 align-items-center">
                  <div className="col p-1 form_group mb-3">
                    <p className="input_label">Search:</p>
                    <input
                      required
                      type="text"
                      className="form-control"
                      placeholder={"Employer name"}
                      value={search}
                      name={"Employer_name"}
                      onChange={(e) => onSearch(e)}
                      maxLength={30}
                    />
                  </div>
                  <div className="col p-1 form_group mb-3">
                    <p className="input_label">Filter by Corporation:</p>
                    <div className="select_div">
                      <SelectBox
                        Width={"yes"} options={Corporation}
                        selectedValue={corporationFilterValue}
                        onChange={(e) => {
                          setcorporationFilterValue(e ? e.value : null)
                          setpageNo(1)
                        }}
                        type={"corporation"}
                      />
                    </div>
                  </div>
                  <div className="col p-1 form_group mb-3">
                    <p className="input_label">Filter by Industry:</p>
                    <div className="select_div">
                      <SelectBox
                        Width={"yes"} options={Industry}
                        selectedValue={industryFilterValue}
                        onChange={(e) => {
                          setIndutryFilterValue(e ? e.value : null)
                          setpageNo(1)
                        }}
                        type={"industry"}
                      />
                    </div>
                  </div>
                  <div className="col p-1 d-flex justify-content-evenly ">
                    <div className=" w-100 form_group mt-3 text-right">
                      <CustomButton
                        style={{ height: "32px" }}
                        className="font-size-3 btn-block rounded-3 btn btn-primary border-0"
                        onClick={() => {
                          setpageNo(1)
                          setIndutryFilterValue(null)
                          setcorporationFilterValue(null)
                          setSearch("")
                        }}
                      >
                        Reset
                      </CustomButton>
                    </div>
                  </div>
                  <div className="col p-1 d-flex justify-content-evenly ">
                    <div className=" w-100 form_group mt-3 text-right">
                      <CustomButton
                        style={{ height: "32px" }}
                        className="font-size-3 btn-block rounded-3 btn btn-primary border-0"
                        onClick={() => editEmployer("0")}
                      >
                        Add Employer
                      </CustomButton>
                    </div>
                    <div className=" mt-6 text-right">
                      <CommonThreeDots tableName={"employer"} />
                    </div>
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
                pageNo={pageNo}
                setpageNo={setpageNo}
              />
            </div>
          </div>
        </div>
        {/* <!-- Employer Details- --> */}
        {showEmployerDetails === true ? (
          <div className="dashboard-main-container mt-14">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-12 dark-mode-texts">
                  <div className="mb-9">
                    <Link
                      to={""}
                      onClick={() => setShowEmployerDetails(false)}
                      className="d-flex align-items-center ml-4"
                    >
                      <i className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8 mt-10"></i>
                      <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                        Back
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
              <EmployerProfile employerId={employerId} />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Employer;
