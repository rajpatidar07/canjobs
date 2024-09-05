import React from "react";

const JobDetailLeftCardBox = () => {
  return (
    <div className="container mt-5">
      <div className="card shadow-sm border-0">
        <div className="card-body">
          {/* Logo and Job Title */}
          <div className="d-flex align-items-center mb-3">
            <img
              src="https://d2q79iu7y748jz.cloudfront.net/s/_logo.png"
              alt="Company Logo"
              className="img-fluid"
              style={{ width: "50px", marginRight: "15px" }}
            />
            <div>
              <h5 className="card-title mb-0">
                Work From Home Customer Service Representative
              </h5>
            </div>
          </div>

          {/* Company Name and Location */}
          <p className="text-muted mb-1">Surework Home Care Solutions • Indian Head, SK</p>

          {/* Salary (if applicable) */}
          <p className="text-primary mb-1">$45,000 - $55,000 a year</p>

          {/* Job Type */}
          <p className="text-muted mb-1">Full-time, Permanent</p>

          {/* Save Job Button */}
          <button className="btn btn-outline-primary btn-sm">Save Job</button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailLeftCardBox;
