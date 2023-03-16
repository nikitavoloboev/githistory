import { JSXElement, createSignal } from "solid-js"
import { createFsFromVolume, Volume } from "memfs"

// TODO: git clone --depth 1 --filter=blob:none --sparse
// then git fetch rest to speed up clone

// TODO: add sparse clone to isomorphic-git
// https://github.com/isomorphic-git/isomorphic-git/issues/1735
// https://git-scm.com/docs/git-sparse-checkout
// read https://github.com/Byron/gitoxide/blob/79ed8752451ce621cf1ee69d3ca15deae3416798/gix-index/src/access/sparse.rs#L9

// Initialize editor state from results of git clone.
export function EditorStateProvider(props: { children: JSXElement }) {
  const [fsChange, setFsChange] = createSignal(new Date())

  const [fs, setFs] = createSignal<typeof import("memfs").fs>(
    createFsFromVolume(new Volume())
  )

  return <></>
}
