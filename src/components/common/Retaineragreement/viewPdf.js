// import React from "react";
// import { Modal } from "react-bootstrap";
// import AdobePDFViewer from "../Adobe/adobeFile";
// import Loader from "../../common/loader";
// // import MainRetainerAggHtml from './MainRetainerAggHtml';

// export default function ViewPdf({
//   show,
//   close,
//   agreementData,
//   emp_user_type,
//   userData,
//   setApicall,
//   folderId,
//   user_id,
//   setOpenViewAgreementSign,
//   setOpenAddAgreementFelids,
//   docLoader,
//   pdf,
//   type
// }) {
//   /*Function to open add signature modal */
//   // const addSignatureCLick = async () => {
//   //   setOpenViewAgreementSign("sign");
//   //   setOpenAddAgreementFelids(true);
//   //   close();
//   // };
//   //   const DownloadPdf = (pdf) => {
//   //     const pdfUrl = pdf["@microsoft.graph.downloadUrl"];
//   //     const link = document.createElement("a");
//   //     link.href = pdfUrl;
//   //     link.download = pdf.name; // specify the filename
//   //     document.body.appendChild(link);
//   //     link.click();
//   //     document.body.removeChild(link);
//   // };
//   return (
//     <Modal
//       show={show}
//       size="xl"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//       className="mt-0 h-100vh"
//     >
//       <button
//         type="button"
//         className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
//         data-dismiss="modal"
//         onClick={close}
//       >
//         <i className="fas fa-times"></i>
//       </button>
//       <div className="bg-white rounded p-5">
//         <h5 className="text-center">View Agreement Pdf</h5>
//         {
//           // openAddSignatureModal ?
//           //   <div className='border'>
//           //     <MainRetainerAggHtml
//           //       openSignature={"yes"}
//           //       userData={userData}
//           //       user_id={user_id}
//           //       emp_user_type={emp_user_type}
//           //       folderId={folderId}
//           //       setOpenAgreement={""}
//           //       agreementData={agreementData}
//           //       close={close}
//           //       setApicall={setApicall} />
//           //   </div>
//           //   :
//           <div>
//             <div>
//               {docLoader ? (
//                 <div className="table-responsive main_table_div">
//                   <Loader />
//                 </div>
//               ) : (
//                 <AdobePDFViewer
//                   url={pdf["@microsoft.graph.downloadUrl"]}
//                   data={pdf}
//                   userId={user_id}
//                   commentsList={[]}
//                   selectedMentionAdmin={[]}
//                   DocUserType={emp_user_type}
//                   adminList={[]}
//                   partnerList={[]}
//                   setCommentsList={[]}
//                   userType={""}
//                 />
//               )}
//             </div>
//             {/* <div className={`"d-flex justify-content-between p-4 d-none`}>
//               <button
//                 className={
//                   agreementData.initial ? "d-none" : "btn btn-secondary"
//                 }
//                 onClick={() => addSignatureCLick()}
//               >
//                 Add Signature
//               </button>
//               <button className='btn btn-info' onClick={() => DownloadPdf(pdf)}>Download</button>
//             </div> */}
//           </div>
//         }
//       </div>
//     </Modal>
//   );
// }
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import AdobePDFViewer from "../Adobe/adobeFile";
import Loader from "../../common/loader";
import { useLocation } from "react-router-dom";
import { GetAgent, getallAdminData, GetCommentsAndAssign, GetDocConvertToken, getSharePointParticularFolders } from "../../../api/api";
import { jsPDF } from "jspdf";
export default function ViewPdf({
  show,
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
  pdf,
  type
}) {
  let location = useLocation()
  const queryParams = new URLSearchParams(location.search);
  const [new_emp_user_type] = useState(queryParams.get("new_emp_user_type"))
  const [new_user_id] = useState(queryParams.get("new_user_id"))
  const [new_folderId] = useState(queryParams.get("folderId"))
  const [new_document_id] = useState(queryParams.get("document_id"))
  const [Partner_id] = useState(queryParams.get("partner_id"))
  let [newPdf, setNewPdf] = useState()
  let [newPdfUrl, setNewPdfUrl] = useState()
  let [newDocLoder, setNewDocLoder] = useState(false)
  let [commentsList, setCommentsList] = useState([])
  let [adminList, setAdminList] = useState([])
  let [partnerList, setPartnerist] = useState([])
  // let [docTypeList, setDocTypeList] = useState([])


  let GetPdfDocument = async () => {
    try {
      let res = await getSharePointParticularFolders(
        new_user_id,
        new_emp_user_type,
        new_folderId
      );
      if (res.data.status === 1) {
        setNewDocLoder(false);
        // setDocTypeList(res.data.data)
        if (res.data.data.find((item) => item.id === new_document_id)) {
          let data = res.data.data.find((item) => item.id === new_document_id)
          setNewPdf(data);
          getCommentsList(data)
          if (
            data.file.mimeType === "image/jpeg" ||
            data.file.mimeType === "image/png" ||
            data.file.mimeType === "image/jpg"
          ) {
            // Await the conversion if convertUrlToPDF is asynchronous
            convertUrlToPDF(data["@microsoft.graph.downloadUrl"]);
          } else if (
            data.file.mimeType ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          ) {
            // Await the conversion if convertToPDF is asynchronous
            convertToPDF(data);
          } else {
            setNewPdfUrl(data["@microsoft.graph.downloadUrl"]); // Update state if necessary
          }
        } else if (res.data.data === "No Documents Found") {
          setNewDocLoder(false);
        } else {
          setNewDocLoder(false);
        }
      }
    } catch (Err) {
      console.log(Err);
      setNewDocLoder(false);
    }
  }
  /*Function to convert the Image into pdf */
  const convertUrlToPDF = (imageUrl) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // Enable cross-origin resource sharing (CORS) for the image
    img.src = imageUrl;
    img.onload = () => {
      const doc = new jsPDF();
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = doc.internal.pageSize.getHeight();
      let imgWidth, imgHeight;
      const imgAspectRatio = img.width / img.height;
      const pdfAspectRatio = pdfWidth / pdfHeight;
      if (imgAspectRatio > pdfAspectRatio) {
        // Image is wider than the PDF page
        imgWidth = pdfWidth;
        imgHeight = imgWidth / imgAspectRatio;
      } else {
        // Image is taller than or equal to the PDF page
        imgHeight = pdfHeight;
        imgWidth = imgHeight * imgAspectRatio;
      }
      const xPosition = (pdfWidth - imgWidth) / 2;
      const yPosition = (pdfHeight - imgHeight) / 2;
      doc.addImage(img, "JPEG", xPosition, yPosition, imgWidth, imgHeight); // Set the image dimensions to fit the PDF page
      // Convert PDF to Blob
      const pdfBlob = doc.output("blob");
      // Convert PDF Blob to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setNewPdfUrl(base64String);
        // if (base64String) {
        //   setImgConRes("imageConverted");
        // }
      };
      reader.readAsDataURL(pdfBlob);
    };
  };
  // Function to convert a docx to pdf
  const convertToPDF = async (data) => {
    try {
      let response = await GetDocConvertToken();
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${response.data.data}`);
      myHeaders.append("Content-type", "application/json");

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };
      fetch(
        `https://graph.microsoft.com/v1.0${data.parentReference.path}/${data.name}:/content?format=pdf`,
        requestOptions
      )
        .then(function (resp) {
          return resp.blob();
        })
        .then(function (blob) {
          setNewPdfUrl(window.URL.createObjectURL(blob));
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error("Error downloading or parsing the file:", error);
    }

    return; // Return the base64 PDF data
  };
  const getCommentsList = async (data) => {
    if (data) {
      localStorage.setItem("mentionAdmin", "");
      try {
        let res = await GetCommentsAndAssign(
          data.id, //docId,
          "", // adminid,
          "", // annotationStatus,
          "document"
        );
        if (res.data.status === (1 || "1")) {
          setCommentsList(res.data.data.data);
        } else if (res.data.message === "Task data not found") {
          setCommentsList([]);
        }
      } catch (err) {
        console.log(err);
        setCommentsList([]);
      }

    } else {
      setCommentsList([]);
    }
  };
  /*Function to get admin data */
  const AdminData = async () => {
    try {
      if (localStorage.getItem("userType") === "admin" || localStorage.getItem("userType") === "agent") {
        const Partnerdata = await GetAgent();
        const userData = await getallAdminData();
        let newPartnerList = Partnerdata.data.data.filter(
          (item) => item.id === Partner_id
        );
        setPartnerist(newPartnerList);

        if (userData.data.length === 0) {
          setAdminList([]);
        } else {
          setAdminList(userData.data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    GetPdfDocument()
    AdminData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (type === "modal") {
    return (
      <Modal
        show={show}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="mt-0 h-100vh"
      >
        <button
          type="button"
          className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
          data-dismiss="modal"
          onClick={close}
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="bg-white rounded p-5">
          <h5 className="text-center">View Agreement Pdf</h5>
          <div>
            {docLoader ? (
              <div className="table-responsive main_table_div">
                <Loader />
              </div>
            ) : (
              <AdobePDFViewer
                url={pdf["@microsoft.graph.downloadUrl"]}
                data={pdf}
                userId={user_id}
                commentsList={commentsList}
                selectedMentionAdmin={[]}
                DocUserType={emp_user_type}
                adminList={[]}
                partnerList={[]}
                setCommentsList={setCommentsList}
                userType={""}
              />
            )}
          </div>
        </div>
      </Modal>
    );
  } else {
    return (
      newDocLoder ? (
        <div className="table-responsive main_table_div">
          Token Expire
        </div>
      ) : (
        <AdobePDFViewer
          url={newPdfUrl}
          data={newPdf}
          userId={new_user_id}
          commentsList={commentsList}
          selectedMentionAdmin={[]}
          DocUserType={new_emp_user_type}
          adminList={adminList}
          partnerList={partnerList}
          setCommentsList={setCommentsList}
          userType={localStorage.getItem("userType")}
          docsection={true}
          getCommentsList={getCommentsList}
          setDocSingleDate={setNewPdf}
          // docTypeList={docTypeList}
          // fileId={fileID}
          // setFileID={setFileID}
          setConvertedDoc={setNewPdfUrl}
          SetPdfDocUrl={GetPdfDocument}
        />
      )
    );
  }
}
