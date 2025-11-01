import React, { useMemo, useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

// Optional: add custom fonts
const Font = Quill.import("formats/font");
Font.whitelist = ["sans-serif", "serif", "monospace", ];
Quill.register(Font, true);

export default function SignatureTextEditor({ name, state, setState, placeholder, id }) {
  const quillRef = useRef(null);
  const [editorValue, setEditorValue] = useState(state || "");

  console.log("Is empty:", state === "", "Current value:", state);

  // Update editor when parent state changes
  useEffect(() => {
    if (state !== undefined && state !== editorValue) {
      const editor = quillRef.current?.getEditor();
      if (state === "") {
        setEditorValue("");
        // Clear the editor content to show placeholder
        if (editor) {
          editor.setContents([]);
          editor.focus();
          editor.blur(); // Remove focus to show placeholder
        }
      } else {
        setEditorValue(state);
        if (editor && editor.root.innerHTML !== state) {
          editor.root.innerHTML = state;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ font: Font.whitelist }],
          [{ size: ["small", false, "large", "huge"] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ script: "sub" }, { script: "super" }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ align: [] }],
          ["blockquote", "code-block"],
          ["link", "image", "video"],
          ["clean"],
        ],
        handlers: {
          image: function () {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.onchange = async () => {
              const file = input.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = (e) => {
                const range = this.quill.getSelection(true);
                this.quill.insertEmbed(range.index, "image", e.target.result);
              };
              reader.readAsDataURL(file);
            };
            input.click();
          },
        },
      },
    }),
    []
  );

  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "color",
    "background",
    "script",
    "header",
    "list",
    "bullet",
    "indent",
    "align",
    "link",
    "image",
    "video",
    "code-block",
  ];

  const handleChange = (content) => {
    console.log(content,editorValue)
    setEditorValue(content);
    setState((prev) => ({ ...prev, [name]: content }));
  };

  return (
    <ReactQuill
      id={id}
      ref={quillRef}
      theme="snow"
      value={editorValue}
      onChange={handleChange}
      modules={modules}
      formats={formats}
      placeholder={placeholder || "Start typing..."}
      style={{ minHeight: 180, height: "auto" }}
    />
  );
}
