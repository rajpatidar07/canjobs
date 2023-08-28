import React from "react";
import FileViewer from "react-file-viewer"; // Import your FileViewer library
import { useLocation } from "react-router-dom";
const PDFViewer = () => {
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const pdfUrl = urlSearchParams.get("pdfUrl");

  /*Functio to Download pdf */
  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.target = "_blank";
    link.download = "resume.pdf";
    link.click();
  };
  return (
    <div>
      <div className="d-flex justify-content-end mt-15 ">
        <button
          className="p-5 rounded-3 btn-info mx-3 w-auto text-end"
          onClick={downloadPDF}
          title="Download Document"
        >
          <i className="fa fa-download" aria-hidden="true"></i>
        </button>
      </div>
      <div className="d-flex justify-content-around text-center">
        <div className="w-100">
          <FileViewer
            fileType="pdf"
            filePath={decodeURIComponent(pdfUrl)}
            errorComponent={() => <div>Error loading document</div>}
          />
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
