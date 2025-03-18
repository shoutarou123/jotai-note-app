// Note一覧を持つstore

import { atom } from "jotai";
import { Note } from "../domain/note";

export const notesAtom = atom<Note[]>([]);