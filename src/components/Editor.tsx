import { useAtomValue, useSetAtom } from "jotai"
import { saveNoteAtom, selectedNoteAtom } from "../store"
import { BoldItalicUnderlineToggles, codeBlockPlugin, codeMirrorPlugin, headingsPlugin, InsertCodeBlock, listsPlugin, ListsToggle, markdownShortcutPlugin, MDXEditor, toolbarPlugin } from "@mdxeditor/editor"
import '@mdxeditor/editor/style.css'
import { api } from "../../convex/_generated/api"
import { useMutation } from "convex/react"
import { useCallback, useEffect, useState } from "react"
import { useDebounce } from "@uidotdev/usehooks"

const plugins = [
  headingsPlugin(),
  listsPlugin(),
  markdownShortcutPlugin(),
  codeBlockPlugin({
    defaultCodeBlockLanguage: "js",
  }),
  codeMirrorPlugin({
    codeBlockLanguages: {
      js: "javascript",
      jsx: "JavaScript JSX",
      ts: "TypeScript",
      tsx: "TypeScript JSX",
      python: "Python",
      css: "CSS",
      html: "HTML",
      json: "JSON",
    }
  }),
  toolbarPlugin({
    toolbarContents: () => (
      <>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <BoldItalicUnderlineToggles />
          </div>
          <div className="flex gap-1">
            <ListsToggle />
          </div>
          <InsertCodeBlock />
        </div>
      </>
    )
  })
]

function Editor() {
  const selectedNote = useAtomValue(selectedNoteAtom);
  const updateNote = useMutation(api.notes.updateNote);
  const saveNote = useSetAtom(saveNoteAtom);
  const [ content, setContent ] = useState<string>(selectedNote?.content || "");

  const debounceContet = useDebounce(content, 1000)

  useEffect(() => {
    if (!selectedNote || !debounceContet) return;
    updateNote({
      noteId: selectedNote.id,
      title: selectedNote.title,
      content: debounceContet,
    });
  }, [debounceContet])

  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent)
    saveNote(newContent)
  }, [saveNote])


  return (
    <div className="flex-1">
      {selectedNote ? (
        <MDXEditor
          key={selectedNote.id}
          markdown={selectedNote.content}
          plugins={plugins}
          contentEditableClassName="prose max-w-none focus:outline-note"
          className="h-full"
          placeholder="Markdownを入力してください"
          onChange={handleContentChange}
        />
      ) : (
        <div className="h-screen flex items-center justify-center">
          <p className="text-gray-500">
            ノートを選択するか、新しいノートを作成してください
          </p>
        </div>
      )}
    </div>
  )
}

export default Editor