// import React, { useState, useEffect } from 'react';
// import { EditorState, convertFromHTML, ContentState } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import { stateToHTML } from 'draft-js-export-html';
// import htmlDocx from 'html-docx-js/dist/html-docx';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { AddSharePointDOcument } from '../../../api/api';

// const DocumentsNotes = (props) => {
//     const [editorState, setEditorState] = useState(EditorState.createEmpty());

//     // Load content from localStorage if available
//     useEffect(() => {
//         const savedContent = localStorage.getItem('writerContent');
//         if (savedContent) {
//             const contentBlock = convertFromHTML(savedContent);
//             const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
//             const newEditorState = EditorState.createWithContent(contentState);
//             setEditorState(newEditorState);
//         }
//     }, []);

//     const handleEditorChange = (newState) => {
//         console.log(newState)
//         setEditorState(newState);
//     };

//     const saveDocumentAsBase64 = async () => {
//         try {
//             const content = editorState.getCurrentContent();
//             const htmlContent = stateToHTML(content); // Get the HTML content from the editor
//             console.log("html =>", htmlContent);

//             // Convert HTML to a Word document (Blob) using htmlDocx
//             const convertedBlob = htmlDocx.asBlob(htmlContent); // Pass the variable `htmlContent` instead of the string "htmlContent"
//             console.log("convertedBlob =>", convertedBlob);
//             // nsp code start here

//             // Create a temporary element to parse the HTML
//             const tempDiv = document.createElement('div');
//             tempDiv.innerHTML = htmlContent;

//             // Replace <br> tags with newlines
//             tempDiv.querySelectorAll('br').forEach(br => br.replaceWith('\n'));

//             // Replace bullet lists with text representation
//             tempDiv.querySelectorAll('ul, ol').forEach(list => {
//                 const isOrdered = list.tagName === 'OL';
//                 let bulletIndex = 1;

//                 Array.from(list.children).forEach(li => {
//                     // Add bullet or number before the text
//                     const bullet = isOrdered ? `${bulletIndex}. ` : '• ';
//                     li.textContent = bullet + li.textContent.trim();

//                     bulletIndex++;
//                 });

//                 // Replace list with its text representation
//                 list.replaceWith(document.createTextNode(list.textContent + '\n'));
//             });

//             // Preserve newlines and white spaces for <pre> tags
//             tempDiv.querySelectorAll('pre').forEach(pre => {
//                 const text = pre.textContent;
//                 pre.replaceWith(document.createTextNode(text));
//             });
//             // Handle <b>, <strong> for bold text
//             tempDiv.querySelectorAll('b, strong').forEach(bold => {
//                 bold.textContent = `**${bold.textContent.trim()}**`;
//                 bold.replaceWith(document.createTextNode(bold.textContent));
//             });

//             // Handle <i>, <em> for italic text
//             tempDiv.querySelectorAll('i, em').forEach(italic => {
//                 italic.textContent = `*${italic.textContent.trim()}*`;
//                 italic.replaceWith(document.createTextNode(italic.textContent));
//             });
//             // Extract the text content with whitespace
//             let plainText = tempDiv.textContent;

//             // Clean up excessive spaces and lines
//             plainText = plainText.replace(/(\r\n|\n|\r)/gm, '\n') // Normalize line endings
//                 .replace(/\n\s*\n/g, '\n\n') // Remove extra blank lines
//                 .trim(); // Trim leading and trailing spaces
//             //ends here nsp code

//             // Create a File object from the Blob
//             const wordFile = new File([plainText], `note${new Date().getTime()}.docx`, {
//                 type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//                 lastModified: new Date().getTime(), // Set the last modified time
//             });
//             console.log(wordFile);

//             // Create a temporary link to trigger the download
//             const link = document.createElement("a");
//             const url = URL.createObjectURL(wordFile);

//             // Set the download attribute of the link to the desired filename
//             link.href = url;
//             link.download = wordFile.name;  // The name of the file being downloaded

//             // Trigger a click event on the link to start the download
//             link.click();

//             // Clean up the URL object to release memory
//             URL.revokeObjectURL(url);

//             // Call AddSharePointDocument with fileObject
//             const res = await AddSharePointDOcument(
//                 props.user_id,
//                 props.emp_user_type,
//                 props.folderID,
//                 props.docTypeName,
//                 [wordFile]
//             );

//             if (res.data.message === "Document Upload") {
//                 toast.success('Note added successfully!', {
//                     position: toast.POSITION.TOP_RIGHT,
//                     autoClose: 1000,
//                 });
//                 props.setApiCall(true);
//                 setEditorState(EditorState.createEmpty()); // Clear the editor after save
//                 localStorage.removeItem('writerContent'); // Clear saved content from localStorage
//             }
//         } catch (err) {
//             console.error('Error saving document:', err);
//         }
//     };

//     const handleNoteFormClose = () => {
//         setEditorState(EditorState.createEmpty()); // Reset the editor state
//         props.setOpenNoteForm(false); // Close the note form
//         localStorage.removeItem('writerContent'); // Remove saved content from localStorage
//     };

//     const editorStyle = {
//         height: '10rem',
//         padding: '1rem',
//         cursor: 'text',
//         backgroundColor: 'lightyellow',
//     };

