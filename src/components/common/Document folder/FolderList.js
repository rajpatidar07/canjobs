import React from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import { BsFiletypeDocx } from "react-icons/bs";
import { FaRegFilePdf, FaFolder } from "react-icons/fa6";
export default function FolderList({ setDocSingleDate, setEditNameForm, showDropDown, setShowDropDown, docTypeList, setFolderID, setDocTypeName }) {

    return (
        <div className=''>
            <div className="file-list">
                {(docTypeList || []).map((item, index) => (
                    <React.Fragment key={index}>
                        <Link className="file-item" to=""
                            onClick={() => {
                                if (item.folder) {
                                    setFolderID(item.id);
                                    setDocTypeName(item.name)
                                }
                            }}
                            onContextMenu={(e) => {
                                e.preventDefault(); // prevent the default behaviour when right clicked
                                setShowDropDown(item.id);
                            }}
                        >
                            <div className="file-background">
                                {item.folder && (
                                    <FaFolder
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            color: '#f5b317b0',
                                        }}
                                    />
                                )}
                                {item.file && item.file.mimeType.startsWith('image/') && (
                                    <img src={item['@microsoft.graph.downloadUrl']} alt={item.name} className="file-icon" />
                                )}
                                {item.file && item.file.mimeType === 'application/pdf' && (
                                    <FaRegFilePdf
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            color: 'red',
                                        }}
                                    />
                                )}
                                {item.file && (item.file.mimeType === 'application/msword' || item.file.mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') && (
                                    <BsFiletypeDocx
                                        // className="file-icon"
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            color: '#2B579A',
                                        }}
                                    />
                                )}
                                <div className="file-content">
                                    <p className="file-name text-capitalize">{item.name.replace("_", " ")}</p>
                                    <p className="modified-time">{moment(item.lastModifiedDateTime).fromNow()}</p>
                                </div>
                            </div>
                        </Link>
                        {(showDropDown === item.id) &&
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <Link onClick={() => {
                                        setEditNameForm(true)
                                        setDocSingleDate(item)
                                    }}>
                                        Edit Name
                                    </Link>
                                </li>
                                {item.folder ? null :
                                    <li className="list-group-item">
                                        Update Document
                                    </li>
                                }
                                <li className="list-group-item text-darger">
                                    Delete
                                </li>
                            </ul>}
                    </React.Fragment>
                ))}
            </div></div>
    )
}
