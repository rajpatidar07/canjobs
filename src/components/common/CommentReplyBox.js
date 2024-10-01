import React from "react";
// import { Link } from "react-router-dom";
import { CiPaperplane } from "react-icons/ci";
import ConvertTime from "./ConvertTime";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
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
  OnDeleteCommentReplies
}) {
  return (
    <div className="reply_box_container mx-2 fade show">
      {/* Display replies only if task_id matches */}
      {(commentsReplyList || []).map(
        (replyItem, replyIndex) =>
          // Only render the reply if task_id matches the comment's id
          replyItem.task_id === commentItem.id && (
            <div key={replyIndex}>
              {/* Display reply message */}
              {
                <div className="p-2 bg-white rounded mb-1">
                  <div className="d-flex justify-content-between align-items-center text-dark">
                    <div className="d-flex profile_box gx-2 mb-1">
                      <div className="media  align-items-center">
                        <div
                          className={`circle-24 mx-auto overflow-hidden text-capitalize text-white ${determineBackgroundColor(
                            replyItem
                          )}`}
                          style={{ fontSize: "16px", fontWeight: 700 }}
                        >
                          {replyItem.sender_name.charAt(0)}
                        </div>
                      </div>
                      <div className=" mb-0">
                        <div className="font-size-3 font-weight-bold text-capitalize">
                          {replyItem.sender_name}
                        </div>
                        <div className="text-gray font-size-2 font-weight-normal m-0 text-capitalize">
                          <i className="font-size-2">
                            <ConvertTime _date={replyItem.updated_at} format={"HH:mm D MMM"} />
                            {/* {moment(replyItem.updated_at).format("HH:mm D MMM")} */}
                          </i>
                        </div>
                      </div>
                    </div>
                    {/* {replyItem.sender_name} */}
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
                      <div className="msg-color" dangerouslySetInnerHTML={{ __html: replyItem.msg.replace(" @ ", " ") }} />
                    </span>
                  )}
                  <Link className="text-gray pr-2" title="Update Comment" onClick={() => {
                    handleUpdateReplyLinkClick(replyItem);
                  }}>  <FaEdit /></Link>
                  <Link className="text-danger pr-2" title="Delete Comment" onClick={() => {
                      OnDeleteCommentReplies(replyItem.id);
                    }}>  <FaTrash /></Link>
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
          <div className="reply_box position-relative d-flex rounded bg-white">
            <input
              type="text"
              value={replyComment || ""}
              onChange={(e) => handleInputChange(e, "reply")}
              placeholder="Comments or add others with @"
              className="comment-input border-0"
              style={{ outline: 0 }}
              onSubmit={() => {
                ReplyAnnotation(commentItem);
              }}
            />
            <button
              type="button"
              onClick={() => {
                if (replyCommentData) {
                  OnHandleUpdateCommentReply(replyCommentData)
                } else {
                   ReplyAnnotation(commentItem)
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
          {(filteredEmails.length > 0 && type === "reply") ? (
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
                  <strong>{email.name + (email.u_id ? " (Partner)" : "") + "(" + email.email + ")"}</strong>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </form>
    </div>
  );
}
