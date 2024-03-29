import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getallEmployeeData } from "../../api/api";
import moment from "moment";
function EmployeeBox() {
  let [employeeData, setEmployeeData] = useState([]);
  let [totalData, setTotalData] = useState([]);
  let Skill = [];
  /*Api function to get the employee data */
  const EmpData = async () => {
    const userData = await getallEmployeeData();
    if (userData.data.length === 0) {
      setEmployeeData([]);
    } else {
      setEmployeeData(userData.data);
      setTotalData(userData.totalData);
    }
  };
  /*Render Method*/
  useEffect(() => {
    EmpData();
  }, []);

  return (
    <>
      {/* <!-- Single Featured Job --> */}
      {totalData === 0 || employeeData.length === 0 ? (
        <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 text-center">
          <h4>No Data Found</h4>
        </div>
      ) : (
        (employeeData || []).map((empdata) => (
          <div
            className="col-xxl-4 col-xl-4 col-lg-6 col-md-6 job_box p-3"
            data-aos="fade-right"
            data-aos-duration="800"
            data-aos-once="true"
            key={empdata.employee_id}
          >
            <div className="pt-9 px-xl-10 px-lg-10 px-8 pb-7 light-mode-texts bg-white rounded hover-shadow-3 hover-border-green position-relative">
              {empdata.interested_in === "swap" ? (
                <span className="job_swap_label">SWAP</span>
              ) : null}
              <div className="row job_header m-0 align-items-center">
                <div className="media align-items-center company_box col-9 p-0">
                  <div className="text_box text-left">
                    {/* <img className="company_logo" src="image/logo-main-black.png" alt="" /> */}
                    <img
                      className="rounded-circle company_logo"
                      src={
                        empdata.profile_photo === null
                          ? "image/user1.jpg"
                          : empdata.profile_photo
                      }
                      width="50"
                      height="50"
                      alt=""
                    />
                  </div>
                  <Link
                    className="text_box text-left w-100"
                    to={"/profile"}
                    onClick={() =>
                      localStorage.setItem("employee_id", empdata.employee_id)
                    }
                  >
                    <p className="font-size-3 text-default-color line-height-2 m-0">
                      {empdata.name}
                      <span className="age_gender font-size-3 text-smoke">
                        ( {empdata.gender}{" "}
                        {moment().diff(empdata.date_of_birth, "years")}
                        Y)
                      </span>
                    </p>
                    <h3 className="mb-0 font-size-6 heading-dark-color">
                      {empdata.education}
                    </h3>
                  </Link>
                </div>
                <div className="media justify-content-md-end col-3 p-0">
                  <Link
                    className="btn btn-secondary text-uppercase font-size-3 connect_btn"
                    data-toggle="modal"
                    data-target="#signup"
                    to={"/profile"}
                    onClick={() =>
                      localStorage.setItem("employee_id", empdata.employee_id)
                    }
                  >
                    View
                  </Link>
                </div>
                <div className="col-md-12 p-0 mt-2">
                  <ul className="d-flex list-unstyled mb-0 flex-wrap justify-content-md-start">
                    <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                      <span className="mr-4">
                        <img
                          src="image/svg/icon-loaction-pin-black.svg"
                          alt=""
                        />
                      </span>
                      <span className="font-weight-semibold">
                        {empdata.current_location},
                        {empdata.currently_located_country}
                      </span>
                    </li>
                    <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                      <span className="mr-4">
                        <img src="image/svg/icon-suitecase.svg" alt="" />
                      </span>
                      <span className="font-weight-semibold">
                        {empdata.experience === "fresher"
                          ? empdata.experience
                          : empdata.experience + "Y"}{" "}
                        Experience
                      </span>
                    </li>
                    <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                      <span className="mr-4">
                        <img src="image/icons/language.svg" alt="" />
                      </span>
                      <span className="font-weight-semibold">
                        {empdata.language}
                      </span>
                    </li>
                    <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                      <span className="mr-4">
                        <img src="image/svg/icon-suitecase.svg" alt="" />
                      </span>
                      <span className="font-weight-semibold">
                        {empdata.nationality}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row pt-4">
                <div className="col-md-12 text-left">
                  <p className="text-truncate-1">{empdata.description}</p>
                </div>
                <div className="col-md-12">
                  <ul className="d-flex list-unstyled mr-n3 flex-wrap">
                    {empdata.skill
                      ? ((Skill = empdata.skill.split(",")),
                        (Skill || []).map((skill, i) => (
                          <li key={i}>
                            <span className="bg-polar mt-2 text-black-2  mr-6 px-7 font-size-3 rounded-3 min-height-32 d-flex align-items-center">
                              {skill}
                            </span>
                          </li>
                        )))
                      : null}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      {/* <!-- End Single Featured Job --> */}
    </>
  );
}
export default EmployeeBox;
