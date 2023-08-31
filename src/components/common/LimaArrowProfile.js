import React from "react";

export default function LimaArrowProfile({ lmia, lmiaStatusRejectComment }) {
//   console.log(JSON.stringify(lmiaStatusRejectComment));
  return (
    <div>
      <div className="bg-white w-100 d-flex flex-wrap mb-1">
        <div className="arrow-wrapper custome_arrow_wrapper w-100 d-flex flex-wrap mb-0">
          {(lmia || []).map((status, i) => {
            return status.lmia_status === "" ||
              status.lmia_status === null ||
              status.lmia_status === undefined ||
              status.lmia_status === "undefined" ? null : (
              <div
                className={
                  "arrow-steps p-1 px-7 col-md-12 d-flex border-right border-bottom "
                }
                key={i}
              >
                <div className="mt-2 job_name text-dark">
                  <span className="m-0 font-size-2 d-block mb-1">
                    {status.job_title}
                  </span>
                </div>
                <div>
                  <div
                    key={i + 1}
                    className={`mt-2 step text-capitalize ${
                      status.lmia_status === "onboarding" ||
                      status.lmia_status === "advertisements" ||
                      status.lmia_status === "documentation" ||
                      status.lmia_status === "candidate placement" ||
                      status.lmia_status === "submission" ||
                      status.lmia_status === "decision"
                        ? "current"
                        : null
                    }`}
                  >
                    <span>onboarding</span>
                  </div>
                  <div
                    key={i + 2}
                    className={`mt-2 step text-capitalize ${
                      status.lmia_status === "documentation" ||
                      status.lmia_status === "advertisements" ||
                      status.lmia_status === "candidate placement" ||
                      status.lmia_status === "submission" ||
                      status.lmia_status === "decision"
                        ? "current"
                        : null
                    }`}
                  >
                    <span>advertisements</span>
                  </div>
                  <div
                    key={i + 3}
                    className={`mt-2 step text-capitalize ${
                      status.lmia_status === "documentation" ||
                      status.lmia_status === "candidate placement" ||
                      status.lmia_status === "submission" ||
                      status.lmia_status === "decision"
                        ? "current"
                        : null
                    }`}
                  >
                    <span>documentation</span>
                  </div>
                  <div
                    key={i + 4}
                    className={`mt-2 step text-capitalize ${
                      status.lmia_status === "candidate placement" ||
                      status.lmia_status === "submission" ||
                      status.lmia_status === "decision"
                        ? "current"
                        : null
                    }`}
                  >
                    <span>candidate placement</span>
                  </div>
                  <div
                    key={i + 5}
                    className={`mt-2 step text-capitalize ${
                      status.lmia_status === "submission" ||
                      status.lmia_status === "decision"
                        ? "current"
                        : null
                    }`}
                  >
                    <span>submission</span>
                  </div>
                  <div
                    key={i + 6}
                    className={`mt-2 step text-capitalize ${
                      status.lmia_status === "decision" ? "current" : null
                    }`}
                  >
                    <span>decision</span>
                  </div>
                </div>
                {/* {JSON.stringify(lmiaStatusRejectComment)} */}
                {/* {lmiaStatusRejectComment[0] != undefined &&
                lmiaStatusRejectComment[0] != "undefined" ? (
                  <div>
                    {(lmiaStatusRejectComment || []).map((item, index) => {
                      return item.job_id;
                    })}
                    {JSON.stringify(lmiaStatusRejectComment)}  ==== {status.job_id}
                  </div>
                ) : (
                  "________"
                )} */}

                {status.lmia_status === "decision" &&
                // lmiaStatusRejectComment[0].job_id === status.job_id &&
                (lmiaStatusRejectComment[0] !== undefined) &&
                (lmiaStatusRejectComment[0] !=="undefined") ? (
                  <small className="mx-10">
                    {lmiaStatusRejectComment[0].lmia_substage}
                    {lmiaStatusRejectComment[0].lmia_substage === "approved"
                      ? "Congratulation your Limia is Approved"
                      : lmiaStatusRejectComment[0].lmia_substage ===
                        "awaiting decision"
                      ? "Your Limia status is in progress"
                      : lmiaStatusRejectComment[0].lmia_substage === "reject"
                      ? "Sorry to inform you your Limia got rejected."
                      : ""}
                  </small>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
