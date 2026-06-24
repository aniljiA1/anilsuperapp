import { useState } from "react";
import { useStore } from "../store/useStore";

const NotesWidget = () => {
  const notes = useStore((s) => s.notes);
  const addNote = useStore((s) => s.addNote);
  const updateNote = useStore((s) => s.updateNote);
  const deleteNote = useStore((s) => s.deleteNote);
  const clearNotes = useStore((s) => s.clearNotes);

  const [draft, setDraft] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    addNote(draft);
    setDraft("");
  };

  const startEdit = (note) => {
    setEditingId(note.id);
    setEditText(note.text);
  };

  const saveEdit = () => {
    if (editText.trim()) {
      updateNote(editingId, editText.trim());
    }
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="bg-[#e7c44e] rounded-2xl p-6 h-full flex flex-col text-black">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">All Notes</h3>
        {notes.length > 0 && (
          <button onClick={clearNotes} className="text-sm underline hover:opacity-70" type="button">
            Clear all
          </button>
        )}
      </div>

      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Write a quick memo…"
          className="flex-1 bg-black/10 placeholder:text-black/50 rounded-lg px-3 py-2 outline-none focus:bg-black/15"
        />
        <button
          type="submit"
          className="bg-black/80 text-[#e7c44e] font-semibold px-4 py-2 rounded-lg hover:bg-black"
        >
          Add
        </button>
      </form>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-64">
        {notes.length === 0 && (
          <p className="text-black/50 text-sm">No notes yet — add one above.</p>
        )}
        {notes.map((note) => (
          <div key={note.id} className="bg-black/10 rounded-lg p-3 group">
            {editingId === note.id ? (
              <div className="flex flex-col gap-2">
                <textarea
                  autoFocus
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="bg-white/40 rounded-md p-2 outline-none resize-none text-sm"
                  rows={2}
                />
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="text-xs underline"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={saveEdit}
                    className="text-xs font-semibold bg-black/80 text-[#e7c44e] px-3 py-1 rounded-full"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start gap-2">
                <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{note.text}</p>
                <div className="flex gap-2 opacity-60 group-hover:opacity-100 shrink-0">
                  <button
                    type="button"
                    onClick={() => startEdit(note)}
                    className="text-xs underline"
                    aria-label="Edit note"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteNote(note.id)}
                    className="text-xs underline"
                    aria-label="Delete note"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-black/60 mt-3">Saved to your browser</p>
    </div>
  );
};

export default NotesWidget;
