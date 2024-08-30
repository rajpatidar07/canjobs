import React from 'react';
import { useNavigate } from 'react-router-dom';

const NewJobBox = ({ skill, job, token, user_type, OnApplyClick, setShowAddJobsModal, setJobId, setShowDataForm }) => {
    const navigate = useNavigate();

    return (
        <div className="card new-job-box my-3 p-3 light-mode-texts bg-white rounded hover-shadow-3 hover-border-green">
            <div className="card-body">
                {/* Job Title and Company Name */}
                <div className="row job_header m-0">
                    <div className="media align-items-center company_box col-6 p-0">
                        <div className="text_box text-left w-100">
                            <h3 className="mb-0 font-size-6 heading-dark-color text-capitalize">
                                {job.job_title }
                            </h3>
                            <h6 className="card-subtitle mb-2 text-muted company-name">
                                {job.company_name}
                            </h6>
                        </div>
                    </div>

                    {/* Job Details */}
                    <div className="col-md-6 p-0">
                <ul className="d-flex list-unstyled flex-column align-items-start">
                    {job.industry_type && (
                        <li className="d-flex align-items-start mb-2 placeholder" title="Job Category">
                            <span className="text-muted font-size-small mr-1">Industry:</span>
                            <span className="font-weight-semibold text-capitalize">{job.industry_type}</span>
                        </li>
                    )}
                    {job.location && (
                        <li className="d-flex align-items-start mb-2 placeholder" title="Location">
                            <span className="text-muted font-size-small mr-1">Location:</span>
                            <span className="font-weight-semibold text-capitalize">{job.location}</span>
                        </li>
                    )}
                    {job.employment && (
                        <li className="d-flex align-items-start mb-2 placeholder" title="Job Type">
                            <span className="text-muted font-size-small mr-1">Type:</span>
                            <span className="font-weight-semibold text-capitalize">{job.employment}</span>
                        </li>
                    )}
                    {job.created_at && (
                        <li className="d-flex align-items-start mb-2 placeholder" title="Posted Time">
                            <span className="text-muted font-size-small mr-1">Posted:</span>
                            <span className="font-weight-semibold">{job.created_at}</span>
                        </li>
                    )}
                    {job.salary && (
                        <li className="d-flex align-items-start mb-2 placeholder" title="Salary">
                            <span className="text-muted font-size-small mr-1">Salary:</span>
                            <span className="font-weight-semibold">${job.salary}</span>
                        </li>
                    )}
                </ul>
            </div>

                </div>

                {/* Job Description */}
                <div className="row pt-4 justify-content-end">
                    <div className="col-md-12 text-left text-capitalize text-break">
                        <p className="new-job-description">
                            <div
                                style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2, /* Limits the content to 2 lines */
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}
                                dangerouslySetInnerHTML={{ __html: job.job_description }}
                            />
                        </p>
                    </div>
                    <div className='row d-flex'>
                        {/* Skills */}
                        <div className="col-md-7 col-lg-7 col-xl-7">
                            <ul className="d-flex list-unstyled mr-n3 flex-wrap">
                                {skill.map((item, index) =>
                                    item === "" ? null : (
                                        <li key={index}>
                                            <span className="text-capitalize bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2">
                                                {item}
                                            </span>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>

                        {/* Apply/Edit Button */}
                        <div className="media text-end text-right justify-content-md-end col-md-5 col-lg-5 col-xl-5">
                            {user_type === "company" ? (
                                <button
                                    className="btn btn-secondary text-uppercase font-size-3"
                                    onClick={() => {
                                        setJobId(job.job_id);
                                        setShowAddJobsModal(true);
                                    }}
                                >
                                    Edit
                                </button>
                            ) : (
                                <button
                                    className={
                                        job.is_applied === "0"
                                            ? "btn-sm btn-secondary text-uppercase font-size-3"
                                            : "btn-sm btn-info text-uppercase font-size-3"
                                    }
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
            </div>
        </div>
    );
};

export default NewJobBox;
