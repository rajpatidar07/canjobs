import React, { useEffect, useRef, useState } from "react";
// import { Button, Form, InputGroup } from "react-bootstrap";
import GlobalSearchCard from "./globalSearchCard";
import { getallAdminData, GlobalSearchResult,/* GlobalSearchResultOther,*/ GlobalSearchResultRelated  } from "../../api/api";
import { FaSearch } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
function GlobalSearch() {
  const [show, setShow] = useState(false);
  let [search, setSearch] = useState("");
  let [adminList, setAdminList] = useState([]);
  let [searchData, setSearchData] = useState([]);
  let admin_id = localStorage.getItem("admin_id")
  let admin_type = localStorage.getItem("admin_type")
  const inputRef = useRef(null);
  
  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus();
    }
  }, [show]);

  /*Global Search API Call*/
  const GlobalSearchAPICall = async (admin) => {
    // let search = "";
    // search = e.target.value;
    // setIsLoading(true);
    try {
      const userData = await GlobalSearchResult(search, admin ? admin_id : "", admin ? admin_type : "");
      // const userDataOther = await GlobalSearchResultOther(search, admin ? admin_id : "", admin ? admin_type : "");
      const userDataRelated = await GlobalSearchResultRelated(search, admin ? admin_id : "", admin ? admin_type : "");
      const getAllAdmin = await getallAdminData()

      setAdminList(getAllAdmin.data)
      const data1 = userData.data.data || {};
      // const data2 = userDataOther.data.data || {};
      const data3 = userDataRelated.data.data || {};

      // Combine all keys and merge arrays for matching keys
      const mergedData = {};

      // Helper to merge objects
      const mergeData = (source) => {
        Object.entries(source).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            mergedData[key] = (mergedData[key] || []).concat(value);
          }
        });
      };

      mergeData(data1);
      // mergeData(data2);
      mergeData(data3);

      setSearchData(mergedData);
      console.log("Merged Data:", mergedData);
      // setIsLoading(false);
    } catch (err) {
      console.log(err);
      // setIsLoading(false);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      GlobalSearchAPICall();
    }
  };
  const close = () => {
    setShow(false)
    setSearchData([])
    setSearch("")
  }
  /*Parse the data of the notify_json */
  // const parseJsonSafely = (jsonString) => {
  //   try {
  //     return jsonString ? JSON.parse(jsonString) : {};
  //   } catch (error) {
  //     console.error("Invalid JSON in notif_json:", jsonString, error);
  //     return {};
  //   }
  // };
  return (
    <div className="global_search_box">
      <span
        style={{ cursor: "pointer" }}
        className=" text-white mx-5"
        onClick={() => setShow(true)}
        title="Global Search"
      >
        <FaSearch />
      </span>
      <div
        className={show ? " d-flex global_search_content position-fixed show" : " d-flex global_search_content position-fixed"}>
        <div className="left_side" onClick={() => setShow(false)}></div>
        <div className="right_side bg-white">
          <div className="global_search d-flex align-items-center p-3 px-5 ">
            <div className="col">
              <div className="input-group mb-3 ">
                <input
                  required
                  type="text"
                  className="form-control"
                  placeholder="Search Candidate"
                  name="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={handleKeyPress}
                  ref={inputRef}

                />
                <div className="input-group-append">
                  <button
                    className=""
                    type="button"
                    onClick={() => GlobalSearchAPICall(false)}
                    style={{
                      background: "#fff",
                      border: "1px solid #ccc",
                      borderTopRightRadius: 5,
                      borderBottomRightRadius: 5,
                      outline: 0,
                    }}
                  >
                    <CiSearch />
                  </button>
                </div>
              </div>
              <div className="input-group mb-3 px-2 d-none">
                <div><Link to="" className="text-dark" onClick={() => { GlobalSearchAPICall(true) }}>@ I'am assigned to</Link></div>
              </div>
            </div>
            {/* <InputGroup className="search_box d-flex align-items-center position-relative">
              <Form.Control
                type="text"
                placeholder="Search Candidates, Clients etc"
                aria-describedby="basic-addon2"
                onChange={(e) => GlobalSearchAPICall(e)}
              />
              <Button
                // href={undefined}
                style={{ position: "absolute", right: "5px" }}
                className="fas fa-search text-dark"
              ></Button>
            </InputGroup> */}
            <i
              style={{ fontSize: "22px" }}
              className="fas fa-times text-dark mb-15"
              onClick={() => {
                close()
              }}
            ></i>
          </div>
          <div className="global_search_result py-2 px-8 mb-12">
            {/* Display search results or Not Found message */}
            {Object.keys(searchData).some(key => searchData[key] && searchData[key].length > 0) ? (
              <>
                {searchData["employee"] && searchData["employee"].length > 0 && (
                  <div className="row">
                    <h4 className="w-100 border-bottom font-weight-bold m-0  text-uppercase" style={{ color: '#007bff' }}>
                      Applicants
                    </h4>
                    {searchData["employee"].map((data) => (
                      <div className="col-lg-2 col-sm-6"> <GlobalSearchCard
                        close={close}
                        to={`/${data.employee_id}`}
                        key={data.employee_id}
                        name={data.name}
                        mobile={data.contact_no}
                        email={data.email}
                      />
                      </div>
                    ))}
                  </div>
                )}
                {searchData["employer"] && searchData["employer"].length > 0 && (
                  <div className="row">
                    <h4 className="w-100 border-bottom font-weight-bold m-0  text-uppercase" style={{ color: '#28a745' }}>
                      Clients
                    </h4>
                    {searchData["employer"].map((data) => (
                      <div className="col-lg-2 col-sm-6"> <GlobalSearchCard
                        close={close}
                        key={data.company_id}
                        name={data.contact_person_name}
                        mobile={data.contact_no}
                        email={data.email}
                        company={data.company_name}
                        id={data.company_id}
                        to={`/client_detail`}
                        title="Client Details"
                      />
                      </div>
                    ))}
                  </div>
                )}
                {searchData["agent"] && searchData["agent"].length > 0 && (
                  <div className="row">
                    <h4 className="w-100 border-bottom font-weight-bold m-0  text-uppercase" style={{ color: '#fd7e14' }}>
                      Partners
                    </h4>
                    {searchData["agent"].map((data) => (
                      <div className="col-lg-2 col-sm-6"> <GlobalSearchCard
                        close={close}
                        key={data.id}
                        name={data.name}
                        mobile={data.contact_no}
                        email={data.email}
                        to={`/partner_profile`}
                        title="Partner Profile"
                        id={data.id}
                      />
                      </div>
                    ))}
                  </div>
                )}
                {searchData["admin"] && searchData["admin"].length > 0 && (
                  <div className="row">
                    <h4 className="w-100 border-bottom font-weight-bold m-0  text-uppercase" style={{ color: '#6f42c1' }}>
                      Admins
                    </h4>
                    {searchData["admin"].map((data) => (
                      <div className="col-lg-2 col-sm-6"> <GlobalSearchCard
                        close={close}
                        key={data.admin_id}
                        name={data.name}
                        mobile={data.contact_no}
                        email={data.email}
                      />
                      </div>
                    ))}
                  </div>
                )}
                {searchData["task_data"] && searchData["task_data"].length > 0 && (
                  <div className="row">
                    <h4 className="w-100 border-bottom font-weight-bold m-0  text-uppercase" style={{ color: '#dc3545' }}>
                      Task
                    </h4>
                    {searchData["task_data"].map((data) => (
                      <div className="col-lg-2 col-sm-6"> <GlobalSearchCard
                        close={close}
                        key={data.employee_id}
                        name={data.employee_name || data.subject_description}
                        // to={data.employee_type === "employer"
                        //   ? `/client_detail?docId=${data.doc_id
                        //   }&docParentId=${parseJsonSafely(data?.notif_json)
                        //     .doc_parent_id || ""
                        //   }&annotationId=${parseJsonSafely(data?.notif_json)
                        //     .annotation_id || ""
                        //   }&taskId=${parseJsonSafely(data?.notif_json).task_id || ""
                        //   }`
                        //   : data.employee_type === "applicant_type"
                        //     ? `/slots?sId=${data.interested_in}&docId=${data.doc_id}&docParentId=${parseJsonSafely(data?.notif_json)
                        //       .doc_parent_id || ""
                        //     }&annotationId=${parseJsonSafely(data?.notif_json)
                        //       .annotation_id || ""
                        //     }&taskId=${parseJsonSafely(data?.notif_json).task_id || ""
                        //     }`
                        //     : data.employee_type === "job"
                        //       ? `/job_detail?docId=${data.doc_id
                        //       }&docParentId=${parseJsonSafely(data?.notif_json)
                        //         .doc_parent_id || ""
                        //       }&annotationId=${parseJsonSafely(data?.notif_json)
                        //         .annotation_id || ""
                        //       }&taskId=${parseJsonSafely(data?.notif_json).task_id || ""
                        //       }`
                        //       : `/${data.employee_id}?docId=${data.doc_id
                        //       }&docParentId=${parseJsonSafely(data?.notif_json)
                        //         .doc_parent_id || ""
                        //       }&annotationId=${parseJsonSafely(data?.notif_json)
                        //         .annotation_id || ""
                        //       }&taskId=${parseJsonSafely(data?.notif_json).task_id || ""
                        //       }`}
                        email={data.document_name || data.assigned_to}
                      />
                      </div>
                    ))}
                  </div>
                )}
                {searchData["lmia_data"] && searchData["lmia_data"].length > 0 && (
                  <div className="row">
                    <h4 className="w-100 border-bottom font-weight-bold m-0  text-uppercase" style={{ color: '#20c997' }}>
                      LMIA
                    </h4>
                    {searchData["lmia_data"].map((data) => (
                      <div className="col-lg-2 col-sm-6"> <GlobalSearchCard
                        close={close}
                        key={data.id}
                        name={data.name}
                        mobile={data.status}
                        email={data.type}
                        to={"/lmia"}
                      />
                      </div>
                    ))}
                  </div>
                )}
                 {searchData["job_data"] && searchData["job_data"].length > 0 && (
                  <div className="row">
                    <h4 className="w-100 border-bottom font-weight-bold m-0  text-uppercase" style={{ color: '#e83e8c' }}>
                      Jobs
                    </h4>
                    {searchData["job_data"].map((data) => (
                      <div className="col-lg-2 col-sm-6"> <GlobalSearchCard
                        close={close}
                        key={data.job_id}
                        name={data.job_title}
                        mobile={data.location	}
                        email={data.salary}
                        to={"/job"}
                      />
                      </div>
                    ))}
                  </div>
                )}
                {searchData["visa_data"] && searchData["visa_data"].length > 0 && (
                  <div className="row">
                    <h4 className="w-100 border-bottom font-weight-bold m-0  text-uppercase" style={{ color: '#fd7e14' }}>
                      Visa
                    </h4>
                    {searchData["visa_data"].map((data) => (
                      <div className="col-lg-2 col-sm-6"> <GlobalSearchCard
                        close={close}
                        key={data.id}
                        name={data.name}
                        mobile={data.status}
                        email={data.type}
                        to={"/visa"}
                      />
                      </div>
                    ))}
                  </div>
                )}
                  {searchData["interview_data"] && searchData["interview_data"].length > 0 && (
                  <div className="row">
                    <h4 className="w-100 border-bottom font-weight-bold m-0  text-uppercase" style={{ color: '#20c997' }}>
                      Interview
                    </h4>
                    {searchData["interview_data"].map((data) => (
                      <div className="col-lg-2 col-sm-6"> <GlobalSearchCard
                        close={close}
                        key={data.id}
                        name={data.name}
                        mobile={data.status}
                        email={data.type}
                        to={"/interview"}
                      />
                      </div>
                    ))}
                  </div>
                )}
                {searchData["applicant_type_group_chat"] && searchData["applicant_type_group_chat"].length > 0 && (
                  <div className="row">
                    <h4 className="w-100 border-bottom font-weight-bold m-0  text-uppercase" style={{ color: '#fd7e14' }}>
                      Group discussion
                    </h4>
                    {searchData["applicant_type_group_chat"].map((data) => (
                      <div className="col-lg-2 col-sm-6"> <GlobalSearchCard
                        close={close}
                        key={data.id}
                        name={data.name}
                        mobile={data.contact_no}
                        email={data.email}
                      />
                      </div>
                    ))}
                  </div>
                )}
                {searchData["applicant_type_candidate_chat"] && searchData["applicant_type_candidate_chat"].length > 0 && (
                  <div className="row">
                    <h4 className="w-100 border-bottom font-weight-bold m-0  text-uppercase" style={{ color: '#007bff' }}>
                      Candidate discussion
                    </h4>
                    {searchData["applicant_type_candidate_chat"].map((data) => (
                      <div className="col-lg-2 col-sm-6"> <GlobalSearchCard
                        close={close}
                        key={data.id}
                        name={data.name}
                        mobile={data.contact_no}
                        email={data.email}
                      />
                      </div>
                    ))}
                  </div>
                )}
                {searchData["document"] && searchData["document"].length > 0 && (
                  <div className="row">
                    <h4 className="w-100 border-bottom font-weight-bold m-0  text-uppercase" style={{ color: '#6f42c1' }}>
                      Documents
                    </h4>
                    {searchData["document"].map((data) => (
                      <div className="col-lg-2 col-sm-6"> <GlobalSearchCard
                        close={close}
                        key={data.id}
                        name={data.name}
                        mobile={data.hour_log_of_admin}
                        email={data.admin_name}
                      />
                      </div>
                    ))}
                  </div>
                )}
                {searchData["call_log"] && searchData["call_log"].length > 0 && (
                  <div className="row">
                    <h4 className="w-100 border-bottom font-weight-bold m-0  text-uppercase" style={{ color: '#e83e8c' }}>
                      Daily call logs
                    </h4>
                    {searchData["call_log"].map((data) => (
                      <div className="col-lg-2 col-sm-6"> <GlobalSearchCard
                        close={close}
                        key={data.id}
                        name={data.name}
                        mobile={data.phone}
                        email={data.purpose}
                        to={`/daily_pages?call_logId=${data.id}`}
                      />
                      </div>
                    ))}
                  </div>
                )}
                {searchData["daily_hour_log"] && searchData["daily_hour_log"].length > 0 && (
                  <div className="row">
                    <h4 className="w-100 border-bottom font-weight-bold m-0  text-uppercase" style={{ color: '#20c997' }}>
                      Daily Hour logs
                    </h4>
                    {searchData["daily_hour_log"].map((data) => (
                      <div className="col-lg-2 col-sm-6"> <GlobalSearchCard
                        close={close}
                        key={data.id}
                        name={data.item}
                        mobile={adminList.find((item) => item.admin_id === data.hour_log_of_admin)?.email}
                        email={data.email}
                        to={`/daily_pages?hour_logId=${data.id}`}
                      />
                      </div>))}
                  </div>
                )}
                {searchData["consultation_data"] && searchData["consultation_data"].length > 0 && (
                  <div className="row">
                    <h4 className="w-100 border-bottom font-weight-bold m-0  text-uppercase" style={{ color: '#6f42c1' }}>
                      Consultation
                    </h4>
                    {searchData["consultation_data"].map((data) => (
                      <div className="col-lg-2 col-sm-6"> <GlobalSearchCard
                        close={close}
                        key={data.id}
                        name={data.applicant_name}
                        mobile={data.phone}
                        email={data.email}
                        to={`/daily_pages?consultation_id=${data.id}`}
                      />
                      </div>))}
                  </div>
                )}
              </>
            ) : (
              (search && searchData.length !== 0) ? <div className="col-12 text-center">
                {/* Display Pathways Logo */}
                <div className="col-12 mb-3">
                  <img src="image/logo-main-black.png" alt="Pathways Logo" className="img-fluid" />
                </div>
                <h4 className="w-100 border-bottom font-weight-bold m-0" style={{ color: '#dc3545' }}>Not result Found</h4>
                <div className="mt-3">
                  <p className="w-100 border-bottom font-weight-bold">Do you want to create a profile? Please consider one of the links below:</p>
                  <Link to="/selfemployee" className="btn btn-primary mr-2">Create Applicant</Link>
                  <Link to="/adminclient" className="btn btn-primary">Create Client</Link>
                </div>
              </div>
                : null)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GlobalSearch;
