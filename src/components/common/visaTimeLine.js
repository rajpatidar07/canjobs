import React from "react";
import FilterJson from "../json/filterjson";

export default function VisaTimeLine({ visa, substage }) {
  /*function to get the stage of lmia */
  const currentIndex = FilterJson.visa_status.findIndex(
    (status) => status === visa
  );
  return (
    <div className="">
      <div className="arrow-wrapper custome_arrow_wrapper w-100 d-flex flex-wrap mb-0">
        <div className="arrow-steps ">
          {(FilterJson.visa_status || []).map((status, i) => {
            const isDone = currentIndex > -1 && i <= currentIndex;
            return (
              <div
                key={i}
                className={`step mx-2 text-capitalize ${
                  isDone ? "approved " : "text-capitalize"
                } ${
                  status === "file decision"
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
