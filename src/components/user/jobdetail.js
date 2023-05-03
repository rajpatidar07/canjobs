import React from "react";
import EmployeeFooter from "../common/footer";
import EmployeeHeader from "../common/header";
import JobDetailPage from "../common/jobdetail";
function JobDetail() {

  // eslint-disable-next-line no-use-before-define
  return (
    <div>
      <EmployeeHeader />
      <section className="bg-athens pt-12 pt-lg-32 pb-7 pb-lg-25">
        <div className="container">
          <JobDetailPage />
        </div>
      </section>
      <EmployeeFooter />
    </div>
  );
}

export default JobDetail;
