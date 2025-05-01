import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { AddSharePointDOcument } from '../../../api/api';
import { Document, Packer, Paragraph, TextRun } from "docx";
import { convertToRaw } from "draft-js";

const CreateWordFile = (props) => {
    const [editorState, setEditorState] = useState('');
    const [loading, setLoading] = useState(false)

    const handleWordClose = () => {
        props.close()
        setEditorState("")
    }
    const createDocument = async (e) => {
        //just bold,italic underline and list is working
        e.preventDefault();
        const rawContent = convertToRaw(editorState.getCurrentContent());
        const blocks = rawContent.blocks;

        const paragraphs = [];

        blocks.forEach((block) => {
            const { text, inlineStyleRanges, type } = block;
            let textRuns = [];

            // Process inline styling (BOLD, ITALIC, UNDERLINE)
            if (inlineStyleRanges && inlineStyleRanges.length > 0) {
                // Sort inlineStyleRanges by offset to handle text in order.
                const sortedRanges = [...inlineStyleRanges].sort((a, b) => a.offset - b.offset);
                let currentIndex = 0;

                sortedRanges.forEach((range) => {
                    const { offset, length, style } = range;
                    // Add text before styled segment if any.
                    if (offset > currentIndex) {
                        textRuns.push(new TextRun(text.slice(currentIndex, offset)));
                    }

                    // Apply the inline style on the segment.
                    const styledText = text.slice(offset, offset + length);
                    textRuns.push(new TextRun({
                        text: styledText,
                        bold: style === "BOLD",
                        italics: style === "ITALIC",
                        underline: style === "UNDERLINE"
                    }));

                    currentIndex = offset + length;
                });

                // If there's any remaining text after the last style
                if (currentIndex < text.length) {
                    textRuns.push(new TextRun(text.slice(currentIndex)));
                }
            } else {
                // No inline styles; add the entire text.
                textRuns.push(new TextRun(text));
            }

            // Prepare paragraph configuration for numbering if needed.
            let paragraphOptions = { children: textRuns };
            if (type === 'unordered-list-item') {
                paragraphOptions.numbering = {
                    reference: "bullet",
                    level: 0,
                };
            } else if (type === 'ordered-list-item') {
                paragraphOptions.numbering = {
                    reference: "numbered",
                    level: 0,
                };
            }

            // Create the paragraph with inline text and any list numbering.
            paragraphs.push(new Paragraph(paragraphOptions));
        });

        // Create the document including numbering configuration.
        const doc = new Document({
            numbering: {
                config: [
                    {
                        reference: "bullet",
                        levels: [
                            {
                                level: 0,
                                format: "bullet",
                                text: "\u2022",  // Bullet character
                                alignment: "left",
                            },
                        ],
                    },
                    {
                        reference: "numbered",
                        levels: [
                            {
                                level: 0,
                                format: "decimal",
                                text: "%1.",    // Numbered list format (1., 2., etc.)
                                alignment: "left",
                            },
                        ],
                    },
                ],
            },
            sections: [
                {
                    children: paragraphs,
                },
            ],
        });

        const blob = await Packer.toBlob(doc);
        const fileName = `formatted-word-${Date.now()}.docx`;

        const wordFile = new File([blob], fileName, {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            lastModified: new Date().getTime(),
        });

        if (!wordFile.name) {
            toast.error("File name is undefined");
            return;
        }

        try {
            setLoading(true);
            const res = await AddSharePointDOcument(
                props.user_id,
                props.emp_user_type,
                props.folderID,
                props.docTypeName,
                [wordFile]
            );

            if (res.data.message === "Document Upload") {
                toast.success("Word file Created successfully!");
                props.setApiCall(true);
                handleWordClose();
                localStorage.removeItem("writerContent");
            }
        } catch (error) {
            console.error("Upload failed:", error);
            toast.error("Upload failed");
        } finally {
            setLoading(false);
        }

    };

    // const uploadImageCallBack = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             resolve({ data: { link: reader.result } });
    //         };
    //         reader.readAsDataURL(file);
    //     });
    // };

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
                                options: [
                                    'list',
                                    'inline',
                                    // 'blockType', 'fontSize', 'fontFamily', 
                                    // , 'textAlign',
                                    // 'colorPicker', 'link', 'emoji', 'image', 'remove', 'history'
                                ],
                                inline: {
                                    options: ['bold', 'italic', 'underline', /*'strikethrough', 'monospace'*/],
                                },
                                // blockType: {
                                //     inDropdown: true,
                                // },
                                // fontSize: {
                                //     options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 36],
                                // },
                                // fontFamily: {
                                //     options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman'],
                                // },
                                // colorPicker: true,
                                // link: {
                                //     showOpenOptionOnHover: true,
                                //     defaultTargetOption: '_blank',
                                // },
                                // emoji: true,
                                // image: {
                                //     uploadEnabled: true,
                                //     uploadCallback: uploadImageCallBack,  // ensure callback is correctly defined
                                //     alt: { present: true, mandatory: false },
                                //     previewImage: true,
                                // },
                                // remove: true,
                                // history: {
                                //     inDropdown: true,
                                // },
                                list: {
                                    options: ['unordered', 'ordered', /*'indent', 'outdent'*/],
                                },
                                // textAlign: {
                                //     options: ['left', 'center', 'right', 'justify'],
                                // },
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
