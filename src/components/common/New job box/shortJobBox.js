import React from 'react'

export default function ShortJobBox() {
    return (
        <div className='mt-5'>
            <div className="card p-2">
                {/* Job Title and Company Name */}
                <div className="card-body mb-4">
                    <h4 className="text-2xl font-bold text-gray-800 text-capitalize mb-1 hover:underline"
                    style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}>
                        Card title Lorem ipsum is typically a corrupted version of De finibus bonorum et malorum, a 1st-century BC tex
                    </h4>
                    <p className="text-gray-600 text-capitalize">
                        Company<br />
                        <span>job type at location </span>
                    </p>
                        <p className="card-text" style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}>
                          
                            <ul style={{listStyleType:"circle"}}>
                                <li>
                                    Lorem ipsum is typically a corrupted version of De finibus bonorum et malorum, a 1st-century BC text by the Roman.</li>
                                <li>
                                    Versions of the Lorem ipsum text have been used in typesetting at least since the 1960s, when it was popularized by advertisements for Letraset transfer sheets.[1] Lorem ipsum was introduced to the digital world in the mid-1980s, when Aldus employed it in graphic and word-processing templates for its desktop publishing program PageMaker. Other popular word processors, including Pages and Microsoft Word, have since adopted Lorem ipsum,[2] as have many LaTeX packages,[3][4][5] web content managers such as Joomla! and WordPress, and CSS libraries such as Semantic UI.
                                </li>
                            </ul>
                        </p>
                        <p>Posted 4 days ago</p>
                </div>
            </div>
        </div>
    )
}
