import React, { useState, useEffect } from 'react';
import { EditorState, convertFromHTML, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stateToHTML } from 'draft-js-export-html';
import htmlDocx from 'html-docx-js/dist/html-docx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddSharePointDOcument } from '../../../api/api';

const DocumentsNotes = (props) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    // Load content from localStorage if available
    useEffect(() => {
        const savedContent = localStorage.getItem('writerContent');
        if (savedContent) {
            const contentBlock = convertFromHTML(savedContent);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const newEditorState = EditorState.createWithContent(contentState);
            setEditorState(newEditorState);
        }
    }, []);

    const handleEditorChange = (newState) => {
        console.log(newState)
        setEditorState(newState);
    };

    const saveDocumentAsBase64 = async () => {
        console.log(editorState)
        try {
            // Extract content and convert to HTML
//             const content = editorState.getCurrentContent();
//             const htmlContent = stateToHTML(content);
//             console.log("html =>", htmlContent)
//             // Convert HTML to a Word document (Blob)
//             const convertedBlob = htmlDocx.asBlob("htmlContent");
// console.log("convertedBlob =>", convertedBlob)
//             // Create a File object from the Blob
//             const wordFile = new File([convertedBlob], `note${new Date().getTime()}.txt`, {
//                 type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//                 lastModified: new Date().getTime(), // Set the last modified time
//             });
//             console.log(wordFile)

//     // Create a temporary link to trigger the download
//     const link = document.createElement("a");
//     const url = URL.createObjectURL(wordFile);

//     // Set the download attribute of the link to the desired filename
//     link.href = url;
//     link.download = wordFile.name;  // The name of the file being downloaded

//     // Trigger a click event on the link to start the download
//     link.click();

//     // Clean up the URL object to release memory
//     URL.revokeObjectURL(url);
const content = editorState.getCurrentContent();
const htmlContent = stateToHTML(content); // Get the HTML content from the editor
console.log("html =>", htmlContent);

// Convert HTML to a Word document (Blob) using htmlDocx
const convertedBlob = htmlDocx.asBlob(htmlContent); // Pass the variable `htmlContent` instead of the string "htmlContent"
console.log("convertedBlob =>", convertedBlob);

// Create a File object from the Blob
const wordFile = new File([convertedBlob], `note${new Date().getTime()}.docx`, {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    lastModified: new Date().getTime(), // Set the last modified time
});
console.log(wordFile);

// Create a temporary link to trigger the download
const link = document.createElement("a");
const url = URL.createObjectURL(wordFile);

// Set the download attribute of the link to the desired filename
link.href = url;
link.download = wordFile.name;  // The name of the file being downloaded

// Trigger a click event on the link to start the download
link.click();

// Clean up the URL object to release memory
URL.revokeObjectURL(url);

            // Call AddSharePointDocument with fileObject
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
                setEditorState(EditorState.createEmpty()); // Clear the editor after save
                localStorage.removeItem('writerContent'); // Clear saved content from localStorage
            }
        } catch (err) {
            console.error('Error saving document:', err);
        }
    };

    const handleNoteFormClose = () => {
        setEditorState(EditorState.createEmpty()); // Reset the editor state
        props.setOpenNoteForm(false); // Close the note form
        localStorage.removeItem('writerContent'); // Remove saved content from localStorage
    };

    const editorStyle = {
        height: '10rem',
        padding: '1rem',
        cursor: 'text',
        backgroundColor: 'lightyellow',
    };

    return (
        <div className='position-sticky'>
            <div className="d-flex flex-row-reverse position-relative">
                <button
                    className={`btn-sm btn-light border-0 rounded-circle p-2 position-absolute top-0 end-0`}
                    onClick={handleNoteFormClose} // Reset editor and close form
                    style={{
                        backgroundColor: '#f8f9fa', // Light background
                        color: '#333', // Dark text color for visibility
                        borderRadius: '50%',
                        fontSize: '18px',
                        lineHeight: '18px',
                        width: '30px',
                        height: '30px',
                        padding: '0',
                    }}
                >
                    <span style={{ fontWeight: 'bold', fontSize: '16px' }}>×</span>
                </button>
            </div>
            <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                placeholder='Start typing your notes...'
                editorStyle={editorStyle}
                toolbar={{
                    options: ['inline', 'list'],
                    inline: { options: ['bold', 'italic'] },
                    list: { options: ['unordered', 'ordered'] },
                    blockType: { options: ['Normal', 'H1', 'H2', 'H3'] },
                    fontSize: { options: ['10', '12', '14', '16', '18', '24', '36'] },
                    colorPicker: { colors: ['#000000', '#FF0000', '#00FF00', '#0000FF'] },
                    emoji: true, // Optional: Adds an emoji picker to the toolbar
                }}
            />
            <div>
                <button className='btn-sm btn-primary' onClick={saveDocumentAsBase64}>
                    Save Document
                </button>
            </div>
        </div>
    );
};

export default DocumentsNotes;
