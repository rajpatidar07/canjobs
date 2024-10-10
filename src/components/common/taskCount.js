import React from 'react'
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdOutlineDoNotDisturbOff } from 'react-icons/md';
import { FaTasks } from 'react-icons/fa';
import { RiPassExpiredFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
export default function TaskCount({ count }) {
    return (
        <div className="container-fluid mt-5">
            {/* <!-- Summary count --> */}
            <div className="row mb-7 ">
                <div className="col-xxl-6 col-xl-6 col-md-6 col-6 col-sm-6">
                    {/* <!-- Single Category --> */}
                    <Link to={""}
                        className="media bg-white rounded-4 pl-3 pt-3 pb-3 pr-3 hover-shadow-1 mb-3 shadow-8"
                    >
                        <div className="text-blue bg-blue-opacity-1 circle-36 font-size-3 mr-3">
                            <FaTasks />
                        </div>
                        {/* <!-- Category Content --> */}
                        <div className='ml-lg-10'>
                            <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1 text-center">
                                <span className="counter">
                                    {count?.total_tasks || "N/A"}
                                </span>
                            </h5>
                            <p className="font-size-3 text-center font-weight-normal text-gray mb-0">
                                Total Tasks
                            </p>
                        </div>
                    </Link>
                    {/* <!-- End Single Category --> */}
                </div>
                <div className="col-xxl-6 col-xl-6 col-md-6 col-6 col-sm-6">
                    {/* <!-- Single Category --> */}
                    <Link
                        to=""
                        className="media bg-white rounded-4 pl-3 pt-3 pb-3 pr-3 hover-shadow-1 mb-3 shadow-8"
                    >
                        <div className="text-shamrock bg-green-opacity-1 circle-36 font-size-3 mr-3">
                            <IoCheckmarkDoneCircle />
                        </div>
                        {/* <!-- Category Content --> */}
                        <div className='ml-lg-8'>
                            <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1 text-center">
                                <span className="counter">
                                    {count?.total_completed_task || "N/A"}
                                </span>
                            </h5>
                            <p className="font-size-3 text-center font-weight-normal text-gray mb-0">
                                Completed Tasks
                            </p>
                        </div>
                    </Link>
                    {/* <!-- End Single Category --> */}
                </div>
                <div className="col-xxl-6 col-xl-6 col-md-6 col-6 col-sm-6">
                    {/* <!-- Single Category --> */}
                    <Link
                        to=""
                        className="media bg-white rounded-4 pl-3 pt-3 pb-3 pr-3 hover-shadow-1 mb-3 shadow-8"
                    >
                        <div className="text-danger bg-danger-opacity-1 circle-36 font-size-3 mr-3">
                            <MdOutlineDoNotDisturbOff />
                        </div>
                        {/* <!-- Category Content --> */}
                        <div className='ml-lg-8'>
                            <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1 text-center">
                                <span className="counter">
                                    {count?.total_uncompleted_task || "N/A"}
                                </span>
                            </h5>
                            <p className="font-size-3 text-center font-weight-normal text-gray mb-0">
                                Incomplete Task
                            </p>
                        </div>
                    </Link>
                    {/* <!-- End Single Category --> */}
                </div>
                <div className="col-xxl-6 col-xl-6 col-md-6 col-6 col-sm-6">
                    {/* <!-- Single Category --> */}
                    <Link
                        to=""
                        className="media bg-white rounded-4 pl-3 pt-3 pb-3 pr-3 hover-shadow-1 mb-3 shadow-8"
                    >
                        <div className="text-warning bg-warning-opacity-1 circle-36 font-size-3 mr-3">
                            <RiPassExpiredFill />                                                    </div>
                        {/* <!-- Category Content --> */}
                        <div className='ml-lg-8'>
                            <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1 text-center">
                                <span className="counter">
                                    {count?.total_overdue_task || "N/A"}
                                </span>
                            </h5>
                            <p className="font-size-3 text-center font-weight-normal text-gray mb-0">
                                Overdue Tasks
                            </p>
                        </div>
                    </Link>
                    {/* <!-- End Single Category --> */}
                </div>
            </div>
        </div>)
}
