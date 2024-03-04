import React, { useState, useEffect } from 'react';
import { EditorState, convertFromHTML, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stateToHTML } from 'draft-js-export-html';

export default function TextEditor({ state, setState, page }) {
  // Text editor for the description
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  console.log(page, state, state[page])
  useEffect(() => {
    // Check if content is not null
    if (state[page] === null ||
      state[page] === "null" ||
      state[page] === undefined ||
      state[page] === "undefined"||
      state[page] === "") {
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
  }, [state, page]);


  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleBlur = () => {
    const htmlContent = stateToHTML(editorState.getCurrentContent());
    if (page === "emailReplyPage") {
      setState(htmlContent);
    } else {
      setState({
        ...state,
        [page === "description" ? "description" :
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

  const toolbarOptions = {
    options: ['inline', 'list'],
    inline: {
      options: ['bold', 'italic', 'underline', 'strikethrough', 'code'],
    },
    list: {
      options: ['unordered', 'ordered'],
    },
  };
  return (
    <div className='border p-2'
      style={{ height: "200px", overflow: "scroll" }}>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        onBlur={handleBlur}
        toolbarHidden={true} />
    </div>
  );
}
