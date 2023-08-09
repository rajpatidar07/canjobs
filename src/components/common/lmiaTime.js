import React from 'react'
import FilterJson from "../json/filterjson"
export default function LmiaTime({lmia,location,job}) {
    const currentIndex = FilterJson.lmia_status.findIndex(status => 
        status === lmia);

  return (
    <div>
        <div className="arrow-wrapper">
            <div className="arrow-steps clearfix p-2">
              {(FilterJson.lmia_status || []).map((status, i) => {
                const isDone = currentIndex > -1 && i <= currentIndex;
                return (
                  location === "/job" && job === "yes" ?
                    (i <= 6 && (
                      <div key={i} className={`step m-2 ${isDone ? 'current' : ''}`}>
                        <span>{status}</span>
                      </div>
                    )) : (i > 6 && (
                      <div key={i} className={`step m-2 ${isDone ? 'current' : ''}`}>
                        <span>{status}</span>
                      </div>
                    ))
                )
              })}
            </div>
          </div>
    </div>
  )
}
