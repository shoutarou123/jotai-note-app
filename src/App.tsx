import { useSetAtom } from "jotai";
import { notesAtom } from "./store";
import { useEffect } from "react";
import { Note } from "./domain/note";
import SideMenu from "./components/SideMenu";
import Editor from "./components/Editor";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

function App() {

  const setNotes = useSetAtom(notesAtom); // stSetoreのnotesAtomを呼び出し
  const initializeNotes = useQuery(api.notes.get) // queryで書いたものはuseQueryで呼び出す notesはconvex/notes.ts

  // 初回の読み込み時に下記のダミーデータが読み込まれる 実際のﾃﾞｰﾀﾍﾞｰｽから取得して、ｾｯﾄ関数に入れている
  useEffect(() => {
    const notes = initializeNotes?.map((note) => new Note(note._id, note.title, note.content, note._creationTime)) // ?はnull or undefinedの時処理をｽｷｯﾌﾟしてundefinedを返す
    setNotes(notes || []);
  }, [initializeNotes, setNotes]);

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
