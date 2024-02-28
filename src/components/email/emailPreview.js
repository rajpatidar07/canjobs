// src/PreviewEmail.js
import React, { useState, useEffect } from "react";
import { /*GetPreviewEmail*/ GetPreviewAttchmentEmail } from "../../api/api";
import Loader from "../common/loader";
// import { FileViewer } from "react-file-viewer";
// import { ToastContainer } from "react-toastify";
// import AdminSidebar from "../admin/sidebar";
// import AdminHeader from "../admin/header";
import { /*useNavigate,*/ Link } from "react-router-dom";
import { AiOutlineDownload } from "react-icons/ai";
import ReplyEmailForm from "./ReplyEmailForm";
const PreviewEmail = ({ id, emailType, singleEmailData }) => {
  /* states */
  let [apiCall, setApiCall] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  const [emailData, setemailData] = useState([]);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const toggleReplyFormClick = () => {
    setShowReplyForm(!showReplyForm);
  };
  /* Function to get Employee visa data */
  const EmailData = async () => {
    setIsLoading(true);
    try {
      const Res = await GetPreviewAttchmentEmail(emailType, id);
      if (
        // Res.messsage === "No data found" ||
        // Res.status === "0" ||
        // Res.status === 0 ||
        Res.data.value === undefined ||
        Res.data.value.length === 0 // && JSON.parse(Res.data)[0])
      ) {
        setemailData([]);
        setIsLoading(false);
      } else {
        setemailData(Res.data.value);
        // setTotalData(Res.data.total_rows);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setemailData([]);
    }
  };

  /*Render function to get the employee data*/
  useEffect(() => {
    EmailData();
    if (apiCall === true) {
      setApiCall(false);
    }
  }, [apiCall, id]);

  /*Function to decode the email subject */
  function decodeEmailSubject(encodedSubject) {
    if (!encodedSubject) {
      return "";
    } else {
      return decodeURIComponent(
        encodedSubject
          .replace(/=\?UTF-8\?Q\?/g, "")
          .replace(/\?=/g, "")
          .replace(/=([0-9A-F]{2})/g, (_, p1) =>
            String.fromCharCode(parseInt(p1, 16))
          )
      );
    }
  }
  /*Funcion to open pdf n new window */
  // const openPDFInNewTab = (base64PDFData) => {
  //   const dataUri = `data:application/pdf;base64,${base64PDFData}`;
  //   const newWindow = window.open();
  //   newWindow.document.write(
  //     `<iframe src="${dataUri}" style="width:100%;height:100%;" frameborder="0"></iframe>`
  //   );
  // };

  // const openBase64HtmlInNewWindow = (base64Html) => {
  // const decodedHtml = atob(base64Html);
  // const newWindow = window.open("", "_blank");
  // if (newWindow) {
  //   newWindow.document.write(decodedHtml);
  //   newWindow.document.close();
  // }
  // };
  return (
    /*---- Email preview Page ----*/
    <div>
      {isLoading ? (
        <Loader />
      ) : singleEmailData === "" ? (
        <div className="gmail-preview-container ">
          <div className="email-content">
            <div className="email-header">No Email found</div>
          </div>
        </div>
      ) : (
        <div className="gmail-preview-container ">
          <div className="email-content">
            <div className="email-header">
              <p className="px-5 py-3 border-bottom">
                <b className="font-size-2">FROM:</b>{" "}
                {singleEmailData.sender.emailAddress.address}
              </p>
              <p className="px-5 py-3 border-bottom">
                <b className="font-size-2">TO:</b>{" "}
                {singleEmailData.toRecipients[0].emailAddress.address}
              </p>
              <p className="font-size-3 font-weight-bold px-5 py-3 border-bottom">
                <b className="font-size-2">SUBJECT:</b>{" "}
                {decodeEmailSubject(singleEmailData.subject)}
              </p>
            </div>
            <div className="email-body text-break px-5 py-3">
              {singleEmailData.body.content && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: singleEmailData.body.content,
                  }}
                />
              )}
              <div className="attachments py-3 d-flex flex-wrap">
                {/* {emailData &&
                emailData.map((item, index) => (
                  <div
                    key={index}
                    className="col align-items-center p-3 m-3 rounded shadow bg-white position-relative htmlFileCls"
                  >
                    {item.name && (
                      <FileViewer
                        fileType={item.name.split(".")[1]}
                        filePath={`data:${item.contentType};base64,${item.contentBytes}`}
                        errorComponent={() => <div>Error loading document</div>}
                        onError={(e) => console.error("Error occurred:", e)}
                      />
                    )}
                  </div>
                ))} */}
                {emailData.length === 0
                  ? null
                  : (emailData || []).map((item, index) => {
                    let iconSrc = "";
                    let title = "";
                    if (
                      item.contentType === "APPLICATION/PDF" ||
                      item.contentType === "application/pdf"
                    ) {
                      iconSrc =
                        "https://ssl.gstatic.com/docs/doclist/images/mediatype/icon_3_pdf_x16.png";
                      title = item.name;
                    } else if (
                      item.contentType === "TEXT/HTML" ||
                      item.contentType === "text/plain" ||
                      item.contentType === "text/html"
                    ) {
                      iconSrc =
                        "//ssl.gstatic.com/docs/doclist/images/mediatype/icon_1_text_x16.png";
                      title = item.name;
                    } else if (
                      item.contentType.startsWith("IMAGE/") ||
                      item.contentType.startsWith("image/")
                    ) {

                      iconSrc = `data:${item.contentType};base64,${item.contentBytes}`;
                      title = item.name;
                    } else if (
                      item.contentType ===
                      "APPLICATION/VND.OPENXMLFORMATS-OFFICEDOCUMENT.WORDPROCESSINGML.DOCUMENT" ||
                      item.contentType ===
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    ) {
                      iconSrc =
                        "https://e7.pngegg.com/pngimages/18/655/png-clipart-computer-icons-microsoft-word-document-file-format-word-icon-blue-angle.png";
                      title = item.name;
                    } else {
                      iconSrc =
                        "https://icons.iconarchive.com/icons/thehoth/seo/256/seo-web-code-icon.png";
                      title = item.name;
                    }

                    return (
                      <div
                        key={index}
                        className="align-items-center mr-3 mb-3 rounded border bg-white position-relative htmlFileCls text-center p-2"
                        title={item.name}
                      >
                        <Link
                        // onClick={() =>
                        //   openBase64FileInNewWindow(item.data, item.contentType)
                        // }
                        >
                          <img
                            src={iconSrc}
                            alt={title}
                            title={title}
                            width={45}
                            height={45}
                            style={{ zIndex: "1" }}
                          />
                          <div>
                            <small
                              className="d-inline-block text-truncate text-decoration-none text-dark"
                              style={{ maxWidth: "100%" }}
                            >
                              {item.name}
                            </small>
                          </div>
                        </Link>
                        <div className="download-icon">
                          <Link
                            to={`data:${item.contentType};base64,${item.contentBytes}`}
                            download={item.name}
                            className="text-dark"
                          >
                            <AiOutlineDownload />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
              </div>


              {/* Render form conditionally */}
              {showReplyForm ? (
                <>
                  <ReplyEmailForm
                    mesId={id}
                    emailType={emailType}
                    setShowReplyForm={setShowReplyForm}
                    setApiCall={setApiCall}
                    toggleReplyFormClick={toggleReplyFormClick}
                  />
                </>
              ) : <>
                {/* Add button to toggle form */}
                <button className="btn btn-primary" onClick={toggleReplyFormClick}>
                  Add Reply
                </button>
              </>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewEmail;
