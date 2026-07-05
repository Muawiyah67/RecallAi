"use client"

import { ChevronLeft, ChevronRight, Search, ZoomIn, ZoomOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"

export function ViewerToolbar({
  page,
  pageCount,
  zoom,
  searchQuery,
  matchCount,
  onPageChange,
  onZoomChange,
  onSearchChange,
}: {
  page: number
  pageCount: number
  zoom: number
  searchQuery: string
  matchCount: number
  onPageChange: (page: number) => void
  onZoomChange: (zoom: number) => void
  onSearchChange: (query: string) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-border px-3 py-2">
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon-sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft />
        </Button>
        <span className="min-w-[5.5rem] text-center text-xs text-muted-foreground">
          Page {page} of {pageCount}
        </span>
        <Button
          variant="ghost"
          size="icon-sm"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <ChevronRight />
        </Button>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon-sm"
          disabled={zoom <= 50}
          onClick={() => onZoomChange(Math.max(50, zoom - 10))}
          aria-label="Zoom out"
        >
          <ZoomOut />
        </Button>
        <span className="min-w-10 text-center text-xs text-muted-foreground">{zoom}%</span>
        <Button
          variant="ghost"
          size="icon-sm"
          disabled={zoom >= 200}
          onClick={() => onZoomChange(Math.min(200, zoom + 10))}
          aria-label="Zoom in"
        >
          <ZoomIn />
        </Button>
      </div>

      <InputGroup className="ml-auto max-w-56">
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput
          placeholder='Search in document...'
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </InputGroup>
      {searchQuery && (
        <span className="text-xs text-muted-foreground">
          {matchCount} {matchCount === 1 ? "match" : "matches"}
        </span>
      )}
    </div>
  )
}
