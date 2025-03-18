// Note一覧を持つstore

import { atom } from "jotai";
import { Note } from "../domain/note";
import { Id } from "../../convex/_generated/dataModel";

export const notesAtom = atom<Note[]>([]);

// どのNoteを選択したか
export const selectedNoteIdAtom = atom<Id<"notes"> | null>(null);

//選択されたnoteをidatomから引っ張ってこれるような派生atomを作ったほうがいい
export const selectedNoteAtom = atom((get) => {
  const notes = get(notesAtom);
  const id = get(selectedNoteIdAtom);
  if (id === null) return null;

  return notes.find((note) => note.id === id);
});


// 読み書き可能な派生atom
export const saveNoteAtom = atom(null, (get, set, newContent: string) => {
  const note = get(selectedNoteAtom);
  if (!note) return;

  const updateNote = new Note(note.id, note.title, newContent, Date.now())
  const notes = get(notesAtom)
  const updateNotes = notes.map((note) => note.id === updateNote.id ? updateNote : note)

  set(notesAtom, updateNotes);
})