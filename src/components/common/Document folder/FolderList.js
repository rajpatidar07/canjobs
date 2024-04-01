import React from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import { BsFiletypeDocx } from "react-icons/bs";
import { FaRegFilePdf, FaFolder } from "react-icons/fa6";
export default function FolderList({ docTypeList, setFolderID, setPrevFolderID }) {
    return (
        <div><div className="file-list">
            {(docTypeList || []).map((item, index) => (
                <Link className="file-item" key={index} to=""
                    onClick={() => {
                        if (item.folder) {
                            setFolderID(item.id);
                            setPrevFolderID(item.parentReference.id);
                        }
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
                            <p className="file-name text-capitalize">{item.name}</p>
                            <p className="modified-time">{moment(item.lastModifiedDateTime).fromNow()}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div></div>
    )
}
