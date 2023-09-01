import React from 'react';
import FilterJson from '../json/filterjson';

export default function LmiaTime({ lmia, location, job, doc }) {
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
            return (
               job === 'yes' ? (  
                  <div
                    key={i}
                    className={`step m-2 ${isDone ?
                      'current text-capitalize' :
                      ''}`}
                  >
                    <span>{status}</span>
                  </div>
              ) : (
                i > 2 && (
                  <div key={i}
                    className={`step m-2 ${isDone ? 'current text-capitalize' : 'text-capitalize'}`}> <span>{status}</span>
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
