import moment from 'moment';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NewJobBox = ({ skill, job, token, user_type, OnApplyClick, setShowAddJobsModal, setJobId, setShowDataForm }) => {
    const navigate = useNavigate();
    return (
<div className="card my-4 p-4 bg-white rounded-lg shadow-lg hover:shadow-xl border-0 transition-shadow duration-300 ease-in-out">
  <div className="card-body">
    {/* Job Title and Company Name */}
    <div className="mb-4">
      <h4 className="text-2xl font-bold text-gray-800 text-capitalize mb-1">
        {job.job_title}
      </h4>
      <h6 className="text-gray-600 text-capitalize">
        {job.company_name}
      </h6>
    </div>

    {/* Job Details */}
    <div className="mb-4">
      <ul className="list-unstyled">
        {job.industry_type && (
          <li className="mb-2 flex items-center placeholder">
            <span className="text-gray-500 text-sm mr-2">Industry:</span>
            <span className="font-semibold text-capitalize">{job.industry_type}</span>
          </li>
        )}
        {job.location && (
          <li className="mb-2 flex items-center placeholder">
            <span className="text-gray-500 text-sm mr-2">Location:</span>
            <span className="font-semibold text-capitalize">{job.location}</span>
          </li>
        )}
        {job.employment && (
          <li className="mb-2 flex items-center placeholder">
            <span className="text-gray-500 text-sm mr-2">Type:</span>
            <span className="font-semibold text-capitalize">{job.employment}</span>
          </li>
        )}
        {job.created_at && (
          <li className="mb-2 flex items-center placeholder">
            <span className="text-gray-500 text-sm mr-2">Posted:</span>
            <span className="font-semibold">{moment(job.created_at).format("DD-MM-YYYY")}</span>
          </li>
        )}
        {job.salary && (
          <li className="mb-2 flex items-center placeholder">
            <span className="text-gray-500 text-sm mr-2">Salary:</span>
            <span className="font-semibold">${job.salary}</span>
          </li>
        )}
      </ul>
    </div>

    {/* Job Description and Skills */}
    <div className="mb-4">
      <p className="text-gray-700 text-sm mb-3">
        <div
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          dangerouslySetInnerHTML={{ __html: job.job_description }}
        />
      </p>
      <ul className="d-flex list-unstyled flex-wrap">
                    {skill.slice(0, 2).map((item, index) => (
                        item && (
                            <li key={index} className=" mb-2 text-break">
                                <span className="text-truncate badge bg-light text-dark text-capitalize  py-2 ">
                                    {item}
                                </span>
                            </li>
                        )
                    ))}
                </ul>
    </div>

    {/* Apply/Edit Button */}
    <div className="text-center mt-4">
  {user_type === "company" ? (
    <button
      className="btn btn-outline-secondary text-uppercase font-weight-bold px-4 py-2 border-2 border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-100 transition duration-150"
      onClick={() => {
        setJobId(job.job_id);
        setShowAddJobsModal(true);
      }}
    >
      Edit
    </button>
  ) : (
    <button
      className={`btn text-uppercase font-weight-bold px-4 py-2 rounded-md transition duration-150 ${job.is_applied === "0" ? "bg-secondary text-white hover:bg-gray-700" : "bg-blue text-white hover:bg-blue-500"}`}
      onClick={() =>
        token && user_type === "user"
          ? OnApplyClick(0, job.job_id)
          : navigate("/candidate_login")
      }
      disabled={job.is_applied !== "0"}
    >
      {job.is_applied === "0" ? "Apply" : "Applied"}
    </button>
  )}
</div>

  </div>
</div>
    );
};

export default NewJobBox;
