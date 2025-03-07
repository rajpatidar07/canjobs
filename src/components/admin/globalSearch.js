import React, { useState } from "react";
// import { Button, Form, InputGroup } from "react-bootstrap";
import GlobalSearchCard from "./globalSearchCard";
import { GlobalSearchResult } from "../../api/api";
// import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
function GlobalSearch() {
  const [show, setshow] = useState(false);
  let [search, setsearch] = useState("");
  let [searchData, setSearchData] = useState([]);
  let admin_id = localStorage.getItem("admin_id")
  let admin_type = localStorage.getItem("admin_type")
  /*Global Search API Call*/
  const GlobalSearchAPICall = async (admin) => {
    // let search = "";
    // search = e.target.value;
    // setIsLoading(true);
    try {
      const userData = await GlobalSearchResult(search, admin ? admin_id : "", admin ? admin_type : "");
      setSearchData(userData.data.data);
      // console.log(searchData.admin.length);
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
    setshow(false)
    setSearchData([])
    setsearch("")
  }
  return (
    <div className="global_search_box">
      {/* <i
        style={{ cursor: "pointer" }}
        className="fas fa-search text-white mx-5"
        onClick={() => setshow(true)}
      ></i> */}
      <span
        style={{ cursor: "pointer" }}
        className=" text-white mx-5"
        onClick={() => setshow(true)}
        title="Global Search"
      >
        <FaSearch />
      </span>
      <div
        className={
          show
            ? " d-flex global_search_content position-fixed show"
            : " d-flex global_search_content position-fixed"
        }
      >
        <div className="left_side" onClick={() => setshow(false)}></div>
        <div className="right_side bg-white">
          <div className="global_search d-flex align-items-center p-3 px-5 ">
            <div className="col">
              <div className="input-group mb-3 ">
                <input
                  required
                  type="text"
                  className="form-control"
                  placeholder="Search Candidate"
                  name="Employee_name"
                  value={search}
                  onChange={(e) => setsearch(e.target.value)}
                  onKeyPress={handleKeyPress}
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
          <div className="row global_search_result py-2 px-5">
            {/* Display search results or Not Found message */}
            {Object.keys(searchData).some(key => searchData[key] && searchData[key].length > 0) ? (
              <>
                {searchData["employee"] && searchData["employee"].length > 0 && (
                  <div className="col-lg-3 col-sm-6">
                    <h5 className="font-size-2 font-weight-bold m-0 border-bottom text-uppercase">
                      Applicants
                    </h5>
                    {searchData["employee"].map((data) => (
                      <GlobalSearchCard
                        close={close}
                        to={`/${data.employee_id}`}
                        key={data.employee_id} // Use a unique key
                        name={data.name}
                        mobile={data.contact_no}
                        email={data.email}
                      />
                    ))}
                  </div>
                )}
                {searchData["employer"] && searchData["employer"].length > 0 && (
                  <div className="col-lg-3 col-sm-6">
                    <h5 className="font-size-2 font-weight-bold m-0 border-bottom text-uppercase">
                      Clients
                    </h5>
                    {searchData["employer"].map((data) => (
                      <GlobalSearchCard
                        close={close}
                        key={data.company_id} // Use a unique key
                        name={data.contact_person_name}
                        mobile={data.contact_no}
                        email={data.email}
                        company={data.company_name}
                        id={data.company_id}
                        to={`/client_detail`}
                        title="Client Details"
                      />
                    ))}
                  </div>
                )}
                {searchData["agent"] && searchData["agent"].length > 0 && (
                  <div className="col-lg-3 col-sm-6">
                    <h5 className="font-size-2 font-weight-bold m-0 border-bottom text-uppercase">
                      Partners
                    </h5>
                    {searchData["agent"].map((data) => (
                      <GlobalSearchCard
                        close={close}
                        key={data.id} // Use a unique key
                        name={data.name}
                        mobile={data.contact_no}
                        email={data.email}
                        to={`/partner_profile`}
                        title="Partner Profile"
                        id={data.id}
                      />
                    ))}
                  </div>
                )}
                {searchData["admin"] && searchData["admin"].length > 0 && (
                  <div className="col-lg-3 col-sm-6">
                    <h5 className="font-size-2 font-weight-bold m-0 border-bottom text-uppercase">
                      Admins
                    </h5>
                    {searchData["admin"].map((data) => (
                      <GlobalSearchCard
                        close={close}
                        key={data.admin_id} // Use a unique key
                        name={data.name}
                        mobile={data.contact_no}
                        email={data.email}
                      />
                    ))}
                  </div>
                )}
                {searchData["task"] && searchData["task"].length > 0 && (
                  <div className="col-lg-3 col-sm-6">
                    <h5 className="font-size-2 font-weight-bold m-0 border-bottom text-uppercase">
                      Task
                    </h5>
                    {searchData["task"].map((data) => (
                      <GlobalSearchCard
                        close={close}
                        key={data.admin_id} // Use a unique key
                        name={data.name}
                        mobile={data.contact_no}
                        email={data.email}
                      />
                    ))}
                  </div>
                )}
                {searchData["notes"] && searchData["notes"].length > 0 && (
                  <div className="col-lg-3 col-sm-6">
                    <h5 className="font-size-2 font-weight-bold m-0 border-bottom text-uppercase">
                      Notes
                    </h5>
                    {searchData["notes"].map((data) => (
                      <GlobalSearchCard
                        close={close}
                        key={data.admin_id} // Use a unique key
                        name={data.name}
                        mobile={data.contact_no}
                        email={data.email}
                      />
                    ))}
                  </div>
                )}
                {searchData["applicant_type_group_chat"] && searchData["applicant_type_group_chat"].length > 0 && (
                  <div className="col-lg-3 col-sm-6">
                    <h5 className="font-size-2 font-weight-bold m-0 border-bottom text-uppercase">
                      Group discussion
                    </h5>
                    {searchData["applicant_type_group_chat"].map((data) => (
                      <GlobalSearchCard
                        close={close}
                        key={data.admin_id} // Use a unique key
                        name={data.name}
                        mobile={data.contact_no}
                        email={data.email}
                      />
                    ))}
                  </div>
                )}
                {searchData["applicant_type_candidate_chat"] && searchData["applicant_type_candidate_chat"].length > 0 && (
                  <div className="col-lg-3 col-sm-6">
                    <h5 className="font-size-2 font-weight-bold m-0 border-bottom text-uppercase">
                      Candidate discussion
                    </h5>
                    {searchData["applicant_type_candidate_chat"].map((data) => (
                      <GlobalSearchCard
                        close={close}
                        key={data.admin_id} // Use a unique key
                        name={data.name}
                        mobile={data.contact_no}
                        email={data.email}
                      />
                    ))}
                  </div>
                )}
                {searchData["document"] && searchData["document"].length > 0 && (
                  <div className="col-lg-3 col-sm-6">
                    <h5 className="font-size-2 font-weight-bold m-0 border-bottom text-uppercase">
                      Documents
                    </h5>
                    {searchData["document"].map((data) => (
                      <GlobalSearchCard
                        close={close}
                        key={data.admin_id} // Use a unique key
                        name={data.name}
                        mobile={data.contact_no}
                        email={data.email}
                      />
                    ))}
                  </div>
                )}
                {searchData["call_log_chat"] && searchData["call_log_chat"].length > 0 && (
                  <div className="col-lg-3 col-sm-6">
                    <h5 className="font-size-2 font-weight-bold m-0 border-bottom text-uppercase">
                      Daily call logs
                    </h5>
                    {searchData["call_log_chat"].map((data) => (
                      <GlobalSearchCard
                        close={close}
                        key={data.admin_id} // Use a unique key
                        name={data.name}
                        mobile={data.contact_no}
                        email={data.email}
                      />
                    ))}
                  </div>
                )}

              </>
            ) : (
              (search && searchData.length !== 0) ? <div className="col-12 text-center">
                {/* Display Pathways Logo */}
                <div className="col-12 mb-3">
                  <img src="image/logo-main-black.png" alt="Pathways Logo" className="img-fluid" />
                </div>
                <h5 className="font-size-2 font-weight-bold m-0">Not result Found</h5>
                <div className="mt-3">
                  <p className="font-size-2 font-weight-bold">Do you want to create a profile? Please consider one of the links below:</p>
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
