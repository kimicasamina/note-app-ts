import { CgEye, CgPen } from "react-icons/cg";
import { BiSave } from "react-icons/bi";
import { CgTrash } from "react-icons/cg";
import "./index.css";

export default function NoteMenu({
  title,
  isEditMode,
  setIsEditMode,
  handleSave,
  isSaving,
}: {
  title: string;
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  handleSave: () => void;
  isSaving: boolean;
}) {
  return (
    <div className="note-menu">
      <div className="note-buttons">
        <button
          className="note-save-btn"
          onClick={handleSave}
          disabled={isSaving}
        >
          <BiSave className="" /> Save
        </button>

        <button
          className="note-delete-btn"
          onClick={handleSave}
          disabled={isSaving}
        >
          <CgTrash />
          Delete
        </button>
      </div>

      <div className="note-toggle">
        {isEditMode ? (
          <button
            className="note-view-btn"
            onClick={() => setIsEditMode(false)}
          >
            <CgEye className="icon" />
            View Note
          </button>
        ) : (
          <button className="note-edit-btn" onClick={() => setIsEditMode(true)}>
            <CgPen className="icon" />
            Edit Note
          </button>
        )}
      </div>
    </div>
  );
}