//     return (
//         <div className='position-sticky'>
//             <div className="d-flex flex-row-reverse position-relative">
//                 <button
//                     className={`btn-sm btn-light border-0 rounded-circle p-2 position-absolute top-0 end-0`}
//                     onClick={handleNoteFormClose} // Reset editor and close form
//                     style={{
//                         backgroundColor: '#f8f9fa', // Light background
//                         color: '#333', // Dark text color for visibility
//                         borderRadius: '50%',
//                         fontSize: '18px',
//                         lineHeight: '18px',
//                         width: '30px',
//                         height: '30px',
//                         padding: '0',
//                     }}
//                 >
//                     <span style={{ fontWeight: 'bold', fontSize: '16px' }}>×</span>
//                 </button>
//             </div>
//             <Editor
//                 editorState={editorState}
//                 onEditorStateChange={handleEditorChange}
//                 placeholder='Start typing your notes...'
//                 editorStyle={editorStyle}
//                 toolbar={{
//                     options: ['inline', 'list'],
//                     inline: { options: ['bold', 'italic'] },
//                     list: { options: ['unordered', 'ordered'] },
//                     blockType: { options: ['Normal', 'H1', 'H2', 'H3'] },
//                     fontSize: { options: ['10', '12', '14', '16', '18', '24', '36'] },
//                     colorPicker: { colors: ['#000000', '#FF0000', '#00FF00', '#0000FF'] },
//                     emoji: true, // Optional: Adds an emoji picker to the toolbar
//                 }}
//             />
//             <div>
//                 <button className='btn-sm btn-primary' onClick={saveDocumentAsBase64}>
//                     Save Document
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default DocumentsNotes;
import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromHTML, ContentState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { AddSharePointDOcument } from "../../../api/api";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";

const DocumentsNotes = (props) => {
    const [loading, setLoading] = useState(false)
    const initialHTML = props.convertedDoc || "";
    const contentState = ContentState.createFromBlockArray(
        convertFromHTML(initialHTML)
    );
    const [editorState, setEditorState] = useState(
        EditorState.createWithContent(contentState)
    );
    /*Function to Add note to the api */
    const exportToTextFile = async (e) => {
        e.preventDefault()
        const htmlContent = stateToHTML(editorState.getCurrentContent());

        // Convert HTML to plain text
        // const plainText = htmlContent.replace(/<[^>]+>/g, "").trim();

        // Create a Blob with plain text
        const blob = new Blob([htmlContent], { type: "text/plain" });

        const wordFile = new File([blob], props?.convertedDoc ? props?.docSingleDate?.name : `note${new Date().getTime()}.txt`, {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            lastModified: new Date().getTime(), // Set the last modified time
        });
        // Create a download link and trigger the download
        // const link = document.createElement("a");
        // link.href = URL.createObjectURL(blob);
        // link.download = "note.txt"; // Save as a .txt file
        // link.click();
        console.log("Note file =>",wordFile)
        try {
            setLoading(true)
            const res = await AddSharePointDOcument(
                props.user_id,
                props.emp_user_type,
                props.folderID,
                props.docTypeName,
                [wordFile]
            );

            if (res.data.message === "Document Upload") {
                toast.success('Note added successfully!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
                props.setApiCall(true);
                setLoading(false)
                handleNoteFormClose()
                localStorage.removeItem('writerContent'); // Clear saved content from localStorage
            }
        } catch (error) {
            console.log(error)
        }
    };
    /*Function to close the note form */
    const handleNoteFormClose = () => {
        setEditorState(EditorState.createEmpty()); // Reset the editor state
        props.setOpenNoteForm(false); // Close the note form
        // props.setConvertedDoc("")
        setLoading(false)
    };
    const editorStyle = {
        backgroundColor: "#f7f1a3",
        minHeight: "10rem",
        padding: "1rem",
        borderRadius: "5px",
    };
    return (
        <>
            <Modal
                show={props.show}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onBackdropClick={handleNoteFormClose}
            >
                <button
                    type="button"
                    className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
                    data-dismiss="modal"
                    onClick={handleNoteFormClose}
                >
                    <i className="fas fa-times"></i>
                </button>
                {/* <div className="modal-dialog max-width-px-540 position-relative"> */}
                <div className="bg-white rounded h-100 p-7">
                    <form onSubmit={(e) => exportToTextFile(e)}>
                        <h5 className="text-center mb-7">Add Note </h5>
                        <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "5px", width: "100%", backgroundColor: "#f7f1a3" }}>
                            <Editor
                                editorState={editorState}
                                onEditorStateChange={(state) => setEditorState(state)}
                                toolbar={{
                                    options: ['inline', 'list'],
                                    inline: { options: ['bold', 'italic'] },
                                    list: { options: ['unordered', 'ordered'] },
                                    emoji: true,
                                }}
                                editorStyle={editorStyle}
                            />
                        </div>
                        <div className="d-flex justify-content-center">
                            {loading === true ? (
                                <button
                                    className="btn btn-primary "
                                    type="button"
                                    disabled
                                >
                                    <span
                                        className="spinner-border spinner-border-sm "
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                    <span className="sr-only">Loading...</span>
                                </button>
                            ) : <button className='btn btn-primary' type="submit">
                                Save
                            </button>}
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default DocumentsNotes;
