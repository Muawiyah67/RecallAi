"use client"

import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useGlobalSearch } from "@/components/layout/search-provider"

export function GlobalSearchTrigger() {
  const { setOpen } = useGlobalSearch()

  return (
    <Button
      variant="outline"
      className="w-full max-w-sm justify-start gap-2 text-muted-foreground sm:pr-1.5"
      onClick={() => setOpen(true)}
    >
      <Search className="size-4" />
      <span className="flex-1 truncate text-left">Search...</span>
      <kbd className="hidden rounded-md border border-border bg-muted px-1.5 py-0.5 font-sans text-[10px] sm:inline-block">
        {"⌘K"}
      </kbd>
    </Button>
  )
}
