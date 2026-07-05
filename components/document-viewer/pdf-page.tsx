import { getPageParagraphs } from "@/lib/fake-page-content"
import { cn } from "@/lib/utils"

export function PdfPage({
  pageNumber,
  zoom,
  highlighted,
}: {
  pageNumber: number
  zoom: number
  highlighted?: boolean
}) {
  const paragraphs = getPageParagraphs(pageNumber)

  return (
    <div
      className="mx-auto flex aspect-[8.5/11] w-full max-w-lg origin-top flex-col gap-4 rounded-sm bg-white p-8 text-neutral-800 shadow-sm ring-1 ring-black/10 transition-transform"
      style={{ transform: `scale(${zoom / 100})`, marginBottom: `${(zoom - 100) * 4}px` }}
    >
      <div className="h-3 w-2/5 rounded-full bg-neutral-200" />
      <div className="flex flex-col gap-2">
        <div className="h-2 w-full rounded-full bg-neutral-100" />
        <div className="h-2 w-full rounded-full bg-neutral-100" />
        <div className="h-2 w-3/4 rounded-full bg-neutral-100" />
      </div>

      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className={cn(
            "rounded-sm p-1.5 text-[11px] leading-relaxed text-neutral-600",
            highlighted && index === 0 && "bg-warning/25 ring-1 ring-warning/60"
          )}
        >
          {paragraph}
        </p>
      ))}

      <div className="mt-auto text-center text-[10px] text-neutral-400">{pageNumber}</div>
    </div>
  )
}
