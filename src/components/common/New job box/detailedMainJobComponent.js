import React from 'react'
import ShortJobBox from './shortJobBox'
import JobDetailLeftCardBox from './jobDetailLeftCard'

export default function DetailedMainJobComponent() {
  return (
    <div className='border-top'>
        <div className='row mt-5'>
            <div className='col-6'>
                <ShortJobBox/>
                <ShortJobBox/>
                <ShortJobBox/>
                <ShortJobBox/>
                <ShortJobBox/>
                <ShortJobBox/>
                <ShortJobBox/>
                <ShortJobBox/>
                <ShortJobBox/>
                </div>
            <div className='col-6 '>
                <JobDetailLeftCardBox/>
            </div>
        </div>
    </div>
  )
}
