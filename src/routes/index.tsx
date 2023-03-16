import { onMount } from "solid-js"
import { useNavigate } from "solid-start"

export default function Page() {
  const navigate = useNavigate()
  onMount(() => {
    // try do operations on this repo https://github.com/inlang/example
    navigate("/editor/github.com/inlang/example")
  })
  return <></>
}
