import React from 'react';
import FilterJson from '../json/filterjson';

export default function VisaTimeLine({ visa}) {
    /*function to get the stage of lmia */
    const currentIndex = FilterJson.visa_status.findIndex(
        (status) => status === visa
    );
    return (
        <div className=''>
            <div className="arrow-wrapper">
                <div className="arrow-steps clearfix p-2">
                    {(FilterJson.visa_status || []).map((status, i) => {
                        const isDone = currentIndex > -1 && i <= currentIndex;
                        return (
                            <div key={i}
                                className={`step m-2 ${isDone ? 'visa_current text-capitalize' : 'text-capitalize'}`}> 
                                <span>{status}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div >
    );
}
