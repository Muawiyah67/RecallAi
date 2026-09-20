import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

export function PageThumbnails({
  pageCount,
  currentPage,
  onSelect,
}: {
  pageCount: number
  currentPage: number
  onSelect: (page: number) => void
}) {
  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-2 p-2">
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onSelect(page)}
            className={cn(
              "flex aspect-[8.5/11] w-full flex-col items-center justify-end gap-1 rounded-sm border bg-white p-1.5 ring-1 ring-black/5 transition-colors",
              page === currentPage ? "border-primary" : "border-transparent hover:border-border"
            )}
          >
            <span className="text-[9px] text-neutral-400">{page}</span>
          </button>
        ))}
      </div>
    </ScrollArea>
  )
}
