import React from 'react'
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdOutlineDoNotDisturbOff } from 'react-icons/md';
import { FaTasks } from 'react-icons/fa';
import { BiTaskX } from "react-icons/bi";import { Link } from 'react-router-dom';
export default function TaskCount({ count }) {
    const cardData = [
        {
            title: 'Total Tasks',
            count: count?.total_tasks || 'N/A',
            icon: <FaTasks />,
            bgColor: '#f0f8ff', // Light background color
            iconColor: '#007bff', // Bootstrap primary blue for the icon
            textColor: '#333',
        },
        {
            title: 'Completed Tasks',
            count: count?.total_completed_task || 'N/A',
            icon: <IoCheckmarkDoneCircle />,
            bgColor: '#e9f7ec', // Light green background
            iconColor: '#28a745', // Bootstrap green
            textColor: '#333',
        },
        {
            title: 'Incomplete Tasks',
            count: count?.total_uncompleted_task || 'N/A',
            icon: <MdOutlineDoNotDisturbOff />,
            bgColor: '#fcebe9', // Light red background
            iconColor: '#dc3545', // Bootstrap danger red
            textColor: '#333',
        },
        {
            title: 'Overdue Tasks',
            count: count?.total_overdue_task || 'N/A',
            icon: <BiTaskX />,
            bgColor: '#fff8e1', // Light yellow background
            iconColor: '#ffc107', // Bootstrap yellow
            textColor: '#333',
        },
    ];

    return (
        <div className="container mt-4">
            <div className="row">
                {cardData.map((card, index) => (
                    <div key={index} className="col-md-3 col-sm-6 mb-4">
                        <Link
                            to="#"
                            className="d-block text-center border rounded shadow-sm p-4"
                            style={{
                                backgroundColor: card.bgColor,
                                color: card.textColor,
                                textDecoration: 'none',
                                transition: 'box-shadow 0.2s',
                            }}
                        >
                            <div style={{ fontSize: '3rem', color: card.iconColor }} className="mb-3">
                                {card.icon}
                            </div>
                            <h5 style={{ fontSize: '1.25rem', fontWeight: '900' }}>{card.count}</h5>
                            <p style={{ fontSize: '1rem', fontWeight: '400', color: '#6c757d' }}>{card.title}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
        // <div className="container-fluid mt-5">
        //     {/* <!-- Summary count --> */}
        //     <div className="row mb-7 ">
        //         <div className="col-xxl-6 col-xl-6 col-md-6 col-6 col-sm-6">
        //             {/* <!-- Single Category --> */}
        //             <Link to={""}
        //                 className="media bg-white rounded-4 pl-3 pt-3 pb-3 pr-3 hover-shadow-1 mb-3 shadow-8"
        //             >
        //                 <div className="text-blue bg-blue-opacity-1 circle-36 font-size-3 mr-3">
        //                     <FaTasks />
        //                 </div>
        //                 {/* <!-- Category Content --> */}
        //                 <div className='ml-lg-10'>
        //                     <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1 text-center">
        //                         <span className="counter">
        //                             {count?.total_tasks || "N/A"}
        //                         </span>
        //                     </h5>
        //                     <p className="font-size-3 text-center font-weight-normal text-gray mb-0">
        //                         Total Tasks
        //                     </p>
        //                 </div>
        //             </Link>
        //             {/* <!-- End Single Category --> */}
        //         </div>
        //         <div className="col-xxl-6 col-xl-6 col-md-6 col-6 col-sm-6">
        //             {/* <!-- Single Category --> */}
        //             <Link
        //                 to=""
        //                 className="media bg-white rounded-4 pl-3 pt-3 pb-3 pr-3 hover-shadow-1 mb-3 shadow-8"
        //             >
        //                 <div className="text-shamrock bg-green-opacity-1 circle-36 font-size-3 mr-3">
        //                     <IoCheckmarkDoneCircle />
        //                 </div>
        //                 {/* <!-- Category Content --> */}
        //                 <div className='ml-lg-8'>
        //                     <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1 text-center">
        //                         <span className="counter">
        //                             {count?.total_completed_task || "N/A"}
        //                         </span>
        //                     </h5>
        //                     <p className="font-size-3 text-center font-weight-normal text-gray mb-0">
        //                         Completed Tasks
        //                     </p>
        //                 </div>
        //             </Link>
        //             {/* <!-- End Single Category --> */}
        //         </div>
        //         <div className="col-xxl-6 col-xl-6 col-md-6 col-6 col-sm-6">
        //             {/* <!-- Single Category --> */}
        //             <Link
        //                 to=""
        //                 className="media bg-white rounded-4 pl-3 pt-3 pb-3 pr-3 hover-shadow-1 mb-3 shadow-8"
        //             >
        //                 <div className="text-danger bg-danger-opacity-1 circle-36 font-size-3 mr-3">
        //                     <MdOutlineDoNotDisturbOff />
        //                 </div>
        //                 {/* <!-- Category Content --> */}
        //                 <div className='ml-lg-8'>
        //                     <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1 text-center">
        //                         <span className="counter">
        //                             {count?.total_uncompleted_task || "N/A"}
        //                         </span>
        //                     </h5>
        //                     <p className="font-size-3 text-center font-weight-normal text-gray mb-0">
        //                         Incomplete Task
        //                     </p>
        //                 </div>
        //             </Link>
        //             {/* <!-- End Single Category --> */}
        //         </div>
        //         <div className="col-xxl-6 col-xl-6 col-md-6 col-6 col-sm-6">
        //             {/* <!-- Single Category --> */}
        //             <Link
        //                 to=""
        //                 className="media bg-white rounded-4 pl-3 pt-3 pb-3 pr-3 hover-shadow-1 mb-3 shadow-8"
        //             >
        //                 <div className="text-warning bg-warning-opacity-1 circle-36 font-size-3 mr-3">
        //                     <RiPassExpiredFill />
        //                 </div>
        //                 {/* <!-- Category Content --> */}
        //                 <div className='ml-lg-8 d-flex justify-content-evenly'>
        //                     <p className="font-size-6 text-start font-weight-normal text-gray mb-0">
        //                         Overdue Tasks
        //                     </p>
        //                     <h3 className=" font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1 text-end">
        //                         <span className="counter">
        //                             {count?.total_overdue_task || "N/A"}
        //                         </span>
        //                     </h3>
        //                 </div>
        //             </Link>
        //             {/* <!-- End Single Category --> */}
        //         </div>
        //     </div>
        // </div>
    )
}
