import React from "react";

export default function VisaArrowProfile({
  visaStatus,
  visaStatusRejectComment,
}) {
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
                  "arrow-steps "
                }
                key={i}
              >
                <div className="mt-2 job_name text-dark">
                  <span className="m-2 font-size-2 d-block mb-1">
                    visa
                  </span>
                </div>
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
                        ? "approved"
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
                      item.visa_status === "file decision"
                        ? "approved"
                        : null
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
                      item.visa_status === "file decision"
                        ? "approved"
                        : null
                    }`}
                  >
                    <span>file preparation</span>
                  </div>
                  <div
                    key={i + 4}
                    className={`mt-2 step text-capitalize ${
                      item.visa_status === "file review" ||
                      item.visa_status === "file submission" ||
                      item.visa_status === "file decision"
                        ? "approved"
                        : null
                    }`}
                  >
                    <span>file review</span>
                  </div>
                  <div
                    key={i + 5}
                    className={`mt-2 step text-capitalize ${
                      item.visa_status === "file submission" ||
                      item.visa_status === "file decision"
                        ? "approved"
                        : null
                    }`}
                  >
                    <span>file submission</span>
                  </div>
                  {/* <div
                    key={i + 6}
                    className={`mt-2 step text-capitalize ${
                      item.visa_status === "file decision"
                        ? "approved"
                        : null
                    }`}
                  >
                    <span>file decision</span>
                  </div> */}
                {/*Comment for the decision status of the visa*/}
                {item.visa_status === "file decision" &&
                visaStatusRejectComment[i] !== undefined ?
                  (visaStatusRejectComment[i] || []).map((subitem, i) => {
                    return subitem.misc_id === item.visa_id ? (
                      <div
                    key={i }
                    className={`mt-2 step text-capitalize ${
                      subitem.substage === "approved"
                          ? "approved"
                          : subitem.substage === "awaiting decision"
                          ? "pending"
                          : subitem.substage === "rejected"
                          ? "rejected"
                          : ""
                    }`}
                  >
                    <span>{subitem.substage === "approved"
                          ? "Approved"
                          : subitem.substage === "awaiting decision"
                          ? "Pending"
                          : subitem.substage === "rejected"
                          ? "Rejected"
                          : "file decision"}</span>
                  </div>
                      // <small className="mx-10" key={i}>
                        // {subitem.substage === "approved"
                        //   ? "Congratulation your Visa is Approved"
                        //   : subitem.substage === "awaiting decision"
                        //   ? "Your Visa is in progress"
                        //   : subitem.substage === "rejected"
                        //   ? "Sorry to inform you your Visa got rejected."
                        //   : ""}
                      // </small>
                    ) : null;
                  }):
                  <div
                    key={i + 6}
                    className={`mt-2 step text-capitalize ${
                      item.visa_status === "file decision"
                        ? "approved"
                        : ""
                    }`}
                  >
                    <span>file decision</span>
                  </div>}
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}
