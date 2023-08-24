import React from 'react';

const VisaSubStageSelector = ({
    expandedStatus,
    selectedStatus,
    FilterJson,
    handleSubStageSelection,
}) => {
    return (
        <div className='bg-white text-dark p-2 sub-stages-container row'>
            {(FilterJson.visa_sub_stages[expandedStatus] || []).map((subStage, j) => (
                <div
                    key={j}
                    className={`sub-stage col-6 text-capitalize ${(selectedStatus || []).some(
                        (item) => item.substage === subStage
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
                                item.substage === subStage
                        )}
                        readOnly
                    />{subStage}
                </div>
            ))}
        </div>
    );
};

export default VisaSubStageSelector;
