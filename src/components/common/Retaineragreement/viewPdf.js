import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { getSharePointParticularFolders } from '../../../api/api';
// import 'bootstrap/dist/css/bootstrap.min.css';

export default function ViewPdf({ show,
    close,
    agreementData,
    emp_user_type,
    userData,
    setApicall,
    folderId }) {
        let [docLoader,setDocLoder]=useState(false)
        let [pdf,setPdf]=useState("")
        const GetAgreementPdf =async()=>{
            try {
                // if (folderID) {
                let res = await getSharePointParticularFolders(
                    emp_user_type === "employee" ? userData.employee_id : userData.company_id,
                  emp_user_type,
                   folderId
                );
                if (res.data.status === 1) {
                  setDocLoder(false);
                    if (res.data.data.find((item) => item.id === agreementData.document_id)) {
                        setPdf(res.data.data.find((item) => item.id === agreementData.document_id))
                        console.log(res.data.data.find((item) => item.id === agreementData.document_id))
                } else if (res.data.data === "No Documents Found") {
                  setDocLoder(false);
                } else {
                  setDocLoder(false);
                }
            }
              } catch (Err) {
                console.log(Err);
                setDocLoder(false);
              }
        }
        useEffect(()=>{
            GetAgreementPdf()
        },[])
    return (
        <Modal show={show}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <button
                type="button"
                className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
                data-dismiss="modal"
                onClick={close}
            >
                <i className="fas fa-times"></i>
            </button>
            <div className="bg-white rounded h-100 px-11 pt-7">
                <h3 className='text-center'>
                  Preview Agreement 
                </h3>
                <div>
                    <iframe src={pdf["@microsoft.graph.downloadUrl"]} width="100%" height="500px" title="PDF Viewer"></iframe>
                </div>
                <div className='d-flex justify-content-between p-4'>
                    
                <button className='btn btn-secondary' onClick={() => alert('Add Signature clicked')}>Add Signature</button><button className='btn btn-primary' onClick={() => alert('Generate PDF clicked')}>Generate PDF</button>
                </div>
            </div>

        </Modal>
    )
}
