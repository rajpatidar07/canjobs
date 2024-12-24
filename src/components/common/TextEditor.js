// import React, { useState, useEffect } from 'react';
// import { EditorState, convertFromHTML, ContentState } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import { stateToHTML } from 'draft-js-export-html';
// import { AtomicBlockUtils, EditorState } from 'draft-js';

// export default function TextEditor({ state, setState, page, identifier }) {
//   // Text editor for the description
//   const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

//   //Set variable to update particular state of particular page.
//   let orgVariable = page === "description" ? "description" :
//     page === "FollowUp" ? "remark" :
//       page === "addAgentConversation" ? "message" :
//         page === "companyDetails" ? "about" :
//           page === "requirement" ? "requirement" :
//             page === "yourDuties" ? "your_duties" :
//               page === "jobDescription" ? "job_description" : null

//   //Function to set deafault value
//   useEffect(() => {
//     // Check if content is not null
//     if (state[orgVariable] === null ||
//       state[orgVariable] === "null" ||
//       state[orgVariable] === undefined ||
//       state[orgVariable] === "undefined" ||
//       state[orgVariable] === "") {
//       setEditorState("");
//     } else {
//       const contentBlock = convertFromHTML(
//         page === "description" ? state.description :
//           page === "FollowUp" ? state.remark :
//             page === "emailReplyPage" ? state :
//               page === "addAgentConversation" ? state.message :
//                 page === "companyDetails" ? state.about :
//                   page === "requirement" ? state.requirement :
//                     page === "yourDuties" ? state.your_duties :
//                       page === "jobDescription" ? state.job_description : null
//       );
//       if (contentBlock) { // Add this null check
//         const contentState = ContentState.createFromBlockArray(contentBlock);
//         const editorState = EditorState.createWithContent(contentState);
//         setEditorState(editorState);
//       } else {
//         setEditorState(EditorState.createEmpty()); // Set an empty editor state if contentBlock is null
//       }
//     }
//     // eslint-disable-next-line
//   }, [state, page, identifier]);
//   /*On change function to set updated value */
//   const handleEditorChange = (newEditorState) => {
//     setEditorState(newEditorState);
//   };
//   // Function set cursor correct 
//   const handleBlur = () => {
//     const htmlContent = stateToHTML(editorState.getCurrentContent());
//     if (page === "emailReplyPage") {
//       setState(htmlContent);
//     } else {
//       setState({
//         ...state, [
//           page === "description" ? "description" :
//             page === "FollowUp" ? "remark" :
//               page === "addAgentConversation" ? "message" :
//                 page === "companyDetails" ? "about" :
//                   page === "requirement" ? "requirement" :
//                     page === "yourDuties" ? "your_duties" :
//                       page === "jobDescription" ? "job_description" : null]
//           : htmlContent
//       });
//     }
//   };

