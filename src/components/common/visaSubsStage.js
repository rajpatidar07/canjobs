import React from "react";

const VisaSubStageSelector = ({
  expandedStatus,
  selectedStatus,
  FilterJson,
  handleSubStageSelection,
  setSelectedSubStage,
  id,
  onVisaUpdateClick
}) => {
  return (
    <div className="bg-white text-dark p-2 sub-stages-container row">
      {(FilterJson.visa_sub_stages[expandedStatus] || []).map((subStage, j) => (
        <div
          key={j}
          className={`sub-stage text-capitalize ${expandedStatus === "file decision" ? "col-4" : "col-6"} ${(selectedStatus || []).some((item) => item.substage === subStage)
              ? "selected"
              : ""
            }`}
          onClick={() => {
            if(!id){
              onVisaUpdateClick()
              handleSubStageSelection(expandedStatus, subStage)
            }else{
              handleSubStageSelection(expandedStatus, subStage)
              if (expandedStatus === "file decision") {
                setSelectedSubStage(subStage)
              }}
          }}
        >
          <input
            type={expandedStatus === "file decision" ? "radio" : "checkbox"}
            className="mx-2"
            checked={(selectedStatus || []).some(
              (item) => item.substage === subStage
            )}
            readOnly
          />
          {subStage}
        </div>
      ))}
    </div>
  );
};

export default VisaSubStageSelector;
