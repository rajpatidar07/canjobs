import React from 'react';
import FilterJson from '../json/filterjson';

export default function VisaTimeLine({ visa}) {
    /*function to get the stage of lmia */
    const currentIndex = FilterJson.visa_status.findIndex(
        (status) => status === visa
    );
    return (
        <div className=''>
            <div className="arrow-wrapper custome_arrow_wrapper w-100 d-flex flex-wrap mb-0">
                <div className="arrow-steps ">
                    {(FilterJson.visa_status || []).map((status, i) => {
                        const isDone = currentIndex > -1 && i <= currentIndex;
                        return (
                            <div key={i}
                                className={`step m-2 text-capitalize ${isDone ? 'approved ' : 'text-capitalize'}`}> 
                                <span>{status}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div >
    );
}
