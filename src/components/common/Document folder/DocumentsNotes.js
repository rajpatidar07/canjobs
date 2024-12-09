import React, { useState, useEffect } from 'react';
import { EditorState, convertFromHTML, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stateToHTML } from 'draft-js-export-html';
import htmlDocx from 'html-docx-js/dist/html-docx';

const DocumentsNotes = () => {
    // State to hold the editor's content
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    // Load the saved content from localStorage when the component mounts
    useEffect(() => {
        const savedContent = localStorage.getItem('writerContent');
        if (savedContent) {
            // Convert saved HTML content to EditorState
            const contentBlock = convertFromHTML(savedContent);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const newEditorState = EditorState.createWithContent(contentState);
            setEditorState(newEditorState);
        }
    }, []);

    // Function to handle editor content changes
    const handleEditorChange = (newState) => {
        setEditorState(newState);
    };

    // Function to convert document to base64 and save it
    const saveDocumentAsBase64 = () => {
        const content = editorState.getCurrentContent();
        const htmlContent = stateToHTML(content);

        // Convert HTML to a Word document (Blob)
        const converted = htmlDocx.asBlob(htmlContent);

        // Convert the Blob to base64 using FileReader
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64File = reader.result.split(',')[1]; // Get base64 string after 'data:application/msword;base64,'
            console.log('Base64 of Word file:', base64File);
        };

        reader.readAsDataURL(converted); // Read the Blob as a base64 encoded string
    };

    // Auto-save every 5 seconds
    useEffect(() => {
        const autoSaveInterval = setInterval(() => {
            const content = editorState.getCurrentContent();
            const htmlContent = stateToHTML(content);
            localStorage.setItem('writerContent', htmlContent); // Auto-save in localStorage every 5 seconds
        }, 5000); // Save every 5 seconds

        return () => clearInterval(autoSaveInterval); // Cleanup interval on component unmount
    }, [editorState]);

    const editorStyle = {
        height: '10rem',
        padding: '1rem',
        cursor: 'text',
        backgroundcolor: "light yellow"
    };

    return (
        <div className='position-sticky '>
            <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                placeholder="Start typing your notes..."
                editorStyle={editorStyle}
                toolbar={{
                    options: ['inline', 'list' /*,"fontSize"*/],
                    inline: {
                        options: ['bold', 'italic'],
                    },
                    list: {
                        options: ['unordered', 'ordered'],
                    },
                }}
            />
            <div>
                <button className="btn-sm btn-primary" onClick={saveDocumentAsBase64}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default DocumentsNotes;
