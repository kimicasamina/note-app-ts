import { useStore } from "@store/useStore";

export default function Notes() {
  const { selectedCategory } = useStore();
  return (
    <div className="notes-list">
      Notes
      {/* {notes && notes.map((note) => <NoteItem key={note.id} note={note} />)} */}
    </div>
  );
}
