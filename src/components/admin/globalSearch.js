import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import GlobalSearchCard from "./globalSearchCard";
import { GlobalSearchResult } from "../../api/api";

function GlobalSearch() {
  const [show, setshow] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  let [searchData, setSearchData] = useState([]);
  let gdata = {
    admin: [
      {
        admin_id: "11",
        email: "g.choudhary.we2code@gmail.com",
        password: "c13b1fd8824c5577074601c325503a9a",
        name: "Gourav choudary",
        contact_no: "5654645343",
        parent_id: "26",
        admin_type: "executive",
        is_active: "1",
        profile_image: null,
        is_deleted: "0",
        created_at: "2023-09-07 12:09:26",
        updated_at: "2023-12-27 11:28:09",
        email_permission: null,
        token: "",
      },
    ],
    employee: [
      {
        employee_id: "7",
        name: "sghjgkjfgdg",
        email: "ashish.we2code@gmail.com",
        password: "",
        contact_no: "7485698744",
        description: "kjh",
        date_of_birth: "2024-01-10",
        gender: "female",
        marital_status: "single",
        nationality: null,
        current_location: "kjh",
        currently_located_country: "australia",
        language: "no english",
        religion: null,
        interested_in: "full-time",
        experience: "5-7 ",
        work_permit_canada: "no",
        work_permit_other_country: null,
        status: "1",
        message: "",
        is_featured: "0",
        job_status: "0",
        posted_job_id: "0",
        date_of_posting: "0000-00-00",
        designation: "",
        resume: null,
        profile_photo: null,
        reffer_by: "1",
        created_at: "2024-01-17 15:24:44",
        created_by_admin: "1",
        updated_at: "2024-01-17 15:24:44",
        is_deleted: "0",
        token: "",
        google: "",
        facebook: "",
        linkedin: "",
      },
      {
        employee_id: "9",
        name: "kdgsgfjsd",
        email: "sdfsfdsf.we2code@gmail.com",
        password: "",
        contact_no: "2345673890",
        description: null,
        date_of_birth: "2009-02-17",
        gender: "male",
        marital_status: "married",
        nationality: null,
        current_location: "indore",
        currently_located_country: "india",
        language: "basic",
        religion: null,
        interested_in: "contract",
        experience: "7+ ",
        work_permit_canada: "no",
        work_permit_other_country: null,
        status: "2",
        message: "",
        is_featured: "0",
        job_status: "0",
        posted_job_id: "0",
        date_of_posting: "0000-00-00",
        designation: "",
        resume: null,
        profile_photo: null,
        reffer_by: "1",
        created_at: "2024-01-17 16:11:51",
        created_by_admin: "99999",
        updated_at: "2024-01-17 16:18:33",
        is_deleted: "0",
        token: "",
        google: "",
        facebook: "",
        linkedin: "",
      },
    ],
    agent: [
      {
        id: "1",
        u_id: "TEST-1",
        name: "test aashi agent",
        email: "aashi.we2code@gmail.com",
        password: "f33244fee1c937af6e46cbcf70a0e302",
        contact_no: "7845963524",
        address: "indore",
        city: "indore",
        state: "Mp",
        country: "India",
        type: null,
        profile_image: null,
        created_by: null,
        updated_by: null,
        is_deleted: "0",
        created_at: "2024-01-17 15:16:02",
        updated_at: "2024-01-31 18:02:43",
        token: "587ea74f1e1c1b667fcfa0826f5ac338",
      },
      {
        id: "2",
        u_id: "TEST-2",
        name: "test ashish agent",
        email: "ashish.we2code@gmail.com",
        password: "f33244fee1c937af6e46cbcf70a0e302",
        contact_no: "7845968542",
        address: "indore",
        city: "indore",
        state: "Mp",
        country: "India",
        type: null,
        profile_image: null,
        created_by: null,
        updated_by: null,
        is_deleted: "0",
        created_at: "2024-01-17 15:22:33",
        updated_at: null,
        token: null,
      },
      {
        id: "3",
        u_id: "TEST-3",
        name: "test agent",
        email: "agent@agwent.com",
        password: "f33244fee1c937af6e46cbcf70a0e302",
        contact_no: "74856987458",
        address: "indore",
        city: "indore",
        state: "Mp",
        country: "India",
        type: null,
        profile_image: null,
        created_by: null,
        updated_by: null,
        is_deleted: "0",
        created_at: "2024-01-17 15:23:14",
        updated_at: "2024-01-31 10:59:26",
        token: null,
      },
      {
        id: "6",
        u_id: "GOURAV-6",
        name: "Gourav choudhary",
        email: "gourav.we2code@gmail.com",
        password: "8c2056028a9e4e4b002ea7e99633ead7",
        contact_no: "987654323456",
        address: "indore slice 2 scheme 78",
        city: "indore",
        state: "Madhya Pradesh",
        country: "India",
        type: null,
        profile_image: null,
        created_by: null,
        updated_by: null,
        is_deleted: "0",
        created_at: "2024-01-31 17:51:18",
        updated_at: "2024-02-01 09:41:58",
        token: null,
      },
    ],
    employer: [
      {
        company_id: "4",
        company_name: "Shushil academy",
        industry: "Restaurants & Food Service",
        corporation: null,
        alias: null,
        company_start_date: null,
        company_size: "10000",
        website_url: null,
        vacancy_for_post: "delivery boy",
        about: null,
        contact_person_name: "Niranter sing pandya",
        email: "Niranter.we2code@gmail.com",
        password: null,
        contact_no: "1111111111111",
        contact_no_other: null,
        address: null,
        pin_code: null,
        city: null,
        state: null,
        country: null,
        designation: "Manager",
        logo: null,
        is_active: "0",
        created_at: "2023-09-26 18:02:31",
        updated_at: "2023-10-20 11:32:57",
        created_by_admin: "1",
        is_deleted: "0",
        franchise: "",
        token: "",
        google: "",
        facebook: "",
        linkedin: "",
      },
      {
        company_id: "6",
        company_name: "infosys technologies",
        industry: "",
        corporation: null,
        alias: null,
        company_start_date: null,
        company_size: "10000",
        website_url: null,
        vacancy_for_post: "",
        about: null,
        contact_person_name: null,
        email: null,
        password: null,
        contact_no: null,
        contact_no_other: null,
        address: null,
        pin_code: null,
        city: null,
        state: null,
        country: null,
        designation: null,
        logo: null,
        is_active: "0",
        created_at: "2023-09-26 18:02:31",
        updated_at: "2023-09-26 18:02:31",
        created_by_admin: "1",
        is_deleted: "0",
        franchise: "",
        token: "",
        google: "",
        facebook: "",
        linkedin: "",
      },
      {
        company_id: "10",
        company_name: "google",
        industry: "",
        corporation: null,
        alias: null,
        company_start_date: null,
        company_size: "10000",
        website_url: null,
        vacancy_for_post: "",
        about: null,
        contact_person_name: "Niranter sing pandya",
        email: "aashi.we2code@gmail.com",
        password: null,
        contact_no: "9999999999999",
        contact_no_other: null,
        address: null,
        pin_code: null,
        city: null,
        state: null,
        country: null,
        designation: "vff",
        logo: null,
        is_active: "0",
        created_at: "2023-09-26 18:02:31",
        updated_at: "2023-10-05 17:51:36",
        created_by_admin: "1",
        is_deleted: "0",
        franchise: "",
        token: "",
        google: "",
        facebook: "",
        linkedin: "",
      },
      {
        company_id: "16",
        company_name: "COCO",
        industry: "Restaurants & Food Service",
        corporation: null,
        alias: null,
        company_start_date: "2022-05-31",
        company_size: "10",
        website_url: null,
        vacancy_for_post: "office boy",
        about: null,
        contact_person_name: "Niranter singh pandya",
        email: "raj.we2code@gmail.com",
        password: null,
        contact_no: "4111111111111",
        contact_no_other: "51111111111111111",
        address: null,
        pin_code: null,
        city: null,
        state: null,
        country: null,
        designation: "vff",
        logo: null,
        is_active: "0",
        created_at: "2023-09-27 22:54:51",
        updated_at: "2023-10-10 17:09:41",
        created_by_admin: "31",
        is_deleted: "0",
        franchise: "",
        token: "",
        google: "",
        facebook: "",
        linkedin: "",
      },
    ],
  };
  // let [search, setSearch] = useState(true);

  /*Global Search API Call*/
  const GlobalSearchAPICall = async (e) => {
    let search = "";
    search = e.target.value;
    setIsLoading(true);
    try {
      const userData = await GlobalSearchResult(search);
      setSearchData(userData.data.data);
      // console.log(searchData.admin.length);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  return (
    <div className="global_search_box">
      <i className="fas fa-search text-white" onClick={() => setshow(true)}></i>
      <div
        className={
          show
            ? "global_search_content position-fixed show"
            : "global_search_content position-fixed"
        }
      >
        <div className="global_search d-flex align-items-center p-3 px-5">
          <InputGroup className="search_box d-flex align-items-center position-relative">
            <Form.Control
              type="text"
              placeholder="Search"
              aria-describedby="basic-addon2"
              onChange={(e) => GlobalSearchAPICall(e)}
            />
            <a
              href={undefined}
              style={{ position: "absolute", right: "5px" }}
              className="fas fa-search text-dark"
            ></a>
          </InputGroup>
          <i
            style={{ fontSize: "22px" }}
            className="fas fa-times text-dark ml-4"
            onClick={() => setshow(false)}
          ></i>
        </div>
        <div className="row global_search_result py-2 px-5">
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
  );
}

export default GlobalSearch;
