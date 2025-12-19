import React from "react";

export default function ApplicantTypeTimeLine(props) {
    const numberArray = props?.All_types?.split(',').map(Number);
    /*function to get the stage of Applicant type */
    const currentIndex = numberArray ? numberArray[numberArray?.length - 1] : 0;

    return (
        <div
            className={"p-1 pl-2 pr-6 col-md-12 d-flex border-right border-bottom bg-white mb-1"
            }
        >
            <div className="arrow-wrapper custome_arrow_wrapper w-100 d-flex flex-wrap mb-0">
                <div className="job_name text-dark">
                    <span
                        className={`m-2 font-size-2 d-block mb-1`}
                    >
                        Applicant types
                    </span>
                </div>
                <div className="arrow-steps ">
                    {(numberArray || []).map((id, i) => {
                        const matchedItem = props?.ApplicantTypeList.find((item) => Number(item.id) === id);
                        if (!matchedItem) return null;

                        return (
                            <div
                                key={i}
                                className={`step text-capitalize ${currentIndex === id ? "pending" : "approved"
                                    }`}
                            >
                                <span className="text-capitalize">
                                    {matchedItem.title || matchedItem.name || matchedItem.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
