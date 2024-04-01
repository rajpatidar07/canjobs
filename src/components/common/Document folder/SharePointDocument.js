import React, { useState, useEffect } from 'react';
import { getSharePointFoldersList, getSharePointParticularFolders } from '../../../api/api';
// import { Dropdown, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GrLinkPrevious } from "react-icons/gr";
import FolderList from './FolderList';
import { toast } from 'react-toastify';
import DocSaveForm from './DocSaveForm';
export default function SharePointDocument({ emp_user_type, employee_id }) {
    // const [docTypeName, setDocTypeName] = useState('');
    // const [newType, setNewType] = useState('');
    const [docFileBase, setDocFileBase] = useState('');
    const [folderID, setFolderID] = useState('');
    const [saveBtn, setSaveBtn] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [prevFolderID, setPrevFolderID] = useState('');
    const [docTypeList, setDocTypeList] = useState([]);

    // const DocTypeData =
    //     emp_user_type === 'employer'
    //         ? [
    //             'Business T2',
    //             'Recent PD7A',
    //             'Business T4',
    //             'Business Incorporation Certificate',
    //             'Employment Contract',
    //             'Schedule A',
    //             'Signed Job Offer',
    //             'PD7A of year',
    //             'T2 Schedule 100 and 125',
    //             'Certificate of incorporation',
    //             'Business license',
    //             'T4 summary of year',
    //             'Request for Exception from English Language Requirement for LMIA Application',
    //             'CPA Attestation Letter',
    //             'Representative Submission Letter',
    //         ]
    //         : [
    //             'passport',
    //             'drivers_license',
    //             'photograph',
    //             'immigration_status',
    //             'lmia',
    //             'job_offer_letter',
    //             'provincial_nominee_letter',
    //             'proof_of_funds',
    //             'proof_of_employment',
    //             'marriage_certificate',
    //             'education_metric',
    //             'education_higher_secondary',
    //             'education_graduation',
    //             'education_post_graduation',
    //             'resume_or_cv',
    //             'ielts',
    //             'medical',
    //             'police_clearance',
    //             'refusal_letter',
    //             'Employment Contract',
    //             'Reference Letters',
    //             'Client Info',
    //             'Representative Submission Letter',
    //             'Bank Statement',
    //         ];
    /*Function to call api to get all folders list of employees documnet from sharepoint */
    const AllShareType = async () => {
        try {
            if (folderID) {
                let res = await getSharePointParticularFolders(employee_id, emp_user_type, folderID)
                if (res.data.status === 1) {
                    setDocTypeList(res.data.data)
                    setFolderID(res.data.data[0].parentReference.id)
                }
            } else {
                let res = await getSharePointFoldersList(employee_id, emp_user_type)
                if (res.data.status === 1) {
                    setDocTypeList(res.data.data)
                }
            }
        } catch (Err) {
            console.log(Err)
        }
    }
    useEffect(() => {
        AllShareType()
    }, [folderID])
    /*On change fnction to upload bulk document in 1 array*/
    const handleBulkFileChange = async (event, id) => {
        const files = event.target.files;
        {
            // Check the number of files selected
            if (files.length > 30) {
                toast.error("You can only upload a maximum of 30 files at a time", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
                return;
            }

            // Continue with file validation and processing
            const allowedTypes = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];
            const maxSize = 1024 * 8000; // 8 MB

            const filebseList = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                // Check file type
                const fileType = `.${file.name.split(".").pop()}`;
                if (!allowedTypes.includes(fileType.toLowerCase())) {
                    toast.error(
                        `Invalid document type for file '${file.name}'. Allowed types: PDF, DOC, DOCX, JPG, JPEG, PNG`,
                        {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 1000,
                        }
                    );
                    return;
                }

                // Check file size
                if (file.size > maxSize) {
                    toast.error(
                        `Document size can't be more than 8 MB for file '${file.name}'`,
                        {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 1000,
                        }
                    );
                    return;
                }

                // Read file as data URL
                const reader = new FileReader();
                reader.readAsDataURL(file);
                //For drive uploade
                filebseList.push(file)
            }
            // Store the object of files
            setDocFileBase(filebseList);
            setSaveBtn(true)
            //   bulkUpload === "no" ? setDocName(DocRealName) : setDocName("");
        }
    };
    //Document Save Function
    const SaveBulkDocument = async () => {
        setLoadingBtn(true)
        try {
            // let res
            setLoadingBtn(false)
            setSaveBtn(false)
        } catch (err) {
            console.log(err)
            setLoadingBtn(false)
            setSaveBtn(false)
        }
    }
    // const handleDocTypeChange = (selectedType) => {
    //     setDocTypeName(selectedType);
    //     if (selectedType === 'other') {
    //         // If "other" is selected, clear newType
    //         setNewType('');
    //     }
    // };

    // const handleNewTypeChange = (e) => {
    //     const value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '');
    //     setNewType(value);
    // };
    console.log(docFileBase)
    return (
        <div className={'document_container bg-white'}>
            <div className="row m-0 bg-white">
                {/* Button to add folder or type and upload documents */}
                {/* {docTypeName === 'other' ? (
                    <Form.Control
                        type="text"
                        value={newType}
                        placeholder="Enter new type"
                        onChange={handleNewTypeChange}
                    />
                ) : (
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            + Add New type
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleDocTypeChange('')} key={-1}>
                                Select document
                            </Dropdown.Item>
                            {DocTypeData.map((item, index) => (
                                <Dropdown.Item onClick={() => handleDocTypeChange(item)} key={index} className='text-capitalize'>
                                    {item.replaceAll("_", " ")}
                                </Dropdown.Item>
                            ))}
                            <Dropdown.Item onClick={() => handleDocTypeChange('other')}>
                                Other
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                )} */}
                {/* Upload Document form*/}
                <DocSaveForm
                    handleBulkFileChange={handleBulkFileChange}
                    saveBtn={saveBtn}
                    loadingBtn={loadingBtn}
                    SaveBulkDocument={SaveBulkDocument} />
                {folderID !== prevFolderID &&
                    <Link onClick={() => setFolderID(prevFolderID)}>
                        <GrLinkPrevious />
                    </Link>}
                {/* List of documents docTypeList */}
                <FolderList
                    docTypeList={docTypeList}
                    setFolderID={setFolderID}
                    setPrevFolderID={setPrevFolderID} />
            </div>
        </div>
    );
}
