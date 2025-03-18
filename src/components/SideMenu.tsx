import { notesAtom } from "../store"
import { api } from "../../convex/_generated/api"
import { useMutation } from "convex/react"
import { Note } from "../domain/note"
import { useAtom } from "jotai"
import { Id } from "../../convex/_generated/dataModel"
import { deleteNote } from "../../convex/notes"

function SideMenu() {
  const [notes, setNotes] = useAtom(notesAtom); // storeのnotesAtomを取得
  const createNote =  useMutation(api.notes.create); // ｻｰﾊﾞｰ側で定義されたcreateﾐｭｰﾃｰｼｮﾝを呼び出す準備
  const deleteNote = useMutation(api.notes.deleteNote);

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


  return (
    <div className="w-64 h-screen bg-gray-100 p-4 flex flex-col">
      <div>
        <h2>Notes</h2>
        <button className="border-none" onClick={handleCreateNote}>+</button>
      </div>
      <div>
        {notes.map((note) => (
          <div key={note.id} className="p-2 mb-2 rounded cursor-pointer flex justify-between items-center group">
            <div className="flex-1 min-w-0">
              <input className="border-none bg-gray-100" type="text" value={note.title} />
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