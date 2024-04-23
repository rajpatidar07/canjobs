import React from "react";
// import FileViewer from "react-file-viewer"; // Import your FileViewer library
import { useLocation } from "react-router-dom";
const PDFViewer = () => {
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const pdfUrl = urlSearchParams.get("pdfUrl");
  const fileExtension = pdfUrl ? pdfUrl.split(".").pop().toLowerCase() : null;
  console.log(pdfUrl)
  /*Functio to Download pdf */
  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.target = "_blank";
    link.download = `resume.${fileExtension}`;
    link.click();
  };
  if (!pdfUrl) {
    // Handle the case where pdfUrl is null or empty
    return <div>No PDF URL provided.</div>;
  }
  return (
    <div className="mt-15 ">
      {fileExtension === "docx" || fileExtension === "doc"
        ?
        null : <div className="d-flex justify-content-end ">
          <button
            className="p-5 rounded-3 btn-info mx-3 w-auto text-end"
            onClick={downloadPDF}
            title="Download Document"
          >
            <i className="fa fa-download" aria-hidden="true"></i>
          </button>
        </div>}
      <div className="d-flex justify-content-center text-center">
        <div className="w-100 h-100vh">
          {
            // pdfUrl ? 
            // (
            //   ""
            // ) :
            (
              // <FileViewer
              //   fileType={fileExtension === "pdf" ? "pdf" : "image"}
              //   filePath={decodeURIComponent(pdfUrl)}
              //   errorComponent={() => <div>Error loading document</div>}
              // />
              <>
              {fileExtension === "docx" || fileExtension === "doc"
                ? <p>DOC file download successfully</p> : ""}
                <iframe
                  src={decodeURIComponent(pdfUrl)}
                  height={"100%"}
                  width={"100%"}
                  title={`resume.${fileExtension}`}></iframe>
              </>
              // <div>No PDF URL provided.</div>
            )}
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
