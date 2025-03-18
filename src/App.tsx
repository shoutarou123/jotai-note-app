import { useSetAtom } from "jotai";
import { notesAtom } from "./store";
import { Note } from "./domain/note";
import { useEffect } from "react";
import SideMenu from "./components/SideMenu";
import Editor from "./components/Editor";

function App() {
  const setNotes = useSetAtom(notesAtom);

  useEffect(() => {
    const noteData = [
      new Note("1", "Note1", "Coontent 1", new Date().getTime()),
      new Note("2", "Note2", "Coontent 2", new Date().getTime()),
      new Note("3", "Note3", "Coontent 3", new Date().getTime()),
    ]
    setNotes(noteData);
  }, []);

  return (
    <>
      <div className="flex h-screen w-full bg-white">
        <SideMenu />
        <Editor />
      </div>
    </>
  )
}

export default App
