import React from 'react'
import StudyHeader from './StudyComman/studyHeader'

export default function Programs() {
    return (
        <div className="site-wrapper overflow-hidden ">
            <StudyHeader />
            <div className="position-relative z-index-1  pt-18  dark-mode-texts">
            <iframe src="https://canpathways.ca/myapi/program/programs_f.php" title="Program List" className='w-100'style={{height:"150vh"}}></iframe>
            </div>
        </div>
    )
}
