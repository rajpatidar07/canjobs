import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const CreateWordFile = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const createDocument = () => {
        const contentState = editorState.getCurrentContent();
        const rawContent = convertToRaw(contentState);

        const paragraphs = rawContent.blocks.map(block => {
            const textRuns = [];
            let lastOffset = 0;

            block.inlineStyleRanges.forEach(styleRange => {
                if (styleRange.offset > lastOffset) {
                    textRuns.push(new TextRun(block.text.substring(lastOffset, styleRange.offset)));
                }
                let textRun = new TextRun(block.text.substr(styleRange.offset, styleRange.length));
                if (styleRange.style === 'BOLD') textRun = textRun.bold();
                if (styleRange.style === 'ITALIC') textRun = textRun.italic();
                if (styleRange.style === 'UNDERLINE') textRun = textRun.underline();
                textRuns.push(textRun);
                lastOffset = styleRange.offset + styleRange.length;
            });

            if (lastOffset < block.text.length) {
                textRuns.push(new TextRun(block.text.substring(lastOffset)));
            }

            return new Paragraph({
                children: textRuns.length > 0 ? textRuns : [new TextRun(block.text)],
            });
        });

        const doc = new Document({
            sections: [{
                children: paragraphs,
            }],
        });

        Packer.toBlob(doc).then(blob => {
            saveAs(blob, "custom-file.docx");
            console.log("Word file created and downloaded");
        });
    };

    return (
        <div>
            <h1>Create Word File</h1>
            <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                toolbar={{
                    options: ['inline', 'list'],
                    inline: { options: ['bold', 'italic', 'underline'] },
                    list: { options: ['unordered', 'ordered'] },
                    emoji: true,
                }}
                editorStyle={{ border: '1px solid #ddd', minHeight: '200px' }}
            />
            <button onClick={createDocument}>Create Word File</button>
        </div>
    );
};

export default CreateWordFile;