//   const wrapperStyle = {
//     display: "block",
//     width: " 100%",
//     // lineHeight: " 1.88",
//     color: " #6b6e6f",
//     backgroundColor: " #fff",
//     backgroundClip: " padding-box",
//     border: " 1px solid #e5e5e5",
//     borderRadius: " 0.3125rem",
//     transition: " border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
//   }
//   const editorStyle = {
//     height: '10rem',
//     padding: '1rem',
//     cursor: 'text',
//   }
//   const handleImageUpload = async (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         resolve({ data: { link: reader.result } }); // Pass the image as base64
//       };
//       reader.onerror = (error) => reject(error);
//       reader.readAsDataURL(file);
//     });
//   };
//   const insertSignature = (editorState, signatureURL) => {
//     const contentState = editorState.getCurrentContent();
//     const contentStateWithEntity = contentState.createEntity(
//       'IMAGE',
//       'IMMUTABLE',
//       { src: signatureURL }
//     );
//     const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
//     const newEditorState = AtomicBlockUtils.insertAtomicBlock(
//       editorState,
//       entityKey,
//       ' '
//     );
//     return EditorState.forceSelection(
//       newEditorState,
//       newEditorState.getCurrentContent().getSelectionAfter()
//     );
//   };
//   return (
//     <div
//     // className='border p-2'
//     // style={{ height: "100px", overflow: "auto" }}
//     >
//       <Editor
//         editorState={editorState}
//         onEditorStateChange={handleEditorChange}
//         onBlur={handleBlur}
//         wrapperStyle={wrapperStyle}
//         editorStyle={editorStyle}
//         toolbar={{
//           options: ['inline', 'list'/*,"fontSize"*/],
//           inline: {
//             options: ['bold', 'italic'],
//           },
//           list: {
//             options: ['unordered', 'ordered'],
//           },
//           // fontSize:{
//           //   options:[8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
//           //   showOpenOptionOnHover:true,
//           // }
//           image: {
//             uploadCallback: handleImageUpload,
//             previewImage: true,
//             alt: { present: true, mandatory: false },
//           },
//         }}
//       /*Code to mention */
//       // mention={{
//       //   separator: ' ',
//       //   trigger: '@',
//       //   suggestions: [
//       //     { text: 'APPLE', value: 'apple', url: 'apple' },
//       //     { text: 'BANANA', value: 'banana', url: 'banana' },
//       //     { text: 'CHERRY', value: 'cherry', url: 'cherry' },
//       //     { text: 'DURIAN', value: 'durian', url: 'durian' },
//       //     { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
//       //     { text: 'FIG', value: 'fig', url: 'fig' },
//       //     { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
//       //     { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
//       //   ],
//       // }}
//       // toolbarOnFocus={toolbarOptions}
//       />
//       <button
//         onClick={() => {
//           const updatedEditorState = insertSignature(
//             editorState,
//             'path/to/signature.png' // Replace with your signature URL or base64 string
//           );
//           setEditorState(updatedEditorState);
//         }}
//       >
//         Add Signature
//       </button>

//     </div>
//   );
// }
// import React, { useState, useEffect } from 'react';
// import { EditorState, convertFromHTML, ContentState, AtomicBlockUtils, Entity } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import { stateToHTML } from 'draft-js-export-html';

// export default function TextEditor({ state, setState, page, identifier }) {
//   const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

//   let orgVariable = page === "description" || page === "mail" ? "description" :
//     page === "FollowUp" ? "remark" :
//       page === "addAgentConversation" ? "message" :
//         page === "companyDetails" ? "about" :
//           page === "requirement" ? "requirement" :
//             page === "yourDuties" ? "your_duties" :
//               page === "jobDescription" ? "job_description" : null;

//   useEffect(() => {
//     if (!state[orgVariable]) {
//       setEditorState(EditorState.createEmpty());
//     } else {
//       const contentBlock = convertFromHTML(state[orgVariable] || '');
//       if (contentBlock) {
//         const contentState = ContentState.createFromBlockArray(contentBlock);
//         setEditorState(EditorState.createWithContent(contentState));
//       }
//     }
//   }, [state, page, identifier, orgVariable]);

//   const handleEditorChange = (newEditorState) => {
//     setEditorState(newEditorState);
//   };

//   const handleBlur = () => {
//     const htmlContent = stateToHTML(editorState.getCurrentContent());
//     setState({ ...state, [orgVariable]: htmlContent });
//   };

//   const handleImageUpload = async (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         resolve({ data: { link: reader.result } });
//       };
//       reader.onerror = (error) => reject(error);
//       reader.readAsDataURL(file);
//     });
//   };

//   const insertSignature = (editorState, signatureURL, signatureText) => {
//     // Create the image entity (for the signature image)
//     const contentState = editorState.getCurrentContent();
//     const contentStateWithEntity = contentState.createEntity(
//       'IMAGE',
//       'IMMUTABLE',
//       { src: signatureURL }
//     );
//     const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

//     // Insert the image as an atomic block
//     let newEditorState = AtomicBlockUtils.insertAtomicBlock(
//       editorState,
//       entityKey,
//       ' '
//     );

