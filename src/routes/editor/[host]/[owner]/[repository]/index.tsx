import { EditorStateProvider } from "./State"

export default function Editor() {
  return (
    <EditorStateProvider>
      <div>test</div>
    </EditorStateProvider>
  )
}
