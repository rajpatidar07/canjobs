// import React, { useState } from 'react'
// import FilterJson from "../json/filterjson"
// import { Link } from 'react-router-dom';
// export default function LmiaTime({ lmia, location, job, doc }) {
//   const [selectedStatus, setSelectedStatus] = useState([]);
//   const [expandedStatus, setExpandedStatus] = useState(null);

//   // Function to handle checkbox selection
//   const handleSubStageSelection = (status, subStage) => {
//     const isSelected = selectedStatus.some(
//       (item) => item.status === status && item.subStage === subStage
//     );

//     if (isSelected) {
//       setSelectedStatus(
//         selectedStatus.filter(
//           (item) => !(item.status === status && item.subStage === subStage)
//         )
//       );
//     } else {
//       setSelectedStatus([
//         ...selectedStatus,
//         { status: status, subStage: subStage },
//       ]);
//     }
//   };


//   /*function to get the stage of lmia */
//   const currentIndex = FilterJson.lmia_status.findIndex(status =>
//     status === lmia);

//   return (
//     <div>
//       <div className="arrow-wrapper">
//         <h5 className={doc === "yes" ? '' : "d-none"}>LMIA status</h5>
//         <div className="arrow-steps clearfix p-2">
//           {(FilterJson.lmia_status || []).map((status, i) => {
//             const isDone = currentIndex > -1 && i <= currentIndex;
//             const subStages = FilterJson.sub_stages[status] || [];
//             const isExpanded = expandedStatus === status
//             return (
//               location === "/job" && job === "yes" ?
//                 (i <= 6 && (
//                   <div key={i} className={`step m-2 ${isDone ? 'current text-capitalize' : ''}`}>
//                     <span>{status}</span>
//                   </div>
//                 )) : (i > 6 && (
//                   <div key={i} className={`step m-2 ${isDone ? 'current text-capitalize' : 'text-capitalize'}`}>
//                     <Link to=""
//                       className={isDone ? 'text-white' : 'text-gray'}
//                       onClick={() =>
//                         setExpandedStatus(isExpanded ? null : status)
//                       }>{status}</Link>
//                     {isExpanded && (
//                       <div className='bg-white text-dark'>
//                         {subStages.map((subStage, j) => (
//                           <div
//                             key={j}
//                             className={`sub-stage ${selectedStatus.some(
//                               (item) =>
//                                 item.status === status &&
//                                 item.subStage === subStage
//                             )
//                               ? 'selected'
//                               : ''
//                               }`}
//                             onClick={() =>
//                               handleSubStageSelection(status, subStage)
//                             }
//                           >
//                             {subStage}
//                             <input
//                               type="checkbox"
//                               checked={selectedStatus.some(
//                                 (item) =>
//                                   item.status === status &&
//                                   item.subStage === subStage
//                               )}
//                               readOnly
//                             />
//                           </div>
//                         ))}
//                       </div>
//                     )}

//                   </div>
//                 ))
//             )
//           })}
//         </div>
//       </div>
//     </div>
//   )
// }

import React/*, { useState } */ from 'react';
import FilterJson from '../json/filterjson';
// import { Link } from 'react-router-dom';

export default function LmiaTime({ lmia, location, job, doc }) {
  // const [selectedStatus, setSelectedStatus] = useState([]);
  // const [expandedStatus, setExpandedStatus] = useState(null);
  // let subStages;
  // let isExpanded
  // // Function to handle checkbox selection
  // const handleSubStageSelection = (status, subStage) => {
  //   const isSelected = selectedStatus.some(
  //     (item) => item.status === status && item.subStage === subStage
  //   );

  //   if (isSelected) {
  //     setSelectedStatus(
  //       selectedStatus.filter(
  //         (item) => !(item.status === status && item.subStage === subStage)
  //       )
  //     );
  //   } else {
  //     setSelectedStatus([
  //       ...selectedStatus,
  //       { status: status, subStage: subStage },
  //     ]);
  //   }
  // };

  /*function to get the stage of lmia */
  const currentIndex = FilterJson.lmia_status.findIndex(
    (status) => status === lmia
  );
  return (
    <div className=''>
      <div className="arrow-wrapper">
        <h5 className={doc === 'yes' ? '' : 'd-none'}>LMIA status</h5>
        <div className="arrow-steps clearfix p-2">
          {(FilterJson.lmia_status || []).map((status, i) => {
            const isDone = currentIndex > -1 && i <= currentIndex;
            // subStages = FilterJson.sub_stages[status] || [];
            // isExpanded = expandedStatus === status;
            return (
              /*location === '/job' &&*/ job === 'yes' ? (
                i <= 2 && (
                  <div
                    key={i}
                    className={`step m-2 ${isDone ?
                      'current text-capitalize' :
                      // expandedStatus ? "sub-stage text-capitalize":
                      ''}`}
                  >
                    <span>{status}</span>
                  </div>
                )
              ) : (
                i > 2 && (
                  <div
                    key={i}
                    className={`step m-2 ${isDone ? 'current text-capitalize' : 'text-capitalize'}`}
                  >
                    {/* <Link
                      to=""
                      className={isDone ? 'text-white' : 'text-gray'}
                      onClick={doc === 'yes' ? () =>
                        setExpandedStatus(isExpanded ? null : status) : null
                      }
                    >
                      {status}
                    </Link> */}
                    <span>{status}</span>
                  </div>
                )
              )
            );
          })}
        </div>
      </div>

      {/* { expandedStatus && (
          <div className='bg-white text-dark p-2 sub-stages-container'>
            {(FilterJson.sub_stages[expandedStatus] || []).map((subStage, j) => (
              <div
                key={j}
                className={`sub-stage text-capitalize ${selectedStatus.some(
                  (item) =>
                    item.status === expandedStatus &&
                    item.subStage === subStage
                )
                  ? 'selected'
                  : ''
                  }`}
                onClick={() =>
                  handleSubStageSelection(expandedStatus, subStage)
                }
              >

                <input
                  type="checkbox"
                  className='mx-2'
                  checked={selectedStatus.some(
                    (item) =>
                      item.status === expandedStatus &&
                      item.subStage === subStage
                  )}
                  readOnly
                />{subStage}
              </div>
            ))}
          </div>
        ) } */}
    </div >
  );
}
