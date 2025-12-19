import React from "react";
import FilterJson from "../json/filterjson";

export default function VisaTimeLine({ visa, substage, type }) {
  /*function to get the stage of lmia */
  const currentIndex = FilterJson.visa_status.findIndex(
    (status) => status === visa
  );
  return (
    <div
      className={
        type
          ? "p-1 pl-2 pr-6 col-md-12 d-flex border-right border-bottom bg-white mb-1"
          : ""
      }
    >
      <div className="arrow-wrapper custome_arrow_wrapper w-100 d-flex flex-wrap mb-0">
        {type && (
          <div className="job_name text-dark">
            <span
              className={`m-2 font-size-2 d-block mb-1 ${  type === "pgwp"
                  ? "text-uppercase"
                  : "text-capitalize"
                }`}
            >
              {type === "pnp" ? "Alberta PNP" : type}
            </span>
          </div>
        )}
        <div className="arrow-steps ">
          {(FilterJson.visa_status || []).map((status, i) => {
            const isDone = currentIndex > -1 && i <= currentIndex;
            return (
              <div
                key={i}
                className={`step text-capitalize ${isDone ? "approved " : "text-capitalize"
                  } ${status === "file decision"
                    ? substage === "rejected"
                      ? "reject"
                      : substage === "awaiting decision"
                        ? "pending"
                        : ""
                    : ""
                  }
                                  `}
              >
                <span className="text-capitalize">
                  {status === "file decision"
                    ? substage !== "false" && substage
                      ? substage
                      : "file decision"
                    : status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
