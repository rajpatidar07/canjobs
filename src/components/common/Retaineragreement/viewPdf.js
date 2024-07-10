import React from 'react'
import { Modal } from 'react-bootstrap'
import AdobePDFViewer from '../Adobe/adobeFile';
import Loader from "../../common/loader"
// import MainRetainerAggHtml from './MainRetainerAggHtml';

export default function ViewPdf({ show,
  close,
  agreementData,
  emp_user_type,
  userData,
  setApicall,
  folderId,
  user_id,
  setOpenViewAgreementSign,
  setOpenAddAgreementFelids,
  docLoader,
pdf }) {
 
  /*FUnction to open add signature modal */
  const addSignatureCLick = async () => {
    setOpenViewAgreementSign("sign")
    setOpenAddAgreementFelids(true)
    close()
  }
//   const DownloadPdf = (pdf) => {
//     const pdfUrl = pdf["@microsoft.graph.downloadUrl"];
//     const link = document.createElement("a");
//     link.href = pdfUrl;
//     link.download = pdf.name; // specify the filename
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
// };
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
          View Agreement Pdf
        </h3>
        {
        // openAddSignatureModal ?
        //   <div className='border'>
        //     <MainRetainerAggHtml
        //       openSignature={"yes"}
        //       userData={userData}
        //       user_id={user_id}
        //       emp_user_type={emp_user_type}
        //       folderId={folderId}
        //       setOpenAgreement={""}
        //       agreementData={agreementData}
        //       close={close}
        //       setApicall={setApicall} />
        //   </div>
        //   :
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
            <div className={`"d-flex justify-content-between p-4`}>
              <button className={agreementData.initial ? "d-none" :'btn btn-secondary'} onClick={() => addSignatureCLick()}>Add Signature</button>
              {/* <button className='btn btn-info' onClick={() => DownloadPdf(pdf)}>Download</button> */}
            </div>
          </div>}
      </div>

    </Modal>
  )
}