//     // If there's signature text, create a text entity
//     if (signatureText) {
//       const contentStateWithText = contentState.createEntity(
//         'TEXT',
//         'MUTABLE',
//         { text: signatureText }
//       );
//       const entityKeyText = contentStateWithText.getLastCreatedEntityKey();

//       // Insert the text after the image block (could be another atomic block or inline)
//       newEditorState = AtomicBlockUtils.insertAtomicBlock(
//         newEditorState,
//         entityKeyText,
//         ' '
//       );
//     }

//     return EditorState.forceSelection(
//       newEditorState,
//       newEditorState.getCurrentContent().getSelectionAfter()
//     );
//   };

//   const blockRenderer = (contentBlock) => {
//     if (contentBlock.getType() === 'atomic') {
//       return {
//         component: MediaComponent,
//         editable: false,
//       };
//     }
//     return null;
//   };

//   const MediaComponent = ({ block, contentState }) => {
//     const entityKey = block.getEntityAt(0);

//     // Check if entityKey is null or undefined
//     if (!entityKey) {
//       return null; // or return some fallback UI
//     }

//     const entity = contentState.getEntity(entityKey);
//     const { src, text } = entity.getData();

//     return (
//       <div style={{ display: 'flex', alignItems: 'center' }}>
//         <img src={src} alt="Signature" style={{ maxWidth: '150px', marginRight: '10px' }} />
//         {text && <div>{text}</div>} {/* Optionally display signature text next to the image */}
//       </div>
//     );
//   };

//   const wrapperStyle = {
//     display: "block",
//     width: "100%",
//     color: "#6b6e6f",
//     backgroundColor: "#fff",
//     border: "1px solid #e5e5e5",
//     borderRadius: "0.3125rem",
//     transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
//   };

//   const editorStyle = {
//     height: '10rem',
//     padding: '1rem',
//     cursor: 'text',
//   };

//   return (
//     <div>
//       <Editor
//         editorState={editorState}
//         onEditorStateChange={handleEditorChange}
//         onBlur={handleBlur}
//         blockRendererFn={blockRenderer}
//         wrapperStyle={wrapperStyle}
//         editorStyle={editorStyle}
//         toolbar={{
//           options: ['inline', 'list', 'image'],
//           inline: { options: ['bold', 'italic'] },
//           list: { options: ['unordered', 'ordered'] },
//           image: {page==="mail"?
//             uploadCallback: handleImageUpload,
//             previewImage: true,
//             alt: { present: true, mandatory: false :null},
//           },
//         }}
//       />
//       <button
//         type='button'
//         className='btn btn-primary'
//         onClick={() => {
//           const signatureURL = 'https://pps.whatsapp.net/v/t61.24694-24/421643341_7345701245495345_3573301936426748155_n.jpg?ccb=11-4&oh=01_Q5AaINUp0vm8iRzsE_DFLtYbX5DwteEy1W78tyFigIN8dDzl&oe=676EA923&_nc_sid=5e03e0&_nc_cat=110'; // Replace with actual signature URL or base64 image
//           const signatureText = "Best regards, John Doe"; // Text signature example
//           const updatedEditorState = insertSignature(editorState, signatureURL, signatureText);
//           setEditorState(updatedEditorState);
//         }}
//       >
//         Add Signature
//       </button>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { EditorState, convertFromHTML, ContentState, AtomicBlockUtils } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stateToHTML } from 'draft-js-export-html';

