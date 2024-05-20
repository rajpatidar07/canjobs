import React, { useState } from "react";
// import { Button, Form, InputGroup } from "react-bootstrap";
import GlobalSearchCard from "./globalSearchCard";
import { GlobalSearchResult } from "../../api/api";
// import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
function GlobalSearch() {
  const [show, setshow] = useState(false);
  let [search, setsearch] = useState(true);
  let [searchData, setSearchData] = useState([]);

  /*Global Search API Call*/
  const GlobalSearchAPICall = async (e) => {
    // let search = "";
    // search = e.target.value;
    // setIsLoading(true);
    try {
      const userData = await GlobalSearchResult(search);
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
            <div className="input-group mb-3">
              <input
                required
                type="text"
                className="form-control"
                placeholder="Search Candidate"
                name="Employee_name"
                onChange={(e) => setsearch(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <div className="input-group-append">
                <button
                  className=""
                  type="button"
                  onClick={GlobalSearchAPICall}
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
              className="fas fa-times text-dark ml-4"
              onClick={() => setshow(false)}
            ></i>
          </div>
          <div className="row global_search_result py-2 px-5 ">
            {searchData["employee"] && searchData["employee"].length > 0 && (
              <div className="col-lg-3 col-sm-6">
                <h5 className="font-size-2 font-weight-bold m-0 border-bottom text-uppercase">
                  Applicants
                </h5>
                {searchData["employee"].map((data) => (
                  <GlobalSearchCard
                    to={`/${data.employee_id}`}
                    key={data.employee_id} // Add a unique key to each rendered element
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
                    key={data.company_id} // Add a unique key to each rendered element
                    name={data.contact_person_name}
                    mobile={data.contact_no}
                    email={data.email}
                    company={data.company_name}
                    to={"/client_detail"}
                    id={data.company_id}
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
                    key={data.id} // Add a unique key to each rendered element
                    name={data.name}
                    mobile={data.contact_no}
                    email={data.email}
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
                    key={data.admin_id} // Add a unique key to each rendered element
                    name={data.name}
                    mobile={data.contact_no}
                    email={data.email}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GlobalSearch;
