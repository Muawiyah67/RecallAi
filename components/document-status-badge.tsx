import { Badge } from "@/components/ui/badge"
import type { DocumentStatus } from "@/lib/types"

const statusVariant: Record<DocumentStatus, "success" | "info" | "destructive"> = {
  ready: "success",
  processing: "info",
  error: "destructive",
}

const statusLabel: Record<DocumentStatus, string> = {
  ready: "Ready",
  processing: "Processing",
  error: "Failed",
}

export function DocumentStatusBadge({ status }: { status: DocumentStatus }) {
  return <Badge variant={statusVariant[status]}>{statusLabel[status]}</Badge>
}
