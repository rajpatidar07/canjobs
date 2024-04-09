import React from "react";
// import { AiOutlineCloudUpload } from "react-icons/ai";
export default function DocSaveForm({
  handleBulkFileChange,
  saveBtn,
  loadingBtn,
  SaveBulkDocument,
  setSaveDoc,
  setSaveBtn,
  setDocFileBase,
}) {
  return (
    <div className="d-flex align-items-center">
      <form>
        <div className="">
          <label
            className="btn btn-white rounded"
            style={{
              margin: 10,
              color: "grey",
              minHeight: 150,
              fontSize: 80,
              flexDirection: "column",
              lineHeight: 1,
            }}
          >
            {/* <AiOutlineCloudUpload className="font-size-3 mr-2" /> */}
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              style={{ display: "none" }}
              onChange={(e) => {
                handleBulkFileChange(e);
              }}
              multiple
            />
            +
            <p className="m-0" style={{ fontWeight: 400, fontSize: 12 }}>
              Add New Documents
            </p>
          </label>
        </div>
        {saveBtn === true ? (
          <div className="doc_upload_col">
            {loadingBtn ? (
              <button className="btn btn-primary doc_btn" type="button" disabled>
                <span
                  className="spinner-border spinner-border-sm "
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
                    marginRight: "auto",
                    marginLeft: "auto",
                  }}
                >
                  Save Documents
                </button>
                <button
                  className="btn btn-secondary doc_btn"
                  onClick={() => {
                    setSaveBtn(false)
                    setDocFileBase("")
                  }}
                  style={{
                    fontSize: 14,
                    marginRight: "auto",
                    marginLeft: "auto",
                  }}
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