export default function TextEditor({ state, setState, page, identifier }) {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [showSignatureFields, setShowSignatureFields] = useState(false);
  const [signatureURL, setSignatureURL] = useState('');
  const [signatureText, setSignatureText] = useState('');

  useEffect(() => {
    const orgVariable = page === "description" || page === "mail" ? "description" :
      page === "FollowUp" ? "remark" :
        page === "addAgentConversation" ? "message" :
          page === "companyDetails" ? "about" :
            page === "requirement" ? "requirement" :
              page === "yourDuties" ? "your_duties" :
                page === "jobDescription" ? "job_description" : null;

    if (!state[orgVariable]) {
      setEditorState(EditorState.createEmpty());
    } else {
      const contentBlock = convertFromHTML(state[orgVariable] || '');
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock);
        setEditorState(EditorState.createWithContent(contentState));
      }
    }
  }, [state, page, identifier]);

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleBlur = () => {
    const htmlContent = stateToHTML(editorState.getCurrentContent());
    setState({ ...state, description: htmlContent });
  };

  const insertSignature = (editorState, signatureURL, signatureText) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: signatureURL });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    let newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');

    if (signatureText) {
      const contentStateWithText = newEditorState.getCurrentContent().createEntity('TEXT', 'MUTABLE', { text: signatureText });
      const entityKeyText = contentStateWithText.getLastCreatedEntityKey();
      newEditorState = AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKeyText, ' ');
    }

    return EditorState.forceSelection(newEditorState, newEditorState.getCurrentContent().getSelectionAfter());
  };

  const handleAddSignature = () => {
    if (showSignatureFields) {
      if (signatureURL || signatureText) {
        const updatedEditorState = insertSignature(editorState, signatureURL, signatureText);
        setEditorState(updatedEditorState);
      }
      setSignatureURL('');
      setSignatureText('');
      setShowSignatureFields(false);
    } else {
      setShowSignatureFields(true);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSignatureURL(reader.result); // Base64 URL of the image
      };
      reader.readAsDataURL(file);
    }
  };
  const editorStyle = {
    height: '10rem',
    padding: '1rem',
    cursor: 'text',
  };
  const blockRenderer = (contentBlock) => {
    if (contentBlock.getType() === 'atomic') {
      return {
        component: MediaComponent,
        editable: false,
      };
    }
    return null;
  };
  const MediaComponent = ({ block, contentState }) => {
    const entityKey = block.getEntityAt(0);
  
    if (!entityKey) {
      return null; // or return some fallback UI
    }
  
    const entity = contentState.getEntity(entityKey);
    const { src, text } = entity.getData();
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Render text above the image */}
        {text && <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>{text}</div>}
        {/* Render image below the text */}
        {src && <img src={src} alt="Signature" style={{ maxWidth: '150px', marginTop: '8px' }} />}
      </div>
    );
  };
  
  
  return (
    <div>
      {/* <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        onBlur={handleBlur}
        wrapperStyle={{
          display: "block",
          width: "100%",
          color: "#6b6e6f",
          backgroundColor: "#fff",
          border: "1px solid #e5e5e5",
          borderRadius: "0.3125rem",
        }}
        editorStyle={{ height: '10rem', padding: '1rem', cursor: 'text' }}
      /> */}
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        onBlur={handleBlur}
        blockRendererFn={blockRenderer}
        wrapperStyle={{display: "block",
          width: "100%",
          color: "#6b6e6f",
          backgroundColor: "#fff",
          border: "1px solid #e5e5e5",
          borderRadius: "0.3125rem",
        }}
        editorStyle={editorStyle}
        toolbar={{
          options: ['inline', 'list', 'image'],
          inline: { options: ['bold', 'italic'] },
          list: { options: ['unordered', 'ordered'] },
          // image: {
          //   uploadCallback: handleImageUpload,
          //   previewImage: true,
          //   alt: { present: true, mandatory: false },
          // },
        }}
      />
      {showSignatureFields && (
        <div style={{ margin: '10px 0' }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="form-control mb-2"
          />
          <input
            type="text"
            placeholder="Signature Text"
            value={signatureText}
            onChange={(e) => setSignatureText(e.target.value)}
            className="form-control mb-2"
          />
        </div>
      )}
      <button type="button" className="btn btn-primary" onClick={handleAddSignature}>
        {showSignatureFields ? 'Save Signature' : 'Add Signature'}
      </button>
    </div>
  );
}
