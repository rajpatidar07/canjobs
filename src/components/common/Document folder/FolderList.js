import React from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import { BsFiletypeDocx } from "react-icons/bs";
import { FaRegFilePdf, FaFolder } from "react-icons/fa6";
export default function FolderList({ setDocPreview, ShowDeleteAlert, setDocSingleDate, setEditNameForm, showDropDown, setShowDropDown, docTypeList, setFolderID, setDocTypeName }) {

    return (
        <div className=''>
            <div className="file-list">
                {(docTypeList || []).map((item, index) => (
                    <React.Fragment key={index}>
                        {console.log(item.id)}
                        <Link className="file-item" to=""
                            onClick={() => {
                                if (item.folder) {
                                    setFolderID(item.id);
                                    setDocTypeName(item.name) 
                                } else {
                                    setDocPreview(true)
                                    setDocSingleDate(item)
                                    setFolderID(item.id);
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
                                        Rename
                                    </Link>
                                </li>
                                <li className="list-group-item text-darger">
                                    <Link onClick={() => ShowDeleteAlert(item)}> Delete {item.folder ? "Folder" : "File"}
                                    </Link>
                                </li>
                            </ul>}
                    </React.Fragment>
                ))}
            </div></div>
    )
}
