import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.css";

// Define types for the value of the editor content
interface RichTextEditorProps {
  value: string;
  onChange: (newValue: string) => void;
}

export function TextEditor({ value, onChange }: RichTextEditorProps) {
  // Options for Quill (customizing the toolbar)
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ align: [] }],
      ["link", "image"],
      ["blockquote", "code-block"],
    ],
  };

  return (
    <div className="editor-container">
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        theme="snow"
        placeholder="Start typing..."
      />
    </div>
  );
}

export default TextEditor;
