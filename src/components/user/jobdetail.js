import React from "react";
import EmployeeFooter from "../common/footer";
import EmployeeHeader from "../common/header";
import JobDetailPage from "../common/jobdetail";
import { Link } from "react-router-dom";
function JobDetail() {
  const user_type = localStorage.getItem("userType");

  // eslint-disable-next-line no-use-before-define
  return (
    <div>
      <EmployeeHeader />
      <section className="bg-athens pt-12 pt-lg-32 pb-7 pb-lg-25">
        <div className="row justify-content-center">
          <div className="col-12 dark-mode-texts">
            <div className="mb-9">
              <Link
                to={user_type === "user" ? "/" : "/managejobs"}
                // onClick={() => setShowJobDetails(false)}
                className="d-flex align-items-center ml-4"
              >
                <i className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                  Back
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="container">
          <JobDetailPage />
        </div>
      </section>
      <EmployeeFooter />
    </div>
  );
}

export default JobDetail;
