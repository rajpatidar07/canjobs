import React from "react";

export default function VisaArrowProfile({ visaStatus ,visaStatusRejectComment}) {
  return (
    <div className="bg-white w-100 d-flex flex-wrap mb-1">
    <div className="arrow-wrapper custome_arrow_wrapper w-100 d-flex flex-wrap mb-0">
      {(visaStatus || []).map((item, i) => {
        return (
          // Check for empty or undefined visa_status and skip rendering if true
          item.visa_status === "" ||
            item.visa_status === null ||
            item.visa_status === undefined ||
            item.visa_status === "undefined" ? null : (
            <div
              className={
                "arrow-steps p-1 px-7 col-md-12 d-flex border-right border-bottom"
              }
              key={i}
            >
              <div>
                <div
                  key={i + 1}
                  className={`mt-2 step text-capitalize ${
                    item.visa_status === "onboard" ||
                    item.visa_status === "documentation" ||
                    item.visa_status === "file preparation" ||
                    item.visa_status === "file review" ||
                    item.visa_status === "file submission" ||
                    item.visa_status === "file decision"
                      ? "visa_current"
                      : null
                  }`}
                >
                  <span>onboard</span>
                </div>
                <div
                  key={i + 2}
                  className={`mt-2 step text-capitalize ${
                    item.visa_status === "documentation" ||
                    item.visa_status === "file preparation" ||
                    item.visa_status === "file review" ||
                    item.visa_status === "file submission" ||
                    item.visa_status === "file decision" ? "visa_current" : null
                  }`}
                >
                  <span>documentation</span>
                </div>
                <div
                  key={i + 3}
                  className={`mt-2 step text-capitalize ${
                    item.visa_status === "file preparation" ||
                    item.visa_status === "file review" ||
                    item.visa_status === "file submission" ||
                    item.visa_status === "file decision" ? "visa_current" : null
                  }`}
                >
                  <span>file preparation</span>
                </div>
                <div
                  key={i + 4}
                  className={`mt-2 step text-capitalize ${
                    item.visa_status === "file review" ||
                    item.visa_status === "file submission" ||
                    item.visa_status === "file decision" ? "visa_current" : null
                  }`}
                >
                  <span>file review</span>
                </div>
                <div
                  key={i + 5}
                  className={`mt-2 step text-capitalize ${
                    item.visa_status === "file submission" ||
                    item.visa_status === "file decision" ? "visa_current" : null
                  }`}
                >
                  <span>file submission</span>
                </div>
                <div
                  key={i + 6}
                  className={`mt-2 step text-capitalize ${
                    item.visa_status === "file decision" ? "visa_current" : null
                  }`}
                >
                  <span>file decision</span>
                </div>
              </div>
              {/* Display comments based on conditions */}
              {/* {visaStatusRejectComment[item.job_id] &&
          item.visa_status === "decision" ? (
            <div>
              <small>
                {visaStatusRejectComment[item.job_id].lmia_substage === "approved"
                  ? "Congratulation your Limia is Approved"
                  : visaStatusRejectComment[item.job_id].lmia_substage === "awaiting decision"
                  ? "Your Limia status is in progress"
                  : visaStatusRejectComment[item.job_id].lmia_substage === "reject"
                  ? "Sorry to inform you your Limia got rejected."
                  : ""}
              </small>
            </div>
          ) : null} */}
            </div>
          )
        );
      })}
    </div>
    </div>
  );
}
