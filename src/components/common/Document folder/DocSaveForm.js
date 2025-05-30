import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DocSaveForm({
  handleBulkFileChange,
  saveBtn,
  loadingBtn,
  SaveBulkDocument,
  setSaveDoc,
  setSaveBtn,
  setDocFileBase,
  view,
  docFileBase,
  uploadProgress,
  isDocPrivate,
  setIsDocPrivate
}) {
  console.log()
  let userType = localStorage.getItem("userType")
  /*Function to remove the file from the selected file list */
  const removeFile = (fileName) => {
    setDocFileBase((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    ); // Remove file by name
  };
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fakeEvent = { target: { files: e.dataTransfer.files } };
      handleBulkFileChange(fakeEvent);
    }
  };
  // const handlePaste = (e) => {
  //   const clipboardFiles = e.clipboardData?.files;

  //   if (clipboardFiles && clipboardFiles.length > 0) {
  //     const filesArray = Array.from(clipboardFiles);

  //     // Optional: Filter out non-image/file types if needed
  //     const validFiles = filesArray.filter(file => file.name && file.size > 0);

  //     if (validFiles.length > 0) {
  //       const fakeEvent = { target: { files: validFiles } };
  //       handleBulkFileChange(fakeEvent);
  //     } else {
  //       console.warn("No valid files found in clipboard.");
  //     }
  //   } else {
  //     console.warn("Clipboard does not contain files.");
  //   }
  // };

  return (
    <div className={`d-flex align-items-center ${view === "list" ? "flex-column" : ""}`}>
      <form>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          // onPaste={handlePaste}
          onClick={() => fileInputRef.current.click()}
          className={`${view === "list" ? "d-flex align-items-center mb-3" : ""}`}>
          <label
            className={`btn btn-white rounded ${view === "list" ? "d-flex align-items-center justify-content-start" : ""
              }`}
            style={{
              margin: 10,
              color: "grey",
              minHeight: view === "list" ? "auto" : 150,
              fontSize: view === "list" ? 18 : 80,
              flexDirection: view === "list" ? "row" : "column",
              lineHeight: 1,
              padding: view === "list" ? "10px 15px" : "",
              border: isDragging ? "2px dashed #007bff" : "",
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: "none" }}
              onChange={(e) => {
                handleBulkFileChange(e);
              }}
              multiple
            />
            <span className="mr-3" style={{ fontSize: view === "list" ? 24 : "inherit" }}>+</span>
            <p className="m-0" style={{ fontWeight: 400, fontSize: view === "list" ? 14 : 12 }}>
              Add New Documents
            </p>
          </label>
        </div>
        {/* Display Selected File Names with Cross Button */}
        {docFileBase.length > 0 && (
          <div className="form-group">
            <ul className="list-unstyled d-flex align-items-center flex-wrap">
              {docFileBase.map((file, index) => (
                <li
                  key={index}
                  className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                >
                  {file.name}
                  <Link
                    className="p-0 ms-1"
                    onClick={() => removeFile(file.name)}
                  >
                    <i className="px-3 fa fa-times-circle" aria-hidden="true"></i>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {(userType === "admin" && saveBtn && docFileBase.length > 0 && window.location.pathname !== "/slots") && (
          <label>
            <input
              type="checkbox"
              checked={isDocPrivate === 1}
              onChange={() => setIsDocPrivate(isDocPrivate === 1 ? 0 : 1)}
            /> Private
          </label>
        )}

        {saveBtn === true && docFileBase.length > 0 ? (
          <div
            className={`doc_upload_col d-flex justify-content-center align-items-center`}
          >
            {loadingBtn ? (
              <div style={{ width: 50, height: 50 }} className="text-center">
                <CircularProgressbar
                  value={uploadProgress}
                  text={`${uploadProgress}%`}
                  styles={buildStyles({
                    textSize: '24px',
                    pathColor: `rgb(153, 43, 50)`,
                    textColor: '#000',
                  })}
                />
              </div>
            ) : (
              <>
                <button
                  className="btn btn-primary doc_btn"
                  onClick={SaveBulkDocument}
                  style={{
                    fontSize: 14,
                    marginRight: view === "list" ? "10px" : "auto",
                    marginLeft: view === "list" ? "0" : "auto",
                  }}
                  type="button"
                >
                  Save Documents
                </button>
                <button
                  className="btn btn-secondary doc_btn"
                  onClick={() => {
                    setSaveBtn(false);
                    setDocFileBase("");
                  }}
                  style={{
                    fontSize: 14,
                    marginRight: "auto",
                    marginLeft: view === "list" ? "0" : "auto",
                  }}
                  type="button"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        ) : null}
      </form>
    </div>
  );
}
