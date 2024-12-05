import React from "react";

export default function DocSaveForm({
  handleBulkFileChange,
  saveBtn,
  loadingBtn,
  SaveBulkDocument,
  setSaveDoc,
  setSaveBtn,
  setDocFileBase,
  view,
}) {
  return (
    <div className={`d-flex align-items-center ${view === "list" ? "flex-column" : ""}`}>
      <form>
        <div className={`${view === "list" ? "d-flex align-items-center mb-3" : ""}`}>
          <label
            className={`btn btn-white rounded ${
              view === "list" ? "d-flex align-items-center justify-content-start" : ""
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
        {saveBtn === true ? (
          <div
            className={`doc_upload_col ${
              view === "list" ? "d-flex justify-content-between align-items-center" : ""
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
