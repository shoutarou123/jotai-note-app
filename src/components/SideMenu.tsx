import { useAtomValue } from "jotai"
import { notesAtom } from "../store"

function SideMenu() {
  const notes = useAtomValue(notesAtom) // storeのnotesAtomを取得
  return (
    <div className="w-64 h-screen bg-gray-100 p-4 flex flex-col">
      <div>
        <h2>Notes</h2>
        <button className="border-none">+</button>
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
            <button className="border-none">-</button>
          </div>
        ))}
      </div>
    </div >
  )
}

export default SideMenu