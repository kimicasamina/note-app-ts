import { CgEye, CgPen } from "react-icons/cg";
import { BiSave } from "react-icons/bi";
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
      {/* <h2 className="note-header-title">{title}</h2> */}
      <button
        className="note-save-btn"
        onClick={handleSave}
        disabled={isSaving}
      >
        <BiSave className="" /> Save
      </button>

      {isEditMode ? (
        <button className="note-view-btn" onClick={() => setIsEditMode(false)}>
          <CgEye className="icon" />
          View Content
        </button>
      ) : (
        <button className="note-edit-btn" onClick={() => setIsEditMode(true)}>
          <CgPen className="icon" />
          Edit Content
        </button>
      )}
    </div>
  );
}
