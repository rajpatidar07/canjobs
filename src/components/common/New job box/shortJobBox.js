import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'

export default function ShortJobBox(
    {
        setJobId,
        job,
        token,
        user_type,
        OnApplyClick,
        setShowAddJobsModal,
        setShowDataForm,
        skill,
        i
    }
) {
    return (
        <div className='mt-5'>
            <div className="card  " onClick={() => setJobId(i)}>
                {/* Job Title and Company Name */}
                <div className="card-body ">
                    {job.job_title && <Link onClick={() => setJobId(i)}>
                        <h4 className="text-2xl font-bold text-gray-800 text-capitalize mb-1 hover:underline"
                            style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}>
                            {job.job_title}
                        </h4>
                    </Link>}
                    <p className="text-gray-600 text-capitalize">
                        {job.company_name && job.company_name}<br />
                        {job.job_type && <span>{job.job_type} </span>}
                    </p>
                    {job.job_description && <p className="card-text" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                        dangerouslySetInnerHTML={{ __html: job.job_description }}
                    />}
                    <p className='text-capitalize'>posted {moment(job.created_at).fromNow()}</p>
                </div>
            </div>
        </div>
    )
}
