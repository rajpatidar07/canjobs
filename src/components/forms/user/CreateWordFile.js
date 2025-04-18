import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { stateToHTML } from 'draft-js-export-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { AddSharePointDOcument } from '../../../api/api';
const CreateWordFile = (props) => {
    const [editorState, setEditorState] = useState('');
    const [loading, setLoading] = useState(false)

    const handleWordClose = () => {
        props.close()
        setEditorState("")
    }
    const createDocument = async (e) => {
        e.preventDefault()
        const htmlContent = stateToHTML(editorState.getCurrentContent());

        // Create a Blob with the HTML content
        const blob = new Blob([htmlContent], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });

        // Create a Word file
        const wordFile = new File([blob], `word-file-${new Date().getTime()}.docx`, {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            lastModified: new Date().getTime(),
        });

        // saveAs(wordFile); // Trigger the download
        console.log("Word file created with content:", wordFile); // Log the content
        if (wordFile.name === "undefined" || wordFile.name === undefined) {
            toast.error("File name is undefined")
        } else {
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
                    handleWordClose()
                    localStorage.removeItem('writerContent'); // Clear saved content from localStorage
                } else {
                    setLoading(false)

                }
            } catch (error) {
                setLoading(false)
                console.log(error)
            }
        }
    };


    return (
        <Modal
            show={props.show}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onBackdropClick={() => handleWordClose()}
        >
            <button
                type="button"
                className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
                data-dismiss="modal"
                onClick={() => handleWordClose()}
            >
                <i className="fas fa-times"></i>
            </button>
            <div className="bg-white rounded h-100 p-7">
                <form>
                    <h5 className="text-center mb-7">Add Word file </h5>
                    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "5px", width: "100%" }}>
            <Editor
                editorState={editorState}
                            onEditorStateChange={(state) => setEditorState(state)}
                toolbar={{
                    options: ['inline', 'list'],
                                inline: { options: ['bold', 'italic'] },
                    list: { options: ['unordered', 'ordered'] },
                    emoji: true,
                }}
                editorStyle={{ border: '1px solid #ddd', minHeight: '200px' }}
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
                        ) : <button className='btn btn-primary' type="button" onClick={(e) => createDocument(e)}>
                            Save
                        </button>}
                    </div>
                </form>
        </div>
        </Modal>
    );
};

export default CreateWordFile;
