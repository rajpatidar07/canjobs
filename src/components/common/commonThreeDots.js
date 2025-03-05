import React, { useState } from 'react'
import { BsChat, BsThreeDots } from 'react-icons/bs'
// import { GrLineChart } from 'react-icons/gr'
// import { HiOutlineBell } from 'react-icons/hi2'
import ExportExcelButton from './exportExcelButton'
import { Link } from 'react-router-dom'
import { FiFilePlus, FiFolderPlus } from "react-icons/fi";
import AddFolderModal from './Document folder/AddFolderModal';
import { toast } from 'react-toastify';
import { AddSharePointDOcument } from '../../api/api';
export default function CommonThreeDots(props) {
    let [isOpen, setIsOpen] = useState(false);
    let [openFolderModal, setOPenFolderModal] = useState(true);
    let [addFileLoading, setAddFileLoading] = useState(false);
    let [addFileClickOn, setAddFileClickOn] = useState(false);
    let user_type = localStorage.getItem("userType");
    const AddFileClick = async (event) => {
        setAddFileClickOn(true);
        setAddFileLoading(true);
        const files = event.target.files;

        if (files.length > 30) {
            toast.error('You can only upload a maximum of 30 files at a time', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
            });
            setAddFileLoading(false);
            return;
        }

        const allowedTypes = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
        const maxSize = 8 * 1024 * 1024; // 8 MB
        const fileBaseList = [];

        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            const lastDotIndex = file.name.lastIndexOf('.');
            let fileName = file.name.substring(0, lastDotIndex).replace(/\.+/g, '');
            const fileExtension = file.name.substring(lastDotIndex + 1);
            const finalFileName = `${fileName}.${fileExtension}`;

            const updatedFile = new File([file], finalFileName, {
                type: file.type,
                lastModified: file.lastModified,
            });

            if (!allowedTypes.includes(`.${fileExtension.toLowerCase()}`)) {
                toast.error(`Invalid file type '${updatedFile.name}'. Allowed: PDF, DOC, DOCX, JPG, JPEG, PNG`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
                setAddFileLoading(false);
                return;
            }

            if (updatedFile.size > maxSize) {
                toast.error(`File '${updatedFile.name}' exceeds 8 MB size limit`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
                setAddFileLoading(false);
                return;
            }

            fileBaseList.push(updatedFile);
        }

        try {
            const res = await AddSharePointDOcument(
                props?.user_id || '',
                props?.emp_user_type || '',
                props?.folderId,
                '',
                fileBaseList
            );

            if (res.data.message === 'Document Upload') {
                toast.success('Document uploaded successfully', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
                props.setFolderApiCall(true);
            } else if (res.data.message === 'Failed' && res.data.data === 'No Token Found') {
                toast.error('Something went wrong! Try again later', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setAddFileLoading(false);
            setAddFileClickOn(false);
        }
    };
    return (
        <>
            {openFolderModal && <AddFolderModal
                emp_user_type={props.emp_user_type}
                user_id={props.user_id}
                folderId={props.folderId}
                close={() => setOPenFolderModal(false)}
                show={openFolderModal}
                setFolderApiCall={props.setFolderApiCall}
            />}
            <div
                className="position-relative d-inline-block header-btn-devider ml-auto ml-lg-5 pl-2 d-xs-flex align-items-center"
                onMouseEnter={() => setIsOpen(true)}
                onClick={() => setIsOpen(true)}
            >

                <Link
                    className="d-flex align-items-center justify-content-center text-dark"
                >
                    <BsThreeDots size={15} />
                </Link>

                {isOpen && (
                    <div className="dropdown-menu show position-absolute bg-white shadow rounded border-0 "
                        onMouseEnter={() => setIsOpen(true)}
                        onMouseLeave={() => setIsOpen(false)}
                        style={{ left: "auto", right: "0" }} // Align dropdown to the left
                    >
                        {/* {user_type === "admin" && (
                        <Link to="#" className="dropdown-item align-items-center d-none">
                        <HiOutlineBell className="mx-3" /> Notification
                        </Link>
                        )}
                        {user_type === "admin"&&(
                            <Link to="#" className="dropdown-item d-none align-items-center ">
                            <GrLineChart className="mx-3" /> Activity Log
                            </Link>
                            )} */}
                        {(user_type === "admin" && props.applicantTypeId) ? (
                            <button
                                onClick={() => setOPenFolderModal(true)}
                                className="dropdown-item d-flex align-items-center border-0 bg-transparent m-3"
                            >
                                <FiFolderPlus className="mx-3" /> Add folder
                            </button>
                        ) : null}
                        {user_type === 'admin' && props.applicantTypeId && (
                            <label
                                className='dropdown-item d-flex align-items-center border-0 bg-transparent m-3'
                                style={{ cursor: 'pointer' }}
                            >
                                <input
                                    type='file'
                                    accept='.pdf,.doc,.docx,.jpg,.jpeg,.png'
                                    style={{ display: 'none' }}
                                    onChange={AddFileClick}
                                    multiple
                                />
                                {addFileLoading ? (
                                    <div className='spinner-border spinner-border-sm' role='status'>
                                        <span className='sr-only'>Loading...</span>
                                    </div>
                                ) : (
                                    <FiFilePlus className='mx-3' />
                                )}
                                Add file
                            </label>
                        )}
                        {(user_type === "admin" && props.applicantTypeId) ? (
                            <button
                                onClick={() => props.setShowGrpChatBox(true)}
                                className="dropdown-item d-flex align-items-center border-0 bg-transparent m-3"
                            >
                                <BsChat className="mx-3" /> Group discussion
                            </button>
                        ) : null}

                        {user_type === "admin" && (
                            <div
                                className="dropdown-item d-flex align-items-center border-0 bg-transparent"
                            >
                                <ExportExcelButton tableName={props.tableName} type={""} portal={props.portal || ""} applicantType={props.applicantTypeId} status={props.exportCandidatestatus} local={props.local || ""} tableData={props.tableData || []} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>)
}
