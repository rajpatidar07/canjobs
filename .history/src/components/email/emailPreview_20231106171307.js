// src/PreviewEmail.js
import React, { useState, useEffect } from "react";
import { GetPreviewEmail } from "../../api/api";
import Loader from "../common/loader";
// import { FileViewer } from "react-file-viewer";
// import { ToastContainer } from "react-toastify";
// import AdminSidebar from "../admin/sidebar";
// import AdminHeader from "../admin/header";
import { /*useNavigate,*/ Link } from "react-router-dom";

const PreviewEmail = ({ id, emailType }) => {
  /* states */
  let [apiCall, setApiCall] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  const [emailData, setemailData] = useState({});
  /* Function to get Employee visa data*/
  const EmailData = async () => {
    setIsLoading(true);
    try {
      const Res = await GetPreviewEmail(emailType, id);
      // console.log(Res.data);

      if (
        Res.messsage === "No data found" ||
        Res.status === "0" ||
        Res.status === 0 ||
        Res.data === undefined ||
        (Res.data.length === 0 && JSON.parse(Res.data)[0])
      ) {
        setemailData({});
        setIsLoading(false);
      } else {
        setemailData(JSON.parse(Res.data)[0]);
        console.log(JSON.parse(Res.data));
        // setTotalData(Res.data.total_rows);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setemailData({});
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
  const openPDFInNewTab = (base64PDFData) => {
    const dataUri = `data:application/pdf;base64,${base64PDFData}`;
    const newWindow = window.open();
    newWindow.document.write(
      `<iframe src="${dataUri}" style="width:100%;height:100%;" frameborder="0"></iframe>`
    );
  };

  return (
    /*---- Email preview Page ----*/
    <div>
      {isLoading ? (
        <Loader />
      ) : emailData === "" ? (
        <div className="gmail-preview-container ">
          <div className="email-content">
            <div className="email-header">No Email found</div>
          </div>
        </div>
      ) : (
        <div className="gmail-preview-container ">
          <div className="email-content">
            <div className="email-header">
              <h2>{decodeEmailSubject(emailData.subject)}</h2>
              <p>From: {emailData.from}</p>
              <p>To: {emailData.to}</p>
            </div>

            <div className="email-body">
              {emailData.content && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: emailData.content[1].data,
                  }}
                />
              )}
            </div>
            <div className="attachments">
              {emailData.attachments &&
                (emailData.attachments || []).map((item, index) => (
                  <>
                    {item.mime === "APPLICATION/PDF" ? (
                      <Link
                        onClick={() => {
                          openPDFInNewTab(item.data);
                        }}
                      >
                        <img
                          key={index}
                          src={`https://s.yimg.com/fz/api/res/1.2/O0oW0TRMJLWcDOyAgUZScg--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTEzMDtxPTgwO3c9MTA1/https://s.yimg.com/zb/imgv1/9a8b4cb8-aba2-3b23-b911-7b50ca0139d2/t_500x300`}
                          alt="pdf"
                        />
                      </Link>
                    ) : item.mime === "TEXT/HTML" ? (
                      // <div>{item.data}</div>
                      <div
                        dangerouslySetInnerHTML={{ __html: atob(item.data) }}
                      />
                    ) : (
                      <img
                        key={index}
                        src={`data:${item.mime};base64,${item.data}`}
                        alt={`attachment-${index}`}
                        width={500}
                        height={500}
                      />
                    )}
                  </>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewEmail;
