import React from 'react';

const LmiaSubStageSelector = ({
    expandedStatus,
    selectedStatus,
    FilterJson,
    handleSubStageSelection,
}) => {
    return (
        <div className='bg-white text-dark p-2 sub-stages-container row'>
            {(FilterJson.lima_sub_stages[expandedStatus] || []).map((subStage, j) => (
                <div
                    key={j}
                    className={`sub-stage col-6 text-capitalize ${(selectedStatus || []).some(
                        (item) => item.lmia_substage === subStage
                    )
                            ? 'selected'
                            : ''
                        }`}
                    onClick={() => handleSubStageSelection(expandedStatus, subStage)}
                >
                    <input
                        type="checkbox"
                        className='mx-2'
                        checked={(selectedStatus || []).some(
                            (item) =>
                                item.lmia_substage === subStage
                        )}
                        readOnly
                    />{subStage}
                </div>
            ))}
        </div>
    );
};

export default LmiaSubStageSelector;
