import { FileText } from "lucide-react"

import { cn } from "@/lib/utils"
import type { Source } from "@/lib/types"

function confidenceLabel(confidence: number) {
  if (confidence >= 0.85) return { label: "High match", className: "text-success" }
  if (confidence >= 0.7) return { label: "Good match", className: "text-warning" }
  return { label: "Weak match", className: "text-muted-foreground" }
}

export function SourceCard({
  source,
  onClick,
}: {
  source: Source
  onClick?: (source: Source) => void
}) {
  const confidence = confidenceLabel(source.confidence)

  return (
    <button
      type="button"
      onClick={() => onClick?.(source)}
      className="flex w-56 shrink-0 flex-col gap-1.5 rounded-lg border border-border bg-card p-2.5 text-left transition-colors hover:bg-muted/50"
    >
      <div className="flex items-center gap-1.5 text-xs font-medium">
        <FileText className="size-3.5 shrink-0 text-muted-foreground" />
        <span className="truncate">{source.documentName}</span>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Page {source.page}</span>
        <span className={cn("font-medium", confidence.className)}>
          {Math.round(source.confidence * 100)}% · {confidence.label}
        </span>
      </div>
    </button>
  )
}
