import React, { useState, useEffect } from 'react';
import { EditorState, convertFromHTML, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stateToHTML } from 'draft-js-export-html';

export default function TextEditor({ state, setState, page, identifier }) {
  // Text editor for the description
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  //Set variable to update particular state of particular page.
  let orgVariable = page === "description" ? "description" :
    page === "FollowUp" ? "remark" :
      page === "addAgentConversation" ? "message" :
        page === "companyDetails" ? "about" :
          page === "requirement" ? "requirement" :
            page === "yourDuties" ? "your_duties" :
              page === "jobDescription" ? "job_description" : null

  //Function to set deafault value
  useEffect(() => {
    // Check if content is not null
    if (state[orgVariable] === null ||
      state[orgVariable] === "null" ||
      state[orgVariable] === undefined ||
      state[orgVariable] === "undefined" ||
      state[orgVariable] === "") {
      setEditorState("");
    } else {
      const contentBlock = convertFromHTML(
        page === "description" ? state.description :
          page === "FollowUp" ? state.remark :
            page === "emailReplyPage" ? state :
              page === "addAgentConversation" ? state.message :
                page === "companyDetails" ? state.about :
                  page === "requirement" ? state.requirement :
                    page === "yourDuties" ? state.your_duties :
                      page === "jobDescription" ? state.job_description : null
      );
      const contentState = ContentState.createFromBlockArray(contentBlock || []);
      const editorState = EditorState.createWithContent(contentState || null);
      setEditorState(editorState);
    }
  }, [state, page, identifier]);

  /*On chnage function to set updated value */
  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };
  // Function set cursor correct 
  const handleBlur = () => {
    const htmlContent = stateToHTML(editorState.getCurrentContent());
    if (page === "emailReplyPage") {
      setState(htmlContent);
    } else {
      setState({
        ...state, [
          page === "description" ? "description" :
            page === "FollowUp" ? "remark" :
              page === "addAgentConversation" ? "message" :
                page === "companyDetails" ? "about" :
                  page === "requirement" ? "requirement" :
                    page === "yourDuties" ? "your_duties" :
                      page === "jobDescription" ? "job_description" : null]
          : htmlContent
      });
    }
  };

  const wrapperStyle = {
    display: "block",
    width: " 100%",
    // lineHeight: " 1.88",
    color: " #6b6e6f",
    backgroundColor: " #fff",
    backgroundClip: " padding-box",
    border: " 1px solid #e5e5e5",
    borderRadius: " 0.3125rem",
    transition: " border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
  }
  const editorStyle = {
    height: '10rem',
    padding: '1rem'
  }
  return (
    <div
    // className='border p-2'
    // style={{ height: "100px", overflow: "auto" }}
    >
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        onBlur={handleBlur}
        wrapperStyle={wrapperStyle}
        editorStyle={editorStyle}
        toolbar={{
          options: ['inline', 'list'],
          inline: {
            options: ['bold', 'italic'],
          },
          list: {
            options: ['unordered', 'ordered'],
          },
        }}
      // toolbarOnFocus={toolbarOptions}
      />
    </div>
  );
}
