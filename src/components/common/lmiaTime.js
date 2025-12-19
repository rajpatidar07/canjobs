import React from 'react';
import FilterJson from '../json/filterjson';

export default function LmiaTime({ lmia, job, doc, selectedStatus }) {
  /*function to get the stage of lmia */
  const currentIndex = FilterJson.lmia_status.findIndex(
    (status) => status === lmia
  );
  return (
    <div className='bg-white'>
      <div className="arrow-wrapper custome_arrow_wrapper w-100 d-flex flex-wrap mb-0">
        <h5 className={doc === 'yes' ? '' : 'd-none'}>LMIA status</h5>
        <div className="arrow-steps">
          {(FilterJson.lmia_status || []).map((status, i) => {
            const isDone = currentIndex > -1 && i <= currentIndex;
            return (
              job === 'yes' ? (
                <div key={i}
                  className={`step m-2 text-capitalize ${isDone ? 'approved ' : ''} ${status === "decision" && lmia === "decision" && selectedStatus.find((item) => item.lmia_substage === "refused") ? " reject" : ""}`}>
                  <span>{
                    status === "decision" && lmia === "decision"
                      ? selectedStatus.find((item) => item.lmia_substage === "refused")
                        ? "Refused"
                        : "Approved"
                      : status}</span>
                </div>
              ) : (
                i > 2 && (
                  <div key={i}
                    className={`step m-2 text-capitalize ${isDone ? 'approved ' : ''} ${status === "decision" && lmia === "decision" && selectedStatus.find((item) => item.lmia_substage === "refused") ? " reject" : ""}`}>
                    <span>{
                      status === "decision" && lmia === "decision"
                        ? selectedStatus.find((item) => item.lmia_substage === "refused")
                          ? "Refused"
                          : "Approved"
                        : status}</span>
                  </div>
                )
              )
            );
          })}
        </div>
      </div>
    </div >
  );
}
