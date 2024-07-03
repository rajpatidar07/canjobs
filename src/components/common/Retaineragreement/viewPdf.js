import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { getSharePointParticularFolders } from '../../../api/api';
import AdobePDFViewer from '../Adobe/adobeFile';
import Loader from "../../common/loader"
import MainRetainerAggHtml from './MainRetainerAggHtml';

export default function ViewPdf({ show,
  close,
  agreementData,
  emp_user_type,
  userData,
  setApicall,
  folderId,
  user_id }) {
  let [docLoader, setDocLoder] = useState(false)
  let [openAddSignatureModal, setOpenAddSignatureModal] = useState(false)
  let [pdf, setPdf] = useState("")
  const GetAgreementPdf = async () => {
    try {
      // if (folderID) {
      let res = await getSharePointParticularFolders(
        user_id,
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
  useEffect(() => {
    GetAgreementPdf()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const addSignatureCLick = async () => {
    setOpenAddSignatureModal(true)
  }
  return (
    <Modal show={show}
      size="lg"
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
        {openAddSignatureModal ?
        <div className='border'>
          <MainRetainerAggHtml
            openSignature={"yes"}
            userData={userData}
            user_id={user_id}
            emp_user_type={emp_user_type}
            folderId={folderId}
            setOpenAgreement={""}
            agreementData={agreementData} />
            </div>
             :
          <div>
            <div>
              {docLoader ? (
                <div className="table-responsive main_table_div">
                  <Loader />
                </div>
              ) : <AdobePDFViewer
                url={pdf["@microsoft.graph.downloadUrl"]}
                data={pdf}
                userId={user_id}
                commentsList={[]}
                selectedMentionAdmin={[]}
                DocUserType={emp_user_type}
                adminList={[]}
                partnerList={[]}
                setCommentsList={[]}
                userType={""}
              />}
            </div>
            <div className='d-flex justify-content-between p-4'>
              <button className='btn btn-secondary' disabled={agreementData.initial} onClick={() => addSignatureCLick()}>Add Signature</button>
            </div>
          </div>}
      </div>

    </Modal>
  )
}
