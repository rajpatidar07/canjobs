import React, { useEffect, useRef, useState } from "react";
// import { Button, Form, InputGroup } from "react-bootstrap";
import GlobalSearchCard from "./globalSearchCard";
import { getallAdminData, getApplicanTypeApi, GlobalSearchResult, GlobalSearchResultOther, GlobalSearchResultRelated } from "../../api/api";
import { FaSearch } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
function GlobalSearch() {
  const [show, setShow] = useState(false);
  let [search, setSearch] = useState("");
  let [adminList, setAdminList] = useState([]);
  let [applicantTypeList, setApplicantTypeList] = useState([]);
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
      const userDataOther = await GlobalSearchResultOther(search, admin ? admin_id : "", admin ? admin_type : "");
      const userDataRelated = await GlobalSearchResultRelated(search, admin ? admin_id : "", admin ? admin_type : "");
      const getAllAdmin = await getallAdminData()
      const getAllApplicantType = await getApplicanTypeApi()

      setAdminList(getAllAdmin.data)
      setApplicantTypeList(getAllApplicantType.data.data)
      const data1 = userData.data.data || {};
      const data2 = userDataOther.data.data || {};
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
      mergeData(data2);
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
  const parseJsonSafely = (jsonString) => {
    try {
      return jsonString ? JSON.parse(jsonString) : {};
    } catch (error) {
      console.error("Invalid JSON in doctaskjson:", jsonString, error);
      return {};
    }
  };
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
                        name={data.franchise}
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
                {searchData["document_data"] && searchData["document_data"].length > 0 && (
                  <div className="row">
                    <h4 className="w-100 border-bottom font-weight-bold m-0  text-uppercase" style={{ color: '#dc3545' }}>
                      Documents
                    </h4>
                    {searchData["document_data"].map((data) => (
                      <div className="col-lg-2 col-sm-6"> <GlobalSearchCard
                        close={close}
                        key={data.employee_id}
                        name={data.employee_name || data.subject_description}
                        to={data.employee_type === "employer"
                          ? `/client_detail?docId=${data.doc_id
                          }&docParentId=${data.doc_parent_id
                          }&annotationId=${parseJsonSafely(data?.doctaskjson)
                            .id || ""
                          }&taskId=${data?.id || ""
                          }`
                          : data.employee_type === "applicant_type"
                            ? `/slots?sId=${data.employee_id}&docId=${data.doc_id}&docParentId=${data.doc_parent_id
                            }&annotationId=${parseJsonSafely(data?.doctaskjson)
                              .id || ""}&taskId=${data?.id || ""
                            }`
                            : data.employee_type === "job"
                              ? `/job_detail?docId=${data.doc_id
                              }&docParentId=${data.doc_parent_id}&annotationId=${parseJsonSafely(data?.doctaskjson)
                                .id || ""
                              }&taskId=${data?.id || ""
                              }`
                              : `/${data.employee_id}?docId=${data.doc_id
                              }&docParentId=${data.doc_parent_id}&annotationId=${parseJsonSafely(data?.doctaskjson)
                                .id || ""
                              }&taskId=${data?.id || ""
                              }`}
                        email={data.document_name || data.assigned_to}
                        onClick={() => {
                          if (data.employee_type === "applicant_type") {
                            localStorage.setItem("applicantType", data.employee_id);
                            localStorage.setItem(
                              "applicantTypeFolderId",
                              data.doc_parent_id
                            );
                          } else if (data.employee_type === "employer") {
                            localStorage.setItem("company_id", data.employee_id);
                          } else if (data.employee_type === "job") {
                            localStorage.setItem("job_id", data.employee_id);
                          }
                        }}

                      />
                      </div>
                    ))}
                  </div>
                )}
                {searchData["document_reply_data"] && searchData["document_reply_data"].length > 0 && (
                  <div className="row">
                    <h4 className="w-100 border-bottom font-weight-bold m-0  text-uppercase" style={{ color: '#dc3545' }}>
                      Documents
                    </h4>
                    {searchData["document_reply_data"].map((data) => (
                      <div className="col-lg-2 col-sm-6"> <GlobalSearchCard
                        close={close}
                        key={data.employee_id}
                        name={data.msg}
                        to={data.employee_type === "employer"
                          ? `/client_detail?docId=${data.doc_id
                          }&docParentId=${data.doc_parent_id
                          }&annotationId=${parseJsonSafely(data?.doctaskjson)
                            .id || ""
                          }&taskId=${data?.id || ""
                          }`
                          : data.employee_type === "applicant_type"
                            ? `/slots?sId=${data.employee_id}&docId=${data.doc_id}&docParentId=${data.doc_parent_id
                            }&annotationId=${parseJsonSafely(data?.doctaskjson)
                              .id || ""}&taskId=${data?.id || ""
                            }`
                            : data.employee_type === "job"
                              ? `/job_detail?docId=${data.doc_id
                              }&docParentId=${data.doc_parent_id}&annotationId=${parseJsonSafely(data?.doctaskjson)
                                .id || ""
                              }&taskId=${data?.id || ""
                              }`
                              : `/${data.employee_id}?docId=${data.doc_id
                              }&docParentId=${data.doc_parent_id}&annotationId=${parseJsonSafely(data?.doctaskjson)
                                .id || ""
                              }&taskId=${data?.id || ""
                              }`}
                        email={data.document_name || data.assigned_to}
                        onClick={() => {
                          if (data.employee_type === "applicant_type") {
                            localStorage.setItem("applicantType", data.employee_id);
                            localStorage.setItem(
                              "applicantTypeFolderId",
                              data.doc_parent_id
                            );
                          } else if (data.employee_type === "employer") {
                            localStorage.setItem("company_id", data.employee_id);
                          } else if (data.employee_type === "job") {
                            localStorage.setItem("job_id", data.employee_id);
                          }
                        }}

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
                        to={`/managetasks?taskId=${data?.id || ""
                          }&replyId=${parseJsonSafely(data?.notif_json).reply_id || ""
                          }`}
                        email={data.document_name || data.assigned_to}
                      />
                      </div>
                    ))}
                  </div>
                )}
                {searchData["task_reply_data"] && searchData["task_reply_data"].length > 0 && (
                  <div className="row">
                    <h4 className="w-100 border-bottom font-weight-bold m-0  text-uppercase" style={{ color: '#dc3545' }}>
                      Task Reply
                    </h4>
                    {searchData["task_reply_data"].map((data) => (
                      <div className="col-lg-2 col-sm-6"> <GlobalSearchCard
                        close={close}
                        key={data.employee_id}
                        name={data.msg}
                        to={`/managetasks?taskId=${data?.task_id || ""
                          }&replyId=${data?.id || ""
                          }`}
                        email={data.document_name || data.assigned_to}
                      />
                      </div>
                    ))}
                  </div>
                )}
                {searchData["note_data"] && searchData["note_data"].length > 0 && (
                  <div className="row">
                    <h4 className="w-100 border-bottom font-weight-bold m-0  text-uppercase" style={{ color: '#20c997' }}>
                      Note
                    </h4>
                    {searchData["note_data"].map((data) => (
                      <div className="col-lg-2 col-sm-6"> <GlobalSearchCard
                        close={close}
                        key={data.id}
                        name={data.subject_description}
                        mobile={data.subject}
                        email={data.employee_name ? `${data.employee_name} (candidate)` : ""}
                        to={data.employee_type === "employer"
                          ? `/client_detail?note=true&noteid=${data.id}`
                          : data.employee_type === "agent" &&
                            window.location.pathname === "/partner_profile"
                            ? `?note=true&noteid=${data?.id}`
                            : data.employee_type === "agent"
                              ? `/partner_profile?note=true&noteid=${data?.id}`
                              : data.employee_type === "job"
                                ? `/job_detail?note=true&noteid=${data.id
                                }`
                                : `/${data.employee_id}?note=true&noteid=${data.id
                                }`}
                      />
                      </div>
                    ))}
                  </div>
                )}
                {searchData["note_reply_data"] && searchData["note_reply_data"].length > 0 && (
                  <div className="row">
                    <h4 className="w-100 border-bottom font-weight-bold m-0  text-uppercase" style={{ color: '#20c997' }}>
                      Note
                    </h4>
                    {searchData["note_reply_data"].map((data) => (
                      <div className="col-lg-2 col-sm-6"> <GlobalSearchCard
                        close={close}
                        key={data.id}
                        name={data.msg}
                        mobile={data.subject}
                        email={data.employee_name ? `${data.employee_name} (candidate)` : ""}
                        to={data.employee_type === "employer"
                          ? `/client_detail?note=true&noteid=${data.task_id}&replyId=${data.id || ""}`
                          : data.employee_type === "agent" &&
                            window.location.pathname === "/partner_profile"
                            ? `?note=true&noteid=${data?.id}&replyId=${data.id || ""}`
                            : data.employee_type === "agent"
                              ? `/partner_profile?note=true&noteid=${data?.id}&replyId=${data.id || ""}`
                              : data.employee_type === "job"
                                ? `/job_detail?note=true&noteid=${data.task_id
                                }&replyId=${data.id || ""}`
                                : `/${data.employee_id}?note=true&noteid=${data.task_id
                                }&replyId=${data.id || ""}`}
                      />
                      </div>
                    ))}
                  </div>
                )}
                {searchData["partner_data"] && searchData["partner_data"].length > 0 && (
                  <div className="row">
                    <h4 className="w-100 border-bottom font-weight-bold m-0  text-uppercase" style={{ color: '#20c997' }}>
                      Partner Chat of candidate
                    </h4>
                    {searchData["partner_data"].map((data) => (
                      <div className="col-lg-2 col-sm-6"> <GlobalSearchCard
                        close={close}
                        key={data.id}
                        name={data.subject_description}
                        mobile={`${data.employee_name}`}
                        email={`Assigned to : ${data.assigned_to_name}`}
                        to={`/${data.employee_id}?partner=${data.id}`}
                      />
                      </div>
                    ))}
                  </div>
                )}

                {searchData["partnerchat_data"] && searchData["partnerchat_data"].length > 0 && (
                  <div className="row">
                    <h4 className="w-100 border-bottom font-weight-bold m-0  text-uppercase" style={{ color: '#20c997' }}>
                      Partner Admin Chat
                    </h4>
                    {searchData["partnerchat_data"].map((data) => (
                      <div className="col-lg-2 col-sm-6"> <GlobalSearchCard
                        close={close}
                        key={data.id}
                        name={data.subject_description}
                        mobile={`${data.employee_name} (candidate)`}
                        email={`Assigned to : ${data.assigned_to_name}`}
                        to={`/partner_profile?partner=${data.employee_id}`}
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
                        mobile={data.location}
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
                {searchData["applicant_type_group_chat_data"] && searchData["applicant_type_group_chat_data"].length > 0 && (
                  <div className="row">
                    <h4 className="w-100 border-bottom font-weight-bold m-0  text-uppercase" style={{ color: '#fd7e14' }}>
                      Group discussion
                    </h4>
                    {searchData["applicant_type_group_chat_data"].map((data) => (
                      <div className="col-lg-2 col-sm-6">
                        <GlobalSearchCard
                          close={close}
                          key={data.id}
                          name={data.subject_description}
                          mobile={applicantTypeList?.find((item) => item.id === data.employee_id)?.title}
                          email={data.email}
                          onClick={() => {
                            localStorage.setItem(
                              "applicantType",
                              data.employee_id)
                          }}
                          to={`/slots?sId=${data.employee_id}&notifiType=group&taskId=${data.id || ""
                            }&replyId=${parseJsonSafely(data?.notif_json).reply_id || ""}`}
                        />
                      </div>
                    ))}
                  </div>
                )}
                {searchData["applicant_type_group_chat_reply_data"] && searchData["applicant_type_group_chat_reply_data"].length > 0 && (
                  <div className="row">
                    <h4 className="w-100 border-bottom font-weight-bold m-0  text-uppercase" style={{ color: '#fd7e14' }}>
                      Group discussion reply
                    </h4>
                    {searchData["applicant_type_group_chat_reply_data"].map((data) => (
                      <div className="col-lg-2 col-sm-6">
                        <GlobalSearchCard
                          close={close}
                          key={data.id}
                          name={data.msg}
                          mobile={applicantTypeList?.find((item) => item.id === data.employee_id)?.title}
                          email={data.email}
                          onClick={() => {
                            localStorage.setItem(
                              "applicantType",
                              data.employee_id)
                          }}
                          to={`/slots?sId=${data.employee_id}&notifiType=group&taskId=${data.id || ""
                            }&replyId=${parseJsonSafely(data?.notif_json).reply_id || ""}`}
                        />
                      </div>
                    ))}
                  </div>
                )}
                {searchData["applicant_type_candidate_chat_data"] && searchData["applicant_type_candidate_chat_data"].length > 0 && (
                  <div className="row">
                    <h4 className="w-100 border-bottom font-weight-bold m-0  text-uppercase" style={{ color: '#007bff' }}>
                      Candidate discussion
                    </h4>
                    {searchData["applicant_type_candidate_chat_data"].map((data) => (
                      <div className="col-lg-2 col-sm-6"> <GlobalSearchCard
                        close={close}
                        key={data.id}
                        name={data.subject_description}
                        email={applicantTypeList?.find((item) => item.id === data.interested_in_id	)?.title}
                        mobile={data.employee_name}
                        onClick={() => {
                          localStorage.setItem(
                            "applicantType",
                            data.interested_in_id	)
                        }}
                        to={`/slots?sId=${data.interested_in_id}&notifiType=candidate&taskId=${data.id || ""
                          }&replyId=${parseJsonSafely(data?.notif_json).reply_id || ""}&canId=${data.employee_id}`}
                      />
                      </div>
                    ))}
                  </div>
                )}
                {searchData["applicant_type_candidate_chat_reply_data"] && searchData["applicant_type_candidate_chat_reply_data"].length > 0 && (
                  <div className="row">
                    <h4 className="w-100 border-bottom font-weight-bold m-0  text-uppercase" style={{ color: '#007bff' }}>
                      Candidate discussion reply
                    </h4>
                    {searchData["applicant_type_candidate_chat_reply_data"].map((data) => (
                      <div className="col-lg-2 col-sm-6"> <GlobalSearchCard
                        close={close}
                        key={data.id}
                        name={data.msg}
                        email={applicantTypeList?.find((item) => item.id === data.employee_id)?.title}
                        mobile={data.employee_name}
                        onClick={() => {
                          localStorage.setItem(
                            "applicantType",
                            data.employee_id)
                        }}
                        to={`/slots?sId=${data.interested_in_id}&notifiType=candidate&taskId=${data.id || ""
                          }&replyId=${parseJsonSafely(data?.notif_json).reply_id || ""}&canId=${data.employee_id}`}
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
                {searchData["call_log_chat_data"] && searchData["call_log_chat_data"].length > 0 && (
                  <div className="row">
                    <h4 className="w-100 border-bottom font-weight-bold m-0  text-uppercase" style={{ color: '#e83e8c' }}>
                      Daily call logs chat
                    </h4>
                    {searchData["call_log_chat_data"].map((data) => (
                      <div className="col-lg-2 col-sm-6"> <GlobalSearchCard
                        close={close}
                        key={data.id}
                        name={data.subject_description}
                        mobile={data.phone}
                        email={data.purpose}
                        to={`/daily_pages?call_logId=${data.employee_id}&taskId=${data?.id || ""}`}
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
