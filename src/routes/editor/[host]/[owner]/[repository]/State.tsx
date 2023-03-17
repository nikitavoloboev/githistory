import { JSXElement, createResource, createSignal } from "solid-js"
import { createFsFromVolume, Volume } from "memfs"
import { createStore } from "solid-js/store"

// TODO: git clone --depth 1 --filter=blob:none --sparse
// then git fetch rest to speed up clone

// TODO: add sparse clone to isomorphic-git
// https://github.com/isomorphic-git/isomorphic-git/issues/1735
// https://git-scm.com/docs/git-sparse-checkout
// read https://github.com/Byron/gitoxide/blob/79ed8752451ce621cf1ee69d3ca15deae3416798/gix-index/src/access/sparse.rs#L9

// Initialize editor state from results of git clone.
export function EditorStateProvider(props: { children: JSXElement }) {
  const [fsChange, setFsChange] = createSignal(new Date())

  // TODO: add polyfill
  const [fs, setFs] = createSignal<typeof import("memfs").fs>(
    createFsFromVolume(new Volume())
  )

  // re-fetched if currentPageContext changes
  const [repositoryIsCloned] = createResource(
    () => {
      // re-initialize fs on every cloneRepository call
      // until subdirectories are supported
      setFs(createFsFromVolume(new Volume()))
      return {
        fs: fs(),
        routeParams: currentPageContext.routeParams as EditorRouteParams,
        user: localStorage?.user,
        setFsChange,
      }
    },
    async (args) => {
      const result = await cloneRepository(args)
      analytics.capture("clone repository", {
        owner: args.routeParams.owner,
        repository: args.routeParams.repository,
      })
      return result
    }
  )

  return <>{props.children}</>
}

/** @example `{host}/{owner}/{repository}` */
type EditorRouteParams = {
  /** @example `github.com` */
  host: string
  /** @example `inlang` */
  owner: string
  /** @example `website` */
  repository: string
}

/**
 * The current page context.
 *
 * The page context is (and must be) set by the renderers.
 * Note that the page context on the client side is a subset
 * of `PageContextRenderer`. If you are certain that the
 * page context you are accessing is the `PageContextRenderer`,
 * use a type cast `as PageContextRenderer`.
 */
// eslint-disable-next-line solid/reactivity
// export const [currentPageContext, setCurrentPageContext] = createStore({}) as [
// 	PageContext,
// 	SetStoreFunction<PageContextRenderer>,
// ]
