import React from 'react';

const LmiaSubStageSelector = ({
    expandedStatus,
    selectedStatus,
    FilterJson,
    handleSubStageSelection,
    lmia_status
}) => {
    return (
        <div className='bg-white text-dark p-2 sub-stages-container row'>
            {
            (FilterJson.lima_sub_stages[expandedStatus] || []).map((subStage, j) => (
                <div key={j}
                    className={
                        `sub-stage text-capitalize ${
                            (selectedStatus || []).some((item) => item.lmia_substage === subStage) ? 'selected' : lmia_status === "decision" ? 'col-4' : "col-6"
                        }`
                    }
                    onClick={
                        () => handleSubStageSelection(expandedStatus, subStage)
                }>
                    <input type={
                            lmia_status === "decision" ? "radio" : "checkbox"
                        }
                        className='mx-2'
                        checked={
                            (selectedStatus || []).some((item) => item.lmia_substage === subStage)
                        }
                        readOnly/>{subStage} </div>
            ))
        } </div>
    );
};

export default LmiaSubStageSelector;
