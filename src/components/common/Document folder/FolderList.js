import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsFiletypeDocx } from "react-icons/bs";
import { FaRegFilePdf, FaFolder } from "react-icons/fa6";
import DocSaveForm from "./DocSaveForm";
import ConvertTime from "../ConvertTime";
import CommentSection from "../Adobe/commentSection";
import { CiImageOn, CiViewList } from "react-icons/ci";

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
  userType,
  adminList,
  partnerList,
  userId,
  commentsList,
  DocUserType,
  getCommentsList,
  partnerId
}) {
  const [view, setView] = useState("block"); // Default to block view
  let [openAnnotationBox, setOpenAnnotationBox] = useState();
  let [DocData, setDocData] = useState();

  return (
    <div
      className={`bg-light w-100 ${view === "block" ? "justify-content-center" : ""}`}
      style={{
        minHeight: "200px",
        overflow: "auto",
        maxHeight: "calc(100vh - 200px)",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      {/* Toggle View Buttons */}
      <div className="view-toggle mb-4">
        <Link to=""
          className={`btn-sm ${view === "block" ? "btn-primary" : "btn-outline-primary"} mx-1 `}
          onClick={() => setView("block")}
          title="Block View"
        >
          <b style={{ fontSize: "1rem", fontWeight: "200" }}><CiImageOn className="sidebar_icon" /></b>
        </Link>
        <Link to=""
          className={`btn-sm ${view === "list" ? "btn-primary" : "btn-outline-primary"} mx-1 `}
          onClick={() => setView("list")}
          title="List View"
        >
          <b style={{ fontSize: "1rem", fontWeight: "200" }}><CiViewList className="sidebar_icon" /></b>
        </Link>
      </div>
      <div className="row">
        {/* File List */}
        <div className={`file-list justify-content-center ${openAnnotationBox === true ? "col-9" : "col-12"}`}>
          {view === "block" ? (
            <div className="d-flex flex-wrap justify-content-center">
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
                          // const userAgent = navigator.userAgent;
                          // // const vendor = navigator.vendor;
                          // if (item?.name.includes(1295) && userAgent.includes("Firefox")) {
                          //   console.log(item["@microsoft.graph.downloadUrl"])
                          //   window.open(item.webUrl, '_blank');

                          //   // if (userAgent.includes("Chrome") && vendor.includes("Google")) {
                          //   //   console.log("Browser: Google Chrome");
                          //   // } else if (userAgent.includes("Firefox")) {
                          //   //   console.log("Browser: Mozilla Firefox");
                          //   // } else if (userAgent.includes("Safari") && vendor.includes("Apple")) {
                          //   //   console.log("Browser: Safari");
                          //   // } else if (userAgent.includes("Edg")) {
                          //   //   console.log("Browser: Microsoft Edge");
                          //   // } else if (userAgent.includes("Trident") || userAgent.includes("MSIE")) {
                          //   //   console.log("Browser: Internet Explorer");
                          //   // } else {
                          //   //   console.log("Browser: Unknown");
                          //   // }
                          // } else {
                          setDocPreview(true);
                          setDocSingleDate(item);
                          setFileID(item.id);
                          SetPdfDocUrl(item);
                          getCommentsList(item)
                          // }
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
                            // state={{ id: res.job_id }}
                            to={`/view_pdf_Agreement?new_emp_user_type=${emp_user_type}&new_user_id=${user_id}&folderId=${item.parentReference.id}&document_id=${item.id}&partner_id=${partnerId}`} target="_blank">
                            {" "}
                            Open in new tab {item.folder ? "Folder" : "File"}
                          </Link>
                        </li>
                        <li className={item.folder ? "d-none" : "list-group-item text-darger"} >
                          <Link to="" onClick={() => {
                            getCommentsList(item)
                            setOpenAnnotationBox(true)
                            setDocData(item)
                          }}>
                            Comment's</Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </React.Fragment>
              ))}
              {/* Upload Document Form */}
              <DocSaveForm
                view={view}
                handleBulkFileChange={handleBulkFileChange}
                saveBtn={saveBtn}
                loadingBtn={loadingBtn}
                SaveBulkDocument={SaveBulkDocument}
                setSaveBtn={setSaveBtn}
                setDocFileBase={setDocFileBase}
              />
            </div>
          ) : (
            <div className=" rounded shadow-sm col-12">
              {/* Table Header */}
              <div className="d-flex bg-light py-2 px-3 border-bottom" style={{ fontWeight: "bold" }}>
                <div className="col-6">Name</div>
                <div className="col-3">Last Modified</div>
                <div className="col-3">Type</div>
              </div>
              {/* List Items */}
              {(docTypeList || []).map((item, index) => (
                <div
                  key={index}
                  className="d-flex bg-white align-items-center py-2 px-3 border-bottom"
                  style={{ fontSize: "14px" }}
                >
                  <div className="col-6">
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
                        <li className={item.folder ? "d-none" : "list-group-item text-darger"}>
                          <Link to="" onClick={() => {
                            getCommentsList(item)
                            setOpenAnnotationBox(true)
                            setDocData(item)
                          }}>
                            Comment's</Link>
                        </li>
                      </ul>
                    )}
                    <Link
                      to="#"
                      className="text-decoration-none text-dark"
                      onClick={() => {
                        if (item.folder) {
                          setFolderID(item.id);
                          setDocTypeName(item.name);
                        } else {
                          // const userAgent = navigator.userAgent;
                          // // const vendor = navigator.vendor;
                          // if (item?.name.includes(1295) && userAgent.includes("Firefox")) {
                          //   console.log(item["@microsoft.graph.downloadUrl"])
                          //   window.open(item.webUrl, '_blank');

                          //   // if (userAgent.includes("Chrome") && vendor.includes("Google")) {
                          //   //   console.log("Browser: Google Chrome");
                          //   // } else if (userAgent.includes("Firefox")) {
                          //   //   console.log("Browser: Mozilla Firefox");
                          //   // } else if (userAgent.includes("Safari") && vendor.includes("Apple")) {
                          //   //   console.log("Browser: Safari");
                          //   // } else if (userAgent.includes("Edg")) {
                          //   //   console.log("Browser: Microsoft Edge");
                          //   // } else if (userAgent.includes("Trident") || userAgent.includes("MSIE")) {
                          //   //   console.log("Browser: Internet Explorer");
                          //   // } else {
                          //   //   console.log("Browser: Unknown");
                          //   // }
                          // } else {
                          setDocPreview(true);
                          setDocSingleDate(item);
                          setFileID(item.id);
                          SetPdfDocUrl(item);
                          // }
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
                      {item.folder ? (
                        <FaFolder className="mr-2 text-warning" />
                      ) : item.file && item.file.mimeType === "application/pdf" ? (
                        <FaRegFilePdf className="mr-2 text-danger" />
                      ) : item.file && item.file.mimeType.startsWith("image/") ? (
                        <img
                          src={item["@microsoft.graph.downloadUrl"]}
                          alt={item.name}
                          className="file-icon"
                          style={{ width: "24px", height: "24px", objectFit: "cover" }}
                        />
                      ) : (
                        <BsFiletypeDocx className="mr-2" style={{ color: "#2B579A" }} />
                      )}
                      {" " + item.name.replace("_", " ")}
                    </Link>

                  </div>
                  <div className="col-3">
                    <ConvertTime _date={item.lastModifiedDateTime} format={".fromNow()"} />
                  </div>
                  <div className="col-3">
                    {item.folder
                      ? "Folder"
                      : item.file.mimeType.includes("pdf")
                        ? "PDF"
                        : "Document"}
                  </div>
                </div>
              ))}
              {/* Upload Document Form */}
              <DocSaveForm
                view={view}
                handleBulkFileChange={handleBulkFileChange}
                saveBtn={saveBtn}
                loadingBtn={loadingBtn}
                SaveBulkDocument={SaveBulkDocument}
                setSaveBtn={setSaveBtn}
                setDocFileBase={setDocFileBase}
              />
            </div>
          )}
        </div>

        {(userType === "admin" || userType === "agent") && (
          <>
            <CommentSection
              docData={DocData}
              allAdmin={adminList}
              partnerList={partnerList}
              userId={userId}
              commentsList={commentsList}
              DocUserType={DocUserType}
              setCommentsList={setCommentsList}
              openAnnotationBox={openAnnotationBox}
              docsection={true}
              annotationDrawBox={""}
              page={"file"}
              setOpenAnnotationBox={setOpenAnnotationBox}
            />
          </>
        )}
      </div>
    </div>
  );
}
