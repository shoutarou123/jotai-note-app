import { notesAtom, selectedNoteIdAtom } from "../store"
import { api } from "../../convex/_generated/api"
import { useMutation } from "convex/react"
import { Note } from "../domain/note"
import { useAtom, useSetAtom } from "jotai"
import { Id } from "../../convex/_generated/dataModel"
import { deleteNote } from "../../convex/notes"
import { useEffect, useState } from "react"
import { useDebounce } from "@uidotdev/usehooks"

function SideMenu() {
  const [notes, setNotes] = useAtom(notesAtom); // storeのnotesAtomを取得
  const setSelectedNoteId = useSetAtom(selectedNoteIdAtom);
  const createNote =  useMutation(api.notes.create); // ｻｰﾊﾞｰ側で定義されたcreateﾐｭｰﾃｰｼｮﾝを呼び出す準備
  const deleteNote = useMutation(api.notes.deleteNote);
  const updateNote = useMutation(api.notes.updateNote);
  const [editingTitle, setEditingTitle] = useState<{
    id: Id<"notes">;
    title: string;
  } | null>(null);

  const handleCreateNote = async () => {
    const noteId = await createNote({ // ｻｰﾊﾞｰ側で定義したcreateﾐｭｰﾃｰｼｮﾝにUntitledと空コンテントを渡しﾃﾞｰﾀﾍﾞｰｽに追加している
      title: "Untitled",
      content: "",
    });

    const newNote = new Note(noteId, "Untitled", "", Date.now()); // ｸﾗｲｱﾝﾄ側でｲﾝｽﾀﾝｽ作成しnoteId呼び出し Untitledと空ｺﾝﾃﾝﾄを渡している ﾃﾞｰﾀﾍﾞｰｽに渡すだけでも表示されるが、ここでも同じ値を渡すことで即時表示するようにしている。
    setNotes([...notes, newNote]); // notesを展開して、最後に新しいﾃﾞｰﾀを追加している
  }

  const handleDeleteNote = async (noteId: Id<"notes">) => {
    await deleteNote({ noteId })
    setNotes(notes.filter((note) => note.id !== noteId)); // (note)は任意の変数名 notesの配列が順番に入る
  }

  const handleNoteClick = (noteId: Id<"notes">) => {
    setSelectedNoteId(noteId)
  };

  const debounceTitle = useDebounce(editingTitle?.title, 500); // editingTileが変更されて500秒間変更がなかったらデバンスが走る
  useEffect(() => {
    if(editingTitle && debounceTitle) {
      handleUpdateTitle(editingTitle.id, debounceTitle);
    }
  }, [debounceTitle]); // デバンスが実行されたら処理を実行

  const handleUpdateTitle = async (noteId: Id<"notes">, newTitle: string) => {
    const note = notes.find((note) => note.id === noteId)
    if (!note) return;
    await updateNote({ noteId: noteId, title: newTitle, content: note.content})
  }


  const handleTitleChange = (noteId: Id<"notes">, title: string) => {
    setEditingTitle({
      id: noteId,
      title: title,
    });
    // ｸﾞﾛｰﾊﾞﾙ（見た目）の更新
    setNotes((prev) => prev.map((note) => (note.id === noteId ? {...note, title: title} : note )))
  }


  return (
    <div className="w-64 h-screen bg-gray-100 p-4 flex flex-col">
      <div>
        <h2>Notes</h2>
        <button className="border-none" onClick={handleCreateNote}>+</button>
      </div>
      <div>
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-2 mb-2 rounded cursor-pointer flex justify-between items-center group"
            onClick={() => handleNoteClick(note.id)}
            >
            <div className="flex-1 min-w-0">
              <input
                className="border-none bg-gray-100"
                type="text"
                value={note.title}
                onChange={(e) => handleTitleChange(note.id, e.target.value)}
                />
              <p>
                {note.lastEditTime ? new Date(note.lastEditTime).toLocaleString() : "Never edited"}
              </p>
            </div>
            <button className="border-none" onClick={() => handleDeleteNote(note.id)}>-</button>
          </div>
        ))}
      </div>
    </div >
  )
}

export default SideMenu