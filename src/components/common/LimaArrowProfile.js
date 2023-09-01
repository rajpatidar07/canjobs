import React from "react";
import { useLocation } from "react-router-dom";

export default function LimaArrowProfile({ lmia, lmiaStatusRejectComment }) {
  let location = useLocation();
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
                    className={`${
                      location.pathname === `/company_detail` ||
                      location.pathname === "/jobdetailpage"
                        ? `mt-2 step text-capitalize ${
                            status.lmia_status === "onboarding" ||
                            status.lmia_status === "advertisements" ||
                            status.lmia_status === "documentation" ||
                            status.lmia_status === "candidate placement" ||
                            status.lmia_status === "submission" ||
                            status.lmia_status === "decision"
                              ? "current"
                              : null
                          }`
                        : `d-none`
                    }`}
                  >
                    <span>onboarding</span>
                  </div>
                  <div
                    key={i + 2}
                    className={`${
                      location.pathname === `/company_detail` ||
                      location.pathname === "/jobdetailpage"
                        ? `mt-2 step text-capitalize ${
                            status.lmia_status === "documentation" ||
                            status.lmia_status === "advertisements" ||
                            status.lmia_status === "candidate placement" ||
                            status.lmia_status === "submission" ||
                            status.lmia_status === "decision"
                              ? "current"
                              : null
                          }`
                        : `d-none`
                    }`}
                  >
                    <span>advertisements</span>
                  </div>
                  <div
                    key={i + 3}
                    className={`${
                      location.pathname === `/company_detail` ||
                      location.pathname === "/jobdetailpage"
                        ? `mt-2 step text-capitalize ${
                            status.lmia_status === "documentation" ||
                            status.lmia_status === "candidate placement" ||
                            status.lmia_status === "submission" ||
                            status.lmia_status === "decision"
                              ? "current"
                              : null
                          }`
                        : `d-none`
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
                {/*Comment for the decision status of the lima*/}
                {status.lmia_status === "decision" &&
                  lmiaStatusRejectComment[0] !== undefined &&
                  (lmiaStatusRejectComment || []).map((item, i) => {
                    return (
                      item === undefined ||
                      item === "undefined" ||
                      item === null ||
                      item === "null"
                        ? null
                        : location.pathname === "/company_detail" ||
                        location.pathname === "/jobdetailpage"
                        ? item.job_id === status.job_id
                        : item.lmia_id === status.id
                    ) ? (
                      <small className="mx-10" key={i}>
                        {item.lmia_substage === "approved"
                          ? "Congratulation your Limia is Approved"
                          : item.lmia_substage === "awaiting decision"
                          ? "Your Limia status is in progress"
                          : item.lmia_substage === "reject"
                          ? "Sorry to inform you your Limia got rejected."
                          : ""}
                      </small>
                    ) : null;
                  })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
