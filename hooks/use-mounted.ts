import * as React from "react"

function subscribe() {
  return () => {}
}

function getSnapshot() {
  return true
}

function getServerSnapshot() {
  return false
}

/** True once the component has hydrated on the client. Use to avoid rendering client-only state (e.g. resolved theme) before hydration. */
export function useMounted() {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
