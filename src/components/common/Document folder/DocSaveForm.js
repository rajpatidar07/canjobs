import React from "react";
import { Link } from "react-router-dom";

export default function DocSaveForm({
  handleBulkFileChange,
  saveBtn,
  loadingBtn,
  SaveBulkDocument,
  setSaveDoc,
  setSaveBtn,
  setDocFileBase,
  view,
  docFileBase
}) {
  /*Function to remove the file from the selected file list */
  const removeFile = (fileName) => {
    setDocFileBase((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    ); // Remove file by name
  };
  return (
    <div className={`d-flex align-items-center ${view === "list" ? "flex-column" : ""}`}>
      <form>
        <div className={`${view === "list" ? "d-flex align-items-center mb-3" : ""}`}>
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
            }}
          >
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
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
        {saveBtn === true && docFileBase.length > 0 ? (
          <div
            className={`doc_upload_col ${view === "list" ? "d-flex justify-content-between align-items-center" : ""
              }`}
          >
            {loadingBtn ? (
              <button
                className="btn btn-primary doc_btn"
                style={{
                  fontSize: 14,
                  marginRight: view === "list" ? "0" : "auto",
                  marginLeft: view === "list" ? "0" : "auto",
                }}
                type="button"
                disabled
              >
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Loading...</span>
              </button>
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
