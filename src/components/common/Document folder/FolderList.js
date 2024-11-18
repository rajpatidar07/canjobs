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
  setFileID,
  setDocTypeName,
  handleBulkFileChange,
  saveBtn,
  loadingBtn,
  SaveBulkDocument,
  setSaveBtn,
  setDocFileBase,
  SetPdfDocUrl,
  setCommentsList,
  emp_user_type,
  user_id,
}) {

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
                    const userAgent = navigator.userAgent;
                    // const vendor = navigator.vendor;
                    if (item?.name.includes(1295) && userAgent.includes("Firefox")) {
                      console.log(item["@microsoft.graph.downloadUrl"])
                      // window.open(item["@microsoft.graph.downloadUrl"], '_blank');

                      // if (userAgent.includes("Chrome") && vendor.includes("Google")) {
                      //   console.log("Browser: Google Chrome");
                      // } else if (userAgent.includes("Firefox")) {
                      //   console.log("Browser: Mozilla Firefox");
                      // } else if (userAgent.includes("Safari") && vendor.includes("Apple")) {
                      //   console.log("Browser: Safari");
                      // } else if (userAgent.includes("Edg")) {
                      //   console.log("Browser: Microsoft Edge");
                      // } else if (userAgent.includes("Trident") || userAgent.includes("MSIE")) {
                      //   console.log("Browser: Internet Explorer");
                      // } else {
                      //   console.log("Browser: Unknown");
                      // }
                    } else {
                      setDocPreview(true);
                      setDocSingleDate(item);
                      setFileID(item.id);
                      SetPdfDocUrl(item);
                    }
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
                  <li className={item.folder ? "d-none" : "list-group-item text-darger"}>
                    <Link
                      to={`/view_pdf_Agreement?new_emp_user_type=${emp_user_type}&new_user_id=${user_id}&folderId=${item.parentReference.id}&document_id=${item.id}`} target="_blank">
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
