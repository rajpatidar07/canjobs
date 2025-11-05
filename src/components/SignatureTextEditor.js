import React, { useMemo, useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

// Optional: add custom fonts
const Font = Quill.import("formats/font");
Font.whitelist = ["sans-serif", "serif", "monospace",];
Quill.register(Font, true);
function escapeHtml(str) {
  // simple escape for text nodes turned into HTML
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function cleanSignatureHTML(html) {
  const temp = document.createElement("div");
  temp.innerHTML = html || "";

  const parts = []; // pieces to join (strings of HTML)
  const nodes = Array.from(temp.childNodes);

  nodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent.trim();
      if (text) {
        // plain text - keep
        parts.push(escapeHtml(text));
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const tag = node.tagName.toLowerCase();

      if (tag === "p") {
        const inner = node.innerHTML.trim();
        if (!inner) return; // skip empty paragraphs

        // detect if this paragraph contains only image(s)
        const onlyImgs = Array.from(node.childNodes).every(
          (n) =>
            n.nodeType === Node.ELEMENT_NODE &&
            n.tagName &&
            n.tagName.toLowerCase() === "img"
        );

        if (onlyImgs) {
          // preserve images as-is (block)
          parts.push(node.innerHTML);
        } else {
          // keep inner markup (links, spans, inline styles) inside a span
          parts.push(`<span>${inner}</span>`);
        }
      } else {
        // non-<p> element (e.g. <div>, <img>, <ul>) — keep whole element
        parts.push(node.outerHTML);
      }
    }
  });

  // join with <br/> between inline parts, but avoid adding <br/> between image blocks
  const out = [];
  parts.forEach((p, idx) => {
    out.push(p);
    if (idx < parts.length - 1) {
      const curr = p.trim();
      const next = parts[idx + 1].trim();
      const currIsImgOnly = /^<img[\s\S]*?>$/.test(curr) || /^<img/i.test(curr);
      const nextIsImgOnly = /^<img[\s\S]*?>$/.test(next) || /^<img/i.test(next);

      // Add <br/> only if neither side is pure image block — this avoids extra gap before/after images
      if (!currIsImgOnly && !nextIsImgOnly) out.push("<br/>");
    }
  });

  // Final trim to avoid trailing <br/>
  let cleaned = out.join("");
  cleaned = cleaned.replace(/(?:\s|&nbsp;)+$/g, ""); // remove trailing whitespace
  cleaned = cleaned.replace(/(<br\/?>)+$/i, ""); // remove trailing <br>

  return cleaned;
}


export default function SignatureTextEditor({ name, state, setState, placeholder, id }) {
  const quillRef = useRef(null);
  const [editorValue, setEditorValue] = useState(state || "");

  // console.log("Is empty:", state === "", "Current value:", state);

  // Update editor when parent state changes
  useEffect(() => {
    if (state !== undefined && state !== editorValue) {
      setEditorValue(state);
      if (quillRef.current) {
        const editor = quillRef.current.getEditor();
        if (editor) {
          if (state === "") {
            editor.setContents([]);
          } else {
            editor.setContents(editor.clipboard.convert(state));
          }
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
  const handleChange = (content, delta, source, editor) => {
    // 1. Update local state immediately for a smooth typing experience
    setEditorValue(content);

    // 2. ONLY update the parent state when you are ready to save/finalize.
    // For continuous saving, you might use a debounce function or check the 'source' argument.
    // Since you want to fix the jumping, we'll keep the update local for now.
    // To update the parent, you should clean the HTML:
    // const cleaned = cleanSignatureHTML(content);

    // TEMPORARY: If you MUST update parent on change, try checking the source:
    if (source === 'user') {
      // Debounce this call or only call it on a blur/save button click
      // For demonstration, let's keep it local for now to fix the jumping.
    }

    // *** REMOVE OR MOVE THIS LINE to a separate save function or a debounced handler ***
    // setState((prev) => ({ ...prev, [name]: cleaned })); 

    // console.log("Cleaned signature HTML:", cleaned);
  };

  // You need a way to **trigger** the parent state update (setState) when the user is done editing, 
  // e.g., on a blur event or an explicit save button click.

  // Example for handling blur (when user clicks outside the editor)
  const handleBlur = (previousRange, source, editor) => {
    const content = editor.getHTML();
    const cleaned = cleanSignatureHTML(content);
    setState((prev) => ({ ...prev, [name]: cleaned }));
    // console.log("Parent state updated on BLUR.");
  }


  return (
    <>
      <style>{`
        /* Target the Quill editor's content area */
        .quill > .ql-container > .ql-editor {
          /* This is the container that holds all the content */
          min-height: 180px; /* Ensure your min-height is here */
        }

        /* Target paragraphs *inside* the Quill editor */
        .quill .ql-editor p {
          /* Remove default top and bottom margin on paragraphs */
          margin: 0;
          padding: 0; 
          /* Add a small padding or line-height if you want some visual separation */
          line-height: 1.2; 
        }
      `}</style>
      <ReactQuill
        id={id}
        ref={quillRef}
        theme="snow"
        value={editorValue}
        onChange={handleChange}
        onBlur={handleBlur}
        modules={modules}
        formats={formats}
        placeholder={placeholder || "Start typing..."}
        style={{ minHeight: 180, height: "auto" }}
      />
    </>
  );
}