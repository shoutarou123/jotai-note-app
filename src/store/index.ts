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