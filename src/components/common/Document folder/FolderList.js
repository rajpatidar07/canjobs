import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { BsFiletypeDocx } from "react-icons/bs";
import { FaRegFilePdf, FaFolder } from "react-icons/fa6";
import DocSaveForm from "./DocSaveForm";
export default function FolderList({
  setDocPreview,
  ShowDeleteAlert,
  setDocSingleDate,
  setEditNameForm,
  showDropDown,
  setShowDropDown,
  docTypeList,
  setFolderID,
  setDocTypeName,
  handleBulkFileChange,
  saveBtn,
  loadingBtn,
  SaveBulkDocument,
  setSaveBtn,
  setDocFileBase,
}) {
  return (
    <div className="bg-light" style={{ minHeight: "200px" }}>
      <div className="file-list pb-8">
        {(docTypeList || []).map((item, index) => (
          <React.Fragment key={index}>
            <div
              className="position-relative bg-white rounded overflow-hidden"
              style={{ maxWidth: 150, margin: 10 }}
            >
              <Link
                className="file-item h-100"
                to=""
                onClick={() => {
                  if (item.folder) {
                    setFolderID(item.id);
                    setDocTypeName(item.name);
                  } else {
                    setDocPreview(true);
                    setDocSingleDate(item);
                    setFolderID(item.id);
                  }
                }}
                onContextMenu={(e) => {
                  e.preventDefault(); // prevent the default behaviour when right clicked
                  setShowDropDown(item.id);
                }}
              >
                <div className="file-background h-100">
                  {item.folder && (
                    <FaFolder
                      style={{
                        width: "100px",
                        marginBottom: 5,
                        height: "100px",
                        color: "#f5b317b0",
                      }}
                    />
                  )}
                  {item.file && item.file.mimeType.startsWith("image/") && (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{
                        width: "100px",
                        marginBottom: 5,
                        height: "100px",
                        color: "#f5b317b0",
                      }}
                    >
                      <img
                        src={item["@microsoft.graph.downloadUrl"]}
                        alt={item.name}
                        className="file-icon"
                      />
                    </div>
                  )}
                  {item.file && item.file.mimeType === "application/pdf" && (
                    <FaRegFilePdf
                      style={{
                        width: "100px",
                        marginBottom: 5,
                        height: "100px",
                        color: "red",
                      }}
                    />
                  )}
                  {item.file &&
                    (item.file.mimeType === "application/msword" ||
                      item.file.mimeType ===
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document") && (
                      <BsFiletypeDocx
                        // className="file-icon"
                        style={{
                          width: "100px",
                          marginBottom: 5,
                          height: "100px",
                          color: "#2B579A",
                        }}
                      />
                    )}
                  <div className="file-content">
                    <p
                      className="file-name text-capitalize m-0"
                      style={{ wordBreak: "break-word" }}
                    >
                      {item.name.replace("_", " ")}
                    </p>
                    <p className="modified-time m-0">
                      {moment(item.lastModifiedDateTime).fromNow()}
                    </p>
                  </div>
                </div>
              </Link>
              {showDropDown === item.id && (
                <ul className="list-group">
                  <li className="list-group-item">
                    <Link
                      onClick={() => {
                        setEditNameForm(true);
                        setDocSingleDate(item);
                      }}
                    >
                      Rename
                    </Link>
                  </li>
                  <li className="list-group-item text-darger">
                    <Link onClick={() => ShowDeleteAlert(item)}>
                      {" "}
                      Delete {item.folder ? "Folder" : "File"}
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </React.Fragment>
        ))}
        {/* Upload Document form*/}
        <DocSaveForm
          handleBulkFileChange={handleBulkFileChange}
          saveBtn={saveBtn}
          loadingBtn={loadingBtn}
          SaveBulkDocument={SaveBulkDocument}
          setSaveBtn={setSaveBtn}
          setDocFileBase={setDocFileBase}
        />
      </div>
    </div>
  );
}
