import React from "react";
// import { Link } from "react-router-dom";
import { CiPaperplane } from "react-icons/ci";
import ConvertTime from "./Common function/ConvertTime";
import { Link } from "react-router-dom";
import { CiEdit, CiTrash } from "react-icons/ci";
export default function CommentReplyBox({
  commentsReplyList,
  commentItem,
  replyComment,
  handleInputChange,
  filteredEmails,
  handleEmailClick,
  // handleEmailMouseOver,
  ReplyAnnotation,
  determineBackgroundColor,
  handleUpdateReplyLinkClick,
  type,
  replyCommentData,
  OnHandleUpdateCommentReply,
  OnDeleteCommentReplies,
  admin_id,
  AdminType,
  dropdownVisible,
  taskType,
  replyCommentClick
}) {
  // console.log("first",replyCommentClick)
  return (
    <div className="reply_box_container mx-2 fade show">
      {/* Display replies only if task_id matches */}
      {commentsReplyList && (commentsReplyList || []).map(
        (replyItem, replyIndex) =>
          // Only render the reply if task_id matches the comment's id
          replyItem.task_id === commentItem.id && (
            <div key={replyIndex}>
              {/* Display reply message */}
              {
                <div
                  className="p-2 bg-white  mb-1 border-top position-relative"
                  style={{ borderColor: "#f5f5f5" }}
                >
                  <div className="d-flex justify-content-between align-items-center text-dark">
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        display: `${AdminType === "agent"
                          ? replyItem.sender_id === admin_id
                            ? "flex"
                            : "none"
                          : "flex"}`,
                        gap: 3,
                        top: 0,
                      }}

                    >
                      <Link
                        className="text-gray pr-2"
                        title="Update Comment"
                        onClick={() => {
                          handleUpdateReplyLinkClick(replyItem);
                        }}
                      >
                        {" "}
                        <CiEdit />
                      </Link>
                      <Link
                        className="text-danger pr-2"
                        title="Delete Comment"
                        onClick={() => {
                          OnDeleteCommentReplies(replyItem.id);
                        }}
                      >
                        <CiTrash />
                      </Link>
                    </div>
                    <div className="d-flex profile_box gx-2 mb-1">
                      <div className="media  align-items-center">
                        <div
                          className={`circle-24 mx-auto overflow-hidden text-capitalize text-white ${determineBackgroundColor(
                            replyItem
                          )}`}
                          style={{ fontSize: "16px", fontWeight: 700 }}
                        >
                          {replyItem?.sender_name.charAt(0)}
                        </div>
                      </div>
                      <div className=" mb-0">
                        <div className="font-size-3 font-weight-bold text-capitalize">
                          {replyItem?.sender_name}
                        </div>
                        <div
                          className="text-gray font-weight-light m-0 text-capitalize"
                          style={{ fontSize: 10, fontStyle: "italic" }}
                        >
                          <ConvertTime
                            _date={replyItem.updated_at}
                            format={"HH:mm D MMM"}
                          />
                          {/* {moment(replyItem.updated_at).format("HH:mm D MMM")} */}
                        </div>
                      </div>
                    </div>
                    {/* {replyItem?.sender_name} */}
                    {/* {replyItem.task_creator_user_id
                          ? allAdmin.find(
                              (item) =>
                                item.admin_id === replyItem.task_creator_user_id
                            ).name
                            ? allAdmin.find(
                                (item) =>
                                  item.admin_id === replyItem.task_creator_user_id
                              ).name
                            : ""
                          : ""} */}
                  </div>
                  {replyItem.msg && (
                    <span className="m-0 font-size-3 text-dark text-break">
                      {/* {replyItem.msg} */}
                      <div
                        className="msg-color"
                        dangerouslySetInnerHTML={{
                          __html: replyItem.msg.replace(" @ ", " "),
                        }}
                      />
                    </span>
                  )}

                  {/* Display mention */}
                  {/* {replyItem.mention && (
                      <span
                        className="text-break text-primary font-size-3"
                        to={`mailto:${replyItem.mention}`}
                        style={{ marginLeft: "5px" }}
                      >
                        {`${replyItem.mention}`}
                      </span>
                    )} */}
                </div>
              }
            </div>
          )
      )}
      <form
        className="comment-form x-auto flex-start"
        onSubmit={(e) => {
          e.preventDefault();
          ReplyAnnotation(commentItem);
        }}
      >
        <div className="comment-input-container">
          <div className="reply_box position-relative d-flex rounded">
            <input
              type="text"
              value={replyCommentClick === commentItem.id ? replyComment : ""}
              onChange={(e) => handleInputChange(e, "reply")}
              placeholder={`${taskType || "Comments"} or add others with @`}
              className="comment-input border-0 bg-light"
              style={{ outline: 0, fontSize: 14, height: "auto" }}
              onSubmit={() => {
                ReplyAnnotation(commentItem);
              }}
            />
            <button
              type="button"
              onClick={() => {
                if (replyCommentData) {
                  OnHandleUpdateCommentReply(replyCommentData);
                  // ReplyAnnotation(replyCommentData)
                } else {
                  ReplyAnnotation(commentItem);
                }
              }}
              className="btn reply_btn doc_btn m-0"
              style={{ fontSize: 30 }}
            >
              <CiPaperplane />
            </button>
            {/* <a
                className="border-0 bg-white rounded cancel-btn text-dark"
                onClick={() => setReplyCommentClick()}
                type="button"
              >
                cancel
              </a> */}
          </div>
          {dropdownVisible && filteredEmails.length > 0 && type === "reply" ? (
            <ul
              className="email-suggestions overflow-scroll"
              style={{
                height: "auto",
              }}
            >
              {filteredEmails.map((email, index) => (
                <li
                  key={index}
                  onClick={() => handleEmailClick(email, "reply")}
                  // onMouseOver={() => handleEmailMouseOver(email.email, "reply")}
                  className="email-suggestion-item text-dark"
                >
                  <strong>
                    {email.name +
                      (email.u_id ? " (Partner)" : "") +
                      "(" +
                      email.email +
                      ")"}
                  </strong>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </form>
    </div>
  );
}
