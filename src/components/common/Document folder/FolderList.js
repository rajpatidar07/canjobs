import React from "react";
import { Link } from "react-router-dom";
import { BsFiletypeDocx } from "react-icons/bs";
import { FaRegFilePdf, FaFolder } from "react-icons/fa6";
import DocSaveForm from "./DocSaveForm";
import ConvertTime from "../ConvertTime";
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
  getCommentsList,
  setCommentsList,
  emp_user_type,
  user_id,
  convertUrlToPDF,
  convertToPDF,
  convertedDoc,
  setConvertedDoc
}) {
  // Assuming you have the following imports and state setters
  // import { useState } from 'react';
  // const [convertedDoc, setConvertedDoc] = useState(null);

  const OnGetPdfUrl = async (data) => {
    try {
      // Check the MIME type and perform appropriate conversion
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
        setConvertedDoc(data["@microsoft.graph.downloadUrl"]); // Update state if necessary
      }

      // Ensure that emp_user_type and user_id are defined
      // Replace the following with your actual logic to retrieve these values

      console.log(emp_user_type, user_id)
      // Set session storage items
      localStorage.setItem("new_pdf_url", convertedDoc);
      localStorage.setItem("new_pdf", JSON.stringify(data));
      localStorage.setItem("new_emp_user_type", emp_user_type);
      localStorage.setItem("new_user_id", user_id);

      // Open the PDF viewer in a new tab/window
      window.open("/view_pdf_Agreement", "_blank");
    } catch (error) {
      // Handle errors gracefully
      console.error("Error in OnGetPdfUrl:", error);
      // Optionally, display a user-friendly message or take other actions
    }
  };

  return (
    <div
      className="bg-light"
      style={{
        minHeight: "200px",
        overflow: "auto",
        maxHeight: "calc(100vh - 200px)",
      }}
    >
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
                    getCommentsList(item);
                  }
                }}
                onContextMenu={(e) => {
                  e.preventDefault(); // prevent the default behaviour when right clicked
                  setShowDropDown(item.id);
                  localStorage.setItem("new_pdf_url", "");
                  localStorage.setItem("new_pdf", "");
                  localStorage.setItem("new_emp_user_type", "");
                  localStorage.setItem("new_user_id", "");
                }}
              >
                <div className="file-background h-100">
                  {item.folder && (
                    <FaFolder
                      style={{
                        width: "90px",
                        marginBottom: 5,
                        height: "90px",
                        color: "#f5b317b0",
                      }}
                    />
                  )}
                  {item.file && item.file.mimeType.startsWith("image/") && (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{
                        width: "90px",
                        marginBottom: 5,
                        height: "90px",
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
                        width: "90px",
                        marginBottom: 5,
                        height: "90px",
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
                          width: "90px",
                          marginBottom: 5,
                          height: "90px",
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
                      <ConvertTime _date={item.lastModifiedDateTime} format={".fromNow()"} />
                      {/* {moment(item.lastModifiedDateTime).fromNow()} */}
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
                  <li className="list-group-item text-darger">
                    <Link onClick={() => {
                      OnGetPdfUrl(item)
                      // sessionStorage.setItem("new_pdf", JSON.stringify(item));
                      // sessionStorage.setItem("new_emp_user_type", emp_user_type);
                      // sessionStorage.setItem("new_user_id", user_id);
                      // window.open("/view_pdf_Agreement", "_blank");
                    }}>
                      {" "}
                      Open in new tab {item.folder ? "Folder" : "File"}
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
